require.register("views/i18n/I18NEditModelView", function(exports, require, module) {
var I18NEditModelView, Patch, PatchModal, Patches, RootView, UNSAVED_CHANGES_MESSAGE, ace, deltasLib, locale, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

locale = require('locale/locale');

Patch = require('models/Patch');

Patches = require('collections/Patches');

PatchModal = require('views/editor/PatchModal');

template = require('templates/i18n/i18n-edit-model-view');

deltasLib = require('core/deltas');

ace = require('ace');


/*
  This view is the superclass for all views which Diplomats use to submit translations
  for database documents. They all work mostly the same, except they each set their
  `@modelClass` which is a patchable Backbone model class, and they use `@wrapRow()`
  to dynamically specify which properties are being translated.
 */

UNSAVED_CHANGES_MESSAGE = 'You have unsaved changes! Really discard them?';

module.exports = I18NEditModelView = (function(superClass) {
  extend(I18NEditModelView, superClass);

  I18NEditModelView.prototype.className = 'editor i18n-edit-model-view';

  I18NEditModelView.prototype.template = template;

  I18NEditModelView.prototype.events = {
    'input .translation-input': 'onInputChanged',
    'change #language-select': 'onLanguageSelectChanged',
    'click #patch-submit': 'onSubmitPatch',
    'click .open-patch-link': 'onClickOpenPatchLink'
  };

  function I18NEditModelView(options, modelHandle) {
    this.modelHandle = modelHandle;
    this.onEditorChange = bind(this.onEditorChange, this);
    I18NEditModelView.__super__.constructor.call(this, options);
    this.model = new this.modelClass({
      _id: this.modelHandle
    });
    this.supermodel.trackRequest(this.model.fetch());
    this.patches = new Patches();
    this.listenTo(this.patches, 'change', function() {
      return this.renderSelectors('#patches-col');
    });
    this.patches.comparator = '_id';
    this.supermodel.trackRequest(this.patches.fetchMineFor(this.model));
    this.selectedLanguage = me.get('preferredLanguage', true);
    this.madeChanges = false;
  }

  I18NEditModelView.prototype.showLoading = function($el) {
    if ($el == null) {
      $el = this.$el.find('.outer-content');
    }
    return I18NEditModelView.__super__.showLoading.call(this, $el);
  };

  I18NEditModelView.prototype.onLoaded = function() {
    I18NEditModelView.__super__.onLoaded.call(this);
    return this.originalModel = this.model.clone();
  };

  I18NEditModelView.prototype.getRenderData = function() {
    var c, i, index, len, ref, result;
    c = I18NEditModelView.__super__.getRenderData.call(this);
    c.model = this.model;
    c.selectedLanguage = this.selectedLanguage;
    this.translationList = [];
    if (this.supermodel.finished()) {
      this.buildTranslationList();
    } else {
      [];
    }
    ref = this.translationList;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      result = ref[index];
      result.index = index;
    }
    c.translationList = this.translationList;
    return c;
  };

  I18NEditModelView.prototype.afterRender = function() {
    var $select, editor, editors, i, len, results, session;
    I18NEditModelView.__super__.afterRender.call(this);
    this.ignoreLanguageSelectChanges = true;
    $select = this.$el.find('#language-select').empty();
    this.addLanguagesToSelect($select, this.selectedLanguage);
    this.$el.find('option[value="en-US"]').remove();
    this.ignoreLanguageSelectChanges = false;
    editors = [];
    this.$el.find('tr[data-format="markdown"]').each((function(_this) {
      return function(index, el) {
        var enEl, englishEditor, foundEnEl, foundToEl, toEditor, toEl;
        foundEnEl = enEl = $(el).find('.english-value-row div')[0];
        if (foundEnEl != null) {
          englishEditor = ace.edit(foundEnEl);
          englishEditor.el = enEl;
          englishEditor.setReadOnly(true);
          editors.push(englishEditor);
        }
        foundToEl = toEl = $(el).find('.to-value-row div')[0];
        if (foundToEl != null) {
          toEditor = ace.edit(foundToEl);
          toEditor.el = toEl;
          toEditor.on('change', _this.onEditorChange);
          return editors.push(toEditor);
        }
      };
    })(this));
    results = [];
    for (i = 0, len = editors.length; i < len; i++) {
      editor = editors[i];
      session = editor.getSession();
      session.setTabSize(2);
      session.setMode('ace/mode/markdown');
      session.setNewLineMode = 'unix';
      session.setUseSoftTabs(true);
      results.push(editor.setOptions({
        maxLines: Infinity
      }));
    }
    return results;
  };

  I18NEditModelView.prototype.onEditorChange = function(event, editor) {
    var index, rowInfo, value;
    if (this.destroyed) {
      return;
    }
    index = $(editor.el).data('index');
    rowInfo = this.translationList[index];
    value = editor.getValue();
    return this.onTranslationChanged(rowInfo, value);
  };

  I18NEditModelView.prototype.wrapRow = function(title, key, enValue, toValue, path, format) {
    return this.translationList.push({
      title: title,
      key: key,
      enValue: enValue,
      toValue: toValue || '',
      path: path,
      format: format
    });
  };

  I18NEditModelView.prototype.buildTranslationList = function() {
    return [];
  };

  I18NEditModelView.prototype.onInputChanged = function(e) {
    var index, rowInfo, value;
    index = $(e.target).data('index');
    rowInfo = this.translationList[index];
    value = $(e.target).val();
    return this.onTranslationChanged(rowInfo, value);
  };

  I18NEditModelView.prototype.onTranslationChanged = function(rowInfo, value) {
    var base, i, j, len, len1, name, ref, ref1, seg;
    base = this.model.attributes;
    ref = rowInfo.path;
    for (i = 0, len = ref.length; i < len; i++) {
      seg = ref[i];
      base = base[seg];
    }
    base = base.i18n;
    if (base[name = this.selectedLanguage] == null) {
      base[name] = {};
    }
    base = base[this.selectedLanguage];
    if (rowInfo.key.length > 1) {
      ref1 = rowInfo.key.slice(0, -1);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        seg = ref1[j];
        if (base[seg] == null) {
          base[seg] = {};
        }
        base = base[seg];
      }
    }
    base[rowInfo.key[rowInfo.key.length - 1]] = value;
    this.model.saveBackup();
    this.$el.find('#patch-submit').attr('disabled', null);
    return this.madeChanges = true;
  };

  I18NEditModelView.prototype.onLanguageSelectChanged = function(e) {
    if (this.ignoreLanguageSelectChanges) {
      return;
    }
    if (this.madeChanges) {
      if (!confirm(UNSAVED_CHANGES_MESSAGE)) {
        return;
      }
    }
    this.selectedLanguage = $(e.target).val();
    if (this.selectedLanguage) {
      me.set('preferredLanguage', this.selectedLanguage);
      me.patch();
    }
    this.madeChanges = false;
    this.model.set(this.originalModel.clone().attributes);
    return this.render();
  };

  I18NEditModelView.prototype.onClickOpenPatchLink = function(e) {
    var modal, patch, patchID;
    patchID = $(e.currentTarget).data('patch-id');
    patch = this.patches.get(patchID);
    modal = new PatchModal(patch, this.model);
    return this.openModalView(modal);
  };

  I18NEditModelView.prototype.onLeaveMessage = function() {
    if (this.madeChanges) {
      return UNSAVED_CHANGES_MESSAGE;
    }
  };

  I18NEditModelView.prototype.onSubmitPatch = function(e) {
    var button, collection, delta, errors, flattened, patch, res;
    delta = this.originalModel.getDeltaWith(this.model);
    flattened = deltasLib.flattenDelta(delta);
    collection = _.string.underscored(this.model.constructor.className);
    patch = new Patch({
      delta: delta,
      target: {
        collection: collection,
        'id': this.model.id
      },
      commitMessage: "Diplomat submission for lang " + this.selectedLanguage + ": " + flattened.length + " change(s)."
    });
    errors = patch.validate();
    button = $(e.target);
    button.attr('disabled', 'disabled');
    if (!delta) {
      return button.text('No changes submitted, did not save patch.');
    }
    if (errors) {
      return button.text('Failed to Submit Changes');
    }
    res = patch.save(null, {
      url: _.result(this.model, 'url') + '/patch'
    });
    if (!res) {
      return button.text('Failed to Submit Changes');
    }
    button.text('Submitting...');
    return Promise.resolve(res).then((function(_this) {
      return function() {
        _this.madeChanges = false;
        _this.patches.add(patch);
        _this.renderSelectors('#patches-col');
        return button.text('Submit Changes');
      };
    })(this))["catch"]((function(_this) {
      return function() {
        button.text('Error Submitting Changes');
        return _this.$el.find('#patch-submit').attr('disabled', null);
      };
    })(this));
  };

  return I18NEditModelView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/i18n/I18NEditModelView.js.map