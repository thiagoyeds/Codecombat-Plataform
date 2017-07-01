require.register("templates/editor/modal/save-version-modal", function(exports, require, module) {
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

;
//# sourceMappingURL=/javascripts/app/views/editor/modal/SaveVersionModal.js.map