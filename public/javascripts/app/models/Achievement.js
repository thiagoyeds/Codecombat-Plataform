require.register("models/Achievement", function(exports, require, module) {
var Achievement, CocoModel, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

utils = require('../core/utils');

module.exports = Achievement = (function(superClass) {
  extend(Achievement, superClass);

  function Achievement() {
    return Achievement.__super__.constructor.apply(this, arguments);
  }

  Achievement.className = 'Achievement';

  Achievement.schema = require('schemas/models/achievement');

  Achievement.prototype.urlRoot = '/db/achievement';

  Achievement.prototype.editableByArtisans = true;

  Achievement.prototype.isRepeatable = function() {
    return this.get('proportionalTo') != null;
  };

  Achievement.prototype.getExpFunction = function() {
    var func;
    func = this.get('function', true);
    if (func.kind in utils.functionCreators) {
      return utils.functionCreators[func.kind](func.parameters);
    }
  };

  Achievement.prototype.save = function() {
    this.populateI18N();
    return Achievement.__super__.save.apply(this, arguments);
  };

  Achievement.styleMapping = {
    1: 'achievement-wood',
    2: 'achievement-stone',
    3: 'achievement-silver',
    4: 'achievement-gold',
    5: 'achievement-diamond'
  };

  Achievement.prototype.getStyle = function() {
    return Achievement.styleMapping[this.get('difficulty', true)];
  };

  Achievement.defaultImageURL = '/images/achievements/default.png';

  Achievement.prototype.getImageURL = function() {
    if (this.get('icon')) {
      return '/file/' + this.get('icon');
    } else {
      return Achievement.defaultImageURL;
    }
  };

  Achievement.prototype.hasImage = function() {
    return this.get('icon') != null;
  };

  Achievement.prototype.cacheLockedImage = function() {
    var canvas, defer, image;
    if (this.lockedImageURL) {
      return this.lockedImageURL;
    }
    canvas = document.createElement('canvas');
    image = new Image;
    image.src = this.getImageURL();
    defer = $.Deferred();
    image.onload = (function(_this) {
      return function() {
        var context, imgData;
        canvas.width = image.width;
        canvas.height = image.height;
        context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        imgData = utils.grayscale(imgData);
        context.putImageData(imgData, 0, 0);
        _this.lockedImageURL = canvas.toDataURL();
        return defer.resolve(_this.lockedImageURL);
      };
    })(this);
    return defer;
  };

  Achievement.prototype.getLockedImageURL = function() {
    return this.lockedImageURL;
  };

  Achievement.prototype.i18nName = function() {
    return utils.i18n(this.attributes, 'name');
  };

  Achievement.prototype.i18nDescription = function() {
    return utils.i18n(this.attributes, 'description');
  };

  return Achievement;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Achievement.js.map