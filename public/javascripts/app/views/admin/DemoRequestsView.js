require.register("views/admin/DemoRequestsView", function(exports, require, module) {
var CocoCollection, DemoRequestsView, RootView, TrialRequest, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/admin/demo-requests');

CocoCollection = require('collections/CocoCollection');

TrialRequest = require('models/TrialRequest');

module.exports = DemoRequestsView = (function(superClass) {
  extend(DemoRequestsView, superClass);

  DemoRequestsView.prototype.id = 'admin-demo-requests-view';

  DemoRequestsView.prototype.template = template;

  function DemoRequestsView(options) {
    DemoRequestsView.__super__.constructor.call(this, options);
    if (!me.isAdmin()) {
      return;
    }
    this.trialRequests = new CocoCollection([], {
      url: '/db/trial.request?conditions[sort]="-created"&conditions[limit]=5000',
      model: TrialRequest
    });
    this.supermodel.loadCollection(this.trialRequests, 'trial-requests', {
      cache: false
    });
    this.dayCounts = [];
  }

  DemoRequestsView.prototype.onLoaded = function() {
    var count, day, dayCount, dayCountMap, i, j, k, len, ref, ref1, sevenCounts, trialRequest;
    if (!me.isAdmin()) {
      return DemoRequestsView.__super__.onLoaded.call(this);
    }
    dayCountMap = {};
    ref = this.trialRequests.models;
    for (j = 0, len = ref.length; j < len; j++) {
      trialRequest = ref[j];
      day = trialRequest.get('created').substring(0, 10);
      if (dayCountMap[day] == null) {
        dayCountMap[day] = 0;
      }
      dayCountMap[day]++;
    }
    this.dayCounts = [];
    for (day in dayCountMap) {
      count = dayCountMap[day];
      this.dayCounts.push({
        day: day,
        count: count
      });
    }
    this.dayCounts.sort(function(a, b) {
      return b.day.localeCompare(a.day);
    });
    sevenCounts = [];
    for (i = k = ref1 = this.dayCounts.length - 1; ref1 <= 0 ? k <= 0 : k >= 0; i = ref1 <= 0 ? ++k : --k) {
      dayCount = this.dayCounts[i];
      sevenCounts.push(dayCount.count);
      while (sevenCounts.length > 7) {
        sevenCounts.shift();
      }
      if (sevenCounts.length === 7) {
        dayCount.sevenAverage = Math.round(sevenCounts.reduce((function(a, b) {
          return a + b;
        }), 0) / 7);
      }
    }
    return DemoRequestsView.__super__.onLoaded.call(this);
  };

  return DemoRequestsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/DemoRequestsView.js.map