require.register("views/editor/course/CourseSearchView", function(exports, require, module) {
var LevelSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = LevelSearchView = (function(superClass) {
  extend(LevelSearchView, superClass);

  function LevelSearchView() {
    return LevelSearchView.__super__.constructor.apply(this, arguments);
  }

  LevelSearchView.prototype.id = 'editor-course-home-view';

  LevelSearchView.prototype.modelLabel = 'Course';

  LevelSearchView.prototype.model = require('models/Course');

  LevelSearchView.prototype.modelURL = '/db/course';

  LevelSearchView.prototype.tableTemplate = require('templates/editor/course/table');

  LevelSearchView.prototype.projection = ['slug', 'name', 'description', 'watchers', 'creator'];

  LevelSearchView.prototype.page = 'course';

  LevelSearchView.prototype.canMakeNew = false;

  LevelSearchView.prototype.getRenderData = function() {
    var context;
    context = LevelSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.course_title';
    context.currentNew = 'editor.new_course_title';
    context.currentNewSignup = 'editor.new_course_title_login';
    context.currentSearch = 'editor.course_search_title';
    this.$el.i18n();
    return context;
  };

  return LevelSearchView;

})(SearchView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/course/CourseSearchView.js.map