require.register("views/core/CreateAccountModal/SegmentCheckView", function(exports, require, module) {
var Classroom, CocoView, SegmentCheckView, State, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/core/create-account-modal/segment-check-view');

forms = require('core/forms');

Classroom = require('models/Classroom');

State = require('models/State');

module.exports = SegmentCheckView = (function(superClass) {
  extend(SegmentCheckView, superClass);

  function SegmentCheckView() {
    return SegmentCheckView.__super__.constructor.apply(this, arguments);
  }

  SegmentCheckView.prototype.id = 'segment-check-view';

  SegmentCheckView.prototype.template = template;

  SegmentCheckView.prototype.events = {
    'click .back-to-account-type': function() {
      return this.trigger('nav-back');
    },
    'input .class-code-input': 'onInputClassCode',
    'change .birthday-form-group': 'onInputBirthday',
    'submit form.segment-check': 'onSubmitSegmentCheck',
    'click .individual-path-button': function() {
      return this.trigger('choose-path', 'individual');
    }
  };

  SegmentCheckView.prototype.initialize = function(arg) {
    this.signupState = (arg != null ? arg : {}).signupState;
    this.checkClassCodeDebounced = _.debounce(this.checkClassCode, 1000);
    this.fetchClassByCode = _.memoize(this.fetchClassByCode);
    this.classroom = new Classroom();
    this.state = new State();
    if (this.signupState.get('classCode')) {
      this.checkClassCode(this.signupState.get('classCode'));
    }
    return this.listenTo(this.state, 'all', _.debounce(function() {
      this.renderSelectors('.render');
      return this.trigger('special-render');
    }));
  };

  SegmentCheckView.prototype.getClassCode = function() {
    return this.$('.class-code-input').val() || this.signupState.get('classCode');
  };

  SegmentCheckView.prototype.onInputClassCode = function() {
    var classCode;
    this.classroom = new Classroom();
    forms.clearFormAlerts(this.$el);
    classCode = this.getClassCode();
    this.signupState.set({
      classCode: classCode
    }, {
      silent: true
    });
    return this.checkClassCodeDebounced();
  };

  SegmentCheckView.prototype.checkClassCode = function() {
    var classCode;
    if (this.destroyed) {
      return;
    }
    classCode = this.getClassCode();
    return this.fetchClassByCode(classCode).then((function(_this) {
      return function(classroom) {
        if (_this.destroyed || _this.getClassCode() !== classCode) {
          return;
        }
        if (classroom) {
          _this.classroom = classroom;
          return _this.state.set({
            classCodeValid: true,
            segmentCheckValid: true
          });
        } else {
          _this.classroom = new Classroom();
          return _this.state.set({
            classCodeValid: false,
            segmentCheckValid: false
          });
        }
      };
    })(this))["catch"](function(error) {
      throw error;
    });
  };

  SegmentCheckView.prototype.onInputBirthday = function() {
    var birthday, birthdayDay, birthdayMonth, birthdayYear, ref;
    ref = forms.formToObject(this.$('form')), birthdayYear = ref.birthdayYear, birthdayMonth = ref.birthdayMonth, birthdayDay = ref.birthdayDay;
    birthday = new Date(Date.UTC(birthdayYear, birthdayMonth - 1, birthdayDay));
    this.signupState.set({
      birthdayYear: birthdayYear,
      birthdayMonth: birthdayMonth,
      birthdayDay: birthdayDay,
      birthday: birthday
    }, {
      silent: true
    });
    if (!_.isNaN(birthday.getTime())) {
      return forms.clearFormAlerts(this.$el);
    }
  };

  SegmentCheckView.prototype.onSubmitSegmentCheck = function(e) {
    var age;
    e.preventDefault();
    if (this.signupState.get('path') === 'student') {
      this.$('.class-code-input').attr('disabled', true);
      return this.fetchClassByCode(this.getClassCode()).then((function(_this) {
        return function(classroom) {
          if (_this.destroyed) {
            return;
          }
          if (classroom) {
            _this.signupState.set({
              classroom: classroom
            });
            return _this.trigger('nav-forward');
          } else {
            _this.$('.class-code-input').attr('disabled', false);
            _this.classroom = new Classroom();
            return _this.state.set({
              classCodeValid: false,
              segmentCheckValid: false
            });
          }
        };
      })(this))["catch"](function(error) {
        throw error;
      });
    } else if (this.signupState.get('path') === 'individual') {
      if (_.isNaN(this.signupState.get('birthday').getTime())) {
        forms.clearFormAlerts(this.$el);
        return forms.setErrorToProperty(this.$el, 'birthdayDay', 'Required');
      } else {
        age = (new Date().getTime() - this.signupState.get('birthday').getTime()) / 365.4 / 24 / 60 / 60 / 1000;
        if (age > 13) {
          return this.trigger('nav-forward');
        } else {
          return this.trigger('nav-forward', 'coppa-deny');
        }
      }
    }
  };

  SegmentCheckView.prototype.fetchClassByCode = function(classCode) {
    if (!classCode) {
      return Promise.resolve();
    }
    return new Promise(function(resolve, reject) {
      return new Classroom().fetchByCode(classCode, {
        success: resolve,
        error: function(classroom, jqxhr) {
          if (jqxhr.status === 404) {
            return resolve();
          } else {
            return reject(jqxhr.responseJSON);
          }
        }
      });
    });
  };

  return SegmentCheckView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/CreateAccountModal/SegmentCheckView.js.map