require.register("lib/world/errors", function(exports, require, module) {
var ArgumentError, Vector,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Vector = require('./vector');

module.exports.ArgumentError = ArgumentError = (function(superClass) {
  extend(ArgumentError, superClass);

  ArgumentError.className = 'ArgumentError';

  function ArgumentError(message, functionName, argumentName, intendedType, actualValue, numArguments, hint) {
    this.message = message;
    this.functionName = functionName;
    this.argumentName = argumentName;
    this.intendedType = intendedType;
    this.actualValue = actualValue;
    this.numArguments = numArguments;
    this.hint = hint;
    ArgumentError.__super__.constructor.call(this, this.message);
    this.name = 'ArgumentError';
    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  ArgumentError.prototype.toString = function() {
    var actualType, s, showValue, typeMismatch, v;
    s = "`" + this.functionName + "`";
    if (this.argumentName === 'return') {
      s += "'s return value";
    } else if (this.argumentName === '_excess') {
      s += " takes only " + this.numArguments + " argument" + (this.numArguments > 1 ? 's' : '') + ".";
    } else if (this.argumentName) {
      s += "'s argument `" + this.argumentName + "`";
    } else {
      s += ' takes no arguments.';
    }
    actualType = typeof this.actualValue;
    if (this.actualValue == null) {
      actualType = 'null';
    } else if (_.isArray(this.actualValue)) {
      actualType = 'array';
    }
    typeMismatch = this.intendedType && !this.intendedType.match(actualType);
    if (typeMismatch) {
      v = '';
      if (actualType === 'string') {
        v = "\"" + this.actualValue + "\"";
      } else if (actualType === 'number') {
        if (Math.round(this.actualValue) === this.actualValue) {
          this.actualValue;
        } else {
          this.actualValue.toFixed(2);
        }
      } else if (actualType === 'boolean') {
        v = "" + this.actualValue;
      } else if ((this.actualValue != null) && this.actualValue.id && this.actualValue.trackedPropertiesKeys) {
        v = this.actualValue.toString();
      } else if (this.actualValue instanceof Vector) {
        v = this.actualValue.toString();
      }
      showValue = showValue || this.actualValue instanceof Vector;
      s += " should have type `" + this.intendedType + "`, but got `" + actualType + "`" + (v ? ": `" + v + "`" : '') + ".";
    } else if (this.argumentName && this.argumentName !== '_excess') {
      s += ' has a problem.';
    }
    if (this.message) {
      s += '\n' + this.message;
    }
    return s;
  };

  return ArgumentError;

})(Error);
});

;
//# sourceMappingURL=/javascripts/app/lib/world/errors.js.map