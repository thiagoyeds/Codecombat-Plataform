require.register("templates/test-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),parentFolders = locals_.parentFolders,currentFolder = locals_.currentFolder,view = locals_.view,children = locals_.children;buf.push("<div id=\"demo-area\"></div><h2 id=\"test-h2\">Testing Page</h2><ol class=\"breadcrumb\">");
// iterate parentFolders
;(function(){
  var $$obj = parentFolders;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var path = $$obj[$index];

buf.push("<li><a" + (jade.attrs({ 'href':(path.url) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = path.name) ? "" : jade.interp)) + "</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var path = $$obj[$index];

buf.push("<li><a" + (jade.attrs({ 'href':(path.url) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = path.name) ? "" : jade.interp)) + "</a></li>");
    }

  }
}).call(this);

buf.push("<li class=\"active\">" + (jade.escape(null == (jade.interp = currentFolder) ? "" : jade.interp)) + "</li></ol><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-md-8\"><div id=\"failure-reports\">");
// iterate view.failureReports
;(function(){
  var $$obj = view.failureReports;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var report = $$obj[$index];

buf.push("<div class=\"alert alert-danger alert-report\"><ul class=\"suite-list\">");
// iterate report.suiteDescriptions
;(function(){
  var $$obj = report.suiteDescriptions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var description = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var description = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</li>");
    }

  }
}).call(this);

buf.push("<li><strong>... " + (jade.escape((jade.interp = report.testDescription) == null ? '' : jade.interp)) + "</strong></li></ul><hr/><ol class=\"error-list\">");
// iterate report.failMessages
;(function(){
  var $$obj = report.failMessages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var message = $$obj[$index];

buf.push("<li><strong>" + (jade.escape(null == (jade.interp = message) ? "" : jade.interp)) + "</strong></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var message = $$obj[$index];

buf.push("<li><strong>" + (jade.escape(null == (jade.interp = message) ? "" : jade.interp)) + "</strong></li>");
    }

  }
}).call(this);

buf.push("</ol></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var report = $$obj[$index];

buf.push("<div class=\"alert alert-danger alert-report\"><ul class=\"suite-list\">");
// iterate report.suiteDescriptions
;(function(){
  var $$obj = report.suiteDescriptions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var description = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var description = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</li>");
    }

  }
}).call(this);

buf.push("<li><strong>... " + (jade.escape((jade.interp = report.testDescription) == null ? '' : jade.interp)) + "</strong></li></ul><hr/><ol class=\"error-list\">");
// iterate report.failMessages
;(function(){
  var $$obj = report.failMessages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var message = $$obj[$index];

buf.push("<li><strong>" + (jade.escape(null == (jade.interp = message) ? "" : jade.interp)) + "</strong></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var message = $$obj[$index];

buf.push("<li><strong>" + (jade.escape(null == (jade.interp = message) ? "" : jade.interp)) + "</strong></li>");
    }

  }
}).call(this);

buf.push("</ol></div>");
    }

  }
}).call(this);

buf.push("</div><div id=\"test-wrapper\" class=\"well\"><div id=\"testing-area\"></div></div></div><div class=\"col-md-4 hidden-sm hidden-xs\"><div id=\"test-nav\" class=\"nav nav-pills nav-stacked well\">");
if ( view.demosOn)
{
buf.push("<button id=\"hide-demos-btn\" class=\"btn btn-danger btn-block\">Hide Demos</button>");
}
else
{
buf.push("<button id=\"show-demos-btn\" class=\"btn btn-info btn-block\">Show Demos</button>");
}
buf.push("<hr/>");
// iterate children
;(function(){
  var $$obj = children;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var child = $$obj[$index];

buf.push("<li" + (jade.attrs({ "class": [(child.type)] }, {"class":true})) + "><a" + (jade.attrs({ 'href':(child.url), "class": [('small')] }, {"href":true})) + ">");
if ( child.type == 'folder')
{
buf.push("<span class=\"glyphicon glyphicon-folder-close\"></span>");
}
else
{
buf.push("<span class=\"glyphicon glyphicon-file\"></span>");
}
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = child.name) ? "" : jade.interp)) + "</span>");
if ( child.type == 'folder')
{
buf.push("<strong>(" + (jade.escape((jade.interp = child.size) == null ? '' : jade.interp)) + ")</strong>");
}
buf.push("</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var child = $$obj[$index];

buf.push("<li" + (jade.attrs({ "class": [(child.type)] }, {"class":true})) + "><a" + (jade.attrs({ 'href':(child.url), "class": [('small')] }, {"href":true})) + ">");
if ( child.type == 'folder')
{
buf.push("<span class=\"glyphicon glyphicon-folder-close\"></span>");
}
else
{
buf.push("<span class=\"glyphicon glyphicon-file\"></span>");
}
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = child.name) ? "" : jade.interp)) + "</span>");
if ( child.type == 'folder')
{
buf.push("<strong>(" + (jade.escape((jade.interp = child.size) == null ? '' : jade.interp)) + ")</strong>");
}
buf.push("</a></li>");
    }

  }
}).call(this);

buf.push("</div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/TestView", function(exports, require, module) {
var RootView, TEST_REQUIRE_PREFIX, TEST_URL_PREFIX, TestView, requireUtils, storage, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/test-view');

requireUtils = require('lib/requireUtils');

storage = require('core/storage');

require('vendor/jasmine-bundle');

require('tests');

TEST_REQUIRE_PREFIX = 'test/app/';

TEST_URL_PREFIX = '/test/';

module.exports = TestView = TestView = (function(superClass) {
  extend(TestView, superClass);

  function TestView() {
    return TestView.__super__.constructor.apply(this, arguments);
  }

  TestView.prototype.id = 'test-view';

  TestView.prototype.template = template;

  TestView.prototype.reloadOnClose = true;

  TestView.prototype.className = 'style-flat';

  TestView.prototype.events = {
    'click #show-demos-btn': 'onClickShowDemosButton',
    'click #hide-demos-btn': 'onClickHideDemosButton'
  };

  TestView.prototype.initialize = function(options, subPath) {
    this.subPath = subPath != null ? subPath : '';
    if (this.subPath[0] === '/') {
      this.subPath = this.subPath.slice(1);
    }
    this.demosOn = storage.load('demos-on');
    this.failureReports = [];
    return this.loadedFileIDs = [];
  };

  TestView.prototype.afterInsert = function() {
    this.initSpecFiles();
    this.render();
    TestView.runTests(this.specFiles, this.demosOn, this);
    return window.runJasmine();
  };

  TestView.prototype.onClickShowDemosButton = function() {
    storage.save('demos-on', true);
    return document.location.reload();
  };

  TestView.prototype.onClickHideDemosButton = function() {
    storage.remove('demos-on');
    return document.location.reload();
  };

  TestView.prototype.getRenderData = function() {
    var c, parts;
    c = TestView.__super__.getRenderData.apply(this, arguments);
    c.parentFolders = requireUtils.getParentFolders(this.subPath, TEST_URL_PREFIX);
    c.children = requireUtils.parseImmediateChildren(this.specFiles, this.subPath, TEST_REQUIRE_PREFIX, TEST_URL_PREFIX);
    parts = this.subPath.split('/');
    c.currentFolder = parts[parts.length - 1] || parts[parts.length - 2] || 'All';
    return c;
  };

  TestView.prototype.initSpecFiles = function() {
    var f, prefix;
    this.specFiles = TestView.getAllSpecFiles();
    if (this.subPath) {
      prefix = TEST_REQUIRE_PREFIX + this.subPath;
      return this.specFiles = (function() {
        var i, len, ref, results;
        ref = this.specFiles;
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

  TestView.runTests = function(specFiles, demosOn, view) {
    var f, i, len, results;
    if (demosOn == null) {
      demosOn = false;
    }
    jasmine.getEnv().addReporter({
      suiteStack: [],
      specDone: function(result) {
        var fe, report;
        if (result.status === 'failed') {
          report = {
            suiteDescriptions: _.clone(this.suiteStack),
            failMessages: (function() {
              var i, len, ref, results;
              ref = result.failedExpectations;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                fe = ref[i];
                results.push(fe.message);
              }
              return results;
            })(),
            testDescription: result.description
          };
          if (view != null) {
            view.failureReports.push(report);
          }
          return view != null ? view.renderSelectors('#failure-reports') : void 0;
        }
      },
      suiteStarted: function(result) {
        return this.suiteStack.push(result.description);
      },
      suiteDone: function(result) {
        return this.suiteStack.pop();
      }
    });
    application.testing = true;
    if (specFiles == null) {
      specFiles = this.getAllSpecFiles();
    }
    if (demosOn) {
      jasmine.demoEl = _.once(function($el) {
        return $('#demo-area').append($el);
      });
      jasmine.demoModal = _.once(function(modal) {
        return currentView.openModalView(modal);
      });
    } else {
      jasmine.demoEl = _.noop;
      jasmine.demoModal = _.noop;
    }
    jasmine.Ajax.install();
    beforeEach(function() {
      me.clear();
      jasmine.Ajax.requests.reset();
      Backbone.Mediator.init();
      Backbone.Mediator.setValidationEnabled(false);
      spyOn(application.tracker, 'trackEvent');
      return application.timeoutsToClear = [];
    });
    afterEach(function() {
      var ref;
      return (ref = application.timeoutsToClear) != null ? ref.forEach(function(timeoutID) {
        return clearTimeout(timeoutID);
      }) : void 0;
    });
    results = [];
    for (i = 0, len = specFiles.length; i < len; i++) {
      f = specFiles[i];
      results.push(require(f));
    }
    return results;
  };

  TestView.getAllSpecFiles = function() {
    var allFiles, f, i, len, results;
    allFiles = window.require.list();
    results = [];
    for (i = 0, len = allFiles.length; i < len; i++) {
      f = allFiles[i];
      if (f.indexOf('.spec') > -1) {
        results.push(f);
      }
    }
    return results;
  };

  TestView.prototype.destroy = function() {
    return document.location.reload();
  };

  return TestView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/TestView.js.map