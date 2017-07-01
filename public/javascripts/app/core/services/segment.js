require.register("core/services/segment", function(exports, require, module) {
var initializeSegmentio;

module.exports = initializeSegmentio = function() {
  var analytics, i, len, method, ref;
  analytics = window.analytics = window.analytics || [];
  if (analytics.initialize) {
    return;
  }
  if (analytics.invoked) {
    return typeof console !== "undefined" && console !== null ? console.error('Segment snippet included twice.') : void 0;
  }
  analytics.invoked = true;
  analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'page', 'once', 'off', 'on'];
  analytics.factory = function(t) {
    return function() {
      var e;
      e = Array.prototype.slice.call(arguments);
      e.unshift(t);
      analytics.push(e);
      return analytics;
    };
  };
  ref = analytics.methods;
  for (i = 0, len = ref.length; i < len; i++) {
    method = ref[i];
    analytics[method] = analytics.factory(method);
  }
  analytics.load = function(t) {
    var e, n;
    e = document.createElement('script');
    e.type = 'text/javascript';
    e.async = true;
    e.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 'cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
    n = document.getElementsByTagName('script')[0];
    n.parentNode.insertBefore(e, n);
    Backbone.Mediator.publish('application:service-loaded', {
      service: 'segment'
    });
  };
  analytics.SNIPPET_VERSION = '3.1.0';
  return analytics.load('yJpJZWBw68fEj0aPSv8ffMMgof5kFnU9');
};
});

;
//# sourceMappingURL=/javascripts/app/core/services/segment.js.map