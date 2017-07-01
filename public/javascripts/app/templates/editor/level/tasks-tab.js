require.register("templates/editor/level/tasks-tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"nano editor-nano-container\"><div class=\"nano-content\">");
var task_row_mixin = function(cid){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var task = view.getTaskByCID(cid)
var taskName = task.get('name');
var isComplete = task.get('complete')
buf.push("<tr" + (jade.attrs({ 'data-task-cid':(cid), "class": [('task-row')] }, {"data-task-cid":true})) + "><td class=\"task-check\"><div class=\"checkbox\"><input" + (jade.attrs({ 'type':('checkbox'), 'checked':((isComplete || false)), "class": [('task-input')] }, {"type":true,"checked":true})) + "/></div></td>");
if ( task.get('curEdit') == true)
{
buf.push("<td class=\"edit-cell\"></td><td class=\"task-name\"><input" + (jade.attrs({ 'type':("input"), 'value':(taskName), 'id':('cur-edit') }, {"type":true,"value":true})) + "/></td>");
}
else
{
buf.push("<td class=\"edit-cell\"><span class=\"glyphicon glyphicon-edit start-edit\"></span></td><td class=\"task-name\">");
var result = view.getTaskURL(taskName)
if ( result !== null)
{
buf.push("<!-- https://github.com/codecombat/codecombat/wiki/Tasks-Tab#<slug goes here>--><a" + (jade.attrs({ 'href':('https://github.com/codecombat/codecombat/wiki/Tasks-Tab#' + result), 'target':('blank') }, {"href":true,"target":true})) + ">" + (jade.escape(null == (jade.interp = taskName) ? "" : jade.interp)) + "</a>");
}
else
{
buf.push("<span>" + (jade.escape(null == (jade.interp = taskName) ? "" : jade.interp)) + "</span>");
}
buf.push("</td>");
}
buf.push("</tr>");
};
buf.push("<table class=\"table table-striped table-hover\"><tr><th class=\"task-check\">Complete</th><th class=\"edit-cell\">Edit</th><th>Incomplete Tasks</th></tr>");
// iterate (view.taskArray() || [])
;(function(){
  var $$obj = (view.taskArray() || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var task = $$obj[$index];

if ( task.get('revert').complete !== true)
{
task_row_mixin(task.cid);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var task = $$obj[$index];

if ( task.get('revert').complete !== true)
{
task_row_mixin(task.cid);
}
    }

  }
}).call(this);

buf.push("<tr><th class=\"task-check\"></th><th class=\"edit-cell\"></th><th>Completed Tasks</th></tr>");
// iterate (view.taskArray() || [])
;(function(){
  var $$obj = (view.taskArray() || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var task = $$obj[$index];

if ( task.get('revert').complete === true)
{
task_row_mixin(task.cid);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var task = $$obj[$index];

if ( task.get('revert').complete === true)
{
task_row_mixin(task.cid);
}
    }

  }
}).call(this);

buf.push("</table><button id=\"create-task\" class=\"btn btn-primary\">Add Task</button></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/tasks-tab.js.map