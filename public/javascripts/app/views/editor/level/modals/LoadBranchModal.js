require.register("views/editor/level/modals/LoadBranchModal", function(exports, require, module) {
var Branch, Branches, DeltaView, LevelComponents, LevelSystems, LoadBranchModal, ModalView, deltasLib, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/load-branch-modal');

DeltaView = require('views/editor/DeltaView');

deltasLib = require('core/deltas');

Branch = require('models/Branch');

Branches = require('collections/Branches');

LevelComponents = require('collections/LevelComponents');

LevelSystems = require('collections/LevelSystems');

module.exports = LoadBranchModal = (function(superClass) {
  extend(LoadBranchModal, superClass);

  function LoadBranchModal() {
    return LoadBranchModal.__super__.constructor.apply(this, arguments);
  }

  LoadBranchModal.prototype.id = 'load-branch-modal';

  LoadBranchModal.prototype.template = template;

  LoadBranchModal.prototype.modalWidthPercent = 99;

  LoadBranchModal.prototype.events = {
    'click #load-branch-btn': 'onClickLoadBranchButton',
    'click #unstash-branch-btn': 'onClickUnstashBranchButton',
    'click #branches-list-group .list-group-item': 'onClickBranch',
    'click .delete-branch-btn': 'onClickDeleteBranchButton'
  };

  LoadBranchModal.prototype.initialize = function(arg) {
    this.components = arg.components, this.systems = arg.systems;
    this.branches = new Branches();
    return this.branches.fetch({
      url: '/db/branches'
    }).then((function(_this) {
      return function() {
        var branch, collection, fetches, i, j, len, len1, model, patch, ref, ref1;
        _this.selectedBranch = _this.branches.first();
        fetches = [];
        ref = _this.branches.models;
        for (i = 0, len = ref.length; i < len; i++) {
          branch = ref[i];
          ref1 = branch.get('patches');
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            patch = ref1[j];
            collection = patch.target.collection === 'level_component' ? _this.components : _this.systems;
            model = collection.get(patch.target.id);
            if (!model) {
              model = new collection.model({
                _id: patch.target.id
              });
              fetches.push(model.fetch());
              model.once('sync', function() {
                return this.markToRevert();
              });
              collection.add(model);
            }
          }
        }
        return $.when.apply($, fetches);
      };
    })(this)).then((function(_this) {
      return function() {
        var applied, branch, collection, currentModel, i, key, len, originalChange, patch, postLoadChange, ref, results, toApply;
        ref = _this.branches.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          branch = ref[i];
          results.push((function() {
            var j, k, len1, len2, ref1, ref2, results1;
            ref1 = branch.get('patches');
            results1 = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              patch = ref1[j];
              patch.id = _.uniqueId();
              collection = patch.target.collection === 'level_component' ? this.components : this.systems;
              originalChange = collection.get(patch.target.id).clone(false);
              originalChange.markToRevert();
              originalChange.applyDelta(patch.delta);
              currentModel = collection.find(function(model) {
                return _.all([model.get('original') === patch.target.original, model.get('version').isLatestMajor]);
              });
              postLoadChange = currentModel.clone();
              postLoadChange.markToRevert();
              toApply = currentModel.clone(false);
              applied = toApply.applyDelta(patch.delta);
              if (applied) {
                postLoadChange.set(toApply.attributes);
                ref2 = postLoadChange.keys();
                for (k = 0, len2 = ref2.length; k < len2; k++) {
                  key = ref2[k];
                  if (!toApply.has(key)) {
                    postLoadChange.unset(key);
                  }
                }
              }
              results1.push(_.assign(patch, {
                originalChange: originalChange,
                postLoadChange: postLoadChange,
                applied: applied,
                currentModelHasLocalChanges: currentModel.hasLocalChanges(),
                modelHasChangedSincePatchCreated: originalChange.id !== currentModel.id,
                currentModel: currentModel
              }));
            }
            return results1;
          }).call(_this));
        }
        return results;
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
  };

  LoadBranchModal.prototype.afterRender = function() {
    LoadBranchModal.__super__.afterRender.call(this);
    return this.renderSelectedBranch();
  };

  LoadBranchModal.prototype.insertDeltaView = function(model, changeEl, headModel) {
    var deltaView, e, error;
    try {
      deltaView = new DeltaView({
        model: model,
        headModel: headModel,
        skipPaths: deltasLib.DOC_SKIP_PATHS
      });
      this.insertSubView(deltaView, $(changeEl));
      return deltaView;
    } catch (error) {
      e = error;
      return console.error('Couldn\'t create delta view:', e);
    }
  };

  LoadBranchModal.prototype.renderSelectedBranch = function() {
    var i, j, len, len1, originalChangeEl, patch, postLoadChangeEl, ref, ref1, results, view;
    if (this.selectedBranchDeltaViews) {
      ref = this.selectedBranchDeltaViews;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        this.removeSubView(view);
      }
    }
    this.selectedBranchDeltaViews = [];
    this.renderSelectors('#selected-branch-col');
    if (!this.selectedBranch) {
      return;
    }
    ref1 = this.selectedBranch.get('patches');
    results = [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      patch = ref1[j];
      originalChangeEl = this.$(".changes-stub[data-patch-id='" + patch.id + "'][data-prop='original-change']");
      this.insertDeltaView(patch.originalChange, originalChangeEl);
      postLoadChangeEl = this.$(".changes-stub[data-patch-id='" + patch.id + "'][data-prop='post-load-change']");
      results.push(this.insertDeltaView(patch.postLoadChange, postLoadChangeEl));
    }
    return results;
  };

  LoadBranchModal.prototype.onClickBranch = function(e) {
    var branchCid;
    $(e.currentTarget).closest('.list-group').find('.active').removeClass('active');
    $(e.currentTarget).addClass('active');
    branchCid = $(e.currentTarget).data('branch-cid');
    this.selectedBranch = this.branches.get(branchCid);
    return this.renderSelectedBranch();
  };

  LoadBranchModal.prototype.onClickUnstashBranchButton = function(e) {
    return this.loadBranch({
      deleteBranch: true
    });
  };

  LoadBranchModal.prototype.onClickLoadBranchButton = function(e) {
    return this.loadBranch({
      deleteBranch: false
    });
  };

  LoadBranchModal.prototype.loadBranch = function(arg) {
    var branch, branchCid, currentModel, deleteBranch, i, j, key, len, len1, patch, postLoadChange, ref, ref1, selectedBranch;
    deleteBranch = arg.deleteBranch;
    selectedBranch = this.$('#branches-list-group .active');
    branchCid = selectedBranch.data('branch-cid');
    branch = this.branches.get(branchCid);
    ref = branch.get('patches');
    for (i = 0, len = ref.length; i < len; i++) {
      patch = ref[i];
      if (!patch.applied) {
        continue;
      }
      currentModel = patch.currentModel, postLoadChange = patch.postLoadChange;
      currentModel.set(postLoadChange.attributes);
      ref1 = currentModel.keys();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        key = ref1[j];
        if (!postLoadChange.has(key)) {
          currentModel.unset(key);
        }
      }
    }
    if (deleteBranch) {
      Promise.resolve(branch.destroy())["catch"]((function(_this) {
        return function(e) {
          return noty({
            text: 'Failed to delete branch after unstashing',
            layout: 'topCenter',
            type: 'error',
            killer: false
          });
        };
      })(this));
    }
    return this.hide();
  };

  LoadBranchModal.prototype.onClickDeleteBranchButton = function(e) {
    var branch, branchCid;
    e.preventDefault();
    e.stopImmediatePropagation();
    branchCid = $(e.currentTarget).closest('.list-group-item').data('branch-cid');
    branch = this.branches.get(branchCid);
    if (!confirm('Really delete this branch?')) {
      return;
    }
    branch.destroy();
    this.branches.remove(branch);
    if (branch === this.selectedBranch) {
      this.selectedBranch = null;
      this.renderSelectedBranch();
    }
    return $(e.currentTarget).closest('.list-group-item').remove();
  };

  return LoadBranchModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/modals/LoadBranchModal.js.map