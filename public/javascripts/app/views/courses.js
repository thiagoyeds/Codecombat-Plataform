require.register("templates/courses/activate-licenses-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,state = locals_.state,paid = locals_.paid;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"clearfix\"></div><div class=\"text-center\"><h1 data-i18n=\"teacher.apply_licenses\"></h1><h2 data-i18n=\"courses.grants_lifetime_access\"></h2></div></div><div class=\"modal-body\">");
var numToEnroll = state.get('visibleSelectedUsers').length
var unusedEnrollments = view.prepaids.totalMaxRedeemers() - view.prepaids.totalRedeemers()
var tooManySelected = numToEnroll > unusedEnrollments
var noneSelected = numToEnroll == 0
if ( view.classrooms.length > 1)
{
buf.push("<div class=\"row\"><div class=\"col-sm-10 col-sm-offset-1\"><div class=\"text-center m-b-3\"><div class=\"small color-navy\"><span data-i18n=\"teacher.show_students_from\"></span><span class=\"spr\">:</span></div><select class=\"classroom-select\">");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((view.classroom ? classroom.id === view.classroom.id : false)), 'value':(classroom.id) }, {"selected":true,"value":true})) + ">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((view.classroom ? classroom.id === view.classroom.id : false)), 'value':(classroom.id) }, {"selected":true,"value":true})) + ">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("<option" + (jade.attrs({ 'selected':((!view.classroom)), 'value':(''), 'data-i18n':('teacher.all_students') }, {"selected":true,"value":true,"data-i18n":true})) + "></option></select></div></div></div>");
}
buf.push("<form class=\"form m-t-3\"><span data-i18n=\"teacher.apply_licenses_to_the_following_students\"></span><span>:</span><div class=\"well form-group\">");
var enrolledUsers = view.users.filter(function(user){ return user.isEnrolled() })
var unenrolledUsers = view.users.filter(function(user){ return !user.isEnrolled() })
// iterate unenrolledUsers
;(function(){
  var $$obj = unenrolledUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(false), 'checked':(selected), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(false), 'checked':(selected), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

if ( enrolledUsers.length > 0)
{
buf.push("<div class=\"small-details m-t-3\"><span data-i18n=\"teacher.students_have_licenses\"></span></div>");
}
// iterate enrolledUsers
;(function(){
  var $$obj = enrolledUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(true), 'checked':(true), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(true), 'checked':(true), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

buf.push("</div>");
if ( state.get('error'))
{
buf.push("<div class=\"alert alert-danger\">" + (jade.escape(null == (jade.interp = state.get('error')) ? "" : jade.interp)) + "</div>");
}
buf.push("<div id=\"submit-form-area\" class=\"text-center\"><p" + (jade.attrs({ "class": [('small-details'),('not-enough-enrollments'),((tooManySelected ? 'visible' : ''))] }, {"class":true})) + "><span data-i18n=\"teacher.not_enough_enrollments\"></span></p><p class=\"small-details\"><span data-i18n=\"courses.enrollment_credits_available\" class=\"spr\"></span><span id=\"total-available\">" + (jade.escape(null == (jade.interp = view.prepaids.totalAvailable()) ? "" : jade.interp)) + "</span></p><p><button" + (jade.attrs({ 'id':('activate-licenses-btn'), 'type':("submit"), "class": [('btn'),('btn-lg'),('btn-primary'),((tooManySelected || noneSelected ? 'disabled' : ''))] }, {"class":true,"type":true})) + "><span data-i18n=\"teacher.apply_licenses\"></span> (<span id=\"total-selected-span\">" + (jade.escape(null == (jade.interp = numToEnroll) ? "" : jade.interp)) + "</span>)</button></p><p><a id=\"get-more-licenses-btn\" href=\"/teachers/licenses\" data-i18n=\"courses.get_enrollments\" class=\"btn btn-lg btn-primary-alt\"></a></p></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div>");;return buf.join("");
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

;require.register("templates/courses/change-course-language-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"courses.change_language\"></h3><div class=\"clearfix\"></div></div><div class=\"modal-body\"><div id=\"choice-area\" class=\"text-center\">");
var currentLanguage = (me.get('aceConfig') || {}).language || 'python';
buf.push("<button data-language=\"python\" class=\"lang-choice-btn btn btn-success btn-lg\">");
if ( currentLanguage === 'python')
{
buf.push("<span data-i18n=\"courses.keep_using\" class=\"spr\"></span><span>Python</span>");
}
else
{
buf.push("<span data-i18n=\"courses.switch_to\" class=\"spr\"></span><span>Python</span>");
}
buf.push("</button><p><span class=\"spr\">-</span><span data-i18n=\"general.or\" class=\"text-uppercase\"></span><span class=\"spl\">-</span></p><button data-language=\"javascript\" class=\"lang-choice-btn btn btn-default\">");
if ( currentLanguage === 'javascript')
{
buf.push("<span data-i18n=\"courses.keep_using\" class=\"spr\"></span><span>JavaScript</span>");
}
else
{
buf.push("<span data-i18n=\"courses.switch_to\" class=\"spr\"></span><span>JavaScript</span>");
}
buf.push("</button></div><div id=\"saving-progress\" class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div></div>");;return buf.join("");
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

;require.register("templates/courses/choose-language-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"clearfix\"></div><div class=\"text-center\"><h2 data-i18n=\"courses.greetings\" class=\"modal-title\"></h2><h3 data-i18n=\"choose_hero.programming_language_description\"></h3></div></div><div class=\"modal-body\"><div id=\"choice-area\" class=\"text-center\"><button data-language=\"python\" class=\"lang-choice-btn btn btn-success btn-lg\"><img src=\"/images/common/code_languages/python_small.png\"/><span class=\"spl\">Python</span></button><p data-i18n=\"choose_hero.python_blurb\"></p><button data-language=\"javascript\" class=\"lang-choice-btn btn btn-default\"><img src=\"/images/common/code_languages/javascript_small.png\"/><span class=\"spl\">JavaScript</span></button><p data-i18n=\"choose_hero.javascript_blurb\"></p></div><div id=\"saving-progress\" class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div></div>");;return buf.join("");
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

;require.register("templates/courses/classroom-level-popover", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),session = locals_.session,i = locals_.i,level = locals_.level,moment = locals_.moment,canViewSolution = locals_.canViewSolution;var completed = session && session.get('state') && session.get('state').complete;
buf.push("<h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.get('name').replace('Course: ', '')) == null ? '' : jade.interp)) + "</h3>");
if ( session)
{
buf.push("<p><span data-i18n=\"courses.play_time\" class=\"spr\"></span><span>" + (jade.escape((jade.interp = moment.duration(session.get('playtime'), "seconds").humanize()) == null ? '' : jade.interp)) + "</span></p><p><span" + (jade.attrs({ 'data-i18n':(completed ? "courses.completed" : "clans.last_played"), "class": [('spr')] }, {"data-i18n":true})) + "></span><span>" + (jade.escape((jade.interp = moment(session.get('changed')).format('MMMM Do YYYY, h:mm:ss a')) == null ? '' : jade.interp)) + "</span></p>");
}
if ( session && canViewSolution)
{
buf.push("<strong" + (jade.attrs({ 'data-i18n':(completed ? "clans.view_solution" : "clans.view_attempt") }, {"data-i18n":true})) + "></strong>");
};return buf.join("");
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

;require.register("templates/courses/classroom-settings-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,_ = locals_._,me = locals_.me;var ageRange_mixin = function(name){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<select" + (jade.attrs({ 'name':(name), 'value':(view.classroom.get(name)), "class": [('age-range-select'),('form-control')] }, {"name":true,"value":true})) + "><option value=\"\">-</option><option value=\"&lt;6\" data-i18n=\"courses.student_age_range_younger\"></option>");
// iterate _.range(6,18)
;(function(){
  var $$obj = _.range(6,18);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("<option value=\"18\" data-i18n=\"courses.student_age_range_older\"></option></select>");
};
buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.classroom.isNew())
{
buf.push("<h3 data-i18n=\"courses.create_new_class\" class=\"modal-title\"></h3>");
}
else
{
buf.push("<h3 data-i18n=\"courses.edit_settings1\" class=\"modal-title\"></h3>");
}
buf.push("</div><div class=\"modal-body\"><form><div class=\"form-group\"><label data-i18n=\"courses.class_name\"></label><input" + (jade.attrs({ 'id':('name-input'), 'name':("name"), 'type':('text'), 'value':(view.classroom.get('name')), "class": [('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div><div class=\"form-group\"><label><span data-i18n=\"general.description\"></span><i data-i18n=\"signup.optional\" class=\"spl text-muted\"></i></label><textarea name=\"description\" rows=\"2\" class=\"form-control\">" + (jade.escape(null == (jade.interp = view.classroom.get('description')) ? "" : jade.interp)) + "</textarea></div><div class=\"form-group\"><label data-i18n=\"choose_hero.programming_language\"></label>");
var aceConfig = view.classroom.get('aceConfig') || {};
var languageDisabled = !!_.size(view.classroom.get('members'));
buf.push("<div data-i18n=\"courses.language_cannot_change\" class=\"help-block small text-navy\"></div><select" + (jade.attrs({ 'id':('programming-language-select'), 'name':("language"), 'value':(aceConfig.language), 'disabled':(languageDisabled), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + ">");
var aceConfig = view.classroom.get('aceConfig') || {};
buf.push("<option value=\"\" data-i18n=\"courses.language_select\"></option><option value=\"python\">Python</option><option value=\"javascript\">JavaScript</option></select></div><div class=\"form-group\"><label><span data-i18n=\"courses.avg_student_exp_label\"></span><i data-i18n=\"signup.optional\" class=\"spl text-muted\"></i></label><div data-i18n=\"courses.avg_student_exp_desc\" class=\"help-block small text-navy\"></div><select" + (jade.attrs({ 'name':("averageStudentExp"), 'value':(view.classroom.get('averageStudentExp')), "class": [('form-control')] }, {"name":true,"value":true})) + "><option value=\"\" data-i18n=\"courses.avg_student_exp_select\"></option><option value=\"none\" data-i18n=\"courses.avg_student_exp_none\"></option><option value=\"beginner\" data-i18n=\"courses.avg_student_exp_beginner\"></option><option value=\"intermediate\" data-i18n=\"courses.avg_student_exp_intermediate\"></option><option value=\"advanced\" data-i18n=\"courses.avg_student_exp_advanced\"></option><option value=\"varied\" data-i18n=\"courses.avg_student_exp_varied\"></option></select></div><div class=\"form-group\"><label><span data-i18n=\"courses.student_age_range_label\"></span><i data-i18n=\"signup.optional\" class=\"spl text-muted\"></i></label><div>");
ageRange_mixin("ageRangeMin");
buf.push("<span data-i18n=\"courses.student_age_range_to\" class=\"spl spr\"></span>");
ageRange_mixin("ageRangeMax");
buf.push("</div>");
var ageRange_mixin = function(name){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<select" + (jade.attrs({ 'name':(name), 'value':(view.classroom.get(name)), "class": [('age-range-select'),('form-control')] }, {"name":true,"value":true})) + "><option value=\"\">-</option><option value=\"&lt;6\" data-i18n=\"courses.student_age_range_younger\"></option>");
// iterate _.range(6,18)
;(function(){
  var $$obj = _.range(6,18);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("<option value=\"18\" data-i18n=\"courses.student_age_range_older\"></option></select>");
};
buf.push("</div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div class=\"text-center\">");
if ( view.classroom.isNew())
{
buf.push("<button id=\"save-settings-btn\" data-i18n=\"courses.create_class\" class=\"btn btn-primary btn-lg\"></button>");
}
else
{
buf.push("<button id=\"save-settings-btn\" data-i18n=\"common.save_changes\" class=\"btn btn-primary btn-lg\"></button>");
}
if ( me.isAdmin())
{
buf.push("<hr/><!-- DNT--><h3>Admin Only</h3><button id=\"update-courses-btn\" class=\"btn btn-forest btn-lg\">Update Courses</button>");
}
buf.push("</div></div></div></div>");;return buf.join("");
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

;require.register("templates/courses/classroom-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,_ = locals_._,i18n = locals_.i18n,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a><a href=\"/community\" data-i18n=\"nav.community\"></a>");
if ( me.get('anonymous') === false)
{
buf.push("<span class=\"dropdown\"><button href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-sm header-font dropdown-toggle\">");
if ( me.get('photoURL'))
{
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(18)), 'alt':(""), "class": [('account-settings-image')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<i class=\"glyphicon glyphicon-user\"></i>");
}
buf.push("<span data-i18n=\"nav.account\" href=\"/account\" class=\"spl spr\"></span><span class=\"caret\"></span></button><ul role=\"menu\" class=\"dropdown-menu\"><li class=\"user-dropdown-header\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><div" + (jade.attrs({ 'style':("background-image: url(" + (me.getPhotoURL()) + ")"), "class": [('img-circle')] }, {"style":true})) + "></div></a><h3>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h3></li><li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
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
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li></ul></span>");
}
else
{
buf.push("<button data-i18n=\"login.sign_up\" class=\"btn btn-sm btn-primary header-font signup-button\"></button><button data-i18n=\"login.log_in\" class=\"btn btn-sm btn-default header-font login-button\"></button>");
}
}
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\">");
if ( !me.isAnonymous() && me.isTeacher())
{
buf.push("<div class=\"alert alert-danger text-center\"><!-- DNT: Temporary--><h3>ATTENTION TEACHERS:</h3><p>We are transitioning to a new classroom management system; this page will soon be student-only.</p><a href=\"/teachers/classes\">Go to teachers area.</a></div>");
}
var isOwner = view.classroom ? view.classroom.get('ownerID') === me.id : false;
if ( isOwner)
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"courses.back_classrooms\"></a>");
}
else
{
buf.push("<a href=\"/students\" data-i18n=\"courses.back_courses\"></a>");
}
if ( !me.isAnonymous())
{
buf.push("<h1><span class=\"spr\">" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span>");
if ( isOwner)
{
buf.push("<a id=\"edit-class-details-link\"><small data-i18n=\"courses.edit_details\"></small></a>");
}
buf.push("</h1>");
if ( view.classroom.get('description'))
{
buf.push("<p>" + (jade.escape(null == (jade.interp = view.classroom.get('description')) ? "" : jade.interp)) + "</p>");
}
buf.push("<h3 data-i18n=\"courses.stats\"></h3><table class=\"progress-stats-container\">");
var stats = view.classStats()
buf.push("<tr><td data-i18n=\"courses.total_students\"></td><td><span class=\"spr\">" + (jade.escape(null == (jade.interp = _.size(view.classroom.get('members'))) ? "" : jade.interp)) + "</span></td></tr><tr><td data-i18n=\"courses.average_time\"></td><td>" + (jade.escape(null == (jade.interp = stats.averagePlaytime) ? "" : jade.interp)) + "</td></tr><tr><td data-i18n=\"courses.total_time\"></td><td>" + (jade.escape(null == (jade.interp = stats.totalPlaytime) ? "" : jade.interp)) + "</td></tr><tr><td data-i18n=\"courses.average_levels\"></td><td>" + (jade.escape(null == (jade.interp = stats.averageLevelsComplete) ? "" : jade.interp)) + "</td></tr><tr><td data-i18n=\"courses.total_levels\"></td><td>" + (jade.escape(null == (jade.interp = stats.totalLevelsComplete) ? "" : jade.interp)) + "</td></tr></table><h1><span data-i18n=\"courses.students\"></span>");
if ( view.teacherMode)
{
buf.push("<div id=\"main-button-area\" class=\"pull-right\"><button id=\"add-students-btn\" data-i18n=\"courses.add_students\" class=\"btn btn-primary text-uppercase\"></button><button id=\"activate-licenses-btn\" data-i18n=\"courses.enroll_paid\" class=\"btn btn-info text-uppercase\"></button><a" + (jade.attrs({ 'href':("/courses/purchase?from-classroom="+view.classroom.id), 'data-i18n':("courses.purchase_enrollments"), "class": [('btn'),('btn-success'),('text-uppercase')] }, {"href":true,"data-i18n":true})) + "></a></div>");
}
buf.push("</h1><hr/>");
// iterate view.users.models
;(function(){
  var $$obj = view.users.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

buf.push("<div class=\"row\"><div class=\"col-md-6\"><div class=\"student-name\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</div></div><div class=\"col-md-6\">");
if ( view.teacherMode)
{
buf.push("<a" + (jade.attrs({ 'data-user-id':(user.id), "class": [('remove-student-link'),('pull-right'),('text-uppercase')] }, {"data-user-id":true})) + "><span class=\"glyphicon glyphicon-remove\"></span><span data-i18n=\"courses.remove_student\" class=\"spl\"></span></a>");
}
buf.push("</div></div>");
var lastPlayedString = view.userLastPlayedString(user);
var playtime = view.userPlaytimeString(user);
if ( lastPlayedString || playtime)
{
buf.push("<div id=\"student-stats-row\" class=\"row\">");
if ( lastPlayedString)
{
buf.push("<div class=\"col-sm-6\"><span data-i18n=\"user.last_played\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = lastPlayedString) ? "" : jade.interp)) + "</span></div>");
}
if ( playtime)
{
buf.push("<div class=\"col-sm-6\"><span data-i18n=\"clans.playtime\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = playtime) ? "" : jade.interp)) + "</span></div>");
}
buf.push("</div>");
}
var paidFor = user.isEnrolled();
// iterate view.courseInstances.models
;(function(){
  var $$obj = view.courseInstances.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var courseInstance = $$obj[$index];

var inCourse = _.contains(courseInstance.get('members'), user.id);
if ( !(inCourse || view.teacherMode))
{
continue;
}
var course = view.courses.get(courseInstance.get('courseID'));
var sessions = courseInstance.sessionsByUser[user.id] || [];
if ( !(course.get('free') || paidFor))
{
continue;
}
if ( inCourse)
{
buf.push("<div class=\"row\"><div class=\"col-sm-3 text-right\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">");
if ( inCourse)
{
var levels = view.classroom.getLevels({courseID: course.id});
var numLevels = levels.size();
var sessionMap = _.zipObject(_.map(sessions, function(s) { return s.get('level').original; }), sessions);
var levelCellWidth = 100.00;
if ( numLevels > 0)
{
levelCellWidth = 100.00 / numLevels;
}
var css = "width:"+levelCellWidth+"%;"
var i = 0;
buf.push("<div class=\"progress\">");
// iterate levels.models
;(function(){
  var $$obj = levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div></div>");
}
else if ( paidFor)
{
buf.push("<div class=\"text-center\"><button" + (jade.attrs({ 'data-user-id':(user.id), 'data-course-instance-cid':(courseInstance.cid), "class": [('enable-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true,"data-course-instance-cid":true})) + "><span data-i18n=\"courses.assign\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span></button></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var courseInstance = $$obj[$index];

var inCourse = _.contains(courseInstance.get('members'), user.id);
if ( !(inCourse || view.teacherMode))
{
continue;
}
var course = view.courses.get(courseInstance.get('courseID'));
var sessions = courseInstance.sessionsByUser[user.id] || [];
if ( !(course.get('free') || paidFor))
{
continue;
}
if ( inCourse)
{
buf.push("<div class=\"row\"><div class=\"col-sm-3 text-right\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">");
if ( inCourse)
{
var levels = view.classroom.getLevels({courseID: course.id});
var numLevels = levels.size();
var sessionMap = _.zipObject(_.map(sessions, function(s) { return s.get('level').original; }), sessions);
var levelCellWidth = 100.00;
if ( numLevels > 0)
{
levelCellWidth = 100.00 / numLevels;
}
var css = "width:"+levelCellWidth+"%;"
var i = 0;
buf.push("<div class=\"progress\">");
// iterate levels.models
;(function(){
  var $$obj = levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div></div>");
}
else if ( paidFor)
{
buf.push("<div class=\"text-center\"><button" + (jade.attrs({ 'data-user-id':(user.id), 'data-course-instance-cid':(courseInstance.cid), "class": [('enable-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true,"data-course-instance-cid":true})) + "><span data-i18n=\"courses.assign\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span></button></div>");
}
    }

  }
}).call(this);

if ( view.teacherMode && !paidFor)
{
buf.push("<div class=\"text-center\"><p><em><span data-i18n=\"courses.enroll\" class=\"spr\"></span><strong>" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</strong><span data-i18n=\"courses.to_assign\" class=\"spl\"></span></em></p><p><button" + (jade.attrs({ 'data-user-id':(user.id), "class": [('activate-single-license-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true})) + "><span data-i18n=\"courses.enroll\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></button></p></div>");
}
buf.push("<hr/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

buf.push("<div class=\"row\"><div class=\"col-md-6\"><div class=\"student-name\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</div></div><div class=\"col-md-6\">");
if ( view.teacherMode)
{
buf.push("<a" + (jade.attrs({ 'data-user-id':(user.id), "class": [('remove-student-link'),('pull-right'),('text-uppercase')] }, {"data-user-id":true})) + "><span class=\"glyphicon glyphicon-remove\"></span><span data-i18n=\"courses.remove_student\" class=\"spl\"></span></a>");
}
buf.push("</div></div>");
var lastPlayedString = view.userLastPlayedString(user);
var playtime = view.userPlaytimeString(user);
if ( lastPlayedString || playtime)
{
buf.push("<div id=\"student-stats-row\" class=\"row\">");
if ( lastPlayedString)
{
buf.push("<div class=\"col-sm-6\"><span data-i18n=\"user.last_played\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = lastPlayedString) ? "" : jade.interp)) + "</span></div>");
}
if ( playtime)
{
buf.push("<div class=\"col-sm-6\"><span data-i18n=\"clans.playtime\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = playtime) ? "" : jade.interp)) + "</span></div>");
}
buf.push("</div>");
}
var paidFor = user.isEnrolled();
// iterate view.courseInstances.models
;(function(){
  var $$obj = view.courseInstances.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var courseInstance = $$obj[$index];

var inCourse = _.contains(courseInstance.get('members'), user.id);
if ( !(inCourse || view.teacherMode))
{
continue;
}
var course = view.courses.get(courseInstance.get('courseID'));
var sessions = courseInstance.sessionsByUser[user.id] || [];
if ( !(course.get('free') || paidFor))
{
continue;
}
if ( inCourse)
{
buf.push("<div class=\"row\"><div class=\"col-sm-3 text-right\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">");
if ( inCourse)
{
var levels = view.classroom.getLevels({courseID: course.id});
var numLevels = levels.size();
var sessionMap = _.zipObject(_.map(sessions, function(s) { return s.get('level').original; }), sessions);
var levelCellWidth = 100.00;
if ( numLevels > 0)
{
levelCellWidth = 100.00 / numLevels;
}
var css = "width:"+levelCellWidth+"%;"
var i = 0;
buf.push("<div class=\"progress\">");
// iterate levels.models
;(function(){
  var $$obj = levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div></div>");
}
else if ( paidFor)
{
buf.push("<div class=\"text-center\"><button" + (jade.attrs({ 'data-user-id':(user.id), 'data-course-instance-cid':(courseInstance.cid), "class": [('enable-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true,"data-course-instance-cid":true})) + "><span data-i18n=\"courses.assign\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span></button></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var courseInstance = $$obj[$index];

var inCourse = _.contains(courseInstance.get('members'), user.id);
if ( !(inCourse || view.teacherMode))
{
continue;
}
var course = view.courses.get(courseInstance.get('courseID'));
var sessions = courseInstance.sessionsByUser[user.id] || [];
if ( !(course.get('free') || paidFor))
{
continue;
}
if ( inCourse)
{
buf.push("<div class=\"row\"><div class=\"col-sm-3 text-right\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">");
if ( inCourse)
{
var levels = view.classroom.getLevels({courseID: course.id});
var numLevels = levels.size();
var sessionMap = _.zipObject(_.map(sessions, function(s) { return s.get('level').original; }), sessions);
var levelCellWidth = 100.00;
if ( numLevels > 0)
{
levelCellWidth = 100.00 / numLevels;
}
var css = "width:"+levelCellWidth+"%;"
var i = 0;
buf.push("<div class=\"progress\">");
// iterate levels.models
;(function(){
  var $$obj = levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div></div>");
}
else if ( paidFor)
{
buf.push("<div class=\"text-center\"><button" + (jade.attrs({ 'data-user-id':(user.id), 'data-course-instance-cid':(courseInstance.cid), "class": [('enable-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true,"data-course-instance-cid":true})) + "><span data-i18n=\"courses.assign\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span></button></div>");
}
    }

  }
}).call(this);

if ( view.teacherMode && !paidFor)
{
buf.push("<div class=\"text-center\"><p><em><span data-i18n=\"courses.enroll\" class=\"spr\"></span><strong>" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</strong><span data-i18n=\"courses.to_assign\" class=\"spl\"></span></em></p><p><button" + (jade.attrs({ 'data-user-id':(user.id), "class": [('activate-single-license-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true})) + "><span data-i18n=\"courses.enroll\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></button></p></div>");
}
buf.push("<hr/>");
    }

  }
}).call(this);

}
buf.push("</div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( !me.isStudent())
{
buf.push("<a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a>");
}
buf.push("<a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a><a href=\"https://jobs.lever.co/codecombat\" tabindex=\"-1\" data-i18n=\"nav.careers\"></a><a href=\"/legal\" tabindex=\"-1\" data-i18n=\"nav.legal\"></a><a href=\"/privacy\" tabindex=\"-1\" data-i18n=\"legal.privacy_title\"></a><a href=\"/contribute\" tabindex=\"-1\" data-i18n=\"nav.contribute\"></a>");
if ( !me.isStudent())
{
buf.push("<a href=\"/play/ladder\" tabindex=\"-1\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
}
if ( me.isAdmin())
{
buf.push("<a href=\"/admin\">Admin</a>");
}
if ( usesSocialMedia)
{
buf.push("<div class=\"share-buttons\">");
if ( !isIE)
{
buf.push("<div data-href=\"http://codecombat.com\" data-size=\"medium\" class=\"g-plusone\"></div>");
}
buf.push("<div" + (jade.attrs({ 'data-href':("https://www.facebook.com/codecombat"), 'data-send':("false"), 'data-layout':("button_count"), 'data-width':("350"), 'data-show-faces':("true"), 'data-ref':("coco_footer_" + (fbRef) + ""), "class": [('fb-like')] }, {"data-href":true,"data-send":true,"data-layout":true,"data-width":true,"data-show-faces":true,"data-ref":true})) + "></div>");
if ( !isIE)
{
buf.push("<a href=\"https://twitter.com/CodeCombat\" data-show-count=\"true\" data-show-screen-name=\"false\" data-dnt=\"true\" data-align=\"right\" data-i18n=\"nav.twitter_follow\" class=\"twitter-follow-button\"></a><iframe src=\"https://ghbtns.com/github-btn.html?user=codecombat&amp;repo=codecombat&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\" class=\"github-star-button\"></iframe>");
}
buf.push("</div>");
}
buf.push("</div><div id=\"footer-credits\"><span><span>© All Rights Reserved</span><br/><span>CodeCombat 2015</span></span><img id=\"footer-logo\" src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><span><span>Site Design by</span><br/><a href=\"http://www.fullyillustrated.com/\">Fully Illustrated</a></span><!--a.firebase-bade(href=\"https://www.firebase.com/\")  // Not using right now--><!--  img(src=\"/images/pages/base/firebase.png\", alt=\"Powered by Firebase\")--></div></div>");;return buf.join("");
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

;require.register("templates/courses/course-details", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view,i18n = locals_.i18n;var accountLinks_mixin = function(){
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div class=\"container m-t-3\"><p><a href=\"/students\" data-i18n=\"courses.back_courses\"></a></p><p><strong>");
if ( view.courseInstance.get('name'))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = view.courseInstance.get('name')) ? "" : jade.interp)) + "</span>");
}
else if ( view.classroom.get('name'))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<span data-i18n=\"courses.unnamed_class\"></span>");
}
buf.push("</strong>");
if ( !view.owner.isNew() && view.getOwnerName() && view.courseInstance.get('name') != 'Single Player')
{
buf.push("<span class=\"spl\">-</span><span data-i18n=\"courses.teacher\" class=\"spl\"></span><span class=\"spr\">:</span><span><strong>" + (jade.escape(null == (jade.interp = view.getOwnerName()) ? "" : jade.interp)) + "</strong></span>");
}
buf.push("</p><h1>" + (jade.escape((jade.interp = i18n(view.course.attributes, 'name')) == null ? '' : jade.interp)) + "");
if ( view.courseComplete)
{
buf.push("<span class=\"spl\">-</span><span data-i18n=\"clans.complete_2\" class=\"spl\"></span><span>!</span>");
}
buf.push("</h1><p>");
if ( view.courseInstance.get('description'))
{
// iterate view.courseInstance.get('description').split('\n')
;(function(){
  var $$obj = view.courseInstance.get('description').split('\n');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

buf.push("<div>" + (jade.escape(null == (jade.interp = line) ? "" : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

buf.push("<div>" + (jade.escape(null == (jade.interp = line) ? "" : jade.interp)) + "</div>");
    }

  }
}).call(this);

}
buf.push("</p><div data-i18n=\"courses.available_levels\" class=\"available-courses-title\"></div><table class=\"table table-striped table-condensed\"><thead><tr><th></th><th data-i18n=\"clans.status\"></th><th data-i18n=\"editor.level_components_type\"></th><th data-i18n=\"resources.level\"></th><th data-i18n=\"courses.concepts\"></th></tr></thead><tbody>");
var previousLevelCompleted = true;
var lastLevelCompleted = view.getLastLevelCompleted();
var passedLastCompletedLevel = !lastLevelCompleted;
var levelCount = 0;
// iterate view.levels.models
;(function(){
  var $$obj = view.levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

var levelStatus = null;
var levelNumber = view.classroom.getLevelNumber(level.get('original'), ++levelCount);
if ( view.userLevelStateMap[me.id])
{
levelStatus = view.userLevelStateMap[me.id][level.get('original')]
}
buf.push("<tr><td>");
if ( previousLevelCompleted || !passedLastCompletedLevel || levelStatus)
{
var i18nTag = level.isType('course-ladder') ? 'play.compete' : 'common.play';
buf.push("<button" + (jade.attrs({ 'data-level-slug':(level.get('slug')), 'data-i18n':(i18nTag), 'data-level-id':(level.get('original')), "class": [('btn'),('btn-forest'),('btn-play-level')] }, {"data-level-slug":true,"data-i18n":true,"data-level-id":true})) + "></button>");
if ( level.get('shareable'))
{
var levelOriginal = level.get('original');
var session = view.levelSessions.find(function(session) { return session.get('level').original === levelOriginal });
if ( session)
{
var url = '/play/' + level.get('type') + '-level/' + level.get('slug') + '/' + session.id + '?course=' + view.courseID;
buf.push("<a" + (jade.attrs({ 'href':(url), "class": [('btn'),('btn-gold'),('btn-view-project-level')] }, {"href":true})) + ">");
if ( level.isType('game-dev'))
{
buf.push("<span data-i18n=\"sharing.game\"></span>");
}
else
{
buf.push("<span data-i18n=\"sharing.webpage\"></span>");
}
buf.push("</a>");
}
}
}
buf.push("</td><td>");
if ( view.userLevelStateMap[me.id])
{
buf.push("<div>" + (jade.escape(null == (jade.interp = view.userLevelStateMap[me.id][level.get('original')]) ? "" : jade.interp)) + "</div>");
}
buf.push("</td><td>" + (jade.escape((jade.interp = level.get('practice') ? 'practice' : 'required') == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = levelNumber) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = i18n(level.attributes, 'name').replace('Course: ', '')) == null ? '' : jade.interp)) + "</td><td>");
if ( view.levelConceptMap[level.get('original')])
{
// iterate view.course.get('concepts')
;(function(){
  var $$obj = view.course.get('concepts');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

if ( view.levelConceptMap[level.get('original')][concept])
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('concept')] }, {"data-i18n":true})) + "></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

if ( view.levelConceptMap[level.get('original')][concept])
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('concept')] }, {"data-i18n":true})) + "></span>");
}
    }

  }
}).call(this);

}
buf.push("</td>");
if ( level.get('original') === lastLevelCompleted)
{
passedLastCompletedLevel = true
}
if ( !level.get('practice'))
{
if ( view.userLevelStateMap[me.id])
{
previousLevelCompleted = view.userLevelStateMap[me.id][level.get('original')] === 'complete'
}
else
{
previousLevelCompleted = false
}
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

var levelStatus = null;
var levelNumber = view.classroom.getLevelNumber(level.get('original'), ++levelCount);
if ( view.userLevelStateMap[me.id])
{
levelStatus = view.userLevelStateMap[me.id][level.get('original')]
}
buf.push("<tr><td>");
if ( previousLevelCompleted || !passedLastCompletedLevel || levelStatus)
{
var i18nTag = level.isType('course-ladder') ? 'play.compete' : 'common.play';
buf.push("<button" + (jade.attrs({ 'data-level-slug':(level.get('slug')), 'data-i18n':(i18nTag), 'data-level-id':(level.get('original')), "class": [('btn'),('btn-forest'),('btn-play-level')] }, {"data-level-slug":true,"data-i18n":true,"data-level-id":true})) + "></button>");
if ( level.get('shareable'))
{
var levelOriginal = level.get('original');
var session = view.levelSessions.find(function(session) { return session.get('level').original === levelOriginal });
if ( session)
{
var url = '/play/' + level.get('type') + '-level/' + level.get('slug') + '/' + session.id + '?course=' + view.courseID;
buf.push("<a" + (jade.attrs({ 'href':(url), "class": [('btn'),('btn-gold'),('btn-view-project-level')] }, {"href":true})) + ">");
if ( level.isType('game-dev'))
{
buf.push("<span data-i18n=\"sharing.game\"></span>");
}
else
{
buf.push("<span data-i18n=\"sharing.webpage\"></span>");
}
buf.push("</a>");
}
}
}
buf.push("</td><td>");
if ( view.userLevelStateMap[me.id])
{
buf.push("<div>" + (jade.escape(null == (jade.interp = view.userLevelStateMap[me.id][level.get('original')]) ? "" : jade.interp)) + "</div>");
}
buf.push("</td><td>" + (jade.escape((jade.interp = level.get('practice') ? 'practice' : 'required') == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = levelNumber) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = i18n(level.attributes, 'name').replace('Course: ', '')) == null ? '' : jade.interp)) + "</td><td>");
if ( view.levelConceptMap[level.get('original')])
{
// iterate view.course.get('concepts')
;(function(){
  var $$obj = view.course.get('concepts');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

if ( view.levelConceptMap[level.get('original')][concept])
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('concept')] }, {"data-i18n":true})) + "></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

if ( view.levelConceptMap[level.get('original')][concept])
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('concept')] }, {"data-i18n":true})) + "></span>");
}
    }

  }
}).call(this);

}
buf.push("</td>");
if ( level.get('original') === lastLevelCompleted)
{
passedLastCompletedLevel = true
}
if ( !level.get('practice'))
{
if ( view.userLevelStateMap[me.id])
{
previousLevelCompleted = view.userLevelStateMap[me.id][level.get('original')] === 'complete'
}
else
{
previousLevelCompleted = false
}
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</tbody></table></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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

;require.register("templates/courses/course-enroll", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;var trial_and_questions_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<h3 data-i18n=\"courses.questions\"></h3><p><span class=\"spr\">Please contact</span><a href=\"mailto:team@codecombat.com\">team@codecombat.com</a></p>");
};
buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a><a href=\"/community\" data-i18n=\"nav.community\"></a>");
if ( me.get('anonymous') === false)
{
buf.push("<span class=\"dropdown\"><button href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-sm header-font dropdown-toggle\">");
if ( me.get('photoURL'))
{
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(18)), 'alt':(""), "class": [('account-settings-image')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<i class=\"glyphicon glyphicon-user\"></i>");
}
buf.push("<span data-i18n=\"nav.account\" href=\"/account\" class=\"spl spr\"></span><span class=\"caret\"></span></button><ul role=\"menu\" class=\"dropdown-menu\"><li class=\"user-dropdown-header\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><div" + (jade.attrs({ 'style':("background-image: url(" + (me.getPhotoURL()) + ")"), "class": [('img-circle')] }, {"style":true})) + "></div></a><h3>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h3></li><li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
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
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li></ul></span>");
}
else
{
buf.push("<button data-i18n=\"login.sign_up\" class=\"btn btn-sm btn-primary header-font signup-button\"></button><button data-i18n=\"login.log_in\" class=\"btn btn-sm btn-default header-font login-button\"></button>");
}
}
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div><span>*UNDER CONSTRUCTION, send feedback to</span><a href=\"mailto:team@codecombat.com\" class=\"spl\">team@codecombat.com</a></div><div style=\"border-bottom: 1px solid black\"></div>");
if ( view.state === 'declined' || view.state === 'unknown_error')
{
buf.push("<p><div class=\"alert alert-danger\"><span data-i18n=\"loading_error.error\" class=\"spr\"></span><span>" + (jade.escape((jade.interp = view.stateMessage) == null ? '' : jade.interp)) + "</span></div></p>");
}
if ( view.state === 'creating')
{
buf.push("<p><div data-i18n=\"courses.creating_class\" class=\"alert alert-info\"></div></p>");
}
else if ( view.state === 'purchasing')
{
buf.push("<p><div data-i18n=\"courses.purchasing_course\" class=\"alert alert-info\"></div></p>");
}
else
{
buf.push("<div class=\"well well-lg enroll-container\">");
if ( view.price > 0)
{
buf.push("<h1 data-i18n=\"courses.buy_course\" class=\"center\"></h1>");
}
else
{
buf.push("<h1 data-i18n=\"courses.create_class\" class=\"center\"></h1>");
}
buf.push("<h3><span>1.</span><span data-i18n=\"courses.course\" class=\"spl\"></span></h3>");
if ( view.courses.size() > 2)
{
buf.push("<p data-i18n=\"courses.select_all_courses\"></p>");
}
buf.push("<div class=\"form-group\"><select class=\"form-control course-select\">");
// iterate view.courses.models
;(function(){
  var $$obj = view.courses.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var course = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':("" + (course.id) + "") }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var course = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':("" + (course.id) + "") }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

if ( view.courses.size() > 1)
{
buf.push("<option value=\"All Courses\" data-i18n=\"courses.all_courses\"></option>");
}
buf.push("</select></div><div class=\"form-group\"><label data-i18n=\"choose_hero.programming_language\"></label><select id=\"programming-language-select\" class=\"form-control\"><option" + (jade.attrs({ 'value':("python"), 'selected':(view.selectedLanguage==='python') }, {"value":true,"selected":true})) + ">Python</option><option" + (jade.attrs({ 'value':("javascript"), 'selected':(view.selectedLanguage==='javascript') }, {"value":true,"selected":true})) + ">JavaScript</option></select></div>");
if ( view.price > 0)
{
buf.push("<h3><span>2.</span><span data-i18n=\"courses.number_students\" class=\"spl\"></span></h3><p data-i18n=\"courses.enter_number_students\"></p><input" + (jade.attrs({ 'type':('text'), 'value':("" + (view.seats) + ""), "class": [('input-seats')] }, {"type":true,"value":true})) + "/>");
}
buf.push("<h3>");
if ( view.price > 0)
{
buf.push("<span>3.</span>");
}
else
{
buf.push("<span>2.</span>");
}
buf.push("<span data-i18n=\"courses.name_class\" class=\"spl\"></span></h3><p data-i18n=\"courses.displayed_course_page\"></p><input" + (jade.attrs({ 'type':('text'), 'placeholder':("Mrs. Smith's 4th Period"), 'value':("" + (view.className ? view.className : '') + ""), "class": [('class-name')] }, {"type":true,"placeholder":true,"value":true})) + "/>");
if ( view.price > 0)
{
buf.push("<h3><span>4.</span><span data-i18n=\"courses.buy\" class=\"spl\">Buy</span></h3>");
}
else
{
buf.push("<h3><span>3.</span><span data-i18n=\"courses.create_class\" class=\"spl\"></span></h3>");
}
buf.push("<p>");
if ( view.price > 0)
{
buf.push("<span data-i18n=\"courses.purchasing_for\" class=\"spr\"></span>");
}
else
{
buf.push("<span data-i18n=\"courses.creating_for\" class=\"spr\"></span>");
}
buf.push("<strong class=\"spr\">" + (jade.escape((jade.interp = view.selectedCourseTitle) == null ? '' : jade.interp)) + "</strong>");
if ( view.price > 0)
{
buf.push("<span data-i18n=\"courses.for\" class=\"spr\"></span><strong><span>" + (jade.escape((jade.interp = view.seats) == null ? '' : jade.interp)) + "</span><span data-i18n=\"courses.students1\" class=\"spl\"></span></strong><span>" + (jade.escape((jade.interp = '.') == null ? '' : jade.interp)) + "</span>");
}
buf.push("</p><p data-i18n=\"courses.receive_code\"></p><p class=\"center\">");
if ( view.price > 0)
{
buf.push("<button class=\"btn btn-success btn-lg btn-buy\">$" + (jade.escape((jade.interp = (view.price / 100.0).toFixed(2)) == null ? '' : jade.interp)) + "</button>");
}
else
{
buf.push("<button data-i18n=\"courses.create_class\" class=\"btn btn-success btn-lg btn-buy\"></button>");
}
buf.push("</p>");
trial_and_questions_mixin();
buf.push("</div>");
}
buf.push("</div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( !me.isStudent())
{
buf.push("<a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a>");
}
buf.push("<a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a><a href=\"https://jobs.lever.co/codecombat\" tabindex=\"-1\" data-i18n=\"nav.careers\"></a><a href=\"/legal\" tabindex=\"-1\" data-i18n=\"nav.legal\"></a><a href=\"/privacy\" tabindex=\"-1\" data-i18n=\"legal.privacy_title\"></a><a href=\"/contribute\" tabindex=\"-1\" data-i18n=\"nav.contribute\"></a>");
if ( !me.isStudent())
{
buf.push("<a href=\"/play/ladder\" tabindex=\"-1\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
}
if ( me.isAdmin())
{
buf.push("<a href=\"/admin\">Admin</a>");
}
if ( usesSocialMedia)
{
buf.push("<div class=\"share-buttons\">");
if ( !isIE)
{
buf.push("<div data-href=\"http://codecombat.com\" data-size=\"medium\" class=\"g-plusone\"></div>");
}
buf.push("<div" + (jade.attrs({ 'data-href':("https://www.facebook.com/codecombat"), 'data-send':("false"), 'data-layout':("button_count"), 'data-width':("350"), 'data-show-faces':("true"), 'data-ref':("coco_footer_" + (fbRef) + ""), "class": [('fb-like')] }, {"data-href":true,"data-send":true,"data-layout":true,"data-width":true,"data-show-faces":true,"data-ref":true})) + "></div>");
if ( !isIE)
{
buf.push("<a href=\"https://twitter.com/CodeCombat\" data-show-count=\"true\" data-show-screen-name=\"false\" data-dnt=\"true\" data-align=\"right\" data-i18n=\"nav.twitter_follow\" class=\"twitter-follow-button\"></a><iframe src=\"https://ghbtns.com/github-btn.html?user=codecombat&amp;repo=codecombat&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\" class=\"github-star-button\"></iframe>");
}
buf.push("</div>");
}
buf.push("</div><div id=\"footer-credits\"><span><span>© All Rights Reserved</span><br/><span>CodeCombat 2015</span></span><img id=\"footer-logo\" src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><span><span>Site Design by</span><br/><a href=\"http://www.fullyillustrated.com/\">Fully Illustrated</a></span><!--a.firebase-bade(href=\"https://www.firebase.com/\")  // Not using right now--><!--  img(src=\"/images/pages/base/firebase.png\", alt=\"Powered by Firebase\")--></div></div>");;return buf.join("");
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

;require.register("templates/courses/courses-not-assigned-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h2 data-i18n=\"teacher.not_assigned_modal_title\"></h2></div><div class=\"modal-body\">");
if ( view.state.get('promoteStarterLicenses'))
{
buf.push("<p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_starter_body_1"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p><p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_starter_body_2"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p>");
}
else
{
buf.push("<p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_full_body_1"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p><p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_full_body_2"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p><p" + (jade.attrs({ 'data-i18n':("[html]teacher.not_assigned_modal_full_body_3"), 'data-i18n-options':(JSON.stringify({ supportEmail: "<a href='mailto:support@codecombat.com'>support@codecombat.com</a>" })), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\">");
if ( view.state.get('promoteStarterLicenses'))
{
buf.push("<div class=\"text-center\"><a data-i18n=\"about.learn_more\" href=\"/teachers/starter-licenses\" class=\"btn btn-navy btn-lg\"></a></div>");
}
else
{
buf.push("<button class=\"btn btn-forest btn-lg pull-left\"><span data-i18n=\"general.contact_us\"></span></button><button data-dismiss=\"modal\" class=\"btn btn-navy btn-lg pull-right\"><span data-i18n=\"general.close_window\"></span></button>");
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

;require.register("templates/courses/courses-update-account-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view;var accountLinks_mixin = function(){
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div id=\"main-content\" class=\"container\"><div class=\"row m-y-3\"><div class=\"col-xs-12\">");
if ( me.isAnonymous())
{
buf.push("<div class=\"text-center\"><h3 data-i18n=\"courses.update_account_login_title\"></h3><p data-i18n=\"courses.update_account_blurb\"></p><p><button data-i18n=\"login.log_in\" class=\"login-btn btn btn-navy\"></button></p></div>");
}
if ( !me.isAnonymous())
{
buf.push("<div class=\"text-center\"><h3 data-i18n=\"courses.update_account_title\"></h3><p data-i18n=\"courses.update_account_blurb\"></p></div><div class=\"row\"><div class=\"col-md-6\"><div class=\"text-right\">");
if ( view.accountType)
{
buf.push("<div><strong data-i18n=\"courses.update_account_current_type\"></strong></div>");
}
buf.push("<div><strong data-i18n=\"courses.update_account_account_email\"></strong></div></div></div><div class=\"col-md-6\">");
if ( view.accountType)
{
buf.push("<div>" + (jade.escape((jade.interp = view.accountType) == null ? '' : jade.interp)) + "</div>");
}
buf.push("<div><span class=\"spr\">" + (jade.escape((jade.interp = me.get('email') || me.get('name')) == null ? '' : jade.interp)) + "</span><span class=\"not_you\"><span data-i18n=\"courses.not_you\" class=\"spr\"></span><a data-i18n=\"login.log_out\" href=\"#\" class=\"logout-btn\"></a></span></div></div></div><br/><div class=\"row\"><div class=\"col-md-6\"><div style=\"background-color:white;\" class=\"well\"><div class=\"text-center\"><h4><strong data-i18n=\"courses.update_account_am_teacher\"></strong></h4><p data-i18n=\"courses.update_account_keep_access\"></p></div><div style=\"margin: 0px 20px 0px 20px; font-size: 10pt\"><div data-i18n=\"courses.update_account_teachers_can\"></div><ul><li data-i18n=\"courses.update_account_teachers_can1\"></li><li data-i18n=\"courses.update_account_teachers_can2\"></li><li data-i18n=\"courses.update_account_teachers_can3\"></li><li data-i18n=\"courses.update_account_teachers_can4\"></li></ul><div data-i18n=\"courses.update_account_teachers_warning\" class=\"warning\"></div></div><br/><div class=\"text-center\">");
if ( me.isTeacher())
{
buf.push("<button data-i18n=\"courses.update_account_remain_teacher\" class=\"remain-teacher-btn btn btn-navy\"></button>");
}
else
{
buf.push("<button data-i18n=\"courses.update_account_update_teacher\" class=\"update-teacher-btn btn btn-forest\"></button>");
}
buf.push("</div><br/></div></div><div class=\"col-md-6\"><div style=\"background-color:white;\" class=\"well\"><div class=\"text-center\"><h4><strong data-i18n=\"courses.update_account_am_student\"></strong></h4><p data-i18n=\"courses.update_account_remove_access\"></p></div><div style=\"margin: 0px 20px 0px 20px; font-size: 10pt\"><div data-i18n=\"courses.update_account_students_can\"></div><ul><li data-i18n=\"courses.update_account_students_can1\"></li><li data-i18n=\"courses.update_account_students_can2\"></li><li data-i18n=\"courses.update_account_students_can3\"></li><li data-i18n=\"courses.update_account_students_can4\"></li></ul><div data-i18n=\"courses.update_account_students_warning\" class=\"warning\"></div></div><br/><div class=\"text-center\">");
if ( me.isStudent())
{
buf.push("<button data-i18n=\"courses.update_account_remain_student\" class=\"remain-student-btn btn btn-navy\"></button>");
}
else
{
buf.push("<label><span data-i18n=\"courses.need_a_class_code\"></span><input name=\"classCode\"/></label><button data-i18n=\"courses.update_account_update_student\" class=\"update-student-btn btn btn-forest\"></button>");
}
buf.push("</div><br/></div></div></div><br/><div class=\"small text-center\"><span data-i18n=\"courses.update_account_not_sure\" class=\"spr\"></span><a href=\"mailto:team@codecombat.com\">team@codecombat.com</a></div>");
}
buf.push("</div></div></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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

;require.register("templates/courses/courses-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me,serverConfig = locals_.serverConfig,i18n = locals_.i18n;var course_instance_body_mixin = function(courseInstance, classroom){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var course = view.courses.get(courseInstance.get('courseID'));
var stats = classroom.statsForSessions(courseInstance.sessions, course.id);
if ( stats.levels.done)
{
buf.push("<div class=\"text-success\"><span class=\"glyphicon glyphicon-ok\"></span><span data-i18n=\"courses.course_complete\" class=\"spl\"></span><span>!</span></div>");
}
buf.push("<div class=\"pull-right\">");
if ( stats.levels.done)
{
var arenaLevel = stats.levels.arena;
var projectLevel = stats.levels.project;
if ( arenaLevel)
{
var url = view.urls.courseArenaLadder({level: view.originalLevelMap[arenaLevel.get('original')] || arenaLevel, courseInstance: courseInstance});
buf.push("<a" + (jade.attrs({ 'data-href':(url), 'data-level-slug':(arenaLevel.get('slug')), 'data-event-action':("Students Play Arena"), "class": [('play-btn'),('btn'),('btn-forest-alt'),('btn-lg'),('m-b-1')] }, {"data-href":true,"data-level-slug":true,"data-event-action":true})) + "><span data-i18n=\"courses.play_arena\"></span></a>");
}
else if ( projectLevel)
{
var url = view.urls.courseLevel({level: view.originalLevelMap[projectLevel.get('original')] || projectLevel, courseInstance: courseInstance});
buf.push("<a" + (jade.attrs({ 'data-href':(url), 'data-level-slug':(projectLevel.get('slug')), 'data-event-action':("Students Play Project"), "class": [('play-btn'),('btn'),('btn-forest-alt'),('btn-lg'),('m-b-1')] }, {"data-href":true,"data-level-slug":true,"data-event-action":true})) + "><span data-i18n=\"courses.view_project\"></span></a>");
}
else
{
buf.push("<a disabled=\"disabled\" data-i18n=\"courses.course_complete\" class=\"btn btn-default btn-lg m-b-1\"></a>");
}
}
else if ( stats.levels.next != stats.levels.first)
{
var next = stats.levels.next;
var url = view.urls.courseLevel({level: view.originalLevelMap[next.get('original')] || next, courseInstance: courseInstance});
buf.push("<a" + (jade.attrs({ 'data-href':(url), 'data-level-slug':(next.get('slug')), 'data-event-action':("Students Continue Course"), "class": [('play-btn'),('btn'),('btn-forest'),('btn-lg'),('m-b-1')] }, {"data-href":true,"data-level-slug":true,"data-event-action":true})) + "><span data-i18n=\"common.continue\"></span></a>");
}
else
{
var firstLevel = stats.levels.first;
var url = view.urls.courseLevel({level: view.originalLevelMap[firstLevel.get('original')] || firstLevel, courseInstance: courseInstance});
buf.push("<a" + (jade.attrs({ 'data-href':(url), 'data-level-slug':(firstLevel.get('slug')), 'data-event-action':("Students Start Course"), "class": [('play-btn'),('btn'),('btn-navy'),('btn-lg'),('m-b-1')] }, {"data-href":true,"data-level-slug":true,"data-event-action":true})) + "><span data-i18n=\"courses.start\"></span></a>");
}
buf.push("</div>");
if ( stats.levels.lastPlayed)
{
buf.push("<div><span data-i18n=\"courses.last_level\"></span><span>: " + (jade.escape((jade.interp = stats.levels.lastPlayedNumber) == null ? '' : jade.interp)) + ".</span><span class=\"spl\">" + (jade.escape(null == (jade.interp = stats.levels.lastPlayed.get('name')) ? "" : jade.interp)) + "</span></div>");
}
buf.push("<div class=\"clearfix\"></div><div class=\"progress\"><div" + (jade.attrs({ 'style':("width:"+stats.levels.pctDone), "class": [('progress-bar')] }, {"style":true})) + ">" + (jade.escape(null == (jade.interp = stats.levels.pctDone) ? "" : jade.interp)) + "</div></div>");
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div class=\"container\"><div class=\"row m-y-3\"><div class=\"col-xs-12\">");
if ( me.isTeacher())
{
buf.push("<div class=\"alert alert-danger text-center\"><!-- DNT: Temporary--><h3>ATTENTION TEACHERS:</h3><p>We are transitioning to a new classroom management system; this page will soon be student-only.</p><a href=\"/teachers/classes\">Go to teachers area.</a></div>");
}
buf.push("<div id=\"main-content\">");
if ( me.isAnonymous())
{
buf.push("<h1 data-i18n=\"courses.welcome_to_courses\" class=\"text-center\"></h1><div class=\"text-center\"><p><h2 data-i18n=\"courses.ready_to_play\"></h2></p><p><button id=\"start-new-game-btn\" data-i18n=\"courses.start_new_game\" class=\"btn btn-navy\"></button></p><p><span class=\"spr\">-</span><span data-i18n=\"general.or\" class=\"text-uppercase\"></span><span class=\"spl\">-</span></p><p><button id=\"log-in-btn\" data-i18n=\"login.log_in\" class=\"btn btn-forest\"></button></p></div><h2 id=\"play-now-to-learn-header\" data-i18n=\"courses.play_now_learn_header\" class=\"text-center text-uppercase\"></h2><ul id=\"benefits-ul\"><li data-i18n=\"courses.play_now_learn_1\"></li><li data-i18n=\"courses.play_now_learn_2\"></li><li data-i18n=\"courses.play_now_learn_3\"></li><li data-i18n=\"courses.play_now_learn_4\"></li></ul>");
}
else
{
buf.push("<div class=\"text-center\"><h1 data-i18n=\"courses.welcome_to_page\"></h1></div><div class=\"current-hero-container text-center row\"><div class=\"hero-avatar\"><img" + (jade.attrs({ 'src':(view.hero.getPortraitURL()) }, {"src":true})) + "/></div><div class=\"current-hero-right-col\"><div class=\"semibold current-hero-text\"><span data-i18n=\"courses.current_hero\" class=\"spr\"></span><span class=\"current-hero-name\">" + (jade.escape(null == (jade.interp = view.hero.getHeroShortName()) ? "" : jade.interp)) + "</span></div><button class=\"change-hero-btn btn btn-lg btn-forest\"><span data-i18n=\"courses.change_hero\"></span></button></div></div>");
if ( view.classrooms.size())
{
buf.push("<br/><h3 data-i18n=\"courses.my_classes\"></h3>");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

buf.push("<hr class=\"class-break\"/>");
var justAdded = classroom.id === view.classroomJustAdded;
var classroomClass = justAdded ? 'just-added' : '';
if ( justAdded)
{
buf.push("<div id=\"just-added-text\" data-i18n=\"courses.class_added\" class=\"text-center\"></div>");
}
buf.push("<div" + (jade.attrs({ "class": [(classroomClass)] }, {"class":true})) + "><h5><span class=\"spr\">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</span><span class=\"spr\">(" + (jade.escape((jade.interp = (classroom.get('aceConfig') || {}).language === 'javascript' ? 'JavaScript' : 'Python') == null ? '' : jade.interp)) + ")</span></h5><p><span data-i18n=\"courses.teacher\"></span><span>:</span>");
if ( view.ownerNameMap && view.ownerNameMap[classroom.get('ownerID')])
{
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = view.ownerNameMap[classroom.get('ownerID')]) ? "" : jade.interp)) + "</span>");
}
buf.push("</p>");
var courseInstances = view.courseInstances.where({classroomID: classroom.id});
// iterate courseInstances
;(function(){
  var $$obj = courseInstances;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var courseInstance = $$obj[$index];

buf.push("<div class=\"course-instance-entry\">");
var course = view.courses.get(courseInstance.get('courseID'));
buf.push("<h6><span class=\"spr\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span><small><a" + (jade.attrs({ 'data-course-id':(courseInstance.get('courseID')), 'data-courseinstance-id':(courseInstance.id), 'data-i18n':("courses.view_levels"), "class": [('view-levels-btn')] }, {"data-course-id":true,"data-courseinstance-id":true,"data-i18n":true})) + "></a></small></h6>");
course_instance_body_mixin(courseInstance, classroom);
buf.push("<div class=\"clearfix\"></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var courseInstance = $$obj[$index];

buf.push("<div class=\"course-instance-entry\">");
var course = view.courses.get(courseInstance.get('courseID'));
buf.push("<h6><span class=\"spr\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span><small><a" + (jade.attrs({ 'data-course-id':(courseInstance.get('courseID')), 'data-courseinstance-id':(courseInstance.id), 'data-i18n':("courses.view_levels"), "class": [('view-levels-btn')] }, {"data-course-id":true,"data-courseinstance-id":true,"data-i18n":true})) + "></a></small></h6>");
course_instance_body_mixin(courseInstance, classroom);
buf.push("<div class=\"clearfix\"></div></div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

buf.push("<hr class=\"class-break\"/>");
var justAdded = classroom.id === view.classroomJustAdded;
var classroomClass = justAdded ? 'just-added' : '';
if ( justAdded)
{
buf.push("<div id=\"just-added-text\" data-i18n=\"courses.class_added\" class=\"text-center\"></div>");
}
buf.push("<div" + (jade.attrs({ "class": [(classroomClass)] }, {"class":true})) + "><h5><span class=\"spr\">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</span><span class=\"spr\">(" + (jade.escape((jade.interp = (classroom.get('aceConfig') || {}).language === 'javascript' ? 'JavaScript' : 'Python') == null ? '' : jade.interp)) + ")</span></h5><p><span data-i18n=\"courses.teacher\"></span><span>:</span>");
if ( view.ownerNameMap && view.ownerNameMap[classroom.get('ownerID')])
{
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = view.ownerNameMap[classroom.get('ownerID')]) ? "" : jade.interp)) + "</span>");
}
buf.push("</p>");
var courseInstances = view.courseInstances.where({classroomID: classroom.id});
// iterate courseInstances
;(function(){
  var $$obj = courseInstances;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var courseInstance = $$obj[$index];

buf.push("<div class=\"course-instance-entry\">");
var course = view.courses.get(courseInstance.get('courseID'));
buf.push("<h6><span class=\"spr\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span><small><a" + (jade.attrs({ 'data-course-id':(courseInstance.get('courseID')), 'data-courseinstance-id':(courseInstance.id), 'data-i18n':("courses.view_levels"), "class": [('view-levels-btn')] }, {"data-course-id":true,"data-courseinstance-id":true,"data-i18n":true})) + "></a></small></h6>");
course_instance_body_mixin(courseInstance, classroom);
buf.push("<div class=\"clearfix\"></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var courseInstance = $$obj[$index];

buf.push("<div class=\"course-instance-entry\">");
var course = view.courses.get(courseInstance.get('courseID'));
buf.push("<h6><span class=\"spr\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span><small><a" + (jade.attrs({ 'data-course-id':(courseInstance.get('courseID')), 'data-courseinstance-id':(courseInstance.id), 'data-i18n':("courses.view_levels"), "class": [('view-levels-btn')] }, {"data-course-id":true,"data-courseinstance-id":true,"data-i18n":true})) + "></a></small></h6>");
course_instance_body_mixin(courseInstance, classroom);
buf.push("<div class=\"clearfix\"></div></div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

}
buf.push("<h3 data-i18n=\"courses.join_class\" class=\"text-uppercase\"></h3><hr/><form id=\"join-class-form\" class=\"form-inline\"><div class=\"help-block\"><em data-i18n=\"courses.ask_teacher_for_code\"></em></div><div class=\"form-group\"><input" + (jade.attrs({ 'id':('class-code-input'), 'data-i18n':("[placeholder]courses.enter_c_code"), 'placeholder':("<Enter Class Code>"), 'value':(view.classCode), "class": [('form-control')] }, {"data-i18n":true,"placeholder":true,"value":true})) + "/></div><input id=\"join-class-button\" type=\"submit\" data-i18n=\"[value]courses.join\" value=\"Join\" class=\"btn btn-navy\"/>");
if ( view.state === 'enrolling')
{
buf.push("<div class=\"progress progress-striped active\"><div style=\"width: 100%\" data-i18n=\"courses.joining\" class=\"progress-bar\">Joining class</div></div>");
}
if ( view.errorMessage)
{
buf.push("<div class=\"alert alert-danger\">" + (jade.escape(null == (jade.interp = view.errorMessage) ? "" : jade.interp)) + "</div>");
}
buf.push("</form>");
}
buf.push("</div></div></div></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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

;require.register("templates/courses/enrollments-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,moment = locals_.moment,serverConfig = locals_.serverConfig,view = locals_.view,document = locals_.document,_ = locals_._;var addCredits_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"text-center m-b-3 m-t-3\"><h5 data-i18n=\"courses.get_enrollments\"></h5>");
if ( me.get('enrollmentRequestSent'))
{
buf.push("<div id=\"enrollment-request-sent-blurb\" class=\"small\"><p data-i18n=\"teacher.enroll_request_sent_blurb1\"></p><p data-i18n=\"teacher.enroll_request_sent_blurb2\"></p><p data-i18n=\"[html]teacher.enroll_request_sent_blurb3\"></p></div><button id=\"request-sent-btn\" disabled=\"disabled\" data-i18n=\"teacher.request_sent\" class=\"btn-lg btn btn-forest\"></button>");
}
else
{
buf.push("<p data-i18n=\"teacher.get_enrollments_blurb\" class=\"m-y-2\"></p><button id=\"contact-us-btn\" data-i18n=\"contribute.contact_us_url\" class=\"btn-lg btn btn-forest\"></button>");
}
buf.push("</div>");
};
var prepaidCard_mixin = function(prepaid, className){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div" + (jade.attrs({ "class": [('prepaid-card'),('bg-navy'),('text-center'),('m-b-2'),('p-a-2'),(className)] }, {"class":true})) + "><h1 class=\"m-t-2 m-b-0\">" + (jade.escape(null == (jade.interp = prepaid.openSpots()) ? "" : jade.interp)) + "</h1>");
if ( prepaid.get('type') === 'starter_license')
{
buf.push("<div data-i18n=\"teacher.starter_licenses\"></div>");
}
else
{
buf.push("<div data-i18n=\"teacher.credits\"></div>");
}
buf.push("<hr/><em class=\"small-details\"><div data-i18n=\"teacher.start_date\" class=\"pull-left\"></div><div class=\"pull-right\">" + (jade.escape(null == (jade.interp = moment(prepaid.get('startDate')).utc().format('l')) ? "" : jade.interp)) + "</div><div class=\"clearfix\"></div><div data-i18n=\"teacher.end_date\" class=\"pull-left\"></div><div class=\"pull-right\">" + (jade.escape(null == (jade.interp = moment(prepaid.get('endDate')).utc().format('l')) ? "" : jade.interp)) + "</div><div class=\"clearfix\"></div></em></div>");
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
if ( me.isAnonymous() || (!me.isTeacher() && !view.classrooms.size()))
{
buf.push("<div class=\"container\"><div class=\"access-restricted container text-center m-y-3\"><h5 data-i18n=\"teacher.access_restricted\"></h5><p data-i18n=\"teacher.teacher_account_required\"></p>");
if ( me.isAnonymous())
{
buf.push("<div data-i18n=\"login.log_in\" class=\"login-button btn btn-lg btn-primary\"></div><a href=\"/teachers/signup\" data-i18n=\"teacher.create_teacher_account\" class=\"btn btn-lg btn-primary-alt\"></a>");
}
else
{
buf.push("<a href=\"/teachers/update-account\" data-i18n=\"teachers_quote.convert_account_title\" class=\"btn btn-lg btn-primary\"></a><button id=\"logout-button\" data-i18n=\"login.log_out\" class=\"btn btn-lg btn-primary-alt\"></button>");
}
buf.push("</div><div class=\"container\"><div class=\"teacher-account-blurb text-center col-xs-6 col-xs-offset-3 m-y-3\"><h5 data-i18n=\"teacher.what_is_a_teacher_account\"></h5><p data-i18n=\"teacher.teacher_account_explanation\"></p></div></div></div>");
}
else
{
if ( !me.isTeacher() && !me.isAdmin())
{
buf.push("<div class=\"alert alert-danger text-center\"><div class=\"container\"><!-- DNT: Temporary--><h3>ATTENTION: Please upgrade your account to a Teacher Account.</h3><p>We are transitioning to a new improved classroom management system for instructors.\nPlease convert your account to ensure you retain access to your classrooms.</p><a href=\"/teachers/update-account\" class=\"btn btn-primary btn-lg\">Upgrade to teacher account</a></div></div>");
}
if ( view.state.get('shouldUpsell'))
{
buf.push("<div class=\"bg-forest\"><div class=\"container\"><div class=\"row\"><div class=\"col-xs-9 m-t-1\"><b><span data-i18n=\"special_offer.special_offer\" class=\"text-uppercase\"></span>" + (jade.escape(null == (jade.interp = ': ') ? "" : jade.interp)) + "<span data-i18n=\"special_offer.student_starter_license\"></span></b><div class=\"small-details\"><i" + (jade.attrs({ 'data-i18n':("special_offer.purchase_starter_licenses_to_grant"), 'data-i18n-options':(JSON.stringify(view.i18nData())) }, {"data-i18n":true,"data-i18n-options":true})) + "></i></div></div><div class=\"col-xs-3\"><a href=\"/teachers/starter-licenses\" class=\"btn btn-lg btn-forest-alt m-t-2 m-b-2\"><b data-i18n=\"general.learn_more\"></b></a></div></div></div></div>");
}
buf.push("<div class=\"container m-t-5\"><h3 data-i18n=\"teacher.enrollments\"></h3><h4 id=\"enrollments-blurb\" data-i18n=\"teacher.enrollments_blurb\"> </h4>");
var available = view.state.get('prepaidGroups').available
var pending = view.state.get('prepaidGroups').pending
var anyPrepaids = available || pending
buf.push("<div class=\"text-center m-t-3\"><span class=\"glyphicon glyphicon-question-sign\"></span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "<a id=\"how-to-enroll-link\" data-i18n=\"teacher.how_to_apply_licenses\"></a></div><div class=\"row m-t-3\">");
if ( anyPrepaids)
{
buf.push("<div id=\"prepaids-col\" class=\"col-md-9\">");
if ( _.size(available) > 0)
{
buf.push("<h5 data-i18n=\"teacher.available_credits\" class=\"m-b-1\"></h5><div class=\"row\">");
// iterate available
;(function(){
  var $$obj = available;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prepaid = $$obj[$index];

buf.push("<div class=\"col-sm-4 col-xs-6\">");
prepaidCard_mixin(prepaid);
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prepaid = $$obj[$index];

buf.push("<div class=\"col-sm-4 col-xs-6\">");
prepaidCard_mixin(prepaid);
buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div>");
}
if ( _.size(pending) > 0)
{
buf.push("<h5 data-i18n=\"teacher.pending_credits\" class=\"m-b-1 m-t-3\"></h5><div class=\"row\">");
// iterate pending
;(function(){
  var $$obj = pending;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prepaid = $$obj[$index];

buf.push("<div class=\"col-sm-4 col-xs-6\">");
prepaidCard_mixin(prepaid, 'pending-prepaid-card');
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prepaid = $$obj[$index];

buf.push("<div class=\"col-sm-4 col-xs-6\">");
prepaidCard_mixin(prepaid, 'pending-prepaid-card');
buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div><div id=\"actions-col\" class=\"col-md-3\">");
addCredits_mixin();
buf.push("</div>");
}
else
{
buf.push("<!-- no prepaids--><div class=\"col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4\">");
addCredits_mixin();
buf.push("</div>");
}
buf.push("</div></div>");
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

;require.register("templates/courses/hero-select-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"text-center\"><h3 data-i18n=\"courses.select_your_hero\"></h3><h4 data-i18n=\"courses.select_your_hero_description\"></h4></div></div><div class=\"modal-body\"><div id=\"hero-select-view\"></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div class=\"select-hero-btn btn btn-lg btn-forest\"><span data-i18n=\"courses.select_this_hero\"></span></div></div></div></div>");;return buf.join("");
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

;require.register("templates/courses/invite-to-classroom-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("</div><div class=\"modal-body\"><h3 data-i18n=\"courses.option1_header\"></h3><div class=\"form\"><div class=\"form-group\"><p data-i18n=\"courses.enter_emails\" class=\"small help-block\"></p><textarea id=\"invite-emails-textarea\" rows=\"10\" class=\"form-control\"></textarea></div><div class=\"form-group\"><div class=\"text-center\"><button id=\"send-invites-btn\" data-i18n=\"courses.send_invites\" class=\"btn btn-lg btn-primary\"></button><div id=\"invite-emails-sending-alert\" data-i18n=\"common.sending\" class=\"alert alert-info hide\"></div><div id=\"invite-emails-success-alert\" data-i18n=\"play_level.done\" class=\"alert alert-success hide\"></div></div></div></div><br/><p data-i18n=\"courses.option1_body\" class=\"small\"></p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div>");;return buf.join("");
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

;require.register("templates/courses/join-class-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.classroom.loaded)
{
buf.push("<div class=\"text-center\"><h3 class=\"modal-title\"><span data-i18n=\"courses.join\"></span><span class=\"spr\"> </span><span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span></h3><b class=\"small-details\"><span data-i18n=\"courses.instructor\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.classroom.owner.get('name')) ? "" : jade.interp)) + "</span></b></div>");
}
buf.push("</div><div class=\"modal-body\">");
if ( view.classroom.loaded)
{
buf.push("<p><span data-i18n=\"courses.youve_been_invited_1\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span><span data-i18n=\"courses.youve_been_invited_2\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.classroom.capitalLanguage) ? "" : jade.interp)) + "</span><span data-i18n=\"courses.youve_been_invited_3\" class=\"spl\"></span></p><p><span data-i18n=\"courses.by_joining_1\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span><span class=\"spr\">, </span><span>" + (jade.escape(null == (jade.interp = view.classroom.owner.get('name')) ? "" : jade.interp)) + "</span><span class=\"spr\"> </span><span data-i18n=\"courses.by_joining_2\"></span></p>");
if (!( me.get('emailVerified')))
{
buf.push("<div class=\"text-center m-t-4\"><div><b class=\"small-details\"><span data-i18n=\"courses.sent_verification\"></span></b></div><div class=\"small\">" + (jade.escape(null == (jade.interp = me.get('email')) ? "" : jade.interp)) + "</div><div class=\"small\"><span data-i18n=\"courses.you_can_edit\" class=\"spr\"></span><a href=\"/account/settings\"><span data-i18n=\"courses.account_settings\"></span></a></div></div>");
}
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div class=\"text-center\"><button data-i18n=\"courses.join_class_2\" class=\"join-class-btn btn btn-lg btn-navy\"></button><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn btn-lg\"></button></div></div></div></div>");;return buf.join("");
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

;require.register("templates/courses/remove-student-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"text-center\"><h1 data-i18n=\"courses.remove_student1\" class=\"modal-title\"></h1><span class=\"glyphicon glyphicon-warning-sign text-danger\"></span><p><span>" + (jade.escape(null == (jade.interp = view.user.get('name', true)) ? "" : jade.interp)) + "</span>");
if ( view.user.get('email'))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = " — " + view.user.get('email')) ? "" : jade.interp)) + "</span>");
}
buf.push("</p><h2 data-i18n=\"courses.are_you_sure\"></h2></div></div><div class=\"modal-body\"><p class=\"text-center\"><span data-i18n=\"courses.remove_description1\"></span>");
if ( view.user.isEnrolled())
{
buf.push("<span data-i18n=\"courses.remove_description2\"></span>");
}
buf.push("</p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div id=\"remove-student-buttons\" class=\"text-center\"><p><button data-dismiss=\"modal\" data-i18n=\"courses.keep_student\" class=\"btn btn-lg btn-forest text-uppercase\"></button></p><p>- OR -</p><p><button id=\"remove-student-btn\" data-i18n=\"courses.remove_student1\" class=\"btn btn-lg btn-burgandy text-uppercase\"></button></p></div><div id=\"remove-student-progress\" class=\"text-center hide\"><div class=\"progress\"><div class=\"progress-bar\"></div></div><p data-i18n=\"courses.removing_user\" class=\"text-info\"></p></div></div></div></div>");;return buf.join("");
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

;require.register("templates/courses/restricted-to-students-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view;var accountLinks_mixin = function(){
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div class=\"access-restricted container text-center m-y-3\"><h5 data-i18n=\"teacher.access_restricted\"></h5>");
if ( me.isTeacher())
{
buf.push("<p data-i18n=\"courses.teacher_account_restricted\"></p><a href=\"/teachers/classes\" data-i18n=\"new_home.goto_classes\" class=\"btn btn-lg btn-primary\"></a><button id=\"logout-button\" data-i18n=\"login.log_out\" class=\"btn btn-lg btn-primary-alt\"></button>");
}
else
{
buf.push("<p data-i18n=\"courses.account_restricted\"></p>");
if ( me.isAnonymous())
{
buf.push("<div data-i18n=\"login.log_in\" class=\"login-button btn btn-lg btn-primary\"></div><div data-i18n=\"login.sign_up\" class=\"signup-button btn btn-lg btn-primary-alt\"></div>");
}
else
{
buf.push("<a href=\"/students/update-account\" data-i18n=\"courses.update_account_update_student\" class=\"btn btn-lg btn-primary\"></a><button id=\"logout-button\" data-i18n=\"login.log_out\" class=\"btn btn-lg btn-primary-alt\"></button>");
}
}
buf.push("</div>");
if ( me.isTeacher())
{
buf.push("<div class=\"container\"><div class=\"teacher-account-blurb text-center col-xs-6 col-xs-offset-3 m-y-3\"><h5 data-i18n=\"teacher.what_is_a_teacher_account\"></h5><p data-i18n=\"teacher.teacher_account_explanation\"></p></div></div>");
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

;require.register("templates/courses/student-courses-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a><a href=\"/community\" data-i18n=\"nav.community\"></a>");
if ( me.get('anonymous') === false)
{
buf.push("<span class=\"dropdown\"><button href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-sm header-font dropdown-toggle\">");
if ( me.get('photoURL'))
{
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(18)), 'alt':(""), "class": [('account-settings-image')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<i class=\"glyphicon glyphicon-user\"></i>");
}
buf.push("<span data-i18n=\"nav.account\" href=\"/account\" class=\"spl spr\"></span><span class=\"caret\"></span></button><ul role=\"menu\" class=\"dropdown-menu\"><li class=\"user-dropdown-header\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><div" + (jade.attrs({ 'style':("background-image: url(" + (me.getPhotoURL()) + ")"), "class": [('img-circle')] }, {"style":true})) + "></div></a><h3>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h3></li><li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
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
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li></ul></span>");
}
else
{
buf.push("<button data-i18n=\"login.sign_up\" class=\"btn btn-sm btn-primary header-font signup-button\"></button><button data-i18n=\"login.log_in\" class=\"btn btn-sm btn-default header-font login-button\"></button>");
}
}
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><p data-i18n=\"courses.to_join_ask\"></p><div id=\"join-classroom-form\" class=\"form-horizontal\"><div class=\"form-group\"><div class=\"col-sm-2\"><button" + (jade.attrs({ 'id':('join-class-btn'), 'disabled':(view.state==='enrolling'), 'data-i18n':("courses.join_this_class"), "class": [('btn'),('btn-default'),('btn-block')] }, {"disabled":true,"data-i18n":true})) + "></button></div><div class=\"col-sm-6\"><input" + (jade.attrs({ 'id':('classroom-code-input'), 'data-i18n':("[placeholder]courses.enter_here"), 'placeholder':('<enter unlock code here>'), 'value':(view.classCode), 'disabled':(view.state==='enrolling'), "class": [('form-control')] }, {"data-i18n":true,"placeholder":true,"value":true,"disabled":true})) + "/></div></div>");
if ( view.state === 'enrolling')
{
buf.push("<div class=\"progress progress-striped active\"><div style=\"width: 100%\" data-i18n=\"courses.joining\" class=\"progress-bar\"></div></div>");
}
if ( view.state === 'unknown_error')
{
buf.push("<div class=\"alert alert-danger\">" + (jade.escape(null == (jade.interp = view.stateMessage) ? "" : jade.interp)) + "</div>");
}
var justJoinedCourseInstance = view.courseInstances.find(function(ci) { return ci.justJoined; });
if ( justJoinedCourseInstance)
{
var course = view.courses.get(justJoinedCourseInstance.get('courseID'));
var classroom = view.classrooms.get(justJoinedCourseInstance.get('classroomID'));
if ( course && classroom)
{
buf.push("<div class=\"alert alert-info\"><span data-i18n=\"courses.successfully_joined\" class=\"spr\"></span><span class=\"spr\">\"" + (jade.escape((jade.interp = classroom.get('name')) == null ? '' : jade.interp)) + "\"!</span><a" + (jade.attrs({ 'href':("/students/" + (course.id) + "/" + (justJoinedCourseInstance.id) + "") }, {"href":true})) + "><strong><span data-i18n=\"courses.click_to_start\" class=\"spr\"></span><span>\"" + (jade.escape((jade.interp = course.get('name')) == null ? '' : jade.interp)) + "\".</span></strong></a></div>");
}
}
buf.push("</div><div class=\"panel panel-default\"><div class=\"panel-heading\"><div data-i18n=\"courses.my_courses\" class=\"panel-title\"></div></div><div class=\"list-group\"><div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\"><strong data-i18n=\"courses.classroom\"></strong></div><div class=\"col-sm-3\"><strong data-i18n=\"courses.course\"></strong></div></div></div>");
// iterate view.courseInstances.models
;(function(){
  var $$obj = view.courseInstances.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var courseInstance = $$obj[$index];

var classroom = view.classrooms.get(courseInstance.get('classroomID'))
var course = view.courses.get(courseInstance.get('courseID'))
if ( !(classroom && course))
{
continue;
}
buf.push("<div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\">");
if ( classroom)
{
buf.push("" + (jade.escape((jade.interp = classroom.get('name')) == null ? '' : jade.interp)) + "");
}
buf.push("</div><div class=\"col-sm-3\">");
if ( course)
{
buf.push("" + (jade.escape((jade.interp = course.get('name')) == null ? '' : jade.interp)) + "");
}
buf.push("</div><div class=\"col-sm-6\"><a" + (jade.attrs({ 'href':("/students/" + (course.id) + "/" + (courseInstance.id) + ""), 'data-i18n':("courses.enter"), "class": [('btn'),('btn-default'),('btn-sm')] }, {"href":true,"data-i18n":true})) + "></a></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var courseInstance = $$obj[$index];

var classroom = view.classrooms.get(courseInstance.get('classroomID'))
var course = view.courses.get(courseInstance.get('courseID'))
if ( !(classroom && course))
{
continue;
}
buf.push("<div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\">");
if ( classroom)
{
buf.push("" + (jade.escape((jade.interp = classroom.get('name')) == null ? '' : jade.interp)) + "");
}
buf.push("</div><div class=\"col-sm-3\">");
if ( course)
{
buf.push("" + (jade.escape((jade.interp = course.get('name')) == null ? '' : jade.interp)) + "");
}
buf.push("</div><div class=\"col-sm-6\"><a" + (jade.attrs({ 'href':("/students/" + (course.id) + "/" + (courseInstance.id) + ""), 'data-i18n':("courses.enter"), "class": [('btn'),('btn-default'),('btn-sm')] }, {"href":true,"data-i18n":true})) + "></a></div></div></div>");
    }

  }
}).call(this);

buf.push("</div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><div data-i18n=\"courses.my_classes\" class=\"panel-title\"></div></div><div class=\"list-group\">");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

buf.push("<div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">" + (jade.escape(null == (jade.interp = classroom.get('description')) ? "" : jade.interp)) + "</div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

buf.push("<div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">" + (jade.escape(null == (jade.interp = classroom.get('description')) ? "" : jade.interp)) + "</div></div></div>");
    }

  }
}).call(this);

buf.push("</div></div></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( !me.isStudent())
{
buf.push("<a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a>");
}
buf.push("<a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a><a href=\"https://jobs.lever.co/codecombat\" tabindex=\"-1\" data-i18n=\"nav.careers\"></a><a href=\"/legal\" tabindex=\"-1\" data-i18n=\"nav.legal\"></a><a href=\"/privacy\" tabindex=\"-1\" data-i18n=\"legal.privacy_title\"></a><a href=\"/contribute\" tabindex=\"-1\" data-i18n=\"nav.contribute\"></a>");
if ( !me.isStudent())
{
buf.push("<a href=\"/play/ladder\" tabindex=\"-1\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
}
if ( me.isAdmin())
{
buf.push("<a href=\"/admin\">Admin</a>");
}
if ( usesSocialMedia)
{
buf.push("<div class=\"share-buttons\">");
if ( !isIE)
{
buf.push("<div data-href=\"http://codecombat.com\" data-size=\"medium\" class=\"g-plusone\"></div>");
}
buf.push("<div" + (jade.attrs({ 'data-href':("https://www.facebook.com/codecombat"), 'data-send':("false"), 'data-layout':("button_count"), 'data-width':("350"), 'data-show-faces':("true"), 'data-ref':("coco_footer_" + (fbRef) + ""), "class": [('fb-like')] }, {"data-href":true,"data-send":true,"data-layout":true,"data-width":true,"data-show-faces":true,"data-ref":true})) + "></div>");
if ( !isIE)
{
buf.push("<a href=\"https://twitter.com/CodeCombat\" data-show-count=\"true\" data-show-screen-name=\"false\" data-dnt=\"true\" data-align=\"right\" data-i18n=\"nav.twitter_follow\" class=\"twitter-follow-button\"></a><iframe src=\"https://ghbtns.com/github-btn.html?user=codecombat&amp;repo=codecombat&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\" class=\"github-star-button\"></iframe>");
}
buf.push("</div>");
}
buf.push("</div><div id=\"footer-credits\"><span><span>© All Rights Reserved</span><br/><span>CodeCombat 2015</span></span><img id=\"footer-logo\" src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><span><span>Site Design by</span><br/><a href=\"http://www.fullyillustrated.com/\">Fully Illustrated</a></span><!--a.firebase-bade(href=\"https://www.firebase.com/\")  // Not using right now--><!--  img(src=\"/images/pages/base/firebase.png\", alt=\"Powered by Firebase\")--></div></div>");;return buf.join("");
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

;require.register("templates/courses/teacher-class-view", function(exports, require, module) {
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

;require.register("templates/courses/teacher-classes-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),courseInstance = locals_.courseInstance,view = locals_.view,me = locals_.me,serverConfig = locals_.serverConfig,document = locals_.document,_ = locals_._;var archivedClassRow_mixin = function(classroom){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"class row\"><div class=\"col-xs-10\"><span>" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</span></div><div class=\"col-xs-2\"><div class=\"class-links pull-right\"><a" + (jade.attrs({ 'data-i18n':('teacher.unarchive_class'), 'data-classroom-id':(classroom.id), "class": [('unarchive-classroom'),('text-h6')] }, {"data-i18n":true,"data-classroom-id":true})) + "></a></div></div></div>");
};
var progressDotLabel_mixin = function(label){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"dot-label text-h6\">" + (jade.escape(null == (jade.interp = label) ? "" : jade.interp)) + "</div>");
};
var progressDot_mixin = function(classroom, course, label){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
courseInstance = view.courseInstances.findWhere({ courseID: course.id, classroomID: classroom.id })
var total = classroom.get('members').length
var complete = 0;
var dotClass = '';
var started = 0;
if ( courseInstance)
{
complete = courseInstance.numCompleted
started = courseInstance.started
dotClass = complete === total ? 'forest' : started ? 'gold' : '';
}
var progressDotContext = {total: total, complete: complete};
buf.push("<div" + (jade.attrs({ 'data-title':(view.progressDotTemplate(progressDotContext)), "class": [('progress-dot'),(dotClass)] }, {"class":true,"data-title":true})) + ">");
progressDotLabel_mixin(label);
buf.push("</div>");
};
var createClassButton_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"create-class\"><div class=\"text-center\"><a data-i18n=\"teacher.create_new_class\" class=\"create-classroom-btn btn btn-lg btn-primary\"></a></div></div>");
};
var addStudentsButton_mixin = function(classroom){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"add-students\"><div class=\"text-center\"><div data-i18n=\"teacher.no_students_yet_view_class\" class=\"small-details\"></div></div></div>");
};
var classRow_mixin = function(classroom){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"class row\"><div class=\"class-details-col\"><div class=\"text-h4 semibold\">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</div><div class=\"language small\"><span data-i18n=\"teacher.language\"></span>:&nbsp;<span class=\"language-name\">" + (jade.escape(null == (jade.interp = classroom.capitalLanguage) ? "" : jade.interp)) + "</span></div><div class=\"student-count small\"><span data-i18n=\"courses.students\"></span>:&nbsp;<span>" + (jade.escape(null == (jade.interp = classroom.get('members').length) ? "" : jade.interp)) + "</span></div><div class=\"class-links\"><a" + (jade.attrs({ 'data-i18n':('teacher.view_class'), 'data-classroom-id':(classroom.id), 'data-event-action':("Teachers Classes View Class Link"), "class": [('view-class-btn'),('text-h6')] }, {"data-i18n":true,"data-classroom-id":true,"data-event-action":true})) + "></a><a" + (jade.attrs({ 'data-i18n':('teacher.edit_class_settings'), 'data-classroom-id':(classroom.id), 'data-event-action':("Teachers Classes Edit Class Started"), "class": [('edit-classroom'),('text-h6')] }, {"data-i18n":true,"data-classroom-id":true,"data-event-action":true})) + "></a><a" + (jade.attrs({ 'data-i18n':('teacher.archive_class'), 'data-classroom-id':(classroom.id), 'data-event-action':("Teachers Classes Archive Class"), "class": [('archive-classroom'),('text-h6')] }, {"data-i18n":true,"data-classroom-id":true,"data-event-action":true})) + "></a></div></div><div class=\"flex-right\"><div class=\"progress-col\">");
if ( classroom.get('members').length == 0)
{
addStudentsButton_mixin(classroom);
}
else
{
var courses = classroom.getSortedCourses().map(function(c) { return view.courses.get(c._id); });
var courseLabelsArray = view.helper.courseLabelsArray(courses);
// iterate classroom.get('courses') || []
;(function(){
  var $$obj = classroom.get('courses') || [];
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var trimCourse = $$obj[index];

var course = view.courses.get(trimCourse._id);
if ( view.courseInstances.findWhere({ classroomID: classroom.id, courseID: course.id }))
{
var label = courseLabelsArray[index];
progressDot_mixin(classroom, course, label);
}
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var trimCourse = $$obj[index];

var course = view.courses.get(trimCourse._id);
if ( view.courseInstances.findWhere({ classroomID: classroom.id, courseID: course.id }))
{
var label = courseLabelsArray[index];
progressDot_mixin(classroom, course, label);
}
    }

  }
}).call(this);

}
buf.push("</div><div class=\"view-class-arrow\"><a" + (jade.attrs({ 'data-classroom-id':(classroom.id), 'data-event-action':("Teachers Classes View Class Chevron"), "class": [('view-class-arrow-inner'),('glyphicon'),('glyphicon-chevron-right'),('view-class-btn')] }, {"data-classroom-id":true,"data-event-action":true})) + "></a></div></div></div>");
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
if ( (!me.isTeacher() && !view.classrooms.size()) || me.isAnonymous())
{
buf.push("<div class=\"access-restricted container text-center m-y-3\"><h5 data-i18n=\"teacher.access_restricted\"></h5><p data-i18n=\"teacher.teacher_account_required\"></p>");
if ( me.isAnonymous())
{
buf.push("<div data-i18n=\"login.log_in\" class=\"login-button btn btn-lg btn-primary\"></div><button data-event-action=\"Teachers Classes Create Teacher Account\" data-i18n=\"teacher.create_teacher_account\" class=\"btn btn-lg btn-primary-alt create-teacher-btn\"></button>");
}
else
{
buf.push("<button data-event-action=\"Teachers Classes Convert Teacher Account\" data-i18n=\"teachers_quote.convert_account_title\" class=\"btn btn-lg btn-primary update-teacher-btn\"></button><button id=\"logout-button\" data-i18n=\"login.log_out\" class=\"btn btn-lg btn-primary-alt\"></button>");
}
buf.push("</div><div class=\"container\"><div class=\"teacher-account-blurb text-center col-xs-6 col-xs-offset-3 m-y-3\"><h5 data-i18n=\"teacher.what_is_a_teacher_account\"></h5><p data-i18n=\"teacher.teacher_account_explanation\"></p></div></div>");
}
else
{
if ( !me.isTeacher() && !me.isAdmin())
{
buf.push("<div class=\"alert alert-danger text-center\"><div class=\"container\"><!-- DNT: Temporary--><h3>ATTENTION: Please upgrade your account to a Teacher Account.</h3><p>We are transitioning to a new improved classroom management system for instructors.\nPlease convert your account to ensure you retain access to your classrooms.</p><button data-event-action=\"Teachers Classes Convert Teacher Account Temp\" class=\"btn btn-primary btn-lg update-teacher-btn\">Upgrade to teacher account</button></div></div>");
}
buf.push("<div class=\"container\"><h3 data-i18n=\"teacher.current_classes\"></h3></div><div class=\"classes container\"><!-- Loop each class-->");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

if (!( classroom.get('archived')))
{
classRow_mixin(classroom);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

if (!( classroom.get('archived')))
{
classRow_mixin(classroom);
}
    }

  }
}).call(this);

buf.push("</div>");
createClassButton_mixin();
}
var archivedClassrooms = view.classrooms.where({archived: true});
if ( _.size(archivedClassrooms))
{
buf.push("<div class=\"container\"><h3 data-i18n=\"teacher.archived_classes\"></h3><p data-i18n=\"teacher.archived_classes_blurb\"></p></div><div class=\"classes container\">");
// iterate archivedClassrooms
;(function(){
  var $$obj = archivedClassrooms;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

archivedClassRow_mixin(classroom);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

archivedClassRow_mixin(classroom);
    }

  }
}).call(this);

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

;require.register("templates/courses/teacher-courses-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,i18n = locals_.i18n,me = locals_.me,serverConfig = locals_.serverConfig,document = locals_.document;var course_info_mixin = function(course){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var campaign = view.campaigns.get(course.get('campaignID'));
buf.push("<div class=\"course-info\"><div class=\"text-h4 semibold\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><p>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'description')) ? "" : jade.interp)) + "</p><p class=\"concepts semibold\"><span data-i18n=\"courses.concepts_covered\"></span>:");
// iterate course.get('concepts')
;(function(){
  var $$obj = course.get('concepts');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept) }, {"data-i18n":true})) + "></span>");
if ( course.get('concepts').indexOf(concept) !== course.get('concepts').length - 1)
{
buf.push("<span class=\"spr\">,</span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept) }, {"data-i18n":true})) + "></span>");
if ( course.get('concepts').indexOf(concept) !== course.get('concepts').length - 1)
{
buf.push("<span class=\"spr\">,</span>");
}
    }

  }
}).call(this);

buf.push("</p>");
if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_2)
{
buf.push("<p><i data-i18n=\"courses.web_dev_language_transition\"></i></p>");
}
if ( me.isTeacher() || view.ownedClassrooms.size() || me.isAdmin())
{
if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_1)
{
buf.push("<a" + (jade.attrs({ 'href':(("/teachers/course-solution/" + course.id + "/html")), 'data-course-id':(course.id), 'data-course-name':(course.get('name')), 'data-event-action':("Classes Guides Guide JavaScript"), "class": [('guide-btn'),('btn'),('btn-primary'),((me.isTeacher() || me.isAdmin() ? '': 'disabled'))] }, {"class":true,"href":true,"data-course-id":true,"data-course-name":true,"data-event-action":true})) + "><span data-i18n=\"courses.view_guide_online\"></span> &mdash; HTML</a>");
}
else if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_2)
{
buf.push("<a" + (jade.attrs({ 'href':(("/teachers/course-solution/" + course.id + "/html")), 'data-course-id':(course.id), 'data-course-name':(course.get('name')), 'data-event-action':("Classes Guides Guide JavaScript"), "class": [('guide-btn'),('btn'),('btn-primary'),((me.isTeacher() || me.isAdmin() ? '': 'disabled'))] }, {"class":true,"href":true,"data-course-id":true,"data-course-name":true,"data-event-action":true})) + "><span data-i18n=\"courses.view_guide_online\"></span> &mdash; HTML / JavaScript</a>");
}
else
{
buf.push("<a" + (jade.attrs({ 'href':(("/teachers/course-solution/" + course.id + "/javascript")), 'data-course-id':(course.id), 'data-course-name':(course.get('name')), 'data-event-action':("Classes Guides Guide JavaScript"), "class": [('guide-btn'),('btn'),('btn-primary'),((me.isTeacher() || me.isAdmin() ? '': 'disabled'))] }, {"class":true,"href":true,"data-course-id":true,"data-course-name":true,"data-event-action":true})) + "><span data-i18n=\"courses.view_guide_online\"></span> &mdash; JavaScript</a><a" + (jade.attrs({ 'href':(("/teachers/course-solution/" + course.id + "/python")), 'data-course-id':(course.id), 'data-course-name':(course.get('name')), 'data-event-action':("Classes Guides Guide Python"), "class": [('guide-btn'),('btn'),('btn-primary'),((me.isTeacher() || me.isAdmin() ? '': 'disabled'))] }, {"class":true,"href":true,"data-course-id":true,"data-course-name":true,"data-event-action":true})) + "><span data-i18n=\"courses.view_guide_online\"></span> &mdash; Python</a>");
}
}
buf.push("</div>");
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
if ( !me.isTeacher() && view.ownedClassrooms.size() && !me.isAdmin())
{
buf.push("<div class=\"alert alert-danger text-center\"><div class=\"container\"><!-- DNT: Temporary--><h3>ATTENTION: Please upgrade your account to a Teacher Account.</h3><p>We are transitioning to a new improved classroom management system for instructors.\nPlease convert your account to ensure you retain access to your classrooms.</p><a href=\"/teachers/update-account\" class=\"btn btn-primary btn-lg\">Upgrade to teacher account</a></div></div>");
}
buf.push("<div class=\"container\"><h1 data-i18n=\"nav.courses\"></h1><h2 data-i18n=\"courses.subtitle\"></h2></div><div class=\"courses container\">");
var courses = view.courses.models;
var courseIndex = 0;
while (courseIndex < courses.length)
{
var course = courses[courseIndex];
courseIndex++;
buf.push("<div class=\"course row\"><div class=\"col-sm-9\">");
course_info_mixin(course);
buf.push("</div>");
if ( me.isTeacher() || me.isAdmin())
{
buf.push("<div class=\"col-sm-3\"><div" + (jade.attrs({ 'data-course-id':(course.id), "class": [('play-level-form')] }, {"data-course-id":true})) + "><div class=\"form-group\"><label class=\"control-label\"><span data-i18n=\"courses.select_language\"></span>:<select class=\"language-select form-control\">");
if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_1)
{
buf.push("<option value=\"javascript\">HTML</option>");
}
else if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_2)
{
buf.push("<option value=\"javascript\">HTML / JavaScript</option>");
}
else
{
buf.push("<option value=\"python\">Python</option><option value=\"javascript\">JavaScript</option>");
}
buf.push("</select></label></div><div class=\"form-group\"><label class=\"control-label\"><span data-i18n=\"courses.select_level\"></span>:<select class=\"level-select form-control\">");
if ( view.campaigns.loaded)
{
var campaign = view.campaigns.get(course.get('campaignID'))
if ( campaign)
{
// iterate campaign.getLevels().models
;(function(){
  var $$obj = campaign.getLevels().models;
  if ('number' == typeof $$obj.length) {

    for (var levelIndex = 0, $$l = $$obj.length; levelIndex < $$l; levelIndex++) {
      var level = $$obj[levelIndex];

var levelNumber = campaign.getLevelNumber(level.get('original'), levelIndex + 1)
buf.push("<option" + (jade.attrs({ 'value':(level.get('slug')) }, {"value":true})) + "><span>" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</span><span class=\"spr\">.</span><span>" + (jade.escape(null == (jade.interp = level.get('name').replace('Course: ', '')) ? "" : jade.interp)) + "</span></option>");
    }

  } else {
    var $$l = 0;
    for (var levelIndex in $$obj) {
      $$l++;      var level = $$obj[levelIndex];

var levelNumber = campaign.getLevelNumber(level.get('original'), levelIndex + 1)
buf.push("<option" + (jade.attrs({ 'value':(level.get('slug')) }, {"value":true})) + "><span>" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</span><span class=\"spr\">.</span><span>" + (jade.escape(null == (jade.interp = level.get('name').replace('Course: ', '')) ? "" : jade.interp)) + "</span></option>");
    }

  }
}).call(this);

}
}
buf.push("</select></label></div><a class=\"play-level-button btn btn-lg btn-primary\"><span data-i18n=\"courses.play_level\"></span></a></div><div class=\"clearfix\"></div></div>");
}
buf.push("</div>");
}
buf.push("</div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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

;require.register("templates/courses/teacher-dashboard-nav", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),document = locals_.document;var path = document.location.pathname
buf.push("<div id=\"teacher-dashboard-nav\"><nav class=\"navbar\"><div class=\"container-fluid container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#teacher-dashboard-nav-collapse\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><span data-i18n=\"teacher.teacher_dashboard\" class=\"navbar-brand text-h4\"></span></div><div id=\"teacher-dashboard-nav-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/classes') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/classes\"><small data-i18n=\"teacher.my_classes\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/courses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/courses\"><small data-i18n=\"teacher.courses\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/licenses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/licenses\"><small data-i18n=\"teacher.enrollments\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources') === 0 && path.indexOf('/teachers/resources/faq') !== 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources\"><small data-i18n=\"teacher.resource_hub\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources/faq') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources/faq\"><small data-i18n=\"teacher.educator_faq\" class=\"label\"></small></a></li></ul></div></div></nav></div>");;return buf.join("");
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

;require.register("views/courses/ActivateLicensesModal", function(exports, require, module) {
var ActivateLicensesModal, Classroom, Classrooms, CocoCollection, ModalView, Prepaids, State, User, Users, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

State = require('models/State');

template = require('templates/courses/activate-licenses-modal');

CocoCollection = require('collections/CocoCollection');

Prepaids = require('collections/Prepaids');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

User = require('models/User');

Users = require('collections/Users');

module.exports = ActivateLicensesModal = (function(superClass) {
  extend(ActivateLicensesModal, superClass);

  function ActivateLicensesModal() {
    return ActivateLicensesModal.__super__.constructor.apply(this, arguments);
  }

  ActivateLicensesModal.prototype.id = 'activate-licenses-modal';

  ActivateLicensesModal.prototype.template = template;

  ActivateLicensesModal.prototype.events = {
    'change input[type="checkbox"][name="user"]': 'updateSelectedStudents',
    'change select.classroom-select': 'replaceStudentList',
    'submit form': 'onSubmitForm',
    'click #get-more-licenses-btn': 'onClickGetMoreLicensesButton'
  };

  ActivateLicensesModal.prototype.getInitialState = function(options) {
    var selectedUserModels, selectedUsers;
    selectedUsers = options.selectedUsers || options.users;
    selectedUserModels = _.filter(selectedUsers.models, function(user) {
      return !user.isEnrolled();
    });
    return {
      selectedUsers: new Users(selectedUserModels),
      visibleSelectedUsers: new Users(selectedUserModels),
      error: null
    };
  };

  ActivateLicensesModal.prototype.initialize = function(options) {
    this.state = new State(this.getInitialState(options));
    this.classroom = options.classroom;
    this.users = options.users.clone();
    this.users.comparator = function(user) {
      return user.broadName().toLowerCase();
    };
    this.prepaids = new Prepaids();
    this.prepaids.comparator = 'endDate';
    this.supermodel.trackRequest(this.prepaids.fetchByCreator(me.id));
    this.classrooms = new Classrooms();
    this.supermodel.trackRequest(this.classrooms.fetchMine({
      data: {
        archived: false
      },
      success: (function(_this) {
        return function() {
          return _this.classrooms.each(function(classroom) {
            var jqxhrs;
            classroom.users = new Users();
            jqxhrs = classroom.users.fetchForClassroom(classroom, {
              removeDeleted: true
            });
            return _this.supermodel.trackRequests(jqxhrs);
          });
        };
      })(this)
    }));
    this.listenTo(this.state, 'change', this.render);
    this.listenTo(this.state.get('selectedUsers'), 'change add remove reset', function() {
      this.state.set({
        visibleSelectedUsers: new Users(this.state.get('selectedUsers').filter((function(_this) {
          return function(u) {
            return _this.users.get(u);
          };
        })(this)))
      });
      return this.render();
    });
    this.listenTo(this.users, 'change add remove reset', function() {
      this.state.set({
        visibleSelectedUsers: new Users(this.state.get('selectedUsers').filter((function(_this) {
          return function(u) {
            return _this.users.get(u);
          };
        })(this)))
      });
      return this.render();
    });
    return this.listenTo(this.prepaids, 'sync add remove', function() {
      return this.state.set({
        unusedEnrollments: this.prepaids.totalMaxRedeemers() - this.prepaids.totalRedeemers()
      });
    });
  };

  ActivateLicensesModal.prototype.onLoaded = function() {
    this.prepaids.reset(this.prepaids.filter(function(prepaid) {
      return prepaid.status() === 'available';
    }));
    return ActivateLicensesModal.__super__.onLoaded.call(this);
  };

  ActivateLicensesModal.prototype.afterRender = function() {
    return ActivateLicensesModal.__super__.afterRender.call(this);
  };

  ActivateLicensesModal.prototype.updateSelectedStudents = function(e) {
    var user, userID;
    userID = $(e.currentTarget).data('user-id');
    user = this.users.get(userID);
    if (this.state.get('selectedUsers').contains(user)) {
      return this.state.get('selectedUsers').remove(user);
    } else {
      return this.state.get('selectedUsers').add(user);
    }
  };

  ActivateLicensesModal.prototype.replaceStudentList = function(e) {
    var selectedClassroomID, users;
    selectedClassroomID = $(e.currentTarget).val();
    this.classroom = this.classrooms.get(selectedClassroomID);
    if (!this.classroom) {
      users = _.uniq(_.flatten(this.classrooms.map(function(classroom) {
        return classroom.users.models;
      })));
      this.users.reset(users);
      this.users.sort();
    } else {
      this.users.reset(this.classrooms.get(selectedClassroomID).users.models);
    }
    this.render();
    return null;
  };

  ActivateLicensesModal.prototype.onSubmitForm = function(e) {
    var usersToRedeem;
    e.preventDefault();
    this.state.set({
      error: null
    });
    usersToRedeem = this.state.get('visibleSelectedUsers');
    return this.redeemUsers(usersToRedeem);
  };

  ActivateLicensesModal.prototype.redeemUsers = function(usersToRedeem) {
    var prepaid, user;
    if (!usersToRedeem.size()) {
      this.finishRedeemUsers();
      this.hide();
      return;
    }
    user = usersToRedeem.first();
    prepaid = this.prepaids.find(function(prepaid) {
      return prepaid.status() === 'available';
    });
    return prepaid.redeem(user, {
      success: (function(_this) {
        return function(prepaid) {
          var ref;
          user.set('coursePrepaid', prepaid.pick('_id', 'startDate', 'endDate', 'type', 'includedCourseIDs'));
          usersToRedeem.remove(user);
          if ((ref = application.tracker) != null) {
            ref.trackEvent('Enroll modal finished enroll student', {
              category: 'Courses',
              userID: user.id
            });
          }
          return _this.redeemUsers(usersToRedeem);
        };
      })(this),
      error: (function(_this) {
        return function(prepaid, jqxhr) {
          return _this.state.set({
            error: jqxhr.responseJSON.message
          });
        };
      })(this)
    });
  };

  ActivateLicensesModal.prototype.finishRedeemUsers = function() {
    return this.trigger('redeem-users', this.state.get('selectedUsers'));
  };

  ActivateLicensesModal.prototype.onClickGetMoreLicensesButton = function() {
    return typeof this.hide === "function" ? this.hide() : void 0;
  };

  return ActivateLicensesModal;

})(ModalView);
});

;require.register("views/courses/ChangeCourseLanguageModal", function(exports, require, module) {
var ChangeCourseLanguageModal, ModalView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/change-course-language-modal');

module.exports = ChangeCourseLanguageModal = (function(superClass) {
  extend(ChangeCourseLanguageModal, superClass);

  function ChangeCourseLanguageModal() {
    return ChangeCourseLanguageModal.__super__.constructor.apply(this, arguments);
  }

  ChangeCourseLanguageModal.prototype.id = 'change-course-language-modal';

  ChangeCourseLanguageModal.prototype.template = template;

  ChangeCourseLanguageModal.prototype.events = {
    'click .lang-choice-btn': 'onClickLanguageChoiceButton'
  };

  ChangeCourseLanguageModal.prototype.onClickLanguageChoiceButton = function(e) {
    var aceConfig, res;
    this.chosenLanguage = $(e.target).closest('.lang-choice-btn').data('language');
    aceConfig = _.clone(me.get('aceConfig') || {});
    aceConfig.language = this.chosenLanguage;
    me.set('aceConfig', aceConfig);
    res = me.patch();
    if (res) {
      this.$('#choice-area').hide();
      this.$('#saving-progress').removeClass('hide');
      return this.listenToOnce(me, 'sync', this.onLanguageSettingSaved);
    } else {
      return this.onLanguageSettingSaved();
    }
  };

  ChangeCourseLanguageModal.prototype.onLanguageSettingSaved = function() {
    var ref;
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Student changed language', {
        category: 'Courses',
        label: this.chosenLanguage
      });
    }
    this.trigger('set-language');
    return this.hide();
  };

  return ChangeCourseLanguageModal;

})(ModalView);
});

;require.register("views/courses/ChooseLanguageModal", function(exports, require, module) {
var ChooseLanguageModal, ModalView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/choose-language-modal');

module.exports = ChooseLanguageModal = (function(superClass) {
  extend(ChooseLanguageModal, superClass);

  function ChooseLanguageModal() {
    return ChooseLanguageModal.__super__.constructor.apply(this, arguments);
  }

  ChooseLanguageModal.prototype.id = 'choose-language-modal';

  ChooseLanguageModal.prototype.template = template;

  ChooseLanguageModal.prototype.events = {
    'click .lang-choice-btn': 'onClickLanguageChoiceButton'
  };

  ChooseLanguageModal.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.logoutFirst = options.logoutFirst;
  };

  ChooseLanguageModal.prototype.onClickLanguageChoiceButton = function(e) {
    this.chosenLanguage = $(e.target).closest('.lang-choice-btn').data('language');
    if (this.logoutFirst) {
      return this.logoutUser();
    } else {
      return this.saveLanguageSetting();
    }
  };

  ChooseLanguageModal.prototype.logoutUser = function() {
    return $.ajax({
      method: 'POST',
      url: '/auth/logout',
      context: this,
      success: this.onUserLoggedOut
    });
  };

  ChooseLanguageModal.prototype.onUserLoggedOut = function() {
    me.clear();
    me.fetch({
      url: '/auth/whoami'
    });
    return this.listenToOnce(me, 'sync', this.saveLanguageSetting);
  };

  ChooseLanguageModal.prototype.saveLanguageSetting = function() {
    var aceConfig, res;
    aceConfig = _.clone(me.get('aceConfig') || {});
    aceConfig.language = this.chosenLanguage;
    me.set('aceConfig', aceConfig);
    res = me.patch();
    if (res) {
      this.$('#choice-area').hide();
      this.$('#saving-progress').removeClass('hide');
      return this.listenToOnce(me, 'sync', this.onLanguageSettingSaved);
    } else {
      return this.onLanguageSettingSaved();
    }
  };

  ChooseLanguageModal.prototype.onLanguageSettingSaved = function() {
    var ref;
    this.trigger('set-language');
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Chose language', {
        category: 'Courses',
        label: this.chosenLanguage
      });
    }
    return this.hide();
  };

  return ChooseLanguageModal;

})(ModalView);
});

;require.register("views/courses/ClassroomSettingsModal", function(exports, require, module) {
var Classroom, ClassroomSettingsModal, ModalView, errors, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Classroom = require('models/Classroom');

ModalView = require('views/core/ModalView');

template = require('templates/courses/classroom-settings-modal');

forms = require('core/forms');

errors = require('core/errors');

module.exports = ClassroomSettingsModal = (function(superClass) {
  extend(ClassroomSettingsModal, superClass);

  function ClassroomSettingsModal() {
    return ClassroomSettingsModal.__super__.constructor.apply(this, arguments);
  }

  ClassroomSettingsModal.prototype.id = 'classroom-settings-modal';

  ClassroomSettingsModal.prototype.template = template;

  ClassroomSettingsModal.prototype.events = {
    'click #save-settings-btn': 'onSubmitForm',
    'click #update-courses-btn': 'onClickUpdateCoursesButton',
    'submit form': 'onSubmitForm'
  };

  ClassroomSettingsModal.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.classroom = options.classroom || new Classroom();
  };

  ClassroomSettingsModal.prototype.afterRender = function() {
    ClassroomSettingsModal.__super__.afterRender.call(this);
    return forms.updateSelects(this.$('form'));
  };

  ClassroomSettingsModal.prototype.onSubmitForm = function(e) {
    var attrs, button, error, form, i, len, ref, schemaErrors;
    this.classroom.notyErrors = false;
    e.preventDefault();
    form = this.$('form');
    forms.clearFormAlerts(form);
    attrs = forms.formToObject(form, {
      ignoreEmptyString: false
    });
    if (attrs.language) {
      attrs.aceConfig = {
        language: attrs.language
      };
      delete attrs.language;
    } else {
      forms.setErrorToProperty(form, 'language', $.i18n.t('common.required_field'));
      return;
    }
    this.classroom.set(attrs);
    schemaErrors = this.classroom.getValidationErrors();
    if (schemaErrors) {
      for (i = 0, len = schemaErrors.length; i < len; i++) {
        error = schemaErrors[i];
        if (error.schemaPath === "/properties/name/minLength") {
          error.message = 'Please enter a class name.';
        }
      }
      forms.applyErrorsToForm(form, schemaErrors);
      return;
    }
    button = this.$('#save-settings-btn');
    this.oldButtonText = button.text();
    button.text($.i18n.t('common.saving')).attr('disabled', true);
    this.classroom.save();
    this.listenToOnce(this.classroom, 'error', function(model, jqxhr) {
      this.stopListening(this.classroom, 'sync', this.hide);
      button.text(this.oldButtonText).attr('disabled', false);
      return errors.showNotyNetworkError(jqxhr);
    });
    this.listenToOnce(this.classroom, 'sync', this.hide);
    return (ref = window.tracker) != null ? ref.trackEvent("Teachers Edit Class Saved", {
      category: 'Teachers',
      classroomID: this.classroom.id
    }, ['Mixpanel']) : void 0;
  };

  ClassroomSettingsModal.prototype.onClickUpdateCoursesButton = function() {
    this.$('#update-courses-btn').attr('disabled', true);
    return Promise.resolve(this.classroom.updateCourses()).then((function(_this) {
      return function() {
        _this.$('#update-courses-btn').attr('disabled', false);
        return noty({
          text: 'Updated',
          timeout: 2000
        });
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        var ref;
        console.log('e', e);
        _this.$('#update-courses-btn').attr('disabled', false);
        return noty({
          text: ((ref = e.responseJSON) != null ? ref.message : void 0) || e.responseText || 'Error!',
          type: 'error',
          timeout: 5000
        });
      };
    })(this));
  };

  return ClassroomSettingsModal;

})(ModalView);
});

;require.register("views/courses/ClassroomView", function(exports, require, module) {
var ActivateLicensesModal, Campaign, Classroom, ClassroomSettingsModal, ClassroomView, Classrooms, CocoCollection, Course, CourseInstance, InviteToClassroomModal, LevelSession, Levels, Prepaid, Prepaids, RemoveStudentModal, RootView, User, popoverTemplate, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Campaign = require('models/Campaign');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

CourseInstance = require('models/CourseInstance');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

LevelSession = require('models/LevelSession');

Prepaids = require('collections/Prepaids');

Levels = require('collections/Levels');

RootView = require('views/core/RootView');

template = require('templates/courses/classroom-view');

User = require('models/User');

utils = require('core/utils');

Prepaid = require('models/Prepaid');

ClassroomSettingsModal = require('views/courses/ClassroomSettingsModal');

ActivateLicensesModal = require('views/courses/ActivateLicensesModal');

InviteToClassroomModal = require('views/courses/InviteToClassroomModal');

RemoveStudentModal = require('views/courses/RemoveStudentModal');

popoverTemplate = require('templates/courses/classroom-level-popover');

module.exports = ClassroomView = (function(superClass) {
  extend(ClassroomView, superClass);

  function ClassroomView() {
    return ClassroomView.__super__.constructor.apply(this, arguments);
  }

  ClassroomView.prototype.id = 'classroom-view';

  ClassroomView.prototype.template = template;

  ClassroomView.prototype.teacherMode = false;

  ClassroomView.prototype.events = {
    'click #edit-class-details-link': 'onClickEditClassDetailsLink',
    'click #activate-licenses-btn': 'onClickActivateLicensesButton',
    'click .activate-single-license-btn': 'onClickActivateSingleLicenseButton',
    'click #add-students-btn': 'onClickAddStudentsButton',
    'click .enable-btn': 'onClickEnableButton',
    'click .remove-student-link': 'onClickRemoveStudentLink'
  };

  ClassroomView.prototype.initialize = function(options, classroomID) {
    var ref;
    if (me.isAnonymous()) {
      return;
    }
    this.classroom = new Classroom({
      _id: classroomID
    });
    this.supermodel.loadModel(this.classroom);
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.courses.comparator = '_id';
    this.supermodel.loadCollection(this.courses);
    this.courses.comparator = '_id';
    this.courseInstances = new CocoCollection([], {
      url: "/db/course_instance",
      model: CourseInstance
    });
    this.courseInstances.comparator = 'courseID';
    this.supermodel.loadCollection(this.courseInstances, {
      data: {
        classroomID: classroomID
      }
    });
    this.prepaids = new Prepaids();
    this.prepaids.comparator = '_id';
    this.prepaids.fetchByCreator(me.id);
    this.supermodel.loadCollection(this.prepaids);
    this.users = new CocoCollection([], {
      url: "/db/classroom/" + classroomID + "/members?memberLimit=100",
      model: User
    });
    this.users.comparator = (function(_this) {
      return function(user) {
        return user.broadName().toLowerCase();
      };
    })(this);
    this.supermodel.loadCollection(this.users);
    this.listenToOnce(this.courseInstances, 'sync', this.onCourseInstancesSync);
    this.sessions = new CocoCollection([], {
      model: LevelSession
    });
    this.ownedClassrooms = new Classrooms();
    this.ownedClassrooms.fetchMine({
      data: {
        project: '_id'
      }
    });
    this.supermodel.trackCollection(this.ownedClassrooms);
    this.levels = new Levels();
    this.levels.fetchForClassroom(classroomID, {
      data: {
        project: 'name,original,practice,slug'
      }
    });
    this.levels.on('add', function(model) {
      return this._byId[model.get('original')] = model;
    });
    this.supermodel.trackCollection(this.levels);
    return (ref = window.tracker) != null ? ref.trackEvent('Students Class Loaded', {
      category: 'Students',
      classroomID: classroomID
    }, ['Mixpanel']) : void 0;
  };

  ClassroomView.prototype.onCourseInstancesSync = function() {
    var course, courseInstance, j, k, len, len1, query, ref, ref1, results, sessions;
    this.sessions = new CocoCollection([], {
      model: LevelSession
    });
    ref = this.courseInstances.models;
    for (j = 0, len = ref.length; j < len; j++) {
      courseInstance = ref[j];
      sessions = new CocoCollection([], {
        url: "/db/course_instance/" + courseInstance.id + "/level_sessions",
        model: LevelSession
      });
      this.supermodel.loadCollection(sessions, {
        data: {
          project: ['level', 'playtime', 'creator', 'changed', 'state.complete'].join(' ')
        }
      });
      courseInstance.sessions = sessions;
      sessions.courseInstance = courseInstance;
      courseInstance.sessionsByUser = {};
      this.listenToOnce(sessions, 'sync', function(sessions) {
        var k, len1, ref1, results;
        this.sessions.add(sessions.slice());
        ref1 = this.courseInstances.models;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          courseInstance = ref1[k];
          results.push(courseInstance.sessionsByUser = courseInstance.sessions.groupBy('creator'));
        }
        return results;
      });
    }
    ref1 = this.courses.models;
    results = [];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      course = ref1[k];
      query = {
        courseID: course.id,
        classroomID: this.classroom.id
      };
      courseInstance = this.courseInstances.findWhere(query);
      if (!courseInstance) {
        courseInstance = new CourseInstance(query);
        this.courseInstances.add(courseInstance);
        courseInstance.sessions = new CocoCollection([], {
          model: LevelSession
        });
        sessions.courseInstance = courseInstance;
        results.push(courseInstance.sessionsByUser = {});
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ClassroomView.prototype.onLoaded = function() {
    var course, courseID, courseInstance, j, k, len, len1, ref, ref1, user, userSessions;
    this.teacherMode = me.isAdmin() || this.classroom.get('ownerID') === me.id;
    userSessions = this.sessions.groupBy('creator');
    ref = this.users.models;
    for (j = 0, len = ref.length; j < len; j++) {
      user = ref[j];
      user.sessions = new CocoCollection(userSessions[user.id], {
        model: LevelSession
      });
      user.sessions.comparator = 'changed';
      user.sessions.sort();
    }
    ref1 = this.courseInstances.models;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      courseInstance = ref1[k];
      courseID = courseInstance.get('courseID');
      course = this.courses.get(courseID);
      courseInstance.sessions.course = course;
    }
    return ClassroomView.__super__.onLoaded.call(this);
  };

  ClassroomView.prototype.afterRender = function() {
    this.$('[data-toggle="popover"]').popover({
      html: true,
      trigger: 'hover',
      placement: 'top'
    });
    return ClassroomView.__super__.afterRender.call(this);
  };

  ClassroomView.prototype.onClickActivateLicensesButton = function() {
    var modal, ref;
    modal = new ActivateLicensesModal({
      classroom: this.classroom,
      users: this.users
    });
    this.openModalView(modal);
    modal.once('redeem-users', function() {
      return document.location.reload();
    });
    return (ref = application.tracker) != null ? ref.trackEvent('Classroom started enroll students', {
      category: 'Courses'
    }) : void 0;
  };

  ClassroomView.prototype.onClickActivateSingleLicenseButton = function(e) {
    var modal, prepaid, ref, user, userID;
    userID = $(e.target).closest('.btn').data('user-id');
    if (this.prepaids.totalMaxRedeemers() - this.prepaids.totalRedeemers() > 0) {
      prepaid = this.prepaids.find(function(prepaid) {
        return prepaid.status() === 'available';
      });
      return $.ajax({
        method: 'POST',
        url: _.result(prepaid, 'url') + '/redeemers',
        data: {
          userID: userID
        },
        success: (function(_this) {
          return function() {
            var ref;
            if ((ref = application.tracker) != null) {
              ref.trackEvent('Classroom finished enroll student', {
                category: 'Courses',
                userID: userID
              });
            }
            return document.location.reload();
          };
        })(this),
        error: function(jqxhr, textStatus, errorThrown) {
          var message;
          if (jqxhr.status === 402) {
            message = arguments[2];
          } else {
            message = jqxhr.status + ": " + jqxhr.responseText;
          }
          return console.err(message);
        }
      });
    } else {
      user = this.users.get(userID);
      modal = new ActivateLicensesModal({
        classroom: this.classroom,
        users: this.users,
        user: user
      });
      this.openModalView(modal);
      modal.once('redeem-users', function() {
        return document.location.reload();
      });
      return (ref = application.tracker) != null ? ref.trackEvent('Classroom started enroll student', {
        category: 'Courses',
        userID: userID
      }) : void 0;
    }
  };

  ClassroomView.prototype.onClickEditClassDetailsLink = function() {
    var modal;
    modal = new ClassroomSettingsModal({
      classroom: this.classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hidden', this.render);
  };

  ClassroomView.prototype.userLastPlayedString = function(user) {
    var course, lastPlayed, level, levelOriginal, session;
    if (user.sessions == null) {
      return '';
    }
    session = user.sessions.last();
    if (!session) {
      return '';
    }
    course = session.collection.course;
    levelOriginal = session.get('level').original;
    level = this.levels.findWhere({
      original: levelOriginal
    });
    lastPlayed = "";
    if (course) {
      lastPlayed += course.get('name');
    }
    if (level) {
      lastPlayed += ", " + (level.get('name'));
    }
    return lastPlayed;
  };

  ClassroomView.prototype.userPlaytimeString = function(user) {
    var playtime;
    if (user.sessions == null) {
      return '';
    }
    playtime = _.reduce(user.sessions.pluck('playtime'), function(s1, s2) {
      return (s1 || 0) + (s2 || 0);
    });
    if (!playtime) {
      return '';
    }
    return moment.duration(playtime, 'seconds').humanize();
  };

  ClassroomView.prototype.classStats = function() {
    var completeSessions, enrolledUsers, j, k, len, len1, level, levelPracticeMap, playtime, pt, ref, ref1, ref2, session, stats, total;
    stats = {};
    playtime = 0;
    total = 0;
    ref = this.sessions.models;
    for (j = 0, len = ref.length; j < len; j++) {
      session = ref[j];
      pt = session.get('playtime') || 0;
      playtime += pt;
      total += 1;
    }
    stats.averagePlaytime = playtime && total ? moment.duration(playtime / total, "seconds").humanize() : 0;
    stats.totalPlaytime = playtime ? moment.duration(playtime, "seconds").humanize() : 0;
    levelPracticeMap = {};
    ref1 = this.levels.models;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      level = ref1[k];
      levelPracticeMap[level.id] = (ref2 = level.get('practice')) != null ? ref2 : false;
    }
    completeSessions = this.sessions.filter(function(s) {
      var ref3;
      return ((ref3 = s.get('state')) != null ? ref3.complete : void 0) && !levelPracticeMap[s.get('levelID')];
    });
    stats.averageLevelsComplete = this.users.size() ? (_.size(completeSessions) / this.users.size()).toFixed(1) : 'N/A';
    stats.totalLevelsComplete = _.size(completeSessions);
    enrolledUsers = this.users.filter(function(user) {
      return user.isEnrolled();
    });
    stats.enrolledUsers = _.size(enrolledUsers);
    return stats;
  };

  ClassroomView.prototype.onClickAddStudentsButton = function(e) {
    var modal, ref;
    modal = new InviteToClassroomModal({
      classroom: this.classroom
    });
    this.openModalView(modal);
    return (ref = application.tracker) != null ? ref.trackEvent('Classroom started add students', {
      category: 'Courses',
      classroomID: this.classroom.id
    }) : void 0;
  };

  ClassroomView.prototype.onClickEnableButton = function(e) {
    var $button, courseInstance, onCourseInstanceCreated, ref, userID;
    $button = $(e.target).closest('.btn');
    courseInstance = this.courseInstances.get($button.data('course-instance-cid'));
    console.log('looking for course instance', courseInstance, 'for', $button.data('course-instance-cid'), 'out of', this.courseInstances);
    userID = $button.data('user-id');
    $button.attr('disabled', true);
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Course assign student', {
        category: 'Courses',
        courseInstanceID: courseInstance.id,
        userID: userID
      });
    }
    onCourseInstanceCreated = (function(_this) {
      return function() {
        courseInstance.addMember(userID);
        return _this.listenToOnce(courseInstance, 'sync', _this.render);
      };
    })(this);
    if (courseInstance.isNew()) {
      if (!courseInstance.saving) {
        courseInstance.save(null, {
          validate: false
        });
        courseInstance.saving = true;
      }
      return courseInstance.once('sync', onCourseInstanceCreated);
    } else {
      return onCourseInstanceCreated();
    }
  };

  ClassroomView.prototype.onClickRemoveStudentLink = function(e) {
    var modal, user;
    user = this.users.get($(e.target).closest('a').data('user-id'));
    modal = new RemoveStudentModal({
      classroom: this.classroom,
      user: user,
      courseInstances: this.courseInstances
    });
    this.openModalView(modal);
    return modal.once('remove-student', this.onStudentRemoved, this);
  };

  ClassroomView.prototype.onStudentRemoved = function(e) {
    var ref;
    this.users.remove(e.user);
    this.render();
    return (ref = application.tracker) != null ? ref.trackEvent('Classroom removed student', {
      category: 'Courses',
      classroomID: this.classroom.id,
      userID: e.user.id
    }) : void 0;
  };

  ClassroomView.prototype.levelPopoverContent = function(level, session, i) {
    var context;
    if (!level) {
      return null;
    }
    context = {
      moment: moment,
      level: level,
      session: session,
      i: i,
      canViewSolution: this.teacherMode
    };
    return popoverTemplate(context);
  };

  ClassroomView.prototype.getLevelURL = function(level, course, courseInstance, session) {
    if (!(this.teacherMode && _.all(arguments))) {
      return null;
    }
    return "/play/level/" + (level.get('slug')) + "?course=" + course.id + "&course-instance=" + courseInstance.id + "&session=" + session.id + "&observing=true";
  };

  return ClassroomView;

})(RootView);
});

;require.register("views/courses/CourseDetailsView", function(exports, require, module) {
var Classroom, Classrooms, Course, CourseDetailsView, CourseInstance, CourseInstances, Courses, LevelSessions, Levels, RootView, User, storage, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Course = require('models/Course');

Courses = require('collections/Courses');

LevelSessions = require('collections/LevelSessions');

CourseInstance = require('models/CourseInstance');

CourseInstances = require('collections/CourseInstances');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

Levels = require('collections/Levels');

RootView = require('views/core/RootView');

template = require('templates/courses/course-details');

User = require('models/User');

storage = require('core/storage');

module.exports = CourseDetailsView = (function(superClass) {
  extend(CourseDetailsView, superClass);

  CourseDetailsView.prototype.id = 'course-details-view';

  CourseDetailsView.prototype.template = template;

  CourseDetailsView.prototype.memberSort = 'nameAsc';

  CourseDetailsView.prototype.events = {
    'click .btn-play-level': 'onClickPlayLevel',
    'click .btn-select-instance': 'onClickSelectInstance',
    'submit #school-form': 'onSubmitSchoolForm'
  };

  function CourseDetailsView(options, courseID, courseInstanceID) {
    var sessionsLoaded;
    this.courseID = courseID;
    this.courseInstanceID = courseInstanceID;
    CourseDetailsView.__super__.constructor.call(this, options);
    this.courses = new Courses();
    this.course = new Course();
    this.levelSessions = new LevelSessions();
    this.courseInstance = new CourseInstance({
      _id: this.courseInstanceID
    });
    this.owner = new User();
    this.classroom = new Classroom();
    this.levels = new Levels();
    this.courseInstances = new CourseInstances();
    this.supermodel.trackRequest(this.courses.fetch().then((function(_this) {
      return function() {
        return _this.course = _this.courses.get(_this.courseID);
      };
    })(this)));
    sessionsLoaded = this.supermodel.trackRequest(this.levelSessions.fetchForCourseInstance(this.courseInstanceID, {
      cache: false
    }));
    this.supermodel.trackRequest(this.courseInstance.fetch().then((function(_this) {
      return function() {
        var classroomID, levelsLoaded;
        if (_this.destroyed) {
          return;
        }
        _this.owner = new User({
          _id: _this.courseInstance.get('ownerID')
        });
        _this.supermodel.trackRequest(_this.owner.fetch());
        classroomID = _this.courseInstance.get('classroomID');
        _this.classroom = new Classroom({
          _id: classroomID
        });
        _this.supermodel.trackRequest(_this.classroom.fetch());
        levelsLoaded = _this.supermodel.trackRequest(_this.levels.fetchForClassroomAndCourse(classroomID, _this.courseID, {
          data: {
            project: 'concepts,practice,primerLanguage,type,slug,name,original,description,shareable,i18n'
          }
        }));
        return _this.supermodel.trackRequest($.when(levelsLoaded, sessionsLoaded).then(function() {
          var ref;
          _this.buildSessionStats();
          if (_this.destroyed) {
            return;
          }
          if (((ref = _this.memberStats[me.id]) != null ? ref.totalLevelsCompleted : void 0) >= _this.levels.size() - 1) {
            _this.courseComplete = true;
            _this.courseInstances.comparator = 'courseID';
            _this.supermodel.trackRequest(_this.courseInstances.fetchForClassroom(classroomID).then(function() {
              var nextCourseID;
              _this.nextCourseInstance = _.find(_this.courseInstances.models, function(ci) {
                return ci.get('courseID') > _this.courseID;
              });
              if (_this.nextCourseInstance) {
                nextCourseID = _this.nextCourseInstance.get('courseID');
                return _this.nextCourse = _this.courses.get(nextCourseID);
              }
            }));
          }
          return _this.promptForSchool = _this.courseComplete && !me.isAnonymous() && !me.get('schoolName') && !storage.load('no-school');
        }));
      };
    })(this)));
  }

  CourseDetailsView.prototype.initialize = function(options) {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students Class Course Loaded', {
        category: 'Students'
      }, ['Mixpanel']);
    }
    return CourseDetailsView.__super__.initialize.call(this, options);
  };

  CourseDetailsView.prototype.buildSessionStats = function() {
    var base, base1, base2, base3, concept, conceptStateMap, fn, i, j, k, len, len1, len2, level, levelID, levelSession, name, playtime, ref, ref1, ref2, ref3, ref4, ref5, results, state, userID;
    if (this.destroyed) {
      return;
    }
    this.levelConceptMap = {};
    ref = this.levels.models;
    for (i = 0, len = ref.length; i < len; i++) {
      level = ref[i];
      if ((base = this.levelConceptMap)[name = level.get('original')] == null) {
        base[name] = {};
      }
      ref1 = level.get('concepts') || [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        concept = ref1[j];
        this.levelConceptMap[level.get('original')][concept] = true;
      }
      if (level.isType('course-ladder')) {
        this.arenaLevel = level;
      }
    }
    this.memberStats = {};
    this.userConceptStateMap = {};
    this.userLevelStateMap = {};
    ref2 = this.levelSessions.models;
    fn = (function(_this) {
      return function(userID, levelID) {
        var playtime, ref3, ref4, secondSessionForLevel, state;
        secondSessionForLevel = _.find(_this.levelSessions.models, (function(otherSession) {
          return otherSession.get('creator') === userID && otherSession.get('level').original === levelID && otherSession.id !== levelSession.id;
        }));
        if (secondSessionForLevel) {
          if ((ref3 = secondSessionForLevel.get('state')) != null ? ref3.complete : void 0) {
            state = 'complete';
          }
          playtime = playtime + parseInt((ref4 = secondSessionForLevel.get('playtime')) != null ? ref4 : 0, 10);
          return secondSessionForLevel.skipMe = true;
        }
      };
    })(this);
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      levelSession = ref2[k];
      if (levelSession.skipMe) {
        continue;
      }
      userID = levelSession.get('creator');
      levelID = levelSession.get('level').original;
      state = ((ref3 = levelSession.get('state')) != null ? ref3.complete : void 0) ? 'complete' : 'started';
      playtime = parseInt((ref4 = levelSession.get('playtime')) != null ? ref4 : 0, 10);
      fn(userID, levelID);
      if ((base1 = this.memberStats)[userID] == null) {
        base1[userID] = {
          totalLevelsCompleted: 0,
          totalPlayTime: 0
        };
      }
      if (state === 'complete') {
        this.memberStats[userID].totalLevelsCompleted++;
      }
      this.memberStats[userID].totalPlayTime += playtime;
      if ((base2 = this.userConceptStateMap)[userID] == null) {
        base2[userID] = {};
      }
      for (concept in this.levelConceptMap[levelID]) {
        this.userConceptStateMap[userID][concept] = state;
      }
      if ((base3 = this.userLevelStateMap)[userID] == null) {
        base3[userID] = {};
      }
      this.userLevelStateMap[userID][levelID] = state;
    }
    this.conceptsCompleted = {};
    ref5 = this.userConceptStateMap;
    results = [];
    for (userID in ref5) {
      conceptStateMap = ref5[userID];
      results.push((function() {
        var base4, results1;
        results1 = [];
        for (concept in conceptStateMap) {
          state = conceptStateMap[concept];
          if ((base4 = this.conceptsCompleted)[concept] == null) {
            base4[concept] = 0;
          }
          results1.push(this.conceptsCompleted[concept]++);
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  CourseDetailsView.prototype.onClickPlayLevel = function(e) {
    var level, levelID, levelSlug, ref, route, viewArgs, viewClass;
    levelSlug = $(e.target).closest('.btn-play-level').data('level-slug');
    levelID = $(e.target).closest('.btn-play-level').data('level-id');
    level = this.levels.findWhere({
      original: levelID
    });
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students Class Course Play Level', {
        category: 'Students',
        courseID: this.courseID,
        courseInstanceID: this.courseInstanceID,
        levelSlug: levelSlug
      }, ['Mixpanel']);
    }
    if (level.isType('course-ladder')) {
      viewClass = 'views/ladder/LadderView';
      viewArgs = [
        {
          supermodel: this.supermodel
        }, levelSlug
      ];
      route = '/play/ladder/' + levelSlug;
      route += '/course/' + this.courseInstance.id;
      viewArgs = viewArgs.concat(['course', this.courseInstance.id]);
    } else {
      route = this.getLevelURL(levelSlug);
      if (level.get('primerLanguage')) {
        route += "&codeLanguage=" + level.get('primerLanguage');
      }
      viewClass = 'views/play/level/PlayLevelView';
      viewArgs = [
        {
          courseID: this.courseID,
          courseInstanceID: this.courseInstanceID,
          supermodel: this.supermodel
        }, levelSlug
      ];
    }
    return Backbone.Mediator.publish('router:navigate', {
      route: route,
      viewClass: viewClass,
      viewArgs: viewArgs
    });
  };

  CourseDetailsView.prototype.getLevelURL = function(levelSlug) {
    return "/play/level/" + levelSlug + "?course=" + this.courseID + "&course-instance=" + this.courseInstanceID;
  };

  CourseDetailsView.prototype.getOwnerName = function() {
    if (this.owner.isNew()) {
      return;
    }
    if (this.owner.get('firstName') && this.owner.get('lastName')) {
      return (this.owner.get('firstName')) + " " + (this.owner.get('lastName'));
    }
    return this.owner.get('name') || this.owner.get('email');
  };

  CourseDetailsView.prototype.getLastLevelCompleted = function() {
    var i, lastLevelCompleted, len, levelID, ref, ref1, ref2;
    lastLevelCompleted = null;
    ref = this.levels.pluck('original');
    for (i = 0, len = ref.length; i < len; i++) {
      levelID = ref[i];
      if (((ref1 = this.userLevelStateMap) != null ? (ref2 = ref1[me.id]) != null ? ref2[levelID] : void 0 : void 0) === 'complete') {
        lastLevelCompleted = levelID;
      }
    }
    return lastLevelCompleted;
  };

  return CourseDetailsView;

})(RootView);
});

;require.register("views/courses/CourseEnrollView", function(exports, require, module) {
var CocoCollection, Course, CourseEnrollView, CreateAccountModal, RootView, app, stripeHandler, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = require('core/application');

CreateAccountModal = require('views/core/CreateAccountModal');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

RootView = require('views/core/RootView');

stripeHandler = require('core/services/stripe');

template = require('templates/courses/course-enroll');

utils = require('core/utils');

module.exports = CourseEnrollView = (function(superClass) {
  extend(CourseEnrollView, superClass);

  CourseEnrollView.prototype.id = 'course-enroll-view';

  CourseEnrollView.prototype.template = template;

  CourseEnrollView.prototype.events = {
    'click .btn-buy': 'onClickBuy',
    'change .class-name': 'onNameChange',
    'change .course-select': 'onChangeCourse',
    'change .input-seats': 'onSeatsChange',
    'change #programming-language-select': 'onChangeProgrammingLanguageSelect'
  };

  CourseEnrollView.prototype.subscriptions = {
    'stripe:received-token': 'onStripeReceivedToken'
  };

  function CourseEnrollView(options, courseID1) {
    this.courseID = courseID1;
    CourseEnrollView.__super__.constructor.call(this, options);
    if (this.courseID == null) {
      this.courseID = options.courseID;
    }
    this.seats = 20;
    this.selectedLanguage = 'python';
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.listenTo(this.courses, 'sync', this.onCoursesLoaded);
    this.supermodel.loadCollection(this.courses, 'courses');
  }

  CourseEnrollView.prototype.afterRender = function() {
    CourseEnrollView.__super__.afterRender.call(this);
    if (this.selectedCourse) {
      return this.$el.find('.course-select').val(this.selectedCourse.id);
    } else {
      return this.$el.find('.course-select').val('All Courses');
    }
  };

  CourseEnrollView.prototype.onCoursesLoaded = function() {
    if (this.courseID) {
      this.selectedCourse = _.find(this.courses.models, (function(_this) {
        return function(a) {
          return a.id === _this.courseID;
        };
      })(this));
    } else if (this.courses.models.length > 0) {
      this.selectedCourse = this.courses.models[0];
    }
    return this.renderNewPrice();
  };

  CourseEnrollView.prototype.onClickBuy = function(e) {
    var courseTitle, ref, ref1, ref2;
    if (me.isAnonymous()) {
      return this.openModalView(new CreateAccountModal());
    }
    if (this.price === 0) {
      this.seats = 9999;
      this.state = 'creating';
      this.createClass();
      return;
    }
    if (this.seats < 1 || !_.isFinite(this.seats)) {
      alert("Please enter the maximum number of students needed for your class.");
      return;
    }
    this.state = void 0;
    this.stateMessage = void 0;
    this.render();
    courseTitle = (ref = (ref1 = this.selectedCourse) != null ? ref1.get('name') : void 0) != null ? ref : 'All Courses';
    if ((ref2 = application.tracker) != null) {
      ref2.trackEvent('Started course purchase', {
        course: courseTitle,
        price: this.price,
        seats: this.seats
      });
    }
    return stripeHandler.open({
      amount: this.price,
      description: courseTitle + " for " + this.seats + " students",
      bitcoin: true,
      alipay: me.get('country') === 'china' || (me.get('preferredLanguage') || 'en-US').slice(0, 2) === 'zh' ? true : 'auto'
    });
  };

  CourseEnrollView.prototype.onStripeReceivedToken = function(e) {
    this.state = 'purchasing';
    if (typeof this.render === "function") {
      this.render();
    }
    return this.createClass(e.token.id);
  };

  CourseEnrollView.prototype.onChangeCourse = function(e) {
    this.selectedCourse = _.find(this.courses.models, function(a) {
      return a.id === $(e.target).val();
    });
    return this.renderNewPrice();
  };

  CourseEnrollView.prototype.onChangeProgrammingLanguageSelect = function(e) {
    return this.selectedLanguage = this.$('#programming-language-select').val();
  };

  CourseEnrollView.prototype.onNameChange = function(e) {
    return this.className = $('.class-name').val();
  };

  CourseEnrollView.prototype.onSeatsChange = function(e) {
    this.seats = $(e.target).val();
    if (this.seats < 1 || !_.isFinite(this.seats)) {
      this.seats = 20;
    }
    return this.renderNewPrice();
  };

  CourseEnrollView.prototype.createClass = function(token) {
    var data, jqxhr;
    data = {
      name: this.className,
      seats: this.seats,
      stripe: {
        token: token,
        timestamp: new Date().getTime()
      },
      aceConfig: {
        language: this.selectedLanguage
      }
    };
    if (this.selectedCourse) {
      data.courseID = this.selectedCourse.id;
    }
    jqxhr = $.post('/db/course_instance/-/create', data);
    jqxhr.done((function(_this) {
      return function(data, textStatus, jqXHR) {
        var ref, ref1, ref2;
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Finished course purchase', {
            course: (ref1 = (ref2 = _this.selectedCourse) != null ? ref2.get('name') : void 0) != null ? ref1 : 'All Courses',
            price: _this.price,
            seats: _this.seats
          });
        }
        return me.fetch({
          cache: false
        }).always(function() {
          var courseID, courseInstanceID, ref3, ref4, ref5, route, viewArgs;
          courseID = (ref3 = (ref4 = _this.selectedCourse) != null ? ref4.id : void 0) != null ? ref3 : (ref5 = _this.courses.models[0]) != null ? ref5.id : void 0;
          route = "/students/" + courseID;
          viewArgs = [{}, courseID];
          if ((data != null ? data.length : void 0) > 0) {
            courseInstanceID = data[0]._id;
            route += "/" + courseInstanceID;
            viewArgs[0].courseInstanceID = courseInstanceID;
          }
          return Backbone.Mediator.publish('router:navigate', {
            route: route,
            viewClass: 'views/courses/CourseDetailsView',
            viewArgs: viewArgs
          });
        });
      };
    })(this));
    return jqxhr.fail((function(_this) {
      return function(xhr, textStatus, errorThrown) {
        var ref;
        console.error('Got an error purchasing a course:', textStatus, errorThrown);
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Failed course purchase', {
            status: textStatus
          });
        }
        if (xhr.status === 402) {
          _this.state = 'declined';
          _this.stateMessage = arguments[2];
        } else {
          _this.state = 'unknown_error';
          _this.stateMessage = xhr.status + ": " + xhr.responseText;
        }
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
  };

  CourseEnrollView.prototype.renderNewPrice = function() {
    var c, coursePrices;
    if (this.selectedCourse) {
      coursePrices = [this.selectedCourse.get('pricePerSeat')];
    } else {
      coursePrices = (function() {
        var i, len, ref, results;
        ref = this.courses.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          results.push(c.get('pricePerSeat'));
        }
        return results;
      }).call(this);
    }
    this.price = utils.getCourseBundlePrice(coursePrices, this.seats);
    if (me.isAdmin()) {
      this.price = 0;
    }
    return typeof this.render === "function" ? this.render() : void 0;
  };

  return CourseEnrollView;

})(RootView);
});

;require.register("views/courses/CoursesNotAssignedModal", function(exports, require, module) {
var CoursesNotAssignedModal, ModalView, STARTER_LICENSE_COURSE_IDS, State, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ModalView = require('views/core/ModalView');

State = require('models/State');

template = require('templates/courses/courses-not-assigned-modal');

STARTER_LICENSE_COURSE_IDS = require('core/constants').STARTER_LICENSE_COURSE_IDS;

module.exports = CoursesNotAssignedModal = (function(superClass) {
  extend(CoursesNotAssignedModal, superClass);

  function CoursesNotAssignedModal() {
    return CoursesNotAssignedModal.__super__.constructor.apply(this, arguments);
  }

  CoursesNotAssignedModal.prototype.id = 'courses-not-assigned-modal';

  CoursesNotAssignedModal.prototype.template = template;

  CoursesNotAssignedModal.prototype.initialize = function(options) {
    var ref;
    this.i18nData = _.pick(options, ['selected', 'numStudentsWithoutFullLicenses', 'numFullLicensesAvailable']);
    this.state = new State({
      promoteStarterLicenses: false
    });
    if (ref = options.courseID, indexOf.call(STARTER_LICENSE_COURSE_IDS, ref) >= 0) {
      this.supermodel.trackRequest(me.getLeadPriority()).then((function(_this) {
        return function(arg) {
          var priority;
          priority = arg.priority;
          return _this.state.set({
            promoteStarterLicenses: priority === 'low'
          });
        };
      })(this));
    }
    return this.listenTo(this.state, 'change', this.render);
  };

  return CoursesNotAssignedModal;

})(ModalView);
});

;require.register("views/courses/CoursesUpdateAccountView", function(exports, require, module) {
var AuthModal, CoursesUpdateAccountView, JoinClassModal, RootView, errors, logoutUser, me, ref, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

errors = require('core/errors');

RootView = require('views/core/RootView');

template = require('templates/courses/courses-update-account-view');

AuthModal = require('views/core/AuthModal');

JoinClassModal = require('views/courses/JoinClassModal');

ref = require('core/auth'), logoutUser = ref.logoutUser, me = ref.me;

module.exports = CoursesUpdateAccountView = (function(superClass) {
  extend(CoursesUpdateAccountView, superClass);

  function CoursesUpdateAccountView() {
    return CoursesUpdateAccountView.__super__.constructor.apply(this, arguments);
  }

  CoursesUpdateAccountView.prototype.id = 'courses-update-account-view';

  CoursesUpdateAccountView.prototype.template = template;

  CoursesUpdateAccountView.prototype.events = {
    'click .login-btn': 'onClickLogInButton',
    'click .logout-btn': 'onClickLogoutButton',
    'click .remain-teacher-btn': 'onClickRemainTeacherButton',
    'click .update-teacher-btn': 'onClickUpdateTeacherButton',
    'click .remain-student-btn': 'onClickRemainStudentButton',
    'click .update-student-btn': 'onClickUpdateStudentButton'
  };

  CoursesUpdateAccountView.prototype.initialize = function(options) {
    return this.accountType = (function() {
      switch (false) {
        case !me.isTeacher():
          return $.i18n.t('courses.teacher');
        case !me.isStudent():
          return $.i18n.t('courses.student');
      }
    })();
  };

  CoursesUpdateAccountView.prototype.onClickLogInButton = function() {
    var ref1;
    this.openModalView(new AuthModal());
    return (ref1 = application.tracker) != null ? ref1.trackEvent('Started Student Login', {
      category: 'Courses Update Account'
    }) : void 0;
  };

  CoursesUpdateAccountView.prototype.onClickLogoutButton = function() {
    Backbone.Mediator.publish("auth:logging-out", {});
    return logoutUser();
  };

  CoursesUpdateAccountView.prototype.onClickRemainTeacherButton = function(e) {
    return this.remainTeacher(e.target, 'Remain teacher');
  };

  CoursesUpdateAccountView.prototype.onClickUpdateTeacherButton = function(e) {
    var ref1;
    $(e.target).prop('disabled', true);
    if ((ref1 = application.tracker) != null) {
      ref1.trackEvent('Update teacher', {
        category: 'Courses Update Account'
      });
    }
    return application.router.navigate('/teachers/update-account', {
      trigger: true
    });
  };

  CoursesUpdateAccountView.prototype.onClickRemainStudentButton = function(e) {
    return this.becomeStudent(e.target, 'Remain student');
  };

  CoursesUpdateAccountView.prototype.onClickUpdateStudentButton = function(e) {
    var joinClassModal;
    joinClassModal = new JoinClassModal({
      classCode: this.$('input[name="classCode"]').val()
    });
    this.openModalView(joinClassModal);
    return this.listenTo(joinClassModal, 'join:success', (function(_this) {
      return function() {
        return _this.becomeStudent(e.target, 'Update student');
      };
    })(this));
  };

  CoursesUpdateAccountView.prototype.becomeStudent = function(targetElem, trackEventMsg) {
    $(targetElem).prop('disabled', true);
    return me.becomeStudent({
      success: function() {
        var ref1;
        if ((ref1 = application.tracker) != null) {
          ref1.trackEvent(trackEventMsg, {
            category: 'Courses Update Account'
          });
        }
        return application.router.navigate('/students', {
          trigger: true
        });
      },
      error: function() {
        $(targetElem).prop('disabled', false);
        return errors.showNotyNetworkError.apply(errors, arguments);
      }
    });
  };

  CoursesUpdateAccountView.prototype.remainTeacher = function(targetElem, trackEventMsg) {
    $(targetElem).prop('disabled', true);
    return me.remainTeacher({
      success: function() {
        var ref1;
        if ((ref1 = application.tracker) != null) {
          ref1.trackEvent(trackEventMsg, {
            category: 'Courses Update Account'
          });
        }
        return application.router.navigate('/teachers', {
          trigger: true
        });
      },
      error: function() {
        $(targetElem).prop('disabled', false);
        console.log(arguments);
        return errors.showNotyNetworkError.apply(errors, arguments);
      }
    });
  };

  return CoursesUpdateAccountView;

})(RootView);
});

;require.register("views/courses/CoursesView", function(exports, require, module) {
var AuthModal, Campaign, ChangeCourseLanguageModal, ChooseLanguageModal, Classroom, Classrooms, CocoCollection, Course, CourseInstance, CoursesView, CreateAccountModal, HeroSelectModal, JoinClassModal, LevelSession, Levels, NameLoader, RootView, ThangType, app, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = require('core/application');

RootView = require('views/core/RootView');

template = require('templates/courses/courses-view');

AuthModal = require('views/core/AuthModal');

CreateAccountModal = require('views/core/CreateAccountModal');

ChangeCourseLanguageModal = require('views/courses/ChangeCourseLanguageModal');

HeroSelectModal = require('views/courses/HeroSelectModal');

ChooseLanguageModal = require('views/courses/ChooseLanguageModal');

JoinClassModal = require('views/courses/JoinClassModal');

CourseInstance = require('models/CourseInstance');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

LevelSession = require('models/LevelSession');

Levels = require('collections/Levels');

NameLoader = require('core/NameLoader');

Campaign = require('models/Campaign');

ThangType = require('models/ThangType');

utils = require('core/utils');

module.exports = CoursesView = (function(superClass) {
  extend(CoursesView, superClass);

  function CoursesView() {
    return CoursesView.__super__.constructor.apply(this, arguments);
  }

  CoursesView.prototype.id = 'courses-view';

  CoursesView.prototype.template = template;

  CoursesView.prototype.events = {
    'click #log-in-btn': 'onClickLogInButton',
    'click #start-new-game-btn': 'openSignUpModal',
    'click .change-hero-btn': 'onClickChangeHeroButton',
    'click #join-class-btn': 'onClickJoinClassButton',
    'submit #join-class-form': 'onSubmitJoinClassForm',
    'click .play-btn': 'onClickPlay',
    'click .view-class-btn': 'onClickViewClass',
    'click .view-levels-btn': 'onClickViewLevels'
  };

  CoursesView.prototype.getTitle = function() {
    return $.i18n.t('courses.students');
  };

  CoursesView.prototype.initialize = function() {
    var defaultHeroOriginal, heroOriginal, ref;
    this.classCodeQueryVar = utils.getQueryVariable('_cc', false);
    this.courseInstances = new CocoCollection([], {
      url: "/db/user/" + me.id + "/course_instances",
      model: CourseInstance
    });
    this.courseInstances.comparator = function(ci) {
      return ci.get('classroomID') + ci.get('courseID');
    };
    this.listenToOnce(this.courseInstances, 'sync', this.onCourseInstancesLoaded);
    this.supermodel.loadCollection(this.courseInstances, {
      cache: false
    });
    this.classrooms = new CocoCollection([], {
      url: "/db/classroom",
      model: Classroom
    });
    this.classrooms.comparator = function(a, b) {
      return b.id.localeCompare(a.id);
    };
    this.supermodel.loadCollection(this.classrooms, {
      data: {
        memberID: me.id
      },
      cache: false
    });
    this.ownedClassrooms = new Classrooms();
    this.ownedClassrooms.fetchMine({
      data: {
        project: '_id'
      }
    });
    this.supermodel.trackCollection(this.ownedClassrooms);
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.supermodel.loadCollection(this.courses);
    this.originalLevelMap = {};
    this.urls = require('core/urls');
    this.hero = new ThangType;
    defaultHeroOriginal = ThangType.heroes.captain;
    heroOriginal = ((ref = me.get('heroConfig')) != null ? ref.thangType : void 0) || defaultHeroOriginal;
    this.hero.url = "/db/thang.type/" + heroOriginal + "/version";
    this.supermodel.loadModel(this.hero, 'hero');
    return this.listenTo(this.hero, 'all', function() {
      return this.render();
    });
  };

  CoursesView.prototype.afterInsert = function() {
    CoursesView.__super__.afterInsert.call(this);
    if (!(me.isStudent() || (this.classCodeQueryVar && !me.isTeacher()))) {
      return this.onClassLoadError();
    }
  };

  CoursesView.prototype.onCourseInstancesLoaded = function() {
    var courseID, courseInstance, i, len, ref, results;
    this.courseInstances.remove(this.courseInstances.where({
      hourOfCode: true
    }));
    ref = this.courseInstances.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      courseInstance = ref[i];
      if (!courseInstance.get('classroomID')) {
        continue;
      }
      courseID = courseInstance.get('courseID');
      courseInstance.sessions = new CocoCollection([], {
        url: courseInstance.url() + '/my-course-level-sessions',
        model: LevelSession
      });
      courseInstance.sessions.comparator = 'changed';
      results.push(this.supermodel.loadCollection(courseInstance.sessions, {
        data: {
          project: 'state.complete,level.original,playtime,changed'
        }
      }));
    }
    return results;
  };

  CoursesView.prototype.onLoaded = function() {
    var ownerIDs, ref, ref1;
    CoursesView.__super__.onLoaded.call(this);
    if (this.classCodeQueryVar && !me.isAnonymous()) {
      if ((ref = window.tracker) != null) {
        ref.trackEvent('Students Join Class Link', {
          category: 'Students',
          classCode: this.classCodeQueryVar
        }, ['Mixpanel']);
      }
      this.joinClass();
    } else if (this.classCodeQueryVar && me.isAnonymous()) {
      this.openModalView(new CreateAccountModal());
    }
    ownerIDs = (ref1 = _.map(this.classrooms.models, function(c) {
      return c.get('ownerID');
    })) != null ? ref1 : [];
    Promise.resolve($.ajax(NameLoader.loadNames(ownerIDs))).then((function(_this) {
      return function() {
        var i, len, ownerID;
        _this.ownerNameMap = {};
        for (i = 0, len = ownerIDs.length; i < len; i++) {
          ownerID = ownerIDs[i];
          _this.ownerNameMap[ownerID] = NameLoader.getName(ownerID);
        }
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
    return _.forEach(_.unique(_.pluck(this.classrooms.models, 'id')), (function(_this) {
      return function(classroomID) {
        var levels;
        levels = new Levels();
        _this.listenTo(levels, 'sync', function() {
          var i, len, level, ref2;
          if (_this.destroyed) {
            return;
          }
          ref2 = levels.models;
          for (i = 0, len = ref2.length; i < len; i++) {
            level = ref2[i];
            _this.originalLevelMap[level.get('original')] = level;
          }
          return _this.render();
        });
        return _this.supermodel.trackRequest(levels.fetchForClassroom(classroomID, {
          data: {
            project: 'original,primerLanguage,slug'
          }
        }));
      };
    })(this));
  };

  CoursesView.prototype.onClickLogInButton = function() {
    var modal, ref;
    modal = new AuthModal();
    this.openModalView(modal);
    return (ref = window.tracker) != null ? ref.trackEvent('Students Login Started', {
      category: 'Students'
    }, ['Mixpanel']) : void 0;
  };

  CoursesView.prototype.openSignUpModal = function() {
    var modal, ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students Signup Started', {
        category: 'Students'
      }, ['Mixpanel']);
    }
    modal = new CreateAccountModal({
      initialValues: {
        classCode: utils.getQueryVariable('_cc', "")
      }
    });
    return this.openModalView(modal);
  };

  CoursesView.prototype.onClickChangeHeroButton = function() {
    var modal, ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students Change Hero Started', {
        category: 'Students'
      }, ['Mixpanel']);
    }
    modal = new HeroSelectModal({
      currentHeroID: this.hero.id
    });
    this.openModalView(modal);
    this.listenTo(modal, 'hero-select:success', (function(_this) {
      return function(newHero) {
        return _this.hero.set(newHero.attributes);
      };
    })(this));
    return this.listenTo(modal, 'hide', function() {
      return this.stopListening(modal);
    });
  };

  CoursesView.prototype.onSubmitJoinClassForm = function(e) {
    var classCode, ref;
    e.preventDefault();
    classCode = this.$('#class-code-input').val() || this.classCodeQueryVar;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students Join Class With Code', {
        category: 'Students',
        classCode: classCode
      }, ['Mixpanel']);
    }
    return this.joinClass();
  };

  CoursesView.prototype.onClickJoinClassButton = function(e) {
    var classCode, ref;
    classCode = this.$('#class-code-input').val() || this.classCodeQueryVar;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students Join Class With Code', {
        category: 'Students',
        classCode: classCode
      }, ['Mixpanel']);
    }
    return this.joinClass();
  };

  CoursesView.prototype.joinClass = function() {
    var jqxhr, modal, newClassroom;
    if (this.state) {
      return;
    }
    this.state = 'enrolling';
    this.errorMessage = null;
    this.classCode = this.$('#class-code-input').val() || this.classCodeQueryVar;
    if (!this.classCode) {
      this.state = null;
      this.errorMessage = 'Please enter a code.';
      this.renderSelectors('#join-class-form');
      return;
    }
    this.renderSelectors('#join-class-form');
    if (me.get('emailVerified') || me.isStudent()) {
      newClassroom = new Classroom();
      jqxhr = newClassroom.joinWithCode(this.classCode);
      this.listenTo(newClassroom, 'join:success', function() {
        return this.onJoinClassroomSuccess(newClassroom);
      });
      return this.listenTo(newClassroom, 'join:error', function() {
        return this.onJoinClassroomError(newClassroom, jqxhr);
      });
    } else {
      modal = new JoinClassModal({
        classCode: this.classCode
      });
      this.openModalView(modal);
      this.listenTo(modal, 'error', this.onClassLoadError);
      this.listenTo(modal, 'join:success', this.onJoinClassroomSuccess);
      this.listenTo(modal, 'join:error', this.onJoinClassroomError);
      this.listenToOnce(modal, 'hidden', function() {
        if (!me.isStudent()) {
          return this.onClassLoadError();
        }
      });
      return this.listenTo(modal, 'hidden', function() {
        this.state = null;
        return this.renderSelectors('#join-class-form');
      });
    }
  };

  CoursesView.prototype.onClassLoadError = function() {
    return _.defer(function() {
      return application.router.routeDirectly('courses/RestrictedToStudentsView');
    });
  };

  CoursesView.prototype.onJoinClassroomError = function(classroom, jqxhr, options) {
    this.state = null;
    if (jqxhr.status === 422) {
      this.errorMessage = 'Please enter a code.';
    } else if (jqxhr.status === 404) {
      this.errorMessage = $.t('signup.classroom_not_found');
    } else {
      this.errorMessage = "" + jqxhr.responseText;
    }
    return this.renderSelectors('#join-class-form');
  };

  CoursesView.prototype.onJoinClassroomSuccess = function(newClassroom, data, options) {
    var classroomCourseInstances, ref;
    this.state = null;
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Joined classroom', {
        category: 'Courses',
        classCode: this.classCode,
        classroomID: newClassroom.id,
        classroomName: newClassroom.get('name'),
        ownerID: newClassroom.get('ownerID')
      });
    }
    this.classrooms.add(newClassroom);
    this.render();
    this.classroomJustAdded = newClassroom.id;
    classroomCourseInstances = new CocoCollection([], {
      url: "/db/course_instance",
      model: CourseInstance
    });
    classroomCourseInstances.fetch({
      data: {
        classroomID: newClassroom.id
      }
    });
    return this.listenToOnce(classroomCourseInstances, 'sync', function() {
      return document.location.search = '';
    });
  };

  CoursesView.prototype.onClickPlay = function(e) {
    var levelSlug, ref;
    levelSlug = $(e.currentTarget).data('level-slug');
    if ((ref = window.tracker) != null) {
      ref.trackEvent($(e.currentTarget).data('event-action'), {
        category: 'Students',
        levelSlug: levelSlug
      }, ['Mixpanel']);
    }
    return application.router.navigate($(e.currentTarget).data('href'), {
      trigger: true
    });
  };

  CoursesView.prototype.onClickViewClass = function(e) {
    var classroomID, ref;
    classroomID = $(e.target).data('classroom-id');
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students View Class', {
        category: 'Students',
        classroomID: classroomID
      }, ['Mixpanel']);
    }
    return application.router.navigate("/students/" + classroomID, {
      trigger: true
    });
  };

  CoursesView.prototype.onClickViewLevels = function(e) {
    var courseID, courseInstanceID, ref;
    courseID = $(e.target).data('course-id');
    courseInstanceID = $(e.target).data('courseinstance-id');
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students View Levels', {
        category: 'Students',
        courseID: courseID,
        courseInstanceID: courseInstanceID
      }, ['Mixpanel']);
    }
    return application.router.navigate("/students/" + courseID + "/" + courseInstanceID, {
      trigger: true
    });
  };

  return CoursesView;

})(RootView);
});

;require.register("views/courses/EnrollmentsView", function(exports, require, module) {
var ActivateLicensesModal, Classrooms, Courses, EnrollmentsView, FREE_COURSE_IDS, HowToEnrollModal, Prepaids, RootView, STARTER_LICENSE_COURSE_IDS, State, TeachersContactModal, Users, ref, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

Classrooms = require('collections/Classrooms');

State = require('models/State');

Prepaids = require('collections/Prepaids');

template = require('templates/courses/enrollments-view');

Users = require('collections/Users');

Courses = require('collections/Courses');

HowToEnrollModal = require('views/teachers/HowToEnrollModal');

TeachersContactModal = require('views/teachers/TeachersContactModal');

ActivateLicensesModal = require('views/courses/ActivateLicensesModal');

utils = require('core/utils');

ref = require('core/constants'), STARTER_LICENSE_COURSE_IDS = ref.STARTER_LICENSE_COURSE_IDS, FREE_COURSE_IDS = ref.FREE_COURSE_IDS;

module.exports = EnrollmentsView = (function(superClass) {
  extend(EnrollmentsView, superClass);

  function EnrollmentsView() {
    return EnrollmentsView.__super__.constructor.apply(this, arguments);
  }

  EnrollmentsView.prototype.id = 'enrollments-view';

  EnrollmentsView.prototype.template = template;

  EnrollmentsView.prototype.events = {
    'click #enroll-students-btn': 'onClickEnrollStudentsButton',
    'click #how-to-enroll-link': 'onClickHowToEnrollLink',
    'click #contact-us-btn': 'onClickContactUsButton'
  };

  EnrollmentsView.prototype.getTitle = function() {
    return $.i18n.t('teacher.enrollments');
  };

  EnrollmentsView.prototype.i18nData = function() {
    return {
      starterLicenseCourseList: this.state.get('starterLicenseCourseList')
    };
  };

  EnrollmentsView.prototype.initialize = function(options) {
    var leadPriorityRequest, ref1;
    this.state = new State({
      totalEnrolled: 0,
      totalNotEnrolled: 0,
      classroomNotEnrolledMap: {},
      classroomEnrolledMap: {},
      numberOfStudents: 15,
      totalCourses: 0,
      prepaidGroups: {
        'available': [],
        'pending': []
      },
      shouldUpsell: true
    });
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent('Classes Licenses Loaded', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    EnrollmentsView.__super__.initialize.call(this, options);
    this.courses = new Courses();
    this.supermodel.trackRequest(this.courses.fetch({
      data: {
        project: 'free,i18n,name'
      }
    }));
    this.listenTo(this.courses, 'sync', function() {
      return this.state.set({
        starterLicenseCourseList: this.getStarterLicenseCourseList()
      });
    });
    this.listenTo(me, 'change:preferredLanguage', function() {
      return this.state.set({
        starterLicenseCourseList: this.getStarterLicenseCourseList()
      });
    });
    this.members = new Users();
    this.classrooms = new Classrooms();
    this.classrooms.comparator = '_id';
    this.listenToOnce(this.classrooms, 'sync', this.onceClassroomsSync);
    this.supermodel.trackRequest(this.classrooms.fetchMine());
    this.prepaids = new Prepaids();
    this.supermodel.trackRequest(this.prepaids.fetchByCreator(me.id));
    this.debouncedRender = _.debounce(this.render, 0);
    this.listenTo(this.prepaids, 'sync', this.updatePrepaidGroups);
    this.listenTo(this.state, 'all', this.debouncedRender);
    this.listenTo(me, 'change:enrollmentRequestSent', this.debouncedRender);
    leadPriorityRequest = me.getLeadPriority();
    this.supermodel.trackRequest(leadPriorityRequest);
    return leadPriorityRequest.then((function(_this) {
      return function(arg) {
        var priority, ref2, shouldUpsell;
        priority = arg.priority;
        shouldUpsell = priority === 'low';
        _this.state.set({
          shouldUpsell: shouldUpsell
        });
        if (shouldUpsell) {
          return (ref2 = application.tracker) != null ? ref2.trackEvent('Starter License Upsell: Banner Viewed', {
            price: _this.state.get('centsPerStudent'),
            seats: _this.state.get('quantityToBuy')
          }) : void 0;
        }
      };
    })(this));
  };

  EnrollmentsView.prototype.getStarterLicenseCourseList = function() {
    var COURSE_IDS, starterLicenseCourseList;
    if (!this.courses.loaded) {
      return;
    }
    COURSE_IDS = _.difference(STARTER_LICENSE_COURSE_IDS, FREE_COURSE_IDS);
    starterLicenseCourseList = _.difference(STARTER_LICENSE_COURSE_IDS, FREE_COURSE_IDS).map((function(_this) {
      return function(_id) {
        var ref1;
        return utils.i18n(((ref1 = _this.courses.findWhere({
          _id: _id
        })) != null ? ref1.attributes : void 0) || {}, 'name');
      };
    })(this));
    starterLicenseCourseList.push($.t('general.and') + ' ' + starterLicenseCourseList.pop());
    return starterLicenseCourseList.join(', ');
  };

  EnrollmentsView.prototype.onceClassroomsSync = function() {
    var classroom, i, len, ref1, results;
    ref1 = this.classrooms.models;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      classroom = ref1[i];
      results.push(this.supermodel.trackRequests(this.members.fetchForClassroom(classroom, {
        remove: false,
        removeDeleted: true
      })));
    }
    return results;
  };

  EnrollmentsView.prototype.onLoaded = function() {
    this.calculateEnrollmentStats();
    this.state.set('totalCourses', this.courses.size());
    return EnrollmentsView.__super__.onLoaded.call(this);
  };

  EnrollmentsView.prototype.updatePrepaidGroups = function() {
    return this.state.set('prepaidGroups', this.prepaids.groupBy(function(p) {
      return p.status();
    }));
  };

  EnrollmentsView.prototype.calculateEnrollmentStats = function() {
    var classroom, enrolledUsers, groups, i, len, map, ref1;
    this.removeDeletedStudents();
    groups = this.members.groupBy(function(m) {
      return m.isEnrolled();
    });
    enrolledUsers = new Users(groups["true"]);
    this.notEnrolledUsers = new Users(groups["false"]);
    map = {};
    ref1 = this.classrooms.models;
    for (i = 0, len = ref1.length; i < len; i++) {
      classroom = ref1[i];
      map[classroom.id] = _.countBy(classroom.get('members'), function(userID) {
        return enrolledUsers.get(userID) != null;
      })["false"];
    }
    this.state.set({
      totalEnrolled: enrolledUsers.size(),
      totalNotEnrolled: this.notEnrolledUsers.size(),
      classroomNotEnrolledMap: map
    });
    return true;
  };

  EnrollmentsView.prototype.removeDeletedStudents = function(e) {
    var classroom, i, len, ref1;
    ref1 = this.classrooms.models;
    for (i = 0, len = ref1.length; i < len; i++) {
      classroom = ref1[i];
      _.remove(classroom.get('members'), (function(_this) {
        return function(memberID) {
          var ref2;
          return !_this.members.get(memberID) || ((ref2 = _this.members.get(memberID)) != null ? ref2.get('deleted') : void 0);
        };
      })(this));
    }
    return true;
  };

  EnrollmentsView.prototype.onClickHowToEnrollLink = function() {
    return this.openModalView(new HowToEnrollModal());
  };

  EnrollmentsView.prototype.onClickContactUsButton = function() {
    var ref1;
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent('Classes Licenses Contact Us', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    return this.openModalView(new TeachersContactModal());
  };

  EnrollmentsView.prototype.onClickEnrollStudentsButton = function() {
    var modal, ref1;
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent('Classes Licenses Enroll Students', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    modal = new ActivateLicensesModal({
      selectedUsers: this.notEnrolledUsers,
      users: this.members
    });
    this.openModalView(modal);
    return modal.once('hidden', (function(_this) {
      return function() {
        _this.prepaids.add(modal.prepaids.models, {
          merge: true
        });
        return _this.debouncedRender();
      };
    })(this));
  };

  return EnrollmentsView;

})(RootView);
});

;require.register("views/courses/HeroSelectModal", function(exports, require, module) {
var Classroom, HeroSelectModal, HeroSelectView, ModalView, State, ThangType, ThangTypes, User, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

HeroSelectView = require('views/core/HeroSelectView');

template = require('templates/courses/hero-select-modal');

Classroom = require('models/Classroom');

ThangTypes = require('collections/ThangTypes');

State = require('models/State');

ThangType = require('models/ThangType');

User = require('models/User');

module.exports = HeroSelectModal = (function(superClass) {
  extend(HeroSelectModal, superClass);

  function HeroSelectModal() {
    return HeroSelectModal.__super__.constructor.apply(this, arguments);
  }

  HeroSelectModal.prototype.id = 'hero-select-modal';

  HeroSelectModal.prototype.template = template;

  HeroSelectModal.prototype.retainSubviews = true;

  HeroSelectModal.prototype.events = {
    'click .select-hero-btn': 'onClickSelectHeroButton'
  };

  HeroSelectModal.prototype.initialize = function() {
    return this.listenTo(this.insertSubView(new HeroSelectView({
      showCurrentHero: true
    })), 'hero-select:success', function(hero) {
      return this.trigger('hero-select:success', hero);
    });
  };

  HeroSelectModal.prototype.onClickSelectHeroButton = function() {
    return this.hide();
  };

  return HeroSelectModal;

})(ModalView);
});

;require.register("views/courses/InviteToClassroomModal", function(exports, require, module) {
var InviteToClassroomModal, ModalView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/invite-to-classroom-modal');

module.exports = InviteToClassroomModal = (function(superClass) {
  extend(InviteToClassroomModal, superClass);

  function InviteToClassroomModal() {
    return InviteToClassroomModal.__super__.constructor.apply(this, arguments);
  }

  InviteToClassroomModal.prototype.id = 'invite-to-classroom-modal';

  InviteToClassroomModal.prototype.template = template;

  InviteToClassroomModal.prototype.events = {
    'click #send-invites-btn': 'onClickSendInvitesButton',
    'click #copy-url-btn, #join-url-input': 'copyURL'
  };

  InviteToClassroomModal.prototype.initialize = function(options) {
    this.classroom = options.classroom;
    this.classCode = this.classroom.get('codeCamel') || this.classroom.get('code');
    return this.joinURL = document.location.origin + "/students?_cc=" + this.classCode;
  };

  InviteToClassroomModal.prototype.onClickSendInvitesButton = function() {
    var email, emails, ref;
    emails = this.$('#invite-emails-textarea').val();
    emails = emails.split('\n');
    emails = _.filter((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = emails.length; i < len; i++) {
        email = emails[i];
        results.push(_.string.trim(email));
      }
      return results;
    })());
    if (!emails.length) {
      return;
    }
    this.$('#send-invites-btn, #invite-emails-textarea').addClass('hide');
    this.$('#invite-emails-sending-alert').removeClass('hide');
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Classroom invite via email', {
        category: 'Courses',
        classroomID: this.classroom.id,
        emails: emails
      });
    }
    return this.classroom.inviteMembers(emails, {
      success: (function(_this) {
        return function() {
          _this.$('#invite-emails-sending-alert').addClass('hide');
          return _this.$('#invite-emails-success-alert').removeClass('hide');
        };
      })(this)
    });
  };

  InviteToClassroomModal.prototype.copyURL = function() {
    var err, error, ref;
    this.$('#join-url-input').val(this.joinURL).select();
    try {
      document.execCommand('copy');
      this.$('#copied-alert').removeClass('hide');
      return (ref = application.tracker) != null ? ref.trackEvent('Classroom copy URL', {
        category: 'Courses',
        classroomID: this.classroom.id,
        url: this.joinURL
      }) : void 0;
    } catch (error) {
      err = error;
      console.log('Oops, unable to copy', err);
      return this.$('#copy-failed-alert').removeClass('hide');
    }
  };

  return InviteToClassroomModal;

})(ModalView);
});

;require.register("views/courses/JoinClassModal", function(exports, require, module) {
var Classroom, JoinClassModal, ModalView, User, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/join-class-modal');

Classroom = require('models/Classroom');

User = require('models/User');

module.exports = JoinClassModal = (function(superClass) {
  extend(JoinClassModal, superClass);

  function JoinClassModal() {
    return JoinClassModal.__super__.constructor.apply(this, arguments);
  }

  JoinClassModal.prototype.id = 'join-class-modal';

  JoinClassModal.prototype.template = template;

  JoinClassModal.prototype.events = {
    'click .join-class-btn': 'onClickJoinClassButton'
  };

  JoinClassModal.prototype.initialize = function(arg) {
    var jqxhr;
    this.classCode = (arg != null ? arg : {}).classCode;
    this.classroom = new Classroom();
    this.teacher = new User();
    jqxhr = this.supermodel.trackRequest(this.classroom.fetchByCode(this.classCode));
    if (!me.get('emailVerified')) {
      this.supermodel.trackRequest($.post("/db/user/" + me.id + "/request-verify-email"));
    }
    this.listenTo(this.classroom, 'error', function() {
      return this.trigger('error');
    });
    this.listenTo(this.classroom, 'sync', function() {
      return this.render;
    });
    this.listenTo(this.classroom, 'join:success', function() {
      return this.trigger('join:success', this.classroom);
    });
    return this.listenTo(this.classroom, 'join:error', function() {
      return this.trigger('join:error', this.classroom, jqxhr);
    });
  };

  JoinClassModal.prototype.onClickJoinClassButton = function() {
    return this.classroom.joinWithCode(this.classCode);
  };

  return JoinClassModal;

})(ModalView);
});

;require.register("views/courses/RemoveStudentModal", function(exports, require, module) {
var ModalView, RemoveStudentModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/remove-student-modal');

module.exports = RemoveStudentModal = (function(superClass) {
  extend(RemoveStudentModal, superClass);

  function RemoveStudentModal() {
    return RemoveStudentModal.__super__.constructor.apply(this, arguments);
  }

  RemoveStudentModal.prototype.id = 'remove-student-modal';

  RemoveStudentModal.prototype.template = template;

  RemoveStudentModal.prototype.events = {
    'click #remove-student-btn': 'onClickRemoveStudentButton'
  };

  RemoveStudentModal.prototype.initialize = function(options) {
    this.classroom = options.classroom;
    this.user = options.user;
    return this.courseInstances = options.courseInstances;
  };

  RemoveStudentModal.prototype.onClickRemoveStudentButton = function() {
    var userID;
    this.$('#remove-student-buttons').addClass('hide');
    this.$('#remove-student-progress').removeClass('hide');
    userID = this.user.id;
    this.toRemove = this.courseInstances.filter(function(courseInstance) {
      return _.contains(courseInstance.get('members'), userID);
    });
    this.toRemove.push(this.classroom);
    this.totalJobs = _.size(this.toRemove);
    return this.removeStudent();
  };

  RemoveStudentModal.prototype.removeStudent = function() {
    var model, pct;
    model = this.toRemove.shift();
    if (!model) {
      this.trigger('remove-student', {
        user: this.user
      });
      this.hide();
      return;
    }
    model.removeMember(this.user.id);
    pct = (100 * (this.totalJobs - this.toRemove.length) / this.totalJobs).toFixed(1) + '%';
    this.$('#remove-student-progress .progress-bar').css('width', pct);
    return this.listenToOnce(model, 'sync', function() {
      return this.removeStudent();
    });
  };

  return RemoveStudentModal;

})(ModalView);
});

;require.register("views/courses/RestrictedToStudentsView", function(exports, require, module) {
var RestrictedToStudentsView, RootView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

module.exports = RestrictedToStudentsView = (function(superClass) {
  extend(RestrictedToStudentsView, superClass);

  function RestrictedToStudentsView() {
    return RestrictedToStudentsView.__super__.constructor.apply(this, arguments);
  }

  RestrictedToStudentsView.prototype.id = 'restricted-to-students-view';

  RestrictedToStudentsView.prototype.template = require('templates/courses/restricted-to-students-view');

  RestrictedToStudentsView.prototype.initialize = function() {
    var ref;
    return (ref = window.tracker) != null ? ref.trackEvent('Restricted To Students Loaded', {
      category: 'Students'
    }, []) : void 0;
  };

  return RestrictedToStudentsView;

})(RootView);
});

;require.register("views/courses/StudentCoursesView", function(exports, require, module) {
var Classroom, CocoCollection, Course, CourseInstance, CreateAccountModal, RootView, StudentCoursesView, User, app, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = require('core/application');

CreateAccountModal = require('views/core/CreateAccountModal');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

Classroom = require('models/Classroom');

User = require('models/User');

CourseInstance = require('models/CourseInstance');

RootView = require('views/core/RootView');

template = require('templates/courses/student-courses-view');

utils = require('core/utils');

module.exports = StudentCoursesView = (function(superClass) {
  extend(StudentCoursesView, superClass);

  StudentCoursesView.prototype.id = 'student-courses-view';

  StudentCoursesView.prototype.template = template;

  StudentCoursesView.prototype.events = {
    'click #join-class-btn': 'onClickJoinClassButton'
  };

  function StudentCoursesView(options) {
    StudentCoursesView.__super__.constructor.call(this, options);
    this.courseInstances = new CocoCollection([], {
      url: "/db/user/" + me.id + "/course_instances",
      model: CourseInstance
    });
    this.courseInstances.comparator = function(ci) {
      return ci.get('classroomID') + ci.get('courseID');
    };
    this.supermodel.loadCollection(this.courseInstances, 'course_instances');
    this.classrooms = new CocoCollection([], {
      url: "/db/classroom",
      model: Classroom
    });
    this.supermodel.loadCollection(this.classrooms, 'classrooms', {
      data: {
        memberID: me.id
      }
    });
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.supermodel.loadCollection(this.courses, 'courses');
  }

  StudentCoursesView.prototype.onLoaded = function() {
    if ((this.classCode = utils.getQueryVariable('_cc', false)) && !me.isAnonymous()) {
      this.joinClass();
    }
    return StudentCoursesView.__super__.onLoaded.call(this);
  };

  StudentCoursesView.prototype.onClickJoinClassButton = function(e) {
    if (me.isAnonymous()) {
      return this.openModalView(new CreateAccountModal());
    }
    this.classCode = this.$('#classroom-code-input').val();
    return this.joinClass();
  };

  StudentCoursesView.prototype.joinClass = function() {
    this.state = 'enrolling';
    this.renderSelectors('#join-classroom-form');
    return $.ajax({
      method: 'POST',
      url: '/db/classroom/-/members',
      data: {
        code: this.classCode
      },
      context: this,
      success: this.onJoinClassroomSuccess,
      error: function(jqxhr, textStatus, errorThrown) {
        var ref;
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Failed to join classroom with code', {
            status: textStatus
          });
        }
        this.state = 'unknown_error';
        if (jqxhr.status === 422) {
          this.stateMessage = 'Please enter a code.';
        } else if (jqxhr.status === 404) {
          this.stateMessage = 'Code not found.';
        } else {
          this.stateMessage = "" + jqxhr.responseText;
        }
        return this.renderSelectors('#join-classroom-form');
      }
    });
  };

  StudentCoursesView.prototype.onJoinClassroomSuccess = function(data, textStatus, jqxhr) {
    var classroom, classroomCourseInstances, ref;
    classroom = new Classroom(data);
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Joined classroom', {
        classroomID: classroom.id,
        classroomName: classroom.get('name'),
        ownerID: classroom.get('ownerID')
      });
    }
    this.classrooms.add(classroom);
    this.render();
    classroomCourseInstances = new CocoCollection([], {
      url: "/db/course_instance",
      model: CourseInstance
    });
    classroomCourseInstances.fetch({
      data: {
        classroomID: classroom.id
      }
    });
    return this.listenToOnce(classroomCourseInstances, 'sync', function() {
      var course, courseInstance, i, jqxhrs, len, ref1;
      jqxhrs = [];
      ref1 = classroomCourseInstances.models;
      for (i = 0, len = ref1.length; i < len; i++) {
        courseInstance = ref1[i];
        course = this.courses.get(courseInstance.get('courseID'));
        if (course.get('free')) {
          jqxhrs.push($.ajax({
            method: 'POST',
            url: _.result(courseInstance, 'url') + '/members',
            data: {
              userID: me.id
            },
            context: this,
            success: function(data) {
              this.courseInstances.add(data);
              return this.courseInstances.get(data._id).justJoined = true;
            }
          }));
        }
      }
      return $.when.apply($, jqxhrs).done((function(_this) {
        return function() {
          _this.state = '';
          return _this.render();
        };
      })(this));
    });
  };

  return StudentCoursesView;

})(RootView);
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

;require.register("views/courses/TeacherClassesView", function(exports, require, module) {
var Campaign, Campaigns, Classroom, ClassroomSettingsModal, Classrooms, CourseInstance, CourseInstances, Courses, InviteToClassroomModal, LevelSessions, RootView, TeacherClassesView, User, helper, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/courses/teacher-classes-view');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

Courses = require('collections/Courses');

Campaign = require('models/Campaign');

Campaigns = require('collections/Campaigns');

LevelSessions = require('collections/LevelSessions');

CourseInstance = require('models/CourseInstance');

CourseInstances = require('collections/CourseInstances');

ClassroomSettingsModal = require('views/courses/ClassroomSettingsModal');

InviteToClassroomModal = require('views/courses/InviteToClassroomModal');

User = require('models/User');

utils = require('core/utils');

helper = require('lib/coursesHelper');

module.exports = TeacherClassesView = (function(superClass) {
  extend(TeacherClassesView, superClass);

  function TeacherClassesView() {
    return TeacherClassesView.__super__.constructor.apply(this, arguments);
  }

  TeacherClassesView.prototype.id = 'teacher-classes-view';

  TeacherClassesView.prototype.template = template;

  TeacherClassesView.prototype.helper = helper;

  TeacherClassesView.prototype.events = {
    'click .edit-classroom': 'onClickEditClassroom',
    'click .archive-classroom': 'onClickArchiveClassroom',
    'click .unarchive-classroom': 'onClickUnarchiveClassroom',
    'click .add-students-btn': 'onClickAddStudentsButton',
    'click .create-classroom-btn': 'onClickCreateClassroomButton',
    'click .create-teacher-btn': 'onClickCreateTeacherButton',
    'click .update-teacher-btn': 'onClickUpdateTeacherButton',
    'click .view-class-btn': 'onClickViewClassButton'
  };

  TeacherClassesView.prototype.getTitle = function() {
    return $.i18n.t('teacher.my_classes');
  };

  TeacherClassesView.prototype.initialize = function(options) {
    var ref;
    TeacherClassesView.__super__.initialize.call(this, options);
    this.classrooms = new Classrooms();
    this.classrooms.comparator = function(a, b) {
      return b.id.localeCompare(a.id);
    };
    this.classrooms.fetchMine();
    this.supermodel.trackCollection(this.classrooms);
    this.listenTo(this.classrooms, 'sync', function() {
      var classroom, j, jqxhrs, len, ref, results;
      ref = this.classrooms.models;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        classroom = ref[j];
        classroom.sessions = new LevelSessions();
        jqxhrs = classroom.sessions.fetchForAllClassroomMembers(classroom);
        if (jqxhrs.length > 0) {
          results.push(this.supermodel.trackCollection(classroom.sessions));
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Classes Loaded', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    this.courses = new Courses();
    this.courses.fetch();
    this.supermodel.trackCollection(this.courses);
    this.courseInstances = new CourseInstances();
    this.courseInstances.fetchByOwner(me.id);
    this.supermodel.trackCollection(this.courseInstances);
    return this.progressDotTemplate = require('templates/teachers/hovers/progress-dot-whole-course');
  };

  TeacherClassesView.prototype.afterRender = function() {
    TeacherClassesView.__super__.afterRender.call(this);
    return $('.progress-dot').each(function(i, el) {
      var dot;
      dot = $(el);
      return dot.tooltip({
        html: true,
        container: dot
      });
    });
  };

  TeacherClassesView.prototype.onLoaded = function() {
    helper.calculateDots(this.classrooms, this.courses, this.courseInstances);
    return TeacherClassesView.__super__.onLoaded.call(this);
  };

  TeacherClassesView.prototype.onClickEditClassroom = function(e) {
    var classroom, classroomID, modal, ref;
    classroomID = $(e.target).data('classroom-id');
    if ((ref = window.tracker) != null) {
      ref.trackEvent($(e.target).data('event-action'), {
        category: 'Teachers',
        classroomID: classroomID
      }, ['Mixpanel']);
    }
    classroom = this.classrooms.get(classroomID);
    modal = new ClassroomSettingsModal({
      classroom: classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hide', this.render);
  };

  TeacherClassesView.prototype.onClickCreateClassroomButton = function(e) {
    var classroom, modal, ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Classes Create New Class Started', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    classroom = new Classroom({
      ownerID: me.id
    });
    modal = new ClassroomSettingsModal({
      classroom: classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal.classroom, 'sync', function() {
      var ref1;
      if ((ref1 = window.tracker) != null) {
        ref1.trackEvent('Teachers Classes Create New Class Finished', {
          category: 'Teachers'
        }, ['Mixpanel']);
      }
      this.classrooms.add(modal.classroom);
      this.addFreeCourseInstances();
      return this.render();
    });
  };

  TeacherClassesView.prototype.onClickCreateTeacherButton = function(e) {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent($(e.target).data('event-action'), {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    return application.router.navigate("/teachers/signup", {
      trigger: true
    });
  };

  TeacherClassesView.prototype.onClickUpdateTeacherButton = function(e) {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent($(e.target).data('event-action'), {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    return application.router.navigate("/teachers/update-account", {
      trigger: true
    });
  };

  TeacherClassesView.prototype.onClickAddStudentsButton = function(e) {
    var classroom, classroomID, modal, ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Classes Add Students Started', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    classroomID = $(e.currentTarget).data('classroom-id');
    classroom = this.classrooms.get(classroomID);
    modal = new InviteToClassroomModal({
      classroom: classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hide', this.render);
  };

  TeacherClassesView.prototype.onClickArchiveClassroom = function(e) {
    var classroom, classroomID;
    classroomID = $(e.currentTarget).data('classroom-id');
    classroom = this.classrooms.get(classroomID);
    classroom.set('archived', true);
    return classroom.save({}, {
      success: (function(_this) {
        return function() {
          var ref;
          if ((ref = window.tracker) != null) {
            ref.trackEvent('Teachers Classes Archived Class', {
              category: 'Teachers'
            }, ['Mixpanel']);
          }
          return _this.render();
        };
      })(this)
    });
  };

  TeacherClassesView.prototype.onClickUnarchiveClassroom = function(e) {
    var classroom, classroomID;
    classroomID = $(e.currentTarget).data('classroom-id');
    classroom = this.classrooms.get(classroomID);
    classroom.set('archived', false);
    return classroom.save({}, {
      success: (function(_this) {
        return function() {
          var ref;
          if ((ref = window.tracker) != null) {
            ref.trackEvent('Teachers Classes Unarchived Class', {
              category: 'Teachers'
            }, ['Mixpanel']);
          }
          return _this.render();
        };
      })(this)
    });
  };

  TeacherClassesView.prototype.onClickViewClassButton = function(e) {
    var classroomID, ref;
    classroomID = $(e.target).data('classroom-id');
    if ((ref = window.tracker) != null) {
      ref.trackEvent($(e.target).data('event-action'), {
        category: 'Teachers',
        classroomID: classroomID
      }, ['Mixpanel']);
    }
    return application.router.navigate("/teachers/classes/" + classroomID, {
      trigger: true
    });
  };

  TeacherClassesView.prototype.addFreeCourseInstances = function() {
    var classroom, course, courseInstance, j, k, len, len1, ref, ref1;
    ref = this.classrooms.models;
    for (j = 0, len = ref.length; j < len; j++) {
      classroom = ref[j];
      ref1 = this.courses.models;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        course = ref1[k];
        if (!course.get('free')) {
          continue;
        }
        courseInstance = this.courseInstances.findWhere({
          classroomID: classroom.id,
          courseID: course.id
        });
        if (!courseInstance) {
          courseInstance = new CourseInstance({
            classroomID: classroom.id,
            courseID: course.id
          });
          courseInstance.save(null, {
            validate: false
          });
          this.courseInstances.add(courseInstance);
          this.listenToOnce(courseInstance, 'sync', this.addFreeCourseInstances);
          return;
        }
      }
    }
  };

  return TeacherClassesView;

})(RootView);
});

;require.register("views/courses/TeacherCoursesView", function(exports, require, module) {
var Campaigns, Classroom, Classrooms, CocoCollection, CocoModel, CourseInstance, Courses, HeroSelectModal, RootView, TeacherCoursesView, User, app, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = require('core/application');

CocoCollection = require('collections/CocoCollection');

CocoModel = require('models/CocoModel');

Courses = require('collections/Courses');

Campaigns = require('collections/Campaigns');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

User = require('models/User');

CourseInstance = require('models/CourseInstance');

RootView = require('views/core/RootView');

template = require('templates/courses/teacher-courses-view');

HeroSelectModal = require('views/courses/HeroSelectModal');

module.exports = TeacherCoursesView = (function(superClass) {
  extend(TeacherCoursesView, superClass);

  function TeacherCoursesView() {
    return TeacherCoursesView.__super__.constructor.apply(this, arguments);
  }

  TeacherCoursesView.prototype.id = 'teacher-courses-view';

  TeacherCoursesView.prototype.template = template;

  TeacherCoursesView.prototype.events = {
    'click .guide-btn': 'onClickGuideButton',
    'click .play-level-button': 'onClickPlayLevel'
  };

  TeacherCoursesView.prototype.getTitle = function() {
    return $.i18n.t('teacher.courses');
  };

  TeacherCoursesView.prototype.initialize = function(options) {
    var ref;
    TeacherCoursesView.__super__.initialize.call(this, options);
    this.utils = require('core/utils');
    this.ownedClassrooms = new Classrooms();
    this.ownedClassrooms.fetchMine({
      data: {
        project: '_id'
      }
    });
    this.supermodel.trackCollection(this.ownedClassrooms);
    this.courses = new Courses();
    if (me.isAdmin()) {
      this.supermodel.trackRequest(this.courses.fetch());
    } else {
      this.supermodel.trackRequest(this.courses.fetchReleased());
    }
    this.campaigns = new Campaigns();
    this.supermodel.trackRequest(this.campaigns.fetchByType('course', {
      data: {
        project: 'levels,levelsUpdated'
      }
    }));
    return (ref = window.tracker) != null ? ref.trackEvent('Classes Guides Loaded', {
      category: 'Teachers'
    }, ['Mixpanel']) : void 0;
  };

  TeacherCoursesView.prototype.onClickGuideButton = function(e) {
    var courseID, courseName, eventAction, ref;
    courseID = $(e.currentTarget).data('course-id');
    courseName = $(e.currentTarget).data('course-name');
    eventAction = $(e.currentTarget).data('event-action');
    return (ref = window.tracker) != null ? ref.trackEvent(eventAction, {
      category: 'Teachers',
      courseID: courseID,
      courseName: courseName
    }, ['Mixpanel']) : void 0;
  };

  TeacherCoursesView.prototype.onClickPlayLevel = function(e) {
    var courseID, firstLevelSlug, form, language, levelSlug, ref, url;
    form = $(e.currentTarget).closest('.play-level-form');
    levelSlug = form.find('.level-select').val();
    courseID = form.data('course-id');
    language = form.find('.language-select').val() || 'javascript';
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Classes Guides Play Level', {
        category: 'Teachers',
        courseID: courseID,
        language: language,
        levelSlug: levelSlug
      }, ['Mixpanel']);
    }
    url = "/play/level/" + levelSlug + "?course=" + courseID + "&codeLanguage=" + language;
    firstLevelSlug = this.campaigns.get(this.courses.at(0).get('campaignID')).getLevels().at(0).get('slug');
    if (levelSlug === firstLevelSlug) {
      return this.listenToOnce(this.openModalView(new HeroSelectModal()), {
        'hidden': function() {
          return application.router.navigate(url, {
            trigger: true
          });
        }
      });
    } else {
      return application.router.navigate(url, {
        trigger: true
      });
    }
  };

  return TeacherCoursesView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses.js.map