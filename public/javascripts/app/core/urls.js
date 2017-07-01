require.register("core/urls", function(exports, require, module) {
module.exports = {
  playDevLevel: function(arg) {
    var course, level, session, shareURL;
    level = arg.level, session = arg.session, course = arg.course;
    shareURL = window.location.origin + "/play/" + (level.get('type')) + "-level/" + (level.get('slug')) + "/" + session.id;
    if (course) {
      shareURL += "?course=" + course.id;
    }
    return shareURL;
  },
  courseArenaLadder: function(arg) {
    var courseInstance, level;
    level = arg.level, courseInstance = arg.courseInstance;
    return "/play/ladder/" + (level.get('slug')) + "/course/" + courseInstance.id;
  },
  courseLevel: function(arg) {
    var courseInstance, level, url;
    level = arg.level, courseInstance = arg.courseInstance;
    url = "/play/level/" + (level.get('slug')) + "?course=" + (courseInstance.get('courseID')) + "&course-instance=" + courseInstance.id;
    if (level.get('primerLanguage')) {
      url += "&codeLanguage=" + (level.get('primerLanguage'));
    }
    return url;
  }
};
});

;
//# sourceMappingURL=/javascripts/app/core/urls.js.map