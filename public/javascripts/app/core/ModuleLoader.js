require.register("core/ModuleLoader", function(exports, require, module) {
var CocoClass, LOG, ModuleLoader, locale,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

locale = require('locale/locale');

LOG = false;

module.exports = ModuleLoader = ModuleLoader = (function(superClass) {
  extend(ModuleLoader, superClass);

  ModuleLoader.WADS = ['lib', 'views/play', 'views/editor', 'views/courses'];

  function ModuleLoader() {
    this.onFileLoad = bind(this.onFileLoad, this);
    var f, i, len, ref, wrapped;
    ModuleLoader.__super__.constructor.call(this);
    this.loaded = {};
    ref = window.require.list();
    for (i = 0, len = ref.length; i < len; i++) {
      f = ref[i];
      this.loaded[f] = true;
    }
    locale.update();
    this.queue = new createjs.LoadQueue();
    this.queue.on('fileload', this.onFileLoad, this);
    this.queue.setMaxConnections(5);
    wrapped = _.wrap(window.require, function(func, name, loaderPath) {
      if (_.string.startsWith(name, 'vendor/')) {
        return {};
      }
      if (name === 'esper') {
        return window.esper;
      }
      if (name === 'aether') {
        return window.Aether;
      }
      if (name === 'game-libraries') {
        return {};
      }
      if (name === 'ace') {
        return window.ace;
      }
      if (name === 'tests') {
        return {};
      }
      if (name === 'demo-app') {
        return {};
      }
      if (name === 'lib/auth') {
        name = 'core/auth';
      }
      return func(name, loaderPath);
    });
    _.extend(wrapped, window.require);
    window.require = wrapped;
    this.updateProgress = _.throttle(_.bind(this.updateProgress, this), 700);
    this.lastShownProgress = 0;
  }

  ModuleLoader.prototype.load = function(path, first, why) {
    var e, error, indirecteval, originalPath, uri, wad;
    if (first == null) {
      first = true;
    }
    $('#module-load-progress').css('opacity', 1);
    if (first) {
      this.recentPaths = [];
      this.recentLoadedBytes = 0;
    }
    originalPath = path;
    wad = _.find(ModuleLoader.WADS, function(wad) {
      return _.string.startsWith(path, wad);
    });
    if (wad) {
      path = wad;
    }
    if (this.loaded[path]) {
      return false;
    }
    if (wad) {
      if (LOG) {
        console.log("Loading", wad, " for ", originalPath);
      }
    }
    this.loaded[path] = true;
    this.recentPaths.push(path);
    uri = "/javascripts/app/" + path + ".js";
    if (path === "aether" || path === "game-libraries") {
      uri = "/javascripts/" + path + ".js";
    } else if (path === "ace") {
      uri = "/lib/ace/ace.js";
    } else if (path === "esper") {
      try {
        indirecteval = eval;
        indirecteval("'use strict'; let test = WeakMap && (class Test { *gen(a=7) { yield yield * () => true ; } });");
        console.log("Modern javascript detected, aw yeah!");
        uri = "/javascripts/esper.modern.js";
      } catch (error) {
        e = error;
        console.log("Legacy javascript detected, falling back...", e.message);
        uri = "/javascripts/esper.js";
      }
    }
    if (LOG) {
      console.debug('Loading js file:', uri, "because", why);
    }
    this.queue.loadFile({
      id: path,
      src: "/" + window.serverConfig.buildInfo.sha + uri,
      type: createjs.LoadQueue.JAVASCRIPT
    });
    return true;
  };

  ModuleLoader.prototype.loadLanguage = function(langCode) {
    var firstBit, loading;
    if (langCode == null) {
      langCode = 'en-US';
    }
    loading = this.load("locale/" + langCode);
    firstBit = langCode.slice(0, 2);
    if (firstBit === langCode) {
      return loading;
    }
    if (locale[firstBit] == null) {
      return loading;
    }
    return this.load("locale/" + firstBit, false) || loading;
  };

  ModuleLoader.prototype.onFileLoad = function(e) {
    var dependencies, have, haveWithIndexRemoved, i, len, missing, module, treemaExt;
    if (!/(^vendor)|game-libraries$|aether$|esper$/.test(e.item.id)) {
      have = window.require.list();
      haveWithIndexRemoved = _(have).filter(function(file) {
        return _.string.endsWith(file, 'index');
      }).map(function(file) {
        return file.slice(0, -6);
      }).value();
      have = have.concat(haveWithIndexRemoved);
      if (LOG) {
        console.group('Dependencies', e.item.id);
      }
      this.recentLoadedBytes += e.rawResult.length;
      dependencies = this.parseDependencies(e.rawResult);
      if (LOG) {
        console.groupEnd();
      }
      missing = _.difference(dependencies, have);
      for (i = 0, len = missing.length; i < len; i++) {
        module = missing[i];
        this.load(module, false, "missing module of " + e.item.id);
      }
    }
    if (e.item.id === 'ace') {
      window.ace.config.set('basePath', '/lib/ace');
    }
    if (_.string.startsWith(e.item.id, 'locale')) {
      locale.update();
    }
    $(e.result).remove();
    if (e.item.id === 'vendor/treema') {
      treemaExt = require('core/treema-ext');
      treemaExt.setup();
    }
    if (this.queue.progress === 1) {
      this.recentPaths.sort();
      this.trigger('load-complete');
    }
    this.trigger('loaded', e.item);
    return this.updateProgress();
  };

  ModuleLoader.prototype.updateProgress = function() {
    if (this.queue.progress < this.lastShownProgress) {
      return;
    }
    $('#module-load-progress .progress-bar').css('width', (100 * this.queue.progress) + '%');
    if (this.queue.progress === 1) {
      return $('#module-load-progress').css('opacity', 0);
    }
  };

  ModuleLoader.prototype.parseDependencies = function(raw) {
    var bit, bits, dep, dependencies, i, len, root, rootFolder;
    bits = raw.match(/(require\(['"](.+?)['"])|(register\(['"].+?['"])/g) || [];
    rootFolder = null;
    dependencies = [];
    for (i = 0, len = bits.length; i < len; i++) {
      bit = bits[i];
      if (_.string.startsWith(bit, 'register')) {
        root = bit.slice(10, bit.length - 1);
        if (LOG) {
          if (rootFolder) {
            console.groupEnd();
          }
        }
        rootFolder = (root.match('.+/')[0] || '').slice(0, -1);
        if (LOG) {
          console.group('register', rootFolder, "(" + bit + ")");
        }
      } else {
        dep = bit.slice(9, bit.length - 1);
        if (dep[0] === '/') {
          dep = dep.slice(1);
        }
        dep = this.expand(rootFolder, dep);
        if (dep === 'memwatch') {
          continue;
        }
        if (_.string.startsWith(dep, 'ace/')) {
          continue;
        }
        dependencies.push(dep);
        if (LOG) {
          console.debug(dep);
        }
      }
    }
    if (LOG) {
      console.groupEnd();
    }
    return dependencies;
  };

  ModuleLoader.prototype.expand = function(root, name) {
    var i, len, part, parts, results;
    results = [];
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (i = 0, len = parts.length; i < len; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  return ModuleLoader;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/core/ModuleLoader.js.map