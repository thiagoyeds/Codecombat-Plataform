require.register("templates/play/modal/item-details-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),item = locals_.item,stats = locals_.stats,me = locals_.me,props = locals_.props;buf.push("<div id=\"item-title\"><h2 class=\"one-line big-font\">" + (jade.escape(null == (jade.interp = item ? item.name : '') ? "" : jade.interp)) + "</h2></div><div id=\"item-details-body\">");
if ( item)
{
buf.push("<div class=\"nano\"><div class=\"nano-content\"><div id=\"item-container\"><img" + (jade.attrs({ 'src':(item.getPortraitURL()), 'draggable':("false"), "class": [('item-img')] }, {"src":true,"draggable":true})) + "/><img" + (jade.attrs({ 'src':(item.getPortraitURL()), 'draggable':("false"), "class": [('item-shadow')] }, {"src":true,"draggable":true})) + "/></div><img src=\"/images/pages/play/modal/hr.png\" draggable=\"false\" class=\"hr\"/>");
// iterate stats
;(function(){
  var $$obj = stats;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [("stat-row big-font" + (/^en/.test(me.get('preferredLanguage')) && stat.matchedShortName ? " short-name" : ""))] }, {"class":true})) + "><div class=\"stat-label\">" + (jade.escape(null == (jade.interp = stat.name) ? "" : jade.interp)) + "</div><div class=\"stat\">" + (jade.escape(null == (jade.interp = stat.display) ? "" : jade.interp)) + "</div></div><img" + (jade.attrs({ 'src':("/images/pages/play/modal/hr.png"), 'draggable':("false"), "class": [('hr'),(stat.isLast ? "" : "faded")] }, {"class":true,"src":true,"draggable":true})) + "/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [("stat-row big-font" + (/^en/.test(me.get('preferredLanguage')) && stat.matchedShortName ? " short-name" : ""))] }, {"class":true})) + "><div class=\"stat-label\">" + (jade.escape(null == (jade.interp = stat.name) ? "" : jade.interp)) + "</div><div class=\"stat\">" + (jade.escape(null == (jade.interp = stat.display) ? "" : jade.interp)) + "</div></div><img" + (jade.attrs({ 'src':("/images/pages/play/modal/hr.png"), 'draggable':("false"), "class": [('hr'),(stat.isLast ? "" : "faded")] }, {"class":true,"src":true,"draggable":true})) + "/>");
    }

  }
}).call(this);

if ( item.description)
{
buf.push("<div class=\"item-description\">" + (jade.escape(null == (jade.interp = item.description) ? "" : jade.interp)) + "</div>");
}
if ( props.length)
{
buf.push("<div id=\"skills\"><h3 data-i18n=\"play.skills_granted\" class=\"big-font\"></h3>");
// iterate props
;(function(){
  var $$obj = props;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prop = $$obj[$index];

buf.push("<p><strong>" + (jade.escape(null == (jade.interp = prop.name) ? "" : jade.interp)) + "</strong><span class=\"spr\">:</span><span>" + (null == (jade.interp = prop.description) ? "" : jade.interp) + "</span></p>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prop = $$obj[$index];

buf.push("<p><strong>" + (jade.escape(null == (jade.interp = prop.name) ? "" : jade.interp)) + "</strong><span class=\"spr\">:</span><span>" + (null == (jade.interp = prop.description) ? "" : jade.interp) + "</span></p>");
    }

  }
}).call(this);

buf.push("</div>");
}
if ( item.comingSoon)
{
buf.push("<div class=\"text-center\"><h3>This item has no stats.</h3><p>Only admins will see it for now.</p></div>");
}
buf.push("</div></div>");
}
buf.push("</div>");
if ( item && !item.owned)
{
if ( item.unequippable)
{
buf.push("<button class=\"btn big-font disabled unequippable\">" + (jade.escape((jade.interp = item.get('heroClass')) == null ? '' : jade.interp)) + " Only</button>");
}
else
{
buf.push("<button" + (jade.attrs({ 'id':('selected-item-unlock-button'), 'data-item-id':(item.id), "class": [('btn'),('big-font'),('unlock-button')] }, {"data-item-id":true})) + "><span data-i18n=\"play.unlock\">Unlock</span><span class=\"spl\">" + (jade.escape(null == (jade.interp = '('+item.get('gems')) ? "" : jade.interp)) + "</span><img src=\"/images/common/gem.png\" draggable=\"false\"/><span>)</span></button>");
}
};return buf.join("");
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

;require.register("views/play/modal/ItemDetailsView", function(exports, require, module) {
var CocoCollection, CocoView, ItemDetailsView, LevelComponent, downTheChain, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/play/modal/item-details-view');

CocoCollection = require('collections/CocoCollection');

LevelComponent = require('models/LevelComponent');

downTheChain = require('lib/world/world_utils').downTheChain;

utils = require('core/utils');

module.exports = ItemDetailsView = (function(superClass) {
  extend(ItemDetailsView, superClass);

  ItemDetailsView.prototype.id = "item-details-view";

  ItemDetailsView.prototype.template = template;

  function ItemDetailsView() {
    ItemDetailsView.__super__.constructor.apply(this, arguments);
    this.propDocs = {};
    this.spellDocs = {};
  }

  ItemDetailsView.prototype.setItem = function(item) {
    var c, docs, p, props, stats;
    this.item = item;
    if (this.item) {
      this.spellDocs = {};
      this.item.name = utils.i18n(this.item.attributes, 'name');
      this.item.description = utils.i18n(this.item.attributes, 'description');
      this.item.affordable = me.gems() >= this.item.get('gems');
      this.item.owned = me.ownsItem(this.item.get('original'));
      this.item.comingSoon = !this.item.getFrontFacingStats().props.length && !_.size(this.item.getFrontFacingStats().stats);
      this.componentConfigs = (function() {
        var i, len, ref, results;
        ref = this.item.get('components');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          if (c.config) {
            results.push(c.config);
          }
        }
        return results;
      }).call(this);
      stats = this.item.getFrontFacingStats();
      props = (function() {
        var i, len, ref, results;
        ref = stats.props;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          if (!this.propDocs[p]) {
            results.push(p);
          }
        }
        return results;
      }).call(this);
      if (props.length > 0 || (indexOf.call(stats.props, 'cast') >= 0)) {
        docs = new CocoCollection([], {
          url: '/db/level.component?view=prop-doc-lookup',
          model: LevelComponent,
          project: ['name', 'propertyDocumentation.name', 'propertyDocumentation.description', 'propertyDocumentation.i18n']
        });
        docs.fetch({
          data: {
            componentOriginals: [
              (function() {
                var i, len, ref, results;
                ref = this.item.get('components');
                results = [];
                for (i = 0, len = ref.length; i < len; i++) {
                  c = ref[i];
                  results.push(c.original);
                }
                return results;
              }).call(this)
            ].join(','),
            propertyNames: props.join(',')
          }
        });
        this.listenToOnce(docs, 'sync', this.onDocsLoaded);
      }
    }
    return this.render();
  };

  ItemDetailsView.prototype.onDocsLoaded = function(levelComponents) {
    var component, i, j, len, len1, propDoc, ref, ref1;
    ref = levelComponents.models;
    for (i = 0, len = ref.length; i < len; i++) {
      component = ref[i];
      ref1 = component.get('propertyDocumentation');
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        propDoc = ref1[j];
        if (/^cast.+/.test(propDoc.name)) {
          this.spellDocs[propDoc.name] = propDoc;
        } else {
          this.propDocs[propDoc.name] = propDoc;
        }
      }
    }
    return this.render();
  };

  ItemDetailsView.prototype.afterRender = function() {
    ItemDetailsView.__super__.afterRender.call(this);
    return this.$el.find('.nano:visible').nanoScroller({
      alwaysVisible: true
    });
  };

  ItemDetailsView.prototype.getRenderData = function() {
    var buildsConfig, c, codeLanguage, componentConfigs, description, doc, fact, i, len, prop, ref, ref1, ref2, ref3, ref4, stats;
    c = ItemDetailsView.__super__.getRenderData.call(this);
    c.item = this.item;
    if (this.item) {
      stats = this.item.getFrontFacingStats();
      c.stats = _.values(stats.stats);
      if (c.stats.length) {
        _.last(c.stats).isLast = true;
      }
      c.props = [];
      stats.props = _.union(stats.props, _.keys(this.spellDocs));
      codeLanguage = ((ref = me.get('aceConfig')) != null ? ref : {}).language || 'python';
      ref1 = stats.props;
      for (i = 0, len = ref1.length; i < len; i++) {
        prop = ref1[i];
        doc = (ref2 = (ref3 = this.propDocs[prop]) != null ? ref3 : this.spellDocs[prop]) != null ? ref2 : {};
        description = utils.i18n(doc, 'description');
        if (_.isObject(description)) {
          description = description[codeLanguage] || _.values(description)[0];
        }
        if (_.isString(description)) {
          description = description.replace(/#{spriteName}/g, 'hero');
          if (fact = stats.stats.shieldDefenseFactor) {
            description = description.replace(/#{shieldDefensePercent}%/g, fact.display);
          }
          if (prop === 'buildTypes') {
            buildsConfig = _.find(this.componentConfigs, 'buildables');
            description = description.replace('#{buildTypes}', "`[\"" + (_.keys(buildsConfig.buildables).join('\", \"')) + "\"]`");
          }
          componentConfigs = (ref4 = this.componentConfigs) != null ? ref4 : [];
          description = description.replace(/#{([^.]+?)}/g, function(match, keyChain) {
            var componentConfig, j, len1, value;
            for (j = 0, len1 = componentConfigs.length; j < len1; j++) {
              componentConfig = componentConfigs[j];
              if (value = downTheChain(componentConfig, keyChain)) {
                return value;
              }
            }
            return match;
          });
          description = description.replace(/#{(.+?)}/g, '`$1`');
          description = $(marked(description)).html();
        }
        c.props.push({
          name: prop,
          description: description || '...'
        });
      }
    }
    return c;
  };

  return ItemDetailsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/ItemDetailsView.js.map