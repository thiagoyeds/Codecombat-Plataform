require.register("templates/editor/patch_modal", function(exports, require, module) {
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

;
//# sourceMappingURL=/javascripts/app/views/editor/PatchModal.js.map