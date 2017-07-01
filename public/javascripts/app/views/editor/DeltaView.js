require.register("views/editor/DeltaView", function(exports, require, module) {
var CocoView, DeltaView, TEXTDIFF_OPTIONS, deltasLib, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/delta');

deltasLib = require('core/deltas');

require('vendor/diffview');

require('vendor/difflib');

require('vendor/treema');

TEXTDIFF_OPTIONS = {
  baseTextName: "Old",
  newTextName: "New",
  contextSize: 5,
  viewType: 1
};

module.exports = DeltaView = (function(superClass) {
  extend(DeltaView, superClass);


  /*
  Takes a CocoModel instance (model) and displays changes since the
  last save (attributes vs _revertAttributes).
  
  * If headModel is included, will look for and display conflicts with the changes in model.
  * If comparisonModel is included, will show deltas between model and comparisonModel instead
    of changes within model itself.
   */

  DeltaView.deltaCounter = 0;

  DeltaView.prototype.className = 'delta-view';

  DeltaView.prototype.template = template;

  function DeltaView(options) {
    var j, len, modelName, ref;
    DeltaView.__super__.constructor.call(this, options);
    this.expandedDeltas = [];
    this.skipPaths = options.skipPaths;
    ref = ['model', 'headModel', 'comparisonModel'];
    for (j = 0, len = ref.length; j < len; j++) {
      modelName = ref[j];
      this[modelName] = options[modelName];
      if (!(this[modelName] && options.loadModels)) {
        continue;
      }
      if (!this[modelName].isLoaded) {
        this[modelName] = this.supermodel.loadModel(this[modelName]).model;
      }
    }
    if (this.supermodel.finished()) {
      this.buildDeltas();
    }
  }

  DeltaView.prototype.onLoaded = function() {
    this.buildDeltas();
    return DeltaView.__super__.onLoaded.call(this);
  };

  DeltaView.prototype.buildDeltas = function() {
    var ref;
    if (this.comparisonModel) {
      this.expandedDeltas = this.model.getExpandedDeltaWith(this.comparisonModel);
      this.deltas = this.model.getDeltaWith(this.comparisonModel);
    } else {
      this.expandedDeltas = this.model.getExpandedDelta();
      this.deltas = this.model.getDelta();
    }
    ref = this.filterDeltas(this.expandedDeltas), this.expandedDeltas = ref[0], this.skippedDeltas = ref[1];
    if (this.headModel) {
      this.headDeltas = this.headModel.getExpandedDelta();
      this.headDeltas = this.filterDeltas(this.headDeltas)[0];
      return this.conflicts = deltasLib.getConflicts(this.headDeltas, this.expandedDeltas);
    }
  };

  DeltaView.prototype.filterDeltas = function(deltas) {
    var delta, i, j, k, l, len, len1, len2, newDeltas, path, ref, ref1, skip, skipPath, skippedDeltas;
    if (!this.skipPaths) {
      return [deltas, []];
    }
    ref = this.skipPaths;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      path = ref[i];
      if (_.isString(path)) {
        this.skipPaths[i] = [path];
      }
    }
    newDeltas = [];
    skippedDeltas = [];
    for (k = 0, len1 = deltas.length; k < len1; k++) {
      delta = deltas[k];
      skip = false;
      ref1 = this.skipPaths;
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        skipPath = ref1[l];
        if (_.isEqual(_.first(delta.dataPath, skipPath.length), skipPath)) {
          skip = true;
          break;
        }
      }
      if (skip) {
        skippedDeltas.push(delta);
      } else {
        newDeltas.push(delta);
      }
    }
    return [newDeltas, skippedDeltas];
  };

  DeltaView.prototype.afterRender = function() {
    var conflictDeltas, conflicts, delta, deltaData, deltaEl, deltas, expertView, i, j, k, len, len1, results;
    expertView = this.$el.find('.expert-view');
    if (expertView) {
      expertView.html(jsondiffpatch.formatters.html.format(this.deltas));
    }
    DeltaView.deltaCounter += this.expandedDeltas.length;
    deltas = this.$el.find('.details');
    for (i = j = 0, len = deltas.length; j < len; i = ++j) {
      delta = deltas[i];
      deltaEl = $(delta);
      deltaData = this.expandedDeltas[i];
      this.expandDetails(deltaEl, deltaData);
    }
    conflictDeltas = this.$el.find('.conflict-details');
    conflicts = (function() {
      var k, len1, ref, results;
      ref = this.expandedDeltas;
      results = [];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        delta = ref[k];
        if (delta.conflict) {
          results.push(delta.conflict);
        }
      }
      return results;
    }).call(this);
    results = [];
    for (i = k = 0, len1 = conflictDeltas.length; k < len1; i = ++k) {
      delta = conflictDeltas[i];
      deltaEl = $(delta);
      deltaData = conflicts[i];
      results.push(this.expandDetails(deltaEl, deltaData));
    }
    return results;
  };

  DeltaView.prototype.expandDetails = function(deltaEl, deltaData) {
    var args, el, error, error1, error2, left, leftEl, opcodes, options, right, rightEl, sm, treemaOptions;
    treemaOptions = {
      schema: deltaData.schema || {},
      readOnly: true
    };
    if (_.isObject(deltaData.left) && (leftEl = deltaEl.find('.old-value'))) {
      options = _.defaults({
        data: _.merge({}, deltaData.left)
      }, treemaOptions);
      try {
        TreemaNode.make(leftEl, options).build();
      } catch (error1) {
        error = error1;
        console.error("Couldn't show left details Treema for", deltaData.left, treemaOptions);
      }
    }
    if (_.isObject(deltaData.right) && (rightEl = deltaEl.find('.new-value'))) {
      options = _.defaults({
        data: _.merge({}, deltaData.right)
      }, treemaOptions);
      try {
        TreemaNode.make(rightEl, options).build();
      } catch (error2) {
        error = error2;
        console.error("Couldn't show right details Treema for", deltaData.right, treemaOptions);
      }
    }
    if (deltaData.action === 'text-diff') {
      if (!((deltaData.left != null) && (deltaData.right != null))) {
        return console.error("Couldn't show diff for left: " + deltaData.left + ", right: " + deltaData.right + " of delta:", deltaData);
      }
      left = difflib.stringAsLines(deltaData.left);
      right = difflib.stringAsLines(deltaData.right);
      sm = new difflib.SequenceMatcher(left, right);
      opcodes = sm.get_opcodes();
      el = deltaEl.find('.text-diff');
      options = {
        baseTextLines: left,
        newTextLines: right,
        opcodes: opcodes
      };
      args = _.defaults(options, TEXTDIFF_OPTIONS);
      return el.append(diffview.buildView(args));
    }
  };

  DeltaView.prototype.getApplicableDelta = function() {
    var delta;
    delta = this.model.getDelta();
    if (this.conflicts) {
      delta = deltasLib.pruneConflictsFromDelta(delta, this.conflicts);
    }
    if (this.skippedDeltas) {
      delta = deltasLib.pruneExpandedDeltasFromDelta(delta, this.skippedDeltas);
    }
    return delta;
  };

  return DeltaView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/DeltaView.js.map