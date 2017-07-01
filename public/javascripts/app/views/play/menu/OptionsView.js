require.register("templates/play/menu/options-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,music = locals_.music,aceConfig = locals_.aceConfig;buf.push("<div id=\"player-avatar-container\" title=\"Click to change your avatar\">");
if ( !me.get('photoURL'))
{
buf.push("<div class=\"editable-icon glyphicon glyphicon-pencil\"></div>");
}
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(230)), 'draggable':("false"), "class": [('profile-photo')] }, {"src":true,"draggable":true})) + "/><div class=\"form-group\"><input" + (jade.attrs({ 'id':('player-name'), 'name':("playerName"), 'type':("text"), 'value':(me.get('name', true)), "class": [('profile-caption')] }, {"name":true,"type":true,"value":true})) + "/></div></div><div class=\"form\"><h3 data-i18n=\"options.general_options\">General Options</h3><div id=\"volume-group\" class=\"form-group slider-group\"><span class=\"glyphicon glyphicon-volume-down\"></span><div id=\"option-volume\" class=\"slider spr spl\"></div><span class=\"glyphicon glyphicon-volume-up\"></span></div><div class=\"form-group checkbox\"><label for=\"option-music\" class=\"control-label\"><input" + (jade.attrs({ 'id':('option-music'), 'name':("option-music"), 'type':("checkbox"), 'checked':(music) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.music_label\">Music</span></label><span data-i18n=\"options.music_description\" class=\"help-block\">Turn background music on/off.</span></div><img src=\"/images/pages/play/modal/hr.png\" draggable=\"false\" class=\"hr\"/><h3 data-i18n=\"options.editor_config_title\">Editor Configuration</h3><div class=\"form-group checkbox\"><label for=\"option-live-completion\"><input" + (jade.attrs({ 'id':('option-live-completion'), 'name':("liveCompletion"), 'type':("checkbox"), 'checked':(aceConfig.liveCompletion) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.editor_config_livecompletion_label\">Live Autocompletion</span></label><span data-i18n=\"options.editor_config_livecompletion_description\" class=\"help-block\">Displays autocomplete suggestions while typing.</span></div><div class=\"form-group checkbox\"><label for=\"option-invisibles\"><input" + (jade.attrs({ 'id':('option-invisibles'), 'name':("invisibles"), 'type':("checkbox"), 'checked':(aceConfig.invisibles) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.editor_config_invisibles_label\">Show Invisibles</span></label><span data-i18n=\"options.editor_config_invisibles_description\" class=\"help-block\">Displays invisibles such as spaces or tabs.</span></div><div class=\"form-group checkbox\"><label for=\"option-indent-guides\"><input" + (jade.attrs({ 'id':('option-indent-guides'), 'name':("indentGuides"), 'type':("checkbox"), 'checked':(aceConfig.indentGuides) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.editor_config_indentguides_label\">Show Indent Guides</span></label><span data-i18n=\"options.editor_config_indentguides_description\" class=\"help-block\">Displays vertical lines to see indentation better.</span></div><div class=\"form-group checkbox\"><label for=\"option-behaviors\"><input" + (jade.attrs({ 'id':('option-behaviors'), 'name':("behaviors"), 'type':("checkbox"), 'checked':(aceConfig.behaviors) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.editor_config_behaviors_label\">Smart Behaviors</span></label><span data-i18n=\"options.editor_config_behaviors_description\" class=\"help-block\">Autocompletes brackets, braces, and quotes.</span></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/play/menu/OptionsView", function(exports, require, module) {
var CocoView, OptionsView, ThangType, User, forms, me, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/menu/options-view');

me = require('core/auth').me;

ThangType = require('models/ThangType');

User = require('models/User');

forms = require('core/forms');

module.exports = OptionsView = (function(superClass) {
  extend(OptionsView, superClass);

  OptionsView.prototype.id = 'options-view';

  OptionsView.prototype.className = 'tab-pane';

  OptionsView.prototype.template = template;

  OptionsView.prototype.aceConfig = {};

  OptionsView.prototype.defaultConfig = {
    language: 'python',
    keyBindings: 'default',
    invisibles: false,
    indentGuides: false,
    behaviors: false,
    liveCompletion: true
  };

  OptionsView.prototype.events = {
    'change #option-music': 'updateMusic',
    'change #option-invisibles': 'updateInvisibles',
    'change #option-indent-guides': 'updateIndentGuides',
    'change #option-behaviors': 'updateBehaviors',
    'change #option-live-completion': 'updateLiveCompletion',
    'click .profile-photo': 'onEditProfilePhoto',
    'click .editable-icon': 'onEditProfilePhoto',
    'keyup #player-name': function() {
      return this.trigger('nameChanged');
    }
  };

  function OptionsView(options) {
    this.checkNameExists = bind(this.checkNameExists, this);
    this.onVolumeSliderChange = bind(this.onVolumeSliderChange, this);
    this.uploadFilePath = "db/user/" + me.id;
    this.onNameChange = _.debounce(this.checkNameExists, 500);
    this.on('nameChanged', this.onNameChange);
    this.playerName = me.get('name');
    if (!window.application.isIPadApp) {
      require('core/services/filepicker')();
    }
    OptionsView.__super__.constructor.call(this, options);
  }

  OptionsView.prototype.getRenderData = function(c) {
    var ref;
    if (c == null) {
      c = {};
    }
    c = OptionsView.__super__.getRenderData.call(this, c);
    this.aceConfig = _.cloneDeep((ref = me.get('aceConfig')) != null ? ref : {});
    this.aceConfig = _.defaults(this.aceConfig, this.defaultConfig);
    c.aceConfig = this.aceConfig;
    c.music = me.get('music', true);
    return c;
  };

  OptionsView.prototype.afterRender = function() {
    OptionsView.__super__.afterRender.call(this);
    this.volumeSlider = this.$el.find('#option-volume').slider({
      animate: 'fast',
      min: 0,
      max: 1,
      step: 0.05
    });
    this.volumeSlider.slider('value', me.get('volume'));
    this.volumeSlider.on('slide', this.onVolumeSliderChange);
    return this.volumeSlider.on('slidechange', this.onVolumeSliderChange);
  };

  OptionsView.prototype.destroy = function() {
    var ref;
    if ((ref = this.volumeSlider) != null) {
      if (typeof ref.slider === "function") {
        ref.slider('destroy');
      }
    }
    return OptionsView.__super__.destroy.call(this);
  };

  OptionsView.prototype.onVolumeSliderChange = function(e) {
    var volume;
    volume = this.volumeSlider.slider('value');
    me.set('volume', volume);
    this.$el.find('#option-volume-value').text((volume * 100).toFixed(0) + '%');
    Backbone.Mediator.publish('level:set-volume', {
      volume: volume
    });
    return this.playSound('menu-button-click');
  };

  OptionsView.prototype.onHidden = function() {
    if (this.playerName && this.playerName !== me.get('name')) {
      me.set('name', this.playerName);
    }
    this.aceConfig.invisibles = this.$el.find('#option-invisibles').prop('checked');
    this.aceConfig.keyBindings = 'default';
    this.aceConfig.indentGuides = this.$el.find('#option-indent-guides').prop('checked');
    this.aceConfig.behaviors = this.$el.find('#option-behaviors').prop('checked');
    this.aceConfig.liveCompletion = this.$el.find('#option-live-completion').prop('checked');
    me.set('aceConfig', this.aceConfig);
    me.patch();
    return Backbone.Mediator.publish('tome:change-config', {});
  };

  OptionsView.prototype.updateMusic = function() {
    return me.set('music', this.$el.find('#option-music').prop('checked'));
  };

  OptionsView.prototype.updateInvisibles = function() {
    return this.aceConfig.invisibles = this.$el.find('#option-invisibles').prop('checked');
  };

  OptionsView.prototype.updateKeyBindings = function() {
    return this.aceConfig.keyBindings = this.$el.find('#option-key-bindings').val();
  };

  OptionsView.prototype.updateIndentGuides = function() {
    return this.aceConfig.indentGuides = this.$el.find('#option-indent-guides').prop('checked');
  };

  OptionsView.prototype.updateBehaviors = function() {
    return this.aceConfig.behaviors = this.$el.find('#option-behaviors').prop('checked');
  };

  OptionsView.prototype.updateLiveCompletion = function() {
    return this.aceConfig.liveCompletion = this.$el.find('#option-live-completion').prop('checked');
  };

  OptionsView.prototype.checkNameExists = function() {
    var name;
    forms.clearFormAlerts(this.$el);
    name = $('#player-name').val();
    return User.getUnconflictedName(name, (function(_this) {
      return function(newName) {
        forms.clearFormAlerts(_this.$el);
        if (name !== newName) {
          return forms.setErrorToProperty(_this.$el, 'playerName', 'This name is already taken so you won\'t be able to keep it.', true);
        } else {
          return _this.playerName = newName;
        }
      };
    })(this));
  };

  OptionsView.prototype.onEditProfilePhoto = function(e) {
    var onSaved, onSaving, photoContainer;
    if (window.application.isIPadApp) {
      return;
    }
    this.playSound('menu-button-click');
    photoContainer = this.$el.find('.profile-photo');
    onSaving = (function(_this) {
      return function() {
        return photoContainer.addClass('saving');
      };
    })(this);
    onSaved = (function(_this) {
      return function(uploadingPath) {
        me.set('photoURL', uploadingPath);
        return photoContainer.removeClass('saving').attr('src', me.getPhotoURL(photoContainer.width()));
      };
    })(this);
    return filepicker.pick({
      mimetypes: 'image/*'
    }, this.onImageChosen(onSaving, onSaved));
  };

  OptionsView.prototype.formatImagePostData = function(inkBlob) {
    return {
      url: inkBlob.url,
      filename: inkBlob.filename,
      mimetype: inkBlob.mimetype,
      path: this.uploadFilePath,
      force: true
    };
  };

  OptionsView.prototype.onImageChosen = function(onSaving, onSaved) {
    return (function(_this) {
      return function(inkBlob) {
        var uploadingPath;
        onSaving();
        uploadingPath = [_this.uploadFilePath, inkBlob.filename].join('/');
        return $.ajax('/file', {
          type: 'POST',
          data: _this.formatImagePostData(inkBlob),
          success: _this.onImageUploaded(onSaved, uploadingPath)
        });
      };
    })(this);
  };

  OptionsView.prototype.onImageUploaded = function(onSaved, uploadingPath) {
    return (function(_this) {
      return function(e) {
        return onSaved(uploadingPath);
      };
    })(this);
  };

  return OptionsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/menu/OptionsView.js.map