require.register("core/forms", function(exports, require, module) {
var setErrorToField, setErrorToProperty;

module.exports.formToObject = function($el, options) {
  var input, inputs, j, len, name, obj, value;
  options = _.extend({
    trim: true,
    ignoreEmptyString: true
  }, options);
  obj = {};
  inputs = $('input, textarea, select', $el);
  for (j = 0, len = inputs.length; j < len; j++) {
    input = inputs[j];
    input = $(input);
    if (!(name = input.attr('name'))) {
      continue;
    }
    if (input.attr('type') === 'checkbox') {
      if (obj[name] == null) {
        obj[name] = [];
      }
      if (input.is(':checked')) {
        obj[name].push(input.val());
      }
    } else if (input.attr('type') === 'radio') {
      if (!input.is('checked')) {
        continue;
      }
      obj[name] = input.val();
    } else {
      value = input.val() || '';
      if (options.trim) {
        value = _.string.trim(value);
      }
      if (value || (!options.ignoreEmptyString)) {
        obj[name] = value;
      }
    }
  }
  return obj;
};

module.exports.objectToForm = function($el, obj, options) {
  var input, inputs, j, len, name, results, value;
  if (options == null) {
    options = {};
  }
  options = _.extend({
    overwriteExisting: false
  }, options);
  inputs = $('input, textarea, select', $el);
  results = [];
  for (j = 0, len = inputs.length; j < len; j++) {
    input = inputs[j];
    input = $(input);
    if (!(name = input.attr('name'))) {
      continue;
    }
    if (obj[name] == null) {
      continue;
    }
    if (input.attr('type') === 'checkbox') {
      value = input.val();
      if (_.contains(obj[name], value)) {
        results.push(input.attr('checked', true));
      } else {
        results.push(void 0);
      }
    } else if (input.attr('type') === 'radio') {
      value = input.val();
      if (obj[name] === value) {
        results.push(input.attr('checked', true));
      } else {
        results.push(void 0);
      }
    } else {
      if (options.overwriteExisting || (!input.val())) {
        results.push(input.val(obj[name]));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
};

module.exports.applyErrorsToForm = function(el, errors, warning) {
  var error, j, len, message, missingErrors, originalMessage, prop;
  if (warning == null) {
    warning = false;
  }
  if (!$.isArray(errors)) {
    errors = [errors];
  }
  missingErrors = [];
  for (j = 0, len = errors.length; j < len; j++) {
    error = errors[j];
    if (error.code === tv4.errorCodes.OBJECT_REQUIRED) {
      prop = _.last(_.string.words(error.message));
      message = $.i18n.t('common.required_field');
    } else if (error.dataPath) {
      prop = error.dataPath.slice(1);
      message = error.message;
    } else {
      message = error.property + " " + error.message + ".";
      message = message[0].toUpperCase() + message.slice(1);
      if (error.formatted) {
        message = error.message;
      }
      prop = error.property;
    }
    if (error.code === tv4.errorCodes.FORMAT_CUSTOM) {
      originalMessage = /Format validation failed \(([^\(\)]+)\)/.exec(message)[1];
      if (!_.isEmpty(originalMessage)) {
        message = originalMessage;
      }
    }
    if (error.code === 409 && error.property === 'email') {
      message += ' <a class="login-link">Log in?</a>';
    }
    if (!setErrorToProperty(el, prop, message, warning)) {
      missingErrors.push(error);
    }
  }
  return missingErrors;
};

module.exports.setErrorToField = setErrorToField = function(el, message, warning) {
  var afterEl, formGroup, helpBlock, kind;
  if (warning == null) {
    warning = false;
  }
  formGroup = el.closest('.form-group');
  if (!formGroup.length) {
    return console.error(el, " did not contain a form group, so couldn't show message:", message);
  }
  kind = warning ? 'warning' : 'error';
  afterEl = $(formGroup.find('.help-block, .form-control, input, select, textarea')[0]);
  formGroup.addClass("has-" + kind);
  helpBlock = $("<span class='help-block " + kind + "-help-block'>" + message + "</span>");
  if (afterEl.length) {
    return afterEl.before(helpBlock);
  } else {
    return formGroup.append(helpBlock);
  }
};

module.exports.setErrorToProperty = setErrorToProperty = function(el, property, message, warning) {
  var input;
  if (warning == null) {
    warning = false;
  }
  input = $("[name='" + property + "']", el);
  if (!input.length) {
    return console.error(property + " not found in", el, "so couldn't show message:", message);
  }
  return setErrorToField(input, message, warning);
};

module.exports.scrollToFirstError = function($el) {
  var $first;
  if ($el == null) {
    $el = $('body');
  }
  $first = $el.find('.has-error, .alert-danger, .error-help-block, .has-warning, .alert-warning, .warning-help-block').filter(':visible').first();
  if ($first.length) {
    return $('html, body').animate({
      scrollTop: $first.offset().top - 20
    }, 300);
  }
};

module.exports.clearFormAlerts = function(el) {
  $('.has-error', el).removeClass('has-error');
  $('.has-warning', el).removeClass('has-warning');
  $('.alert.alert-danger', el).remove();
  $('.alert.alert-warning', el).remove();
  el.find('.help-block.error-help-block').remove();
  return el.find('.help-block.warning-help-block').remove();
};

module.exports.updateSelects = function(el) {
  return el.find('select').each(function(i, select) {
    var value;
    value = $(select).attr('value');
    return $(select).val(value);
  });
};

module.exports.validateEmail = function(email) {
  var filter;
  filter = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i;
  return filter.test(email);
};

module.exports.validatePhoneNumber = function(phoneNumber) {
  var filter;
  filter = /^\D*(\d\D*){10,}$/i;
  return filter.test(phoneNumber);
};

module.exports.disableSubmit = function(el, message) {
  var $el;
  if (message == null) {
    message = '...';
  }
  $el = $(el);
  $el.data('original-text', $el.text());
  return $el.text(message).attr('disabled', true);
};

module.exports.enableSubmit = function(el) {
  var $el;
  $el = $(el);
  return $el.text($el.data('original-text')).attr('disabled', false);
};
});

;
//# sourceMappingURL=/javascripts/app/core/forms.js.map