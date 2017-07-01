require.register("templates/editor/thang/export-thang-type-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,_ = locals_._;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h4 class=\"modal-title\">Export " + (jade.escape((jade.interp = view.thangType.get('name')) == null ? '' : jade.interp)) + " SpriteSheet</h4></div><div class=\"modal-body\"><div class=\"form-horizontal\"><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Team Color</label><div class=\"col-sm-9\"><select id=\"color-config-select\" class=\"form-control\"><option value=\"\">None</option><option value=\"red\">Red</option><option value=\"blue\">Blue</option><option value=\"green\">Green</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Resolution Factor</label><div class=\"col-sm-9\"><input id=\"resolution-input\" value=\"3\" class=\"form-control\"/></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Sprite Type</label><div class=\"col-sm-9\">");
var spriteType = view.thangType.get('spriteType') || 'segmented'
buf.push("<label class=\"radio-inline\"><input" + (jade.attrs({ 'type':("radio"), 'name':("sprite-type"), 'value':("segmented"), 'checked':(spriteType==='segmented') }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Segmented</label><label class=\"radio-inline\"><input" + (jade.attrs({ 'type':("radio"), 'name':("sprite-type"), 'value':("singular"), 'checked':(spriteType!=='segmented') }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Singular</label></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Actions</label><div class=\"col-sm-9\">");
var defaultActionNames = _.pluck(view.thangType.getDefaultActions(), 'name')
var actions = view.thangType.getActions()
// iterate actions
;(function(){
  var $$obj = actions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var action = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("action"), 'value':(action.name), 'checked':(_.contains(defaultActionNames, action.name)) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>" + (jade.escape((jade.interp = action.name) == null ? '' : jade.interp)) + "</label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var action = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("action"), 'value':(action.name), 'checked':(_.contains(defaultActionNames, action.name)) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>" + (jade.escape((jade.interp = action.name) == null ? '' : jade.interp)) + "</label></div>");
    }

  }
}).call(this);

buf.push("</div></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" class=\"btn btn-default\">Cancel</button><button id=\"save-btn\" class=\"btn btn-primary\">Save</button><div class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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

;require.register("views/editor/thang/ExportThangTypeModal", function(exports, require, module) {
var ExportThangTypeModal, ModalView, SpriteExporter, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/thang/export-thang-type-modal');

SpriteExporter = require('lib/sprites/SpriteExporter');

module.exports = ExportThangTypeModal = (function(superClass) {
  extend(ExportThangTypeModal, superClass);

  function ExportThangTypeModal() {
    this.onSpriteSheetUploaded = bind(this.onSpriteSheetUploaded, this);
    return ExportThangTypeModal.__super__.constructor.apply(this, arguments);
  }

  ExportThangTypeModal.prototype.id = "export-thang-type-modal";

  ExportThangTypeModal.prototype.template = template;

  ExportThangTypeModal.prototype.plain = true;

  ExportThangTypeModal.prototype.events = {
    'click #save-btn': 'onClickSaveButton'
  };

  ExportThangTypeModal.prototype.initialize = function(options, thangType) {
    this.thangType = thangType;
    this.builder = null;
    return this.getFilename = _.once(this.getFilename);
  };

  ExportThangTypeModal.prototype.colorMap = {
    red: {
      hue: 0,
      saturation: 0.75,
      lightness: 0.5
    },
    blue: {
      hue: 0.66,
      saturation: 0.75,
      lightness: 0.5
    },
    green: {
      hue: 0.33,
      saturation: 0.75,
      lightness: 0.5
    }
  };

  ExportThangTypeModal.prototype.getColorLabel = function() {
    return this.$('#color-config-select').val();
  };

  ExportThangTypeModal.prototype.getColorConfig = function() {
    var color;
    color = this.colorMap[this.getColorLabel()];
    if (color) {
      return {
        team: color
      };
    }
    return null;
  };

  ExportThangTypeModal.prototype.getActionNames = function() {
    return _.map(this.$('input[name="action"]:checked'), function(el) {
      return $(el).val();
    });
  };

  ExportThangTypeModal.prototype.getResolutionFactor = function() {
    return parseInt(this.$('#resolution-input').val()) || SPRITE_RESOLUTION_FACTOR;
  };

  ExportThangTypeModal.prototype.getFilename = function() {
    return 'spritesheet-' + _.string.slugify(moment().format()) + '.png';
  };

  ExportThangTypeModal.prototype.getSpriteType = function() {
    return this.$('input[name="sprite-type"]:checked').val();
  };

  ExportThangTypeModal.prototype.onClickSaveButton = function() {
    var options;
    this.$('.modal-footer button').addClass('hide');
    this.$('.modal-footer .progress').removeClass('hide');
    this.$('input, select').attr('disabled', true);
    options = {
      resolutionFactor: this.getResolutionFactor(),
      actionNames: this.getActionNames(),
      colorConfig: this.getColorConfig(),
      spriteType: this.getSpriteType()
    };
    this.exporter = new SpriteExporter(this.thangType, options);
    this.exporter.build();
    return this.listenToOnce(this.exporter, 'build', this.onExporterBuild);
  };

  ExportThangTypeModal.prototype.onExporterBuild = function(e) {
    var body, src;
    this.spriteSheet = e.spriteSheet;
    src = this.spriteSheet._images[0].toDataURL();
    src = src.replace('data:image/png;base64,', '').replace(/\ /g, '+');
    body = {
      filename: this.getFilename(),
      mimetype: 'image/png',
      path: "db/thang.type/" + (this.thangType.get('original')),
      b64png: src
    };
    return $.ajax('/file', {
      type: 'POST',
      data: body,
      success: this.onSpriteSheetUploaded
    });
  };

  ExportThangTypeModal.prototype.onSpriteSheetUploaded = function() {
    var config, f, label, spriteSheetData, spriteSheets;
    spriteSheetData = {
      actionNames: this.getActionNames(),
      animations: this.spriteSheet._data,
      frames: (function() {
        var i, len, ref, results;
        ref = this.spriteSheet._frames;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          f = ref[i];
          results.push([f.rect.x, f.rect.y, f.rect.width, f.rect.height, 0, f.regX, f.regY]);
        }
        return results;
      }).call(this),
      image: ("db/thang.type/" + (this.thangType.get('original')) + "/") + this.getFilename(),
      resolutionFactor: this.getResolutionFactor(),
      spriteType: this.getSpriteType()
    };
    if (config = this.getColorConfig()) {
      spriteSheetData.colorConfig = config;
    }
    if (label = this.getColorLabel()) {
      spriteSheetData.colorLabel = label;
    }
    spriteSheets = _.clone(this.thangType.get('prerenderedSpriteSheetData') || []);
    spriteSheets.push(spriteSheetData);
    this.thangType.set('prerenderedSpriteSheetData', spriteSheets);
    this.thangType.save();
    return this.listenToOnce(this.thangType, 'sync', this.hide);
  };

  return ExportThangTypeModal;

})(ModalView);

window.SomeModal = module.exports;
});

;
//# sourceMappingURL=/javascripts/app/views/editor/thang/ExportThangTypeModal.js.map