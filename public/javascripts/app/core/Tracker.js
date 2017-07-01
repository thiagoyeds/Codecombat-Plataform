require.register("core/Tracker", function(exports, require, module) {
var CocoClass, SuperModel, Tracker, debugAnalytics, me, targetInspectJSLevelSlugs, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

me = require('core/auth').me;

SuperModel = require('models/SuperModel');

utils = require('core/utils');

CocoClass = require('core/CocoClass');

debugAnalytics = false;

targetInspectJSLevelSlugs = ['cupboards-of-kithgard'];

module.exports = Tracker = (function(superClass) {
  extend(Tracker, superClass);

  Tracker.prototype.subscriptions = {
    'application:service-loaded': 'onServiceLoaded'
  };

  function Tracker() {
    this.trackEventInternal = bind(this.trackEventInternal, this);
    this.trackSnowplow = bind(this.trackSnowplow, this);
    this.trackEvent = bind(this.trackEvent, this);
    Tracker.__super__.constructor.call(this);
    if (window.tracker) {
      console.error('Overwrote our Tracker!', window.tracker);
    }
    window.tracker = this;
    this.isProduction = document.location.href.search('codecombat.com') !== -1;
    this.trackReferrers();
    this.identify();
    this.supermodel = new SuperModel();
    if (me.get('role')) {
      this.updateRole();
    }
  }

  Tracker.prototype.enableInspectletJS = function(levelSlug) {
    var insp, scriptLoaded, x;
    if (indexOf.call(targetInspectJSLevelSlugs, levelSlug) < 0) {
      return this.disableInspectletJS();
    }
    scriptLoaded = (function(_this) {
      return function() {
        var ref;
        _this.identify();
        return (ref = window.__insp) != null ? ref.push(['virtualPage']) : void 0;
      };
    })(this);
    window.__insp = [['wid', 2102699786]];
    insp = document.createElement('script');
    insp.type = 'text/javascript';
    insp.async = true;
    insp.id = 'inspsync';
    insp.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js';
    insp.onreadystatechange = function() {
      if (insp.readyState === 'complete') {
        return scriptLoaded();
      }
    };
    insp.onload = scriptLoaded;
    x = document.getElementsByTagName('script')[0];
    return this.inspectletScriptNode = x.parentNode.insertBefore(insp, x);
  };

  Tracker.prototype.disableInspectletJS = function() {
    var x;
    if (this.inspectletScriptNode) {
      x = document.getElementsByTagName('script')[0];
      x.parentNode.removeChild(this.inspectletScriptNode);
      this.inspectletScriptNode = null;
    }
    return delete window.__insp;
  };

  Tracker.prototype.trackReferrers = function() {
    var changed, elapsed, referrer, siteref;
    elapsed = new Date() - new Date(me.get('dateCreated'));
    if (!(elapsed < 5 * 60 * 1000)) {
      return;
    }
    if (me.get('siteref') || me.get('referrer')) {
      return;
    }
    changed = false;
    if (siteref = utils.getQueryVariable('_r')) {
      me.set('siteref', siteref);
      changed = true;
    }
    if (referrer = document.referrer) {
      me.set('referrer', referrer);
      changed = true;
    }
    if (changed) {
      return me.patch();
    }
  };

  Tracker.prototype.identify = function(traits) {
    var i, key, len, ref, userTrait, value;
    if (traits == null) {
      traits = {};
    }
    if (!me) {
      return;
    }
    if (this.explicitTraits == null) {
      this.explicitTraits = {};
    }
    for (key in traits) {
      value = traits[key];
      this.explicitTraits[key] = value;
    }
    ref = ['email', 'anonymous', 'dateCreated', 'hourOfCode', 'name', 'referrer', 'testGroupNumber', 'gender', 'lastLevel', 'siteref', 'ageRange', 'schoolName', 'coursePrepaidID', 'role'];
    for (i = 0, len = ref.length; i < len; i++) {
      userTrait = ref[i];
      if (me.get(userTrait) != null) {
        if (traits[userTrait] == null) {
          traits[userTrait] = me.get(userTrait);
        }
      }
    }
    if (me.isTeacher()) {
      traits.teacher = true;
    }
    traits.host = document.location.host;
    if (debugAnalytics) {
      console.log('Would identify', me.id, traits);
    }
    if (!((me != null ? me.isAdmin() : void 0) && this.isProduction)) {
      this.trackEventInternal('Identify', {
        id: me.id,
        traits: traits
      });
    }
    if (!(this.isProduction && !me.isAdmin())) {
      return;
    }
    if (typeof _errs !== "undefined" && _errs !== null) {
      _errs.meta = traits;
    }
    if (typeof __insp !== "undefined" && __insp !== null) {
      __insp.push(['identify', me.id]);
    }
    if (typeof __insp !== "undefined" && __insp !== null) {
      __insp.push(['tagSession', traits]);
    }
    if (typeof mixpanel !== "undefined" && mixpanel !== null) {
      mixpanel.identify(me.id);
    }
    if (typeof mixpanel !== "undefined" && mixpanel !== null) {
      mixpanel.register(traits);
    }
    if (me.isTeacher() && this.segmentLoaded) {
      traits.createdAt = me.get('dateCreated');
      return analytics.identify(me.id, traits);
    }
  };

  Tracker.prototype.trackPageView = function(includeIntegrations) {
    var i, includeMixpanel, integration, len, name, options, url;
    if (includeIntegrations == null) {
      includeIntegrations = [];
    }
    includeMixpanel = function(name) {
      var mixpanelIncludes;
      mixpanelIncludes = [];
      return indexOf.call(mixpanelIncludes, name) >= 0 || /courses|students|teachers/ig.test(name);
    };
    name = Backbone.history.getFragment();
    url = "/" + name;
    if (debugAnalytics) {
      console.log("Would track analytics pageview: " + url + " Mixpanel=" + (includeMixpanel(name)));
    }
    if (!((me != null ? me.isAdmin() : void 0) && this.isProduction)) {
      this.trackEventInternal('Pageview', {
        url: name,
        href: window.location.href
      });
    }
    if (!(this.isProduction && !me.isAdmin())) {
      return;
    }
    if (typeof ga === "function") {
      ga('send', 'pageview', url);
    }
    if (features.codePlay) {
      if (typeof ga === "function") {
        ga('codeplay.send', 'pageview', url);
      }
    }
    window.snowplow('trackPageView');
    if (includeMixpanel(name)) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        mixpanel.track('page viewed', {
          'page name': name,
          url: url
        });
      }
    }
    if (me.isTeacher() && this.segmentLoaded) {
      options = {};
      if (includeIntegrations != null ? includeIntegrations.length : void 0) {
        options.integrations = {
          All: false
        };
        for (i = 0, len = includeIntegrations.length; i < len; i++) {
          integration = includeIntegrations[i];
          options.integrations[integration] = true;
        }
      }
      return analytics.page(url, {}, options);
    }
  };

  Tracker.prototype.trackEvent = function(action, properties, includeIntegrations) {
    var gaFieldObject, i, integration, len, options, ref;
    if (properties == null) {
      properties = {};
    }
    if (includeIntegrations == null) {
      includeIntegrations = [];
    }
    if (debugAnalytics) {
      console.log('Tracking external analytics event:', action, properties, includeIntegrations);
    }
    if (!(me && this.isProduction && !me.isAdmin())) {
      return;
    }
    this.trackEventInternal(action, _.cloneDeep(properties));
    this.trackSnowplow(action, _.cloneDeep(properties));
    gaFieldObject = {
      hitType: 'event',
      eventCategory: (ref = properties.category) != null ? ref : 'All',
      eventAction: action
    };
    if (properties.label != null) {
      gaFieldObject.eventLabel = properties.label;
    }
    if (properties.value != null) {
      gaFieldObject.eventValue = properties.value;
    }
    if (typeof ga === "function") {
      ga('send', gaFieldObject);
    }
    if (features.codePlay) {
      if (typeof ga === "function") {
        ga('codeplay.send', gaFieldObject);
      }
    }
    if (typeof __insp !== "undefined" && __insp !== null) {
      __insp.push([
        'tagSession', {
          action: action,
          properies: properties
        }
      ]);
    }
    if (indexOf.call(includeIntegrations, 'Mixpanel') >= 0) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        mixpanel.track(action, properties);
      }
    }
    if (me.isTeacher() && this.segmentLoaded) {
      options = {};
      if (includeIntegrations) {
        options.integrations = {
          All: false
        };
        for (i = 0, len = includeIntegrations.length; i < len; i++) {
          integration = includeIntegrations[i];
          options.integrations[integration] = true;
        }
      }
      return typeof analytics !== "undefined" && analytics !== null ? analytics.track(action, {}, options) : void 0;
    }
  };

  Tracker.prototype.trackSnowplow = function(event, properties) {
    var snowplowAction;
    if (event === 'Simulator Result' || event === 'Started Level Load' || event === 'Finished Level Load') {
      return;
    }
    if (event === 'Clicked Start Level' || event === 'Inventory Play' || event === 'Heard Sprite' || event === 'Started Level' || event === 'Saw Victory' || event === 'Click Play' || event === 'Choose Inventory' || event === 'Homepage Loaded' || event === 'Change Hero') {
      delete properties.label;
    }
    snowplowAction = event.toLowerCase().replace(/[^a-z0-9]+/ig, '_');
    properties.user = me.id;
    delete properties.category;
    return window.snowplow('trackUnstructEvent', {
      schema: 'iglu:com.codecombat/' + snowplowAction + '/jsonschema/1-0-0',
      data: properties
    });
  };

  Tracker.prototype.trackEventInternal = function(event, properties) {
    var key, ref, request, value;
    if (this.supermodel == null) {
      return;
    }
    if (event === 'Simulator Result' || event === 'Started Level Load' || event === 'Finished Level Load' || event === 'View Load') {
      return;
    }
    if (event === 'Clicked Start Level' || event === 'Inventory Play' || event === 'Heard Sprite' || event === 'Started Level' || event === 'Saw Victory' || event === 'Click Play' || event === 'Choose Inventory' || event === 'Homepage Loaded' || event === 'Change Hero') {
      delete properties.category;
      delete properties.label;
    } else if (event === 'Loaded World Map' || event === 'Started Signup' || event === 'Finished Signup' || event === 'Login' || event === 'Facebook Login' || event === 'Google Login' || event === 'Show subscription modal') {
      delete properties.category;
    }
    if (this.explicitTraits != null) {
      ref = this.explicitTraits;
      for (key in ref) {
        value = ref[key];
        properties[key] = value;
      }
    }
    if (debugAnalytics) {
      console.log('Tracking internal analytics event:', event, properties);
    }
    request = this.supermodel.addRequestResource({
      url: '/db/analytics.log.event/-/log_event',
      data: {
        event: event,
        properties: properties
      },
      method: 'POST'
    }, 0);
    return request.load();
  };

  Tracker.prototype.trackTiming = function(duration, category, variable, label) {
    if (!(duration >= 0 && duration < 60 * 60 * 1000)) {
      return console.warn("Duration " + duration + " invalid for trackTiming call.");
    }
    if (debugAnalytics) {
      console.log('Would track timing event:', arguments);
    }
    if (!(me && this.isProduction && !me.isAdmin())) {
      return;
    }
    return typeof ga === "function" ? ga('send', 'timing', category, variable, duration, label) : void 0;
  };

  Tracker.prototype.updateRole = function() {
    if (me.isAdmin()) {
      return;
    }
    if (!me.isTeacher()) {
      return;
    }
    if (!this.segmentLoaded) {
      return require('core/services/segment')();
    }
    return this.identify();
  };

  Tracker.prototype.onServiceLoaded = function(e) {
    if (e.service !== 'segment') {
      return;
    }
    this.segmentLoaded = true;
    return this.updateRole();
  };

  return Tracker;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/core/Tracker.js.map