require.register("collections/CocoCollection", function(exports, require, module) {
var CocoCollection, CocoModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('models/CocoModel');

module.exports = CocoCollection = (function(superClass) {
  extend(CocoCollection, superClass);

  function CocoCollection() {
    return CocoCollection.__super__.constructor.apply(this, arguments);
  }

  CocoCollection.prototype.loaded = false;

  CocoCollection.prototype.model = null;

  CocoCollection.prototype.initialize = function(models, options) {
    var ref;
    if (options == null) {
      options = {};
    }
    if (this.model == null) {
      this.model = options.model;
    }
    if (!this.model) {
      console.error(this.constructor.name, 'does not have a model defined. This will not do!');
    }
    CocoCollection.__super__.initialize.call(this, models, options);
    this.setProjection(options.project);
    if (options.url) {
      this.url = options.url;
    }
    this.once('sync', (function(_this) {
      return function() {
        var i, len, model, ref, results;
        _this.loaded = true;
        ref = _this.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          model = ref[i];
          results.push(model.loaded = true);
        }
        return results;
      };
    })(this));
    if ((ref = window.application) != null ? ref.testing : void 0) {
      this.fakeRequests = [];
      this.on('request', function() {
        return this.fakeRequests.push(jasmine.Ajax.requests.mostRecent());
      });
    }
    if (options.saveBackups) {
      return this.on('sync', function() {
        var i, len, model, ref1, results;
        ref1 = this.models;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          model = ref1[i];
          model.saveBackups = true;
          results.push(model.loadFromBackup());
        }
        return results;
      });
    }
  };

  CocoCollection.prototype.getURL = function() {
    if (_.isString(this.url)) {
      return this.url;
    } else {
      return this.url();
    }
  };

  CocoCollection.prototype.fetch = function(options) {
    if (options == null) {
      options = {};
    }
    if (this.project) {
      if (options.data == null) {
        options.data = {};
      }
      options.data.project = this.project.join(',');
    }
    this.jqxhr = CocoCollection.__super__.fetch.call(this, options);
    this.loading = true;
    return this.jqxhr;
  };

  CocoCollection.prototype.setProjection = function(project) {
    this.project = project;
  };

  CocoCollection.prototype.stringify = function() {
    return JSON.stringify(this.toJSON());
  };

  CocoCollection.prototype.wait = function(event) {
    return new Promise((function(_this) {
      return function(resolve) {
        return _this.once(event, resolve);
      };
    })(this));
  };

  return CocoCollection;

})(Backbone.Collection);
});

;
//# sourceMappingURL=/javascripts/app/collections/CocoCollection.js.map