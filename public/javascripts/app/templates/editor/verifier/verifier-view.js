require.register("templates/editor/verifier/verifier-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view;var accountLinks_mixin = function(){
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div class=\"container\"><div class=\"row verifier-row\"><div class=\"col-sm-3\"><p class=\"alert alert-success\">Passed: " + (jade.escape((jade.interp = view.passed) == null ? '' : jade.interp)) + "</p></div><div class=\"col-sm-3\"><p class=\"alert alert-warning\">Test Problem: " + (jade.escape((jade.interp = view.problem) == null ? '' : jade.interp)) + "</p></div><div class=\"col-sm-3\"><p class=\"alert alert-danger\">Failed: " + (jade.escape((jade.interp = view.failed) == null ? '' : jade.interp)) + "</p></div><div class=\"col-sm-3\"><p class=\"alert alert-info\">To Run: " + (jade.escape((jade.interp = view.testCount - view.passed - view.problem - view.failed) == null ? '' : jade.interp)) + "</p></div></div><div class=\"form form-inline\"><div class=\"row lineUnder\"><div class=\"form-group campaign-mix\"><input" + (jade.attrs({ 'id':("careAboutFrames"), 'type':("checkbox"), 'checked':(!!view.careAboutFrames), 'disabled':(!!view.tests) }, {"id":true,"type":true,"checked":true,"disabled":true})) + "/><label for=\"careAboutFrames\">Check frame counts</label></div><div class=\"form-group campaign-mix\"><label for=\"cores\">Threads:</label><input" + (jade.attrs({ 'id':("cores"), 'type':("number"), 'min':("1"), 'max':("16"), 'value':(view.cores), 'disabled':(!!view.tests) }, {"id":true,"type":true,"min":true,"max":true,"value":true,"disabled":true})) + "/></div></div></div>");
if ( view.levelsByCampaign)
{
buf.push("<div class=\"form form-inline\"><div class=\"row lineUnder\">");
// iterate view.levelsByCampaign
;(function(){
  var $$obj = view.levelsByCampaign;
  if ('number' == typeof $$obj.length) {

    for (var campaign = 0, $$l = $$obj.length; campaign < $$l; campaign++) {
      var campaignInfo = $$obj[campaign];

buf.push("<div class=\"form-group campaign-mix\">");
var campaignID = "campaign-" + campaign + "-checkbox";
buf.push("<input" + (jade.attrs({ 'id':(campaignID), 'type':("checkbox"), 'checked':(campaignInfo.checked), 'disabled':(!!view.tests) }, {"id":true,"type":true,"checked":true,"disabled":true})) + "/><label" + (jade.attrs({ 'for':(campaignID) }, {"for":true})) + ">" + (jade.escape(null == (jade.interp = campaign + ': ' + campaignInfo.levels.length) ? "" : jade.interp)) + "</label></div>");
    }

  } else {
    var $$l = 0;
    for (var campaign in $$obj) {
      $$l++;      var campaignInfo = $$obj[campaign];

buf.push("<div class=\"form-group campaign-mix\">");
var campaignID = "campaign-" + campaign + "-checkbox";
buf.push("<input" + (jade.attrs({ 'id':(campaignID), 'type':("checkbox"), 'checked':(campaignInfo.checked), 'disabled':(!!view.tests) }, {"id":true,"type":true,"checked":true,"disabled":true})) + "/><label" + (jade.attrs({ 'for':(campaignID) }, {"for":true})) + ">" + (jade.escape(null == (jade.interp = campaign + ': ' + campaignInfo.levels.length) ? "" : jade.interp)) + "</label></div>");
    }

  }
}).call(this);

buf.push("</div><div class=\"row\">");
// iterate view.codeLanguages
;(function(){
  var $$obj = view.codeLanguages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var codeLanguage = $$obj[$index];

buf.push("<div class=\"form-group code-language-mix\">");
var codeLanguageID = "code-language-" + codeLanguage.id + "-checkbox";
buf.push("<input" + (jade.attrs({ 'id':(codeLanguageID), 'type':("checkbox"), 'checked':(codeLanguage.checked), 'disabled':(!!view.tests) }, {"id":true,"type":true,"checked":true,"disabled":true})) + "/><label" + (jade.attrs({ 'for':(codeLanguageID) }, {"for":true})) + ">" + (jade.escape(null == (jade.interp = codeLanguage.id) ? "" : jade.interp)) + "</label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var codeLanguage = $$obj[$index];

buf.push("<div class=\"form-group code-language-mix\">");
var codeLanguageID = "code-language-" + codeLanguage.id + "-checkbox";
buf.push("<input" + (jade.attrs({ 'id':(codeLanguageID), 'type':("checkbox"), 'checked':(codeLanguage.checked), 'disabled':(!!view.tests) }, {"id":true,"type":true,"checked":true,"disabled":true})) + "/><label" + (jade.attrs({ 'for':(codeLanguageID) }, {"for":true})) + ">" + (jade.escape(null == (jade.interp = codeLanguage.id) ? "" : jade.interp)) + "</label></div>");
    }

  }
}).call(this);

buf.push("<div class=\"pull-right\"><button" + (jade.attrs({ 'id':('go-button'), 'disabled':(!!view.tests), "class": [('btn'),('btn-primary')] }, {"disabled":true})) + ">Start Tests</button></div></div></div>");
}
if ( view.levelsToLoad && !view.tests)
{
buf.push("<div class=\"progress\"><div" + (jade.attrs({ 'role':("progressbar"), 'style':("width: " + (100*(1 - view.levelsToLoad/view.initialLevelsToLoad)) + "%"), "class": [('progress-bar'),('progress-bar-success')] }, {"role":true,"style":true})) + "></div></div>");
}
if ( view.tests)
{
if ( view.levelIDs)
{
buf.push("<div class=\"progress\"><div" + (jade.attrs({ 'role':("progressbar"), 'style':("width: " + (100*view.passed/view.testCount) + "%"), "class": [('progress-bar'),('progress-bar-success')] }, {"role":true,"style":true})) + "></div><div" + (jade.attrs({ 'role':("progressbar"), 'style':("width: " + (100*view.problem/view.testCount) + "%"), "class": [('progress-bar'),('progress-bar-warning')] }, {"role":true,"style":true})) + "></div><div" + (jade.attrs({ 'role':("progressbar"), 'style':("width: " + (100*view.failed/view.testCount) + "%"), "class": [('progress-bar'),('progress-bar-danger')] }, {"role":true,"style":true})) + "></div></div>");
}
// iterate view.tests
;(function(){
  var $$obj = view.tests;
  if ('number' == typeof $$obj.length) {

    for (var id = 0, $$l = $$obj.length; id < $$l; id++) {
      var test = $$obj[id];

if (test.state == 'no-solution')
continue;
if ( test.level)
{
buf.push("<div class=\"pull-right\">");
var last = test.level.get('slug') + view.linksQueryString
buf.push("<a" + (jade.attrs({ 'href':("/editor/verifier/" + last), "class": [('btn'),('btn-primary')] }, {"href":true})) + ">Focus</a><a" + (jade.attrs({ 'href':("/play/level/" + last), "class": [('btn'),('btn-success')] }, {"href":true})) + ">Play</a><a" + (jade.attrs({ 'href':("/editor/level/" + last), "class": [('btn'),('btn-warning')] }, {"href":true})) + ">Edit</a><a" + (jade.attrs({ 'data-target':('#verifier-test-' + id), 'data-toggle':("collapse"), "class": [('btn'),('btn-default')] }, {"data-target":true,"data-toggle":true})) + ">Toggle</a></div>");
if ( !test.goals)
{
buf.push("<h2 class=\"test-running\">" + (jade.escape(null == (jade.interp = test.level.get('name')) ? "" : jade.interp)) + "<small>" + (jade.escape(null == (jade.interp = ' in ' + test.language + '') ? "" : jade.interp)) + "</small></h2>");
}
else if ( test.isSuccessful())
{
buf.push("<h2 class=\"test-success\">" + (jade.escape(null == (jade.interp = test.level.get('name')) ? "" : jade.interp)) + "<small>" + (jade.escape(null == (jade.interp = ' in ' + test.language + '') ? "" : jade.interp)) + "</small></h2>");
}
else
{
buf.push("<h2 class=\"test-failed\">" + (jade.escape(null == (jade.interp = test.level.get('name')) ? "" : jade.interp)) + "<small>" + (jade.escape(null == (jade.interp = ' in ' + test.language + '') ? "" : jade.interp)) + "</small></h2>");
}
buf.push("<div" + (jade.attrs({ 'id':('verifier-test-' + id), "class": [('row'),((test.isSuccessful() && id > 1 ? 'collapse' : 'collapse in'))] }, {"class":true,"id":true})) + "><div class=\"col-xs-8\">");
if ( test.solution)
{
buf.push("<pre class=\"solution\">" + (jade.escape((jade.interp = test.solution.source) == null ? '' : jade.interp)) + "</pre>");
}
else
{
buf.push("<h4>Error Loading Test</h4><pre>" + (jade.escape((jade.interp = test.error) == null ? '' : jade.interp)) + "</pre>");
}
buf.push("</div><div class=\"col-xs-4 well\">");
if ( test.goals)
{
if ( test.frames == test.solution.frameCount)
{
buf.push("<div class=\"test-success\">✓ Frames: " + (jade.escape((jade.interp = test.frames) == null ? '' : jade.interp)) + "</div>");
}
else
{
buf.push("<div class=\"test-failed\">✘ Frames: " + (jade.escape((jade.interp = test.frames) == null ? '' : jade.interp)) + " vs " + (jade.escape((jade.interp = test.solution.frameCount) == null ? '' : jade.interp)) + "</div>");
}
// iterate test.goals || []
;(function(){
  var $$obj = test.goals || [];
  if ('number' == typeof $$obj.length) {

    for (var k = 0, $$l = $$obj.length; k < $$l; k++) {
      var v = $$obj[k];

if ( !test.solution.goals)
{
buf.push("<div class=\"test-running\">? " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + ")</div>");
}
else if ( v.status == test.solution.goals[k])
{
buf.push("<div class=\"test-success\">✓ " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + ")</div>");
}
else
{
buf.push("<div class=\"test-failed\">✘ " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + " vs " + (jade.escape((jade.interp = test.solution.goals[k]) == null ? '' : jade.interp)) + ")</div>");
}
    }

  } else {
    var $$l = 0;
    for (var k in $$obj) {
      $$l++;      var v = $$obj[k];

if ( !test.solution.goals)
{
buf.push("<div class=\"test-running\">? " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + ")</div>");
}
else if ( v.status == test.solution.goals[k])
{
buf.push("<div class=\"test-success\">✓ " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + ")</div>");
}
else
{
buf.push("<div class=\"test-failed\">✘ " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + " vs " + (jade.escape((jade.interp = test.solution.goals[k]) == null ? '' : jade.interp)) + ")</div>");
}
    }

  }
}).call(this);

}
else
{
buf.push("<h3>Pending....</h3>");
}
if ( test.error)
{
buf.push("<pre class=\"test-failed\">" + (jade.escape((jade.interp = test.error) == null ? '' : jade.interp)) + "</pre>");
}
if ( test.testLogs && test.testLogs.length)
{
// iterate test.testLogs
;(function(){
  var $$obj = test.testLogs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var log = $$obj[$index];

buf.push("<pre class=\"test-failed\">" + (jade.escape(null == (jade.interp = log) ? "" : jade.interp)) + "</pre>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var log = $$obj[$index];

buf.push("<pre class=\"test-failed\">" + (jade.escape(null == (jade.interp = log) ? "" : jade.interp)) + "</pre>");
    }

  }
}).call(this);

}
if ( test.userCodeProblems.length)
{
buf.push("<h4 class=\"test-failed\">User Code Problems</h4><pre class=\"test-failed\">" + (jade.escape((jade.interp = JSON.stringify(test.userCodeProblems, null, 2)) == null ? '' : jade.interp)) + "</pre>");
}
if ( test.simulationFrameRate)
{
if ( test.simulationFrameRate > 90)
{
buf.push("<div class=\"test-success\">✓ " + (jade.escape((jade.interp = test.simulationFrameRate.toFixed(1)) == null ? '' : jade.interp)) + " FPS</div>");
}
else if ( test.simulationFrameRate > 30)
{
buf.push("<div class=\"test-running\">~ " + (jade.escape((jade.interp = test.simulationFrameRate.toFixed(1)) == null ? '' : jade.interp)) + " FPS</div>");
}
else
{
buf.push("<div class=\"test-failed\">✘ " + (jade.escape((jade.interp = test.simulationFrameRate.toFixed(1)) == null ? '' : jade.interp)) + " FPS</div>");
}
}
buf.push("</div></div>");
}
else
{
buf.push("<h1>Loading Level...</h1>");
}
buf.push("<!-- TODO: show last frame hash-->");
    }

  } else {
    var $$l = 0;
    for (var id in $$obj) {
      $$l++;      var test = $$obj[id];

if (test.state == 'no-solution')
continue;
if ( test.level)
{
buf.push("<div class=\"pull-right\">");
var last = test.level.get('slug') + view.linksQueryString
buf.push("<a" + (jade.attrs({ 'href':("/editor/verifier/" + last), "class": [('btn'),('btn-primary')] }, {"href":true})) + ">Focus</a><a" + (jade.attrs({ 'href':("/play/level/" + last), "class": [('btn'),('btn-success')] }, {"href":true})) + ">Play</a><a" + (jade.attrs({ 'href':("/editor/level/" + last), "class": [('btn'),('btn-warning')] }, {"href":true})) + ">Edit</a><a" + (jade.attrs({ 'data-target':('#verifier-test-' + id), 'data-toggle':("collapse"), "class": [('btn'),('btn-default')] }, {"data-target":true,"data-toggle":true})) + ">Toggle</a></div>");
if ( !test.goals)
{
buf.push("<h2 class=\"test-running\">" + (jade.escape(null == (jade.interp = test.level.get('name')) ? "" : jade.interp)) + "<small>" + (jade.escape(null == (jade.interp = ' in ' + test.language + '') ? "" : jade.interp)) + "</small></h2>");
}
else if ( test.isSuccessful())
{
buf.push("<h2 class=\"test-success\">" + (jade.escape(null == (jade.interp = test.level.get('name')) ? "" : jade.interp)) + "<small>" + (jade.escape(null == (jade.interp = ' in ' + test.language + '') ? "" : jade.interp)) + "</small></h2>");
}
else
{
buf.push("<h2 class=\"test-failed\">" + (jade.escape(null == (jade.interp = test.level.get('name')) ? "" : jade.interp)) + "<small>" + (jade.escape(null == (jade.interp = ' in ' + test.language + '') ? "" : jade.interp)) + "</small></h2>");
}
buf.push("<div" + (jade.attrs({ 'id':('verifier-test-' + id), "class": [('row'),((test.isSuccessful() && id > 1 ? 'collapse' : 'collapse in'))] }, {"class":true,"id":true})) + "><div class=\"col-xs-8\">");
if ( test.solution)
{
buf.push("<pre class=\"solution\">" + (jade.escape((jade.interp = test.solution.source) == null ? '' : jade.interp)) + "</pre>");
}
else
{
buf.push("<h4>Error Loading Test</h4><pre>" + (jade.escape((jade.interp = test.error) == null ? '' : jade.interp)) + "</pre>");
}
buf.push("</div><div class=\"col-xs-4 well\">");
if ( test.goals)
{
if ( test.frames == test.solution.frameCount)
{
buf.push("<div class=\"test-success\">✓ Frames: " + (jade.escape((jade.interp = test.frames) == null ? '' : jade.interp)) + "</div>");
}
else
{
buf.push("<div class=\"test-failed\">✘ Frames: " + (jade.escape((jade.interp = test.frames) == null ? '' : jade.interp)) + " vs " + (jade.escape((jade.interp = test.solution.frameCount) == null ? '' : jade.interp)) + "</div>");
}
// iterate test.goals || []
;(function(){
  var $$obj = test.goals || [];
  if ('number' == typeof $$obj.length) {

    for (var k = 0, $$l = $$obj.length; k < $$l; k++) {
      var v = $$obj[k];

if ( !test.solution.goals)
{
buf.push("<div class=\"test-running\">? " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + ")</div>");
}
else if ( v.status == test.solution.goals[k])
{
buf.push("<div class=\"test-success\">✓ " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + ")</div>");
}
else
{
buf.push("<div class=\"test-failed\">✘ " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + " vs " + (jade.escape((jade.interp = test.solution.goals[k]) == null ? '' : jade.interp)) + ")</div>");
}
    }

  } else {
    var $$l = 0;
    for (var k in $$obj) {
      $$l++;      var v = $$obj[k];

if ( !test.solution.goals)
{
buf.push("<div class=\"test-running\">? " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + ")</div>");
}
else if ( v.status == test.solution.goals[k])
{
buf.push("<div class=\"test-success\">✓ " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + ")</div>");
}
else
{
buf.push("<div class=\"test-failed\">✘ " + (jade.escape((jade.interp = k) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = v.status) == null ? '' : jade.interp)) + " vs " + (jade.escape((jade.interp = test.solution.goals[k]) == null ? '' : jade.interp)) + ")</div>");
}
    }

  }
}).call(this);

}
else
{
buf.push("<h3>Pending....</h3>");
}
if ( test.error)
{
buf.push("<pre class=\"test-failed\">" + (jade.escape((jade.interp = test.error) == null ? '' : jade.interp)) + "</pre>");
}
if ( test.testLogs && test.testLogs.length)
{
// iterate test.testLogs
;(function(){
  var $$obj = test.testLogs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var log = $$obj[$index];

buf.push("<pre class=\"test-failed\">" + (jade.escape(null == (jade.interp = log) ? "" : jade.interp)) + "</pre>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var log = $$obj[$index];

buf.push("<pre class=\"test-failed\">" + (jade.escape(null == (jade.interp = log) ? "" : jade.interp)) + "</pre>");
    }

  }
}).call(this);

}
if ( test.userCodeProblems.length)
{
buf.push("<h4 class=\"test-failed\">User Code Problems</h4><pre class=\"test-failed\">" + (jade.escape((jade.interp = JSON.stringify(test.userCodeProblems, null, 2)) == null ? '' : jade.interp)) + "</pre>");
}
if ( test.simulationFrameRate)
{
if ( test.simulationFrameRate > 90)
{
buf.push("<div class=\"test-success\">✓ " + (jade.escape((jade.interp = test.simulationFrameRate.toFixed(1)) == null ? '' : jade.interp)) + " FPS</div>");
}
else if ( test.simulationFrameRate > 30)
{
buf.push("<div class=\"test-running\">~ " + (jade.escape((jade.interp = test.simulationFrameRate.toFixed(1)) == null ? '' : jade.interp)) + " FPS</div>");
}
else
{
buf.push("<div class=\"test-failed\">✘ " + (jade.escape((jade.interp = test.simulationFrameRate.toFixed(1)) == null ? '' : jade.interp)) + " FPS</div>");
}
}
buf.push("</div></div>");
}
else
{
buf.push("<h1>Loading Level...</h1>");
}
buf.push("<!-- TODO: show last frame hash-->");
    }

  }
}).call(this);

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

;
//# sourceMappingURL=/javascripts/app/templates/editor/verifier/verifier-view.js.map