require.register("templates/play/menu/item-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),item = locals_.item,includes = locals_.includes,props = locals_.props,stats = locals_.stats;buf.push("<img" + (jade.attrs({ 'src':(item.getPortraitURL()) }, {"src":true})) + "/><div class=\"item-info\">");
if ( includes.name)
{
buf.push("<h4>" + (jade.escape(null == (jade.interp = item.get('name')) ? "" : jade.interp)) + "</h4>");
}
if ( includes.stats || (includes.props && props.length))
{
buf.push("<ul class=\"list-unstyled\">");
if ( includes.stats)
{
// iterate stats
;(function(){
  var $$obj = stats;
  if ('number' == typeof $$obj.length) {

    for (var prop = 0, $$l = $$obj.length; prop < $$l; prop++) {
      var stat = $$obj[prop];

if ( stat.display == 'true')
{
buf.push("<li>" + (jade.escape(null == (jade.interp = stat.name) ? "" : jade.interp)) + "</li>");
}
else
{
buf.push("<li>" + (jade.escape((jade.interp = stat.name) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = stat.display) == null ? '' : jade.interp)) + "</li>");
}
    }

  } else {
    var $$l = 0;
    for (var prop in $$obj) {
      $$l++;      var stat = $$obj[prop];

if ( stat.display == 'true')
{
buf.push("<li>" + (jade.escape(null == (jade.interp = stat.name) ? "" : jade.interp)) + "</li>");
}
else
{
buf.push("<li>" + (jade.escape((jade.interp = stat.name) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = stat.display) == null ? '' : jade.interp)) + "</li>");
}
    }

  }
}).call(this);

}
if ( includes.props && props.length)
{
buf.push("<li>Grants:");
// iterate props
;(function(){
  var $$obj = props;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prop = $$obj[$index];

buf.push(" <code>" + (jade.escape(null == (jade.interp = prop) ? "" : jade.interp)) + "</code>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prop = $$obj[$index];

buf.push(" <code>" + (jade.escape(null == (jade.interp = prop) ? "" : jade.interp)) + "</code>");
    }

  }
}).call(this);

buf.push("</li>");
}
buf.push("</ul>");
}
buf.push("<span class=\"status-message\"><span data-i18n=\"inventory.should_equip\" class=\"spl should-equip-message\"></span><span data-i18n=\"inventory.equipped\" class=\"spl equipped-message\"></span><span data-i18n=\"inventory.locked\" class=\"spl locked-message\"></span><span data-i18n=\"inventory.restricted\" class=\"spl restricted-message\"></span></span></div><div class=\"clearfix\"></div>");;return buf.join("");
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

;require.register("views/play/menu/ItemView", function(exports, require, module) {
var CocoView, ItemView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/menu/item-view');

module.exports = ItemView = (function(superClass) {
  extend(ItemView, superClass);

  function ItemView() {
    return ItemView.__super__.constructor.apply(this, arguments);
  }

  ItemView.prototype.className = 'item-view';

  ItemView.prototype.template = template;

  ItemView.prototype.initialize = function(options) {
    ItemView.__super__.initialize.apply(this, arguments);
    this.item = options.item;
    return this.includes = options.includes || {};
  };

  ItemView.prototype.getRenderData = function() {
    var c, props, ref, stats;
    c = ItemView.__super__.getRenderData.call(this);
    c.item = this.item;
    c.includes = this.includes;
    if (this.includes.props || this.includes.stats) {
      ref = this.item.getFrontFacingStats(), props = ref.props, stats = ref.stats;
      c.props = props;
      c.stats = stats;
    }
    return c;
  };

  ItemView.prototype.afterRender = function() {
    return this.$el.data('item-id', this.item.id);
  };

  return ItemView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/menu/ItemView.js.map