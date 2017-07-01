require.register("templates/admin/analytics-subscriptions", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,total = locals_.total,refreshDataState = locals_.refreshDataState,outstandingCancels = locals_.outstandingCancels,monthlyGrowth = locals_.monthlyGrowth,monthlyChurn = locals_.monthlyChurn,analytics = locals_.analytics,subscribers = locals_.subscribers,subscriberCancelled = locals_.subscriberCancelled,cancellations = locals_.cancellations,moment = locals_.moment,showMoreCancellations = locals_.showMoreCancellations,subs = locals_.subs,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
if ( !me.isAnonymous() && !me.isStudent() && !me.isTeacher())
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a>");
}
buf.push("<a href=\"/community\" data-i18n=\"nav.community\"></a>");
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
if ( !me.isAdmin())
{
buf.push("<div>You must be logged in as an admin to view this page.</div>");
}
else
{
if ( total === 0)
{
buf.push("<h4>" + (jade.escape(null == (jade.interp = refreshDataState) ? "" : jade.interp)) + "</h4>");
}
else
{
buf.push("<div class=\"container-fluid\"><div class=\"row\"><div class=\"col-md-5 big-stat total-count\"><div class=\"description\">Total</div><div class=\"count\">" + (jade.escape(null == (jade.interp = total) ? "" : jade.interp)) + "</div></div><div class=\"col-md-5 big-stat remaining-count\"><div class=\"description\">Remaining</div><div class=\"count\">" + (jade.escape(null == (jade.interp = total - outstandingCancels.length) ? "" : jade.interp)) + "</div></div><div class=\"col-md-5 big-stat cancelled-count\"><div class=\"description\">Cancels Outstanding</div><div class=\"count\">" + (jade.escape(null == (jade.interp = outstandingCancels.length) ? "" : jade.interp)) + "</div></div><div class=\"col-md-5 big-stat growth-rate\"><div class=\"description\">30 Day Total Growth</div><div class=\"count\">" + (jade.escape((jade.interp = monthlyGrowth.toFixed(1)) == null ? '' : jade.interp)) + "%</div></div><div class=\"col-md-5 big-stat churn-count\"><div class=\"description\">30 Day Churn (cancelled / total)</div><div class=\"count\">" + (jade.escape((jade.interp = monthlyChurn.toFixed(1)) == null ? '' : jade.interp)) + "%</div></div></div></div>");
// iterate analytics.graphs
;(function(){
  var $$obj = analytics.graphs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var graph = $$obj[$index];

buf.push("<div class=\"line-graph-container\">");
// iterate graph.lines
;(function(){
  var $$obj = graph.lines;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

// iterate line.points
;(function(){
  var $$obj = line.points;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

// iterate line.points
;(function(){
  var $$obj = line.points;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var graph = $$obj[$index];

buf.push("<div class=\"line-graph-container\">");
// iterate graph.lines
;(function(){
  var $$obj = graph.lines;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

// iterate line.points
;(function(){
  var $$obj = line.points;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

// iterate line.points
;(function(){
  var $$obj = line.points;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

}
buf.push("<h2>Recent Subscribers</h2>");
if ( !subscribers || subscribers.length < 1)
{
buf.push("<h4>" + (jade.escape(null == (jade.interp = refreshDataState) ? "" : jade.interp)) + "</h4>");
}
else
{
buf.push("<table class=\"table table-striped table-condensed\"><thead class=\"subscribers-thead\"><tr><th>Sub ID</th><th>User Start</th><th>Sub Start</th>");
if ( subscriberCancelled)
{
buf.push("<th>Cancelled</th>");
}
else
{
buf.push("<th></th>");
}
buf.push("<th>Conversion</th><th>Email</th><th>Hero</th><th>Level</th><th>Age</th><th>Spoken</th><th>Clans</th></tr></thead><tbody class=\"subscribers-tbody\">");
// iterate subscribers
;(function(){
  var $$obj = subscribers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var subscriber = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'href':("https://dashboard.stripe.com/customers/" + (subscriber.customerID) + ""), 'target':("_blank") }, {"href":true,"target":true})) + ">" + (jade.escape(null == (jade.interp = subscriber.subscriptionID) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = subscriber.user.dateCreated.substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = subscriber.start.toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>");
if ( subscriber.cancel)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = subscriber.cancel.toISOString().substring(0, 10)) ? "" : jade.interp)) + "</span>");
}
buf.push("</td><td>");
if ( subscriber.user.stripe && subscriber.user.stripe.sponsorID)
{
buf.push("<span>*sponsored*</span>");
}
else if ( subscriber.user.conversion)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = subscriber.user.conversion) ? "" : jade.interp)) + "</span>");
}
buf.push("</td>");
if ( subscriber.user.deleted)
{
buf.push("<td>DELETED</td>");
}
else
{
buf.push("<td>" + (jade.escape(null == (jade.interp = subscriber.user.emailLower) ? "" : jade.interp)) + "</td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = subscriber.hero) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = subscriber.level) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = subscriber.user.ageRange) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = subscriber.user.preferredLanguage) ? "" : jade.interp)) + "</td>");
if ( subscriber.user.clans)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = subscriber.user.clans.length) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var subscriber = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'href':("https://dashboard.stripe.com/customers/" + (subscriber.customerID) + ""), 'target':("_blank") }, {"href":true,"target":true})) + ">" + (jade.escape(null == (jade.interp = subscriber.subscriptionID) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = subscriber.user.dateCreated.substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = subscriber.start.toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>");
if ( subscriber.cancel)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = subscriber.cancel.toISOString().substring(0, 10)) ? "" : jade.interp)) + "</span>");
}
buf.push("</td><td>");
if ( subscriber.user.stripe && subscriber.user.stripe.sponsorID)
{
buf.push("<span>*sponsored*</span>");
}
else if ( subscriber.user.conversion)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = subscriber.user.conversion) ? "" : jade.interp)) + "</span>");
}
buf.push("</td>");
if ( subscriber.user.deleted)
{
buf.push("<td>DELETED</td>");
}
else
{
buf.push("<td>" + (jade.escape(null == (jade.interp = subscriber.user.emailLower) ? "" : jade.interp)) + "</td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = subscriber.hero) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = subscriber.level) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = subscriber.user.ageRange) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = subscriber.user.preferredLanguage) ? "" : jade.interp)) + "</td>");
if ( subscriber.user.clans)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = subscriber.user.clans.length) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</tbody></table>");
}
buf.push("<h2>Recent Cancellations</h2>");
if ( !cancellations || cancellations.length < 1)
{
buf.push("<h4>" + (jade.escape(null == (jade.interp = refreshDataState) ? "" : jade.interp)) + "</h4>");
}
else
{
buf.push("<table class=\"table table-striped table-condensed\"><thead class=\"subscribers-thead\"><tr><th>Sub ID</th><th>User ID</th><th>User Start</th><th>Sub Start</th><th>Sub Cancel</th><th>Length</th><th>Level</th><th>Age</th><th>Spoken</th><th>Clans</th></tr></thead><tbody class=\"subscribers-tbody\">");
// iterate cancellations
;(function(){
  var $$obj = cancellations;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var cancellation = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'href':("https://dashboard.stripe.com/customers/" + (cancellation.customerID) + ""), 'target':("_blank") }, {"href":true,"target":true})) + ">" + (jade.escape(null == (jade.interp = cancellation.subscriptionID) ? "" : jade.interp)) + "</a></td>");
if ( cancellation.userID)
{
buf.push("<td><a" + (jade.attrs({ 'href':("/user/" + (cancellation.userID) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = cancellation.userID) ? "" : jade.interp)) + "</a></td>");
}
else
{
buf.push("<td></td>");
}
if ( cancellation.user)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = cancellation.user.dateCreated.substring(0, 10)) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = cancellation.start.toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = cancellation.cancel.toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment.duration(cancellation.cancel - cancellation.start).humanize()) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = cancellation.level) ? "" : jade.interp)) + "</td>");
if ( cancellation.user)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = cancellation.user.ageRange) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = cancellation.user.preferredLanguage) ? "" : jade.interp)) + "</td>");
if ( cancellation.user.clans)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = cancellation.user.clans.length) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
}
else
{
buf.push("<td></td><td></td><td></td><td></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var cancellation = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'href':("https://dashboard.stripe.com/customers/" + (cancellation.customerID) + ""), 'target':("_blank") }, {"href":true,"target":true})) + ">" + (jade.escape(null == (jade.interp = cancellation.subscriptionID) ? "" : jade.interp)) + "</a></td>");
if ( cancellation.userID)
{
buf.push("<td><a" + (jade.attrs({ 'href':("/user/" + (cancellation.userID) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = cancellation.userID) ? "" : jade.interp)) + "</a></td>");
}
else
{
buf.push("<td></td>");
}
if ( cancellation.user)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = cancellation.user.dateCreated.substring(0, 10)) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = cancellation.start.toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = cancellation.cancel.toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment.duration(cancellation.cancel - cancellation.start).humanize()) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = cancellation.level) ? "" : jade.interp)) + "</td>");
if ( cancellation.user)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = cancellation.user.ageRange) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = cancellation.user.preferredLanguage) ? "" : jade.interp)) + "</td>");
if ( cancellation.user.clans)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = cancellation.user.clans.length) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
}
else
{
buf.push("<td></td><td></td><td></td><td></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</tbody></table>");
if ( !showMoreCancellations)
{
buf.push("<button class=\"btn btn-sm btn-show-more-cancellations\">Show More Cancellations</button>");
}
}
buf.push("<h2>Subscriptions</h2>");
if ( !subs || subs.length < 1)
{
buf.push("<h4>" + (jade.escape(null == (jade.interp = refreshDataState) ? "" : jade.interp)) + "</h4>");
}
else
{
buf.push("<table class=\"table table-condensed\"><thead><tr><th>Day</th><th>Total</th><th>Started</th><th>Cancelled</th><th>Net (cancelled)</th><th>Ended</th><th>Net (ended)</th></tr></thead><tbody>");
// iterate subs
;(function(){
  var $$obj = subs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var sub = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = sub.day) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.total) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.started) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.cancelled) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.started - sub.cancelled) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.ended) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.started - sub.ended) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var sub = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = sub.day) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.total) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.started) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.cancelled) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.started - sub.cancelled) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.ended) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = sub.started - sub.ended) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table>");
}
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

;
//# sourceMappingURL=/javascripts/app/templates/admin/analytics-subscriptions.js.map