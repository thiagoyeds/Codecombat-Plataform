require.register("models/CocoModel", function(exports, require, module) {
var CocoModel, deltasLib, locale, storage,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

storage = require('core/storage');

deltasLib = require('core/deltas');

locale = require('locale/locale');

CocoModel = (function(superClass) {
  extend(CocoModel, superClass);

  function CocoModel() {
    return CocoModel.__super__.constructor.apply(this, arguments);
  }

  CocoModel.prototype.idAttribute = '_id';

  CocoModel.prototype.loaded = false;

  CocoModel.prototype.loading = false;

  CocoModel.prototype.saveBackups = false;

  CocoModel.prototype.notyErrors = true;

  CocoModel.schema = null;

  CocoModel.prototype.initialize = function(attributes, options) {
    var ref, ref1, ref2;
    CocoModel.__super__.initialize.apply(this, arguments);
    if (options == null) {
      options = {};
    }
    this.setProjection(options.project);
    if (!this.constructor.className) {
      console.error(this + " needs a className set.");
    }
    this.on('sync', this.onLoaded, this);
    this.on('error', this.onError, this);
    this.on('add', this.onLoaded, this);
    this.saveBackup = _.debounce(this.saveBackup, 500);
    this.usesVersions = ((ref = this.schema()) != null ? (ref1 = ref.properties) != null ? ref1.version : void 0 : void 0) != null;
    if ((ref2 = window.application) != null ? ref2.testing : void 0) {
      this.fakeRequests = [];
      return this.on('request', function() {
        return this.fakeRequests.push(jasmine.Ajax.requests.mostRecent());
      });
    }
  };

  CocoModel.prototype.created = function() {
    return new Date(parseInt(this.id.substring(0, 8), 16) * 1000);
  };

  CocoModel.prototype.backupKey = function() {
    if (this.usesVersions) {
      return this.id;
    } else {
      return this.id;
    }
  };

  CocoModel.prototype.setProjection = function(project) {
    var url;
    if (project === this.project) {
      return;
    }
    url = this.getURL();
    if (!/project=/.test(url)) {
      url += '&project=';
    }
    if (!/\?/.test(url)) {
      url = url.replace('&', '?');
    }
    url = url.replace(/project=[^&]*/, "project=" + ((project != null ? project.join(',') : void 0) || ''));
    if (!(project != null ? project.length : void 0)) {
      url = url.replace(/[&?]project=&/, '&');
    }
    if (!(project != null ? project.length : void 0)) {
      url = url.replace(/[&?]project=$/, '');
    }
    this.setURL(url);
    return this.project = project;
  };

  CocoModel.prototype.type = function() {
    return this.constructor.className;
  };

  CocoModel.prototype.clone = function(withChanges) {
    var clone, i, key, len, ref;
    if (withChanges == null) {
      withChanges = true;
    }
    clone = CocoModel.__super__.clone.call(this);
    clone.set($.extend(true, {}, withChanges || !this._revertAttributes ? this.attributes : this._revertAttributes));
    if (this._revertAttributes && !withChanges) {
      ref = _.difference(_.keys(clone.attributes), _.keys(this._revertAttributes));
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        clone.unset(key);
      }
    }
    return clone;
  };

  CocoModel.prototype.onError = function(level, jqxhr) {
    this.loading = false;
    this.jqxhr = null;
    if (jqxhr.status === 402) {
      if (_.contains(jqxhr.responseText, 'be in a course')) {
        return Backbone.Mediator.publish('level:course-membership-required', {});
      } else {
        return Backbone.Mediator.publish('level:subscription-required', {});
      }
    }
  };

  CocoModel.prototype.onLoaded = function() {
    this.loaded = true;
    this.loading = false;
    this.jqxhr = null;
    return this.loadFromBackup();
  };

  CocoModel.prototype.getCreationDate = function() {
    return new Date(parseInt(this.id.slice(0, 8), 16) * 1000);
  };

  CocoModel.prototype.getNormalizedURL = function() {
    return this.urlRoot + "/" + this.id;
  };

  CocoModel.prototype.attributesWithDefaults = void 0;

  CocoModel.prototype.get = function(attribute, withDefault) {
    if (withDefault == null) {
      withDefault = false;
    }
    if (withDefault) {
      if (this.attributesWithDefaults === void 0) {
        this.buildAttributesWithDefaults();
      }
      return this.attributesWithDefaults[attribute];
    } else {
      return CocoModel.__super__.get.call(this, attribute);
    }
  };

  CocoModel.prototype.set = function(attributes, options) {
    var inFlux, res;
    if (attributes !== 'thangs') {
      delete this.attributesWithDefaults;
    }
    inFlux = this.loading || !this.loaded;
    if (!(inFlux || this._revertAttributes || this.project || (options != null ? options.fromMerge : void 0))) {
      this.markToRevert();
    }
    res = CocoModel.__super__.set.call(this, attributes, options);
    if (this.saveBackups && (!inFlux)) {
      this.saveBackup();
    }
    return res;
  };

  CocoModel.prototype.buildAttributesWithDefaults = function() {
    var clone, duration, t0, thisTV4;
    t0 = new Date();
    clone = $.extend(true, {}, this.attributes);
    thisTV4 = tv4.freshApi();
    thisTV4.addSchema('#', this.schema());
    thisTV4.addSchema('metaschema', require('schemas/metaschema'));
    TreemaUtils.populateDefaults(clone, this.schema(), thisTV4);
    this.attributesWithDefaults = clone;
    duration = new Date() - t0;
    if (duration > 10) {
      return console.debug("Populated defaults for " + (this.type()) + (this.attributes.name ? ' ' + this.attributes.name : '') + " in " + duration + "ms");
    }
  };

  CocoModel.prototype.loadFromBackup = function() {
    var existing;
    if (!this.saveBackups) {
      return;
    }
    existing = storage.load(this.backupKey());
    if (existing) {
      this.set(existing, {
        silent: true
      });
      return CocoModel.backedUp[this.backupKey()] = this;
    }
  };

  CocoModel.prototype.saveBackup = function() {
    return this.saveBackupNow();
  };

  CocoModel.prototype.saveBackupNow = function() {
    storage.save(this.backupKey(), this.attributes);
    return CocoModel.backedUp[this.backupKey()] = this;
  };

  CocoModel.backedUp = {};

  CocoModel.prototype.schema = function() {
    return this.constructor.schema;
  };

  CocoModel.prototype.getValidationErrors = function() {
    var definedAttributes, errors;
    definedAttributes = _.pick(this.attributes, function(v) {
      return v !== void 0;
    });
    errors = tv4.validateMultiple(definedAttributes, this.constructor.schema || {}).errors;
    if (errors != null ? errors.length : void 0) {
      return errors;
    }
  };

  CocoModel.prototype.validate = function() {
    var error, errors, i, len;
    errors = this.getValidationErrors();
    if (errors != null ? errors.length : void 0) {
      if (!application.testing) {
        console.debug("Validation failed for " + this.constructor.className + ": '" + (this.get('name') || this) + "'.");
        for (i = 0, len = errors.length; i < len; i++) {
          error = errors[i];
          console.debug("\t", error.dataPath, ':', error.message);
        }
        if (typeof console.trace === "function") {
          console.trace();
        }
      }
      return errors;
    }
  };

  CocoModel.prototype.save = function(attrs, options) {
    var error, originalOptions, ref, ref1, success;
    if (options == null) {
      options = {};
    }
    originalOptions = _.cloneDeep(options);
    if (options.headers == null) {
      options.headers = {};
    }
    options.headers['X-Current-Path'] = (ref = (ref1 = document.location) != null ? ref1.pathname : void 0) != null ? ref : 'unknown';
    success = options.success;
    error = options.error;
    options.success = (function(_this) {
      return function(model, res) {
        _this.retries = 0;
        _this.trigger('save:success', _this);
        if (success) {
          success(_this, res);
        }
        if (_this._revertAttributes) {
          _this.markToRevert();
        }
        _this.clearBackup();
        CocoModel.pollAchievements();
        return options.success = options.error = null;
      };
    })(this);
    options.error = (function(_this) {
      return function(model, res) {
        var error1, error2, errorMessage, f, msg, notyError, ref2;
        if (res.status === 0) {
          if (_this.retries == null) {
            _this.retries = 0;
          }
          _this.retries += 1;
          if (_this.retries > 20) {
            msg = 'Your computer or our servers appear to be offline. Please try refreshing.';
            noty({
              text: msg,
              layout: 'center',
              type: 'error',
              killer: true
            });
            return;
          } else {
            msg = $.i18n.t('loading_error.connection_failure', {
              defaultValue: 'Connection failed.'
            });
            try {
              noty({
                text: msg,
                layout: 'center',
                type: 'error',
                killer: true,
                timeout: 3000
              });
            } catch (error1) {
              notyError = error1;
              console.warn("Couldn't even show noty error for", error, "because", notyError);
            }
            return _.delay((f = function() {
              return _this.save(attrs, originalOptions);
            }), 3000);
          }
        }
        if (error) {
          error(_this, res);
        }
        if (!_this.notyErrors) {
          return;
        }
        errorMessage = "Error saving " + ((ref2 = _this.get('name')) != null ? ref2 : _this.type());
        console.log('going to log an error message');
        console.warn(errorMessage, res.responseJSON);
        if (!(typeof webkit !== "undefined" && webkit !== null ? webkit.messageHandlers : void 0)) {
          try {
            noty({
              text: errorMessage + ": " + res.status + " " + res.statusText + "\n" + res.responseText,
              layout: 'topCenter',
              type: 'error',
              killer: false,
              timeout: 10000
            });
          } catch (error2) {
            notyError = error2;
            console.warn("Couldn't even show noty error for", error, "because", notyError);
          }
        }
        return options.success = options.error = null;
      };
    })(this);
    this.trigger('save', this);
    return CocoModel.__super__.save.call(this, attrs, options);
  };

  CocoModel.prototype.patch = function(options) {
    var attrs, i, key, keys, len, ref;
    if (!this._revertAttributes) {
      return false;
    }
    if (options == null) {
      options = {};
    }
    options.patch = true;
    options.type = 'PUT';
    attrs = {
      _id: this.id
    };
    keys = [];
    ref = _.keys(this.attributes);
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      if (!_.isEqual(this.attributes[key], this._revertAttributes[key])) {
        attrs[key] = this.attributes[key];
        keys.push(key);
      }
    }
    if (!keys.length) {
      return;
    }
    return this.save(attrs, options);
  };

  CocoModel.prototype.fetch = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.data == null) {
      options.data = {};
    }
    if (this.project) {
      options.data.project = this.project.join(',');
    }
    this.jqxhr = CocoModel.__super__.fetch.call(this, options);
    this.loading = true;
    return this.jqxhr;
  };

  CocoModel.prototype.markToRevert = function() {
    var ref, results, smallProp, value;
    if (this.type() === 'ThangType') {
      this._revertAttributes = _.clone(this.attributes);
      ref = this.attributes;
      results = [];
      for (smallProp in ref) {
        value = ref[smallProp];
        if (value && smallProp !== 'raw') {
          results.push(this._revertAttributes[smallProp] = _.cloneDeep(value));
        }
      }
      return results;
    } else {
      return this._revertAttributes = $.extend(true, {}, this.attributes);
    }
  };

  CocoModel.prototype.revert = function() {
    this.clear({
      silent: true
    });
    if (this._revertAttributes) {
      this.set(this._revertAttributes, {
        silent: true
      });
    }
    return this.clearBackup();
  };

  CocoModel.prototype.clearBackup = function() {
    return storage.remove(this.backupKey());
  };

  CocoModel.prototype.hasLocalChanges = function() {
    return this._revertAttributes && !_.isEqual(this.attributes, this._revertAttributes);
  };

  CocoModel.prototype.cloneNewMinorVersion = function() {
    var clone, newData;
    newData = _.clone(this.attributes);
    clone = new this.constructor(newData);
    return clone;
  };

  CocoModel.prototype.cloneNewMajorVersion = function() {
    var clone;
    clone = this.cloneNewMinorVersion();
    clone.unset('version');
    return clone;
  };

  CocoModel.prototype.isPublished = function() {
    var i, len, permission, ref, ref1;
    ref1 = (ref = this.get('permissions', true)) != null ? ref : [];
    for (i = 0, len = ref1.length; i < len; i++) {
      permission = ref1[i];
      if (permission.target === 'public' && permission.access === 'read') {
        return true;
      }
    }
    return false;
  };

  CocoModel.prototype.publish = function() {
    if (this.isPublished()) {
      throw new Error('Can\'t publish what\'s already-published. Can\'t kill what\'s already dead.');
    }
    return this.set('permissions', this.get('permissions', true).concat({
      access: 'read',
      target: 'public'
    }));
  };

  CocoModel.isObjectID = function(s) {
    var ref;
    return s.length === 24 && ((ref = s.match(/[a-f0-9]/gi)) != null ? ref.length : void 0) === 24;
  };

  CocoModel.prototype.hasReadAccess = function(actor) {
    var i, len, permission, ref, ref1, ref2;
    if (actor == null) {
      actor = me;
    }
    if (actor.isAdmin()) {
      return true;
    }
    if (actor.isArtisan() && this.editableByArtisans) {
      return true;
    }
    ref1 = (ref = this.get('permissions', true)) != null ? ref : [];
    for (i = 0, len = ref1.length; i < len; i++) {
      permission = ref1[i];
      if (permission.target === 'public' || actor.get('_id') === permission.target) {
        if ((ref2 = permission.access) === 'owner' || ref2 === 'read') {
          return true;
        }
      }
    }
    return false;
  };

  CocoModel.prototype.hasWriteAccess = function(actor) {
    var i, len, permission, ref, ref1, ref2;
    if (actor == null) {
      actor = me;
    }
    if (actor.isAdmin()) {
      return true;
    }
    if (actor.isArtisan() && this.editableByArtisans) {
      return true;
    }
    ref1 = (ref = this.get('permissions', true)) != null ? ref : [];
    for (i = 0, len = ref1.length; i < len; i++) {
      permission = ref1[i];
      if (permission.target === 'public' || actor.get('_id') === permission.target) {
        if ((ref2 = permission.access) === 'owner' || ref2 === 'write') {
          return true;
        }
      }
    }
    return false;
  };

  CocoModel.prototype.getOwner = function() {
    var ownerPermission;
    ownerPermission = _.find(this.get('permissions', true), {
      access: 'owner'
    });
    return ownerPermission != null ? ownerPermission.target : void 0;
  };

  CocoModel.prototype.getDelta = function() {
    var differ;
    differ = deltasLib.makeJSONDiffer();
    return differ.diff(_.omit(this._revertAttributes, deltasLib.DOC_SKIP_PATHS), _.omit(this.attributes, deltasLib.DOC_SKIP_PATHS));
  };

  CocoModel.prototype.getDeltaWith = function(otherModel) {
    var differ;
    differ = deltasLib.makeJSONDiffer();
    return differ.diff(this.attributes, otherModel.attributes);
  };

  CocoModel.prototype.applyDelta = function(delta) {
    var error, error1, key, newAttributes, value;
    newAttributes = $.extend(true, {}, this.attributes);
    try {
      jsondiffpatch.patch(newAttributes, delta);
    } catch (error1) {
      error = error1;
      if (!application.testing) {
        console.error('Error applying delta\n', JSON.stringify(delta, null, '\t'), '\n\nto attributes\n\n', newAttributes);
      }
      return false;
    }
    for (key in newAttributes) {
      value = newAttributes[key];
      if (_.isEqual(value, this.attributes[key])) {
        delete newAttributes[key];
      }
    }
    this.set(newAttributes);
    return true;
  };

  CocoModel.prototype.getExpandedDelta = function() {
    var delta;
    delta = this.getDelta();
    return deltasLib.expandDelta(delta, this._revertAttributes, this.schema());
  };

  CocoModel.prototype.getExpandedDeltaWith = function(otherModel) {
    var delta;
    delta = this.getDeltaWith(otherModel);
    return deltasLib.expandDelta(delta, this.attributes, this.schema());
  };

  CocoModel.prototype.watch = function(doWatch) {
    if (doWatch == null) {
      doWatch = true;
    }
    $.ajax(this.urlRoot + "/" + this.id + "/watch", {
      type: 'PUT',
      data: {
        on: doWatch
      }
    });
    return this.watching = function() {
      return doWatch;
    };
  };

  CocoModel.prototype.watching = function() {
    var ref;
    return ref = me.id, indexOf.call(this.get('watchers') || [], ref) >= 0;
  };

  CocoModel.prototype.populateI18N = function(data, schema, path) {
    var addedI18N, childSchema, i, index, key, len, numChanged, ref, ref1, sum, value;
    if (path == null) {
      path = '';
    }
    sum = 0;
    if (data == null) {
      data = $.extend(true, {}, this.attributes);
    }
    if (schema == null) {
      schema = this.schema() || {};
    }
    if (schema.oneOf) {
      schema = _.find(schema.oneOf, {
        type: 'object'
      }) || schema;
    }
    addedI18N = false;
    if (((ref = schema.properties) != null ? ref.i18n : void 0) && _.isPlainObject(data) && (data.i18n == null)) {
      data.i18n = {
        '-': {
          '-': '-'
        }
      };
      sum += 1;
      addedI18N = true;
    }
    if (_.isPlainObject(data)) {
      for (key in data) {
        value = data[key];
        numChanged = 0;
        childSchema = (ref1 = schema.properties) != null ? ref1[key] : void 0;
        if (!childSchema && _.isObject(schema.additionalProperties)) {
          childSchema = schema.additionalProperties;
        }
        if (childSchema) {
          numChanged = this.populateI18N(value, childSchema, path + '/' + key);
        }
        if (numChanged && !path) {
          this.set(key, value);
        }
        sum += numChanged;
      }
    }
    if (schema.items && _.isArray(data)) {
      for (index = i = 0, len = data.length; i < len; index = ++i) {
        value = data[index];
        sum += this.populateI18N(value, schema.items, path + '/' + index);
      }
    }
    if (addedI18N && !path) {
      this.set('i18n', data.i18n);
    }
    if (!path) {
      this.updateI18NCoverage();
    }
    return sum;
  };

  CocoModel.getReferencedModel = function(data, schema) {
    var link, linkObject, ref;
    if (schema.links == null) {
      return null;
    }
    linkObject = _.find(schema.links, {
      rel: 'db'
    });
    if (!linkObject) {
      return null;
    }
    if (linkObject.href.match('thang.type') && !this.isObjectID(data)) {
      return null;
    }
    link = linkObject.href;
    link = link.replace('{(original)}', data.original);
    link = link.replace('{(majorVersion)}', '' + ((ref = data.majorVersion) != null ? ref : 0));
    link = link.replace('{($)}', data);
    return this.getOrMakeModelFromLink(link);
  };

  CocoModel.getOrMakeModelFromLink = function(link) {
    var Model, e, error1, makeUrlFunc, model, modelModule, modelUrl, modulePath;
    makeUrlFunc = function(url) {
      return function() {
        return url;
      };
    };
    modelUrl = link.split('/')[2];
    modelModule = _.string.classify(modelUrl);
    modulePath = "models/" + modelModule;
    try {
      Model = require(modulePath);
    } catch (error1) {
      e = error1;
      console.error('could not load model from link path', link, 'using path', modulePath);
      return;
    }
    model = new Model();
    model.url = makeUrlFunc(link);
    return model;
  };

  CocoModel.prototype.setURL = function(url) {
    var makeURLFunc;
    makeURLFunc = function(u) {
      return function() {
        return u;
      };
    };
    this.url = makeURLFunc(url);
    return this;
  };

  CocoModel.prototype.getURL = function() {
    if (_.isString(this.url)) {
      return this.url;
    } else {
      return this.url();
    }
  };

  CocoModel.prototype.makePatch = function() {
    var Patch, target;
    Patch = require('models/Patch');
    target = {
      'collection': _.string.underscored(this.constructor.className),
      'id': this.id
    };
    if (this.get('original')) {
      target.original = this.get('original');
      target.version = this.get('version');
    }
    return new Patch({
      delta: this.getDelta(),
      target: target
    });
  };

  CocoModel.pollAchievements = function() {
    var CocoCollection, EarnedAchievement, NewAchievementCollection, achievements;
    if (application.testing) {
      return;
    }
    CocoCollection = require('collections/CocoCollection');
    EarnedAchievement = require('models/EarnedAchievement');
    NewAchievementCollection = (function(superClass1) {
      extend(NewAchievementCollection, superClass1);

      function NewAchievementCollection() {
        return NewAchievementCollection.__super__.constructor.apply(this, arguments);
      }

      NewAchievementCollection.prototype.model = EarnedAchievement;

      NewAchievementCollection.prototype.initialize = function(me) {
        if (me == null) {
          me = require('core/auth').me;
        }
        return this.url = "/db/user/" + me.id + "/achievements?notified=false";
      };

      return NewAchievementCollection;

    })(CocoCollection);
    achievements = new NewAchievementCollection;
    return achievements.fetch({
      success: function(collection) {
        if (!_.isEmpty(collection.models)) {
          return me.fetch({
            cache: false,
            success: function() {
              return Backbone.Mediator.publish('achievements:new', {
                earnedAchievements: collection
              });
            }
          });
        }
      },
      error: function() {
        return console.error('Miserably failed to fetch unnotified achievements', arguments);
      },
      cache: false
    });
  };

  CocoModel.pollAchievements = _.debounce(CocoModel.pollAchievements, 500);

  CocoModel.prototype.updateI18NCoverage = function() {
    var langCodeArrays, overallCoverage, pathToData;
    langCodeArrays = [];
    pathToData = {};
    TreemaUtils.walk(this.attributes, this.schema(), null, function(path, data, workingSchema) {
      var coverage, i18n, parentData, parentPath, prop, props;
      if (data != null ? data.i18n : void 0) {
        pathToData[path] = data;
      }
      if (_.string.endsWith(path, 'i18n')) {
        i18n = data;
        parentPath = path.slice(0, -5);
        parentData = pathToData[parentPath];
        props = workingSchema.props || [];
        props = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = props.length; i < len; i++) {
            prop = props[i];
            if (parentData[prop]) {
              results.push(prop);
            }
          }
          return results;
        })();
        if (!props.length) {
          return;
        }
        if ('additionalProperties' in i18n) {
          return;
        }
        coverage = _.filter(_.keys(i18n), function(langCode) {
          var translations;
          translations = i18n[langCode];
          return translations && _.all((function() {
            var i, len, results;
            results = [];
            for (i = 0, len = props.length; i < len; i++) {
              prop = props[i];
              results.push(translations[prop]);
            }
            return results;
          })());
        });
        return langCodeArrays.push(coverage);
      }
    });
    if (!langCodeArrays.length) {
      return;
    }
    overallCoverage = _.intersection.apply(_, langCodeArrays);
    return this.set('i18nCoverage', overallCoverage);
  };

  CocoModel.prototype.saveNewMinorVersion = function(attrs, options) {
    if (options == null) {
      options = {};
    }
    options.url = this.url() + '/new-version';
    options.type = 'POST';
    return this.save(attrs, options);
  };

  CocoModel.prototype.saveNewMajorVersion = function(attrs, options) {
    if (options == null) {
      options = {};
    }
    attrs = attrs || _.omit(this.attributes, 'version');
    options.url = this.url() + '/new-version';
    options.type = 'POST';
    options.patch = true;
    return this.save(attrs, options);
  };

  CocoModel.prototype.fetchPatchesWithStatus = function(status, options) {
    var Patches, patches;
    if (status == null) {
      status = 'pending';
    }
    if (options == null) {
      options = {};
    }
    Patches = require('../collections/Patches');
    patches = new Patches();
    if (options.data == null) {
      options.data = {};
    }
    options.data.status = status;
    options.url = this.urlRoot + '/' + (this.get('original') || this.id) + '/patches';
    patches.fetch(options);
    return patches;
  };

  CocoModel.prototype.stringify = function() {
    return JSON.stringify(this.toJSON());
  };

  CocoModel.prototype.wait = function(event) {
    return new Promise((function(_this) {
      return function(resolve) {
        return _this.once(event, resolve);
      };
    })(this));
  };

  CocoModel.prototype.fetchLatestVersion = function(original, options) {
    if (options == null) {
      options = {};
    }
    options.url = _.result(this, 'urlRoot') + '/' + original + '/version';
    return this.fetch(options);
  };

  return CocoModel;

})(Backbone.Model);

module.exports = CocoModel;
});

;
//# sourceMappingURL=/javascripts/app/models/CocoModel.js.map