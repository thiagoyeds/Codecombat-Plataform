require.register("templates/courses/teacher-class-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,state = locals_.state,_ = locals_._,i18n = locals_.i18n,translate = locals_.translate,dotClass = locals_.dotClass,levelName = locals_.levelName,context = locals_.context,moment = locals_.moment,link = locals_.link,labelText = locals_.labelText,me = locals_.me,serverConfig = locals_.serverConfig,document = locals_.document;var enrollmentStatusTab_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<!-- TODO: Have search input in all tabs--><!--form.form-inline.text-center.m-t-3--><!--  #search-form-group.form-group--><!--    label(for=\"student-search\") Search for student:--><!--    input#student-search.form-control.m-l-1(type=\"search\")--><!--    span.glyphicon.glyphicon-search.form-control-feedback--><table id=\"license-status-table\" class=\"table table-condensed m-t-3\"><thead><!-- Checkbox code works, but don't need it yet.--><!--th.checkbox-col.select-all<div class=\"checkbox-flat\"><input type=\"checkbox\" id=\"checkbox-all-students\"/><label for=\"checkbox-all-students\" class=\"checkmark\"></label></div>--><th><div class=\"sort-buttons small\"><span data-i18n=\"teacher.sort_by\"></span><span class=\"spr\">:</span><button data-i18n=\"general.name\" value=\"name\" class=\"sort-button sort-by-name\"></button><button data-i18n=\"user.status\" value=\"status\" class=\"sort-button sort-by-status\"></button></div></th></thead><tbody>");
var searchTerm = view.state.get('searchTerm');
// iterate state.get('students').search(searchTerm)
;(function(){
  var $$obj = state.get('students').search(searchTerm);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var student = $$obj[$index];

var status = student.prepaidStatus()
buf.push("<tr class=\"student-row alternating-background\"><!--td.checkbox-col.student-checkbox<div class=\"checkbox-flat\"><input" + (jade.attrs({ 'type':('checkbox'), 'id':('checkbox-student-' + student.id), 'data-student-id':(student.id) }, {"type":true,"id":true,"data-student-id":true})) + "/><label" + (jade.attrs({ 'for':('checkbox-student-' + student.id), "class": [('checkmark')] }, {"for":true})) + "></label></div>--><td class=\"student-info-col\"><div class=\"student-info\"><div class=\"student-name\">" + (jade.escape(null == (jade.interp = student.broadName()) ? "" : jade.interp)) + "</div><div class=\"student-email small-details\">" + (jade.escape(null == (jade.interp = student.get('email')) ? "" : jade.interp)) + "</div></div></td><td class=\"status-col\"><span data-i18n=\"user.status\"></span><span class=\"spr\">:</span><strong" + (jade.attrs({ "class": [(status === 'expired' ? 'text-danger' : '')] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = view.studentStatusString(student)) ? "" : jade.interp)) + "</strong></td><td class=\"enroll-col\">");
if ( status !== 'enrolled')
{
buf.push("<button" + (jade.attrs({ 'data-i18n':("teacher.apply_license"), 'data-user-id':(student.id), 'data-event-action':("Teachers Class Enrollment Enroll Student"), "class": [('enroll-student-button'),('btn'),('btn-navy')] }, {"data-i18n":true,"data-user-id":true,"data-event-action":true})) + "></button>");
}
else
{
if ( student.prepaidType() === 'course')
{
buf.push("<span data-i18n=\"teacher.full_license\"></span>");
}
else if ( student.prepaidType() === 'starter_license')
{
buf.push("<span data-i18n=\"teacher.starter_license\"></span>");
}
}
buf.push("</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var student = $$obj[$index];

var status = student.prepaidStatus()
buf.push("<tr class=\"student-row alternating-background\"><!--td.checkbox-col.student-checkbox<div class=\"checkbox-flat\"><input" + (jade.attrs({ 'type':('checkbox'), 'id':('checkbox-student-' + student.id), 'data-student-id':(student.id) }, {"type":true,"id":true,"data-student-id":true})) + "/><label" + (jade.attrs({ 'for':('checkbox-student-' + student.id), "class": [('checkmark')] }, {"for":true})) + "></label></div>--><td class=\"student-info-col\"><div class=\"student-info\"><div class=\"student-name\">" + (jade.escape(null == (jade.interp = student.broadName()) ? "" : jade.interp)) + "</div><div class=\"student-email small-details\">" + (jade.escape(null == (jade.interp = student.get('email')) ? "" : jade.interp)) + "</div></div></td><td class=\"status-col\"><span data-i18n=\"user.status\"></span><span class=\"spr\">:</span><strong" + (jade.attrs({ "class": [(status === 'expired' ? 'text-danger' : '')] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = view.studentStatusString(student)) ? "" : jade.interp)) + "</strong></td><td class=\"enroll-col\">");
if ( status !== 'enrolled')
{
buf.push("<button" + (jade.attrs({ 'data-i18n':("teacher.apply_license"), 'data-user-id':(student.id), 'data-event-action':("Teachers Class Enrollment Enroll Student"), "class": [('enroll-student-button'),('btn'),('btn-navy')] }, {"data-i18n":true,"data-user-id":true,"data-event-action":true})) + "></button>");
}
else
{
if ( student.prepaidType() === 'course')
{
buf.push("<span data-i18n=\"teacher.full_license\"></span>");
}
else if ( student.prepaidType() === 'starter_license')
{
buf.push("<span data-i18n=\"teacher.starter_license\"></span>");
}
}
buf.push("</td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table>");
};
var bulkAssignControls_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"bulk-assign-controls form-inline\"><div" + (jade.attrs({ "class": [('no-students-selected'),('small-details'),(state.get('errors').assigningToNobody ? 'visible' : '')] }, {"class":true})) + "><span data-i18n=\"teacher.no_students_selected\"></span></div><span class=\"small\"><span data-i18n=\"teacher.bulk_assign\"></span><span>:</span></span><select class=\"bulk-course-select form-control\">");
// iterate _.rest(view.latestReleasedCourses)
;(function(){
  var $$obj = _.rest(view.latestReleasedCourses);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var course = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(course.id), 'selected':((course===state.get('selectedCourse'))) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)));
if ( !view.availableCourseMap[course.id])
{
buf.push(jade.escape(null == (jade.interp = " " + translate('teacher.paren_new')) ? "" : jade.interp));
}
buf.push("</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var course = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(course.id), 'selected':((course===state.get('selectedCourse'))) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)));
if ( !view.availableCourseMap[course.id])
{
buf.push(jade.escape(null == (jade.interp = " " + translate('teacher.paren_new')) ? "" : jade.interp));
}
buf.push("</option>");
    }

  }
}).call(this);

buf.push("</select><button class=\"btn btn-primary-alt assign-to-selected-students\"><span data-i18n=\"teacher.assign_to_selected_students\"></span></button></div>");
};
var copyCodes_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"copy-button-group form-inline m-b-3\"><div class=\"form-group\"><input" + (jade.attrs({ 'id':('join-code-input'), 'value':(state.get('classCode')), "class": [('text-h4'),('semibold')] }, {"value":true})) + "/></div><button id=\"copy-code-btn\" class=\"form-control btn btn-lg btn-forest\"><span data-i18n=\"teacher.copy_class_code\"></span></button><div data-i18n=\"teacher.class_code_blurb\" class=\"text-center small class-code-blurb\"></div></div><div class=\"copy-button-group form-inline m-b-3\"><div class=\"form-group\"><input" + (jade.attrs({ 'id':('join-url-input'), 'value':(state.get('joinURL')), "class": [('form-control'),('text-h4'),('semibold')] }, {"value":true})) + "/></div><button id=\"copy-url-btn\" class=\"form-control btn btn-lg btn-forest\"><span data-i18n=\"teacher.copy_class_url\"></span></button><div data-i18n=\"teacher.class_join_url_blurb\" class=\"text-center small class-code-blurb\"></div></div>");
};
var progressDotLabel_mixin = function(label){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"dot-label text-center\"><div class=\"dot-label-inner\">" + (jade.escape(null == (jade.interp = label) ? "" : jade.interp)) + "</div></div>");
};
var studentLevelProgressDot_mixin = function(progress, level, levelNumber){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
dotClass = progress.completed ? 'forest' : (progress.started ? 'gold' : '');
levelName = i18n(level.attributes, 'name')
context = _.merge(progress, { levelName: levelName, levelNumber: levelNumber, moment: moment, practice: level.get('practice') })
link = null;
labelText = levelNumber;
if ( level.isLadder())
{
var course = view.state.get('selectedCourse');
var courseInstance = view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id });
if ( courseInstance)
{
link = view.urls.courseArenaLadder({level: level, courseInstance: courseInstance});
labelText = translate('courses.arena');
}
else
{
labelText = translate('courses.arena');
}
dotClass += ' progress-dot-lg';
}
else if ( level.isProject())
{
if ( progress.started)
{
link = view.urls.playDevLevel({level: level, session: progress.session, course: view.state.get('selectedCourse')});
labelText = translate('teacher.view_student_project');
dotClass = 'navy';
}
else
{
labelText = translate('teacher.project');
}
dotClass += ' progress-dot-lg';
}
else if ( level.get('practice'))
{
if ( !(progress.completed || progress.started))
{
labelText = ''
dotClass += ' practice'
}
}
buf.push("<div" + (jade.attrs({ 'data-html':('true'), 'data-title':(view.singleStudentLevelProgressDotTemplate(context)), "class": [('progress-dot'),('level-progress-dot'),(dotClass)] }, {"class":true,"data-html":true,"data-title":true})) + ">");
if ( link)
{
buf.push("<a" + (jade.attrs({ 'href':(link) }, {"href":true})) + ">");
progressDotLabel_mixin(labelText);
buf.push("</a>");
}
else
{
progressDotLabel_mixin(labelText);
}
buf.push("</div>");
};
var allStudentsLevelProgressDot_mixin = function(progress, level, levelNumber){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
dotClass = progress.completed ? 'forest' : (progress.started ? 'gold' : '');
levelName = i18n(level.attributes, 'name')
context = _.merge(progress, { levelName: levelName, levelNumber: levelNumber, numStudents: view.students.length, practice: level.get('practice') })
link = null;
labelText = levelNumber;
if ( level.isLadder())
{
var course = view.state.get('selectedCourse');
var courseInstance = course && view.classroom ? view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id }) : null;
if ( courseInstance)
{
link = view.urls.courseArenaLadder({level: level, courseInstance: courseInstance});
labelText = translate('teacher.view_arena_ladder');
}
else
{
labelText = translate('courses.arena');
}
dotClass = 'navy progress-dot-lg';
}
else if ( level.isProject())
{
labelText = translate('teacher.project')
dotClass += ' progress-dot-lg';
}
else if ( level.get('practice'))
{
if ( !(progress.completed || progress.started))
{
labelText = ''
dotClass += ' practice'
}
}
buf.push("<div" + (jade.attrs({ 'data-html':('true'), 'data-title':(view.allStudentsLevelProgressDotTemplate(context)), "class": [('progress-dot'),('level-progress-dot'),(dotClass)] }, {"class":true,"data-html":true,"data-title":true})) + ">");
if ( link)
{
buf.push("<a" + (jade.attrs({ 'href':(link) }, {"href":true})) + ">");
progressDotLabel_mixin(labelText);
buf.push("</a>");
}
else
{
progressDotLabel_mixin(labelText);
}
buf.push("</div>");
};
var studentCourseProgressDot_mixin = function(progress, levelsTotal, label){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
dotClass = progress.completed ? 'forest' : (progress.started ? 'gold' : '');
_.assign(progress, { levelsTotal: levelsTotal })
buf.push("<div" + (jade.attrs({ 'data-html':('true'), 'data-title':(view.singleStudentCourseProgressDotTemplate(progress)), "class": [('progress-dot'),(dotClass)] }, {"class":true,"data-html":true,"data-title":true})) + ">");
progressDotLabel_mixin(label);
buf.push("</div>");
};
var studentLevelsRow_mixin = function(student){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"student-levels-row alternating-background\"><div class=\"student-info\"><div class=\"student-name\">" + (jade.escape(null == (jade.interp = student.broadName()) ? "" : jade.interp)) + "</div><div class=\"student-email small-details\">" + (jade.escape(null == (jade.interp = student.get('email')) ? "" : jade.interp)) + "</div></div><div class=\"student-levels-progress\">");
var course = state.get('selectedCourse')
var levels = view.classroom.getLevels({courseID: course.id}).models
// iterate levels
;(function(){
  var $$obj = levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var level = $$obj[index];

var progress = state.get('progressData').get({ classroom: view.classroom, course: course, level: level, user: student })
var levelNumber = view.classroom.getLevelNumber(level.get('original'), index + 1)
studentLevelProgressDot_mixin(progress, level, levelNumber);
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var level = $$obj[index];

var progress = state.get('progressData').get({ classroom: view.classroom, course: course, level: level, user: student })
var levelNumber = view.classroom.getLevelNumber(level.get('original'), index + 1)
studentLevelProgressDot_mixin(progress, level, levelNumber);
    }

  }
}).call(this);

buf.push("</div></div>");
};
var courseOverview_mixin = function(course){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var levels = view.classroom.getLevels({courseID: course.id}).models
buf.push("<div class=\"course-overview-row\"><div class=\"course-title student-name\"><span>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span><span>" + (jade.escape(null == (jade.interp = ': ') ? "" : jade.interp)) + "</span><span data-i18n=\"teacher.course_overview\"></span></div><div class=\"course-overview-progress\">");
// iterate levels
;(function(){
  var $$obj = levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var level = $$obj[index];

var progress = state.get('progressData').get({ classroom: view.classroom, course: course, level: level })
var levelNumber = view.classroom.getLevelNumber(level.get('original'), index + 1)
allStudentsLevelProgressDot_mixin(progress, level, levelNumber);
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var level = $$obj[index];

var progress = state.get('progressData').get({ classroom: view.classroom, course: course, level: level })
var levelNumber = view.classroom.getLevelNumber(level.get('original'), index + 1)
allStudentsLevelProgressDot_mixin(progress, level, levelNumber);
    }

  }
}).call(this);

buf.push("</div></div>");
};
var courseProgressTab_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div id=\"course-progress-tab\" class=\"m-t-3\">");
if ( view.courses)
{
buf.push("<div class=\"text-center\"><span data-i18n=\"teacher.select_course\"></span><span class=\"spr\">:</span><select class=\"course-select\">");
// iterate view.latestReleasedCourses
;(function(){
  var $$obj = view.latestReleasedCourses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var course = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(course.id), 'selected':((course===state.get('selectedCourse'))) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)));
if ( !view.availableCourseMap[course.id])
{
buf.push(jade.escape(null == (jade.interp = " " + translate('teacher.paren_new')) ? "" : jade.interp));
}
buf.push("</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var course = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(course.id), 'selected':((course===state.get('selectedCourse'))) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)));
if ( !view.availableCourseMap[course.id])
{
buf.push(jade.escape(null == (jade.interp = " " + translate('teacher.paren_new')) ? "" : jade.interp));
}
buf.push("</option>");
    }

  }
}).call(this);

buf.push("</select></div>");
}
buf.push("<h4 data-i18n=\"teacher.progress_color_key\" class=\"m-b-2\"></h4><div id=\"progress-color-key-row\" class=\"row\"><div class=\"col col-md-2 col-xs-4\"><div class=\"progress-dot forest\"></div><div class=\"key-text\"><span data-i18n=\"play_level.level_complete\" class=\"small\"></span></div><div class=\"clearfix\"></div></div><div class=\"col col-md-2 col-xs-4\"><div class=\"progress-dot gold\"></div><div class=\"key-text\"><span data-i18n=\"teacher.level_in_progress\" class=\"small\"></span></div><div class=\"clearfix\"></div></div><div class=\"col col-md-2 col-xs-4\"><div class=\"progress-dot navy\"></div><div class=\"key-text\"><span data-i18n=\"teacher.project_or_arena\" class=\"small\"></span></div><div class=\"clearfix\"></div></div><div class=\"col col-md-2 col-xs-4\"><div class=\"progress-dot\"></div><div class=\"key-text\"><span data-i18n=\"teacher.level_not_started\" class=\"small\"></span></div><div class=\"clearfix\"></div></div></div>");
var course = state.get('selectedCourse');
var courseInstance = view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id });
if ( course && view.availableCourseMap[course.id] && courseInstance && courseInstance.get('members').length > 0)
{
buf.push("<div class=\"render-on-course-sync\">");
courseOverview_mixin(course);
buf.push("<div class=\"student-levels-table\">");
sortButtons_mixin();
// iterate state.get('students').models
;(function(){
  var $$obj = state.get('students').models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var student = $$obj[$index];

if ( _.contains(state.get('selectedCourse').members, student.id))
{
studentLevelsRow_mixin(student);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var student = $$obj[$index];

if ( _.contains(state.get('selectedCourse').members, student.id))
{
studentLevelsRow_mixin(student);
}
    }

  }
}).call(this);

buf.push("</div></div>");
}
else
{
buf.push("<br/><h2 class=\"text-center\"><i data-i18n=\"teacher.no_student_assigned\"></i></h2>");
}
buf.push("<div class=\"unassigned-students render-on-course-sync\">");
if ( state.get('selectedCourse') && state.get('selectedCourse').members.length < state.get('students').length)
{
buf.push("<h2>");
var courseName = i18n(state.get('selectedCourse').attributes, 'name');
buf.push("<span>" + (jade.escape(null == (jade.interp = translate('teacher.students_not_assigned').replace('{{courseName}}', courseName)) ? "" : jade.interp)) + "</span></h2>");
// iterate state.get('students').models
;(function(){
  var $$obj = state.get('students').models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var student = $$obj[$index];

if (!( _.contains(state.get('selectedCourse').members, student.id)))
{
buf.push("<div class=\"row unassigned-student-row alternating-background\"><div class=\"student-name col-sm-3\">" + (jade.escape(null == (jade.interp = student.broadName()) ? "" : jade.interp)) + "</div><div class=\"student-email small-details col-sm-3\">" + (jade.escape(null == (jade.interp = student.get('email')) ? "" : jade.interp)) + "</div><div class=\"col-sm-4\"><div class=\"latest-completed truncate small\"><i class=\"m-r-1\"><span data-i18n=\"teacher.latest_completed\"></span></i>");
longLevelName_mixin(student.latestCompleteLevel);
buf.push("</div></div><div class=\"col-sm-2\"><div" + (jade.attrs({ 'data-user-id':(student.id), 'data-course-id':(state.get('selectedCourse').id), "class": [('assign-student-button'),('btn'),('btn-md'),('btn-navy'),('pull-right')] }, {"data-user-id":true,"data-course-id":true})) + "><span data-i18n=\"teacher.assign_course\"></span></div></div></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var student = $$obj[$index];

if (!( _.contains(state.get('selectedCourse').members, student.id)))
{
buf.push("<div class=\"row unassigned-student-row alternating-background\"><div class=\"student-name col-sm-3\">" + (jade.escape(null == (jade.interp = student.broadName()) ? "" : jade.interp)) + "</div><div class=\"student-email small-details col-sm-3\">" + (jade.escape(null == (jade.interp = student.get('email')) ? "" : jade.interp)) + "</div><div class=\"col-sm-4\"><div class=\"latest-completed truncate small\"><i class=\"m-r-1\"><span data-i18n=\"teacher.latest_completed\"></span></i>");
longLevelName_mixin(student.latestCompleteLevel);
buf.push("</div></div><div class=\"col-sm-2\"><div" + (jade.attrs({ 'data-user-id':(student.id), 'data-course-id':(state.get('selectedCourse').id), "class": [('assign-student-button'),('btn'),('btn-md'),('btn-navy'),('pull-right')] }, {"data-user-id":true,"data-course-id":true})) + "><span data-i18n=\"teacher.assign_course\"></span></div></div></div>");
}
    }

  }
}).call(this);

}
buf.push("</div></div>");
};
var studentRow_mixin = function(student){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<tr class=\"student-row alternating-background\"><td class=\"checkbox-col student-checkbox\"><div class=\"checkbox-flat\"><input" + (jade.attrs({ 'type':('checkbox'), 'id':('checkbox-student-' + student.id), 'data-student-id':(student.id), 'checked':(state.get('checkboxStates')[student.id]) }, {"type":true,"id":true,"data-student-id":true,"checked":true})) + "/><label" + (jade.attrs({ 'for':('checkbox-student-' + student.id), "class": [('checkmark')] }, {"for":true})) + "></label></div></td><td class=\"student-info-col\"><div class=\"student-info\">");
if ( student.get('deleted'))
{
buf.push("<em>(deleted)</em>");
}
var url = '/teachers/classes/' + view.classroom.id + '/' + student.id;
buf.push("<a" + (jade.attrs({ 'href':(url) }, {"href":true})) + "><div class=\"student-name\">" + (jade.escape(null == (jade.interp = student.broadName()) ? "" : jade.interp)) + "</div></a><div class=\"student-email small-details\">" + (jade.escape(null == (jade.interp = student.get('email')) ? "" : jade.interp)) + "</div></div></td><td class=\"hidden\"><a" + (jade.attrs({ 'data-student-id':(student.id), "class": [('edit-student-button')] }, {"data-student-id":true})) + "><span class=\"glyphicon glyphicon-edit\"></span><span data-i18n=\"teacher.edit\"></span></a></td><td class=\"latest-level-col small\"><div><i><span data-i18n=\"teacher.latest_completed\"></span></i></div><div>");
longLevelName_mixin(student.latestCompleteLevel);
buf.push("</div></td><td>");
if ( state.get('progressData'))
{
var courses = view.sortedCourses.map(function(c) { return view.courses.get(c._id); });
var courseLabelsArray = view.helper.courseLabelsArray(courses);
// iterate view.sortedCourses
;(function(){
  var $$obj = view.sortedCourses;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var trimCourse = $$obj[index];

var course = view.courses.get(trimCourse._id);
var instance = view.courseInstances.findWhere({ courseID: course.id, classroomID: classroom.id })
if ( instance && instance.hasMember(student))
{
var progress = state.get('progressData').get({ classroom: view.classroom, course: course, user: student })
var levelsTotal = _.reject(trimCourse.levels, 'practice').length
var label = courseLabelsArray[index];
studentCourseProgressDot_mixin(progress, levelsTotal, label);
}
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var trimCourse = $$obj[index];

var course = view.courses.get(trimCourse._id);
var instance = view.courseInstances.findWhere({ courseID: course.id, classroomID: classroom.id })
if ( instance && instance.hasMember(student))
{
var progress = state.get('progressData').get({ classroom: view.classroom, course: course, user: student })
var levelsTotal = _.reject(trimCourse.levels, 'practice').length
var label = courseLabelsArray[index];
studentCourseProgressDot_mixin(progress, levelsTotal, label);
}
    }

  }
}).call(this);

}
buf.push("</td><td><div class=\"pull-right\"><a" + (jade.attrs({ 'data-student-id':(student.id), "class": [('edit-student-link'),('small'),('center-block'),('text-center'),('m-r-2')] }, {"data-student-id":true})) + "><div class=\"glyphicon glyphicon-edit\"></div><div data-i18n=\"teacher.edit\"></div></a><a" + (jade.attrs({ 'data-student-id':(student.id), "class": [('remove-student-link'),('small'),('center-block'),('text-center'),('m-r-2')] }, {"data-student-id":true})) + "><div class=\"glyphicon glyphicon-remove\"></div><div data-i18n=\"teacher.remove\"></div></a></div></td></tr>");
};
var sortButtons_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"sort-buttons small\"><span data-i18n=\"teacher.sort_by\"></span><span class=\"spr\">:</span><button data-i18n=\"general.name\" value=\"name\" class=\"sort-button sort-by-name\"></button><button data-i18n=\"teacher.progress\" value=\"progress\" class=\"sort-button sort-by-progress\"></button></div>");
};
var studentsTab_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div id=\"students-tab\">");
bulkAssignControls_mixin();
buf.push("<table class=\"students-table\"><thead><th class=\"checkbox-col select-all small text-center\"><span data-i18n=\"teacher.select_all\"></span><div class=\"checkbox-flat\">");
var allStudentsChecked = _.all(state.get('checkboxStates'))
buf.push("<input" + (jade.attrs({ 'type':('checkbox'), 'id':('checkbox-all-students'), 'checked':(allStudentsChecked) }, {"type":true,"id":true,"checked":true})) + "/><label for=\"checkbox-all-students\" class=\"checkmark\"></label></div></th><th>");
sortButtons_mixin();
buf.push("</th></thead><tbody>");
// iterate state.get('students').models
;(function(){
  var $$obj = state.get('students').models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var student = $$obj[$index];

studentRow_mixin(student);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var student = $$obj[$index];

studentRow_mixin(student);
    }

  }
}).call(this);

buf.push("</tbody></table></div>");
};
var addStudentsButton_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"add-students\"><a" + (jade.attrs({ 'data-classroom-id':(view.classroom.id), "class": [('add-students-btn'),('btn'),('btn-lg'),('btn-primary')] }, {"data-classroom-id":true})) + "><span data-i18n=\"teacher.add_students_manually\"></span></a></div>");
};
var inlineUserList_mixin = function(users){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
if ( users)
{
buf.push("<ul class=\"inline-student-list small\">");
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var student = $$obj[$index];

buf.push("<li><span class=\"inline-student-name\">" + (jade.escape(null == (jade.interp = student.broadName()) ? "" : jade.interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var student = $$obj[$index];

buf.push("<li><span class=\"inline-student-name\">" + (jade.escape(null == (jade.interp = student.broadName()) ? "" : jade.interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul>");
}
};
var longLevelName_mixin = function(data){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
if ( data)
{
buf.push("<div class=\"level-name\"><span>" + (jade.escape(null == (jade.interp = data.courseName + ': ') ? "" : jade.interp)) + "</span><span data-i18n=\"play_level.level\"></span><span class=\"spl\">" + (jade.escape(null == (jade.interp = data.levelNumber) ? "" : jade.interp)) + "</span></div>");
}
else
{
buf.push("<div data-i18n=\"teacher.not_applicable\" class=\"level-name\"></div>");
}
};
var breadcrumbs_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"breadcrumbs\"><a data-i18n=\"teacher.my_classes\" href=\"/teachers/classes\"></a><span class=\"spl spr\">></span><span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span></div>");
};
var accountLinks_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/payments\" data-i18n=\"account.payments\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()) || me.hasSubscription())
{
buf.push("<li><a href=\"/account/subscription\" data-i18n=\"account.subscription\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/prepaid\" data-i18n=\"account.prepaid_codes\"></a></li>");
}
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li>");
};
buf.push("<div class=\"style-flat\"><nav id=\"main-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid container\"><div class=\"row\"><div class=\"col-md-12\"><div class=\"navbar-header\"><button data-toggle=\"collapse\" data-target=\"#navbar-collapse\" aria-expanded=\"false\" class=\"navbar-toggle collapsed\"><span data-i18n=\"nav.toggle_nav\" class=\"sr-only\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">");
if ( serverConfig.codeNinjas)
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\" class=\"code-ninjas-powered-by\"/><img src=\"/images/pages/base/code-ninjas-logo-right.png\" class=\"code-ninjas-logo\"/>");
}
else
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\"/>");
}
buf.push("<span class=\"glyphicon glyphicon-home\"></span></a></div><div id=\"navbar-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li>");
if ( me.isStudent())
{
buf.push("<li><a href=\"/students\" data-i18n=\"nav.my_courses\"></a></li>");
}
if ( !me.isAnonymous() && me.isTeacher())
{
buf.push("<li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li>");
}
if ( !me.isAnonymous() && !me.isStudent() && !me.isTeacher())
{
buf.push("<li><a href=\"/play\" data-i18n=\"common.play\"></a></li><li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li>");
}
buf.push("</ul>");
if ( me.isAnonymous())
{
buf.push("<ul class=\"nav navbar-nav\"><li><a id=\"create-account-link\" data-i18n=\"login.sign_up\" class=\"signup-button\"></a></li><li><a id=\"login-link\" data-i18n=\"login.log_in\" class=\"login-button\"></a></li></ul>");
}
else
{
buf.push("<ul class=\"nav navbar-nav hidden-md hidden-lg\"><li class=\"disabled\"><a><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span>" + (jade.escape(null == (jade.interp = me.displayName()) ? "" : jade.interp)) + "</span></a></li>");
accountLinks_mixin();
buf.push("</ul><ul class=\"nav navbar-nav\"><li class=\"dropdown hidden-xs hidden-sm\"><a href=\"#\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"dropdown-toggle\"><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span data-i18n=\"nav.my_account\"></span></a><ul class=\"dropdown-menu\"><li class=\"user-dropdown-header text-center\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/></a><h5>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h5></li>");
accountLinks_mixin();
buf.push("</ul></li></ul>");
}
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav>");
var path = document.location.pathname
buf.push("<div id=\"teacher-dashboard-nav\"><nav class=\"navbar\"><div class=\"container-fluid container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#teacher-dashboard-nav-collapse\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><span data-i18n=\"teacher.teacher_dashboard\" class=\"navbar-brand text-h4\"></span></div><div id=\"teacher-dashboard-nav-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/classes') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/classes\"><small data-i18n=\"teacher.my_classes\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/courses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/courses\"><small data-i18n=\"teacher.courses\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/licenses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/licenses\"><small data-i18n=\"teacher.enrollments\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources') === 0 && path.indexOf('/teachers/resources/faq') !== 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources\"><small data-i18n=\"teacher.resource_hub\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources/faq') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources/faq\"><small data-i18n=\"teacher.educator_faq\" class=\"label\"></small></a></li></ul></div></div></nav></div><div id=\"site-content-area\">");
var classroom = view.classroom
if ( !me.isTeacher() && !me.isAdmin())
{
buf.push("<div class=\"alert alert-danger text-center\"><div class=\"container\"><!-- DNT: Temporary--><h3>ATTENTION: Please upgrade your account to a Teacher Account.</h3><p>We are transitioning to a new improved classroom management system for instructors.\nPlease convert your account to ensure you retain access to your classrooms.</p><a href=\"/teachers/update-account\" class=\"btn btn-primary btn-lg\">Upgrade to teacher account</a></div></div>");
}
if ( classroom.loaded)
{
buf.push("<div class=\"container\">");
breadcrumbs_mixin();
if ( classroom.get('archived'))
{
buf.push("<div class=\"row center-block text-center m-t-3 m-b-3\"><div class=\"unarchive-btn btn btn-lg btn-navy\"><span data-i18n=\"teacher.unarchive_this_class\"></span></div></div>");
}
buf.push("<h3 class=\"m-t-2\">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</h3><a" + (jade.attrs({ 'data-classroom-id':(classroom.id), "class": [('label'),('edit-classroom')] }, {"data-classroom-id":true})) + "><span data-i18n=\"teacher.edit_class_settings\"></span></a><h4>" + (jade.escape(null == (jade.interp = classroom.get('description')) ? "" : jade.interp)) + "</h4><div class=\"classroom-info-row row m-t-5\"><div class=\"classroom-details col-md-3\">");
var stats = state.get('classStats')
buf.push("<h4 data-i18n=\"teacher.class_overview\" class=\"m-b-2\"></h4><div class=\"language small-details\"><span data-i18n=\"teacher.language\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = classroom.capitalLanguage) ? "" : jade.interp)) + "</span></div><div class=\"student-count small-details\"><span data-i18n=\"courses.students\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = classroom.get('members').length) ? "" : jade.interp)) + "</span></div><div class=\"average-playtime small-details\"><span data-i18n=\"teacher.avg_playtime\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = stats.averagePlaytime) ? "" : jade.interp)) + "</span></div><div class=\"total-playtime small-details\"><span data-i18n=\"teacher.total_playtime\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = stats.totalPlaytime) ? "" : jade.interp)) + "</span></div><div class=\"average-complete small-details\"><span data-i18n=\"teacher.avg_completed\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = stats.averageLevelsComplete) ? "" : jade.interp)) + "</span></div><div class=\"total-complete small-details\"><span data-i18n=\"teacher.total_completed\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = stats.totalLevelsComplete) ? "" : jade.interp)) + "</span></div><div class=\"total-complete small-details\"><span data-i18n=\"teacher.created\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = moment(classroom.created()).format('l')) ? "" : jade.interp)) + "</span></div>");
if ( view.students && view.students.models.length > 0)
{
buf.push("<button class=\"export-student-progress-btn btn btn-lg btn-primary\"><span data-i18n=\"teacher.export_student_progress\"></span></button>");
}
buf.push("</div><div class=\"completeness-info col-md-4\"><h4 class=\"m-b-2\">&nbsp;</h4>");
if ( state.get('earliestIncompleteLevel'))
{
buf.push("<div class=\"small-details\"><span data-i18n=\"teacher.earliest_incomplete\"></span><span>:</span></div>");
longLevelName_mixin(state.get('earliestIncompleteLevel'));
inlineUserList_mixin(state.get('earliestIncompleteLevel').users);
}
if ( state.get('latestCompleteLevel'))
{
buf.push("<div class=\"small-details m-t-3\"><span data-i18n=\"teacher.latest_complete\"></span><span>:</span></div>");
longLevelName_mixin(state.get('latestCompleteLevel'));
inlineUserList_mixin(state.get('latestCompleteLevel').users);
}
buf.push("</div><div class=\"adding-students col-md-5\"><h4 class=\"m-b-2\"><span data-i18n=\"courses.add_students\"></span><span>:</span></h4>");
copyCodes_mixin();
addStudentsButton_mixin();
buf.push("</div></div>");
if ( view.students.length > 0)
{
buf.push("<ul role=\"tablist\" class=\"nav nav-tabs m-t-5\">");
var activeTab = state.get('activeTab');
buf.push("<li" + (jade.attrs({ "class": [((activeTab === "#students-tab" ? 'active' : ''))] }, {"class":true})) + "><a href=\"#students-tab\" class=\"students-tab-btn\"><div data-i18n=\"courses.students\" class=\"small-details text-center\"></div></a></li><div class=\"tab-spacer\"></div><li" + (jade.attrs({ "class": [((activeTab === "#course-progress-tab" ? 'active' : ''))] }, {"class":true})) + "><a href=\"#course-progress-tab\" class=\"course-progress-tab-btn\"><div data-i18n=\"teacher.course_progress\" class=\"small-details text-center\"></div></a></li><div class=\"tab-spacer\"></div><li" + (jade.attrs({ "class": [((activeTab === "#license-status-tab" ? 'active' : ''))] }, {"class":true})) + "><a href=\"#license-status-tab\" class=\"course-progress-tab-btn\"><div data-i18n=\"teacher.license_status\" class=\"small-details text-center\"></div></a></li><div class=\"tab-filler\"></div></ul><div class=\"tab-content\">");
if ( activeTab === '#students-tab')
{
studentsTab_mixin();
}
else if ( activeTab === '#course-progress-tab')
{
courseProgressTab_mixin();
}
else if ( activeTab === '#license-status-tab')
{
enrollmentStatusTab_mixin();
}
buf.push("</div>");
}
else
{
buf.push("<div class=\"text-center m-t-5 m-b-5\"><div class=\"text-h2\"><span data-i18n=\"teacher.no_students_yet\"></span></div><div class=\"text-h4\"><span data-i18n=\"teacher.try_refreshing\"></span></div></div>");
}
buf.push("</div>");
}
buf.push("</div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
if ( !me.isStudent())
{
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.schools\"></strong></li><li><a href=\"/teachers/resources/faq\" data-i18n=\"teacher.educator_faq\"></a></li><li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li><li><a href=\"/teachers/resources\" data-i18n=\"nav.resource_hub\"></a></li><li><a href=\"/teachers/demo\" data-i18n=\"new_home.request_demo\"></a></li></ul></div>");
}
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.get_involved\"></strong></li><li><a href=\"/community\" data-i18n=\"nav.community\"></a></li><li><a href=\"/contribute\" data-i18n=\"nav.contribute\"></a></li>");
if ( !me.isStudent())
{
buf.push("<li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li>");
}
buf.push("<li><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a></li><li><a href=\"https://github.com/codecombat/codecombat\" data-i18n=\"nav.open_source\"></a></li></ul></div><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.support\"></strong></li>");
if ( !me.isStudent())
{
buf.push("<li><a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("<li><a href=\"https://www.facebook.com/codecombat\" data-i18n=\"nav.facebook\"></a></li><li><a href=\"https://twitter.com/codecombat\" data-i18n=\"nav.twitter\"></a></li></ul></div></div></div></div><div id=\"final-footer\" class=\"small text-center\">Copyright ©2016 CodeCombat. All Rights Reserved.<br class=\"hidden-lg hidden-md\"/><img src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><br class=\"hidden-lg hidden-md\"/>");
if ( !me.isStudent())
{
buf.push("<span data-i18n=\"nav.help_pref\" class=\"spr\"></span>");
var supportEmail = (me.get('preferredLanguage', true) || 'en-US').split('-')[0] == 'nl' ? 'klantenservice@codecombat.nl' : 'team@codecombat.com';
buf.push("<a" + (jade.attrs({ 'href':("mailto:" + supportEmail) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = supportEmail) ? "" : jade.interp)) + "</a><span data-i18n=\"nav.help_suff\" class=\"spl\"></span>");
}
buf.push("</div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/courses/teacher-class-view.js.map