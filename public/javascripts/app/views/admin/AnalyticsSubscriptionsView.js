require.register("views/admin/AnalyticsSubscriptionsView", function(exports, require, module) {
var AnalyticsSubscriptionsView, RootView, ThangType, User, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/admin/analytics-subscriptions');

ThangType = require('models/ThangType');

User = require('models/User');

require('vendor/d3');

module.exports = AnalyticsSubscriptionsView = (function(superClass) {
  extend(AnalyticsSubscriptionsView, superClass);

  AnalyticsSubscriptionsView.prototype.id = 'admin-analytics-subscriptions-view';

  AnalyticsSubscriptionsView.prototype.template = template;

  AnalyticsSubscriptionsView.prototype.events = {
    'click .btn-show-more-cancellations': 'onClickShowMoreCancellations'
  };

  function AnalyticsSubscriptionsView(options) {
    AnalyticsSubscriptionsView.__super__.constructor.call(this, options);
    this.showMoreCancellations = false;
    this.resetSubscriptionsData();
    if (me.isAdmin()) {
      this.refreshData();
    }
  }

  AnalyticsSubscriptionsView.prototype.getRenderData = function() {
    var context, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    context = AnalyticsSubscriptionsView.__super__.getRenderData.call(this);
    context.analytics = (ref = this.analytics) != null ? ref : {
      graphs: []
    };
    context.cancellations = this.showMoreCancellations ? this.cancellations : ((ref1 = this.cancellations) != null ? ref1 : []).slice(0, 40);
    context.showMoreCancellations = this.showMoreCancellations;
    context.subs = _.cloneDeep((ref2 = this.subs) != null ? ref2 : []).reverse();
    context.subscribers = (ref3 = this.subscribers) != null ? ref3 : [];
    context.subscriberCancelled = _.find(context.subscribers, function(subscriber) {
      return subscriber.cancel;
    });
    context.subscriberSponsored = _.find(context.subscribers, function(subscriber) {
      var ref4, ref5;
      return (ref4 = subscriber.user) != null ? (ref5 = ref4.stripe) != null ? ref5.sponsorID : void 0 : void 0;
    });
    context.total = (ref4 = this.total) != null ? ref4 : 0;
    context.monthlyChurn = (ref5 = this.monthlyChurn) != null ? ref5 : 0.0;
    context.monthlyGrowth = (ref6 = this.monthlyGrowth) != null ? ref6 : 0.0;
    context.outstandingCancels = (ref7 = this.outstandingCancels) != null ? ref7 : [];
    context.refreshDataState = this.refreshDataState;
    return context;
  };

  AnalyticsSubscriptionsView.prototype.afterRender = function() {
    AnalyticsSubscriptionsView.__super__.afterRender.call(this);
    return this.updateAnalyticsGraphs();
  };

  AnalyticsSubscriptionsView.prototype.onClickShowMoreCancellations = function(e) {
    this.showMoreCancellations = true;
    return typeof this.render === "function" ? this.render() : void 0;
  };

  AnalyticsSubscriptionsView.prototype.resetSubscriptionsData = function() {
    this.analytics = {
      graphs: []
    };
    this.subs = [];
    this.total = 0;
    this.monthlyChurn = 0.0;
    this.monthlyGrowth = 0.0;
    return this.refreshDataState = 'Fetching dashboard data...';
  };

  AnalyticsSubscriptionsView.prototype.refreshData = function() {
    if (!me.isAdmin()) {
      return;
    }
    this.resetSubscriptionsData();
    return this.getCancellations((function(_this) {
      return function(cancellations) {
        _this.cancellations = cancellations;
        if (typeof _this.render === "function") {
          _this.render();
        }
        return _this.getOutstandingCancelledSubscriptions(cancellations, function(outstandingCancels) {
          _this.outstandingCancels = outstandingCancels;
          return _this.getSubscriptions(cancellations, function(subscriptions) {
            _this.updateAnalyticsGraphData();
            if (typeof _this.render === "function") {
              _this.render();
            }
            return _this.getSubscribers(subscriptions, function() {
              return typeof _this.render === "function" ? _this.render() : void 0;
            });
          });
        });
      };
    })(this));
  };

  AnalyticsSubscriptionsView.prototype.updateFetchDataState = function(msg) {
    this.refreshDataState = msg;
    return typeof this.render === "function" ? this.render() : void 0;
  };

  AnalyticsSubscriptionsView.prototype.getCancellations = function(done) {
    var cancellations;
    cancellations = [];
    return this.getCancellationEvents((function(_this) {
      return function(cancelledSubscriptions) {
        var options, userIDs;
        userIDs = _.filter(_.map(cancelledSubscriptions, function(a) {
          return a.userID;
        }), function(b) {
          return b != null;
        });
        options = {
          url: '/db/user/-/users',
          method: 'POST',
          data: {
            ids: userIDs
          }
        };
        options.error = function(model, response, options) {
          if (_this.destroyed) {
            return;
          }
          return console.error('Failed to get cancelled users', response);
        };
        options.success = function(cancelledUsers, response, options) {
          var cancellation, j, k, len, len1, user, userMap;
          if (_this.destroyed) {
            return;
          }
          userMap = {};
          for (j = 0, len = cancelledUsers.length; j < len; j++) {
            user = cancelledUsers[j];
            userMap[user._id] = user;
          }
          for (k = 0, len1 = cancelledSubscriptions.length; k < len1; k++) {
            cancellation = cancelledSubscriptions[k];
            if (!(cancellation.userID in userMap)) {
              continue;
            }
            cancellation.user = userMap[cancellation.userID];
            cancellation.level = User.levelFromExp(cancellation.user.points);
          }
          cancelledSubscriptions.sort(function(a, b) {
            if (a.cancel > b.cancel) {
              return -1;
            } else {
              return 1;
            }
          });
          return done(cancelledSubscriptions);
        };
        _this.updateFetchDataState('Fetching cancellations...');
        return _this.supermodel.addRequestResource('get_cancelled_users', options, 0).load();
      };
    })(this));
  };

  AnalyticsSubscriptionsView.prototype.getCancellationEvents = function(done) {
    var cancellationEvents, earliestEventDate, nextBatch;
    cancellationEvents = [];
    earliestEventDate = new Date();
    earliestEventDate.setUTCMonth(earliestEventDate.getUTCMonth() - 2);
    earliestEventDate.setUTCDate(earliestEventDate.getUTCDate() - 8);
    nextBatch = (function(_this) {
      return function(starting_after, done) {
        var options;
        _this.updateFetchDataState("Fetching cancellations " + cancellationEvents.length + "...");
        options = {
          url: '/db/subscription/-/stripe_events',
          method: 'POST',
          data: {
            options: {
              limit: 100
            }
          }
        };
        if (starting_after) {
          options.data.options.starting_after = starting_after;
        }
        options.data.options.type = 'customer.subscription.updated';
        options.data.options.created = {
          gte: Math.floor(earliestEventDate.getTime() / 1000)
        };
        options.error = function(model, response, options) {
          if (_this.destroyed) {
            return;
          }
          return console.error('Failed to get cancelled events', response);
        };
        options.success = function(events, response, options) {
          var event, j, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
          if (_this.destroyed) {
            return;
          }
          ref = events.data;
          for (j = 0, len = ref.length; j < len; j++) {
            event = ref[j];
            if (!(((ref1 = event.data) != null ? (ref2 = ref1.object) != null ? ref2.cancel_at_period_end : void 0 : void 0) === true && ((ref3 = event.data) != null ? ref3.previous_attributes.cancel_at_period_end : void 0) === false)) {
              continue;
            }
            if (((ref4 = event.data) != null ? (ref5 = ref4.object) != null ? (ref6 = ref5.plan) != null ? ref6.id : void 0 : void 0 : void 0) !== 'basic') {
              continue;
            }
            if (((ref7 = event.data) != null ? (ref8 = ref7.object) != null ? ref8.id : void 0 : void 0) == null) {
              continue;
            }
            cancellationEvents.push({
              cancel: new Date(event.created * 1000),
              customerID: event.data.object.customer,
              start: new Date(event.data.object.start * 1000),
              subscriptionID: event.data.object.id,
              userID: (ref9 = event.data.object.metadata) != null ? ref9.id : void 0
            });
          }
          if (events.has_more) {
            return nextBatch(events.data[events.data.length - 1].id, done);
          }
          return done(cancellationEvents);
        };
        return _this.supermodel.addRequestResource('get_cancellation_events', options, 0).load();
      };
    })(this);
    return nextBatch(null, done);
  };

  AnalyticsSubscriptionsView.prototype.getOutstandingCancelledSubscriptions = function(cancellations, done) {
    var options, trimmedCancellations;
    this.updateFetchDataState("Fetching oustanding cancellations...");
    trimmedCancellations = _.map(cancellations, function(a) {
      return _.pick(a, ['customerID', 'subscriptionID']);
    });
    options = {
      url: '/db/subscription/-/stripe_subscriptions',
      method: 'POST',
      data: {
        subscriptions: trimmedCancellations
      }
    };
    options.error = (function(_this) {
      return function(model, response, options) {
        if (_this.destroyed) {
          return;
        }
        return console.error('Failed to get outstanding cancellations', response);
      };
    })(this);
    options.success = (function(_this) {
      return function(subscriptions, response, options) {
        var j, len, outstandingCancelledSubscriptions, ref, subscription;
        if (_this.destroyed) {
          return;
        }
        outstandingCancelledSubscriptions = [];
        for (j = 0, len = subscriptions.length; j < len; j++) {
          subscription = subscriptions[j];
          if (!(subscription != null ? subscription.cancel_at_period_end : void 0)) {
            continue;
          }
          outstandingCancelledSubscriptions.push({
            cancel: new Date(subscription.canceled_at * 1000),
            customerID: subscription.customerID,
            start: new Date(subscription.start * 1000),
            subscriptionID: subscription.id,
            userID: (ref = subscription.metadata) != null ? ref.id : void 0
          });
        }
        return done(outstandingCancelledSubscriptions);
      };
    })(this);
    return this.supermodel.addRequestResource('get_outstanding_cancelled_subscriptions', options, 0).load();
  };

  AnalyticsSubscriptionsView.prototype.getSubscribers = function(subscriptions, done) {
    var maxSubscribers, options, subscriberUserIDs, subscribers;
    this.updateFetchDataState("Fetching recent subscribers...");
    if (typeof this.render === "function") {
      this.render();
    }
    maxSubscribers = 40;
    subscribers = _.filter(subscriptions, function(a) {
      return a.userID != null;
    });
    subscribers.sort(function(a, b) {
      if (a.start > b.start) {
        return -1;
      } else {
        return 1;
      }
    });
    subscribers = subscribers.slice(0, maxSubscribers);
    subscriberUserIDs = _.map(subscribers, function(a) {
      return a.userID;
    });
    options = {
      url: '/db/subscription/-/subscribers',
      method: 'POST',
      data: {
        ids: subscriberUserIDs
      }
    };
    options.error = (function(_this) {
      return function(model, response, options) {
        if (_this.destroyed) {
          return;
        }
        return console.error('Failed to get subscribers', response);
      };
    })(this);
    options.success = (function(_this) {
      return function(userMap, response, options) {
        var hero, j, len, ref, subscriber;
        if (_this.destroyed) {
          return;
        }
        for (j = 0, len = subscribers.length; j < len; j++) {
          subscriber = subscribers[j];
          if (!(subscriber.userID in userMap)) {
            continue;
          }
          subscriber.user = userMap[subscriber.userID];
          subscriber.level = User.levelFromExp(subscriber.user.points);
          if (hero = (ref = subscriber.user.heroConfig) != null ? ref.thangType : void 0) {
            subscriber.hero = _.invert(ThangType.heroes)[hero];
          }
        }
        _this.subscribers = subscribers;
        return done();
      };
    })(this);
    return this.supermodel.addRequestResource('get_subscribers', options, 0).load();
  };

  AnalyticsSubscriptionsView.prototype.getSubscriptions = function(cancellations, done) {
    if (cancellations == null) {
      cancellations = [];
    }
    return this.getInvoices((function(_this) {
      return function(invoices) {
        var invoice, j, len, subID, subMap;
        subMap = {};
        for (j = 0, len = invoices.length; j < len; j++) {
          invoice = invoices[j];
          subID = invoice.subscriptionID;
          if (subID in subMap) {
            subMap[subID].first = new Date(invoice.date);
          } else {
            subMap[subID] = {
              first: new Date(invoice.date),
              last: new Date(invoice.date),
              customerID: invoice.customerID
            };
          }
          if (invoice.userID) {
            subMap[subID].userID = invoice.userID;
          }
        }
        return _this.getSponsors(function(sponsors) {
          return _this.getRecipientSubscriptions(sponsors, function(recipientSubscriptions) {
            var base, base1, base2, cancelDay, cancellation, cancelledThisMonth, day, endDay, endMonthTotal, i, k, l, len1, len2, len3, len4, m, n, oneMonthAgo, ref, ref1, ref2, startDay, startMonthTotal, sub, subDayMap, subs, subscription, today, totalLastMonth;
            for (k = 0, len1 = recipientSubscriptions.length; k < len1; k++) {
              subscription = recipientSubscriptions[k];
              subMap[subscription.id] = {
                first: new Date(subscription.start * 1000)
              };
              if (((ref = subscription.metadata) != null ? ref.id : void 0) != null) {
                subMap[subscription.id].userID = subscription.metadata.id;
              }
              if (subscription.cancel_at_period_end) {
                subMap[subscription.id].cancel = new Date(subscription.canceled_at * 1000);
                subMap[subscription.id].end = new Date(subscription.current_period_end * 1000);
              }
            }
            subs = [];
            for (subID in subMap) {
              sub = {
                customerID: subMap[subID].customerID,
                start: subMap[subID].first,
                subscriptionID: subID
              };
              if (subMap[subID].cancel) {
                sub.cancel = subMap[subID].cancel;
              }
              oneMonthAgo = new Date();
              oneMonthAgo.setUTCMonth(oneMonthAgo.getUTCMonth() - 1);
              if (subMap[subID].end != null) {
                sub.end = subMap[subID].end;
              } else if (subMap[subID].last < oneMonthAgo) {
                sub.end = subMap[subID].last;
                sub.end.setUTCMonth(sub.end.getUTCMonth() + 1);
              }
              if (subMap[subID].userID) {
                sub.userID = subMap[subID].userID;
              }
              subs.push(sub);
            }
            subDayMap = {};
            for (l = 0, len2 = subs.length; l < len2; l++) {
              sub = subs[l];
              startDay = sub.start.toISOString().substring(0, 10);
              if (subDayMap[startDay] == null) {
                subDayMap[startDay] = {};
              }
              if ((base = subDayMap[startDay])['start'] == null) {
                base['start'] = 0;
              }
              subDayMap[startDay]['start']++;
              if (endDay = sub != null ? (ref1 = sub.end) != null ? ref1.toISOString().substring(0, 10) : void 0 : void 0) {
                if (subDayMap[endDay] == null) {
                  subDayMap[endDay] = {};
                }
                if ((base1 = subDayMap[endDay])['end'] == null) {
                  base1['end'] = 0;
                }
                subDayMap[endDay]['end']++;
              }
              for (m = 0, len3 = cancellations.length; m < len3; m++) {
                cancellation = cancellations[m];
                if (cancellation.subscriptionID === sub.subscriptionID) {
                  sub.cancel = cancellation.cancel;
                  cancelDay = cancellation.cancel.toISOString().substring(0, 10);
                  if (subDayMap[cancelDay] == null) {
                    subDayMap[cancelDay] = {};
                  }
                  if ((base2 = subDayMap[cancelDay])['cancel'] == null) {
                    base2['cancel'] = 0;
                  }
                  subDayMap[cancelDay]['cancel']++;
                  break;
                }
              }
            }
            today = new Date().toISOString().substring(0, 10);
            for (day in subDayMap) {
              if (day > today) {
                continue;
              }
              _this.subs.push({
                day: day,
                started: subDayMap[day]['start'] || 0,
                cancelled: subDayMap[day]['cancel'] || 0,
                ended: subDayMap[day]['end'] || 0
              });
            }
            _this.subs.sort(function(a, b) {
              return a.day.localeCompare(b.day);
            });
            cancelledThisMonth = 0;
            totalLastMonth = 0;
            ref2 = _this.subs;
            for (i = n = 0, len4 = ref2.length; n < len4; i = ++n) {
              sub = ref2[i];
              _this.total += sub.started;
              _this.total -= sub.ended;
              sub.total = _this.total;
              if (_this.subs.length - i < 31) {
                cancelledThisMonth += sub.cancelled;
              }
              if (_this.subs.length - i === 31) {
                totalLastMonth = _this.total;
              }
            }
            if (totalLastMonth > 0) {
              _this.monthlyChurn = cancelledThisMonth / totalLastMonth * 100.0;
            }
            if (_this.subs.length > 30 && _this.subs[_this.subs.length - 31].total > 0) {
              startMonthTotal = _this.subs[_this.subs.length - 31].total;
              endMonthTotal = _this.subs[_this.subs.length - 1].total;
              _this.monthlyGrowth = (endMonthTotal / startMonthTotal - 1) * 100;
            }
            return done(subs);
          });
        });
      };
    })(this));
  };

  AnalyticsSubscriptionsView.prototype.getInvoices = function(done) {
    var addInvoice, getAnalyticsInvoices, getLiveInvoices, invoices;
    invoices = {};
    addInvoice = (function(_this) {
      return function(invoice) {
        var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
        if (!invoice.paid) {
          return;
        }
        if (!invoice.subscription) {
          return;
        }
        if (!(invoice.total > 0)) {
          return;
        }
        if (((ref = invoice.lines) != null ? (ref1 = ref.data) != null ? (ref2 = ref1[0]) != null ? (ref3 = ref2.plan) != null ? ref3.id : void 0 : void 0 : void 0 : void 0) !== 'basic') {
          return;
        }
        invoices[invoice.id] = {
          customerID: invoice.customer,
          subscriptionID: invoice.subscription,
          date: new Date(invoice.date * 1000)
        };
        if ((ref4 = invoice.lines) != null ? (ref5 = ref4.data) != null ? (ref6 = ref5[0]) != null ? (ref7 = ref6.metadata) != null ? ref7.id : void 0 : void 0 : void 0 : void 0) {
          return invoices[invoice.id].userID = invoice.lines.data[0].metadata.id;
        }
      };
    })(this);
    getLiveInvoices = (function(_this) {
      return function(ending_before, done) {
        var nextBatch;
        nextBatch = function(ending_before, done) {
          var options;
          _this.updateFetchDataState("Fetching invoices " + (Object.keys(invoices).length) + "...");
          options = {
            url: '/db/subscription/-/stripe_invoices',
            method: 'POST',
            data: {
              options: {
                ending_before: ending_before,
                limit: 100
              }
            }
          };
          options.error = function(model, response, options) {
            if (_this.destroyed) {
              return;
            }
            return console.error('Failed to get live invoices', response);
          };
          options.success = function(invoiceData, response, options) {
            var invoice, invoiceID, j, len, ref;
            if (_this.destroyed) {
              return;
            }
            ref = invoiceData.data;
            for (j = 0, len = ref.length; j < len; j++) {
              invoice = ref[j];
              addInvoice(invoice);
            }
            if (invoiceData.has_more) {
              return nextBatch(invoiceData.data[0].id, done);
            } else {
              invoices = (function() {
                var results;
                results = [];
                for (invoiceID in invoices) {
                  invoice = invoices[invoiceID];
                  results.push(invoice);
                }
                return results;
              })();
              invoices.sort(function(a, b) {
                if (a.date > b.date) {
                  return -1;
                } else {
                  return 1;
                }
              });
              return done(invoices);
            }
          };
          return _this.supermodel.addRequestResource('get_live_invoices', options, 0).load();
        };
        return nextBatch(ending_before, done);
      };
    })(this);
    getAnalyticsInvoices = (function(_this) {
      return function(done) {
        var options;
        _this.updateFetchDataState("Fetching invoices " + (Object.keys(invoices).length) + "...");
        options = {
          url: '/db/analytics.stripe.invoice/-/all',
          method: 'GET'
        };
        options.error = function(model, response, options) {
          if (_this.destroyed) {
            return;
          }
          return console.error('Failed to get analytics stripe invoices', response);
        };
        options.success = function(docs, response, options) {
          var doc, j, len;
          if (_this.destroyed) {
            return;
          }
          docs.sort(function(a, b) {
            return b.date - a.date;
          });
          for (j = 0, len = docs.length; j < len; j++) {
            doc = docs[j];
            addInvoice(doc.properties);
          }
          return getLiveInvoices(docs[0]._id, done);
        };
        return _this.supermodel.addRequestResource('get_analytics_invoices', options, 0).load();
      };
    })(this);
    return getAnalyticsInvoices(done);
  };

  AnalyticsSubscriptionsView.prototype.getRecipientSubscriptions = function(sponsors, done) {
    var j, k, len, len1, options, recipient, ref, ref1, subscriptionsToFetch, user;
    this.updateFetchDataState("Fetching recipient subscriptions...");
    subscriptionsToFetch = [];
    for (j = 0, len = sponsors.length; j < len; j++) {
      user = sponsors[j];
      ref1 = (ref = user.stripe) != null ? ref.recipients : void 0;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        recipient = ref1[k];
        subscriptionsToFetch.push({
          customerID: user.stripe.customerID,
          subscriptionID: recipient.subscriptionID
        });
      }
    }
    if (_.isEmpty(subscriptionsToFetch)) {
      return done([]);
    }
    options = {
      url: '/db/subscription/-/stripe_subscriptions',
      method: 'POST',
      data: {
        subscriptions: subscriptionsToFetch
      }
    };
    options.error = (function(_this) {
      return function(model, response, options) {
        if (_this.destroyed) {
          return;
        }
        return console.error('Failed to get recipient subscriptions', response);
      };
    })(this);
    options.success = (function(_this) {
      return function(subscriptions, response, options) {
        if (_this.destroyed) {
          return;
        }
        return done(subscriptions);
      };
    })(this);
    return this.supermodel.addRequestResource('get_recipient_subscriptions', options, 0).load();
  };

  AnalyticsSubscriptionsView.prototype.getSponsors = function(done) {
    var options;
    this.updateFetchDataState("Fetching sponsors...");
    options = {
      url: '/db/user/-/sub_sponsors',
      method: 'POST'
    };
    options.error = (function(_this) {
      return function(model, response, options) {
        if (_this.destroyed) {
          return;
        }
        return console.error('Failed to get sponsors', response);
      };
    })(this);
    options.success = (function(_this) {
      return function(sponsors, response, options) {
        if (_this.destroyed) {
          return;
        }
        return done(sponsors);
      };
    })(this);
    return this.supermodel.addRequestResource('get_sponsors', options, 0).load();
  };

  AnalyticsSubscriptionsView.prototype.updateAnalyticsGraphData = function() {
    var ref;
    this.analytics.graphs = [];
    if (!(((ref = this.subs) != null ? ref.length : void 0) > 0)) {
      return;
    }
    this.addGraphData(60);
    return this.addGraphData(180, true);
  };

  AnalyticsSubscriptionsView.prototype.addGraphData = function(timeframeDays, skipCancelled) {
    var average, averageNewID, cancelledSubsID, currentDate, currentDay, currentIndex, day, days, graph, i, j, k, l, lastDay, len, len1, len2, len3, len4, len5, len6, len7, len8, len9, levelPoints, lineMetadata, m, n, net, netSubsID, o, p, prevY, q, r, ref, ref1, ref2, ref3, ref4, s, sevenNets, sevenStarts, startedSubsID, sub, totalSubsID;
    if (skipCancelled == null) {
      skipCancelled = false;
    }
    graph = {
      graphID: 'total-subs',
      lines: []
    };
    totalSubsID = 'total-subs';
    startedSubsID = 'started-subs';
    cancelledSubsID = 'cancelled-subs';
    netSubsID = 'net-subs';
    averageNewID = 'average-new';
    lineMetadata = {};
    lineMetadata[totalSubsID] = {
      description: 'Total Active Subscriptions',
      color: 'green',
      strokeWidth: 1
    };
    lineMetadata[startedSubsID] = {
      description: 'New Subscriptions',
      color: 'blue',
      strokeWidth: 1
    };
    lineMetadata[cancelledSubsID] = {
      description: 'Cancelled Subscriptions',
      color: 'red',
      strokeWidth: 1
    };
    lineMetadata[netSubsID] = {
      description: '7-day Average Net Subscriptions (started - cancelled)',
      color: 'black',
      strokeWidth: 4
    };
    lineMetadata[averageNewID] = {
      description: '7-day Average New Subscriptions',
      color: 'black',
      strokeWidth: 4
    };
    days = (function() {
      var j, len, ref, results;
      ref = this.subs;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        sub = ref[j];
        results.push(sub.day);
      }
      return results;
    }).call(this);
    if (days.length > 0) {
      currentIndex = 0;
      currentDay = days[currentIndex];
      currentDate = new Date(currentDay + "T00:00:00.000Z");
      lastDay = days[days.length - 1];
      while (currentDay !== lastDay) {
        if (days[currentIndex] !== currentDay) {
          days.splice(currentIndex, 0, currentDay);
        }
        currentIndex++;
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        currentDay = currentDate.toISOString().substr(0, 10);
      }
    }
    levelPoints = [];
    ref = this.subs;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      sub = ref[i];
      levelPoints.push({
        x: i,
        y: sub.total,
        day: sub.day,
        pointID: "" + totalSubsID + i,
        values: []
      });
    }
    for (i = k = 0, len1 = days.length; k < len1; i = ++k) {
      day = days[i];
      if (levelPoints.length <= i || levelPoints[i].day !== day) {
        prevY = i > 0 ? levelPoints[i - 1].y : 0.0;
        levelPoints.splice(i, 0, {
          y: prevY,
          day: day,
          values: []
        });
      }
      levelPoints[i].x = i;
      levelPoints[i].pointID = "" + totalSubsID + i;
    }
    if (levelPoints.length > timeframeDays) {
      levelPoints.splice(0, levelPoints.length - timeframeDays);
    }
    graph.lines.push({
      lineID: totalSubsID,
      enabled: true,
      points: levelPoints,
      description: lineMetadata[totalSubsID].description,
      lineColor: lineMetadata[totalSubsID].color,
      strokeWidth: lineMetadata[totalSubsID].strokeWidth,
      min: 0,
      max: d3.max(this.subs, function(d) {
        return d.total;
      })
    });
    levelPoints = [];
    ref1 = this.subs;
    for (i = l = 0, len2 = ref1.length; l < len2; i = ++l) {
      sub = ref1[i];
      levelPoints.push({
        x: i,
        y: sub.started,
        day: sub.day,
        pointID: "" + startedSubsID + i,
        values: []
      });
    }
    for (i = m = 0, len3 = days.length; m < len3; i = ++m) {
      day = days[i];
      if (levelPoints.length <= i || levelPoints[i].day !== day) {
        prevY = i > 0 ? levelPoints[i - 1].y : 0.0;
        levelPoints.splice(i, 0, {
          y: prevY,
          day: day,
          values: []
        });
      }
      levelPoints[i].x = i;
      levelPoints[i].pointID = "" + startedSubsID + i;
    }
    if (levelPoints.length > timeframeDays) {
      levelPoints.splice(0, levelPoints.length - timeframeDays);
    }
    graph.lines.push({
      lineID: startedSubsID,
      enabled: true,
      points: levelPoints,
      description: lineMetadata[startedSubsID].description,
      lineColor: lineMetadata[startedSubsID].color,
      strokeWidth: lineMetadata[startedSubsID].strokeWidth,
      min: 0,
      max: d3.max(this.subs.slice(-timeframeDays), function(d) {
        return d.started + 2;
      })
    });
    if (skipCancelled) {
      levelPoints = [];
      sevenStarts = [];
      ref2 = this.subs;
      for (i = n = 0, len4 = ref2.length; n < len4; i = ++n) {
        sub = ref2[i];
        average = 0;
        sevenStarts.push(sub.started);
        if (sevenStarts.length > 7) {
          sevenStarts.shift();
        }
        if (sevenStarts.length === 7) {
          average = sevenStarts.reduce(function(a, b) {
            return a + b;
          }) / sevenStarts.length;
        }
        levelPoints.push({
          x: i,
          y: average,
          day: sub.day,
          pointID: "" + averageNewID + i,
          values: []
        });
      }
      for (i = o = 0, len5 = days.length; o < len5; i = ++o) {
        day = days[i];
        if (levelPoints.length <= i || levelPoints[i].day !== day) {
          prevY = i > 0 ? levelPoints[i - 1].y : 0.0;
          levelPoints.splice(i, 0, {
            y: prevY,
            day: day,
            values: []
          });
        }
        levelPoints[i].x = i;
        levelPoints[i].pointID = "" + averageNewID + i;
      }
      if (levelPoints.length > timeframeDays) {
        levelPoints.splice(0, levelPoints.length - timeframeDays);
      }
      graph.lines.push({
        lineID: averageNewID,
        enabled: true,
        points: levelPoints,
        description: lineMetadata[averageNewID].description,
        lineColor: lineMetadata[averageNewID].color,
        strokeWidth: lineMetadata[averageNewID].strokeWidth,
        min: 0,
        max: d3.max(this.subs.slice(-timeframeDays), function(d) {
          return d.started + 2;
        })
      });
    } else {
      levelPoints = [];
      ref3 = this.subs;
      for (i = p = 0, len6 = ref3.length; p < len6; i = ++p) {
        sub = ref3[i];
        levelPoints.push({
          x: this.subs.length - 30 + i,
          y: sub.cancelled,
          day: sub.day,
          pointID: "" + cancelledSubsID + (this.subs.length - 30 + i),
          values: []
        });
      }
      for (i = q = 0, len7 = days.length; q < len7; i = ++q) {
        day = days[i];
        if (levelPoints.length <= i || levelPoints[i].day !== day) {
          prevY = i > 0 ? levelPoints[i - 1].y : 0.0;
          levelPoints.splice(i, 0, {
            y: prevY,
            day: day,
            values: []
          });
        }
        levelPoints[i].x = i;
        levelPoints[i].pointID = "" + cancelledSubsID + i;
      }
      if (levelPoints.length > timeframeDays) {
        levelPoints.splice(0, levelPoints.length - timeframeDays);
      }
      graph.lines.push({
        lineID: cancelledSubsID,
        enabled: true,
        points: levelPoints,
        description: lineMetadata[cancelledSubsID].description,
        lineColor: lineMetadata[cancelledSubsID].color,
        strokeWidth: lineMetadata[cancelledSubsID].strokeWidth,
        min: 0,
        max: d3.max(this.subs.slice(-timeframeDays), function(d) {
          return d.started + 2;
        })
      });
      levelPoints = [];
      sevenNets = [];
      ref4 = this.subs;
      for (i = r = 0, len8 = ref4.length; r < len8; i = ++r) {
        sub = ref4[i];
        net = 0;
        sevenNets.push(sub.started - sub.cancelled);
        if (sevenNets.length > 7) {
          sevenNets.shift();
        }
        if (sevenNets.length === 7) {
          net = sevenNets.reduce(function(a, b) {
            return a + b;
          }) / 7;
        }
        levelPoints.push({
          x: i,
          y: net,
          day: sub.day,
          pointID: "" + netSubsID + i,
          values: []
        });
      }
      for (i = s = 0, len9 = days.length; s < len9; i = ++s) {
        day = days[i];
        if (levelPoints.length <= i || levelPoints[i].day !== day) {
          prevY = i > 0 ? levelPoints[i - 1].y : 0.0;
          levelPoints.splice(i, 0, {
            y: prevY,
            day: day,
            values: []
          });
        }
        levelPoints[i].x = i;
        levelPoints[i].pointID = "" + netSubsID + i;
      }
      if (levelPoints.length > timeframeDays) {
        levelPoints.splice(0, levelPoints.length - timeframeDays);
      }
      graph.lines.push({
        lineID: netSubsID,
        enabled: true,
        points: levelPoints,
        description: lineMetadata[netSubsID].description,
        lineColor: lineMetadata[netSubsID].color,
        strokeWidth: lineMetadata[netSubsID].strokeWidth,
        min: 0,
        max: d3.max(this.subs.slice(-timeframeDays), function(d) {
          return d.started + 2;
        })
      });
    }
    return this.analytics.graphs.push(graph);
  };

  AnalyticsSubscriptionsView.prototype.updateAnalyticsGraphs = function() {
    var containerHeight, containerSelector, containerWidth, currentLine, d3line, endDay, graph, graphLineCount, height, i, j, keyHeight, len, line, margin, marks, ref, ref1, ref2, results, startDay, svg, width, xAxis, xAxisHeight, xAxisRange, xRange, yAxis, yAxisRange, yAxisWidth, yRange;
    if (!(((ref = this.analytics) != null ? (ref1 = ref.graphs) != null ? ref1.length : void 0 : void 0) > 0)) {
      return;
    }
    containerSelector = '.line-graph-container';
    margin = 20;
    keyHeight = 20;
    xAxisHeight = 20;
    yAxisWidth = 40;
    containerWidth = $(containerSelector).width();
    containerHeight = $(containerSelector).height();
    ref2 = this.analytics.graphs;
    results = [];
    for (j = 0, len = ref2.length; j < len; j++) {
      graph = ref2[j];
      graphLineCount = _.reduce(graph.lines, (function(sum, item) {
        if (item.enabled) {
          return sum + 1;
        } else {
          return sum;
        }
      }), 0);
      svg = d3.select(containerSelector).append("svg").attr("width", containerWidth).attr("height", containerHeight);
      width = containerWidth - margin * 2 - yAxisWidth * 2;
      height = containerHeight - margin * 2 - xAxisHeight - keyHeight * graphLineCount;
      currentLine = 0;
      results.push((function() {
        var k, len1, ref3, results1;
        ref3 = graph.lines;
        results1 = [];
        for (k = 0, len1 = ref3.length; k < len1; k++) {
          line = ref3[k];
          if (!line.enabled) {
            continue;
          }
          xRange = d3.scale.linear().range([0, width]).domain([
            d3.min(line.points, function(d) {
              return d.x;
            }), d3.max(line.points, function(d) {
              return d.x;
            })
          ]);
          yRange = d3.scale.linear().range([height, 0]).domain([line.min, line.max]);
          if (currentLine === 0) {
            startDay = new Date(line.points[0].day);
            endDay = new Date(line.points[line.points.length - 1].day);
            xAxisRange = d3.time.scale().domain([startDay, endDay]).range([0, width]);
            xAxis = d3.svg.axis().scale(xAxisRange);
            svg.append("g").attr("class", "x axis").call(xAxis).selectAll("text").attr("dy", ".35em").attr("transform", "translate(" + (margin + yAxisWidth) + "," + (height + margin) + ")").style("text-anchor", "start");
          }
          if (line.lineID === 'started-subs') {
            marks = (function() {
              var l, results2;
              results2 = [];
              for (i = l = 1; l < 5; i = ++l) {
                results2.push(Math.round(i * line.max / 5));
              }
              return results2;
            })();
            svg.selectAll(".line").data(marks).enter().append("line").attr("x1", margin + yAxisWidth * 2).attr("y1", function(d) {
              return margin + yRange(d);
            }).attr("x2", margin + yAxisWidth * 2 + width).attr("y2", function(d) {
              return margin + yRange(d);
            }).attr("stroke", line.lineColor).style("opacity", "0.5");
          }
          if (currentLine < 2) {
            yAxisRange = d3.scale.linear().range([height, 0]).domain([line.min, line.max]);
            yAxis = d3.svg.axis().scale(yRange).orient("left");
            svg.append("g").attr("class", "y axis").attr("transform", "translate(" + (margin + yAxisWidth * currentLine) + "," + margin + ")").style("color", line.lineColor).call(yAxis).selectAll("text").attr("y", 0).attr("x", 0).attr("fill", line.lineColor).style("text-anchor", "start");
          }
          svg.append("line").attr("x1", margin).attr("y1", margin + height + xAxisHeight + keyHeight * currentLine + keyHeight / 2).attr("x2", margin + 40).attr("y2", margin + height + xAxisHeight + keyHeight * currentLine + keyHeight / 2).attr("stroke", line.lineColor).attr("class", "key-line");
          svg.append("text").attr("x", margin + 40 + 10).attr("y", margin + height + xAxisHeight + keyHeight * currentLine + (keyHeight + 10) / 2).attr("fill", line.lineColor === 'gold' ? 'orange' : line.lineColor).attr("class", "key-text").text(line.description);
          svg.selectAll(".circle").data(line.points).enter().append("circle").attr("transform", "translate(" + (margin + yAxisWidth * 2) + "," + margin + ")").attr("cx", function(d) {
            return xRange(d.x);
          }).attr("cy", function(d) {
            return yRange(d.y);
          }).attr("r", 2).attr("fill", line.lineColor).attr("stroke-width", 1).attr("class", "graph-point").attr("data-pointid", function(d) {
            return "" + line.lineID + d.x;
          });
          d3line = d3.svg.line().x(function(d) {
            return xRange(d.x);
          }).y(function(d) {
            return yRange(d.y);
          }).interpolate("linear");
          svg.append("path").attr("d", d3line(line.points)).attr("transform", "translate(" + (margin + yAxisWidth * 2) + "," + margin + ")").style("stroke-width", line.strokeWidth).style("stroke", line.lineColor).style("fill", "none");
          results1.push(currentLine++);
        }
        return results1;
      })());
    }
    return results;
  };

  return AnalyticsSubscriptionsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/AnalyticsSubscriptionsView.js.map