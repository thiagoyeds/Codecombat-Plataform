require.register("views/play/level/tome/SpellPaletteThangEntryView", function(exports, require, module) {
var CocoView, DocFormatter, SpellPaletteThangEntryView, filters, me, popoverTemplate, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/tome/spell-palette-thang-entry');

popoverTemplate = require('templates/play/level/tome/spell_palette_entry_popover');

me = require('core/auth').me;

filters = require('lib/image_filter');

DocFormatter = require('./DocFormatter');

utils = require('core/utils');

module.exports = SpellPaletteThangEntryView = (function(superClass) {
  extend(SpellPaletteThangEntryView, superClass);

  SpellPaletteThangEntryView.prototype.tagName = 'div';

  SpellPaletteThangEntryView.prototype.className = 'spell-palette-thang-entry-view';

  SpellPaletteThangEntryView.prototype.template = template;

  SpellPaletteThangEntryView.prototype.subscriptions = {
    'surface:frame-changed': 'onFrameChanged',
    'tome:palette-hovered': 'onPaletteHovered',
    'tome:palette-clicked': 'onPaletteClicked',
    'tome:spell-debug-property-hovered': 'onSpellDebugPropertyHovered'
  };

  SpellPaletteThangEntryView.prototype.events = {
    'mouseenter': 'onMouseEnter',
    'mouseleave': 'onMouseLeave',
    'click': 'onClick'
  };

  function SpellPaletteThangEntryView(options) {
    this.onClick = bind(this.onClick, this);
    this.onPaletteClicked = bind(this.onPaletteClicked, this);
    var example, ref;
    SpellPaletteThangEntryView.__super__.constructor.call(this, options);
    this.thang = options.thang;
    if (options.doc.example != null) {
      example = (ref = options.doc.example) != null ? ref[options.language] : void 0;
    } else {
      example = "\# usage code \ngame.spawnXY(\"" + options.buildableName + "\", 21, 20)";
    }
    this.doc = {
      name: options.buildableName,
      initialHTML: popoverTemplate({
        _: _,
        marked: marked,
        doc: {
          shortName: options.doc.name,
          type: "spawnable",
          description: "![" + (this.thang.get('name')) + "](" + (this.thang.getPortraitURL()) + ") " + options.doc.description,
          example: example
        }
      }),
      example: example
    };
  }

  SpellPaletteThangEntryView.prototype.afterRender = function() {
    return SpellPaletteThangEntryView.__super__.afterRender.call(this);
  };

  SpellPaletteThangEntryView.prototype.resetPopoverContent = function() {};

  SpellPaletteThangEntryView.prototype.onMouseEnter = function(e) {
    if (this.popoverPinned || this.otherPopoverPinned) {

    }
  };

  SpellPaletteThangEntryView.prototype.onMouseLeave = function(e) {};

  SpellPaletteThangEntryView.prototype.onPaletteClicked = function(e) {
    return this.$el.toggleClass('selected', e.prop === this.doc.name);
  };

  SpellPaletteThangEntryView.prototype.onClick = function(e) {
    if (key.shift) {
      Backbone.Mediator.publish('tome:insert-snippet', {
        doc: this.options.doc,
        language: this.options.language,
        formatted: this.doc
      });
      return;
    }
    return Backbone.Mediator.publish('tome:palette-clicked', {
      thang: this.thang,
      prop: this.doc.name,
      entry: this
    });
  };

  SpellPaletteThangEntryView.prototype.onFrameChanged = function(e) {};

  SpellPaletteThangEntryView.prototype.onPaletteHovered = function(e) {
    if (e.entry === this) {

    }
  };

  SpellPaletteThangEntryView.prototype.onSpellDebugPropertyHovered = function(e) {
    var matched;
    matched = e.property === this.doc.name && e.owner === this.doc.owner;
    if (matched && !this.debugHovered) {
      this.debugHovered = true;
      if (!this.popoverPinned) {
        this.togglePinned();
      }
    } else if (this.debugHovered && !matched) {
      this.debugHovered = false;
      if (this.popoverPinned) {
        this.togglePinned();
      }
    }
    return null;
  };

  SpellPaletteThangEntryView.prototype.destroy = function() {
    var i, len, oldEditor, ref;
    this.$el.off();
    ref = this.aceEditors;
    for (i = 0, len = ref.length; i < len; i++) {
      oldEditor = ref[i];
      oldEditor.destroy();
    }
    return SpellPaletteThangEntryView.__super__.destroy.call(this);
  };

  return SpellPaletteThangEntryView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/SpellPaletteThangEntryView.js.map