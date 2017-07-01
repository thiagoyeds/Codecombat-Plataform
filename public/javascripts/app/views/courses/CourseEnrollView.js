require.register("views/courses/CourseEnrollView", function(exports, require, module) {
var CocoCollection, Course, CourseEnrollView, CreateAccountModal, RootView, app, stripeHandler, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = require('core/application');

CreateAccountModal = require('views/core/CreateAccountModal');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

RootView = require('views/core/RootView');

stripeHandler = require('core/services/stripe');

template = require('templates/courses/course-enroll');

utils = require('core/utils');

module.exports = CourseEnrollView = (function(superClass) {
  extend(CourseEnrollView, superClass);

  CourseEnrollView.prototype.id = 'course-enroll-view';

  CourseEnrollView.prototype.template = template;

  CourseEnrollView.prototype.events = {
    'click .btn-buy': 'onClickBuy',
    'change .class-name': 'onNameChange',
    'change .course-select': 'onChangeCourse',
    'change .input-seats': 'onSeatsChange',
    'change #programming-language-select': 'onChangeProgrammingLanguageSelect'
  };

  CourseEnrollView.prototype.subscriptions = {
    'stripe:received-token': 'onStripeReceivedToken'
  };

  function CourseEnrollView(options, courseID1) {
    this.courseID = courseID1;
    CourseEnrollView.__super__.constructor.call(this, options);
    if (this.courseID == null) {
      this.courseID = options.courseID;
    }
    this.seats = 20;
    this.selectedLanguage = 'python';
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.listenTo(this.courses, 'sync', this.onCoursesLoaded);
    this.supermodel.loadCollection(this.courses, 'courses');
  }

  CourseEnrollView.prototype.afterRender = function() {
    CourseEnrollView.__super__.afterRender.call(this);
    if (this.selectedCourse) {
      return this.$el.find('.course-select').val(this.selectedCourse.id);
    } else {
      return this.$el.find('.course-select').val('All Courses');
    }
  };

  CourseEnrollView.prototype.onCoursesLoaded = function() {
    if (this.courseID) {
      this.selectedCourse = _.find(this.courses.models, (function(_this) {
        return function(a) {
          return a.id === _this.courseID;
        };
      })(this));
    } else if (this.courses.models.length > 0) {
      this.selectedCourse = this.courses.models[0];
    }
    return this.renderNewPrice();
  };

  CourseEnrollView.prototype.onClickBuy = function(e) {
    var courseTitle, ref, ref1, ref2;
    if (me.isAnonymous()) {
      return this.openModalView(new CreateAccountModal());
    }
    if (this.price === 0) {
      this.seats = 9999;
      this.state = 'creating';
      this.createClass();
      return;
    }
    if (this.seats < 1 || !_.isFinite(this.seats)) {
      alert("Please enter the maximum number of students needed for your class.");
      return;
    }
    this.state = void 0;
    this.stateMessage = void 0;
    this.render();
    courseTitle = (ref = (ref1 = this.selectedCourse) != null ? ref1.get('name') : void 0) != null ? ref : 'All Courses';
    if ((ref2 = application.tracker) != null) {
      ref2.trackEvent('Started course purchase', {
        course: courseTitle,
        price: this.price,
        seats: this.seats
      });
    }
    return stripeHandler.open({
      amount: this.price,
      description: courseTitle + " for " + this.seats + " students",
      bitcoin: true,
      alipay: me.get('country') === 'china' || (me.get('preferredLanguage') || 'en-US').slice(0, 2) === 'zh' ? true : 'auto'
    });
  };

  CourseEnrollView.prototype.onStripeReceivedToken = function(e) {
    this.state = 'purchasing';
    if (typeof this.render === "function") {
      this.render();
    }
    return this.createClass(e.token.id);
  };

  CourseEnrollView.prototype.onChangeCourse = function(e) {
    this.selectedCourse = _.find(this.courses.models, function(a) {
      return a.id === $(e.target).val();
    });
    return this.renderNewPrice();
  };

  CourseEnrollView.prototype.onChangeProgrammingLanguageSelect = function(e) {
    return this.selectedLanguage = this.$('#programming-language-select').val();
  };

  CourseEnrollView.prototype.onNameChange = function(e) {
    return this.className = $('.class-name').val();
  };

  CourseEnrollView.prototype.onSeatsChange = function(e) {
    this.seats = $(e.target).val();
    if (this.seats < 1 || !_.isFinite(this.seats)) {
      this.seats = 20;
    }
    return this.renderNewPrice();
  };

  CourseEnrollView.prototype.createClass = function(token) {
    var data, jqxhr;
    data = {
      name: this.className,
      seats: this.seats,
      stripe: {
        token: token,
        timestamp: new Date().getTime()
      },
      aceConfig: {
        language: this.selectedLanguage
      }
    };
    if (this.selectedCourse) {
      data.courseID = this.selectedCourse.id;
    }
    jqxhr = $.post('/db/course_instance/-/create', data);
    jqxhr.done((function(_this) {
      return function(data, textStatus, jqXHR) {
        var ref, ref1, ref2;
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Finished course purchase', {
            course: (ref1 = (ref2 = _this.selectedCourse) != null ? ref2.get('name') : void 0) != null ? ref1 : 'All Courses',
            price: _this.price,
            seats: _this.seats
          });
        }
        return me.fetch({
          cache: false
        }).always(function() {
          var courseID, courseInstanceID, ref3, ref4, ref5, route, viewArgs;
          courseID = (ref3 = (ref4 = _this.selectedCourse) != null ? ref4.id : void 0) != null ? ref3 : (ref5 = _this.courses.models[0]) != null ? ref5.id : void 0;
          route = "/students/" + courseID;
          viewArgs = [{}, courseID];
          if ((data != null ? data.length : void 0) > 0) {
            courseInstanceID = data[0]._id;
            route += "/" + courseInstanceID;
            viewArgs[0].courseInstanceID = courseInstanceID;
          }
          return Backbone.Mediator.publish('router:navigate', {
            route: route,
            viewClass: 'views/courses/CourseDetailsView',
            viewArgs: viewArgs
          });
        });
      };
    })(this));
    return jqxhr.fail((function(_this) {
      return function(xhr, textStatus, errorThrown) {
        var ref;
        console.error('Got an error purchasing a course:', textStatus, errorThrown);
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Failed course purchase', {
            status: textStatus
          });
        }
        if (xhr.status === 402) {
          _this.state = 'declined';
          _this.stateMessage = arguments[2];
        } else {
          _this.state = 'unknown_error';
          _this.stateMessage = xhr.status + ": " + xhr.responseText;
        }
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
  };

  CourseEnrollView.prototype.renderNewPrice = function() {
    var c, coursePrices;
    if (this.selectedCourse) {
      coursePrices = [this.selectedCourse.get('pricePerSeat')];
    } else {
      coursePrices = (function() {
        var i, len, ref, results;
        ref = this.courses.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          results.push(c.get('pricePerSeat'));
        }
        return results;
      }).call(this);
    }
    this.price = utils.getCourseBundlePrice(coursePrices, this.seats);
    if (me.isAdmin()) {
      this.price = 0;
    }
    return typeof this.render === "function" ? this.render() : void 0;
  };

  return CourseEnrollView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/CourseEnrollView.js.map