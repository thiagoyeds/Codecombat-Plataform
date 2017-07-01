require.register("views/editor/level/components/LevelComponentEditView", function(exports, require, module) {
var CocoView, ComponentVersionsModal, LevelComponent, LevelComponentEditView, PatchesView, SaveVersionModal, ace, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/component/level-component-edit-view');

LevelComponent = require('models/LevelComponent');

ComponentVersionsModal = require('views/editor/component/ComponentVersionsModal');

PatchesView = require('views/editor/PatchesView');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

ace = require('ace');

require('vendor/treema');

module.exports = LevelComponentEditView = (function(superClass) {
  extend(LevelComponentEditView, superClass);

  LevelComponentEditView.prototype.id = 'level-component-edit-view';

  LevelComponentEditView.prototype.template = template;

  LevelComponentEditView.prototype.editableSettings = ['name', 'description', 'system', 'codeLanguage', 'dependencies', 'propertyDocumentation', 'i18n'];

  LevelComponentEditView.prototype.events = {
    'click #done-editing-component-button': 'endEditing',
    'click .nav a': function(e) {
      return $(e.target).tab('show');
    },
    'click #component-patches-tab': function() {
      return this.patchesView.load();
    },
    'click #component-code-tab': 'buildCodeEditor',
    'click #component-config-schema-tab': 'buildConfigSchemaTreema',
    'click #component-settings-tab': 'buildSettingsTreema',
    'click #component-history-button': 'showVersionHistory',
    'click #patch-component-button': 'startPatchingComponent',
    'click #component-watch-button': 'toggleWatchComponent',
    'click #pop-component-i18n-button': 'onPopulateI18N'
  };

  function LevelComponentEditView(options) {
    this.onEditorChange = bind(this.onEditorChange, this);
    this.onConfigSchemaEdited = bind(this.onConfigSchemaEdited, this);
    this.onComponentSettingsEdited = bind(this.onComponentSettingsEdited, this);
    LevelComponentEditView.__super__.constructor.call(this, options);
    this.levelComponent = this.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, options.original, options.majorVersion || 0);
    if (!this.levelComponent) {
      console.log('Couldn\'t get levelComponent for', options, 'from', this.supermodel.models);
    }
    this.onEditorChange = _.debounce(this.onEditorChange, 1000);
  }

  LevelComponentEditView.prototype.getRenderData = function(context) {
    if (context == null) {
      context = {};
    }
    context = LevelComponentEditView.__super__.getRenderData.call(this, context);
    context.editTitle = (this.levelComponent.get('system')) + "." + (this.levelComponent.get('name'));
    context.component = this.levelComponent;
    return context;
  };

  LevelComponentEditView.prototype.onLoaded = function() {
    return this.render();
  };

  LevelComponentEditView.prototype.afterRender = function() {
    LevelComponentEditView.__super__.afterRender.call(this);
    this.buildSettingsTreema();
    this.buildConfigSchemaTreema();
    this.buildCodeEditor();
    this.patchesView = this.insertSubView(new PatchesView(this.levelComponent), this.$el.find('.patches-view'));
    if (this.levelComponent.watching()) {
      this.$el.find('#component-watch-button').find('> span').toggleClass('secret');
    }
    return this.updatePatchButton();
  };

  LevelComponentEditView.prototype.buildSettingsTreema = function() {
    var data, schema, treemaOptions;
    data = _.pick(this.levelComponent.attributes, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    data = $.extend(true, {}, data);
    schema = _.cloneDeep(LevelComponent.schema);
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
      readonly: me.get('anonymous'),
      callbacks: {
        change: this.onComponentSettingsEdited
      }
    };
    this.componentSettingsTreema = this.$el.find('#edit-component-treema').treema(treemaOptions);
    this.componentSettingsTreema.build();
    return this.componentSettingsTreema.open();
  };

  LevelComponentEditView.prototype.onComponentSettingsEdited = function() {
    var key, ref, value;
    ref = this.componentSettingsTreema.data;
    for (key in ref) {
      value = ref[key];
      if (key !== 'js') {
        this.levelComponent.set(key, value);
      }
    }
    return this.updatePatchButton();
  };

  LevelComponentEditView.prototype.buildConfigSchemaTreema = function() {
    var configSchema, i, len, orderedProperties, prop, propertyNames, treemaOptions;
    configSchema = $.extend(true, {}, this.levelComponent.get('configSchema'));
    if (configSchema.properties) {
      propertyNames = _.keys(configSchema.properties);
      propertyNames.sort();
      orderedProperties = {};
      for (i = 0, len = propertyNames.length; i < len; i++) {
        prop = propertyNames[i];
        orderedProperties[prop] = configSchema.properties[prop];
      }
      configSchema.properties = orderedProperties;
    }
    treemaOptions = {
      supermodel: this.supermodel,
      schema: LevelComponent.schema.properties.configSchema,
      data: configSchema,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.onConfigSchemaEdited
      }
    };
    this.configSchemaTreema = this.$el.find('#config-schema-treema').treema(treemaOptions);
    this.configSchemaTreema.build();
    this.configSchemaTreema.open();
    return this.configSchemaTreema.tv4.addSchema('metaschema', LevelComponent.schema.properties.configSchema);
  };

  LevelComponentEditView.prototype.onConfigSchemaEdited = function() {
    this.levelComponent.set('configSchema', this.configSchemaTreema.data);
    return this.updatePatchButton();
  };

  LevelComponentEditView.prototype.buildCodeEditor = function() {
    var editorEl, session;
    this.destroyAceEditor(this.editor);
    editorEl = $('<div></div>').text(this.levelComponent.get('code')).addClass('inner-editor');
    this.$el.find('#component-code-editor').empty().append(editorEl);
    this.editor = ace.edit(editorEl[0]);
    this.editor.setReadOnly(me.get('anonymous'));
    session = this.editor.getSession();
    session.setMode('ace/mode/coffee');
    session.setTabSize(2);
    session.setNewLineMode = 'unix';
    session.setUseSoftTabs(true);
    return this.editor.on('change', this.onEditorChange);
  };

  LevelComponentEditView.prototype.onEditorChange = function() {
    if (this.destroyed) {
      return;
    }
    this.levelComponent.set('code', this.editor.getValue());
    return this.updatePatchButton();
  };

  LevelComponentEditView.prototype.updatePatchButton = function() {
    return this.$el.find('#patch-component-button').toggle(Boolean(this.levelComponent.hasLocalChanges()));
  };

  LevelComponentEditView.prototype.endEditing = function(e) {
    Backbone.Mediator.publish('editor:level-component-editing-ended', {
      component: this.levelComponent
    });
    return null;
  };

  LevelComponentEditView.prototype.showVersionHistory = function(e) {
    var componentVersionsModal;
    componentVersionsModal = new ComponentVersionsModal({}, this.levelComponent.id);
    this.openModalView(componentVersionsModal);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelComponentEditView.prototype.startPatchingComponent = function(e) {
    this.openModalView(new SaveVersionModal({
      model: this.levelComponent
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelComponentEditView.prototype.toggleWatchComponent = function() {
    var button;
    button = this.$el.find('#component-watch-button');
    this.levelComponent.watch(button.find('.watch').is(':visible'));
    return button.find('> span').toggleClass('secret');
  };

  LevelComponentEditView.prototype.onPopulateI18N = function() {
    this.levelComponent.populateI18N();
    return this.render();
  };

  LevelComponentEditView.prototype.destroy = function() {
    var ref, ref1;
    this.destroyAceEditor(this.editor);
    if ((ref = this.componentSettingsTreema) != null) {
      ref.destroy();
    }
    if ((ref1 = this.configSchemaTreema) != null) {
      ref1.destroy();
    }
    return LevelComponentEditView.__super__.destroy.call(this);
  };

  return LevelComponentEditView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/components/LevelComponentEditView.js.map