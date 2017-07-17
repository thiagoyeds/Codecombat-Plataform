require.register("templates/admin/pending-patches-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,patches = locals_.patches,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><h1>Patches</h1><table id=\"patches\" class=\"table table-striped table-bordered table-condensed\"><tbody>");
// iterate patches
;(function(){
  var $$obj = patches;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var patch = $$obj[$index];

buf.push("<tr><td>" + (jade.escape((jade.interp = patch.target.collection) == null ? '' : jade.interp)) + "</td><td>");
if ( patch.url)
{
buf.push("<a" + (jade.attrs({ 'href':(patch.url) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = patch.name) ? "" : jade.interp)) + "</a>");
}
else
{
buf.push("<span>" + (jade.escape(null == (jade.interp = patch.target.original) ? "" : jade.interp)) + "</span>");
}
buf.push("</td><td>" + (jade.escape((jade.interp = patch.creatorName) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = patch.commitMessage) == null ? '' : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var patch = $$obj[$index];

buf.push("<tr><td>" + (jade.escape((jade.interp = patch.target.collection) == null ? '' : jade.interp)) + "</td><td>");
if ( patch.url)
{
buf.push("<a" + (jade.attrs({ 'href':(patch.url) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = patch.name) ? "" : jade.interp)) + "</a>");
}
else
{
buf.push("<span>" + (jade.escape(null == (jade.interp = patch.target.original) ? "" : jade.interp)) + "</span>");
}
buf.push("</td><td>" + (jade.escape((jade.interp = patch.creatorName) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = patch.commitMessage) == null ? '' : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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

;require.register("views/admin/PendingPatchesView", function(exports, require, module) {
var CocoCollection, Patch, PendingPatchesCollection, PendingPatchesView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/admin/pending-patches-view');

CocoCollection = require('collections/CocoCollection');

Patch = require('models/Patch');

PendingPatchesCollection = (function(superClass) {
  extend(PendingPatchesCollection, superClass);

  function PendingPatchesCollection() {
    return PendingPatchesCollection.__super__.constructor.apply(this, arguments);
  }

  PendingPatchesCollection.prototype.url = '/db/patch?view=pending';

  PendingPatchesCollection.prototype.model = Patch;

  return PendingPatchesCollection;

})(CocoCollection);

module.exports = PendingPatchesView = (function(superClass) {
  extend(PendingPatchesView, superClass);

  PendingPatchesView.prototype.id = 'pending-patches-view';

  PendingPatchesView.prototype.template = template;

  function PendingPatchesView(options) {
    PendingPatchesView.__super__.constructor.call(this, options);
    this.nameMap = {};
    this.patches = this.supermodel.loadCollection(new PendingPatchesCollection(), 'patches', {
      cache: false
    }).model;
  }

  PendingPatchesView.prototype.onLoaded = function() {
    PendingPatchesView.__super__.onLoaded.call(this);
    this.loadUserNames();
    return this.loadAllModelNames();
  };

  PendingPatchesView.prototype.getRenderData = function() {
    var c, comparator, i, len, name, patch, patches, ref;
    c = PendingPatchesView.__super__.getRenderData.call(this);
    c.patches = [];
    if (this.supermodel.finished()) {
      comparator = function(m) {
        return m.target.collection + ' ' + m.target.original;
      };
      patches = _.sortBy((function() {
        var i, len, ref, results;
        ref = this.patches.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          patch = ref[i];
          results.push(_.clone(patch.attributes));
        }
        return results;
      }).call(this), comparator);
      c.patches = _.uniq(patches, comparator);
      ref = c.patches;
      for (i = 0, len = ref.length; i < len; i++) {
        patch = ref[i];
        patch.creatorName = this.nameMap[patch.creator] || patch.creator;
        if (name = this.nameMap[patch.target.original]) {
          patch.name = name;
          patch.slug = _.string.slugify(name);
          patch.url = '/editor/' + (function() {
            switch (patch.target.collection) {
              case 'level':
              case 'achievement':
              case 'article':
              case 'campaign':
              case 'poll':
                return patch.target.collection + "/" + patch.slug;
              case 'thang_type':
                return "thang/" + patch.slug;
              case 'level_system':
              case 'level_component':
                return "level/items?" + patch.target.collection + "=" + patch.slug;
              case 'course':
                return "course/" + patch.slug;
              default:
                console.log("Where do we review a " + patch.target.collection + " patch?");
                return '';
            }
          })();
        }
      }
    }
    return c;
  };

  PendingPatchesView.prototype.loadUserNames = function() {
    var i, id, ids, len, patch, ref, success, userNamesRequest;
    ids = [];
    ref = this.patches.models;
    for (i = 0, len = ref.length; i < len; i++) {
      patch = ref[i];
      if (!(id = patch.get('creator'))) {
        console.error('Found bad user ID in malformed patch', patch);
        continue;
      }
      if (!this.nameMap[id]) {
        ids.push(id);
      }
    }
    ids = _.uniq(ids);
    if (!ids.length) {
      return;
    }
    success = (function(_this) {
      return function(nameMap) {
        var creator, creatorID, j, len1, name, ref1;
        if (_this.destroyed) {
          return;
        }
        ref1 = _this.patches.models;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          patch = ref1[j];
          creatorID = patch.get('creator');
          if (_this.nameMap[creatorID]) {
            continue;
          }
          creator = nameMap[creatorID];
          name = creator != null ? creator.name : void 0;
          if (creator != null ? creator.firstName : void 0) {
            name || (name = creator.firstName + ' ' + creator.lastName);
          }
          if (creator) {
            name || (name = "Anonymous " + (creatorID.substr(18)));
          }
          name || (name = '<bad patch data>');
          if (name.length > 21) {
            name = name.substr(0, 18) + '...';
          }
          _this.nameMap[creatorID] = name;
        }
        return _this.render();
      };
    })(this);
    userNamesRequest = this.supermodel.addRequestResource('user_names', {
      url: '/db/user/-/names',
      data: {
        ids: ids
      },
      method: 'POST',
      success: success
    }, 0);
    return userNamesRequest.load();
  };

  PendingPatchesView.prototype.loadAllModelNames = function() {
    var allPatches, collection, p, patches, results;
    allPatches = (function() {
      var i, len, ref, results;
      ref = this.patches.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        results.push(p.attributes);
      }
      return results;
    }).call(this);
    allPatches = _.groupBy(allPatches, function(p) {
      return p.target.collection;
    });
    results = [];
    for (collection in allPatches) {
      patches = allPatches[collection];
      results.push(this.loadCollectionModelNames(collection, patches));
    }
    return results;
  };

  PendingPatchesView.prototype.loadCollectionModelNames = function(collection, patches) {
    var ids, modelNamesRequest, patch, success;
    ids = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = patches.length; i < len; i++) {
        patch = patches[i];
        if (!this.nameMap[patch.target.original]) {
          results.push(patch.target.original);
        }
      }
      return results;
    }).call(this);
    ids = _.uniq(ids);
    if (!ids.length) {
      return;
    }
    success = (function(_this) {
      return function(nameMapArray) {
        var i, j, len, len1, model, modelIndex, name, nameMap, original;
        if (_this.destroyed) {
          return;
        }
        nameMap = {};
        for (modelIndex = i = 0, len = nameMapArray.length; i < len; modelIndex = ++i) {
          model = nameMapArray[modelIndex];
          if (!model) {
            console.warn("No model found for id " + ids[modelIndex]);
            continue;
          }
          nameMap[model.original || model._id] = model.name;
        }
        for (j = 0, len1 = patches.length; j < len1; j++) {
          patch = patches[j];
          original = patch.target.original;
          name = nameMap[original];
          if (name && name.length > 60) {
            name = name.substr(0, 57) + '...';
          }
          _this.nameMap[original] = name;
        }
        return _this.render();
      };
    })(this);
    modelNamesRequest = this.supermodel.addRequestResource('patches', {
      url: "/db/" + (collection.replace('_', '.')) + "/names",
      data: {
        ids: ids
      },
      method: 'POST',
      success: success
    }, 0);
    return modelNamesRequest.load();
  };

  return PendingPatchesView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/PendingPatchesView.js.map