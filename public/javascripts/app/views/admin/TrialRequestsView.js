require.register("views/admin/TrialRequestsView", function(exports, require, module) {
var CocoCollection, RootView, TrialRequest, TrialRequestsView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/admin/trial-requests');

CocoCollection = require('collections/CocoCollection');

TrialRequest = require('models/TrialRequest');

module.exports = TrialRequestsView = (function(superClass) {
  extend(TrialRequestsView, superClass);

  TrialRequestsView.prototype.id = 'admin-trial-requests-view';

  TrialRequestsView.prototype.template = template;

  TrialRequestsView.prototype.events = {
    'click .btn-approve': 'onClickApprove',
    'click .btn-deny': 'onClickDeny'
  };

  function TrialRequestsView(options) {
    var sortRequests;
    TrialRequestsView.__super__.constructor.call(this, options);
    if (me.isAdmin()) {
      sortRequests = function(a, b) {
        var statusA, statusB;
        statusA = a.get('status');
        statusB = b.get('status');
        if (statusA === 'submitted' && statusB === 'submitted') {
          if (a.get('created') < b.get('created')) {
            return -1;
          } else {
            return 1;
          }
        } else if (statusA === 'submitted') {
          return -1;
        } else if (statusB === 'submitted') {
          return 1;
        } else if (!b.get('reviewDate') || a.get('reviewDate') > b.get('reviewDate')) {
          return -1;
        } else {
          return 1;
        }
      };
      this.trialRequests = new CocoCollection([], {
        url: '/db/trial.request?conditions[sort]="-created"&conditions[limit]=1000',
        model: TrialRequest,
        comparator: sortRequests
      });
      this.supermodel.loadCollection(this.trialRequests, 'trial-requests', {
        cache: false
      });
    }
  }

  TrialRequestsView.prototype.getRenderData = function() {
    var context, ref, ref1;
    context = TrialRequestsView.__super__.getRenderData.call(this);
    context.trialRequests = (ref = (ref1 = this.trialRequests) != null ? ref1.models : void 0) != null ? ref : [];
    return context;
  };

  TrialRequestsView.prototype.onClickApprove = function(e) {
    var trialRequest, trialRequestID;
    trialRequestID = $(e.target).data('trial-request-id');
    trialRequest = _.find(this.trialRequests.models, function(a) {
      return a.id === trialRequestID;
    });
    if (!trialRequest) {
      console.error('Could not find trial request model for', trialRequestData);
      return;
    }
    trialRequest.set('status', 'approved');
    return trialRequest.patch({
      error: (function(_this) {
        return function(model, response, options) {
          return console.error('Error patching trial request', response);
        };
      })(this),
      success: (function(_this) {
        return function(model, response, options) {
          return typeof _this.render === "function" ? _this.render() : void 0;
        };
      })(this)
    });
  };

  TrialRequestsView.prototype.onClickDeny = function(e) {
    var trialRequest, trialRequestID;
    trialRequestID = $(e.target).data('trial-request-id');
    trialRequest = _.find(this.trialRequests.models, function(a) {
      return a.id === trialRequestID;
    });
    if (!trialRequest) {
      console.error('Could not find trial request model for', trialRequestData);
      return;
    }
    if (!window.confirm("Deny " + (trialRequest.get('properties').email) + "?")) {
      return;
    }
    trialRequest.set('status', 'denied');
    return trialRequest.patch({
      error: (function(_this) {
        return function(model, response, options) {
          return console.error('Error patching trial request', response);
        };
      })(this),
      success: (function(_this) {
        return function(model, response, options) {
          return typeof _this.render === "function" ? _this.render() : void 0;
        };
      })(this)
    });
  };

  return TrialRequestsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/TrialRequestsView.js.map