require.register("views/admin/CLAsView", function(exports, require, module) {
var CLACollection, CLASubmission, CLAsView, CocoCollection, CocoModel, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/admin/clas');

CocoCollection = require('collections/CocoCollection');

CocoModel = require('models/CocoModel');

CLASubmission = (function(superClass) {
  extend(CLASubmission, superClass);

  function CLASubmission() {
    return CLASubmission.__super__.constructor.apply(this, arguments);
  }

  CLASubmission.className = 'CLA';

  CLASubmission.schema = require('schemas/models/cla_submission');

  CLASubmission.prototype.urlRoot = '/db/cla.submission';

  return CLASubmission;

})(CocoModel);

CLACollection = (function(superClass) {
  extend(CLACollection, superClass);

  function CLACollection() {
    return CLACollection.__super__.constructor.apply(this, arguments);
  }

  CLACollection.prototype.url = '/db/cla.submissions';

  CLACollection.prototype.model = CLASubmission;

  CLACollection.prototype.comparator = function(claSubmission) {
    return (claSubmission.get('githubUsername') || 'zzzzz').toLowerCase();
  };

  return CLACollection;

})(CocoCollection);

module.exports = CLAsView = (function(superClass) {
  extend(CLAsView, superClass);

  CLAsView.prototype.id = 'admin-clas-view';

  CLAsView.prototype.template = template;

  function CLAsView(options) {
    CLAsView.__super__.constructor.call(this, options);
    this.clas = this.supermodel.loadCollection(new CLACollection(), 'clas', {
      cache: false
    }).model;
  }

  return CLAsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/CLAsView.js.map