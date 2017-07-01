require.register("views/editor/PatchesView", function(exports, require, module) {
var CocoView, PatchModal, PatchesCollection, PatchesView, nameLoader, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/patches');

PatchesCollection = require('collections/PatchesCollection');

nameLoader = require('core/NameLoader');

PatchModal = require('./PatchModal');

module.exports = PatchesView = (function(superClass) {
  extend(PatchesView, superClass);

  PatchesView.prototype.template = template;

  PatchesView.prototype.className = 'patches-view';

  PatchesView.prototype.status = 'pending';

  PatchesView.prototype.events = {
    'change .status-buttons': 'onStatusButtonsChanged',
    'click .patch-row': 'openPatchModal'
  };

  function PatchesView(model, options) {
    this.model = model;
    PatchesView.__super__.constructor.call(this, options);
    this.initPatches();
  }

  PatchesView.prototype.initPatches = function() {
    this.startedLoading = false;
    return this.patches = this.model.fetchPatchesWithStatus();
  };

  PatchesView.prototype.load = function() {
    this.initPatches();
    this.patches = this.model.fetchPatchesWithStatus(this.status, {
      cache: false
    });
    this.supermodel.trackCollection(this.patches);
    return this.listenTo(this.patches, 'sync', this.onPatchesLoaded);
  };

  PatchesView.prototype.onPatchesLoaded = function() {
    var ids, jqxhrOptions, p;
    ids = (function() {
      var i, len, ref, results;
      ref = this.patches.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        results.push(p.get('creator'));
      }
      return results;
    }).call(this);
    jqxhrOptions = nameLoader.loadNames(ids);
    if (jqxhrOptions) {
      return this.supermodel.addRequestResource('user_names', jqxhrOptions).load();
    }
  };

  PatchesView.prototype.getRenderData = function() {
    var c, i, len, patch, ref;
    c = PatchesView.__super__.getRenderData.call(this);
    ref = this.patches.models;
    for (i = 0, len = ref.length; i < len; i++) {
      patch = ref[i];
      patch.userName = nameLoader.getName(patch.get('creator'));
    }
    c.patches = this.patches.models;
    c.status;
    return c;
  };

  PatchesView.prototype.afterRender = function() {
    this.$el.find("." + this.status).addClass('active');
    return PatchesView.__super__.afterRender.call(this);
  };

  PatchesView.prototype.onStatusButtonsChanged = function(e) {
    this.status = $(e.target).val();
    return this.reloadPatches();
  };

  PatchesView.prototype.reloadPatches = function() {
    this.supermodel.resetProgress();
    this.load();
    return this.render();
  };

  PatchesView.prototype.openPatchModal = function(e) {
    var modal, patch, row;
    row = $(e.target).closest('.patch-row');
    patch = _.find(this.patches.models, {
      id: row.data('patch-id')
    });
    modal = new PatchModal(patch, this.model);
    this.openModalView(modal);
    this.listenTo(modal, 'accepted-patch', function() {
      return this.trigger('accepted-patch');
    });
    return this.listenTo(modal, 'hide', function() {
      var f;
      f = (function(_this) {
        return function() {
          return _this.reloadPatches();
        };
      })(this);
      setTimeout(f, 400);
      return this.stopListening(modal);
    });
  };

  return PatchesView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/PatchesView.js.map