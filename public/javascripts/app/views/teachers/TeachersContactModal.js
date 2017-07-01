require.register("templates/teachers/teachers-contact-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),_ = locals_._,view = locals_.view;var formErrors_mixin = function(errors){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
if ( _.isString(errors))
{
errors = [errors]
}
if ( _.size(errors))
{
buf.push("<div class=\"help-block\">");
// iterate errors
;(function(){
  var $$obj = errors;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var error = $$obj[$index];

buf.push("<div>" + (jade.escape(null == (jade.interp = error) ? "" : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var error = $$obj[$index];

buf.push("<div>" + (jade.escape(null == (jade.interp = error) ? "" : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
}
};
buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"text-center\"><h3>Contact Our Classroom Team</h3></div></div><div class=\"modal-body\"><p>Send us a message and our classroom success team will be in touch to help find the best solution for your students' needs!</p><form>");
var sending = view.state.get('sendingState') === 'sending'
var sent = view.state.get('sendingState') === 'sent';
var values = view.state.get('formValues');
var errors = view.state.get('formErrors');
buf.push("<div" + (jade.attrs({ "class": [('form-group'),(errors.name ? 'has-error' : '')] }, {"class":true})) + "><label for=\"name\" data-i18n=\"general.name\" class=\"control-label\"></label>");
formErrors_mixin(errors.name);
buf.push("<input" + (jade.attrs({ 'name':("name"), 'type':("text"), 'value':(values.name || ''), 'tabindex':(1), 'disabled':(sending || sent), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"tabindex":true,"disabled":true})) + "/></div><div" + (jade.attrs({ "class": [('form-group'),(errors.email ? 'has-error' : '')] }, {"class":true})) + "><label for=\"email\" data-i18n=\"general.email\" class=\"control-label\"></label>");
formErrors_mixin(errors.email);
buf.push("<input" + (jade.attrs({ 'name':("email"), 'type':("email"), 'value':(values.email || ''), 'tabindex':(1), 'disabled':(sending || sent), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"tabindex":true,"disabled":true})) + "/></div><div" + (jade.attrs({ "class": [('form-group'),(errors.licensesNeeded ? 'has-error' : '')] }, {"class":true})) + "><label for=\"licensesNeeded\" data-i18n=\"teachers.licenses_needed\" class=\"control-label\"></label>");
formErrors_mixin(errors.licensesNeeded);
buf.push("<input" + (jade.attrs({ 'name':("licensesNeeded"), 'type':("text"), 'value':(values.licensesNeeded || ''), 'tabindex':(1), 'disabled':(sending || sent), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"tabindex":true,"disabled":true})) + "/></div><div" + (jade.attrs({ "class": [('form-group'),(errors.message ? 'has-error' : '')] }, {"class":true})) + "><label for=\"message\" data-i18n=\"general.message\" class=\"control-label\"></label>");
formErrors_mixin(errors.message);
buf.push("<textarea" + (jade.attrs({ 'name':("message"), 'tabindex':(1), 'disabled':(sending || sent), "class": [('form-control')] }, {"name":true,"tabindex":true,"disabled":true})) + ">" + (jade.escape(null == (jade.interp = values.message) ? "" : jade.interp)) + "</textarea></div>");
if ( view.state.get('sendingState') === 'error')
{
buf.push("<div class=\"alert alert-danger\">Could not send message.</div>");
}
if ( sent)
{
buf.push("<div class=\"alert alert-success\">Message sent!</div>");
}
buf.push("<div class=\"text-right\"><button" + (jade.attrs({ 'id':('submit-btn'), 'type':('submit'), 'disabled':(sending || sent), "class": [('btn'),('btn-navy'),('btn-lg')] }, {"type":true,"disabled":true})) + ">Submit</button></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div>");;return buf.join("");
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

;require.register("views/teachers/TeachersContactModal", function(exports, require, module) {
var ModalView, State, TeachersContactModal, TrialRequests, contact, forms,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

State = require('models/State');

TrialRequests = require('collections/TrialRequests');

forms = require('core/forms');

contact = require('core/contact');

module.exports = TeachersContactModal = (function(superClass) {
  extend(TeachersContactModal, superClass);

  function TeachersContactModal() {
    return TeachersContactModal.__super__.constructor.apply(this, arguments);
  }

  TeachersContactModal.prototype.id = 'teachers-contact-modal';

  TeachersContactModal.prototype.template = require('templates/teachers/teachers-contact-modal');

  TeachersContactModal.prototype.events = {
    'submit form': 'onSubmitForm'
  };

  TeachersContactModal.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    this.state = new State({
      formValues: {
        name: '',
        email: '',
        licensesNeeded: '',
        message: ''
      },
      formErrors: {},
      sendingState: 'standby'
    });
    this.trialRequests = new TrialRequests();
    this.supermodel.trackRequest(this.trialRequests.fetchOwn());
    return this.state.on('change', this.render, this);
  };

  TeachersContactModal.prototype.onLoaded = function() {
    var email, message, name, props, ref, trialRequest;
    trialRequest = this.trialRequests.first();
    props = (trialRequest != null ? trialRequest.get('properties') : void 0) || {};
    name = props.firstName && props.lastName ? props.firstName + " " + props.lastName : (ref = me.get('name')) != null ? ref : '';
    email = props.email || me.get('email') || '';
    message = "Hi CodeCombat! I want to learn more about the Classroom experience and get licenses so that my students can access Computer Science 2 and on.\n\nName of School " + (props.nces_name || props.organization || '') + "\nName of District: " + (props.nces_district || props.district || '') + "\nRole: " + (props.role || '') + "\nPhone Number: " + (props.phoneNumber || '');
    this.state.set('formValues', {
      name: name,
      email: email,
      message: message
    });
    return TeachersContactModal.__super__.onLoaded.call(this);
  };

  TeachersContactModal.prototype.onSubmitForm = function(e) {
    var data, formErrors, formValues;
    e.preventDefault();
    if (this.state.get('sendingState') === 'sending') {
      return;
    }
    formValues = forms.formToObject(this.$el);
    this.state.set('formValues', formValues);
    formErrors = {};
    if (!formValues.name) {
      formErrors.name = 'Name required.';
    }
    if (!forms.validateEmail(formValues.email)) {
      formErrors.email = 'Invalid email.';
    }
    if (!(parseInt(formValues.licensesNeeded) > 0)) {
      formErrors.licensesNeeded = 'Licenses needed is required.';
    }
    if (!formValues.message) {
      formErrors.message = 'Message required.';
    }
    this.state.set({
      formErrors: formErrors,
      formValues: formValues,
      sendingState: 'standby'
    });
    if (!_.isEmpty(formErrors)) {
      return;
    }
    this.state.set('sendingState', 'sending');
    data = _.extend({
      country: me.get('country')
    }, formValues);
    return contact.send({
      data: data,
      context: this,
      success: function() {
        var ref;
        if ((ref = window.tracker) != null) {
          ref.trackEvent('Teacher Contact', {
            category: 'Contact',
            licensesNeeded: formValues.licensesNeeded
          });
        }
        this.state.set({
          sendingState: 'sent'
        });
        me.set('enrollmentRequestSent', true);
        return setTimeout((function(_this) {
          return function() {
            return typeof _this.hide === "function" ? _this.hide() : void 0;
          };
        })(this), 3000);
      },
      error: function() {
        return this.state.set({
          sendingState: 'error'
        });
      }
    });
  };

  return TeachersContactModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/teachers/TeachersContactModal.js.map