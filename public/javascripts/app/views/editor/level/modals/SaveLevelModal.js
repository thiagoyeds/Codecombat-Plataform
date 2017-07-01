require.register("views/editor/level/modals/SaveLevelModal", function(exports, require, module) {
var DeltaView, LevelComponent, LevelSystem, PatchModal, SaveLevelModal, SaveVersionModal, SuperModel, VerifierTest, deltasLib, forms, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

template = require('templates/editor/level/save-level-modal');

forms = require('core/forms');

LevelComponent = require('models/LevelComponent');

LevelSystem = require('models/LevelSystem');

DeltaView = require('views/editor/DeltaView');

PatchModal = require('views/editor/PatchModal');

deltasLib = require('core/deltas');

VerifierTest = require('views/editor/verifier/VerifierTest');

SuperModel = require('models/SuperModel');

module.exports = SaveLevelModal = (function(superClass) {
  extend(SaveLevelModal, superClass);

  SaveLevelModal.prototype.template = template;

  SaveLevelModal.prototype.instant = false;

  SaveLevelModal.prototype.modalWidthPercent = 60;

  SaveLevelModal.prototype.plain = true;

  SaveLevelModal.prototype.events = {
    'click #save-version-button': 'commitLevel',
    'submit form': 'commitLevel'
  };

  function SaveLevelModal(options) {
    this.onVerifierTestUpate = bind(this.onVerifierTestUpate, this);
    SaveLevelModal.__super__.constructor.call(this, options);
    this.level = options.level;
    this.buildTime = options.buildTime;
  }

  SaveLevelModal.prototype.getRenderData = function(context) {
    if (context == null) {
      context = {};
    }
    context = SaveLevelModal.__super__.getRenderData.call(this, context);
    context.level = this.level;
    context.levelNeedsSave = this.level.hasLocalChanges();
    context.modifiedComponents = _.filter(this.supermodel.getModels(LevelComponent), this.shouldSaveEntity);
    context.modifiedSystems = _.filter(this.supermodel.getModels(LevelSystem), this.shouldSaveEntity);
    this.hasChanges = context.levelNeedsSave || context.modifiedComponents.length || context.modifiedSystems.length;
    this.lastContext = context;
    return context;
  };

  SaveLevelModal.prototype.afterRender = function() {
    var changeEl, changeEls, deltaView, e, error1, i, j, len, m, model, models;
    SaveLevelModal.__super__.afterRender.call(this, false);
    changeEls = this.$el.find('.changes-stub');
    models = this.lastContext.levelNeedsSave ? [this.level] : [];
    models = models.concat(this.lastContext.modifiedComponents);
    models = models.concat(this.lastContext.modifiedSystems);
    models = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = models.length; j < len; j++) {
        m = models[j];
        if (m.hasWriteAccess()) {
          results.push(m);
        }
      }
      return results;
    })();
    for (i = j = 0, len = changeEls.length; j < len; i = ++j) {
      changeEl = changeEls[i];
      model = models[i];
      try {
        deltaView = new DeltaView({
          model: model,
          skipPaths: deltasLib.DOC_SKIP_PATHS
        });
        this.insertSubView(deltaView, $(changeEl));
      } catch (error1) {
        e = error1;
        console.error('Couldn\'t create delta view:', e);
      }
    }
    if (me.isAdmin()) {
      return this.verify();
    }
  };

  SaveLevelModal.prototype.shouldSaveEntity = function(m) {
    if (!m.hasWriteAccess()) {
      return false;
    }
    if (m.get('system') === 'ai' && m.get('name') === 'Jitters' && m.type() === 'LevelComponent') {
      console.log("Should we save", m.get('system'), m.get('name'), m, "? localChanges:", m.hasLocalChanges(), "version:", m.get('version'), 'isPublished:', m.isPublished(), 'collection:', m.collection);
      return false;
    }
    if (m.hasLocalChanges()) {
      return true;
    }
    if (!m.get('version')) {
      console.error("Trying to check major version of " + (m.type()) + " " + (m.get('name')) + ", but it doesn't have a version:", m);
    }
    if ((m.get('version').major === 0 && m.get('version').minor === 0) || !m.isPublished() && !m.collection) {
      return true;
    }
    return false;
  };

  SaveLevelModal.prototype.commitLevel = function(e) {
    var error, errors, field, fields, form, formsToSave, isLevelForm, j, k, kind, klass, l, len, len1, len2, len3, messages, model, modelsToSave, n, newModel, ref, ref1, ref2, ref3, res, results, tuples;
    e.preventDefault();
    this.level.set('buildTime', this.buildTime);
    modelsToSave = [];
    formsToSave = [];
    ref = this.$el.find('form');
    for (j = 0, len = ref.length; j < len; j++) {
      form = ref[j];
      fields = {};
      ref1 = $(form).serializeArray();
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        field = ref1[k];
        fields[field.name] = field.value === 'on' ? true : field.value;
      }
      isLevelForm = $(form).attr('id') === 'save-level-form';
      if (isLevelForm) {
        model = this.level;
      } else {
        ref2 = $(form).hasClass('component-form') ? ['component', LevelComponent] : ['system', LevelSystem], kind = ref2[0], klass = ref2[1];
        model = this.supermodel.getModelByOriginalAndMajorVersion(klass, fields[kind + "-original"], parseInt(fields[kind + "-parent-major-version"], 10));
        if (!model) {
          console.log('Couldn\'t find model for', kind, fields, 'from', this.supermodel.models);
        }
      }
      newModel = fields.major ? model.cloneNewMajorVersion() : model.cloneNewMinorVersion();
      newModel.set('commitMessage', fields['commit-message']);
      modelsToSave.push(newModel);
      if (isLevelForm) {
        this.level = newModel;
        if (fields['publish'] && !this.level.isPublished()) {
          this.level.publish();
        }
      } else if (this.level.isPublished() && !newModel.isPublished()) {
        newModel.publish();
      }
      formsToSave.push(form);
    }
    for (l = 0, len2 = modelsToSave.length; l < len2; l++) {
      model = modelsToSave[l];
      if (errors = model.getValidationErrors()) {
        messages = (function() {
          var len3, n, results;
          results = [];
          for (n = 0, len3 = errors.length; n < len3; n++) {
            error = errors[n];
            results.push("\t " + error.dataPath + ": " + error.message);
          }
          return results;
        })();
        messages = messages.join('<br />');
        this.$el.find('#errors-wrapper .errors').html(messages);
        this.$el.find('#errors-wrapper').removeClass('hide');
        return;
      }
    }
    this.showLoading();
    tuples = _.zip(modelsToSave, formsToSave);
    results = [];
    for (n = 0, len3 = tuples.length; n < len3; n++) {
      ref3 = tuples[n], newModel = ref3[0], form = ref3[1];
      if (newModel.get('i18nCoverage')) {
        newModel.updateI18NCoverage();
      }
      res = newModel.save(null, {
        type: 'POST'
      });
      results.push((function(_this) {
        return function(newModel, form) {
          res.error(function() {
            _this.hideLoading();
            console.log('Got errors:', JSON.parse(res.responseText));
            return forms.applyErrorsToForm($(form), JSON.parse(res.responseText));
          });
          return res.success(function() {
            var oldModel, url;
            modelsToSave = _.without(modelsToSave, newModel);
            oldModel = _.find(_this.supermodel.models, function(m) {
              return m.get('original') === newModel.get('original');
            });
            oldModel.clearBackup();
            if (!modelsToSave.length) {
              url = "/editor/level/" + (_this.level.get('slug') || _this.level.id);
              document.location.href = url;
              return _this.hide();
            }
          });
        };
      })(this)(newModel, form));
    }
    return results;
  };

  SaveLevelModal.prototype.verify = function() {
    var childSupermodel, j, len, results, solution, solutions, test;
    if (!((solutions = this.level.getSolutions()) && solutions.length)) {
      return this.$('#verifier-stub').hide();
    }
    this.running = this.problems = this.failed = this.passedExceptFrames = this.passed = 0;
    this.waiting = solutions.length;
    this.renderSelectors('#verifier-tests');
    results = [];
    for (j = 0, len = solutions.length; j < len; j++) {
      solution = solutions[j];
      childSupermodel = new SuperModel();
      childSupermodel.models = _.clone(this.supermodel.models);
      childSupermodel.collections = _.clone(this.supermodel.collections);
      results.push(test = new VerifierTest(this.level.get('slug'), this.onVerifierTestUpate, childSupermodel, solution.language, {
        devMode: true
      }));
    }
    return results;
  };

  SaveLevelModal.prototype.onVerifierTestUpate = function(e) {
    var ref;
    if (this.destroyed) {
      return;
    }
    if (e.state === 'running') {
      --this.waiting;
      ++this.running;
    } else if ((ref = e.state) === 'complete' || ref === 'error' || ref === 'no-solution') {
      --this.running;
      if (e.state === 'complete') {
        if (e.test.isSuccessful(true)) {
          ++this.passed;
        } else if (e.test.isSuccessful(false)) {
          ++this.passedExceptFrames;
        } else {
          ++this.failed;
        }
      } else if (e.state === 'no-solution') {
        console.warn('Solution problem for', e.test.language);
        ++this.problems;
      } else {
        ++this.problems;
      }
    }
    return this.renderSelectors('#verifier-tests');
  };

  return SaveLevelModal;

})(SaveVersionModal);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/modals/SaveLevelModal.js.map