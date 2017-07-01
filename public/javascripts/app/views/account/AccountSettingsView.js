require.register("templates/account/account-settings-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,isProduction = locals_.isProduction,view = locals_.view;if ( me.get('anonymous'))
{
buf.push("<div data-i18n=\"account_settings.not_logged_in\" class=\"alert alert-danger\">Log in or create an account to change your settings.</div>");
}
else
{
buf.push("<div class=\"row\"><div class=\"col-md-6\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><div data-i18n=\"account_settings.me_tab\" class=\"panel-title\"></div></div><div class=\"panel-body\"><div class=\"form\">");
var name = me.get('name') || '';
var firstName = me.get('firstName') || '';
var lastName = me.get('lastName') || '';
var email = me.get('email') || '';
var admin = me.get('permissions', true).indexOf('admin') != -1;
var godmode = me.get('permissions', true).indexOf('godmode') != -1;
buf.push("<div class=\"form-group\"><label for=\"name\" data-i18n=\"general.username\" class=\"control-label\"></label><input" + (jade.attrs({ 'id':('name-input'), 'name':("name"), 'type':("text"), 'value':("" + (name) + ""), "class": [('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div><div class=\"form-group\"><label for=\"email\" class=\"control-label\"><span data-i18n=\"general.email\"></span></label>");
if (!( me.get('emailVerified')))
{
buf.push("<span class=\"spl\">(</span><span data-i18n=\"account.not_yet_verified\" class=\"spr\"></span><a class=\"resend-verification-email\"><span data-i18n=\"account.resend_email\" class=\"resend-text\"></span><span data-i18n=\"account.email_sent\" class=\"sent-text hide\"></span></a><span>)</span>");
}
buf.push("<input" + (jade.attrs({ 'id':('email'), 'name':("email"), 'type':("text"), 'value':("" + (email) + ""), "class": [('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div><div class=\"row\"><div class=\"form-group col-sm-6\"><label for=\"firstName\" data-i18n=\"general.first_name\" class=\"control-label\"></label><input" + (jade.attrs({ 'id':('first-name-input'), 'name':("firstName"), 'type':("text"), 'value':("" + (firstName) + ""), "class": [('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div><div class=\"form-group col-sm-6\">");
if ( me.isStudent())
{
buf.push("<label for=\"lastName\" data-i18n=\"general.last_initial\" class=\"control-label\"></label><input" + (jade.attrs({ 'id':('last-name-input'), 'name':("lastName"), 'type':("text"), 'value':("" + (lastName) + ""), 'maxlength':("1"), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"maxlength":true})) + "/>");
}
else
{
buf.push("<label for=\"lastName\" data-i18n=\"general.last_name\" class=\"control-label\"></label><input" + (jade.attrs({ 'id':('last-name-input'), 'name':("lastName"), 'type':("text"), 'value':("" + (lastName) + ""), "class": [('form-control')] }, {"name":true,"type":true,"value":true})) + "/>");
}
buf.push("</div></div>");
if ( !isProduction)
{
buf.push("<div class=\"form-group checkbox\"><label for=\"admin\" data-i18n=\"account_settings.admin\"></label><input" + (jade.attrs({ 'id':('admin'), 'name':("admin"), 'type':("checkbox"), 'checked':(admin) }, {"name":true,"type":true,"checked":true})) + "/></div><div class=\"form-group checkbox\"><label for=\"godmode\" data-i18n=\"account_settings.god_mode\"></label><input" + (jade.attrs({ 'id':('godmode'), 'name':("godmode"), 'type':("checkbox"), 'checked':(godmode) }, {"name":true,"type":true,"checked":true})) + "/></div>");
}
if ( me.hasSubscription())
{
buf.push("<div class=\"form-group\"><label data-i18n=\"account.subscription\"></label><br/><span class=\"spr\">✓</span><span data-i18n=\"account.active\"></span><span class=\"spr\">" + (jade.escape(null == (jade.interp = '.') ? "" : jade.interp)) + "</span><!-- TODO: show better summary states, like active, subscribed, free, and active until.--><a href=\"/account/subscription\" data-i18n=\"account_settings.manage_subscription\"></a></div>");
}
buf.push("</div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><div data-i18n=\"account_settings.picture_tab\" class=\"panel-title\"></div></div><div id=\"profile-photo-panel-body\" class=\"panel-body\"><img" + (jade.attrs({ 'src':(me.getPhotoURL(230)), 'draggable':("false"), "class": [('profile-photo')] }, {"src":true,"draggable":true})) + "/><input" + (jade.attrs({ 'id':('photoURL'), 'type':("hidden"), 'value':(me.get('photoURL')||'') }, {"type":true,"value":true})) + "/><button id=\"upload-photo-button\" data-i18n=\"account_settings.upload_picture\" class=\"btn form-control btn-primary\"></button></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><div data-i18n=\"general.password\" class=\"panel-title\"></div></div><div class=\"panel-body\"><div class=\"form\"><div class=\"form-group\"><label for=\"password\" data-i18n=\"account_settings.new_password\" class=\"control-label\">New Password</label><input id=\"password\" name=\"password\" type=\"password\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"password2\" data-i18n=\"account_settings.new_password_verify\" class=\"control-label\">Verify</label><input id=\"password2\" name=\"password2\" type=\"password\" class=\"form-control\"/></div></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><div id=\"delete-account-panel-title\" data-i18n=\"account_settings.delete_account_tab\" class=\"panel-title\"></div></div><div class=\"panel-body\"><div id=\"delete-account-form\" class=\"form\"><div class=\"form-group\"><label for=\"delete-account-email-or-username\" data-i18n=\"account_settings.type_in_email\" class=\"control-label\"></label><input id=\"delete-account-email-or-username\" name=\"emailOrUsername\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"delete-account-password\" data-i18n=\"account_settings.type_in_password\" class=\"control-label\"></label><input id=\"delete-account-password\" name=\"password\" type=\"password\" class=\"form-control\"/></div></div><button id=\"delete-account-btn\" data-i18n=\"account_settings.delete_this_account\" class=\"btn form-control btn-primary\"></button></div></div></div><div class=\"col-md-6\">");
var subs = view.getEmailSubsDict();
buf.push("<div id=\"email-panel\" class=\"panel panel-default\"><div class=\"panel-heading\"><div data-i18n=\"account_settings.emails_tab\" class=\"panel-title\"></div></div><div class=\"panel-body\"><div class=\"form\"><div class=\"form-group checkbox\"><label for=\"email_generalNews\" data-i18n=\"account_settings.email_announcements\" class=\"control-label\">Announcements</label><input" + (jade.attrs({ 'id':('email_generalNews'), 'name':("email_generalNews"), 'type':("checkbox"), 'checked':(subs.generalNews) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"account_settings.email_announcements_description\" class=\"help-block\">Get emails on the latest news and developments at CodeCombat.</span></div></div><hr/><h4 data-i18n=\"account_settings.email_notifications\">Notifications</h4><span data-i18n=\"account_settings.email_notifications_summary\">Controls for personalized, automatic email notifications related to your CodeCombat activity.</span><div class=\"form\"><div class=\"form-group checkbox\"><label for=\"email_anyNotes\" data-i18n=\"account_settings.email_any_notes\" class=\"control-label\">Any Notifications</label><input" + (jade.attrs({ 'id':('email_anyNotes'), 'name':("email_anyNotes"), 'type':("checkbox"), 'checked':(subs.anyNotes) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"account_settings.email_any_notes_description\" class=\"help-block\">Disable to stop all activity notification emails.</span></div><fieldset id=\"specific-notification-settings\"><div class=\"form-group checkbox\"><label for=\"email_recruitNotes\" data-i18n=\"account_settings.email_recruit_notes\" class=\"control-label\">Job Opportunities</label><input" + (jade.attrs({ 'id':('email_recruitNotes'), 'name':("email_recruitNotes"), 'type':("checkbox"), 'checked':(subs.recruitNotes) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"account_settings.email_recruit_notes_description\" class=\"help-block\">If you play really well, we may contact you about getting you a (better) job.</span></div></fieldset></div><hr/><h4 data-i18n=\"account_settings.contributor_emails\">Contributor Class Emails</h4><span data-i18n=\"account_settings.contribute_prefix\">We\\'re looking for people to join our party! Check out the </span><a href=\"/contribute\" data-i18n=\"account_settings.contribute_page\">contribute page</a><span data-i18n=\"account_settings.contribute_suffix\"> to find out more.</span><div class=\"form\"><div class=\"form-group checkbox\"><label for=\"email_archmageNews\" class=\"control-label\"><span data-i18n=\"classes.archmage_title\">Archmage</span> <span data-i18n=\"classes.archmage_title_description\">(Coder)</span></label><input" + (jade.attrs({ 'id':('email_archmageNews'), 'name':("email_archmageNews"), 'type':("checkbox"), 'checked':(subs.archmageNews) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"contribute.archmage_subscribe_desc\" class=\"help-block\">Get emails about general news and announcements about CodeCombat.</span></div><div class=\"form-group checkbox\"><label for=\"email_artisanNews\" class=\"control-label\"><span data-i18n=\"classes.artisan_title\">Artisan</span> <span data-i18n=\"classes.artisan_title_description\">(Level Builder)</span></label><input" + (jade.attrs({ 'id':('email_artisanNews'), 'name':("email_artisanNews"), 'type':("checkbox"), 'checked':(subs.artisanNews) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"contribute.artisan_subscribe_desc\" class=\"help-block\">Get emails on level editor updates and announcements.</span></div><div class=\"form-group checkbox\"><label for=\"email_adventurerNews\" class=\"control-label\"><span data-i18n=\"classes.adventurer_title\">Adventurer</span> <span data-i18n=\"classes.adventurer_title_description\"> \n(Level Playtester)</span></label><input" + (jade.attrs({ 'id':('email_adventurerNews'), 'name':("email_adventurerNews"), 'type':("checkbox"), 'checked':(subs.adventurerNews) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"contribute.adventurer_subscribe_desc\" class=\"help-block\">Get emails when there are new levels to test.</span></div><div class=\"form-group checkbox\"><label for=\"email_scribeNews\" class=\"control-label\"><span data-i18n=\"classes.scribe_title\">Scribe</span> <span data-i18n=\"classes.scribe_title_description\">(Article Editor)</span></label><input" + (jade.attrs({ 'id':('email_scribeNews'), 'name':("email_scribeNews"), 'type':("checkbox"), 'checked':(subs.scribeNews) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"contribute.scribe_subscribe_desc\" class=\"help-block\">Get emails about article writing announcements.</span></div><div class=\"form-group checkbox\"><label for=\"email_diplomatNews\" class=\"control-label\"><span data-i18n=\"classes.diplomat_title\">Diplomat</span> <span data-i18n=\"classes.diplomat_title_description\">(Translator)</span></label><input" + (jade.attrs({ 'id':('email_diplomatNews'), 'name':("email_diplomatNews"), 'type':("checkbox"), 'checked':(subs.diplomatNews) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"contribute.diplomat_subscribe_desc\" class=\"help-block\">Get emails about i18n developments and, eventually, levels to translate.</span></div><div class=\"form-group checkbox\"><label for=\"email_ambassadorNews\" class=\"control-label\"><span data-i18n=\"classes.ambassador_title\">Ambassador</span> <span data-i18n=\"classes.ambassador_title_description\">(Support)</span></label><input" + (jade.attrs({ 'id':('email_ambassadorNews'), 'name':("email_ambassadorNews"), 'type':("checkbox"), 'checked':(subs.ambassadorNews) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"contribute.ambassador_subscribe_desc\" class=\"help-block\">Get emails on support updates and multiplayer developments.</span></div><div class=\"form-group checkbox\"><label for=\"email_teacherNews\" class=\"control-label\"><span data-i18n=\"classes.teacher_title\"></span></label><input" + (jade.attrs({ 'id':('email_teacherNews'), 'name':("email_teacherNews"), 'type':("checkbox"), 'checked':(subs.teacherNews) }, {"name":true,"type":true,"checked":true})) + "/><span data-i18n=\"contribute.teacher_subscribe_desc\" class=\"help-block\"></span></div><button id=\"toggle-all-btn\" data-i18n=\"account_settings.email_toggle\" class=\"btn btn-primary form-control\">Toggle All</button></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><div id=\"reset-progress-panel-title\" data-i18n=\"account_settings.reset_progress_tab\" class=\"panel-title\"></div></div><div class=\"panel-body\"><div id=\"reset-progress-form\" class=\"form\"><div class=\"form-group\"><label for=\"email-reset-progress\" data-i18n=\"account_settings.type_in_email_progress\" class=\"control-label\"></label><input id=\"email-reset-progress\" name=\"emailOrUsername\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"password-reset-progress\" data-i18n=\"account_settings.type_in_password\" class=\"control-label\"></label><input id=\"password-reset-progress\" name=\"password\" type=\"password\" class=\"form-control\"/></div></div><button id=\"reset-progress-btn\" data-i18n=\"account_settings.reset_your_progress\" class=\"btn form-control btn-primary\"></button></div></div></div></div>");
}
buf.push("<div class=\"clearfix\"></div>");;return buf.join("");
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

;require.register("views/account/AccountSettingsView", function(exports, require, module) {
var AccountSettingsView, CocoView, ConfirmModal, User, forms, logoutUser, me, ref, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/account/account-settings-view');

forms = require('core/forms');

User = require('models/User');

ConfirmModal = require('views/core/ConfirmModal');

ref = require('core/auth'), logoutUser = ref.logoutUser, me = ref.me;

module.exports = AccountSettingsView = (function(superClass) {
  extend(AccountSettingsView, superClass);

  function AccountSettingsView() {
    this.onPictureChanged = bind(this.onPictureChanged, this);
    return AccountSettingsView.__super__.constructor.apply(this, arguments);
  }

  AccountSettingsView.prototype.id = 'account-settings-view';

  AccountSettingsView.prototype.template = template;

  AccountSettingsView.prototype.className = 'countainer-fluid';

  AccountSettingsView.prototype.events = {
    'change .panel input': 'onChangePanelInput',
    'change #name-input': 'onChangeNameInput',
    'click #toggle-all-btn': 'onClickToggleAllButton',
    'click #profile-photo-panel-body': 'onClickProfilePhotoPanelBody',
    'click #delete-account-btn': 'onClickDeleteAccountButton',
    'click #reset-progress-btn': 'onClickResetProgressButton',
    'click .resend-verification-email': 'onClickResendVerificationEmail'
  };

  AccountSettingsView.prototype.initialize = function() {
    if (!window.application.isIPadApp) {
      require('core/services/filepicker')();
    }
    this.uploadFilePath = "db/user/" + me.id;
    this.user = new User({
      _id: me.id
    });
    return this.supermodel.trackRequest(this.user.fetch());
  };

  AccountSettingsView.prototype.getEmailSubsDict = function() {
    var j, len, ref1, sub, subs;
    subs = {};
    ref1 = this.user.getEnabledEmails();
    for (j = 0, len = ref1.length; j < len; j++) {
      sub = ref1[j];
      subs[sub] = 1;
    }
    return subs;
  };

  AccountSettingsView.prototype.onChangePanelInput = function(e) {
    var ref1;
    if ((ref1 = $(e.target).closest('.form').attr('id')) === 'reset-progress-form' || ref1 === 'delete-account-form') {
      return;
    }
    $(e.target).addClass('changed');
    return this.trigger('input-changed');
  };

  AccountSettingsView.prototype.onClickToggleAllButton = function() {
    var subs;
    subs = this.getSubscriptions();
    $('#email-panel input[type="checkbox"]', this.$el).prop('checked', !_.any(_.values(subs))).addClass('changed');
    return this.trigger('input-changed');
  };

  AccountSettingsView.prototype.onChangeNameInput = function() {
    var name;
    name = $('#name-input', this.$el).val();
    if (name === this.user.get('name')) {
      return;
    }
    return User.getUnconflictedName(name, (function(_this) {
      return function(newName) {
        forms.clearFormAlerts(_this.$el);
        if (name === newName) {
          return _this.suggestedName = void 0;
        } else {
          _this.suggestedName = newName;
          return forms.setErrorToProperty(_this.$el, 'name', "That name is taken! How about " + newName + "?", true);
        }
      };
    })(this));
  };

  AccountSettingsView.prototype.onPictureChanged = function(e) {
    this.trigger('inputChanged', e);
    return this.$el.find('.gravatar-fallback').toggle(!this.user.get('photoURL'));
  };

  AccountSettingsView.prototype.onClickDeleteAccountButton = function(e) {
    return this.validateCredentialsForDestruction(this.$el.find('#delete-account-form'), (function(_this) {
      return function() {
        var confirmModal, renderData;
        renderData = {
          title: 'Are you really sure?',
          body: 'This will completely delete your account. This action CANNOT be undone. Are you entirely sure?',
          decline: 'Cancel',
          confirm: 'DELETE Your Account'
        };
        confirmModal = new ConfirmModal(renderData);
        confirmModal.on('confirm', _this.deleteAccount, _this);
        return _this.openModalView(confirmModal);
      };
    })(this));
  };

  AccountSettingsView.prototype.onClickResetProgressButton = function() {
    return this.validateCredentialsForDestruction(this.$el.find('#reset-progress-form'), (function(_this) {
      return function() {
        var confirmModal, renderData;
        renderData = {
          title: 'Are you really sure?',
          body: 'This will completely erase your progress: code, levels, achievements, earned gems, and course work. This action CANNOT be undone. Are you entirely sure?',
          decline: 'Cancel',
          confirm: 'Erase ALL Progress'
        };
        confirmModal = new ConfirmModal(renderData);
        confirmModal.on('confirm', _this.resetProgress, _this);
        return _this.openModalView(confirmModal);
      };
    })(this));
  };

  AccountSettingsView.prototype.onClickResendVerificationEmail = function(e) {
    return $.post(this.user.getRequestVerificationEmailURL(), function() {
      var link;
      link = $(e.currentTarget);
      link.find('.resend-text').addClass('hide');
      return link.find('.sent-text').removeClass('hide');
    });
  };

  AccountSettingsView.prototype.validateCredentialsForDestruction = function($form, onSuccess) {
    var callback, enteredEmailOrUsername, enteredPassword, err, isPasswordCorrect, message, toBeDelayed;
    forms.clearFormAlerts($form);
    enteredEmailOrUsername = $form.find('input[name="emailOrUsername"]').val();
    enteredPassword = $form.find('input[name="password"]').val();
    if (enteredEmailOrUsername && (enteredEmailOrUsername === this.user.get('email') || enteredEmailOrUsername === this.user.get('name'))) {
      isPasswordCorrect = false;
      toBeDelayed = true;
      $.ajax({
        url: '/auth/login',
        type: 'POST',
        data: {
          username: enteredEmailOrUsername,
          password: enteredPassword
        },
        parse: true,
        error: function(error) {
          toBeDelayed = false;
          return 'Bad Error. Can\'t connect to server or something. ' + error;
        },
        success: function(response, textStatus, jqXHR) {
          toBeDelayed = false;
          if (jqXHR.status !== 200) {
            return;
          }
          return isPasswordCorrect = true;
        }
      });
      callback = (function(_this) {
        return function() {
          var err, message;
          if (toBeDelayed) {
            return setTimeout(callback, 100);
          } else {
            if (isPasswordCorrect) {
              return onSuccess();
            } else {
              message = $.i18n.t('account_settings.wrong_password', {
                defaultValue: 'Wrong Password.'
              });
              err = [
                {
                  message: message,
                  property: 'password',
                  formatted: true
                }
              ];
              forms.applyErrorsToForm($form, err);
              return $('.nano').nanoScroller({
                scrollTo: _this.$el.find('.has-error')
              });
            }
          }
        };
      })(this);
      return setTimeout(callback, 100);
    } else {
      message = $.i18n.t('account_settings.wrong_email', {
        defaultValue: 'Wrong Email.'
      });
      err = [
        {
          message: message,
          property: 'email',
          formatted: true
        }
      ];
      forms.applyErrorsToForm($form, err);
      return $('.nano').nanoScroller({
        scrollTo: this.$el.find('.has-error')
      });
    }
  };

  AccountSettingsView.prototype.deleteAccount = function() {
    return $.ajax({
      type: 'DELETE',
      success: function() {
        noty({
          timeout: 5000,
          text: 'Your account is gone.',
          type: 'success',
          layout: 'topCenter'
        });
        return _.delay(function() {
          var ref1, ref2, ref3, ref4;
          if (window.application.isIPadApp) {
            if (typeof window !== "undefined" && window !== null) {
              if ((ref1 = window.webkit) != null) {
                if ((ref2 = ref1.messageHandlers) != null) {
                  if ((ref3 = ref2.notification) != null) {
                    ref3.postMessage({
                      name: "signOut"
                    });
                  }
                }
              }
            }
          }
          Backbone.Mediator.publish("auth:logging-out", {});
          if (this.id === 'home-view') {
            if ((ref4 = window.tracker) != null) {
              ref4.trackEvent('Log Out', {
                category: 'Homepage'
              });
            }
          }
          return logoutUser($('#login-email').val());
        }, 500);
      },
      error: function(jqXHR, status, error) {
        console.error(jqXHR);
        return noty({
          timeout: 5000,
          text: "Deleting account failed with error code " + jqXHR.status,
          type: 'error',
          layout: 'topCenter'
        });
      },
      url: "/db/user/" + this.user.id
    });
  };

  AccountSettingsView.prototype.resetProgress = function() {
    return $.ajax({
      type: 'POST',
      success: (function(_this) {
        return function() {
          noty({
            timeout: 5000,
            text: 'Your progress is gone.',
            type: 'success',
            layout: 'topCenter'
          });
          localStorage.clear();
          _this.user.fetch({
            cache: false
          });
          return _.delay((function() {
            return window.location.reload();
          }), 1000);
        };
      })(this),
      error: function(jqXHR, status, error) {
        console.error(jqXHR);
        return noty({
          timeout: 5000,
          text: "Resetting progress failed with error code " + jqXHR.status,
          type: 'error',
          layout: 'topCenter'
        });
      },
      url: "/db/user/" + this.user.id + "/reset_progress"
    });
  };

  AccountSettingsView.prototype.onClickProfilePhotoPanelBody = function(e) {
    var onSaved, onSaving, photoContainer;
    if (window.application.isIPadApp) {
      return;
    }
    photoContainer = this.$el.find('.profile-photo');
    onSaving = (function(_this) {
      return function() {
        return photoContainer.addClass('saving');
      };
    })(this);
    onSaved = (function(_this) {
      return function(uploadingPath) {
        _this.$el.find('#photoURL').val(uploadingPath);
        _this.$el.find('#photoURL').trigger('change');
        _this.user.set('photoURL', uploadingPath);
        return photoContainer.removeClass('saving').attr('src', _this.user.getPhotoURL(photoContainer.width()));
      };
    })(this);
    return filepicker.pick({
      mimetypes: 'image/*'
    }, this.onImageChosen(onSaving, onSaved));
  };

  AccountSettingsView.prototype.formatImagePostData = function(inkBlob) {
    return {
      url: inkBlob.url,
      filename: inkBlob.filename,
      mimetype: inkBlob.mimetype,
      path: this.uploadFilePath,
      force: true
    };
  };

  AccountSettingsView.prototype.onImageChosen = function(onSaving, onSaved) {
    return (function(_this) {
      return function(inkBlob) {
        var data, success, uploadingPath;
        onSaving();
        uploadingPath = [_this.uploadFilePath, inkBlob.filename].join('/');
        data = _this.formatImagePostData(inkBlob);
        success = _this.onImageUploaded(onSaved, uploadingPath);
        return $.ajax('/file', {
          type: 'POST',
          data: data,
          success: success
        });
      };
    })(this);
  };

  AccountSettingsView.prototype.onImageUploaded = function(onSaved, uploadingPath) {
    return (function(_this) {
      return function(e) {
        return onSaved(uploadingPath);
      };
    })(this);
  };

  AccountSettingsView.prototype.getSubscriptions = function() {
    var emailNames, enableds, i, inputs;
    inputs = (function() {
      var j, len, ref1, results;
      ref1 = $('#email-panel input[type="checkbox"].changed', this.$el);
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        i = ref1[j];
        results.push($(i));
      }
      return results;
    }).call(this);
    emailNames = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = inputs.length; j < len; j++) {
        i = inputs[j];
        results.push(i.attr('name').replace('email_', ''));
      }
      return results;
    })();
    enableds = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = inputs.length; j < len; j++) {
        i = inputs[j];
        results.push(i.prop('checked'));
      }
      return results;
    })();
    return _.zipObject(emailNames, enableds);
  };

  AccountSettingsView.prototype.save = function() {
    var res;
    $('#settings-tabs input').removeClass('changed');
    forms.clearFormAlerts(this.$el);
    this.grabData();
    res = this.user.validate();
    if (res != null) {
      console.error('Couldn\'t save because of validation errors:', res);
      forms.applyErrorsToForm(this.$el, res);
      $('.nano').nanoScroller({
        scrollTo: this.$el.find('.has-error')
      });
      return;
    }
    if (!this.user.hasLocalChanges()) {
      return;
    }
    res = this.user.patch();
    if (!res) {
      return;
    }
    res.error((function(_this) {
      return function() {
        var errors, ref1, ref2;
        if ((ref1 = res.responseJSON) != null ? ref1.property : void 0) {
          errors = res.responseJSON;
          forms.applyErrorsToForm(_this.$el, errors);
          $('.nano').nanoScroller({
            scrollTo: _this.$el.find('.has-error')
          });
        } else {
          noty({
            text: ((ref2 = res.responseJSON) != null ? ref2.message : void 0) || res.responseText,
            type: 'error',
            layout: 'topCenter',
            timeout: 5000
          });
        }
        return _this.trigger('save-user-error');
      };
    })(this));
    res.success((function(_this) {
      return function(model, response, options) {
        me.set(model);
        return _this.trigger('save-user-success');
      };
    })(this));
    return this.trigger('save-user-began');
  };

  AccountSettingsView.prototype.grabData = function() {
    this.grabPasswordData();
    return this.grabOtherData();
  };

  AccountSettingsView.prototype.grabPasswordData = function() {
    var bothThere, err, message, password1, password2;
    password1 = $('#password', this.$el).val();
    password2 = $('#password2', this.$el).val();
    bothThere = Boolean(password1) && Boolean(password2);
    if (bothThere && password1 !== password2) {
      message = $.i18n.t('account_settings.password_mismatch', {
        defaultValue: 'Password does not match.'
      });
      err = [
        {
          message: message,
          property: 'password2',
          formatted: true
        }
      ];
      forms.applyErrorsToForm(this.$el, err);
      $('.nano').nanoScroller({
        scrollTo: this.$el.find('.has-error')
      });
      return;
    }
    if (bothThere) {
      return this.user.set('password', password1);
    } else if (password1) {
      message = $.i18n.t('account_settings.password_repeat', {
        defaultValue: 'Please repeat your password.'
      });
      err = [
        {
          message: message,
          property: 'password2',
          formatted: true
        }
      ];
      forms.applyErrorsToForm(this.$el, err);
      return $('.nano').nanoScroller({
        scrollTo: this.$el.find('.has-error')
      });
    }
  };

  AccountSettingsView.prototype.grabOtherData = function() {
    var adminCheckbox, emailName, enabled, godmodeCheckbox, permissions, ref1;
    if (this.suggestedName) {
      this.$el.find('#name-input').val(this.suggestedName);
    }
    this.user.set('name', this.$el.find('#name-input').val());
    this.user.set('firstName', this.$el.find('#first-name-input').val());
    this.user.set('lastName', this.$el.find('#last-name-input').val());
    this.user.set('email', this.$el.find('#email').val());
    ref1 = this.getSubscriptions();
    for (emailName in ref1) {
      enabled = ref1[emailName];
      this.user.setEmailSubscription(emailName, enabled);
    }
    this.user.set('photoURL', this.$el.find('#photoURL').val());
    permissions = [];
    if (!application.isProduction()) {
      adminCheckbox = this.$el.find('#admin');
      if (adminCheckbox.length) {
        if (adminCheckbox.prop('checked')) {
          permissions.push('admin');
        }
      }
      godmodeCheckbox = this.$el.find('#godmode');
      if (godmodeCheckbox.length) {
        if (godmodeCheckbox.prop('checked')) {
          permissions.push('godmode');
        }
      }
      return this.user.set('permissions', permissions);
    }
  };

  return AccountSettingsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/account/AccountSettingsView.js.map