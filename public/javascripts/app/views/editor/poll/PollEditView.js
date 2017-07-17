require.register("templates/editor/poll/poll-edit-view", function(exports, require, module) {
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

;
//# sourceMappingURL=/javascripts/app/views/editor/poll/PollEditView.js.map