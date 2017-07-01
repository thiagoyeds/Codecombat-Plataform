require.register("views/DemoView", function(exports, require, module) {
var DEMO_REQUIRE_PREFIX, DEMO_URL_PREFIX, DemoView, ModalView, RootView, requireUtils, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

ModalView = require('views/core/ModalView');

template = require('templates/demo');

requireUtils = require('lib/requireUtils');

DEMO_REQUIRE_PREFIX = 'test/demo/';

DEMO_URL_PREFIX = '/demo/';

require('vendor/jasmine-bundle');

require('demo-app');


/*
  What are demo files?

  They could be a function which returns an element to insert into the demo page.
  But what about demoing achievements? They'll get put into the main html. Or modals.
  Well, I was thinking that a single folder would show all demos at the same time, line them up.
  But it'd be confusing to have a whole bunch of achievement demos show up all at the same time?
  Maybe there could be a button to show all the demos. Hmm, that'd be cool.
  It could work like Jasmine, where it modifies the path and so when you select to run them, they all run with page reloads.
  I think for now, I'll just say: have it be a function which we can run anytime.
  It may or may not return an element to be inserted into the main area.

  Another idea. Do we want root views to just take over the full view?
  Or should they just go into the central part?
  Probably should take over the full view, and if you want to get out of the demo, you navigate back.
 */

module.exports = DemoView = DemoView = (function(superClass) {
  extend(DemoView, superClass);

  DemoView.prototype.id = 'demo-view';

  DemoView.prototype.template = template;

  function DemoView(options, subPath) {
    this.subPath = subPath != null ? subPath : '';
    DemoView.__super__.constructor.call(this, options);
    if (this.subPath[0] === '/') {
      this.subPath = this.subPath.slice(1);
    }
    this.initDemoFiles();
    this.children = requireUtils.parseImmediateChildren(this.demoFiles, this.subPath, DEMO_REQUIRE_PREFIX, DEMO_URL_PREFIX);
  }

  DemoView.prototype.getRenderData = function() {
    var c, parts;
    c = DemoView.__super__.getRenderData.apply(this, arguments);
    c.parentFolders = requireUtils.getParentFolders(this.subPath, DEMO_URL_PREFIX);
    c.children = this.children || [];
    parts = this.subPath.split('/');
    c.currentFolder = parts[parts.length - 1] || parts[parts.length - 2] || 'All';
    return c;
  };

  DemoView.prototype.afterInsert = function() {
    DemoView.__super__.afterInsert.call(this);
    return this.runDemo();
  };

  DemoView.prototype.initDemoFiles = function() {
    var f, prefix;
    this.demoFiles = this.getAllDemoFiles();
    if (this.subPath) {
      prefix = DEMO_REQUIRE_PREFIX + this.subPath;
      return this.demoFiles = (function() {
        var i, len, ref, results;
        ref = this.demoFiles;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          f = ref[i];
          if (_.string.startsWith(f, prefix)) {
            results.push(f);
          }
        }
        return results;
      }).call(this);
    }
  };

  DemoView.prototype.runDemo = function() {
    var demoFunc, requirePath, view;
    if (!(this.subPath && _.last(this.subPath.split('/')).indexOf('.demo') > -1)) {
      return;
    }
    requirePath = DEMO_REQUIRE_PREFIX + this.subPath;
    demoFunc = require(requirePath);
    if (!_.isFunction(demoFunc)) {
      console.error("Demo files must export a function. " + requirePath + " does not.");
      return;
    }
    jasmine.Ajax.install();
    view = demoFunc();
    if (!view) {
      return;
    }
    this.ranDemo = true;
    if (view instanceof ModalView) {
      this.openModalView(view);
    } else {
      this.$el.find('#demo-area').empty().append(view.$el);
    }
    view.afterInsert();
    return window.currentDemoView = view;
  };

  DemoView.prototype.getAllDemoFiles = function() {
    var allFiles, f, i, len, results;
    allFiles = window.require.list();
    results = [];
    for (i = 0, len = allFiles.length; i < len; i++) {
      f = allFiles[i];
      if (f.indexOf('.demo') > -1) {
        results.push(f);
      }
    }
    return results;
  };

  DemoView.prototype.destroy = function() {
    if (this.ranDemo) {
      return document.location.reload();
    }
  };

  return DemoView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/DemoView.js.map