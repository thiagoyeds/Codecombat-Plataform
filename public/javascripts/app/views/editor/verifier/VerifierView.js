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

;require.register("views/editor/verifier/VerifierView", function(exports, require, module) {
var Campaigns, Level, RootView, SuperModel, VerifierTest, VerifierView, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

utils = require('core/utils');

RootView = require('views/core/RootView');

template = require('templates/editor/verifier/verifier-view');

VerifierTest = require('./VerifierTest');

SuperModel = require('models/SuperModel');

Campaigns = require('collections/Campaigns');

Level = require('models/Level');

module.exports = VerifierView = (function(superClass) {
  extend(VerifierView, superClass);

  VerifierView.prototype.className = 'style-flat';

  VerifierView.prototype.template = template;

  VerifierView.prototype.id = 'verifier-view';

  VerifierView.prototype.events = {
    'click #go-button': 'onClickGoButton'
  };

  function VerifierView(options, levelID1) {
    var defaultCores;
    this.levelID = levelID1;
    this.update = bind(this.update, this);
    VerifierView.__super__.constructor.call(this, options);
    this.passed = 0;
    this.failed = 0;
    this.problem = 0;
    this.testCount = 0;
    if (utils.getQueryVariable('dev')) {
      this.supermodel.shouldSaveBackups = function(model) {
        var ref;
        return (ref = model.constructor.className) === 'Level' || ref === 'LevelComponent' || ref === 'LevelSystem' || ref === 'ThangType';
      };
    }
    defaultCores = 2;
    this.cores = Math.max(window.navigator.hardwareConcurrency, defaultCores);
    this.careAboutFrames = true;
    if (this.levelID) {
      this.levelIDs = [this.levelID];
      this.testLanguages = ['python', 'javascript', 'java', 'lua', 'coffeescript'];
      this.cores = 1;
      this.startTestingLevels();
    } else {
      this.campaigns = new Campaigns();
      this.supermodel.trackRequest(this.campaigns.fetch({
        data: {
          project: 'slug,type,levels'
        }
      }));
      this.campaigns.comparator = function(m) {
        return ['intro', 'course-2', 'course-3', 'course-4', 'course-5', 'course-6', 'course-8', 'dungeon', 'forest', 'desert', 'mountain', 'glacier', 'volcano'].indexOf(m.get('slug'));
      };
    }
  }

  VerifierView.prototype.onLoaded = function() {
    VerifierView.__super__.onLoaded.call(this);
    if (this.levelID) {
      return;
    }
    this.filterCampaigns();
    this.filterCodeLanguages();
    return this.render();
  };

  VerifierView.prototype.filterCampaigns = function() {
    var base, campaign, campaignInfo, j, len, level, levelID, name, ref, ref1, ref2, results;
    this.levelsByCampaign = {};
    ref = this.campaigns.models;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      campaign = ref[j];
      if (!(((ref1 = campaign.get('type')) === 'course' || ref1 === 'hero') && campaign.get('slug') !== 'picoctf')) {
        continue;
      }
      if ((base = this.levelsByCampaign)[name = campaign.get('slug')] == null) {
        base[name] = {
          levels: [],
          checked: (ref2 = campaign.get('slug')) === 'intro'
        };
      }
      campaignInfo = this.levelsByCampaign[campaign.get('slug')];
      results.push((function() {
        var ref3, ref4, results1;
        ref3 = campaign.get('levels');
        results1 = [];
        for (levelID in ref3) {
          level = ref3[levelID];
          if ((ref4 = level.type) !== 'hero-ladder' && ref4 !== 'course-ladder' && ref4 !== 'game-dev' && ref4 !== 'web-dev') {
            results1.push(campaignInfo.levels.push(level.slug));
          }
        }
        return results1;
      })());
    }
    return results;
  };

  VerifierView.prototype.filterCodeLanguages = function() {
    var c, defaultLanguages;
    defaultLanguages = utils.getQueryVariable('languages', 'python,javascript').split(/, ?/);
    return this.codeLanguages != null ? this.codeLanguages : this.codeLanguages = (function() {
      var j, len, ref, results;
      ref = ['python', 'javascript', 'java', 'lua', 'coffeescript'];
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        results.push({
          id: c,
          checked: indexOf.call(defaultLanguages, c) >= 0
        });
      }
      return results;
    })();
  };

  VerifierView.prototype.onClickGoButton = function(e) {
    var campaign, campaignInfo, codeLanguage, j, k, len, len1, level, ref, ref1, ref2;
    this.filterCampaigns();
    this.levelIDs = [];
    this.careAboutFrames = this.$("#careAboutFrames").is(':checked');
    this.cores = this.$("#cores").val() | 0;
    ref = this.levelsByCampaign;
    for (campaign in ref) {
      campaignInfo = ref[campaign];
      if (this.$("#campaign-" + campaign + "-checkbox").is(':checked')) {
        ref1 = campaignInfo.levels;
        for (j = 0, len = ref1.length; j < len; j++) {
          level = ref1[j];
          if (indexOf.call(this.levelIDs, level) < 0) {
            this.levelIDs.push(level);
          }
        }
      } else {
        campaignInfo.checked = false;
      }
    }
    this.testLanguages = [];
    ref2 = this.codeLanguages;
    for (k = 0, len1 = ref2.length; k < len1; k++) {
      codeLanguage = ref2[k];
      if (this.$("#code-language-" + codeLanguage.id + "-checkbox").is(':checked')) {
        codeLanguage.checked = true;
        this.testLanguages.push(codeLanguage.id);
      } else {
        codeLanguage.checked = false;
      }
    }
    return this.startTestingLevels();
  };

  VerifierView.prototype.startTestingLevels = function() {
    var j, len, level, levelID, ref, results;
    this.levelsToLoad = this.initialLevelsToLoad = this.levelIDs.length;
    ref = this.levelIDs;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      levelID = ref[j];
      level = this.supermodel.getModel(Level, levelID) || new Level({
        _id: levelID
      });
      if (level.loaded) {
        results.push(this.onLevelLoaded());
      } else {
        results.push(this.listenToOnce(this.supermodel.loadModel(level).model, 'sync', this.onLevelLoaded));
      }
    }
    return results;
  };

  VerifierView.prototype.onLevelLoaded = function(level) {
    if (--this.levelsToLoad === 0) {
      return this.onTestLevelsLoaded();
    } else {
      return this.render();
    }
  };

  VerifierView.prototype.onTestLevelsLoaded = function() {
    var chunks, codeLanguage, j, k, len, len1, level, levelID, ref, ref1, solutions, supermodels;
    this.linksQueryString = window.location.search;
    this.tests = [];
    this.tasksList = [];
    ref = this.levelIDs;
    for (j = 0, len = ref.length; j < len; j++) {
      levelID = ref[j];
      level = this.supermodel.getModel(Level, levelID);
      solutions = level != null ? level.getSolutions() : void 0;
      ref1 = this.testLanguages;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        codeLanguage = ref1[k];
        if (!solutions || _.find(solutions, {
          language: codeLanguage
        })) {
          this.tasksList.push({
            level: levelID,
            language: codeLanguage
          });
        }
      }
    }
    this.testCount = this.tasksList.length;
    console.log("Starting in", this.cores, "cores...");
    chunks = _.groupBy(this.tasksList, (function(_this) {
      return function(v, i) {
        return i % _this.cores;
      };
    })(this));
    supermodels = [this.supermodel];
    return _.forEach(chunks, (function(_this) {
      return function(chunk, i) {
        return _.delay(function() {
          var chunkSupermodel, parentSuperModel;
          parentSuperModel = supermodels[supermodels.length - 1];
          chunkSupermodel = new SuperModel();
          chunkSupermodel.models = _.clone(parentSuperModel.models);
          chunkSupermodel.collections = _.clone(parentSuperModel.collections);
          supermodels.push(chunkSupermodel);
          return async.eachSeries(chunk, function(task, next) {
            var test;
            test = new VerifierTest(task.level, function(e) {
              var ref2;
              _this.update(e);
              if ((ref2 = e.state) === 'complete' || ref2 === 'error' || ref2 === 'no-solution') {
                if (e.state === 'complete') {
                  if (test.isSuccessful(_this.careAboutFrames)) {
                    ++_this.passed;
                  } else {
                    ++_this.failed;
                  }
                } else if (e.state === 'no-solution') {
                  --_this.testCount;
                } else {
                  ++_this.problem;
                }
                return next();
              }
            }, chunkSupermodel, task.language, {});
            _this.tests.unshift(test);
            return _this.render();
          }, function() {
            return _this.render();
          });
        }, i > 0 ? 5000 + i * 1000 : 0);
      };
    })(this));
  };

  VerifierView.prototype.update = function(event) {
    return this.render();
  };

  return VerifierView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/verifier/VerifierView.js.map