require.register("templates/play/menu/guide-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),docs = locals_.docs,showVideo = locals_.showVideo,videoLocked = locals_.videoLocked;if ( docs.length === 1)
{
if ( showVideo)
{
buf.push("<h3 id=\"help-video-heading\" data-i18n=\"game_menu.guide_video_tutorial\"></h3>");
if ( videoLocked)
{
buf.push("<p data-i18n=\"subscribe.unlock_help_videos\">Subscribe to unlock all video tutorials.</p><button data-i18n=\"subscribe.subscribe_title\" class=\"start-subscription-button btn btn-lg btn-success\">Subscribe</button>");
}
else
{
buf.push("<div id=\"help-video-player\"></div>");
}
}
buf.push("<h3 data-i18n=\"game_menu.guide_tips\"></h3><div>" + (null == (jade.interp = docs[0].html) ? "" : jade.interp) + "</div>");
}
else
{
buf.push("<ul class=\"nav nav-tabs\">");
if ( showVideo)
{
buf.push("<li><a data-target=\"#docs_tab_help_video\" data-toggle=\"tab\" data-i18n=\"game_menu.guide_video_tutorial\"></a></li>");
}
// iterate docs
;(function(){
  var $$obj = docs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<li><a" + (jade.attrs({ 'data-target':("#docs_tab_" + (doc.slug) + ""), 'data-toggle':("tab") }, {"data-target":true,"data-toggle":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<li><a" + (jade.attrs({ 'data-target':("#docs_tab_" + (doc.slug) + ""), 'data-toggle':("tab") }, {"data-target":true,"data-toggle":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</a></li>");
    }

  }
}).call(this);

buf.push("</ul><div class=\"tab-content\">");
if ( showVideo)
{
buf.push("<div id=\"docs_tab_help_video\" class=\"tab-pane\">");
if ( videoLocked)
{
buf.push("<p data-i18n=\"subscribe.unlock_help_videos\">Subscribe to unlock all video tutorials.</p><button data-i18n=\"subscribe.subscribe_title\" class=\"start-subscription-button btn btn-lg btn-success\">Subscribe</button>");
}
else
{
buf.push("<div id=\"help-video-player\"></div>");
}
buf.push("</div>");
}
// iterate docs
;(function(){
  var $$obj = docs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("docs_tab_" + (doc.slug) + ""), "class": [('tab-pane')] }, {"id":true})) + ">" + (null == (jade.interp = doc.html) ? "" : jade.interp) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("docs_tab_" + (doc.slug) + ""), "class": [('tab-pane')] }, {"id":true})) + ">" + (null == (jade.interp = doc.html) ? "" : jade.interp) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
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

;require.register("views/play/menu/GuideView", function(exports, require, module) {
var Article, CocoView, LevelGuideView, SubscribeModal, ace, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/menu/guide-view');

Article = require('models/Article');

SubscribeModal = require('views/core/SubscribeModal');

ace = require('ace');

utils = require('core/utils');

module.exports = LevelGuideView = (function(superClass) {
  extend(LevelGuideView, superClass);

  LevelGuideView.prototype.template = template;

  LevelGuideView.prototype.id = 'guide-view';

  LevelGuideView.prototype.className = 'tab-pane';

  LevelGuideView.prototype.helpVideoHeight = '295';

  LevelGuideView.prototype.helpVideoWidth = '471';

  LevelGuideView.prototype.events = {
    'click .start-subscription-button': 'clickSubscribe'
  };

  function LevelGuideView(options) {
    this.clickTab = bind(this.clickTab, this);
    var article, articleMap, articles, doc, general, i, j, k, l, len, len1, len2, len3, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, specific;
    LevelGuideView.__super__.constructor.call(this, options);
    this.levelSlug = options.level.get('slug');
    this.sessionID = options.session.get('_id');
    this.requiresSubscription = !me.isPremium();
    this.isCourseLevel = options.level.isType('course', 'course-ladder');
    this.helpVideos = this.isCourseLevel ? [] : (ref1 = options.level.get('helpVideos')) != null ? ref1 : [];
    this.trackedHelpVideoStart = this.trackedHelpVideoFinish = false;
    this.helpVideosIndex = me.getVideoTutorialStylesIndex(this.helpVideos.length);
    if (this.helpVideos.length > 0 && !this.isCourseLevel) {
      this.helpVideo = this.helpVideos[this.helpVideosIndex];
    }
    this.videoLocked = !(((ref2 = this.helpVideo) != null ? ref2.free : void 0) || this.isCourseLevel) && this.requiresSubscription;
    this.firstOnly = options.firstOnly;
    if (window.serverConfig.picoCTF) {
      this.docs = (ref3 = (ref4 = options != null ? options.docs : void 0) != null ? ref4 : options.level.get('documentation')) != null ? ref3 : {};
      general = this.docs.generalArticles || [];
      specific = this.docs.specificArticles || [];
      articles = options.supermodel.getModels(Article);
      articleMap = {};
      for (i = 0, len = articles.length; i < len; i++) {
        article = articles[i];
        articleMap[article.get('original')] = article;
      }
      general = (function() {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = general.length; j < len1; j++) {
          ref = general[j];
          results.push(articleMap[ref.original]);
        }
        return results;
      })();
      general = (function() {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = general.length; j < len1; j++) {
          article = general[j];
          if (article) {
            results.push(article.attributes);
          }
        }
        return results;
      })();
      this.docs = specific.concat(general);
      this.docs = $.extend(true, [], this.docs);
      if (this.firstOnly && this.docs[0]) {
        this.docs = [this.docs[0]];
      }
      this.addPicoCTFProblem();
      ref5 = this.docs;
      for (j = 0, len1 = ref5.length; j < len1; j++) {
        doc = ref5[j];
        doc.html = marked(utils.filterMarkdownCodeLanguages(utils.i18n(doc, 'body'), options.session.get('codeLanguage')));
      }
      ref6 = this.docs;
      for (k = 0, len2 = ref6.length; k < len2; k++) {
        doc = ref6[k];
        doc.slug = _.string.slugify(doc.name);
      }
      ref7 = this.docs;
      for (l = 0, len3 = ref7.length; l < len3; l++) {
        doc = ref7[l];
        doc.name = utils.i18n(doc, 'name');
      }
    } else {
      this.docs = [];
    }
  }

  LevelGuideView.prototype.destroy = function() {
    var i, len, oldEditor, ref1, ref2;
    if (this.vimeoListenerAttached) {
      if (window.addEventListener) {
        window.removeEventListener('message', this.onMessageReceived, false);
      } else {
        window.detachEvent('onmessage', this.onMessageReceived, false);
      }
    }
    ref2 = (ref1 = this.aceEditors) != null ? ref1 : [];
    for (i = 0, len = ref2.length; i < len; i++) {
      oldEditor = ref2[i];
      oldEditor.destroy();
    }
    return LevelGuideView.__super__.destroy.call(this);
  };

  LevelGuideView.prototype.getRenderData = function() {
    var c;
    c = LevelGuideView.__super__.getRenderData.call(this);
    c.docs = this.docs;
    if (!this.isCourseLevel) {
      c.showVideo = this.helpVideos.length > 0;
    }
    c.videoLocked = this.videoLocked;
    return c;
  };

  LevelGuideView.prototype.afterRender = function() {
    var startingTab;
    LevelGuideView.__super__.afterRender.call(this);
    if (!this.videoLocked) {
      this.setupVideoPlayer();
    }
    if (this.docs.length + this.helpVideos.length > 1) {
      if (this.helpVideos.length) {
        startingTab = 0;
      } else {
        startingTab = _.findIndex(this.docs, {
          slug: 'overview'
        });
        if (startingTab === -1) {
          startingTab = 0;
        }
      }
      this.$el.find(".nav-tabs li:nth(" + startingTab + ")").addClass('active');
      this.$el.find(".tab-content .tab-pane:nth(" + startingTab + ")").addClass('active');
      this.$el.find('.nav-tabs a').click(this.clickTab);
      this.$el.addClass('has-tabs');
    }
    this.configureACEEditors();
    return this.playSound('guide-open');
  };

  LevelGuideView.prototype.configureACEEditors = function() {
    var aceEditors, codeLanguage, i, len, oldEditor, ref1, ref2, ref3;
    ref2 = (ref1 = this.aceEditors) != null ? ref1 : [];
    for (i = 0, len = ref2.length; i < len; i++) {
      oldEditor = ref2[i];
      oldEditor.destroy();
    }
    this.aceEditors = [];
    aceEditors = this.aceEditors;
    codeLanguage = this.options.session.get('codeLanguage') || ((ref3 = me.get('aceConfig')) != null ? ref3.language : void 0) || 'python';
    return this.$el.find('pre').each(function() {
      var aceEditor;
      aceEditor = utils.initializeACE(this, codeLanguage);
      return aceEditors.push(aceEditor);
    });
  };

  LevelGuideView.prototype.clickSubscribe = function(e) {
    var level, ref1;
    level = this.levelSlug;
    this.openModalView(new SubscribeModal());
    return (ref1 = window.tracker) != null ? ref1.trackEvent('Show subscription modal', {
      category: 'Subscription',
      label: 'help video clicked',
      level: level,
      levelID: level
    }) : void 0;
  };

  LevelGuideView.prototype.clickTab = function(e) {
    this.$el.find('li.active').removeClass('active');
    return this.playSound('guide-tab-switch');
  };

  LevelGuideView.prototype.afterInsert = function() {
    LevelGuideView.__super__.afterInsert.call(this);
    return Backbone.Mediator.publish('level:docs-shown', {});
  };

  LevelGuideView.prototype.onHidden = function() {
    var player, ref1, ref2, ref3;
    if (this.vimeoListenerAttached) {
      player = this.$('#help-video-player')[0];
      player.contentWindow.postMessage(JSON.stringify({
        method: 'pause'
      }), '*');
    }
    if (typeof createjs !== "undefined" && createjs !== null) {
      if ((ref1 = createjs.Sound) != null) {
        if (typeof ref1.setVolume === "function") {
          ref1.setVolume((ref2 = this.volume) != null ? ref2 : (ref3 = me.get('volume')) != null ? ref3 : 1.0);
        }
      }
    }
    return Backbone.Mediator.publish('level:docs-hidden', {});
  };

  LevelGuideView.prototype.onShown = function() {
    var ref1, ref2;
    if (this.volume == null) {
      this.volume = (ref1 = me.get('volume')) != null ? ref1 : 1.0;
    }
    return typeof createjs !== "undefined" && createjs !== null ? (ref2 = createjs.Sound) != null ? ref2.setVolume(0.0) : void 0 : void 0;
  };

  LevelGuideView.prototype.onStartHelpVideo = function() {
    var ref1, ref2;
    if (!this.trackedHelpVideoStart) {
      if ((ref1 = window.tracker) != null) {
        ref1.trackEvent('Start help video', {
          level: this.levelSlug,
          ls: this.sessionID,
          style: (ref2 = this.helpVideo) != null ? ref2.style : void 0
        });
      }
      return this.trackedHelpVideoStart = true;
    }
  };

  LevelGuideView.prototype.onFinishHelpVideo = function() {
    var ref1, ref2;
    if (!this.trackedHelpVideoFinish) {
      if ((ref1 = window.tracker) != null) {
        ref1.trackEvent('Finish help video', {
          level: this.levelSlug,
          ls: this.sessionID,
          style: (ref2 = this.helpVideo) != null ? ref2.style : void 0
        });
      }
      return this.trackedHelpVideoFinish = true;
    }
  };

  LevelGuideView.prototype.setupVideoPlayer = function() {
    var url;
    if (!this.helpVideo) {
      return;
    }
    url = "https:" + this.helpVideo.url.substr(this.helpVideo.url.indexOf('/'));
    return this.setupVimeoVideoPlayer(url);
  };

  LevelGuideView.prototype.setupVimeoVideoPlayer = function(helpVideoURL) {
    var $tag, tag;
    tag = document.createElement('iframe');
    tag.id = 'help-video-player';
    tag.src = helpVideoURL + "?api=1&badge=0&byline=0&portrait=0&title=0";
    tag.height = this.helpVideoHeight;
    tag.width = this.helpVideoWidth;
    tag.allowFullscreen = true;
    tag.mozAllowFullscreen = true;
    $tag = $(tag);
    $tag.attr('webkitallowfullscreen', true);
    this.$el.find('#help-video-player').replaceWith($tag);
    this.onMessageReceived = (function(_this) {
      return function(e) {
        var data, player;
        data = JSON.parse(e.data);
        if (data.event === 'ready') {
          player = $('#help-video-player')[0];
          player.contentWindow.postMessage(JSON.stringify({
            method: 'addEventListener',
            value: 'play'
          }), helpVideoURL);
          return player.contentWindow.postMessage(JSON.stringify({
            method: 'addEventListener',
            value: 'finish'
          }), helpVideoURL);
        } else if (data.event === 'play') {
          return typeof _this.onStartHelpVideo === "function" ? _this.onStartHelpVideo() : void 0;
        } else if (data.event === 'finish') {
          return typeof _this.onFinishHelpVideo === "function" ? _this.onFinishHelpVideo() : void 0;
        }
      };
    })(this);
    if (window.addEventListener) {
      window.addEventListener('message', this.onMessageReceived, false);
    } else {
      window.attachEvent('onmessage', this.onMessageReceived, false);
    }
    return this.vimeoListenerAttached = true;
  };

  LevelGuideView.prototype.addPicoCTFProblem = function() {
    var doc, i, len, problem, ref1, ref2, results;
    if (!(problem = this.options.level.picoCTFProblem)) {
      return;
    }
    if (!this.docs.length) {
      this.docs = [
        {
          name: 'Intro',
          body: '',
          slug: 'intro'
        }
      ];
    }
    ref1 = this.docs;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      doc = ref1[i];
      if ((ref2 = doc.name) === 'Overview' || ref2 === 'Intro') {
        results.push(doc.body += ("### " + problem.name + "\n\n" + problem.description + "\n\n" + problem.category + " - " + problem.score + " points\n\nHint: " + problem.hints).replace(/<p>(.*?)<\/p>/gi, '$1'));
      }
    }
    return results;
  };

  return LevelGuideView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/menu/GuideView.js.map