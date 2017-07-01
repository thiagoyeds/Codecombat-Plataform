require.register("templates/editor/thang/vector-icon-setup-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Choose Container for Vector Icon</h3></div><div class=\"modal-body\">");
if ( view.container)
{
buf.push("<form class=\"form\"><div class=\"form-group\"><select id=\"container-select\" class=\"form-control\">");
// iterate view.containers
;(function(){
  var $$obj = view.containers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var container = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(container), 'selected':(container === view.container) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = container) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var container = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(container), 'selected':(container === view.container) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = container) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></form><canvas" + (jade.attrs({ 'width':(view.demoSize), 'height':(view.demoSize), 'id':('resulting-icon') }, {"width":true,"height":true})) + "></canvas><div class=\"alert alert-info\">Arrow keys to move, Shift-Plus/Minus to scale.</div>");
}
else
{
buf.push("<div>forgetting something?</div>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"center\" class=\"btn pull-left btn-info\"><span class=\"glyphicon glyphicon-cutlery\"></span><span class=\"spl\">Center</span></button><button id=\"done-button\" class=\"btn btn-primary\">Done</button></div></div></div></div>");;return buf.join("");
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

;require.register("views/editor/thang/VectorIconSetupModal", function(exports, require, module) {
var ModalView, VectorIconSetupModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/thang/vector-icon-setup-modal');

module.exports = VectorIconSetupModal = (function(superClass) {
  extend(VectorIconSetupModal, superClass);

  VectorIconSetupModal.prototype.id = "vector-icon-setup-modal";

  VectorIconSetupModal.prototype.template = template;

  VectorIconSetupModal.prototype.demoSize = 400;

  VectorIconSetupModal.prototype.plain = true;

  VectorIconSetupModal.prototype.events = {
    'change #container-select': 'onChangeContainer',
    'click #center': 'onClickCenter',
    'click #zero-bounds': 'onClickZeroBounds',
    'click #done-button': 'onClickDone'
  };

  VectorIconSetupModal.prototype.shortcuts = {
    'shift+-': function() {
      return this.incrScale(-0.02);
    },
    'shift+=': function() {
      return this.incrScale(0.02);
    },
    'up': function() {
      return this.incrRegY(1);
    },
    'down': function() {
      return this.incrRegY(-1);
    },
    'left': function() {
      return this.incrRegX(1);
    },
    'right': function() {
      return this.incrRegX(-1);
    }
  };

  function VectorIconSetupModal(options, thangType) {
    var portrait, ref, ref1, ref2, ref3, ref4, ref5;
    this.thangType = thangType;
    portrait = (ref = this.thangType.get('actions')) != null ? ref.portrait : void 0;
    this.containers = _.keys(((ref1 = this.thangType.get('raw')) != null ? ref1.containers : void 0) || {});
    this.container = (portrait != null ? portrait.container : void 0) || _.last(this.containers);
    this.scale = (portrait != null ? portrait.scale : void 0) || 1;
    this.regX = (portrait != null ? (ref2 = portrait.positions) != null ? (ref3 = ref2.registration) != null ? ref3.x : void 0 : void 0 : void 0) || 0;
    this.regY = (portrait != null ? (ref4 = portrait.positions) != null ? (ref5 = ref4.registration) != null ? ref5.y : void 0 : void 0 : void 0) || 0;
    this.saveChanges();
    VectorIconSetupModal.__super__.constructor.call(this, options);
  }

  VectorIconSetupModal.prototype.saveChanges = function() {
    var actions, base, ref;
    actions = _.cloneDeep((ref = this.thangType.get('actions')) != null ? ref : {});
    if (actions.portrait == null) {
      actions.portrait = {};
    }
    actions.portrait.scale = this.scale;
    if ((base = actions.portrait).positions == null) {
      base.positions = {};
    }
    actions.portrait.positions.registration = {
      x: this.regX,
      y: this.regY
    };
    actions.portrait.container = this.container;
    this.thangType.set('actions', actions);
    return this.thangType.buildActions();
  };

  VectorIconSetupModal.prototype.afterRender = function() {
    this.initStage();
    return VectorIconSetupModal.__super__.afterRender.call(this);
  };

  VectorIconSetupModal.prototype.initStage = function() {
    var canvas;
    if (!(this.containers && this.container)) {
      return;
    }
    this.stage = this.thangType.getVectorPortraitStage(this.demoSize);
    this.sprite = this.stage.children[0];
    canvas = $(this.stage.canvas);
    canvas.attr('id', 'resulting-icon');
    this.$el.find('#resulting-icon').replaceWith(canvas);
    return this.updateSpriteProperties();
  };

  VectorIconSetupModal.prototype.onChangeContainer = function(e) {
    this.container = $(e.target).val();
    this.saveChanges();
    return this.initStage();
  };

  VectorIconSetupModal.prototype.refreshSprite = function() {
    var stage;
    if (!this.stage) {
      return;
    }
    stage = this.thangType.getVectorPortraitStage(this.demoSize);
    this.stage.removeAllChildren();
    this.stage.addChild(this.sprite = stage.children[0]);
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.updateSpriteProperties = function() {
    this.sprite.scaleX = this.sprite.scaleY = this.scale * this.demoSize / 100;
    this.sprite.regX = this.regX / this.scale;
    this.sprite.regY = this.regY / this.scale;
    return console.log('set to', this.scale, this.regX, this.regY);
  };

  VectorIconSetupModal.prototype.onClickCenter = function() {
    var b, containerInfo, maxDimension;
    containerInfo = this.thangType.get('raw').containers[this.container];
    b = containerInfo.b;
    this.regX = b[0];
    this.regY = b[1];
    maxDimension = Math.max(b[2], b[3]);
    this.scale = 100 / maxDimension;
    if (b[2] > b[3]) {
      this.regY += (b[3] - b[2]) / 2;
    } else {
      this.regX += (b[2] - b[3]) / 2;
    }
    this.regX *= this.scale;
    this.regY *= this.scale;
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.incrScale = function(amount) {
    this.scale += amount;
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.incrRegX = function(amount) {
    this.regX += amount;
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.incrRegY = function(amount) {
    this.regY += amount;
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.onClickDone = function() {
    this.saveChanges();
    this.trigger('done');
    return this.hide();
  };

  return VectorIconSetupModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/thang/VectorIconSetupModal.js.map