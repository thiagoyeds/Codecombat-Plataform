require.register("views/editor/level/systems/LevelSystemEditView", function(exports, require, module) {
var CocoView, LevelSystem, LevelSystemEditView, PatchesView, SaveVersionModal, SystemVersionsModal, ace, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/system/level-system-edit-view');

LevelSystem = require('models/LevelSystem');

SystemVersionsModal = require('views/editor/level/systems/SystemVersionsModal');

PatchesView = require('views/editor/PatchesView');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

ace = require('ace');

require('vendor/treema');

module.exports = LevelSystemEditView = (function(superClass) {
  extend(LevelSystemEditView, superClass);

  LevelSystemEditView.prototype.id = 'level-system-edit-view';

  LevelSystemEditView.prototype.template = template;

  LevelSystemEditView.prototype.editableSettings = ['name', 'description', 'codeLanguage', 'dependencies', 'propertyDocumentation', 'i18n'];

  LevelSystemEditView.prototype.events = {
    'click #done-editing-system-button': 'endEditing',
    'click .nav a': function(e) {
      return $(e.target).tab('show');
    },
    'click #system-patches-tab': function() {
      return this.patchesView.load();
    },
    'click #system-code-tab': 'buildCodeEditor',
    'click #system-config-schema-tab': 'buildConfigSchemaTreema',
    'click #system-settings-tab': 'buildSettingsTreema',
    'click #system-history-button': 'showVersionHistory',
    'click #patch-system-button': 'startPatchingSystem',
    'click #system-watch-button': 'toggleWatchSystem'
  };

  function LevelSystemEditView(options) {
    this.onEditorChange = bind(this.onEditorChange, this);
    this.onConfigSchemaEdited = bind(this.onConfigSchemaEdited, this);
    this.onSystemSettingsEdited = bind(this.onSystemSettingsEdited, this);
    LevelSystemEditView.__super__.constructor.call(this, options);
    this.levelSystem = this.supermodel.getModelByOriginalAndMajorVersion(LevelSystem, options.original, options.majorVersion || 0);
    if (!this.levelSystem) {
      console.log('Couldn\'t get levelSystem for', options, 'from', this.supermodel.models);
    }
  }

  LevelSystemEditView.prototype.afterRender = function() {
    LevelSystemEditView.__super__.afterRender.call(this);
    this.buildSettingsTreema();
    this.buildConfigSchemaTreema();
    this.buildCodeEditor();
    this.patchesView = this.insertSubView(new PatchesView(this.levelSystem), this.$el.find('.patches-view'));
    return this.updatePatchButton();
  };

  LevelSystemEditView.prototype.buildSettingsTreema = function() {
    var data, schema, treemaOptions;
    data = _.pick(this.levelSystem.attributes, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    schema = _.cloneDeep(LevelSystem.schema);
    schema.properties = _.pick(schema.properties, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    schema.required = _.intersection(schema.required, this.editableSettings);
    schema["default"] = _.pick(schema["default"], (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    treemaOptions = {
      supermodel: this.supermodel,
      schema: schema,
      data: data,
      callbacks: {
        change: this.onSystemSettingsEdited
      }
    };
    treemaOptions.readOnly = me.get('anonymous');
    this.systemSettingsTreema = this.$el.find('#edit-system-treema').treema(treemaOptions);
    this.systemSettingsTreema.build();
    return this.systemSettingsTreema.open();
  };

  LevelSystemEditView.prototype.onSystemSettingsEdited = function() {
    var key, ref, value;
    ref = this.systemSettingsTreema.data;
    for (key in ref) {
      value = ref[key];
      if (key !== 'js') {
        this.levelSystem.set(key, value);
      }
    }
    return this.updatePatchButton();
  };

  LevelSystemEditView.prototype.buildConfigSchemaTreema = function() {
    var treemaOptions;
    treemaOptions = {
      supermodel: this.supermodel,
      schema: LevelSystem.schema.properties.configSchema,
      data: $.extend(true, {}, this.levelSystem.get('configSchema')),
      callbacks: {
        change: this.onConfigSchemaEdited
      }
    };
    treemaOptions.readOnly = me.get('anonymous');
    this.configSchemaTreema = this.$el.find('#config-schema-treema').treema(treemaOptions);
    this.configSchemaTreema.build();
    this.configSchemaTreema.open();
    return this.configSchemaTreema.tv4.addSchema('metaschema', LevelSystem.schema.properties.configSchema);
  };

  LevelSystemEditView.prototype.onConfigSchemaEdited = function() {
    this.levelSystem.set('configSchema', this.configSchemaTreema.data);
    return this.updatePatchButton();
  };

  LevelSystemEditView.prototype.buildCodeEditor = function() {
    var editorEl, session;
    this.destroyAceEditor(this.editor);
    editorEl = $('<div></div>').text(this.levelSystem.get('code')).addClass('inner-editor');
    this.$el.find('#system-code-editor').empty().append(editorEl);
    this.editor = ace.edit(editorEl[0]);
    this.editor.setReadOnly(me.get('anonymous'));
    session = this.editor.getSession();
    session.setMode('ace/mode/coffee');
    session.setTabSize(2);
    session.setNewLineMode = 'unix';
    session.setUseSoftTabs(true);
    return this.editor.on('change', this.onEditorChange);
  };

  LevelSystemEditView.prototype.onEditorChange = function() {
    this.levelSystem.set('code', this.editor.getValue());
    return this.updatePatchButton();
  };

  LevelSystemEditView.prototype.updatePatchButton = function() {
    return this.$el.find('#patch-system-button').toggle(Boolean(this.levelSystem.hasLocalChanges()));
  };

  LevelSystemEditView.prototype.endEditing = function(e) {
    Backbone.Mediator.publish('editor:level-system-editing-ended', {
      system: this.levelSystem
    });
    return null;
  };

  LevelSystemEditView.prototype.showVersionHistory = function(e) {
    var systemVersionsModal;
    systemVersionsModal = new SystemVersionsModal({}, this.levelSystem.id);
    this.openModalView(systemVersionsModal);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelSystemEditView.prototype.startPatchingSystem = function(e) {
    this.openModalView(new SaveVersionModal({
      model: this.levelSystem
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelSystemEditView.prototype.toggleWatchSystem = function() {
    var button;
    console.log('toggle watch system?');
    button = this.$el.find('#system-watch-button');
    this.levelSystem.watch(button.find('.watch').is(':visible'));
    return button.find('> span').toggleClass('secret');
  };

  LevelSystemEditView.prototype.destroy = function() {
    var ref, ref1;
    this.destroyAceEditor(this.editor);
    if ((ref = this.systemSettingsTreema) != null) {
      ref.destroy();
    }
    if ((ref1 = this.configSchemaTreema) != null) {
      ref1.destroy();
    }
    return LevelSystemEditView.__super__.destroy.call(this);
  };

  return LevelSystemEditView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/systems/LevelSystemEditView.js.map