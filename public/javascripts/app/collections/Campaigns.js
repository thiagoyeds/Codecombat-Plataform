require.register("collections/Campaigns", function(exports, require, module) {
var Campaign, Campaigns, CocoCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Campaign = require('models/Campaign');

CocoCollection = require('collections/CocoCollection');

module.exports = Campaigns = (function(superClass) {
  extend(Campaigns, superClass);

  function Campaigns() {
    return Campaigns.__super__.constructor.apply(this, arguments);
  }

  Campaigns.prototype.model = Campaign;

  Campaigns.prototype.url = '/db/campaign';

  Campaigns.prototype.fetchByType = function(type, options) {
    if (options == null) {
      options = {};
    }
    if (options.data == null) {
      options.data = {};
    }
    options.data.type = type;
    return this.fetch(options);
  };

  Campaigns.prototype.fetchCampaignsAndRelatedLevels = function(options, levelOptions) {
    var Levels, exclude;
    if (options == null) {
      options = {};
    }
    if (levelOptions == null) {
      levelOptions = {};
    }
    Levels = require('collections/Levels');
    if (options.data == null) {
      options.data = {};
    }
    options.data.project = 'slug';
    exclude = options.exclude || [];
    return this.fetch(options).then((function(_this) {
      return function() {
        var base, campaign, i, jqxhrs, len, ref, toRemove;
        toRemove = _this.filter(function(c) {
          var ref;
          return ref = c.get('slug'), indexOf.call(exclude, ref) >= 0;
        });
        _this.remove(toRemove);
        if (levelOptions.data == null) {
          levelOptions.data = {};
        }
        if ((base = levelOptions.data).project == null) {
          base.project = 'thangs,name,slug,campaign,tasks';
        }
        jqxhrs = [];
        ref = _this.models;
        for (i = 0, len = ref.length; i < len; i++) {
          campaign = ref[i];
          campaign.levels = new Levels();
          jqxhrs.push(campaign.levels.fetchForCampaign(campaign.get('slug'), levelOptions));
        }
        return $.when.apply($, jqxhrs);
      };
    })(this));
  };

  return Campaigns;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Campaigns.js.map