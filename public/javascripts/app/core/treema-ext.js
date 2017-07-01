require.register("core/treema-ext", function(exports, require, module) {
var CocoCollection, CocoModel, CodeLanguageTreema, CodeLanguagesObjectTreema, CodeTreema, CoffeeTreema, DateTimeTreema, IDReferenceNode, ImageFileTreema, InternationalizationNode, JavaScriptTreema, LatestVersionCollection, LatestVersionOriginalReferenceNode, LatestVersionReferenceNode, LevelComponentReferenceNode, LiveEditingMarkup, SlugPropsObject, SoundFileTreema, TaskTreema, VersionTreema, initializeFilePicker, locale, me, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  slice = [].slice;

CocoModel = require('models/CocoModel');

CocoCollection = require('collections/CocoCollection');

me = require('core/auth').me;

locale = require('locale/locale');

utils = require('core/utils');

initializeFilePicker = function() {
  if (!window.application.isIPadApp) {
    return require('core/services/filepicker')();
  }
};

DateTimeTreema = (function(superClass) {
  extend(DateTimeTreema, superClass);

  function DateTimeTreema() {
    return DateTimeTreema.__super__.constructor.apply(this, arguments);
  }

  DateTimeTreema.prototype.valueClass = 'treema-date-time';

  DateTimeTreema.prototype.buildValueForDisplay = function(el, data) {
    return el.text(moment(data).format('llll'));
  };

  DateTimeTreema.prototype.buildValueForEditing = function(valEl) {
    return this.buildValueForEditingSimply(valEl, null, 'date');
  };

  return DateTimeTreema;

})(TreemaNode.nodeMap.string);

VersionTreema = (function(superClass) {
  extend(VersionTreema, superClass);

  function VersionTreema() {
    return VersionTreema.__super__.constructor.apply(this, arguments);
  }

  VersionTreema.prototype.valueClass = 'treema-version';

  VersionTreema.prototype.buildValueForDisplay = function(valEl, data) {
    return this.buildValueForDisplaySimply(valEl, data.major + "." + data.minor);
  };

  return VersionTreema;

})(TreemaNode);

LiveEditingMarkup = (function(superClass) {
  extend(LiveEditingMarkup, superClass);

  LiveEditingMarkup.prototype.valueClass = 'treema-markdown treema-multiline treema-ace';

  function LiveEditingMarkup() {
    this.togglePreview = bind(this.togglePreview, this);
    this.onFileUploaded = bind(this.onFileUploaded, this);
    this.onFileChosen = bind(this.onFileChosen, this);
    LiveEditingMarkup.__super__.constructor.apply(this, arguments);
    this.workingSchema.aceMode = 'ace/mode/markdown';
    initializeFilePicker();
  }

  LiveEditingMarkup.prototype.initEditor = function(valEl) {
    var buttonRow;
    buttonRow = $('<div class="buttons"></div>');
    valEl.append(buttonRow);
    this.addPreviewToggle(buttonRow);
    this.addImageUpload(buttonRow);
    LiveEditingMarkup.__super__.initEditor.call(this, valEl);
    return valEl.append($('<div class="preview"></div>').hide());
  };

  LiveEditingMarkup.prototype.addImageUpload = function(valEl) {
    if (!(me.isAdmin() || me.isArtisan())) {
      return;
    }
    return valEl.append($('<div class="pick-image-button"></div>').append($('<button>Pick Image</button>').addClass('btn btn-sm btn-primary').click((function(_this) {
      return function() {
        return filepicker.pick(_this.onFileChosen);
      };
    })(this))));
  };

  LiveEditingMarkup.prototype.addPreviewToggle = function(valEl) {
    return valEl.append($('<div class="toggle-preview-button"></div>').append($('<button>Toggle Preview</button>').addClass('btn btn-sm btn-primary').click(this.togglePreview)));
  };

  LiveEditingMarkup.prototype.onFileChosen = function(InkBlob) {
    var body;
    body = {
      url: InkBlob.url,
      filename: InkBlob.filename,
      mimetype: InkBlob.mimetype,
      path: this.settings.filePath,
      force: true
    };
    this.uploadingPath = [this.settings.filePath, InkBlob.filename].join('/');
    return $.ajax('/file', {
      type: 'POST',
      data: body,
      success: this.onFileUploaded
    });
  };

  LiveEditingMarkup.prototype.onFileUploaded = function(e) {
    return this.editor.insert("![" + e.metadata.name + "](/file/" + this.uploadingPath + ")");
  };

  LiveEditingMarkup.prototype.showingPreview = false;

  LiveEditingMarkup.prototype.togglePreview = function() {
    var valEl;
    valEl = this.getValEl();
    if (this.showingPreview) {
      valEl.find('.preview').hide();
      valEl.find('.pick-image-button').show();
      valEl.find('.ace_editor').show();
    } else {
      valEl.find('.preview').html(marked(this.data)).show();
      valEl.find('.pick-image-button').hide();
      valEl.find('.ace_editor').hide();
    }
    return this.showingPreview = !this.showingPreview;
  };

  return LiveEditingMarkup;

})(TreemaNode.nodeMap.ace);

SoundFileTreema = (function(superClass) {
  extend(SoundFileTreema, superClass);

  SoundFileTreema.prototype.valueClass = 'treema-sound-file';

  SoundFileTreema.prototype.editable = false;

  SoundFileTreema.prototype.soundCollection = 'files';

  function SoundFileTreema() {
    this.onFileUploaded = bind(this.onFileUploaded, this);
    this.onFileChosen = bind(this.onFileChosen, this);
    this.stopFile = bind(this.stopFile, this);
    this.playFile = bind(this.playFile, this);
    SoundFileTreema.__super__.constructor.apply(this, arguments);
    initializeFilePicker();
  }

  SoundFileTreema.prototype.onClick = function(e) {
    if ($(e.target).closest('.btn').length) {
      return;
    }
    return SoundFileTreema.__super__.onClick.apply(this, arguments);
  };

  SoundFileTreema.prototype.getFiles = function() {
    var ref;
    return ((ref = this.settings[this.soundCollection]) != null ? ref.models : void 0) || [];
  };

  SoundFileTreema.prototype.buildValueForDisplay = function(valEl, data) {
    var dropdown, dropdownButton, file, filename, files, fullPath, i, len, li, menu, mimetype, mimetypes, name, path, pickButton, playButton, ref, stopButton;
    mimetype = "audio/" + this.keyForParent;
    mimetypes = [mimetype];
    if (mimetype === 'audio/mp3') {
      mimetypes.push('audio/mpeg');
    } else if (mimetype === 'audio/ogg') {
      mimetypes.push('application/ogg');
      mimetypes.push('video/ogg');
    }
    pickButton = $('<a class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-upload"></span></a>').click((function(_this) {
      return function() {
        return filepicker.pick({
          mimetypes: mimetypes
        }, _this.onFileChosen);
      };
    })(this));
    playButton = $('<a class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-play"></span></a>').click(this.playFile);
    stopButton = $('<a class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-stop"></span></a>').click(this.stopFile);
    dropdown = $('<div class="btn-group dropdown"></div>');
    dropdownButton = $('<a></a>').addClass('btn btn-primary btn-xs dropdown-toggle').attr('href', '#').append($('<span class="glyphicon glyphicon-chevron-down"></span>')).dropdown();
    dropdown.append(dropdownButton);
    menu = $('<div class="dropdown-menu"></div>');
    files = this.getFiles();
    for (i = 0, len = files.length; i < len; i++) {
      file = files[i];
      if (ref = file.get('contentType'), indexOf.call(mimetypes, ref) < 0) {
        continue;
      }
      path = file.get('metadata').path;
      filename = file.get('filename');
      fullPath = [path, filename].join('/');
      li = $('<li></li>').data('fullPath', fullPath).text(filename);
      menu.append(li);
    }
    menu.click((function(_this) {
      return function(e) {
        _this.data = $(e.target).data('fullPath') || data;
        return _this.reset();
      };
    })(this));
    dropdown.append(menu);
    valEl.append(pickButton);
    if (data) {
      valEl.append(playButton);
      valEl.append(stopButton);
    }
    valEl.append(dropdown);
    if (data) {
      path = data.split('/');
      name = path[path.length - 1];
      return valEl.append($('<span></span>').text(name));
    }
  };

  SoundFileTreema.prototype.reset = function() {
    this.instance = null;
    this.flushChanges();
    return this.refreshDisplay();
  };

  SoundFileTreema.prototype.playFile = function() {
    var f, registered;
    this.src = "/file/" + (this.getData());
    if (this.instance) {
      return this.instance.play();
    } else {
      createjs.Sound.alternateExtensions = ['mp3', 'ogg'];
      registered = createjs.Sound.registerSound(this.src);
      if (registered === true) {
        return this.instance = createjs.Sound.play(this.src);
      } else {
        f = (function(_this) {
          return function(event) {
            if (event.src === _this.src) {
              _this.instance = createjs.Sound.play(event.src);
            }
            return createjs.Sound.removeEventListener('fileload', f);
          };
        })(this);
        return createjs.Sound.addEventListener('fileload', f);
      }
    }
  };

  SoundFileTreema.prototype.stopFile = function() {
    var ref;
    return (ref = this.instance) != null ? ref.stop() : void 0;
  };

  SoundFileTreema.prototype.onFileChosen = function(InkBlob) {
    var body;
    if (!this.settings.filePath) {
      console.error('Need to specify a filePath for this treema', this.getRoot());
      throw Error('cannot upload file');
    }
    body = {
      url: InkBlob.url,
      filename: InkBlob.filename,
      mimetype: InkBlob.mimetype,
      path: this.settings.filePath,
      force: true
    };
    this.uploadingPath = [this.settings.filePath, InkBlob.filename].join('/');
    return $.ajax('/file', {
      type: 'POST',
      data: body,
      success: this.onFileUploaded
    });
  };

  SoundFileTreema.prototype.onFileUploaded = function(e) {
    this.data = this.uploadingPath;
    return this.reset();
  };

  return SoundFileTreema;

})(TreemaNode.nodeMap.string);

ImageFileTreema = (function(superClass) {
  extend(ImageFileTreema, superClass);

  ImageFileTreema.prototype.valueClass = 'treema-image-file';

  ImageFileTreema.prototype.editable = false;

  function ImageFileTreema() {
    this.onFileUploaded = bind(this.onFileUploaded, this);
    this.onFileChosen = bind(this.onFileChosen, this);
    ImageFileTreema.__super__.constructor.apply(this, arguments);
    initializeFilePicker();
  }

  ImageFileTreema.prototype.onClick = function(e) {
    if ($(e.target).closest('.btn').length) {
      return;
    }
    return ImageFileTreema.__super__.onClick.apply(this, arguments);
  };

  ImageFileTreema.prototype.buildValueForDisplay = function(valEl, data) {
    var mimetype, pickButton;
    mimetype = 'image/*';
    pickButton = $('<a class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-upload"></span> Upload Picture</a>').click((function(_this) {
      return function() {
        return filepicker.pick({
          mimetypes: [mimetype]
        }, _this.onFileChosen);
      };
    })(this));
    valEl.append(pickButton);
    if (data) {
      return valEl.append($('<img />').attr('src', "/file/" + data));
    }
  };

  ImageFileTreema.prototype.onFileChosen = function(InkBlob) {
    var body;
    if (!this.settings.filePath) {
      console.error('Need to specify a filePath for this treema', this.getRoot());
      throw Error('cannot upload file');
    }
    body = {
      url: InkBlob.url,
      filename: InkBlob.filename,
      mimetype: InkBlob.mimetype,
      path: this.settings.filePath,
      force: true
    };
    this.uploadingPath = [this.settings.filePath, InkBlob.filename].join('/');
    return $.ajax('/file', {
      type: 'POST',
      data: body,
      success: this.onFileUploaded
    });
  };

  ImageFileTreema.prototype.onFileUploaded = function(e) {
    this.data = this.uploadingPath;
    this.flushChanges();
    return this.refreshDisplay();
  };

  return ImageFileTreema;

})(TreemaNode.nodeMap.string);

CodeLanguagesObjectTreema = (function(superClass) {
  extend(CodeLanguagesObjectTreema, superClass);

  function CodeLanguagesObjectTreema() {
    return CodeLanguagesObjectTreema.__super__.constructor.apply(this, arguments);
  }

  CodeLanguagesObjectTreema.prototype.childPropertiesAvailable = function() {
    var i, key, len, ref, results;
    ref = _.keys(utils.aceEditModes);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      if ((this.data[key] == null) && !(key === 'javascript' && this.workingSchema.skipJavaScript)) {
        results.push(key);
      }
    }
    return results;
  };

  return CodeLanguagesObjectTreema;

})(TreemaNode.nodeMap.object);

CodeLanguageTreema = (function(superClass) {
  extend(CodeLanguageTreema, superClass);

  function CodeLanguageTreema() {
    return CodeLanguageTreema.__super__.constructor.apply(this, arguments);
  }

  CodeLanguageTreema.prototype.buildValueForEditing = function(valEl, data) {
    CodeLanguageTreema.__super__.buildValueForEditing.call(this, valEl, data);
    valEl.find('input').autocomplete({
      source: _.keys(utils.aceEditModes),
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    return valEl;
  };

  return CodeLanguageTreema;

})(TreemaNode.nodeMap.string);

CodeTreema = (function(superClass) {
  extend(CodeTreema, superClass);

  function CodeTreema() {
    var mode, ref, ref1;
    CodeTreema.__super__.constructor.apply(this, arguments);
    this.workingSchema.aceTabSize = 4;
    if (mode = utils.aceEditModes[this.keyForParent]) {
      this.workingSchema.aceMode = mode;
    }
    if (mode = utils.aceEditModes[(ref = this.parent) != null ? (ref1 = ref.data) != null ? ref1.language : void 0 : void 0]) {
      this.workingSchema.aceMode = mode;
    }
  }

  CodeTreema.prototype.initEditor = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    CodeTreema.__super__.initEditor.apply(this, args);
    return this.editor.setPrintMarginColumn(60);
  };

  return CodeTreema;

})(TreemaNode.nodeMap.ace);

CoffeeTreema = (function(superClass) {
  extend(CoffeeTreema, superClass);

  function CoffeeTreema() {
    CoffeeTreema.__super__.constructor.apply(this, arguments);
    this.workingSchema.aceMode = 'ace/mode/coffee';
    this.workingSchema.aceTabSize = 2;
  }

  return CoffeeTreema;

})(CodeTreema);

JavaScriptTreema = (function(superClass) {
  extend(JavaScriptTreema, superClass);

  function JavaScriptTreema() {
    JavaScriptTreema.__super__.constructor.apply(this, arguments);
    this.workingSchema.aceMode = 'ace/mode/javascript';
    this.workingSchema.aceTabSize = 4;
  }

  return JavaScriptTreema;

})(CodeTreema);

InternationalizationNode = (function(superClass) {
  extend(InternationalizationNode, superClass);

  function InternationalizationNode() {
    return InternationalizationNode.__super__.constructor.apply(this, arguments);
  }

  InternationalizationNode.prototype.findLanguageName = function(languageCode) {
    var ref;
    if (languageCode === '-') {
      return '';
    }
    return ((ref = locale[languageCode]) != null ? ref.nativeDescription : void 0) || (languageCode + " Not Found");
  };

  InternationalizationNode.prototype.getChildren = function() {
    var r, res;
    res = InternationalizationNode.__super__.getChildren.apply(this, arguments);
    res = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = res.length; i < len; i++) {
        r = res[i];
        if (r[0] !== '-') {
          results.push(r);
        }
      }
      return results;
    })();
    return res;
  };

  InternationalizationNode.prototype.populateData = function() {
    InternationalizationNode.__super__.populateData.call(this);
    if (Object.keys(this.data).length === 0) {
      return this.data['-'] = {
        '-': '-'
      };
    }
  };

  InternationalizationNode.prototype.getChildSchema = function(key) {
    var _, extraSchema, extraSchemas, i, i18nChildSchema, i18nProperty, j, k, len, len1, len2, parentSchemaProperties, prop, ref, ref1, ref2, ref3, ref4, ref5, schema;
    i18nChildSchema = {
      title: this.findLanguageName(key),
      type: 'object',
      properties: {}
    };
    if (!this.parent) {
      return i18nChildSchema;
    }
    if (this.workingSchema.props == null) {
      console.warn('i18n props array is empty! Filling with all parent properties by default');
      this.workingSchema.props = (function() {
        var ref, results;
        ref = this.parent.schema.properties;
        results = [];
        for (prop in ref) {
          _ = ref[prop];
          if (prop !== 'i18n') {
            results.push(prop);
          }
        }
        return results;
      }).call(this);
    }
    ref = this.workingSchema.props;
    for (i = 0, len = ref.length; i < len; i++) {
      i18nProperty = ref[i];
      parentSchemaProperties = (ref1 = this.parent.schema.properties) != null ? ref1 : {};
      ref2 = [this.parent.schema.oneOf, this.parent.schema.anyOf];
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        extraSchemas = ref2[j];
        ref3 = extraSchemas != null ? extraSchemas : [];
        for (k = 0, len2 = ref3.length; k < len2; k++) {
          extraSchema = ref3[k];
          ref5 = (ref4 = extraSchema != null ? extraSchema.properties : void 0) != null ? ref4 : {};
          for (prop in ref5) {
            schema = ref5[prop];
            if (parentSchemaProperties[prop] == null) {
              parentSchemaProperties[prop] = schema;
            }
          }
        }
      }
      i18nChildSchema.properties[i18nProperty] = parentSchemaProperties[i18nProperty];
    }
    return i18nChildSchema;
  };

  InternationalizationNode.prototype.childPropertiesAvailable = function() {
    var i, key, len, ref, results;
    ref = _.keys(locale);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      if (this.data[key] == null) {
        results.push(key);
      }
    }
    return results;
  };

  return InternationalizationNode;

})(TreemaNode.nodeMap.object);

LatestVersionCollection = (function(superClass) {
  extend(LatestVersionCollection, superClass);

  function LatestVersionCollection() {
    return LatestVersionCollection.__super__.constructor.apply(this, arguments);
  }

  return LatestVersionCollection;

})(CocoCollection);

module.exports.LatestVersionReferenceNode = LatestVersionReferenceNode = (function(superClass) {
  extend(LatestVersionReferenceNode, superClass);

  LatestVersionReferenceNode.prototype.searchValueTemplate = '<input placeholder="Search" /><div class="treema-search-results"></div>';

  LatestVersionReferenceNode.prototype.valueClass = 'treema-latest-version';

  LatestVersionReferenceNode.prototype.url = '/db/article';

  LatestVersionReferenceNode.prototype.lastTerm = null;

  function LatestVersionReferenceNode() {
    this.search = bind(this.search, this);
    var l, link, links, p, parts;
    LatestVersionReferenceNode.__super__.constructor.apply(this, arguments);
    links = this.workingSchema.links || [];
    link = ((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = links.length; i < len; i++) {
        l = links[i];
        if (l.rel === 'db') {
          results.push(l);
        }
      }
      return results;
    })())[0];
    if (!link) {
      return;
    }
    parts = (function() {
      var i, len, ref, results;
      ref = link.href.split('/');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        if (p.length) {
          results.push(p);
        }
      }
      return results;
    })();
    this.url = "/db/" + parts[1];
    this.model = require('models/' + _.string.classify(parts[1]));
  }

  LatestVersionReferenceNode.prototype.buildValueForDisplay = function(valEl, data) {
    var val;
    val = data ? this.formatDocument(data) : 'None';
    return this.buildValueForDisplaySimply(valEl, val);
  };

  LatestVersionReferenceNode.prototype.buildValueForEditing = function(valEl, data) {
    var input;
    valEl.html(this.searchValueTemplate);
    input = valEl.find('input');
    input.focus().keyup(this.search);
    if (data) {
      return input.attr('placeholder', this.formatDocument(data));
    }
  };

  LatestVersionReferenceNode.prototype.buildSearchURL = function(term) {
    return this.url + "?term=" + term + "&project=true";
  };

  LatestVersionReferenceNode.prototype.search = function() {
    var term;
    term = this.getValEl().find('input').val();
    if (term === this.lastTerm) {
      return;
    }
    if (this.lastTerm && !term) {
      this.getSearchResultsEl().empty();
    }
    if (!term) {
      return;
    }
    this.lastTerm = term;
    this.getSearchResultsEl().empty().append('Searching');
    this.collection = new LatestVersionCollection([], {
      model: this.model
    });
    this.collection.url = this.buildSearchURL(term);
    this.collection.fetch();
    return this.collection.once('sync', this.searchCallback, this);
  };

  LatestVersionReferenceNode.prototype.searchCallback = function() {
    var container, first, i, len, model, ref, row, text;
    container = this.getSearchResultsEl().detach().empty();
    first = true;
    ref = this.collection.models;
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      row = $('<div></div>').addClass('treema-search-result-row');
      text = this.formatDocument(model);
      if (text == null) {
        continue;
      }
      if (first) {
        row.addClass('treema-search-selected');
      }
      first = false;
      row.text(text);
      row.data('value', model);
      container.append(row);
    }
    if (!this.collection.models.length) {
      container.append($('<div>No results</div>'));
    }
    return this.getValEl().append(container);
  };

  LatestVersionReferenceNode.prototype.getSearchResultsEl = function() {
    return this.getValEl().find('.treema-search-results');
  };

  LatestVersionReferenceNode.prototype.getSelectedResultEl = function() {
    return this.getValEl().find('.treema-search-selected');
  };

  LatestVersionReferenceNode.prototype.modelToString = function(model) {
    return model.get('name');
  };

  LatestVersionReferenceNode.prototype.formatDocument = function(docOrModel) {
    var data, m, ref;
    if (docOrModel instanceof CocoModel) {
      return this.modelToString(docOrModel);
    }
    if (this.settings.supermodel == null) {
      return 'Unknown';
    }
    m = CocoModel.getReferencedModel(this.getData(), this.workingSchema);
    data = this.getData();
    if (_.isString(data)) {
      if (m.schema().properties.version) {
        m = this.settings.supermodel.getModelByOriginal(m.constructor, data);
      } else {
        m = this.settings.supermodel.getModel(m.constructor, data);
      }
    } else {
      m = this.settings.supermodel.getModelByOriginalAndMajorVersion(m.constructor, data.original, data.majorVersion);
    }
    if (this.instance && !m) {
      m = this.instance;
      this.settings.supermodel.registerModel(m);
    }
    if (!m) {
      return 'Unknown - ' + ((ref = data.original) != null ? ref : data);
    }
    return this.modelToString(m);
  };

  LatestVersionReferenceNode.prototype.saveChanges = function() {
    var fullValue, selected;
    selected = this.getSelectedResultEl();
    if (!selected.length) {
      return;
    }
    fullValue = selected.data('value');
    this.data = {
      original: fullValue.attributes.original,
      majorVersion: fullValue.attributes.version.major
    };
    return this.instance = fullValue;
  };

  LatestVersionReferenceNode.prototype.onDownArrowPressed = function(e) {
    if (!this.isEditing()) {
      return LatestVersionReferenceNode.__super__.onDownArrowPressed.apply(this, arguments);
    }
    this.navigateSearch(1);
    return e.preventDefault();
  };

  LatestVersionReferenceNode.prototype.onUpArrowPressed = function(e) {
    if (!this.isEditing()) {
      return LatestVersionReferenceNode.__super__.onUpArrowPressed.apply(this, arguments);
    }
    e.preventDefault();
    return this.navigateSearch(-1);
  };

  LatestVersionReferenceNode.prototype.navigateSearch = function(offset) {
    var func, next, selected;
    selected = this.getSelectedResultEl();
    func = offset > 0 ? 'next' : 'prev';
    next = selected[func]('.treema-search-result-row');
    if (!next.length) {
      return;
    }
    selected.removeClass('treema-search-selected');
    return next.addClass('treema-search-selected');
  };

  LatestVersionReferenceNode.prototype.onClick = function(e) {
    var newSelection;
    newSelection = $(e.target).closest('.treema-search-result-row');
    if (!newSelection.length) {
      return LatestVersionReferenceNode.__super__.onClick.call(this, e);
    }
    this.getSelectedResultEl().removeClass('treema-search-selected');
    newSelection.addClass('treema-search-selected');
    this.saveChanges();
    this.flushChanges();
    return this.display();
  };

  LatestVersionReferenceNode.prototype.shouldTryToRemoveFromParent = function() {
    var selected;
    if (this.data != null) {
      return;
    }
    selected = this.getSelectedResultEl();
    return !selected.length;
  };

  return LatestVersionReferenceNode;

})(TreemaNode);

module.exports.LatestVersionOriginalReferenceNode = LatestVersionOriginalReferenceNode = (function(superClass) {
  extend(LatestVersionOriginalReferenceNode, superClass);

  function LatestVersionOriginalReferenceNode() {
    return LatestVersionOriginalReferenceNode.__super__.constructor.apply(this, arguments);
  }

  LatestVersionOriginalReferenceNode.prototype.saveChanges = function() {
    var fullValue, selected;
    selected = this.getSelectedResultEl();
    if (!selected.length) {
      return;
    }
    fullValue = selected.data('value');
    this.data = fullValue.attributes.original;
    return this.instance = fullValue;
  };

  return LatestVersionOriginalReferenceNode;

})(LatestVersionReferenceNode);

module.exports.IDReferenceNode = IDReferenceNode = (function(superClass) {
  extend(IDReferenceNode, superClass);

  function IDReferenceNode() {
    return IDReferenceNode.__super__.constructor.apply(this, arguments);
  }

  IDReferenceNode.prototype.saveChanges = function() {
    var fullValue, selected;
    selected = this.getSelectedResultEl();
    if (!selected.length) {
      return;
    }
    fullValue = selected.data('value');
    this.data = fullValue.attributes._id;
    return this.instance = fullValue;
  };

  return IDReferenceNode;

})(LatestVersionReferenceNode);

LevelComponentReferenceNode = (function(superClass) {
  extend(LevelComponentReferenceNode, superClass);

  function LevelComponentReferenceNode() {
    return LevelComponentReferenceNode.__super__.constructor.apply(this, arguments);
  }

  LevelComponentReferenceNode.prototype.buildSearchURL = function(term) {
    return this.url + "?term=" + term + "&project=name,system,original,version,dependencies,configSchema,description";
  };

  LevelComponentReferenceNode.prototype.modelToString = function(model) {
    return model.get('system') + '.' + model.get('name');
  };

  LevelComponentReferenceNode.prototype.canEdit = function() {
    return !this.getData().original;
  };

  return LevelComponentReferenceNode;

})(LatestVersionReferenceNode);

LatestVersionReferenceNode.prototype.search = _.debounce(LatestVersionReferenceNode.prototype.search, 200);

SlugPropsObject = (function(superClass) {
  extend(SlugPropsObject, superClass);

  function SlugPropsObject() {
    return SlugPropsObject.__super__.constructor.apply(this, arguments);
  }

  SlugPropsObject.prototype.getPropertyKey = function() {
    var ref, res;
    res = SlugPropsObject.__super__.getPropertyKey.apply(this, arguments);
    if (((ref = this.workingSchema.properties) != null ? ref[res] : void 0) != null) {
      return res;
    }
    return _.string.slugify(res);
  };

  return SlugPropsObject;

})(TreemaNode.nodeMap.object);

TaskTreema = (function(superClass) {
  extend(TaskTreema, superClass);

  function TaskTreema() {
    this.onEditInputBlur = bind(this.onEditInputBlur, this);
    this.onTaskChanged = bind(this.onTaskChanged, this);
    return TaskTreema.__super__.constructor.apply(this, arguments);
  }

  TaskTreema.prototype.buildValueForDisplay = function(valEl) {
    var task;
    this.taskCheckbox = $('<input type="checkbox">').prop('checked', this.data.complete);
    task = $("<span>" + this.data.name + "</span>");
    valEl.append(this.taskCheckbox).append(task);
    return this.taskCheckbox.on('change', this.onTaskChanged);
  };

  TaskTreema.prototype.buildValueForEditing = function(valEl, data) {
    this.nameInput = this.buildValueForEditingSimply(valEl, data.name);
    return this.nameInput.parent().prepend(this.taskCheckbox);
  };

  TaskTreema.prototype.onTaskChanged = function(e) {
    this.markAsChanged();
    this.saveChanges();
    this.flushChanges();
    return this.broadcastChanges();
  };

  TaskTreema.prototype.onEditInputBlur = function(e) {
    this.markAsChanged();
    this.saveChanges();
    if (this.isValid()) {
      if (this.isEditing()) {
        this.display();
      }
    } else {
      this.nameInput.focus().select();
    }
    this.flushChanges();
    return this.broadcastChanges();
  };

  TaskTreema.prototype.saveChanges = function(oldData) {
    if (this.data == null) {
      this.data = {};
    }
    if (this.nameInput) {
      this.data.name = this.nameInput.val();
    }
    return this.data.complete = Boolean(this.taskCheckbox.prop('checked'));
  };

  TaskTreema.prototype.destroy = function() {
    this.taskCheckbox.off();
    return TaskTreema.__super__.destroy.call(this);
  };

  return TaskTreema;

})(TreemaNode.nodeMap.string);

module.exports.setup = function() {
  TreemaNode.setNodeSubclass('date-time', DateTimeTreema);
  TreemaNode.setNodeSubclass('version', VersionTreema);
  TreemaNode.setNodeSubclass('markdown', LiveEditingMarkup);
  TreemaNode.setNodeSubclass('code-languages-object', CodeLanguagesObjectTreema);
  TreemaNode.setNodeSubclass('code-language', CodeLanguageTreema);
  TreemaNode.setNodeSubclass('code', CodeTreema);
  TreemaNode.setNodeSubclass('coffee', CoffeeTreema);
  TreemaNode.setNodeSubclass('javascript', JavaScriptTreema);
  TreemaNode.setNodeSubclass('image-file', ImageFileTreema);
  TreemaNode.setNodeSubclass('latest-version-reference', LatestVersionReferenceNode);
  TreemaNode.setNodeSubclass('latest-version-original-reference', LatestVersionOriginalReferenceNode);
  TreemaNode.setNodeSubclass('component-reference', LevelComponentReferenceNode);
  TreemaNode.setNodeSubclass('i18n', InternationalizationNode);
  TreemaNode.setNodeSubclass('sound-file', SoundFileTreema);
  TreemaNode.setNodeSubclass('slug-props', SlugPropsObject);
  return TreemaNode.setNodeSubclass('task', TaskTreema);
};
});

;
//# sourceMappingURL=/javascripts/app/core/treema-ext.js.map