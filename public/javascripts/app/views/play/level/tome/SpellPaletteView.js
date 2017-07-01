require.register("templates/play/level/tome/spell-palette-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),_ = locals_._,view = locals_.view,tabs = locals_.tabs,isIE = locals_.isIE;var header_mixin = function(label, name){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<a" + (jade.attrs({ 'role':("button"), 'id':("#palette-header-" + _.string.slugify(label)), 'data-panel':("#palette-tab-" + _.string.slugify(label)), "class": [('section-header'),('btn'),('btn-small'),('btn-illustrated'),('btn-warning')] }, {"role":true,"id":true,"data-panel":true})) + ">" + (jade.escape((jade.interp = name) == null ? '' : jade.interp)) + "");
if ( label == 'api-area')
{
buf.push("<div style=\"float: right\" class=\"glyphicon glyphicon-chevron-down\"></div>");
}
else
{
buf.push("<div style=\"float: right\" class=\"glyphicon glyphicon-chevron-right\"></div>");
}
buf.push("</a>");
};
buf.push("<div class=\"container\"><div class=\"left nano\"><div id=\"spell-palette-api-bar\" class=\"nano-content panel-group\">");
if ( view.level.get('type') == 'web-dev')
{
header_mixin('api-area', 'HTML');
}
else
{
header_mixin('api-area', 'Methods');
}
buf.push("<div id=\"palette-tab-api-area\" class=\"apis panel-collapse collapse in\"><div class=\"properties properties-this\"></div></div>");
if ( tabs)
{
// iterate tabs
;(function(){
  var $$obj = tabs;
  if ('number' == typeof $$obj.length) {

    for (var tab = 0, $$l = $$obj.length; tab < $$l; tab++) {
      var entries = $$obj[tab];

header_mixin(tab, tab);
buf.push("<div" + (jade.attrs({ 'id':("palette-tab-" + _.string.slugify(tab)), "class": [('panel-collapse'),('collapse')] }, {"id":true})) + "><div" + (jade.attrs({ "class": [("properties properties-" + _.string.slugify(tab))] }, {"class":true})) + "></div></div>");
    }

  } else {
    var $$l = 0;
    for (var tab in $$obj) {
      $$l++;      var entries = $$obj[tab];

header_mixin(tab, tab);
buf.push("<div" + (jade.attrs({ 'id':("palette-tab-" + _.string.slugify(tab)), "class": [('panel-collapse'),('collapse')] }, {"id":true})) + "><div" + (jade.attrs({ "class": [("properties properties-" + _.string.slugify(tab))] }, {"class":true})) + "></div></div>");
    }

  }
}).call(this);

}
header_mixin('events', 'Events');
buf.push("<div id=\"palette-tab-events\" class=\"apis panel-collapse collapse\"></div>");
header_mixin('stuff-area', 'Spawnable');
buf.push("<div id=\"palette-tab-stuff-area\" class=\"apis panel-collapse collapse\"></div></div></div><div class=\"right\"><div class=\"closeBtn btn btn-illustrated btn-danger\"><span class=\"glyphicon glyphicon-remove\"></span></div>");
if ( isIE)
{
buf.push("<div class=\"scrollArea always-scroll-y\"><div class=\"scrollableArea\"><div class=\"rightContentTarget content\"></div></div></div>");
}
else
{
buf.push("<div class=\"scrollArea\"><div class=\"scrollableArea\"><div class=\"rightContentTarget content\"></div></div></div>");
}
buf.push("</div></div>");;return buf.join("");
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

;require.register("views/play/level/tome/SpellPaletteView", function(exports, require, module) {
var CocoView, GameMenuModal, LevelComponent, LevelSetupManager, N_ROWS, SpellPaletteEntryView, SpellPaletteThangEntryView, SpellPaletteView, ThangType, ace, filters, me, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

me = require('core/auth').me;

filters = require('lib/image_filter');

SpellPaletteEntryView = require('./SpellPaletteEntryView');

SpellPaletteThangEntryView = require('./SpellPaletteThangEntryView');

LevelComponent = require('models/LevelComponent');

ThangType = require('models/ThangType');

GameMenuModal = require('views/play/menu/GameMenuModal');

LevelSetupManager = require('lib/LevelSetupManager');

ace = require('ace');

utils = require('core/utils');

N_ROWS = 4;

module.exports = SpellPaletteView = (function(superClass) {
  extend(SpellPaletteView, superClass);

  function SpellPaletteView() {
    this.hide = bind(this.hide, this);
    this.onResize = bind(this.onResize, this);
    return SpellPaletteView.__super__.constructor.apply(this, arguments);
  }

  SpellPaletteView.prototype.id = 'spell-palette-view';

  SpellPaletteView.prototype.template = require('templates/play/level/tome/spell-palette-view');

  SpellPaletteView.prototype.controlsEnabled = true;

  SpellPaletteView.prototype.subscriptions = {
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'surface:frame-changed': 'onFrameChanged',
    'tome:change-language': 'onTomeChangedLanguage',
    'tome:palette-clicked': 'onPalleteClick',
    'surface:stage-mouse-down': 'hide',
    'level:set-playing': 'hide'
  };

  SpellPaletteView.prototype.events = {
    'click #spell-palette-help-button': 'onClickHelp',
    'click .closeBtn': 'onClickClose',
    'click .section-header': 'onSectionHeaderClick'
  };

  SpellPaletteView.prototype.initialize = function(options) {
    var docs, ref, ref1, ref2;
    this.level = options.level, this.session = options.session, this.thang = options.thang, this.useHero = options.useHero;
    this.aceEditors = [];
    docs = (ref = this.options.level.get('documentation')) != null ? ref : {};
    this.showsHelp = ((ref1 = docs.specificArticles) != null ? ref1.length : void 0) || ((ref2 = docs.generalArticles) != null ? ref2.length : void 0);
    this.createPalette();
    $(window).on('resize', this.onResize);
    return console.log("My thang is", this.thang);
  };

  SpellPaletteView.prototype.getRenderData = function() {
    var c;
    c = SpellPaletteView.__super__.getRenderData.call(this);
    c.entryGroups = this.entryGroups;
    c.entryGroupSlugs = this.entryGroupSlugs;
    c.entryGroupNames = this.entryGroupNames;
    c.tabbed = _.size(this.entryGroups) > 1;
    c.defaultGroupSlug = this.defaultGroupSlug;
    c.showsHelp = this.showsHelp;
    c.tabs = this.tabs;
    c.thisName = {
      coffeescript: '@',
      lua: 'self',
      python: 'self',
      java: 'hero'
    }[this.options.language] || 'this';
    c._ = _;
    return c;
  };

  SpellPaletteView.prototype.afterRender = function() {
    var col, columnNumber, dn, doc, entries, entry, entryColumn, entryIndex, firstEntry, group, groupSlug, info, itemGroup, itemImage, itemsInGroup, j, k, l, len, len1, len2, ref, ref1, ref2, ref3, t, tab, tabSlug, thangName, tt, tts;
    SpellPaletteView.__super__.afterRender.call(this);
    if (this.entryGroupSlugs) {
      ref = this.entryGroups;
      for (group in ref) {
        entries = ref[group];
        groupSlug = this.entryGroupSlugs[group];
        for (columnNumber in entries) {
          entryColumn = entries[columnNumber];
          col = $('<div class="property-entry-column"></div>').appendTo(this.$el.find(".properties-" + groupSlug));
          for (j = 0, len = entryColumn.length; j < len; j++) {
            entry = entryColumn[j];
            col.append(entry.el);
            entry.render();
          }
        }
      }
      this.$('.nano').nanoScroller({
        alwaysVisible: true
      });
      this.updateCodeLanguage(this.options.language);
    } else {
      this.entryGroupElements = {};
      ref1 = this.entryGroups;
      for (group in ref1) {
        entries = ref1[group];
        this.entryGroupElements[group] = itemGroup = $('<div class="property-entry-item-group"></div>').appendTo(this.$el.find('.properties-this'));
        if ((ref2 = entries[0].options.item) != null ? ref2.getPortraitURL : void 0) {
          itemImage = $('<img class="item-image" draggable=false></img>').attr('src', entries[0].options.item.getPortraitURL());
          itemGroup.append(itemImage);
          firstEntry = entries[0];
          (function(firstEntry) {
            itemImage.on("mouseenter", function(e) {
              return firstEntry.onMouseEnter(e);
            });
            return itemImage.on("mouseleave", function(e) {
              return firstEntry.onMouseLeave(e);
            });
          })(firstEntry);
        }
        for (entryIndex = k = 0, len1 = entries.length; k < len1; entryIndex = ++k) {
          entry = entries[entryIndex];
          itemGroup.append(entry.el);
          entry.render();
          if (entries.length === 1) {
            entry.$el.addClass('single-entry');
          }
          if (entryIndex === 0) {
            entry.$el.addClass('first-entry');
          }
        }
      }
      ref3 = this.tabs || {};
      for (tab in ref3) {
        entries = ref3[tab];
        tabSlug = _.string.slugify(tab);
        itemsInGroup = 0;
        for (entryIndex = l = 0, len2 = entries.length; l < len2; entryIndex = ++l) {
          entry = entries[entryIndex];
          if (itemsInGroup === 0 || (itemsInGroup === 2 && entryIndex !== entries.length - 1)) {
            itemGroup = $('<div class="property-entry-item-group"></div>').appendTo(this.$el.find(".properties-" + tabSlug));
            itemsInGroup = 0;
          }
          ++itemsInGroup;
          itemGroup.append(entry.el);
          entry.render();
          if (itemsInGroup === 0) {
            entry.$el.addClass('first-entry');
          }
        }
      }
      this.$el.addClass('hero');
      this.$el.toggleClass('shortenize', Boolean(this.shortenize));
      this.$el.toggleClass('web-dev', this.options.level.isType('web-dev'));
    }
    tts = this.supermodel.getModels(ThangType);
    console.log(this.deferredDocs);
    for (dn in this.deferredDocs) {
      doc = this.deferredDocs[dn];
      if (doc.type === "spawnable") {
        thangName = doc.name;
        if (this.thang.spawnAliases[thangName]) {
          thangName = this.thang.spawnAliases[thangName][0];
        }
        info = this.thang.buildables[thangName];
        tt = _.find(tts, function(t) {
          return t.get('original') === (info != null ? info.thangType : void 0);
        });
        if (tt == null) {
          continue;
        }
        t = new SpellPaletteThangEntryView({
          doc: doc,
          thang: tt,
          buildable: info,
          buildableName: doc.name,
          shortenize: true,
          language: this.options.language,
          level: this.options.level,
          useHero: this.useHero
        });
        this.$el.find("#palette-tab-stuff-area").append(t.el);
        t.render();
      }
      if (doc.type === "event") {
        t = new SpellPaletteEntryView({
          doc: doc,
          thang: this.thang,
          shortenize: true,
          language: this.options.language,
          level: this.options.level,
          useHero: this.useHero
        });
        this.$el.find("#palette-tab-events").append(t.el);
        t.render();
      }
    }
    return this.$(".section-header:has(+.collapse:empty)").hide();
  };

  SpellPaletteView.prototype.afterInsert = function() {
    SpellPaletteView.__super__.afterInsert.call(this);
    return _.delay((function(_this) {
      return function() {
        var ref;
        if (!$('#spell-view').is('.shown')) {
          return (ref = _this.$el) != null ? ref.css('bottom', 0) : void 0;
        }
      };
    })(this));
  };

  SpellPaletteView.prototype.updateCodeLanguage = function(language) {
    return this.options.language = language;
  };

  SpellPaletteView.prototype.onResize = function(e) {
    return typeof this.updateMaxHeight === "function" ? this.updateMaxHeight() : void 0;
  };

  SpellPaletteView.prototype.createPalette = function() {
    var allDocs, doc, excludedDocs, j, k, lc, lcs, len, len1, name, propStorage, ref, ref1, ref2;
    Backbone.Mediator.publish('tome:palette-cleared', {
      thangID: this.thang.id
    });
    lcs = this.supermodel.getModels(LevelComponent);
    allDocs = {};
    excludedDocs = {};
    for (j = 0, len = lcs.length; j < len; j++) {
      lc = lcs[j];
      ref1 = (ref = lc.get('propertyDocumentation')) != null ? ref : [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        doc = ref1[k];
        if (doc.codeLanguages && !(ref2 = this.options.language, indexOf.call(doc.codeLanguages, ref2) >= 0)) {
          excludedDocs['__' + doc.name] = doc;
          continue;
        }
        if (allDocs[name = '__' + doc.name] == null) {
          allDocs[name] = [];
        }
        allDocs['__' + doc.name].push(doc);
        if (doc.type === 'snippet') {
          doc.owner = 'snippets';
        }
      }
    }
    if (this.options.programmable) {
      propStorage = {
        'this': 'programmableProperties',
        more: 'moreProgrammableProperties',
        Math: 'programmableMathProperties',
        Array: 'programmableArrayProperties',
        Object: 'programmableObjectProperties',
        String: 'programmableStringProperties',
        Global: 'programmableGlobalProperties',
        Function: 'programmableFunctionProperties',
        RegExp: 'programmableRegExpProperties',
        Date: 'programmableDateProperties',
        Number: 'programmableNumberProperties',
        JSON: 'programmableJSONProperties',
        LoDash: 'programmableLoDashProperties',
        Vector: 'programmableVectorProperties',
        HTML: 'programmableHTMLProperties',
        WebJavaScript: 'programmableWebJavaScriptProperties',
        jQuery: 'programmableJQueryProperties',
        CSS: 'programmableCSSProperties',
        snippets: 'programmableSnippets'
      };
    } else {
      propStorage = {
        'this': ['apiProperties', 'apiMethods']
      };
    }
    if (!this.options.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev') || !this.options.programmable) {
      return this.organizePalette(propStorage, allDocs, excludedDocs);
    } else {
      return this.organizePaletteHero(propStorage, allDocs, excludedDocs);
    }
  };

  SpellPaletteView.prototype.organizePalette = function(propStorage, allDocs, excludedDocs) {
    var added, count, defaultGroup, doc, entries, group, groupForEntry, i18nKey, j, k, len, len1, owner, prop, propGroups, props, ref, ref1, ref2, ref3, storage, storages, tabbify, thisName;
    count = 0;
    propGroups = {};
    for (owner in propStorage) {
      storages = propStorage[owner];
      if (_.isString(storages)) {
        storages = [storages];
      }
      for (j = 0, len = storages.length; j < len; j++) {
        storage = storages[j];
        props = _.reject((ref = this.thang[storage]) != null ? ref : [], function(prop) {
          return prop[0] === '_';
        });
        props = _.uniq(props);
        added = _.sortBy(props).slice();
        propGroups[owner] = ((ref1 = propGroups[owner]) != null ? ref1 : []).concat(added);
        count += added.length;
      }
    }
    Backbone.Mediator.publish('tome:update-snippets', {
      propGroups: propGroups,
      allDocs: allDocs,
      language: this.options.language
    });
    this.shortenize = count > 6;
    tabbify = count >= 10;
    this.entries = [];
    for (owner in propGroups) {
      props = propGroups[owner];
      for (k = 0, len1 = props.length; k < len1; k++) {
        prop = props[k];
        doc = _.find((ref2 = allDocs['__' + prop]) != null ? ref2 : [], function(doc) {
          if (doc.owner === owner) {
            return true;
          }
          return (owner === 'this' || owner === 'more') && ((doc.owner == null) || doc.owner === 'this');
        });
        if (!doc && !excludedDocs['__' + prop]) {
          console.log('could not find doc for', prop, 'from', allDocs['__' + prop], 'for', owner, 'of', propGroups);
          if (doc == null) {
            doc = prop;
          }
        }
        if (doc) {
          this.entries.push(this.addEntry(doc, this.shortenize, owner === 'snippets'));
        }
      }
    }
    groupForEntry = function(entry) {
      var ref3, ref4;
      if (entry.doc.owner === 'this' && (ref3 = entry.doc.name, indexOf.call((ref4 = propGroups.more) != null ? ref4 : [], ref3) >= 0)) {
        return 'more';
      }
      return entry.doc.owner;
    };
    this.entries = _.sortBy(this.entries, function(entry) {
      var index, order;
      order = ['this', 'more', 'Math', 'Vector', 'String', 'Object', 'Array', 'Function', 'HTML', 'CSS', 'WebJavaScript', 'jQuery', 'snippets'];
      index = order.indexOf(groupForEntry(entry));
      index = String.fromCharCode(index === -1 ? order.length : index);
      return index += entry.doc.name;
    });
    if (tabbify && _.find(this.entries, (function(entry) {
      return entry.doc.owner !== 'this';
    }))) {
      this.entryGroups = _.groupBy(this.entries, groupForEntry);
    } else {
      i18nKey = this.options.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev') ? 'play_level.tome_your_skills' : 'play_level.tome_available_spells';
      defaultGroup = $.i18n.t(i18nKey);
      this.entryGroups = {};
      this.entryGroups[defaultGroup] = this.entries;
      this.defaultGroupSlug = _.string.slugify(defaultGroup);
    }
    this.entryGroupSlugs = {};
    this.entryGroupNames = {};
    ref3 = this.entryGroups;
    for (group in ref3) {
      entries = ref3[group];
      this.entryGroups[group] = _.groupBy(entries, function(entry, i) {
        return Math.floor(i / N_ROWS);
      });
      this.entryGroupSlugs[group] = _.string.slugify(group);
      this.entryGroupNames[group] = group;
    }
    if (thisName = {
      coffeescript: '@',
      lua: 'self',
      python: 'self'
    }[this.options.language]) {
      if (this.entryGroupNames["this"]) {
        return this.entryGroupNames["this"] = thisName;
      }
    }
  };

  SpellPaletteView.prototype.organizePaletteHero = function(propStorage, allDocs, excludedDocs) {
    var component, doc, entries, entry, group, iOSEntryGroups, item, itemName, itemThangTypes, itemsByProp, j, k, l, len, len1, len2, len3, len4, len5, len6, m, n, name, o, owner, p, programmaticon, programmaticonName, prop, propCount, propIndex, props, propsByItem, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, slot, slots, sortedProps, storage, storages, thangTypeName, tt;
    this.isHero = true;
    itemThangTypes = {};
    ref = this.supermodel.getModels(ThangType);
    for (j = 0, len = ref.length; j < len; j++) {
      tt = ref[j];
      itemThangTypes[tt.get('name')] = tt;
    }
    propsByItem = {};
    propCount = 0;
    itemsByProp = {};
    this.deferredDocs = {};
    slots = _.sortBy(_.keys((ref1 = this.thang.inventoryThangTypeNames) != null ? ref1 : {}), function(slot) {
      if (slot === 'left-hand') {
        return 0;
      } else if (slot === 'right-hand') {
        return 1;
      } else {
        return 2;
      }
    });
    for (k = 0, len1 = slots.length; k < len1; k++) {
      slot = slots[k];
      thangTypeName = this.thang.inventoryThangTypeNames[slot];
      if (item = itemThangTypes[thangTypeName]) {
        if (!item.get('components')) {
          console.error('Item', item, 'did not have any components when we went to assemble docs.');
        }
        ref3 = (ref2 = item.get('components')) != null ? ref2 : [];
        for (l = 0, len2 = ref3.length; l < len2; l++) {
          component = ref3[l];
          if (component.config) {
            for (owner in propStorage) {
              storages = propStorage[owner];
              if (props = component.config[storages]) {
                ref4 = _.sortBy(props);
                for (m = 0, len3 = ref4.length; m < len3; m++) {
                  prop = ref4[m];
                  if (!(prop[0] !== '_' && !itemsByProp[prop])) {
                    continue;
                  }
                  if (prop === 'moveXY' && this.options.level.get('slug') === 'slalom') {
                    continue;
                  }
                  if (propsByItem[name = item.get('name')] == null) {
                    propsByItem[name] = [];
                  }
                  propsByItem[item.get('name')].push({
                    owner: owner,
                    prop: prop,
                    item: item
                  });
                  itemsByProp[prop] = item;
                  ++propCount;
                }
              }
            }
          }
        }
      } else {
        console.log(this.thang.id, "couldn't find item ThangType for", slot, thangTypeName);
      }
    }
    for (owner in propStorage) {
      storage = propStorage[owner];
      if (!(!(owner === 'this' || owner === 'more' || owner === 'snippets' || owner === 'HTML' || owner === 'CSS' || owner === 'WebJavaScript' || owner === 'jQuery'))) {
        continue;
      }
      if (!((ref5 = this.thang[storage]) != null ? ref5.length : void 0)) {
        continue;
      }
      if (this.tabs == null) {
        this.tabs = {};
      }
      this.tabs[owner] = [];
      programmaticonName = this.thang.inventoryThangTypeNames['programming-book'];
      programmaticon = itemThangTypes[programmaticonName];
      sortedProps = this.thang[storage].slice().sort();
      for (n = 0, len4 = sortedProps.length; n < len4; n++) {
        prop = sortedProps[n];
        if (doc = _.find((ref6 = allDocs['__' + prop]) != null ? ref6 : [], {
          owner: owner
        })) {
          entry = this.addEntry(doc, false, false, programmaticon);
          this.tabs[owner].push(entry);
        }
      }
    }
    for (owner in propStorage) {
      storage = propStorage[owner];
      if (owner !== 'this' && owner !== 'more' && owner !== 'snippets' && owner !== 'HTML' && owner !== 'CSS' && owner !== 'WebJavaScript' && owner !== 'jQuery') {
        continue;
      }
      ref8 = _.reject((ref7 = this.thang[storage]) != null ? ref7 : [], function(prop) {
        return itemsByProp[prop] || prop[0] === '_';
      });
      for (o = 0, len5 = ref8.length; o < len5; o++) {
        prop = ref8[o];
        if (prop === 'say' && this.options.level.get('hidesSay')) {
          continue;
        }
        if (prop === 'moveXY' && this.options.level.get('slug') === 'slalom') {
          continue;
        }
        if (propsByItem['Hero'] == null) {
          propsByItem['Hero'] = [];
        }
        propsByItem['Hero'].push({
          owner: owner,
          prop: prop,
          item: itemThangTypes[this.thang.spriteName]
        });
        ++propCount;
      }
    }
    Backbone.Mediator.publish('tome:update-snippets', {
      propGroups: propsByItem,
      allDocs: allDocs,
      language: this.options.language
    });
    this.shortenize = propCount > 6;
    this.entries = [];
    for (itemName in propsByItem) {
      props = propsByItem[itemName];
      for (propIndex = p = 0, len6 = props.length; p < len6; propIndex = ++p) {
        prop = props[propIndex];
        item = prop.item;
        owner = prop.owner;
        prop = prop.prop;
        doc = _.find((ref9 = allDocs['__' + prop]) != null ? ref9 : [], function(doc) {
          if (doc.owner === owner) {
            return true;
          }
          return (owner === 'this' || owner === 'more') && ((doc.owner == null) || doc.owner === 'this');
        });
        if (!doc && !excludedDocs['__' + prop]) {
          console.log('could not find doc for', prop, 'from', allDocs['__' + prop], 'for', owner, 'of', propsByItem, 'with item', item);
          if (doc == null) {
            doc = prop;
          }
        }
        if (doc) {
          if ((ref10 = doc.type) === 'spawnable' || ref10 === 'event') {
            this.deferredDocs[doc.name] = doc;
          } else {
            this.entries.push(this.addEntry(doc, this.shortenize, owner === 'snippets', item, propIndex > 0));
          }
        }
      }
    }
    if (this.options.level.isType('web-dev')) {
      this.entryGroups = _.groupBy(this.entries, function(entry) {
        return entry.doc.type;
      });
    } else {
      this.entryGroups = _.groupBy(this.entries, function(entry) {
        var ref11, ref12;
        return (ref11 = (ref12 = itemsByProp[entry.doc.name]) != null ? ref12.get('name') : void 0) != null ? ref11 : 'Hero';
      });
    }
    iOSEntryGroups = {};
    ref11 = this.entryGroups;
    for (group in ref11) {
      entries = ref11[group];
      iOSEntryGroups[group] = {
        item: {
          name: group,
          imageURL: (ref12 = itemThangTypes[group]) != null ? ref12.getPortraitURL() : void 0
        },
        props: (function() {
          var len7, q, results;
          results = [];
          for (q = 0, len7 = entries.length; q < len7; q++) {
            entry = entries[q];
            results.push(entry.doc);
          }
          return results;
        })()
      };
    }
    return Backbone.Mediator.publish('tome:palette-updated', {
      thangID: this.thang.id,
      entryGroups: JSON.stringify(iOSEntryGroups)
    });
  };

  SpellPaletteView.prototype.addEntry = function(doc, shortenize, isSnippet, item, showImage) {
    var ref, ref1, writable;
    if (isSnippet == null) {
      isSnippet = false;
    }
    if (item == null) {
      item = null;
    }
    if (showImage == null) {
      showImage = false;
    }
    writable = (ref = (_.isString(doc) ? doc : doc.name), indexOf.call((ref1 = this.thang.apiUserProperties) != null ? ref1 : [], ref) >= 0);
    return new SpellPaletteEntryView({
      doc: doc,
      thang: this.thang,
      shortenize: shortenize,
      isSnippet: isSnippet,
      language: this.options.language,
      writable: writable,
      level: this.options.level,
      item: item,
      showImage: showImage,
      useHero: this.useHero
    });
  };

  SpellPaletteView.prototype.onDisableControls = function(e) {
    return this.toggleControls(e, false);
  };

  SpellPaletteView.prototype.onEnableControls = function(e) {
    return this.toggleControls(e, true);
  };

  SpellPaletteView.prototype.toggleControls = function(e, enabled) {
    if (e.controls && !(indexOf.call(e.controls, 'palette') >= 0)) {
      return;
    }
    if (enabled === this.controlsEnabled) {
      return;
    }
    this.controlsEnabled = enabled;
    this.$el.find('*').attr('disabled', !enabled);
    return this.$el.toggleClass('controls-disabled', !enabled);
  };

  SpellPaletteView.prototype.onFrameChanged = function(e) {
    var ref;
    if (((ref = e.selectedThang) != null ? ref.id : void 0) !== this.thang.id) {
      return;
    }
    return this.options.thang = this.thang = e.selectedThang;
  };

  SpellPaletteView.prototype.onTomeChangedLanguage = function(e) {
    var entry, j, len, ref;
    this.updateCodeLanguage(e.language);
    ref = this.entries;
    for (j = 0, len = ref.length; j < len; j++) {
      entry = ref[j];
      entry.destroy();
    }
    this.createPalette();
    return this.render();
  };

  SpellPaletteView.prototype.onSectionHeaderClick = function(e) {
    var $et, isCollapsed, target;
    $et = this.$(e.target);
    target = this.$($et.attr('data-panel'));
    isCollapsed = !target.hasClass('in');
    console.log("O", target[0], isCollapsed);
    if (isCollapsed) {
      target.collapse('show');
      $et.find('.glyphicon').removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
    } else {
      target.collapse('hide');
      $et.find('.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
    }
    setTimeout((function(_this) {
      return function() {
        return _this.$('.nano').nanoScroller({
          alwaysVisible: true
        });
      };
    })(this), 200);
    return e.preventDefault();
  };

  SpellPaletteView.prototype.onClickHelp = function(e) {
    var gameMenuModal, ref;
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Spell palette help clicked', {
        levelID: this.level.get('slug')
      });
    }
    gameMenuModal = new GameMenuModal({
      showTab: 'guide',
      level: this.level,
      session: this.session,
      supermodel: this.supermodel
    });
    this.openModalView(gameMenuModal);
    return this.listenToOnce(gameMenuModal, 'change-hero', function() {
      var ref1;
      if ((ref1 = this.setupManager) != null) {
        ref1.destroy();
      }
      this.setupManager = new LevelSetupManager({
        supermodel: this.supermodel,
        level: this.level,
        levelID: this.level.get('slug'),
        parent: this,
        session: this.session,
        courseID: this.options.courseID,
        courseInstanceID: this.options.courseInstanceID
      });
      return this.setupManager.open();
    });
  };

  SpellPaletteView.prototype.onClickClose = function(e) {
    return this.hide();
  };

  SpellPaletteView.prototype.hide = function() {
    this.$el.find('.left .selected').removeClass('selected');
    return this.$el.removeClass('open');
  };

  SpellPaletteView.prototype.onPalleteClick = function(e) {
    var aceEditors, codeLanguage, content, j, len, oldEditor, ref;
    this.$el.addClass('open');
    content = this.$el.find(".rightContentTarget");
    content.html(e.entry.doc.initialHTML);
    codeLanguage = e.entry.options.language;
    ref = this.aceEditors;
    for (j = 0, len = ref.length; j < len; j++) {
      oldEditor = ref[j];
      oldEditor.destroy();
    }
    this.aceEditors = [];
    aceEditors = this.aceEditors;
    return content.find('.docs-ace').each(function() {
      var aceEditor;
      aceEditor = utils.initializeACE(this, codeLanguage);
      return aceEditors.push(aceEditor);
    });
  };

  SpellPaletteView.prototype.destroy = function() {
    var entry, j, len, ref, ref1;
    ref = this.entries;
    for (j = 0, len = ref.length; j < len; j++) {
      entry = ref[j];
      entry.destroy();
    }
    this.toggleBackground = null;
    $(window).off('resize', this.onResize);
    if ((ref1 = this.setupManager) != null) {
      ref1.destroy();
    }
    return SpellPaletteView.__super__.destroy.call(this);
  };

  return SpellPaletteView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/SpellPaletteView.js.map