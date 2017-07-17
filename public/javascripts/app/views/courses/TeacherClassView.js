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
buf.push("<li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li><li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li>");
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
buf.push("<span class=\"glyphicon glyphicon-home\"></span></a></div><div id=\"navbar-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\">");
if ( (!me.isStudent() && !me.isTeacher()))
{
buf.push("<li><a href=\"/play\" data-i18n=\"common.play\"></a></li>");
}
buf.push("<li><a href=\"play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a></li>");
if ( me.isStudent())
{
buf.push("<li><a href=\"/students\" data-i18n=\"nav.my_courses\"></a></li>");
}
if ( !me.isAnonymous() && me.isTeacher())
{
buf.push("<li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li>");
}
buf.push("<li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li></ul>");
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

;require.register("views/courses/TeacherClassView", function(exports, require, module) {
var ActivateLicensesModal, Campaigns, Classroom, ClassroomSettingsModal, Classrooms, Course, CourseInstance, CourseInstances, Courses, CoursesNotAssignedModal, EditStudentModal, InviteToClassroomModal, LevelSessions, Levels, Prepaids, RemoveStudentModal, RootView, STARTER_LICENSE_COURSE_IDS, State, TeacherClassView, User, Users, helper, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

State = require('models/State');

template = require('templates/courses/teacher-class-view');

helper = require('lib/coursesHelper');

utils = require('core/utils');

ClassroomSettingsModal = require('views/courses/ClassroomSettingsModal');

InviteToClassroomModal = require('views/courses/InviteToClassroomModal');

ActivateLicensesModal = require('views/courses/ActivateLicensesModal');

EditStudentModal = require('views/teachers/EditStudentModal');

RemoveStudentModal = require('views/courses/RemoveStudentModal');

CoursesNotAssignedModal = require('./CoursesNotAssignedModal');

Campaigns = require('collections/Campaigns');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

Levels = require('collections/Levels');

LevelSessions = require('collections/LevelSessions');

User = require('models/User');

Users = require('collections/Users');

Course = require('models/Course');

Courses = require('collections/Courses');

CourseInstance = require('models/CourseInstance');

CourseInstances = require('collections/CourseInstances');

Prepaids = require('collections/Prepaids');

STARTER_LICENSE_COURSE_IDS = require('core/constants').STARTER_LICENSE_COURSE_IDS;

module.exports = TeacherClassView = (function(superClass) {
  extend(TeacherClassView, superClass);

  function TeacherClassView() {
    this.onClickAddStudents = bind(this.onClickAddStudents, this);
    this.setCourseMembers = bind(this.setCourseMembers, this);
    return TeacherClassView.__super__.constructor.apply(this, arguments);
  }

  TeacherClassView.prototype.id = 'teacher-class-view';

  TeacherClassView.prototype.template = template;

  TeacherClassView.prototype.helper = helper;

  TeacherClassView.prototype.events = {
    'click .nav-tabs a': 'onClickNavTabLink',
    'click .unarchive-btn': 'onClickUnarchive',
    'click .edit-classroom': 'onClickEditClassroom',
    'click .add-students-btn': 'onClickAddStudents',
    'click .edit-student-link': 'onClickEditStudentLink',
    'click .sort-button': 'onClickSortButton',
    'click #copy-url-btn': 'onClickCopyURLButton',
    'click #copy-code-btn': 'onClickCopyCodeButton',
    'click .remove-student-link': 'onClickRemoveStudentLink',
    'click .assign-student-button': 'onClickAssignStudentButton',
    'click .enroll-student-button': 'onClickEnrollStudentButton',
    'click .assign-to-selected-students': 'onClickBulkAssign',
    'click .export-student-progress-btn': 'onClickExportStudentProgress',
    'click .select-all': 'onClickSelectAll',
    'click .student-checkbox': 'onClickStudentCheckbox',
    'keyup #student-search': 'onKeyPressStudentSearch',
    'change .course-select, .bulk-course-select': 'onChangeCourseSelect'
  };

  TeacherClassView.prototype.getInitialState = function() {
    return {
      sortAttribute: 'name',
      sortDirection: 1,
      activeTab: '#' + (Backbone.history.getHash() || 'students-tab'),
      students: new Users(),
      classCode: "",
      joinURL: "",
      errors: {
        assigningToNobody: false
      },
      selectedCourse: void 0,
      checkboxStates: {},
      classStats: {
        averagePlaytime: "",
        totalPlaytime: "",
        averageLevelsComplete: "",
        totalLevelsComplete: "",
        enrolledUsers: ""
      }
    };
  };

  TeacherClassView.prototype.getTitle = function() {
    var ref;
    return (ref = this.classroom) != null ? ref.get('name') : void 0;
  };

  TeacherClassView.prototype.initialize = function(options, classroomID) {
    var ref, translateTemplateText;
    TeacherClassView.__super__.initialize.call(this, options);
    translateTemplateText = (function(_this) {
      return function(template, context) {
        return $('<div />').html(template(context)).i18n().html();
      };
    })(this);
    this.singleStudentCourseProgressDotTemplate = _.wrap(require('templates/teachers/hovers/progress-dot-single-student-course'), translateTemplateText);
    this.singleStudentLevelProgressDotTemplate = _.wrap(require('templates/teachers/hovers/progress-dot-single-student-level'), translateTemplateText);
    this.allStudentsLevelProgressDotTemplate = _.wrap(require('templates/teachers/hovers/progress-dot-all-students-single-level'), translateTemplateText);
    this.urls = require('core/urls');
    this.debouncedRender = _.debounce(this.render);
    this.state = new State(this.getInitialState());
    this.updateHash(this.state.get('activeTab'));
    this.classroom = new Classroom({
      _id: classroomID
    });
    this.supermodel.trackRequest(this.classroom.fetch());
    this.onKeyPressStudentSearch = _.debounce(this.onKeyPressStudentSearch, 200);
    this.sortedCourses = [];
    this.prepaids = new Prepaids();
    this.supermodel.trackRequest(this.prepaids.fetchByCreator(me.id));
    this.students = new Users();
    this.classroom.sessions = new LevelSessions();
    this.listenTo(this.classroom, 'sync', function() {
      var jqxhrs, requests;
      jqxhrs = this.students.fetchForClassroom(this.classroom, {
        removeDeleted: true
      });
      this.supermodel.trackRequests(jqxhrs);
      requests = this.classroom.sessions.fetchForAllClassroomMembers(this.classroom);
      return this.supermodel.trackRequests(requests);
    });
    this.students.comparator = (function(_this) {
      return function(student1, student2) {
        var diff, dir, level1, level2, statusMap, value;
        dir = _this.state.get('sortDirection');
        value = _this.state.get('sortValue');
        if (value === 'name') {
          return (student1.broadName().toLowerCase() < student2.broadName().toLowerCase() ? -dir : dir);
        }
        if (value === 'progress') {
          level1 = student1.latestCompleteLevel;
          level2 = student2.latestCompleteLevel;
          if (!level1) {
            return -dir;
          }
          if (!level2) {
            return dir;
          }
          return dir * (level1.courseNumber - level2.courseNumber || level1.levelNumber - level2.levelNumber);
        }
        if (value === 'status') {
          statusMap = {
            expired: 0,
            'not-enrolled': 1,
            enrolled: 2
          };
          diff = statusMap[student1.prepaidStatus()] - statusMap[student2.prepaidStatus()];
          if (diff) {
            return dir * diff;
          }
          return (student1.broadName().toLowerCase() < student2.broadName().toLowerCase() ? -dir : dir);
        }
      };
    })(this);
    this.courses = new Courses();
    this.supermodel.trackRequest(this.courses.fetch());
    this.courseInstances = new CourseInstances();
    this.supermodel.trackRequest(this.courseInstances.fetchForClassroom(classroomID));
    this.levels = new Levels();
    this.supermodel.trackRequest(this.levels.fetchForClassroom(classroomID, {
      data: {
        project: 'original,concepts,primerLanguage,practice,shareable,i18n'
      }
    }));
    this.attachMediatorEvents();
    return (ref = window.tracker) != null ? ref.trackEvent('Teachers Class Loaded', {
      category: 'Teachers',
      classroomID: this.classroom.id
    }, ['Mixpanel']) : void 0;
  };

  TeacherClassView.prototype.attachMediatorEvents = function() {
    this.listenTo(this.classroom, 'sync change update', function() {
      var classCode, course, j, len, ref;
      classCode = this.classroom.get('codeCamel') || this.classroom.get('code');
      this.state.set({
        classCode: classCode,
        joinURL: document.location.origin + "/students?_cc=" + classCode
      });
      this.sortedCourses = this.classroom.getSortedCourses();
      this.availableCourseMap = {};
      ref = this.sortedCourses;
      for (j = 0, len = ref.length; j < len; j++) {
        course = ref[j];
        this.availableCourseMap[course._id] = true;
      }
      return this.debouncedRender();
    });
    this.listenTo(this.courses, 'sync change update', function() {
      this.setCourseMembers();
      if (!this.state.get('selectedCourse')) {
        return this.state.set({
          selectedCourse: this.courses.first()
        });
      }
    });
    this.listenTo(this.courseInstances, 'sync change update', function() {
      return this.setCourseMembers();
    });
    this.listenTo(this.students, 'sync change update add remove reset', function() {
      var checkboxStates, classStats, j, len, ref, student;
      this.calculateProgressAndLevels();
      classStats = this.calculateClassStats();
      if (classStats) {
        this.state.set({
          classStats: classStats
        });
      }
      this.state.set({
        students: this.students
      });
      checkboxStates = {};
      ref = this.students.models;
      for (j = 0, len = ref.length; j < len; j++) {
        student = ref[j];
        checkboxStates[student.id] = this.state.get('checkboxStates')[student.id] || false;
      }
      return this.state.set({
        checkboxStates: checkboxStates
      });
    });
    this.listenTo(this.students, 'sort', function() {
      return this.state.set({
        students: this.students
      });
    });
    return this.listenTo(this, 'course-select:change', function(arg) {
      var selectedCourse;
      selectedCourse = arg.selectedCourse;
      return this.state.set({
        selectedCourse: selectedCourse
      });
    });
  };

  TeacherClassView.prototype.setCourseMembers = function() {
    var course, j, len, ref, ref1;
    ref = this.courses.models;
    for (j = 0, len = ref.length; j < len; j++) {
      course = ref[j];
      course.instance = this.courseInstances.findWhere({
        courseID: course.id,
        classroomID: this.classroom.id
      });
      course.members = ((ref1 = course.instance) != null ? ref1.get('members') : void 0) || [];
    }
    return null;
  };

  TeacherClassView.prototype.onLoaded = function() {
    this.latestReleasedCourses = me.isAdmin() ? this.courses.models : this.courses.where({
      releasePhase: 'released'
    });
    this.latestReleasedCourses = utils.sortCourses(this.latestReleasedCourses);
    this.removeDeletedStudents();
    this.calculateProgressAndLevels();
    this.listenTo(this.courseInstances, 'sync change update', this.debouncedRender);
    this.listenTo(this.state, 'sync change', function() {
      if (_.isEmpty(_.omit(this.state.changed, 'searchTerm'))) {
        return this.renderSelectors('#license-status-table');
      } else {
        return this.debouncedRender();
      }
    });
    this.listenTo(this.students, 'sort', this.debouncedRender);
    return TeacherClassView.__super__.onLoaded.call(this);
  };

  TeacherClassView.prototype.afterRender = function() {
    TeacherClassView.__super__.afterRender.apply(this, arguments);
    return $('.progress-dot, .btn-view-project-level').each(function(i, el) {
      var dot;
      dot = $(el);
      return dot.tooltip({
        html: true,
        container: dot
      }).delegate('.tooltip', 'mousemove', function() {
        return dot.tooltip('hide');
      });
    });
  };

  TeacherClassView.prototype.calculateProgressAndLevels = function() {
    var classroomsStub, earliestIncompleteLevel, j, latestCompleteLevel, len, progressData, ref, student, studentsStub;
    if (this.supermodel.progress !== 1) {
      return;
    }
    ref = this.students.models;
    for (j = 0, len = ref.length; j < len; j++) {
      student = ref[j];
      studentsStub = new Users([student]);
      student.latestCompleteLevel = helper.calculateLatestComplete(this.classroom, this.courses, this.courseInstances, studentsStub);
    }
    earliestIncompleteLevel = helper.calculateEarliestIncomplete(this.classroom, this.courses, this.courseInstances, this.students);
    latestCompleteLevel = helper.calculateLatestComplete(this.classroom, this.courses, this.courseInstances, this.students);
    classroomsStub = new Classrooms([this.classroom]);
    progressData = helper.calculateAllProgress(classroomsStub, this.courses, this.courseInstances, this.students);
    return this.state.set({
      earliestIncompleteLevel: earliestIncompleteLevel,
      latestCompleteLevel: latestCompleteLevel,
      progressData: progressData,
      classStats: this.calculateClassStats()
    });
  };

  TeacherClassView.prototype.onClickNavTabLink = function(e) {
    var hash;
    e.preventDefault();
    hash = $(e.target).closest('a').attr('href');
    this.updateHash(hash);
    return this.state.set({
      activeTab: hash
    });
  };

  TeacherClassView.prototype.updateHash = function(hash) {
    if (application.testing) {
      return;
    }
    return window.location.hash = hash;
  };

  TeacherClassView.prototype.onClickCopyCodeButton = function() {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Class Copy Class Code', {
        category: 'Teachers',
        classroomID: this.classroom.id,
        classCode: this.state.get('classCode')
      }, ['Mixpanel']);
    }
    this.$('#join-code-input').val(this.state.get('classCode')).select();
    return this.tryCopy();
  };

  TeacherClassView.prototype.onClickCopyURLButton = function() {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Class Copy Class URL', {
        category: 'Teachers',
        classroomID: this.classroom.id,
        url: this.state.get('joinURL')
      }, ['Mixpanel']);
    }
    this.$('#join-url-input').val(this.state.get('joinURL')).select();
    return this.tryCopy();
  };

  TeacherClassView.prototype.onClickUnarchive = function() {
    var ref;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Class Unarchive', {
        category: 'Teachers',
        classroomID: this.classroom.id
      }, ['Mixpanel']);
    }
    return this.classroom.save({
      archived: false
    });
  };

  TeacherClassView.prototype.onClickEditClassroom = function(e) {
    var classroom, modal, ref;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Class Edit Class Started', {
        category: 'Teachers',
        classroomID: this.classroom.id
      }, ['Mixpanel']);
    }
    classroom = this.classroom;
    modal = new ClassroomSettingsModal({
      classroom: classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hide', this.render);
  };

  TeacherClassView.prototype.onClickEditStudentLink = function(e) {
    var modal, ref, user;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Class Students Edit', {
        category: 'Teachers',
        classroomID: this.classroom.id
      }, ['Mixpanel']);
    }
    user = this.students.get($(e.currentTarget).data('student-id'));
    modal = new EditStudentModal({
      user: user,
      classroom: this.classroom
    });
    return this.openModalView(modal);
  };

  TeacherClassView.prototype.onClickRemoveStudentLink = function(e) {
    var modal, user;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    user = this.students.get($(e.currentTarget).data('student-id'));
    modal = new RemoveStudentModal({
      classroom: this.classroom,
      user: user,
      courseInstances: this.courseInstances
    });
    this.openModalView(modal);
    return modal.once('remove-student', this.onStudentRemoved, this);
  };

  TeacherClassView.prototype.onStudentRemoved = function(e) {
    var ref;
    this.students.remove(e.user);
    return (ref = window.tracker) != null ? ref.trackEvent('Teachers Class Students Removed', {
      category: 'Teachers',
      classroomID: this.classroom.id,
      userID: e.user.id
    }, ['Mixpanel']) : void 0;
  };

  TeacherClassView.prototype.onClickAddStudents = function(e) {
    var modal, ref;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Class Add Students', {
        category: 'Teachers',
        classroomID: this.classroom.id
      }, ['Mixpanel']);
    }
    modal = new InviteToClassroomModal({
      classroom: this.classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hide', this.render);
  };

  TeacherClassView.prototype.removeDeletedStudents = function() {
    if (!(this.classroom.loaded && this.students.loaded)) {
      return;
    }
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    _.remove(this.classroom.get('members'), (function(_this) {
      return function(memberID) {
        var ref;
        return !_this.students.get(memberID) || ((ref = _this.students.get(memberID)) != null ? ref.get('deleted') : void 0);
      };
    })(this));
    return true;
  };

  TeacherClassView.prototype.onClickSortButton = function(e) {
    var value;
    value = $(e.target).val();
    if (value === this.state.get('sortValue')) {
      this.state.set('sortDirection', -this.state.get('sortDirection'));
    } else {
      this.state.set({
        sortValue: value,
        sortDirection: 1
      });
    }
    return this.students.sort();
  };

  TeacherClassView.prototype.onKeyPressStudentSearch = function(e) {
    return this.state.set('searchTerm', $(e.target).val());
  };

  TeacherClassView.prototype.onChangeCourseSelect = function(e) {
    return this.trigger('course-select:change', {
      selectedCourse: this.courses.get($(e.currentTarget).val())
    });
  };

  TeacherClassView.prototype.getSelectedStudentIDs = function() {
    return Object.keys(_.pick(this.state.get('checkboxStates'), function(checked) {
      return checked;
    }));
  };

  TeacherClassView.prototype.ensureInstance = function(courseID) {};

  TeacherClassView.prototype.onClickEnrollStudentButton = function(e) {
    var ref, selectedUsers, user, userID;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    userID = $(e.currentTarget).data('user-id');
    user = this.students.get(userID);
    selectedUsers = new Users([user]);
    this.enrollStudents(selectedUsers);
    return (ref = window.tracker) != null ? ref.trackEvent($(e.currentTarget).data('event-action'), {
      category: 'Teachers',
      classroomID: this.classroom.id,
      userID: userID
    }, ['Mixpanel']) : void 0;
  };

  TeacherClassView.prototype.enrollStudents = function(selectedUsers) {
    var modal;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    modal = new ActivateLicensesModal({
      classroom: this.classroom,
      selectedUsers: selectedUsers,
      users: this.students
    });
    this.openModalView(modal);
    return modal.once('redeem-users', (function(_this) {
      return function(enrolledUsers) {
        enrolledUsers.each(function(newUser) {
          var user;
          user = _this.students.get(newUser.id);
          if (user) {
            return user.set(newUser.attributes);
          }
        });
        return null;
      };
    })(this));
  };

  TeacherClassView.prototype.onClickExportStudentProgress = function() {
    var c, concepts, conceptsString, counts, course, courseCounts, courseCountsMap, courseCountsString, courseID, courseLabels, courseLabelsArray, courses, csvContent, data, encodedUri, index, instance, j, k, l, language, len, len1, len2, len3, len4, len5, len6, len7, len8, len9, level, levelCourseIdMap, levelPracticeMap, levels, m, n, name, o, p, playtime, playtimeString, progress, q, r, ref, ref1, ref10, ref11, ref12, ref13, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, session, student, t, trimCourse, trimLevel;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Class Export CSV', {
        category: 'Teachers',
        classroomID: this.classroom.id
      }, ['Mixpanel']);
    }
    courseLabels = "";
    courses = (function() {
      var j, len, ref1, results;
      ref1 = this.sortedCourses;
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        c = ref1[j];
        results.push(this.courses.get(c._id));
      }
      return results;
    }).call(this);
    courseLabelsArray = helper.courseLabelsArray(courses);
    for (index = j = 0, len = courses.length; j < len; index = ++j) {
      course = courses[index];
      courseLabels += courseLabelsArray[index] + " Levels," + courseLabelsArray[index] + " Playtime,";
    }
    csvContent = "data:text/csv;charset=utf-8,Name,Username,Email,Total Levels, Total Playtime," + courseLabels + "Concepts\n";
    levelCourseIdMap = {};
    levelPracticeMap = {};
    language = (ref1 = this.classroom.get('aceConfig')) != null ? ref1.language : void 0;
    ref2 = this.classroom.get('courses');
    for (k = 0, len1 = ref2.length; k < len1; k++) {
      trimCourse = ref2[k];
      ref3 = trimCourse.levels;
      for (l = 0, len2 = ref3.length; l < len2; l++) {
        trimLevel = ref3[l];
        if (language && trimLevel.primerLanguage === language) {
          continue;
        }
        if (trimLevel.practice) {
          levelPracticeMap[trimLevel.original] = true;
          continue;
        }
        levelCourseIdMap[trimLevel.original] = trimCourse._id;
      }
    }
    ref4 = this.students.models;
    for (m = 0, len3 = ref4.length; m < len3; m++) {
      student = ref4[m];
      concepts = [];
      ref5 = this.classroom.get('courses');
      for (n = 0, len4 = ref5.length; n < len4; n++) {
        trimCourse = ref5[n];
        course = this.courses.get(trimCourse._id);
        instance = this.courseInstances.findWhere({
          courseID: course.id,
          classroomID: this.classroom.id
        });
        if (instance && instance.hasMember(student)) {
          ref6 = trimCourse.levels;
          for (o = 0, len5 = ref6.length; o < len5; o++) {
            trimLevel = ref6[o];
            level = this.levels.findWhere({
              original: trimLevel.original
            });
            progress = this.state.get('progressData').get({
              classroom: this.classroom,
              course: course,
              level: level,
              user: student
            });
            if (progress != null ? progress.completed : void 0) {
              concepts.push((ref7 = level.get('concepts')) != null ? ref7 : []);
            }
          }
        }
      }
      concepts = _.union(_.flatten(concepts));
      conceptsString = _.map(concepts, function(c) {
        return $.i18n.t("concepts." + c);
      }).join(', ');
      courseCountsMap = {};
      levels = 0;
      playtime = 0;
      ref8 = this.classroom.sessions.models;
      for (p = 0, len6 = ref8.length; p < len6; p++) {
        session = ref8[p];
        if (session.get('creator') !== student.id) {
          continue;
        }
        if (!((ref9 = session.get('state')) != null ? ref9.complete : void 0)) {
          continue;
        }
        if (levelPracticeMap[(ref10 = session.get('level')) != null ? ref10.original : void 0]) {
          continue;
        }
        levels++;
        playtime += session.get('playtime') || 0;
        if (courseID = levelCourseIdMap[(ref11 = session.get('level')) != null ? ref11.original : void 0]) {
          if (courseCountsMap[courseID] == null) {
            courseCountsMap[courseID] = {
              levels: 0,
              playtime: 0
            };
          }
          courseCountsMap[courseID].levels++;
          courseCountsMap[courseID].playtime += session.get('playtime') || 0;
        }
      }
      playtimeString = playtime === 0 ? "0" : moment.duration(playtime, 'seconds').humanize();
      ref12 = this.sortedCourses;
      for (q = 0, len7 = ref12.length; q < len7; q++) {
        course = ref12[q];
        if (courseCountsMap[name = course._id] == null) {
          courseCountsMap[name] = {
            levels: 0,
            playtime: 0
          };
        }
      }
      courseCounts = [];
      ref13 = this.sortedCourses;
      for (r = 0, len8 = ref13.length; r < len8; r++) {
        course = ref13[r];
        courseID = course._id;
        data = courseCountsMap[courseID];
        courseCounts.push({
          id: courseID,
          levels: data.levels,
          playtime: data.playtime
        });
      }
      utils.sortCourses(courseCounts);
      courseCountsString = "";
      for (index = t = 0, len9 = courseCounts.length; t < len9; index = ++t) {
        counts = courseCounts[index];
        courseCountsString += counts.levels + ",";
        if (counts.playtime === 0) {
          courseCountsString += "0,";
        } else {
          courseCountsString += (moment.duration(counts.playtime, 'seconds').humanize()) + ",";
        }
      }
      csvContent += (student.broadName()) + "," + (student.get('name')) + "," + (student.get('email') || '') + "," + levels + "," + playtimeString + "," + courseCountsString + "\"" + conceptsString + "\"\n";
    }
    csvContent = csvContent.substring(0, csvContent.length - 1);
    encodedUri = encodeURI(csvContent);
    return window.open(encodedUri);
  };

  TeacherClassView.prototype.onClickAssignStudentButton = function(e) {
    var courseID, members, ref, user, userID;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    userID = $(e.currentTarget).data('user-id');
    user = this.students.get(userID);
    members = [userID];
    courseID = $(e.currentTarget).data('course-id');
    this.assignCourse(courseID, members);
    return (ref = window.tracker) != null ? ref.trackEvent('Teachers Class Students Assign Selected', {
      category: 'Teachers',
      classroomID: this.classroom.id,
      courseID: courseID,
      userID: userID
    }, ['Mixpanel']) : void 0;
  };

  TeacherClassView.prototype.onClickBulkAssign = function() {
    var assigningToNobody, courseID, ref, selectedIDs;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    courseID = this.$('.bulk-course-select').val();
    selectedIDs = this.getSelectedStudentIDs();
    assigningToNobody = selectedIDs.length === 0;
    this.state.set({
      errors: {
        assigningToNobody: assigningToNobody
      }
    });
    if (assigningToNobody) {
      return;
    }
    this.assignCourse(courseID, selectedIDs);
    return (ref = window.tracker) != null ? ref.trackEvent('Teachers Class Students Assign Selected', {
      category: 'Teachers',
      classroomID: this.classroom.id,
      courseID: courseID
    }, ['Mixpanel']) : void 0;
  };

  TeacherClassView.prototype.assignCourse = function(courseID, members) {
    var courseInstance, numberEnrolled, remainingSpots;
    if (me.id !== this.classroom.get('ownerID')) {
      return;
    }
    courseInstance = null;
    numberEnrolled = 0;
    remainingSpots = 0;
    return Promise.resolve().then((function(_this) {
      return function() {
        courseInstance = _this.courseInstances.findWhere({
          courseID: courseID,
          classroomID: _this.classroom.id
        });
        if (!courseInstance) {
          courseInstance = new CourseInstance({
            courseID: courseID,
            classroomID: _this.classroom.id,
            ownerID: _this.classroom.get('ownerID'),
            aceConfig: {}
          });
          courseInstance.notyErrors = false;
          _this.courseInstances.add(courseInstance);
          return courseInstance.save();
        }
      };
    })(this)).then((function(_this) {
      return function() {
        var availableFullLicenses, availablePrepaids, canAssignCourses, error, i, j, k, len, len1, modal, numFullLicensesAvailable, numStudentsWithoutFullLicenses, prepaid, ref, requests, totalSpotsAvailable, unenrolledStudents, user;
        availablePrepaids = _this.prepaids.filter(function(prepaid) {
          return prepaid.status() === 'available' && prepaid.includesCourse(courseID);
        });
        unenrolledStudents = _(members).map(function(userID) {
          return _this.students.get(userID);
        }).filter(function(user) {
          return !user.isEnrolled() || !user.prepaidIncludesCourse(courseID);
        }).value();
        totalSpotsAvailable = _.reduce((function() {
          var j, len, results;
          results = [];
          for (j = 0, len = availablePrepaids.length; j < len; j++) {
            prepaid = availablePrepaids[j];
            results.push(prepaid.openSpots());
          }
          return results;
        })(), function(val, total) {
          return val + total;
        }) || 0;
        canAssignCourses = totalSpotsAvailable >= _.size(unenrolledStudents);
        if (!canAssignCourses) {
          availableFullLicenses = _this.prepaids.filter(function(prepaid) {
            return prepaid.status() === 'available' && prepaid.get('type') === 'course';
          });
          numStudentsWithoutFullLicenses = _(members).map(function(userID) {
            return _this.students.get(userID);
          }).filter(function(user) {
            return user.prepaidType() !== 'course' || !user.isEnrolled();
          }).size();
          numFullLicensesAvailable = _.reduce((function() {
            var j, len, results;
            results = [];
            for (j = 0, len = availableFullLicenses.length; j < len; j++) {
              prepaid = availableFullLicenses[j];
              results.push(prepaid.openSpots());
            }
            return results;
          })(), function(val, total) {
            return val + total;
          }) || 0;
          modal = new CoursesNotAssignedModal({
            selected: members.length,
            numStudentsWithoutFullLicenses: numStudentsWithoutFullLicenses,
            numFullLicensesAvailable: numFullLicensesAvailable,
            courseID: courseID
          });
          _this.openModalView(modal);
          error = new Error('Not enough licenses available');
          error.handled = true;
          throw error;
        }
        numberEnrolled = _.size(unenrolledStudents);
        remainingSpots = totalSpotsAvailable - numberEnrolled;
        requests = [];
        for (j = 0, len = availablePrepaids.length; j < len; j++) {
          prepaid = availablePrepaids[j];
          ref = _.range(prepaid.openSpots());
          for (k = 0, len1 = ref.length; k < len1; k++) {
            i = ref[k];
            if (!(_.size(unenrolledStudents) > 0)) {
              break;
            }
            user = unenrolledStudents.shift();
            requests.push(prepaid.redeem(user));
          }
        }
        _this.trigger('begin-redeem-for-assign-course');
        return $.when.apply($, requests);
      };
    })(this)).then((function(_this) {
      return function() {
        _this.prepaids.fetchByCreator(me.id);
        _this.students.fetchForClassroom(_this.classroom, {
          removeDeleted: true
        });
        _this.trigger('begin-assign-course');
        if (members.length) {
          noty({
            text: $.i18n.t('teacher.assigning_course'),
            layout: 'center',
            type: 'information',
            killer: true
          });
          return courseInstance.addMembers(members);
        }
      };
    })(this)).then((function(_this) {
      return function() {
        var course, lines;
        course = _this.courses.get(courseID);
        lines = [$.i18n.t('teacher.assigned_msg_1').replace('{{numberAssigned}}', members.length).replace('{{courseName}}', course.get('name'))];
        if (numberEnrolled > 0) {
          lines.push($.i18n.t('teacher.assigned_msg_2').replace('{{numberEnrolled}}', numberEnrolled));
          lines.push($.i18n.t('teacher.assigned_msg_3').replace('{{remainingSpots}}', remainingSpots));
        }
        noty({
          text: lines.join('<br />'),
          layout: 'center',
          type: 'information',
          killer: true,
          timeout: 5000
        });
        _this.calculateProgressAndLevels();
        return _this.classroom.fetch();
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        var ref, text;
        if (e.handled) {
          return;
        }
        if (e instanceof Error && !application.isProduction()) {
          throw e;
        }
        text = e instanceof Error ? 'Runtime error' : ((ref = e.responseJSON) != null ? ref.message : void 0) || e.message || $.i18n.t('loading_error.unknown');
        return noty({
          text: text,
          layout: 'center',
          type: 'error',
          killer: true,
          timeout: 5000
        });
      };
    })(this));
  };

  TeacherClassView.prototype.onClickSelectAll = function(e) {
    var checkboxStates, studentID;
    e.preventDefault();
    checkboxStates = _.clone(this.state.get('checkboxStates'));
    if (_.all(checkboxStates)) {
      for (studentID in checkboxStates) {
        checkboxStates[studentID] = false;
      }
    } else {
      for (studentID in checkboxStates) {
        checkboxStates[studentID] = true;
      }
    }
    return this.state.set({
      checkboxStates: checkboxStates
    });
  };

  TeacherClassView.prototype.onClickStudentCheckbox = function(e) {
    var checkbox, checkboxStates, studentID;
    e.preventDefault();
    checkbox = $(e.currentTarget).find('input');
    studentID = checkbox.data('student-id');
    checkboxStates = _.clone(this.state.get('checkboxStates'));
    checkboxStates[studentID] = !checkboxStates[studentID];
    return this.state.set({
      checkboxStates: checkboxStates
    });
  };

  TeacherClassView.prototype.calculateClassStats = function() {
    var completeSessions, enrolledUsers, j, k, language, len, len1, level, levelIncludeMap, playtime, pt, ref, ref1, ref2, ref3, session, stats, total;
    if (!(((ref = this.classroom.sessions) != null ? ref.loaded : void 0) && this.students.loaded)) {
      return {};
    }
    stats = {};
    playtime = 0;
    total = 0;
    ref1 = this.classroom.sessions.models;
    for (j = 0, len = ref1.length; j < len; j++) {
      session = ref1[j];
      pt = session.get('playtime') || 0;
      playtime += pt;
      total += 1;
    }
    stats.averagePlaytime = playtime && total ? moment.duration(playtime / total, "seconds").humanize() : 0;
    stats.totalPlaytime = playtime ? moment.duration(playtime, "seconds").humanize() : 0;
    levelIncludeMap = {};
    language = (ref2 = this.classroom.get('aceConfig')) != null ? ref2.language : void 0;
    ref3 = this.levels.models;
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      level = ref3[k];
      levelIncludeMap[level.get('original')] = !level.get('practice') && ((language == null) || level.get('primerLanguage') !== language);
    }
    completeSessions = this.classroom.sessions.filter(function(s) {
      var ref4, ref5;
      return ((ref4 = s.get('state')) != null ? ref4.complete : void 0) && levelIncludeMap[(ref5 = s.get('level')) != null ? ref5.original : void 0];
    });
    stats.averageLevelsComplete = this.students.size() ? (_.size(completeSessions) / this.students.size()).toFixed(1) : 'N/A';
    stats.totalLevelsComplete = _.size(completeSessions);
    enrolledUsers = this.students.filter(function(user) {
      return user.isEnrolled();
    });
    stats.enrolledUsers = _.size(enrolledUsers);
    return stats;
  };

  TeacherClassView.prototype.studentStatusString = function(student) {
    var expires, ref, status, string;
    status = student.prepaidStatus();
    expires = (ref = student.get('coursePrepaid')) != null ? ref.endDate : void 0;
    string = (function() {
      switch (status) {
        case 'not-enrolled':
          return $.i18n.t('teacher.status_not_enrolled');
        case 'enrolled':
          if (expires) {
            return $.i18n.t('teacher.status_enrolled');
          } else {
            return '-';
          }
        case 'expired':
          return $.i18n.t('teacher.status_expired');
      }
    })();
    return string.replace('{{date}}', moment(expires).utc().format('l'));
  };

  return TeacherClassView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/TeacherClassView.js.map