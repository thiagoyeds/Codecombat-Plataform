require.register("core/errors", function(exports, require, module) {
var applyErrorsToForm, connectionFailure, errorModalTemplate, showErrorModal, shownWorkerError;

errorModalTemplate = require('templates/core/error');

applyErrorsToForm = require('core/forms').applyErrorsToForm;

module.exports.parseServerError = function(text) {
  var SyntaxError, error, error1;
  try {
    error = JSON.parse(text) || {
      message: 'Unknown error.'
    };
  } catch (error1) {
    SyntaxError = error1;
    error = {
      message: text || 'Unknown error.'
    };
  }
  if (_.isArray(error)) {
    error = error[0];
  }
  return error;
};

module.exports.genericFailure = function(jqxhr) {
  var error, existingForm, i, len, message, missingErrors, res, results;
  Backbone.Mediator.publish('errors:server-error', {
    response: jqxhr
  });
  if (!jqxhr.status) {
    return connectionFailure();
  }
  error = module.exports.parseServerError(jqxhr.responseText);
  message = error.message;
  if (error.property) {
    message = error.property + ' ' + message;
  }
  console.warn(jqxhr.status, jqxhr.statusText, error);
  existingForm = $('.form:visible:first');
  if (existingForm[0]) {
    missingErrors = applyErrorsToForm(existingForm, [error]);
    results = [];
    for (i = 0, len = missingErrors.length; i < len; i++) {
      error = missingErrors[i];
      results.push(existingForm.append($('<div class="alert alert-danger"></div>').text(error.message)));
    }
    return results;
  } else {
    res = errorModalTemplate({
      status: jqxhr.status,
      statusText: jqxhr.statusText,
      message: message
    });
    return showErrorModal(res);
  }
};

module.exports.backboneFailure = function(model, jqxhr, options) {
  return module.exports.genericFailure(jqxhr);
};

module.exports.connectionFailure = connectionFailure = function() {
  var html;
  html = errorModalTemplate({
    status: 0,
    statusText: 'Connection Gone',
    message: 'No response from the CoCo servers, captain.'
  });
  return showErrorModal(html);
};

module.exports.showNotyNetworkError = function() {
  var jqxhr, ref, ref1;
  jqxhr = _.find(arguments, 'promise');
  return noty({
    text: ((ref = jqxhr.responseJSON) != null ? ref.message : void 0) || ((ref1 = jqxhr.responseJSON) != null ? ref1.errorName : void 0) || 'Unknown error',
    layout: 'topCenter',
    type: 'error',
    timeout: 5000,
    killer: false,
    dismissQueue: true
  });
};

showErrorModal = function(html) {
  $('#modal-wrapper').html(html);
  $('.modal:visible').modal('hide');
  return $('#modal-error').modal('show');
};

shownWorkerError = false;

module.exports.onWorkerError = function() {
  var text;
  if ((!shownWorkerError) && $.browser.msie && $.browser.versionNumber === 11) {
    text = 'Explorer failure. Reloading...';
    shownWorkerError = true;
    setTimeout((function() {
      return document.location.reload();
    }), 5000);
    return noty({
      text: text,
      layout: 'topCenter',
      type: 'error'
    });
  }
};
});

;
//# sourceMappingURL=/javascripts/app/core/errors.js.map