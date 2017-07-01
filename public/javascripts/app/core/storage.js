require.register("core/storage", function(exports, require, module) {
module.exports.load = function(key, fromCache) {
  var SyntaxError, error, s, value;
  if (fromCache == null) {
    fromCache = true;
  }
  if (fromCache) {
    return lscache.get(key);
  }
  s = localStorage.getItem(key);
  if (!s) {
    return null;
  }
  try {
    value = JSON.parse(s);
    return value;
  } catch (error) {
    SyntaxError = error;
    console.warn('error loading from storage', key);
    return null;
  }
};

module.exports.save = function(key, value, expirationInMinutes) {
  if (expirationInMinutes == null) {
    expirationInMinutes = 7 * 24 * 60;
  }
  if (expirationInMinutes) {
    return lscache.set(key, value, expirationInMinutes);
  } else {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};

module.exports.remove = function(key, fromCache) {
  if (fromCache == null) {
    fromCache = true;
  }
  if (fromCache) {
    return lscache.remove(key);
  } else {
    return localStorage.removeItem(key);
  }
};
});

;
//# sourceMappingURL=/javascripts/app/core/storage.js.map