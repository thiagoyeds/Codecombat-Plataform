require.register("templates/editor/achievement/edit", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
var authorized = me.isAdmin() || me.isArtisan();
buf.push("<ol class=\"breadcrumb\"><li><a href=\"/editor\" data-i18n=\"editor.main_title\">CodeCombat Editors</a></li><li><a href=\"/editor/achievement\" data-i18n=\"editor.achievement_title\">Achievement Editor</a></li><li class=\"active\">" + (jade.escape((jade.interp = view.achievement.attributes.name) == null ? '' : jade.interp)) + "</li></ol>");
if ( authorized)
{
buf.push("<button" + (jade.attrs({ 'data-i18n':(""), 'disabled':(me.isAdmin() === true ? undefined : "true"), 'id':('recalculate-all-button'), "class": [('achievement-tool-button'),('btn'),('btn-primary')] }, {"data-i18n":true,"disabled":true})) + ">Recalculate All</button><button" + (jade.attrs({ 'data-i18n':(""), 'disabled':(me.isAdmin() === true ? undefined : "true"), 'id':('recalculate-button'), "class": [('achievement-tool-button'),('btn'),('btn-primary')] }, {"data-i18n":true,"disabled":true})) + ">Recalculate</button><button" + (jade.attrs({ 'data-i18n':("common.delete"), 'disabled':(me.isAdmin() === true ? undefined : "true"), 'id':('delete-button'), "class": [('achievement-tool-button'),('btn'),('btn-primary')] }, {"data-i18n":true,"disabled":true})) + ">Delete</button><button" + (jade.attrs({ 'data-i18n':("common.save"), 'disabled':((me.isAdmin() === true || me.isArtisan() === true) ? undefined : "true"), 'id':('save-button'), "class": [('achievement-tool-button'),('btn'),('btn-primary')] }, {"data-i18n":true,"disabled":true})) + ">Save</button>");
}
buf.push("<h3 data-i18n=\"achievement.edit_achievement_title\">Edit Achievement<span>: \"" + (jade.escape((jade.interp = view.achievement.get('name')) == null ? '' : jade.interp)) + "\"</span></h3><div id=\"achievement-treema\"></div><div id=\"achievement-view\" class=\"clearfix\"></div><h3 data-i18n=\"resources.patches\">Patches</h3><div class=\"patches-view\"></div><hr/></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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

;require.register("templates/editor/achievement/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents;buf.push("<table class=\"table\"><tr><th colspan=\"3\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th data-i18n=\"general.collection\">Collection</th></tr>");
// iterate documents
;(function(){
  var $$obj = documents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var data = $$obj[$index];

data = data.attributes;
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/editor/achievement/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.collection) == null ? '' : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var data = $$obj[$index];

data = data.attributes;
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/editor/achievement/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.collection) == null ? '' : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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

;require.register("templates/editor/article/edit", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div><ol class=\"breadcrumb\"><li><a href=\"/editor\" data-i18n=\"editor.main_title\">CodeCombat Editors</a></li><li><a href=\"/editor/article\" data-i18n=\"editor.article_title\">Article Editor</a></li><li class=\"active\">" + (jade.escape((jade.interp = view.article.attributes.name) == null ? '' : jade.interp)) + "</li></ol></div>");
var authorized = !me.get('anonymous');
buf.push("<button data-i18n=\"general.version_history\" id=\"history-button\" class=\"article-tool-button btn btn-primary\">Version History</button><button" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("modal/RevertModal"), 'data-i18n':("editor.revert"), 'disabled':(authorized === true ? undefined : "true"), 'id':('revert-button'), "class": [('article-tool-button'),('btn'),('btn-primary')] }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Revert</button><button" + (jade.attrs({ 'data-i18n':("article.edit_btn_preview"), 'disabled':(authorized === true ? undefined : "true"), 'id':('preview-button'), "class": [('article-tool-button'),('btn'),('btn-primary')] }, {"data-i18n":true,"disabled":true})) + ">Preview</button><button" + (jade.attrs({ 'data-i18n':("common.save"), 'disabled':(authorized === true ? undefined : "true"), 'id':('save-button'), "class": [('article-tool-button'),('btn'),('btn-primary')] }, {"data-i18n":true,"disabled":true})) + ">Save</button><h3 data-i18n=\"article.edit_article_title\">Edit Article<span>: \"" + (jade.escape((jade.interp = view.article.attributes.name) == null ? '' : jade.interp)) + "\"</span></h3><div id=\"article-treema\"></div><h3 data-i18n=\"resources.patches\">Patches</h3><div class=\"patches-view\"></div><hr/></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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

;require.register("templates/editor/article/preview", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<body><h1 id=\"title\"></h1><div id=\"insert\">loading...</div></body>");;return buf.join("");
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

;require.register("templates/editor/article/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents,me = locals_.me,page = locals_.page;buf.push("<table class=\"table\"><tr><th colspan=\"3\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th data-i18n=\"general.version\">Version</th></tr>");
// iterate documents
;(function(){
  var $$obj = documents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var document = $$obj[$index];

var data = document.attributes;
buf.push("<tr" + (jade.attrs({ "class": [(document.getOwner() == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(data.name), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(data.description), "class": [('body-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = data.version.minor) == null ? '' : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var document = $$obj[$index];

var data = document.attributes;
buf.push("<tr" + (jade.attrs({ "class": [(document.getOwner() == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(data.name), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(data.description), "class": [('body-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = data.version.minor) == null ? '' : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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

;require.register("templates/editor/campaign/campaign-analytics-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,campaignCompletions = locals_.campaignCompletions,showLeftGame = locals_.showLeftGame,showSubscriptions = locals_.showSubscriptions;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Campaign Analytics</h3>");
if ( campaignCompletions.startDay && campaignCompletions.endDay)
{
buf.push("<div class=\"input-group input-group-sm\"><input" + (jade.attrs({ 'id':('input-startday'), 'type':('text'), 'style':('width:100px;'), 'value':(campaignCompletions.startDay), "class": [('form-control')] }, {"type":true,"style":true,"value":true})) + "/><input" + (jade.attrs({ 'id':('input-endday'), 'type':('text'), 'style':('width:100px;'), 'value':(campaignCompletions.endDay), "class": [('form-control')] }, {"type":true,"style":true,"value":true})) + "/><button id=\"reload-button\" style=\"margin-left:10px;\" class=\"btn btn-default btn-sm\">Reload</button></div>");
}
buf.push("<label style=\"font-size:10px;font-weight:normal;\"><span>Double-click row to open level details.</span><span>&nbsp;&nbsp;</span><input" + (jade.attrs({ 'id':('option-show-left-game'), 'type':('checkbox'), 'checked':(showLeftGame) }, {"type":true,"checked":true})) + "/><span>Show Left Game</span><span>&nbsp;&nbsp;</span><input" + (jade.attrs({ 'id':('option-show-subscriptions'), 'type':('checkbox'), 'checked':(showSubscriptions) }, {"type":true,"checked":true})) + "/><span>Show Subscriptions</span></label></div><div class=\"modal-body\">");
if ( campaignCompletions && campaignCompletions.levels)
{
buf.push("<table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td class=\"level\">Level</td><td>Started</td><td>Finished</td><td class=\"completion-rate\">Completion %</td><td>Playtime (s)</td>");
if ( showLeftGame)
{
buf.push("<td>Left Game</td><td>LG %</td><td>LG/s</td>");
}
if ( showSubscriptions)
{
buf.push("<td>Sub Shown</td><td>Sub Purchased</td>");
}
buf.push("</tr></thead><tbody>");
for (var i = 0; i < campaignCompletions.levels.length; i++)
{
buf.push("<tr" + (jade.attrs({ 'data-level-slug':(campaignCompletions.levels[i].level), "class": [('level')] }, {"data-level-slug":true})) + "><td class=\"level-name-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].level) ? "" : jade.interp)) + "<span" + (jade.attrs({ 'style':("width:" + (campaignCompletions.levels[i].usersRemaining || 0) + "%;"), "class": [('level-name-background')] }, {"style":true})) + "></span></td><td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].started) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].finished) ? "" : jade.interp)) + "</td>");
if ( campaignCompletions.levels[i].completionRate)
{
if ( campaignCompletions.top3 && campaignCompletions.top3.indexOf(campaignCompletions.levels[i].level) >= 0)
{
buf.push("<td style=\"background-color:lightblue;\" class=\"level-completion-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].completionRate.toFixed(2)) ? "" : jade.interp)) + "<svg" + (jade.attrs({ 'id':("background" + (campaignCompletions.levels[i].level) + ""), "class": [('level-completion-background')] }, {"id":true})) + "></svg></td>");
}
else if ( campaignCompletions.bottom3 && campaignCompletions.bottom3.indexOf(campaignCompletions.levels[i].level) >= 0)
{
buf.push("<td style=\"background-color:pink;\" class=\"level-completion-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].completionRate.toFixed(2)) ? "" : jade.interp)) + "<svg" + (jade.attrs({ 'id':("background" + (campaignCompletions.levels[i].level) + ""), "class": [('level-completion-background')] }, {"id":true})) + "></svg></td>");
}
else
{
buf.push("<td class=\"level-completion-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].completionRate.toFixed(2)) ? "" : jade.interp)) + "<svg" + (jade.attrs({ 'id':("background" + (campaignCompletions.levels[i].level) + ""), "class": [('level-completion-background')] }, {"id":true})) + "></svg></td>");
}
}
else
{
buf.push("<td class=\"completion-rate\"></td>");
}
if ( campaignCompletions.levels[i].averagePlaytime)
{
buf.push("<td class=\"level-playtime-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].averagePlaytime.toFixed(2)) ? "" : jade.interp)) + "<span" + (jade.attrs({ 'style':("width:" + (campaignCompletions.levels[i].playtimePercentage || 0) + "%;"), "class": [('level-playtime-background')] }, {"style":true})) + "></span></td>");
}
else
{
buf.push("<td></td>");
}
if ( showLeftGame)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].dropped) ? "" : jade.interp)) + "</td>");
if ( campaignCompletions.levels[i].dropPercentage)
{
if ( campaignCompletions.top3DropPercentage && campaignCompletions.top3DropPercentage.indexOf(campaignCompletions.levels[i].level) >= 0)
{
buf.push("<td style=\"background-color:pink;\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].dropPercentage.toFixed(2)) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].dropPercentage.toFixed(2)) ? "" : jade.interp)) + "</td>");
}
}
else
{
buf.push("<td></td>");
}
if ( campaignCompletions.levels[i].droppedPerSecond)
{
if ( campaignCompletions.top3DropPerSecond && campaignCompletions.top3DropPerSecond.indexOf(campaignCompletions.levels[i].level) >= 0)
{
buf.push("<td style=\"background-color:pink;\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].droppedPerSecond.toFixed(2)) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].droppedPerSecond.toFixed(2)) ? "" : jade.interp)) + "</td>");
}
}
else
{
buf.push("<td></td>");
}
}
if ( showSubscriptions)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].subsShown) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].subsPurchased) ? "" : jade.interp)) + "</td>");
}
buf.push("</tr>");
}
buf.push("</tbody></table>");
}
else
{
buf.push("<div>Loading...</div>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/campaign/campaign-editor-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me,anonymous = locals_.anonymous;if ( view.campaign.loading)
{
buf.push("<nav role=\"navigation\" id=\"campaign-editor-top-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" id=\"campaign-editor-top-nav\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><ul class=\"nav navbar-nav navbar-right\">");
if ( me.isAdmin())
{
buf.push("<li id=\"analytics-button\"><a><span class=\"glyphicon-stats glyphicon\"></span></a></li>");
}
if ( me.isAdmin())
{
buf.push("<li id=\"save-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-toggle=\"coco-modal\" data-target=\"modal/RevertModal\" data-i18n=\"editor.revert\" id=\"revert-button\">Revert</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"editor.pop_i18n\" id=\"pop-level-i18n-button\">Populate i18n</a></li>");
if ( me.isAdmin())
{
buf.push("<li id=\"patches-button\"><a><span class=\"spr glyphicon-wrench glyphicon\"></span><span data-i18n=\"resources.patches\">Patches</span></a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li></ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content\"><div id=\"left-column\"><div id=\"campaign-treema\"></div></div><div id=\"right-column\"><div id=\"campaign-view\"></div><div id=\"campaign-level-view\" class=\"hidden\"></div><div class=\"patches-view hidden\"></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/campaign/campaign-level-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),level = locals_.level,analytics = locals_.analytics;buf.push("<div class=\"jumbotron\"><div type=\"button\" aria-hidden=\"true\" class=\"button close\">&times;</div><h1><span class=\"spr\">" + (jade.escape(null == (jade.interp = level.get('name')) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/editor/level/" + (level.get('slug')) + ""), 'target':("_blank") }, {"href":true,"target":true})) + ">(edit)</a></h1><p>" + (jade.escape(null == (jade.interp = level.get('description')) ? "" : jade.interp)) + "</p>");
if ( analytics.startDay && analytics.endDay)
{
buf.push("<div class=\"input-group input-group-sm\"><input" + (jade.attrs({ 'id':('input-startday'), 'type':('text'), 'style':('width:100px;'), 'value':(analytics.startDay), "class": [('form-control')] }, {"type":true,"style":true,"value":true})) + "/><input" + (jade.attrs({ 'id':('input-endday'), 'type':('text'), 'style':('width:100px;'), 'value':(analytics.endDay), "class": [('form-control')] }, {"type":true,"style":true,"value":true})) + "/><button id=\"reload-button\" style=\"margin-left:10px;\" class=\"btn btn-default btn-sm\">Reload</button></div>");
}
// iterate analytics.graphs
;(function(){
  var $$obj = analytics.graphs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var graph = $$obj[$index];

// iterate graph.lines
;(function(){
  var $$obj = graph.lines;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

buf.push("<label class=\"line-graph-label\"><input" + (jade.attrs({ 'data-lineid':("" + (line.lineID) + ""), 'type':('checkbox'), 'checked':(line.enabled), "class": [('line-graph-checkbox')] }, {"data-lineid":true,"type":true,"checked":true})) + "/><span>" + (jade.escape((jade.interp = line.description) == null ? '' : jade.interp)) + "</span><span>&nbsp;&nbsp;</span></label>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

buf.push("<label class=\"line-graph-label\"><input" + (jade.attrs({ 'data-lineid':("" + (line.lineID) + ""), 'type':('checkbox'), 'checked':(line.enabled), "class": [('line-graph-checkbox')] }, {"data-lineid":true,"type":true,"checked":true})) + "/><span>" + (jade.escape((jade.interp = line.description) == null ? '' : jade.interp)) + "</span><span>&nbsp;&nbsp;</span></label>");
    }

  }
}).call(this);

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

// iterate graph.lines
;(function(){
  var $$obj = graph.lines;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

buf.push("<label class=\"line-graph-label\"><input" + (jade.attrs({ 'data-lineid':("" + (line.lineID) + ""), 'type':('checkbox'), 'checked':(line.enabled), "class": [('line-graph-checkbox')] }, {"data-lineid":true,"type":true,"checked":true})) + "/><span>" + (jade.escape((jade.interp = line.description) == null ? '' : jade.interp)) + "</span><span>&nbsp;&nbsp;</span></label>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

buf.push("<label class=\"line-graph-label\"><input" + (jade.attrs({ 'data-lineid':("" + (line.lineID) + ""), 'type':('checkbox'), 'checked':(line.enabled), "class": [('line-graph-checkbox')] }, {"data-lineid":true,"type":true,"checked":true})) + "/><span>" + (jade.escape((jade.interp = line.description) == null ? '' : jade.interp)) + "</span><span>&nbsp;&nbsp;</span></label>");
    }

  }
}).call(this);

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

buf.push("<h4>Common Problems</h4>");
if ( analytics.commonProblems.loading)
{
buf.push("<div>Loading...</div>");
}
else
{
buf.push("<table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td>Language</td><td>Error Message</td><td>Error Hint</td><td>Count</td></tr></thead><tbody>");
for (var i = 0; i < analytics.commonProblems.data.length && i < 20; i++)
{
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = analytics.commonProblems.data[i].language) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.commonProblems.data[i].message) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.commonProblems.data[i].hint) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.commonProblems.data[i].count) ? "" : jade.interp)) + "</td></tr>");
}
buf.push("</tbody></table>");
}
buf.push("<h4>Recent Sessions</h4>");
if ( analytics.recentSessions.loading)
{
buf.push("<div>Loading...</div>");
}
else
{
buf.push("<div style=\"font-size:10pt\">Latest " + (jade.escape((jade.interp = analytics.recentSessions.data.length) == null ? '' : jade.interp)) + " sessions for this level</div><div style=\"font-size:10pt\">Double-click row to open player and session</div><table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td>Session ID</td><td>Player</td><td>Code Language</td><td>Playtime</td><td>Complete</td><td>Changed</td><td>Replay</td></tr></thead><tbody>");
for (var i = 0; i < analytics.recentSessions.data.length; i++)
{
buf.push("<tr" + (jade.attrs({ 'data-player-id':(analytics.recentSessions.data[i].creator), 'data-session-id':(analytics.recentSessions.data[i]._id), "class": [('recent-session')] }, {"data-player-id":true,"data-session-id":true})) + "><td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i]._id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].creatorName || analytics.recentSessions.data[i].creator) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].codeLanguage) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].playtime) ? "" : jade.interp)) + "</td>");
if ( analytics.recentSessions.data[i].state && analytics.recentSessions.data[i].state.complete)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].state.complete) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td>false</td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].changed) ? "" : jade.interp)) + "</td><td><button class=\"btn replay-button btn-xs\"><div class=\"glyphicon glyphicon-eye-open\"></div></button></td></tr>");
}
buf.push("</tbody></table>");
}
buf.push("<h4>Completion Rates</h4>");
if ( analytics.levelCompletions.loading)
{
buf.push("<div>Loading...</div>");
}
else
{
buf.push("<table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td>Date</td><td>Started</td><td>Finished</td><td>Completion %</td>");
if ( analytics.levelHelps.data.length === analytics.levelCompletions.data.length)
{
buf.push("<td>Helps Clicked</td><td>Helps / Started</td><td>Help Videos</td><td>Videos / Started</td>");
}
buf.push("</tr></thead><tbody>");
for (var i = 0; i < analytics.levelCompletions.data.length; i++)
{
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = analytics.levelCompletions.data[i].created) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelCompletions.data[i].started) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelCompletions.data[i].finished) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelCompletions.data[i].rate) ? "" : jade.interp)) + "</td>");
if ( analytics.levelHelps.data.length === analytics.levelCompletions.data.length && analytics.levelCompletions.data[i].created == analytics.levelHelps.data[i].day)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = analytics.levelHelps.data[i].alertHelps + analytics.levelHelps.data[i].paletteHelps) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = ((analytics.levelHelps.data[i].alertHelps + analytics.levelHelps.data[i].paletteHelps) / analytics.levelCompletions.data[i].started).toFixed(2)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelHelps.data[i].videoStarts) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = (analytics.levelHelps.data[i].videoStarts / analytics.levelCompletions.data[i].started).toFixed(2)) ? "" : jade.interp)) + "</td>");
}
buf.push("</tr>");
}
buf.push("</tbody></table>");
}
buf.push("<h4>Average Playtimes</h4>");
if ( analytics.levelPlaytimes.loading)
{
buf.push("<div>Loading...</div>");
}
else
{
buf.push("<table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td>Date</td><td>Average (s)</td></tr></thead><tbody>");
for (var i = 0; i < analytics.levelPlaytimes.data.length; i++)
{
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = analytics.levelPlaytimes.data[i].created) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelPlaytimes.data[i].average.toFixed(2)) ? "" : jade.interp)) + "</td></tr>");
}
buf.push("</tbody></table>");
}
buf.push("</div>");
if ( level.get('tasks'))
{
buf.push("<div class=\"tasks\"><h3>Tasks (read only)</h3><ul class=\"list-unstyled\">");
// iterate level.get('tasks')
;(function(){
  var $$obj = level.get('tasks');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var task = $$obj[$index];

buf.push("<li><input" + (jade.attrs({ 'type':('checkbox'), 'checked':(task.complete) }, {"type":true,"checked":true})) + "/><span class=\"spl\">" + (jade.escape(null == (jade.interp = task.name) ? "" : jade.interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var task = $$obj[$index];

buf.push("<li><input" + (jade.attrs({ 'type':('checkbox'), 'checked':(task.complete) }, {"type":true,"checked":true})) + "/><span class=\"spl\">" + (jade.escape(null == (jade.interp = task.name) ? "" : jade.interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul></div>");
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

;require.register("templates/editor/campaign/save-campaign-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Save Changes to Campaign</h3></div><div class=\"modal-body\">");
if ( !view.modelsToSave.models.length)
{
buf.push("<div data-i18n=\"delta.no_changes\" class=\"alert alert-info\">No changes</div>");
}
// iterate view.modelsToSave.models
;(function(){
  var $$obj = view.modelsToSave.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var model = $$obj[$index];

buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><span class=\"panel-title spr\">" + (jade.escape(null == (jade.interp = model.get('name')) ? "" : jade.interp)) + "</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = model.constructor.className) ? "" : jade.interp)) + "</span></div><div class=\"panel-body\"><div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('delta-view')] }, {"data-model-id":true})) + "></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var model = $$obj[$index];

buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><span class=\"panel-title spr\">" + (jade.escape(null == (jade.interp = model.get('name')) ? "" : jade.interp)) + "</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = model.constructor.className) ? "" : jade.interp)) + "</span></div><div class=\"panel-body\"><div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('delta-view')] }, {"data-model-id":true})) + "></div></div></div>");
    }

  }
}).call(this);

buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button data-i18n=\"common.save\" id=\"save-button\" class=\"btn btn-primary\">Save</button></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/component/add-thang-components-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,systems = locals_.systems,nameLists = locals_.nameLists,components = locals_.components;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h1 data-i18n=\"editor.add_components\">Add Components</h1></div><div class=\"modal-body\"><form><ul class=\"list-group\">");
// iterate systems
;(function(){
  var $$obj = systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<li class=\"list-group-item\"><div" + (jade.attrs({ 'data-toggle':("collapse"), 'data-target':("#" + (system) + ""), "class": [('item-title'),('collapsed')] }, {"data-toggle":true,"data-target":true})) + "><span class=\"glyphicon glyphicon-chevron-down text-muted spr\"></span><span class=\"glyphicon glyphicon-chevron-up text-muted spr\"></span><a>" + (jade.escape(null == (jade.interp = system) ? "" : jade.interp)) + "</a><span class=\"spl text-muted\">" + (jade.escape(null == (jade.interp = nameLists[system]) ? "" : jade.interp)) + "</span></div><div" + (jade.attrs({ 'id':(system), "class": [('collapse-panel'),('collapse')] }, {"id":true})) + ">");
// iterate components[system]
;(function(){
  var $$obj = components[system];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':('checkbox'), 'value':(component.id) }, {"type":true,"value":true})) + "/><span class=\"spr\">" + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + ":</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = component.get('description')) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':('checkbox'), 'value':(component.id) }, {"type":true,"value":true})) + "/><span class=\"spr\">" + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + ":</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = component.get('description')) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

buf.push("</div></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<li class=\"list-group-item\"><div" + (jade.attrs({ 'data-toggle':("collapse"), 'data-target':("#" + (system) + ""), "class": [('item-title'),('collapsed')] }, {"data-toggle":true,"data-target":true})) + "><span class=\"glyphicon glyphicon-chevron-down text-muted spr\"></span><span class=\"glyphicon glyphicon-chevron-up text-muted spr\"></span><a>" + (jade.escape(null == (jade.interp = system) ? "" : jade.interp)) + "</a><span class=\"spl text-muted\">" + (jade.escape(null == (jade.interp = nameLists[system]) ? "" : jade.interp)) + "</span></div><div" + (jade.attrs({ 'id':(system), "class": [('collapse-panel'),('collapse')] }, {"id":true})) + ">");
// iterate components[system]
;(function(){
  var $$obj = components[system];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':('checkbox'), 'value':(component.id) }, {"type":true,"value":true})) + "/><span class=\"spr\">" + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + ":</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = component.get('description')) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':('checkbox'), 'value':(component.id) }, {"type":true,"value":true})) + "/><span class=\"spr\">" + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + ":</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = component.get('description')) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

buf.push("</div></li>");
    }

  }
}).call(this);

buf.push("</ul></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.okay\" class=\"btn btn-primary\">Okay</button></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/component/thang-component-config-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"panel panel-default\"><div" + (jade.attrs({ "class": [('panel-heading'),(view.isDefaultComponent ? "is-default-component" : "")] }, {"class":true})) + "><em>" + (jade.escape((jade.interp = view.component.attributes.system) == null ? '' : jade.interp)) + ".</em><strong class=\"panel-title spr\">" + (jade.escape(null == (jade.interp = view.component.attributes.name) ? "" : jade.interp)) + "</strong><span id=\"description\" class=\"text-muted\">" + (jade.escape(null == (jade.interp = view.component.attributes.description) ? "" : jade.interp)) + "</span></div><div class=\"panel-body\"><div class=\"treema\"></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/component/thang-components-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div id=\"thang-components-column\" class=\"column\"><h3 data-i18n=\"editor.level_tab_components\">Components</h3><button id=\"add-components-button\" data-i18n=\"editor.add_components\" class=\"btn\">Add Components</button><div class=\"treema\"></div></div><div id=\"thang-components-config-column\" class=\"column\"><h3 data-i18n=\"editor.component_configs\">Component Configurations</h3><div id=\"thang-component-configs\"></div></div>");;return buf.join("");
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

;require.register("templates/editor/course/edit", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div><ol class=\"breadcrumb\"><li><a href=\"/editor\" data-i18n=\"editor.main_title\">CodeCombat Editors</a></li><li><a href=\"/editor/course\" data-i18n=\"editor.course_title\">Course Editor</a></li><li class=\"active\">" + (jade.escape((jade.interp = view.course.get('name')) == null ? '' : jade.interp)) + "</li></ol></div>");
var authorized = !me.get('anonymous');
buf.push("<button" + (jade.attrs({ 'data-i18n':("common.save"), 'disabled':(authorized === true ? undefined : "true"), 'id':('save-button'), "class": [('course-tool-button'),('btn'),('btn-primary')] }, {"data-i18n":true,"disabled":true})) + ">Save</button><h3 data-i18n=\"course.edit_course_title\">Edit Course<span>: \"" + (jade.escape((jade.interp = view.course.attributes.name) == null ? '' : jade.interp)) + "\"</span></h3><div class=\"alert alert-warning\">Can only edit translations currently</div><div id=\"course-treema\"></div><h3 data-i18n=\"resources.patches\">Patches</h3><div class=\"patches-view\"></div><hr/></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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

;require.register("templates/editor/course/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents,me = locals_.me,page = locals_.page;buf.push("<table class=\"table\"><tr><th colspan=\"4\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th></tr>");
// iterate documents
;(function(){
  var $$obj = documents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var course = $$obj[$index];

buf.push("<tr" + (jade.attrs({ "class": [(course.get('creator') == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(course.get('name')), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (course.get('slug') || course.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(course.get('description')), "class": [('description-row')] }, {"title":true})) + ">" + (jade.escape(null == (jade.interp = course.get('description')) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var course = $$obj[$index];

buf.push("<tr" + (jade.attrs({ "class": [(course.get('creator') == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(course.get('name')), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (course.get('slug') || course.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(course.get('description')), "class": [('description-row')] }, {"title":true})) + ">" + (jade.escape(null == (jade.interp = course.get('description')) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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

;require.register("templates/editor/delta", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;var i = 0
var counter = view.constructor.deltaCounter;
var deltaPanel_mixin = function(delta, conflict){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
delta.index = i++
buf.push("<div" + (jade.attrs({ 'data-index':(i), "class": [('delta'),('panel'),('panel-default'),('delta-'+delta.action)] }, {"class":true,"data-index":true})) + "><div class=\"panel-heading\">");
if ( delta.action === 'added')
{
buf.push("<strong data-i18n=\"delta.added\">Added</strong>");
}
if ( delta.action === 'modified')
{
buf.push("<strong data-i18n=\"delta.modified\">Modified</strong>");
}
if ( delta.action === 'deleted')
{
buf.push("<strong data-i18n=\"delta.deleted\">Deleted</strong>");
}
if ( delta.action === 'moved-index')
{
buf.push("<strong data-i18n=\"delta.moved_index\">Moved Index</strong>");
}
if ( delta.action === 'text-diff')
{
buf.push("<strong data-i18n=\"delta.text_diff\">Text Diff</strong>");
}
buf.push("<span> </span><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#delta-accordion"+(counter)), 'href':("#collapse-"+(i+counter)) }, {"data-toggle":true,"data-parent":true,"href":true})) + "><span>" + (jade.escape(null == (jade.interp = delta.humanPath) ? "" : jade.interp)) + "</span></a></div><div" + (jade.attrs({ 'id':("collapse-"+(i+counter)), "class": [('panel-collapse'),('collapse')] }, {"id":true})) + "><div" + (jade.attrs({ "class": [('panel-body'),('row'),(conflict ? "conflict-details" : "details")] }, {"class":true})) + ">");
if ( delta.action === 'added')
{
buf.push("<div class=\"new-value col-md-12\">" + (jade.escape(null == (jade.interp = delta.right) ? "" : jade.interp)) + "</div>");
}
if ( delta.action === 'modified')
{
buf.push("<div class=\"old-value col-md-6\">" + (jade.escape(null == (jade.interp = delta.left) ? "" : jade.interp)) + "</div><div class=\"new-value col-md-6\">" + (jade.escape(null == (jade.interp = delta.right) ? "" : jade.interp)) + "</div>");
}
if ( delta.action === 'deleted')
{
buf.push("<div class=\"col-md-12\"><div class=\"old-value\">" + (jade.escape(null == (jade.interp = delta.left) ? "" : jade.interp)) + "</div></div>");
}
if ( delta.action === 'text-diff')
{
buf.push("<div class=\"col-md-12\"><div class=\"text-diff\"></div></div>");
}
if ( delta.action === 'moved-index')
{
buf.push("<div class=\"col-md-12\"><span>Moved array value " + (jade.escape((jade.interp = delta.hash) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = delta.originalIndex) == null ? '' : jade.interp)) + " ➜ " + (jade.escape((jade.interp = delta.destinationIndex) == null ? '' : jade.interp)) + "</span></div>");
}
buf.push("</div></div>");
if ( delta.conflict && !conflict)
{
buf.push("<div class=\"panel-body\"><strong data-i18n=\"delta.merge_conflict_with\">MERGE CONFLICT WITH</strong>");
deltaPanel_mixin(delta.conflict, true);
buf.push("</div>");
}
buf.push("</div>");
};
buf.push("<div" + (jade.attrs({ 'id':('delta-accordion-'+(counter)), "class": [('panel-group')] }, {"id":true})) + ">");
// iterate view.expandedDeltas
;(function(){
  var $$obj = view.expandedDeltas;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var delta = $$obj[$index];

deltaPanel_mixin(delta);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var delta = $$obj[$index];

deltaPanel_mixin(delta);
    }

  }
}).call(this);

if ( !view.expandedDeltas.length)
{
buf.push("<alert data-i18n=\"delta.no_changes\" class=\"alert-warning\">No changes</alert>");
}
else
{
buf.push("<div class=\"delta panel panel-default\"><div class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#delta-accordion-expert"), 'href':("#collapse-expert-"+(counter)) }, {"data-toggle":true,"data-parent":true,"href":true})) + "><span>Expert View</span></a></div><div" + (jade.attrs({ 'id':("collapse-expert-"+(counter)), "class": [('panel-collapse'),('collapse')] }, {"id":true})) + "><div class=\"panel-body row\"><div class=\"expert-view\"></div></div></div></div>");
}
buf.push("</div>");;return buf.join("");
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

;require.register("templates/editor/docs/components-documentation-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),components = locals_.components,codeLanguage = locals_.codeLanguage,marked = locals_.marked;buf.push("<div class=\"container\"><div class=\"pull-right\"><button id=\"toggle-all-component-code\" class=\"btn btn-primary\">Toggle all code</button></div><div class=\"clearfix\"></div><div class=\"row\"><div class=\"col-xs-3 index-column nano\"><ul class=\"nav nav-list list-group nano-content\">");
// iterate components
;(function(){
  var $$obj = components;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + ""), "class": [('doc-name')] }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape(null == (jade.interp = component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</li><ul><!-- .list-group for different layout-->");
// iterate (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : [])
;(function(){
  var $$obj = (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + "" + (doc.name) + "") }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</li></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + "" + (doc.name) + "") }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</li></a>");
    }

  }
}).call(this);

buf.push("</ul></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + ""), "class": [('doc-name')] }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape(null == (jade.interp = component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</li><ul><!-- .list-group for different layout-->");
// iterate (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : [])
;(function(){
  var $$obj = (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + "" + (doc.name) + "") }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</li></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + "" + (doc.name) + "") }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</li></a>");
    }

  }
}).call(this);

buf.push("</ul></a>");
    }

  }
}).call(this);

buf.push("</ul></div><div class=\"col-xs-9 documentation-column nano\"><ul class=\"nano-content\">");
// iterate components
;(function(){
  var $$obj = components;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("" + (component.get('name')) + ""), "class": [("panel panel-defalt")] }, {"id":true,"class":true})) + "><div class=\"panel-heading\"><strong>" + (jade.escape(null == (jade.interp = component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</strong></div><div class=\"panel-body\">" + (jade.escape((jade.interp = component.get('description')) == null ? '' : jade.interp)) + "</div><ul>");
// iterate (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : [])
;(function(){
  var $$obj = (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'id':("" + (component.get('name')) + "" + (doc.name) + ""), "class": [('list-group-item')] }, {"id":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "<ul class=\"special-list\">");
if ( doc.description[codeLanguage])
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description[codeLanguage])) ? "" : jade.interp) + "</li>");
}
else
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description)) ? "" : jade.interp) + "</li>");
}
buf.push("</ul></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'id':("" + (component.get('name')) + "" + (doc.name) + ""), "class": [('list-group-item')] }, {"id":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "<ul class=\"special-list\">");
if ( doc.description[codeLanguage])
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description[codeLanguage])) ? "" : jade.interp) + "</li>");
}
else
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description)) ? "" : jade.interp) + "</li>");
}
buf.push("</ul></li>");
    }

  }
}).call(this);

buf.push("<li class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#" + (component.get('name')) + ""), 'href':("#" + (component.get('name')) + "Code"), "class": [('code-block')] }, {"data-toggle":true,"data-parent":true,"href":true})) + ">Code</a></li></ul><div" + (jade.attrs({ 'id':("" + (component.get('name')) + "Code"), "class": [("panel-collapse collapse")] }, {"id":true,"class":true})) + "><div class=\"panel-body\"><pre>" + (jade.escape((jade.interp = component.attributes.code) == null ? '' : jade.interp)) + "</pre></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("" + (component.get('name')) + ""), "class": [("panel panel-defalt")] }, {"id":true,"class":true})) + "><div class=\"panel-heading\"><strong>" + (jade.escape(null == (jade.interp = component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</strong></div><div class=\"panel-body\">" + (jade.escape((jade.interp = component.get('description')) == null ? '' : jade.interp)) + "</div><ul>");
// iterate (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : [])
;(function(){
  var $$obj = (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'id':("" + (component.get('name')) + "" + (doc.name) + ""), "class": [('list-group-item')] }, {"id":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "<ul class=\"special-list\">");
if ( doc.description[codeLanguage])
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description[codeLanguage])) ? "" : jade.interp) + "</li>");
}
else
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description)) ? "" : jade.interp) + "</li>");
}
buf.push("</ul></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'id':("" + (component.get('name')) + "" + (doc.name) + ""), "class": [('list-group-item')] }, {"id":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "<ul class=\"special-list\">");
if ( doc.description[codeLanguage])
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description[codeLanguage])) ? "" : jade.interp) + "</li>");
}
else
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description)) ? "" : jade.interp) + "</li>");
}
buf.push("</ul></li>");
    }

  }
}).call(this);

buf.push("<li class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#" + (component.get('name')) + ""), 'href':("#" + (component.get('name')) + "Code"), "class": [('code-block')] }, {"data-toggle":true,"data-parent":true,"href":true})) + ">Code</a></li></ul><div" + (jade.attrs({ 'id':("" + (component.get('name')) + "Code"), "class": [("panel-collapse collapse")] }, {"id":true,"class":true})) + "><div class=\"panel-body\"><pre>" + (jade.escape((jade.interp = component.attributes.code) == null ? '' : jade.interp)) + "</pre></div></div></div>");
    }

  }
}).call(this);

buf.push("</ul><div class=\"clearfix\"></div></div><div class=\"clearfix\"></div></div><div class=\"clearfix\"></div></div>");;return buf.join("");
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

;require.register("templates/editor/docs/systems-documentation-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),systems = locals_.systems;buf.push("<div class=\"container\"><div class=\"pull-right\"><button id=\"toggle-all-system-code\" class=\"btn btn-primary\">Toggle all code</button></div><div class=\"clearfix\"></div><div class=\"row\"><div class=\"col-xs-3 index-column nano\"><ul class=\"nav nav-list list-group nano-content\">");
// iterate systems
;(function(){
  var $$obj = systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (system.get('name')) + ""), "class": [('doc-name')] }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape(null == (jade.interp = system.get('name')) ? "" : jade.interp)) + "</li></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (system.get('name')) + ""), "class": [('doc-name')] }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape(null == (jade.interp = system.get('name')) ? "" : jade.interp)) + "</li></a>");
    }

  }
}).call(this);

buf.push("</ul></div><div class=\"col-xs-9 documentation-column nano\"><ul class=\"nano-content\">");
// iterate systems
;(function(){
  var $$obj = systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("" + (system.get('name')) + ""), "class": [("panel panel-defalt")] }, {"id":true,"class":true})) + "><div class=\"panel-heading\">" + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</div><div class=\"panel-body\">" + (jade.escape((jade.interp = system.get('description')) == null ? '' : jade.interp)) + "</div><ul><li class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#" + (system.get('name')) + ""), 'href':("#" + (system.get('name')) + "Code"), "class": [('code-block')] }, {"data-toggle":true,"data-parent":true,"href":true})) + ">Code</a></li></ul><div" + (jade.attrs({ 'id':("" + (system.get('name')) + "Code"), "class": [("panel-collapse collapse")] }, {"id":true,"class":true})) + "><div class=\"panel-body\"><pre>" + (jade.escape((jade.interp = system.attributes.code) == null ? '' : jade.interp)) + "</pre></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("" + (system.get('name')) + ""), "class": [("panel panel-defalt")] }, {"id":true,"class":true})) + "><div class=\"panel-heading\">" + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</div><div class=\"panel-body\">" + (jade.escape((jade.interp = system.get('description')) == null ? '' : jade.interp)) + "</div><ul><li class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#" + (system.get('name')) + ""), 'href':("#" + (system.get('name')) + "Code"), "class": [('code-block')] }, {"data-toggle":true,"data-parent":true,"href":true})) + ">Code</a></li></ul><div" + (jade.attrs({ 'id':("" + (system.get('name')) + "Code"), "class": [("panel-collapse collapse")] }, {"id":true,"class":true})) + "><div class=\"panel-body\"><pre>" + (jade.escape((jade.interp = system.attributes.code) == null ? '' : jade.interp)) + "</pre></div></div></div>");
    }

  }
}).call(this);

buf.push("</ul><div class=\"clearfix\"></div></div><div class=\"clearfix\"></div></div><div class=\"clearfix\"></div></div>");;return buf.join("");
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

;require.register("templates/editor/fork-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.fork_title\">Fork New Version</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"model-name\" data-i18n=\"general.name\">Name</label><input id=\"fork-model-name\" name=\"name\" type=\"text\" class=\"form-control\"/></div></form></div><div class=\"modal-body wait secret\"><h3 data-i18n=\"editor.fork_creating\">Creating Fork...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button id=\"fork-model-confirm-button\" data-i18n=\"common.save\" class=\"btn btn-primary\">Save</button></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/add-thangs-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),groups = locals_.groups;buf.push("<h3 data-i18n=\"editor.level_tab_thangs_add\">Add Thangs</h3><input type=\"search\" id=\"thang-search\" data-i18n=\"[placeholder]editor.level_tab_thangs_search\" placeholder=\"Search thangs\"/><div class=\"editor-nano-container nano\"><div id=\"thangs-list\" class=\"nano-content\">");
// iterate groups
;(function(){
  var $$obj = groups;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var group = $$obj[$index];

buf.push("<h4>" + (jade.escape(null == (jade.interp = group.name) ? "" : jade.interp)) + "</h4>");
// iterate group.thangs
;(function(){
  var $$obj = group.thangs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var thangType = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-thang-type':(thangType.get('name')), 'title':(thangType.get('name')), "class": [('add-thang-palette-icon')] }, {"data-thang-type":true,"title":true})) + "><img" + (jade.attrs({ 'src':(thangType.getPortraitURL()), 'alt':("") }, {"src":true,"alt":true})) + "/></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var thangType = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-thang-type':(thangType.get('name')), 'title':(thangType.get('name')), "class": [('add-thang-palette-icon')] }, {"data-thang-type":true,"title":true})) + "><img" + (jade.attrs({ 'src':(thangType.getPortraitURL()), 'alt':("") }, {"src":true,"alt":true})) + "/></div>");
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var group = $$obj[$index];

buf.push("<h4>" + (jade.escape(null == (jade.interp = group.name) ? "" : jade.interp)) + "</h4>");
// iterate group.thangs
;(function(){
  var $$obj = group.thangs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var thangType = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-thang-type':(thangType.get('name')), 'title':(thangType.get('name')), "class": [('add-thang-palette-icon')] }, {"data-thang-type":true,"title":true})) + "><img" + (jade.attrs({ 'src':(thangType.getPortraitURL()), 'alt':("") }, {"src":true,"alt":true})) + "/></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var thangType = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-thang-type':(thangType.get('name')), 'title':(thangType.get('name')), "class": [('add-thang-palette-icon')] }, {"data-thang-type":true,"title":true})) + "><img" + (jade.attrs({ 'src':(thangType.getPortraitURL()), 'alt':("") }, {"src":true,"alt":true})) + "/></div>");
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div>");
    }

  }
}).call(this);

buf.push("</div></div>");;return buf.join("");
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

;require.register("templates/editor/level/component/level-component-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),editTitle = locals_.editTitle,component = locals_.component,me = locals_.me;buf.push("<nav role=\"navigation\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#component-code\" data-toggle=\"tab\" data-i18n=\"general.code\" id=\"component-code-tab\">Code</a></li><li><a href=\"#component-config-schema\" data-toggle=\"tab\" data-i18n=\"editor.level_component_config_schema\" id=\"component-config-schema-tab\">Config Schema</a></li><li><a href=\"#component-settings\" data-toggle=\"tab\" data-i18n=\"play.settings\" id=\"component-settings-tab\">Settings</a></li><li><a href=\"#component-patches\" data-toggle=\"tab\" data-i18n=\"resources.patches\" id=\"component-patches-tab\">Patches</a></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape(null == (jade.interp = editTitle) ? "" : jade.interp)) + "</span></div><ul class=\"nav navbar-nav navbar-right\">");
if ( !component.hasWriteAccess())
{
buf.push("<li id=\"patch-component-button\"><a data-i18n=\"[title]common.submit_patch\"><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li><a id=\"component-watch-button\"><span class=\"watch\"><span class=\"glyphicon glyphicon-eye-open\"></span><span data-i18n=\"common.watch\" class=\"spl\">Watch</span></span><span class=\"unwatch secret\"><span class=\"glyphicon glyphicon-eye-close\"></span><span data-i18n=\"common.unwatch\" class=\"spl\">Unwatch</span></span></a></li>");
if ( !me.get('anonymous'))
{
buf.push("<li id=\"create-new-component-button\"><a data-i18n=\"editor.level_component_btn_new\">Create New Component</a></li><li><a data-i18n=\"editor.pop_i18n\" id=\"pop-component-i18n-button\">Populate i18n</a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"component-history-button\"><a data-i18n=\"general.version_history\">Version History</a></li></ul></li></ul></nav><div class=\"tab-content\"><div id=\"component-code\" class=\"tab-pane active\"><div id=\"component-code-editor\"></div></div><div id=\"component-config-schema\" class=\"tab-pane\"><div id=\"config-schema-treema\"></div></div><div id=\"component-settings\" class=\"tab-pane\"><div id=\"edit-component-treema\"></div></div><div id=\"component-patches\" class=\"tab-pane\"><div class=\"patches-view\"></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/component/new", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.new_component_title\">Create New Component</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"level-component-system\" data-i18n=\"editor.new_component_field_system\" class=\"control-label\">System</label><select id=\"level-component-system\" name=\"system\" class=\"form-control\">");
// iterate view.systems
;(function(){
  var $$obj = view.systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(system) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = system) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(system) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = system) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div><div class=\"form-group\"><label for=\"level-component-name\" data-i18n=\"general.name\" class=\"control-label\">Name</label><input id=\"level-component-name\" name=\"name\" type=\"text\" class=\"form-control\"/></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button data-i18n=\"common.create\" id=\"new-level-component-submit\" class=\"btn btn-primary\">Create</button></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/component/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),components = locals_.components;buf.push("<table class=\"table components-table\"><tr><th colspan=\"3\">Results: " + (jade.escape((jade.interp = components.length) == null ? '' : jade.interp)) + "</th></tr><tr><th>Name</th><th>Description</th><th>Version</th><th></th></tr>");
// iterate components
;(function(){
  var $$obj = components;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = component.system + "." + component.name) ? "" : jade.interp)) + "</td><td class=\"body-row\">" + (jade.escape((jade.interp = component.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = component.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.version.minor) == null ? '' : jade.interp)) + "</td><td><i" + (jade.attrs({ 'data-system':(component.system), 'data-name':(component.name), "class": [('icon-pencil'),('edit-component-button')] }, {"data-system":true,"data-name":true})) + "></i></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = component.system + "." + component.name) ? "" : jade.interp)) + "</td><td class=\"body-row\">" + (jade.escape((jade.interp = component.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = component.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.version.minor) == null ? '' : jade.interp)) + "</td><td><i" + (jade.attrs({ 'data-system':(component.system), 'data-name':(component.name), "class": [('icon-pencil'),('edit-component-button')] }, {"data-system":true,"data-name":true})) + "></i></td></tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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

;require.register("templates/editor/level/components_tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me;buf.push("<div class=\"components-container\"><h3 data-i18n=\"editor.level_component_tab_title\">Current Components</h3><button type=\"button\" data-toggle=\"collapse\" data-target=\"#components-treema\" class=\"navbar-toggle toggle btn-primary\"><span class=\"icon-list\"></span></button><div class=\"editor-nano-container nano\"><div id=\"components-treema\" class=\"nano-content\"></div></div></div><div class=\"edit-component-container\">");
if ( !me.get('anonymous'))
{
buf.push("<button id=\"create-new-component-button-no-select\" class=\"btn btn-primary\"><span class=\"icon-plus\"></span><span data-i18n=\"editor.level_component_btn_new\" class=\"text\">Create New Component</span></button>");
}
buf.push("<div id=\"level-component-edit-view\"></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/level-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),level = locals_.level,view = locals_.view,authorized = locals_.authorized,recentlyPlayedOpponents = locals_.recentlyPlayedOpponents,anonymous = locals_.anonymous,me = locals_.me;if ( level.loading)
{
buf.push("<nav role=\"navigation\" id=\"level-editor-top-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/level\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" id=\"level-editor-top-nav\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/level\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#thangs-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_thangs\">Thangs</a></li><li><a href=\"#editor-level-scripts-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_scripts\">Scripts</a></li><li><a href=\"#editor-level-settings-tab-view\" data-toggle=\"tab\" data-i18n=\"play.settings\">Settings</a></li><li><a href=\"#editor-level-components-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_components\" id=\"components-tab\">Components</a></li><li><a href=\"#systems-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_systems\">Systems</a></li><li><a href=\"#editor-level-tasks-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_tasks\" id=\"tasks-tab\">" + (jade.escape(null == (jade.interp = "Tasks" + " " + view.getTaskCompletionRatio()) ? "" : jade.interp)) + "</a></li><li><a href=\"#editor-level-patches\" data-toggle=\"tab\" id=\"patches-tab\"><span data-i18n=\"resources.patches\" class=\"spr\">Patches</span>");
var patches = level.get('patches')
if ( patches && patches.length)
{
buf.push("<span class=\"badge\">" + (jade.escape(null == (jade.interp = patches.length) ? "" : jade.interp)) + "</span>");
}
buf.push("</a></li><li><a href=\"#related-achievements-view\" data-toggle=\"tab\" data-i18n=\"user.achievements_title\">Achievements</a></li><li><a href=\"#editor-level-documentation\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_docs\">Documentation</a></li><li><a href=\"#level-feedback-view\" data-toggle=\"tab\"><div class=\"glyphicon glyphicon-star\"></div></a></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape((jade.interp = level.attributes.name) == null ? '' : jade.interp)) + "<span id=\"completion-rate\" class=\"spl\"></span></span></div><ul class=\"nav navbar-nav navbar-right\"><li id=\"undo-button\"><a><span class=\"glyphicon-arrow-left glyphicon\"></span></a></li><li id=\"redo-button\"><a><span class=\"glyphicon-arrow-right glyphicon\"></span></a></li><li id=\"artisan-guide-button\"><a><span class=\"glyphicon-book glyphicon\"></span></a></li>");
if ( authorized)
{
buf.push("<li id=\"commit-level-start-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
else
{
buf.push("<li id=\"level-patch-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
if ( level.isType('ladder'))
{
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\" class=\"play-with-team-parent\"><span class=\"glyphicon-play glyphicon\"></span></a><ul class=\"dropdown-menu\"><li class=\"dropdown-header\">Play As Which Team?</li><li>");
// iterate ['humans', 'ogres']
;(function(){
  var $$obj = ['humans', 'ogres'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var team = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(team), "class": [('play-with-team-button')] }, {"data-team":true})) + ">" + (jade.escape(null == (jade.interp = team + ' vs. AI') ? "" : jade.interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var team = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(team), "class": [('play-with-team-button')] }, {"data-team":true})) + ">" + (jade.escape(null == (jade.interp = team + ' vs. AI') ? "" : jade.interp)) + "</a>");
    }

  }
}).call(this);

// iterate recentlyPlayedOpponents
;(function(){
  var $$obj = recentlyPlayedOpponents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var match = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(match.yourTeam), 'data-opponent':(match.opponentSessionID), "class": [('play-with-team-button')] }, {"data-team":true,"data-opponent":true})) + ">" + (jade.escape(null == (jade.interp = match.yourTeam + ' vs. ' + match.opponentName) ? "" : jade.interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var match = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(match.yourTeam), 'data-opponent':(match.opponentSessionID), "class": [('play-with-team-button')] }, {"data-team":true,"data-opponent":true})) + ">" + (jade.escape(null == (jade.interp = match.yourTeam + ' vs. ' + match.opponentName) ? "" : jade.interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</li></ul></li>");
}
else
{
buf.push("<li data-i18n=\"[title]general.play_preview\" title=\"Play preview of current level\" id=\"play-button\"><a><span class=\"glyphicon-play glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li><a id=\"level-watch-button\"><span class=\"watch\"><span class=\"glyphicon glyphicon-eye-open\"></span><span data-i18n=\"common.watch\" class=\"spl\">Watch</span></span><span class=\"unwatch secret\"><span class=\"glyphicon glyphicon-eye-close\"></span><span data-i18n=\"common.unwatch\" class=\"spl\">Unwatch</span></span></a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"common.fork\" id=\"fork-start-button\">Fork</a></li>");
if ( me.isAdmin() || me.isArtisan())
{
buf.push("<!-- DNT--><li><a id=\"save-branch\">Save/Stash Branch</a></li><li><a id=\"load-branch\">Load/Unstash Branch</a></li>");
}
buf.push("<li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("modal/RevertModal"), 'data-i18n':("editor.revert"), 'disabled':(anonymous), 'id':('revert-button') }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Revert</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("editor/level/modals/GenerateTerrainModal"), 'data-i18n':("editor.generate_terrain"), 'disabled':(anonymous), "class": [('generate-terrain-button')] }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Generate Terrain</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"editor.pop_i18n\" id=\"pop-level-i18n-button\">Populate i18n</a></li>");
if ( view.courseID)
{
buf.push("<li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-classroom=\"classroom\" data-code-language=\"javascript\" class=\"play-classroom-level\">Play Classroom JavaScript</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-classroom=\"classroom\" data-code-language=\"python\" class=\"play-classroom-level\">Play Classroom Python</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-classroom=\"home\" data-code-language=\"\" class=\"play-classroom-level\">Play Home</a></li>");
}
if ( me.isAdmin())
{
buf.push("<li><a" + (jade.attrs({ 'href':("/editor/verifier/" + (level.get('slug')) + "?dev=true") }, {"href":true})) + ">Verifier</a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"level-history-button\"><a href=\"#\" data-i18n=\"general.version_history\">Version History</a></li><li class=\"divider\"></li><li data-i18n=\"common.help\" class=\"dropdown-header\">Help</li><li><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-Home\" data-i18n=\"editor.wiki\" target=\"_blank\">Wiki</a></li><li><a href=\"https://coco-slack-invite.herokuapp.com/\" data-i18n=\"editor.live_chat\" target=\"_blank\">Live Chat</a></li><li><a href=\"http://discourse.codecombat.com/category/artisan\" data-i18n=\"nav.forum\" target=\"_blank\">Forum</a></li>");
if ( !me.isStudent())
{
buf.push("<li><a data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("</ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content\"><div id=\"level-editor-tabs\" class=\"tab-content\"><div id=\"thangs-tab-view\" class=\"tab-pane active\"></div><div id=\"editor-level-scripts-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-settings-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-components-tab-view\" class=\"tab-pane\"></div><div id=\"systems-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-tasks-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-patches\" class=\"tab-pane nano\"><div class=\"nano-content\"><div class=\"patches-view\"></div></div></div><div id=\"related-achievements-view\" class=\"tab-pane\"></div><div id=\"editor-level-documentation\" class=\"tab-pane\"><div class=\"tab-content\"><ul class=\"nav nav-pills nav-justified\"><li><a href=\"#components-documentation-view\" data-toggle=\"pill\" data-i18n=\"resources.components\">Components</a></li><li><a href=\"#systems-documentation-view\" data-toggle=\"pill\" data-i18n=\"resources.systems\">Systems</a></li></ul><div id=\"components-documentation-view\" class=\"tab-pane\"></div><div id=\"systems-documentation-view\" class=\"tab-pane\"></div></div></div><div id=\"level-feedback-view\" class=\"tab-pane\"></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/level-feedback-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),averageRating = locals_.averageRating,totalRatings = locals_.totalRatings,allFeedback = locals_.allFeedback,moment = locals_.moment;buf.push("<h2>Average Rating: " + (jade.escape((jade.interp = averageRating.toFixed(2)) == null ? '' : jade.interp)) + ", " + (jade.escape((jade.interp = totalRatings) == null ? '' : jade.interp)) + " ratings</h2><ul class=\"user-feedback-list list-group\">");
// iterate allFeedback
;(function(){
  var $$obj = allFeedback;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var feedback = $$obj[$index];

buf.push("<li class=\"list-group-item\">");
// iterate Array(feedback.rating)
;(function(){
  var $$obj = Array(feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  }
}).call(this);

if ( feedback.rating < 5)
{
// iterate Array(5 - feedback.rating)
;(function(){
  var $$obj = Array(5 - feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  }
}).call(this);

}
buf.push("<span class=\"spl spr\">-</span><em>" + (jade.escape(null == (jade.interp = moment(new Date(feedback.created)).fromNow()) ? "" : jade.interp)) + "</em><span class=\"spl spr\">-</span><a" + (jade.attrs({ 'href':("/user/" + (feedback.creator) + "") }, {"href":true})) + "><strong>" + (jade.escape(null == (jade.interp = feedback.creatorName || 'Anonymous') ? "" : jade.interp)) + "</strong></a>");
if ( feedback.review)
{
buf.push("<span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = feedback.review) ? "" : jade.interp)) + "</span>");
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var feedback = $$obj[$index];

buf.push("<li class=\"list-group-item\">");
// iterate Array(feedback.rating)
;(function(){
  var $$obj = Array(feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  }
}).call(this);

if ( feedback.rating < 5)
{
// iterate Array(5 - feedback.rating)
;(function(){
  var $$obj = Array(5 - feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  }
}).call(this);

}
buf.push("<span class=\"spl spr\">-</span><em>" + (jade.escape(null == (jade.interp = moment(new Date(feedback.created)).fromNow()) ? "" : jade.interp)) + "</em><span class=\"spl spr\">-</span><a" + (jade.attrs({ 'href':("/user/" + (feedback.creator) + "") }, {"href":true})) + "><strong>" + (jade.escape(null == (jade.interp = feedback.creatorName || 'Anonymous') ? "" : jade.interp)) + "</strong></a>");
if ( feedback.review)
{
buf.push("<span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = feedback.review) ? "" : jade.interp)) + "</span>");
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ul>");;return buf.join("");
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

;require.register("templates/editor/level/modal/artisan-guide-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Artisan Compendium</h3></div><div class=\"modal-body\"><p>Welcome to the Artisan Compendium. Below you will find a series of helpful guides and tutorials for getting your levels to Master Artisan quality");
if ( view.hasOwnership())
{
buf.push(", as well as a way to submit your level for official Artisan review");
}
buf.push("! If you have any feedback on the Level Editor, please contact us at: <a href=\"mailto:artisans@codecombat.com\">artisans@codecombat.com</a></p><div class=\"centered-stack\"><div><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-Home\" target=\"_blank\">Wiki Homepage</a></div><div><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-How-To-Index\" target=\"_blank\">Basic How-tos</a></div><div><a href=\"http://www.codecombat.com/community\" target=\"_blank\">Artisan Rankings</a></div></div>");
if ( view.hasOwnership())
{
buf.push("<h4>Level Submission</h4><p>Do you want your level to be added to the campaign? Please take a moment to fill out the questions below! Don’t worry, this isn’t a timed quiz. It is just a way for the artisans at CodeCombat HQ to get a feel for the purpose of this level. If it doesn’t quite yet meet our standards for release we will give you feedback to help polish it further!</p><div class=\"form\"><div class=\"form-group\"><label for=\"credit-name\" class=\"control-label\">How would you like to be credited?</label><input id=\"credit-name\" name=\"creditName\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"level-purpose\" class=\"control-label\">What is the purpose of this level?</label><textarea id=\"level-purpose\" name=\"levelPurpose\" rows=\"4\" class=\"form-control\"></textarea></div><div class=\"form-group\"><label for=\"level-inspiration\" class=\"control-label\">What was the inspiration for the level?</label><textarea id=\"level-inspiration\" name=\"levelInspiration\" rows=\"4\" class=\"form-control\"></textarea></div><div class=\"form-group\"><label for=\"level-location\" class=\"control-label\">Where in the campaign do you think this level belongs?</label><textarea id=\"level-location\" name=\"levelLocation\" rows=\"4\" class=\"form-control\"></textarea></div></div>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div><a href=\"#\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"btn\">Close</a>");
if ( view.hasOwnership())
{
buf.push("<button id=\"level-submit\" class=\"btn btn-primary\">Submit</button>");
}
buf.push("</div></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/modal/generate-terrain-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.pick_a_terrain\">Pick a Terrain</h3></div><div class=\"modal-body\"><div id=\"normal-view\">");
// iterate view.presetSizes
;(function(){
  var $$obj = view.presetSizes;
  if ('number' == typeof $$obj.length) {

    for (var size = 0, $$l = $$obj.length; size < $$l; size++) {
      var sizeObject = $$obj[size];

// iterate view.presets
;(function(){
  var $$obj = view.presets;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var preset = $$obj[$index];

buf.push("<a href=\"#\"><div" + (jade.attrs({ 'data-preset-type':(preset.type), 'data-preset-size':(size), 'style':("background:url(/images/pages/editor/level/preset_"+preset.type+"_"+size+".jpg) no-repeat center; background-size: cover"), "class": [('choose-option')] }, {"data-preset-type":true,"data-preset-size":true,"style":true})) + "><div class=\"preset-size name-label capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+size) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = size) == null ? '' : jade.interp)) + "</span></div><div class=\"preset-name capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+preset.type) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = preset.type) == null ? '' : jade.interp)) + "</span></div></div></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var preset = $$obj[$index];

buf.push("<a href=\"#\"><div" + (jade.attrs({ 'data-preset-type':(preset.type), 'data-preset-size':(size), 'style':("background:url(/images/pages/editor/level/preset_"+preset.type+"_"+size+".jpg) no-repeat center; background-size: cover"), "class": [('choose-option')] }, {"data-preset-type":true,"data-preset-size":true,"style":true})) + "><div class=\"preset-size name-label capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+size) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = size) == null ? '' : jade.interp)) + "</span></div><div class=\"preset-name capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+preset.type) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = preset.type) == null ? '' : jade.interp)) + "</span></div></div></a>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var size in $$obj) {
      $$l++;      var sizeObject = $$obj[size];

// iterate view.presets
;(function(){
  var $$obj = view.presets;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var preset = $$obj[$index];

buf.push("<a href=\"#\"><div" + (jade.attrs({ 'data-preset-type':(preset.type), 'data-preset-size':(size), 'style':("background:url(/images/pages/editor/level/preset_"+preset.type+"_"+size+".jpg) no-repeat center; background-size: cover"), "class": [('choose-option')] }, {"data-preset-type":true,"data-preset-size":true,"style":true})) + "><div class=\"preset-size name-label capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+size) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = size) == null ? '' : jade.interp)) + "</span></div><div class=\"preset-name capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+preset.type) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = preset.type) == null ? '' : jade.interp)) + "</span></div></div></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var preset = $$obj[$index];

buf.push("<a href=\"#\"><div" + (jade.attrs({ 'data-preset-type':(preset.type), 'data-preset-size':(size), 'style':("background:url(/images/pages/editor/level/preset_"+preset.type+"_"+size+".jpg) no-repeat center; background-size: cover"), "class": [('choose-option')] }, {"data-preset-type":true,"data-preset-size":true,"style":true})) + "><div class=\"preset-size name-label capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+size) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = size) == null ? '' : jade.interp)) + "</span></div><div class=\"preset-name capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+preset.type) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = preset.type) == null ? '' : jade.interp)) + "</span></div></div></a>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/modal/load-branch-modal", function(exports, require, module) {
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

;require.register("templates/editor/level/modal/new-achievement", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3" + (jade.attrs({ 'data-i18n':("" + (view.newModelTitle) + "") }, {"data-i18n":true})) + ">Create New " + (jade.escape((jade.interp = view.modelLabel) == null ? '' : jade.interp)) + "</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"name\" data-i18n=\"general.name\" class=\"control-label\">Name</label><input id=\"name\" name=\"name\" type=\"text\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"description\" data-i18n=\"general.description\" class=\"control-label\">Description</label><input id=\"description\" name=\"description\" type=\"text\" class=\"form-control\"/></div><h4 data-i18n=\"editor.achievement_query_misc\">Key achievement off of miscellanea</h4><div class=\"radio\"><label><input type=\"checkbox\" name=\"queryOptions\" id=\"misc-level-completion\" value=\"misc-level-completion\"/><span data-i18n=\"editor.level_completion\" class=\"spl\">Level Completion</span></label></div>");
var goals = view.level.get('goals');
if ( goals && goals.length)
{
buf.push("<h4 data-i18n=\"editor.achievement_query_goals\">Key achievement off of level goals</h4>");
// iterate goals
;(function(){
  var $$obj = goals;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var goal = $$obj[$index];

buf.push("<div class=\"radio\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("queryOptions"), 'id':("" + (goal.id) + ""), 'value':("" + (goal.id) + "") }, {"type":true,"name":true,"id":true,"value":true})) + "/><span class=\"spl\">" + (jade.escape(null == (jade.interp = goal.name) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var goal = $$obj[$index];

buf.push("<div class=\"radio\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("queryOptions"), 'id':("" + (goal.id) + ""), 'value':("" + (goal.id) + "") }, {"type":true,"name":true,"id":true,"value":true})) + "/><span class=\"spl\">" + (jade.escape(null == (jade.interp = goal.name) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

}
buf.push("</form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button id=\"save-new-achievement-link\" data-i18n=\"common.create\" class=\"btn btn-primary new-model-submit\">Create</button></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/modal/save-branch-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,moment = locals_.moment;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Save Branch</h3></div><div class=\"modal-body\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-2\"><div id=\"branches-list-group\" class=\"list-group\"><a" + (jade.attrs({ "class": [('list-group-item'),((view.selectedBranch ? '' : 'active'))] }, {"class":true})) + "><i>New Branch</i><input id=\"new-branch-name-input\" placeholder=\"Name\" class=\"form-control\"/></a>");
// iterate view.branches.models
;(function(){
  var $$obj = view.branches.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var branch = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-branch-cid':(branch.cid), "class": [('list-group-item'),((view.selectedBranch == branch ? 'active': ''))] }, {"class":true,"data-branch-cid":true})) + "><span class=\"delete-branch-btn glyphicon glyphicon-remove pull-right\"></span>" + (jade.escape(null == (jade.interp = branch.get('name')) ? "" : jade.interp)) + "<div class=\"small\"><i>" + (jade.escape(null == (jade.interp = branch.get('updatedByName')) ? "" : jade.interp)) + "</i><br/><span>" + (jade.escape(null == (jade.interp = moment(branch.get('updated')).format('lll')) ? "" : jade.interp)) + "</span></div></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var branch = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-branch-cid':(branch.cid), "class": [('list-group-item'),((view.selectedBranch == branch ? 'active': ''))] }, {"class":true,"data-branch-cid":true})) + "><span class=\"delete-branch-btn glyphicon glyphicon-remove pull-right\"></span>" + (jade.escape(null == (jade.interp = branch.get('name')) ? "" : jade.interp)) + "<div class=\"small\"><i>" + (jade.escape(null == (jade.interp = branch.get('updatedByName')) ? "" : jade.interp)) + "</i><br/><span>" + (jade.escape(null == (jade.interp = moment(branch.get('updated')).format('lll')) ? "" : jade.interp)) + "</span></div></a>");
    }

  }
}).call(this);

buf.push("</div></div><div class=\"col-sm-5\"><h2>Changes from Prod</h2>");
// iterate view.componentsWithChanges.models
;(function(){
  var $$obj = view.componentsWithChanges.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<h4 class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'data-component-id':(component.id), 'checked':(true), "class": [('component-checkbox')] }, {"type":true,"data-component-id":true,"checked":true})) + "/>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "Component: " + (jade.escape((jade.interp = component.get('system')) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + "</label></h4><div" + (jade.attrs({ 'data-component-id':(component.id), "class": [('component-changes-stub')] }, {"data-component-id":true})) + "></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<h4 class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'data-component-id':(component.id), 'checked':(true), "class": [('component-checkbox')] }, {"type":true,"data-component-id":true,"checked":true})) + "/>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "Component: " + (jade.escape((jade.interp = component.get('system')) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + "</label></h4><div" + (jade.attrs({ 'data-component-id':(component.id), "class": [('component-changes-stub')] }, {"data-component-id":true})) + "></div>");
    }

  }
}).call(this);

// iterate view.systemsWithChanges.models
;(function(){
  var $$obj = view.systemsWithChanges.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<h4 class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'data-system-id':(system.id), 'checked':(true), "class": [('system-checkbox')] }, {"type":true,"data-system-id":true,"checked":true})) + "/>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "System: " + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</label></h4><div" + (jade.attrs({ 'data-system-id':(system.id), "class": [('system-changes-stub')] }, {"data-system-id":true})) + "></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<h4 class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'data-system-id':(system.id), 'checked':(true), "class": [('system-checkbox')] }, {"type":true,"data-system-id":true,"checked":true})) + "/>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "System: " + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</label></h4><div" + (jade.attrs({ 'data-system-id':(system.id), "class": [('system-changes-stub')] }, {"data-system-id":true})) + "></div>");
    }

  }
}).call(this);

buf.push("</div><div id=\"selected-branch-col\" class=\"col-sm-5\">");
if ( view.selectedBranch)
{
buf.push("<h2>Changes from Branch</h2>");
// iterate view.selectedBranch.components.models
;(function(){
  var $$obj = view.selectedBranch.components.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<h4>Component: " + (jade.escape((jade.interp = component.get('system')) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + "</h4><div" + (jade.attrs({ 'data-component-id':(component.id), "class": [('component-changes-stub')] }, {"data-component-id":true})) + "></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<h4>Component: " + (jade.escape((jade.interp = component.get('system')) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + "</h4><div" + (jade.attrs({ 'data-component-id':(component.id), "class": [('component-changes-stub')] }, {"data-component-id":true})) + "></div>");
    }

  }
}).call(this);

// iterate view.selectedBranch.systems.models
;(function(){
  var $$obj = view.selectedBranch.systems.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<h4>System: " + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</h4><div" + (jade.attrs({ 'data-system-id':(system.id), "class": [('system-changes-stub')] }, {"data-system-id":true})) + "></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<h4>System: " + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</h4><div" + (jade.attrs({ 'data-system-id':(system.id), "class": [('system-changes-stub')] }, {"data-system-id":true})) + "></div>");
    }

  }
}).call(this);

}
else
{
buf.push("<h2>New Branch</h2>");
}
buf.push("</div></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"stash-branch-btn\" class=\"btn btn-primary\">Stash Branch</button><button id=\"save-branch-btn\" class=\"btn btn-primary\">Save Branch</button></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/modal/world-select-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,selectingPoint = locals_.selectingPoint,flexibleRegion = locals_.flexibleRegion;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3> ");
if ( selectingPoint)
{
buf.push("Select Point");
}
else
{
buf.push("Select Region");
}
buf.push("</h3></div><div class=\"modal-body\"><div class=\"instructions\"><div class=\"alert alert-info\"> <strong>Click</strong> to pan</div><div class=\"alert alert-info\"> <strong>Scroll</strong> to zoom</div>");
if ( selectingPoint)
{
buf.push("<div class=\"alert alert-info\"><strong>Shift-click </strong> to select</div>");
}
else
{
buf.push("<div class=\"alert alert-info\"><strong>Shift-drag</strong> to select</div>");
}
if ( flexibleRegion)
{
buf.push("<div class=\"alert alert-info\"><strong>Alt-shift-drag</strong> to select ratio</div>");
}
else
{
buf.push("<div class=\"alert alert-info\"><strong>Enter</strong> to confirm</div>");
}
buf.push("</div><div class=\"canvas-wrapper\"><canvas width=\"924\" height=\"589\" class=\"webgl-canvas\"></canvas><canvas width=\"924\" height=\"589\" class=\"normal-canvas\"></canvas></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><a id=\"done-button\" class=\"btn btn-primary\">Done</a></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/related-achievements", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,view = locals_.view;buf.push("<div class=\"nano editor-nano-container\"><div class=\"nano-content\"><button" + (jade.attrs({ 'id':('new-achievement-button'), 'disabled':((me.isAdmin() === true || me.isArtisan() === true) ? undefined : "true"), 'data-i18n':("editor.new_achievement_title"), "class": [('btn'),('btn-primary')] }, {"disabled":true,"data-i18n":true})) + ">Create a New Achievement</button>");
if ( !view.achievements.models.length)
{
buf.push("<div class=\"panel\"><div class=\"panel-body\"><p data-i18n=\"editor.no_achievements\">No achievements added for this level yet.</p></div></div>");
}
else
{
buf.push("<table class=\"table table-hover\"><thead><tr><th></th><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th>XP</th></tr></thead><tbody>");
// iterate view.achievements.models
;(function(){
  var $$obj = view.achievements.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var achievement = $$obj[$index];

buf.push("<tr><td style=\"width: 20px\"><img" + (jade.attrs({ 'src':(achievement.getImageURL()), 'alt':("#{achievement.get('name') icon"), "class": [('achievement-icon-small')] }, {"src":true,"alt":true})) + "/></td><td><a" + (jade.attrs({ 'href':("/editor/achievement/" + (achievement.get('slug')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = achievement.get('name', true)) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = achievement.get('description', true)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = achievement.get('worth', true)) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var achievement = $$obj[$index];

buf.push("<tr><td style=\"width: 20px\"><img" + (jade.attrs({ 'src':(achievement.getImageURL()), 'alt':("#{achievement.get('name') icon"), "class": [('achievement-icon-small')] }, {"src":true,"alt":true})) + "/></td><td><a" + (jade.attrs({ 'href':("/editor/achievement/" + (achievement.get('slug')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = achievement.get('name', true)) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = achievement.get('description', true)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = achievement.get('worth', true)) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table>");
}
buf.push("</div></div>");;return buf.join("");
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

;require.register("templates/editor/level/save-level-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,level = locals_.level,levelNeedsSave = locals_.levelNeedsSave,modifiedComponents = locals_.modifiedComponents,modifiedSystems = locals_.modifiedSystems,me = locals_.me,_ = locals_._;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.isPatch)
{
buf.push("<h3 data-i18n=\"common.submit_patch\">Submit Patch</h3>");
}
else
{
buf.push("<h3 data-i18n=\"versions.save_version_title\">Save New Version</h3>");
}
buf.push("</div><div class=\"modal-body\"><h3><span data-i18n=\"resources.level\">Level</span><span>" + (jade.escape(null == (jade.interp = ": " + level.get('name') + " - ") ? "" : jade.interp)) + "</span>");
if ( levelNeedsSave)
{
buf.push("<span data-i18n=\"delta.modified\">Modified</span>");
}
else
{
buf.push("<span data-i18n=\"delta.not_modified\">Not Modified</span>");
}
buf.push("</h3>");
if ( levelNeedsSave)
{
buf.push("<div class=\"changes-stub\"></div><form id=\"save-level-form\" class=\"form-inline\"><div class=\"form-group commit-message\"><input id=\"level-commit-message\" name=\"commit-message\" type=\"text\" class=\"form-control\"/></div>");
if ( level.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input id=\"level-version-is-major\" name=\"version-is-major\" type=\"checkbox\"/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
if ( !level.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input id=\"level-publish\" name=\"publish\" type=\"checkbox\"/><span data-i18n=\"common.publish\">Publish</span></label></div>");
}
buf.push("</form>");
}
if ( modifiedComponents.length)
{
buf.push("<hr/>");
}
// iterate modifiedComponents
;(function(){
  var $$obj = modifiedComponents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

var id = component.get('_id')
buf.push("<h4><span data-i18n=\"resources.component\">Component</span><span>" + (jade.escape(null == (jade.interp = ": " + component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</span></h4><div class=\"changes-stub\"></div><form" + (jade.attrs({ 'id':("save-component-" + id + "-form"), "class": [('form-inline'),('component-form')] }, {"id":true})) + "><input" + (jade.attrs({ 'name':("component-original"), 'type':("hidden"), 'value':(component.get('original')) }, {"name":true,"type":true,"value":true})) + "/><input" + (jade.attrs({ 'name':("component-parent-major-version"), 'type':("hidden"), 'value':(component.get('version').major) }, {"name":true,"type":true,"value":true})) + "/><div class=\"form-group commit-message\"><input" + (jade.attrs({ 'id':(id + "-commit-message"), 'name':("commit-message"), 'type':("text"), "class": [('form-control')] }, {"id":true,"name":true,"type":true})) + "/></div>");
if ( component.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'id':(id + "-version-is-major"), 'name':("version-is-major"), 'type':("checkbox") }, {"id":true,"name":true,"type":true})) + "/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

var id = component.get('_id')
buf.push("<h4><span data-i18n=\"resources.component\">Component</span><span>" + (jade.escape(null == (jade.interp = ": " + component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</span></h4><div class=\"changes-stub\"></div><form" + (jade.attrs({ 'id':("save-component-" + id + "-form"), "class": [('form-inline'),('component-form')] }, {"id":true})) + "><input" + (jade.attrs({ 'name':("component-original"), 'type':("hidden"), 'value':(component.get('original')) }, {"name":true,"type":true,"value":true})) + "/><input" + (jade.attrs({ 'name':("component-parent-major-version"), 'type':("hidden"), 'value':(component.get('version').major) }, {"name":true,"type":true,"value":true})) + "/><div class=\"form-group commit-message\"><input" + (jade.attrs({ 'id':(id + "-commit-message"), 'name':("commit-message"), 'type':("text"), "class": [('form-control')] }, {"id":true,"name":true,"type":true})) + "/></div>");
if ( component.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'id':(id + "-version-is-major"), 'name':("version-is-major"), 'type':("checkbox") }, {"id":true,"name":true,"type":true})) + "/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
    }

  }
}).call(this);

if ( modifiedSystems.length)
{
buf.push("<hr/>");
}
// iterate modifiedSystems
;(function(){
  var $$obj = modifiedSystems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

var id = system.get('_id')
buf.push("<h4><span data-i18n=\"resources.system\">System</span><span>" + (jade.escape(null == (jade.interp = ": " + system.get('name')) ? "" : jade.interp)) + "</span></h4><div class=\"changes-stub\"></div><form" + (jade.attrs({ 'id':("save-system-" + id + "-form"), "class": [('form-inline'),('system-form')] }, {"id":true})) + "><input" + (jade.attrs({ 'name':("system-original"), 'type':("hidden"), 'value':(system.get('original')) }, {"name":true,"type":true,"value":true})) + "/><input" + (jade.attrs({ 'name':("system-parent-major-version"), 'type':("hidden"), 'value':(system.get('version').major) }, {"name":true,"type":true,"value":true})) + "/><div class=\"form-group commit-message\"><input" + (jade.attrs({ 'id':(id + "-commit-message"), 'name':("commit-message"), 'type':("text"), 'placeholder':("Commit Message"), "class": [('form-control')] }, {"id":true,"name":true,"type":true,"placeholder":true})) + "/></div>");
if ( system.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'id':(id + "-version-is-major"), 'name':("version-is-major"), 'type':("checkbox") }, {"id":true,"name":true,"type":true})) + "/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

var id = system.get('_id')
buf.push("<h4><span data-i18n=\"resources.system\">System</span><span>" + (jade.escape(null == (jade.interp = ": " + system.get('name')) ? "" : jade.interp)) + "</span></h4><div class=\"changes-stub\"></div><form" + (jade.attrs({ 'id':("save-system-" + id + "-form"), "class": [('form-inline'),('system-form')] }, {"id":true})) + "><input" + (jade.attrs({ 'name':("system-original"), 'type':("hidden"), 'value':(system.get('original')) }, {"name":true,"type":true,"value":true})) + "/><input" + (jade.attrs({ 'name':("system-parent-major-version"), 'type':("hidden"), 'value':(system.get('version').major) }, {"name":true,"type":true,"value":true})) + "/><div class=\"form-group commit-message\"><input" + (jade.attrs({ 'id':(id + "-commit-message"), 'name':("commit-message"), 'type':("text"), 'placeholder':("Commit Message"), "class": [('form-control')] }, {"id":true,"name":true,"type":true,"placeholder":true})) + "/></div>");
if ( system.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'id':(id + "-version-is-major"), 'name':("version-is-major"), 'type':("checkbox") }, {"id":true,"name":true,"type":true})) + "/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
    }

  }
}).call(this);

if ( me.isAdmin())
{
buf.push("<div id=\"verifier-stub\"><h3>Verifying...</h3><div id=\"verifier-tests\">");
// iterate ['waiting', 'running', 'problems', 'failed', 'passedExceptFrames', 'passed']
;(function(){
  var $$obj = ['waiting', 'running', 'problems', 'failed', 'passedExceptFrames', 'passed'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var state = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'style':(view[state] ? "font-weight: bold" : "") }, {"style":true})) + "> " + (jade.escape((jade.interp = _.string.humanize(state)) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = view[state]) == null ? '' : jade.interp)) + " |</span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var state = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'style':(view[state] ? "font-weight: bold" : "") }, {"style":true})) + "> " + (jade.escape((jade.interp = _.string.humanize(state)) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = view[state]) == null ? '' : jade.interp)) + " |</span>");
    }

  }
}).call(this);

buf.push("<span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/editor/verifier/" + (level.get('slug')) + "?dev=true"), 'target':("_blank") }, {"href":true,"target":true})) + ">Details</a></div></div>");
}
buf.push("<div id=\"errors-wrapper\" class=\"alert alert-danger hide\"><strong>Validation Error! Save failed.</strong><p class=\"errors\"></p></div></div><div class=\"modal-body wait secret\">");
if ( view.hasChanges)
{
if ( view.isPatch)
{
buf.push("<h3 data-i18n=\"versions.submitting_patch\">Submitting Patch...</h3>");
}
else
{
buf.push("<h3 data-i18n=\"common.saving\">Saving...</h3>");
}
}
buf.push("<div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\">");
if ( view.hasChanges)
{
buf.push("<div id=\"accept-cla-wrapper\" class=\"alert alert-info\"><span data-i18n=\"versions.cla_prefix\" class=\"spr\">To save changes, first you must agree to our</span><strong id=\"cla-link\" data-i18n=\"versions.cla_url\">CLA</strong><span data-i18n=\"versions.cla_suffix\"></span><button id=\"agreement-button\" data-i18n=\"versions.cla_agree\" class=\"btn btn-sm\">I AGREE</button></div>");
if ( view.isPatch)
{
buf.push("<div data-i18n=\"versions.owner_approve\" class=\"alert alert-info\">An owner will need to approve it before your changes will become visible.</div>");
}
buf.push("<div class=\"save-error-area\">");
if ( view.savingPatchError)
{
buf.push("<div class=\"alert alert-danger\">Unable to save patch: " + (jade.escape((jade.interp = view.savingPatchError) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div>");
}
buf.push("<div class=\"buttons\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button>");
if ( view.hasChanges && !view.isPatch)
{
buf.push("<button id=\"save-version-button\" data-i18n=\"common.save\" class=\"btn btn-primary\">Save</button>");
}
if ( view.hasChanges && view.isPatch)
{
buf.push("<button id=\"submit-patch-button\" data-i18n=\"common.submit_patch\" class=\"btn btn-primary\">Submit Patch</button>");
}
buf.push("</div></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/scripts_tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<button type=\"button\" data-toggle=\"collapse\" data-target=\"#scripts-treema\" class=\"navbar-toggle toggle btn-primary\"><span class=\"icon-list\"></span></button><div class=\"editor-nano-container nano\"><div id=\"scripts-treema\" class=\"nano-content\"></div></div><div class=\"editor-nano-container nano\"><div id=\"script-treema\" class=\"nano-content\"></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/settings_tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"editor-nano-container nano\"><div id=\"settings-treema\" class=\"nano-content\"></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/system/add", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.add_system_title\">Add Systems to Level</h3></div><div class=\"modal-body\"><ul class=\"available-systems-list\"></ul></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"editor.done_adding\" class=\"btn btn-primary\">Done Adding</button></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/system/available_system", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),system = locals_.system;buf.push("<li" + (jade.attrs({ 'title':("" + (system.description) + ""), 'data-system-id':("" + (system._id) + "") }, {"title":true,"data-system-id":true})) + "><a class=\"system-name\"><strong>" + (jade.escape((jade.interp = system.name) == null ? '' : jade.interp)) + "</strong></a></li>");;return buf.join("");
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

;require.register("templates/editor/level/system/level-system-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,view = locals_.view;buf.push("<nav role=\"navigation\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#system-code\" data-toggle=\"tab\" data-i18n=\"general.code\" id=\"system-code-tab\">Code</a></li><li><a href=\"#system-config-schema\" data-toggle=\"tab\" data-i18n=\"editor.level_component_config_schema\" id=\"system-config-schema-tab\">Config Schema</a></li><li><a href=\"#system-settings\" data-toggle=\"tab\" data-i18n=\"play.settings\" id=\"system-settings-tab\">Settings</a></li><li><a href=\"#system-patches\" data-toggle=\"tab\" data-i18n=\"resources.patches\" id=\"system-patches-tab\">Patches</a></li></ul><ul class=\"nav navbar-nav navbar-right\">");
if ( !me.isAdmin() && !me.isArtisan())
{
buf.push("<li id=\"patch-system-button\"><a data-i18n=\"[title]common.submit_patch\"><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li><a id=\"system-watch-button\"><span class=\"watch\"><span class=\"glyphicon glyphicon-eye-open\"></span><span data-i18n=\"common.watch\" class=\"spl\">Watch</span></span><span class=\"unwatch secret\"><span class=\"glyphicon glyphicon-eye-close\"></span><span data-i18n=\"common.unwatch\" class=\"spl\">Unwatch</span></span></a></li>");
if ( me.isAdmin())
{
buf.push("<li id=\"create-new-system\"><a data-i18n=\"editor.level_system_btn_new\">Create New System</a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"system-history-button\"><a data-i18n=\"general.version_history\">Version History</a></li></ul></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape(null == (jade.interp = view.levelSystem.get('name')) ? "" : jade.interp)) + "</span></div></nav><div class=\"tab-content\"><div id=\"system-code\" class=\"tab-pane active\"><div id=\"system-code-editor\"></div></div><div id=\"system-config-schema\" class=\"tab-pane\"><div id=\"config-schema-treema\"></div></div><div id=\"system-settings\" class=\"tab-pane\"><div id=\"edit-system-treema\"></div></div><div id=\"system-patches\" class=\"tab-pane\"><div class=\"patches-view\"></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/system/new", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.create_system_title\">Create New System</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"level-system-name\" data-i18n=\"general.name\" class=\"control-label\">Name</label><input id=\"level-system-name\" name=\"name\" type=\"text\" class=\"form-control\"/></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button data-i18n=\"common.create\" id=\"new-level-system-submit\" class=\"btn btn-primary\">Create</button></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/level/system/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),systems = locals_.systems;buf.push("<table class=\"table systems-table\"><tr><th colspan=\"3\">Results: " + (jade.escape((jade.interp = systems.length) == null ? '' : jade.interp)) + "</th></tr><tr><th>Name</th><th>Description</th><th>Version</th><th></th></tr>");
// iterate systems
;(function(){
  var $$obj = systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<tr><td class=\"body-row\">" + (jade.escape((jade.interp = system.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = system.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = system.version.minor) == null ? '' : jade.interp)) + "</td><td><i" + (jade.attrs({ 'data-name':(system.name), "class": [('icon-pencil'),('edit-system-button')] }, {"data-name":true})) + "></i></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<tr><td class=\"body-row\">" + (jade.escape((jade.interp = system.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = system.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = system.version.minor) == null ? '' : jade.interp)) + "</td><td><i" + (jade.attrs({ 'data-name':(system.name), "class": [('icon-pencil'),('edit-system-button')] }, {"data-name":true})) + "></i></td></tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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

;require.register("templates/editor/level/systems-tab-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me;buf.push("<div class=\"systems-container\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#systems-treema\" class=\"navbar-toggle toggle btn-primary\"><span class=\"icon-list\"></span></button><h3 data-i18n=\"editor.level_systems_tab_title\">Current Systems</h3><div class=\"editor-nano-container nano\"><div id=\"systems-treema\" class=\"nano-content\"></div></div></div><div class=\"edit-system-container\">");
if ( me.isAdmin())
{
buf.push("<button id=\"create-new-system-button\" class=\"btn btn-primary\"><span class=\"icon-file\"></span><span data-i18n=\"editor.level_systems_btn_new\" class=\"text\">Create New System</span></button>");
}
buf.push("<div id=\"level-system-edit-view\"></div></div><button id=\"add-system-button\" class=\"btn btn-primary\"><span class=\"icon-plus\"></span><span data-i18n=\"editor.level_systems_btn_add\" class=\"text\">Add System</span></button>");;return buf.join("");
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

;require.register("templates/editor/level/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents,me = locals_.me,page = locals_.page;buf.push("<table class=\"table\"><tr><th colspan=\"4\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th data-i18n=\"general.version\">Version</th><th data-i18n=\"common.watch\">Watch</th></tr>");
// iterate documents
;(function(){
  var $$obj = documents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var document = $$obj[$index];

var data = document.attributes;
buf.push("<tr" + (jade.attrs({ "class": [(document.get('creator') == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(data.name), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(data.description), "class": [('description-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = data.version.minor) == null ? '' : jade.interp)) + "</td>");
if ( document.watching())
{
buf.push("<td class=\"watch-row watching\"><span aria-hidden=\"true\" class=\"glyphicon glyphicon-eye-open\"></span><span data-i18n=\"common.watch\" class=\"sr-only\">Watch</span></td>");
}
else
{
buf.push("<td class=\"watch-row not-watching\"><span aria-hidden=\"true\" class=\"glyphicon glyphicon-eye-close\"></span><span data-i18n=\"common.unwatch\" class=\"sr-only\">Unwatch</span></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var document = $$obj[$index];

var data = document.attributes;
buf.push("<tr" + (jade.attrs({ "class": [(document.get('creator') == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(data.name), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(data.description), "class": [('description-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = data.version.minor) == null ? '' : jade.interp)) + "</td>");
if ( document.watching())
{
buf.push("<td class=\"watch-row watching\"><span aria-hidden=\"true\" class=\"glyphicon glyphicon-eye-open\"></span><span data-i18n=\"common.watch\" class=\"sr-only\">Watch</span></td>");
}
else
{
buf.push("<td class=\"watch-row not-watching\"><span aria-hidden=\"true\" class=\"glyphicon glyphicon-eye-close\"></span><span data-i18n=\"common.unwatch\" class=\"sr-only\">Unwatch</span></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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

;require.register("templates/editor/level/tasks-tab", function(exports, require, module) {
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

;require.register("templates/editor/level/thang/available_component", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),component = locals_.component;buf.push("<li" + (jade.attrs({ 'title':("" + (component.description) + ""), 'data-component-id':("" + (component._id) + "") }, {"title":true,"data-component-id":true})) + "><strong class=\"component-system\">" + (jade.escape((jade.interp = component.system) == null ? '' : jade.interp)) + ": </strong><a class=\"component-name\">" + (jade.escape((jade.interp = component.name) == null ? '' : jade.interp)) + "</a></li>");;return buf.join("");
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

;require.register("templates/editor/level/thang/level-thang-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"well\"><a data-i18n=\"editor.level_components_title\" id=\"all-thangs-link\">Back To All Thangs</a><span id=\"thang-props\"><a id=\"thang-name-link\"><span>" + (jade.escape(null == (jade.interp = view.thangData.id) ? "" : jade.interp)) + "</span><input" + (jade.attrs({ 'value':(view.thangData.id), "class": [('secret')] }, {"value":true})) + "/></a> ( <span data-i18n=\"editor.level_components_type\">Type</span>: <a id=\"thang-type-link\"><span>" + (jade.escape(null == (jade.interp = view.thangData.thangType) ? "" : jade.interp)) + "</span><input" + (jade.attrs({ 'value':(view.thangData.thangType), "class": [('secret')] }, {"value":true})) + "/></a> ) </span></div><div id=\"thang-components-edit-view\"></div>");;return buf.join("");
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

;require.register("templates/editor/level/thangs-tab-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<button id=\"thangs-container-toggle\" class=\"btn\"><span class=\"icon-list\"></span></button><button id=\"thangs-palette-toggle\" class=\"btn\"><span class=\"icon-plus\"></span></button><div id=\"all-thangs\" class=\"thangs-container hide\"><h3 data-i18n=\"editor.level_tab_thangs_title\">Current Thangs</h3><div id=\"thangs-treema\" data-i18n=\"[title]editor.config_thang\" title=\"Double click to configure a thang\"></div></div><div class=\"world-container\"><div id=\"canvas-wrapper\"><button data-toggle=\"coco-modal\" data-target=\"editor/level/modals/GenerateTerrainModal\" data-i18n=\"editor.generate_terrain\" class=\"generate-terrain-button btn btn-info btn-lg\">Generate Terrain</button><ul id=\"contextmenu\" class=\"dropdown-menu\"><li id=\"delete\"><a data-i18n=\"editor.delete\">Delete</a></li><li id=\"duplicate\"><a data-i18n=\"editor.duplicate\">Duplicate</a></li><li class=\"divider\"></li><li id=\"rotation-menu-item\" class=\"dropdown-header\"><span data-i18n=\"editor.rotate\" class=\"spr\">Rotate</span><button data-rotation=\"-0.5\" class=\"btn btn-xs spr\"><span class=\"glyphicon glyphicon-arrow-up\"></span></button><button data-rotation=\"1\" class=\"btn btn-xs spr\"><span class=\"glyphicon glyphicon-arrow-left\"></span></button><button data-rotation=\"0\" class=\"btn btn-xs spr\"><span class=\"glyphicon glyphicon-arrow-right\"></span></button><button data-rotation=\"0.5\" class=\"btn btn-xs\"><span class=\"glyphicon glyphicon-arrow-down\"></span></button></li></ul><canvas width=\"924\" height=\"589\" id=\"webgl-surface\"></canvas><canvas width=\"924\" height=\"589\" id=\"normal-surface\"></canvas><div id=\"canvas-left-gradient\" class=\"gradient\"></div><div id=\"canvas-top-gradient\" class=\"gradient\"></div></div></div><div id=\"add-thangs-view\"></div><div id=\"level-thang-edit-view\" class=\"secret\"></div>");;return buf.join("");
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

;require.register("templates/editor/modal/new-model-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3" + (jade.attrs({ 'data-i18n':("" + (view.newModelTitle) + "") }, {"data-i18n":true})) + ">Create New " + (jade.escape((jade.interp = view.modelLabel) == null ? '' : jade.interp)) + "</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"name\" data-i18n=\"general.name\" class=\"control-label\">Name</label><input id=\"name\" name=\"name\" type=\"text\" class=\"form-control\"/></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button data-i18n=\"common.create\" class=\"btn btn-primary new-model-submit\">Create</button></div><div class=\"modal-body wait secret\"><h3 data-i18n=\"play_level.tip_reticulating\">Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/modal/save-version-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.isPatch)
{
buf.push("<h3 data-i18n=\"common.submit_patch\">Submit Patch</h3>");
}
else
{
buf.push("<h3 data-i18n=\"versions.save_version_title\">Save New Version</h3>");
}
buf.push("</div><div class=\"modal-body\">");
if ( view.hasChanges)
{
buf.push("<div class=\"changes-stub\"></div><form class=\"form-inline\"><div class=\"form-group commit-message\"><input id=\"commit-message\" name=\"commitMessage\" type=\"text\" class=\"form-control\"/></div>");
if ( !view.isPatch && !view.options.noNewMajorVersions)
{
buf.push("<div class=\"checkbox\"><label><input id=\"major-version\" name=\"version-is-major\" type=\"checkbox\"/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
}
else
{
buf.push("<div data-i18n=\"delta.no_changes\" class=\"alert alert-danger\">No changes</div>");
}
buf.push("</div><div class=\"modal-body wait secret\">");
if ( view.hasChanges)
{
if ( view.isPatch)
{
buf.push("<h3 data-i18n=\"versions.submitting_patch\">Submitting Patch...</h3>");
}
else
{
buf.push("<h3 data-i18n=\"common.saving\">Saving...</h3>");
}
}
buf.push("<div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\">");
if ( view.hasChanges)
{
buf.push("<div id=\"accept-cla-wrapper\" class=\"alert alert-info\"><span data-i18n=\"versions.cla_prefix\" class=\"spr\">To save changes, first you must agree to our</span><strong id=\"cla-link\" data-i18n=\"versions.cla_url\">CLA</strong><span data-i18n=\"versions.cla_suffix\"></span><button id=\"agreement-button\" data-i18n=\"versions.cla_agree\" class=\"btn btn-sm\">I AGREE</button></div>");
if ( view.isPatch)
{
buf.push("<div data-i18n=\"versions.owner_approve\" class=\"alert alert-info\">An owner will need to approve it before your changes will become visible.</div>");
}
buf.push("<div class=\"save-error-area\">");
if ( view.savingPatchError)
{
buf.push("<div class=\"alert alert-danger\">Unable to save patch: " + (jade.escape((jade.interp = view.savingPatchError) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div>");
}
buf.push("<div class=\"buttons\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button>");
if ( view.hasChanges && !view.isPatch)
{
buf.push("<button id=\"save-version-button\" data-i18n=\"common.save\" class=\"btn btn-primary\">Save</button>");
}
if ( view.hasChanges && view.isPatch)
{
buf.push("<button id=\"submit-patch-button\" data-i18n=\"common.submit_patch\" class=\"btn btn-primary\">Submit Patch</button>");
}
buf.push("</div></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/modal/versions-modal", function(exports, require, module) {
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

;require.register("templates/editor/patch_modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,patch = locals_.patch,deltaWorked = locals_.deltaWorked,isPatchCreator = locals_.isPatchCreator,status = locals_.status,isPatchRecipient = locals_.isPatchRecipient;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"modal-header-content\"><h3 data-i18n=\"resources.patch\"></h3></div></div><div class=\"modal-body\"><div class=\"modal-body\"><p>" + (jade.escape(null == (jade.interp = patch.get('commitMessage')) ? "" : jade.interp)) + "</p>");
if ( deltaWorked)
{
buf.push("<div class=\"changes-stub\"></div>");
}
else
{
buf.push("<div class=\"alert alert-danger\">Could not apply this delta to the current version.</div>");
}
buf.push("</div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\"></button>");
if ( isPatchCreator)
{
if ( status != 'withdrawn')
{
buf.push("<button id=\"withdraw-button\" data-i18n=\"general.withdraw\" class=\"btn btn-danger\"></button>");
}
}
if ( isPatchRecipient)
{
if ( status != 'accepted')
{
buf.push("<button id=\"accept-button\" data-i18n=\"general.accept\" class=\"btn btn-primary\"></button>");
}
if ( status != 'rejected')
{
buf.push("<button id=\"reject-button\" data-i18n=\"general.reject\" class=\"btn btn-danger\"></button>");
}
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

;require.register("templates/editor/patches", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),patches = locals_.patches,moment = locals_.moment;buf.push("<div data-toggle=\"buttons\" class=\"btn-group status-buttons\"><label class=\"btn btn-default pending\"><input type=\"radio\" name=\"status\" value=\"pending\"/><span data-i18n=\"general.pending\">Pending</span></label><label class=\"btn btn-default accepted\"><input type=\"radio\" name=\"status\" value=\"accepted\"/><span data-i18n=\"general.accepted\">Accepted</span></label><label class=\"btn btn-default rejected\"><input type=\"radio\" name=\"status\" value=\"rejected\"/><span data-i18n=\"general.rejected\">Rejected</span></label><label class=\"btn btn-default withdrawn\"><input type=\"radio\" name=\"status\" value=\"withdrawn\"/><span data-i18n=\"general.withdrawn\">Withdrawn</span></label></div>");
if ( patches.loading)
{
buf.push("<p data-i18n=\"common.loading\">Loading...</p>");
}
else
{
buf.push("<table class=\"table table-condensed table-bordered\"><tr><th data-i18n=\"general.submitter\">Submitter</th><th data-i18n=\"general.submitted\">Submitted</th><th data-i18n=\"general.commit_msg\">Commit Message</th></tr>");
// iterate patches
;(function(){
  var $$obj = patches;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var patch = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('patch-row')] }, {"data-patch-id":true})) + "><td>" + (jade.escape(null == (jade.interp = patch.userName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment(patch.get('created')).format('llll')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = patch.get('commitMessage')) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var patch = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('patch-row')] }, {"data-patch-id":true})) + "><td>" + (jade.escape(null == (jade.interp = patch.userName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment(patch.get('created')).format('llll')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = patch.get('commitMessage')) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
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

;require.register("templates/editor/poll/poll-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
var authorized = me.isAdmin();
if ( authorized)
{
buf.push("<ol class=\"breadcrumb\"><li><a href=\"/editor\" data-i18n=\"editor.main_title\">CodeCombat Editors</a></li><li><a href=\"/editor/poll\" data-i18n=\"editor.poll_title\">Poll Editor</a></li><li class=\"active\">" + (jade.escape((jade.interp = view.poll.attributes.name) == null ? '' : jade.interp)) + "</li></ol><button" + (jade.attrs({ 'data-i18n':("common.delete"), 'disabled':(!me.isAdmin()), 'id':('delete-button'), "class": [('poll-tool-button'),('btn'),('btn-primary')] }, {"data-i18n":true,"disabled":true})) + ">Delete</button><button" + (jade.attrs({ 'data-i18n':("common.save"), 'disabled':(!me.isAdmin()), 'id':('save-button'), "class": [('poll-tool-button'),('btn'),('btn-primary')] }, {"data-i18n":true,"disabled":true})) + ">Save</button><h3 data-i18n=\"poll.edit_poll_title\">Edit Poll<span>: \"" + (jade.escape((jade.interp = view.poll.attributes.name) == null ? '' : jade.interp)) + "\"</span></h3><div id=\"poll-treema\"></div><div id=\"poll-view\" class=\"clearfix\"></div><h3 data-i18n=\"resources.patches\">Patches</h3><div class=\"patches-view\"></div><hr/>");
}
else
{
buf.push("<div class=\"alert alert-danger\"><span>Admin only. Turn around.</span></div>");
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

;require.register("templates/editor/poll/poll-search-table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents,moment = locals_.moment;buf.push("<table class=\"table\"><tr><th colspan=\"3\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th data-i18n=\"polls.priority\">Priority</th><th data-i18n=\"general.date\">Date</th></tr>");
// iterate documents
;(function(){
  var $$obj = documents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var data = $$obj[$index];

data = data.attributes;
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/editor/poll/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = data.description) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = data.priority) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment(data.created).fromNow()) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var data = $$obj[$index];

data = data.attributes;
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/editor/poll/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = data.description) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = data.priority) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment(data.created).fromNow()) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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

;require.register("templates/editor/thang/colors_tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div id=\"color-groups-treema\"></div><div id=\"color-group-settings\" class=\"secret\"><div id=\"shape-buttons\"></div><canvas id=\"tinting-display\" width=\"400\" height=\"400\"></canvas><div id=\"controls\"><div class=\"slider-cell\">Hue:<span class=\"hue-label\"></span><div id=\"hue-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Saturation:<span class=\"saturation-label\"></span><div id=\"saturation-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Lightness:<span class=\"lightness-label\"></span><div id=\"lightness-slider\" class=\"selector\"></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/thang/export-thang-type-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,_ = locals_._;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h4 class=\"modal-title\">Export " + (jade.escape((jade.interp = view.thangType.get('name')) == null ? '' : jade.interp)) + " SpriteSheet</h4></div><div class=\"modal-body\"><div class=\"form-horizontal\"><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Team Color</label><div class=\"col-sm-9\"><select id=\"color-config-select\" class=\"form-control\"><option value=\"\">None</option><option value=\"red\">Red</option><option value=\"blue\">Blue</option><option value=\"green\">Green</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Resolution Factor</label><div class=\"col-sm-9\"><input id=\"resolution-input\" value=\"3\" class=\"form-control\"/></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Sprite Type</label><div class=\"col-sm-9\">");
var spriteType = view.thangType.get('spriteType') || 'segmented'
buf.push("<label class=\"radio-inline\"><input" + (jade.attrs({ 'type':("radio"), 'name':("sprite-type"), 'value':("segmented"), 'checked':(spriteType==='segmented') }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Segmented</label><label class=\"radio-inline\"><input" + (jade.attrs({ 'type':("radio"), 'name':("sprite-type"), 'value':("singular"), 'checked':(spriteType!=='segmented') }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Singular</label></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Actions</label><div class=\"col-sm-9\">");
var defaultActionNames = _.pluck(view.thangType.getDefaultActions(), 'name')
var actions = view.thangType.getActions()
// iterate actions
;(function(){
  var $$obj = actions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var action = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("action"), 'value':(action.name), 'checked':(_.contains(defaultActionNames, action.name)) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>" + (jade.escape((jade.interp = action.name) == null ? '' : jade.interp)) + "</label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var action = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("action"), 'value':(action.name), 'checked':(_.contains(defaultActionNames, action.name)) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>" + (jade.escape((jade.interp = action.name) == null ? '' : jade.interp)) + "</label></div>");
    }

  }
}).call(this);

buf.push("</div></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" class=\"btn btn-default\">Cancel</button><button id=\"save-btn\" class=\"btn btn-primary\">Save</button><div class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/thang/sprite_parser_test", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
;return buf.join("");
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

;require.register("templates/editor/thang/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents;buf.push("<table class=\"table\"><tr><th colspan=\"4\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th id=\"portrait-col\"></th><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th data-i18n=\"general.version\">Version</th><th data-i18n=\"editor.tasks\">Tasks</th></tr>");
// iterate documents 
;(function(){
  var $$obj = documents ;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var thang = $$obj[$index];

buf.push("<tr><td>");
var name = thang.get('name');
buf.push("<img" + (jade.attrs({ 'title':("Add " + (name) + ""), 'src':(thang.getPortraitURL()), 'alt':(""), "class": [('portrait')] }, {"title":true,"src":true,"alt":true})) + "/></td><td" + (jade.attrs({ 'title':(name), "class": [('small-name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/thang/" + (thang.get('slug') || thang.id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = name) == null ? '' : jade.interp)) + "</a></td>");
var description = thang.get('description');
buf.push("<td" + (jade.attrs({ 'title':(description), "class": [('body-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = description) == null ? '' : jade.interp)) + "</td>");
var version = thang.get('version')
buf.push("<td>" + (jade.escape((jade.interp = version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = version.minor) == null ? '' : jade.interp)) + "</td>");
var tasks = thang.get('tasks');
if ( tasks && tasks.length)
{
var completed = tasks.filter(function(t) { return t.complete; });
buf.push("<td>" + (jade.escape((jade.interp = completed.length) == null ? '' : jade.interp)) + "/" + (jade.escape((jade.interp = tasks.length) == null ? '' : jade.interp)) + "</td>");
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
      $$l++;      var thang = $$obj[$index];

buf.push("<tr><td>");
var name = thang.get('name');
buf.push("<img" + (jade.attrs({ 'title':("Add " + (name) + ""), 'src':(thang.getPortraitURL()), 'alt':(""), "class": [('portrait')] }, {"title":true,"src":true,"alt":true})) + "/></td><td" + (jade.attrs({ 'title':(name), "class": [('small-name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/thang/" + (thang.get('slug') || thang.id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = name) == null ? '' : jade.interp)) + "</a></td>");
var description = thang.get('description');
buf.push("<td" + (jade.attrs({ 'title':(description), "class": [('body-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = description) == null ? '' : jade.interp)) + "</td>");
var version = thang.get('version')
buf.push("<td>" + (jade.escape((jade.interp = version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = version.minor) == null ? '' : jade.interp)) + "</td>");
var tasks = thang.get('tasks');
if ( tasks && tasks.length)
{
var completed = tasks.filter(function(t) { return t.complete; });
buf.push("<td>" + (jade.escape((jade.interp = completed.length) == null ? '' : jade.interp)) + "/" + (jade.escape((jade.interp = tasks.length) == null ? '' : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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

;require.register("templates/editor/thang/thang-type-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),thangType = locals_.thangType,recentlyPlayedLevels = locals_.recentlyPlayedLevels,authorized = locals_.authorized,me = locals_.me,fileSizeString = locals_.fileSizeString,animations = locals_.animations;if ( thangType.loading)
{
buf.push("<nav role=\"navigation\" id=\"thang-editor-top-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/thang\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" id=\"thang-editor-top-nav\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/thang\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#editor-thang-main-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.thang_main\">Main</a></li><li><a href=\"#editor-thang-components-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_components\">Components</a></li><li><a href=\"#editor-thang-spritesheets-view\" data-toggle=\"tab\" data-i18n=\"editor.thang_spritesheets\">Spritesheets</a></li><li><a href=\"#editor-thang-colors-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.thang_colors\" id=\"color-tab\">Colors</a></li><li><a href=\"#editor-thang-patches-view\" data-toggle=\"tab\" id=\"patches-tab\"><span data-i18n=\"resources.patches\" class=\"spr\">Patches</span>");
var patches = thangType.get('patches')
if ( patches && patches.length)
{
buf.push("<span class=\"badge\">" + (jade.escape(null == (jade.interp = patches.length) ? "" : jade.interp)) + "</span>");
}
buf.push("</a></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape((jade.interp = thangType.attributes.name) == null ? '' : jade.interp)) + "</span></div><ul class=\"nav navbar-nav navbar-right\"><li class=\"dropdown\"><a data-toggle=\"dropdown\" class=\"play-with-level-parent\"><span class=\"glyphicon-play glyphicon\"></span></a><ul class=\"dropdown-menu\"><li class=\"dropdown-header\">Play Which Level?</li><li>");
// iterate recentlyPlayedLevels
;(function(){
  var $$obj = recentlyPlayedLevels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-level':(level), "class": [('play-with-level-button')] }, {"data-level":true})) + ">" + (jade.escape(null == (jade.interp = level) ? "" : jade.interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-level':(level), "class": [('play-with-level-button')] }, {"data-level":true})) + ">" + (jade.escape(null == (jade.interp = level) ? "" : jade.interp)) + "</a>");
    }

  }
}).call(this);

buf.push("<input placeholder=\"Type in a level name\" class=\"play-with-level-input\"/></li></ul></li>");
if ( authorized)
{
buf.push("<li id=\"save-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li" + (jade.attrs({ "class": [(!me.isAdmin() && !me.isArtisan() ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"common.fork\" id=\"fork-start-button\">Fork</a></li><li" + (jade.attrs({ "class": [(!authorized ? "disabled": "")] }, {"class":true})) + "><a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("modal/RevertModal"), 'data-i18n':("editor.revert"), 'disabled':(!authorized), 'id':('revert-button') }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Revert</a></li><li" + (jade.attrs({ "class": [(!authorized ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"editor.pop_i18n\" id=\"pop-level-i18n-button\">Populate i18n</a></li><li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"history-button\"><a href=\"#\" data-i18n=\"general.version_history\">Version History</a></li><li class=\"divider\"></li><li data-i18n=\"common.help\" class=\"dropdown-header\">Help</li><li><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-Home\" data-i18n=\"editor.wiki\" target=\"_blank\">Wiki</a></li><li><a href=\"https://coco-slack-invite.herokuapp.com/\" data-i18n=\"editor.live_chat\" target=\"_blank\">Live Chat</a></li><li><a href=\"http://discourse.codecombat.com/category/artisan\" data-i18n=\"nav.forum\" target=\"_blank\">Forum</a></li>");
if ( !me.isStudent())
{
buf.push("<li><a data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("</ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content\"><div class=\"tab-content\"><div id=\"editor-thang-colors-tab-view\" class=\"tab-pane\"></div><div id=\"editor-thang-main-tab-view\" class=\"tab-pane active\"><div id=\"settings-col\" class=\"well\"><div class=\"row\"><div class=\"col-sm-3\"><img id=\"portrait\" class=\"img-thumbnail\"/></div><div class=\"col-sm-9\"><div class=\"file-controls\"><button" + (jade.attrs({ 'disabled':(authorized === true ? undefined : "true"), 'id':('upload-button'), "class": [('btn'),('btn-sm'),('btn-info')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-upload\"></span><span class=\"spl\">Upload Animation</span></button><button" + (jade.attrs({ 'disabled':(authorized === true ? undefined : "true"), 'id':('clear-button'), "class": [('btn'),('btn-sm'),('btn-danger')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-remove\"></span><span class=\"spl\">Clear Data</span></button><button" + (jade.attrs({ 'id':('set-vector-icon'), 'disabled':(authorized === true ? undefined : "true"), "class": [('btn'),('btn-sm')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-gbp\"></span><span class=\"spl\">Vector Icon Setup</span></button><button" + (jade.attrs({ 'id':('export-sprite-sheet-btn'), 'disabled':(authorized === true ? undefined : "true"), "class": [('btn'),('btn-sm')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-export\"></span><span class=\"spl\">Export SpriteSheet</span></button><input id=\"real-upload-button\" type=\"file\"/></div><div id=\"thang-type-file-size\">" + (jade.escape(null == (jade.interp = fileSizeString) ? "" : jade.interp)) + "</div></div></div><div id=\"thang-type-treema\"></div><div class=\"clearfix\"></div></div><div id=\"display-col\" class=\"well\"><canvas id=\"canvas\" width=\"400\" height=\"600\"></canvas><select id=\"animations-select\" class=\"form-control\">");
// iterate animations
;(function(){
  var $$obj = animations;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var animation = $$obj[$index];

buf.push("<option>" + (jade.escape((jade.interp = animation) == null ? '' : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var animation = $$obj[$index];

buf.push("<option>" + (jade.escape((jade.interp = animation) == null ? '' : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select><div><button id=\"marker-button\" class=\"btn btn-small btn-primary\"><i class=\"icon-map-marker\"></i><span class=\"spl\">Markers</span></button><button id=\"play-button\" class=\"btn btn-small btn-primary\"><i class=\"icon-play\"></i><span class=\"spl\">Play</span></button><button id=\"stop-button\" class=\"btn btn-small btn-primary\"><i class=\"icon-stop\"></i><span class=\"spl\">Stop</span></button></div><div class=\"slider-cell\">Rotation:<span class=\"rotation-label\"></span><div id=\"rotation-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Scale:<span class=\"scale-label\"></span><div id=\"scale-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Resolution:<span class=\"resolution-label\"> 4.0x</span><div id=\"resolution-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Health:<span class=\"health-label\"> 10hp</span><div id=\"health-slider\" class=\"selector\"></div></div></div></div><div id=\"editor-thang-components-tab-view\" class=\"tab-pane\"><div id=\"thang-components-edit-view\"></div></div><div id=\"editor-thang-spritesheets-view\" class=\"tab-pane\"><div id=\"spritesheets\"></div></div><div id=\"editor-thang-patches-view\" class=\"tab-pane\"><div class=\"patches-view\"></div></div></div><div class=\"clearfix\"></div></div>");;return buf.join("");
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

;require.register("templates/editor/thang/vector-icon-setup-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Choose Container for Vector Icon</h3></div><div class=\"modal-body\">");
if ( view.container)
{
buf.push("<form class=\"form\"><div class=\"form-group\"><select id=\"container-select\" class=\"form-control\">");
// iterate view.containers
;(function(){
  var $$obj = view.containers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var container = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(container), 'selected':(container === view.container) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = container) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var container = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(container), 'selected':(container === view.container) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = container) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></form><canvas" + (jade.attrs({ 'width':(view.demoSize), 'height':(view.demoSize), 'id':('resulting-icon') }, {"width":true,"height":true})) + "></canvas><div class=\"alert alert-info\">Arrow keys to move, Shift-Plus/Minus to scale.</div>");
}
else
{
buf.push("<div>forgetting something?</div>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"center\" class=\"btn pull-left btn-info\"><span class=\"glyphicon glyphicon-cutlery\"></span><span class=\"spl\">Center</span></button><button id=\"done-button\" class=\"btn btn-primary\">Done</button></div></div></div></div>");;return buf.join("");
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

;require.register("templates/editor/verifier/verifier-view", function(exports, require, module) {
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

;require.register("views/editor/DeltaView", function(exports, require, module) {
var CocoView, DeltaView, TEXTDIFF_OPTIONS, deltasLib, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/delta');

deltasLib = require('core/deltas');

require('vendor/diffview');

require('vendor/difflib');

require('vendor/treema');

TEXTDIFF_OPTIONS = {
  baseTextName: "Old",
  newTextName: "New",
  contextSize: 5,
  viewType: 1
};

module.exports = DeltaView = (function(superClass) {
  extend(DeltaView, superClass);


  /*
  Takes a CocoModel instance (model) and displays changes since the
  last save (attributes vs _revertAttributes).
  
  * If headModel is included, will look for and display conflicts with the changes in model.
  * If comparisonModel is included, will show deltas between model and comparisonModel instead
    of changes within model itself.
   */

  DeltaView.deltaCounter = 0;

  DeltaView.prototype.className = 'delta-view';

  DeltaView.prototype.template = template;

  function DeltaView(options) {
    var j, len, modelName, ref;
    DeltaView.__super__.constructor.call(this, options);
    this.expandedDeltas = [];
    this.skipPaths = options.skipPaths;
    ref = ['model', 'headModel', 'comparisonModel'];
    for (j = 0, len = ref.length; j < len; j++) {
      modelName = ref[j];
      this[modelName] = options[modelName];
      if (!(this[modelName] && options.loadModels)) {
        continue;
      }
      if (!this[modelName].isLoaded) {
        this[modelName] = this.supermodel.loadModel(this[modelName]).model;
      }
    }
    if (this.supermodel.finished()) {
      this.buildDeltas();
    }
  }

  DeltaView.prototype.onLoaded = function() {
    this.buildDeltas();
    return DeltaView.__super__.onLoaded.call(this);
  };

  DeltaView.prototype.buildDeltas = function() {
    var ref;
    if (this.comparisonModel) {
      this.expandedDeltas = this.model.getExpandedDeltaWith(this.comparisonModel);
      this.deltas = this.model.getDeltaWith(this.comparisonModel);
    } else {
      this.expandedDeltas = this.model.getExpandedDelta();
      this.deltas = this.model.getDelta();
    }
    ref = this.filterDeltas(this.expandedDeltas), this.expandedDeltas = ref[0], this.skippedDeltas = ref[1];
    if (this.headModel) {
      this.headDeltas = this.headModel.getExpandedDelta();
      this.headDeltas = this.filterDeltas(this.headDeltas)[0];
      return this.conflicts = deltasLib.getConflicts(this.headDeltas, this.expandedDeltas);
    }
  };

  DeltaView.prototype.filterDeltas = function(deltas) {
    var delta, i, j, k, l, len, len1, len2, newDeltas, path, ref, ref1, skip, skipPath, skippedDeltas;
    if (!this.skipPaths) {
      return [deltas, []];
    }
    ref = this.skipPaths;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      path = ref[i];
      if (_.isString(path)) {
        this.skipPaths[i] = [path];
      }
    }
    newDeltas = [];
    skippedDeltas = [];
    for (k = 0, len1 = deltas.length; k < len1; k++) {
      delta = deltas[k];
      skip = false;
      ref1 = this.skipPaths;
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        skipPath = ref1[l];
        if (_.isEqual(_.first(delta.dataPath, skipPath.length), skipPath)) {
          skip = true;
          break;
        }
      }
      if (skip) {
        skippedDeltas.push(delta);
      } else {
        newDeltas.push(delta);
      }
    }
    return [newDeltas, skippedDeltas];
  };

  DeltaView.prototype.afterRender = function() {
    var conflictDeltas, conflicts, delta, deltaData, deltaEl, deltas, expertView, i, j, k, len, len1, results;
    expertView = this.$el.find('.expert-view');
    if (expertView) {
      expertView.html(jsondiffpatch.formatters.html.format(this.deltas));
    }
    DeltaView.deltaCounter += this.expandedDeltas.length;
    deltas = this.$el.find('.details');
    for (i = j = 0, len = deltas.length; j < len; i = ++j) {
      delta = deltas[i];
      deltaEl = $(delta);
      deltaData = this.expandedDeltas[i];
      this.expandDetails(deltaEl, deltaData);
    }
    conflictDeltas = this.$el.find('.conflict-details');
    conflicts = (function() {
      var k, len1, ref, results;
      ref = this.expandedDeltas;
      results = [];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        delta = ref[k];
        if (delta.conflict) {
          results.push(delta.conflict);
        }
      }
      return results;
    }).call(this);
    results = [];
    for (i = k = 0, len1 = conflictDeltas.length; k < len1; i = ++k) {
      delta = conflictDeltas[i];
      deltaEl = $(delta);
      deltaData = conflicts[i];
      results.push(this.expandDetails(deltaEl, deltaData));
    }
    return results;
  };

  DeltaView.prototype.expandDetails = function(deltaEl, deltaData) {
    var args, el, error, error1, error2, left, leftEl, opcodes, options, right, rightEl, sm, treemaOptions;
    treemaOptions = {
      schema: deltaData.schema || {},
      readOnly: true
    };
    if (_.isObject(deltaData.left) && (leftEl = deltaEl.find('.old-value'))) {
      options = _.defaults({
        data: _.merge({}, deltaData.left)
      }, treemaOptions);
      try {
        TreemaNode.make(leftEl, options).build();
      } catch (error1) {
        error = error1;
        console.error("Couldn't show left details Treema for", deltaData.left, treemaOptions);
      }
    }
    if (_.isObject(deltaData.right) && (rightEl = deltaEl.find('.new-value'))) {
      options = _.defaults({
        data: _.merge({}, deltaData.right)
      }, treemaOptions);
      try {
        TreemaNode.make(rightEl, options).build();
      } catch (error2) {
        error = error2;
        console.error("Couldn't show right details Treema for", deltaData.right, treemaOptions);
      }
    }
    if (deltaData.action === 'text-diff') {
      if (!((deltaData.left != null) && (deltaData.right != null))) {
        return console.error("Couldn't show diff for left: " + deltaData.left + ", right: " + deltaData.right + " of delta:", deltaData);
      }
      left = difflib.stringAsLines(deltaData.left);
      right = difflib.stringAsLines(deltaData.right);
      sm = new difflib.SequenceMatcher(left, right);
      opcodes = sm.get_opcodes();
      el = deltaEl.find('.text-diff');
      options = {
        baseTextLines: left,
        newTextLines: right,
        opcodes: opcodes
      };
      args = _.defaults(options, TEXTDIFF_OPTIONS);
      return el.append(diffview.buildView(args));
    }
  };

  DeltaView.prototype.getApplicableDelta = function() {
    var delta;
    delta = this.model.getDelta();
    if (this.conflicts) {
      delta = deltasLib.pruneConflictsFromDelta(delta, this.conflicts);
    }
    if (this.skippedDeltas) {
      delta = deltasLib.pruneExpandedDeltasFromDelta(delta, this.skippedDeltas);
    }
    return delta;
  };

  return DeltaView;

})(CocoView);
});

;require.register("views/editor/ForkModal", function(exports, require, module) {
var ForkModal, ModalView, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/fork-modal');

forms = require('core/forms');

module.exports = ForkModal = (function(superClass) {
  extend(ForkModal, superClass);

  ForkModal.prototype.id = 'fork-modal';

  ForkModal.prototype.template = template;

  ForkModal.prototype.instant = false;

  ForkModal.prototype.events = {
    'click #fork-model-confirm-button': 'forkModel',
    'submit form': 'forkModel'
  };

  function ForkModal(options) {
    ForkModal.__super__.constructor.call(this, options);
    this.editorPath = options.editorPath;
    this.model = options.model;
    this.modelClass = this.model.constructor;
  }

  ForkModal.prototype.forkModel = function(e) {
    var newModel, newPathPrefix, res;
    e.preventDefault();
    this.showLoading();
    forms.clearFormAlerts(this.$el);
    newModel = new this.modelClass($.extend(true, {}, this.model.attributes));
    newModel.unset('_id');
    newModel.unset('version');
    newModel.unset('creator');
    newModel.unset('created');
    newModel.unset('original');
    newModel.unset('parent');
    newModel.unset('i18n');
    newModel.unset('i18nCoverage');
    newModel.set('commitMessage', "Forked from " + (this.model.get('name')));
    newModel.set('name', this.$el.find('#fork-model-name').val());
    if (this.model.schema().properties.permissions) {
      newModel.set('permissions', [
        {
          access: 'owner',
          target: me.id
        }
      ]);
    }
    newPathPrefix = "editor/" + this.editorPath + "/";
    res = newModel.save(null, {
      type: 'POST'
    });
    if (!res) {
      return;
    }
    res.error((function(_this) {
      return function() {
        _this.hideLoading();
        return forms.applyErrorsToForm(_this.$el.find('form'), JSON.parse(res.responseText));
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        _this.hide();
        return application.router.navigate(newPathPrefix + newModel.get('slug'), {
          trigger: true
        });
      };
    })(this));
  };

  return ForkModal;

})(ModalView);
});

;require.register("views/editor/PatchModal", function(exports, require, module) {
var DeltaView, ModalView, PatchModal, auth, deltasLib, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/patch_modal');

DeltaView = require('views/editor/DeltaView');

auth = require('core/auth');

deltasLib = require('core/deltas');

module.exports = PatchModal = (function(superClass) {
  extend(PatchModal, superClass);

  PatchModal.prototype.id = 'patch-modal';

  PatchModal.prototype.template = template;

  PatchModal.prototype.plain = true;

  PatchModal.prototype.modalWidthPercent = 60;

  PatchModal.prototype.instant = true;

  PatchModal.prototype.events = {
    'click #withdraw-button': 'withdrawPatch',
    'click #reject-button': 'rejectPatch',
    'click #accept-button': 'acceptPatch'
  };

  PatchModal.prototype.shortcuts = {
    'a, shift+a': 'acceptPatch',
    'r': 'rejectPatch'
  };

  function PatchModal(patch, targetModel, options) {
    var targetID;
    this.patch = patch;
    this.targetModel = targetModel;
    PatchModal.__super__.constructor.call(this, options);
    targetID = this.patch.get('target').id;
    if (targetID === this.targetModel.id) {
      this.originalSource = this.targetModel.clone(false);
    } else {
      this.originalSource = new this.targetModel.constructor({
        _id: targetID
      });
      this.supermodel.loadModel(this.originalSource);
    }
  }

  PatchModal.prototype.applyDelta = function() {
    this.headModel = null;
    if (this.targetModel.hasWriteAccess()) {
      this.headModel = this.originalSource.clone(false);
      this.headModel.markToRevert(true);
      this.headModel.set(this.targetModel.attributes);
      this.headModel.loaded = true;
    }
    this.pendingModel = this.originalSource.clone(false);
    this.pendingModel.markToRevert(true);
    this.deltaWorked = this.pendingModel.applyDelta(this.patch.get('delta'));
    return this.pendingModel.loaded = true;
  };

  PatchModal.prototype.render = function() {
    if (this.supermodel.finished()) {
      this.applyDelta();
    }
    return PatchModal.__super__.render.call(this);
  };

  PatchModal.prototype.getRenderData = function() {
    var c;
    c = PatchModal.__super__.getRenderData.call(this);
    c.isPatchCreator = this.patch.get('creator') === auth.me.id;
    c.isPatchRecipient = this.targetModel.hasWriteAccess();
    c.status = this.patch.get('status');
    c.patch = this.patch;
    c.deltaWorked = this.deltaWorked;
    return c;
  };

  PatchModal.prototype.afterRender = function() {
    var changeEl;
    if (!(this.supermodel.finished() && this.deltaWorked)) {
      return PatchModal.__super__.afterRender.call(this);
    }
    this.deltaView = new DeltaView({
      model: this.pendingModel,
      headModel: this.headModel,
      skipPaths: deltasLib.DOC_SKIP_PATHS
    });
    changeEl = this.$el.find('.changes-stub');
    this.insertSubView(this.deltaView, changeEl);
    return PatchModal.__super__.afterRender.call(this);
  };

  PatchModal.prototype.acceptPatch = function() {
    var delta;
    delta = this.deltaView.getApplicableDelta();
    this.targetModel.applyDelta(delta);
    this.targetModel.saveBackupNow();
    this.patch.setStatus('accepted');
    this.trigger('accepted-patch');
    return this.hide();
  };

  PatchModal.prototype.rejectPatch = function() {
    this.patch.setStatus('rejected');
    return this.hide();
  };

  PatchModal.prototype.withdrawPatch = function() {
    this.patch.setStatus('withdrawn');
    return this.hide();
  };

  return PatchModal;

})(ModalView);
});

;require.register("views/editor/PatchesView", function(exports, require, module) {
var CocoView, PatchModal, PatchesCollection, PatchesView, nameLoader, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/patches');

PatchesCollection = require('collections/PatchesCollection');

nameLoader = require('core/NameLoader');

PatchModal = require('./PatchModal');

module.exports = PatchesView = (function(superClass) {
  extend(PatchesView, superClass);

  PatchesView.prototype.template = template;

  PatchesView.prototype.className = 'patches-view';

  PatchesView.prototype.status = 'pending';

  PatchesView.prototype.events = {
    'change .status-buttons': 'onStatusButtonsChanged',
    'click .patch-row': 'openPatchModal'
  };

  function PatchesView(model, options) {
    this.model = model;
    PatchesView.__super__.constructor.call(this, options);
    this.initPatches();
  }

  PatchesView.prototype.initPatches = function() {
    this.startedLoading = false;
    return this.patches = this.model.fetchPatchesWithStatus();
  };

  PatchesView.prototype.load = function() {
    this.initPatches();
    this.patches = this.model.fetchPatchesWithStatus(this.status, {
      cache: false
    });
    this.supermodel.trackCollection(this.patches);
    return this.listenTo(this.patches, 'sync', this.onPatchesLoaded);
  };

  PatchesView.prototype.onPatchesLoaded = function() {
    var ids, jqxhrOptions, p;
    ids = (function() {
      var i, len, ref, results;
      ref = this.patches.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        results.push(p.get('creator'));
      }
      return results;
    }).call(this);
    jqxhrOptions = nameLoader.loadNames(ids);
    if (jqxhrOptions) {
      return this.supermodel.addRequestResource('user_names', jqxhrOptions).load();
    }
  };

  PatchesView.prototype.getRenderData = function() {
    var c, i, len, patch, ref;
    c = PatchesView.__super__.getRenderData.call(this);
    ref = this.patches.models;
    for (i = 0, len = ref.length; i < len; i++) {
      patch = ref[i];
      patch.userName = nameLoader.getName(patch.get('creator'));
    }
    c.patches = this.patches.models;
    c.status;
    return c;
  };

  PatchesView.prototype.afterRender = function() {
    this.$el.find("." + this.status).addClass('active');
    return PatchesView.__super__.afterRender.call(this);
  };

  PatchesView.prototype.onStatusButtonsChanged = function(e) {
    this.status = $(e.target).val();
    return this.reloadPatches();
  };

  PatchesView.prototype.reloadPatches = function() {
    this.supermodel.resetProgress();
    this.load();
    return this.render();
  };

  PatchesView.prototype.openPatchModal = function(e) {
    var modal, patch, row;
    row = $(e.target).closest('.patch-row');
    patch = _.find(this.patches.models, {
      id: row.data('patch-id')
    });
    modal = new PatchModal(patch, this.model);
    this.openModalView(modal);
    this.listenTo(modal, 'accepted-patch', function() {
      return this.trigger('accepted-patch');
    });
    return this.listenTo(modal, 'hide', function() {
      var f;
      f = (function(_this) {
        return function() {
          return _this.reloadPatches();
        };
      })(this);
      setTimeout(f, 400);
      return this.stopListening(modal);
    });
  };

  return PatchesView;

})(CocoView);
});

;require.register("views/editor/achievement/AchievementEditView", function(exports, require, module) {
var Achievement, AchievementEditView, AchievementPopup, ConfirmModal, Level, PatchesView, RootView, app, errors, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/editor/achievement/edit');

Achievement = require('models/Achievement');

Level = require('models/Level');

AchievementPopup = require('views/core/AchievementPopup');

ConfirmModal = require('views/core/ConfirmModal');

PatchesView = require('views/editor/PatchesView');

errors = require('core/errors');

app = require('core/application');

nodes = require('views/editor/level/treema_nodes');

require('game-libraries');

module.exports = AchievementEditView = (function(superClass) {
  extend(AchievementEditView, superClass);

  AchievementEditView.prototype.id = 'editor-achievement-edit-view';

  AchievementEditView.prototype.template = template;

  AchievementEditView.prototype.events = {
    'click #save-button': 'saveAchievement',
    'click #recalculate-button': 'confirmRecalculation',
    'click #recalculate-all-button': 'confirmAllRecalculation',
    'click #delete-button': 'confirmDeletion'
  };

  function AchievementEditView(options, achievementID) {
    this.achievementID = achievementID;
    this.deleteAchievement = bind(this.deleteAchievement, this);
    this.recalculateAchievement = bind(this.recalculateAchievement, this);
    this.pushChangesToPreview = bind(this.pushChangesToPreview, this);
    AchievementEditView.__super__.constructor.call(this, options);
    this.achievement = new Achievement({
      _id: this.achievementID
    });
    this.achievement.saveBackups = true;
    this.supermodel.trackRequest(this.achievement.fetch());
    this.listenToOnce(this.achievement, 'sync', function() {
      var i, len, level, levelOriginal, ref, ref1, ref2, results;
      ref2 = (ref = (ref1 = this.achievement.get('rewards')) != null ? ref1.levels : void 0) != null ? ref : [];
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        levelOriginal = ref2[i];
        level = new Level();
        this.supermodel.trackRequest(level.fetchLatestVersion(levelOriginal, {
          data: {
            project: 'name,version,original'
          }
        }));
        results.push(level.once('sync', (function(_this) {
          return function(level) {
            return _this.supermodel.registerModel(level);
          };
        })(this)));
      }
      return results;
    });
    this.pushChangesToPreview = _.throttle(this.pushChangesToPreview, 500);
  }

  AchievementEditView.prototype.onLoaded = function() {
    AchievementEditView.__super__.onLoaded.call(this);
    this.buildTreema();
    return this.listenTo(this.achievement, 'change', (function(_this) {
      return function() {
        _this.achievement.updateI18NCoverage();
        return _this.treema.set('/', _this.achievement.attributes);
      };
    })(this));
  };

  AchievementEditView.prototype.buildTreema = function() {
    var data, options, ref;
    if ((this.treema != null) || (!this.achievement.loaded)) {
      return;
    }
    data = $.extend(true, {}, this.achievement.attributes);
    options = {
      data: data,
      filePath: "db/achievement/" + (this.achievement.get('_id')),
      schema: Achievement.schema,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.pushChangesToPreview
      },
      nodeClasses: {
        'thang-type': nodes.ThangTypeNode,
        'item-thang-type': nodes.ItemThangTypeNode
      },
      supermodel: this.supermodel
    };
    this.treema = this.$el.find('#achievement-treema').treema(options);
    this.treema.build();
    if ((ref = this.treema.childrenTreemas.rewards) != null) {
      ref.open(3);
    }
    return this.pushChangesToPreview();
  };

  AchievementEditView.prototype.afterRender = function() {
    AchievementEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    this.pushChangesToPreview();
    this.patchesView = this.insertSubView(new PatchesView(this.achievement), this.$el.find('.patches-view'));
    return this.patchesView.load();
  };

  AchievementEditView.prototype.pushChangesToPreview = function() {
    var earned, key, popup, ref, value;
    if (!this.treema) {
      return;
    }
    this.$el.find('#achievement-view').empty();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.achievement.set(key, value);
    }
    earned = {
      get: (function(_this) {
        return function(key) {
          return {
            earnedPoints: _this.achievement.get('worth'),
            previouslyAchievedAmount: 0
          }[key];
        };
      })(this)
    };
    return popup = new AchievementPopup({
      achievement: this.achievement,
      earnedAchievement: earned,
      popup: false,
      container: $('#achievement-view')
    });
  };

  AchievementEditView.prototype.openSaveModal = function() {
    return 'Maybe later';
  };

  AchievementEditView.prototype.saveAchievement = function(e) {
    var key, ref, res, value;
    this.treema.endExistingEdits();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.achievement.set(key, value);
    }
    res = this.achievement.save();
    res.error((function(_this) {
      return function(collection, response, options) {
        return console.error(response);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        var url;
        if (window.achievementSavedCallback) {
          return window.achievementSavedCallback({
            achievement: _this.achievement
          });
        } else {
          url = "/editor/achievement/" + (_this.achievement.get('slug') || _this.achievement.id);
          return document.location.href = url;
        }
      };
    })(this));
  };

  AchievementEditView.prototype.confirmRecalculation = function(e, all) {
    var confirmModal, renderData;
    if (all == null) {
      all = false;
    }
    renderData = {
      title: 'Are you really sure?',
      body: "This will trigger recalculation of " + (all ? 'all achievements' : 'the achievement') + " for all users. Are you really sure you want to go down this path?",
      decline: 'Not really',
      confirm: 'Definitely'
    };
    confirmModal = new ConfirmModal(renderData);
    confirmModal.on('confirm', this.recalculateAchievement);
    this.recalculatingAll = all;
    return this.openModalView(confirmModal);
  };

  AchievementEditView.prototype.confirmAllRecalculation = function(e) {
    return this.confirmRecalculation(e, true);
  };

  AchievementEditView.prototype.confirmDeletion = function() {
    var confirmModal, renderData;
    renderData = {
      title: 'Are you really sure?',
      body: 'This will completely delete the achievement, potentially breaking a lot of stuff you don\'t want breaking. Are you entirely sure?',
      decline: 'Not really',
      confirm: 'Definitely'
    };
    confirmModal = new ConfirmModal(renderData);
    confirmModal.on('confirm', this.deleteAchievement);
    return this.openModalView(confirmModal);
  };

  AchievementEditView.prototype.recalculateAchievement = function() {
    var data;
    data = this.recalculatingAll ? {} : {
      achievements: [this.achievement.get('slug') || this.achievement.get('_id')]
    };
    return $.ajax({
      data: JSON.stringify(data),
      success: function(data, status, jqXHR) {
        return noty({
          timeout: 5000,
          text: 'Recalculation process started',
          type: 'success',
          layout: 'topCenter'
        });
      },
      error: function(jqXHR, status, error) {
        console.error(jqXHR);
        return noty({
          timeout: 5000,
          text: "Starting recalculation process failed with error code " + jqXHR.status,
          type: 'error',
          layout: 'topCenter'
        });
      },
      url: '/admin/earned.achievement/recalculate',
      type: 'POST',
      contentType: 'application/json'
    });
  };

  AchievementEditView.prototype.deleteAchievement = function() {
    console.debug('deleting');
    return $.ajax({
      type: 'DELETE',
      success: function() {
        noty({
          timeout: 5000,
          text: 'Aaaand it\'s gone.',
          type: 'success',
          layout: 'topCenter'
        });
        return _.delay(function() {
          return app.router.navigate('/editor/achievement', {
            trigger: true
          });
        }, 500);
      },
      error: function(jqXHR, status, error) {
        console.error(jqXHR);
        return {
          timeout: 5000,
          text: "Deleting achievement failed with error code " + jqXHR.status,
          type: 'error',
          layout: 'topCenter'
        };
      },
      url: "/db/achievement/" + this.achievement.id
    });
  };

  return AchievementEditView;

})(RootView);
});

;require.register("views/editor/achievement/AchievementSearchView", function(exports, require, module) {
var AchievementSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = AchievementSearchView = (function(superClass) {
  extend(AchievementSearchView, superClass);

  function AchievementSearchView() {
    return AchievementSearchView.__super__.constructor.apply(this, arguments);
  }

  AchievementSearchView.prototype.id = 'editor-achievement-home-view';

  AchievementSearchView.prototype.modelLabel = 'Achievement';

  AchievementSearchView.prototype.model = require('models/Achievement');

  AchievementSearchView.prototype.modelURL = '/db/achievement';

  AchievementSearchView.prototype.tableTemplate = require('templates/editor/achievement/table');

  AchievementSearchView.prototype.projection = ['name', 'description', 'collection', 'slug'];

  AchievementSearchView.prototype.getRenderData = function() {
    var context;
    context = AchievementSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.achievement_title';
    context.currentNew = 'editor.new_achievement_title';
    context.currentNewSignup = 'editor.new_achievement_title_login';
    context.currentSearch = 'editor.achievement_search_title';
    context.newModelsAdminOnly = true;
    if (!(me.isAdmin() || me.isArtisan())) {
      context.unauthorized = true;
    }
    return context;
  };

  return AchievementSearchView;

})(SearchView);
});

;require.register("views/editor/article/ArticleEditView", function(exports, require, module) {
var Article, ArticleEditView, PatchesView, RootView, SaveVersionModal, VersionHistoryView, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

VersionHistoryView = require('./ArticleVersionsModal');

template = require('templates/editor/article/edit');

Article = require('models/Article');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

PatchesView = require('views/editor/PatchesView');

require('views/modal/RevertModal');

require('vendor/treema');

require('game-libraries');

module.exports = ArticleEditView = (function(superClass) {
  extend(ArticleEditView, superClass);

  ArticleEditView.prototype.id = 'editor-article-edit-view';

  ArticleEditView.prototype.template = template;

  ArticleEditView.prototype.events = {
    'click #preview-button': 'openPreview',
    'click #history-button': 'showVersionHistory',
    'click #save-button': 'openSaveModal'
  };

  function ArticleEditView(options, articleID) {
    this.articleID = articleID;
    this.pushChangesToPreview = bind(this.pushChangesToPreview, this);
    ArticleEditView.__super__.constructor.call(this, options);
    this.article = new Article({
      _id: this.articleID
    });
    this.article.saveBackups = true;
    this.supermodel.loadModel(this.article);
    this.pushChangesToPreview = _.throttle(this.pushChangesToPreview, 500);
  }

  ArticleEditView.prototype.onLoaded = function() {
    ArticleEditView.__super__.onLoaded.call(this);
    this.buildTreema();
    return this.listenTo(this.article, 'change', (function(_this) {
      return function() {
        _this.article.updateI18NCoverage();
        return _this.treema.set('/', _this.article.attributes);
      };
    })(this));
  };

  ArticleEditView.prototype.buildTreema = function() {
    var data, options;
    if ((this.treema != null) || (!this.article.loaded)) {
      return;
    }
    if (!this.article.attributes.body) {
      this.article.set('body', '');
    }
    data = $.extend(true, {}, this.article.attributes);
    options = {
      data: data,
      filePath: "db/thang.type/" + (this.article.get('original')),
      schema: Article.schema,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.pushChangesToPreview
      }
    };
    this.treema = this.$el.find('#article-treema').treema(options);
    return this.treema.build();
  };

  ArticleEditView.prototype.pushChangesToPreview = function() {
    var b, id, key, m, onLoadHandler, ref, value;
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.article.set(key, value);
    }
    if (!(this.treema && this.preview)) {
      return;
    }
    m = marked(this.treema.data.body);
    b = $(this.preview.document.body);
    onLoadHandler = (function(_this) {
      return function() {
        if (b.find('#insert').length === 1) {
          b.find('#insert').html(m);
          b.find('#title').text(_this.treema.data.name);
          return clearInterval(id);
        }
      };
    })(this);
    return id = setInterval(onLoadHandler, 100);
  };

  ArticleEditView.prototype.afterRender = function() {
    ArticleEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    this.patchesView = this.insertSubView(new PatchesView(this.article), this.$el.find('.patches-view'));
    return this.patchesView.load();
  };

  ArticleEditView.prototype.openPreview = function() {
    if (!this.preview || this.preview.closed) {
      this.preview = window.open('/editor/article/preview', 'preview', 'height=800,width=600');
    }
    if (window.focus) {
      this.preview.focus();
    }
    this.preview.onload = (function(_this) {
      return function() {
        return _this.pushChangesToPreview();
      };
    })(this);
    return false;
  };

  ArticleEditView.prototype.openSaveModal = function() {
    var modal;
    modal = new SaveVersionModal({
      model: this.article,
      noNewMajorVersions: true
    });
    this.openModalView(modal);
    this.listenToOnce(modal, 'save-new-version', this.saveNewArticle);
    return this.listenToOnce(modal, 'hidden', function() {
      return this.stopListening(modal);
    });
  };

  ArticleEditView.prototype.saveNewArticle = function(e) {
    var key, modal, ref, res, value;
    this.treema.endExistingEdits();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.article.set(key, value);
    }
    this.article.set('commitMessage', e.commitMessage);
    res = this.article.saveNewMinorVersion();
    if (!res) {
      return;
    }
    modal = this.$el.find('#save-version-modal');
    this.enableModalInProgress(modal);
    res.error((function(_this) {
      return function() {
        return _this.disableModalInProgress(modal);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        var url;
        _this.article.clearBackup();
        modal.modal('hide');
        url = "/editor/article/" + (_this.article.get('slug') || _this.article.id);
        return document.location.href = url;
      };
    })(this));
  };

  ArticleEditView.prototype.showVersionHistory = function(e) {
    var versionHistoryView;
    versionHistoryView = new VersionHistoryView({
      article: this.article
    }, this.articleID);
    this.openModalView(versionHistoryView);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  return ArticleEditView;

})(RootView);
});

;require.register("views/editor/article/ArticlePreviewView", function(exports, require, module) {
var ArticlePreviewView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/editor/article/preview');

require('game-libraries');

module.exports = ArticlePreviewView = (function(superClass) {
  extend(ArticlePreviewView, superClass);

  function ArticlePreviewView() {
    return ArticlePreviewView.__super__.constructor.apply(this, arguments);
  }

  ArticlePreviewView.prototype.id = 'editor-article-preview-view';

  ArticlePreviewView.prototype.template = template;

  return ArticlePreviewView;

})(RootView);
});

;require.register("views/editor/article/ArticleSearchView", function(exports, require, module) {
var ArticleSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = ArticleSearchView = (function(superClass) {
  extend(ArticleSearchView, superClass);

  function ArticleSearchView() {
    return ArticleSearchView.__super__.constructor.apply(this, arguments);
  }

  ArticleSearchView.prototype.id = 'editor-article-home-view';

  ArticleSearchView.prototype.modelLabel = 'Article';

  ArticleSearchView.prototype.model = require('models/Article');

  ArticleSearchView.prototype.modelURL = '/db/article';

  ArticleSearchView.prototype.tableTemplate = require('templates/editor/article/table');

  ArticleSearchView.prototype.page = 'article';

  ArticleSearchView.prototype.getRenderData = function() {
    var context;
    context = ArticleSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.article_title';
    context.currentNew = 'editor.new_article_title';
    context.currentNewSignup = 'editor.new_article_title_login';
    context.currentSearch = 'editor.article_search_title';
    context.newModelsAdminOnly = true;
    this.$el.i18n();
    return context;
  };

  return ArticleSearchView;

})(SearchView);
});

;require.register("views/editor/article/ArticleVersionsModal", function(exports, require, module) {
var ArticleVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = ArticleVersionsModal = (function(superClass) {
  extend(ArticleVersionsModal, superClass);

  ArticleVersionsModal.prototype.id = 'editor-article-versions-view';

  ArticleVersionsModal.prototype.url = '/db/article/';

  ArticleVersionsModal.prototype.page = 'article';

  function ArticleVersionsModal(options, ID) {
    this.ID = ID;
    ArticleVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/Article'));
  }

  return ArticleVersionsModal;

})(VersionsModal);
});

;require.register("views/editor/campaign/CampaignAnalyticsModal", function(exports, require, module) {
var CampaignAnalyticsModal, ModalView, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

template = require('templates/editor/campaign/campaign-analytics-modal');

utils = require('core/utils');

require('vendor/d3');

ModalView = require('views/core/ModalView');

module.exports = CampaignAnalyticsModal = (function(superClass) {
  extend(CampaignAnalyticsModal, superClass);

  CampaignAnalyticsModal.prototype.id = 'campaign-analytics-modal';

  CampaignAnalyticsModal.prototype.template = template;

  CampaignAnalyticsModal.prototype.plain = true;

  CampaignAnalyticsModal.prototype.events = {
    'click #reload-button': 'onClickReloadButton',
    'dblclick .level': 'onDblClickLevel',
    'change #option-show-left-game': 'updateShowLeftGame',
    'change #option-show-subscriptions': 'updateShowSubscriptions'
  };

  function CampaignAnalyticsModal(options, campaignHandle, campaignCompletions) {
    this.campaignHandle = campaignHandle;
    this.campaignCompletions = campaignCompletions;
    this.getCampaignLevelSubscriptions = bind(this.getCampaignLevelSubscriptions, this);
    this.getCompaignLevelDrops = bind(this.getCompaignLevelDrops, this);
    this.getCampaignLevelCompletions = bind(this.getCampaignLevelCompletions, this);
    this.getCampaignAveragePlaytimes = bind(this.getCampaignAveragePlaytimes, this);
    this.getCampaignAnalytics = bind(this.getCampaignAnalytics, this);
    this.onClickReloadButton = bind(this.onClickReloadButton, this);
    CampaignAnalyticsModal.__super__.constructor.call(this, options);
    this.showLeftGame = true;
    this.showSubscriptions = true;
    if (me.isAdmin()) {
      this.getCampaignAnalytics();
    }
  }

  CampaignAnalyticsModal.prototype.getRenderData = function() {
    var c;
    c = CampaignAnalyticsModal.__super__.getRenderData.call(this);
    c.showLeftGame = this.showLeftGame;
    c.showSubscriptions = this.showSubscriptions;
    c.campaignCompletions = this.campaignCompletions;
    return c;
  };

  CampaignAnalyticsModal.prototype.afterRender = function() {
    CampaignAnalyticsModal.__super__.afterRender.call(this);
    $("#input-startday").datepicker({
      dateFormat: "yy-mm-dd"
    });
    $("#input-endday").datepicker({
      dateFormat: "yy-mm-dd"
    });
    return this.addCompletionLineGraphs();
  };

  CampaignAnalyticsModal.prototype.updateShowLeftGame = function() {
    this.showLeftGame = this.$el.find('#option-show-left-game').prop('checked');
    return this.render();
  };

  CampaignAnalyticsModal.prototype.updateShowSubscriptions = function() {
    this.showSubscriptions = this.$el.find('#option-show-subscriptions').prop('checked');
    return this.render();
  };

  CampaignAnalyticsModal.prototype.onClickReloadButton = function() {
    var endDay, startDay;
    startDay = $('#input-startday').val();
    endDay = $('#input-endday').val();
    delete this.campaignCompletions.levels;
    this.campaignCompletions.startDay = startDay;
    this.campaignCompletions.endDay = endDay;
    this.render();
    return this.getCampaignAnalytics(startDay, endDay);
  };

  CampaignAnalyticsModal.prototype.onDblClickLevel = function(e) {
    var row;
    row = $(e.target).parents('.level');
    Backbone.Mediator.publish('editor:campaign-analytics-modal-closed', {
      targetLevelSlug: row.data('level-slug')
    });
    return this.hide();
  };

  CampaignAnalyticsModal.prototype.addCompletionLineGraphs = function() {
    var data, day, days, i, j, k, len, level, ref, ref1, results;
    if (!this.campaignCompletions.levels) {
      return;
    }
    ref = this.campaignCompletions.levels;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      level = ref[j];
      days = [];
      for (day in level['days']) {
        if (!(level['days'][day].started > 0)) {
          continue;
        }
        days.push({
          day: day,
          rate: level['days'][day].finished / level['days'][day].started,
          count: level['days'][day].started
        });
      }
      days.sort(function(a, b) {
        return a.day - b.day;
      });
      data = [];
      for (i = k = 0, ref1 = days.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
        data.push({
          x: i,
          y: days[i].rate,
          c: days[i].count
        });
      }
      results.push(this.addLineGraph('#background' + level.level, data));
    }
    return results;
  };

  CampaignAnalyticsModal.prototype.addLineGraph = function(containerSelector, lineData, lineColor, min, max) {
    var height, i, j, lines, ref, vis, width, xRange, yRange;
    if (lineColor == null) {
      lineColor = 'green';
    }
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1.0;
    }
    vis = d3.select(containerSelector);
    width = $(containerSelector).width();
    height = $(containerSelector).height();
    xRange = d3.scale.linear().range([0, width]).domain([
      d3.min(lineData, function(d) {
        return d.x;
      }), d3.max(lineData, function(d) {
        return d.x;
      })
    ]);
    yRange = d3.scale.linear().range([height, 0]).domain([min, max]);
    lines = [];
    for (i = j = 0, ref = lineData.length - 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      lines.push({
        x1: xRange(lineData[i].x),
        y1: yRange(lineData[i].y),
        x2: xRange(lineData[i + 1].x),
        y2: yRange(lineData[i + 1].y),
        strokeWidth: Math.min(3, Math.max(0.3, Math.log(lineData[i].c / 10) / 2))
      });
    }
    return vis.selectAll('.line').data(lines).enter().append("line").attr("x1", function(d) {
      return d.x1;
    }).attr("y1", function(d) {
      return d.y1;
    }).attr("x2", function(d) {
      return d.x2;
    }).attr("y2", function(d) {
      return d.y2;
    }).style("stroke-width", function(d) {
      return d.strokeWidth;
    }).style("stroke", lineColor);
  };

  CampaignAnalyticsModal.prototype.getCampaignAnalytics = function(startDay, endDay) {
    var endDayDashed, startDayDashed;
    if (startDay != null) {
      startDayDashed = startDay;
      startDay = startDay.replace(/-/g, '');
    } else {
      startDay = utils.getUTCDay(-14);
      startDayDashed = startDay.slice(0, 4) + "-" + startDay.slice(4, 6) + "-" + startDay.slice(6, 8);
    }
    if (endDay != null) {
      endDayDashed = endDay;
      endDay = endDay.replace(/-/g, '');
    } else {
      endDay = utils.getUTCDay(-1);
      endDayDashed = endDay.slice(0, 4) + "-" + endDay.slice(4, 6) + "-" + endDay.slice(6, 8);
    }
    this.campaignCompletions.startDay = startDayDashed;
    this.campaignCompletions.endDay = endDayDashed;
    return this.getCampaignLevelCompletions(startDay, endDay, (function(_this) {
      return function() {
        if (typeof _this.render === "function") {
          _this.render();
        }
        return _this.getCompaignLevelDrops(startDay, endDay, function() {
          if (typeof _this.render === "function") {
            _this.render();
          }
          return _this.getCampaignAveragePlaytimes(startDayDashed, endDayDashed, function() {
            if (typeof _this.render === "function") {
              _this.render();
            }
            return _this.getCampaignLevelSubscriptions(startDay, endDay, function() {
              return typeof _this.render === "function" ? _this.render() : void 0;
            });
          });
        });
      };
    })(this));
  };

  CampaignAnalyticsModal.prototype.getCampaignAveragePlaytimes = function(startDay, endDay, doneCallback) {
    var levelSlugs, request, success;
    success = (function(_this) {
      return function(data) {
        var addPlaytimePercentage, item, j, k, len, len1, level, levelAverages, maxPlaytime, name, ref, sortedLevels, total;
        if (_this.destroyed) {
          return doneCallback();
        }
        levelAverages = {};
        maxPlaytime = 0;
        for (j = 0, len = data.length; j < len; j++) {
          item = data[j];
          if (levelAverages[name = item.level] == null) {
            levelAverages[name] = [];
          }
          levelAverages[item.level].push(item.average);
        }
        ref = _this.campaignCompletions.levels;
        for (k = 0, len1 = ref.length; k < len1; k++) {
          level = ref[k];
          if (levelAverages[level.level]) {
            if (levelAverages[level.level].length > 0) {
              total = _.reduce(levelAverages[level.level], (function(sum, num) {
                return sum + num;
              }));
              level.averagePlaytime = total / levelAverages[level.level].length;
              if (maxPlaytime < level.averagePlaytime) {
                maxPlaytime = level.averagePlaytime;
              }
              if (level.averagePlaytime > 0 && level.dropped > 0) {
                level.droppedPerSecond = level.dropped / level.averagePlaytime;
              }
            } else {
              level.averagePlaytime = 0.0;
            }
          }
        }
        addPlaytimePercentage = function(item) {
          if (maxPlaytime !== 0) {
            item.playtimePercentage = Math.round(item.averagePlaytime / maxPlaytime * 100.0);
          }
          return item;
        };
        _this.campaignCompletions.levels = _.map(_this.campaignCompletions.levels, addPlaytimePercentage, _this);
        sortedLevels = _.cloneDeep(_this.campaignCompletions.levels);
        sortedLevels = _.filter(sortedLevels, (function(a) {
          return a.droppedPerSecond > 0;
        }), _this);
        sortedLevels.sort(function(a, b) {
          return b.droppedPerSecond - a.droppedPerSecond;
        });
        _this.campaignCompletions.top3DropPerSecond = _.pluck(sortedLevels.slice(0, 3), 'level');
        return doneCallback();
      };
    })(this);
    levelSlugs = _.pluck(this.campaignCompletions.levels, 'level');
    request = this.supermodel.addRequestResource('playtime_averages', {
      url: '/db/level/-/playtime_averages',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: levelSlugs
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignAnalyticsModal.prototype.getCampaignLevelCompletions = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        var addUserRemaining, countCompletions, maxStarted, sortedLevels;
        if (_this.destroyed) {
          return doneCallback();
        }
        countCompletions = function(item) {
          item.started = _.reduce(item.days, (function(result, current) {
            return result + current.started;
          }), 0);
          item.finished = _.reduce(item.days, (function(result, current) {
            return result + current.finished;
          }), 0);
          item.completionRate = item.started > 0 ? item.finished / item.started * 100 : 0.0;
          return item;
        };
        addUserRemaining = function(item) {
          if (maxStarted !== 0) {
            item.usersRemaining = Math.round(item.started / maxStarted * 100.0);
          }
          return item;
        };
        _this.campaignCompletions.levels = _.map(data, countCompletions, _this);
        if (_this.campaignCompletions.levels.length > 0) {
          maxStarted = (_.max(_this.campaignCompletions.levels, (function(a) {
            return a.started;
          }))).started;
        } else {
          maxStarted = 0;
        }
        _this.campaignCompletions.levels = _.map(_this.campaignCompletions.levels, addUserRemaining, _this);
        sortedLevels = _.cloneDeep(_this.campaignCompletions.levels);
        sortedLevels = _.filter(sortedLevels, (function(a) {
          return a.finished >= 10;
        }), _this);
        if (sortedLevels.length >= 3) {
          sortedLevels.sort(function(a, b) {
            return b.completionRate - a.completionRate;
          });
          _this.campaignCompletions.top3 = _.pluck(sortedLevels.slice(0, 3), 'level');
          _this.campaignCompletions.bottom3 = _.pluck(sortedLevels.slice(sortedLevels.length - 4, sortedLevels.length - 1), 'level');
        }
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('campaign_completions', {
      url: '/db/analytics_perday/-/campaign_completions',
      data: {
        startDay: startDay,
        endDay: endDay,
        slug: this.campaignHandle
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignAnalyticsModal.prototype.getCompaignLevelDrops = function(startDay, endDay, doneCallback) {
    var levelSlugs, ref, request, success;
    success = (function(_this) {
      return function(data) {
        var item, j, k, len, len1, level, levelDrops, name, ref, ref1, sortedLevels;
        if (_this.destroyed) {
          return;
        }
        levelDrops = {};
        for (j = 0, len = data.length; j < len; j++) {
          item = data[j];
          if (levelDrops[name = item.level] == null) {
            levelDrops[name] = item.dropped;
          }
        }
        ref = _this.campaignCompletions.levels;
        for (k = 0, len1 = ref.length; k < len1; k++) {
          level = ref[k];
          level.dropped = (ref1 = levelDrops[level.level]) != null ? ref1 : 0;
          level.dropPercentage = level.started > 0 ? level.dropped / level.started * 100 : 0.0;
        }
        sortedLevels = _.cloneDeep(_this.campaignCompletions.levels);
        sortedLevels = _.filter(sortedLevels, (function(a) {
          return a.dropPercentage > 0;
        }), _this);
        if (sortedLevels.length >= 3) {
          sortedLevels.sort(function(a, b) {
            return b.dropPercentage - a.dropPercentage;
          });
          _this.campaignCompletions.top3DropPercentage = _.pluck(sortedLevels.slice(0, 3), 'level');
        }
        return doneCallback();
      };
    })(this);
    if (((ref = this.campaignCompletions) != null ? ref.levels : void 0) == null) {
      return doneCallback();
    }
    levelSlugs = _.pluck(this.campaignCompletions.levels, 'level');
    request = this.supermodel.addRequestResource('level_drops', {
      url: '/db/analytics_perday/-/level_drops',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: levelSlugs
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignAnalyticsModal.prototype.getCampaignLevelSubscriptions = function(startDay, endDay, doneCallback) {
    var levelSlugs, ref, request, success;
    success = (function(_this) {
      return function(data) {
        var item, j, k, len, len1, level, levelSubs, ref, ref1, ref2;
        if (_this.destroyed) {
          return doneCallback();
        }
        levelSubs = {};
        for (j = 0, len = data.length; j < len; j++) {
          item = data[j];
          levelSubs[item.level] = {
            shown: item.shown,
            purchased: item.purchased
          };
        }
        ref = _this.campaignCompletions.levels;
        for (k = 0, len1 = ref.length; k < len1; k++) {
          level = ref[k];
          level.subsShown = (ref1 = levelSubs[level.level]) != null ? ref1.shown : void 0;
          level.subsPurchased = (ref2 = levelSubs[level.level]) != null ? ref2.purchased : void 0;
        }
        return doneCallback();
      };
    })(this);
    if (((ref = this.campaignCompletions) != null ? ref.levels : void 0) == null) {
      return doneCallback();
    }
    levelSlugs = _.pluck(this.campaignCompletions.levels, 'level');
    request = this.supermodel.addRequestResource('campaign_subscriptions', {
      url: '/db/analytics_perday/-/level_subscriptions',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: levelSlugs
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  return CampaignAnalyticsModal;

})(ModalView);
});

;require.register("views/editor/campaign/CampaignEditorView", function(exports, require, module) {
var Achievement, AchievementNode, Campaign, CampaignAnalyticsModal, CampaignEditorView, CampaignLevelView, CampaignNode, CampaignView, CampaignsNode, CocoCollection, Level, LevelNode, LevelsNode, PatchesView, RelatedAchievementsCollection, RewardsNode, RootView, SaveCampaignModal, ThangType, achievementProject, addAchievementEditorLink, thangTypeProject, treemaExt, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

RootView = require('views/core/RootView');

Campaign = require('models/Campaign');

Level = require('models/Level');

Achievement = require('models/Achievement');

ThangType = require('models/ThangType');

CampaignView = require('views/play/CampaignView');

CocoCollection = require('collections/CocoCollection');

treemaExt = require('core/treema-ext');

utils = require('core/utils');

RelatedAchievementsCollection = require('collections/RelatedAchievementsCollection');

CampaignAnalyticsModal = require('./CampaignAnalyticsModal');

CampaignLevelView = require('./CampaignLevelView');

SaveCampaignModal = require('./SaveCampaignModal');

PatchesView = require('views/editor/PatchesView');

require('game-libraries');

achievementProject = ['related', 'rewards', 'name', 'slug'];

thangTypeProject = ['name', 'original'];

module.exports = CampaignEditorView = (function(superClass) {
  extend(CampaignEditorView, superClass);

  CampaignEditorView.prototype.id = "campaign-editor-view";

  CampaignEditorView.prototype.template = require('templates/editor/campaign/campaign-editor-view');

  CampaignEditorView.prototype.className = 'editor';

  CampaignEditorView.prototype.events = {
    'click #analytics-button': 'onClickAnalyticsButton',
    'click #save-button': 'onClickSaveButton',
    'click #patches-button': 'onClickPatches'
  };

  CampaignEditorView.prototype.subscriptions = {
    'editor:campaign-analytics-modal-closed': 'onAnalyticsModalClosed'
  };

  function CampaignEditorView(options, campaignHandle) {
    this.campaignHandle = campaignHandle;
    this.onAchievementUpdated = bind(this.onAchievementUpdated, this);
    this.onTreemaDoubleClicked = bind(this.onTreemaDoubleClicked, this);
    this.onTreemaSelectionChanged = bind(this.onTreemaSelectionChanged, this);
    this.onTreemaChanged = bind(this.onTreemaChanged, this);
    CampaignEditorView.__super__.constructor.call(this, options);
    this.campaign = new Campaign({
      _id: this.campaignHandle
    });
    this.supermodel.loadModel(this.campaign);
    this.listenToOnce(this.campaign, 'sync', function(model, response, jqXHR) {
      this.campaign.set('_id', response._id);
      return this.campaign.url = function() {
        return '/db/campaign/' + this.id;
      };
    });
    this.campaignAnalytics = {};
    this.levels = new CocoCollection([], {
      model: Level,
      url: "/db/campaign/" + this.campaignHandle + "/levels",
      project: Campaign.denormalizedLevelProperties
    });
    this.supermodel.loadCollection(this.levels, 'levels');
    this.achievements = new CocoCollection([], {
      model: Achievement,
      url: "/db/campaign/" + this.campaignHandle + "/achievements",
      project: achievementProject
    });
    this.supermodel.loadCollection(this.achievements, 'achievements');
    this.toSave = new Backbone.Collection();
    this.listenToOnce(this.campaign, 'sync', this.loadThangTypeNames);
    this.listenToOnce(this.campaign, 'sync', this.onFundamentalLoaded);
    this.listenToOnce(this.levels, 'sync', this.onFundamentalLoaded);
    this.listenToOnce(this.achievements, 'sync', this.onFundamentalLoaded);
  }

  CampaignEditorView.prototype.onLeaveMessage = function() {
    var diff, i, len, model, ref;
    ref = this.toSave.models;
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      diff = model.getDelta();
      if (_.size(diff)) {
        console.log('model, diff', model, diff);
        return 'You have changes!';
      }
    }
  };

  CampaignEditorView.prototype.loadThangTypeNames = function() {
    var i, j, len, len1, level, original, originals, ref, results, thangType;
    originals = [];
    ref = _.values(this.campaign.get('levels'));
    for (i = 0, len = ref.length; i < len; i++) {
      level = ref[i];
      if (level.requiredGear) {
        originals = originals.concat(_.values(level.requiredGear));
      }
      if (level.restrictedGear) {
        originals = originals.concat(_.values(level.restrictedGear));
      }
    }
    originals = _.uniq(_.flatten(originals));
    results = [];
    for (j = 0, len1 = originals.length; j < len1; j++) {
      original = originals[j];
      thangType = new ThangType();
      thangType.setProjection(thangTypeProject);
      thangType.setURL("/db/thang.type/" + original + "/version");
      results.push(this.supermodel.loadModel(thangType));
    }
    return results;
  };

  CampaignEditorView.prototype.onFundamentalLoaded = function() {
    if (!(this.campaign.loaded && this.levels.loaded && this.achievements.loaded)) {
      return;
    }
    return this.loadMissingLevelsAndRelatedModels();
  };

  CampaignEditorView.prototype.loadMissingLevelsAndRelatedModels = function() {
    var achievements, achievementsResource, i, len, level, levelResource, model, promises, ref;
    promises = [];
    ref = _.values(this.campaign.get('levels'));
    for (i = 0, len = ref.length; i < len; i++) {
      level = ref[i];
      if (model = this.levels.findWhere({
        original: level.original
      })) {
        continue;
      }
      model = new Level({});
      model.setProjection(Campaign.denormalizedLevelProperties);
      model.setURL("/db/level/" + level.original + "/version");
      levelResource = this.supermodel.loadModel(model);
      this.levels.add(levelResource.model);
      if (levelResource.jqxhr) {
        levelResource.model.once('sync', function() {
          this.setURL("/db/level/" + this.id);
          return this.markToRevert();
        });
        promises.push(levelResource.jqxhr);
      }
      achievements = new RelatedAchievementsCollection(level.original);
      achievements.setProjection(achievementProject);
      achievementsResource = this.supermodel.loadCollection(achievements);
      promises.push(achievementsResource.jqxhr);
      this.listenToOnce(achievements, 'sync', function(achievementsLoaded) {
        return this.achievements.add(achievementsLoaded.models);
      });
    }
    return Promise.resolve($.when.apply($, promises));
  };

  CampaignEditorView.prototype.onLoaded = function() {
    this.updateCampaignLevels();
    this.campaignView.render();
    return CampaignEditorView.__super__.onLoaded.call(this);
  };

  CampaignEditorView.prototype.updateCampaignLevels = function() {
    var campaignLevel, campaignLevels, i, j, k, key, len, len1, len2, level, levelIndex, levelOriginal, model, propsToPropagate, ref, ref1, results;
    if (this.campaign.hasLocalChanges()) {
      this.toSave.add(this.campaign);
    }
    campaignLevels = $.extend({}, this.campaign.get('levels'));
    ref = this.levels.models;
    for (levelIndex = i = 0, len = ref.length; i < len; levelIndex = ++i) {
      level = ref[levelIndex];
      levelOriginal = level.get('original');
      campaignLevel = campaignLevels[levelOriginal];
      if (!campaignLevel) {
        continue;
      }
      $.extend(campaignLevel, _.pick(level.attributes, Campaign.denormalizedLevelProperties));
      if (!level.attributes.requiredGear) {
        delete campaignLevel.requiredGear;
      }
      if (!level.attributes.restrictedGear) {
        delete campaignLevel.restrictedGear;
      }
      campaignLevel.rewards = this.formatRewards(level);
      if (this.campaign.get('type') === 'hero') {
        campaignLevel.campaign = this.campaign.get('slug');
      }
      if (this.campaign.get('type', true) === 'course') {
        campaignLevel.campaignIndex = this.levels.models.length - levelIndex - 1;
      }
      campaignLevels[levelOriginal] = campaignLevel;
    }
    this.campaign.set('levels', campaignLevels);
    ref1 = _.values(campaignLevels);
    results = [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      level = ref1[j];
      if (/test/.test(this.campaign.get('slug'))) {
        continue;
      }
      model = this.levels.findWhere({
        original: level.original
      });
      propsToPropagate = Campaign.denormalizedLevelProperties;
      if (this.campaign.get('type') !== 'course') {
        propsToPropagate = _.without(propsToPropagate, 'campaignIndex');
      }
      for (k = 0, len2 = propsToPropagate.length; k < len2; k++) {
        key = propsToPropagate[k];
        if (model.get(key) !== level[key]) {
          model.set(key, level[key]);
        }
      }
      if (model.hasLocalChanges()) {
        results.push(this.toSave.add(model));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  CampaignEditorView.prototype.formatRewards = function(level) {
    var achievement, achievements, i, j, len, len1, ref, reward, rewardArray, rewardObject, rewardType, rewards, thangType;
    achievements = this.achievements.where({
      related: level.get('original')
    });
    rewards = [];
    for (i = 0, len = achievements.length; i < len; i++) {
      achievement = achievements[i];
      ref = achievement.get('rewards');
      for (rewardType in ref) {
        rewardArray = ref[rewardType];
        for (j = 0, len1 = rewardArray.length; j < len1; j++) {
          reward = rewardArray[j];
          rewardObject = {
            achievement: achievement.id
          };
          if (rewardType === 'heroes') {
            rewardObject.hero = reward;
            thangType = new ThangType({}, {
              project: thangTypeProject
            });
            thangType.setURL("/db/thang.type/" + reward + "/version");
            this.supermodel.loadModel(thangType);
          }
          if (rewardType === 'levels') {
            rewardObject.level = reward;
            if (!this.levels.findWhere({
              original: reward
            })) {
              level = new Level({}, {
                project: Campaign.denormalizedLevelProperties
              });
              level.setURL("/db/level/" + reward + "/version");
              this.supermodel.loadModel(level);
            }
          }
          if (rewardType === 'items') {
            rewardObject.item = reward;
            thangType = new ThangType({}, {
              project: thangTypeProject
            });
            thangType.setURL("/db/thang.type/" + reward + "/version");
            this.supermodel.loadModel(thangType);
          }
          rewards.push(rewardObject);
        }
      }
    }
    return rewards;
  };

  CampaignEditorView.prototype.propagateCampaignIndexes = function() {
    var campaignLevel, campaignLevels, index, level, levelOriginal, results;
    campaignLevels = $.extend({}, this.campaign.get('levels'));
    index = 0;
    results = [];
    for (levelOriginal in campaignLevels) {
      campaignLevel = campaignLevels[levelOriginal];
      if (this.campaign.get('type') === 'course') {
        level = this.levels.findWhere({
          original: levelOriginal
        });
        if (level && level.get('campaignIndex') !== index) {
          level.set('campaignIndex', index);
        }
      }
      campaignLevel.campaignIndex = index;
      index += 1;
      results.push(this.campaign.set('levels', campaignLevels));
    }
    return results;
  };

  CampaignEditorView.prototype.onClickPatches = function(e) {
    this.patchesView = this.insertSubView(new PatchesView(this.campaign), this.$el.find('.patches-view'));
    this.patchesView.load();
    return this.patchesView.$el.removeClass('hidden');
  };

  CampaignEditorView.prototype.onClickAnalyticsButton = function() {
    return this.openModalView(new CampaignAnalyticsModal({}, this.campaignHandle, this.campaignAnalytics));
  };

  CampaignEditorView.prototype.onAnalyticsModalClosed = function(options) {
    var level, original, ref, ref1, ref2, ref3, results;
    if ((options.targetLevelSlug != null) && (((ref = this.treema.childrenTreemas) != null ? (ref1 = ref.levels) != null ? ref1.childrenTreemas : void 0 : void 0) != null)) {
      ref2 = this.treema.childrenTreemas.levels.childrenTreemas;
      results = [];
      for (original in ref2) {
        level = ref2[original];
        if (((ref3 = level.data) != null ? ref3.slug : void 0) === options.targetLevelSlug) {
          this.openCampaignLevelView(this.supermodel.getModelByOriginal(Level, original));
          break;
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };

  CampaignEditorView.prototype.onClickSaveButton = function(e) {
    if (this.openingModal) {
      return;
    }
    this.openingModal = true;
    return this.loadMissingLevelsAndRelatedModels().then((function(_this) {
      return function() {
        _this.openingModal = false;
        _this.propagateCampaignIndexes();
        _this.updateCampaignLevels();
        _this.toSave.set(_this.toSave.filter(function(m) {
          return m.hasLocalChanges();
        }));
        return _this.openModalView(new SaveCampaignModal({}, _this.toSave));
      };
    })(this));
  };

  CampaignEditorView.prototype.afterRender = function() {
    var ref, treemaOptions;
    CampaignEditorView.__super__.afterRender.call(this);
    treemaOptions = {
      schema: Campaign.schema,
      data: $.extend({}, this.campaign.attributes),
      filePath: "db/campaign/" + (this.campaign.get('_id')),
      callbacks: {
        change: this.onTreemaChanged,
        select: this.onTreemaSelectionChanged,
        dblclick: this.onTreemaDoubleClicked,
        achievementUpdated: this.onAchievementUpdated
      },
      nodeClasses: {
        levels: LevelsNode,
        level: LevelNode,
        campaigns: CampaignsNode,
        campaign: CampaignNode,
        achievement: AchievementNode,
        rewards: RewardsNode
      },
      supermodel: this.supermodel
    };
    this.treema = this.$el.find('#campaign-treema').treema(treemaOptions);
    this.treema.build();
    this.treema.open();
    if ((ref = this.treema.childrenTreemas.levels) != null) {
      ref.open();
    }
    this.campaignView = new CampaignView({
      editorMode: true,
      supermodel: this.supermodel
    }, this.campaignHandle);
    this.campaignView.highlightElement = _.noop;
    this.listenTo(this.campaignView, 'level-moved', this.onCampaignLevelMoved);
    this.listenTo(this.campaignView, 'adjacent-campaign-moved', this.onAdjacentCampaignMoved);
    this.listenTo(this.campaignView, 'level-clicked', this.onCampaignLevelClicked);
    this.listenTo(this.campaignView, 'level-double-clicked', this.onCampaignLevelDoubleClicked);
    this.listenTo(this.campaign, 'change:i18n', (function(_this) {
      return function() {
        _this.campaign.updateI18NCoverage();
        _this.treema.set('/i18n', _this.campaign.get('i18n'));
        return _this.treema.set('/i18nCoverage', _this.campaign.get('i18nCoverage'));
      };
    })(this));
    return this.insertSubView(this.campaignView);
  };

  CampaignEditorView.prototype.onTreemaChanged = function(e, nodes) {
    var campaignLevel, i, j, key, len, len1, level, node, original, parts, path, ref, ref1, value;
    if (!/test/.test(this.campaign.get('slug'))) {
      for (i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        path = node.getPath();
        if (_.string.startsWith(path, '/levels/')) {
          parts = path.split('/');
          original = parts[2];
          level = this.supermodel.getModelByOriginal(Level, original);
          campaignLevel = this.treema.get("/levels/" + original);
          ref = Campaign.denormalizedLevelProperties;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            key = ref[j];
            level.set(key, campaignLevel[key]);
          }
          if (level.hasLocalChanges()) {
            this.toSave.add(level);
          }
        }
      }
    }
    this.toSave.add(this.campaign);
    ref1 = this.treema.data;
    for (key in ref1) {
      value = ref1[key];
      this.campaign.set(key, value);
    }
    return this.campaignView.setCampaign(this.campaign);
  };

  CampaignEditorView.prototype.onTreemaSelectionChanged = function(e, node) {
    var elem, ref, ref1;
    if (((ref = node[0]) != null ? (ref1 = ref.data) != null ? ref1.original : void 0 : void 0) == null) {
      return;
    }
    elem = this.$("div[data-level-original='" + node[0].data.original + "']");
    elem.toggle('pulsate');
    return setTimeout(function() {
      return elem.toggle('pulsate');
    }, 1000);
  };

  CampaignEditorView.prototype.onTreemaDoubleClicked = function(e, node) {
    var original, path;
    path = node.getPath();
    if (!_.string.startsWith(path, '/levels/')) {
      return;
    }
    original = path.split('/')[2];
    return this.openCampaignLevelView(this.supermodel.getModelByOriginal(Level, original));
  };

  CampaignEditorView.prototype.onAchievementUpdated = function(e, node) {
    var level, levelOriginal, rewardsPath;
    this.supermodel.registerModel(e.achievement);
    this.achievements.findWhere({
      _id: e.achievement.id
    }).set('rewards', e.achievement.get('rewards'));
    this.updateCampaignLevels();
    levelOriginal = node.getPath().split('/')[2];
    level = this.levels.findWhere({
      original: levelOriginal
    });
    rewardsPath = "/levels/" + levelOriginal + "/rewards";
    this.treema.set(rewardsPath, this.formatRewards(level));
    return this.campaignView.setCampaign(this.campaign);
  };

  CampaignEditorView.prototype.onCampaignLevelMoved = function(e) {
    var path;
    path = "levels/" + e.levelOriginal + "/position";
    return this.treema.set(path, e.position);
  };

  CampaignEditorView.prototype.onAdjacentCampaignMoved = function(e) {
    var path;
    path = "adjacentCampaigns/" + e.campaignID + "/position";
    return this.treema.set(path, e.position);
  };

  CampaignEditorView.prototype.onCampaignLevelClicked = function(levelOriginal) {
    var levelTreema, ref, ref1, ref2, url;
    if (!(levelTreema = (ref = this.treema.childrenTreemas) != null ? (ref1 = ref.levels) != null ? (ref2 = ref1.childrenTreemas) != null ? ref2[levelOriginal] : void 0 : void 0 : void 0)) {
      return;
    }
    if (key.ctrl || key.command) {
      url = "/editor/level/" + levelTreema.data.slug;
      window.open(url, '_blank');
    }
    return levelTreema.select();
  };

  CampaignEditorView.prototype.onCampaignLevelDoubleClicked = function(levelOriginal) {
    return this.openCampaignLevelView(this.supermodel.getModelByOriginal(Level, levelOriginal));
  };

  CampaignEditorView.prototype.openCampaignLevelView = function(level) {
    var campaignLevelView;
    this.insertSubView(campaignLevelView = new CampaignLevelView({}, level));
    this.listenToOnce(campaignLevelView, 'hidden', (function(_this) {
      return function() {
        return _this.$el.find('#campaign-view').show();
      };
    })(this));
    return this.$el.find('#campaign-view').hide();
  };

  CampaignEditorView.prototype.onClickLoginButton = function() {};

  CampaignEditorView.prototype.onClickSignupButton = function() {};

  return CampaignEditorView;

})(RootView);

LevelsNode = (function(superClass) {
  extend(LevelsNode, superClass);

  function LevelsNode() {
    this.childSource = bind(this.childSource, this);
    return LevelsNode.__super__.constructor.apply(this, arguments);
  }

  LevelsNode.prototype.valueClass = 'treema-levels';

  LevelsNode.levels = {};

  LevelsNode.prototype.ordered = true;

  LevelsNode.prototype.buildValueForDisplay = function(valEl, data) {
    return this.buildValueForDisplaySimply(valEl, '' + _.size(data));
  };

  LevelsNode.prototype.childPropertiesAvailable = function() {
    return this.childSource;
  };

  LevelsNode.prototype.childSource = function(req, res) {
    var s;
    s = new Backbone.Collection([], {
      model: Level
    });
    s.url = '/db/level';
    s.fetch({
      data: {
        term: req.term,
        project: Campaign.denormalizedLevelProperties.join(',')
      }
    });
    return s.once('sync', (function(_this) {
      return function(collection) {
        var hasTerm, i, len, level, lowerPriority, lowerTerm, mapped, r, ref, sorted, startsWithTerm;
        ref = collection.models;
        for (i = 0, len = ref.length; i < len; i++) {
          level = ref[i];
          LevelsNode.levels[level.get('original')] = level;
          _this.settings.supermodel.registerModel(level);
        }
        mapped = (function() {
          var j, len1, ref1, results;
          ref1 = collection.models;
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            r = ref1[j];
            results.push({
              label: r.get('name'),
              value: r.get('original')
            });
          }
          return results;
        })();
        lowerPriority = _.clone(mapped);
        lowerTerm = req.term.toLowerCase();
        startsWithTerm = _.filter(lowerPriority, function(item) {
          return _.string.startsWith(item.label.toLowerCase(), lowerTerm);
        });
        _.pull.apply(_, [lowerPriority].concat(slice.call(startsWithTerm)));
        hasTerm = _.filter(lowerPriority, function(item) {
          return _.string.contains(item.label.toLowerCase(), lowerTerm);
        });
        _.pull.apply(_, [lowerPriority].concat(slice.call(hasTerm)));
        sorted = _.flatten([startsWithTerm, hasTerm, lowerPriority]);
        return res(sorted);
      };
    })(this));
  };

  return LevelsNode;

})(TreemaObjectNode);

LevelNode = (function(superClass) {
  extend(LevelNode, superClass);

  function LevelNode() {
    return LevelNode.__super__.constructor.apply(this, arguments);
  }

  LevelNode.prototype.valueClass = 'treema-level';

  LevelNode.prototype.buildValueForDisplay = function(valEl, data) {
    var completion, el, name, status;
    name = data.name;
    if (data.requiresSubscription) {
      name = "[P] " + name;
    }
    status = '';
    el = 'strong';
    if (data.adminOnly) {
      status += " (disabled)";
      el = 'span';
    } else if (data.adventurer) {
      status += " (adventurer)";
    }
    completion = '';
    valEl.append($("<a href='/editor/level/" + (_.string.slugify(data.name)) + "' class='spr'>(e)</a>"));
    valEl.append($("<" + el + "></" + el + ">").addClass('treema-shortened').text(name));
    if (status) {
      valEl.append($('<em class="spl"></em>').text(status));
    }
    if (completion) {
      return valEl.append($('<span class="completion"></span>').text(completion));
    }
  };

  LevelNode.prototype.populateData = function() {
    var data;
    if (this.data.name != null) {
      return;
    }
    data = _.pick(LevelsNode.levels[this.keyForParent].attributes, Campaign.denormalizedLevelProperties);
    return _.extend(this.data, data);
  };

  return LevelNode;

})(TreemaObjectNode);

CampaignsNode = (function(superClass) {
  extend(CampaignsNode, superClass);

  function CampaignsNode() {
    this.childSource = bind(this.childSource, this);
    return CampaignsNode.__super__.constructor.apply(this, arguments);
  }

  CampaignsNode.prototype.valueClass = 'treema-campaigns';

  CampaignsNode.campaigns = {};

  CampaignsNode.prototype.buildValueForDisplay = function(valEl, data) {
    return this.buildValueForDisplaySimply(valEl, '' + _.size(data));
  };

  CampaignsNode.prototype.childPropertiesAvailable = function() {
    return this.childSource;
  };

  CampaignsNode.prototype.childSource = function(req, res) {
    var s;
    s = new Backbone.Collection([], {
      model: Campaign
    });
    s.url = '/db/campaign';
    s.fetch({
      data: {
        term: req.term,
        project: Campaign.denormalizedCampaignProperties
      }
    });
    return s.once('sync', function(collection) {
      var campaign, i, len, mapped, r, ref;
      ref = collection.models;
      for (i = 0, len = ref.length; i < len; i++) {
        campaign = ref[i];
        CampaignsNode.campaigns[campaign.id] = campaign;
      }
      mapped = (function() {
        var j, len1, ref1, results;
        ref1 = collection.models;
        results = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          r = ref1[j];
          results.push({
            label: r.get('name'),
            value: r.id
          });
        }
        return results;
      })();
      return res(mapped);
    });
  };

  return CampaignsNode;

})(TreemaObjectNode);

CampaignNode = (function(superClass) {
  extend(CampaignNode, superClass);

  function CampaignNode() {
    return CampaignNode.__super__.constructor.apply(this, arguments);
  }

  CampaignNode.prototype.valueClass = 'treema-campaign';

  CampaignNode.prototype.buildValueForDisplay = function(valEl, data) {
    return this.buildValueForDisplaySimply(valEl, data.name);
  };

  CampaignNode.prototype.populateData = function() {
    var data;
    if (this.data.name != null) {
      return;
    }
    data = _.pick(CampaignsNode.campaigns[this.keyForParent].attributes, Campaign.denormalizedCampaignProperties);
    return _.extend(this.data, data);
  };

  return CampaignNode;

})(TreemaObjectNode);

AchievementNode = (function(superClass) {
  extend(AchievementNode, superClass);

  function AchievementNode() {
    return AchievementNode.__super__.constructor.apply(this, arguments);
  }

  AchievementNode.prototype.buildSearchURL = function(term) {
    return this.url + "?term=" + term + "&project=" + (achievementProject.join(','));
  };

  AchievementNode.prototype.buildValueForDisplay = function(valEl, data) {
    AchievementNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return addAchievementEditorLink(this, valEl, data);
  };

  return AchievementNode;

})(treemaExt.IDReferenceNode);

RewardsNode = (function(superClass) {
  extend(RewardsNode, superClass);

  function RewardsNode() {
    return RewardsNode.__super__.constructor.apply(this, arguments);
  }

  RewardsNode.prototype.buildValueForDisplay = function(valEl, data) {
    var achievements, mainAchievement;
    RewardsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    achievements = window.currentView.achievements.where({
      related: this.parent.data.original
    });
    achievements = _.sortBy(achievements, function(a) {
      var ref, ref1, ref2;
      return (ref = (ref1 = a.get('rewards')) != null ? (ref2 = ref1.levels) != null ? ref2.length : void 0 : void 0) != null ? ref : 0;
    });
    mainAchievement = achievements[0];
    if (!mainAchievement) {
      return;
    }
    return addAchievementEditorLink(this, valEl, mainAchievement.id);
  };

  return RewardsNode;

})(TreemaArrayNode);

addAchievementEditorLink = function(node, valEl, achievementId) {
  var anchor;
  anchor = $('<a class="spl">(e)</a>');
  anchor.on('click', function(event) {
    var childWindow;
    childWindow = window.open("/editor/achievement/" + achievementId, achievementId, 'width=1040,height=900,left=1600,top=0,location=1,menubar=1,scrollbars=1,status=0,titlebar=1,toolbar=1', true);
    childWindow.achievementSavedCallback = function(event) {
      return node.callbacks.achievementUpdated({
        achievement: event.achievement
      }, node);
    };
    childWindow.focus();
    return event.stopPropagation();
  });
  return valEl.find('.treema-shortened').append(anchor);
};
});

;require.register("views/editor/campaign/CampaignLevelView", function(exports, require, module) {
var CampaignLevelView, CocoView, Level, LevelSession, ModelModal, User, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

ModelModal = require('views/modal/ModelModal');

User = require('models/User');

utils = require('core/utils');

module.exports = CampaignLevelView = (function(superClass) {
  extend(CampaignLevelView, superClass);

  CampaignLevelView.prototype.id = 'campaign-level-view';

  CampaignLevelView.prototype.template = require('templates/editor/campaign/campaign-level-view');

  CampaignLevelView.prototype.events = {
    'change .line-graph-checkbox': 'updateGraphCheckbox',
    'click .close': 'onClickClose',
    'click #reload-button': 'onClickReloadButton',
    'dblclick .recent-session': 'onDblClickRecentSession',
    'mouseenter .graph-point': 'onMouseEnterPoint',
    'mouseleave .graph-point': 'onMouseLeavePoint',
    'click .replay-button': 'onClickReplay'
  };

  function CampaignLevelView(options, level) {
    this.level = level;
    this.getAnalytics = bind(this.getAnalytics, this);
    this.onClickReloadButton = bind(this.onClickReloadButton, this);
    CampaignLevelView.__super__.constructor.call(this, options);
    this.fullLevel = new Level({
      _id: this.level.id
    });
    this.fullLevel.fetch();
    this.listenToOnce(this.fullLevel, 'sync', (function(_this) {
      return function() {
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
    this.levelSlug = this.level.get('slug');
    this.getAnalytics();
  }

  CampaignLevelView.prototype.getRenderData = function() {
    var c;
    c = CampaignLevelView.__super__.getRenderData.call(this);
    c.level = this.fullLevel.loaded ? this.fullLevel : this.level;
    c.analytics = this.analytics;
    return c;
  };

  CampaignLevelView.prototype.afterRender = function() {
    CampaignLevelView.__super__.afterRender.call(this);
    $("#input-startday").datepicker({
      dateFormat: "yy-mm-dd"
    });
    $("#input-endday").datepicker({
      dateFormat: "yy-mm-dd"
    });
    return this.updateAnalyticsGraphs();
  };

  CampaignLevelView.prototype.updateGraphCheckbox = function(e) {
    var checked, graph, j, k, len, len1, line, lineID, ref, ref1;
    lineID = $(e.target).data('lineid');
    checked = $(e.target).prop('checked');
    ref = this.analytics.graphs;
    for (j = 0, len = ref.length; j < len; j++) {
      graph = ref[j];
      ref1 = graph.lines;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        line = ref1[k];
        if (line.lineID === lineID) {
          line.enabled = checked;
          return this.render();
        }
      }
    }
  };

  CampaignLevelView.prototype.onClickClose = function() {
    this.$el.addClass('hidden');
    return this.trigger('hidden');
  };

  CampaignLevelView.prototype.onClickReloadButton = function() {
    var endDay, startDay;
    startDay = $('#input-startday').val();
    endDay = $('#input-endday').val();
    return this.getAnalytics(startDay, endDay);
  };

  CampaignLevelView.prototype.onDblClickRecentSession = function(e) {
    var player, row, session;
    if (!me.isAdmin()) {
      return;
    }
    row = $(e.target).parent();
    player = new User({
      _id: row.data('player-id')
    });
    session = new LevelSession({
      _id: row.data('session-id')
    });
    return this.openModalView(new ModelModal({
      models: [session, player]
    }));
  };

  CampaignLevelView.prototype.onMouseEnterPoint = function(e) {
    var container, height, margin, pointID, width;
    pointID = $(e.target).data('pointid');
    container = this.$el.find(".graph-point-info-container[data-pointid=" + pointID + "]").show();
    margin = 20;
    width = container.outerWidth();
    height = container.outerHeight();
    container.css('left', e.offsetX - width / 2);
    return container.css('top', e.offsetY - height - margin);
  };

  CampaignLevelView.prototype.onMouseLeavePoint = function(e) {
    var pointID;
    pointID = $(e.target).data('pointid');
    return this.$el.find(".graph-point-info-container[data-pointid=" + pointID + "]").hide();
  };

  CampaignLevelView.prototype.onClickReplay = function(e) {
    var sessionID, url;
    sessionID = $(e.target).closest('tr').data('session-id');
    url = "/play/level/" + (this.level.get('slug')) + "?session=" + sessionID + "&observing=true";
    return window.open(url, '_blank');
  };

  CampaignLevelView.prototype.updateAnalyticsGraphData = function() {
    var avg, clickRate, completionLineID, currentDate, currentDay, currentIndex, day, dayStartedMap, days, helpCount, helpPoints, helpsLineID, i, j, k, l, lastDay, len, len1, len2, len3, len4, len5, len6, len7, len8, levelPoints, lineMetadata, m, n, o, p, playtimeLineID, playtimePoints, q, r, rate, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref3, ref4, ref5, ref6, ref7, ref8, ref9, started, videoPoints, videoRate, videosLineID;
    this.analytics.graphs = [
      {
        graphID: 'level-completions',
        lines: []
      }
    ];
    completionLineID = 'level-completions';
    playtimeLineID = 'level-playtime';
    helpsLineID = 'helps-clicked';
    videosLineID = 'help-videos';
    lineMetadata = {};
    lineMetadata[completionLineID] = {
      description: 'Level Completion (%)',
      color: 'red'
    };
    lineMetadata[playtimeLineID] = {
      description: 'Average Playtime (s)',
      color: 'green'
    };
    lineMetadata[helpsLineID] = {
      description: 'Help click rate (%)',
      color: 'blue'
    };
    lineMetadata[videosLineID] = {
      description: 'Help video rate (%)',
      color: 'purple'
    };
    days = {};
    if (((ref = this.analytics) != null ? (ref1 = ref.levelCompletions) != null ? ref1.data : void 0 : void 0) != null) {
      ref2 = this.analytics.levelCompletions.data;
      for (j = 0, len = ref2.length; j < len; j++) {
        day = ref2[j];
        days[day.created.slice(0, 4) + "-" + day.created.slice(4, 6) + "-" + day.created.slice(6, 8)] = true;
      }
    }
    if (((ref3 = this.analytics) != null ? (ref4 = ref3.levelPlaytimes) != null ? ref4.data : void 0 : void 0) != null) {
      ref5 = this.analytics.levelPlaytimes.data;
      for (k = 0, len1 = ref5.length; k < len1; k++) {
        day = ref5[k];
        days[day.created] = true;
      }
    }
    if (((ref6 = this.analytics) != null ? (ref7 = ref6.levelHelps) != null ? ref7.data : void 0 : void 0) != null) {
      ref8 = this.analytics.levelHelps.data;
      for (l = 0, len2 = ref8.length; l < len2; l++) {
        day = ref8[l];
        days[day.day.slice(0, 4) + "-" + day.day.slice(4, 6) + "-" + day.day.slice(6, 8)] = true;
      }
    }
    days = Object.keys(days).sort(function(a, b) {
      if (a < b) {
        return -1;
      } else {
        return 1;
      }
    });
    if (days.length > 0) {
      currentIndex = 0;
      currentDay = days[currentIndex];
      currentDate = new Date(currentDay + "T00:00:00.000Z");
      lastDay = days[days.length - 1];
      while (currentDay !== lastDay) {
        if (days[currentIndex] !== currentDay) {
          days.splice(currentIndex, 0, currentDay);
        }
        currentIndex++;
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        currentDay = currentDate.toISOString().substr(0, 10);
      }
    }
    dayStartedMap = {};
    if (((ref9 = this.analytics) != null ? (ref10 = ref9.levelCompletions) != null ? (ref11 = ref10.data) != null ? ref11.length : void 0 : void 0 : void 0) > 0) {
      levelPoints = [];
      ref12 = this.analytics.levelCompletions.data;
      for (i = m = 0, len3 = ref12.length; m < len3; i = ++m) {
        day = ref12[i];
        dayStartedMap[day.created] = day.started;
        rate = parseFloat(day.rate);
        levelPoints.push({
          x: i,
          y: rate,
          started: day.started,
          day: day.created.slice(0, 4) + "-" + day.created.slice(4, 6) + "-" + day.created.slice(6, 8),
          pointID: "" + completionLineID + i,
          values: ["Started: " + day.started, "Finished: " + day.finished, "Completion rate: " + (rate.toFixed(2)) + "%"]
        });
      }
      for (i = n = 0, len4 = days.length; n < len4; i = ++n) {
        day = days[i];
        if (levelPoints.length <= i || levelPoints[i].day !== day) {
          levelPoints.splice(i, 0, {
            y: 0.0,
            day: day,
            values: []
          });
        }
        levelPoints[i].x = i;
        levelPoints[i].pointID = "" + completionLineID + i;
      }
      this.analytics.graphs[0].lines.push({
        lineID: completionLineID,
        enabled: true,
        points: levelPoints,
        description: lineMetadata[completionLineID].description,
        lineColor: lineMetadata[completionLineID].color,
        min: 0,
        max: 100.0
      });
    }
    if (((ref13 = this.analytics) != null ? (ref14 = ref13.levelPlaytimes) != null ? (ref15 = ref14.data) != null ? ref15.length : void 0 : void 0 : void 0) > 0) {
      playtimePoints = [];
      ref16 = this.analytics.levelPlaytimes.data;
      for (i = o = 0, len5 = ref16.length; o < len5; i = ++o) {
        day = ref16[i];
        avg = parseFloat(day.average);
        playtimePoints.push({
          x: i,
          y: avg,
          day: day.created,
          pointID: "" + playtimeLineID + i,
          values: ["Average playtime: " + (avg.toFixed(2)) + "s"]
        });
      }
      for (i = p = 0, len6 = days.length; p < len6; i = ++p) {
        day = days[i];
        if (playtimePoints.length <= i || playtimePoints[i].day !== day) {
          playtimePoints.splice(i, 0, {
            y: 0.0,
            day: day,
            values: []
          });
        }
        playtimePoints[i].x = i;
        playtimePoints[i].pointID = "" + playtimeLineID + i;
      }
      this.analytics.graphs[0].lines.push({
        lineID: playtimeLineID,
        enabled: true,
        points: playtimePoints,
        description: lineMetadata[playtimeLineID].description,
        lineColor: lineMetadata[playtimeLineID].color,
        min: 0,
        max: d3.max(playtimePoints, function(d) {
          return d.y;
        })
      });
    }
    if (((ref17 = this.analytics) != null ? (ref18 = ref17.levelHelps) != null ? (ref19 = ref18.data) != null ? ref19.length : void 0 : void 0 : void 0) > 0) {
      helpPoints = [];
      videoPoints = [];
      ref20 = this.analytics.levelHelps.data;
      for (i = q = 0, len7 = ref20.length; q < len7; i = ++q) {
        day = ref20[i];
        helpCount = day.alertHelps + day.paletteHelps;
        started = (ref21 = dayStartedMap[day.day]) != null ? ref21 : 0;
        clickRate = started > 0 ? helpCount / started * 100 : 0;
        videoRate = day.videoStarts / helpCount * 100;
        helpPoints.push({
          x: i,
          y: clickRate,
          day: day.day.slice(0, 4) + "-" + day.day.slice(4, 6) + "-" + day.day.slice(6, 8),
          pointID: "" + helpsLineID + i,
          values: ["Helps clicked: " + helpCount, "Helps click clickRate: " + (clickRate.toFixed(2)) + "%"]
        });
        videoPoints.push({
          x: i,
          y: videoRate,
          day: day.day.slice(0, 4) + "-" + day.day.slice(4, 6) + "-" + day.day.slice(6, 8),
          pointID: "" + videosLineID + i,
          values: ["Help videos started: " + day.videoStarts, "Help videos start rate: " + (videoRate.toFixed(2)) + "%"]
        });
      }
      for (i = r = 0, len8 = days.length; r < len8; i = ++r) {
        day = days[i];
        if (helpPoints.length <= i || helpPoints[i].day !== day) {
          helpPoints.splice(i, 0, {
            y: 0.0,
            day: day,
            values: []
          });
        }
        helpPoints[i].x = i;
        helpPoints[i].pointID = "" + helpsLineID + i;
        if (videoPoints.length <= i || videoPoints[i].day !== day) {
          videoPoints.splice(i, 0, {
            y: 0.0,
            day: day,
            values: []
          });
        }
        videoPoints[i].x = i;
        videoPoints[i].pointID = "" + videosLineID + i;
      }
      if (d3.max(helpPoints, function(d) {
        return d.y;
      }) > 0) {
        this.analytics.graphs[0].lines.push({
          lineID: helpsLineID,
          enabled: true,
          points: helpPoints,
          description: lineMetadata[helpsLineID].description,
          lineColor: lineMetadata[helpsLineID].color,
          min: 0,
          max: 100.0
        });
      }
      if (d3.max(videoPoints, function(d) {
        return d.y;
      }) > 0) {
        return this.analytics.graphs[0].lines.push({
          lineID: videosLineID,
          enabled: true,
          points: videoPoints,
          description: lineMetadata[videosLineID].description,
          lineColor: lineMetadata[videosLineID].color,
          min: 0,
          max: 100.0
        });
      }
    }
  };

  CampaignLevelView.prototype.updateAnalyticsGraphs = function() {
    var containerHeight, containerSelector, containerWidth, currentLine, d3line, endDay, graph, graphLineCount, height, j, keyHeight, len, line, margin, ref, ref1, ref2, results, startDay, svg, width, xAxis, xAxisHeight, xAxisRange, xRange, yAxis, yAxisRange, yAxisWidth, yRange;
    if (!(((ref = this.analytics) != null ? (ref1 = ref.graphs) != null ? ref1.length : void 0 : void 0) > 0)) {
      return;
    }
    containerSelector = '.line-graph-container';
    margin = 20;
    keyHeight = 20;
    xAxisHeight = 20;
    yAxisWidth = 40;
    containerWidth = $(containerSelector).width();
    containerHeight = $(containerSelector).height();
    ref2 = this.analytics.graphs;
    results = [];
    for (j = 0, len = ref2.length; j < len; j++) {
      graph = ref2[j];
      graphLineCount = _.reduce(graph.lines, (function(sum, item) {
        if (item.enabled) {
          return sum + 1;
        } else {
          return sum;
        }
      }), 0);
      svg = d3.select(containerSelector).append("svg").attr("width", containerWidth).attr("height", containerHeight);
      width = containerWidth - margin * 2 - yAxisWidth * graphLineCount;
      height = containerHeight - margin * 2 - xAxisHeight - keyHeight * graphLineCount;
      currentLine = 0;
      results.push((function() {
        var k, len1, ref3, results1;
        ref3 = graph.lines;
        results1 = [];
        for (k = 0, len1 = ref3.length; k < len1; k++) {
          line = ref3[k];
          if (!line.enabled) {
            continue;
          }
          xRange = d3.scale.linear().range([0, width]).domain([
            d3.min(line.points, function(d) {
              return d.x;
            }), d3.max(line.points, function(d) {
              return d.x;
            })
          ]);
          yRange = d3.scale.linear().range([height, 0]).domain([line.min, line.max]);
          if (currentLine === 0) {
            startDay = new Date(line.points[0].day);
            endDay = new Date(line.points[line.points.length - 1].day);
            xAxisRange = d3.time.scale().domain([startDay, endDay]).range([0, width]);
            xAxis = d3.svg.axis().scale(xAxisRange);
            svg.append("g").attr("class", "x axis").call(xAxis).selectAll("text").attr("dy", ".35em").attr("transform", "translate(" + (margin + yAxisWidth * (graphLineCount - 1)) + "," + (height + margin) + ")").style("text-anchor", "start");
            svg.selectAll(".line").data([10, 30, 50, 70, 90]).enter().append("line").attr("x1", margin + yAxisWidth * graphLineCount).attr("y1", function(d) {
              return margin + yRange(d);
            }).attr("x2", margin + yAxisWidth * graphLineCount + width).attr("y2", function(d) {
              return margin + yRange(d);
            }).attr("stroke", line.lineColor).style("opacity", "0.5");
          }
          yAxisRange = d3.scale.linear().range([height, 0]).domain([line.min, line.max]);
          yAxis = d3.svg.axis().scale(yRange).orient("left");
          svg.append("g").attr("class", "y axis").attr("transform", "translate(" + (margin + yAxisWidth * currentLine) + "," + margin + ")").style("color", line.lineColor).call(yAxis).selectAll("text").attr("y", 0).attr("x", 0).attr("fill", line.lineColor).style("text-anchor", "start");
          svg.append("line").attr("x1", margin).attr("y1", margin + height + xAxisHeight + keyHeight * currentLine + keyHeight / 2).attr("x2", margin + 40).attr("y2", margin + height + xAxisHeight + keyHeight * currentLine + keyHeight / 2).attr("stroke", line.lineColor).attr("class", "key-line");
          svg.append("text").attr("x", margin + 40 + 10).attr("y", margin + height + xAxisHeight + keyHeight * currentLine + (keyHeight + 10) / 2).attr("fill", line.lineColor).attr("class", "key-text").text(line.description);
          svg.selectAll(".circle").data(line.points).enter().append("circle").attr("transform", "translate(" + (margin + yAxisWidth * graphLineCount) + "," + margin + ")").attr("cx", function(d) {
            return xRange(d.x);
          }).attr("cy", function(d) {
            return yRange(d.y);
          }).attr("r", function(d) {
            if (d.started) {
              return Math.max(3, Math.min(10, Math.log(parseInt(d.started)))) + 2;
            } else {
              return 6;
            }
          }).attr("fill", line.lineColor).attr("stroke-width", 1).attr("class", "graph-point").attr("data-pointid", function(d) {
            return "" + line.lineID + d.x;
          });
          d3line = d3.svg.line().x(function(d) {
            return xRange(d.x);
          }).y(function(d) {
            return yRange(d.y);
          }).interpolate("linear");
          svg.append("path").attr("d", d3line(line.points)).attr("transform", "translate(" + (margin + yAxisWidth * graphLineCount) + "," + margin + ")").style("stroke-width", 1).style("stroke", line.lineColor).style("fill", "none");
          results1.push(currentLine++);
        }
        return results1;
      })());
    }
    return results;
  };

  CampaignLevelView.prototype.getAnalytics = function(startDay, endDay) {
    var endDayDashed, makeFinishDataFetch, startDayDashed;
    if (startDay != null) {
      startDayDashed = startDay;
      startDay = startDay.replace(/-/g, '');
    } else {
      startDay = utils.getUTCDay(-14);
      startDayDashed = startDay.slice(0, 4) + "-" + startDay.slice(4, 6) + "-" + startDay.slice(6, 8);
    }
    if (endDay != null) {
      endDayDashed = endDay;
      endDay = endDay.replace(/-/g, '');
    } else {
      endDay = utils.getUTCDay(-1);
      endDayDashed = endDay.slice(0, 4) + "-" + endDay.slice(4, 6) + "-" + endDay.slice(6, 8);
    }
    this.analytics = {
      startDay: startDayDashed,
      endDay: endDayDashed,
      commonProblems: {
        data: [],
        loading: true
      },
      levelCompletions: {
        data: [],
        loading: true
      },
      levelHelps: {
        data: [],
        loading: true
      },
      levelPlaytimes: {
        data: [],
        loading: true
      },
      recentSessions: {
        data: [],
        loading: true
      },
      graphs: []
    };
    this.render();
    makeFinishDataFetch = (function(_this) {
      return function(data) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          _this.updateAnalyticsGraphData();
          data.loading = false;
          return _this.render();
        };
      };
    })(this);
    this.getCommonLevelProblems(startDayDashed, endDayDashed, makeFinishDataFetch(this.analytics.commonProblems));
    this.getLevelCompletions(startDay, endDay, makeFinishDataFetch(this.analytics.levelCompletions));
    this.getLevelHelps(startDay, endDay, makeFinishDataFetch(this.analytics.levelHelps));
    this.getLevelPlaytimes(startDayDashed, endDayDashed, makeFinishDataFetch(this.analytics.levelPlaytimes));
    return this.getRecentSessions(makeFinishDataFetch(this.analytics.recentSessions));
  };

  CampaignLevelView.prototype.getCommonLevelProblems = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        if (_this.destroyed) {
          return doneCallback();
        }
        _this.analytics.commonProblems.data = data;
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('common_problems', {
      url: '/db/user.code.problem/-/common_problems',
      data: {
        startDay: startDay,
        endDay: endDay,
        slug: this.levelSlug
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignLevelView.prototype.getLevelCompletions = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        var mapFn;
        if (_this.destroyed) {
          return doneCallback();
        }
        data.sort(function(a, b) {
          if (a.created < b.created) {
            return -1;
          } else {
            return 1;
          }
        });
        mapFn = function(item) {
          item.rate = item.started > 0 ? item.finished / item.started * 100 : 0;
          return item;
        };
        _this.analytics.levelCompletions.data = _.map(data, mapFn, _this);
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('level_completions', {
      url: '/db/analytics_perday/-/level_completions',
      data: {
        startDay: startDay,
        endDay: endDay,
        slug: this.levelSlug
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignLevelView.prototype.getLevelHelps = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        if (_this.destroyed) {
          return doneCallback();
        }
        _this.analytics.levelHelps.data = data.sort(function(a, b) {
          if (a.day < b.day) {
            return -1;
          } else {
            return 1;
          }
        });
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('level_helps', {
      url: '/db/analytics_perday/-/level_helps',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: [this.levelSlug]
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignLevelView.prototype.getLevelPlaytimes = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        if (_this.destroyed) {
          return doneCallback();
        }
        _this.analytics.levelPlaytimes.data = data.sort(function(a, b) {
          if (a.created < b.created) {
            return -1;
          } else {
            return 1;
          }
        });
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('playtime_averages', {
      url: '/db/level/-/playtime_averages',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: [this.levelSlug]
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignLevelView.prototype.getRecentSessions = function(doneCallback) {
    var limit, request, success;
    limit = 100;
    success = (function(_this) {
      return function(data) {
        if (_this.destroyed) {
          return doneCallback();
        }
        _this.analytics.recentSessions.data = data;
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('level_sessions_recent', {
      url: "/db/level.session/-/recent",
      data: {
        slug: this.levelSlug,
        limit: limit
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  return CampaignLevelView;

})(CocoView);
});

;require.register("views/editor/campaign/SaveCampaignModal", function(exports, require, module) {
var DeltaView, ModalView, SaveCampaignModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/campaign/save-campaign-modal');

DeltaView = require('views/editor/DeltaView');

module.exports = SaveCampaignModal = (function(superClass) {
  extend(SaveCampaignModal, superClass);

  SaveCampaignModal.prototype.id = 'save-campaign-modal';

  SaveCampaignModal.prototype.template = template;

  SaveCampaignModal.prototype.plain = true;

  SaveCampaignModal.prototype.events = {
    'click #save-button': 'onClickSaveButton'
  };

  function SaveCampaignModal(options, modelsToSave) {
    this.modelsToSave = modelsToSave;
    SaveCampaignModal.__super__.constructor.call(this, options);
  }

  SaveCampaignModal.prototype.afterRender = function() {
    this.$el.find('.delta-view').each((function(_this) {
      return function(i, el) {
        var $el, deltaView, model;
        $el = $(el);
        model = _this.modelsToSave.find({
          id: $el.data('model-id')
        });
        deltaView = new DeltaView({
          model: model
        });
        return _this.insertSubView(deltaView, $el);
      };
    })(this));
    return SaveCampaignModal.__super__.afterRender.call(this);
  };

  SaveCampaignModal.prototype.onClickSaveButton = function() {
    var model, modelsBeingSaved;
    this.showLoading();
    this.reverseLevelsBeforeSave();
    modelsBeingSaved = (function() {
      var j, len, ref, results;
      ref = this.modelsToSave.models;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        model = ref[j];
        results.push(model.patch());
      }
      return results;
    }).call(this);
    return $.when.apply($, _.compact(modelsBeingSaved)).done(function() {
      return document.location.reload();
    });
  };

  SaveCampaignModal.prototype.reverseLevelsBeforeSave = function() {
    var campaign, j, len, levelID, levelIDs, levels, levelsReversed, results;
    if (!(campaign = _.find(this.modelsToSave.models, function(m) {
      return m.constructor.className === 'Campaign';
    }))) {
      return;
    }
    levelsReversed = {};
    levels = campaign.get('levels');
    levelIDs = _.keys(levels).reverse();
    results = [];
    for (j = 0, len = levelIDs.length; j < len; j++) {
      levelID = levelIDs[j];
      levelsReversed[levelID] = levels[levelID];
      results.push(campaign.set('levels', levelsReversed));
    }
    return results;
  };

  return SaveCampaignModal;

})(ModalView);
});

;require.register("views/editor/component/AddThangComponentsModal", function(exports, require, module) {
var CocoCollection, LevelComponent, ModalView, UnnamedView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ModalView = require('views/core/ModalView');

template = require('templates/editor/component/add-thang-components-modal');

CocoCollection = require('collections/CocoCollection');

LevelComponent = require('models/LevelComponent');

module.exports = UnnamedView = (function(superClass) {
  extend(UnnamedView, superClass);

  function UnnamedView() {
    return UnnamedView.__super__.constructor.apply(this, arguments);
  }

  UnnamedView.prototype.id = 'add-thang-components-modal';

  UnnamedView.prototype.template = template;

  UnnamedView.prototype.plain = true;

  UnnamedView.prototype.modalWidthPercent = 80;

  UnnamedView.prototype.events = {
    'click .footer button': 'onDonePressed'
  };

  UnnamedView.prototype.initialize = function(options) {
    UnnamedView.__super__.initialize.call(this);
    this.skipOriginals = options.skipOriginals || [];
    this.components = new CocoCollection([], {
      model: LevelComponent
    });
    this.components.url = "/db/level.component?term=&project=name,system,original,version,description";
    return this.supermodel.loadCollection(this.components, 'components');
  };

  UnnamedView.prototype.getRenderData = function() {
    var c, comp, componentList, ref, system;
    c = UnnamedView.__super__.getRenderData.call(this);
    c.components = (function() {
      var i, len, ref, ref1, results;
      ref = this.components.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        comp = ref[i];
        if (!(ref1 = comp.get('original'), indexOf.call(this.skipOriginals, ref1) >= 0)) {
          results.push(comp);
        }
      }
      return results;
    }).call(this);
    c.components = _.groupBy(c.components, function(comp) {
      return comp.get('system');
    });
    c.nameLists = {};
    ref = c.components;
    for (system in ref) {
      componentList = ref[system];
      c.components[system] = _.sortBy(componentList, function(comp) {
        return comp.get('name');
      });
      c.nameLists[system] = ((function() {
        var i, len, ref1, results;
        ref1 = c.components[system];
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          comp = ref1[i];
          results.push(comp.get('name'));
        }
        return results;
      })()).join(', ');
    }
    c.systems = _.keys(c.components);
    c.systems.sort();
    return c;
  };

  UnnamedView.prototype.getSelectedComponents = function() {
    var c, components, el, selected, vals;
    selected = this.$el.find('input[type="checkbox"]:checked');
    vals = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = selected.length; i < len; i++) {
        el = selected[i];
        results.push($(el).val());
      }
      return results;
    })();
    components = (function() {
      var i, len, ref, ref1, results;
      ref = this.components.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        if (ref1 = c.id, indexOf.call(vals, ref1) >= 0) {
          results.push(c);
        }
      }
      return results;
    }).call(this);
    return components;
  };

  return UnnamedView;

})(ModalView);
});

;require.register("views/editor/component/ComponentVersionsModal", function(exports, require, module) {
var ComponentVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = ComponentVersionsModal = (function(superClass) {
  extend(ComponentVersionsModal, superClass);

  ComponentVersionsModal.prototype.id = 'editor-component-versions-view';

  ComponentVersionsModal.prototype.url = '/db/level.component/';

  ComponentVersionsModal.prototype.page = 'component';

  function ComponentVersionsModal(options, ID) {
    this.ID = ID;
    ComponentVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/LevelComponent'));
  }

  return ComponentVersionsModal;

})(VersionsModal);
});

;require.register("views/editor/component/ThangComponentConfigView", function(exports, require, module) {
var CocoView, ComponentConfigNode, Level, LevelComponent, SolutionsNode, ThangComponentConfigView, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/component/thang-component-config-view');

Level = require('models/Level');

LevelComponent = require('models/LevelComponent');

nodes = require('../level/treema_nodes');

require('vendor/treema');

module.exports = ThangComponentConfigView = (function(superClass) {
  extend(ThangComponentConfigView, superClass);

  ThangComponentConfigView.prototype.className = 'thang-component-config-view';

  ThangComponentConfigView.prototype.template = template;

  ThangComponentConfigView.prototype.changed = false;

  function ThangComponentConfigView(options) {
    this.onConfigEdited = bind(this.onConfigEdited, this);
    ThangComponentConfigView.__super__.constructor.call(this, options);
    this.component = options.component;
    this.config = options.config || {};
    this.additionalDefaults = options.additionalDefaults;
    this.isDefaultComponent = false;
    this.world = options.world;
    this.level = options.level;
    this.callback = options.callback;
  }

  ThangComponentConfigView.prototype.afterRender = function() {
    ThangComponentConfigView.__super__.afterRender.call(this);
    return this.buildTreema();
  };

  ThangComponentConfigView.prototype.setConfig = function(config) {
    this.handlingChange = true;
    this.editThangTreema.set('/', config);
    return this.handlingChange = false;
  };

  ThangComponentConfigView.prototype.setIsDefaultComponent = function(isDefaultComponent) {
    var changed;
    changed = this.isDefaultComponent !== isDefaultComponent;
    if (isDefaultComponent) {
      this.config = void 0;
    }
    this.isDefaultComponent = isDefaultComponent;
    if (changed) {
      return this.render();
    }
  };

  ThangComponentConfigView.prototype.buildTreema = function() {
    var ref, schema, superteams, teams, thangIDs, thangs, treemaOptions;
    thangs = this.level != null ? this.level.get('thangs') : [];
    thangIDs = _.filter(_.pluck(thangs, 'id'));
    teams = _.filter(_.pluck(thangs, 'team'));
    superteams = _.filter(_.pluck(thangs, 'superteam'));
    superteams = _.union(teams, superteams);
    schema = $.extend(true, {}, this.component.get('configSchema'));
    if (schema["default"] == null) {
      schema["default"] = {};
    }
    if (this.additionalDefaults) {
      _.merge(schema["default"], this.additionalDefaults);
    }
    if ((ref = this.level) != null ? ref.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev') : void 0) {
      schema.required = [];
    }
    treemaOptions = {
      supermodel: this.supermodel,
      schema: schema,
      data: this.config,
      callbacks: {
        change: this.onConfigEdited
      },
      world: this.world,
      view: this,
      thangIDs: thangIDs,
      teams: teams,
      superteams: superteams,
      nodeClasses: {
        object: ComponentConfigNode,
        'point2d': nodes.WorldPointNode,
        'viewport': nodes.WorldViewportNode,
        'bounds': nodes.WorldBoundsNode,
        'radians': nodes.RadiansNode,
        'team': nodes.TeamNode,
        'superteam': nodes.SuperteamNode,
        'meters': nodes.MetersNode,
        'kilograms': nodes.KilogramsNode,
        'seconds': nodes.SecondsNode,
        'speed': nodes.SpeedNode,
        'acceleration': nodes.AccelerationNode,
        'thang-type': nodes.ThangTypeNode,
        'item-thang-type': nodes.ItemThangTypeNode,
        'solutions': SolutionsNode
      }
    };
    this.editThangTreema = this.$el.find('.treema').treema(treemaOptions);
    this.editThangTreema.build();
    this.editThangTreema.open(2);
    if (_.isEqual(this.editThangTreema.data, {}) && !this.editThangTreema.canAddChild()) {
      return this.$el.find('.panel-body').hide();
    }
  };

  ThangComponentConfigView.prototype.onConfigEdited = function() {
    if (this.destroyed || this.handlingChange) {
      return;
    }
    this.config = this.data();
    this.changed = true;
    return this.trigger('changed', {
      component: this.component,
      config: this.config
    });
  };

  ThangComponentConfigView.prototype.data = function() {
    return this.editThangTreema.data;
  };

  ThangComponentConfigView.prototype.destroy = function() {
    var ref;
    if ((ref = this.editThangTreema) != null) {
      ref.destroy();
    }
    return ThangComponentConfigView.__super__.destroy.call(this);
  };

  return ThangComponentConfigView;

})(CocoView);

ComponentConfigNode = (function(superClass) {
  extend(ComponentConfigNode, superClass);

  function ComponentConfigNode() {
    return ComponentConfigNode.__super__.constructor.apply(this, arguments);
  }

  ComponentConfigNode.prototype.nodeDescription = 'Component Property';

  return ComponentConfigNode;

})(TreemaObjectNode);

SolutionsNode = (function(superClass) {
  extend(SolutionsNode, superClass);

  function SolutionsNode() {
    this.onClickFillDefaults = bind(this.onClickFillDefaults, this);
    return SolutionsNode.__super__.constructor.apply(this, arguments);
  }

  SolutionsNode.prototype.buildValueForDisplay = function(valEl, data) {
    var btn;
    btn = $('<button class="btn btn-default btn-xs">Fill defaults</button>');
    btn.on('click', this.onClickFillDefaults);
    return valEl.append(btn);
  };

  SolutionsNode.prototype.onClickFillDefaults = function(e) {
    var i, language, len, ref, solution, solutions, source, sources;
    e.preventDefault();
    sources = {
      javascript: this.parent.data.source
    };
    _.extend(sources, this.parent.data.languages || {});
    solutions = _.clone(this.data);
    solutions = _.filter(solutions, function(solution) {
      return !_.isEmpty(solution);
    });
    ref = _.keys(sources);
    for (i = 0, len = ref.length; i < len; i++) {
      language = ref[i];
      source = sources[language];
      solution = _.findWhere(solutions, {
        language: language
      });
      if (solution) {
        continue;
      }
      solutions.push({
        source: source,
        language: language,
        succeeds: true
      });
    }
    return this.set('/', solutions);
  };

  return SolutionsNode;

})(TreemaArrayNode);
});

;require.register("views/editor/component/ThangComponentsEditView", function(exports, require, module) {
var AddThangComponentsModal, CocoCollection, CocoView, DEFAULT_COMPONENTS, LC, Level, LevelComponent, LevelComponents, LevelSystem, ThangComponentConfigView, ThangComponentsEditView, ThangComponentsObjectNode, ThangType, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/component/thang-components-edit-view');

Level = require('models/Level');

LevelComponent = require('models/LevelComponent');

LevelSystem = require('models/LevelSystem');

LevelComponents = require('collections/LevelComponents');

ThangComponentConfigView = require('./ThangComponentConfigView');

AddThangComponentsModal = require('./AddThangComponentsModal');

nodes = require('../level/treema_nodes');

require('vendor/treema');

ThangType = require('models/ThangType');

CocoCollection = require('collections/CocoCollection');

LC = function(componentName, config) {
  return {
    original: LevelComponent[componentName + 'ID'],
    majorVersion: 0,
    config: config
  };
};

DEFAULT_COMPONENTS = {
  Unit: [LC('Equips'), LC('FindsPaths')],
  Hero: [LC('Equips'), LC('FindsPaths')],
  Floor: [
    LC('Exists', {
      stateless: true
    }), LC('Physical', {
      width: 20,
      height: 17,
      depth: 2,
      shape: 'sheet',
      pos: {
        x: 10,
        y: 8.5,
        z: 1
      }
    }), LC('Land')
  ],
  Wall: [
    LC('Exists', {
      stateless: true
    }), LC('Physical', {
      width: 4,
      height: 4,
      depth: 12,
      shape: 'box',
      pos: {
        x: 2,
        y: 2,
        z: 6
      }
    }), LC('Collides', {
      collisionType: 'static',
      collisionCategory: 'obstacles',
      mass: 1000,
      fixedRotation: true,
      restitution: 1
    })
  ],
  Doodad: [
    LC('Exists', {
      stateless: true
    }), LC('Physical'), LC('Collides', {
      collisionType: 'static',
      fixedRotation: true
    })
  ],
  Misc: [LC('Exists'), LC('Physical')],
  Mark: [],
  Item: [LC('Item')],
  Missile: [LC('Missile')]
};

module.exports = ThangComponentsEditView = (function(superClass) {
  extend(ThangComponentsEditView, superClass);

  ThangComponentsEditView.prototype.id = 'thang-components-edit-view';

  ThangComponentsEditView.prototype.template = template;

  ThangComponentsEditView.prototype.subscriptions = {
    'editor:thang-type-kind-changed': 'onThangTypeKindChanged'
  };

  ThangComponentsEditView.prototype.events = {
    'click #add-components-button': 'onAddComponentsButtonClicked'
  };

  function ThangComponentsEditView(options) {
    this.onChangeExtantComponents = bind(this.onChangeExtantComponents, this);
    this.onSelectComponent = bind(this.onSelectComponent, this);
    this.onComponentsChanged = bind(this.onComponentsChanged, this);
    this.onComponentsTreemaChanged = bind(this.onComponentsTreemaChanged, this);
    ThangComponentsEditView.__super__.constructor.call(this, options);
    this.originalsLoaded = {};
    this.components = options.components || [];
    this.components = $.extend(true, [], this.components);
    this.setThangType(options.thangType);
    this.lastComponentLength = this.components.length;
    this.world = options.world;
    this.level = options.level;
    this.loadComponents(this.components);
  }

  ThangComponentsEditView.prototype.setThangType = function(thangType) {
    var componentRefs, ref;
    this.thangType = thangType;
    if (!(componentRefs = (ref = this.thangType) != null ? ref.get('components') : void 0)) {
      return;
    }
    return this.loadComponents(componentRefs);
  };

  ThangComponentsEditView.prototype.loadComponents = function(components) {
    var componentRef, i, len, levelComponent, resource, results, url;
    results = [];
    for (i = 0, len = components.length; i < len; i++) {
      componentRef = components[i];
      if (this.originalsLoaded[componentRef.original]) {
        continue;
      }
      this.originalsLoaded[componentRef.original] = componentRef.original;
      levelComponent = new LevelComponent(componentRef);
      url = "/db/level.component/" + componentRef.original + "/version/" + componentRef.majorVersion;
      levelComponent.setURL(url);
      resource = this.supermodel.loadModel(levelComponent);
      if (!resource.isLoading) {
        continue;
      }
      results.push(this.listenToOnce(resource, 'loaded', function() {
        if (this.handlingChange) {
          return;
        }
        this.handlingChange = true;
        this.onComponentsAdded();
        return this.handlingChange = false;
      }));
    }
    return results;
  };

  ThangComponentsEditView.prototype.afterRender = function() {
    ThangComponentsEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.buildComponentsTreema();
    return this.addThangComponentConfigViews();
  };

  ThangComponentsEditView.prototype.buildComponentsTreema = function() {
    var c, components, defaultValue, ref, thangTypeComponents, treemaOptions;
    components = _.zipObject((function() {
      var i, len, ref, results;
      ref = this.components;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.original);
      }
      return results;
    }).call(this), this.components);
    defaultValue = void 0;
    if (thangTypeComponents = (ref = this.thangType) != null ? ref.get('components', true) : void 0) {
      defaultValue = _.zipObject((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = thangTypeComponents.length; i < len; i++) {
          c = thangTypeComponents[i];
          results.push(c.original);
        }
        return results;
      })(), thangTypeComponents);
    }
    treemaOptions = {
      supermodel: this.supermodel,
      schema: {
        type: 'object',
        "default": defaultValue,
        additionalProperties: Level.schema.properties.thangs.items.properties.components.items
      },
      data: $.extend(true, {}, components),
      callbacks: {
        select: this.onSelectComponent,
        change: this.onComponentsTreemaChanged
      },
      nodeClasses: {
        'object': ThangComponentsObjectNode
      }
    };
    this.componentsTreema = this.$el.find('#thang-components-column .treema').treema(treemaOptions);
    return this.componentsTreema.build();
  };

  ThangComponentsEditView.prototype.onComponentsTreemaChanged = function() {
    var component, componentMap, i, j, len, len1, newComponentsList, ref, ref1;
    if (this.handlingChange) {
      return;
    }
    this.handlingChange = true;
    componentMap = {};
    ref = this.components;
    for (i = 0, len = ref.length; i < len; i++) {
      component = ref[i];
      componentMap[component.original] = component;
    }
    newComponentsList = [];
    ref1 = _.values(this.componentsTreema.data);
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      component = ref1[j];
      newComponentsList.push(componentMap[component.original] || component);
    }
    this.components = newComponentsList;
    this.onComponentsChanged();
    return this.handlingChange = false;
  };

  ThangComponentsEditView.prototype.onComponentsChanged = function() {
    if (this.components.length < this.lastComponentLength) {
      this.onComponentsRemoved();
    }
    return this.onComponentsAdded();
  };

  ThangComponentsEditView.prototype.onComponentsRemoved = function() {
    var component, componentMap, componentModel, componentRef, dependency, i, j, k, l, len, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, ref4, removedSomething, subview, thangComponentMap, thangTypeComponent, thangTypeComponents;
    componentMap = {};
    ref = this.components;
    for (i = 0, len = ref.length; i < len; i++) {
      component = ref[i];
      componentMap[component.original] = component;
    }
    thangComponentMap = {};
    if (thangTypeComponents = (ref1 = this.thangType) != null ? ref1.get('components') : void 0) {
      for (j = 0, len1 = thangTypeComponents.length; j < len1; j++) {
        thangTypeComponent = thangTypeComponents[j];
        thangComponentMap[thangTypeComponent.original] = thangTypeComponent;
      }
    }
    while (true) {
      removedSomething = false;
      ref2 = _.values(componentMap);
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        componentRef = ref2[k];
        componentModel = this.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, componentRef.original, componentRef.majorVersion);
        ref3 = componentModel.get('dependencies') || [];
        for (l = 0, len3 = ref3.length; l < len3; l++) {
          dependency = ref3[l];
          if (!(componentMap[dependency.original] || thangComponentMap[dependency.original])) {
            delete componentMap[componentRef.original];
            component = this.supermodel.getModelByOriginal(LevelComponent, componentRef.original);
            noty({
              text: "Removed dependent component: " + (component.get('name')),
              layout: 'topCenter',
              timeout: 5000,
              type: 'information'
            });
            removedSomething = true;
          }
        }
        if (removedSomething) {
          break;
        }
      }
      if (!removedSomething) {
        break;
      }
    }
    this.components = _.values(componentMap);
    ref4 = _.values(this.subviews);
    for (m = 0, len4 = ref4.length; m < len4; m++) {
      subview = ref4[m];
      if (!(subview instanceof ThangComponentConfigView)) {
        continue;
      }
      if (!(componentMap[subview.component.get('original')] || thangComponentMap[subview.component.get('original')])) {
        this.removeSubView(subview);
      }
    }
    this.updateComponentsList();
    return this.reportChanges();
  };

  ThangComponentsEditView.prototype.updateComponentsList = function() {
    return this.buildComponentsTreema();
  };

  ThangComponentsEditView.prototype.onComponentsAdded = function() {
    var addedSomething, component, componentMap, componentModel, componentRef, dependency, i, j, k, l, len, len1, len2, len3, ref, ref1, ref2, ref3, thangTypeComponent, thangTypeComponents;
    if (!this.componentsTreema) {
      return;
    }
    componentMap = {};
    ref = this.components;
    for (i = 0, len = ref.length; i < len; i++) {
      component = ref[i];
      componentMap[component.original] = component;
    }
    if (thangTypeComponents = (ref1 = this.thangType) != null ? ref1.get('components') : void 0) {
      for (j = 0, len1 = thangTypeComponents.length; j < len1; j++) {
        thangTypeComponent = thangTypeComponents[j];
        componentMap[thangTypeComponent.original] = thangTypeComponent;
      }
    }
    while (true) {
      addedSomething = false;
      ref2 = _.values(componentMap);
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        componentRef = ref2[k];
        componentModel = this.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, componentRef.original, componentRef.majorVersion);
        if (!(componentModel != null ? componentModel.loaded : void 0)) {
          this.loadComponents([componentRef]);
          continue;
        }
        ref3 = (componentModel != null ? componentModel.get('dependencies') : void 0) || [];
        for (l = 0, len3 = ref3.length; l < len3; l++) {
          dependency = ref3[l];
          if (!componentMap[dependency.original]) {
            component = this.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, dependency.original, dependency.majorVersion);
            if (!(component != null ? component.loaded : void 0)) {
              this.loadComponents([dependency]);
            } else {
              addedSomething = true;
              noty({
                text: "Added dependency: " + (component.get('name')),
                layout: 'topCenter',
                timeout: 5000,
                type: 'information'
              });
              componentMap[dependency.original] = dependency;
              this.components.push(dependency);
            }
          }
        }
      }
      if (!addedSomething) {
        break;
      }
    }
    this.updateComponentsList();
    this.addThangComponentConfigViews();
    this.checkForMissingSystems();
    return this.reportChanges();
  };

  ThangComponentsEditView.prototype.addThangComponentConfigViews = function() {
    var c, componentConfigViews, componentRef, componentRefs, configsEl, i, j, k, len, len1, len2, modifiedRef, ref, ref1, ref2, results, subview, thangComponentRefs, thangTypeComponent, thangTypeComponents;
    componentConfigViews = {};
    ref = _.values(this.subviews);
    for (i = 0, len = ref.length; i < len; i++) {
      subview = ref[i];
      if (!(subview instanceof ThangComponentConfigView)) {
        continue;
      }
      componentConfigViews[subview.component.get('original')] = subview;
      subview.$el.detach();
    }
    configsEl = this.$el.find('#thang-component-configs');
    componentRefs = _.merge({}, this.componentsTreema.data);
    if (thangTypeComponents = (ref1 = this.thangType) != null ? ref1.get('components') : void 0) {
      thangComponentRefs = _.zipObject((function() {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = thangTypeComponents.length; j < len1; j++) {
          c = thangTypeComponents[j];
          results.push(c.original);
        }
        return results;
      })(), thangTypeComponents);
      for (j = 0, len1 = thangTypeComponents.length; j < len1; j++) {
        thangTypeComponent = thangTypeComponents[j];
        if (componentRef = componentRefs[thangTypeComponent.original]) {
          componentRef.additionalDefaults = thangTypeComponent.config;
        } else {
          modifiedRef = _.merge({}, thangTypeComponent);
          modifiedRef.additionalDefaults = modifiedRef.config;
          delete modifiedRef.config;
          componentRefs[thangTypeComponent.original] = modifiedRef;
        }
      }
    }
    ref2 = _.values(componentRefs);
    results = [];
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      componentRef = ref2[k];
      subview = componentConfigViews[componentRef.original];
      if (!subview) {
        subview = this.makeThangComponentConfigView(componentRef);
        if (!subview) {
          continue;
        }
        this.registerSubView(subview);
      }
      subview.setIsDefaultComponent(!this.componentsTreema.data[componentRef.original]);
      results.push(configsEl.append(subview.$el));
    }
    return results;
  };

  ThangComponentsEditView.prototype.makeThangComponentConfigView = function(thangComponent) {
    var component, config, configView, ref;
    component = this.supermodel.getModelByOriginal(LevelComponent, thangComponent.original);
    if (!(component != null ? component.loaded : void 0)) {
      return;
    }
    config = (ref = thangComponent.config) != null ? ref : {};
    configView = new ThangComponentConfigView({
      supermodel: this.supermodel,
      level: this.level,
      world: this.world,
      config: config,
      component: component,
      additionalDefaults: thangComponent.additionalDefaults
    });
    configView.render();
    this.listenTo(configView, 'changed', this.onConfigChanged);
    return configView;
  };

  ThangComponentsEditView.prototype.onConfigChanged = function(e) {
    var foundComponent, i, j, len, len1, ref, ref1, subview, thangComponent;
    foundComponent = false;
    ref = this.components;
    for (i = 0, len = ref.length; i < len; i++) {
      thangComponent = ref[i];
      if (thangComponent.original === e.component.get('original')) {
        thangComponent.config = e.config;
        foundComponent = true;
        break;
      }
    }
    if (!foundComponent) {
      this.components.push({
        original: e.component.get('original'),
        majorVersion: e.component.get('version').major,
        config: e.config
      });
      ref1 = _.values(this.subviews);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        subview = ref1[j];
        if (!(subview instanceof ThangComponentConfigView)) {
          continue;
        }
        if (subview.component.get('original') === e.component.get('original')) {
          _.defer(function() {
            return subview.setIsDefaultComponent(false);
          });
          break;
        }
      }
    }
    this.updateComponentsList();
    return this.reportChanges();
  };

  ThangComponentsEditView.prototype.onSelectComponent = function(e, nodes) {
    var child, componentOriginal, componentsToCheck, dependency, dependents, i, j, k, l, len, len1, len2, len3, otherComponent, otherComponentRef, ref, ref1, ref2, ref3, results, subview;
    this.componentsTreema.$el.find('.dependent').removeClass('dependent');
    this.$el.find('.selected-component').removeClass('selected-component');
    if (nodes.length !== 1) {
      return;
    }
    dependents = {};
    dependents[nodes[0].getData().original] = true;
    componentsToCheck = [nodes[0].getData().original];
    while (componentsToCheck.length) {
      componentOriginal = componentsToCheck.pop();
      ref = this.components;
      for (i = 0, len = ref.length; i < len; i++) {
        otherComponentRef = ref[i];
        if (otherComponentRef.original === componentOriginal) {
          continue;
        }
        if (dependents[otherComponentRef.original]) {
          continue;
        }
        otherComponent = this.supermodel.getModelByOriginal(LevelComponent, otherComponentRef.original);
        ref1 = otherComponent.get('dependencies', true);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          dependency = ref1[j];
          if (dependents[dependency.original]) {
            dependents[otherComponentRef.original] = true;
            componentsToCheck.push(otherComponentRef.original);
          }
        }
      }
    }
    ref2 = _.values(this.componentsTreema.childrenTreemas);
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      child = ref2[k];
      if (dependents[child.getData().original]) {
        child.$el.addClass('dependent');
      }
    }
    ref3 = _.values(this.subviews);
    results = [];
    for (l = 0, len3 = ref3.length; l < len3; l++) {
      subview = ref3[l];
      if (!(subview instanceof ThangComponentConfigView)) {
        continue;
      }
      if (subview.component.get('original') === nodes[0].getData().original) {
        subview.$el[0].scrollIntoView();
        subview.$el.addClass('selected-component');
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ThangComponentsEditView.prototype.onChangeExtantComponents = function() {
    this.buildAddComponentTreema();
    return this.reportChanges();
  };

  ThangComponentsEditView.prototype.checkForMissingSystems = function() {
    var c, componentModels, componentSystems, extantSystems, i, idx, len, results, s, sn, system;
    if (!this.level) {
      return;
    }
    extantSystems = (function() {
      var ref, results;
      ref = this.level.get('systems');
      results = [];
      for (idx in ref) {
        sn = ref[idx];
        results.push((this.supermodel.getModelByOriginalAndMajorVersion(LevelSystem, sn.original, sn.majorVersion)).attributes.name.toLowerCase());
      }
      return results;
    }).call(this);
    componentModels = (function() {
      var i, len, ref, results;
      ref = this.components;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(this.supermodel.getModelByOriginal(LevelComponent, c.original));
      }
      return results;
    }).call(this);
    componentSystems = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = componentModels.length; i < len; i++) {
        c = componentModels[i];
        if (c) {
          results.push(c.get('system'));
        }
      }
      return results;
    })();
    results = [];
    for (i = 0, len = componentSystems.length; i < len; i++) {
      system = componentSystems[i];
      if (system !== 'misc' && indexOf.call(extantSystems, system) < 0) {
        s = "Component requires system <strong>" + system + "</strong> which is currently not included in this level.";
        results.push(noty({
          text: s,
          layout: 'bottomLeft',
          type: 'warning'
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ThangComponentsEditView.prototype.reportChanges = function() {
    this.lastComponentLength = this.components.length;
    return this.trigger('components-changed', $.extend(true, [], this.components));
  };

  ThangComponentsEditView.prototype.undo = function() {
    return this.componentsTreema.undo();
  };

  ThangComponentsEditView.prototype.redo = function() {
    return this.componentsTreema.redo();
  };

  ThangComponentsEditView.prototype.onAddComponentsButtonClicked = function() {
    var c, modal;
    modal = new AddThangComponentsModal({
      skipOriginals: (function() {
        var i, len, ref, results;
        ref = this.components;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          results.push(c.original);
        }
        return results;
      }).call(this)
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hidden', function() {
      var componentsToAdd, sparseComponents;
      componentsToAdd = modal.getSelectedComponents();
      sparseComponents = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = componentsToAdd.length; i < len; i++) {
          c = componentsToAdd[i];
          results.push({
            original: c.get('original'),
            majorVersion: c.get('version').major
          });
        }
        return results;
      })();
      this.loadComponents(sparseComponents);
      this.components = this.components.concat(sparseComponents);
      return this.onComponentsChanged();
    });
  };

  ThangComponentsEditView.prototype.onThangTypeKindChanged = function(e) {
    var component, defaultComponents, i, len, results;
    if (!(defaultComponents = DEFAULT_COMPONENTS[e.kind])) {
      return;
    }
    results = [];
    for (i = 0, len = defaultComponents.length; i < len; i++) {
      component = defaultComponents[i];
      if (!(!_.find(this.components, {
        original: component.original
      }))) {
        continue;
      }
      this.components.push(component);
      results.push(this.onComponentsAdded());
    }
    return results;
  };

  ThangComponentsEditView.prototype.destroy = function() {
    var ref;
    if ((ref = this.componentsTreema) != null) {
      ref.destroy();
    }
    return ThangComponentsEditView.__super__.destroy.call(this);
  };

  return ThangComponentsEditView;

})(CocoView);

ThangComponentsObjectNode = (function(superClass) {
  extend(ThangComponentsObjectNode, superClass);

  function ThangComponentsObjectNode() {
    this.sortFunction = bind(this.sortFunction, this);
    return ThangComponentsObjectNode.__super__.constructor.apply(this, arguments);
  }

  ThangComponentsObjectNode.prototype.addNewChild = function() {
    return this.addNewChildForKey('');
  };

  ThangComponentsObjectNode.prototype.getChildren = function() {
    var children;
    children = ThangComponentsObjectNode.__super__.getChildren.apply(this, arguments);
    return children.sort(this.sortFunction);
  };

  ThangComponentsObjectNode.prototype.sortFunction = function(a, b) {
    var ref, ref1;
    a = (ref = a.value) != null ? ref : a.defaultData;
    b = (ref1 = b.value) != null ? ref1 : b.defaultData;
    a = this.settings.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, a.original, a.majorVersion);
    b = this.settings.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, b.original, b.majorVersion);
    if (!(a || b)) {
      return 0;
    }
    if (!b) {
      return 1;
    }
    if (!a) {
      return -1;
    }
    if (a.get('system') > b.get('system')) {
      return 1;
    }
    if (a.get('system') < b.get('system')) {
      return -1;
    }
    if (a.get('name') > b.get('name')) {
      return 1;
    }
    if (a.get('name') < b.get('name')) {
      return -1;
    }
    return 0;
  };

  return ThangComponentsObjectNode;

})(TreemaObjectNode);
});

;require.register("views/editor/course/CourseEditView", function(exports, require, module) {
var ConfirmModal, Course, CourseEditView, PatchesView, RootView, app, errors, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/editor/course/edit');

Course = require('models/Course');

ConfirmModal = require('views/core/ConfirmModal');

PatchesView = require('views/editor/PatchesView');

errors = require('core/errors');

app = require('core/application');

require('game-libraries');

module.exports = CourseEditView = (function(superClass) {
  extend(CourseEditView, superClass);

  CourseEditView.prototype.id = 'editor-course-edit-view';

  CourseEditView.prototype.template = template;

  CourseEditView.prototype.events = {
    'click #save-button': 'onClickSaveButton'
  };

  function CourseEditView(options, courseID) {
    this.courseID = courseID;
    CourseEditView.__super__.constructor.call(this, options);
    this.course = new Course({
      _id: this.courseID
    });
    this.course.saveBackups = true;
    this.supermodel.loadModel(this.course);
  }

  CourseEditView.prototype.onLoaded = function() {
    CourseEditView.__super__.onLoaded.call(this);
    this.buildTreema();
    return this.listenTo(this.course, 'change', (function(_this) {
      return function() {
        _this.course.updateI18NCoverage();
        return _this.treema.set('/', _this.course.attributes);
      };
    })(this));
  };

  CourseEditView.prototype.buildTreema = function() {
    var data, options, ref;
    if ((this.treema != null) || (!this.course.loaded)) {
      return;
    }
    data = $.extend(true, {}, this.course.attributes);
    options = {
      data: data,
      filePath: "db/course/" + (this.course.get('_id')),
      schema: Course.schema,
      readOnly: me.get('anonymous'),
      supermodel: this.supermodel
    };
    this.treema = this.$el.find('#course-treema').treema(options);
    this.treema.build();
    return (ref = this.treema.childrenTreemas.rewards) != null ? ref.open(3) : void 0;
  };

  CourseEditView.prototype.afterRender = function() {
    CourseEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    this.patchesView = this.insertSubView(new PatchesView(this.course), this.$el.find('.patches-view'));
    return this.patchesView.load();
  };

  CourseEditView.prototype.onClickSaveButton = function(e) {
    var key, ref, res, value;
    this.treema.endExistingEdits();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.course.set(key, value);
    }
    this.course.updateI18NCoverage();
    res = this.course.save();
    res.error((function(_this) {
      return function(collection, response, options) {
        return console.error(response);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        var url;
        url = "/editor/course/" + (_this.course.get('slug') || _this.course.id);
        return document.location.href = url;
      };
    })(this));
  };

  return CourseEditView;

})(RootView);
});

;require.register("views/editor/course/CourseSearchView", function(exports, require, module) {
var LevelSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = LevelSearchView = (function(superClass) {
  extend(LevelSearchView, superClass);

  function LevelSearchView() {
    return LevelSearchView.__super__.constructor.apply(this, arguments);
  }

  LevelSearchView.prototype.id = 'editor-course-home-view';

  LevelSearchView.prototype.modelLabel = 'Course';

  LevelSearchView.prototype.model = require('models/Course');

  LevelSearchView.prototype.modelURL = '/db/course';

  LevelSearchView.prototype.tableTemplate = require('templates/editor/course/table');

  LevelSearchView.prototype.projection = ['slug', 'name', 'description', 'watchers', 'creator'];

  LevelSearchView.prototype.page = 'course';

  LevelSearchView.prototype.canMakeNew = false;

  LevelSearchView.prototype.getRenderData = function() {
    var context;
    context = LevelSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.course_title';
    context.currentNew = 'editor.new_course_title';
    context.currentNewSignup = 'editor.new_course_title_login';
    context.currentSearch = 'editor.course_search_title';
    this.$el.i18n();
    return context;
  };

  return LevelSearchView;

})(SearchView);
});

;require.register("views/editor/docs/ComponentsDocumentationView", function(exports, require, module) {
var CocoCollection, CocoView, ComponentDocsCollection, ComponentsDocumentationView, LevelComponent, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/docs/components-documentation-view');

CocoCollection = require('collections/CocoCollection');

LevelComponent = require('models/LevelComponent');

ComponentDocsCollection = (function(superClass) {
  extend(ComponentDocsCollection, superClass);

  function ComponentDocsCollection() {
    return ComponentDocsCollection.__super__.constructor.apply(this, arguments);
  }

  ComponentDocsCollection.prototype.url = '/db/level.component?project=system,name,description,dependencies,propertyDocumentation,code';

  ComponentDocsCollection.prototype.model = LevelComponent;

  ComponentDocsCollection.prototype.comparator = 'system';

  return ComponentDocsCollection;

})(CocoCollection);

module.exports = ComponentsDocumentationView = (function(superClass) {
  extend(ComponentsDocumentationView, superClass);

  ComponentsDocumentationView.prototype.id = 'components-documentation-view';

  ComponentsDocumentationView.prototype.template = template;

  ComponentsDocumentationView.prototype.className = 'tab-pane';

  ComponentsDocumentationView.prototype.collapsed = true;

  ComponentsDocumentationView.prototype.events = {
    'click #toggle-all-component-code': 'onToggleAllCode'
  };

  ComponentsDocumentationView.prototype.subscriptions = {
    'editor:view-switched': 'onViewSwitched'
  };

  function ComponentsDocumentationView(options) {
    ComponentsDocumentationView.__super__.constructor.call(this, options);
    this.componentDocs = new ComponentDocsCollection();
    if (!options.lazy) {
      this.loadDocs();
    }
  }

  ComponentsDocumentationView.prototype.loadDocs = function() {
    if (this.loadingDocs) {
      return;
    }
    this.supermodel.loadCollection(this.componentDocs, 'components');
    this.loadingDocs = true;
    return this.render();
  };

  ComponentsDocumentationView.prototype.getRenderData = function() {
    var c, ref, ref1;
    c = ComponentsDocumentationView.__super__.getRenderData.call(this);
    c.components = this.componentDocs.models;
    c.marked = marked;
    c.codeLanguage = (ref = (ref1 = me.get('aceConfig')) != null ? ref1.language : void 0) != null ? ref : 'python';
    return c;
  };

  ComponentsDocumentationView.prototype.onToggleAllCode = function(e) {
    this.collapsed = !this.collapsed;
    this.$el.find('.collapse').collapse(this.collapsed ? 'hide' : 'show');
    return this.$el.find('#toggle-all-component-code').toggleClass('active', !this.collapsed);
  };

  ComponentsDocumentationView.prototype.onViewSwitched = function(e) {
    if (e.targetURL !== '#editor-level-documentation') {
      return;
    }
    return this.loadDocs();
  };

  return ComponentsDocumentationView;

})(CocoView);
});

;require.register("views/editor/docs/SystemsDocumentationView", function(exports, require, module) {
var CocoCollection, CocoView, LevelSystem, SystemDocsCollection, SystemsDocumentationView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/docs/systems-documentation-view');

CocoCollection = require('collections/CocoCollection');

LevelSystem = require('models/LevelSystem');

SystemDocsCollection = (function(superClass) {
  extend(SystemDocsCollection, superClass);

  function SystemDocsCollection() {
    return SystemDocsCollection.__super__.constructor.apply(this, arguments);
  }

  SystemDocsCollection.prototype.url = '/db/level.system?project=name,description,code';

  SystemDocsCollection.prototype.model = LevelSystem;

  SystemDocsCollection.prototype.comparator = 'name';

  return SystemDocsCollection;

})(CocoCollection);

module.exports = SystemsDocumentationView = (function(superClass) {
  extend(SystemsDocumentationView, superClass);

  SystemsDocumentationView.prototype.id = 'systems-documentation-view';

  SystemsDocumentationView.prototype.template = template;

  SystemsDocumentationView.prototype.className = 'tab-pane';

  SystemsDocumentationView.prototype.collapsed = true;

  SystemsDocumentationView.prototype.events = {
    'click #toggle-all-system-code': 'onToggleAllCode'
  };

  SystemsDocumentationView.prototype.subscriptions = {
    'editor:view-switched': 'onViewSwitched'
  };

  function SystemsDocumentationView(options) {
    SystemsDocumentationView.__super__.constructor.call(this, options);
    this.systemDocs = new SystemDocsCollection();
    if (!options.lazy) {
      this.loadDocs();
    }
  }

  SystemsDocumentationView.prototype.loadDocs = function() {
    if (this.loadingDocs) {
      return;
    }
    this.supermodel.loadCollection(this.systemDocs, 'systems');
    this.loadingDocs = true;
    return this.render();
  };

  SystemsDocumentationView.prototype.getRenderData = function() {
    var c, ref, ref1;
    c = SystemsDocumentationView.__super__.getRenderData.call(this);
    c.systems = this.systemDocs.models;
    c.marked = marked;
    c.codeLanguage = (ref = (ref1 = me.get('aceConfig')) != null ? ref1.language : void 0) != null ? ref : 'python';
    return c;
  };

  SystemsDocumentationView.prototype.onToggleAllCode = function(e) {
    this.collapsed = !this.collapsed;
    this.$el.find('.collapse').collapse(this.collapsed ? 'hide' : 'show');
    return this.$el.find('#toggle-all-system-code').toggleClass('active', !this.collapsed);
  };

  SystemsDocumentationView.prototype.onViewSwitched = function(e) {
    if (e.targetURL !== '#editor-level-documentation') {
      return;
    }
    return this.loadDocs();
  };

  return SystemsDocumentationView;

})(CocoView);
});

;require.register("views/editor/level/LevelEditView", function(exports, require, module) {
var ArtisanGuideModal, Campaigns, CocoCollection, ComponentsDocumentationView, ComponentsTabView, Course, DocumentFiles, ForkModal, Level, LevelComponent, LevelComponents, LevelEditView, LevelFeedbackView, LevelLoader, LevelSystem, LevelSystems, LoadBranchModal, PatchesView, RelatedAchievementsView, RootView, SaveBranchModal, SaveLevelModal, SaveVersionModal, ScriptsTabView, SettingsTabView, SystemsDocumentationView, SystemsTabView, TasksTabView, ThangsTabView, VersionHistoryView, World, storage, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/editor/level/level-edit-view');

Level = require('models/Level');

LevelSystem = require('models/LevelSystem');

LevelComponent = require('models/LevelComponent');

LevelSystems = require('collections/LevelSystems');

LevelComponents = require('collections/LevelComponents');

World = require('lib/world/world');

DocumentFiles = require('collections/DocumentFiles');

LevelLoader = require('lib/LevelLoader');

Campaigns = require('collections/Campaigns');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

require('views/modal/RevertModal');

require('views/editor/level/modals/GenerateTerrainModal');

ThangsTabView = require('./thangs/ThangsTabView');

SettingsTabView = require('./settings/SettingsTabView');

ScriptsTabView = require('./scripts/ScriptsTabView');

ComponentsTabView = require('./components/ComponentsTabView');

SystemsTabView = require('./systems/SystemsTabView');

TasksTabView = require('./tasks/TasksTabView');

SaveLevelModal = require('./modals/SaveLevelModal');

ArtisanGuideModal = require('./modals/ArtisanGuideModal');

ForkModal = require('views/editor/ForkModal');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

SaveBranchModal = require('views/editor/level/modals/SaveBranchModal');

LoadBranchModal = require('views/editor/level/modals/LoadBranchModal');

PatchesView = require('views/editor/PatchesView');

RelatedAchievementsView = require('views/editor/level/RelatedAchievementsView');

VersionHistoryView = require('./modals/LevelVersionsModal');

ComponentsDocumentationView = require('views/editor/docs/ComponentsDocumentationView');

SystemsDocumentationView = require('views/editor/docs/SystemsDocumentationView');

LevelFeedbackView = require('views/editor/level/LevelFeedbackView');

storage = require('core/storage');

utils = require('core/utils');

require('vendor/coffeescript');

require('vendor/treema');

require('vendor/aether-javascript');

require('vendor/aether-python');

require('vendor/aether-coffeescript');

require('vendor/aether-lua');

require('vendor/aether-java');

require('vendor/aether-html');

require('game-libraries');

module.exports = LevelEditView = (function(superClass) {
  extend(LevelEditView, superClass);

  LevelEditView.prototype.id = 'editor-level-view';

  LevelEditView.prototype.className = 'editor';

  LevelEditView.prototype.template = template;

  LevelEditView.prototype.cache = false;

  LevelEditView.prototype.events = {
    'click #play-button': 'onPlayLevel',
    'click .play-with-team-button': 'onPlayLevel',
    'click .play-with-team-parent': 'onPlayLevelTeamSelect',
    'click .play-classroom-level': 'onPlayLevel',
    'click #commit-level-start-button': 'startCommittingLevel',
    'click li:not(.disabled) > #fork-start-button': 'startForking',
    'click #level-history-button': 'showVersionHistory',
    'click #undo-button': 'onUndo',
    'mouseenter #undo-button': 'showUndoDescription',
    'click #redo-button': 'onRedo',
    'mouseenter #redo-button': 'showRedoDescription',
    'click #patches-tab': function() {
      return this.patchesView.load();
    },
    'click #components-tab': function() {
      return this.subviews.editor_level_components_tab_view.refreshLevelThangsTreema(this.level.get('thangs'));
    },
    'click #artisan-guide-button': 'showArtisanGuide',
    'click #level-patch-button': 'startPatchingLevel',
    'click #level-watch-button': 'toggleWatchLevel',
    'click li:not(.disabled) > #pop-level-i18n-button': 'onPopulateI18N',
    'click a[href="#editor-level-documentation"]': 'onClickDocumentationTab',
    'click #save-branch': 'onClickSaveBranch',
    'click #load-branch': 'onClickLoadBranch',
    'mouseup .nav-tabs > li a': 'toggleTab'
  };

  function LevelEditView(options, levelID1) {
    this.levelID = levelID1;
    this.incrementBuildTime = bind(this.incrementBuildTime, this);
    LevelEditView.__super__.constructor.call(this, options);
    this.supermodel.shouldSaveBackups = function(model) {
      var ref;
      return (ref = model.constructor.className) === 'Level' || ref === 'LevelComponent' || ref === 'LevelSystem' || ref === 'ThangType';
    };
    this.levelLoader = new LevelLoader({
      supermodel: this.supermodel,
      levelID: this.levelID,
      headless: true,
      sessionless: true,
      loadArticles: true
    });
    this.level = this.levelLoader.level;
    this.files = new DocumentFiles(this.levelLoader.level);
    this.supermodel.loadCollection(this.files, 'file_names');
    this.campaigns = new Campaigns();
    this.supermodel.trackRequest(this.campaigns.fetchByType('course', {
      data: {
        project: 'levels'
      }
    }));
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.supermodel.loadCollection(this.courses, 'courses');
  }

  LevelEditView.prototype.destroy = function() {
    clearInterval(this.timerIntervalID);
    return LevelEditView.__super__.destroy.call(this);
  };

  LevelEditView.prototype.showLoading = function($el) {
    if ($el == null) {
      $el = this.$el.find('.outer-content');
    }
    return LevelEditView.__super__.showLoading.call(this, $el);
  };

  LevelEditView.prototype.getTitle = function() {
    return "LevelEditor - " + (this.level.get('name') || '...');
  };

  LevelEditView.prototype.onLoaded = function() {
    var campaign, campaignCourseMap, course, i, j, len, len1, level, levelID, ref, ref1, ref2;
    _.defer((function(_this) {
      return function() {
        _this.world = _this.levelLoader.world;
        _this.render();
        return _this.timerIntervalID = setInterval(_this.incrementBuildTime, 1000);
      };
    })(this));
    campaignCourseMap = {};
    ref = this.courses.models;
    for (i = 0, len = ref.length; i < len; i++) {
      course = ref[i];
      campaignCourseMap[course.get('campaignID')] = course.id;
    }
    ref1 = this.campaigns.models;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      campaign = ref1[j];
      ref2 = campaign.get('levels');
      for (levelID in ref2) {
        level = ref2[levelID];
        if (levelID === this.level.get('original')) {
          this.courseID = campaignCourseMap[campaign.id];
        }
      }
      if (this.courseID) {
        break;
      }
    }
    if (!this.courseID && me.isAdmin()) {
      this.courseID = '560f1a9f22961295f9427742';
    }
    return this.getLevelCompletionRate();
  };

  LevelEditView.prototype.getRenderData = function(context) {
    var ref, ref1;
    if (context == null) {
      context = {};
    }
    context = LevelEditView.__super__.getRenderData.call(this, context);
    context.level = this.level;
    context.authorized = me.isAdmin() || this.level.hasWriteAccess(me);
    context.anonymous = me.get('anonymous');
    context.recentlyPlayedOpponents = (ref = (ref1 = storage.load('recently-played-matches')) != null ? ref1[this.levelID] : void 0) != null ? ref : [];
    return context;
  };

  LevelEditView.prototype.afterRender = function() {
    LevelEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.$el.find('a[data-toggle="tab"]').on('shown.bs.tab', (function(_this) {
      return function(e) {
        return Backbone.Mediator.publish('editor:view-switched', {
          targetURL: $(e.target).attr('href')
        });
      };
    })(this));
    this.listenTo(this.level, 'change:tasks', (function(_this) {
      return function() {
        return _this.renderSelectors('#tasks-tab');
      };
    })(this));
    this.insertSubView(new ThangsTabView({
      world: this.world,
      supermodel: this.supermodel,
      level: this.level
    }));
    this.insertSubView(new SettingsTabView({
      supermodel: this.supermodel
    }));
    this.insertSubView(new ScriptsTabView({
      world: this.world,
      supermodel: this.supermodel,
      files: this.files
    }));
    this.insertSubView(new ComponentsTabView({
      supermodel: this.supermodel
    }));
    this.insertSubView(new SystemsTabView({
      supermodel: this.supermodel,
      world: this.world
    }));
    this.insertSubView(new TasksTabView({
      world: this.world,
      supermodel: this.supermodel,
      level: this.level
    }));
    this.insertSubView(new RelatedAchievementsView({
      supermodel: this.supermodel,
      level: this.level
    }));
    this.insertSubView(new ComponentsDocumentationView({
      lazy: true
    }));
    this.insertSubView(new SystemsDocumentationView({
      lazy: true
    }));
    this.insertSubView(new LevelFeedbackView({
      level: this.level
    }));
    Backbone.Mediator.publish('editor:level-loaded', {
      level: this.level
    });
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    this.patchesView = this.insertSubView(new PatchesView(this.level), this.$el.find('.patches-view'));
    this.listenTo(this.patchesView, 'accepted-patch', function() {
      if (!key.shift) {
        return location.reload();
      }
    });
    if (this.level.watching()) {
      return this.$el.find('#level-watch-button').find('> span').toggleClass('secret');
    }
  };

  LevelEditView.prototype.onPlayLevelTeamSelect = function(e) {
    if (this.childWindow && !this.childWindow.closed) {
      e.stopImmediatePropagation();
      return this.onPlayLevel(e);
    }
  };

  LevelEditView.prototype.onPlayLevel = function(e) {
    var newClassLanguage, newClassMode, opponentSessionID, ref, scratchLevelID, sendLevel, team;
    team = $(e.target).data('team');
    opponentSessionID = $(e.target).data('opponent');
    if ($(e.target).data('classroom') === 'home') {
      newClassMode = this.lastNewClassMode = void 0;
    } else if ($(e.target).data('classroom')) {
      newClassMode = this.lastNewClassMode = true;
    } else {
      newClassMode = this.lastNewClassMode;
    }
    newClassLanguage = this.lastNewClassLanguage = ((ref = $(e.target).data('code-language')) != null ? ref : this.lastNewClassLanguage) || void 0;
    sendLevel = (function(_this) {
      return function() {
        return _this.childWindow.Backbone.Mediator.publish('level:reload-from-data', {
          level: _this.level,
          supermodel: _this.supermodel
        });
      };
    })(this);
    if (this.childWindow && !this.childWindow.closed && this.playClassMode === newClassMode && this.playClassLanguage === newClassLanguage) {
      sendLevel();
    } else {
      scratchLevelID = this.level.get('slug') + '?dev=true';
      if (team) {
        scratchLevelID += "&team=" + team;
      }
      if (opponentSessionID) {
        scratchLevelID += "&opponent=" + opponentSessionID;
      }
      this.playClassMode = newClassMode;
      this.playClassLanguage = newClassLanguage;
      if (this.playClassMode) {
        scratchLevelID += "&course=" + this.courseID;
        scratchLevelID += "&codeLanguage=" + this.playClassLanguage;
      }
      if (me.get('name') === 'Nick') {
        this.childWindow = window.open("/play/level/" + scratchLevelID, 'child_window', 'width=2560,height=1080,left=0,top=-1600,location=1,menubar=1,scrollbars=1,status=0,titlebar=1,toolbar=1', true);
      } else {
        this.childWindow = window.open("/play/level/" + scratchLevelID, 'child_window', 'width=1280,height=640,left=10,top=10,location=0,menubar=0,scrollbars=0,status=0,titlebar=0,toolbar=0', true);
      }
      this.childWindow.onPlayLevelViewLoaded = (function(_this) {
        return function(e) {
          return sendLevel();
        };
      })(this);
    }
    return this.childWindow.focus();
  };

  LevelEditView.prototype.onUndo = function() {
    var ref;
    return (ref = TreemaNode.getLastTreemaWithFocus()) != null ? ref.undo() : void 0;
  };

  LevelEditView.prototype.onRedo = function() {
    var ref;
    return (ref = TreemaNode.getLastTreemaWithFocus()) != null ? ref.redo() : void 0;
  };

  LevelEditView.prototype.showUndoDescription = function() {
    var undoDescription;
    undoDescription = TreemaNode.getLastTreemaWithFocus().getUndoDescription();
    return this.$el.find('#undo-button').attr('title', $.i18n.t("general.undo_prefix") + " " + undoDescription + " " + $.i18n.t("general.undo_shortcut"));
  };

  LevelEditView.prototype.showRedoDescription = function() {
    var redoDescription;
    redoDescription = TreemaNode.getLastTreemaWithFocus().getRedoDescription();
    return this.$el.find('#redo-button').attr('title', $.i18n.t("general.redo_prefix") + " " + redoDescription + " " + $.i18n.t("general.redo_shortcut"));
  };

  LevelEditView.prototype.getCurrentView = function() {
    var currentViewID;
    currentViewID = this.$el.find('.tab-pane.active').attr('id');
    if (currentViewID === 'editor-level-patches') {
      return this.patchesView;
    }
    if (currentViewID === 'editor-level-documentation') {
      currentViewID = 'components-documentation-view';
    }
    return this.subviews[_.string.underscored(currentViewID)];
  };

  LevelEditView.prototype.startPatchingLevel = function(e) {
    this.openModalView(new SaveVersionModal({
      model: this.level
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.startCommittingLevel = function(e) {
    this.openModalView(new SaveLevelModal({
      level: this.level,
      supermodel: this.supermodel,
      buildTime: this.levelBuildTime
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.showArtisanGuide = function(e) {
    this.openModalView(new ArtisanGuideModal({
      level: this.level
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.startForking = function(e) {
    this.openModalView(new ForkModal({
      model: this.level,
      editorPath: 'level'
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.showVersionHistory = function(e) {
    var versionHistoryView;
    versionHistoryView = new VersionHistoryView({
      level: this.level
    }, this.levelID);
    this.openModalView(versionHistoryView);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.toggleWatchLevel = function() {
    var button;
    button = this.$el.find('#level-watch-button');
    this.level.watch(button.find('.watch').is(':visible'));
    return button.find('> span').toggleClass('secret');
  };

  LevelEditView.prototype.onPopulateI18N = function() {
    var component, configSchema, f, i, j, len, len1, levelComponentMap, path, ref, ref1, thang, thangComponent, thangComponentIndex, thangIndex, totalChanges;
    totalChanges = this.level.populateI18N();
    levelComponentMap = _(currentView.supermodel.getModels(LevelComponent)).map(function(c) {
      return [c.get('original'), c];
    }).object().value();
    ref = this.level.get('thangs');
    for (thangIndex = i = 0, len = ref.length; i < len; thangIndex = ++i) {
      thang = ref[thangIndex];
      ref1 = thang.components;
      for (thangComponentIndex = j = 0, len1 = ref1.length; j < len1; thangComponentIndex = ++j) {
        thangComponent = ref1[thangComponentIndex];
        component = levelComponentMap[thangComponent.original];
        configSchema = component.get('configSchema');
        path = "/thangs/" + thangIndex + "/components/" + thangComponentIndex + "/config";
        totalChanges += this.level.populateI18N(thangComponent.config, configSchema, path);
      }
    }
    if (totalChanges) {
      f = function() {
        return document.location.reload();
      };
      return setTimeout(f, 500);
    } else {
      return noty({
        timeout: 2000,
        text: 'No changes.',
        type: 'information',
        layout: 'topRight'
      });
    }
  };

  LevelEditView.prototype.onClickSaveBranch = function() {
    var components, systems;
    components = new LevelComponents(this.supermodel.getModels(LevelComponent));
    systems = new LevelSystems(this.supermodel.getModels(LevelSystem));
    this.openModalView(new SaveBranchModal({
      components: components,
      systems: systems
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.onClickLoadBranch = function() {
    var components, systems;
    components = new LevelComponents(this.supermodel.getModels(LevelComponent));
    systems = new LevelSystems(this.supermodel.getModels(LevelSystem));
    this.openModalView(new LoadBranchModal({
      components: components,
      systems: systems
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.toggleTab = function(e) {
    var li;
    this.renderScrollbar();
    if (!($(document).width() <= 800)) {
      return;
    }
    li = $(e.target).closest('li');
    if (li.hasClass('active')) {
      li.parent().find('li').show();
    } else {
      li.parent().find('li').hide();
      li.show();
    }
    return console.log(li.hasClass('active'));
  };

  LevelEditView.prototype.onClickDocumentationTab = function(e) {
    if (this.initializedDocs) {
      return;
    }
    this.initializedDocs = true;
    return this.$el.find('a[href="#components-documentation-view"]').click();
  };

  LevelEditView.prototype.incrementBuildTime = function() {
    var ref;
    if (application.userIsIdle) {
      return;
    }
    if (this.levelBuildTime == null) {
      this.levelBuildTime = (ref = this.level.get('buildTime')) != null ? ref : 0;
    }
    return ++this.levelBuildTime;
  };

  LevelEditView.prototype.getTaskCompletionRatio = function() {
    if (this.level.get('tasks') == null) {
      return '0/0';
    } else {
      return _.filter(this.level.get('tasks'), function(_elem) {
        return _elem.complete;
      }).length + '/' + this.level.get('tasks').length;
    }
  };

  LevelEditView.prototype.getLevelCompletionRate = function() {
    var endDay, endDayDashed, request, startDay, startDayDashed, success;
    if (!me.isAdmin()) {
      return;
    }
    startDay = utils.getUTCDay(-14);
    startDayDashed = startDay.slice(0, 4) + "-" + startDay.slice(4, 6) + "-" + startDay.slice(6, 8);
    endDay = utils.getUTCDay(-1);
    endDayDashed = endDay.slice(0, 4) + "-" + endDay.slice(4, 6) + "-" + endDay.slice(6, 8);
    success = (function(_this) {
      return function(data) {
        var day, finished, i, len, rate, rateDisplay, ref, ref1, started;
        if (_this.destroyed) {
          return;
        }
        started = 0;
        finished = 0;
        for (i = 0, len = data.length; i < len; i++) {
          day = data[i];
          started += (ref = day.started) != null ? ref : 0;
          finished += (ref1 = day.finished) != null ? ref1 : 0;
        }
        rate = finished / started;
        rateDisplay = (rate * 100).toFixed(1) + '%';
        return _this.$('#completion-rate').text(rateDisplay);
      };
    })(this);
    request = this.supermodel.addRequestResource('level_completions', {
      url: '/db/analytics_perday/-/level_completions',
      data: {
        startDay: startDay,
        endDay: endDay,
        slug: this.level.get('slug')
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  return LevelEditView;

})(RootView);
});

;require.register("views/editor/level/LevelFeedbackView", function(exports, require, module) {
var CocoCollection, CocoView, Level, LevelFeedback, LevelFeedbackCollection, LevelFeedbackView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

CocoCollection = require('collections/CocoCollection');

template = require('templates/editor/level/level-feedback-view');

Level = require('models/Level');

LevelFeedback = require('models/LevelFeedback');

LevelFeedbackCollection = (function(superClass) {
  extend(LevelFeedbackCollection, superClass);

  function LevelFeedbackCollection() {
    return LevelFeedbackCollection.__super__.constructor.apply(this, arguments);
  }

  LevelFeedbackCollection.prototype.model = LevelFeedback;

  LevelFeedbackCollection.prototype.initialize = function(models, options) {
    LevelFeedbackCollection.__super__.initialize.call(this, models, options);
    return this.url = "/db/level/" + (options.level.get('slug')) + "/all_feedback";
  };

  LevelFeedbackCollection.prototype.comparator = function(a, b) {
    var score;
    score = 0;
    if (a.get('creator') === me.id) {
      score -= 9001900190019001;
    }
    if (b.get('creator') === me.id) {
      score += 9001900190019001;
    }
    score -= new Date(a.get('created'));
    score -= -(new Date(b.get('created')));
    if (a.get('review')) {
      score -= 900190019001;
    }
    if (b.get('review')) {
      score += 900190019001;
    }
    if (score < 0) {
      return -1;
    } else {
      if (score > 0) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  return LevelFeedbackCollection;

})(CocoCollection);

module.exports = LevelFeedbackView = (function(superClass) {
  extend(LevelFeedbackView, superClass);

  LevelFeedbackView.prototype.id = 'level-feedback-view';

  LevelFeedbackView.prototype.template = template;

  LevelFeedbackView.prototype.className = 'tab-pane';

  LevelFeedbackView.prototype.subscriptions = {
    'editor:view-switched': 'onViewSwitched'
  };

  function LevelFeedbackView(options) {
    LevelFeedbackView.__super__.constructor.call(this, options);
  }

  LevelFeedbackView.prototype.getRenderData = function(context) {
    var m, ref;
    if (context == null) {
      context = {};
    }
    context = LevelFeedbackView.__super__.getRenderData.call(this, context);
    context.moment = moment;
    context.allFeedback = [];
    context.averageRating = 0;
    context.totalRatings = 0;
    if ((ref = this.allFeedback) != null ? ref.models.length : void 0) {
      context.allFeedback = (function() {
        var i, len, ref1, results;
        ref1 = this.allFeedback.models;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          m = ref1[i];
          if (this.allFeedback.models.length < 20 || m.get('review')) {
            results.push(m.attributes);
          }
        }
        return results;
      }).call(this);
      context.averageRating = _.reduce((function() {
        var i, len, ref1, results;
        ref1 = this.allFeedback.models;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          m = ref1[i];
          results.push(m.get('rating'));
        }
        return results;
      }).call(this), function(acc, x) {
        return acc + (x != null ? x : 5);
      }) / this.allFeedback.models.length;
      context.totalRatings = this.allFeedback.models.length;
    } else {
      context.loading = true;
    }
    return context;
  };

  LevelFeedbackView.prototype.onViewSwitched = function(e) {
    if (e.targetURL !== '#level-feedback-view') {
      return;
    }
    if (!this.allFeedback) {
      this.allFeedback = this.supermodel.loadCollection(new LevelFeedbackCollection(null, {
        level: this.options.level
      }), 'feedback').model;
      return this.render();
    }
  };

  return LevelFeedbackView;

})(CocoView);
});

;require.register("views/editor/level/LevelSearchView", function(exports, require, module) {
var LevelSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = LevelSearchView = (function(superClass) {
  extend(LevelSearchView, superClass);

  function LevelSearchView() {
    return LevelSearchView.__super__.constructor.apply(this, arguments);
  }

  LevelSearchView.prototype.id = 'editor-level-home-view';

  LevelSearchView.prototype.modelLabel = 'Level';

  LevelSearchView.prototype.model = require('models/Level');

  LevelSearchView.prototype.modelURL = '/db/level';

  LevelSearchView.prototype.tableTemplate = require('templates/editor/level/table');

  LevelSearchView.prototype.projection = ['slug', 'name', 'description', 'version', 'watchers', 'creator'];

  LevelSearchView.prototype.page = 'level';

  LevelSearchView.prototype.getRenderData = function() {
    var context;
    context = LevelSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.level_title';
    context.currentNew = 'editor.new_level_title';
    context.currentNewSignup = 'editor.new_level_title_login';
    context.currentSearch = 'editor.level_search_title';
    this.$el.i18n();
    return context;
  };

  return LevelSearchView;

})(SearchView);
});

;require.register("views/editor/level/RelatedAchievementsView", function(exports, require, module) {
var Achievement, CocoView, NewAchievementModal, RelatedAchievementsCollection, RelatedAchievementsView, app, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/related-achievements');

RelatedAchievementsCollection = require('collections/RelatedAchievementsCollection');

Achievement = require('models/Achievement');

NewAchievementModal = require('./modals/NewAchievementModal');

app = require('core/application');

module.exports = RelatedAchievementsView = (function(superClass) {
  extend(RelatedAchievementsView, superClass);

  RelatedAchievementsView.prototype.id = 'related-achievements-view';

  RelatedAchievementsView.prototype.template = template;

  RelatedAchievementsView.prototype.className = 'tab-pane';

  RelatedAchievementsView.prototype.events = {
    'click #new-achievement-button': 'makeNewAchievement'
  };

  RelatedAchievementsView.prototype.subscriptions = {
    'editor:view-switched': 'onViewSwitched'
  };

  function RelatedAchievementsView(options) {
    RelatedAchievementsView.__super__.constructor.call(this, options);
    this.level = options.level;
    this.relatedID = this.level.get('original');
    this.achievements = new RelatedAchievementsCollection(this.relatedID);
  }

  RelatedAchievementsView.prototype.loadAchievements = function() {
    if (this.loadingAchievements) {
      return;
    }
    this.supermodel.loadCollection(this.achievements, 'achievements');
    this.loadingAchievements = true;
    return this.render();
  };

  RelatedAchievementsView.prototype.onNewAchievementSaved = function(achievement) {};

  RelatedAchievementsView.prototype.makeNewAchievement = function() {
    var modal;
    modal = new NewAchievementModal({
      model: Achievement,
      modelLabel: 'Achievement',
      level: this.level
    });
    modal.once('model-created', this.onNewAchievementSaved);
    return this.openModalView(modal);
  };

  RelatedAchievementsView.prototype.onViewSwitched = function(e) {
    if (e.targetURL !== '#related-achievements-view') {
      return;
    }
    return this.loadAchievements();
  };

  return RelatedAchievementsView;

})(CocoView);
});

;require.register("views/editor/level/components/ComponentsTabView", function(exports, require, module) {
var CocoView, ComponentsTabView, LevelComponent, LevelComponentCollection, LevelComponentEditView, LevelComponentNewView, LevelComponentNode, ThangType, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/components_tab');

ThangType = require('models/ThangType');

LevelComponent = require('models/LevelComponent');

LevelComponentEditView = require('./LevelComponentEditView');

LevelComponentNewView = require('./NewLevelComponentModal');

require('vendor/treema');

LevelComponentCollection = (function(superClass) {
  extend(LevelComponentCollection, superClass);

  function LevelComponentCollection() {
    return LevelComponentCollection.__super__.constructor.apply(this, arguments);
  }

  LevelComponentCollection.prototype.url = '/db/level.component';

  LevelComponentCollection.prototype.model = LevelComponent;

  return LevelComponentCollection;

})(Backbone.Collection);

module.exports = ComponentsTabView = (function(superClass) {
  extend(ComponentsTabView, superClass);

  function ComponentsTabView() {
    this.onTreemaComponentSelected = bind(this.onTreemaComponentSelected, this);
    return ComponentsTabView.__super__.constructor.apply(this, arguments);
  }

  ComponentsTabView.prototype.id = 'editor-level-components-tab-view';

  ComponentsTabView.prototype.template = template;

  ComponentsTabView.prototype.className = 'tab-pane';

  ComponentsTabView.prototype.subscriptions = {
    'editor:level-component-editing-ended': 'onLevelComponentEditingEnded'
  };

  ComponentsTabView.prototype.events = {
    'click #create-new-component-button': 'createNewLevelComponent',
    'click #create-new-component-button-no-select': 'createNewLevelComponent'
  };

  ComponentsTabView.prototype.onLoaded = function() {};

  ComponentsTabView.prototype.refreshLevelThangsTreema = function(thangsData) {
    var c, comp, component, componentMap, componentModelMap, componentModels, components, haveThisComponent, i, j, k, key, l, len, len1, len2, len3, len4, n, name1, o, presentComponents, ref, ref1, ref2, ref3, ref4, ref5, res, thang, thangType, treemaData, treemaOptions, value;
    presentComponents = {};
    for (i = 0, len = thangsData.length; i < len; i++) {
      thang = thangsData[i];
      componentMap = {};
      thangType = this.supermodel.getModelByOriginal(ThangType, thang.thangType);
      ref1 = (ref = thangType.get('components')) != null ? ref : [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        component = ref1[j];
        componentMap[component.original] = component;
      }
      ref2 = thang.components;
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        component = ref2[k];
        componentMap[component.original] = component;
      }
      ref3 = _.values(componentMap);
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        component = ref3[l];
        haveThisComponent = (presentComponents[name1 = component.original + '.' + ((ref4 = component.majorVersion) != null ? ref4 : 0)] != null ? presentComponents[name1] : presentComponents[name1] = []);
        if (haveThisComponent.length < 100) {
          haveThisComponent.push(thang.id);
        }
      }
    }
    if (_.isEqual(presentComponents, this.presentComponents)) {
      return;
    }
    this.presentComponents = presentComponents;
    componentModels = this.supermodel.getModels(LevelComponent);
    componentModelMap = {};
    for (n = 0, len4 = componentModels.length; n < len4; n++) {
      comp = componentModels[n];
      componentModelMap[comp.get('original')] = comp;
    }
    components = (function() {
      var ref5, results;
      ref5 = this.presentComponents;
      results = [];
      for (key in ref5) {
        value = ref5[key];
        results.push({
          original: key.split('.')[0],
          majorVersion: parseInt(key.split('.')[1], 10),
          thangs: value,
          count: value.length
        });
      }
      return results;
    }).call(this);
    components = components.concat((function() {
      var len5, o, results;
      results = [];
      for (o = 0, len5 = componentModels.length; o < len5; o++) {
        c = componentModels[o];
        if (!this.presentComponents[c.get('original') + '.' + c.get('version').major]) {
          results.push({
            original: c.get('original'),
            majorVersion: c.get('version').major,
            thangs: [],
            count: 0
          });
        }
      }
      return results;
    }).call(this));
    treemaData = _.sortBy(components, (function(_this) {
      return function(comp) {
        var res;
        component = componentModelMap[comp.original];
        res = [(comp.count ? 0 : 1), component.get('system'), component.get('name')];
        return res;
      };
    })(this));
    res = {};
    for (key = o = 0, ref5 = treemaData.length; 0 <= ref5 ? o < ref5 : o > ref5; key = 0 <= ref5 ? ++o : --o) {
      res[treemaData[key].original] = treemaData[key];
    }
    treemaData = (function() {
      var results;
      results = [];
      for (key in res) {
        value = res[key];
        results.push(value);
      }
      return results;
    })();
    treemaOptions = {
      supermodel: this.supermodel,
      schema: {
        type: 'array',
        items: {
          type: 'object',
          format: 'level-component'
        }
      },
      data: treemaData,
      callbacks: {
        select: this.onTreemaComponentSelected
      },
      readOnly: true,
      nodeClasses: {
        'level-component': LevelComponentNode
      }
    };
    this.componentsTreema = this.$el.find('#components-treema').treema(treemaOptions);
    this.componentsTreema.build();
    return this.componentsTreema.open();
  };

  ComponentsTabView.prototype.onTreemaComponentSelected = function(e, selected) {
    selected = selected.length > 1 ? selected[0].getLastSelectedTreema() : selected[0];
    if (!selected) {
      this.removeSubView(this.levelComponentEditView);
      this.levelComponentEditView = null;
      return;
    }
    return this.editLevelComponent({
      original: selected.data.original,
      majorVersion: selected.data.majorVersion
    });
  };

  ComponentsTabView.prototype.createNewLevelComponent = function(e) {
    var levelComponentNewView;
    levelComponentNewView = new LevelComponentNewView({
      supermodel: this.supermodel
    });
    this.openModalView(levelComponentNewView);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  ComponentsTabView.prototype.editLevelComponent = function(e) {
    return this.levelComponentEditView = this.insertSubView(new LevelComponentEditView({
      original: e.original,
      majorVersion: e.majorVersion,
      supermodel: this.supermodel
    }));
  };

  ComponentsTabView.prototype.onLevelComponentEditingEnded = function(e) {
    this.removeSubView(this.levelComponentEditView);
    return this.levelComponentEditView = null;
  };

  ComponentsTabView.prototype.destroy = function() {
    var ref;
    if ((ref = this.componentsTreema) != null) {
      ref.destroy();
    }
    return ComponentsTabView.__super__.destroy.call(this);
  };

  return ComponentsTabView;

})(CocoView);

LevelComponentNode = (function(superClass) {
  extend(LevelComponentNode, superClass);

  function LevelComponentNode() {
    return LevelComponentNode.__super__.constructor.apply(this, arguments);
  }

  LevelComponentNode.prototype.valueClass = 'treema-level-component';

  LevelComponentNode.prototype.collection = false;

  LevelComponentNode.prototype.buildValueForDisplay = function(valEl, data) {
    var comp, count, name, result;
    count = data.count === 1 ? data.thangs[0] : (data.count >= 100 ? '100+' : data.count) + ' Thangs';
    if (data.original.match(':')) {
      name = 'Old: ' + data.original.replace('systems/', '');
    } else {
      comp = _.find(this.settings.supermodel.getModels(LevelComponent), (function(_this) {
        return function(m) {
          return m.get('original') === data.original && m.get('version').major === data.majorVersion;
        };
      })(this));
      name = (comp.get('system')) + "." + (comp.get('name')) + " v" + (comp.get('version').major);
    }
    result = this.buildValueForDisplaySimply(valEl, name + " (" + count + ")");
    if (!data.count) {
      result.addClass('not-present');
    }
    return result;
  };

  return LevelComponentNode;

})(TreemaObjectNode);
});

;require.register("views/editor/level/components/LevelComponentEditView", function(exports, require, module) {
var CocoView, ComponentVersionsModal, LevelComponent, LevelComponentEditView, PatchesView, SaveVersionModal, ace, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/component/level-component-edit-view');

LevelComponent = require('models/LevelComponent');

ComponentVersionsModal = require('views/editor/component/ComponentVersionsModal');

PatchesView = require('views/editor/PatchesView');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

ace = require('ace');

require('vendor/treema');

module.exports = LevelComponentEditView = (function(superClass) {
  extend(LevelComponentEditView, superClass);

  LevelComponentEditView.prototype.id = 'level-component-edit-view';

  LevelComponentEditView.prototype.template = template;

  LevelComponentEditView.prototype.editableSettings = ['name', 'description', 'system', 'codeLanguage', 'dependencies', 'propertyDocumentation', 'i18n'];

  LevelComponentEditView.prototype.events = {
    'click #done-editing-component-button': 'endEditing',
    'click .nav a': function(e) {
      return $(e.target).tab('show');
    },
    'click #component-patches-tab': function() {
      return this.patchesView.load();
    },
    'click #component-code-tab': 'buildCodeEditor',
    'click #component-config-schema-tab': 'buildConfigSchemaTreema',
    'click #component-settings-tab': 'buildSettingsTreema',
    'click #component-history-button': 'showVersionHistory',
    'click #patch-component-button': 'startPatchingComponent',
    'click #component-watch-button': 'toggleWatchComponent',
    'click #pop-component-i18n-button': 'onPopulateI18N'
  };

  function LevelComponentEditView(options) {
    this.onEditorChange = bind(this.onEditorChange, this);
    this.onConfigSchemaEdited = bind(this.onConfigSchemaEdited, this);
    this.onComponentSettingsEdited = bind(this.onComponentSettingsEdited, this);
    LevelComponentEditView.__super__.constructor.call(this, options);
    this.levelComponent = this.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, options.original, options.majorVersion || 0);
    if (!this.levelComponent) {
      console.log('Couldn\'t get levelComponent for', options, 'from', this.supermodel.models);
    }
    this.onEditorChange = _.debounce(this.onEditorChange, 1000);
  }

  LevelComponentEditView.prototype.getRenderData = function(context) {
    if (context == null) {
      context = {};
    }
    context = LevelComponentEditView.__super__.getRenderData.call(this, context);
    context.editTitle = (this.levelComponent.get('system')) + "." + (this.levelComponent.get('name'));
    context.component = this.levelComponent;
    return context;
  };

  LevelComponentEditView.prototype.onLoaded = function() {
    return this.render();
  };

  LevelComponentEditView.prototype.afterRender = function() {
    LevelComponentEditView.__super__.afterRender.call(this);
    this.buildSettingsTreema();
    this.buildConfigSchemaTreema();
    this.buildCodeEditor();
    this.patchesView = this.insertSubView(new PatchesView(this.levelComponent), this.$el.find('.patches-view'));
    if (this.levelComponent.watching()) {
      this.$el.find('#component-watch-button').find('> span').toggleClass('secret');
    }
    return this.updatePatchButton();
  };

  LevelComponentEditView.prototype.buildSettingsTreema = function() {
    var data, schema, treemaOptions;
    data = _.pick(this.levelComponent.attributes, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    data = $.extend(true, {}, data);
    schema = _.cloneDeep(LevelComponent.schema);
    schema.properties = _.pick(schema.properties, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    schema.required = _.intersection(schema.required, this.editableSettings);
    schema["default"] = _.pick(schema["default"], (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    treemaOptions = {
      supermodel: this.supermodel,
      schema: schema,
      data: data,
      readonly: me.get('anonymous'),
      callbacks: {
        change: this.onComponentSettingsEdited
      }
    };
    this.componentSettingsTreema = this.$el.find('#edit-component-treema').treema(treemaOptions);
    this.componentSettingsTreema.build();
    return this.componentSettingsTreema.open();
  };

  LevelComponentEditView.prototype.onComponentSettingsEdited = function() {
    var key, ref, value;
    ref = this.componentSettingsTreema.data;
    for (key in ref) {
      value = ref[key];
      if (key !== 'js') {
        this.levelComponent.set(key, value);
      }
    }
    return this.updatePatchButton();
  };

  LevelComponentEditView.prototype.buildConfigSchemaTreema = function() {
    var configSchema, i, len, orderedProperties, prop, propertyNames, treemaOptions;
    configSchema = $.extend(true, {}, this.levelComponent.get('configSchema'));
    if (configSchema.properties) {
      propertyNames = _.keys(configSchema.properties);
      propertyNames.sort();
      orderedProperties = {};
      for (i = 0, len = propertyNames.length; i < len; i++) {
        prop = propertyNames[i];
        orderedProperties[prop] = configSchema.properties[prop];
      }
      configSchema.properties = orderedProperties;
    }
    treemaOptions = {
      supermodel: this.supermodel,
      schema: LevelComponent.schema.properties.configSchema,
      data: configSchema,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.onConfigSchemaEdited
      }
    };
    this.configSchemaTreema = this.$el.find('#config-schema-treema').treema(treemaOptions);
    this.configSchemaTreema.build();
    this.configSchemaTreema.open();
    return this.configSchemaTreema.tv4.addSchema('metaschema', LevelComponent.schema.properties.configSchema);
  };

  LevelComponentEditView.prototype.onConfigSchemaEdited = function() {
    this.levelComponent.set('configSchema', this.configSchemaTreema.data);
    return this.updatePatchButton();
  };

  LevelComponentEditView.prototype.buildCodeEditor = function() {
    var editorEl, session;
    this.destroyAceEditor(this.editor);
    editorEl = $('<div></div>').text(this.levelComponent.get('code')).addClass('inner-editor');
    this.$el.find('#component-code-editor').empty().append(editorEl);
    this.editor = ace.edit(editorEl[0]);
    this.editor.setReadOnly(me.get('anonymous'));
    session = this.editor.getSession();
    session.setMode('ace/mode/coffee');
    session.setTabSize(2);
    session.setNewLineMode = 'unix';
    session.setUseSoftTabs(true);
    return this.editor.on('change', this.onEditorChange);
  };

  LevelComponentEditView.prototype.onEditorChange = function() {
    if (this.destroyed) {
      return;
    }
    this.levelComponent.set('code', this.editor.getValue());
    return this.updatePatchButton();
  };

  LevelComponentEditView.prototype.updatePatchButton = function() {
    return this.$el.find('#patch-component-button').toggle(Boolean(this.levelComponent.hasLocalChanges()));
  };

  LevelComponentEditView.prototype.endEditing = function(e) {
    Backbone.Mediator.publish('editor:level-component-editing-ended', {
      component: this.levelComponent
    });
    return null;
  };

  LevelComponentEditView.prototype.showVersionHistory = function(e) {
    var componentVersionsModal;
    componentVersionsModal = new ComponentVersionsModal({}, this.levelComponent.id);
    this.openModalView(componentVersionsModal);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelComponentEditView.prototype.startPatchingComponent = function(e) {
    this.openModalView(new SaveVersionModal({
      model: this.levelComponent
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelComponentEditView.prototype.toggleWatchComponent = function() {
    var button;
    button = this.$el.find('#component-watch-button');
    this.levelComponent.watch(button.find('.watch').is(':visible'));
    return button.find('> span').toggleClass('secret');
  };

  LevelComponentEditView.prototype.onPopulateI18N = function() {
    this.levelComponent.populateI18N();
    return this.render();
  };

  LevelComponentEditView.prototype.destroy = function() {
    var ref, ref1;
    this.destroyAceEditor(this.editor);
    if ((ref = this.componentSettingsTreema) != null) {
      ref.destroy();
    }
    if ((ref1 = this.configSchemaTreema) != null) {
      ref1.destroy();
    }
    return LevelComponentEditView.__super__.destroy.call(this);
  };

  return LevelComponentEditView;

})(CocoView);
});

;require.register("views/editor/level/components/NewLevelComponentModal", function(exports, require, module) {
var LevelComponent, ModalView, NewLevelComponentModal, forms, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/component/new');

LevelComponent = require('models/LevelComponent');

forms = require('core/forms');

me = require('core/auth').me;

module.exports = NewLevelComponentModal = (function(superClass) {
  extend(NewLevelComponentModal, superClass);

  NewLevelComponentModal.prototype.id = 'editor-level-component-new-modal';

  NewLevelComponentModal.prototype.template = template;

  NewLevelComponentModal.prototype.instant = false;

  NewLevelComponentModal.prototype.modalWidthPercent = 60;

  NewLevelComponentModal.prototype.events = {
    'click #new-level-component-submit': 'makeNewLevelComponent',
    'submit form': 'makeNewLevelComponent'
  };

  function NewLevelComponentModal(options) {
    NewLevelComponentModal.__super__.constructor.call(this, options);
    this.systems = LevelComponent.schema.properties.system["enum"];
  }

  NewLevelComponentModal.prototype.makeNewLevelComponent = function(e) {
    var component, name, res, system;
    e.preventDefault();
    system = this.$el.find('#level-component-system').val();
    name = this.$el.find('#level-component-name').val();
    component = new LevelComponent();
    component.set('system', system);
    component.set('name', name);
    component.set('code', component.get('code', true).replace(/AttacksSelf/g, name));
    component.set('permissions', [
      {
        access: 'owner',
        target: me.id
      }
    ]);
    res = component.save(null, {
      type: 'POST'
    });
    if (!res) {
      return;
    }
    this.showLoading();
    res.error((function(_this) {
      return function() {
        _this.hideLoading();
        console.log('Got errors:', JSON.parse(res.responseText));
        return forms.applyErrorsToForm(_this.$el, JSON.parse(res.responseText));
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        _this.supermodel.registerModel(component);
        return _this.hide();
      };
    })(this));
  };

  return NewLevelComponentModal;

})(ModalView);
});

;require.register("views/editor/level/modals/ArtisanGuideModal", function(exports, require, module) {
var ArtisanGuideModal, ModalView, contactSchema, forms, sendContactMessage, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/artisan-guide-modal');

forms = require('core/forms');

sendContactMessage = require('core/contact').sendContactMessage;

contactSchema = {
  additionalProperties: false,
  required: ['creditName', 'levelPurpose', 'levelInspiration', 'levelLocation'],
  properties: {
    creditName: {
      type: 'string'
    },
    levelPurpose: {
      type: 'string'
    },
    levelInspiration: {
      type: 'string'
    },
    levelLocation: {
      type: 'string'
    }
  }
};

module.exports = ArtisanGuideModal = (function(superClass) {
  extend(ArtisanGuideModal, superClass);

  function ArtisanGuideModal() {
    return ArtisanGuideModal.__super__.constructor.apply(this, arguments);
  }

  ArtisanGuideModal.prototype.id = 'artisan-guide-modal';

  ArtisanGuideModal.prototype.template = template;

  ArtisanGuideModal.prototype.events = {
    'click #level-submit': 'levelSubmit'
  };

  ArtisanGuideModal.prototype.initialize = function(options) {
    this.level = options.level;
    return this.options = {
      level: this.level.get('name'),
      levelSlug: this.level.get('slug')
    };
  };

  ArtisanGuideModal.prototype.levelSubmit = function() {
    var contactMessage, res, results;
    this.playSound('menu-button-click');
    forms.clearFormAlerts(this.$el);
    results = forms.formToObject(this.$el);
    res = tv4.validateMultiple(results, contactSchema);
    if (!res.valid) {
      return forms.applyErrorsToForm(this.$el, res.errors);
    }
    contactMessage = {
      message: "User Name: " + results.creditName + "\nLevel: <a href=\"http://codecombat.com/editor/level/" + this.options.levelSlug + "\">" + this.options.level + "</a>\nPurpose: " + results.levelPurpose + "\nInspiration: " + results.levelInspiration + "\nLocation: " + results.levelLocation
    };
    this.populateBrowserData(contactMessage);
    contactMessage = _.merge(contactMessage, this.options);
    contactMessage.country = me.get('country');
    sendContactMessage(contactMessage, this.$el);
    return $.post("/db/user/" + me.id + "/track/contact_codecombat");
  };

  ArtisanGuideModal.prototype.populateBrowserData = function(context) {
    var ref, ref1;
    if ($.browser) {
      context.browser = $.browser.platform + " " + $.browser.name + " " + $.browser.versionNumber;
    }
    context.screenSize = ((ref = typeof screen !== "undefined" && screen !== null ? screen.width : void 0) != null ? ref : $(window).width()) + " x " + ((ref1 = typeof screen !== "undefined" && screen !== null ? screen.height : void 0) != null ? ref1 : $(window).height());
    return context.screenshotURL = this.screenshotURL;
  };

  ArtisanGuideModal.prototype.hasOwnership = function() {
    if (this.level.getOwner() === me.id) {
      return true;
    }
    return false;
  };

  return ArtisanGuideModal;

})(ModalView);
});

;require.register("views/editor/level/modals/GenerateTerrainModal", function(exports, require, module) {
var CocoModel, GenerateTerrainModal, ModalView, clusters, presetSizes, presets, template, thangSizes,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/generate-terrain-modal');

CocoModel = require('models/CocoModel');

clusters = {
  'hero': {
    'thangs': ['Hero Placeholder'],
    'margin': 1
  },
  'rocks': {
    'thangs': ['Rock 1', 'Rock 2', 'Rock 3', 'Rock 4', 'Rock 5', 'Rock Cluster 1', 'Rock Cluster 2', 'Rock Cluster 3'],
    'margin': 1
  },
  'trees': {
    'thangs': ['Tree 1', 'Tree 2', 'Tree 3', 'Tree 4'],
    'margin': 0.5
  },
  'tree_stands': {
    'thangs': ['Tree Stand 1', 'Tree Stand 2', 'Tree Stand 3', 'Tree Stand 4', 'Tree Stand 5', 'Tree Stand 6'],
    'margin': 3
  },
  'shrubs': {
    'thangs': ['Shrub 1', 'Shrub 2', 'Shrub 3'],
    'margin': 0.5
  },
  'houses': {
    'thangs': ['House 1', 'House 2', 'House 3', 'House 4'],
    'margin': 4
  },
  'animals': {
    'thangs': ['Cow', 'Horse'],
    'margin': 1
  },
  'wood': {
    'thangs': ['Firewood 1', 'Firewood 2', 'Firewood 3'],
    'margin': 1
  },
  'farm': {
    'thangs': ['Farm'],
    'margin': 9
  },
  'cave': {
    'thangs': ['Cave'],
    'margin': 5
  },
  'stone': {
    'thangs': ['Gargoyle', 'Rock Cluster 1', 'Rock Cluster 2', 'Rock Cluster 3'],
    'margin': 1
  },
  'torch': {
    'thangs': ['Torch'],
    'margin': 0
  },
  'chains': {
    'thangs': ['Chains'],
    'margin': 0
  },
  'barrel': {
    'thangs': ['Barrel'],
    'margin': 1
  },
  'doors': {
    'thangs': ['Dungeon Door'],
    'margin': -1
  },
  'grass_floor': {
    'thangs': ['Grass01', 'Grass02', 'Grass03', 'Grass04', 'Grass05'],
    'margin': -1
  },
  'dungeon_wall': {
    'thangs': ['Dungeon Wall'],
    'margin': 2
  },
  'dungeon_floor': {
    'thangs': ['Dungeon Floor'],
    'margin': -1
  },
  'indoor_wall': {
    'thangs': ['Indoor Wall'],
    'margin': 2
  },
  'indoor_floor': {
    'thangs': ['Indoor Floor'],
    'margin': -1
  },
  'furniture': {
    'thangs': ['Bookshelf', 'Chair', 'Table', 'Candle', 'Treasure Chest'],
    'margin': -1
  },
  'desert_walls': {
    'thangs': ['Desert Wall 1', 'Desert Wall 2', 'Desert Wall 3', 'Desert Wall 4', 'Desert Wall 5', 'Desert Wall 6', 'Desert Wall 7', 'Desert Wall 8'],
    'margin': 6
  },
  'desert_floor': {
    'thangs': ['Sand 01', 'Sand 02', 'Sand 03', 'Sand 04', 'Sand 05', 'Sand 06'],
    'margin': -1
  },
  'oases': {
    'thangs': ['Oasis 1', 'Oasis 2', 'Oasis 3'],
    'margin': 4
  },
  'mountain_floor': {
    'thangs': ['Talus 1', 'Talus 2', 'Talus 3', 'Talus 4', 'Talus 5', 'Talus 6'],
    'margin': -1
  },
  'mountain_walls': {
    'thangs': ['Mountain 1', 'Mountain 3'],
    'margin': 6
  },
  'glacier_floor': {
    'thangs': ['Firn 1', 'Firn 2', 'Firn 3', 'Firn 4', 'Firn 5', 'Firn 6'],
    'margin': -1
  },
  'glacier_walls': {
    'thangs': ['Ice Wall'],
    'margin': 2
  }
};

presets = {
  'dungeon': {
    'terrainName': 'Dungeon',
    'type': 'dungeon',
    'borders': 'dungeon_wall',
    'borderNoise': 0,
    'borderSize': 4,
    'borderThickness': 1,
    'floors': 'dungeon_floor',
    'decorations': {
      'Room': {
        'num': [1, 1],
        'width': [12, 20],
        'height': [8, 16],
        'thickness': [2, 2],
        'cluster': 'dungeon_wall'
      },
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'Barrels': {
        'num': [1, 1],
        'width': [8, 12],
        'height': [8, 12],
        'numBarrels': [4, 6],
        'cluster': 'barrel'
      },
      'cave': {
        'num': [1, 1],
        'width': 10,
        'height': 10,
        'clusters': {
          'cave': [1, 1],
          'stone': [2, 4]
        }
      }
    }
  },
  'indoor': {
    'terrainName': 'Indoor',
    'type': 'indoor',
    'borders': 'indoor_wall',
    'borderNoise': 0,
    'borderSize': 4,
    'borderThickness': 1,
    'floors': 'indoor_floor',
    'decorations': {
      'Room': {
        'num': [1, 1],
        'width': [12, 20],
        'height': [8, 16],
        'thickness': [2, 2],
        'cluster': 'indoor_wall'
      },
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'furniture': {
        'num': [1, 2],
        'width': 15,
        'height': 15,
        'clusters': {
          'furniture': [2, 4]
        }
      }
    }
  },
  'grassy': {
    'terrainName': 'Grass',
    'type': 'grassy',
    'borders': 'tree_stands',
    'borderNoise': 1,
    'borderSize': 2,
    'borderThickness': 2,
    'floors': 'grass_floor',
    'decorations': {
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'house': {
        'num': [1, 2],
        'width': 15,
        'height': 15,
        'clusters': {
          'houses': [1, 1],
          'trees': [1, 2],
          'shrubs': [0, 3],
          'rocks': [1, 2]
        }
      },
      'farm': {
        'num': [1, 1],
        'width': 25,
        'height': 15,
        'clusters': {
          'farm': [1, 1],
          'shrubs': [2, 3],
          'wood': [2, 4],
          'animals': [2, 3]
        }
      }
    }
  },
  'desert': {
    'terrainName': 'Desert',
    'type': 'desert',
    'borders': 'desert_walls',
    'borderNoise': 2,
    'borderSize': 4,
    'borderThickness': 4,
    'floors': 'desert_floor',
    'decorations': {
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'oasis': {
        'num': [1, 2],
        'width': 10,
        'height': 10,
        'clusters': {
          'oases': [1, 1],
          'shrubs': [0, 5],
          'rocks': [0, 2]
        }
      }
    }
  },
  'mountain': {
    'terrainName': 'Mountain',
    'type': 'mountain',
    'floors': 'mountain_floor',
    'borders': 'mountain_walls',
    'borderNoise': 1,
    'borderSize': 1,
    'borderThickness': 1,
    'decorations': {
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      }
    }
  },
  'glacier': {
    'terrainName': 'Glacier',
    'type': 'glacier',
    'floors': 'glacier_floor',
    'borders': 'glacier_walls',
    'borderNoise': 0,
    'borderSize': 4,
    'borderThickness': 1,
    'decorations': {
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'Room': {
        'num': [1, 1],
        'width': [12, 20],
        'height': [8, 16],
        'thickness': [2, 2],
        'cluster': 'glacier_walls'
      }
    }
  }
};

presetSizes = {
  'small': {
    'x': 80,
    'y': 68,
    'sizeFactor': 1
  },
  'large': {
    'x': 160,
    'y': 136,
    'sizeFactor': 2
  }
};

thangSizes = {
  'floorSize': {
    'x': 20,
    'y': 17
  },
  'borderSize': {
    'x': 4,
    'y': 4
  }
};

module.exports = GenerateTerrainModal = (function(superClass) {
  extend(GenerateTerrainModal, superClass);

  GenerateTerrainModal.prototype.id = 'generate-terrain-modal';

  GenerateTerrainModal.prototype.template = template;

  GenerateTerrainModal.prototype.plain = true;

  GenerateTerrainModal.prototype.modalWidthPercent = 90;

  GenerateTerrainModal.prototype.events = {
    'click .choose-option': 'onGenerate'
  };

  function GenerateTerrainModal(options) {
    GenerateTerrainModal.__super__.constructor.call(this, options);
    this.presets = presets;
    this.presetSizes = presetSizes;
  }

  GenerateTerrainModal.prototype.onRevertModel = function(e) {
    var id;
    id = $(e.target).val();
    CocoModel.backedUp[id].revert();
    $(e.target).closest('tr').remove();
    return this.reloadOnClose = true;
  };

  GenerateTerrainModal.prototype.onGenerate = function(e) {
    var presetSize, presetType, target;
    target = $(e.target);
    presetType = target.attr('data-preset-type');
    presetSize = target.attr('data-preset-size');
    this.generateThangs(presetType, presetSize);
    Backbone.Mediator.publish('editor:random-terrain-generated', {
      thangs: this.thangs,
      terrain: presets[presetType].terrainName
    });
    return this.hide();
  };

  GenerateTerrainModal.prototype.generateThangs = function(presetName, presetSize) {
    var preset;
    this.falseCount = 0;
    preset = presets[presetName];
    presetSize = presetSizes[presetSize];
    this.thangs = [];
    this.rects = [];
    this.generateFloor(preset, presetSize);
    this.generateBorder(preset, presetSize, preset.borderNoise);
    return this.generateDecorations(preset, presetSize);
  };

  GenerateTerrainModal.prototype.generateFloor = function(preset, presetSize) {
    var i, j, k, len, ref, results;
    ref = _.range(0, presetSize.x, thangSizes.floorSize.x);
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      results.push((function() {
        var l, len1, ref1, results1;
        ref1 = _.range(0, presetSize.y, thangSizes.floorSize.y);
        results1 = [];
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          j = ref1[l];
          results1.push(this.thangs.push({
            'id': this.getRandomThang(clusters[preset.floors].thangs),
            'pos': {
              'x': i + thangSizes.floorSize.x / 2,
              'y': j + thangSizes.floorSize.y / 2
            },
            'margin': clusters[preset.floors].margin
          }));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.generateBorder = function(preset, presetSize, noiseFactor) {
    var i, j, k, l, len, len1, len2, m, ref, ref1, ref2, results;
    if (noiseFactor == null) {
      noiseFactor = 1;
    }
    ref = _.range(0, presetSize.x, thangSizes.borderSize.x);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      ref1 = _.range(preset.borderThickness);
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        j = ref1[l];
        while (!this.addThang({
            'id': this.getRandomThang(clusters[preset.borders].thangs),
            'pos': {
              'x': i + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.x / 2, thangSizes.borderSize.x / 2),
              'y': 0 + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.y / 2, thangSizes.borderSize.y)
            },
            'margin': clusters[preset.borders].margin
          })) {
          continue;
        }
        while (!this.addThang({
            'id': this.getRandomThang(clusters[preset.borders].thangs),
            'pos': {
              'x': i + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.x / 2, thangSizes.borderSize.x / 2),
              'y': presetSize.y - preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.y, thangSizes.borderSize.y / 2)
            },
            'margin': clusters[preset.borders].margin
          })) {
          continue;
        }
        if (preset.type === 'dungeon') {
          this.addThang({
            'id': this.getRandomThang(clusters[preset.borders].thangs),
            'pos': {
              'x': i + preset.borderSize / 2,
              'y': presetSize.y - 3 * preset.borderSize / 2
            },
            'margin': clusters[preset.borders].margin
          });
          if ((i / preset.borderSize) % 2 && i !== presetSize.x - thangSizes.borderSize.x) {
            this.addThang({
              'id': this.getRandomThang(clusters['torch'].thangs),
              'pos': {
                'x': i + preset.borderSize,
                'y': presetSize.y - preset.borderSize / 2
              },
              'margin': clusters['torch'].margin
            });
          } else if ((i / preset.borderSize) % 2 === 0 && i && _.random(100) < 30) {
            this.addThang({
              'id': this.getRandomThang(clusters['chains'].thangs),
              'pos': {
                'x': i + preset.borderSize,
                'y': presetSize.y - preset.borderSize / 2
              },
              'margin': clusters['chains'].margin
            });
          }
        }
      }
    }
    ref2 = _.range(0, presetSize.y, thangSizes.borderSize.y);
    results = [];
    for (m = 0, len2 = ref2.length; m < len2; m++) {
      i = ref2[m];
      results.push((function() {
        var len3, n, ref3, results1;
        ref3 = _.range(preset.borderThickness);
        results1 = [];
        for (n = 0, len3 = ref3.length; n < len3; n++) {
          j = ref3[n];
          while (!this.addThang({
              'id': this.getRandomThang(clusters[preset.borders].thangs),
              'pos': {
                'x': 0 + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.x / 2, thangSizes.borderSize.x),
                'y': i + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.y / 2, thangSizes.borderSize.y / 2)
              },
              'margin': clusters[preset.borders].margin
            })) {
            continue;
          }
          results1.push((function() {
            var results2;
            results2 = [];
            while (!this.addThang({
                'id': this.getRandomThang(clusters[preset.borders].thangs),
                'pos': {
                  'x': presetSize.x - preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.x, thangSizes.borderSize.x / 2),
                  'y': i + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.y / 2, thangSizes.borderSize.y / 2)
                },
                'margin': clusters[preset.borders].margin
              })) {
              continue;
            }
            return results2;
          }).call(this));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.generateDecorations = function(preset, presetSize) {
    var cluster, decoration, i, name, num, range, rect, ref, results;
    ref = preset.decorations;
    results = [];
    for (name in ref) {
      decoration = ref[name];
      results.push((function() {
        var k, len, ref1, results1;
        ref1 = _.range(presetSize.sizeFactor * _.random(decoration.num[0], decoration.num[1]));
        results1 = [];
        for (k = 0, len = ref1.length; k < len; k++) {
          num = ref1[k];
          if (this['build' + name] !== void 0) {
            this['build' + name](preset, presetSize, decoration);
            continue;
          }
          while (true) {
            rect = {
              'x': _.random(decoration.width / 2 + preset.borderSize / 2 + thangSizes.borderSize.x, presetSize.x - decoration.width / 2 - preset.borderSize / 2 - thangSizes.borderSize.x),
              'y': _.random(decoration.height / 2 + preset.borderSize / 2 + thangSizes.borderSize.y, presetSize.y - decoration.height / 2 - preset.borderSize / 2 - thangSizes.borderSize.y),
              'width': decoration.width,
              'height': decoration.height
            };
            if (this.addRect(rect)) {
              break;
            }
          }
          results1.push((function() {
            var ref2, results2;
            ref2 = decoration.clusters;
            results2 = [];
            for (cluster in ref2) {
              range = ref2[cluster];
              results2.push((function() {
                var l, len1, ref3, results3;
                ref3 = _.range(_.random(range[0], range[1]));
                results3 = [];
                for (l = 0, len1 = ref3.length; l < len1; l++) {
                  i = ref3[l];
                  results3.push((function() {
                    var results4;
                    results4 = [];
                    while (!this.addThang({
                        'id': this.getRandomThang(clusters[cluster].thangs),
                        'pos': {
                          'x': _.random(rect.x - rect.width / 2, rect.x + rect.width / 2),
                          'y': _.random(rect.y - rect.height / 2, rect.y + rect.height / 2)
                        },
                        'margin': clusters[cluster].margin
                      })) {
                      continue;
                    }
                    return results4;
                  }).call(this));
                }
                return results3;
              }).call(this));
            }
            return results2;
          }).call(this));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.buildRoom = function(preset, presetSize, room) {
    var bottomDoor, bottomDoorX, grid, i, k, l, len, len1, len2, m, rect, ref, ref1, ref2, results, roomThickness, t, thang, topDoor, topDoorX, xRange;
    grid = preset.borderSize;
    while (true) {
      rect = {
        'width': presetSize.sizeFactor * (room.width[0] + grid * _.random(0, (room.width[1] - room.width[0]) / grid)),
        'height': presetSize.sizeFactor * (room.height[0] + grid * _.random(0, (room.height[1] - room.height[0]) / grid))
      };
      rect.width = Math.round((rect.width - grid) / (2 * grid)) * 2 * grid + grid;
      rect.height = Math.round((rect.height - grid) / (2 * grid)) * 2 * grid + grid;
      roomThickness = _.random(room.thickness[0], room.thickness[1]);
      rect.x = _.random(rect.width / 2 + grid * (roomThickness + 1.5), presetSize.x - rect.width / 2 - grid * (roomThickness + 1.5));
      rect.y = _.random(rect.height / 2 + grid * (roomThickness + 2.5), presetSize.y - rect.height / 2 - grid * (roomThickness + 3.5));
      rect.x = Math.round((rect.x - grid / 2) / grid) * grid;
      rect.y = Math.round((rect.y - grid / 2) / grid) * grid;
      if (this.addRect({
        'x': rect.x,
        'y': rect.y,
        'width': rect.width + 2.5 * roomThickness * grid,
        'height': rect.height + 2.5 * roomThickness * grid
      })) {
        break;
      }
    }
    xRange = _.range(rect.x - rect.width / 2 + grid, rect.x + rect.width / 2, grid);
    topDoor = _.random(1) > 0.5;
    topDoorX = xRange[_.random(0, xRange.length - 1)];
    bottomDoor = !topDoor ? true : _.random(1) > 0.5;
    bottomDoorX = xRange[_.random(0, xRange.length - 1)];
    ref = _.range(0, roomThickness + 1);
    for (k = 0, len = ref.length; k < len; k++) {
      t = ref[k];
      ref1 = _.range(rect.x - rect.width / 2 - (t - 1) * grid, rect.x + rect.width / 2 + t * grid, grid);
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        i = ref1[l];
        thang = {
          'id': this.getRandomThang(clusters[room.cluster].thangs),
          'pos': {
            'x': i,
            'y': rect.y - rect.height / 2 - t * grid
          },
          'margin': clusters[room.cluster].margin
        };
        if (i === bottomDoorX && bottomDoor) {
          thang.id = this.getRandomThang(clusters['doors'].thangs);
          thang.pos.y -= grid / 3;
        }
        if (!(i === bottomDoorX && t !== roomThickness && bottomDoor)) {
          this.addThang(thang);
        }
        if (t === roomThickness && i !== rect.x - rect.width / 2 - (t - 1) * grid && preset.type === 'dungeon') {
          if ((i !== bottomDoorX && i !== bottomDoorX + grid) || !bottomDoor) {
            this.addThang({
              'id': this.getRandomThang(clusters['torch'].thangs),
              'pos': {
                'x': thang.pos.x - grid / 2,
                'y': thang.pos.y + grid
              },
              'margin': clusters['torch'].margin
            });
          }
        }
        thang = {
          'id': this.getRandomThang(clusters[room.cluster].thangs),
          'pos': {
            'x': i,
            'y': rect.y + rect.height / 2 + t * grid
          },
          'margin': clusters[room.cluster].margin
        };
        if (i === topDoorX && topDoor) {
          thang.id = this.getRandomThang(clusters['doors'].thangs);
          thang.pos.y -= grid;
        }
        if (!(i === topDoorX && t !== roomThickness && topDoor)) {
          this.addThang(thang);
        }
      }
    }
    ref2 = _.range(0, roomThickness);
    results = [];
    for (m = 0, len2 = ref2.length; m < len2; m++) {
      t = ref2[m];
      results.push((function() {
        var len3, n, ref3, results1;
        ref3 = _.range(rect.y - rect.height / 2 - t * grid, rect.y + rect.height / 2 + (t + 1) * grid, grid);
        results1 = [];
        for (n = 0, len3 = ref3.length; n < len3; n++) {
          i = ref3[n];
          this.addThang({
            'id': this.getRandomThang(clusters[room.cluster].thangs),
            'pos': {
              'x': rect.x - rect.width / 2 - t * grid,
              'y': i
            },
            'margin': clusters[room.cluster].margin
          });
          results1.push(this.addThang({
            'id': this.getRandomThang(clusters[room.cluster].thangs),
            'pos': {
              'x': rect.x + rect.width / 2 + t * grid,
              'y': i
            },
            'margin': clusters[room.cluster].margin
          }));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.buildBarrels = function(preset, presetSize, decoration) {
    var i, j, k, len, num, rect, results, x, y;
    rect = {
      'width': presetSize.sizeFactor * (_.random(decoration.width[0], decoration.width[1])),
      'height': presetSize.sizeFactor * (_.random(decoration.height[0], decoration.height[1]))
    };
    x = [rect.width / 2 + preset.borderSize, presetSize.x - rect.width / 2 - preset.borderSize];
    y = [rect.height / 2 + preset.borderSize, presetSize.y - rect.height / 2 - 2 * preset.borderSize];
    results = [];
    for (k = 0, len = x.length; k < len; k++) {
      i = x[k];
      results.push((function() {
        var l, len1, results1;
        results1 = [];
        for (l = 0, len1 = y.length; l < len1; l++) {
          j = y[l];
          if (_.random(100) < 40) {
            rect = {
              'x': i,
              'y': j,
              'width': rect.width,
              'height': rect.height
            };
            if (this.addRect(rect)) {
              results1.push((function() {
                var len2, m, ref, results2;
                ref = _.range(_.random(decoration.numBarrels[0], decoration.numBarrels[1]));
                results2 = [];
                for (m = 0, len2 = ref.length; m < len2; m++) {
                  num = ref[m];
                  results2.push((function() {
                    var results3;
                    results3 = [];
                    while (!this.addThang({
                        'id': this.getRandomThang(clusters[decoration.cluster].thangs),
                        'pos': {
                          'x': _.random(rect.x - rect.width / 2, rect.x + rect.width / 2),
                          'y': _.random(rect.y - rect.height / 2, rect.y + rect.height / 2)
                        },
                        'margin': clusters[decoration.cluster].margin
                      })) {
                      continue;
                    }
                    return results3;
                  }).call(this));
                }
                return results2;
              }).call(this));
            } else {
              results1.push(void 0);
            }
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.addThang = function(thang) {
    var existingThang, k, len, ref;
    if (this.falseCount > 100) {
      console.log('infinite loop', thang);
      this.falseCount = 0;
      return true;
    }
    ref = this.thangs;
    for (k = 0, len = ref.length; k < len; k++) {
      existingThang = ref[k];
      if (existingThang.margin === -1 || thang.margin === -1) {
        continue;
      }
      if (Math.abs(existingThang.pos.x - thang.pos.x) < thang.margin + existingThang.margin && Math.abs(existingThang.pos.y - thang.pos.y) < thang.margin + existingThang.margin) {
        this.falseCount++;
        return false;
      }
    }
    this.thangs.push(thang);
    return true;
  };

  GenerateTerrainModal.prototype.addRect = function(rect) {
    var existingRect, k, len, ref;
    if (this.falseCount > 100) {
      console.log('infinite loop', rect);
      this.falseCount = 0;
      return true;
    }
    ref = this.rects;
    for (k = 0, len = ref.length; k < len; k++) {
      existingRect = ref[k];
      if (Math.abs(existingRect.x - rect.x) <= rect.width / 2 + existingRect.width / 2 && Math.abs(existingRect.y - rect.y) <= rect.height / 2 + existingRect.height / 2) {
        this.falseCount++;
        return false;
      }
    }
    this.rects.push(rect);
    return true;
  };

  GenerateTerrainModal.prototype.getRandomThang = function(thangList) {
    return thangList[_.random(0, thangList.length - 1)];
  };

  GenerateTerrainModal.prototype.onHidden = function() {
    if (this.reloadOnClose) {
      return location.reload();
    }
  };

  return GenerateTerrainModal;

})(ModalView);
});

;require.register("views/editor/level/modals/LevelVersionsModal", function(exports, require, module) {
var LevelVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = LevelVersionsModal = (function(superClass) {
  extend(LevelVersionsModal, superClass);

  LevelVersionsModal.prototype.id = 'editor-level-versions-view';

  LevelVersionsModal.prototype.url = '/db/level/';

  LevelVersionsModal.prototype.page = 'level';

  function LevelVersionsModal(options, ID) {
    this.ID = ID;
    LevelVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/Level'));
  }

  return LevelVersionsModal;

})(VersionsModal);
});

;require.register("views/editor/level/modals/LoadBranchModal", function(exports, require, module) {
var Branch, Branches, DeltaView, LevelComponents, LevelSystems, LoadBranchModal, ModalView, deltasLib, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/load-branch-modal');

DeltaView = require('views/editor/DeltaView');

deltasLib = require('core/deltas');

Branch = require('models/Branch');

Branches = require('collections/Branches');

LevelComponents = require('collections/LevelComponents');

LevelSystems = require('collections/LevelSystems');

module.exports = LoadBranchModal = (function(superClass) {
  extend(LoadBranchModal, superClass);

  function LoadBranchModal() {
    return LoadBranchModal.__super__.constructor.apply(this, arguments);
  }

  LoadBranchModal.prototype.id = 'load-branch-modal';

  LoadBranchModal.prototype.template = template;

  LoadBranchModal.prototype.modalWidthPercent = 99;

  LoadBranchModal.prototype.events = {
    'click #load-branch-btn': 'onClickLoadBranchButton',
    'click #unstash-branch-btn': 'onClickUnstashBranchButton',
    'click #branches-list-group .list-group-item': 'onClickBranch',
    'click .delete-branch-btn': 'onClickDeleteBranchButton'
  };

  LoadBranchModal.prototype.initialize = function(arg) {
    this.components = arg.components, this.systems = arg.systems;
    this.branches = new Branches();
    return this.branches.fetch({
      url: '/db/branches'
    }).then((function(_this) {
      return function() {
        var branch, collection, fetches, i, j, len, len1, model, patch, ref, ref1;
        _this.selectedBranch = _this.branches.first();
        fetches = [];
        ref = _this.branches.models;
        for (i = 0, len = ref.length; i < len; i++) {
          branch = ref[i];
          ref1 = branch.get('patches');
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            patch = ref1[j];
            collection = patch.target.collection === 'level_component' ? _this.components : _this.systems;
            model = collection.get(patch.target.id);
            if (!model) {
              model = new collection.model({
                _id: patch.target.id
              });
              fetches.push(model.fetch());
              model.once('sync', function() {
                return this.markToRevert();
              });
              collection.add(model);
            }
          }
        }
        return $.when.apply($, fetches);
      };
    })(this)).then((function(_this) {
      return function() {
        var applied, branch, collection, currentModel, i, key, len, originalChange, patch, postLoadChange, ref, results, toApply;
        ref = _this.branches.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          branch = ref[i];
          results.push((function() {
            var j, k, len1, len2, ref1, ref2, results1;
            ref1 = branch.get('patches');
            results1 = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              patch = ref1[j];
              patch.id = _.uniqueId();
              collection = patch.target.collection === 'level_component' ? this.components : this.systems;
              originalChange = collection.get(patch.target.id).clone(false);
              originalChange.markToRevert();
              originalChange.applyDelta(patch.delta);
              currentModel = collection.find(function(model) {
                return _.all([model.get('original') === patch.target.original, model.get('version').isLatestMajor]);
              });
              postLoadChange = currentModel.clone();
              postLoadChange.markToRevert();
              toApply = currentModel.clone(false);
              applied = toApply.applyDelta(patch.delta);
              if (applied) {
                postLoadChange.set(toApply.attributes);
                ref2 = postLoadChange.keys();
                for (k = 0, len2 = ref2.length; k < len2; k++) {
                  key = ref2[k];
                  if (!toApply.has(key)) {
                    postLoadChange.unset(key);
                  }
                }
              }
              results1.push(_.assign(patch, {
                originalChange: originalChange,
                postLoadChange: postLoadChange,
                applied: applied,
                currentModelHasLocalChanges: currentModel.hasLocalChanges(),
                modelHasChangedSincePatchCreated: originalChange.id !== currentModel.id,
                currentModel: currentModel
              }));
            }
            return results1;
          }).call(_this));
        }
        return results;
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
  };

  LoadBranchModal.prototype.afterRender = function() {
    LoadBranchModal.__super__.afterRender.call(this);
    return this.renderSelectedBranch();
  };

  LoadBranchModal.prototype.insertDeltaView = function(model, changeEl, headModel) {
    var deltaView, e, error;
    try {
      deltaView = new DeltaView({
        model: model,
        headModel: headModel,
        skipPaths: deltasLib.DOC_SKIP_PATHS
      });
      this.insertSubView(deltaView, $(changeEl));
      return deltaView;
    } catch (error) {
      e = error;
      return console.error('Couldn\'t create delta view:', e);
    }
  };

  LoadBranchModal.prototype.renderSelectedBranch = function() {
    var i, j, len, len1, originalChangeEl, patch, postLoadChangeEl, ref, ref1, results, view;
    if (this.selectedBranchDeltaViews) {
      ref = this.selectedBranchDeltaViews;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        this.removeSubView(view);
      }
    }
    this.selectedBranchDeltaViews = [];
    this.renderSelectors('#selected-branch-col');
    if (!this.selectedBranch) {
      return;
    }
    ref1 = this.selectedBranch.get('patches');
    results = [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      patch = ref1[j];
      originalChangeEl = this.$(".changes-stub[data-patch-id='" + patch.id + "'][data-prop='original-change']");
      this.insertDeltaView(patch.originalChange, originalChangeEl);
      postLoadChangeEl = this.$(".changes-stub[data-patch-id='" + patch.id + "'][data-prop='post-load-change']");
      results.push(this.insertDeltaView(patch.postLoadChange, postLoadChangeEl));
    }
    return results;
  };

  LoadBranchModal.prototype.onClickBranch = function(e) {
    var branchCid;
    $(e.currentTarget).closest('.list-group').find('.active').removeClass('active');
    $(e.currentTarget).addClass('active');
    branchCid = $(e.currentTarget).data('branch-cid');
    this.selectedBranch = this.branches.get(branchCid);
    return this.renderSelectedBranch();
  };

  LoadBranchModal.prototype.onClickUnstashBranchButton = function(e) {
    return this.loadBranch({
      deleteBranch: true
    });
  };

  LoadBranchModal.prototype.onClickLoadBranchButton = function(e) {
    return this.loadBranch({
      deleteBranch: false
    });
  };

  LoadBranchModal.prototype.loadBranch = function(arg) {
    var branch, branchCid, currentModel, deleteBranch, i, j, key, len, len1, patch, postLoadChange, ref, ref1, selectedBranch;
    deleteBranch = arg.deleteBranch;
    selectedBranch = this.$('#branches-list-group .active');
    branchCid = selectedBranch.data('branch-cid');
    branch = this.branches.get(branchCid);
    ref = branch.get('patches');
    for (i = 0, len = ref.length; i < len; i++) {
      patch = ref[i];
      if (!patch.applied) {
        continue;
      }
      currentModel = patch.currentModel, postLoadChange = patch.postLoadChange;
      currentModel.set(postLoadChange.attributes);
      ref1 = currentModel.keys();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        key = ref1[j];
        if (!postLoadChange.has(key)) {
          currentModel.unset(key);
        }
      }
    }
    if (deleteBranch) {
      Promise.resolve(branch.destroy())["catch"]((function(_this) {
        return function(e) {
          return noty({
            text: 'Failed to delete branch after unstashing',
            layout: 'topCenter',
            type: 'error',
            killer: false
          });
        };
      })(this));
    }
    return this.hide();
  };

  LoadBranchModal.prototype.onClickDeleteBranchButton = function(e) {
    var branch, branchCid;
    e.preventDefault();
    e.stopImmediatePropagation();
    branchCid = $(e.currentTarget).closest('.list-group-item').data('branch-cid');
    branch = this.branches.get(branchCid);
    if (!confirm('Really delete this branch?')) {
      return;
    }
    branch.destroy();
    this.branches.remove(branch);
    if (branch === this.selectedBranch) {
      this.selectedBranch = null;
      this.renderSelectedBranch();
    }
    return $(e.currentTarget).closest('.list-group-item').remove();
  };

  return LoadBranchModal;

})(ModalView);
});

;require.register("views/editor/level/modals/NewAchievementModal", function(exports, require, module) {
var Achievement, NewAchievementModal, NewModelModal, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

NewModelModal = require('views/editor/modal/NewModelModal');

template = require('templates/editor/level/modal/new-achievement');

forms = require('core/forms');

Achievement = require('models/Achievement');

module.exports = NewAchievementModal = (function(superClass) {
  extend(NewAchievementModal, superClass);

  NewAchievementModal.prototype.id = 'new-achievement-modal';

  NewAchievementModal.prototype.template = template;

  NewAchievementModal.prototype.plain = false;

  NewAchievementModal.prototype.events = {
    'click #save-new-achievement-link': 'onAchievementSubmitted'
  };

  function NewAchievementModal(options) {
    NewAchievementModal.__super__.constructor.call(this, options);
    this.level = options.level;
  }

  NewAchievementModal.prototype.onAchievementSubmitted = function(e) {
    var slug, url;
    slug = _.string.slugify(this.$el.find('#name').val());
    url = "/editor/achievement/" + slug;
    return window.open(url, '_blank');
  };

  NewAchievementModal.prototype.createQuery = function() {
    var check, checked, checkedValues, i, id, len, query;
    checked = this.$el.find('[name=queryOptions]:checked');
    checkedValues = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = checked.length; i < len; i++) {
        check = checked[i];
        results.push($(check).val());
      }
      return results;
    })();
    query = {};
    for (i = 0, len = checkedValues.length; i < len; i++) {
      id = checkedValues[i];
      switch (id) {
        case 'misc-level-completion':
          query['state.complete'] = true;
          break;
        default:
          query["state.goalStates." + id + ".status"] = 'success';
      }
    }
    query['level.original'] = this.level.get('original');
    return query;
  };

  NewAchievementModal.prototype.makeNewModel = function() {
    var achievement, description, name, query;
    achievement = new Achievement;
    name = this.$el.find('#name').val();
    description = this.$el.find('#description').val();
    query = this.createQuery();
    achievement.set('name', name);
    achievement.set('description', description);
    achievement.set('query', query);
    achievement.set('collection', 'level.sessions');
    achievement.set('userField', 'creator');
    achievement.set('related', this.level.get('original'));
    return achievement;
  };

  return NewAchievementModal;

})(NewModelModal);
});

;require.register("views/editor/level/modals/SaveBranchModal", function(exports, require, module) {
var Branch, Branches, DeltaView, LevelComponents, LevelSystems, ModalView, SaveBranchModal, deltasLib, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/save-branch-modal');

DeltaView = require('views/editor/DeltaView');

deltasLib = require('core/deltas');

Branch = require('models/Branch');

Branches = require('collections/Branches');

LevelComponents = require('collections/LevelComponents');

LevelSystems = require('collections/LevelSystems');

module.exports = SaveBranchModal = (function(superClass) {
  extend(SaveBranchModal, superClass);

  function SaveBranchModal() {
    return SaveBranchModal.__super__.constructor.apply(this, arguments);
  }

  SaveBranchModal.prototype.id = 'save-branch-modal';

  SaveBranchModal.prototype.template = template;

  SaveBranchModal.prototype.modalWidthPercent = 99;

  SaveBranchModal.prototype.events = {
    'click #save-branch-btn': 'onClickSaveBranchButton',
    'click #branches-list-group .list-group-item': 'onClickBranch',
    'click .delete-branch-btn': 'onClickDeleteBranchButton',
    'click #stash-branch-btn': 'onClickStashBranchButton'
  };

  SaveBranchModal.prototype.initialize = function(arg) {
    this.components = arg.components, this.systems = arg.systems;
    this.componentsWithChanges = new LevelComponents(this.components.filter(function(c) {
      return c.hasLocalChanges();
    }));
    this.systemsWithChanges = new LevelSystems(this.systems.filter(function(c) {
      return c.hasLocalChanges();
    }));
    this.branches = new Branches();
    return this.branches.fetch({
      url: '/db/branches'
    }).then((function(_this) {
      return function() {
        var branch, collection, fetches, i, j, len, len1, model, patch, ref, ref1;
        fetches = [];
        ref = _this.branches.models;
        for (i = 0, len = ref.length; i < len; i++) {
          branch = ref[i];
          ref1 = branch.get('patches') || [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            patch = ref1[j];
            collection = patch.target.collection === 'level_component' ? _this.components : _this.systems;
            model = collection.get(patch.target.id);
            if (!model) {
              model = new collection.model({
                _id: patch.target.id
              });
              fetches.push(model.fetch());
              model.once('sync', function() {
                return this.markToRevert();
              });
              collection.add(model);
            }
          }
        }
        return $.when.apply($, fetches);
      };
    })(this)).then((function(_this) {
      return function() {
        var allModels, branch, changedModels, i, j, len, len1, model, patch, ref, ref1;
        ref = _this.branches.models;
        for (i = 0, len = ref.length; i < len; i++) {
          branch = ref[i];
          branch.components = new Backbone.Collection();
          branch.systems = new Backbone.Collection();
          ref1 = branch.get('patches') || [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            patch = ref1[j];
            patch.id = _.uniqueId();
            if (patch.target.collection === 'level_component') {
              allModels = _this.components;
              changedModels = branch.components;
            } else {
              allModels = _this.systems;
              changedModels = branch.systems;
            }
            model = allModels.get(patch.target.id).clone(false);
            model.markToRevert();
            model.applyDelta(patch.delta);
            changedModels.add(model);
          }
        }
        _this.selectedBranch = _this.branches.first();
        return _this.render();
      };
    })(this));
  };

  SaveBranchModal.prototype.afterRender = function() {
    var changeEl, changeEls, component, componentId, i, j, len, len1, results, system, systemId;
    SaveBranchModal.__super__.afterRender.call(this);
    this.renderSelectedBranch();
    changeEls = this.$el.find('.component-changes-stub');
    for (i = 0, len = changeEls.length; i < len; i++) {
      changeEl = changeEls[i];
      componentId = $(changeEl).data('component-id');
      component = this.componentsWithChanges.find(function(c) {
        return c.id === componentId;
      });
      this.insertDeltaView(component, changeEl);
    }
    changeEls = this.$el.find('.system-changes-stub');
    results = [];
    for (j = 0, len1 = changeEls.length; j < len1; j++) {
      changeEl = changeEls[j];
      systemId = $(changeEl).data('system-id');
      system = this.systemsWithChanges.find(function(c) {
        return c.id === systemId;
      });
      results.push(this.insertDeltaView(system, changeEl));
    }
    return results;
  };

  SaveBranchModal.prototype.insertDeltaView = function(model, changeEl, headModel) {
    var deltaView, e, error;
    try {
      deltaView = new DeltaView({
        model: model,
        headModel: headModel,
        skipPaths: deltasLib.DOC_SKIP_PATHS
      });
      this.insertSubView(deltaView, $(changeEl));
      return deltaView;
    } catch (error) {
      e = error;
      return console.error('Couldn\'t create delta view:', e);
    }
  };

  SaveBranchModal.prototype.renderSelectedBranch = function() {
    var changeEl, changeEls, component, componentDiff, componentId, i, j, k, len, len1, len2, preBranchSave, ref, results, system, systemDiff, systemId, targetComponent, targetSystem, view;
    if (this.selectedBranchDeltaViews) {
      ref = this.selectedBranchDeltaViews;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        this.removeSubView(view);
      }
    }
    this.selectedBranchDeltaViews = [];
    this.renderSelectors('#selected-branch-col');
    changeEls = this.$el.find('#selected-branch-col .component-changes-stub');
    for (j = 0, len1 = changeEls.length; j < len1; j++) {
      changeEl = changeEls[j];
      componentId = $(changeEl).data('component-id');
      component = this.selectedBranch.components.get(componentId);
      targetComponent = this.components.find(function(c) {
        return c.get('original') === component.get('original') && c.get('version').isLatestMajor;
      });
      preBranchSave = component.clone();
      preBranchSave.markToRevert();
      componentDiff = targetComponent.clone();
      preBranchSave.set(componentDiff.attributes);
      this.selectedBranchDeltaViews.push(this.insertDeltaView(preBranchSave, changeEl));
    }
    changeEls = this.$el.find('#selected-branch-col .system-changes-stub');
    results = [];
    for (k = 0, len2 = changeEls.length; k < len2; k++) {
      changeEl = changeEls[k];
      systemId = $(changeEl).data('system-id');
      system = this.selectedBranch.systems.get(systemId);
      targetSystem = this.systems.find(function(c) {
        return c.get('original') === system.get('original') && c.get('version').isLatestMajor;
      });
      preBranchSave = system.clone();
      preBranchSave.markToRevert();
      systemDiff = targetSystem.clone();
      preBranchSave.set(systemDiff.attributes);
      results.push(this.selectedBranchDeltaViews.push(this.insertDeltaView(preBranchSave, changeEl)));
    }
    return results;
  };

  SaveBranchModal.prototype.onClickBranch = function(e) {
    var branchCid;
    $(e.currentTarget).closest('.list-group').find('.active').removeClass('active');
    $(e.currentTarget).addClass('active');
    branchCid = $(e.currentTarget).data('branch-cid');
    this.selectedBranch = branchCid ? this.branches.get(branchCid) : null;
    return this.renderSelectedBranch();
  };

  SaveBranchModal.prototype.onClickStashBranchButton = function(e) {
    return this.saveBranch(e, {
      deleteSavedChanges: true
    });
  };

  SaveBranchModal.prototype.onClickSaveBranchButton = function(e) {
    return this.saveBranch(e, {
      deleteSavedChanges: false
    });
  };

  SaveBranchModal.prototype.saveBranch = function(e, arg) {
    var branch, button, component, deleteSavedChanges, i, j, jqxhr, len, len1, name, patches, selectedComponents, selectedSystems, slug, system, toRevert;
    deleteSavedChanges = arg.deleteSavedChanges;
    if (this.selectedBranch) {
      branch = this.selectedBranch;
    } else {
      name = this.$('#new-branch-name-input').val();
      if (!name) {
        return noty({
          text: 'Name required',
          layout: 'topCenter',
          type: 'error',
          killer: false
        });
      }
      slug = _.string.slugify(name);
      if (this.branches.findWhere({
        slug: slug
      })) {
        return noty({
          text: 'Name taken',
          layout: 'topCenter',
          type: 'error',
          killer: false
        });
      }
      branch = new Branch({
        name: name
      });
    }
    patches = [];
    toRevert = [];
    selectedComponents = _.map(this.$('.component-checkbox:checked'), (function(_this) {
      return function(checkbox) {
        return _this.componentsWithChanges.get($(checkbox).data('component-id'));
      };
    })(this));
    for (i = 0, len = selectedComponents.length; i < len; i++) {
      component = selectedComponents[i];
      patches.push(component.makePatch().toJSON());
      toRevert.push(component);
    }
    selectedSystems = _.map(this.$('.system-checkbox:checked'), (function(_this) {
      return function(checkbox) {
        return _this.systemsWithChanges.get($(checkbox).data('system-id'));
      };
    })(this));
    for (j = 0, len1 = selectedSystems.length; j < len1; j++) {
      system = selectedSystems[j];
      patches.push(system.makePatch().toJSON());
      toRevert.push(system);
    }
    branch.set({
      patches: patches
    });
    jqxhr = branch.save();
    button = $(e.currentTarget);
    if (!jqxhr) {
      return button.text('Save Failed (validation error)');
    }
    button.attr('disabled', true).text('Saving...');
    return Promise.resolve(jqxhr).then((function(_this) {
      return function() {
        var k, len2, model;
        if (deleteSavedChanges) {
          for (k = 0, len2 = toRevert.length; k < len2; k++) {
            model = toRevert[k];
            model.revert();
          }
        }
        return _this.hide();
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        button.attr('disabled', false).text('Save Failed (network/runtime error)');
        throw e;
      };
    })(this));
  };

  SaveBranchModal.prototype.onClickDeleteBranchButton = function(e) {
    var branch, branchCid;
    e.preventDefault();
    e.stopImmediatePropagation();
    branchCid = $(e.currentTarget).closest('.list-group-item').data('branch-cid');
    branch = this.branches.get(branchCid);
    if (!confirm('Really delete this branch?')) {
      return;
    }
    branch.destroy();
    this.branches.remove(branch);
    if (branch === this.selectedBranch) {
      this.selectedBranch = null;
      this.renderSelectedBranch();
    }
    return $(e.currentTarget).closest('.list-group-item').remove();
  };

  return SaveBranchModal;

})(ModalView);
});

;require.register("views/editor/level/modals/SaveLevelModal", function(exports, require, module) {
var DeltaView, LevelComponent, LevelSystem, PatchModal, SaveLevelModal, SaveVersionModal, SuperModel, VerifierTest, deltasLib, forms, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

template = require('templates/editor/level/save-level-modal');

forms = require('core/forms');

LevelComponent = require('models/LevelComponent');

LevelSystem = require('models/LevelSystem');

DeltaView = require('views/editor/DeltaView');

PatchModal = require('views/editor/PatchModal');

deltasLib = require('core/deltas');

VerifierTest = require('views/editor/verifier/VerifierTest');

SuperModel = require('models/SuperModel');

module.exports = SaveLevelModal = (function(superClass) {
  extend(SaveLevelModal, superClass);

  SaveLevelModal.prototype.template = template;

  SaveLevelModal.prototype.instant = false;

  SaveLevelModal.prototype.modalWidthPercent = 60;

  SaveLevelModal.prototype.plain = true;

  SaveLevelModal.prototype.events = {
    'click #save-version-button': 'commitLevel',
    'submit form': 'commitLevel'
  };

  function SaveLevelModal(options) {
    this.onVerifierTestUpate = bind(this.onVerifierTestUpate, this);
    SaveLevelModal.__super__.constructor.call(this, options);
    this.level = options.level;
    this.buildTime = options.buildTime;
  }

  SaveLevelModal.prototype.getRenderData = function(context) {
    if (context == null) {
      context = {};
    }
    context = SaveLevelModal.__super__.getRenderData.call(this, context);
    context.level = this.level;
    context.levelNeedsSave = this.level.hasLocalChanges();
    context.modifiedComponents = _.filter(this.supermodel.getModels(LevelComponent), this.shouldSaveEntity);
    context.modifiedSystems = _.filter(this.supermodel.getModels(LevelSystem), this.shouldSaveEntity);
    this.hasChanges = context.levelNeedsSave || context.modifiedComponents.length || context.modifiedSystems.length;
    this.lastContext = context;
    return context;
  };

  SaveLevelModal.prototype.afterRender = function() {
    var changeEl, changeEls, deltaView, e, error1, i, j, len, m, model, models;
    SaveLevelModal.__super__.afterRender.call(this, false);
    changeEls = this.$el.find('.changes-stub');
    models = this.lastContext.levelNeedsSave ? [this.level] : [];
    models = models.concat(this.lastContext.modifiedComponents);
    models = models.concat(this.lastContext.modifiedSystems);
    models = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = models.length; j < len; j++) {
        m = models[j];
        if (m.hasWriteAccess()) {
          results.push(m);
        }
      }
      return results;
    })();
    for (i = j = 0, len = changeEls.length; j < len; i = ++j) {
      changeEl = changeEls[i];
      model = models[i];
      try {
        deltaView = new DeltaView({
          model: model,
          skipPaths: deltasLib.DOC_SKIP_PATHS
        });
        this.insertSubView(deltaView, $(changeEl));
      } catch (error1) {
        e = error1;
        console.error('Couldn\'t create delta view:', e);
      }
    }
    if (me.isAdmin()) {
      return this.verify();
    }
  };

  SaveLevelModal.prototype.shouldSaveEntity = function(m) {
    if (!m.hasWriteAccess()) {
      return false;
    }
    if (m.get('system') === 'ai' && m.get('name') === 'Jitters' && m.type() === 'LevelComponent') {
      console.log("Should we save", m.get('system'), m.get('name'), m, "? localChanges:", m.hasLocalChanges(), "version:", m.get('version'), 'isPublished:', m.isPublished(), 'collection:', m.collection);
      return false;
    }
    if (m.hasLocalChanges()) {
      return true;
    }
    if (!m.get('version')) {
      console.error("Trying to check major version of " + (m.type()) + " " + (m.get('name')) + ", but it doesn't have a version:", m);
    }
    if ((m.get('version').major === 0 && m.get('version').minor === 0) || !m.isPublished() && !m.collection) {
      return true;
    }
    return false;
  };

  SaveLevelModal.prototype.commitLevel = function(e) {
    var error, errors, field, fields, form, formsToSave, isLevelForm, j, k, kind, klass, l, len, len1, len2, len3, messages, model, modelsToSave, n, newModel, ref, ref1, ref2, ref3, res, results, tuples;
    e.preventDefault();
    this.level.set('buildTime', this.buildTime);
    modelsToSave = [];
    formsToSave = [];
    ref = this.$el.find('form');
    for (j = 0, len = ref.length; j < len; j++) {
      form = ref[j];
      fields = {};
      ref1 = $(form).serializeArray();
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        field = ref1[k];
        fields[field.name] = field.value === 'on' ? true : field.value;
      }
      isLevelForm = $(form).attr('id') === 'save-level-form';
      if (isLevelForm) {
        model = this.level;
      } else {
        ref2 = $(form).hasClass('component-form') ? ['component', LevelComponent] : ['system', LevelSystem], kind = ref2[0], klass = ref2[1];
        model = this.supermodel.getModelByOriginalAndMajorVersion(klass, fields[kind + "-original"], parseInt(fields[kind + "-parent-major-version"], 10));
        if (!model) {
          console.log('Couldn\'t find model for', kind, fields, 'from', this.supermodel.models);
        }
      }
      newModel = fields.major ? model.cloneNewMajorVersion() : model.cloneNewMinorVersion();
      newModel.set('commitMessage', fields['commit-message']);
      modelsToSave.push(newModel);
      if (isLevelForm) {
        this.level = newModel;
        if (fields['publish'] && !this.level.isPublished()) {
          this.level.publish();
        }
      } else if (this.level.isPublished() && !newModel.isPublished()) {
        newModel.publish();
      }
      formsToSave.push(form);
    }
    for (l = 0, len2 = modelsToSave.length; l < len2; l++) {
      model = modelsToSave[l];
      if (errors = model.getValidationErrors()) {
        messages = (function() {
          var len3, n, results;
          results = [];
          for (n = 0, len3 = errors.length; n < len3; n++) {
            error = errors[n];
            results.push("\t " + error.dataPath + ": " + error.message);
          }
          return results;
        })();
        messages = messages.join('<br />');
        this.$el.find('#errors-wrapper .errors').html(messages);
        this.$el.find('#errors-wrapper').removeClass('hide');
        return;
      }
    }
    this.showLoading();
    tuples = _.zip(modelsToSave, formsToSave);
    results = [];
    for (n = 0, len3 = tuples.length; n < len3; n++) {
      ref3 = tuples[n], newModel = ref3[0], form = ref3[1];
      if (newModel.get('i18nCoverage')) {
        newModel.updateI18NCoverage();
      }
      res = newModel.save(null, {
        type: 'POST'
      });
      results.push((function(_this) {
        return function(newModel, form) {
          res.error(function() {
            _this.hideLoading();
            console.log('Got errors:', JSON.parse(res.responseText));
            return forms.applyErrorsToForm($(form), JSON.parse(res.responseText));
          });
          return res.success(function() {
            var oldModel, url;
            modelsToSave = _.without(modelsToSave, newModel);
            oldModel = _.find(_this.supermodel.models, function(m) {
              return m.get('original') === newModel.get('original');
            });
            oldModel.clearBackup();
            if (!modelsToSave.length) {
              url = "/editor/level/" + (_this.level.get('slug') || _this.level.id);
              document.location.href = url;
              return _this.hide();
            }
          });
        };
      })(this)(newModel, form));
    }
    return results;
  };

  SaveLevelModal.prototype.verify = function() {
    var childSupermodel, j, len, results, solution, solutions, test;
    if (!((solutions = this.level.getSolutions()) && solutions.length)) {
      return this.$('#verifier-stub').hide();
    }
    this.running = this.problems = this.failed = this.passedExceptFrames = this.passed = 0;
    this.waiting = solutions.length;
    this.renderSelectors('#verifier-tests');
    results = [];
    for (j = 0, len = solutions.length; j < len; j++) {
      solution = solutions[j];
      childSupermodel = new SuperModel();
      childSupermodel.models = _.clone(this.supermodel.models);
      childSupermodel.collections = _.clone(this.supermodel.collections);
      results.push(test = new VerifierTest(this.level.get('slug'), this.onVerifierTestUpate, childSupermodel, solution.language, {
        devMode: true
      }));
    }
    return results;
  };

  SaveLevelModal.prototype.onVerifierTestUpate = function(e) {
    var ref;
    if (this.destroyed) {
      return;
    }
    if (e.state === 'running') {
      --this.waiting;
      ++this.running;
    } else if ((ref = e.state) === 'complete' || ref === 'error' || ref === 'no-solution') {
      --this.running;
      if (e.state === 'complete') {
        if (e.test.isSuccessful(true)) {
          ++this.passed;
        } else if (e.test.isSuccessful(false)) {
          ++this.passedExceptFrames;
        } else {
          ++this.failed;
        }
      } else if (e.state === 'no-solution') {
        console.warn('Solution problem for', e.test.language);
        ++this.problems;
      } else {
        ++this.problems;
      }
    }
    return this.renderSelectors('#verifier-tests');
  };

  return SaveLevelModal;

})(SaveVersionModal);
});

;require.register("views/editor/level/modals/WorldSelectModal", function(exports, require, module) {
var ModalView, Surface, ThangType, WorldSelectModal, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/world-select-modal');

Surface = require('lib/surface/Surface');

ThangType = require('models/ThangType');

module.exports = WorldSelectModal = (function(superClass) {
  extend(WorldSelectModal, superClass);

  WorldSelectModal.prototype.id = 'world-select-modal';

  WorldSelectModal.prototype.template = template;

  WorldSelectModal.prototype.modalWidthPercent = 80;

  WorldSelectModal.prototype.cache = false;

  WorldSelectModal.prototype.subscriptions = {
    'surface:choose-region': 'selectionMade',
    'surface:choose-point': 'selectionMade'
  };

  WorldSelectModal.prototype.events = {
    'click #done-button': 'done'
  };

  WorldSelectModal.prototype.shortcuts = {
    'enter': 'done'
  };

  function WorldSelectModal(options) {
    this.done = bind(this.done, this);
    this.selectionMade = bind(this.selectionMade, this);
    this.getRenderData = bind(this.getRenderData, this);
    this.world = options.world;
    this.dataType = options.dataType || 'point';
    this["default"] = options["default"];
    this.defaultFromZoom = options.defaultFromZoom;
    this.selectionMade = _.debounce(this.selectionMade, 300);
    this.supermodel = options.supermodel;
    WorldSelectModal.__super__.constructor.call(this);
  }

  WorldSelectModal.prototype.getRenderData = function(c) {
    if (c == null) {
      c = {};
    }
    c = WorldSelectModal.__super__.getRenderData.call(this, c);
    c.selectingPoint = this.dataType === 'point';
    c.flexibleRegion = this.dataType === 'region';
    return c;
  };

  WorldSelectModal.prototype.afterInsert = function() {
    WorldSelectModal.__super__.afterInsert.call(this);
    return this.initSurface();
  };

  WorldSelectModal.prototype.initSurface = function() {
    var canvases, normalCanvas, webGLCanvas;
    webGLCanvas = this.$el.find('.webgl-canvas');
    normalCanvas = this.$el.find('.normal-canvas');
    canvases = webGLCanvas.add(normalCanvas);
    canvases.attr('width', currentView.$el.width() * .8 - 70);
    canvases.attr('height', currentView.$el.height() * .6);
    this.surface = new Surface(this.world, normalCanvas, webGLCanvas, {
      paths: false,
      grid: true,
      navigateToSelection: false,
      choosing: this.dataType,
      coords: true,
      thangTypes: this.supermodel.getModels(ThangType),
      showInvisible: true
    });
    this.surface.playing = false;
    this.surface.setWorld(this.world);
    this.surface.camera.zoomTo({
      x: 262,
      y: -164
    }, 1.66, 0);
    return this.showDefaults();
  };

  WorldSelectModal.prototype.showDefaults = function() {
    var surfaceTarget;
    if (this.dataType === 'point') {
      if ((this["default"] != null) && _.isFinite(this["default"].x) && _.isFinite(this["default"].y)) {
        this.surface.chooser.setPoint(this["default"]);
        return this.surface.camera.zoomTo(this.surface.camera.worldToSurface(this["default"]), 2);
      }
    } else if (this.defaultFromZoom != null) {
      this.showZoomRegion();
      surfaceTarget = this.surface.camera.worldToSurface(this.defaultFromZoom.target);
      return this.surface.camera.zoomTo(surfaceTarget, this.defaultFromZoom.zoom * 0.6);
    } else if ((this["default"] != null) && _.isFinite(this["default"][0].x) && _.isFinite(this["default"][0].y) && _.isFinite(this["default"][1].x) && _.isFinite(this["default"][1].y)) {
      this.surface.chooser.setRegion(this["default"]);
      return this.showBoundaryRegion();
    }
  };

  WorldSelectModal.prototype.showZoomRegion = function() {
    var canvasHeight, canvasWidth, d, dimensions, height, region, target, width;
    d = this.defaultFromZoom;
    canvasWidth = 924;
    canvasHeight = 589;
    dimensions = {
      x: canvasWidth / d.zoom,
      y: canvasHeight / d.zoom
    };
    dimensions = this.surface.camera.surfaceToWorld(dimensions);
    width = dimensions.x;
    height = dimensions.y;
    target = d.target;
    region = [
      {
        x: target.x - width / 2,
        y: target.y - height / 2
      }, {
        x: target.x + width / 2,
        y: target.y + height / 2
      }
    ];
    return this.surface.chooser.setRegion(region);
  };

  WorldSelectModal.prototype.showBoundaryRegion = function() {
    var bounds, point, zoom;
    bounds = this.surface.camera.normalizeBounds(this["default"]);
    point = {
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2
    };
    zoom = 0.8 * (this.surface.camera.canvasWidth / bounds.width);
    return this.surface.camera.zoomTo(point, zoom);
  };

  WorldSelectModal.prototype.selectionMade = function(e) {
    e.camera = this.surface.camera;
    return this.lastSelection = e;
  };

  WorldSelectModal.prototype.done = function() {
    if (typeof this.callback === "function") {
      this.callback(this.lastSelection);
    }
    return this.hide();
  };

  WorldSelectModal.prototype.onHidden = function() {
    var ref;
    return (ref = this.surface) != null ? ref.destroy() : void 0;
  };

  return WorldSelectModal;

})(ModalView);
});

;require.register("views/editor/level/scripts/ScriptsTabView", function(exports, require, module) {
var ChannelNode, CocoView, EventPrereqNode, EventPrereqsNode, EventPropsNode, Level, PropertiesNode, ScriptNode, ScriptsNode, ScriptsTabView, Surface, defaultScripts, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/scripts_tab');

Level = require('models/Level');

Surface = require('lib/surface/Surface');

nodes = require('./../treema_nodes');

defaultScripts = require('lib/DefaultScripts');

require('vendor/treema');

module.exports = ScriptsTabView = (function(superClass) {
  extend(ScriptsTabView, superClass);

  ScriptsTabView.prototype.id = 'editor-level-scripts-tab-view';

  ScriptsTabView.prototype.template = template;

  ScriptsTabView.prototype.className = 'tab-pane';

  ScriptsTabView.prototype.subscriptions = {
    'editor:level-loaded': 'onLevelLoaded',
    'editor:thangs-edited': 'onThangsEdited'
  };

  function ScriptsTabView(options) {
    this.onWindowResize = bind(this.onWindowResize, this);
    this.onScriptChanged = bind(this.onScriptChanged, this);
    this.onScriptDeleted = bind(this.onScriptDeleted, this);
    this.onNewScriptAdded = bind(this.onNewScriptAdded, this);
    this.onScriptSelected = bind(this.onScriptSelected, this);
    this.onScriptsChanged = bind(this.onScriptsChanged, this);
    ScriptsTabView.__super__.constructor.call(this, options);
    this.world = options.world;
    this.files = options.files;
    $(window).on('resize', this.onWindowResize);
  }

  ScriptsTabView.prototype.destroy = function() {
    var ref, ref1;
    if ((ref = this.scriptTreema) != null) {
      ref.destroy();
    }
    if ((ref1 = this.scriptTreemas) != null) {
      ref1.destroy();
    }
    $(window).off('resize', this.onWindowResize);
    return ScriptsTabView.__super__.destroy.call(this);
  };

  ScriptsTabView.prototype.onLoaded = function() {};

  ScriptsTabView.prototype.onLevelLoaded = function(e) {
    var ref, scripts, treemaOptions;
    this.level = e.level;
    this.dimensions = this.level.dimensions();
    scripts = $.extend(true, [], (ref = this.level.get('scripts')) != null ? ref : []);
    if (scripts.length === 0) {
      scripts = $.extend(true, [], defaultScripts);
    }
    treemaOptions = {
      schema: Level.schema.properties.scripts,
      data: scripts,
      callbacks: {
        change: this.onScriptsChanged,
        select: this.onScriptSelected,
        addChild: this.onNewScriptAdded,
        removeChild: this.onScriptDeleted
      },
      nodeClasses: {
        array: ScriptsNode,
        object: ScriptNode
      },
      view: this
    };
    this.scriptsTreema = this.$el.find('#scripts-treema').treema(treemaOptions);
    this.scriptsTreema.build();
    if (this.scriptsTreema.childrenTreemas[0] != null) {
      this.scriptsTreema.childrenTreemas[0].select();
      return this.scriptsTreema.childrenTreemas[0].broadcastChanges();
    }
  };

  ScriptsTabView.prototype.onScriptsChanged = function(e) {
    return this.level.set('scripts', this.scriptsTreema.data);
  };

  ScriptsTabView.prototype.onScriptSelected = function(e, selected) {
    var newPath, ref, ref1, treemaOptions;
    selected = selected.length > 1 ? selected[0].getLastSelectedTreema() : selected[0];
    if (!selected) {
      this.$el.find('#script-treema').replaceWith($('<div id="script-treema"></div>'));
      this.selectedScriptPath = null;
      return;
    }
    this.thangIDs = this.getThangIDs();
    treemaOptions = {
      world: this.world,
      filePath: "db/level/" + (this.level.get('original')),
      files: this.files,
      view: this,
      schema: Level.schema.properties.scripts.items,
      data: selected.data,
      thangIDs: this.thangIDs,
      dimensions: this.dimensions,
      supermodel: this.supermodel,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.onScriptChanged
      },
      nodeClasses: {
        object: PropertiesNode,
        'event-value-chain': EventPropsNode,
        'event-prereqs': EventPrereqsNode,
        'event-prereq': EventPrereqNode,
        'event-channel': ChannelNode,
        'thang': nodes.ThangNode,
        'milliseconds': nodes.MillisecondsNode,
        'seconds': nodes.SecondsNode,
        'point2d': nodes.WorldPointNode,
        'viewport': nodes.WorldViewportNode,
        'bounds': nodes.WorldBoundsNode
      }
    };
    newPath = selected.getPath();
    if (newPath === this.selectedScriptPath) {
      return;
    }
    this.scriptTreema = this.$el.find('#script-treema').treema(treemaOptions);
    this.scriptTreema.build();
    if ((ref = this.scriptTreema.childrenTreemas) != null) {
      if ((ref1 = ref.noteChain) != null) {
        ref1.open(5);
      }
    }
    return this.selectedScriptPath = newPath;
  };

  ScriptsTabView.prototype.getThangIDs = function() {
    var i, len, ref, ref1, results, t;
    ref1 = (ref = this.level.get('thangs')) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      t = ref1[i];
      results.push(t.id);
    }
    return results;
  };

  ScriptsTabView.prototype.onNewScriptAdded = function(scriptNode) {
    if (!scriptNode) {
      return;
    }
    if (scriptNode.data.id === void 0) {
      scriptNode.disableTracking();
      scriptNode.set('/id', 'Script-' + this.scriptsTreema.data.length);
      return scriptNode.enableTracking();
    }
  };

  ScriptsTabView.prototype.onScriptDeleted = function() {
    var existingKey, key, ref, results, treema;
    ref = this.scriptsTreema.childrenTreemas;
    results = [];
    for (key in ref) {
      treema = ref[key];
      key = parseInt(key);
      treema.disableTracking();
      if (/Script-[0-9]*/.test(treema.data.id)) {
        existingKey = parseInt(treema.data.id.substr(7));
        if (existingKey !== key + 1) {
          treema.set('id', 'Script-' + (key + 1));
        }
      }
      results.push(treema.enableTracking());
    }
    return results;
  };

  ScriptsTabView.prototype.onScriptChanged = function() {
    if (!this.selectedScriptPath) {
      return;
    }
    return this.scriptsTreema.set(this.selectedScriptPath, this.scriptTreema.data);
  };

  ScriptsTabView.prototype.onThangsEdited = function(e) {
    var ref;
    return (ref = this.thangIDs) != null ? ref.splice.apply(ref, [0, this.thangIDs.length].concat(slice.call(this.getThangIDs()))) : void 0;
  };

  ScriptsTabView.prototype.onWindowResize = function(e) {
    if ($('body').width() > 800) {
      return this.$el.find('#scripts-treema').collapse('show');
    }
  };

  return ScriptsTabView;

})(CocoView);

ScriptsNode = (function(superClass) {
  extend(ScriptsNode, superClass);

  function ScriptsNode() {
    return ScriptsNode.__super__.constructor.apply(this, arguments);
  }

  ScriptsNode.prototype.nodeDescription = 'Script';

  ScriptsNode.prototype.addNewChild = function() {
    var newTreema;
    newTreema = ScriptsNode.__super__.addNewChild.call(this);
    if (this.callbacks.addChild) {
      this.callbacks.addChild(newTreema);
    }
    return newTreema;
  };

  return ScriptsNode;

})(TreemaArrayNode);

ScriptNode = (function(superClass) {
  extend(ScriptNode, superClass);

  function ScriptNode() {
    return ScriptNode.__super__.constructor.apply(this, arguments);
  }

  ScriptNode.prototype.valueClass = 'treema-script';

  ScriptNode.prototype.collection = false;

  ScriptNode.prototype.buildValueForDisplay = function(valEl, data) {
    var s, val;
    val = data.id || data.channel;
    s = "" + val;
    return this.buildValueForDisplaySimply(valEl, s);
  };

  ScriptNode.prototype.onTabPressed = function(e) {
    this.tabToCurrentScript();
    return e.preventDefault();
  };

  ScriptNode.prototype.onDeletePressed = function(e) {
    var returnVal;
    returnVal = ScriptNode.__super__.onDeletePressed.call(this, e);
    if (this.callbacks.removeChild) {
      this.callbacks.removeChild();
    }
    return returnVal;
  };

  ScriptNode.prototype.onRightArrowPressed = function() {
    return this.tabToCurrentScript();
  };

  ScriptNode.prototype.tabToCurrentScript = function() {
    var firstRow, ref, ref1;
    if ((ref = this.settings.view.scriptTreema) != null) {
      ref.keepFocus();
    }
    firstRow = (ref1 = this.settings.view.scriptTreema) != null ? ref1.$el.find('.treema-node:visible').data('instance') : void 0;
    if (firstRow == null) {
      return;
    }
    return firstRow.select();
  };

  return ScriptNode;

})(TreemaObjectNode);

PropertiesNode = (function(superClass) {
  extend(PropertiesNode, superClass);

  function PropertiesNode() {
    return PropertiesNode.__super__.constructor.apply(this, arguments);
  }

  PropertiesNode.prototype.nodeDescription = 'Script Property';

  return PropertiesNode;

})(TreemaObjectNode);

EventPropsNode = (function(superClass) {
  extend(EventPropsNode, superClass);

  function EventPropsNode() {
    return EventPropsNode.__super__.constructor.apply(this, arguments);
  }

  EventPropsNode.prototype.valueClass = 'treema-event-props';

  EventPropsNode.prototype.arrayToString = function() {
    return (this.getData() || []).join('.');
  };

  EventPropsNode.prototype.buildValueForDisplay = function(valEl, data) {
    var joined;
    joined = this.arrayToString();
    if (!joined.length) {
      joined = '(unset)';
    }
    return this.buildValueForDisplaySimply(valEl, joined);
  };

  EventPropsNode.prototype.buildValueForEditing = function(valEl, data) {
    var autocompleteValues, channel, channelSchema, key, ref, val;
    EventPropsNode.__super__.buildValueForEditing.call(this, valEl, data);
    channel = this.getRoot().data.channel;
    channelSchema = Backbone.Mediator.channelSchemas[channel];
    autocompleteValues = [];
    ref = channelSchema != null ? channelSchema.properties : void 0;
    for (key in ref) {
      val = ref[key];
      autocompleteValues.push(key);
    }
    valEl.find('input').autocomplete({
      source: autocompleteValues,
      minLength: 0,
      delay: 0,
      autoFocus: true
    }).autocomplete('search');
    return valEl;
  };

  EventPropsNode.prototype.saveChanges = function(valEl) {
    var s;
    return this.data = (function() {
      var i, len, ref, results;
      ref = $('input', valEl).val().split('.');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.length) {
          results.push(s);
        }
      }
      return results;
    })();
  };

  return EventPropsNode;

})(TreemaNode.nodeMap.string);

EventPrereqsNode = (function(superClass) {
  extend(EventPrereqsNode, superClass);

  function EventPrereqsNode() {
    return EventPrereqsNode.__super__.constructor.apply(this, arguments);
  }

  EventPrereqsNode.prototype.open = function(depth) {
    if (depth == null) {
      depth = 2;
    }
    return EventPrereqsNode.__super__.open.call(this, depth);
  };

  EventPrereqsNode.prototype.addNewChild = function() {
    var newTreema, ref;
    newTreema = EventPrereqsNode.__super__.addNewChild.call(this, arguments);
    if (newTreema == null) {
      return;
    }
    newTreema.open();
    return (ref = newTreema.childrenTreemas.eventProps) != null ? ref.edit() : void 0;
  };

  return EventPrereqsNode;

})(TreemaNode.nodeMap.array);

EventPrereqNode = (function(superClass) {
  extend(EventPrereqNode, superClass);

  function EventPrereqNode() {
    return EventPrereqNode.__super__.constructor.apply(this, arguments);
  }

  EventPrereqNode.prototype.buildValueForDisplay = function(valEl, data) {
    var comparison, eventProp, key, s, statements, value;
    eventProp = (data.eventProps || []).join('.');
    if (!eventProp.length) {
      eventProp = '(unset)';
    }
    statements = [];
    for (key in data) {
      value = data[key];
      if (key === 'eventProps') {
        continue;
      }
      comparison = this.workingSchema.properties[key].title;
      value = value.toString();
      statements.push(comparison + " " + value);
    }
    statements = statements.join(', ');
    s = eventProp + " " + statements;
    return this.buildValueForDisplaySimply(valEl, s);
  };

  return EventPrereqNode;

})(TreemaNode.nodeMap.object);

ChannelNode = (function(superClass) {
  extend(ChannelNode, superClass);

  function ChannelNode() {
    return ChannelNode.__super__.constructor.apply(this, arguments);
  }

  ChannelNode.prototype.buildValueForEditing = function(valEl, data) {
    var autocompleteValues, key, val;
    ChannelNode.__super__.buildValueForEditing.call(this, valEl, data);
    autocompleteValues = (function() {
      var ref, results;
      ref = Backbone.Mediator.channelSchemas;
      results = [];
      for (key in ref) {
        val = ref[key];
        results.push({
          label: (val != null ? val.title : void 0) || key,
          value: key
        });
      }
      return results;
    })();
    valEl.find('input').autocomplete({
      source: autocompleteValues,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    return valEl;
  };

  return ChannelNode;

})(TreemaNode.nodeMap.string);
});

;require.register("views/editor/level/settings/SettingsTabView", function(exports, require, module) {
var CocoView, ConceptNode, ConceptsListNode, Level, SettingsNode, SettingsTabView, SolutionGearNode, SolutionStatsNode, Surface, ThangType, concepts, me, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  slice = [].slice;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/settings_tab');

Level = require('models/Level');

ThangType = require('models/ThangType');

Surface = require('lib/surface/Surface');

nodes = require('./../treema_nodes');

me = require('core/auth').me;

require('vendor/treema');

concepts = require('schemas/concepts');

module.exports = SettingsTabView = (function(superClass) {
  extend(SettingsTabView, superClass);

  SettingsTabView.prototype.id = 'editor-level-settings-tab-view';

  SettingsTabView.prototype.className = 'tab-pane';

  SettingsTabView.prototype.template = template;

  SettingsTabView.prototype.editableSettings = ['name', 'description', 'documentation', 'nextLevel', 'victory', 'i18n', 'goals', 'type', 'kind', 'terrain', 'banner', 'loadingTip', 'requiresSubscription', 'adventurer', 'adminOnly', 'helpVideos', 'replayable', 'scoreTypes', 'concepts', 'primaryConcepts', 'picoCTFProblem', 'practice', 'practiceThresholdMinutes', 'primerLanguage', 'shareable', 'studentPlayInstructions', 'requiredCode', 'suspectCode', 'requiredGear', 'restrictedGear', 'requiredProperties', 'restrictedProperties', 'recommendedHealth', 'allowedHeroes'];

  SettingsTabView.prototype.subscriptions = {
    'editor:level-loaded': 'onLevelLoaded',
    'editor:thangs-edited': 'onThangsEdited',
    'editor:random-terrain-generated': 'onRandomTerrainGenerated'
  };

  function SettingsTabView(options) {
    this.onSettingsChanged = bind(this.onSettingsChanged, this);
    SettingsTabView.__super__.constructor.call(this, options);
  }

  SettingsTabView.prototype.onLoaded = function() {};

  SettingsTabView.prototype.onLevelLoaded = function(e) {
    var data, schema, treemaOptions;
    this.level = e.level;
    data = _.pick(this.level.attributes, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    schema = _.cloneDeep(Level.schema);
    schema.properties = _.pick(schema.properties, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    schema.required = _.intersection(schema.required, this.editableSettings);
    schema["default"] = _.pick(schema["default"], (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    this.thangIDs = this.getThangIDs();
    treemaOptions = {
      filePath: "db/level/" + (this.level.get('original')),
      supermodel: this.supermodel,
      schema: schema,
      data: data,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.onSettingsChanged
      },
      thangIDs: this.thangIDs,
      nodeClasses: {
        object: SettingsNode,
        thang: nodes.ThangNode,
        'solution-gear': SolutionGearNode,
        'solution-stats': SolutionStatsNode,
        concept: ConceptNode,
        'concepts-list': ConceptsListNode
      },
      solutions: this.level.getSolutions()
    };
    this.settingsTreema = this.$el.find('#settings-treema').treema(treemaOptions);
    this.settingsTreema.build();
    this.settingsTreema.open();
    return this.lastTerrain = data.terrain;
  };

  SettingsTabView.prototype.getThangIDs = function() {
    var i, len, ref, ref1, results, t;
    ref1 = (ref = this.level.get('thangs')) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      t = ref1[i];
      results.push(t.id);
    }
    return results;
  };

  SettingsTabView.prototype.onSettingsChanged = function(e) {
    var goal, goalID, goalIndex, i, index, j, key, len, len1, ref, ref1, ref2, results, terrain;
    $('.level-title').text(this.settingsTreema.data.name);
    ref = this.editableSettings;
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      this.level.set(key, this.settingsTreema.data[key]);
    }
    if ((terrain = this.settingsTreema.data.terrain) !== this.lastTerrain) {
      this.lastTerrain = terrain;
      Backbone.Mediator.publish('editor:terrain-changed', {
        terrain: terrain
      });
    }
    ref2 = (ref1 = this.settingsTreema.data.goals) != null ? ref1 : [];
    results = [];
    for (index = j = 0, len1 = ref2.length; j < len1; index = ++j) {
      goal = ref2[index];
      if (goal.id) {
        continue;
      }
      goalIndex = index;
      goalID = "goal-" + goalIndex;
      while (_.find(this.settingsTreema.get("goals"), {
          id: goalID
        })) {
        goalID = "goal-" + (++goalIndex);
      }
      this.settingsTreema.disableTracking();
      this.settingsTreema.set("/goals/" + index + "/id", goalID);
      this.settingsTreema.set("/goals/" + index + "/name", _.string.humanize(goalID));
      results.push(this.settingsTreema.enableTracking());
    }
    return results;
  };

  SettingsTabView.prototype.onThangsEdited = function(e) {
    var ref;
    if ((ref = this.thangIDs) != null) {
      ref.splice.apply(ref, [0, this.thangIDs.length].concat(slice.call(this.getThangIDs())));
    }
    return this.settingsTreema.solutions = this.level.getSolutions();
  };

  SettingsTabView.prototype.onRandomTerrainGenerated = function(e) {
    return this.settingsTreema.set('/terrain', e.terrain);
  };

  SettingsTabView.prototype.destroy = function() {
    var ref;
    if ((ref = this.settingsTreema) != null) {
      ref.destroy();
    }
    return SettingsTabView.__super__.destroy.call(this);
  };

  return SettingsTabView;

})(CocoView);

SettingsNode = (function(superClass) {
  extend(SettingsNode, superClass);

  function SettingsNode() {
    return SettingsNode.__super__.constructor.apply(this, arguments);
  }

  SettingsNode.prototype.nodeDescription = 'Settings';

  return SettingsNode;

})(TreemaObjectNode);

SolutionGearNode = (function(superClass) {
  extend(SolutionGearNode, superClass);

  function SolutionGearNode() {
    return SolutionGearNode.__super__.constructor.apply(this, arguments);
  }

  SolutionGearNode.prototype.select = function() {
    var button, description, i, len, match, prop, propertiesUsed, ref, ref1, solution;
    SolutionGearNode.__super__.select.call(this);
    if (!(solution = _.find(this.getRoot().solutions, {
      succeeds: true,
      language: 'javascript'
    }))) {
      return;
    }
    propertiesUsed = [];
    ref1 = ((ref = solution.source) != null ? ref : '').match(/hero\.([a-z][A-Za-z0-9]*)/g);
    for (i = 0, len = ref1.length; i < len; i++) {
      match = ref1[i];
      prop = match.split('.')[1];
      if (indexOf.call(propertiesUsed, prop) < 0) {
        propertiesUsed.push(prop);
      }
    }
    if (!propertiesUsed.length) {
      return;
    }
    if (_.isEqual(this.data, propertiesUsed)) {
      this.$el.find('.treema-description').html('Solution uses exactly these required properties.');
      return;
    }
    description = 'Solution used properties: ' + [
      (function() {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = propertiesUsed.length; j < len1; j++) {
          prop = propertiesUsed[j];
          results.push("<code>" + prop + "</code>");
        }
        return results;
      })()
    ].join(' ');
    button = $('<button class="btn btn-sm">Use</button>');
    $(button).on('click', (function(_this) {
      return function() {
        _this.set('', propertiesUsed);
        return _.defer(function() {
          _this.open();
          return _this.select();
        });
      };
    })(this));
    return this.$el.find('.treema-description').html(description).append(button);
  };

  return SolutionGearNode;

})(TreemaArrayNode);

SolutionStatsNode = (function(superClass) {
  extend(SolutionStatsNode, superClass);

  function SolutionStatsNode() {
    return SolutionStatsNode.__super__.constructor.apply(this, arguments);
  }

  SolutionStatsNode.prototype.select = function() {
    var solution;
    SolutionStatsNode.__super__.select.call(this);
    if (!(solution = _.find(this.getRoot().solutions, {
      succeeds: true,
      language: 'javascript'
    }))) {
      return;
    }
    return ThangType.calculateStatsForHeroConfig(solution.heroConfig, (function(_this) {
      return function(stats) {
        var button, description, key, val;
        for (key in stats) {
          val = stats[key];
          if (parseInt(val) !== val) {
            stats[key] = val.toFixed(2);
          }
        }
        description = "Solution had stats: <code>" + (JSON.stringify(stats)) + "</code>";
        button = $('<button class="btn btn-sm">Use health</button>');
        $(button).on('click', function() {
          _this.set('', stats.health);
          return _.defer(function() {
            _this.open();
            return _this.select();
          });
        });
        return _this.$el.find('.treema-description').html(description).append(button);
      };
    })(this));
  };

  return SolutionStatsNode;

})(TreemaNode.nodeMap.number);

ConceptNode = (function(superClass) {
  extend(ConceptNode, superClass);

  function ConceptNode() {
    return ConceptNode.__super__.constructor.apply(this, arguments);
  }

  ConceptNode.prototype.buildValueForDisplay = function(valEl, data) {
    var concept, description;
    ConceptNode.__super__.buildValueForDisplay.call(this, valEl, data);
    if (!data) {
      return;
    }
    if (!(concept = _.find(concepts, {
      concept: this.data
    }))) {
      return console.error("Couldn't find concept " + this.data);
    }
    description = concept.name + " -- " + concept.description;
    if (concept.deprecated) {
      description = description + " (Deprecated)";
    }
    if (concept.automatic) {
      description = "AUTO | " + description;
    }
    this.$el.find('.treema-row').css('float', 'left');
    if (concept.automatic) {
      this.$el.addClass('concept-automatic');
    }
    if (concept.deprecated) {
      this.$el.addClass('concept-deprecated');
    }
    this.$el.find('.treema-description').remove();
    return this.$el.append($("<span class='treema-description'>" + description + "</span>").show());
  };

  ConceptNode.prototype.limitChoices = function(options) {
    var o;
    if (this.parent.keyForParent === 'concepts') {
      options = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = options.length; i < len; i++) {
          o = options[i];
          if (_.find(concepts, function(c) {
            return c.concept === o && !c.automatic && !c.deprecated;
          })) {
            results.push(o);
          }
        }
        return results;
      })();
    } else {
      options = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = options.length; i < len; i++) {
          o = options[i];
          if (_.find(concepts, function(c) {
            return c.concept === o && !c.deprecated;
          })) {
            results.push(o);
          }
        }
        return results;
      })();
    }
    return ConceptNode.__super__.limitChoices.call(this, options);
  };

  ConceptNode.prototype.onClick = function(e) {
    if (this.$el.hasClass('concept-automatic')) {
      return;
    }
    return ConceptNode.__super__.onClick.call(this, e);
  };

  return ConceptNode;

})(TreemaNode.nodeMap.string);

ConceptsListNode = (function(superClass) {
  extend(ConceptsListNode, superClass);

  function ConceptsListNode() {
    return ConceptsListNode.__super__.constructor.apply(this, arguments);
  }

  ConceptsListNode.prototype.sort = true;

  ConceptsListNode.prototype.sortFunction = function(a, b) {
    var aAutomatic, bAutomatic;
    aAutomatic = _.find(concepts, function(c) {
      return c.concept === a && c.automatic;
    });
    bAutomatic = _.find(concepts, function(c) {
      return c.concept === b && c.automatic;
    });
    if (bAutomatic && !aAutomatic) {
      return 1;
    }
    if (aAutomatic && !bAutomatic) {
      return -1;
    }
    if (!aAutomatic && !bAutomatic) {
      return 0;
    }
    return ConceptsListNode.__super__.sortFunction.call(this, a, b);
  };

  return ConceptsListNode;

})(TreemaNode.nodeMap.array);
});

;require.register("views/editor/level/systems/AddLevelSystemModal", function(exports, require, module) {
var AddLevelSystemModal, CocoCollection, LevelSystem, LevelSystemSearchCollection, ModalView, availableSystemTemplate, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/system/add');

availableSystemTemplate = require('templates/editor/level/system/available_system');

LevelSystem = require('models/LevelSystem');

CocoCollection = require('collections/CocoCollection');

LevelSystemSearchCollection = (function(superClass) {
  extend(LevelSystemSearchCollection, superClass);

  function LevelSystemSearchCollection() {
    return LevelSystemSearchCollection.__super__.constructor.apply(this, arguments);
  }

  LevelSystemSearchCollection.prototype.url = '/db/level.system';

  LevelSystemSearchCollection.prototype.model = LevelSystem;

  return LevelSystemSearchCollection;

})(CocoCollection);

module.exports = AddLevelSystemModal = (function(superClass) {
  extend(AddLevelSystemModal, superClass);

  AddLevelSystemModal.prototype.id = 'editor-level-system-add-modal';

  AddLevelSystemModal.prototype.template = template;

  AddLevelSystemModal.prototype.instant = true;

  AddLevelSystemModal.prototype.events = {
    'click .available-systems-list li': 'onAddSystem'
  };

  function AddLevelSystemModal(options) {
    var ref;
    AddLevelSystemModal.__super__.constructor.call(this, options);
    this.extantSystems = (ref = options.extantSystems) != null ? ref : [];
    this.systems = this.supermodel.loadCollection(new LevelSystemSearchCollection(), 'systems').model;
  }

  AddLevelSystemModal.prototype.afterRender = function() {
    AddLevelSystemModal.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    return this.renderAvailableSystems();
  };

  AddLevelSystemModal.prototype.renderAvailableSystems = function() {
    var i, len, m, results, system, systems, ul;
    ul = this.$el.find('ul.available-systems-list').empty();
    systems = (function() {
      var i, len, ref, results;
      ref = this.systems.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        results.push(m.attributes);
      }
      return results;
    }).call(this);
    _.remove(systems, (function(_this) {
      return function(system) {
        return _.find(_this.extantSystems, {
          original: system.original
        });
      };
    })(this));
    systems = _.sortBy(systems, 'name');
    results = [];
    for (i = 0, len = systems.length; i < len; i++) {
      system = systems[i];
      results.push(ul.append($(availableSystemTemplate({
        system: system
      }))));
    }
    return results;
  };

  AddLevelSystemModal.prototype.onAddSystem = function(e) {
    var i, id, len, levelSystem, ref, ref1, ref2, s, system, toAdd;
    id = $(e.currentTarget).data('system-id');
    system = _.find(this.systems.models, {
      id: id
    });
    if (!system) {
      return console.error('Couldn\'t find system for id', id, 'out of', this.systems.models);
    }
    toAdd = system.getDependencies(this.systems.models);
    _.remove(toAdd, (function(_this) {
      return function(s1) {
        return _.find(_this.extantSystems, {
          original: s1.get('original')
        });
      };
    })(this));
    ref = toAdd.concat([system]);
    for (i = 0, len = ref.length; i < len; i++) {
      s = ref[i];
      levelSystem = {
        original: (ref1 = s.get('original')) != null ? ref1 : id,
        majorVersion: (ref2 = s.get('version').major) != null ? ref2 : 0
      };
      this.extantSystems.push(levelSystem);
      Backbone.Mediator.publish('editor:level-system-added', {
        system: levelSystem
      });
    }
    return this.renderAvailableSystems();
  };

  return AddLevelSystemModal;

})(ModalView);
});

;require.register("views/editor/level/systems/LevelSystemEditView", function(exports, require, module) {
var CocoView, LevelSystem, LevelSystemEditView, PatchesView, SaveVersionModal, SystemVersionsModal, ace, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/system/level-system-edit-view');

LevelSystem = require('models/LevelSystem');

SystemVersionsModal = require('views/editor/level/systems/SystemVersionsModal');

PatchesView = require('views/editor/PatchesView');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

ace = require('ace');

require('vendor/treema');

module.exports = LevelSystemEditView = (function(superClass) {
  extend(LevelSystemEditView, superClass);

  LevelSystemEditView.prototype.id = 'level-system-edit-view';

  LevelSystemEditView.prototype.template = template;

  LevelSystemEditView.prototype.editableSettings = ['name', 'description', 'codeLanguage', 'dependencies', 'propertyDocumentation', 'i18n'];

  LevelSystemEditView.prototype.events = {
    'click #done-editing-system-button': 'endEditing',
    'click .nav a': function(e) {
      return $(e.target).tab('show');
    },
    'click #system-patches-tab': function() {
      return this.patchesView.load();
    },
    'click #system-code-tab': 'buildCodeEditor',
    'click #system-config-schema-tab': 'buildConfigSchemaTreema',
    'click #system-settings-tab': 'buildSettingsTreema',
    'click #system-history-button': 'showVersionHistory',
    'click #patch-system-button': 'startPatchingSystem',
    'click #system-watch-button': 'toggleWatchSystem'
  };

  function LevelSystemEditView(options) {
    this.onEditorChange = bind(this.onEditorChange, this);
    this.onConfigSchemaEdited = bind(this.onConfigSchemaEdited, this);
    this.onSystemSettingsEdited = bind(this.onSystemSettingsEdited, this);
    LevelSystemEditView.__super__.constructor.call(this, options);
    this.levelSystem = this.supermodel.getModelByOriginalAndMajorVersion(LevelSystem, options.original, options.majorVersion || 0);
    if (!this.levelSystem) {
      console.log('Couldn\'t get levelSystem for', options, 'from', this.supermodel.models);
    }
  }

  LevelSystemEditView.prototype.afterRender = function() {
    LevelSystemEditView.__super__.afterRender.call(this);
    this.buildSettingsTreema();
    this.buildConfigSchemaTreema();
    this.buildCodeEditor();
    this.patchesView = this.insertSubView(new PatchesView(this.levelSystem), this.$el.find('.patches-view'));
    return this.updatePatchButton();
  };

  LevelSystemEditView.prototype.buildSettingsTreema = function() {
    var data, schema, treemaOptions;
    data = _.pick(this.levelSystem.attributes, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    schema = _.cloneDeep(LevelSystem.schema);
    schema.properties = _.pick(schema.properties, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    schema.required = _.intersection(schema.required, this.editableSettings);
    schema["default"] = _.pick(schema["default"], (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    treemaOptions = {
      supermodel: this.supermodel,
      schema: schema,
      data: data,
      callbacks: {
        change: this.onSystemSettingsEdited
      }
    };
    treemaOptions.readOnly = me.get('anonymous');
    this.systemSettingsTreema = this.$el.find('#edit-system-treema').treema(treemaOptions);
    this.systemSettingsTreema.build();
    return this.systemSettingsTreema.open();
  };

  LevelSystemEditView.prototype.onSystemSettingsEdited = function() {
    var key, ref, value;
    ref = this.systemSettingsTreema.data;
    for (key in ref) {
      value = ref[key];
      if (key !== 'js') {
        this.levelSystem.set(key, value);
      }
    }
    return this.updatePatchButton();
  };

  LevelSystemEditView.prototype.buildConfigSchemaTreema = function() {
    var treemaOptions;
    treemaOptions = {
      supermodel: this.supermodel,
      schema: LevelSystem.schema.properties.configSchema,
      data: $.extend(true, {}, this.levelSystem.get('configSchema')),
      callbacks: {
        change: this.onConfigSchemaEdited
      }
    };
    treemaOptions.readOnly = me.get('anonymous');
    this.configSchemaTreema = this.$el.find('#config-schema-treema').treema(treemaOptions);
    this.configSchemaTreema.build();
    this.configSchemaTreema.open();
    return this.configSchemaTreema.tv4.addSchema('metaschema', LevelSystem.schema.properties.configSchema);
  };

  LevelSystemEditView.prototype.onConfigSchemaEdited = function() {
    this.levelSystem.set('configSchema', this.configSchemaTreema.data);
    return this.updatePatchButton();
  };

  LevelSystemEditView.prototype.buildCodeEditor = function() {
    var editorEl, session;
    this.destroyAceEditor(this.editor);
    editorEl = $('<div></div>').text(this.levelSystem.get('code')).addClass('inner-editor');
    this.$el.find('#system-code-editor').empty().append(editorEl);
    this.editor = ace.edit(editorEl[0]);
    this.editor.setReadOnly(me.get('anonymous'));
    session = this.editor.getSession();
    session.setMode('ace/mode/coffee');
    session.setTabSize(2);
    session.setNewLineMode = 'unix';
    session.setUseSoftTabs(true);
    return this.editor.on('change', this.onEditorChange);
  };

  LevelSystemEditView.prototype.onEditorChange = function() {
    this.levelSystem.set('code', this.editor.getValue());
    return this.updatePatchButton();
  };

  LevelSystemEditView.prototype.updatePatchButton = function() {
    return this.$el.find('#patch-system-button').toggle(Boolean(this.levelSystem.hasLocalChanges()));
  };

  LevelSystemEditView.prototype.endEditing = function(e) {
    Backbone.Mediator.publish('editor:level-system-editing-ended', {
      system: this.levelSystem
    });
    return null;
  };

  LevelSystemEditView.prototype.showVersionHistory = function(e) {
    var systemVersionsModal;
    systemVersionsModal = new SystemVersionsModal({}, this.levelSystem.id);
    this.openModalView(systemVersionsModal);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelSystemEditView.prototype.startPatchingSystem = function(e) {
    this.openModalView(new SaveVersionModal({
      model: this.levelSystem
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelSystemEditView.prototype.toggleWatchSystem = function() {
    var button;
    console.log('toggle watch system?');
    button = this.$el.find('#system-watch-button');
    this.levelSystem.watch(button.find('.watch').is(':visible'));
    return button.find('> span').toggleClass('secret');
  };

  LevelSystemEditView.prototype.destroy = function() {
    var ref, ref1;
    this.destroyAceEditor(this.editor);
    if ((ref = this.systemSettingsTreema) != null) {
      ref.destroy();
    }
    if ((ref1 = this.configSchemaTreema) != null) {
      ref1.destroy();
    }
    return LevelSystemEditView.__super__.destroy.call(this);
  };

  return LevelSystemEditView;

})(CocoView);
});

;require.register("views/editor/level/systems/NewLevelSystemModal", function(exports, require, module) {
var LevelSystem, ModalView, NewLevelSystemModal, forms, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/system/new');

LevelSystem = require('models/LevelSystem');

forms = require('core/forms');

me = require('core/auth').me;

module.exports = NewLevelSystemModal = (function(superClass) {
  extend(NewLevelSystemModal, superClass);

  function NewLevelSystemModal() {
    return NewLevelSystemModal.__super__.constructor.apply(this, arguments);
  }

  NewLevelSystemModal.prototype.id = 'editor-level-system-new-modal';

  NewLevelSystemModal.prototype.template = template;

  NewLevelSystemModal.prototype.instant = false;

  NewLevelSystemModal.prototype.modalWidthPercent = 60;

  NewLevelSystemModal.prototype.events = {
    'click #new-level-system-submit': 'makeNewLevelSystem',
    'submit form': 'makeNewLevelSystem'
  };

  NewLevelSystemModal.prototype.makeNewLevelSystem = function(e) {
    var name, res, system;
    e.preventDefault();
    system = this.$el.find('#level-system-system').val();
    name = this.$el.find('#level-system-name').val();
    system = new LevelSystem();
    system.set('name', name);
    system.set('code', system.get('code', true).replace(/Jitter/g, name));
    system.set('permissions', [
      {
        access: 'owner',
        target: me.id
      }
    ]);
    res = system.save(null, {
      type: 'POST'
    });
    if (!res) {
      return;
    }
    this.showLoading();
    res.error((function(_this) {
      return function() {
        _this.hideLoading();
        console.log('Got errors:', JSON.parse(res.responseText));
        return forms.applyErrorsToForm(_this.$el, JSON.parse(res.responseText));
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        _this.supermodel.registerModel(system);
        Backbone.Mediator.publish('editor:edit-level-system', {
          original: system.get('_id'),
          majorVersion: 0
        });
        return _this.hide();
      };
    })(this));
  };

  return NewLevelSystemModal;

})(ModalView);
});

;require.register("views/editor/level/systems/SystemVersionsModal", function(exports, require, module) {
var SystemVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = SystemVersionsModal = (function(superClass) {
  extend(SystemVersionsModal, superClass);

  SystemVersionsModal.prototype.id = 'editor-system-versions-view';

  SystemVersionsModal.prototype.url = '/db/level.system/';

  SystemVersionsModal.prototype.page = 'system';

  function SystemVersionsModal(options, ID) {
    this.ID = ID;
    SystemVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/LevelSystem'));
  }

  return SystemVersionsModal;

})(VersionsModal);
});

;require.register("views/editor/level/systems/SystemsTabView", function(exports, require, module) {
var AddLevelSystemModal, CocoView, Level, LevelSystem, LevelSystemConfigurationNode, LevelSystemEditView, LevelSystemNode, NewLevelSystemModal, SystemsTabView, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/systems-tab-view');

Level = require('models/Level');

LevelSystem = require('models/LevelSystem');

LevelSystemEditView = require('./LevelSystemEditView');

NewLevelSystemModal = require('./NewLevelSystemModal');

AddLevelSystemModal = require('./AddLevelSystemModal');

nodes = require('../treema_nodes');

require('vendor/treema');

module.exports = SystemsTabView = (function(superClass) {
  extend(SystemsTabView, superClass);

  SystemsTabView.prototype.id = 'systems-tab-view';

  SystemsTabView.prototype.template = template;

  SystemsTabView.prototype.className = 'tab-pane';

  SystemsTabView.prototype.subscriptions = {
    'editor:level-system-added': 'onLevelSystemAdded',
    'editor:edit-level-system': 'editLevelSystem',
    'editor:level-system-editing-ended': 'onLevelSystemEditingEnded',
    'editor:level-loaded': 'onLevelLoaded',
    'editor:terrain-changed': 'onTerrainChanged'
  };

  SystemsTabView.prototype.events = {
    'click #add-system-button': 'addLevelSystem',
    'click #create-new-system-button': 'createNewLevelSystem',
    'click #create-new-system': 'createNewLevelSystem'
  };

  function SystemsTabView(options) {
    this.onSystemSelected = bind(this.onSystemSelected, this);
    this.getSortedByName = bind(this.getSortedByName, this);
    this.onSystemsChanged = bind(this.onSystemsChanged, this);
    var i, len, ls, ref, system, url;
    SystemsTabView.__super__.constructor.call(this, options);
    ref = this.buildDefaultSystems();
    for (i = 0, len = ref.length; i < len; i++) {
      system = ref[i];
      url = "/db/level.system/" + system.original + "/version/" + system.majorVersion;
      ls = new LevelSystem().setURL(url);
      this.supermodel.loadModel(ls);
    }
  }

  SystemsTabView.prototype.afterRender = function() {
    return this.buildSystemsTreema();
  };

  SystemsTabView.prototype.onLoaded = function() {
    return SystemsTabView.__super__.onLoaded.call(this);
  };

  SystemsTabView.prototype.onLevelLoaded = function(e) {
    this.level = e.level;
    return this.buildSystemsTreema();
  };

  SystemsTabView.prototype.buildSystemsTreema = function() {
    var insertedDefaults, ref, superteams, systems, teams, thangIDs, thangs, treemaOptions;
    if (!(this.level && this.supermodel.finished())) {
      return;
    }
    systems = $.extend(true, [], (ref = this.level.get('systems')) != null ? ref : []);
    if (!systems.length) {
      systems = this.buildDefaultSystems();
      insertedDefaults = true;
    }
    systems = this.getSortedByName(systems);
    thangs = this.level != null ? this.level.get('thangs') : [];
    thangIDs = _.filter(_.pluck(thangs, 'id'));
    teams = _.filter(_.pluck(thangs, 'team'));
    superteams = _.filter(_.pluck(thangs, 'superteam'));
    superteams = _.union(teams, superteams);
    treemaOptions = {
      supermodel: this.supermodel,
      schema: Level.schema.properties.systems,
      data: systems,
      readOnly: me.get('anonymous'),
      world: this.options.world,
      view: this,
      thangIDs: thangIDs,
      teams: teams,
      superteams: superteams,
      callbacks: {
        change: this.onSystemsChanged,
        select: this.onSystemSelected
      },
      nodeClasses: {
        'level-system': LevelSystemNode,
        'level-system-configuration': LevelSystemConfigurationNode,
        'point2d': nodes.WorldPointNode,
        'viewport': nodes.WorldViewportNode,
        'bounds': nodes.WorldBoundsNode,
        'radians': nodes.RadiansNode,
        'team': nodes.TeamNode,
        'superteam': nodes.SuperteamNode,
        'meters': nodes.MetersNode,
        'kilograms': nodes.KilogramsNode,
        'seconds': nodes.SecondsNode,
        'speed': nodes.SpeedNode,
        'acceleration': nodes.AccelerationNode,
        'thang-type': nodes.ThangTypeNode,
        'item-thang-type': nodes.ItemThangTypeNode
      }
    };
    this.systemsTreema = this.$el.find('#systems-treema').treema(treemaOptions);
    this.systemsTreema.build();
    this.systemsTreema.open();
    if (insertedDefaults) {
      return this.onSystemsChanged();
    }
  };

  SystemsTabView.prototype.onSystemsChanged = function(e) {
    var systems;
    systems = this.getSortedByName(this.systemsTreema.data);
    return this.level.set('systems', systems);
  };

  SystemsTabView.prototype.getSortedByName = function(systems) {
    var i, len, sys, systemModelMap, systemModels;
    systemModels = this.supermodel.getModels(LevelSystem);
    systemModelMap = {};
    for (i = 0, len = systemModels.length; i < len; i++) {
      sys = systemModels[i];
      systemModelMap[sys.get('original')] = sys.get('name');
    }
    return _.sortBy(systems, function(sys) {
      return systemModelMap[sys.original];
    });
  };

  SystemsTabView.prototype.onSystemSelected = function(e, selected) {
    var data;
    selected = selected.length > 1 ? selected[0].getLastSelectedTreema() : selected[0];
    if (!selected) {
      if (this.levelSystemEditView) {
        this.removeSubView(this.levelSystemEditView);
      }
      this.levelSystemEditView = null;
      return;
    }
    while (!((data = selected.getData()) && data.original)) {
      selected = selected.parent;
    }
    return this.editLevelSystem({
      original: data.original,
      majorVersion: data.majorVersion
    });
  };

  SystemsTabView.prototype.onLevelSystemAdded = function(e) {
    return this.systemsTreema.insert('/', e.system);
  };

  SystemsTabView.prototype.addLevelSystem = function(e) {
    this.openModalView(new AddLevelSystemModal({
      supermodel: this.supermodel,
      extantSystems: _.cloneDeep(this.systemsTreema.data)
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  SystemsTabView.prototype.createNewLevelSystem = function(e) {
    this.openModalView(new NewLevelSystemModal({
      supermodel: this.supermodel
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  SystemsTabView.prototype.editLevelSystem = function(e) {
    return this.levelSystemEditView = this.insertSubView(new LevelSystemEditView({
      original: e.original,
      majorVersion: e.majorVersion,
      supermodel: this.supermodel
    }));
  };

  SystemsTabView.prototype.onLevelSystemEditingEnded = function(e) {
    this.removeSubView(this.levelSystemEditView);
    return this.levelSystemEditView = null;
  };

  SystemsTabView.prototype.onTerrainChanged = function(e) {
    var AI, Vision, changed, defaultPathfinding, ref, ref1, ref2;
    defaultPathfinding = (ref = e.terrain) === 'Dungeon' || ref === 'Indoor' || ref === 'Mountain' || ref === 'Glacier' || ref === 'Volcano';
    changed = false;
    if (AI = this.systemsTreema.get('original=528110f30268d018e3000001')) {
      if (((ref1 = AI.config) != null ? ref1.findsPaths : void 0) !== defaultPathfinding) {
        if (AI.config == null) {
          AI.config = {};
        }
        AI.config.findsPaths = defaultPathfinding;
        this.systemsTreema.set('original=528110f30268d018e3000001', AI);
        changed = true;
      }
    }
    if (Vision = this.systemsTreema.get('original=528115040268d018e300001b')) {
      if (((ref2 = Vision.config) != null ? ref2.checksLineOfSight : void 0) !== defaultPathfinding) {
        if (Vision.config == null) {
          Vision.config = {};
        }
        Vision.config.checksLineOfSight = defaultPathfinding;
        this.systemsTreema.set('original=528115040268d018e300001b', Vision);
        changed = true;
      }
    }
    if (changed) {
      return noty({
        text: "AI/Vision System defaulted pathfinding/line-of-sight to " + defaultPathfinding + " for terrain " + e.terrain + ".",
        layout: 'topCenter',
        timeout: 5000,
        type: 'information'
      });
    }
  };

  SystemsTabView.prototype.buildDefaultSystems = function() {
    return [
      {
        original: '528112c00268d018e3000008',
        majorVersion: 0
      }, {
        original: '5280f83b8ae1581b66000001',
        majorVersion: 0
      }, {
        original: '5281146f0268d018e3000014',
        majorVersion: 0
      }, {
        original: '528110f30268d018e3000001',
        majorVersion: 0
      }, {
        original: '52810ffa33e01a6e86000012',
        majorVersion: 0
      }, {
        original: '528114b20268d018e3000017',
        majorVersion: 0
      }, {
        original: '528105f833e01a6e86000007',
        majorVersion: 0
      }, {
        original: '528113240268d018e300000c',
        majorVersion: 0
      }, {
        original: '528112530268d018e3000007',
        majorVersion: 0
      }, {
        original: '52810f4933e01a6e8600000c',
        majorVersion: 0
      }, {
        original: '528115040268d018e300001b',
        majorVersion: 0
      }, {
        original: '5280dc4d251616c907000001',
        majorVersion: 0
      }, {
        original: '528111b30268d018e3000004',
        majorVersion: 0
      }, {
        original: '528114e60268d018e300001a',
        majorVersion: 0
      }, {
        original: '528114040268d018e3000011',
        majorVersion: 0
      }, {
        original: '52ae4f02a4dcd4415200000b',
        majorVersion: 0
      }, {
        original: '52e953e81b2028d102000004',
        majorVersion: 0
      }, {
        original: '52f1354370fb890000000005',
        majorVersion: 0
      }
    ];
  };

  SystemsTabView.prototype.destroy = function() {
    var ref;
    if ((ref = this.systemsTreema) != null) {
      ref.destroy();
    }
    return SystemsTabView.__super__.destroy.call(this);
  };

  return SystemsTabView;

})(CocoView);

LevelSystemNode = (function(superClass) {
  extend(LevelSystemNode, superClass);

  LevelSystemNode.prototype.valueClass = 'treema-level-system';

  function LevelSystemNode() {
    var ref, ref1, ref2;
    LevelSystemNode.__super__.constructor.apply(this, arguments);
    this.grabDBComponent();
    this.collection = ((ref = this.system) != null ? (ref1 = ref.attributes) != null ? (ref2 = ref1.configSchema) != null ? ref2.properties : void 0 : void 0 : void 0) != null;
  }

  LevelSystemNode.prototype.grabDBComponent = function() {
    var data;
    data = this.getData();
    this.system = this.settings.supermodel.getModelByOriginalAndMajorVersion(LevelSystem, data.original, data.majorVersion);
    if (!this.system) {
      return console.error('Couldn\'t find system for', data.original, data.majorVersion, 'from models', this.settings.supermodel.models);
    }
  };

  LevelSystemNode.prototype.getChildSchema = function(key) {
    if (key === 'config') {
      return this.system.attributes.configSchema;
    }
    return LevelSystemNode.__super__.getChildSchema.call(this, key);
  };

  LevelSystemNode.prototype.buildValueForDisplay = function(valEl, data) {
    var name;
    if (!(data.original && this.system)) {
      return LevelSystemNode.__super__.buildValueForDisplay.call(this, valEl);
    }
    name = this.system.get('name');
    if (this.system.get('version').major) {
      name += " v" + (this.system.get('version').major);
    }
    return this.buildValueForDisplaySimply(valEl, name);
  };

  LevelSystemNode.prototype.onEnterPressed = function(e) {
    var data;
    LevelSystemNode.__super__.onEnterPressed.call(this, e);
    data = this.getData();
    return Backbone.Mediator.publish('editor:edit-level-system', {
      original: data.original,
      majorVersion: data.majorVersion
    });
  };

  LevelSystemNode.prototype.open = function(depth) {
    var cTreema;
    LevelSystemNode.__super__.open.call(this, depth);
    cTreema = this.childrenTreemas.config;
    if ((cTreema != null) && (cTreema.getChildren().length || cTreema.canAddChild())) {
      return cTreema.open();
    }
  };

  return LevelSystemNode;

})(TreemaObjectNode);

LevelSystemConfigurationNode = (function(superClass) {
  extend(LevelSystemConfigurationNode, superClass);

  function LevelSystemConfigurationNode() {
    return LevelSystemConfigurationNode.__super__.constructor.apply(this, arguments);
  }

  LevelSystemConfigurationNode.prototype.valueClass = 'treema-level-system-configuration';

  LevelSystemConfigurationNode.prototype.buildValueForDisplay = function() {};

  return LevelSystemConfigurationNode;

})(TreemaObjectNode);
});

;require.register("views/editor/level/tasks/TasksTabView", function(exports, require, module) {
var CocoView, Level, TasksTabView, defaultTasks, deprecatedTaskNames, heroBased, ladder, notWebDev, renamedTaskNames, tasksForLevel, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/tasks-tab');

Level = require('models/Level');

module.exports = TasksTabView = (function(superClass) {
  extend(TasksTabView, superClass);

  function TasksTabView() {
    return TasksTabView.__super__.constructor.apply(this, arguments);
  }

  TasksTabView.prototype.id = 'editor-level-tasks-tab-view';

  TasksTabView.prototype.className = 'tab-pane';

  TasksTabView.prototype.template = template;

  TasksTabView.prototype.events = {
    'click .task-row': 'onClickTaskRow',
    'click .task-input': 'onClickTaskInput',
    'click .start-edit': 'onClickStartEdit',
    'click #create-task': 'onClickCreateTask',
    'keydown #cur-edit': 'onKeyDownCurEdit',
    'blur #cur-edit': 'onBlurCurEdit'
  };

  TasksTabView.prototype.subscriptions = {
    'editor:level-loaded': 'onLevelLoaded'
  };

  TasksTabView.prototype.applyTaskName = function(_task, _input) {
    var name, potentialTask;
    name = _input.value;
    potentialTask = this.tasks.findWhere({
      'name': _input
    });
    if (potentialTask && potentialTask !== _task) {
      noty({
        timeout: 5000,
        text: 'Task with name already exists!',
        type: 'error',
        layout: 'topCenter'
      });
      return _input.focus();
    } else if (name === '') {
      this.tasks.remove(_task);
      this.pushTasks();
      return this.render();
    } else {
      _task.set('name', name);
      _task.set('curEdit', false);
      this.pushTasks();
      return this.render();
    }
  };

  TasksTabView.prototype.focusEditInput = function() {
    var editInput, len;
    editInput = this.$('#cur-edit')[0];
    if (editInput) {
      editInput.focus();
      len = editInput.value.length * 2;
      return editInput.setSelectionRange(len, len);
    }
  };

  TasksTabView.prototype.getTaskByCID = function(_cid) {
    return this.tasks.get(_cid);
  };

  TasksTabView.prototype.taskMap = function() {
    var ref;
    return (ref = this.tasks) != null ? ref.map(function(_obj) {
      return {
        name: _obj.get('name'),
        complete: _obj.get('complete') || false
      };
    }) : void 0;
  };

  TasksTabView.prototype.taskArray = function() {
    var ref;
    return (ref = this.tasks) != null ? ref.toArray() : void 0;
  };

  TasksTabView.prototype.onLevelLoaded = function(e) {
    var Task, TaskList;
    this.level = e.level;
    this.defaultTasks = tasksForLevel(this.level);
    this.level.set('tasks', _.clone(this.defaultTasks));
    Task = Backbone.Model.extend({
      initialize: function() {
        var ref, ref1;
        if ((e != null ? (ref = e.level) != null ? (ref1 = ref._revertAttributes) != null ? ref1.tasks : void 0 : void 0 : void 0) != null) {
          if (_.find(e.level._revertAttributes.tasks, {
            name: arguments[0].name
          })) {
            return this.set('revert', _.find(e.level._revertAttributes.tasks, {
              name: arguments[0].name
            }));
          } else {
            return this.set('revert', arguments[0]);
          }
        } else {
          return this.set('revert', arguments[0]);
        }
      }
    });
    TaskList = Backbone.Collection.extend({
      model: Task
    });
    this.tasks = new TaskList(this.level.get('tasks'));
    this.pushTasks();
    return this.render();
  };

  TasksTabView.prototype.pushTasks = function() {
    return this.level.set('tasks', this.taskMap());
  };

  TasksTabView.prototype.onClickTaskRow = function(e) {
    var checkbox, task;
    if (!$(e.target).is('input') && !$(e.target).is('a') && !$(e.target).hasClass('start-edit') && this.$('#cur-edit').length === 0) {
      task = this.tasks.get($(e.target).closest('tr').data('task-cid'));
      checkbox = $(e.currentTarget).find('.task-input')[0];
      if (task.get('complete')) {
        task.set('complete', false);
      } else {
        task.set('complete', true);
      }
      checkbox.checked = task.get('complete');
      return this.pushTasks();
    }
  };

  TasksTabView.prototype.onClickTaskInput = function(e) {
    var task;
    task = this.tasks.get($(e.target).closest('tr').data('task-cid'));
    task.set('complete', e.currentTarget.checked);
    return this.pushTasks();
  };

  TasksTabView.prototype.onClickStartEdit = function(e) {
    var task;
    if (this.$('#cur-edit').length === 0) {
      task = this.tasks.get($(e.target).closest('tr').data('task-cid'));
      task.set('curEdit', true);
      this.render();
      return this.focusEditInput();
    }
  };

  TasksTabView.prototype.onKeyDownCurEdit = function(e) {
    var editInput;
    if (e.keyCode === 13) {
      editInput = this.$('#cur-edit')[0];
      return editInput.blur();
    }
  };

  TasksTabView.prototype.onBlurCurEdit = function(e) {
    var editInput, task;
    editInput = this.$('#cur-edit')[0];
    task = this.tasks.get($(e.target).closest('tr').data('task-cid'));
    return this.applyTaskName(task, editInput);
  };

  TasksTabView.prototype.onClickCreateTask = function(e) {
    if (this.$('#cur-edit').length === 0) {
      this.tasks.add({
        name: '',
        complete: false,
        curEdit: true,
        revert: {
          name: 'null',
          complete: false
        }
      });
      this.render();
      return this.focusEditInput();
    }
  };

  TasksTabView.prototype.getTaskURL = function(_n) {
    if (_.find(this.defaultTasks, {
      name: _n
    }) != null) {
      return _.string.slugify(_n);
    }
    return null;
  };

  return TasksTabView;

})(CocoView);

notWebDev = ['hero', 'course', 'hero-ladder', 'course-ladder', 'game-dev'];

heroBased = ['hero', 'course', 'hero-ladder', 'course-ladder'];

ladder = ['hero-ladder', 'course-ladder'];

defaultTasks = [
  {
    name: 'Set level type.',
    complete: function(level) {
      return level.get('type');
    }
  }, {
    name: 'Name the level.'
  }, {
    name: 'Create a Referee stub, if needed.',
    types: notWebDev
  }, {
    name: 'Replace "Hero Placeholder" with mcp.',
    types: ['game-dev']
  }, {
    name: 'Do basic set decoration.',
    types: notWebDev
  }, {
    name: 'Publish.',
    complete: function(level) {
      return level.isPublished();
    }
  }, {
    name: 'Choose the Existence System lifespan and frame rate.',
    types: notWebDev
  }, {
    name: 'Choose the UI System paths and coordinate hover if needed.',
    types: notWebDev
  }, {
    name: 'Choose the AI System pathfinding and Vision System line of sight.',
    types: notWebDev
  }, {
    name: 'Build the level.'
  }, {
    name: 'Set up goals.'
  }, {
    name: 'Add the "win-game" goal.',
    types: ['game-dev']
  }, {
    name: 'Write the sample code.',
    complete: function(level) {
      if (level.isType('web-dev')) {
        return level.getSampleCode().html;
      } else {
        return level.getSampleCode().javascript && level.getSampleCode().python;
      }
    }
  }, {
    name: 'Write the solution.',
    complete: function(level) {
      if (level.isType('web-dev')) {
        return _.find(level.getSolutions(), {
          language: 'html'
        });
      } else {
        return _.find(level.getSolutions(), {
          language: 'javascript'
        }) && _.find(level.getSolutions(), {
          language: 'python'
        });
      }
    }
  }, {
    name: 'Make both teams playable and non-defaulted.',
    types: ladder
  }, {
    name: 'Set up goals for both teams.',
    types: ladder
  }, {
    name: 'Fill out the sample code for both Hero Placeholders.',
    types: ladder
  }, {
    name: 'Fill out default AI for both Hero Placeholders.',
    types: ladder
  }, {
    name: 'Make sure the level ends promptly on success and failure.'
  }, {
    name: 'Adjust script camera bounds.',
    types: notWebDev
  }, {
    name: 'Choose music file in Introduction script.',
    types: notWebDev
  }, {
    name: 'Choose autoplay in Introduction script.',
    types: heroBased
  }, {
    name: 'Write the description.'
  }, {
    name: 'Write the guide.'
  }, {
    name: 'Write intro guide.'
  }, {
    name: 'Write a loading tip, if needed.',
    complete: function(level) {
      return level.get('loadingTip');
    }
  }, {
    name: 'Add programming concepts covered.'
  }, {
    name: 'Set level kind.',
    complete: function(level) {
      return level.get('kind');
    }
  }, {
    name: 'Mark whether it requires a subscription.',
    complete: function(level) {
      return level.get('requiresSubscription') != null;
    }
  }, {
    name: 'Choose leaderboard score types.',
    types: ['hero', 'course'],
    complete: function(level) {
      return level.get('scoreTypes') != null;
    }
  }, {
    name: 'Do thorough set decoration.',
    types: notWebDev
  }, {
    name: 'Playtest with a slow/tough hero.',
    types: ['hero', 'hero-ladder']
  }, {
    name: 'Playtest with a fast/weak hero.',
    types: ['hero', 'hero-ladder']
  }, {
    name: 'Playtest with a couple random seeds.',
    types: heroBased
  }, {
    name: 'Remove/simplify unnecessary doodad collision.',
    types: notWebDev
  }, {
    name: 'Add to a campaign.'
  }, {
    name: 'Choose level options like required/restricted gear.',
    types: ['hero', 'hero-ladder']
  }, {
    name: 'Create achievements, including unlocking next level.'
  }, {
    name: 'Configure the hero\'s expected equipment.',
    types: ['hero', 'course', 'course-ladder']
  }, {
    name: 'Configure the API docs.',
    types: ['web-dev', 'game-dev']
  }, {
    name: 'Write victory text.',
    complete: function(level) {
      var ref;
      return (ref = level.get('victory')) != null ? ref.body : void 0;
    }
  }, {
    name: 'Write level hints.'
  }, {
    name: 'Set up solutions for the Verifier.'
  }, {
    name: 'Click the Populate i18n button.'
  }, {
    name: 'Add slug to ladder levels that should be simulated, if needed.',
    types: ladder
  }, {
    name: 'Write the advanced AIs (shaman, brawler, chieftain, etc).',
    types: ladder
  }, {
    name: 'Add achievements for defeating the advanced AIs.',
    types: ['hero-ladder']
  }, {
    name: 'Release to adventurers.'
  }, {
    name: 'Release to everyone.'
  }, {
    name: 'Create two sample projects.',
    types: ['game-dev', 'web-dev']
  }, {
    name: 'Write Lua sample code.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return level.getSampleCode().lua;
    }
  }, {
    name: 'Write Java sample code.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return level.getSampleCode().java;
    }
  }, {
    name: 'Write CoffeeScript sample code.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return level.getSampleCode().coffeescript;
    }
  }, {
    name: 'Write Lua solution.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return _.find(level.getSolutions(), {
        language: 'lua'
      });
    }
  }, {
    name: 'Write Java solution.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return _.find(level.getSolutions(), {
        language: 'java'
      });
    }
  }, {
    name: 'Write CoffeeScript solution.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return _.find(level.getSolutions(), {
        language: 'coffeescript'
      });
    }
  }
];

deprecatedTaskNames = ['Add Io/Clojure/Lua/CoffeeScript.', 'Add Lua/CoffeeScript/Java.', 'Translate the sample code comments.', 'Add i18n field for the sample code comments.', 'Check completion/engagement/problem analytics.', 'Add a walkthrough video.', 'Do any custom scripting, if needed.', 'Write a really awesome description.'];

renamedTaskNames = {
  'Release to adventurers.': 'Release to adventurers via MailChimp.',
  'Release to everyone.': 'Release to everyone via MailChimp.'
};

tasksForLevel = function(level) {
  var complete, i, inappropriateTasks, j, k, len1, len2, len3, newTasks, oldName, oldTask, oldTasks, ref, ref1, ref2, task, tasks;
  tasks = [];
  inappropriateTasks = {};
  for (i = 0, len1 = defaultTasks.length; i < len1; i++) {
    task = defaultTasks[i];
    if (task.name === 'Create two sample projects' && level.get('shareable') !== 'project') {
      inappropriateTasks[task.name] = task;
    } else if (task.types && (ref = level.get('realType') || level.get('type', true), indexOf.call(task.types, ref) < 0)) {
      inappropriateTasks[task.name] = task;
    } else {
      tasks.push(task);
    }
  }
  oldTasks = ((ref1 = level.get('tasks')) != null ? ref1 : []).slice();
  newTasks = [];
  for (j = 0, len2 = tasks.length; j < len2; j++) {
    task = tasks[j];
    oldName = renamedTaskNames[task.name] || task.name;
    if (oldTask = _.find(oldTasks, {
      name: oldName
    }) || _.find(oldTasks, {
      name: task.name
    })) {
      complete = oldTask.complete || Boolean(typeof task.complete === "function" ? task.complete(level) : void 0);
      _.remove(oldTasks, {
        name: oldTask.name
      });
    } else {
      complete = Boolean(typeof task.complete === "function" ? task.complete(level) : void 0);
      if (!complete && task.optional) {
        continue;
      }
    }
    newTasks.push({
      name: task.name,
      complete: complete
    });
  }
  for (k = 0, len3 = oldTasks.length; k < len3; k++) {
    oldTask = oldTasks[k];
    if (!((ref2 = oldTask.name, indexOf.call(deprecatedTaskNames, ref2) >= 0) || inappropriateTasks[oldTask.name])) {
      newTasks.push(oldTask);
    }
  }
  return newTasks;
};
});

;require.register("views/editor/level/thangs/AddThangsView", function(exports, require, module) {
var AddThangsView, CocoCollection, CocoView, ThangType, ThangTypeSearchCollection, add_thangs_template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CocoView = require('views/core/CocoView');

add_thangs_template = require('templates/editor/level/add-thangs-view');

ThangType = require('models/ThangType');

CocoCollection = require('collections/CocoCollection');

ThangTypeSearchCollection = (function(superClass) {
  extend(ThangTypeSearchCollection, superClass);

  function ThangTypeSearchCollection() {
    return ThangTypeSearchCollection.__super__.constructor.apply(this, arguments);
  }

  ThangTypeSearchCollection.prototype.url = '/db/thang.type?project=original,name,version,description,slug,kind,rasterIcon';

  ThangTypeSearchCollection.prototype.model = ThangType;

  ThangTypeSearchCollection.prototype.addTerm = function(term) {
    if (term) {
      return this.url += "&term=" + term;
    }
  };

  return ThangTypeSearchCollection;

})(CocoCollection);

module.exports = AddThangsView = (function(superClass) {
  extend(AddThangsView, superClass);

  AddThangsView.prototype.id = 'add-thangs-view';

  AddThangsView.prototype.className = 'add-thangs-palette';

  AddThangsView.prototype.template = add_thangs_template;

  AddThangsView.prototype.events = {
    'keyup input#thang-search': 'runSearch'
  };

  function AddThangsView(options) {
    this.runSearch = bind(this.runSearch, this);
    AddThangsView.__super__.constructor.call(this, options);
    this.world = options.world;
    this.thangTypes = this.supermodel.loadCollection(new ThangTypeSearchCollection(), 'thangs').model;
  }

  AddThangsView.prototype.getRenderData = function(context) {
    var group, groupMap, groupName, groups, i, j, kind, len, len1, models, ref, someThangTypes, thangType, thangTypes;
    if (context == null) {
      context = {};
    }
    context = AddThangsView.__super__.getRenderData.call(this, context);
    if (this.searchModels) {
      models = this.searchModels;
    } else {
      models = this.supermodel.getModels(ThangType);
    }
    thangTypes = _.uniq(models, false, function(thangType) {
      return thangType.get('original');
    });
    thangTypes = _.reject(thangTypes, function(thangType) {
      var ref;
      return (ref = thangType.get('kind')) === 'Mark' || ref === 'Item' || ref === (void 0);
    });
    groupMap = {};
    for (i = 0, len = thangTypes.length; i < len; i++) {
      thangType = thangTypes[i];
      kind = thangType.get('kind');
      if (groupMap[kind] == null) {
        groupMap[kind] = [];
      }
      groupMap[kind].push(thangType);
    }
    groups = [];
    ref = Object.keys(groupMap).sort();
    for (j = 0, len1 = ref.length; j < len1; j++) {
      groupName = ref[j];
      someThangTypes = groupMap[groupName];
      someThangTypes = _.sortBy(someThangTypes, function(thangType) {
        return thangType.get('name');
      });
      group = {
        name: groupName,
        thangs: someThangTypes
      };
      groups.push(group);
    }
    groups = _.sortBy(groups, function(group) {
      var index;
      index = ['Wall', 'Floor', 'Unit', 'Doodad', 'Misc'].indexOf(group.name);
      if (index === -1) {
        return 9001;
      } else {
        return index;
      }
    });
    context.thangTypes = thangTypes;
    context.groups = groups;
    return context;
  };

  AddThangsView.prototype.afterRender = function() {
    AddThangsView.__super__.afterRender.call(this);
    return this.buildAddThangPopovers();
  };

  AddThangsView.prototype.buildAddThangPopovers = function() {
    return this.$el.find('#thangs-list .add-thang-palette-icon').addClass('has-tooltip').tooltip({
      container: 'body',
      animation: false
    });
  };

  AddThangsView.prototype.runSearch = function(e) {
    var term;
    if ((e != null ? e.which : void 0) === 27) {
      this.onEscapePressed();
    }
    term = this.$el.find('input#thang-search').val();
    if (term === this.lastSearch) {
      return;
    }
    this.searchModels = this.thangTypes.filter(function(model) {
      var regExp;
      if (!term) {
        return true;
      }
      regExp = new RegExp(term, 'i');
      return model.get('name').match(regExp);
    });
    this.render();
    this.$el.find('input#thang-search').focus().val(term);
    return this.lastSearch = term;
  };

  AddThangsView.prototype.onEscapePressed = function() {
    this.$el.find('input#thang-search').val('');
    return this.runSearch;
  };

  return AddThangsView;

})(CocoView);
});

;require.register("views/editor/level/thangs/LevelThangEditView", function(exports, require, module) {
var CocoView, LevelThangEditView, ThangComponentsEditView, ThangType, ace, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/thang/level-thang-edit-view');

ThangComponentsEditView = require('views/editor/component/ThangComponentsEditView');

ThangType = require('models/ThangType');

ace = require('ace');

module.exports = LevelThangEditView = (function(superClass) {
  extend(LevelThangEditView, superClass);


  /*
  In the level editor, is the bar at the top when editing a single thang.
  Everything below is part of the ThangComponentsEditView, which is shared with the
  ThangType editor view.
   */

  LevelThangEditView.prototype.id = 'level-thang-edit-view';

  LevelThangEditView.prototype.template = template;

  LevelThangEditView.prototype.events = {
    'click #all-thangs-link': 'navigateToAllThangs',
    'click #thang-name-link span': 'toggleNameEdit',
    'click #thang-type-link span': 'toggleTypeEdit',
    'blur #thang-name-link input': 'toggleNameEdit',
    'blur #thang-type-link input': 'toggleTypeEdit',
    'keydown #thang-name-link input': 'toggleNameEditIfReturn',
    'keydown #thang-type-link input': 'toggleTypeEditIfReturn'
  };

  function LevelThangEditView(options) {
    this.reportChanges = bind(this.reportChanges, this);
    this.onComponentsChanged = bind(this.onComponentsChanged, this);
    var ref;
    if (options == null) {
      options = {};
    }
    LevelThangEditView.__super__.constructor.call(this, options);
    this.world = options.world;
    this.thangData = $.extend(true, {}, (ref = options.thangData) != null ? ref : {});
    this.level = options.level;
    this.oldPath = options.oldPath;
    this.reportChanges = _.debounce(this.reportChanges, 1000);
  }

  LevelThangEditView.prototype.onLoaded = function() {
    return this.render();
  };

  LevelThangEditView.prototype.afterRender = function() {
    var input, m, options, thangType, thangTypeName, thangTypeNames;
    LevelThangEditView.__super__.afterRender.call(this);
    thangType = this.supermodel.getModelByOriginal(ThangType, this.thangData.thangType);
    options = {
      components: this.thangData.components,
      supermodel: this.supermodel,
      level: this.level,
      world: this.world
    };
    if (this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev')) {
      options.thangType = thangType;
    }
    this.thangComponentEditView = new ThangComponentsEditView(options);
    this.listenTo(this.thangComponentEditView, 'components-changed', this.onComponentsChanged);
    this.insertSubView(this.thangComponentEditView);
    thangTypeNames = (function() {
      var i, len, ref, results;
      ref = this.supermodel.getModels(ThangType);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        results.push(m.get('name'));
      }
      return results;
    }).call(this);
    input = this.$el.find('#thang-type-link input').autocomplete({
      source: thangTypeNames,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    thangType = _.find(this.supermodel.getModels(ThangType), (function(_this) {
      return function(m) {
        return m.get('original') === _this.thangData.thangType;
      };
    })(this));
    thangTypeName = (thangType != null ? thangType.get('name') : void 0) || 'None';
    input.val(thangTypeName);
    this.$el.find('#thang-type-link span').text(thangTypeName);
    return this.hideLoading();
  };

  LevelThangEditView.prototype.navigateToAllThangs = function() {
    return Backbone.Mediator.publish('editor:level-thang-done-editing', {
      thangData: $.extend(true, {}, this.thangData),
      oldPath: this.oldPath
    });
  };

  LevelThangEditView.prototype.toggleNameEdit = function() {
    var input, link, span, wasEditing;
    link = this.$el.find('#thang-name-link');
    wasEditing = link.find('input:visible').length;
    span = link.find('span');
    input = link.find('input');
    if (wasEditing) {
      span.text(input.val());
    } else {
      input.val(span.text());
    }
    link.find('span, input').toggle();
    if (!wasEditing) {
      input.select();
    }
    return this.thangData.id = span.text();
  };

  LevelThangEditView.prototype.toggleTypeEdit = function() {
    var input, link, span, thangType, thangTypeName, wasEditing;
    link = this.$el.find('#thang-type-link');
    wasEditing = link.find('input:visible').length;
    span = link.find('span');
    input = link.find('input');
    if (wasEditing) {
      span.text(input.val());
    }
    link.find('span, input').toggle();
    if (!wasEditing) {
      input.select();
    }
    thangTypeName = input.val();
    thangType = _.find(this.supermodel.getModels(ThangType), function(m) {
      return m.get('name') === thangTypeName;
    });
    if (thangType && wasEditing) {
      return this.thangData.thangType = thangType.get('original');
    }
  };

  LevelThangEditView.prototype.toggleNameEditIfReturn = function(e) {
    if (e.which === 13) {
      return this.$el.find('#thang-name-link input').blur();
    }
  };

  LevelThangEditView.prototype.toggleTypeEditIfReturn = function(e) {
    if (e.which === 13) {
      return this.$el.find('#thang-type-link input').blur();
    }
  };

  LevelThangEditView.prototype.onComponentsChanged = function(components) {
    this.thangData.components = components;
    return this.reportChanges();
  };

  LevelThangEditView.prototype.reportChanges = function() {
    if (this.destroyed) {
      return;
    }
    return Backbone.Mediator.publish('editor:level-thang-edited', {
      thangData: $.extend(true, {}, this.thangData),
      oldPath: this.oldPath
    });
  };

  return LevelThangEditView;

})(CocoView);
});

;require.register("views/editor/level/thangs/ThangsTabView", function(exports, require, module) {
var AddThangsView, CocoCollection, CocoView, GameUIState, Level, LevelComponent, LevelComponents, LevelThangEditView, MOVE_MARGIN, MOVE_SPEED, Surface, Thang, ThangNode, ThangType, ThangTypeSearchCollection, ThangsFolderNode, ThangsTabView, isObjectID, overlappableThangTypeNames, thangs_template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

AddThangsView = require('./AddThangsView');

thangs_template = require('templates/editor/level/thangs-tab-view');

Level = require('models/Level');

ThangType = require('models/ThangType');

LevelComponent = require('models/LevelComponent');

CocoCollection = require('collections/CocoCollection');

isObjectID = require('models/CocoModel').isObjectID;

Surface = require('lib/surface/Surface');

Thang = require('lib/world/thang');

LevelThangEditView = require('./LevelThangEditView');

LevelComponents = require('collections/LevelComponents');

require('vendor/treema');

GameUIState = require('models/GameUIState');

MOVE_MARGIN = 0.15;

MOVE_SPEED = 13;

overlappableThangTypeNames = ['Torch', 'Chains', 'Bird', 'Cloud 1', 'Cloud 2', 'Cloud 3', 'Waterfall', 'Obstacle', 'Electrowall', 'Spike Walls'];

ThangTypeSearchCollection = (function(superClass) {
  extend(ThangTypeSearchCollection, superClass);

  function ThangTypeSearchCollection() {
    return ThangTypeSearchCollection.__super__.constructor.apply(this, arguments);
  }

  ThangTypeSearchCollection.prototype.url = '/db/thang.type?project=original,name,version,slug,kind,components,prerenderedSpriteSheetData';

  ThangTypeSearchCollection.prototype.model = ThangType;

  return ThangTypeSearchCollection;

})(CocoCollection);

module.exports = ThangsTabView = (function(superClass) {
  extend(ThangsTabView, superClass);

  ThangsTabView.prototype.id = 'thangs-tab-view';

  ThangsTabView.prototype.className = 'tab-pane active';

  ThangsTabView.prototype.template = thangs_template;

  ThangsTabView.prototype.subscriptions = {
    'surface:mouse-moved': 'onSurfaceMouseMoved',
    'surface:mouse-over': 'onSurfaceMouseOver',
    'surface:mouse-out': 'onSurfaceMouseOut',
    'editor:edit-level-thang': 'editThang',
    'editor:level-thang-edited': 'onLevelThangEdited',
    'editor:level-thang-done-editing': 'onLevelThangDoneEditing',
    'editor:view-switched': 'onViewSwitched',
    'sprite:dragged': 'onSpriteDragged',
    'sprite:mouse-up': 'onSpriteMouseUp',
    'sprite:double-clicked': 'onSpriteDoubleClicked',
    'surface:stage-mouse-down': 'onStageMouseDown',
    'surface:stage-mouse-up': 'onStageMouseUp',
    'editor:random-terrain-generated': 'onRandomTerrainGenerated'
  };

  ThangsTabView.prototype.events = {
    'click #extant-thangs-filter button': 'onFilterExtantThangs',
    'click #delete': 'onDeleteClicked',
    'click #duplicate': 'onDuplicateClicked',
    'click #thangs-container-toggle': 'toggleThangsContainer',
    'click #thangs-palette-toggle': 'toggleThangsPalette',
    'click #rotation-menu-item button': 'onClickRotationButton'
  };

  ThangsTabView.prototype.shortcuts = {
    'esc': 'selectAddThang',
    'delete, del, backspace': 'deleteSelectedExtantThang',
    'ctrl+z, ⌘+z': 'undo',
    'ctrl+shift+z, ⌘+shift+z': 'redo',
    'alt+c': 'toggleSelectedThangCollision',
    'left': function() {
      return this.moveSelectedThangBy(-1, 0);
    },
    'right': function() {
      return this.moveSelectedThangBy(1, 0);
    },
    'up': function() {
      return this.moveSelectedThangBy(0, 1);
    },
    'down': function() {
      return this.moveSelectedThangBy(0, -1);
    },
    'alt+left': function() {
      if (!key.shift) {
        return this.rotateSelectedThangTo(Math.PI);
      }
    },
    'alt+right': function() {
      if (!key.shift) {
        return this.rotateSelectedThangTo(0);
      }
    },
    'alt+up': function() {
      return this.rotateSelectedThangTo(-Math.PI / 2);
    },
    'alt+down': function() {
      return this.rotateSelectedThangTo(Math.PI / 2);
    },
    'alt+shift+left': function() {
      return this.rotateSelectedThangBy(Math.PI / 16);
    },
    'alt+shift+right': function() {
      return this.rotateSelectedThangBy(-Math.PI / 16);
    },
    'shift+left': function() {
      return this.resizeSelectedThangBy(-1, 0);
    },
    'shift+right': function() {
      return this.resizeSelectedThangBy(1, 0);
    },
    'shift+up': function() {
      return this.resizeSelectedThangBy(0, 1);
    },
    'shift+down': function() {
      return this.resizeSelectedThangBy(0, -1);
    }
  };

  function ThangsTabView(options) {
    this.onTreemaThangDoubleClicked = bind(this.onTreemaThangDoubleClicked, this);
    this.onTreemaThangSelected = bind(this.onTreemaThangSelected, this);
    this.onThangsChanged = bind(this.onThangsChanged, this);
    this.deleteSelectedExtantThang = bind(this.deleteSelectedExtantThang, this);
    this.moveSide = bind(this.moveSide, this);
    this.selectAddThang = bind(this.selectAddThang, this);
    ThangsTabView.__super__.constructor.call(this, options);
    this.world = options.world;
    this.gameUIState = new GameUIState();
    this.listenTo(this.gameUIState, 'sprite:mouse-down', this.onSpriteMouseDown);
    this.listenTo(this.gameUIState, 'surface:stage-mouse-move', this.onStageMouseMove);
    this.listenTo(this.gameUIState, 'change:selected', this.onChangeSelected);
    this.thangTypes = this.supermodel.loadCollection(new ThangTypeSearchCollection(), 'thangs').model;
    this.componentCollection = new LevelComponents([], {
      saveBackups: true
    });
    this.supermodel.trackRequest(this.componentCollection.fetch());
    this.listenToOnce(this.componentCollection, 'sync', function() {
      var component, i, len, ref, results;
      ref = this.componentCollection.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        component = ref[i];
        component.url = "/db/level.component/" + (component.get('original')) + "/version/" + (component.get('version').major);
        results.push(this.supermodel.registerModel(component));
      }
      return results;
    });
    this.level = options.level;
    this.onThangsChanged = _.debounce(this.onThangsChanged);
    $(document).bind('contextmenu', this.preventDefaultContextMenu);
  }

  ThangsTabView.prototype.getRenderData = function(context) {
    var group, groupMap, groupName, groups, i, j, k, len, len1, len2, name1, ref, ref1, someThangTypes, thangType, thangTypes;
    if (context == null) {
      context = {};
    }
    context = ThangsTabView.__super__.getRenderData.call(this, context);
    if (!this.supermodel.finished()) {
      return context;
    }
    ref = this.thangTypes.models;
    for (i = 0, len = ref.length; i < len; i++) {
      thangType = ref[i];
      thangType.notInLevel = true;
    }
    thangTypes = (function() {
      var j, len1, ref1, results;
      ref1 = this.supermodel.getModels(ThangType);
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        thangType = ref1[j];
        results.push(thangType.attributes);
      }
      return results;
    }).call(this);
    thangTypes = _.uniq(thangTypes, false, 'original');
    thangTypes = _.reject(thangTypes, function(tt) {
      var ref1;
      return (ref1 = tt.kind) === 'Mark' || ref1 === (void 0);
    });
    groupMap = {};
    for (j = 0, len1 = thangTypes.length; j < len1; j++) {
      thangType = thangTypes[j];
      if (groupMap[name1 = thangType.kind] == null) {
        groupMap[name1] = [];
      }
      groupMap[thangType.kind].push(thangType);
    }
    groups = [];
    ref1 = Object.keys(groupMap).sort();
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      groupName = ref1[k];
      someThangTypes = groupMap[groupName];
      someThangTypes = _.sortBy(someThangTypes, 'name');
      group = {
        name: groupName,
        thangs: someThangTypes
      };
      groups.push(group);
    }
    context.thangTypes = thangTypes;
    context.groups = groups;
    return context;
  };

  ThangsTabView.prototype.undo = function(e) {
    if (!this.editThangView) {
      return this.thangsTreema.undo();
    } else {
      return this.editThangView.undo();
    }
  };

  ThangsTabView.prototype.redo = function(e) {
    if (!this.editThangView) {
      return this.thangsTreema.redo();
    } else {
      return this.editThangView.redo();
    }
  };

  ThangsTabView.prototype.afterRender = function() {
    ThangsTabView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    $('.tab-content').mousedown(this.selectAddThang);
    $('#thangs-list').bind('mousewheel', this.preventBodyScrollingInThangList);
    this.$el.find('#extant-thangs-filter button:first').button('toggle');
    $(window).on('resize', this.onWindowResize);
    this.addThangsView = this.insertSubView(new AddThangsView({
      world: this.world
    }));
    this.buildInterface();
    if (_.keys(this.thangsTreema.data).length) {
      return this.$el.find('#canvas-overlay').css('display', 'none');
    }
  };

  ThangsTabView.prototype.onFilterExtantThangs = function(e) {
    var button, val;
    this.$el.find('#extant-thangs-filter button.active').button('toggle');
    button = $(e.target).closest('button');
    button.button('toggle');
    val = button.val();
    if (this.lastHideClass) {
      this.thangsTreema.$el.removeClass(this.lastHideClass);
    }
    if (val) {
      return this.thangsTreema.$el.addClass(this.lastHideClass = "hide-except-" + val);
    }
  };

  ThangsTabView.prototype.preventBodyScrollingInThangList = function(e) {
    this.scrollTop += (e.deltaY < 0 ? 1 : -1) * 30;
    return e.preventDefault();
  };

  ThangsTabView.prototype.buildInterface = function(e) {
    var data, oldHeight, ref, schema, thangsHeaderHeight, thangsObject, treemaOptions;
    if (e) {
      this.level = e.level;
    }
    data = $.extend(true, [], (ref = this.level.attributes.thangs) != null ? ref : []);
    thangsObject = this.groupThangs(data);
    schema = {
      type: 'object',
      format: 'thangs-folder',
      additionalProperties: {
        anyOf: [
          {
            type: 'object',
            format: 'thang',
            required: ['thangType', 'id']
          }, {
            $ref: '#'
          }
        ]
      }
    };
    treemaOptions = {
      schema: schema,
      data: thangsObject,
      skipValidation: true,
      supermodel: this.supermodel,
      callbacks: {
        change: this.onThangsChanged,
        select: this.onTreemaThangSelected,
        dblclick: this.onTreemaThangDoubleClicked
      },
      readOnly: true,
      nodeClasses: {
        thang: ThangNode,
        'thangs-folder': ThangsFolderNode
      },
      world: this.world
    };
    this.thangsTreema = this.$el.find('#thangs-treema').treema(treemaOptions);
    this.thangsTreema.build();
    this.thangsTreema.open();
    this.openSmallerFolders(this.thangsTreema);
    this.onThangsChanged();
    this.initSurface();
    thangsHeaderHeight = $('#thangs-header').height();
    oldHeight = $('#thangs-list').height();
    $('#thangs-list').height(oldHeight - thangsHeaderHeight);
    if (data != null ? data.length : void 0) {
      return this.$el.find('.generate-terrain-button').hide();
    }
  };

  ThangsTabView.prototype.openSmallerFolders = function(folderTreema) {
    var child, children, i, len, results;
    children = _.values(folderTreema.childrenTreemas);
    results = [];
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      if (child.data.thangType) {
        continue;
      }
      if (_.keys(child.data).length < 5) {
        child.open();
        results.push(this.openSmallerFolders(child));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ThangsTabView.prototype.initSurface = function() {
    var normalCanvas, webGLCanvas;
    webGLCanvas = $('canvas#webgl-surface', this.$el);
    normalCanvas = $('canvas#normal-surface', this.$el);
    this.surface = new Surface(this.world, normalCanvas, webGLCanvas, {
      paths: false,
      coords: true,
      grid: true,
      navigateToSelection: false,
      thangTypes: this.supermodel.getModels(ThangType),
      showInvisible: true,
      frameRate: 15,
      levelType: this.level.get('type', true),
      gameUIState: this.gameUIState,
      handleEvents: false
    });
    this.surface.playing = false;
    this.surface.setWorld(this.world);
    this.surface.lankBoss.suppressSelectionSounds = true;
    return this.centerCamera();
  };

  ThangsTabView.prototype.centerCamera = function() {
    var bottom, center, height, left, ref, ref1, right, sup, top, width, zoom;
    ref = this.world.size(), width = ref[0], height = ref[1];
    width = Math.max(width, 80);
    height = Math.max(height, 68);
    ref1 = this.world.getBounds(), left = ref1.left, top = ref1.top, right = ref1.right, bottom = ref1.bottom;
    center = {
      x: left + width / 2,
      y: bottom + height / 2
    };
    sup = this.surface.camera.worldToSurface(center);
    zoom = 0.94 * 92.4 / width;
    return this.surface.camera.zoomTo(sup, zoom, 0);
  };

  ThangsTabView.prototype.destroy = function() {
    var ref, ref1;
    this.selectAddThangType(null);
    if ((ref = this.surface) != null) {
      ref.destroy();
    }
    $(window).off('resize', this.onWindowResize);
    $(document).unbind('contextmenu', this.preventDefaultContextMenu);
    if ((ref1 = this.thangsTreema) != null) {
      ref1.destroy();
    }
    return ThangsTabView.__super__.destroy.call(this);
  };

  ThangsTabView.prototype.onViewSwitched = function(e) {
    var ref, ref1;
    this.selectAddThang(null, true);
    return (ref = this.surface) != null ? (ref1 = ref.lankBoss) != null ? ref1.selectLank(null, null) : void 0 : void 0;
  };

  ThangsTabView.prototype.onStageMouseDown = function(e) {
    var ref;
    this.dragged = 0;
    this.willUnselectSprite = false;
    this.gameUIState.set('canDragCamera', true);
    if (((ref = this.addThangLank) != null ? ref.thangType.get('kind') : void 0) === 'Wall') {
      this.paintingWalls = true;
      return this.gameUIState.set('canDragCamera', false);
    } else if (this.addThangLank) {
      return this.addThang(this.addThangType, this.addThangLank.thang.pos);
    } else if (e.onBackground) {
      return this.gameUIState.set('selected', []);
    }
  };

  ThangsTabView.prototype.onStageMouseMove = function(e) {
    return this.dragged += 1;
  };

  ThangsTabView.prototype.onStageMouseUp = function(e) {
    this.paintingWalls = false;
    return $('#contextmenu').hide();
  };

  ThangsTabView.prototype.onSpriteMouseDown = function(e) {
    var alreadySelected, lastSelected, nativeEvent, ref, selected;
    nativeEvent = e.originalEvent.nativeEvent;
    selected = [];
    if (nativeEvent.metaKey || nativeEvent.ctrlKey) {
      selected = _.clone(this.gameUIState.get('selected'));
    }
    if ((ref = e.thang) != null ? ref.isSelectable : void 0) {
      alreadySelected = _.find(selected, function(s) {
        return s.thang === e.thang;
      });
      if (alreadySelected) {
        this.willUnselectSprite = true;
        selected = _.without(selected, alreadySelected);
      }
      selected.push({
        thang: e.thang,
        sprite: e.sprite,
        spellName: e.spellName
      });
    }
    if (_.any(selected) && key.alt) {
      lastSelected = _.last(selected);
      this.selectAddThangType(lastSelected.thang.spriteName, lastSelected.thang);
      selected = [];
    }
    this.gameUIState.set('selected', selected);
    if (_.any(selected)) {
      return this.gameUIState.set('canDragCamera', false);
    }
  };

  ThangsTabView.prototype.onSpriteDragged = function(e) {
    var cap, h, i, id, j, lastSelected, len, len1, newPos, posAfter, posBefore, ref, ref1, ref2, selected, sidebarWidth, sidebarWidths, singleSelected, stageX, stageY, w, wop, xDiff, yDiff;
    selected = this.gameUIState.get('selected');
    if (!(_.any(selected) && this.dragged > 10)) {
      return;
    }
    this.willUnselectSprite = false;
    ref = e.originalEvent, stageX = ref.stageX, stageY = ref.stageY;
    lastSelected = _.last(selected);
    cap = this.surface.camera.screenToCanvas({
      x: stageX,
      y: stageY
    });
    wop = this.surface.camera.canvasToWorld(cap);
    wop.z = lastSelected.thang.depth / 2;
    posBefore = _.clone(lastSelected.thang.pos);
    this.adjustThangPos(lastSelected.sprite, lastSelected.thang, wop);
    posAfter = lastSelected.thang.pos;
    xDiff = posAfter.x - posBefore.x;
    yDiff = posAfter.y - posBefore.y;
    if (xDiff || yDiff) {
      ref1 = selected.slice(0, selected.length - 1);
      for (i = 0, len = ref1.length; i < len; i++) {
        singleSelected = ref1[i];
        newPos = {
          x: singleSelected.thang.pos.x + xDiff,
          y: singleSelected.thang.pos.y + yDiff
        };
        this.adjustThangPos(singleSelected.sprite, singleSelected.thang, newPos);
      }
    }
    ref2 = [this.surface.camera.canvasWidth, this.surface.camera.canvasHeight], w = ref2[0], h = ref2[1];
    sidebarWidths = (function() {
      var j, len1, ref3, results;
      ref3 = ['#all-thangs', '#add-thangs-view'];
      results = [];
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        id = ref3[j];
        results.push(this.$el.find(id).hasClass('hide') ? 0 : this.$el.find(id).outerWidth() / this.surface.camera.canvasScaleFactorX);
      }
      return results;
    }).call(this);
    for (j = 0, len1 = sidebarWidths.length; j < len1; j++) {
      sidebarWidth = sidebarWidths[j];
      w -= sidebarWidth;
    }
    cap.x -= sidebarWidths[0];
    return this.calculateMovement(cap.x / w, cap.y / h, w / h);
  };

  ThangsTabView.prototype.onSpriteMouseUp = function(e) {
    var clickedSprite, i, len, path, physical, pos, ref, selected, singleSelected, thang;
    selected = this.gameUIState.get('selected');
    if (e.originalEvent.nativeEvent.button === 2 && _.any(selected)) {
      this.onSpriteContextMenu(e);
    }
    if (this.movementInterval != null) {
      clearInterval(this.movementInterval);
    }
    this.movementInterval = null;
    if (!_.any(selected)) {
      return;
    }
    for (i = 0, len = selected.length; i < len; i++) {
      singleSelected = selected[i];
      pos = singleSelected.thang.pos;
      thang = _.find((ref = this.level.get('thangs')) != null ? ref : [], {
        id: singleSelected.thang.id
      });
      path = (this.pathForThang(thang)) + "/components/original=" + LevelComponent.PhysicalID;
      physical = this.thangsTreema.get(path);
      if (!physical || (physical.config.pos.x === pos.x && physical.config.pos.y === pos.y)) {
        continue;
      }
      this.thangsTreema.set(path + '/config/pos', {
        x: pos.x,
        y: pos.y,
        z: pos.z
      });
    }
    if (this.willUnselectSprite) {
      clickedSprite = _.find(selected, {
        sprite: e.sprite
      });
      return this.gameUIState.set('selected', _.without(selected, clickedSprite));
    }
  };

  ThangsTabView.prototype.onSpriteDoubleClicked = function(e) {
    if (this.dragged > 10) {
      return;
    }
    if (!e.thang) {
      return;
    }
    return this.editThang({
      thangID: e.thang.id
    });
  };

  ThangsTabView.prototype.onRandomTerrainGenerated = function(e) {
    var i, len, listening, nonRandomThangs, ref, thang;
    this.thangsBatch = [];
    this.hush = true;
    nonRandomThangs = (function() {
      var i, len, ref, results;
      ref = this.flattenThangs(this.thangsTreema.data);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        thang = ref[i];
        if (!/Random/.test(thang.id)) {
          results.push(thang);
        }
      }
      return results;
    }).call(this);
    this.thangsTreema.set('', this.groupThangs(nonRandomThangs));
    listening = {};
    ref = e.thangs;
    for (i = 0, len = ref.length; i < len; i++) {
      thang = ref[i];
      this.selectAddThangType(thang.id);
      if (!(this.addThangType.isFullyLoaded() || listening[this.addThangType.cid])) {
        listening[this.addThangType.cid] = true;
        this.listenToOnce(this.addThangType, 'build-complete', this.onThangsChanged);
      }
      this.addThang(this.addThangType, thang.pos, true);
    }
    this.hush = false;
    this.onThangsChanged();
    return this.selectAddThangType(null);
  };

  ThangsTabView.prototype.onChangeSelected = function(gameUIState, selected) {
    var previousSprite, ref, ref1, ref2, sprite, thang;
    previousSprite = (ref = gameUIState.previousAttributes()) != null ? (ref1 = ref.selected) != null ? ref1.sprite : void 0 : void 0;
    sprite = selected != null ? selected.sprite : void 0;
    thang = selected != null ? selected.thang : void 0;
    if (previousSprite !== sprite) {
      if (previousSprite != null) {
        if (typeof previousSprite.setNameLabel === "function") {
          previousSprite.setNameLabel(null);
        }
      }
    }
    if (thang && !(this.addThangLank && (ref2 = this.addThangType.get('name'), indexOf.call(overlappableThangTypeNames, ref2) >= 0))) {
      this.selectAddThang(null, true);
      this.selectedExtantThangClickTime = new Date();
      sprite.setNameLabel(sprite.thangType.get('name') + ': ' + thang.id);
      sprite.updateLabels();
      return sprite.updateMarks();
    }
  };

  ThangsTabView.prototype.justAdded = function() {
    return this.lastAddTime && (new Date() - this.lastAddTime) < 150;
  };

  ThangsTabView.prototype.selectAddThang = function(e, forceDeselect) {
    var ref, target, wasSelected;
    if (forceDeselect == null) {
      forceDeselect = false;
    }
    if ((e != null) && $(e.target).closest('#thang-search').length) {
      return;
    }
    if (!(((e != null) && $(e.target).closest('#thangs-tab-view').length) || key.isPressed('esc') || forceDeselect)) {
      return;
    }
    if (e) {
      target = $(e.target);
    } else {
      target = this.$el.find('.add-thangs-palette');
    }
    if (target.attr('id') === 'webgl-surface') {
      return true;
    }
    target = target.closest('.add-thang-palette-icon');
    wasSelected = target.hasClass('selected');
    this.$el.find('.add-thangs-palette .add-thang-palette-icon.selected').removeClass('selected');
    if (!(key.alt || key.meta)) {
      this.selectAddThangType(wasSelected ? null : target.attr('data-thang-type'));
    }
    if ((ref = this.addThangLank) != null) {
      if (typeof ref.playSound === "function") {
        ref.playSound('selected');
      }
    }
    if (this.addThangType) {
      return target.addClass('selected');
    }
  };

  ThangsTabView.prototype.moveAddThangSelection = function(direction) {
    var icons, nextSelectedIndex, selectedIcon, selectedIndex;
    if (!this.addThangType) {
      return;
    }
    icons = $('.add-thangs-palette .add-thang-palette-icon');
    selectedIcon = icons.filter('.selected');
    selectedIndex = icons.index(selectedIcon);
    nextSelectedIndex = (selectedIndex + direction + icons.length) % icons.length;
    return this.selectAddThang({
      target: icons[nextSelectedIndex]
    });
  };

  ThangsTabView.prototype.selectAddThangType = function(type, cloneSourceThang) {
    var pos, ref, ref1, thang;
    this.cloneSourceThang = cloneSourceThang;
    if (_.isString(type)) {
      type = _.find(this.supermodel.getModels(ThangType), function(m) {
        return m.get('name') === type;
      });
    }
    pos = (ref = this.addThangLank) != null ? ref.thang.pos : void 0;
    if (this.addThangLank) {
      this.surface.lankBoss.removeLank(this.addThangLank);
    }
    this.addThangType = type;
    if (this.addThangType) {
      this.surface.lankBoss.reallyStopMoving = true;
      thang = this.createAddThang();
      this.addThangLank = this.surface.lankBoss.addThangToLanks(thang, this.surface.lankBoss.layerAdapters['Floating']);
      this.addThangLank.notOfThisWorld = true;
      this.addThangLank.sprite.alpha = 0.75;
      if (pos == null) {
        pos = {
          x: Math.round(this.world.width / 2),
          y: Math.round(this.world.height / 2)
        };
      }
      return this.adjustThangPos(this.addThangLank, thang, pos);
    } else {
      this.addThangLank = null;
      return (ref1 = this.surface) != null ? ref1.lankBoss.reallyStopMoving = false : void 0;
    }
  };

  ThangsTabView.prototype.createEssentialComponents = function(defaultComponents) {
    var physicalConfig, physicalOriginal, ref, ref1, ref2;
    physicalConfig = {
      pos: {
        x: 10,
        y: 10,
        z: 1
      }
    };
    if (physicalOriginal = _.find(defaultComponents != null ? defaultComponents : [], {
      original: LevelComponent.PhysicalID
    })) {
      physicalConfig.pos.z = (ref = (ref1 = physicalOriginal.config) != null ? (ref2 = ref1.pos) != null ? ref2.z : void 0 : void 0) != null ? ref : 1;
    }
    return [
      {
        original: LevelComponent.ExistsID,
        majorVersion: 0,
        config: {}
      }, {
        original: LevelComponent.PhysicalID,
        majorVersion: 0,
        config: physicalConfig
      }
    ];
  };

  ThangsTabView.prototype.createAddThang = function() {
    var allComponents, comp, componentClass, components, i, lc, len, mockThang, raw, rawComponents, ref, ref1, ref2, thang;
    allComponents = (function() {
      var i, len, ref, results;
      ref = this.supermodel.getModels(LevelComponent);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        lc = ref[i];
        results.push(lc.attributes);
      }
      return results;
    }).call(this);
    rawComponents = (ref = this.addThangType.get('components')) != null ? ref : [];
    if (!rawComponents.length) {
      rawComponents = this.createEssentialComponents();
    }
    mockThang = {
      components: rawComponents
    };
    this.level.sortThangComponents([mockThang], allComponents);
    components = [];
    ref1 = mockThang.components;
    for (i = 0, len = ref1.length; i < len; i++) {
      raw = ref1[i];
      comp = _.find(allComponents, {
        original: raw.original
      });
      if ((ref2 = comp.name) === 'Selectable' || ref2 === 'Attackable') {
        continue;
      }
      componentClass = this.world.loadClassFromCode(comp.js, comp.name, 'component');
      components.push([componentClass, raw.config]);
    }
    thang = new Thang(this.world, this.addThangType.get('name'), 'Add Thang Phantom');
    thang.addComponents.apply(thang, components);
    return thang;
  };

  ThangsTabView.prototype.adjustThangPos = function(sprite, thang, pos) {
    var ref, ref1, ref2, ref3, ref4, ref5, snap;
    if (key.shift) {
      pos.x = Math.round(pos.x);
      pos.y = Math.round(pos.y);
    } else {
      snap = (sprite != null ? (ref = sprite.data) != null ? ref.snap : void 0 : void 0) || (sprite != null ? (ref1 = sprite.thangType) != null ? ref1.get('snap') : void 0 : void 0) || {
        x: 0.01,
        y: 0.01
      };
      pos.x = Math.round((pos.x - ((ref2 = thang.width) != null ? ref2 : 1) / 2) / snap.x) * snap.x + ((ref3 = thang.width) != null ? ref3 : 1) / 2;
      pos.y = Math.round((pos.y - ((ref4 = thang.height) != null ? ref4 : 1) / 2) / snap.y) * snap.y + ((ref5 = thang.height) != null ? ref5 : 1) / 2;
    }
    pos.z = thang.depth / 2;
    thang.pos = pos;
    thang.stateChanged = true;
    return this.surface.lankBoss.update(true);
  };

  ThangsTabView.prototype.onSurfaceMouseMoved = function(e) {
    var wop;
    if (!this.addThangLank) {
      return;
    }
    wop = this.surface.camera.screenToWorld({
      x: e.x,
      y: e.y
    });
    wop.z = 0.5;
    this.adjustThangPos(this.addThangLank, this.addThangLank.thang, wop);
    if (this.paintingWalls) {
      if (!_.find(this.surface.lankBoss.lankArray, ((function(_this) {
        return function(lank) {
          return lank.thangType.get('kind') === 'Wall' && Math.abs(lank.thang.pos.x - _this.addThangLank.thang.pos.x) < 2 && Math.abs(lank.thang.pos.y - _this.addThangLank.thang.pos.y) < 2 && lank !== _this.addThangLank;
        };
      })(this)))) {
        this.addThang(this.addThangType, this.addThangLank.thang.pos);
        this.lastAddTime = new Date();
        this.paintedWalls = true;
      }
    }
    return null;
  };

  ThangsTabView.prototype.onSurfaceMouseOver = function(e) {
    if (!this.addThangLank) {
      return;
    }
    return this.addThangLank.sprite.visible = true;
  };

  ThangsTabView.prototype.onSurfaceMouseOut = function(e) {
    if (!this.addThangLank) {
      return;
    }
    return this.addThangLank.sprite.visible = false;
  };

  ThangsTabView.prototype.calculateMovement = function(pctX, pctY, widthHeightRatio) {
    var MOVE_TOP_MARGIN, diff;
    MOVE_TOP_MARGIN = 1.0 - MOVE_MARGIN;
    if ((MOVE_TOP_MARGIN > pctX && pctX > MOVE_MARGIN) && (MOVE_TOP_MARGIN > pctY && pctY > MOVE_MARGIN)) {
      if (this.movementInterval != null) {
        clearInterval(this.movementInterval);
      }
      this.movementInterval = null;
      return this.moveLatitude = this.moveLongitude = this.speed = 0;
    }
    diff = MOVE_MARGIN * 2;
    this.speed = Math.max(Math.abs(pctX - 0.5), Math.abs(pctY - 0.5)) * 2;
    this.speed -= 1.0 - diff;
    this.speed *= 1.0 / diff;
    this.speed *= MOVE_SPEED;
    this.moveLatitude = pctX * 2 - 1;
    this.moveLongitude = pctY * 2 - 1;
    if (widthHeightRatio > 1.0) {
      this.moveLongitude /= widthHeightRatio;
    }
    if (widthHeightRatio < 1.0) {
      this.moveLatitude *= widthHeightRatio;
    }
    if (this.movementInterval == null) {
      return this.movementInterval = setInterval(this.moveSide, 16);
    }
  };

  ThangsTabView.prototype.moveSide = function() {
    var c, p;
    if (!this.speed) {
      return;
    }
    c = this.surface.camera;
    p = {
      x: c.target.x + this.moveLatitude * this.speed / c.zoom,
      y: c.target.y + this.moveLongitude * this.speed / c.zoom
    };
    return c.zoomTo(p, c.zoom, 0);
  };

  ThangsTabView.prototype.deleteSelectedExtantThang = function(e) {
    var i, len, selected, singleSelected, thang;
    if ($(e.target).hasClass('treema-node')) {
      return;
    }
    selected = this.gameUIState.get('selected');
    if (!_.any(selected)) {
      return;
    }
    for (i = 0, len = selected.length; i < len; i++) {
      singleSelected = selected[i];
      thang = this.getThangByID(singleSelected.thang.id);
      this.thangsTreema["delete"](this.pathForThang(thang));
      this.deleteEmptyTreema(thang);
      Thang.resetThangIDs();
    }
    return this.gameUIState.set('selected', []);
  };

  ThangsTabView.prototype.deleteEmptyTreema = function(thang) {
    var children, folderPath, thangKind, thangName, thangType;
    thangType = this.supermodel.getModelByOriginal(ThangType, thang.thangType);
    children = this.thangsTreema.childrenTreemas;
    thangKind = children[thangType.get('kind', true)].data;
    thangName = thangKind[thangType.get('name', true)];
    if (Object.keys(thangName).length === 0) {
      folderPath = [thangType.get('kind', true), thangType.get('name', true)].join('/');
      this.thangsTreema["delete"](folderPath);
      if (Object.keys(thangKind).length === 0) {
        folderPath = [thangType.get('kind', true)].join('/');
        return this.thangsTreema["delete"](folderPath);
      }
    }
  };

  ThangsTabView.prototype.groupThangs = function(thangs) {
    var grouped, i, index, j, key, len, len1, obj, path, thang;
    grouped = {};
    for (index = i = 0, len = thangs.length; i < len; index = ++i) {
      thang = thangs[index];
      path = this.folderForThang(thang);
      obj = grouped;
      for (j = 0, len1 = path.length; j < len1; j++) {
        key = path[j];
        if (obj[key] == null) {
          obj[key] = {};
        }
        obj = obj[key];
      }
      obj[thang.id] = thang;
      thang.index = index;
    }
    return grouped;
  };

  ThangsTabView.prototype.folderForThang = function(thang) {
    var thangType;
    thangType = this.supermodel.getModelByOriginal(ThangType, thang.thangType);
    if (!thangType.get('kind', true)) {
      console.error('uhh, we had kind', thangType.get('kind', true), 'for', thangType);
    }
    return [thangType.get('kind', true), thangType.get('name', true)];
  };

  ThangsTabView.prototype.pathForThang = function(thang) {
    var folder;
    folder = this.folderForThang(thang);
    folder.push(thang.id);
    return folder.join('/');
  };

  ThangsTabView.prototype.flattenThangs = function(thangs) {
    var flattened, key, value;
    flattened = [];
    for (key in thangs) {
      value = thangs[key];
      if ((value.id != null) && value.thangType) {
        flattened.push(value);
      } else {
        flattened = flattened.concat(this.flattenThangs(value));
      }
    }
    return flattened;
  };

  ThangsTabView.prototype.populateFoldersForThang = function(thang) {
    var i, len, prefix, results, segment, thangFolder;
    thangFolder = this.folderForThang(thang);
    prefix = '';
    results = [];
    for (i = 0, len = thangFolder.length; i < len; i++) {
      segment = thangFolder[i];
      if (prefix) {
        prefix += '/';
      }
      prefix += segment;
      if (!this.thangsTreema.get(prefix)) {
        results.push(this.thangsTreema.set(prefix, {}));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ThangsTabView.prototype.onThangsChanged = function(skipSerialization) {
    var error, error1, i, j, k, len, len1, len2, ref, ref1, ref2, selected, serializedLevel, singleSelected, sprite, thang, thangs;
    if (this.hush) {
      return;
    }
    thangs = this.flattenThangs(this.thangsTreema.data);
    thangs = $.extend(true, [], thangs);
    thangs = _.sortBy(thangs, 'index');
    for (i = 0, len = thangs.length; i < len; i++) {
      thang = thangs[i];
      delete thang.index;
    }
    this.level.set('thangs', thangs);
    if (this.editThangView) {
      return;
    }
    if (skipSerialization) {
      return;
    }
    serializedLevel = this.level.serialize({
      supermodel: this.supermodel,
      session: null,
      otherSession: null,
      headless: false,
      sessionless: true,
      cached: true
    });
    try {
      this.world.loadFromLevel(serializedLevel, false);
    } catch (error1) {
      error = error1;
      console.error('Catastrophic error loading the level:', error);
    }
    ref = this.world.thangs;
    for (j = 0, len1 = ref.length; j < len1; j++) {
      thang = ref[j];
      thang.isSelectable = !thang.isLand;
    }
    if ((ref1 = this.surface) != null) {
      ref1.setWorld(this.world);
    }
    if ((ref2 = this.surface) != null) {
      ref2.lankBoss.cachedObstacles = false;
    }
    if (this.addThangType) {
      this.selectAddThangType(this.addThangType, this.cloneSourceThang);
    }
    selected = this.gameUIState.get('selected');
    if (_.any(selected)) {
      for (k = 0, len2 = selected.length; k < len2; k++) {
        singleSelected = selected[k];
        sprite = this.surface.lankBoss.lanks[singleSelected.thang.id];
        if (sprite) {
          sprite.updateMarks();
          singleSelected.sprite = sprite;
          singleSelected.thang = sprite.thang;
        }
      }
    }
    return Backbone.Mediator.publish('editor:thangs-edited', {
      thangs: this.world.thangs
    });
  };

  ThangsTabView.prototype.onTreemaThangSelected = function(e, selectedTreemas) {
    var lank, lanks, node, selected, selectedThangTreemas, thangID, thangIDs;
    selectedThangTreemas = _.filter(selectedTreemas, function(t) {
      return t instanceof ThangNode;
    });
    thangIDs = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = selectedThangTreemas.length; i < len; i++) {
        node = selectedThangTreemas[i];
        results.push(node.data.id);
      }
      return results;
    })();
    lanks = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = thangIDs.length; i < len; i++) {
        thangID = thangIDs[i];
        if (thangID) {
          results.push(this.surface.lankBoss.lanks[thangID]);
        }
      }
      return results;
    }).call(this);
    selected = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = lanks.length; i < len; i++) {
        lank = lanks[i];
        if (lank) {
          results.push({
            thang: lank.thang,
            sprite: lank
          });
        }
      }
      return results;
    })();
    return this.gameUIState.set('selected', selected);
  };

  ThangsTabView.prototype.onTreemaThangDoubleClicked = function(e, treema) {
    var id, nativeEvent, ref;
    nativeEvent = e.originalEvent.nativeEvent;
    if (nativeEvent && (nativeEvent.ctrlKey || nativeEvent.metaKey)) {
      return;
    }
    id = treema != null ? (ref = treema.data) != null ? ref.id : void 0 : void 0;
    if (id) {
      return this.editThang({
        thangID: id
      });
    }
  };

  ThangsTabView.prototype.getThangByID = function(id) {
    var ref;
    return _.find((ref = this.level.get('thangs')) != null ? ref : [], {
      id: id
    });
  };

  ThangsTabView.prototype.addThang = function(thangType, pos, batchInsert) {
    var components, physical, ref, thang, thangID;
    if (batchInsert == null) {
      batchInsert = false;
    }
    this.$el.find('.generate-terrain-button').hide();
    if (batchInsert) {
      if (thangType.get('name') === 'Hero Placeholder') {
        thangID = 'Hero Placeholder';
        if (!this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev') || this.getThangByID(thangID)) {
          return;
        }
      } else {
        thangID = "Random " + (thangType.get('name')) + " " + this.thangsBatch.length;
      }
    } else {
      while (!(thangID && !this.getThangByID(thangID))) {
        thangID = Thang.nextID(thangType.get('name'), this.world);
      }
    }
    if (this.cloneSourceThang) {
      components = _.cloneDeep(this.getThangByID(this.cloneSourceThang.id).components);
    } else if (this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev')) {
      components = [];
    } else {
      components = _.cloneDeep((ref = thangType.get('components')) != null ? ref : []);
    }
    if (!components.length) {
      components = this.createEssentialComponents(thangType.get('components'));
    }
    physical = _.find(components, function(c) {
      var ref1;
      return ((ref1 = c.config) != null ? ref1.pos : void 0) != null;
    });
    if (physical) {
      physical.config.pos = {
        x: pos.x,
        y: pos.y,
        z: physical.config.pos.z
      };
    }
    thang = {
      thangType: thangType.get('original'),
      id: thangID,
      components: components
    };
    if (batchInsert) {
      this.thangsBatch.push(thang);
    }
    this.populateFoldersForThang(thang);
    return this.thangsTreema.set(this.pathForThang(thang), thang);
  };

  ThangsTabView.prototype.editThang = function(e) {
    var thangData;
    if (e.target) {
      thangData = $(e.target).data('thang-data');
    } else {
      thangData = this.getThangByID(e.thangID);
    }
    if (!thangData) {
      return;
    }
    this.editThangView = new LevelThangEditView({
      thangData: thangData,
      level: this.level,
      world: this.world,
      supermodel: this.supermodel,
      oldPath: this.pathForThang(thangData)
    });
    this.insertSubView(this.editThangView);
    this.$el.find('>').hide();
    this.editThangView.$el.show();
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  ThangsTabView.prototype.onLevelThangDoneEditing = function(e) {
    this.removeSubView(this.editThangView);
    this.editThangView = null;
    this.updateEditedThang(e.thangData, e.oldPath);
    return this.$el.find('>').show();
  };

  ThangsTabView.prototype.onLevelThangEdited = function(e) {
    return this.updateEditedThang(e.thangData, e.oldPath);
  };

  ThangsTabView.prototype.updateEditedThang = function(newThang, oldPath) {
    this.hush = true;
    this.thangsTreema["delete"](oldPath);
    this.populateFoldersForThang(newThang);
    this.thangsTreema.set(this.pathForThang(newThang), newThang);
    this.hush = false;
    return this.onThangsChanged();
  };

  ThangsTabView.prototype.preventDefaultContextMenu = function(e) {
    if (!$(e.target).closest('#canvas-wrapper').length) {
      return;
    }
    return e.preventDefault();
  };

  ThangsTabView.prototype.onSpriteContextMenu = function(e) {
    var clientX, clientY, ref;
    ref = e.originalEvent.nativeEvent, clientX = ref.clientX, clientY = ref.clientY;
    if (this.addThangType) {
      $('#duplicate a').html($.i18n.t('editor.stop_duplicate'));
    } else {
      $('#duplicate a').html($.i18n.t('editor.duplicate'));
    }
    $('#contextmenu').css({
      position: 'fixed',
      left: clientX,
      top: clientY
    });
    return $('#contextmenu').show();
  };

  ThangsTabView.prototype.onDeleteClicked = function(e) {
    $('#contextmenu').hide();
    return this.deleteSelectedExtantThang(e);
  };

  ThangsTabView.prototype.onDuplicateClicked = function(e) {
    var selected;
    $('#contextmenu').hide();
    selected = _.last(this.gameUIState.get('selected'));
    return this.selectAddThangType(selected.thang.spriteName, selected.thang);
  };

  ThangsTabView.prototype.onClickRotationButton = function(e) {
    var rotation;
    $('#contextmenu').hide();
    rotation = parseFloat($(e.target).closest('button').data('rotation'));
    return this.rotateSelectedThangTo(rotation * Math.PI);
  };

  ThangsTabView.prototype.modifySelectedThangComponentConfig = function(thang, componentOriginal, modificationFunction) {
    var component, lank, ref, thangData;
    if (!thang) {
      return;
    }
    this.hush = true;
    thangData = this.getThangByID(thang.id);
    thangData = $.extend(true, {}, thangData);
    component = _.find(thangData.components, {
      original: componentOriginal
    });
    if (!component) {
      component = {
        original: componentOriginal,
        config: {},
        majorVersion: 0
      };
      thangData.components.push(component);
    }
    modificationFunction(component);
    this.thangsTreema.set(this.pathForThang(thangData), thangData);
    this.hush = false;
    this.onThangsChanged(true);
    thang.stateChanged = true;
    lank = this.surface.lankBoss.lanks[thang.id];
    lank.update(true);
    if ((ref = lank.marks.debug) != null) {
      ref.destroy();
    }
    delete lank.marks.debug;
    return lank.setDebug(true);
  };

  ThangsTabView.prototype.rotateSelectedThangTo = function(radians) {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.PhysicalID, (function(_this) {
        return function(component) {
          component.config.rotation = radians;
          return selectedThang.rotation = component.config.rotation;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.rotateSelectedThangBy = function(radians) {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.PhysicalID, (function(_this) {
        return function(component) {
          var ref1;
          component.config.rotation = (((ref1 = component.config.rotation) != null ? ref1 : 0) + radians) % (2 * Math.PI);
          return selectedThang.rotation = component.config.rotation;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.moveSelectedThangBy = function(xDir, yDir) {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.PhysicalID, (function(_this) {
        return function(component) {
          component.config.pos.x += 0.5 * xDir;
          component.config.pos.y += 0.5 * yDir;
          selectedThang.pos.x = component.config.pos.x;
          return selectedThang.pos.y = component.config.pos.y;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.resizeSelectedThangBy = function(xDir, yDir) {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.PhysicalID, (function(_this) {
        return function(component) {
          var ref1, ref2;
          component.config.width = ((ref1 = component.config.width) != null ? ref1 : 4) + 0.5 * xDir;
          component.config.height = ((ref2 = component.config.height) != null ? ref2 : 4) + 0.5 * yDir;
          selectedThang.width = component.config.width;
          return selectedThang.height = component.config.height;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.toggleSelectedThangCollision = function() {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.CollidesID, (function(_this) {
        return function(component) {
          if (component.config == null) {
            component.config = {};
          }
          component.config.collisionCategory = component.config.collisionCategory === 'none' ? 'ground' : 'none';
          return selectedThang.collisionCategory = component.config.collisionCategory;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.toggleThangsContainer = function(e) {
    return $('#all-thangs').toggleClass('hide');
  };

  ThangsTabView.prototype.toggleThangsPalette = function(e) {
    return $('#add-thangs-view').toggleClass('hide');
  };

  return ThangsTabView;

})(CocoView);

ThangsFolderNode = (function(superClass) {
  extend(ThangsFolderNode, superClass);

  function ThangsFolderNode() {
    return ThangsFolderNode.__super__.constructor.apply(this, arguments);
  }

  ThangsFolderNode.prototype.valueClass = 'treema-thangs-folder';

  ThangsFolderNode.prototype.nodeDescription = 'Thang';

  ThangsFolderNode.nameToThangTypeMap = null;

  ThangsFolderNode.prototype.getTrackedActionDescription = function(trackedAction) {
    var path, trackedActionDescription;
    trackedActionDescription = ThangsFolderNode.__super__.getTrackedActionDescription.call(this, trackedAction);
    if (trackedActionDescription === 'Edit ' + this.nodeDescription) {
      path = trackedAction.path.split('/');
      if (path[path.length - 1] === 'pos') {
        trackedActionDescription = 'Move Thang';
      }
    }
    return trackedActionDescription;
  };

  ThangsFolderNode.prototype.buildValueForDisplay = function(valEl, data) {
    var el;
    el = $("<span><strong>" + this.keyForParent + "</strong> <span class='text-muted'>(" + (this.countThangs(data)) + ")</span></span>");
    return valEl.append(el);
  };

  ThangsFolderNode.prototype.countThangs = function(data) {
    var key, num, value;
    if (data.thangType && (data.id != null)) {
      return 0;
    }
    num = 0;
    for (key in data) {
      value = data[key];
      if (value.thangType && (value.id != null)) {
        num += 1;
      } else {
        num += this.countThangs(value);
      }
    }
    return num;
  };

  ThangsFolderNode.prototype.nameToThangType = function(name) {
    var i, len, map, thangType, thangTypes;
    if (!ThangsFolderNode.nameToThangTypeMap) {
      thangTypes = this.settings.supermodel.getModels(ThangType);
      map = {};
      for (i = 0, len = thangTypes.length; i < len; i++) {
        thangType = thangTypes[i];
        map[thangType.get('name')] = thangType;
      }
      ThangsFolderNode.nameToThangTypeMap = map;
    }
    return ThangsFolderNode.nameToThangTypeMap[name];
  };

  return ThangsFolderNode;

})(TreemaNode.nodeMap.object);

ThangNode = (function(superClass) {
  extend(ThangNode, superClass);

  function ThangNode() {
    return ThangNode.__super__.constructor.apply(this, arguments);
  }

  ThangNode.prototype.valueClass = 'treema-thang';

  ThangNode.prototype.collection = false;

  ThangNode.thangNameMap = {};

  ThangNode.thangKindMap = {};

  ThangNode.prototype.buildValueForDisplay = function(valEl, data) {
    var pos, ref, s, thangType;
    pos = (ref = _.find(data.components, function(c) {
      var ref1;
      return ((ref1 = c.config) != null ? ref1.pos : void 0) != null;
    })) != null ? ref.config.pos : void 0;
    s = data.id;
    if (pos) {
      s += " (" + (Math.round(pos.x)) + ", " + (Math.round(pos.y)) + ")";
    } else {
      s += ' (non-physical)';
    }
    this.buildValueForDisplaySimply(valEl, s);
    thangType = this.settings.supermodel.getModelByOriginal(ThangType, data.thangType);
    if (thangType) {
      return valEl.prepend($("<img class='img-circle' src='" + (thangType.getPortraitURL()) + "' />"));
    }
  };

  ThangNode.prototype.onEnterPressed = function() {
    return Backbone.Mediator.publish('editor:edit-level-thang', {
      thangID: this.getData().id
    });
  };

  return ThangNode;

})(TreemaObjectNode);
});

;require.register("views/editor/level/treema_nodes", function(exports, require, module) {
var AccelerationNode, CocoCollection, ItemThangTypeNode, KilogramsNode, LevelComponent, MetersNode, MillisecondsNode, RadiansNode, SecondsNode, SpeedNode, SuperteamNode, TeamNode, ThangNode, ThangType, ThangTypeNode, WIDTH, WorldBoundsNode, WorldPointNode, WorldRegionNode, WorldSelectModal, WorldViewportNode, makeButton, shorten,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

WorldSelectModal = require('./modals/WorldSelectModal');

ThangType = require('/models/ThangType');

LevelComponent = require('models/LevelComponent');

CocoCollection = require('collections/CocoCollection');

require('vendor/treema');

makeButton = function() {
  return $('<a class="btn btn-primary btn-xs treema-map-button"><span class="glyphicon glyphicon-screenshot"></span></a>');
};

shorten = function(f) {
  return parseFloat(f.toFixed(1));
};

WIDTH = 924;

module.exports.WorldPointNode = WorldPointNode = (function(superClass) {
  extend(WorldPointNode, superClass);

  function WorldPointNode() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.callback = bind(this.callback, this);
    WorldPointNode.__super__.constructor.apply(this, args);
    if (this.settings.world == null) {
      console.error('Point Treema node needs a World included in the settings.');
    }
    if (this.settings.view == null) {
      console.error('Point Treema node needs a RootView included in the settings.');
    }
  }

  WorldPointNode.prototype.buildValueForDisplay = function(valEl, data) {
    WorldPointNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldPointNode.prototype.buildValueForEditing = function(valEl, data) {
    WorldPointNode.__super__.buildValueForEditing.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldPointNode.prototype.onClick = function(e) {
    var btn;
    btn = $(e.target).closest('.treema-map-button');
    if (btn.length) {
      return this.openMap();
    } else {
      return WorldPointNode.__super__.onClick.apply(this, arguments);
    }
  };

  WorldPointNode.prototype.openMap = function() {
    var modal;
    modal = new WorldSelectModal({
      world: this.settings.world,
      dataType: 'point',
      "default": this.getData(),
      supermodel: this.settings.supermodel
    });
    modal.callback = this.callback;
    return this.settings.view.openModalView(modal);
  };

  WorldPointNode.prototype.callback = function(e) {
    if ((e != null ? e.point : void 0) == null) {
      return;
    }
    this.data.x = shorten(e.point.x);
    this.data.y = shorten(e.point.y);
    return this.refreshDisplay();
  };

  return WorldPointNode;

})(TreemaNode.nodeMap.point2d);

WorldRegionNode = (function(superClass) {
  extend(WorldRegionNode, superClass);

  function WorldRegionNode() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.callback = bind(this.callback, this);
    WorldRegionNode.__super__.constructor.apply(this, args);
    if (this.settings.world == null) {
      console.error('Region Treema node needs a World included in the settings.');
    }
    if (this.settings.view == null) {
      console.error('Region Treema node needs a RootView included in the settings.');
    }
  }

  WorldRegionNode.prototype.buildValueForDisplay = function(valEl, data) {
    WorldRegionNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldRegionNode.prototype.buildValueForEditing = function(valEl, data) {
    WorldRegionNode.__super__.buildValueForEditing.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldRegionNode.prototype.onClick = function(e) {
    var btn;
    btn = $(e.target).closest('.treema-map-button');
    if (btn.length) {
      return this.openMap();
    } else {
      return WorldRegionNode.__super__.onClick.apply(this, arguments);
    }
  };

  WorldRegionNode.prototype.openMap = function() {
    var modal;
    modal = new WorldSelectModal({
      world: this.settings.world,
      dataType: 'region',
      "default": this.createWorldBounds(),
      supermodel: this.settings.supermodel
    });
    modal.callback = this.callback;
    return this.settings.view.openModalView(modal);
  };

  WorldRegionNode.prototype.callback = function(e) {
    var x, y;
    x = Math.min(e.points[0].x, e.points[1].x);
    y = Math.min(e.points[0].y, e.points[1].y);
    this.data.pos = {
      x: x,
      y: y,
      z: 0
    };
    this.data.width = Math.abs(e.points[0].x - e.points[1].x);
    this.data.height = Math.min(e.points[0].y - e.points[1].y);
    return this.refreshDisplay();
  };

  WorldRegionNode.prototype.createWorldBounds = function() {};

  return WorldRegionNode;

})(TreemaNode.nodeMap.object);

module.exports.WorldViewportNode = WorldViewportNode = (function(superClass) {
  extend(WorldViewportNode, superClass);

  function WorldViewportNode() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.callback = bind(this.callback, this);
    WorldViewportNode.__super__.constructor.apply(this, args);
    if (this.settings.world == null) {
      console.error('Viewport Treema node needs a World included in the settings.');
    }
    if (this.settings.view == null) {
      console.error('Viewport Treema node needs a RootView included in the settings.');
    }
  }

  WorldViewportNode.prototype.buildValueForDisplay = function(valEl, data) {
    WorldViewportNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldViewportNode.prototype.buildValueForEditing = function(valEl, data) {
    WorldViewportNode.__super__.buildValueForEditing.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldViewportNode.prototype.onClick = function(e) {
    var btn;
    btn = $(e.target).closest('.treema-map-button');
    if (btn.length) {
      return this.openMap();
    } else {
      return WorldViewportNode.__super__.onClick.apply(this, arguments);
    }
  };

  WorldViewportNode.prototype.openMap = function() {
    var data, modal, options, ref;
    options = {
      world: this.settings.world,
      dataType: 'ratio-region'
    };
    data = this.getData();
    if ((data != null ? (ref = data.target) != null ? ref.x : void 0 : void 0) != null) {
      options.defaultFromZoom = data;
    }
    options.supermodel = this.settings.supermodel;
    modal = new WorldSelectModal(options);
    modal.callback = this.callback;
    return this.settings.view.openModalView(modal);
  };

  WorldViewportNode.prototype.callback = function(e) {
    var bounds, target;
    if (!e) {
      return;
    }
    target = {
      x: shorten((e.points[0].x + e.points[1].x) / 2),
      y: shorten((e.points[0].y + e.points[1].y) / 2)
    };
    this.set('target', target);
    bounds = e.camera.normalizeBounds(e.points);
    this.set('zoom', shorten(WIDTH / bounds.width));
    return this.refreshDisplay();
  };

  return WorldViewportNode;

})(TreemaNode.nodeMap.object);

module.exports.WorldBoundsNode = WorldBoundsNode = (function(superClass) {
  extend(WorldBoundsNode, superClass);

  WorldBoundsNode.prototype.dataType = 'region';

  function WorldBoundsNode() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.callback = bind(this.callback, this);
    WorldBoundsNode.__super__.constructor.apply(this, args);
    if (this.settings.world == null) {
      console.error('Bounds Treema node needs a World included in the settings.');
    }
    if (this.settings.view == null) {
      console.error('Bounds Treema node needs a RootView included in the settings.');
    }
  }

  WorldBoundsNode.prototype.buildValueForDisplay = function(valEl, data) {
    WorldBoundsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldBoundsNode.prototype.buildValueForEditing = function(valEl, data) {
    WorldBoundsNode.__super__.buildValueForEditing.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldBoundsNode.prototype.onClick = function(e) {
    var btn;
    btn = $(e.target).closest('.treema-map-button');
    if (btn.length) {
      return this.openMap();
    } else {
      return WorldBoundsNode.__super__.onClick.apply(this, arguments);
    }
  };

  WorldBoundsNode.prototype.openMap = function() {
    var bounds, modal;
    bounds = this.getData() || [
      {
        x: 0,
        y: 0
      }, {
        x: 100,
        y: 80
      }
    ];
    modal = new WorldSelectModal({
      world: this.settings.world,
      dataType: 'region',
      "default": bounds,
      supermodel: this.settings.supermodel
    });
    modal.callback = this.callback;
    return this.settings.view.openModalView(modal);
  };

  WorldBoundsNode.prototype.callback = function(e) {
    if (!e) {
      return;
    }
    this.set('/0', {
      x: shorten(e.points[0].x),
      y: shorten(e.points[0].y)
    });
    return this.set('/1', {
      x: shorten(e.points[1].x),
      y: shorten(e.points[1].y)
    });
  };

  return WorldBoundsNode;

})(TreemaNode.nodeMap.array);

module.exports.ThangNode = ThangNode = (function(superClass) {
  extend(ThangNode, superClass);

  function ThangNode() {
    return ThangNode.__super__.constructor.apply(this, arguments);
  }

  ThangNode.prototype.buildValueForDisplay = function(valEl, data) {
    ThangNode.__super__.buildValueForDisplay.call(this, valEl, data);
    valEl.find('input').autocomplete({
      source: this.settings.thangIDs,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    return valEl;
  };

  return ThangNode;

})(TreemaNode.nodeMap.string);

module.exports.TeamNode = TeamNode = (function(superClass) {
  extend(TeamNode, superClass);

  function TeamNode() {
    return TeamNode.__super__.constructor.apply(this, arguments);
  }

  TeamNode.prototype.buildValueForDisplay = function(valEl, data) {
    TeamNode.__super__.buildValueForDisplay.call(this, valEl, data);
    valEl.find('input').autocomplete({
      source: this.settings.teams,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    return valEl;
  };

  return TeamNode;

})(TreemaNode.nodeMap.string);

module.exports.SuperteamNode = SuperteamNode = (function(superClass) {
  extend(SuperteamNode, superClass);

  function SuperteamNode() {
    return SuperteamNode.__super__.constructor.apply(this, arguments);
  }

  SuperteamNode.prototype.buildValueForEditing = function(valEl, data) {
    SuperteamNode.__super__.buildValueForEditing.call(this, valEl, data);
    valEl.find('input').autocomplete({
      source: this.settings.superteams,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    return valEl;
  };

  return SuperteamNode;

})(TreemaNode.nodeMap.string);

module.exports.RadiansNode = RadiansNode = (function(superClass) {
  extend(RadiansNode, superClass);

  function RadiansNode() {
    return RadiansNode.__super__.constructor.apply(this, arguments);
  }

  RadiansNode.prototype.buildValueForDisplay = function(valEl, data) {
    var deg;
    RadiansNode.__super__.buildValueForDisplay.call(this, valEl, data);
    deg = data / Math.PI * 180;
    return valEl.text(valEl.text() + ("rad (" + (deg.toFixed(0)) + "˚)"));
  };

  return RadiansNode;

})(TreemaNode.nodeMap.number);

module.exports.MetersNode = MetersNode = (function(superClass) {
  extend(MetersNode, superClass);

  function MetersNode() {
    return MetersNode.__super__.constructor.apply(this, arguments);
  }

  MetersNode.prototype.buildValueForDisplay = function(valEl, data) {
    MetersNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'm');
  };

  return MetersNode;

})(TreemaNode.nodeMap.number);

module.exports.KilogramsNode = KilogramsNode = (function(superClass) {
  extend(KilogramsNode, superClass);

  function KilogramsNode() {
    return KilogramsNode.__super__.constructor.apply(this, arguments);
  }

  KilogramsNode.prototype.buildValueForDisplay = function(valEl, data) {
    KilogramsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'kg');
  };

  return KilogramsNode;

})(TreemaNode.nodeMap.number);

module.exports.SecondsNode = SecondsNode = (function(superClass) {
  extend(SecondsNode, superClass);

  function SecondsNode() {
    return SecondsNode.__super__.constructor.apply(this, arguments);
  }

  SecondsNode.prototype.buildValueForDisplay = function(valEl, data) {
    SecondsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 's');
  };

  return SecondsNode;

})(TreemaNode.nodeMap.number);

module.exports.MillisecondsNode = MillisecondsNode = (function(superClass) {
  extend(MillisecondsNode, superClass);

  function MillisecondsNode() {
    return MillisecondsNode.__super__.constructor.apply(this, arguments);
  }

  MillisecondsNode.prototype.buildValueForDisplay = function(valEl, data) {
    MillisecondsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'ms');
  };

  return MillisecondsNode;

})(TreemaNode.nodeMap.number);

module.exports.SpeedNode = SpeedNode = (function(superClass) {
  extend(SpeedNode, superClass);

  function SpeedNode() {
    return SpeedNode.__super__.constructor.apply(this, arguments);
  }

  SpeedNode.prototype.buildValueForDisplay = function(valEl, data) {
    SpeedNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'm/s');
  };

  return SpeedNode;

})(TreemaNode.nodeMap.number);

module.exports.AccelerationNode = AccelerationNode = (function(superClass) {
  extend(AccelerationNode, superClass);

  function AccelerationNode() {
    return AccelerationNode.__super__.constructor.apply(this, arguments);
  }

  AccelerationNode.prototype.buildValueForDisplay = function(valEl, data) {
    AccelerationNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'm/s^2');
  };

  return AccelerationNode;

})(TreemaNode.nodeMap.number);

module.exports.ThangTypeNode = ThangTypeNode = (function(superClass) {
  extend(ThangTypeNode, superClass);

  ThangTypeNode.prototype.valueClass = 'treema-thang-type';

  ThangTypeNode.thangTypes = null;

  ThangTypeNode.thangTypesCollection = null;

  function ThangTypeNode() {
    var args, data;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ThangTypeNode.__super__.constructor.apply(this, args);
    data = this.getData();
    this.thangType = _.find(this.settings.supermodel.getModels(ThangType), (function(_this) {
      return function(m) {
        if (data) {
          return m.get('original') === data;
        }
      };
    })(this));
  }

  ThangTypeNode.prototype.buildValueForDisplay = function(valEl) {
    var ref;
    return this.buildValueForDisplaySimply(valEl, ((ref = this.thangType) != null ? ref.get('name') : void 0) || 'None');
  };

  ThangTypeNode.prototype.buildValueForEditing = function(valEl, data) {
    var input, m, ref, thangTypeNames;
    ThangTypeNode.__super__.buildValueForEditing.call(this, valEl, data);
    thangTypeNames = (function() {
      var i, len, ref, results;
      ref = this.settings.supermodel.getModels(ThangType);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        results.push(m.get('name'));
      }
      return results;
    }).call(this);
    input = valEl.find('input').autocomplete({
      source: thangTypeNames,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    input.val(((ref = this.thangType) != null ? ref.get('name') : void 0) || 'None');
    return valEl;
  };

  ThangTypeNode.prototype.saveChanges = function() {
    var thangTypeName;
    thangTypeName = this.$el.find('input').val();
    this.thangType = _.find(this.settings.supermodel.getModels(ThangType), function(m) {
      return m.get('name') === thangTypeName;
    });
    if (this.thangType) {
      return this.data = this.thangType.get('original');
    } else {
      return this.data = null;
    }
  };

  return ThangTypeNode;

})(TreemaNode.nodeMap.string);

module.exports.ThangTypeNode = ThangTypeNode = ThangTypeNode = (function(superClass) {
  extend(ThangTypeNode, superClass);

  ThangTypeNode.prototype.valueClass = 'treema-thang-type';

  ThangTypeNode.thangTypesCollection = null;

  ThangTypeNode.thangTypes = null;

  function ThangTypeNode() {
    var f;
    ThangTypeNode.__super__.constructor.apply(this, arguments);
    this.getThangTypes();
    if (!ThangTypeNode.thangTypesCollection.loaded) {
      f = function() {
        if (!this.isEditing()) {
          this.refreshDisplay();
        }
        return this.getThangTypes();
      };
      ThangTypeNode.thangTypesCollection.once('sync', f, this);
    }
  }

  ThangTypeNode.prototype.buildValueForDisplay = function(valEl, data) {
    this.buildValueForDisplaySimply(valEl, this.getCurrentThangType() || '');
    return valEl;
  };

  ThangTypeNode.prototype.buildValueForEditing = function(valEl, data) {
    var input, source;
    ThangTypeNode.__super__.buildValueForEditing.call(this, valEl, data);
    input = valEl.find('input');
    source = (function(_this) {
      return function(req, res) {
        var term, thangType;
        term = req.term;
        term = term.toLowerCase();
        if (!_this.constructor.thangTypes) {
          return res([]);
        }
        return res((function() {
          var i, len, ref, results;
          ref = this.constructor.thangTypes;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            thangType = ref[i];
            if (_.string.contains(thangType.name.toLowerCase(), term)) {
              results.push(thangType.name);
            }
          }
          return results;
        }).call(_this));
      };
    })(this);
    input.autocomplete({
      source: source,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    input.val(this.getCurrentThangType() || '');
    return valEl;
  };

  ThangTypeNode.prototype.filterThangType = function(thangType) {
    return true;
  };

  ThangTypeNode.prototype.getCurrentThangType = function() {
    var original, thangType;
    if (!this.constructor.thangTypes) {
      return null;
    }
    if (!(original = this.getData())) {
      return null;
    }
    thangType = _.find(this.constructor.thangTypes, {
      original: original
    });
    return (thangType != null ? thangType.name : void 0) || '...';
  };

  ThangTypeNode.prototype.getThangTypes = function() {
    var res;
    if (ThangTypeNode.thangTypesCollection) {
      if (!this.constructor.thangTypes) {
        this.processThangTypes(ThangTypeNode.thangTypesCollection);
      }
      return;
    }
    ThangTypeNode.thangTypesCollection = new CocoCollection([], {
      url: '/db/thang.type',
      project: ['name', 'components', 'original'],
      model: ThangType
    });
    res = ThangTypeNode.thangTypesCollection.fetch();
    return ThangTypeNode.thangTypesCollection.once('sync', (function(_this) {
      return function() {
        return _this.processThangTypes(ThangTypeNode.thangTypesCollection);
      };
    })(this));
  };

  ThangTypeNode.prototype.processThangTypes = function(thangTypeCollection) {
    var i, len, ref, results, thangType;
    this.constructor.thangTypes = [];
    ref = thangTypeCollection.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      thangType = ref[i];
      results.push(this.processThangType(thangType));
    }
    return results;
  };

  ThangTypeNode.prototype.processThangType = function(thangType) {
    return this.constructor.thangTypes.push({
      name: thangType.get('name'),
      original: thangType.get('original')
    });
  };

  ThangTypeNode.prototype.saveChanges = function() {
    var thangType, thangTypeName;
    thangTypeName = this.$el.find('input').val();
    thangType = _.find(this.constructor.thangTypes, {
      name: thangTypeName
    });
    if (!thangType) {
      return this.remove();
    }
    return this.data = thangType.original;
  };

  return ThangTypeNode;

})(TreemaNode.nodeMap.string);

module.exports.ItemThangTypeNode = ItemThangTypeNode = ItemThangTypeNode = (function(superClass) {
  extend(ItemThangTypeNode, superClass);

  function ItemThangTypeNode() {
    return ItemThangTypeNode.__super__.constructor.apply(this, arguments);
  }

  ItemThangTypeNode.prototype.valueClass = 'treema-item-thang-type';

  ItemThangTypeNode.prototype.filterThangType = function(thangType) {
    var ref;
    return ref = this.keyForParent, indexOf.call(thangType.slots, ref) >= 0;
  };

  ItemThangTypeNode.prototype.processThangType = function(thangType) {
    var itemComponent, ref, ref1;
    if (!(itemComponent = _.find(thangType.get('components'), {
      original: LevelComponent.ItemID
    }))) {
      return;
    }
    return this.constructor.thangTypes.push({
      name: thangType.get('name'),
      original: thangType.get('original'),
      slots: (ref = (ref1 = itemComponent.config) != null ? ref1.slots : void 0) != null ? ref : ['right-hand']
    });
  };

  return ItemThangTypeNode;

})(ThangTypeNode);
});

;require.register("views/editor/modal/NewModelModal", function(exports, require, module) {
var ModalView, NewModelModal, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/modal/new-model-modal');

forms = require('core/forms');

module.exports = NewModelModal = (function(superClass) {
  extend(NewModelModal, superClass);

  NewModelModal.prototype.id = 'new-model-modal';

  NewModelModal.prototype.template = template;

  NewModelModal.prototype.plain = false;

  NewModelModal.prototype.events = {
    'click button.new-model-submit': 'onModelSubmitted',
    'submit form': 'onModelSubmitted'
  };

  function NewModelModal(options) {
    NewModelModal.__super__.constructor.call(this, options);
    this.modelClass = options.model;
    this.modelLabel = options.modelLabel;
    this.newModelTitle = "editor.new_" + (_.string.slugify(this.modelLabel)) + "_title";
    this.properties = options.properties;
  }

  NewModelModal.prototype.makeNewModel = function() {
    var key, model, name, prop, ref;
    model = new this.modelClass;
    name = this.$el.find('#name').val();
    model.set('name', name);
    if (this.modelClass.name === 'Level') {
      model.set('tasks', this.modelClass.schema["default"].tasks);
    }
    if (model.schema().properties.permissions) {
      model.set('permissions', [
        {
          access: 'owner',
          target: me.id
        }
      ]);
    }
    if (this.properties != null) {
      ref = this.properties;
      for (key in ref) {
        prop = ref[key];
        model.set(key, prop);
      }
    }
    return model;
  };

  NewModelModal.prototype.onModelSubmitted = function(e) {
    var model, res;
    e.preventDefault();
    model = this.makeNewModel();
    res = model.save(null, {
      type: 'POST'
    });
    if (!res) {
      return;
    }
    forms.clearFormAlerts(this.$el);
    this.showLoading(this.$el.find('.modal-body'));
    res.error((function(_this) {
      return function() {
        _this.hideLoading();
        return forms.applyErrorsToForm(_this.$el, JSON.parse(res.responseText));
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        _this.$el.modal('hide');
        return _this.trigger('model-created', model);
      };
    })(this));
  };

  NewModelModal.prototype.afterInsert = function() {
    NewModelModal.__super__.afterInsert.call(this);
    return _.delay(((function(_this) {
      return function() {
        var ref;
        return (ref = _this.$el) != null ? ref.find('#name').focus() : void 0;
      };
    })(this)), 500);
  };

  return NewModelModal;

})(ModalView);
});

;require.register("views/editor/modal/SaveVersionModal", function(exports, require, module) {
var DeltaView, ModalView, Patch, SaveVersionModal, forms, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/modal/save-version-modal');

DeltaView = require('views/editor/DeltaView');

Patch = require('models/Patch');

forms = require('core/forms');

module.exports = SaveVersionModal = (function(superClass) {
  extend(SaveVersionModal, superClass);

  SaveVersionModal.prototype.id = 'save-version-modal';

  SaveVersionModal.prototype.template = template;

  SaveVersionModal.prototype.plain = true;

  SaveVersionModal.prototype.modalWidthPercent = 60;

  SaveVersionModal.prototype.events = {
    'click #save-version-button': 'saveChanges',
    'click #cla-link': 'onClickCLALink',
    'click #agreement-button': 'onAgreedToCLA',
    'click #submit-patch-button': 'submitPatch',
    'submit form': 'onSubmitForm'
  };

  function SaveVersionModal(options) {
    this.onAgreeFailed = bind(this.onAgreeFailed, this);
    this.onAgreeSucceeded = bind(this.onAgreeSucceeded, this);
    SaveVersionModal.__super__.constructor.call(this, options);
    this.model = options.model || options.level;
    this.isPatch = !this.model.hasWriteAccess();
    this.hasChanges = this.model.hasLocalChanges();
  }

  SaveVersionModal.prototype.afterRender = function(insertDeltaView) {
    var changeEl, deltaView, e, error;
    if (insertDeltaView == null) {
      insertDeltaView = true;
    }
    SaveVersionModal.__super__.afterRender.call(this);
    this.$el.find(me.get('signedCLA') ? '#accept-cla-wrapper' : '#save-version-button').hide();
    changeEl = this.$el.find('.changes-stub');
    if (insertDeltaView) {
      try {
        deltaView = new DeltaView({
          model: this.model
        });
        this.insertSubView(deltaView, changeEl);
      } catch (error) {
        e = error;
        console.error('Couldn\'t create delta view:', e, e.stack);
      }
    }
    return this.$el.find('.commit-message input').attr('placeholder', $.i18n.t('general.commit_msg'));
  };

  SaveVersionModal.prototype.onSubmitForm = function(e) {
    e.preventDefault();
    if (this.isPatch) {
      return this.submitPatch();
    } else {
      return this.saveChanges();
    }
  };

  SaveVersionModal.prototype.saveChanges = function() {
    return this.trigger('save-new-version', {
      major: this.$el.find('#major-version').prop('checked'),
      commitMessage: this.$el.find('#commit-message').val()
    });
  };

  SaveVersionModal.prototype.submitPatch = function() {
    var errors, patch, res;
    this.savingPatchError = false;
    forms.clearFormAlerts(this.$el);
    patch = new Patch();
    patch.set('delta', this.model.getDelta());
    patch.set('commitMessage', this.$el.find('#commit-message').val());
    patch.set('target', {
      'collection': _.string.underscored(this.model.constructor.className),
      'id': this.model.id
    });
    errors = patch.validate();
    if (errors) {
      forms.applyErrorsToForm(this.$el, errors);
    }
    res = patch.save();
    if (!res) {
      return;
    }
    this.enableModalInProgress(this.$el);
    res.error((function(_this) {
      return function(jqxhr) {
        var ref;
        _this.disableModalInProgress(_this.$el);
        _this.savingPatchError = ((ref = jqxhr.responseJSON) != null ? ref.message : void 0) || 'Unknown error.';
        return _this.renderSelectors('.save-error-area');
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        return _this.hide();
      };
    })(this));
  };

  SaveVersionModal.prototype.onClickCLALink = function() {
    return window.open('/cla', 'cla', 'height=800,width=900');
  };

  SaveVersionModal.prototype.onAgreedToCLA = function() {
    this.$el.find('#agreement-button').text('Saving').prop('disabled', true);
    return $.ajax({
      url: '/db/user/me/agreeToCLA',
      method: 'POST',
      success: this.onAgreeSucceeded,
      error: this.onAgreeFailed
    });
  };

  SaveVersionModal.prototype.onAgreeSucceeded = function() {
    this.$el.find('#agreement-button').text('Thanks!');
    return this.$el.find('#save-version-button').show();
  };

  SaveVersionModal.prototype.onAgreeFailed = function() {
    return this.$el.find('#agreement-button').text('Failed').prop('disabled', false);
  };

  return SaveVersionModal;

})(ModalView);
});

;require.register("views/editor/modal/VersionsModal", function(exports, require, module) {
var CocoCollection, DeltaView, ModalView, PatchModal, VersionsModal, VersionsViewCollection, deltasLib, nameLoader, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/modal/versions-modal');

DeltaView = require('views/editor/DeltaView');

PatchModal = require('views/editor/PatchModal');

nameLoader = require('core/NameLoader');

CocoCollection = require('collections/CocoCollection');

deltasLib = require('core/deltas');

VersionsViewCollection = (function(superClass) {
  extend(VersionsViewCollection, superClass);

  function VersionsViewCollection() {
    return VersionsViewCollection.__super__.constructor.apply(this, arguments);
  }

  VersionsViewCollection.prototype.url = '';

  VersionsViewCollection.prototype.model = null;

  VersionsViewCollection.prototype.initialize = function(url, levelID, model) {
    this.url = url;
    this.levelID = levelID;
    this.model = model;
    VersionsViewCollection.__super__.initialize.call(this);
    return this.url = this.url + this.levelID + '/versions';
  };

  return VersionsViewCollection;

})(CocoCollection);

module.exports = VersionsModal = (function(superClass) {
  extend(VersionsModal, superClass);

  VersionsModal.prototype.template = template;

  VersionsModal.prototype.plain = true;

  VersionsModal.prototype.modalWidthPercent = 80;

  VersionsModal.prototype.id = '';

  VersionsModal.prototype.url = '';

  VersionsModal.prototype.page = '';

  VersionsModal.prototype.events = {
    'change input.select': 'onSelectionChanged'
  };

  function VersionsModal(options, ID, model) {
    this.ID = ID;
    this.model = model;
    VersionsModal.__super__.constructor.call(this, options);
    this.original = new this.model({
      _id: this.ID
    });
    this.original = this.supermodel.loadModel(this.original).model;
    this.listenToOnce(this.original, 'sync', this.onViewSync);
  }

  VersionsModal.prototype.onViewSync = function() {
    this.versions = new VersionsViewCollection(this.url, this.original.attributes.original, this.model);
    this.versions = this.supermodel.loadCollection(this.versions, 'versions').model;
    return this.listenTo(this.versions, 'sync', this.onVersionsFetched);
  };

  VersionsModal.prototype.onVersionsFetched = function() {
    var ids, jqxhrOptions, p;
    ids = (function() {
      var i, len, ref, results;
      ref = this.versions.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        results.push(p.get('creator'));
      }
      return results;
    }).call(this);
    jqxhrOptions = nameLoader.loadNames(ids);
    if (jqxhrOptions) {
      return this.supermodel.addRequestResource('user_names', jqxhrOptions).load();
    }
  };

  VersionsModal.prototype.onSelectionChanged = function() {
    var deltaEl, earlierVersion, laterVersion, rows;
    rows = this.$el.find('input.select:checked');
    deltaEl = this.$el.find('.delta-view');
    if (this.deltaView) {
      this.removeSubView(this.deltaView);
    }
    this.deltaView = null;
    if (rows.length !== 2) {
      return;
    }
    laterVersion = new this.model({
      _id: $(rows[0]).val()
    });
    earlierVersion = new this.model({
      _id: $(rows[1]).val()
    });
    this.deltaView = new DeltaView({
      model: earlierVersion,
      comparisonModel: laterVersion,
      skipPaths: deltasLib.DOC_SKIP_PATHS,
      loadModels: true
    });
    return this.insertSubView(this.deltaView, deltaEl);
  };

  VersionsModal.prototype.getRenderData = function(context) {
    var i, len, m, ref, version;
    if (context == null) {
      context = {};
    }
    context = VersionsModal.__super__.getRenderData.call(this, context);
    context.page = this.page;
    if (this.versions) {
      context.dataList = (function() {
        var i, len, ref, results;
        ref = this.versions.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          m = ref[i];
          results.push(m.attributes);
        }
        return results;
      }).call(this);
      ref = context.dataList;
      for (i = 0, len = ref.length; i < len; i++) {
        version = ref[i];
        version.creator = nameLoader.getName(version.creator);
      }
    }
    return context;
  };

  return VersionsModal;

})(ModalView);
});

;require.register("views/editor/poll/PollEditView", function(exports, require, module) {
var ConfirmModal, PatchesView, Poll, PollEditView, PollModal, RootView, UserPollsRecord, app, errors, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/editor/poll/poll-edit-view');

Poll = require('models/Poll');

UserPollsRecord = require('models/UserPollsRecord');

PollModal = require('views/play/modal/PollModal');

ConfirmModal = require('views/core/ConfirmModal');

PatchesView = require('views/editor/PatchesView');

errors = require('core/errors');

app = require('core/application');

require('game-libraries');

module.exports = PollEditView = (function(superClass) {
  extend(PollEditView, superClass);

  PollEditView.prototype.id = 'editor-poll-edit-view';

  PollEditView.prototype.template = template;

  PollEditView.prototype.events = {
    'click #save-button': 'savePoll',
    'click #delete-button': 'confirmDeletion'
  };

  function PollEditView(options, pollID) {
    this.pollID = pollID;
    this.deletePoll = bind(this.deletePoll, this);
    this.pushChangesToPreview = bind(this.pushChangesToPreview, this);
    PollEditView.__super__.constructor.call(this, options);
    this.loadPoll();
    this.loadUserPollsRecord();
    this.pushChangesToPreview = _.throttle(this.pushChangesToPreview, 500);
  }

  PollEditView.prototype.loadPoll = function() {
    this.poll = new Poll({
      _id: this.pollID
    });
    this.poll.saveBackups = true;
    return this.supermodel.loadModel(this.poll);
  };

  PollEditView.prototype.loadUserPollsRecord = function() {
    var onRecordSync, url;
    url = "/db/user.polls.record/-/user/" + me.id;
    this.userPollsRecord = new UserPollsRecord().setURL(url);
    onRecordSync = function() {
      if (this.destroyed) {
        return;
      }
      return this.userPollsRecord.url = function() {
        return '/db/user.polls.record/' + this.id;
      };
    };
    this.listenToOnce(this.userPollsRecord, 'sync', onRecordSync);
    this.userPollsRecord = this.supermodel.loadModel(this.userPollsRecord).model;
    if (this.userPollsRecord.loaded) {
      return onRecordSync.call(this);
    }
  };

  PollEditView.prototype.onLoaded = function() {
    PollEditView.__super__.onLoaded.call(this);
    this.buildTreema();
    return this.listenTo(this.poll, 'change', (function(_this) {
      return function() {
        _this.poll.updateI18NCoverage();
        return _this.treema.set('/', _this.poll.attributes);
      };
    })(this));
  };

  PollEditView.prototype.buildTreema = function() {
    var data, options, ref;
    if ((this.treema != null) || (!this.poll.loaded) || (!me.isAdmin())) {
      return;
    }
    data = $.extend(true, {}, this.poll.attributes);
    options = {
      data: data,
      filePath: "db/poll/" + (this.poll.get('_id')),
      schema: Poll.schema,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: (function(_this) {
          return function() {
            if (!_this.hush) {
              return _this.pushChangesToPreview();
            }
          };
        })(this)
      }
    };
    this.treema = this.$el.find('#poll-treema').treema(options);
    this.treema.build();
    if ((ref = this.treema.childrenTreemas.answers) != null) {
      ref.open(1);
    }
    return this.pushChangesToPreview();
  };

  PollEditView.prototype.afterRender = function() {
    PollEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.pushChangesToPreview();
    this.patchesView = this.insertSubView(new PatchesView(this.poll), this.$el.find('.patches-view'));
    return this.patchesView.load();
  };

  PollEditView.prototype.pushChangesToPreview = function() {
    var key, ref, ref1, value;
    if (!this.treema) {
      return;
    }
    this.$el.find('#poll-view').empty();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.poll.set(key, value);
    }
    if ((ref1 = this.pollModal) != null) {
      ref1.destroy();
    }
    this.pollModal = new PollModal({
      supermodel: this.supermodel,
      poll: this.poll,
      userPollsRecord: this.userPollsRecord
    });
    this.pollModal.render();
    $('#poll-view').empty().append(this.pollModal.el);
    this.pollModal.$el.removeClass('modal fade').show();
    return this.pollModal.on('vote-updated', (function(_this) {
      return function() {
        _this.hush = true;
        _this.treema.set('/answers', _this.pollModal.poll.get('answers'));
        return _this.hush = false;
      };
    })(this));
  };

  PollEditView.prototype.savePoll = function(e) {
    var key, ref, res, value;
    this.treema.endExistingEdits();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.poll.set(key, value);
    }
    res = this.poll.save();
    res.error((function(_this) {
      return function(collection, response, options) {
        return console.error(response);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        var url;
        url = "/editor/poll/" + (_this.poll.get('slug') || _this.poll.id);
        return document.location.href = url;
      };
    })(this));
  };

  PollEditView.prototype.confirmDeletion = function() {
    var confirmModal, renderData;
    renderData = {
      title: 'Are you really sure?',
      body: 'This will completely delete the poll, potentially breaking a lot of stuff you don\'t want breaking. Are you entirely sure?',
      decline: 'Not really',
      confirm: 'Definitely'
    };
    confirmModal = new ConfirmModal(renderData);
    confirmModal.on('confirm', this.deletePoll);
    return this.openModalView(confirmModal);
  };

  PollEditView.prototype.deletePoll = function() {
    console.debug('deleting');
    return $.ajax({
      type: 'DELETE',
      success: function() {
        noty({
          timeout: 5000,
          text: 'Aaaand it\'s gone.',
          type: 'success',
          layout: 'topCenter'
        });
        return _.delay(function() {
          return app.router.navigate('/editor/poll', {
            trigger: true
          });
        }, 500);
      },
      error: function(jqXHR, status, error) {
        console.error(jqXHR);
        return {
          timeout: 5000,
          text: "Deleting poll failed with error code " + jqXHR.status,
          type: 'error',
          layout: 'topCenter'
        };
      },
      url: "/db/poll/" + this.poll.id
    });
  };

  return PollEditView;

})(RootView);
});

;require.register("views/editor/poll/PollSearchView", function(exports, require, module) {
var PollSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = PollSearchView = (function(superClass) {
  extend(PollSearchView, superClass);

  function PollSearchView() {
    return PollSearchView.__super__.constructor.apply(this, arguments);
  }

  PollSearchView.prototype.id = 'editor-poll-home-view';

  PollSearchView.prototype.modelLabel = 'Poll';

  PollSearchView.prototype.model = require('models/Poll');

  PollSearchView.prototype.modelURL = '/db/poll';

  PollSearchView.prototype.tableTemplate = require('templates/editor/poll/poll-search-table');

  PollSearchView.prototype.projection = ['name', 'description', 'slug', 'priority', 'created'];

  PollSearchView.prototype.getRenderData = function() {
    var context;
    context = PollSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.poll_title';
    context.currentNew = 'editor.new_poll_title';
    context.currentNewSignup = 'editor.new_poll_title_login';
    context.currentSearch = 'editor.poll_search_title';
    context.newModelsAdminOnly = true;
    if (!me.isAdmin()) {
      context.unauthorized = true;
    }
    return context;
  };

  return PollSearchView;

})(SearchView);
});

;require.register("views/editor/thang/ExportThangTypeModal", function(exports, require, module) {
var ExportThangTypeModal, ModalView, SpriteExporter, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/thang/export-thang-type-modal');

SpriteExporter = require('lib/sprites/SpriteExporter');

module.exports = ExportThangTypeModal = (function(superClass) {
  extend(ExportThangTypeModal, superClass);

  function ExportThangTypeModal() {
    this.onSpriteSheetUploaded = bind(this.onSpriteSheetUploaded, this);
    return ExportThangTypeModal.__super__.constructor.apply(this, arguments);
  }

  ExportThangTypeModal.prototype.id = "export-thang-type-modal";

  ExportThangTypeModal.prototype.template = template;

  ExportThangTypeModal.prototype.plain = true;

  ExportThangTypeModal.prototype.events = {
    'click #save-btn': 'onClickSaveButton'
  };

  ExportThangTypeModal.prototype.initialize = function(options, thangType) {
    this.thangType = thangType;
    this.builder = null;
    return this.getFilename = _.once(this.getFilename);
  };

  ExportThangTypeModal.prototype.colorMap = {
    red: {
      hue: 0,
      saturation: 0.75,
      lightness: 0.5
    },
    blue: {
      hue: 0.66,
      saturation: 0.75,
      lightness: 0.5
    },
    green: {
      hue: 0.33,
      saturation: 0.75,
      lightness: 0.5
    }
  };

  ExportThangTypeModal.prototype.getColorLabel = function() {
    return this.$('#color-config-select').val();
  };

  ExportThangTypeModal.prototype.getColorConfig = function() {
    var color;
    color = this.colorMap[this.getColorLabel()];
    if (color) {
      return {
        team: color
      };
    }
    return null;
  };

  ExportThangTypeModal.prototype.getActionNames = function() {
    return _.map(this.$('input[name="action"]:checked'), function(el) {
      return $(el).val();
    });
  };

  ExportThangTypeModal.prototype.getResolutionFactor = function() {
    return parseInt(this.$('#resolution-input').val()) || SPRITE_RESOLUTION_FACTOR;
  };

  ExportThangTypeModal.prototype.getFilename = function() {
    return 'spritesheet-' + _.string.slugify(moment().format()) + '.png';
  };

  ExportThangTypeModal.prototype.getSpriteType = function() {
    return this.$('input[name="sprite-type"]:checked').val();
  };

  ExportThangTypeModal.prototype.onClickSaveButton = function() {
    var options;
    this.$('.modal-footer button').addClass('hide');
    this.$('.modal-footer .progress').removeClass('hide');
    this.$('input, select').attr('disabled', true);
    options = {
      resolutionFactor: this.getResolutionFactor(),
      actionNames: this.getActionNames(),
      colorConfig: this.getColorConfig(),
      spriteType: this.getSpriteType()
    };
    this.exporter = new SpriteExporter(this.thangType, options);
    this.exporter.build();
    return this.listenToOnce(this.exporter, 'build', this.onExporterBuild);
  };

  ExportThangTypeModal.prototype.onExporterBuild = function(e) {
    var body, src;
    this.spriteSheet = e.spriteSheet;
    src = this.spriteSheet._images[0].toDataURL();
    src = src.replace('data:image/png;base64,', '').replace(/\ /g, '+');
    body = {
      filename: this.getFilename(),
      mimetype: 'image/png',
      path: "db/thang.type/" + (this.thangType.get('original')),
      b64png: src
    };
    return $.ajax('/file', {
      type: 'POST',
      data: body,
      success: this.onSpriteSheetUploaded
    });
  };

  ExportThangTypeModal.prototype.onSpriteSheetUploaded = function() {
    var config, f, label, spriteSheetData, spriteSheets;
    spriteSheetData = {
      actionNames: this.getActionNames(),
      animations: this.spriteSheet._data,
      frames: (function() {
        var i, len, ref, results;
        ref = this.spriteSheet._frames;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          f = ref[i];
          results.push([f.rect.x, f.rect.y, f.rect.width, f.rect.height, 0, f.regX, f.regY]);
        }
        return results;
      }).call(this),
      image: ("db/thang.type/" + (this.thangType.get('original')) + "/") + this.getFilename(),
      resolutionFactor: this.getResolutionFactor(),
      spriteType: this.getSpriteType()
    };
    if (config = this.getColorConfig()) {
      spriteSheetData.colorConfig = config;
    }
    if (label = this.getColorLabel()) {
      spriteSheetData.colorLabel = label;
    }
    spriteSheets = _.clone(this.thangType.get('prerenderedSpriteSheetData') || []);
    spriteSheets.push(spriteSheetData);
    this.thangType.set('prerenderedSpriteSheetData', spriteSheets);
    this.thangType.save();
    return this.listenToOnce(this.thangType, 'sync', this.hide);
  };

  return ExportThangTypeModal;

})(ModalView);

window.SomeModal = module.exports;
});

;require.register("views/editor/thang/ThangTypeColorsTabView", function(exports, require, module) {
var CocoView, ColorGroupNode, SpriteBuilder, ThangTypeColorsTabView, hexToHSL, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/thang/colors_tab');

SpriteBuilder = require('lib/sprites/SpriteBuilder');

hexToHSL = require('core/utils').hexToHSL;

require('vendor/treema');

module.exports = ThangTypeColorsTabView = (function(superClass) {
  extend(ThangTypeColorsTabView, superClass);

  ThangTypeColorsTabView.prototype.id = 'editor-thang-colors-tab-view';

  ThangTypeColorsTabView.prototype.template = template;

  ThangTypeColorsTabView.prototype.className = 'tab-pane';

  ThangTypeColorsTabView.prototype.offset = 0;

  function ThangTypeColorsTabView(thangType, options) {
    var f;
    this.thangType = thangType;
    this.onColorGroupSelected = bind(this.onColorGroupSelected, this);
    this.onColorGroupsChanged = bind(this.onColorGroupsChanged, this);
    ThangTypeColorsTabView.__super__.constructor.call(this, options);
    this.supermodel.loadModel(this.thangType);
    this.colorConfig = {
      hue: 0,
      saturation: 0.5,
      lightness: 0.5
    };
    if (this.thangType.get('raw')) {
      this.spriteBuilder = new SpriteBuilder(this.thangType);
    }
    f = (function(_this) {
      return function() {
        _this.offset++;
        return _this.updateMovieClip();
      };
    })(this);
    this.interval = setInterval(f, 1000);
  }

  ThangTypeColorsTabView.prototype.destroy = function() {
    var ref;
    if ((ref = this.colorGroups) != null) {
      ref.destroy();
    }
    clearInterval(this.interval);
    return ThangTypeColorsTabView.__super__.destroy.call(this);
  };

  ThangTypeColorsTabView.prototype.afterRender = function() {
    ThangTypeColorsTabView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.createShapeButtons();
    this.initStage();
    this.initSliders();
    return this.tryToBuild();
  };

  ThangTypeColorsTabView.prototype.initSliders = function() {
    this.hueSlider = this.initSlider($('#hue-slider', this.$el), 0, this.makeSliderCallback('hue'));
    this.saturationSlider = this.initSlider($('#saturation-slider', this.$el), 50, this.makeSliderCallback('saturation'));
    return this.lightnessSlider = this.initSlider($('#lightness-slider', this.$el), 50, this.makeSliderCallback('lightness'));
  };

  ThangTypeColorsTabView.prototype.makeSliderCallback = function(property) {
    return (function(_this) {
      return function(e, result) {
        _this.colorConfig[property] = result.value / 100;
        return _this.updateMovieClip();
      };
    })(this);
  };

  ThangTypeColorsTabView.prototype.initStage = function() {
    var canvas;
    canvas = this.$el.find('#tinting-display');
    this.stage = new createjs.Stage(canvas[0]);
    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener('tick', this.stage);
    return this.updateMovieClip();
  };

  ThangTypeColorsTabView.prototype.updateMovieClip = function() {
    var a, actionDict, animation, animations, bounds, index, key, larger, options, ref, ref1;
    if (!(this.currentColorGroupTreema && this.thangType.get('raw'))) {
      return;
    }
    actionDict = this.thangType.getActions();
    animations = (function() {
      var results;
      results = [];
      for (key in actionDict) {
        a = actionDict[key];
        if (a.animation) {
          results.push(a.animation);
        }
      }
      return results;
    })();
    index = this.offset % animations.length;
    animation = animations[index];
    if (!animation) {
      return this.updateContainer();
    }
    if (this.movieClip) {
      this.stage.removeChild(this.movieClip);
    }
    options = {
      colorConfig: {}
    };
    options.colorConfig[this.currentColorGroupTreema.keyForParent] = this.colorConfig;
    this.spriteBuilder.setOptions(options);
    this.spriteBuilder.buildColorMaps();
    this.movieClip = this.spriteBuilder.buildMovieClip(animation);
    bounds = (ref = (ref1 = this.movieClip.frameBounds) != null ? ref1[0] : void 0) != null ? ref : this.movieClip.nominalBounds;
    larger = Math.min(400 / bounds.width, 400 / bounds.height);
    this.movieClip.scaleX = larger;
    this.movieClip.scaleY = larger;
    this.movieClip.regX = bounds.x;
    this.movieClip.regY = bounds.y;
    return this.stage.addChild(this.movieClip);
  };

  ThangTypeColorsTabView.prototype.updateContainer = function() {
    var actionDict, idle, larger, options;
    if (!this.thangType.get('raw')) {
      return;
    }
    actionDict = this.thangType.getActions();
    idle = actionDict.idle;
    if (this.container) {
      this.stage.removeChild(this.container);
    }
    if (!(idle != null ? idle.container : void 0)) {
      return;
    }
    options = {
      colorConfig: {}
    };
    options.colorConfig[this.currentColorGroupTreema.keyForParent] = this.colorConfig;
    this.spriteBuilder.setOptions(options);
    this.spriteBuilder.buildColorMaps();
    this.container = this.spriteBuilder.buildContainerFromStore(idle.container);
    larger = Math.min(400 / this.container.bounds.width, 400 / this.container.bounds.height);
    this.container.scaleX = larger;
    this.container.scaleY = larger;
    this.container.regX = this.container.bounds.x;
    this.container.regY = this.container.bounds.y;
    return this.stage.addChild(this.container);
  };

  ThangTypeColorsTabView.prototype.createShapeButtons = function() {
    var button, buttons, color, colors, j, key, len, s, shape, shapes;
    buttons = $('<div></div>').prop('id', 'shape-buttons');
    shapes = (function() {
      var ref, ref1, results;
      ref1 = ((ref = this.thangType.get('raw')) != null ? ref.shapes : void 0) || {};
      results = [];
      for (key in ref1) {
        shape = ref1[key];
        results.push(shape);
      }
      return results;
    }).call(this);
    colors = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = shapes.length; j < len; j++) {
        s = shapes[j];
        if (s.fc != null) {
          results.push(s.fc);
        }
      }
      return results;
    })();
    colors = _.uniq(colors);
    colors.sort(function(a, b) {
      var aHSL, bHSL;
      aHSL = hexToHSL(a);
      bHSL = hexToHSL(b);
      if (aHSL[0] > bHSL[0]) {
        return -1;
      } else {
        return 1;
      }
    });
    for (j = 0, len = colors.length; j < len; j++) {
      color = colors[j];
      button = $('<button></button>').addClass('btn');
      button.css('background', color);
      button.val(color);
      buttons.append(button);
    }
    buttons.click((function(_this) {
      return function(e) {
        $(e.target).toggleClass('selected');
        return _this.updateColorGroup();
      };
    })(this));
    this.$el.find('#shape-buttons').replaceWith(buttons);
    return this.buttons = buttons;
  };

  ThangTypeColorsTabView.prototype.tryToBuild = function() {
    var data, keys, ref, ref1, schema, treemaOptions;
    if (!this.thangType.loaded) {
      return;
    }
    data = this.thangType.get('colorGroups');
    if (data == null) {
      data = {};
    }
    schema = (ref = this.thangType.schema().properties) != null ? ref.colorGroups : void 0;
    treemaOptions = {
      data: data,
      schema: schema,
      readOnly: !(me.isAdmin() || this.thangType.hasWriteAccess(me)) ? true : void 0,
      callbacks: {
        change: this.onColorGroupsChanged,
        select: this.onColorGroupSelected
      },
      nodeClasses: {
        'thang-color-group': ColorGroupNode
      }
    };
    this.colorGroups = this.$el.find('#color-groups-treema').treema(treemaOptions);
    this.colorGroups.build();
    this.colorGroups.open();
    keys = Object.keys(this.colorGroups.childrenTreemas);
    if (keys[0]) {
      return (ref1 = this.colorGroups.childrenTreemas[keys[0]]) != null ? ref1.$el.click() : void 0;
    }
  };

  ThangTypeColorsTabView.prototype.onColorGroupsChanged = function() {
    this.thangType.set('colorGroups', this.colorGroups.data);
    return Backbone.Mediator.publish('editor:thang-type-color-groups-changed', {
      colorGroups: this.colorGroups.data
    });
  };

  ThangTypeColorsTabView.prototype.onColorGroupSelected = function(e, selected) {
    var colors, j, key, len, ref, ref1, ref2, shape, shapes, treema;
    this.$el.find('#color-group-settings').toggle(selected.length > 0);
    treema = this.colorGroups.getLastSelectedTreema();
    if (!treema) {
      return;
    }
    this.currentColorGroupTreema = treema;
    shapes = {};
    ref = treema.data;
    for (j = 0, len = ref.length; j < len; j++) {
      shape = ref[j];
      shapes[shape] = true;
    }
    colors = {};
    ref2 = ((ref1 = this.thangType.get('raw')) != null ? ref1.shapes : void 0) || {};
    for (key in ref2) {
      shape = ref2[key];
      if (shape.fc == null) {
        continue;
      }
      if (shapes[key]) {
        colors[shape.fc] = true;
      }
    }
    this.buttons.find('button').removeClass('selected');
    this.buttons.find('button').each(function(i, button) {
      if (colors[$(button).val()]) {
        return $(button).addClass('selected');
      }
    });
    return this.updateMovieClip();
  };

  ThangTypeColorsTabView.prototype.updateColorGroup = function() {
    var colors, key, ref, ref1, shape, shapes;
    colors = {};
    this.buttons.find('button').each(function(i, button) {
      if (!$(button).hasClass('selected')) {
        return;
      }
      return colors[$(button).val()] = true;
    });
    shapes = [];
    ref1 = ((ref = this.thangType.get('raw')) != null ? ref.shapes : void 0) || {};
    for (key in ref1) {
      shape = ref1[key];
      if (shape.fc == null) {
        continue;
      }
      if (colors[shape.fc]) {
        shapes.push(key);
      }
    }
    this.currentColorGroupTreema.set('/', shapes);
    return this.updateMovieClip();
  };

  return ThangTypeColorsTabView;

})(CocoView);

ColorGroupNode = (function(superClass) {
  extend(ColorGroupNode, superClass);

  function ColorGroupNode() {
    return ColorGroupNode.__super__.constructor.apply(this, arguments);
  }

  ColorGroupNode.prototype.collection = false;

  ColorGroupNode.prototype.canAddChild = function() {
    return false;
  };

  return ColorGroupNode;

})(TreemaNode.nodeMap.array);
});

;require.register("views/editor/thang/ThangTypeEditView", function(exports, require, module) {
var CENTER, Camera, DocumentFiles, ExportThangTypeModal, ForkModal, Lank, LayerAdapter, PatchesView, RootView, SaveVersionModal, SpriteBuilder, SpriteParser, ThangComponentsEditView, ThangType, ThangTypeColorsTabView, ThangTypeEditView, ThangTypeVersionsModal, VectorIconSetupModal, animatedThangTypeTasks, commonTasks, containerTasks, defaultTasks, displayedThangTypeTasks, imageToPortrait, purchasableTasks, storage, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ThangType = require('models/ThangType');

SpriteParser = require('lib/sprites/SpriteParser');

SpriteBuilder = require('lib/sprites/SpriteBuilder');

Lank = require('lib/surface/Lank');

LayerAdapter = require('lib/surface/LayerAdapter');

Camera = require('lib/surface/Camera');

DocumentFiles = require('collections/DocumentFiles');

require('vendor/treema');

require('views/modal/RevertModal');

RootView = require('views/core/RootView');

ThangComponentsEditView = require('views/editor/component/ThangComponentsEditView');

ThangTypeVersionsModal = require('./ThangTypeVersionsModal');

ThangTypeColorsTabView = require('./ThangTypeColorsTabView');

PatchesView = require('views/editor/PatchesView');

ForkModal = require('views/editor/ForkModal');

VectorIconSetupModal = require('views/editor/thang/VectorIconSetupModal');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

template = require('templates/editor/thang/thang-type-edit-view');

storage = require('core/storage');

ExportThangTypeModal = require('./ExportThangTypeModal');

require('game-libraries');

CENTER = {
  x: 200,
  y: 400
};

commonTasks = ['Upload the art.', 'Set up the vector icon.'];

displayedThangTypeTasks = ['Configure the idle action.', 'Configure the positions (registration point, etc.).', 'Set shadow diameter to 0 if needed.', 'Set scale to 0.3, 0.5, or whatever is appropriate.', 'Set rotation to isometric if needed.', 'Set accurate Physical size, shape, and default z.', 'Set accurate Collides collision information if needed.', 'Double-check that fixedRotation is accurate, if it collides.'];

animatedThangTypeTasks = displayedThangTypeTasks.concat(['Configure the non-idle actions.', 'Configure any per-action registration points needed.', 'Add flipX per action if needed to face to the right.', 'Make sure any death and attack actions do not loop.', 'Add defaultSimlish if needed.', 'Add selection sounds if needed.', 'Add per-action sound triggers.', 'Add team color groups.']);

containerTasks = displayedThangTypeTasks.concat(['Select viable terrains if not universal.', 'Set Exists stateless: true if needed.']);

purchasableTasks = ['Add a tier, or 10 + desired tier if not ready yet.', 'Add a gem cost.', 'Write a description.', 'Click the Populate i18n button.'];

defaultTasks = {
  Unit: commonTasks.concat(animatedThangTypeTasks.concat(['Start a new name category in names.coffee if needed.', 'Set to Allied to correct team (ogres, humans, or neutral).', 'Add AutoTargetsNearest or FightsBack if needed.', 'Add other Components like Shoots or Casts if needed.', 'Configure other Components, like Moves, Attackable, Attacks, etc.', 'Override the HasAPI type if it will not be correctly inferred.', 'Add to Existence System power table.'])),
  Hero: commonTasks.concat(animatedThangTypeTasks.concat(purchasableTasks.concat(['Set the hero class.', 'Add Extended Hero Name.', 'Upload Hero Doll Images.', 'Upload Pose Image.', 'Start a new name category in names.coffee.', 'Set up hero stats in Equips, Attackable, Moves.', 'Set Collects collectRange to 2, Sees visualRange to 60.', 'Add any custom hero abilities.', 'Add to ThangType model hard-coded hero ids/classes list.', 'Add to LevelHUDView hard-coded hero short names list.', 'Add to InventoryView hard-coded hero gender list.', 'Add to PlayHeroesModal hard-coded hero positioning logic.', 'Add as unlock to a level and add unlockLevelName here.']))),
  Floor: commonTasks.concat(containerTasks.concat(['Add 10 x 8.5 snapping.', 'Set fixed rotation.', 'Make sure everything is scaled to tile perfectly.', 'Adjust SingularSprite floor scale list if necessary.'])),
  Wall: commonTasks.concat(containerTasks.concat(['Add 4x4 snapping.', 'Set fixed rotation.', 'Set up and tune complicated wall-face actions.', 'Make sure everything is scaled to tile perfectly.'])),
  Doodad: commonTasks.concat(containerTasks.concat(['Add to GenerateTerrainModal logic if needed.'])),
  Misc: commonTasks.concat(['Add any misc tasks for this misc ThangType.']),
  Mark: commonTasks.concat(['Check the animation framerate.', 'Double-check that bottom of mark is just touching registration point.']),
  Item: commonTasks.concat(purchasableTasks.concat(['Set the hero class if class-specific.', 'Upload Paper Doll Images.', 'Configure item stats and abilities.'])),
  Missile: commonTasks.concat(animatedThangTypeTasks.concat(['Make sure there is a launch sound trigger.', 'Make sure there is a hit sound trigger.', 'Make sure there is a die animation.', 'Add Arrow, Shell, Beam, or other missile Component.', 'Choose Missile.leadsShots and Missile.shootsAtGround.', 'Choose Moves.maxSpeed and other config.', 'Choose Expires.lifespan config if needed.', 'Set spriteType: singular if needed for proper rendering.', 'Add HasAPI if the missile should show up in findEnemyMissiles.']))
};

module.exports = ThangTypeEditView = (function(superClass) {
  extend(ThangTypeEditView, superClass);

  ThangTypeEditView.prototype.id = 'thang-type-edit-view';

  ThangTypeEditView.prototype.className = 'editor';

  ThangTypeEditView.prototype.template = template;

  ThangTypeEditView.prototype.resolution = 4;

  ThangTypeEditView.prototype.scale = 3;

  ThangTypeEditView.prototype.mockThang = {
    health: 10.0,
    maxHealth: 10.0,
    hudProperties: ['health'],
    acts: true
  };

  ThangTypeEditView.prototype.events = {
    'click #clear-button': 'clearRawData',
    'click #upload-button': function() {
      return this.$el.find('input#real-upload-button').click();
    },
    'click #set-vector-icon': 'onClickSetVectorIcon',
    'change #real-upload-button': 'animationFileChosen',
    'change #animations-select': 'showAnimation',
    'click #marker-button': 'toggleDots',
    'click #stop-button': 'stopAnimation',
    'click #play-button': 'playAnimation',
    'click #history-button': 'showVersionHistory',
    'click li:not(.disabled) > #fork-start-button': 'startForking',
    'click #save-button': 'openSaveModal',
    'click #patches-tab': function() {
      return this.patchesView.load();
    },
    'click .play-with-level-button': 'onPlayLevel',
    'click .play-with-level-parent': 'onPlayLevelSelect',
    'keyup .play-with-level-input': 'onPlayLevelKeyUp',
    'click li:not(.disabled) > #pop-level-i18n-button': 'onPopulateLevelI18N',
    'mousedown #canvas': 'onCanvasMouseDown',
    'mouseup #canvas': 'onCanvasMouseUp',
    'mousemove #canvas': 'onCanvasMouseMove',
    'click #export-sprite-sheet-btn': 'onClickExportSpriteSheetButton'
  };

  ThangTypeEditView.prototype.onClickSetVectorIcon = function() {
    var modal;
    modal = new VectorIconSetupModal({}, this.thangType);
    this.openModalView(modal);
    return modal.once('done', (function(_this) {
      return function() {
        return _this.treema.set('/', _this.getThangData());
      };
    })(this));
  };

  ThangTypeEditView.prototype.subscriptions = {
    'editor:thang-type-color-groups-changed': 'onColorGroupsChanged'
  };

  function ThangTypeEditView(options, thangTypeID) {
    this.thangTypeID = thangTypeID;
    this.onSelectNode = bind(this.onSelectNode, this);
    this.pushChangesToPreview = bind(this.pushChangesToPreview, this);
    this.updateHealth = bind(this.updateHealth, this);
    this.updateResolution = bind(this.updateResolution, this);
    this.updateScale = bind(this.updateScale, this);
    this.updateRotation = bind(this.updateRotation, this);
    this.refreshAnimation = bind(this.refreshAnimation, this);
    this.onFileLoad = bind(this.onFileLoad, this);
    this.onComponentsChanged = bind(this.onComponentsChanged, this);
    this.initComponents = bind(this.initComponents, this);
    ThangTypeEditView.__super__.constructor.call(this, options);
    this.mockThang = $.extend(true, {}, this.mockThang);
    this.thangType = new ThangType({
      _id: this.thangTypeID
    });
    this.thangType = this.supermodel.loadModel(this.thangType).model;
    this.thangType.saveBackups = true;
    this.listenToOnce(this.thangType, 'sync', function() {
      this.files = this.supermodel.loadCollection(new DocumentFiles(this.thangType), 'files').model;
      return this.updateFileSize();
    });
  }

  ThangTypeEditView.prototype.showLoading = function($el) {
    if ($el == null) {
      $el = this.$el.find('.outer-content');
    }
    return ThangTypeEditView.__super__.showLoading.call(this, $el);
  };

  ThangTypeEditView.prototype.getRenderData = function(context) {
    var ref;
    if (context == null) {
      context = {};
    }
    context = ThangTypeEditView.__super__.getRenderData.call(this, context);
    context.thangType = this.thangType;
    context.animations = this.getAnimationNames();
    context.authorized = !me.get('anonymous');
    context.recentlyPlayedLevels = (ref = storage.load('recently-played-levels')) != null ? ref : ['items'];
    context.fileSizeString = this.fileSizeString;
    return context;
  };

  ThangTypeEditView.prototype.getAnimationNames = function() {
    return _.sortBy(_.keys(this.thangType.get('actions') || {}), function(a) {
      return {
        move: 1,
        cast: 2,
        attack: 3,
        idle: 4,
        portrait: 6
      }[a] || 5;
    });
  };

  ThangTypeEditView.prototype.afterRender = function() {
    ThangTypeEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.initStage();
    this.buildTreema();
    this.initSliders();
    this.initComponents();
    this.insertSubView(new ThangTypeColorsTabView(this.thangType));
    this.patchesView = this.insertSubView(new PatchesView(this.thangType), this.$el.find('.patches-view'));
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    return this.updatePortrait();
  };

  ThangTypeEditView.prototype.initComponents = function() {
    var options, ref;
    options = {
      components: (ref = this.thangType.get('components')) != null ? ref : [],
      supermodel: this.supermodel
    };
    this.thangComponentEditView = new ThangComponentsEditView(options);
    this.listenTo(this.thangComponentEditView, 'components-changed', this.onComponentsChanged);
    return this.insertSubView(this.thangComponentEditView);
  };

  ThangTypeEditView.prototype.onComponentsChanged = function(components) {
    return this.thangType.set('components', components);
  };

  ThangTypeEditView.prototype.onColorGroupsChanged = function(e) {
    this.temporarilyIgnoringChanges = true;
    this.treema.set('colorGroups', e.colorGroups);
    return this.temporarilyIgnoringChanges = false;
  };

  ThangTypeEditView.prototype.makeDot = function(color) {
    var circle;
    circle = new createjs.Shape();
    circle.graphics.beginFill(color).beginStroke('black').drawCircle(0, 0, 5);
    circle.scaleY = 0.2;
    circle.scaleX = 0.5;
    return circle;
  };

  ThangTypeEditView.prototype.initStage = function() {
    var canvas, ref;
    canvas = this.$el.find('#canvas');
    this.stage = new createjs.Stage(canvas[0]);
    this.layerAdapter = new LayerAdapter({
      name: 'Default',
      webGL: true
    });
    this.topLayer = new createjs.Container();
    this.layerAdapter.container.x = this.topLayer.x = CENTER.x;
    this.layerAdapter.container.y = this.topLayer.y = CENTER.y;
    this.stage.addChild(this.layerAdapter.container, this.topLayer);
    this.listenTo(this.layerAdapter, 'new-spritesheet', this.onNewSpriteSheet);
    if ((ref = this.camera) != null) {
      ref.destroy();
    }
    this.camera = new Camera(canvas);
    this.torsoDot = this.makeDot('blue');
    this.mouthDot = this.makeDot('yellow');
    this.aboveHeadDot = this.makeDot('green');
    this.groundDot = this.makeDot('red');
    this.topLayer.addChild(this.groundDot, this.torsoDot, this.mouthDot, this.aboveHeadDot);
    this.updateGrid();
    _.defer(this.refreshAnimation);
    this.toggleDots(false);
    createjs.Ticker.setFPS(30);
    return createjs.Ticker.addEventListener('tick', this.stage);
  };

  ThangTypeEditView.prototype.toggleDots = function(newShowDots) {
    this.showDots = typeof newShowDots === 'boolean' ? newShowDots : !this.showDots;
    return this.updateDots();
  };

  ThangTypeEditView.prototype.updateDots = function() {
    var aboveHead, mouth, torso;
    this.topLayer.removeChild(this.torsoDot, this.mouthDot, this.aboveHeadDot, this.groundDot);
    if (!this.currentLank) {
      return;
    }
    if (!this.showDots) {
      return;
    }
    torso = this.currentLank.getOffset('torso');
    mouth = this.currentLank.getOffset('mouth');
    aboveHead = this.currentLank.getOffset('aboveHead');
    this.torsoDot.x = torso.x;
    this.torsoDot.y = torso.y;
    this.mouthDot.x = mouth.x;
    this.mouthDot.y = mouth.y;
    this.aboveHeadDot.x = aboveHead.x;
    this.aboveHeadDot.y = aboveHead.y;
    return this.topLayer.addChild(this.groundDot, this.torsoDot, this.mouthDot, this.aboveHeadDot);
  };

  ThangTypeEditView.prototype.stopAnimation = function() {
    var ref;
    return (ref = this.currentLank) != null ? ref.queueAction('idle') : void 0;
  };

  ThangTypeEditView.prototype.playAnimation = function() {
    var ref;
    return (ref = this.currentLank) != null ? ref.queueAction(this.$el.find('#animations-select').val()) : void 0;
  };

  ThangTypeEditView.prototype.updateGrid = function() {
    var grid, line, newLine, step, width, x, y;
    grid = new createjs.Container();
    line = new createjs.Shape();
    width = 1000;
    line.graphics.beginFill('#666666').drawRect(-width / 2, -0.5, width, 0.5);
    line.x = CENTER.x;
    line.y = CENTER.y;
    y = line.y;
    step = 10 * this.scale;
    while (y > 0) {
      y -= step;
    }
    while (y < 500) {
      y += step;
      newLine = line.clone();
      newLine.y = y;
      grid.addChild(newLine);
    }
    x = line.x;
    while (x > 0) {
      x -= step;
    }
    while (x < 400) {
      x += step;
      newLine = line.clone();
      newLine.x = x;
      newLine.rotation = 90;
      grid.addChild(newLine);
    }
    if (this.grid) {
      this.stage.removeChild(this.grid);
    }
    this.stage.addChildAt(grid, 0);
    return this.grid = grid;
  };

  ThangTypeEditView.prototype.updateSelectBox = function() {
    var i, len, name, names, results, select;
    names = this.getAnimationNames();
    select = this.$el.find('#animations-select');
    if (select.find('option').length === names.length) {
      return;
    }
    select.empty();
    results = [];
    for (i = 0, len = names.length; i < len; i++) {
      name = names[i];
      results.push(select.append($('<option></option>').text(name)));
    }
    return results;
  };

  ThangTypeEditView.prototype.animationFileChosen = function(e) {
    this.file = e.target.files[0];
    if (!this.file) {
      return;
    }
    if (!_.string.endsWith(this.file.type, 'javascript')) {
      return;
    }
    this.reader = new FileReader();
    this.reader.onload = this.onFileLoad;
    return this.reader.readAsText(this.file);
  };

  ThangTypeEditView.prototype.onFileLoad = function(e) {
    var parser, result;
    result = this.reader.result;
    parser = new SpriteParser(this.thangType);
    parser.parse(result);
    this.treema.set('raw', this.thangType.get('raw'));
    this.updateSelectBox();
    this.refreshAnimation();
    return this.updateFileSize();
  };

  ThangTypeEditView.prototype.updateFileSize = function() {
    var compressed, compressedSize, file, gzipCompressedSize, size;
    file = JSON.stringify(this.thangType.attributes);
    compressed = LZString.compress(file);
    size = (file.length / 1024).toFixed(1) + "KB";
    compressedSize = (compressed.length / 1024).toFixed(1) + "KB";
    gzipCompressedSize = compressedSize * 1.65;
    this.fileSizeString = "Size: " + size + " (~" + compressedSize + " gzipped)";
    return this.$el.find('#thang-type-file-size').text(this.fileSizeString);
  };

  ThangTypeEditView.prototype.refreshAnimation = function() {
    var options;
    this.thangType.resetSpriteSheetCache();
    if (this.thangType.get('raster')) {
      return this.showRasterImage();
    }
    options = this.getLankOptions();
    console.log('refresh animation....');
    this.showAnimation();
    return this.updatePortrait();
  };

  ThangTypeEditView.prototype.showRasterImage = function() {
    var lank;
    lank = new Lank(this.thangType, this.getLankOptions());
    this.showLank(lank);
    return this.updateScale();
  };

  ThangTypeEditView.prototype.onNewSpriteSheet = function() {
    var i, image, len, ref;
    $('#spritesheets').empty();
    ref = this.layerAdapter.spriteSheet._images;
    for (i = 0, len = ref.length; i < len; i++) {
      image = ref[i];
      $('#spritesheets').append(image);
    }
    this.layerAdapter.container.x = CENTER.x;
    this.layerAdapter.container.y = CENTER.y;
    return this.updateScale();
  };

  ThangTypeEditView.prototype.showAnimation = function(animationName) {
    if (!_.isString(animationName)) {
      animationName = this.$el.find('#animations-select').val();
    }
    if (!animationName) {
      return;
    }
    this.mockThang.action = animationName;
    this.showAction(animationName);
    this.updateRotation();
    return this.updateScale();
  };

  ThangTypeEditView.prototype.showMovieClip = function(animationName) {
    var movieClip, ref, reg, scale, vectorParser;
    vectorParser = new SpriteBuilder(this.thangType);
    movieClip = vectorParser.buildMovieClip(animationName);
    if (!movieClip) {
      return;
    }
    reg = (ref = this.thangType.get('positions')) != null ? ref.registration : void 0;
    if (reg) {
      movieClip.regX = -reg.x;
      movieClip.regY = -reg.y;
    }
    scale = this.thangType.get('scale');
    if (scale) {
      movieClip.scaleX = movieClip.scaleY = scale;
    }
    return this.showSprite(movieClip);
  };

  ThangTypeEditView.prototype.getLankOptions = function() {
    return {
      resolutionFactor: this.resolution,
      thang: this.mockThang,
      preloadSounds: false
    };
  };

  ThangTypeEditView.prototype.showAction = function(actionName) {
    var lank, options;
    options = this.getLankOptions();
    lank = new Lank(this.thangType, options);
    this.showLank(lank);
    return lank.queueAction(actionName);
  };

  ThangTypeEditView.prototype.updatePortrait = function() {
    var options, portrait;
    options = this.getLankOptions();
    portrait = this.thangType.getPortraitImage(options);
    if (!portrait) {
      return;
    }
    if (portrait != null) {
      portrait.attr('id', 'portrait').addClass('img-thumbnail');
    }
    portrait.addClass('img-thumbnail');
    return $('#portrait').replaceWith(portrait);
  };

  ThangTypeEditView.prototype.showLank = function(lank) {
    this.clearDisplayObject();
    this.clearLank();
    this.layerAdapter.resetSpriteSheet();
    this.layerAdapter.addLank(lank);
    this.currentLank = lank;
    return this.currentLankOffset = null;
  };

  ThangTypeEditView.prototype.showSprite = function(sprite) {
    this.clearDisplayObject();
    this.clearLank();
    this.topLayer.addChild(sprite);
    this.currentObject = sprite;
    return this.updateDots();
  };

  ThangTypeEditView.prototype.clearDisplayObject = function() {
    if (this.currentObject != null) {
      return this.topLayer.removeChild(this.currentObject);
    }
  };

  ThangTypeEditView.prototype.clearLank = function() {
    var ref;
    if (this.currentLank) {
      this.layerAdapter.removeLank(this.currentLank);
    }
    return (ref = this.currentLank) != null ? ref.destroy() : void 0;
  };

  ThangTypeEditView.prototype.initSliders = function() {
    this.rotationSlider = this.initSlider($('#rotation-slider', this.$el), 50, this.updateRotation);
    this.scaleSlider = this.initSlider($('#scale-slider', this.$el), 29, this.updateScale);
    this.resolutionSlider = this.initSlider($('#resolution-slider', this.$el), 39, this.updateResolution);
    return this.healthSlider = this.initSlider($('#health-slider', this.$el), 100, this.updateHealth);
  };

  ThangTypeEditView.prototype.updateRotation = function() {
    var value;
    value = parseInt(180 * (this.rotationSlider.slider('value') - 50) / 50);
    this.$el.find('.rotation-label').text(" " + value + "° ");
    if (this.currentLank) {
      this.currentLank.rotation = value;
      return this.currentLank.update(true);
    }
  };

  ThangTypeEditView.prototype.updateScale = function() {
    var fixed, scaleValue;
    scaleValue = (this.scaleSlider.slider('value') + 1) / 10;
    this.layerAdapter.container.scaleX = this.layerAdapter.container.scaleY = this.topLayer.scaleX = this.topLayer.scaleY = scaleValue;
    fixed = scaleValue.toFixed(1);
    this.scale = scaleValue;
    this.$el.find('.scale-label').text(" " + fixed + "x ");
    return this.updateGrid();
  };

  ThangTypeEditView.prototype.updateResolution = function() {
    var fixed, value;
    value = (this.resolutionSlider.slider('value') + 1) / 10;
    fixed = value.toFixed(1);
    this.$el.find('.resolution-label').text(" " + fixed + "x ");
    this.resolution = value;
    return this.refreshAnimation();
  };

  ThangTypeEditView.prototype.updateHealth = function() {
    var ref, value;
    value = parseInt((this.healthSlider.slider('value')) / 10);
    this.$el.find('.health-label').text(" " + value + "hp ");
    this.mockThang.health = value;
    return (ref = this.currentLank) != null ? ref.update() : void 0;
  };

  ThangTypeEditView.prototype.saveNewThangType = function(e) {
    var modal, newThangType, res;
    newThangType = e.major ? this.thangType.cloneNewMajorVersion() : this.thangType.cloneNewMinorVersion();
    newThangType.set('commitMessage', e.commitMessage);
    if (newThangType.get('i18nCoverage')) {
      newThangType.updateI18NCoverage();
    }
    res = newThangType.save(null, {
      type: 'POST'
    });
    if (!res) {
      return;
    }
    modal = $('#save-version-modal');
    this.enableModalInProgress(modal);
    res.error((function(_this) {
      return function() {
        return _this.disableModalInProgress(modal);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        var image, portraitSource, success, url;
        url = "/editor/thang/" + (newThangType.get('slug') || newThangType.id);
        portraitSource = null;
        if (_this.thangType.get('raster')) {
          image = _this.currentLank.sprite.spriteSheet._images[0];
          portraitSource = imageToPortrait(image);
        }
        success = function() {
          _this.thangType.clearBackup();
          return document.location.href = url;
        };
        return newThangType.uploadGenericPortrait(success, portraitSource);
      };
    })(this));
  };

  ThangTypeEditView.prototype.clearRawData = function() {
    this.thangType.resetRawData();
    this.thangType.set('actions', void 0);
    this.clearDisplayObject();
    return this.treema.set('/', this.getThangData());
  };

  ThangTypeEditView.prototype.getThangData = function() {
    var data;
    data = $.extend(true, {}, this.thangType.attributes);
    return data = _.pick(data, (function(_this) {
      return function(value, key) {
        return !(key === 'components');
      };
    })(this));
  };

  ThangTypeEditView.prototype.buildTreema = function() {
    var data, el, options, schema;
    data = this.getThangData();
    schema = _.cloneDeep(ThangType.schema);
    schema.properties = _.pick(schema.properties, (function(_this) {
      return function(value, key) {
        return !(key === 'components');
      };
    })(this));
    options = {
      data: data,
      schema: schema,
      files: this.files,
      filePath: "db/thang.type/" + (this.thangType.get('original')),
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.pushChangesToPreview,
        select: this.onSelectNode
      }
    };
    el = this.$el.find('#thang-type-treema');
    this.treema = this.$el.find('#thang-type-treema').treema(options);
    this.treema.build();
    return this.lastKind = data.kind;
  };

  ThangTypeEditView.prototype.pushChangesToPreview = function() {
    var key, keysProcessed, kind, ref, t, value;
    if (this.temporarilyIgnoringChanges) {
      return;
    }
    keysProcessed = {};
    for (key in this.thangType.attributes) {
      keysProcessed[key] = true;
      if (key === 'components') {
        continue;
      }
      this.thangType.set(key, this.treema.data[key]);
    }
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      if (!keysProcessed[key]) {
        this.thangType.set(key, value);
      }
    }
    this.updateSelectBox();
    this.refreshAnimation();
    this.updateDots();
    this.updatePortrait();
    if ((kind = this.treema.data.kind) !== this.lastKind) {
      this.lastKind = kind;
      Backbone.Mediator.publish('editor:thang-type-kind-changed', {
        kind: kind
      });
      if ((kind === 'Doodad' || kind === 'Floor' || kind === 'Wall') && !this.treema.data.terrains) {
        this.treema.set('/terrains', ['Grass', 'Dungeon', 'Indoor', 'Desert', 'Mountain', 'Glacier', 'Volcano']);
      }
      if (!this.treema.data.tasks) {
        return this.treema.set('/tasks', (function() {
          var i, len, ref1, results;
          ref1 = defaultTasks[kind];
          results = [];
          for (i = 0, len = ref1.length; i < len; i++) {
            t = ref1[i];
            results.push({
              name: t
            });
          }
          return results;
        })());
      }
    }
  };

  ThangTypeEditView.prototype.onSelectNode = function(e, selected) {
    var bounds, key, obj, parts, path, ref, type, vectorParser;
    selected = selected[0];
    if (this.boundsBox) {
      this.topLayer.removeChild(this.boundsBox);
    }
    if (!selected) {
      return this.stopShowingSelectedNode();
    }
    path = selected.getPath();
    parts = path.split('/');
    if (!(parts.length >= 4 && _.string.startsWith(path, '/raw/'))) {
      return this.stopShowingSelectedNode();
    }
    key = parts[3];
    type = parts[2];
    vectorParser = new SpriteBuilder(this.thangType);
    if (type === 'animations') {
      obj = vectorParser.buildMovieClip(key);
    }
    if (type === 'containers') {
      obj = vectorParser.buildContainerFromStore(key);
    }
    if (type === 'shapes') {
      obj = vectorParser.buildShapeFromStore(key);
    }
    bounds = (obj != null ? obj.bounds : void 0) || (obj != null ? obj.nominalBounds : void 0);
    if (bounds) {
      this.boundsBox = new createjs.Shape();
      this.boundsBox.graphics.beginFill('#aaaaaa').beginStroke('black').drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      this.topLayer.addChild(this.boundsBox);
      obj.regX = this.boundsBox.regX = bounds.x + bounds.width / 2;
      obj.regY = this.boundsBox.regY = bounds.y + bounds.height / 2;
    }
    if (obj) {
      this.showSprite(obj);
    }
    this.showingSelectedNode = true;
    if ((ref = this.currentLank) != null) {
      ref.destroy();
    }
    this.currentLank = null;
    this.updateScale();
    return this.grid.alpha = 0.0;
  };

  ThangTypeEditView.prototype.stopShowingSelectedNode = function() {
    if (!this.showingSelectedNode) {
      return;
    }
    this.grid.alpha = 1.0;
    this.showAnimation();
    return this.showingSelectedNode = false;
  };

  ThangTypeEditView.prototype.showVersionHistory = function(e) {
    return this.openModalView(new ThangTypeVersionsModal({
      thangType: this.thangType
    }, this.thangTypeID));
  };

  ThangTypeEditView.prototype.onPopulateLevelI18N = function() {
    this.thangType.populateI18N();
    return _.delay((function() {
      return document.location.reload();
    }), 500);
  };

  ThangTypeEditView.prototype.openSaveModal = function() {
    var modal;
    modal = new SaveVersionModal({
      model: this.thangType
    });
    this.openModalView(modal);
    this.listenToOnce(modal, 'save-new-version', this.saveNewThangType);
    return this.listenToOnce(modal, 'hidden', function() {
      return this.stopListening(modal);
    });
  };

  ThangTypeEditView.prototype.startForking = function(e) {
    return this.openModalView(new ForkModal({
      model: this.thangType,
      editorPath: 'thang'
    }));
  };

  ThangTypeEditView.prototype.onPlayLevelSelect = function(e) {
    if (this.childWindow && !this.childWindow.closed) {
      e.stopImmediatePropagation();
      this.onPlayLevel(e);
    }
    return _.defer(function() {
      return $('.play-with-level-input').focus();
    });
  };

  ThangTypeEditView.prototype.onPlayLevelKeyUp = function(e) {
    var input, level, recentlyPlayedLevels, ref;
    if (e.keyCode !== 13) {
      return;
    }
    input = this.$el.find('.play-with-level-input');
    input.parents('.dropdown').find('.play-with-level-parent').dropdown('toggle');
    level = _.string.slugify(input.val());
    if (!level) {
      return;
    }
    this.onPlayLevel(null, level);
    recentlyPlayedLevels = (ref = storage.load('recently-played-levels')) != null ? ref : [];
    recentlyPlayedLevels.push(level);
    return storage.save('recently-played-levels', recentlyPlayedLevels);
  };

  ThangTypeEditView.prototype.onPlayLevel = function(e, level) {
    var scratchLevelID;
    if (level == null) {
      level = null;
    }
    if (level == null) {
      level = $(e.target).data('level');
    }
    level = _.string.slugify(level);
    if (this.childWindow && !this.childWindow.closed) {
      this.childWindow.Backbone.Mediator.publish('level:reload-thang-type', {
        thangType: this.thangType
      });
    } else {
      scratchLevelID = level + '?dev=true';
      if (me.get('name') === 'Nick') {
        this.childWindow = window.open("/play/level/" + scratchLevelID, 'child_window', 'width=2560,height=1080,left=0,top=-1600,location=1,menubar=1,scrollbars=1,status=0,titlebar=1,toolbar=1', true);
      } else {
        this.childWindow = window.open("/play/level/" + scratchLevelID, 'child_window', 'width=1024,height=560,left=10,top=10,location=0,menubar=0,scrollbars=0,status=0,titlebar=0,toolbar=0', true);
      }
    }
    return this.childWindow.focus();
  };

  ThangTypeEditView.prototype.onCanvasMouseMove = function(e) {
    var offset, p1, p2;
    if (!(p1 = this.canvasDragStart)) {
      return;
    }
    p2 = {
      x: e.offsetX,
      y: e.offsetY
    };
    offset = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    };
    this.currentLank.sprite.x = this.currentLankOffset.x + offset.x / this.scale;
    this.currentLank.sprite.y = this.currentLankOffset.y + offset.y / this.scale;
    return this.canvasDragOffset = offset;
  };

  ThangTypeEditView.prototype.onCanvasMouseDown = function(e) {
    if (!this.currentLank) {
      return;
    }
    this.canvasDragStart = {
      x: e.offsetX,
      y: e.offsetY
    };
    return this.currentLankOffset != null ? this.currentLankOffset : this.currentLankOffset = {
      x: this.currentLank.sprite.x,
      y: this.currentLank.sprite.y
    };
  };

  ThangTypeEditView.prototype.onCanvasMouseUp = function(e) {
    var node, offset;
    this.canvasDragStart = null;
    if (!this.canvasDragOffset) {
      return;
    }
    if (!(node = this.treema.getLastSelectedTreema())) {
      return;
    }
    offset = node.get('/');
    offset.x += Math.round(this.canvasDragOffset.x);
    offset.y += Math.round(this.canvasDragOffset.y);
    this.canvasDragOffset = null;
    return node.set('/', offset);
  };

  ThangTypeEditView.prototype.onClickExportSpriteSheetButton = function() {
    var modal;
    modal = new ExportThangTypeModal({}, this.thangType);
    return this.openModalView(modal);
  };

  ThangTypeEditView.prototype.destroy = function() {
    var ref;
    if ((ref = this.camera) != null) {
      ref.destroy();
    }
    return ThangTypeEditView.__super__.destroy.call(this);
  };

  return ThangTypeEditView;

})(RootView);

imageToPortrait = function(img) {
  var canvas, ctx, scaleX, scaleY;
  canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  ctx = canvas.getContext('2d');
  scaleX = 100 / img.width;
  scaleY = 100 / img.height;
  ctx.scale(scaleX, scaleY);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png');
};
});

;require.register("views/editor/thang/ThangTypeSearchView", function(exports, require, module) {
var SearchView, ThangTypeSearchView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = ThangTypeSearchView = (function(superClass) {
  extend(ThangTypeSearchView, superClass);

  function ThangTypeSearchView() {
    this.onSearchChange = bind(this.onSearchChange, this);
    return ThangTypeSearchView.__super__.constructor.apply(this, arguments);
  }

  ThangTypeSearchView.prototype.id = 'thang-type-home-view';

  ThangTypeSearchView.prototype.modelLabel = 'Thang Type';

  ThangTypeSearchView.prototype.model = require('models/ThangType');

  ThangTypeSearchView.prototype.modelURL = '/db/thang.type';

  ThangTypeSearchView.prototype.tableTemplate = require('templates/editor/thang/table');

  ThangTypeSearchView.prototype.projection = ['original', 'name', 'version', 'description', 'slug', 'kind', 'rasterIcon', 'tasks'];

  ThangTypeSearchView.prototype.page = 'thang';

  ThangTypeSearchView.prototype.getRenderData = function() {
    var context;
    context = ThangTypeSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.thang_title';
    context.currentNew = 'editor.new_thang_title';
    context.currentNewSignup = 'editor.new_thang_title_login';
    context.currentSearch = 'editor.thang_search_title';
    context.newModelsAdminOnly = true;
    this.$el.i18n();
    return context;
  };

  ThangTypeSearchView.prototype.onSearchChange = function() {
    ThangTypeSearchView.__super__.onSearchChange.call(this);
    return this.$el.find('img').error(function() {
      return $(this).hide();
    });
  };

  return ThangTypeSearchView;

})(SearchView);
});

;require.register("views/editor/thang/ThangTypeVersionsModal", function(exports, require, module) {
var ThangTypeVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = ThangTypeVersionsModal = (function(superClass) {
  extend(ThangTypeVersionsModal, superClass);

  ThangTypeVersionsModal.prototype.id = 'editor-thang-versions-view';

  ThangTypeVersionsModal.prototype.url = '/db/thang.type/';

  ThangTypeVersionsModal.prototype.page = 'thang';

  function ThangTypeVersionsModal(options, ID) {
    this.ID = ID;
    ThangTypeVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/ThangType'));
  }

  return ThangTypeVersionsModal;

})(VersionsModal);
});

;require.register("views/editor/thang/VectorIconSetupModal", function(exports, require, module) {
var ModalView, VectorIconSetupModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/thang/vector-icon-setup-modal');

module.exports = VectorIconSetupModal = (function(superClass) {
  extend(VectorIconSetupModal, superClass);

  VectorIconSetupModal.prototype.id = "vector-icon-setup-modal";

  VectorIconSetupModal.prototype.template = template;

  VectorIconSetupModal.prototype.demoSize = 400;

  VectorIconSetupModal.prototype.plain = true;

  VectorIconSetupModal.prototype.events = {
    'change #container-select': 'onChangeContainer',
    'click #center': 'onClickCenter',
    'click #zero-bounds': 'onClickZeroBounds',
    'click #done-button': 'onClickDone'
  };

  VectorIconSetupModal.prototype.shortcuts = {
    'shift+-': function() {
      return this.incrScale(-0.02);
    },
    'shift+=': function() {
      return this.incrScale(0.02);
    },
    'up': function() {
      return this.incrRegY(1);
    },
    'down': function() {
      return this.incrRegY(-1);
    },
    'left': function() {
      return this.incrRegX(1);
    },
    'right': function() {
      return this.incrRegX(-1);
    }
  };

  function VectorIconSetupModal(options, thangType) {
    var portrait, ref, ref1, ref2, ref3, ref4, ref5;
    this.thangType = thangType;
    portrait = (ref = this.thangType.get('actions')) != null ? ref.portrait : void 0;
    this.containers = _.keys(((ref1 = this.thangType.get('raw')) != null ? ref1.containers : void 0) || {});
    this.container = (portrait != null ? portrait.container : void 0) || _.last(this.containers);
    this.scale = (portrait != null ? portrait.scale : void 0) || 1;
    this.regX = (portrait != null ? (ref2 = portrait.positions) != null ? (ref3 = ref2.registration) != null ? ref3.x : void 0 : void 0 : void 0) || 0;
    this.regY = (portrait != null ? (ref4 = portrait.positions) != null ? (ref5 = ref4.registration) != null ? ref5.y : void 0 : void 0 : void 0) || 0;
    this.saveChanges();
    VectorIconSetupModal.__super__.constructor.call(this, options);
  }

  VectorIconSetupModal.prototype.saveChanges = function() {
    var actions, base, ref;
    actions = _.cloneDeep((ref = this.thangType.get('actions')) != null ? ref : {});
    if (actions.portrait == null) {
      actions.portrait = {};
    }
    actions.portrait.scale = this.scale;
    if ((base = actions.portrait).positions == null) {
      base.positions = {};
    }
    actions.portrait.positions.registration = {
      x: this.regX,
      y: this.regY
    };
    actions.portrait.container = this.container;
    this.thangType.set('actions', actions);
    return this.thangType.buildActions();
  };

  VectorIconSetupModal.prototype.afterRender = function() {
    this.initStage();
    return VectorIconSetupModal.__super__.afterRender.call(this);
  };

  VectorIconSetupModal.prototype.initStage = function() {
    var canvas;
    if (!(this.containers && this.container)) {
      return;
    }
    this.stage = this.thangType.getVectorPortraitStage(this.demoSize);
    this.sprite = this.stage.children[0];
    canvas = $(this.stage.canvas);
    canvas.attr('id', 'resulting-icon');
    this.$el.find('#resulting-icon').replaceWith(canvas);
    return this.updateSpriteProperties();
  };

  VectorIconSetupModal.prototype.onChangeContainer = function(e) {
    this.container = $(e.target).val();
    this.saveChanges();
    return this.initStage();
  };

  VectorIconSetupModal.prototype.refreshSprite = function() {
    var stage;
    if (!this.stage) {
      return;
    }
    stage = this.thangType.getVectorPortraitStage(this.demoSize);
    this.stage.removeAllChildren();
    this.stage.addChild(this.sprite = stage.children[0]);
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.updateSpriteProperties = function() {
    this.sprite.scaleX = this.sprite.scaleY = this.scale * this.demoSize / 100;
    this.sprite.regX = this.regX / this.scale;
    this.sprite.regY = this.regY / this.scale;
    return console.log('set to', this.scale, this.regX, this.regY);
  };

  VectorIconSetupModal.prototype.onClickCenter = function() {
    var b, containerInfo, maxDimension;
    containerInfo = this.thangType.get('raw').containers[this.container];
    b = containerInfo.b;
    this.regX = b[0];
    this.regY = b[1];
    maxDimension = Math.max(b[2], b[3]);
    this.scale = 100 / maxDimension;
    if (b[2] > b[3]) {
      this.regY += (b[3] - b[2]) / 2;
    } else {
      this.regX += (b[2] - b[3]) / 2;
    }
    this.regX *= this.scale;
    this.regY *= this.scale;
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.incrScale = function(amount) {
    this.scale += amount;
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.incrRegX = function(amount) {
    this.regX += amount;
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.incrRegY = function(amount) {
    this.regY += amount;
    this.updateSpriteProperties();
    return this.stage.update();
  };

  VectorIconSetupModal.prototype.onClickDone = function() {
    this.saveChanges();
    this.trigger('done');
    return this.hide();
  };

  return VectorIconSetupModal;

})(ModalView);
});

;require.register("views/editor/verifier/VerifierTest", function(exports, require, module) {
var CocoClass, GoalManager, God, LevelLoader, SuperModel, VerifierTest, createAetherOptions, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

SuperModel = require('models/SuperModel');

createAetherOptions = require('lib/aether_utils').createAetherOptions;

God = require('lib/God');

GoalManager = require('lib/world/GoalManager');

LevelLoader = require('lib/LevelLoader');

utils = require('core/utils');

module.exports = VerifierTest = (function(superClass) {
  extend(VerifierTest, superClass);

  function VerifierTest(levelID, updateCallback, supermodel, language, options) {
    this.levelID = levelID;
    this.updateCallback = updateCallback;
    this.supermodel = supermodel;
    this.language = language;
    this.options = options;
    this.cleanup = bind(this.cleanup, this);
    this.configureSession = bind(this.configureSession, this);
    this.onWorldNecessitiesLoaded = bind(this.onWorldNecessitiesLoaded, this);
    VerifierTest.__super__.constructor.call(this);
    if (this.supermodel == null) {
      this.supermodel = new SuperModel();
    }
    if (utils.getQueryVariable('dev') || this.options.devMode) {
      this.supermodel.shouldSaveBackups = function(model) {
        var ref;
        return (ref = model.constructor.className) === 'Level' || ref === 'LevelComponent' || ref === 'LevelSystem' || ref === 'ThangType';
      };
    }
    if (this.language == null) {
      this.language = 'python';
    }
    this.userCodeProblems = [];
    this.load();
  }

  VerifierTest.prototype.load = function() {
    this.loadStartTime = new Date();
    this.god = new God({
      maxAngels: 1,
      headless: true
    });
    this.levelLoader = new LevelLoader({
      supermodel: this.supermodel,
      levelID: this.levelID,
      headless: true,
      fakeSessionConfig: {
        codeLanguage: this.language,
        callback: this.configureSession
      }
    });
    return this.listenToOnce(this.levelLoader, 'world-necessities-loaded', function() {
      return _.defer(this.onWorldNecessitiesLoaded);
    });
  };

  VerifierTest.prototype.onWorldNecessitiesLoaded = function() {
    this.grabLevelLoaderData();
    if (!this.solution) {
      this.error = 'No solution present...';
      this.state = 'no-solution';
      if (typeof this.updateCallback === "function") {
        this.updateCallback({
          test: this,
          state: 'no-solution'
        });
      }
      return;
    }
    me.team = this.team = 'humans';
    this.setupGod();
    this.initGoalManager();
    return this.register();
  };

  VerifierTest.prototype.configureSession = function(session, level) {
    var e, error, state;
    try {
      session.solution = _.find(level.getSolutions(), {
        language: session.get('codeLanguage')
      });
      session.set('heroConfig', session.solution.heroConfig);
      session.set('code', {
        'hero-placeholder': {
          plan: session.solution.source
        }
      });
      state = session.get('state');
      state.flagHistory = session.solution.flagHistory;
      state.realTimeInputEvents = session.solution.realTimeInputEvents;
      state.difficulty = session.solution.difficulty || 0;
      if (!_.isNumber(session.solution.seed)) {
        return session.solution.seed = void 0;
      }
    } catch (error) {
      e = error;
      this.state = 'error';
      return this.error = ("Could not load the session solution for " + (level.get('name')) + ": ") + e.toString() + "\n" + e.stack;
    }
  };

  VerifierTest.prototype.grabLevelLoaderData = function() {
    this.world = this.levelLoader.world;
    this.level = this.levelLoader.level;
    this.session = this.levelLoader.session;
    return this.solution = this.levelLoader.session.solution;
  };

  VerifierTest.prototype.setupGod = function() {
    this.god.setLevel(this.level.serialize({
      supermodel: this.supermodel,
      session: this.session,
      otherSession: null,
      headless: true,
      sessionless: false
    }));
    this.god.setLevelSessionIDs([this.session.id]);
    this.god.setWorldClassMap(this.world.classMap);
    this.god.lastFlagHistory = this.session.get('state').flagHistory;
    this.god.lastDifficulty = this.session.get('state').difficulty;
    this.god.lastFixedSeed = this.session.solution.seed;
    return this.god.lastSubmissionCount = 0;
  };

  VerifierTest.prototype.initGoalManager = function() {
    this.goalManager = new GoalManager(this.world, this.level.get('goals'), this.team);
    return this.god.setGoalManager(this.goalManager);
  };

  VerifierTest.prototype.register = function() {
    this.listenToOnce(this.god, 'infinite-loop', this.fail);
    this.listenToOnce(this.god, 'user-code-problem', this.onUserCodeProblem);
    this.listenToOnce(this.god, 'goals-calculated', this.processSingleGameResults);
    this.god.createWorld(this.session.generateSpellsObject());
    this.state = 'running';
    return this.reportResults();
  };

  VerifierTest.prototype.extractTestLogs = function() {
    var i, len, log, ref, ref1, ref2, ref3, ref4, ref5;
    this.testLogs = [];
    ref5 = (ref = (ref1 = this.god) != null ? (ref2 = ref1.angelsShare) != null ? (ref3 = ref2.busyAngels) != null ? (ref4 = ref3[0]) != null ? ref4.allLogs : void 0 : void 0 : void 0 : void 0) != null ? ref : [];
    for (i = 0, len = ref5.length; i < len; i++) {
      log = ref5[i];
      if (log.indexOf('[TEST]') === -1) {
        continue;
      }
      this.testLogs.push(log.replace(/\|.*?\| \[TEST\] /, ''));
    }
    return this.testLogs;
  };

  VerifierTest.prototype.reportResults = function() {
    return typeof this.updateCallback === "function" ? this.updateCallback({
      test: this,
      state: this.state,
      testLogs: this.extractTestLogs()
    }) : void 0;
  };

  VerifierTest.prototype.processSingleGameResults = function(e) {
    this.goals = e.goalStates;
    this.frames = e.totalFrames;
    this.lastFrameHash = e.lastFrameHash;
    this.simulationFrameRate = e.simulationFrameRate;
    this.state = 'complete';
    this.reportResults();
    return this.scheduleCleanup();
  };

  VerifierTest.prototype.isSuccessful = function(careAboutFrames) {
    var k;
    if (careAboutFrames == null) {
      careAboutFrames = true;
    }
    if (this.solution == null) {
      return false;
    }
    if (!(this.frames === this.solution.frameCount || !careAboutFrames)) {
      return false;
    }
    if (this.simulationFrameRate < 30) {
      return false;
    }
    if (this.goals && this.solution.goals) {
      for (k in this.goals) {
        if (!this.solution.goals[k]) {
          continue;
        }
        if (this.solution.goals[k] !== this.goals[k].status) {
          return false;
        }
      }
    }
    return true;
  };

  VerifierTest.prototype.onUserCodeProblem = function(e) {
    console.warn("Found user code problem:", e);
    this.userCodeProblems.push(e.problem);
    return this.reportResults();
  };

  VerifierTest.prototype.onNonUserCodeProblem = function(e) {
    console.error("Found non-user-code problem:", e);
    this.error = "Failed due to non-user-code problem: " + (JSON.stringify(e));
    this.state = 'error';
    this.reportResults();
    return this.scheduleCleanup();
  };

  VerifierTest.prototype.fail = function(e) {
    this.error = 'Failed due to infinite loop.';
    this.state = 'error';
    this.reportResults();
    return this.scheduleCleanup();
  };

  VerifierTest.prototype.scheduleCleanup = function() {
    return setTimeout(this.cleanup, 100);
  };

  VerifierTest.prototype.cleanup = function() {
    if (this.levelLoader) {
      this.stopListening(this.levelLoader);
      this.levelLoader.destroy();
    }
    if (this.god) {
      this.stopListening(this.god);
      this.god.destroy();
    }
    return this.world = null;
  };

  return VerifierTest;

})(CocoClass);
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
//# sourceMappingURL=/javascripts/app/views/editor.js.map