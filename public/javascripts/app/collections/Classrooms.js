require.register("collections/Classrooms", function(exports, require, module) {
var Classroom, Classrooms, CocoCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Classroom = require('models/Classroom');

CocoCollection = require('collections/CocoCollection');

module.exports = Classrooms = (function(superClass) {
  extend(Classrooms, superClass);

  function Classrooms() {
    return Classrooms.__super__.constructor.apply(this, arguments);
  }

  Classrooms.prototype.model = Classroom;

  Classrooms.prototype.url = '/db/classroom';

  Classrooms.prototype.initialize = function() {
    this.on('sync', (function(_this) {
      return function() {
        var classroom, i, len, ref, results;
        ref = _this.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          classroom = ref[i];
          results.push(classroom.capitalizeLanguageName());
        }
        return results;
      };
    })(this));
    return Classrooms.__super__.initialize.apply(this, arguments);
  };

  Classrooms.prototype.fetchMine = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.data == null) {
      options.data = {};
    }
    options.data.ownerID = me.id;
    return this.fetch(options);
  };

  Classrooms.prototype.fetchByOwner = function(ownerID, options) {
    if (options == null) {
      options = {};
    }
    if (options.data == null) {
      options.data = {};
    }
    options.data.ownerID = ownerID;
    return this.fetch(options);
  };

  return Classrooms;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Classrooms.js.map