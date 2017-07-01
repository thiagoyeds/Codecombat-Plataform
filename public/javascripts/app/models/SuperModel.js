require.register("models/SuperModel", function(exports, require, module) {
var ModelResource, RequestResource, Resource, SomethingResource, SuperModel,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = SuperModel = (function(superClass) {
  extend(SuperModel, superClass);

  function SuperModel() {
    this.updateProgress = bind(this.updateProgress, this);
    this.num = 0;
    this.denom = 0;
    this.progress = 0;
    this.resources = {};
    this.rid = 0;
    this.maxProgress = 1;
    this.models = {};
    this.collections = {};
  }

  SuperModel.prototype.report = function() {
    var j, len, ref, resource, unfinished;
    console.info('SuperModel report ------------------------');
    console.info((_.values(this.resources).length) + " resources.");
    unfinished = [];
    ref = _.values(this.resources);
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      if (!(resource)) {
        continue;
      }
      console.info("\t", resource.name, 'loaded', resource.isLoaded, resource.model);
      if (!resource.isLoaded) {
        unfinished.push(resource);
      }
    }
    return unfinished;
  };

  SuperModel.prototype.numDuplicates = function() {
    var ids, m;
    ids = (function() {
      var j, len, ref, results;
      ref = _.values(this.models);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        m = ref[j];
        results.push(m.get('_id'));
      }
      return results;
    }).call(this);
    return _.size(ids) - _.size(_.unique(ids));
  };

  SuperModel.prototype.loadModel = function(model, name, fetchOptions, value) {
    var cachedModel, res;
    if (value == null) {
      value = 1;
    }
    if (_.isNumber(fetchOptions)) {
      value = fetchOptions;
    }
    if (_.isObject(name)) {
      fetchOptions = name;
    }
    if (!((fetchOptions != null ? fetchOptions.cache : void 0) === false && name === 'opponent_session')) {
      cachedModel = this.getModelByURL(model.getURL());
    }
    if (cachedModel) {
      if (cachedModel.loaded) {
        res = this.addModelResource(cachedModel, name, fetchOptions, 0);
        res.markLoaded();
        return res;
      } else {
        res = this.addModelResource(cachedModel, name, fetchOptions, value);
        res.markLoading();
        return res;
      }
    } else {
      this.registerModel(model);
      res = this.addModelResource(model, name, fetchOptions, value);
      if (model.loaded) {
        res.markLoaded();
      } else {
        res.load();
      }
      return res;
    }
  };

  SuperModel.prototype.loadCollection = function(collection, name, fetchOptions, value) {
    var cachedCollection, onCollectionSynced, res, url;
    if (value == null) {
      value = 1;
    }
    if (_.isNumber(fetchOptions)) {
      value = fetchOptions;
    }
    if (_.isObject(name)) {
      fetchOptions = name;
    }
    url = collection.getURL();
    if (cachedCollection = this.collections[url]) {
      console.debug('Collection cache hit', url, 'already loaded', cachedCollection.loaded);
      if (cachedCollection.loaded) {
        res = this.addModelResource(cachedCollection, name, fetchOptions, 0);
        res.markLoaded();
        return res;
      } else {
        res = this.addModelResource(cachedCollection, name, fetchOptions, value);
        res.markLoading();
        return res;
      }
    } else {
      this.addCollection(collection);
      onCollectionSynced = function(c) {
        if (collection.url === c.url) {
          return this.registerCollection(c);
        } else {
          console.warn('Sync triggered for collection', c);
          console.warn('Yet got other object', c);
          return this.listenToOnce(collection, 'sync', onCollectionSynced);
        }
      };
      this.listenToOnce(collection, 'sync', onCollectionSynced);
      res = this.addModelResource(collection, name, fetchOptions, value);
      if (!(res.isLoading || res.isLoaded)) {
        res.load();
      }
      return res;
    }
  };

  SuperModel.prototype.trackModel = function(model, value) {
    var res;
    res = this.addModelResource(model, '', {}, value);
    return res.listen();
  };

  SuperModel.prototype.trackCollection = function(collection, value) {
    var res;
    res = this.addModelResource(collection, '', {}, value);
    return res.listen();
  };

  SuperModel.prototype.trackRequest = function(jqxhr, value) {
    var res;
    if (value == null) {
      value = 1;
    }
    res = new Resource('', value);
    res.jqxhr = jqxhr;
    jqxhr.done(function() {
      return res.markLoaded();
    });
    jqxhr.fail(function() {
      return res.markFailed();
    });
    this.storeResource(res, value);
    return jqxhr;
  };

  SuperModel.prototype.trackRequests = function(jqxhrs, value) {
    var j, jqxhr, len, results;
    if (value == null) {
      value = 1;
    }
    results = [];
    for (j = 0, len = jqxhrs.length; j < len; j++) {
      jqxhr = jqxhrs[j];
      results.push(this.trackRequest(jqxhr, value));
    }
    return results;
  };

  SuperModel.prototype.shouldSaveBackups = function(model) {
    return false;
  };

  SuperModel.prototype.getModel = function(ModelClass_or_url, id) {
    var m;
    if (_.isString(ModelClass_or_url)) {
      return this.getModelByURL(ModelClass_or_url);
    }
    m = new ModelClass_or_url({
      _id: id
    });
    return this.getModelByURL(m.getURL());
  };

  SuperModel.prototype.getModelByURL = function(modelURL) {
    if (_.isFunction(modelURL)) {
      modelURL = modelURL();
    }
    return this.models[modelURL] || null;
  };

  SuperModel.prototype.getModelByOriginal = function(ModelClass, original, filter) {
    if (filter == null) {
      filter = null;
    }
    return _.find(this.models, function(m) {
      return m.get('original') === original && m.constructor.className === ModelClass.className && (!filter || filter(m));
    });
  };

  SuperModel.prototype.getModelByOriginalAndMajorVersion = function(ModelClass, original, majorVersion) {
    if (majorVersion == null) {
      majorVersion = 0;
    }
    return _.find(this.models, function(m) {
      var v;
      if (!(v = m.get('version'))) {
        return;
      }
      return m.get('original') === original && v.major === majorVersion && m.constructor.className === ModelClass.className;
    });
  };

  SuperModel.prototype.getModels = function(ModelClass) {
    var key, m;
    if (ModelClass) {
      return (function() {
        var ref, results;
        ref = this.models;
        results = [];
        for (key in ref) {
          m = ref[key];
          if (m.constructor.className === ModelClass.className) {
            results.push(m);
          }
        }
        return results;
      }).call(this);
    }
    return _.values(this.models);
  };

  SuperModel.prototype.registerModel = function(model) {
    return this.models[model.getURL()] = model;
  };

  SuperModel.prototype.getCollection = function(collection) {
    return this.collections[collection.getURL()] || collection;
  };

  SuperModel.prototype.addCollection = function(collection) {
    var url;
    url = collection.getURL();
    if ((this.collections[url] != null) && this.collections[url] !== collection) {
      return console.warn("Tried to add Collection '" + url + "' to SuperModel when we already had it.");
    }
    return this.registerCollection(collection);
  };

  SuperModel.prototype.registerCollection = function(collection) {
    var cachedModel, clone, i, j, len, model, ref;
    if (collection.isCachable) {
      this.collections[collection.getURL()] = collection;
    }
    ref = collection.models;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      model = ref[i];
      cachedModel = this.getModelByURL(model.getURL());
      if (cachedModel) {
        clone = $.extend(true, {}, model.attributes);
        cachedModel.set(clone, {
          silent: true,
          fromMerge: true
        });
      } else {
        this.registerModel(model);
      }
    }
    return collection;
  };

  SuperModel.prototype.finished = function() {
    return (this.progress === 1.0) || (!this.denom) || this.failed;
  };

  SuperModel.prototype.addModelResource = function(modelOrCollection, name, fetchOptions, value) {
    var res;
    if (value == null) {
      value = 1;
    }
    if (_.isNumber(fetchOptions)) {
      value = fetchOptions;
    }
    if (_.isObject(name)) {
      fetchOptions = name;
    }
    modelOrCollection.saveBackups = modelOrCollection.saveBackups || this.shouldSaveBackups(modelOrCollection);
    this.checkName(name);
    res = new ModelResource(modelOrCollection, name, fetchOptions, value);
    this.storeResource(res, value);
    return res;
  };

  SuperModel.prototype.removeModelResource = function(modelOrCollection) {
    return this.removeResource(_.find(this.resources, function(resource) {
      return (resource != null ? resource.model : void 0) === modelOrCollection;
    }));
  };

  SuperModel.prototype.addRequestResource = function(name, jqxhrOptions, value) {
    var res;
    if (value == null) {
      value = 1;
    }
    if (_.isNumber(jqxhrOptions)) {
      value = jqxhrOptions;
    }
    if (_.isObject(name)) {
      jqxhrOptions = name;
    }
    this.checkName(name);
    res = new RequestResource(name, jqxhrOptions, value);
    this.storeResource(res, value);
    return res;
  };

  SuperModel.prototype.addSomethingResource = function(name, value) {
    var res;
    if (value == null) {
      value = 1;
    }
    if (_.isNumber(name)) {
      value = name;
    }
    this.checkName(name);
    res = new SomethingResource(name, value);
    this.storeResource(res, value);
    return res;
  };

  SuperModel.prototype.checkName = function(name) {};

  SuperModel.prototype.storeResource = function(resource, value) {
    this.rid++;
    resource.rid = this.rid;
    this.resources[this.rid] = resource;
    this.listenToOnce(resource, 'loaded', this.onResourceLoaded);
    this.listenTo(resource, 'failed', this.onResourceFailed);
    this.denom += value;
    if (this.denom) {
      return _.defer(this.updateProgress);
    }
  };

  SuperModel.prototype.removeResource = function(resource) {
    if (!this.resources[resource.rid]) {
      return;
    }
    this.resources[resource.rid] = null;
    if (resource.isLoaded) {
      --this.num;
    }
    --this.denom;
    return _.defer(this.updateProgress);
  };

  SuperModel.prototype.onResourceLoaded = function(r) {
    if (!this.resources[r.rid]) {
      return;
    }
    this.num += r.value;
    _.defer(this.updateProgress);
    r.clean();
    this.stopListening(r, 'failed', this.onResourceFailed);
    return this.trigger('resource-loaded', r);
  };

  SuperModel.prototype.onResourceFailed = function(r) {
    if (!this.resources[r.rid]) {
      return;
    }
    this.failed = true;
    this.trigger('failed', {
      resource: r
    });
    return r.clean();
  };

  SuperModel.prototype.updateProgress = function() {
    var newProg;
    newProg = this.denom ? this.num / this.denom : 1;
    newProg = Math.min(this.maxProgress, newProg);
    if (this.progress >= newProg) {
      return;
    }
    this.progress = newProg;
    this.trigger('update-progress', this.progress);
    if (this.finished()) {
      return this.trigger('loaded-all');
    }
  };

  SuperModel.prototype.setMaxProgress = function(maxProgress) {
    this.maxProgress = maxProgress;
  };

  SuperModel.prototype.resetProgress = function() {
    return this.progress = 0;
  };

  SuperModel.prototype.clearMaxProgress = function() {
    this.maxProgress = 1;
    return _.defer(this.updateProgress);
  };

  SuperModel.prototype.getProgress = function() {
    return this.progress;
  };

  SuperModel.prototype.getResource = function(rid) {
    return this.resources[rid];
  };

  SuperModel.prototype.finishLoading = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        if (_this.finished()) {
          return resolve(_this);
        }
        _this.once('failed', function(arg) {
          var jqxhr, ref, resource;
          resource = arg.resource;
          jqxhr = resource.jqxhr;
          return reject({
            message: ((ref = jqxhr.responseJSON) != null ? ref.message : void 0) || jqxhr.responseText || 'Unknown Error'
          });
        });
        return _this.once('loaded-all', function() {
          return resolve(_this);
        });
      };
    })(this));
  };

  return SuperModel;

})(Backbone.Model);

Resource = (function(superClass) {
  extend(Resource, superClass);

  function Resource(name, value) {
    if (value == null) {
      value = 1;
    }
    this.name = name;
    this.value = value;
    this.rid = -1;
    this.isLoading = false;
    this.isLoaded = false;
    this.model = null;
    this.jqxhr = null;
  }

  Resource.prototype.markLoaded = function() {
    if (this.isLoaded) {
      return;
    }
    this.trigger('loaded', this);
    this.isLoaded = true;
    return this.isLoading = false;
  };

  Resource.prototype.markFailed = function() {
    if (this.isLoaded) {
      return;
    }
    this.trigger('failed', this);
    this.isLoaded = this.isLoading = false;
    return this.isFailed = true;
  };

  Resource.prototype.markLoading = function() {
    this.isLoaded = this.isFailed = false;
    return this.isLoading = true;
  };

  Resource.prototype.clean = function() {
    return this.jqxhr = null;
  };

  Resource.prototype.load = function() {
    return this;
  };

  return Resource;

})(Backbone.Model);

ModelResource = (function(superClass) {
  extend(ModelResource, superClass);

  function ModelResource(modelOrCollection, name, fetchOptions, value) {
    ModelResource.__super__.constructor.call(this, name, value);
    this.model = modelOrCollection;
    this.fetchOptions = fetchOptions;
    this.jqxhr = this.model.jqxhr;
    this.loadsAttempted = 0;
  }

  ModelResource.prototype.load = function() {
    this.markLoading();
    this.fetchModel();
    return this;
  };

  ModelResource.prototype.fetchModel = function() {
    if (!this.model.loading) {
      this.jqxhr = this.model.fetch(this.fetchOptions);
    }
    return this.listen();
  };

  ModelResource.prototype.listen = function() {
    this.listenToOnce(this.model, 'sync', function() {
      return this.markLoaded();
    });
    return this.listenToOnce(this.model, 'error', function() {
      return this.markFailed();
    });
  };

  ModelResource.prototype.clean = function() {
    this.jqxhr = null;
    return this.model.jqxhr = null;
  };

  return ModelResource;

})(Resource);

RequestResource = (function(superClass) {
  extend(RequestResource, superClass);

  function RequestResource(name, jqxhrOptions, value) {
    RequestResource.__super__.constructor.call(this, name, value);
    this.jqxhrOptions = jqxhrOptions;
  }

  RequestResource.prototype.load = function() {
    this.markLoading();
    this.jqxhr = $.ajax(this.jqxhrOptions);
    this.jqxhr.done((function(_this) {
      return function() {
        return _.defer(function() {
          return _this.markLoaded();
        });
      };
    })(this));
    this.jqxhr.fail((function(_this) {
      return function() {
        return _.defer(function() {
          return _this.markFailed();
        });
      };
    })(this));
    return this;
  };

  return RequestResource;

})(Resource);

SomethingResource = (function(superClass) {
  extend(SomethingResource, superClass);

  function SomethingResource() {
    return SomethingResource.__super__.constructor.apply(this, arguments);
  }

  return SomethingResource;

})(Resource);
});

;
//# sourceMappingURL=/javascripts/app/models/SuperModel.js.map