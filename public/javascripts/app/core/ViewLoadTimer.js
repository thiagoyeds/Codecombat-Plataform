require.register("core/ViewLoadTimer", function(exports, require, module) {
var SHOW_NOTY, VIEW_LOAD_LOG, ViewLoadTimer;

VIEW_LOAD_LOG = false;

SHOW_NOTY = false;

ViewLoadTimer = (function() {
  ViewLoadTimer.firstLoad = true;

  function ViewLoadTimer(view) {
    this.view = view;
    this.firstLoad = ViewLoadTimer.firstLoad;
    ViewLoadTimer.firstLoad = false;
    if (!(window.performance && window.performance.now && window.performance.getEntriesByType)) {
      return;
    }
    this.t0 = this.firstLoad ? 0 : performance.now();
  }

  ViewLoadTimer.prototype.setView = function(view) {
    this.view = view;
  };

  ViewLoadTimer.prototype.record = function() {
    var networkPromises, subView, views;
    if (VIEW_LOAD_LOG) {
      console.group('Recording view:', this.view.id);
    }
    views = [this.view];
    networkPromises = [];
    while (views.length) {
      subView = views.pop();
      views = views.concat(_.values(subView.subviews));
      if (!subView.supermodel.finished()) {
        networkPromises.push(subView.supermodel.finishLoading());
      }
    }
    if (VIEW_LOAD_LOG) {
      console.log('Network promises:', networkPromises.length);
    }
    return Promise.all(networkPromises).then((function(_this) {
      return function() {
        var i, imagePromises, img, j, len, len1, promise, ref, ref1;
        _this.networkLoad = performance.now();
        if (_this.view.destroyed) {
          return;
        }
        imagePromises = [];
        if (VIEW_LOAD_LOG) {
          console.groupCollapsed('Images');
          console.groupCollapsed('Skipping');
          ref = _this.view.$('img:not(:visible)');
          for (i = 0, len = ref.length; i < len; i++) {
            img = ref[i];
            console.log(img.src);
          }
          console.groupEnd();
        }
        ref1 = _this.view.$('img:visible');
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          img = ref1[j];
          if (!img.complete) {
            promise = new Promise(function(resolve) {
              if (img.complete) {
                return resolve();
              } else {
                img.onload = resolve;
                return img.onerror = resolve;
              }
            });
            promise.imgSrc = img.src;
            if (VIEW_LOAD_LOG) {
              console.log(img.src);
            }
            imagePromises.push(promise);
          }
        }
        if (VIEW_LOAD_LOG) {
          console.groupEnd();
        }
        return Promise.all(imagePromises);
      };
    })(this)).then((function(_this) {
      return function() {
        var cachedResources, entries, m, networkTime, ref, resourceInfo, totalEncodedBodySize, totalResources, totalTime, totalTransferSize;
        if (_this.view.destroyed) {
          return;
        }
        networkTime = _this.networkLoad - _this.t0;
        totalTime = performance.now() - _this.t0;
        if (!_this.view.id) {
          return console.warn("Unknown view at: " + document.location.href + ", could not record perf.");
        }
        if (!_.isNumber(totalTime)) {
          return console.warn("Got invalid time result for view " + _this.view.id + ": " + totalTime + ", could not record perf.");
        }
        m = "Loaded " + _this.view.id + " in: " + totalTime + "ms";
        if (_this.firstLoad) {
          entries = performance.getEntriesByType('resource').filter(function(r) {
            return _.string.startsWith(r.name, location.origin);
          });
          totalEncodedBodySize = _.reduce(entries, (function(total, entry) {
            return total + entry.encodedBodySize;
          }), 0);
          totalTransferSize = _.reduce(entries, (function(total, entry) {
            return total + entry.transferSize;
          }), 0);
          cachedResources = _.size(_.filter(entries, function(entry) {
            return entry.transferSize / entry.encodedBodySize < 0.1;
          }));
          totalResources = _.size(entries);
          resourceInfo = {
            networkTime: networkTime,
            totalEncodedBodySize: totalEncodedBodySize,
            totalTransferSize: totalTransferSize,
            cachedResources: cachedResources,
            totalResources: totalResources
          };
        } else {
          resourceInfo = {};
        }
        if (VIEW_LOAD_LOG) {
          console.log(m);
        }
        if (SHOW_NOTY) {
          noty({
            text: m,
            type: 'information',
            timeout: 1000,
            layout: 'topCenter'
          });
        }
        return (ref = window.tracker) != null ? ref.trackEvent('View Load', _.assign({
          totalTime: totalTime,
          viewId: _this.view.id,
          firstLoad: _this.firstLoad
        }, resourceInfo)) : void 0;
      };
    })(this)).then((function(_this) {
      return function() {
        if (VIEW_LOAD_LOG) {
          return console.groupEnd();
        }
      };
    })(this));
  };

  return ViewLoadTimer;

})();

module.exports = ViewLoadTimer;
});

;
//# sourceMappingURL=/javascripts/app/core/ViewLoadTimer.js.map