require.register("templates/modal/revert-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,models = locals_.models;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.revert_models\">Revert Models</h3></div><div class=\"modal-body\"><table id=\"changed-models\" class=\"table table-striped\">");
// iterate models
;(function(){
  var $$obj = models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var model = $$obj[$index];

buf.push("<tr><td>" + (jade.escape((jade.interp = model.type()) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = model.get('name')) == null ? '' : jade.interp)) + "</td><td><button" + (jade.attrs({ 'value':(model.id), 'data-i18n':("editor.revert") }, {"value":true,"data-i18n":true})) + ">Revert</button></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var model = $$obj[$index];

buf.push("<tr><td>" + (jade.escape((jade.interp = model.type()) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = model.get('name')) == null ? '' : jade.interp)) + "</td><td><button" + (jade.attrs({ 'value':(model.id), 'data-i18n':("editor.revert") }, {"value":true,"data-i18n":true})) + ">Revert</button></td></tr>");
    }

  }
}).call(this);

buf.push("</table></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.okay\" class=\"btn btn-primary\">Okay</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/modal/revert-modal.js.map