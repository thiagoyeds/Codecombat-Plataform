require.register("templates/artisans/student-solutions-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view;var accountLinks_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/payments\" data-i18n=\"account.payments\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()) || me.hasSubscription())
{
buf.push("<li><a href=\"/account/subscription\" data-i18n=\"account.subscription\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/prepaid\" data-i18n=\"account.prepaid_codes\"></a></li>");
}
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li>");
};
buf.push("<div class=\"style-flat\"><nav id=\"main-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid container\"><div class=\"row\"><div class=\"col-md-12\"><div class=\"navbar-header\"><button data-toggle=\"collapse\" data-target=\"#navbar-collapse\" aria-expanded=\"false\" class=\"navbar-toggle collapsed\"><span data-i18n=\"nav.toggle_nav\" class=\"sr-only\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">");
if ( serverConfig.codeNinjas)
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\" class=\"code-ninjas-powered-by\"/><img src=\"/images/pages/base/code-ninjas-logo-right.png\" class=\"code-ninjas-logo\"/>");
}
else
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\"/>");
}
buf.push("<span class=\"glyphicon glyphicon-home\"></span></a></div><div id=\"navbar-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li>");
if ( me.isStudent())
{
buf.push("<li><a href=\"/students\" data-i18n=\"nav.my_courses\"></a></li>");
}
if ( !me.isAnonymous() && me.isTeacher())
{
buf.push("<li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li>");
}
if ( !me.isAnonymous() && !me.isStudent() && !me.isTeacher())
{
buf.push("<li><a href=\"/play\" data-i18n=\"common.play\"></a></li><li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li>");
}
buf.push("</ul>");
if ( me.isAnonymous())
{
buf.push("<ul class=\"nav navbar-nav\"><li><a id=\"create-account-link\" data-i18n=\"login.sign_up\" class=\"signup-button\"></a></li><li><a id=\"login-link\" data-i18n=\"login.log_in\" class=\"login-button\"></a></li></ul>");
}
else
{
buf.push("<ul class=\"nav navbar-nav hidden-md hidden-lg\"><li class=\"disabled\"><a><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span>" + (jade.escape(null == (jade.interp = me.displayName()) ? "" : jade.interp)) + "</span></a></li>");
accountLinks_mixin();
buf.push("</ul><ul class=\"nav navbar-nav\"><li class=\"dropdown hidden-xs hidden-sm\"><a href=\"#\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"dropdown-toggle\"><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span data-i18n=\"nav.my_account\"></span></a><ul class=\"dropdown-menu\"><li class=\"user-dropdown-header text-center\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/></a><h5>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h5></li>");
accountLinks_mixin();
buf.push("</ul></li></ul>");
}
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div class=\"container\"><div><a href=\"/artisans\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span>Artisans Home</span></a></div><h1>Common Student Solutions</h1><div class=\"row well\"><form><div class=\"col-xs-2 form-group\"><label for=\"levelSlug\">Level Slug:</label><input" + (jade.attrs({ 'id':('levelSlug'), 'type':("text"), 'value':(view.levelSlug), "class": [('form-control')] }, {"type":true,"value":true})) + "/></div><div class=\"col-xs-2 form-group\"><label for=\"languageSelect\">Language:</label><p><select id=\"languageSelect\"><option" + (jade.attrs({ 'value':("all"), 'selected':((view.languages=="all")) }, {"value":true,"selected":true})) + ">js / py</option><option" + (jade.attrs({ 'value':("javascript"), 'selected':((view.languages=="javascript") ? true : false) }, {"value":true,"selected":true})) + ">Javascript</option><option" + (jade.attrs({ 'value':("python"), 'selected':((view.languages=="python") ? true : false) }, {"value":true,"selected":true})) + ">Python</option></select></p></div><div class=\"col-xs-2 form-group\"><label for=\"sessionNum\">Sessions:</label><input" + (jade.attrs({ 'id':('sessionNum'), 'type':("number"), 'min':(100), 'max':(100000), 'step':(10), 'value':(view.limit), "class": [('form-control')] }, {"type":true,"min":true,"max":true,"step":true,"value":true})) + "/></div><div class=\"col-xs-3 go-button\"><button id=\"go-button\" class=\"btn btn-primary\">Go</button></div></form></div><div class=\"row\"><div class=\"col-xs-12 well\"><div class=\"row\"><div class=\"col-xs-3\">Language: javascript</div><div class=\"col-xs-3\">Sessions: " + (jade.escape((jade.interp = view.stats.javascript.total) == null ? '' : jade.interp)) + "</div><div class=\"col-xs-3\">Errors: " + (jade.escape((jade.interp = view.stats.javascript.errors) == null ? '' : jade.interp)) + "</div></div><div class=\"row\"><div class=\"col-xs-3\">Language: python</div><div class=\"col-xs-3\">Sessions: " + (jade.escape((jade.interp = view.stats.python.total) == null ? '' : jade.interp)) + "</div><div class=\"col-xs-3\">Errors: " + (jade.escape((jade.interp = view.stats.python.errors) == null ? '' : jade.interp)) + "</div></div></div></div><div class=\"row\">");
if ( view.errorMessage)
{
buf.push("<div class=\"col-xs-6 col-xs-offset-3\"><span class=\"center-block\">Error: " + (jade.escape((jade.interp = view.errorMessage) == null ? '' : jade.interp)) + "</span></div>");
}
if ( view.sortedTallyCounts && view.sortedTallyCounts.length > 0)
{
buf.push("<div class=\"col-xs-6 col-xs-offset-3\"><span class=\"center-block\">Viewing " + (jade.escape((jade.interp = view.limit) == null ? '' : jade.interp)) + " recent sessions from " + (jade.escape((jade.interp = view.levelSlug) == null ? '' : jade.interp)) + "</span></div>");
}
buf.push("</div>");
// iterate (view.sortedTallyCounts || [])
;(function(){
  var $$obj = (view.sortedTallyCounts || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var num = $$obj[$index];

var hashes = view.talliedHashes[num]
// iterate hashes
;(function(){
  var $$obj = hashes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var hash = $$obj[$index];

var session = view.solutions[hash][0]
var lang = session.codeLanguage
var isComplete = session.state && session.state.complete
var isDefault = (hash == view.defaultcode[lang].hash)
var isIntended = (hash == view.intended[lang].hash)
buf.push("<div class=\"row solutions-row\"><div class=\"col-xs-2 well solution-info\"><p> <b>Count: </b>" + (jade.escape((jade.interp = num) == null ? '' : jade.interp)) + "</p>");
if ( view.doLanguages.length > 1)
{
buf.push("<p><b>Language:</b> " + (jade.escape((jade.interp = lang) == null ? '' : jade.interp)) + "</p>");
}
if ( isDefault)
{
buf.push("<p><b>Status:</b> Default Code</p>");
}
else if ( isIntended)
{
buf.push("<p><b>Status:</b> Intended Code</p>");
}
else if ( isComplete)
{
buf.push("<p><b>Status:</b> Success</p>");
}
else
{
buf.push("<p><b>Status:</b> Failure</p>");
}
buf.push("<p class=\"is-breakable\"><b>Fingerprint:</b> " + (jade.escape((jade.interp = hash) == null ? '' : jade.interp)) + "</p></div><div class=\"col-xs-10\">");
if ( session.code && session.code['hero-placeholder'])
{
buf.push("<div" + (jade.attrs({ 'data-language':(lang), "class": [('ace')] }, {"data-language":true})) + ">" + (jade.escape((jade.interp = session.code['hero-placeholder'].plan) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var hash = $$obj[$index];

var session = view.solutions[hash][0]
var lang = session.codeLanguage
var isComplete = session.state && session.state.complete
var isDefault = (hash == view.defaultcode[lang].hash)
var isIntended = (hash == view.intended[lang].hash)
buf.push("<div class=\"row solutions-row\"><div class=\"col-xs-2 well solution-info\"><p> <b>Count: </b>" + (jade.escape((jade.interp = num) == null ? '' : jade.interp)) + "</p>");
if ( view.doLanguages.length > 1)
{
buf.push("<p><b>Language:</b> " + (jade.escape((jade.interp = lang) == null ? '' : jade.interp)) + "</p>");
}
if ( isDefault)
{
buf.push("<p><b>Status:</b> Default Code</p>");
}
else if ( isIntended)
{
buf.push("<p><b>Status:</b> Intended Code</p>");
}
else if ( isComplete)
{
buf.push("<p><b>Status:</b> Success</p>");
}
else
{
buf.push("<p><b>Status:</b> Failure</p>");
}
buf.push("<p class=\"is-breakable\"><b>Fingerprint:</b> " + (jade.escape((jade.interp = hash) == null ? '' : jade.interp)) + "</p></div><div class=\"col-xs-10\">");
if ( session.code && session.code['hero-placeholder'])
{
buf.push("<div" + (jade.attrs({ 'data-language':(lang), "class": [('ace')] }, {"data-language":true})) + ">" + (jade.escape((jade.interp = session.code['hero-placeholder'].plan) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div></div>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var num = $$obj[$index];

var hashes = view.talliedHashes[num]
// iterate hashes
;(function(){
  var $$obj = hashes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var hash = $$obj[$index];

var session = view.solutions[hash][0]
var lang = session.codeLanguage
var isComplete = session.state && session.state.complete
var isDefault = (hash == view.defaultcode[lang].hash)
var isIntended = (hash == view.intended[lang].hash)
buf.push("<div class=\"row solutions-row\"><div class=\"col-xs-2 well solution-info\"><p> <b>Count: </b>" + (jade.escape((jade.interp = num) == null ? '' : jade.interp)) + "</p>");
if ( view.doLanguages.length > 1)
{
buf.push("<p><b>Language:</b> " + (jade.escape((jade.interp = lang) == null ? '' : jade.interp)) + "</p>");
}
if ( isDefault)
{
buf.push("<p><b>Status:</b> Default Code</p>");
}
else if ( isIntended)
{
buf.push("<p><b>Status:</b> Intended Code</p>");
}
else if ( isComplete)
{
buf.push("<p><b>Status:</b> Success</p>");
}
else
{
buf.push("<p><b>Status:</b> Failure</p>");
}
buf.push("<p class=\"is-breakable\"><b>Fingerprint:</b> " + (jade.escape((jade.interp = hash) == null ? '' : jade.interp)) + "</p></div><div class=\"col-xs-10\">");
if ( session.code && session.code['hero-placeholder'])
{
buf.push("<div" + (jade.attrs({ 'data-language':(lang), "class": [('ace')] }, {"data-language":true})) + ">" + (jade.escape((jade.interp = session.code['hero-placeholder'].plan) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var hash = $$obj[$index];

var session = view.solutions[hash][0]
var lang = session.codeLanguage
var isComplete = session.state && session.state.complete
var isDefault = (hash == view.defaultcode[lang].hash)
var isIntended = (hash == view.intended[lang].hash)
buf.push("<div class=\"row solutions-row\"><div class=\"col-xs-2 well solution-info\"><p> <b>Count: </b>" + (jade.escape((jade.interp = num) == null ? '' : jade.interp)) + "</p>");
if ( view.doLanguages.length > 1)
{
buf.push("<p><b>Language:</b> " + (jade.escape((jade.interp = lang) == null ? '' : jade.interp)) + "</p>");
}
if ( isDefault)
{
buf.push("<p><b>Status:</b> Default Code</p>");
}
else if ( isIntended)
{
buf.push("<p><b>Status:</b> Intended Code</p>");
}
else if ( isComplete)
{
buf.push("<p><b>Status:</b> Success</p>");
}
else
{
buf.push("<p><b>Status:</b> Failure</p>");
}
buf.push("<p class=\"is-breakable\"><b>Fingerprint:</b> " + (jade.escape((jade.interp = hash) == null ? '' : jade.interp)) + "</p></div><div class=\"col-xs-10\">");
if ( session.code && session.code['hero-placeholder'])
{
buf.push("<div" + (jade.attrs({ 'data-language':(lang), "class": [('ace')] }, {"data-language":true})) + ">" + (jade.escape((jade.interp = session.code['hero-placeholder'].plan) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div></div>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
if ( !me.isStudent())
{
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.schools\"></strong></li><li><a href=\"/teachers/resources/faq\" data-i18n=\"teacher.educator_faq\"></a></li><li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li><li><a href=\"/teachers/resources\" data-i18n=\"nav.resource_hub\"></a></li><li><a href=\"/teachers/demo\" data-i18n=\"new_home.request_demo\"></a></li></ul></div>");
}
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.get_involved\"></strong></li><li><a href=\"/community\" data-i18n=\"nav.community\"></a></li><li><a href=\"/contribute\" data-i18n=\"nav.contribute\"></a></li>");
if ( !me.isStudent())
{
buf.push("<li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li>");
}
buf.push("<li><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a></li><li><a href=\"https://github.com/codecombat/codecombat\" data-i18n=\"nav.open_source\"></a></li></ul></div><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.support\"></strong></li>");
if ( !me.isStudent())
{
buf.push("<li><a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("<li><a href=\"https://www.facebook.com/codecombat\" data-i18n=\"nav.facebook\"></a></li><li><a href=\"https://twitter.com/codecombat\" data-i18n=\"nav.twitter\"></a></li></ul></div></div></div></div><div id=\"final-footer\" class=\"small text-center\">Copyright ©2016 CodeCombat. All Rights Reserved.<br class=\"hidden-lg hidden-md\"/><img src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><br class=\"hidden-lg hidden-md\"/>");
if ( !me.isStudent())
{
buf.push("<span data-i18n=\"nav.help_pref\" class=\"spr\"></span>");
var supportEmail = (me.get('preferredLanguage', true) || 'en-US').split('-')[0] == 'nl' ? 'klantenservice@codecombat.nl' : 'team@codecombat.com';
buf.push("<a" + (jade.attrs({ 'href':("mailto:" + supportEmail) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = supportEmail) ? "" : jade.interp)) + "</a><span data-i18n=\"nav.help_suff\" class=\"spl\"></span>");
}
buf.push("</div></div></div>");;return buf.join("");
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

;require.register("views/artisans/StudentSolutionsView", function(exports, require, module) {
var Campaign, Campaigns, Level, LevelSessions, Levels, RootView, StudentSolutionsView, ace, parser, realm, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

RootView = require('views/core/RootView');

template = require('templates/artisans/student-solutions-view');

Campaigns = require('collections/Campaigns');

Campaign = require('models/Campaign');

Levels = require('collections/Levels');

Level = require('models/Level');

LevelSessions = require('collections/LevelSessions');

ace = require('ace');

utils = require('core/utils');

require('vendor/aether-python');

if (typeof esper !== 'undefined') {
  realm = new esper().realm;
  parser = realm.parser.bind(realm);
}

module.exports = StudentSolutionsView = (function(superClass) {
  extend(StudentSolutionsView, superClass);

  function StudentSolutionsView() {
    this.processASTNode = bind(this.processASTNode, this);
    this.parseSource = bind(this.parseSource, this);
    return StudentSolutionsView.__super__.constructor.apply(this, arguments);
  }

  StudentSolutionsView.prototype.template = template;

  StudentSolutionsView.prototype.id = 'student-solutions-view';

  StudentSolutionsView.prototype.events = {
    'click #go-button': 'onClickGoButton'
  };

  StudentSolutionsView.prototype.levelSlug = "eagle-eye";

  StudentSolutionsView.prototype.limit = 500;

  StudentSolutionsView.prototype.languages = "python";

  StudentSolutionsView.prototype.initialize = function() {
    this.validLanguages = ['python', 'javascript'];
    this.resetLevelInfo();
    return this.resetSolutionsInfo();
  };

  StudentSolutionsView.prototype.resetLevelInfo = function() {
    this.intended = {};
    return this.defaultcode = {};
  };

  StudentSolutionsView.prototype.resetSolutionsInfo = function() {
    this.doLanguages = this.languages === 'all' ? ['javascript', 'python'] : [this.languages];
    this.stats = {};
    this.stats['javascript'] = {
      total: 0,
      errors: 0
    };
    this.stats['python'] = {
      total: 0,
      errors: 0
    };
    this.sessions = null;
    this.solutions = {};
    this.count = {};
    return this.errors = 0;
  };

  StudentSolutionsView.prototype.startFetchingData = function() {
    return this.getLevelInfo();
  };

  StudentSolutionsView.prototype.fetchSessions = function() {
    this.resetSolutionsInfo();
    return this.getRecentSessions((function(_this) {
      return function(sessions) {
        var ast, base, base1, hash, j, lang, len, ref, ref1, session, src, tallyFn;
        if (_this.destroyed) {
          return;
        }
        ref = _this.sessions.models;
        for (j = 0, len = ref.length; j < len; j++) {
          session = ref[j];
          session = session.attributes;
          lang = session.codeLanguage;
          if (indexOf.call(_this.doLanguages, lang) < 0) {
            continue;
          }
          _this.stats[lang].total += 1;
          src = (ref1 = session.code) != null ? ref1['hero-placeholder'].plan : void 0;
          if (!src) {
            _this.stats[lang].errors += 1;
            continue;
          }
          ast = _this.parseSource(src, lang);
          if (!ast) {
            continue;
          }
          ast = _this.walkAST(ast, _this.processASTNode);
          hash = _this.hashString(JSON.stringify(ast));
          if ((base = _this.count)[hash] == null) {
            base[hash] = 0;
          }
          _this.count[hash] += 1;
          if ((base1 = _this.solutions)[hash] == null) {
            base1[hash] = [];
          }
          _this.solutions[hash].push(session);
        }
        tallyFn = function(result, value, key) {
          if (value === 1) {
            return result;
          }
          if (result[value] == null) {
            result[value] = [];
          }
          result[value].push(key);
          return result;
        };
        _this.talliedHashes = _.reduce(_this.count, tallyFn, {});
        _this.sortedTallyCounts = _.sortBy(_.keys(_this.talliedHashes), function(v) {
          return parseInt(v);
        }).reverse();
        return _this.render();
      };
    })(this));
  };

  StudentSolutionsView.prototype.afterRender = function() {
    var aceDoc, aceSession, editor, editorElements, el, j, lang, len, results;
    StudentSolutionsView.__super__.afterRender.call(this);
    editorElements = this.$el.find('.ace');
    results = [];
    for (j = 0, len = editorElements.length; j < len; j++) {
      el = editorElements[j];
      lang = this.$(el).data('language');
      editor = ace.edit(el);
      aceSession = editor.getSession();
      aceDoc = aceSession.getDocument();
      aceSession.setMode(utils.aceEditModes[lang]);
      editor.setTheme('ace/theme/textmate');
      results.push(editor.setReadOnly(true));
    }
    return results;
  };

  StudentSolutionsView.prototype.getRecentSessions = function(doneCallback) {
    var data;
    this.sessions = new LevelSessions();
    data = {
      slug: this.levelSlug,
      limit: this.limit
    };
    if (this.doLanguages.length === 1) {
      data.codeLanguage = this.doLanguages[0];
    }
    return this.sessions.fetchRecentSessions({
      data: data,
      method: 'POST',
      success: doneCallback
    });
  };

  StudentSolutionsView.prototype.getLevelInfo = function() {
    this.level = this.supermodel.getModel(Level, this.levelSlug) || new Level({
      _id: this.levelSlug
    });
    this.supermodel.trackRequest(this.level.fetch());
    this.level.on('error', (function(_this) {
      return function(level1, error) {
        _this.level = level1;
        return noty({
          text: "Error loading level: " + error.statusText,
          layout: 'center',
          type: 'error',
          killer: true
        });
      };
    })(this));
    if (this.level.loaded) {
      return this.onLevelLoaded(this.level);
    } else {
      return this.listenToOnce(this.level, 'sync', this.onLevelLoaded);
    }
  };

  StudentSolutionsView.prototype.onClickGoButton = function(event) {
    event.preventDefault();
    this.limit = this.$('#sessionNum').val();
    this.languages = this.$('#languageSelect').val();
    this.levelSlug = this.$('#levelSlug').val();
    return this.startFetchingData();
  };

  StudentSolutionsView.prototype.onLevelLoaded = function(level) {
    var ast, defaults, hash, j, language, len, ref, ref1, ref2, solution, source;
    this.resetLevelInfo();
    ref = level.getSolutions();
    for (j = 0, len = ref.length; j < len; j++) {
      solution = ref[j];
      if (!(solution.source && (ref1 = solution.language, indexOf.call(this.validLanguages, ref1) >= 0))) {
        continue;
      }
      ast = this.parseSource(solution.source, solution.language);
      if (!ast) {
        continue;
      }
      ast = this.walkAST(ast, this.processASTNode);
      hash = this.hashString(JSON.stringify(ast));
      this.intended[solution.language] = {
        hash: hash,
        source: solution.source
      };
    }
    defaults = this.getDefaultCode(level);
    ref2 = this.getDefaultCode(level);
    for (language in ref2) {
      source = ref2[language];
      if (!(source && indexOf.call(this.validLanguages, language) >= 0)) {
        continue;
      }
      ast = this.parseSource(source, language);
      if (!ast) {
        continue;
      }
      ast = this.walkAST(ast, this.processASTNode);
      hash = this.hashString(JSON.stringify(ast));
      this.defaultcode[language] = {
        hash: hash,
        source: source
      };
    }
    return this.fetchSessions();
  };

  StudentSolutionsView.prototype.getDefaultCode = function(level) {
    var comp, heroPlaceholder, j, key, len, parseTemplate, programmableComponentOriginal, programmableMethod, ref, result, src;
    parseTemplate = (function(_this) {
      return function(src, context) {
        var e, error1, res;
        try {
          res = _.template(src)(context);
          return res;
        } catch (error1) {
          e = error1;
          console.warn("Template Error");
          console.log(src);
          return src;
        }
      };
    })(this);
    programmableComponentOriginal = '524b7b5a7fc0f6d51900000e';
    heroPlaceholder = _.find(level.get('thangs'), {
      id: 'Hero Placeholder'
    });
    comp = _.find(heroPlaceholder != null ? heroPlaceholder.components : void 0, {
      original: programmableComponentOriginal
    });
    programmableMethod = comp != null ? comp.config.programmableMethods.plan : void 0;
    result = {};
    if (programmableMethod.source) {
      src = programmableMethod.source;
      src = parseTemplate(src, programmableMethod.context);
      result['javascript'] = src;
    }
    ref = _.keys(programmableMethod.languages);
    for (j = 0, len = ref.length; j < len; j++) {
      key = ref[j];
      if (key !== 'python') {
        continue;
      }
      src = programmableMethod.languages[key];
      src = parseTemplate(src, programmableMethod.context);
      result[key] = src;
    }
    return result;
  };

  StudentSolutionsView.prototype.parseSource = function(src, lang) {
    var aether, ast, e, error1, tsrc;
    if (lang === 'python') {
      aether = new Aether({
        language: 'python'
      });
      tsrc = aether.transpile(src);
      ast = aether.ast;
    }
    if (lang === 'javascript') {
      try {
        ast = parser(src);
      } catch (error1) {
        e = error1;
        this.stats[lang].errors += 1;
        return null;
      }
    }
    return ast;
  };

  StudentSolutionsView.prototype.walkAST = function(node, fn) {
    var child, grandchild, j, key, len;
    for (key in node) {
      child = node[key];
      if (_.isArray(child)) {
        for (j = 0, len = child.length; j < len; j++) {
          grandchild = child[j];
          if (_.isString(grandchild != null ? grandchild.type : void 0)) {
            this.walkAST(grandchild, fn);
          }
        }
      } else if (_.isString(child != null ? child.type : void 0)) {
        this.walkAST(child, fn);
      }
    }
    return fn(node);
  };

  StudentSolutionsView.prototype.processASTNode = function(node) {
    if (node == null) {
      return;
    }
    if (node.range) {
      delete node.range;
    }
    if (node.loc) {
      delete node.loc;
    }
    if (node.originalRange) {
      delete node.originalRange;
    }
    return node;
  };

  StudentSolutionsView.prototype.hashString = function(str) {
    var i;
    return ((function() {
      var j, ref, results;
      results = [];
      for (i = j = 0, ref = str.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        results.push(str.charCodeAt(i));
      }
      return results;
    })()).reduce((function(hash, char) {
      return ((hash << 5) + hash) + char;
    }), 5381);
  };

  return StudentSolutionsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/artisans/StudentSolutionsView.js.map