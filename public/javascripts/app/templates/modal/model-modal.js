require.register("templates/modal/model-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-body\">");
// iterate view.models
;(function(){
  var $$obj = view.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var model = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('model-container')] }, {"data-model-id":true})) + "><h3>" + (jade.escape(null == (jade.interp = model.type() + ': ' + model.id) ? "" : jade.interp)) + "</h3><div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('model-treema')] }, {"data-model-id":true})) + "></div><btn data-i18n=\"common.save\" class=\"btn btn-success save-model\">Save</btn></div><hr/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var model = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('model-container')] }, {"data-model-id":true})) + "><h3>" + (jade.escape(null == (jade.interp = model.type() + ': ' + model.id) ? "" : jade.interp)) + "</h3><div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('model-treema')] }, {"data-model-id":true})) + "></div><btn data-i18n=\"common.save\" class=\"btn btn-success save-model\">Save</btn></div><hr/>");
    }

  }
}).call(this);

buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.okay\" class=\"btn btn-primary\">Okay</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/modal/model-modal.js.map