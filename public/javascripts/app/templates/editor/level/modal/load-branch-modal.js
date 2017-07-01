require.register("templates/editor/level/modal/load-branch-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,moment = locals_.moment;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Load Branch</h3></div><div class=\"modal-body\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-2\"><div id=\"branches-list-group\" class=\"list-group\">");
// iterate view.branches.models
;(function(){
  var $$obj = view.branches.models;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var branch = $$obj[i];

buf.push("<a" + (jade.attrs({ 'data-branch-cid':(branch.cid), "class": [('list-group-item'),((i == 0 ? 'active' : ''))] }, {"class":true,"data-branch-cid":true})) + "><span class=\"delete-branch-btn glyphicon glyphicon-remove pull-right\"></span>" + (jade.escape(null == (jade.interp = branch.get('name')) ? "" : jade.interp)) + "<div class=\"small\"><i>" + (jade.escape(null == (jade.interp = branch.get('updatedByName')) ? "" : jade.interp)) + "</i><br/><span>" + (jade.escape(null == (jade.interp = moment(branch.get('updated')).format('lll')) ? "" : jade.interp)) + "</span></div></a>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var branch = $$obj[i];

buf.push("<a" + (jade.attrs({ 'data-branch-cid':(branch.cid), "class": [('list-group-item'),((i == 0 ? 'active' : ''))] }, {"class":true,"data-branch-cid":true})) + "><span class=\"delete-branch-btn glyphicon glyphicon-remove pull-right\"></span>" + (jade.escape(null == (jade.interp = branch.get('name')) ? "" : jade.interp)) + "<div class=\"small\"><i>" + (jade.escape(null == (jade.interp = branch.get('updatedByName')) ? "" : jade.interp)) + "</i><br/><span>" + (jade.escape(null == (jade.interp = moment(branch.get('updated')).format('lll')) ? "" : jade.interp)) + "</span></div></a>");
    }

  }
}).call(this);

buf.push("</div></div><div id=\"selected-branch-col\" class=\"col-sm-10\">");
if ( view.selectedBranch)
{
buf.push("<div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-6\"><h2>Original Changes</h2></div><div class=\"col-sm-6\"><h2>Resulting Changes if Loaded</h2></div></div>");
// iterate view.selectedBranch.get('patches')
;(function(){
  var $$obj = view.selectedBranch.get('patches');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var patch = $$obj[$index];

buf.push("<hr/><h4>" + (jade.escape(null == (jade.interp = patch.postLoadChange.get('name')) ? "" : jade.interp)));
if ( patch.modelHasChangedSincePatchCreated)
{
buf.push((jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<i class=\"label label-warning\">Document has changed since patch was created</i>");
}
if ( patch.currentModelHasLocalChanges)
{
buf.push((jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<i class=\"label label-danger\">Local Changes Will Be Overwritten</i>");
}
if ( !patch.applied)
{
buf.push((jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<i class=\"label label-danger\">Patch could not be applied</i>");
}
buf.push("</h4><div class=\"row\"><div" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('col-sm-6')] }, {"data-patch-id":true})) + "><div" + (jade.attrs({ 'data-patch-id':(patch.id), 'data-prop':("original-change"), "class": [('changes-stub')] }, {"data-patch-id":true,"data-prop":true})) + "></div></div><div" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('col-sm-6')] }, {"data-patch-id":true})) + "><div" + (jade.attrs({ 'data-patch-id':(patch.id), 'data-prop':("post-load-change"), "class": [('changes-stub')] }, {"data-patch-id":true,"data-prop":true})) + "></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var patch = $$obj[$index];

buf.push("<hr/><h4>" + (jade.escape(null == (jade.interp = patch.postLoadChange.get('name')) ? "" : jade.interp)));
if ( patch.modelHasChangedSincePatchCreated)
{
buf.push((jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<i class=\"label label-warning\">Document has changed since patch was created</i>");
}
if ( patch.currentModelHasLocalChanges)
{
buf.push((jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<i class=\"label label-danger\">Local Changes Will Be Overwritten</i>");
}
if ( !patch.applied)
{
buf.push((jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<i class=\"label label-danger\">Patch could not be applied</i>");
}
buf.push("</h4><div class=\"row\"><div" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('col-sm-6')] }, {"data-patch-id":true})) + "><div" + (jade.attrs({ 'data-patch-id':(patch.id), 'data-prop':("original-change"), "class": [('changes-stub')] }, {"data-patch-id":true,"data-prop":true})) + "></div></div><div" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('col-sm-6')] }, {"data-patch-id":true})) + "><div" + (jade.attrs({ 'data-patch-id':(patch.id), 'data-prop':("post-load-change"), "class": [('changes-stub')] }, {"data-patch-id":true,"data-prop":true})) + "></div></div></div>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"unstash-branch-btn\" class=\"btn btn-primary\">Unstash Branch</button><button id=\"load-branch-btn\" class=\"btn btn-primary\">Load Branch</button></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/modal/load-branch-modal.js.map