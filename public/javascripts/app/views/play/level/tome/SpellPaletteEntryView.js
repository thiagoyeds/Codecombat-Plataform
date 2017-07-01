require.register("views/play/level/tome/SpellPaletteEntryView", function(exports, require, module) {
var CocoView, DocFormatter, SpellPaletteEntryView, ace, filters, me, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/tome/spell_palette_entry');

me = require('core/auth').me;

filters = require('lib/image_filter');

DocFormatter = require('./DocFormatter');

ace = require('ace');

utils = require('core/utils');

module.exports = SpellPaletteEntryView = (function(superClass) {
  extend(SpellPaletteEntryView, superClass);

  SpellPaletteEntryView.prototype.tagName = 'div';

  SpellPaletteEntryView.prototype.className = 'spell-palette-entry-view';

  SpellPaletteEntryView.prototype.template = template;

  SpellPaletteEntryView.prototype.popoverPinned = false;

  SpellPaletteEntryView.prototype.overridePopoverTemplate = '<div class="popover spell-palette-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';

  SpellPaletteEntryView.prototype.subscriptions = {
    'surface:frame-changed': 'onFrameChanged',
    'tome:palette-hovered': 'onPaletteHovered',
    'tome:palette-clicked': 'onPaletteClicked',
    'tome:palette-pin-toggled': 'onPalettePinToggled',
    'tome:spell-debug-property-hovered': 'onSpellDebugPropertyHovered'
  };

  SpellPaletteEntryView.prototype.events = {
    'mouseenter': 'onMouseEnter',
    'mouseleave': 'onMouseLeave',
    'click': 'onClick'
  };

  function SpellPaletteEntryView(options) {
    this.onClick = bind(this.onClick, this);
    this.onPaletteClicked = bind(this.onPaletteClicked, this);
    SpellPaletteEntryView.__super__.constructor.call(this, options);
    this.thang = options.thang;
    this.docFormatter = new DocFormatter(options);
    this.doc = this.docFormatter.doc;
    this.doc.initialHTML = this.docFormatter.formatPopover();
    this.aceEditors = [];
  }

  SpellPaletteEntryView.prototype.afterRender = function() {
    SpellPaletteEntryView.__super__.afterRender.call(this);
    return this.$el.addClass(_.string.slugify(this.doc.type));
  };

  SpellPaletteEntryView.prototype.resetPopoverContent = function() {};

  SpellPaletteEntryView.prototype.onMouseEnter = function(e) {
    if (this.popoverPinned || this.otherPopoverPinned) {

    }
  };

  SpellPaletteEntryView.prototype.onMouseLeave = function(e) {};

  SpellPaletteEntryView.prototype.togglePinned = function() {
    var x;
    if (this.popoverPinned) {
      this.popoverPinned = false;
      this.$el.add('.spell-palette-popover.popover').removeClass('pinned');
      $('.spell-palette-popover.popover .close').remove();
      this.$el.popover('hide');
      this.playSound('spell-palette-entry-unpin');
    } else {
      this.popoverPinned = true;
      this.resetPopoverContent();
      this.$el.add('.spell-palette-popover.popover').addClass('pinned');
      this.$el.popover('show');
      x = $('<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>');
      $('.spell-palette-popover.popover').append(x);
      x.on('click', this.onClick);
      this.playSound('spell-palette-entry-pin');
    }
    return Backbone.Mediator.publish('tome:palette-pin-toggled', {
      entry: this,
      pinned: this.popoverPinned
    });
  };

  SpellPaletteEntryView.prototype.onPaletteClicked = function(e) {
    return this.$el.toggleClass('selected', e.prop === this.doc.name);
  };

  SpellPaletteEntryView.prototype.onClick = function(e) {
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

  SpellPaletteEntryView.prototype.onFrameChanged = function(e) {
    var ref;
    if (((ref = e.selectedThang) != null ? ref.id : void 0) !== this.thang.id) {
      return;
    }
    return this.options.thang = this.thang = this.docFormatter.options.thang = e.selectedThang;
  };

  SpellPaletteEntryView.prototype.onPaletteHovered = function(e) {
    if (e.entry === this) {
      return;
    }
    if (this.popoverPinned) {
      return this.togglePinned();
    }
  };

  SpellPaletteEntryView.prototype.onPalettePinToggled = function(e) {
    if (e.entry === this) {
      return;
    }
    return this.otherPopoverPinned = e.pinned;
  };

  SpellPaletteEntryView.prototype.onSpellDebugPropertyHovered = function(e) {
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

  SpellPaletteEntryView.prototype.destroy = function() {
    var i, len, oldEditor, ref;
    if (this.popoverPinned) {
      $('.popover.pinned').remove();
    }
    if (this.popoverPinned) {
      this.togglePinned();
    }
    this.$el.popover('destroy');
    this.$el.off();
    ref = this.aceEditors;
    for (i = 0, len = ref.length; i < len; i++) {
      oldEditor = ref[i];
      oldEditor.destroy();
    }
    return SpellPaletteEntryView.__super__.destroy.call(this);
  };

  return SpellPaletteEntryView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/SpellPaletteEntryView.js.map