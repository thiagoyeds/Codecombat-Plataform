require.register("lib/surface/Label", function(exports, require, module) {
var CocoClass, Label,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

CocoClass = require('core/CocoClass');

module.exports = Label = (function(superClass) {
  extend(Label, superClass);

  Label.STYLE_DIALOGUE = 'dialogue';

  Label.STYLE_SAY = 'say';

  Label.STYLE_NAME = 'name';

  Label.STYLE_VAR = 'variable';

  Label.prototype.subscriptions = {};

  function Label(options) {
    var ref, ref1, ref2;
    Label.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.sprite = options.sprite;
    this.camera = options.camera;
    this.layer = options.layer;
    this.style = (ref = options.style) != null ? ref : ((ref1 = this.sprite) != null ? (ref2 = ref1.thang) != null ? ref2.labelStyle : void 0 : void 0) || Label.STYLE_SAY;
    if (!this.sprite) {
      console.error(this.toString(), 'needs a sprite.');
    }
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    if (options.text) {
      this.setText(options.text);
    }
  }

  Label.prototype.destroy = function() {
    this.setText(null);
    return Label.__super__.destroy.call(this);
  };

  Label.prototype.toString = function() {
    var ref, ref1, ref2, ref3, ref4;
    return "<Label for " + ((ref = (ref1 = this.sprite) != null ? (ref2 = ref1.thang) != null ? ref2.id : void 0 : void 0) != null ? ref : 'None') + ": " + ((ref3 = (ref4 = this.text) != null ? ref4.substring(0, 10) : void 0) != null ? ref3 : '') + ">";
  };

  Label.prototype.setText = function(text) {
    if (text === this.text) {
      return false;
    }
    this.text = text;
    this.build();
    return true;
  };

  Label.prototype.build = function() {
    var o;
    if (this.layer && !this.layer.destroyed) {
      if (this.background) {
        this.layer.removeChild(this.background);
      }
      if (this.label) {
        this.layer.removeChild(this.label);
      }
    }
    this.label = null;
    this.background = null;
    if (!this.text) {
      return;
    }
    o = this.buildLabelOptions();
    this.layer.addChild(this.label = this.buildLabel(o));
    this.layer.addChild(this.background = this.buildBackground(o));
    return this.layer.updateLayerOrder();
  };

  Label.prototype.update = function() {
    var base, offset, ref, rotation;
    if (!(this.text && this.sprite.sprite)) {
      return;
    }
    offset = typeof (base = this.sprite).getOffset === "function" ? base.getOffset(((ref = this.style) === 'dialogue' || ref === 'say' ? 'mouth' : 'aboveHead')) : void 0;
    if (offset == null) {
      offset = {
        x: 0,
        y: 0
      };
    }
    if (this.style === 'variable') {
      offset.y += 10;
    }
    rotation = this.sprite.getRotation();
    if (rotation >= 135 || rotation <= -135) {
      offset.x *= -1;
    }
    this.label.x = this.background.x = this.sprite.sprite.x + offset.x;
    this.label.y = this.background.y = this.sprite.sprite.y + offset.y;
    return null;
  };

  Label.prototype.show = function() {
    if (!this.label) {
      return;
    }
    this.layer.addChild(this.label);
    this.layer.addChild(this.background);
    return this.layer.updateLayerOrder();
  };

  Label.prototype.hide = function() {
    if (!this.label) {
      return;
    }
    this.layer.removeChild(this.background);
    return this.layer.removeChild(this.label);
  };

  Label.prototype.buildLabelOptions = function() {
    var fontFamily, maxLength, maxWidth, multiline, o, ref, ref1, ref2, ref3, st;
    o = {};
    st = {
      dialogue: 'D',
      say: 'S',
      name: 'N',
      variable: 'V'
    }[this.style];
    o.marginX = {
      D: 5,
      S: 6,
      N: 3,
      V: 0
    }[st];
    o.marginY = {
      D: 6,
      S: 4,
      N: 3,
      V: 0
    }[st];
    o.fontWeight = {
      D: 'bold',
      S: 'bold',
      N: 'bold',
      V: 'bold'
    }[st];
    o.shadow = {
      D: false,
      S: true,
      N: true,
      V: true
    }[st];
    o.shadowColor = {
      D: '#FFF',
      S: '#000',
      N: '#000',
      V: "#000"
    }[st];
    o.fontSize = {
      D: 25,
      S: 12,
      N: 24,
      V: 18
    }[st];
    fontFamily = {
      D: 'Arial',
      S: 'Arial',
      N: 'Arial',
      B: 'Arial',
      V: 'Arial'
    }[st];
    o.fontDescriptor = o.fontWeight + " " + o.fontSize + "px " + fontFamily;
    o.fontColor = {
      D: '#000',
      S: '#FFF',
      N: '#6c6',
      V: '#6c6'
    }[st];
    if (this.style === 'name' && ((ref = this.sprite) != null ? (ref1 = ref.thang) != null ? ref1.team : void 0 : void 0) === 'humans') {
      o.fontColor = '#c66';
    } else if (this.style === 'name' && ((ref2 = this.sprite) != null ? (ref3 = ref2.thang) != null ? ref3.team : void 0 : void 0) === 'ogres') {
      o.fontColor = '#66c';
    } else if (this.style === 'variable') {
      o.fontColor = '#fff';
    }
    o.backgroundFillColor = {
      D: 'white',
      S: 'rgba(0,0,0,0.4)',
      N: 'rgba(0,0,0,0.7)',
      V: 'rgba(0,0,0,0.7)'
    }[st];
    o.backgroundStrokeColor = {
      D: 'black',
      S: 'rgba(0,0,0,0.6)',
      N: 'rgba(0,0,0,0)',
      V: 'rgba(0,0,0,0)'
    }[st];
    o.backgroundStrokeStyle = {
      D: 2,
      S: 1,
      N: 1,
      V: 1
    }[st];
    o.backgroundBorderRadius = {
      D: 10,
      S: 3,
      N: 3,
      V: 3
    }[st];
    o.layerPriority = {
      D: 10,
      S: 5,
      N: 5,
      V: 5
    }[st];
    maxWidth = {
      D: 300,
      S: 300,
      N: 180,
      V: 100
    }[st];
    maxWidth = Math.max(this.camera.canvasWidth / 2 - 100, maxWidth);
    maxLength = {
      D: 100,
      S: 100,
      N: 30,
      V: 30
    }[st];
    multiline = this.addNewLinesToText(_.string.prune(this.text, maxLength), o.fontDescriptor, maxWidth);
    o.text = multiline.text;
    o.textWidth = multiline.textWidth;
    return o;
  };

  Label.prototype.buildLabel = function(o) {
    var bounds, label;
    label = new createjs.Text(o.text, o.fontDescriptor, o.fontColor);
    label.lineHeight = o.fontSize + 2;
    label.x = o.marginX;
    label.y = o.marginY;
    if (o.shadow) {
      label.shadow = new createjs.Shadow(o.shadowColor, 1, 1, 0);
    }
    label.layerPriority = o.layerPriority;
    label.name = "Sprite Label - " + this.style;
    bounds = label.getBounds();
    label.cache(bounds.x, bounds.y, bounds.width, bounds.height);
    o.textHeight = label.getMeasuredHeight();
    o.label = label;
    return label;
  };

  Label.prototype.buildBackground = function(o) {
    var background, cap, g, h, hPos, pointerHeight, pointerPos, pointerWidth, radius, sup, vPos, w;
    w = o.textWidth + 2 * o.marginX;
    h = o.textHeight + 2 * o.marginY + 1;
    background = new createjs.Shape();
    background.name = "Sprite Label Background - " + this.style;
    g = background.graphics;
    g.beginFill(o.backgroundFillColor);
    g.beginStroke(o.backgroundStrokeColor);
    g.setStrokeStyle(o.backgroundStrokeStyle);
    if (this.style === 'dialogue') {
      radius = o.backgroundBorderRadius;
      pointerHeight = 10;
      pointerWidth = 8;
      pointerWidth += radius;
      sup = {
        x: this.sprite.sprite.x,
        y: this.sprite.sprite.y
      };
      cap = this.camera.surfaceToCanvas(sup);
      hPos = cap.x / this.camera.canvasWidth > 0.53 ? 'right' : 'left';
      vPos = cap.y / this.camera.canvasHeight > 0.53 ? 'bottom' : 'top';
      pointerPos = vPos + "-" + hPos;
      g.moveTo(radius, 0);
      if (pointerPos === 'top-left') {
        g.lineTo(radius / 2, -pointerHeight);
        g.lineTo(pointerWidth, 0);
      } else if (pointerPos === 'top-right') {
        g.lineTo(w - pointerWidth, 0);
        g.lineTo(w - radius / 2, -pointerHeight);
      }
      g.lineTo(w - radius, 0);
      g.quadraticCurveTo(w, 0, w, radius);
      g.lineTo(w, h - radius);
      g.quadraticCurveTo(w, h, w - radius, h);
      if (pointerPos === 'bottom-right') {
        g.lineTo(w - radius / 2, h + pointerHeight);
        g.lineTo(w - pointerWidth, h);
      } else if (pointerPos === 'bottom-left') {
        g.lineTo(pointerWidth, h);
        g.lineTo(radius / 2, h + pointerHeight);
      }
      g.lineTo(radius, h);
      g.quadraticCurveTo(0, h, 0, h - radius);
      g.lineTo(0, radius);
      g.quadraticCurveTo(0, 0, radius, 0);
      background.regX = hPos === 'left' ? 3 : o.textWidth + 3;
      background.regY = vPos === 'bottom' ? h + pointerHeight : -pointerHeight;
    } else {
      background.regX = w / 2;
      background.regY = h + 2;
      g.drawRoundRect(o.label.x - o.marginX, o.label.y - o.marginY, w, h, o.backgroundBorderRadius);
    }
    o.label.regX = background.regX - o.marginX;
    o.label.regY = background.regY - o.marginY;
    background.cache(-10, -10, w + 20, h + 20);
    g.endStroke();
    g.endFill();
    background.layerPriority = o.layerPriority - 1;
    return background;
  };

  Label.prototype.addNewLinesToText = function(originalText, fontDescriptor, maxWidth) {
    var i, j, k, len, len1, ref, ref1, ref2, row, rows, text, textWidth, width, word, words;
    if (maxWidth == null) {
      maxWidth = 400;
    }
    rows = [];
    row = [];
    words = _.string.words(originalText);
    textWidth = 0;
    for (j = 0, len = words.length; j < len; j++) {
      word = words[j];
      row.push(word);
      text = new createjs.Text((ref = _.string).join.apply(ref, [' '].concat(slice.call(row))), fontDescriptor, '#000');
      width = text.getMeasuredWidth();
      if (width > maxWidth) {
        if (row.length === 1) {
          row[0] = _.string.truncate(row[0], 40);
          text.text = row[0];
          textWidth = Math.max(text.getMeasuredWidth(), textWidth);
          rows.push(row);
          row = [];
        } else {
          row.pop();
          rows.push(row);
          row = [word];
        }
      } else {
        textWidth = Math.max(textWidth, width);
      }
    }
    if (row.length) {
      rows.push(row);
    }
    for (i = k = 0, len1 = rows.length; k < len1; i = ++k) {
      row = rows[i];
      rows[i] = (ref1 = _.string).join.apply(ref1, [' '].concat(slice.call(row)));
    }
    return {
      text: (ref2 = _.string).join.apply(ref2, ["\n"].concat(slice.call(rows))),
      textWidth: textWidth
    };
  };

  return Label;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/Label.js.map