require.register("views/editor/level/modals/SaveBranchModal", function(exports, require, module) {
var Branch, Branches, DeltaView, LevelComponents, LevelSystems, ModalView, SaveBranchModal, deltasLib, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/save-branch-modal');

DeltaView = require('views/editor/DeltaView');

deltasLib = require('core/deltas');

Branch = require('models/Branch');

Branches = require('collections/Branches');

LevelComponents = require('collections/LevelComponents');

LevelSystems = require('collections/LevelSystems');

module.exports = SaveBranchModal = (function(superClass) {
  extend(SaveBranchModal, superClass);

  function SaveBranchModal() {
    return SaveBranchModal.__super__.constructor.apply(this, arguments);
  }

  SaveBranchModal.prototype.id = 'save-branch-modal';

  SaveBranchModal.prototype.template = template;

  SaveBranchModal.prototype.modalWidthPercent = 99;

  SaveBranchModal.prototype.events = {
    'click #save-branch-btn': 'onClickSaveBranchButton',
    'click #branches-list-group .list-group-item': 'onClickBranch',
    'click .delete-branch-btn': 'onClickDeleteBranchButton',
    'click #stash-branch-btn': 'onClickStashBranchButton'
  };

  SaveBranchModal.prototype.initialize = function(arg) {
    this.components = arg.components, this.systems = arg.systems;
    this.componentsWithChanges = new LevelComponents(this.components.filter(function(c) {
      return c.hasLocalChanges();
    }));
    this.systemsWithChanges = new LevelSystems(this.systems.filter(function(c) {
      return c.hasLocalChanges();
    }));
    this.branches = new Branches();
    return this.branches.fetch({
      url: '/db/branches'
    }).then((function(_this) {
      return function() {
        var branch, collection, fetches, i, j, len, len1, model, patch, ref, ref1;
        fetches = [];
        ref = _this.branches.models;
        for (i = 0, len = ref.length; i < len; i++) {
          branch = ref[i];
          ref1 = branch.get('patches') || [];
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
        var allModels, branch, changedModels, i, j, len, len1, model, patch, ref, ref1;
        ref = _this.branches.models;
        for (i = 0, len = ref.length; i < len; i++) {
          branch = ref[i];
          branch.components = new Backbone.Collection();
          branch.systems = new Backbone.Collection();
          ref1 = branch.get('patches') || [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            patch = ref1[j];
            patch.id = _.uniqueId();
            if (patch.target.collection === 'level_component') {
              allModels = _this.components;
              changedModels = branch.components;
            } else {
              allModels = _this.systems;
              changedModels = branch.systems;
            }
            model = allModels.get(patch.target.id).clone(false);
            model.markToRevert();
            model.applyDelta(patch.delta);
            changedModels.add(model);
          }
        }
        _this.selectedBranch = _this.branches.first();
        return _this.render();
      };
    })(this));
  };

  SaveBranchModal.prototype.afterRender = function() {
    var changeEl, changeEls, component, componentId, i, j, len, len1, results, system, systemId;
    SaveBranchModal.__super__.afterRender.call(this);
    this.renderSelectedBranch();
    changeEls = this.$el.find('.component-changes-stub');
    for (i = 0, len = changeEls.length; i < len; i++) {
      changeEl = changeEls[i];
      componentId = $(changeEl).data('component-id');
      component = this.componentsWithChanges.find(function(c) {
        return c.id === componentId;
      });
      this.insertDeltaView(component, changeEl);
    }
    changeEls = this.$el.find('.system-changes-stub');
    results = [];
    for (j = 0, len1 = changeEls.length; j < len1; j++) {
      changeEl = changeEls[j];
      systemId = $(changeEl).data('system-id');
      system = this.systemsWithChanges.find(function(c) {
        return c.id === systemId;
      });
      results.push(this.insertDeltaView(system, changeEl));
    }
    return results;
  };

  SaveBranchModal.prototype.insertDeltaView = function(model, changeEl, headModel) {
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

  SaveBranchModal.prototype.renderSelectedBranch = function() {
    var changeEl, changeEls, component, componentDiff, componentId, i, j, k, len, len1, len2, preBranchSave, ref, results, system, systemDiff, systemId, targetComponent, targetSystem, view;
    if (this.selectedBranchDeltaViews) {
      ref = this.selectedBranchDeltaViews;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        this.removeSubView(view);
      }
    }
    this.selectedBranchDeltaViews = [];
    this.renderSelectors('#selected-branch-col');
    changeEls = this.$el.find('#selected-branch-col .component-changes-stub');
    for (j = 0, len1 = changeEls.length; j < len1; j++) {
      changeEl = changeEls[j];
      componentId = $(changeEl).data('component-id');
      component = this.selectedBranch.components.get(componentId);
      targetComponent = this.components.find(function(c) {
        return c.get('original') === component.get('original') && c.get('version').isLatestMajor;
      });
      preBranchSave = component.clone();
      preBranchSave.markToRevert();
      componentDiff = targetComponent.clone();
      preBranchSave.set(componentDiff.attributes);
      this.selectedBranchDeltaViews.push(this.insertDeltaView(preBranchSave, changeEl));
    }
    changeEls = this.$el.find('#selected-branch-col .system-changes-stub');
    results = [];
    for (k = 0, len2 = changeEls.length; k < len2; k++) {
      changeEl = changeEls[k];
      systemId = $(changeEl).data('system-id');
      system = this.selectedBranch.systems.get(systemId);
      targetSystem = this.systems.find(function(c) {
        return c.get('original') === system.get('original') && c.get('version').isLatestMajor;
      });
      preBranchSave = system.clone();
      preBranchSave.markToRevert();
      systemDiff = targetSystem.clone();
      preBranchSave.set(systemDiff.attributes);
      results.push(this.selectedBranchDeltaViews.push(this.insertDeltaView(preBranchSave, changeEl)));
    }
    return results;
  };

  SaveBranchModal.prototype.onClickBranch = function(e) {
    var branchCid;
    $(e.currentTarget).closest('.list-group').find('.active').removeClass('active');
    $(e.currentTarget).addClass('active');
    branchCid = $(e.currentTarget).data('branch-cid');
    this.selectedBranch = branchCid ? this.branches.get(branchCid) : null;
    return this.renderSelectedBranch();
  };

  SaveBranchModal.prototype.onClickStashBranchButton = function(e) {
    return this.saveBranch(e, {
      deleteSavedChanges: true
    });
  };

  SaveBranchModal.prototype.onClickSaveBranchButton = function(e) {
    return this.saveBranch(e, {
      deleteSavedChanges: false
    });
  };

  SaveBranchModal.prototype.saveBranch = function(e, arg) {
    var branch, button, component, deleteSavedChanges, i, j, jqxhr, len, len1, name, patches, selectedComponents, selectedSystems, slug, system, toRevert;
    deleteSavedChanges = arg.deleteSavedChanges;
    if (this.selectedBranch) {
      branch = this.selectedBranch;
    } else {
      name = this.$('#new-branch-name-input').val();
      if (!name) {
        return noty({
          text: 'Name required',
          layout: 'topCenter',
          type: 'error',
          killer: false
        });
      }
      slug = _.string.slugify(name);
      if (this.branches.findWhere({
        slug: slug
      })) {
        return noty({
          text: 'Name taken',
          layout: 'topCenter',
          type: 'error',
          killer: false
        });
      }
      branch = new Branch({
        name: name
      });
    }
    patches = [];
    toRevert = [];
    selectedComponents = _.map(this.$('.component-checkbox:checked'), (function(_this) {
      return function(checkbox) {
        return _this.componentsWithChanges.get($(checkbox).data('component-id'));
      };
    })(this));
    for (i = 0, len = selectedComponents.length; i < len; i++) {
      component = selectedComponents[i];
      patches.push(component.makePatch().toJSON());
      toRevert.push(component);
    }
    selectedSystems = _.map(this.$('.system-checkbox:checked'), (function(_this) {
      return function(checkbox) {
        return _this.systemsWithChanges.get($(checkbox).data('system-id'));
      };
    })(this));
    for (j = 0, len1 = selectedSystems.length; j < len1; j++) {
      system = selectedSystems[j];
      patches.push(system.makePatch().toJSON());
      toRevert.push(system);
    }
    branch.set({
      patches: patches
    });
    jqxhr = branch.save();
    button = $(e.currentTarget);
    if (!jqxhr) {
      return button.text('Save Failed (validation error)');
    }
    button.attr('disabled', true).text('Saving...');
    return Promise.resolve(jqxhr).then((function(_this) {
      return function() {
        var k, len2, model;
        if (deleteSavedChanges) {
          for (k = 0, len2 = toRevert.length; k < len2; k++) {
            model = toRevert[k];
            model.revert();
          }
        }
        return _this.hide();
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        button.attr('disabled', false).text('Save Failed (network/runtime error)');
        throw e;
      };
    })(this));
  };

  SaveBranchModal.prototype.onClickDeleteBranchButton = function(e) {
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

  return SaveBranchModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/modals/SaveBranchModal.js.map