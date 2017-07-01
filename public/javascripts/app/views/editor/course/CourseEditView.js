require.register("views/editor/course/CourseEditView", function(exports, require, module) {
var ConfirmModal, Course, CourseEditView, PatchesView, RootView, app, errors, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/editor/course/edit');

Course = require('models/Course');

ConfirmModal = require('views/core/ConfirmModal');

PatchesView = require('views/editor/PatchesView');

errors = require('core/errors');

app = require('core/application');

require('game-libraries');

module.exports = CourseEditView = (function(superClass) {
  extend(CourseEditView, superClass);

  CourseEditView.prototype.id = 'editor-course-edit-view';

  CourseEditView.prototype.template = template;

  CourseEditView.prototype.events = {
    'click #save-button': 'onClickSaveButton'
  };

  function CourseEditView(options, courseID) {
    this.courseID = courseID;
    CourseEditView.__super__.constructor.call(this, options);
    this.course = new Course({
      _id: this.courseID
    });
    this.course.saveBackups = true;
    this.supermodel.loadModel(this.course);
  }

  CourseEditView.prototype.onLoaded = function() {
    CourseEditView.__super__.onLoaded.call(this);
    this.buildTreema();
    return this.listenTo(this.course, 'change', (function(_this) {
      return function() {
        _this.course.updateI18NCoverage();
        return _this.treema.set('/', _this.course.attributes);
      };
    })(this));
  };

  CourseEditView.prototype.buildTreema = function() {
    var data, options, ref;
    if ((this.treema != null) || (!this.course.loaded)) {
      return;
    }
    data = $.extend(true, {}, this.course.attributes);
    options = {
      data: data,
      filePath: "db/course/" + (this.course.get('_id')),
      schema: Course.schema,
      readOnly: me.get('anonymous'),
      supermodel: this.supermodel
    };
    this.treema = this.$el.find('#course-treema').treema(options);
    this.treema.build();
    return (ref = this.treema.childrenTreemas.rewards) != null ? ref.open(3) : void 0;
  };

  CourseEditView.prototype.afterRender = function() {
    CourseEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    this.patchesView = this.insertSubView(new PatchesView(this.course), this.$el.find('.patches-view'));
    return this.patchesView.load();
  };

  CourseEditView.prototype.onClickSaveButton = function(e) {
    var key, ref, res, value;
    this.treema.endExistingEdits();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.course.set(key, value);
    }
    this.course.updateI18NCoverage();
    res = this.course.save();
    res.error((function(_this) {
      return function(collection, response, options) {
        return console.error(response);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        var url;
        url = "/editor/course/" + (_this.course.get('slug') || _this.course.id);
        return document.location.href = url;
      };
    })(this));
  };

  return CourseEditView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/course/CourseEditView.js.map