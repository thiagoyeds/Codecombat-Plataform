require.register("lib/LocalMongo", function(exports, require, module) {
var LocalMongo, doQuerySelector, mapred, matchesQuery,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

LocalMongo = module.exports;

mapred = function(left, right, func) {
  return _.reduce(left, (function(result, singleLeft) {
    return result || (_.reduce(_.map(right, function(singleRight) {
      return func(singleLeft, singleRight);
    }), (function(intermediate, value) {
      return intermediate || value;
    }), false));
  }), false);
};

doQuerySelector = function(originalValue, operatorObj) {
  var body, operator, originalBody, trimmedOperator, value;
  value = _.isArray(originalValue) ? originalValue : [originalValue];
  for (operator in operatorObj) {
    originalBody = operatorObj[operator];
    body = _.isArray(originalBody) ? originalBody : [originalBody];
    switch (operator) {
      case '$gt':
        if (!mapred(value, body, function(l, r) {
          return l > r;
        })) {
          return false;
        }
        break;
      case '$gte':
        if (!mapred(value, body, function(l, r) {
          return l >= r;
        })) {
          return false;
        }
        break;
      case '$lt':
        if (!mapred(value, body, function(l, r) {
          return l < r;
        })) {
          return false;
        }
        break;
      case '$lte':
        if (!mapred(value, body, function(l, r) {
          return l <= r;
        })) {
          return false;
        }
        break;
      case '$ne':
        if (mapred(value, body, function(l, r) {
          return l === r;
        })) {
          return false;
        }
        break;
      case '$in':
        if (!_.reduce(value, (function(result, val) {
          return result || indexOf.call(body, val) >= 0;
        }), false)) {
          return false;
        }
        break;
      case '$nin':
        if (_.reduce(value, (function(result, val) {
          return result || indexOf.call(body, val) >= 0;
        }), false)) {
          return false;
        }
        break;
      case '$exists':
        if ((value[0] != null) !== body[0]) {
          return false;
        }
        break;
      default:
        trimmedOperator = _.pick(operatorObj, operator);
        if (!(_.isObject(originalValue) && matchesQuery(originalValue, trimmedOperator))) {
          return false;
        }
    }
  }
  return true;
};

matchesQuery = function(target, queryObj) {
  var i, len, obj, piece, pieces, prop, query;
  if (!queryObj) {
    return true;
  }
  if (!target) {
    throw new Error('Expected an object to match a query against, instead got null');
  }
  for (prop in queryObj) {
    query = queryObj[prop];
    if (prop[0] === '$') {
      switch (prop) {
        case '$or':
          if (!_.reduce(query, (function(res, obj) {
            return res || matchesQuery(target, obj);
          }), false)) {
            return false;
          }
          break;
        case '$and':
          if (!_.reduce(query, (function(res, obj) {
            return res && matchesQuery(target, obj);
          }), true)) {
            return false;
          }
          break;
        default:
          return false;
      }
    } else {
      pieces = prop.split('.');
      obj = target;
      for (i = 0, len = pieces.length; i < len; i++) {
        piece = pieces[i];
        if (!(piece in obj)) {
          obj = null;
          break;
        }
        obj = obj[piece];
      }
      if (typeof query !== 'object' || _.isArray(query)) {
        if (!(obj === query || (_.isArray(obj) ? indexOf.call(obj, query) >= 0 : void 0))) {
          return false;
        }
      } else {
        if (!doQuerySelector(obj, query)) {
          return false;
        }
      }
    }
  }
  return true;
};

LocalMongo.matchesQuery = matchesQuery;
});

;
//# sourceMappingURL=/javascripts/app/lib/LocalMongo.js.map