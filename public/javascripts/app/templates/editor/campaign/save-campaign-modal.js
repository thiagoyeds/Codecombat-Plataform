require.register("templates/editor/campaign/save-campaign-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Save Changes to Campaign</h3></div><div class=\"modal-body\">");
if ( !view.modelsToSave.models.length)
{
buf.push("<div data-i18n=\"delta.no_changes\" class=\"alert alert-info\">No changes</div>");
}
// iterate view.modelsToSave.models
;(function(){
  var $$obj = view.modelsToSave.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var model = $$obj[$index];

buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><span class=\"panel-title spr\">" + (jade.escape(null == (jade.interp = model.get('name')) ? "" : jade.interp)) + "</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = model.constructor.className) ? "" : jade.interp)) + "</span></div><div class=\"panel-body\"><div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('delta-view')] }, {"data-model-id":true})) + "></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var model = $$obj[$index];

buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><span class=\"panel-title spr\">" + (jade.escape(null == (jade.interp = model.get('name')) ? "" : jade.interp)) + "</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = model.constructor.className) ? "" : jade.interp)) + "</span></div><div class=\"panel-body\"><div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('delta-view')] }, {"data-model-id":true})) + "></div></div></div>");
    }

  }
}).call(this);

buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button data-i18n=\"common.save\" id=\"save-button\" class=\"btn btn-primary\">Save</button></div></div></div></div>");;return buf.join("");
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

;
//# sourceMappingURL=/javascripts/app/templates/editor/campaign/save-campaign-modal.js.map