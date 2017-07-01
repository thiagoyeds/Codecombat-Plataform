require.register("views/admin/UserCodeProblemsView", function(exports, require, module) {
var RootView, UserCodeProblem, UserCodeProblemsView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/admin/user-code-problems');

UserCodeProblem = require('models/UserCodeProblem');

module.exports = UserCodeProblemsView = (function(superClass) {
  extend(UserCodeProblemsView, superClass);

  UserCodeProblemsView.prototype.id = 'admin-user-code-problems-view';

  UserCodeProblemsView.prototype.template = template;

  function UserCodeProblemsView(options) {
    UserCodeProblemsView.__super__.constructor.call(this, options);
    this.fetchingData = true;
    this.getUserCodeProblems();
  }

  UserCodeProblemsView.prototype.getUserCodeProblems = function() {
    var UserCodeProblemCollection, conditions, lastMonth;
    lastMonth = new Date();
    if (lastMonth.getMonth() === 1) {
      lastMonth.setMonth(12);
      lastMonth.setYear(lastMonth.getYear() - 1);
    } else {
      lastMonth.setMonth(lastMonth.getMonth() - 1);
    }
    conditions = [['limit', 300], ['sort', '-created'], ['where', 'created'], ['gte', lastMonth.toString()]];
    conditions = $.param({
      conditions: JSON.stringify(conditions)
    });
    UserCodeProblemCollection = Backbone.Collection.extend({
      model: UserCodeProblem,
      url: '/db/user.code.problem?' + conditions
    });
    this.userCodeProblems = new UserCodeProblemCollection();
    this.userCodeProblems.fetch();
    return this.listenTo(this.userCodeProblems, 'all', function() {
      this.fetchingData = false;
      return this.render();
    });
  };

  UserCodeProblemsView.prototype.getRenderData = function() {
    var c, problem;
    c = UserCodeProblemsView.__super__.getRenderData.call(this);
    c.fetchingData = this.fetchingData;
    c.userCodeProblems = (function() {
      var i, len, ref, results;
      ref = this.userCodeProblems.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        problem = ref[i];
        results.push(problem.attributes);
      }
      return results;
    }).call(this);
    return c;
  };

  return UserCodeProblemsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/UserCodeProblemsView.js.map