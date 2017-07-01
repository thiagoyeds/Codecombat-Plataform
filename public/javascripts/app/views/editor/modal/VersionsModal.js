require.register("templates/editor/modal/versions-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,dataList = locals_.dataList,page = locals_.page,moment = locals_.moment;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( dataList)
{
buf.push("<h3><span data-i18n=\"general.version_history_for\">Version History for:</span>\"" + (jade.escape((jade.interp = dataList[0].name) == null ? '' : jade.interp)) + "\"</h3><p data-i18n=\"general.select_changes\">Select two changes below to see the difference.</p>");
}
buf.push("<div class=\"delta-container\"><div class=\"delta-view\"></div></div></div><div class=\"modal-body\">");
if ( dataList)
{
buf.push("<table class=\"table table-condensed\"><tr><th></th><th></th><th></th><th></th><th data-i18n=\"general.commit_msg\">Commit Message</th></tr>");
// iterate dataList
;(function(){
  var $$obj = dataList;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var data = $$obj[$index];

buf.push("<tr><td><input" + (jade.attrs({ 'type':("checkbox"), 'value':(data._id), "class": [('select')] }, {"type":true,"value":true})) + "/></td><td><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = data.version.minor) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = moment(data.created).format('l')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = data.creator) ? "" : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.commitMessage) == null ? '' : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var data = $$obj[$index];

buf.push("<tr><td><input" + (jade.attrs({ 'type':("checkbox"), 'value':(data._id), "class": [('select')] }, {"type":true,"value":true})) + "/></td><td><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = data.version.minor) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = moment(data.created).format('l')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = data.creator) ? "" : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.commitMessage) == null ? '' : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div></div>");;return buf.join("");
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

;require.register("views/editor/modal/VersionsModal", function(exports, require, module) {
var CocoCollection, DeltaView, ModalView, PatchModal, VersionsModal, VersionsViewCollection, deltasLib, nameLoader, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/modal/versions-modal');

DeltaView = require('views/editor/DeltaView');

PatchModal = require('views/editor/PatchModal');

nameLoader = require('core/NameLoader');

CocoCollection = require('collections/CocoCollection');

deltasLib = require('core/deltas');

VersionsViewCollection = (function(superClass) {
  extend(VersionsViewCollection, superClass);

  function VersionsViewCollection() {
    return VersionsViewCollection.__super__.constructor.apply(this, arguments);
  }

  VersionsViewCollection.prototype.url = '';

  VersionsViewCollection.prototype.model = null;

  VersionsViewCollection.prototype.initialize = function(url, levelID, model) {
    this.url = url;
    this.levelID = levelID;
    this.model = model;
    VersionsViewCollection.__super__.initialize.call(this);
    return this.url = this.url + this.levelID + '/versions';
  };

  return VersionsViewCollection;

})(CocoCollection);

module.exports = VersionsModal = (function(superClass) {
  extend(VersionsModal, superClass);

  VersionsModal.prototype.template = template;

  VersionsModal.prototype.plain = true;

  VersionsModal.prototype.modalWidthPercent = 80;

  VersionsModal.prototype.id = '';

  VersionsModal.prototype.url = '';

  VersionsModal.prototype.page = '';

  VersionsModal.prototype.events = {
    'change input.select': 'onSelectionChanged'
  };

  function VersionsModal(options, ID, model) {
    this.ID = ID;
    this.model = model;
    VersionsModal.__super__.constructor.call(this, options);
    this.original = new this.model({
      _id: this.ID
    });
    this.original = this.supermodel.loadModel(this.original).model;
    this.listenToOnce(this.original, 'sync', this.onViewSync);
  }

  VersionsModal.prototype.onViewSync = function() {
    this.versions = new VersionsViewCollection(this.url, this.original.attributes.original, this.model);
    this.versions = this.supermodel.loadCollection(this.versions, 'versions').model;
    return this.listenTo(this.versions, 'sync', this.onVersionsFetched);
  };

  VersionsModal.prototype.onVersionsFetched = function() {
    var ids, jqxhrOptions, p;
    ids = (function() {
      var i, len, ref, results;
      ref = this.versions.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        results.push(p.get('creator'));
      }
      return results;
    }).call(this);
    jqxhrOptions = nameLoader.loadNames(ids);
    if (jqxhrOptions) {
      return this.supermodel.addRequestResource('user_names', jqxhrOptions).load();
    }
  };

  VersionsModal.prototype.onSelectionChanged = function() {
    var deltaEl, earlierVersion, laterVersion, rows;
    rows = this.$el.find('input.select:checked');
    deltaEl = this.$el.find('.delta-view');
    if (this.deltaView) {
      this.removeSubView(this.deltaView);
    }
    this.deltaView = null;
    if (rows.length !== 2) {
      return;
    }
    laterVersion = new this.model({
      _id: $(rows[0]).val()
    });
    earlierVersion = new this.model({
      _id: $(rows[1]).val()
    });
    this.deltaView = new DeltaView({
      model: earlierVersion,
      comparisonModel: laterVersion,
      skipPaths: deltasLib.DOC_SKIP_PATHS,
      loadModels: true
    });
    return this.insertSubView(this.deltaView, deltaEl);
  };

  VersionsModal.prototype.getRenderData = function(context) {
    var i, len, m, ref, version;
    if (context == null) {
      context = {};
    }
    context = VersionsModal.__super__.getRenderData.call(this, context);
    context.page = this.page;
    if (this.versions) {
      context.dataList = (function() {
        var i, len, ref, results;
        ref = this.versions.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          m = ref[i];
          results.push(m.attributes);
        }
        return results;
      }).call(this);
      ref = context.dataList;
      for (i = 0, len = ref.length; i < len; i++) {
        version = ref[i];
        version.creator = nameLoader.getName(version.creator);
      }
    }
    return context;
  };

  return VersionsModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/modal/VersionsModal.js.map