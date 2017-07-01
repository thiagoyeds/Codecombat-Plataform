require.register("views/admin/FilesView", function(exports, require, module) {
var FilesView, RootView, tableTemplate, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/admin/files');

tableTemplate = require('templates/admin/files_table');

module.exports = FilesView = (function(superClass) {
  extend(FilesView, superClass);

  function FilesView() {
    this.onLoadedFiles = bind(this.onLoadedFiles, this);
    this.onFileUploaded = bind(this.onFileUploaded, this);
    this.onFileChosen = bind(this.onFileChosen, this);
    return FilesView.__super__.constructor.apply(this, arguments);
  }

  FilesView.prototype.id = 'admin-files-view';

  FilesView.prototype.template = template;

  FilesView.prototype.events = {
    'click #upload-button': function() {
      return filepicker.pick({
        mimetypes: 'audio/*'
      }, this.onFileChosen);
    },
    'change #folder-select': 'loadFiles'
  };

  FilesView.prototype.afterRender = function() {
    FilesView.__super__.afterRender.call(this);
    require('core/services/filepicker')();
    return this.loadFiles();
  };

  FilesView.prototype.onFileChosen = function(InkBlob) {
    var body;
    body = {
      url: InkBlob.url,
      filename: InkBlob.filename,
      mimetype: InkBlob.mimetype,
      path: this.currentFolder(),
      force: true
    };
    this.uploadingPath = [this.currentFolder(), InkBlob.filename].join('/');
    return $.ajax('/file', {
      type: 'POST',
      data: body,
      success: this.onFileUploaded
    });
  };

  FilesView.prototype.onFileUploaded = function(e) {
    return this.loadFiles();
  };

  FilesView.prototype.currentFolder = function() {
    return this.$el.find('#folder-select').val();
  };

  FilesView.prototype.loadFiles = function() {
    return $.ajax({
      url: "/file/" + (this.currentFolder()) + "/",
      success: this.onLoadedFiles,
      cache: false
    });
  };

  FilesView.prototype.onLoadedFiles = function(res) {
    var table;
    table = tableTemplate({
      files: res
    });
    return this.$el.find('#file-table').replaceWith(table);
  };

  return FilesView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/FilesView.js.map