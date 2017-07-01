require.register("templates/play/level/modal/progress-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,i18n = locals_.i18n,me = locals_.me;buf.push("<div class=\"modal-header\"><div id=\"close-modal\" data-dismiss=\"modal\" class=\"btn well well-sm well-parchment\"><span class=\"glyphicon glyphicon-remove\"></span></div><div class=\"well well-sm well-parchment\"><h1 data-i18n=\"play_level.level_complete\"></h1></div></div><div class=\"modal-body\"><div class=\"container-fluid\"><div class=\"row\">");
var colClass = !view.nextLevel.isNew() ? 'col-sm-7' : 'col-sm-12'
buf.push("<div" + (jade.attrs({ "class": [(colClass)] }, {"class":true})) + "><div class=\"well well-sm well-parchment\"><h3 data-i18n=\"play_level.completed_level\" class=\"text-uppercase\"></h3><h2 class=\"text-uppercase text-center\">" + (jade.escape(null == (jade.interp = i18n(view.level.attributes, 'name')) ? "" : jade.interp)) + "</h2></div><div class=\"well well-sm well-parchment\">");
if ( me.isSessionless())
{
buf.push("<h3 class=\"course-title\"><span data-i18n=\"play_level.course\" class=\"text-uppercase spr\"></span><span class=\"text-uppercase text-center\">" + (jade.escape(null == (jade.interp = i18n(view.course.attributes, 'name')) ? "" : jade.interp)) + "</span></h3><span data-i18n=\"play_level.victory_no_progress_for_teachers\"></span>");
}
else
{
buf.push("<h3 data-i18n=\"play_level.course\" class=\"text-uppercase\"></h3><div class=\"row\"><div class=\"col-sm-8\"><h3 class=\"text-uppercase text-center\">" + (jade.escape(null == (jade.interp = i18n(view.course.attributes, 'name')) ? "" : jade.interp)) + "</h3></div><div class=\"col-sm-4\">");
var stats = view.classroom.statsForSessions(view.levelSessions, view.course.id)
buf.push("<h1><span>" + (jade.escape((jade.interp = stats.levels.numDone) == null ? '' : jade.interp)) + "/" + (jade.escape((jade.interp = stats.levels.size) == null ? '' : jade.interp)) + "</span></h1></div></div>");
}
buf.push("</div></div>");
if ( !view.nextLevel.isNew())
{
buf.push("<div class=\"col-sm-5\"><div class=\"well well-sm well-parchment\"><h3 class=\"text-uppercase\"><span data-i18n=\"play_level.next_level\"></span><span>:</span></h3><h2 class=\"text-uppercase\">" + (jade.escape(null == (jade.interp = i18n(view.nextLevel.attributes, 'name').replace('Course: ', '')) ? "" : jade.interp)) + "</h2><div class=\"next-level-description\">" + (null == (jade.interp = view.nextLevelDescription) ? "" : jade.interp) + "</div></div></div>");
}
buf.push("</div>");
if ( view.shareURL)
{
buf.push("<div class=\"well well-sm well-parchment\"><h3 class=\"text-uppercase\">");
if ( view.level.isType('game-dev'))
{
buf.push("<span data-i18n=\"sharing.share_game\"></span>");
}
else
{
buf.push("<span data-i18n=\"sharing.share_web\"></span>");
}
buf.push("</h3><p><span data-i18n=\"sharing.victory_course_share_prefix\"></span><span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':(view.shareURL), 'target':('_blank') }, {"href":true,"target":true})) + ">");
if ( view.level.isType('game-dev'))
{
buf.push("<span data-i18n=\"sharing.victory_course_share_game\"></span>");
}
else
{
buf.push("<span data-i18n=\"sharing.victory_course_share_web\"></span>");
}
buf.push("</a><span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><span data-i18n=\"sharing.victory_course_share_suffix\"></span></p>");
if ( view.session.isFake())
{
buf.push("<div data-i18n=\"sharing.unavailable\" class=\"alert alert-warning\"></div>");
}
else
{
buf.push("<div class=\"row\"><div class=\"col-sm-9\"><input" + (jade.attrs({ 'id':('share-level-input'), 'value':(view.shareURL), "class": [('text-h4'),('semibold'),('form-control'),('input-lg')] }, {"value":true})) + "/></div><div class=\"col-sm-3\"><button id=\"share-level-btn\" class=\"btn btn-lg btn-success btn-illustrated\"><span data-i18n=\"sharing.copy_url\"></span></button></div></div>");
}
buf.push("</div>");
}
buf.push("<div class=\"row\"><div class=\"col-sm-5 col-sm-offset-2\"><!-- TODO: Add rest of campaign functionality-->");
if ( view.level.get('type') === 'course-ladder')
{
buf.push("<button id=\"ladder-btn\" class=\"btn btn-illustrated btn-default btn-block btn-lg text-uppercase\">Ladder</button>");
}
buf.push("</div><div class=\"col-sm-5\">");
if ( !view.nextLevel.isNew())
{
buf.push("<button id=\"next-level-btn\" data-i18n=\"play_level.next_level\" class=\"btn btn-illustrated btn-primary btn-block btn-lg text-uppercase\"></button>");
}
else
{
buf.push("<button id=\"done-btn\" data-i18n=\"play_level.done\" class=\"btn btn-illustrated btn-primary btn-block btn-lg text-uppercase\"></button>");
}
buf.push("</div></div></div></div>");;return buf.join("");
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

;require.register("views/play/level/modal/ProgressView", function(exports, require, module) {
var CocoView, ProgressView, urls, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

utils = require('core/utils');

urls = require('core/urls');

module.exports = ProgressView = (function(superClass) {
  extend(ProgressView, superClass);

  function ProgressView() {
    return ProgressView.__super__.constructor.apply(this, arguments);
  }

  ProgressView.prototype.id = 'progress-view';

  ProgressView.prototype.className = 'modal-content';

  ProgressView.prototype.template = require('templates/play/level/modal/progress-view');

  ProgressView.prototype.events = {
    'click #done-btn': 'onClickDoneButton',
    'click #next-level-btn': 'onClickNextLevelButton',
    'click #ladder-btn': 'onClickLadderButton',
    'click #share-level-btn': 'onClickShareLevelButton'
  };

  ProgressView.prototype.initialize = function(options) {
    this.level = options.level;
    this.course = options.course;
    this.classroom = options.classroom;
    this.nextLevel = options.nextLevel;
    this.levelSessions = options.levelSessions;
    this.session = options.session;
    this.nextLevel.get('description', true);
    this.nextLevelDescription = marked(utils.i18n(this.nextLevel.attributesWithDefaults, 'description').replace(/!\[.*?\]\(.*?\)\n*/g, ''));
    if (this.level.get('shareable') === 'project') {
      return this.shareURL = urls.playDevLevel({
        level: this.level,
        session: this.session,
        course: this.course
      });
    }
  };

  ProgressView.prototype.onClickDoneButton = function() {
    return this.trigger('done');
  };

  ProgressView.prototype.onClickNextLevelButton = function() {
    return this.trigger('next-level');
  };

  ProgressView.prototype.onClickLadderButton = function() {
    return this.trigger('ladder');
  };

  ProgressView.prototype.onClickShareLevelButton = function() {
    var category, eventProperties, name, ref;
    if (_.string.startsWith(this.course.get('slug'), 'game-dev')) {
      name = 'Student Game Dev - Copy URL';
      category = 'GameDev';
    } else {
      name = 'Student Web Dev - Copy URL';
      category = 'WebDev';
    }
    eventProperties = {
      levelID: this.level.id,
      levelSlug: this.level.get('slug'),
      classroomID: this.classroom.id,
      courseID: this.course.id,
      category: category
    };
    if ((ref = window.tracker) != null) {
      ref.trackEvent(name, eventProperties, ['MixPanel']);
    }
    this.$('#share-level-input').val(this.shareURL).select();
    return this.tryCopy();
  };

  return ProgressView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/modal/ProgressView.js.map