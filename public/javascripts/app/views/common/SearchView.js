require.register("templates/common/search-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,unauthorized = locals_.unauthorized,currentEditor = locals_.currentEditor,newModelsAdminOnly = locals_.newModelsAdminOnly,currentNewSignup = locals_.currentNewSignup,currentNew = locals_.currentNew,currentSearch = locals_.currentSearch,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
if ( !unauthorized)
{
buf.push("<div><ol class=\"breadcrumb\"><li><a href=\"/editor\" data-i18n=\"editor.main_title\">CodeCombat Editors</a></li><li" + (jade.attrs({ 'data-i18n':("" + (currentEditor) + ""), "class": [('active')] }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = currentEditor) == null ? '' : jade.interp)) + "</li></ol></div>");
if ( me.isAdmin() || !newModelsAdminOnly)
{
if ( me.get('anonymous'))
{
buf.push("<a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("core/CreateAccountModal"), 'role':("button"), 'data-i18n':("" + (currentNewSignup) + ""), "class": [('btn'),('btn-primary'),('open-modal-button')] }, {"data-toggle":true,"data-target":true,"role":true,"data-i18n":true})) + ">Log in to Create a New Something</a>");
}
else if ( view.canMakeNew)
{
buf.push("<a" + (jade.attrs({ 'id':('new-model-button'), 'data-i18n':("" + (currentNew) + ""), "class": [('btn'),('btn-primary'),('open-modal-button')] }, {"data-i18n":true})) + ">Create a New Something</a>");
}
}
buf.push("<input" + (jade.attrs({ 'id':('search'), 'data-i18n':("[placeholder]" + (currentSearch) + ""), 'placeholder':("Search") }, {"data-i18n":true,"placeholder":true})) + "/><hr/><div class=\"results\"><table></table></div>");
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

;require.register("views/common/SearchView", function(exports, require, module) {
var NewModelModal, RootView, SearchCollection, SearchView, app, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

RootView = require('views/core/RootView');

NewModelModal = require('views/editor/modal/NewModelModal');

template = require('templates/common/search-view');

app = require('core/application');

SearchCollection = (function(superClass) {
  extend(SearchCollection, superClass);

  function SearchCollection() {
    return SearchCollection.__super__.constructor.apply(this, arguments);
  }

  SearchCollection.prototype.initialize = function(modelURL, model, term1, projection) {
    var i, len, projected, ref, ref1;
    this.model = model;
    this.term = term1;
    this.projection = projection;
    this.url = modelURL + "?project=";
    if ((ref = this.projection) != null ? ref.length : void 0) {
      this.url += 'created,permissions';
      ref1 = this.projection;
      for (i = 0, len = ref1.length; i < len; i++) {
        projected = ref1[i];
        this.url += ',' + projected;
      }
    } else {
      this.url += 'true';
    }
    if (this.term) {
      return this.url += "&term=" + this.term;
    }
  };

  SearchCollection.prototype.comparator = function(a, b) {
    var score;
    score = 0;
    if (a.getOwner() === me.id) {
      score -= 9001900190019001;
    }
    if (b.getOwner() === me.id) {
      score += 9001900190019001;
    }
    score -= new Date(a.get('created'));
    score -= -(new Date(b.get('created')));
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

  return SearchCollection;

})(Backbone.Collection);

module.exports = SearchView = (function(superClass) {
  extend(SearchView, superClass);

  SearchView.prototype.template = template;

  SearchView.prototype.className = 'search-view';

  SearchView.prototype.modelLabel = '';

  SearchView.prototype.model = null;

  SearchView.prototype.modelURL = null;

  SearchView.prototype.tableTemplate = null;

  SearchView.prototype.projected = null;

  SearchView.prototype.canMakeNew = true;

  SearchView.prototype.events = {
    'change input#search': 'runSearch',
    'keydown input#search': 'runSearch',
    'click #new-model-button': 'newModel',
    'hidden.bs.modal #new-model-modal': 'onModalHidden'
  };

  function SearchView(options) {
    this.runSearch = bind(this.runSearch, this);
    this.runSearch = _.debounce(this.runSearch, 500);
    SearchView.__super__.constructor.call(this, options);
  }

  SearchView.prototype.afterRender = function() {
    var hash, ref, searchInput;
    SearchView.__super__.afterRender.call(this);
    hash = document.location.hash.slice(1);
    searchInput = this.$el.find('#search');
    if (hash != null) {
      searchInput.val(hash);
    }
    if ((ref = this.collection) != null) {
      delete ref.term;
    }
    searchInput.trigger('change');
    return searchInput.focus();
  };

  SearchView.prototype.runSearch = function() {
    var term;
    if (this.destroyed) {
      return;
    }
    term = this.$el.find('input#search').val();
    if (this.sameSearch(term)) {
      return;
    }
    this.removeOldSearch();
    this.collection = new SearchCollection(this.modelURL, this.model, term, this.projection);
    this.collection.term = term;
    this.listenTo(this.collection, 'sync', this.onSearchChange);
    this.showLoading(this.$el.find('.results'));
    this.updateHash(term);
    return this.collection.fetch();
  };

  SearchView.prototype.updateHash = function(term) {
    var currentPath, newPath;
    newPath = document.location.pathname + (term ? '#' + term : '');
    currentPath = document.location.pathname + document.location.hash;
    if (newPath !== currentPath) {
      return app.router.navigate(newPath);
    }
  };

  SearchView.prototype.sameSearch = function(term) {
    if (!this.collection) {
      return false;
    }
    return term === this.collection.term;
  };

  SearchView.prototype.onSearchChange = function() {
    var documents, table;
    this.hideLoading();
    this.collection.sort();
    documents = this.collection.models;
    table = $(this.tableTemplate({
      documents: documents,
      me: me,
      page: this.page,
      moment: moment
    }));
    this.$el.find('table').replaceWith(table);
    return this.$el.find('table').i18n();
  };

  SearchView.prototype.removeOldSearch = function() {
    if (this.collection == null) {
      return;
    }
    this.collection.off();
    return this.collection = null;
  };

  SearchView.prototype.onNewModelSaved = function(model) {
    var base;
    this.model = model;
    base = document.location.pathname.slice(1) + '/';
    return app.router.navigate(base + (this.model.get('slug') || this.model.id), {
      trigger: true
    });
  };

  SearchView.prototype.newModel = function(e) {
    var modal;
    modal = new NewModelModal({
      model: this.model,
      modelLabel: this.modelLabel
    });
    modal.once('model-created', this.onNewModelSaved);
    return this.openModalView(modal);
  };

  return SearchView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/common/SearchView.js.map