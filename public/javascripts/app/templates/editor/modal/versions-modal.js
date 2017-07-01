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

;
//# sourceMappingURL=/javascripts/app/templates/editor/modal/versions-modal.js.map