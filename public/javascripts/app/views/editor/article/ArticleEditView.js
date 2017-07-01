require.register("views/editor/article/ArticleEditView", function(exports, require, module) {
var Article, ArticleEditView, PatchesView, RootView, SaveVersionModal, VersionHistoryView, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

VersionHistoryView = require('./ArticleVersionsModal');

template = require('templates/editor/article/edit');

Article = require('models/Article');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

PatchesView = require('views/editor/PatchesView');

require('views/modal/RevertModal');

require('vendor/treema');

require('game-libraries');

module.exports = ArticleEditView = (function(superClass) {
  extend(ArticleEditView, superClass);

  ArticleEditView.prototype.id = 'editor-article-edit-view';

  ArticleEditView.prototype.template = template;

  ArticleEditView.prototype.events = {
    'click #preview-button': 'openPreview',
    'click #history-button': 'showVersionHistory',
    'click #save-button': 'openSaveModal'
  };

  function ArticleEditView(options, articleID) {
    this.articleID = articleID;
    this.pushChangesToPreview = bind(this.pushChangesToPreview, this);
    ArticleEditView.__super__.constructor.call(this, options);
    this.article = new Article({
      _id: this.articleID
    });
    this.article.saveBackups = true;
    this.supermodel.loadModel(this.article);
    this.pushChangesToPreview = _.throttle(this.pushChangesToPreview, 500);
  }

  ArticleEditView.prototype.onLoaded = function() {
    ArticleEditView.__super__.onLoaded.call(this);
    this.buildTreema();
    return this.listenTo(this.article, 'change', (function(_this) {
      return function() {
        _this.article.updateI18NCoverage();
        return _this.treema.set('/', _this.article.attributes);
      };
    })(this));
  };

  ArticleEditView.prototype.buildTreema = function() {
    var data, options;
    if ((this.treema != null) || (!this.article.loaded)) {
      return;
    }
    if (!this.article.attributes.body) {
      this.article.set('body', '');
    }
    data = $.extend(true, {}, this.article.attributes);
    options = {
      data: data,
      filePath: "db/thang.type/" + (this.article.get('original')),
      schema: Article.schema,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.pushChangesToPreview
      }
    };
    this.treema = this.$el.find('#article-treema').treema(options);
    return this.treema.build();
  };

  ArticleEditView.prototype.pushChangesToPreview = function() {
    var b, id, key, m, onLoadHandler, ref, value;
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.article.set(key, value);
    }
    if (!(this.treema && this.preview)) {
      return;
    }
    m = marked(this.treema.data.body);
    b = $(this.preview.document.body);
    onLoadHandler = (function(_this) {
      return function() {
        if (b.find('#insert').length === 1) {
          b.find('#insert').html(m);
          b.find('#title').text(_this.treema.data.name);
          return clearInterval(id);
        }
      };
    })(this);
    return id = setInterval(onLoadHandler, 100);
  };

  ArticleEditView.prototype.afterRender = function() {
    ArticleEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    this.patchesView = this.insertSubView(new PatchesView(this.article), this.$el.find('.patches-view'));
    return this.patchesView.load();
  };

  ArticleEditView.prototype.openPreview = function() {
    if (!this.preview || this.preview.closed) {
      this.preview = window.open('/editor/article/preview', 'preview', 'height=800,width=600');
    }
    if (window.focus) {
      this.preview.focus();
    }
    this.preview.onload = (function(_this) {
      return function() {
        return _this.pushChangesToPreview();
      };
    })(this);
    return false;
  };

  ArticleEditView.prototype.openSaveModal = function() {
    var modal;
    modal = new SaveVersionModal({
      model: this.article,
      noNewMajorVersions: true
    });
    this.openModalView(modal);
    this.listenToOnce(modal, 'save-new-version', this.saveNewArticle);
    return this.listenToOnce(modal, 'hidden', function() {
      return this.stopListening(modal);
    });
  };

  ArticleEditView.prototype.saveNewArticle = function(e) {
    var key, modal, ref, res, value;
    this.treema.endExistingEdits();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.article.set(key, value);
    }
    this.article.set('commitMessage', e.commitMessage);
    res = this.article.saveNewMinorVersion();
    if (!res) {
      return;
    }
    modal = this.$el.find('#save-version-modal');
    this.enableModalInProgress(modal);
    res.error((function(_this) {
      return function() {
        return _this.disableModalInProgress(modal);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        var url;
        _this.article.clearBackup();
        modal.modal('hide');
        url = "/editor/article/" + (_this.article.get('slug') || _this.article.id);
        return document.location.href = url;
      };
    })(this));
  };

  ArticleEditView.prototype.showVersionHistory = function(e) {
    var versionHistoryView;
    versionHistoryView = new VersionHistoryView({
      article: this.article
    }, this.articleID);
    this.openModalView(versionHistoryView);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  return ArticleEditView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/article/ArticleEditView.js.map