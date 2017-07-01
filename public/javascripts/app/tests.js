require.register("test/app/collections/CocoCollection.spec", function(exports, require, module) {
var CocoCollection, LevelComponent;

CocoCollection = require('collections/CocoCollection');

LevelComponent = require('models/LevelComponent');

describe('CocoCollection', function() {
  return it('can be given a project function to include a project query arg', function() {
    var collection;
    collection = new CocoCollection([], {
      url: '/db/level.component',
      project: ['name', 'description'],
      model: LevelComponent
    });
    collection.fetch({
      data: {
        view: 'items'
      }
    });
    return expect(jasmine.Ajax.requests.mostRecent().url).toBe('/db/level.component?view=items&project=name%2Cdescription');
  });
});
});

;require.register("test/app/core/deltas.spec", function(exports, require, module) {
var deltas;

deltas = require('core/deltas');

describe('deltas lib', function() {
  describe('getConflicts', function() {
    return it('handles conflicts where one change conflicts with several changes', function() {
      var delta, differ, expandedDeltaA, expandedDeltaB, forkA, forkB, i, len, originalData, results;
      originalData = {
        list: [1, 2, 3]
      };
      forkA = {
        list: ['1', 2, '3']
      };
      forkB = {
        noList: '...'
      };
      differ = deltas.makeJSONDiffer();
      expandedDeltaA = deltas.expandDelta(differ.diff(originalData, forkA));
      expandedDeltaB = deltas.expandDelta(differ.diff(originalData, forkB));
      deltas.getConflicts(expandedDeltaA, expandedDeltaB);
      results = [];
      for (i = 0, len = expandedDeltaA.length; i < len; i++) {
        delta = expandedDeltaA[i];
        results.push(expect(delta.conflict).toBeDefined());
      }
      return results;
    });
  });
  return describe('expandDelta', function() {
    return it('should not be confused by array index changes', function() {
      var copy, delta, differ, x, x1, x2, y;
      copy = function(x) {
        return JSON.parse(JSON.stringify(x));
      };
      x = (function() {
        var i, results;
        results = [];
        for (y = i = 0; i <= 7; y = ++i) {
          results.push({
            value: y,
            id: "ID:" + y,
            squared: y * y
          });
        }
        return results;
      })();
      x[3].target = 1;
      x1 = copy(x);
      x[3].target = -1;
      x.splice(0, 0, {
        id: 'New'
      });
      x2 = copy(x);
      differ = deltas.makeJSONDiffer();
      delta = deltas.expandDelta(differ.diff({
        V: x1
      }, {
        V: x2
      }), {
        V: x1
      });
      expect(delta[1].humanPath).toEqual("V :: ID:3 :: Target");
      expect(delta[1].oldValue).toEqual(1);
      return expect(delta[1].newValue).toEqual(-1);
    });
  });
});
});

;require.register("test/app/core/utils.spec", function(exports, require, module) {
describe('Utility library', function() {
  var utils;
  utils = require('core/utils');
  describe('getQueryVariable(param, defaultValue)', function() {
    beforeEach(function() {
      return spyOn(utils, 'getDocumentSearchString').and.returnValue('?key=value&bool1=false&bool2=true&email=test%40email.com');
    });
    it('returns the query parameter', function() {
      return expect(utils.getQueryVariable('key')).toBe('value');
    });
    it('returns Boolean types if the value is "true" or "false"', function() {
      expect(utils.getQueryVariable('bool1')).toBe(false);
      return expect(utils.getQueryVariable('bool2')).toBe(true);
    });
    it('decodes encoded strings', function() {
      return expect(utils.getQueryVariable('email')).toBe('test@email.com');
    });
    return it('returns the given default value if the key is not present', function() {
      expect(utils.getQueryVariable('key', 'other-value')).toBe('value');
      return expect(utils.getQueryVariable('NaN', 'other-value')).toBe('other-value');
    });
  });
  describe('i18n', function() {
    beforeEach(function() {
      return this.fixture1 = {
        'text': 'G\'day, Wizard! Come to practice? Well, let\'s get started...',
        'blurb': 'G\'day',
        'i18n': {
          'es-419': {
            'text': '¡Buenas, Hechicero! ¿Vienes a practicar? Bueno, empecemos...'
          },
          'es-ES': {
            'text': '¡Buenas Mago! ¿Vienes a practicar? Bien, empecemos...'
          },
          'es': {
            'text': '¡Buenas Mago! ¿Vienes a practicar? Muy bien, empecemos...'
          },
          'fr': {
            'text': 'S\'lut, Magicien! Venu pratiquer? Ok, bien débutons...'
          },
          'pt-BR': {
            'text': 'Bom dia, feiticeiro! Veio praticar? Então vamos começar...'
          },
          'en': {
            'text': 'Ohai Magician!'
          },
          'de': {
            'text': '\'N Tach auch, Zauberer! Kommst Du zum Üben? Dann lass uns anfangen...'
          },
          'sv': {
            'text': 'Godagens, trollkarl! Kommit för att öva? Nå, låt oss börja...'
          }
        }
      };
    });
    it('i18n should find a valid target string', function() {
      expect(utils.i18n(this.fixture1, 'text', 'sv')).toEqual(this.fixture1.i18n['sv'].text);
      return expect(utils.i18n(this.fixture1, 'text', 'es-ES')).toEqual(this.fixture1.i18n['es-ES'].text);
    });
    it('i18n picks the correct fallback for a specific language', function() {
      return expect(utils.i18n(this.fixture1, 'text', 'fr-be')).toEqual(this.fixture1.i18n['fr'].text);
    });
    it('i18n picks the correct fallback', function() {
      expect(utils.i18n(this.fixture1, 'text', 'nl')).toEqual(this.fixture1.i18n['en'].text);
      return expect(utils.i18n(this.fixture1, 'text', 'nl', 'de')).toEqual(this.fixture1.i18n['de'].text);
    });
    it('i18n falls back to the default text, even for other targets (like blurb)', function() {
      delete this.fixture1.i18n['en'];
      expect(utils.i18n(this.fixture1, 'text', 'en')).toEqual(this.fixture1.text);
      expect(utils.i18n(this.fixture1, 'blurb', 'en')).toEqual(this.fixture1.blurb);
      delete this.fixture1.blurb;
      return expect(utils.i18n(this.fixture1, 'blurb', 'en')).toEqual(null);
    });
    return it('i18n can fall forward if a general language is not found', function() {
      return expect(utils.i18n(this.fixture1, 'text', 'pt')).toEqual(this.fixture1.i18n['pt-BR'].text);
    });
  });
  describe('createLevelNumberMap', function() {
    it('returns correct map for r', function() {
      var key, levelNumberMap, levels, val;
      levels = [
        {
          key: 1,
          practice: false
        }
      ];
      levelNumberMap = utils.createLevelNumberMap(levels);
      return expect((function() {
        var results;
        results = [];
        for (key in levelNumberMap) {
          val = levelNumberMap[key];
          results.push(val.toString());
        }
        return results;
      })()).toEqual(['1']);
    });
    it('returns correct map for r r', function() {
      var key, levelNumberMap, levels, val;
      levels = [
        {
          key: 1,
          practice: false
        }, {
          key: 2,
          practice: false
        }
      ];
      levelNumberMap = utils.createLevelNumberMap(levels);
      return expect((function() {
        var results;
        results = [];
        for (key in levelNumberMap) {
          val = levelNumberMap[key];
          results.push(val.toString());
        }
        return results;
      })()).toEqual(['1', '2']);
    });
    it('returns correct map for p', function() {
      var key, levelNumberMap, levels, val;
      levels = [
        {
          key: 1,
          practice: true
        }
      ];
      levelNumberMap = utils.createLevelNumberMap(levels);
      return expect((function() {
        var results;
        results = [];
        for (key in levelNumberMap) {
          val = levelNumberMap[key];
          results.push(val.toString());
        }
        return results;
      })()).toEqual(['0a']);
    });
    it('returns correct map for r p r', function() {
      var key, levelNumberMap, levels, val;
      levels = [
        {
          key: 1,
          practice: false
        }, {
          key: 2,
          practice: true
        }, {
          key: 3,
          practice: false
        }
      ];
      levelNumberMap = utils.createLevelNumberMap(levels);
      return expect((function() {
        var results;
        results = [];
        for (key in levelNumberMap) {
          val = levelNumberMap[key];
          results.push(val.toString());
        }
        return results;
      })()).toEqual(['1', '1a', '2']);
    });
    it('returns correct map for r p p p', function() {
      var key, levelNumberMap, levels, val;
      levels = [
        {
          key: 1,
          practice: false
        }, {
          key: 2,
          practice: true
        }, {
          key: 3,
          practice: true
        }, {
          key: 4,
          practice: true
        }
      ];
      levelNumberMap = utils.createLevelNumberMap(levels);
      return expect((function() {
        var results;
        results = [];
        for (key in levelNumberMap) {
          val = levelNumberMap[key];
          results.push(val.toString());
        }
        return results;
      })()).toEqual(['1', '1a', '1b', '1c']);
    });
    return it('returns correct map for r p p p r p p r r p r', function() {
      var key, levelNumberMap, levels, val;
      levels = [
        {
          key: 1,
          practice: false
        }, {
          key: 2,
          practice: true
        }, {
          key: 3,
          practice: true
        }, {
          key: 4,
          practice: true
        }, {
          key: 5,
          practice: false
        }, {
          key: 6,
          practice: true
        }, {
          key: 7,
          practice: true
        }, {
          key: 8,
          practice: false
        }, {
          key: 9,
          practice: false
        }, {
          key: 10,
          practice: true
        }, {
          key: 11,
          practice: false
        }
      ];
      levelNumberMap = utils.createLevelNumberMap(levels);
      return expect((function() {
        var results;
        results = [];
        for (key in levelNumberMap) {
          val = levelNumberMap[key];
          results.push(val.toString());
        }
        return results;
      })()).toEqual(['1', '1a', '1b', '1c', '2', '2a', '2b', '3', '4', '4a', '5']);
    });
  });
  return describe('findNextlevel', function() {
    describe('when no practice needed', function() {
      var needsPractice;
      needsPractice = false;
      it('returns next level when rc* p', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 0, needsPractice)).toEqual(2);
        return done();
      });
      it('returns next level when pc* p r', function(done) {
        var levels;
        levels = [
          {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 0, needsPractice)).toEqual(2);
        return done();
      });
      it('returns next level when pc* p p', function(done) {
        var levels;
        levels = [
          {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: true,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 0, needsPractice)).toEqual(3);
        return done();
      });
      return it('returns next level when rc* p rc', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: true
          }
        ];
        expect(utils.findNextLevel(levels, 0, needsPractice)).toEqual(3);
        return done();
      });
    });
    return describe('when needs practice', function() {
      var needsPractice;
      needsPractice = true;
      it('returns next level when rc* p', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 0, needsPractice)).toEqual(1);
        return done();
      });
      it('returns next level when rc* rc', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: false,
            complete: true
          }
        ];
        expect(utils.findNextLevel(levels, 0, needsPractice)).toEqual(2);
        return done();
      });
      it('returns next level when rc p rc*', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: true
          }
        ];
        expect(utils.findNextLevel(levels, 2, needsPractice)).toEqual(1);
        return done();
      });
      it('returns next level when rc pc p rc*', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: true
          }
        ];
        expect(utils.findNextLevel(levels, 3, needsPractice)).toEqual(2);
        return done();
      });
      it('returns next level when rc pc p rc* p', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 3, needsPractice)).toEqual(4);
        return done();
      });
      it('returns next level when rc pc p rc* pc', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }
        ];
        expect(utils.findNextLevel(levels, 3, needsPractice)).toEqual(5);
        return done();
      });
      it('returns next level when rc pc p rc* pc p', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 3, needsPractice)).toEqual(5);
        return done();
      });
      it('returns next level when rc pc p rc* pc r', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: false,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 3, needsPractice)).toEqual(5);
        return done();
      });
      it('returns next level when rc pc p rc* pc p r', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 3, needsPractice)).toEqual(5);
        return done();
      });
      it('returns next level when rc pc pc rc* r p', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: false,
            complete: true
          }, {
            practice: false,
            complete: false
          }, {
            practice: true,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 3, needsPractice)).toEqual(4);
        return done();
      });
      it('returns next level when rc* pc rc', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: false,
            complete: true
          }
        ];
        expect(utils.findNextLevel(levels, 0, needsPractice)).toEqual(3);
        return done();
      });
      return it('returns next level when rc pc p rc* r p', function(done) {
        var levels;
        levels = [
          {
            practice: false,
            complete: true
          }, {
            practice: true,
            complete: true
          }, {
            practice: true,
            complete: false
          }, {
            practice: false,
            complete: true
          }, {
            practice: false,
            complete: false
          }, {
            practice: true,
            complete: false
          }
        ];
        expect(utils.findNextLevel(levels, 3, needsPractice)).toEqual(2);
        return done();
      });
    });
  });
});
});

;require.register("test/app/factories", function(exports, require, module) {
var Achievement, Campaign, Classroom, Course, CourseInstance, Courses, EarnedAchievement, Level, LevelComponent, LevelSession, LevelSystem, Prepaid, ThangType, User, Users, makeVersion;

Level = require('models/Level');

Course = require('models/Course');

Courses = require('collections/Courses');

Campaign = require('models/Campaign');

User = require('models/User');

Classroom = require('models/Classroom');

LevelSession = require('models/LevelSession');

CourseInstance = require('models/CourseInstance');

Achievement = require('models/Achievement');

EarnedAchievement = require('models/EarnedAchievement');

ThangType = require('models/ThangType');

Users = require('collections/Users');

Prepaid = require('models/Prepaid');

LevelComponent = require('models/LevelComponent');

LevelSystem = require('models/LevelSystem');

makeVersion = function() {
  return {
    major: 0,
    minor: 0,
    isLatestMajor: true,
    isLatestMinor: true
  };
};

module.exports = {
  makeCourse: function(attrs, sources) {
    var _id, ref;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('course_');
    attrs = _.extend({}, {
      _id: _id,
      name: _.string.humanize(_id),
      releasePhase: 'released',
      concepts: []
    }, attrs);
    if (attrs.campaignID == null) {
      attrs.campaignID = ((ref = sources.campaign) != null ? ref.id : void 0) || _.uniqueId('campaign_');
    }
    return new Course(attrs);
  },
  makeCampaign: function(attrs, sources) {
    var _id, levelsMap;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('campaign_');
    attrs = _.extend({}, {
      _id: _id,
      name: _.string.humanize(_id),
      levels: [this.makeLevel(), this.makeLevel()]
    }, attrs);
    if (sources.levels) {
      levelsMap = {};
      sources.levels.each(function(level) {
        return levelsMap[level.id] = level;
      });
      attrs.levels = levelsMap;
    }
    return new Campaign(attrs);
  },
  makeLevel: function(attrs) {
    var _id;
    _id = _.uniqueId('level_');
    attrs = _.extend({}, {
      _id: _id,
      name: _.string.humanize(_id),
      slug: _.string.dasherize(_id),
      original: _id + '_original',
      version: makeVersion()
    }, attrs);
    return new Level(attrs);
  },
  makeUser: function(attrs, sources) {
    var _id;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('user_');
    attrs = _.extend({
      _id: _id,
      permissions: [],
      email: _id + '@email.com',
      anonymous: false,
      name: _.string.humanize(_id)
    }, attrs);
    if (sources.prepaid && !attrs.coursePrepaid) {
      attrs.coursePrepaid = sources.prepaid.pick('_id', 'startDate', 'endDate', 'type', 'includedCourseIDs');
    }
    return new User(attrs);
  },
  makeClassroom: function(attrs, sources) {
    var _id, course, courseAttrs, courses, i, len, level, levels, member, members, ref, ref1;
    if (sources == null) {
      sources = {};
    }
    levels = sources.levels || [];
    courses = sources.courses || new Courses();
    members = sources.members || new Users();
    _id = _.uniqueId('classroom_');
    attrs = _.extend({}, {
      _id: _id,
      name: _.string.humanize(_id),
      aceConfig: {
        language: 'python'
      }
    }, attrs);
    if (!attrs.courses) {
      courses = sources.courses || new Courses();
      attrs.courses = (function() {
        var i, len, ref, results;
        ref = courses.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          course = ref[i];
          results.push(course.pick('_id'));
        }
        return results;
      })();
    }
    ref = _.zip(attrs.courses, levels);
    for (i = 0, len = ref.length; i < len; i++) {
      ref1 = ref[i], courseAttrs = ref1[0], levels = ref1[1];
      if (!courseAttrs) {
        break;
      }
      if (course == null) {
        course = this.makeCourse();
      }
      if (levels == null) {
        levels = new Levels();
      }
      courseAttrs.levels = (function() {
        var j, len1, ref2, results;
        ref2 = levels.models;
        results = [];
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          level = ref2[j];
          results.push(level.pick('_id', 'slug', 'name', 'original', 'primerLanguage', 'type', 'practice'));
        }
        return results;
      })();
    }
    if (!attrs.members) {
      members = members || new Users();
      attrs.members = (function() {
        var j, len1, ref2, results;
        ref2 = members.models;
        results = [];
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          member = ref2[j];
          results.push(member.id);
        }
        return results;
      })();
    }
    return new Classroom(attrs);
  },
  makeLevelSession: function(attrs, sources) {
    var creator, level;
    if (sources == null) {
      sources = {};
    }
    level = sources.level || this.makeLevel();
    creator = sources.creator || this.makeUser();
    attrs = _.extend({}, {
      level: {
        original: level.get('original')
      },
      creator: creator.id
    }, attrs);
    if (level.get('primerLanguage')) {
      attrs.level.primerLanguage = level.get('primerLanguage');
    }
    return new LevelSession(attrs);
  },
  makeCourseInstance: function(attrs, sources) {
    var _id, classroom, course, members, owner;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('course_instance_');
    course = sources.course || this.makeCourse();
    classroom = sources.classroom || this.makeClassroom();
    owner = sources.owner || this.makeUser();
    members = sources.members || new Users();
    attrs = _.extend({}, {
      _id: _id,
      courseID: course.id,
      classroomID: classroom.id,
      ownerID: owner.id,
      members: members.pluck('_id')
    }, attrs);
    return new CourseInstance(attrs);
  },
  makeLevelCompleteAchievement: function(attrs, sources) {
    var _id, level;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('achievement_');
    level = sources.level || this.makeLevel();
    attrs = _.extend({}, {
      _id: _id,
      name: _.string.humanize(_id),
      query: {
        'state.complete': true,
        'level.original': level.get('original')
      },
      rewards: {
        gems: 10
      },
      worth: 20
    }, attrs);
    return new Achievement(attrs);
  },
  makeEarnedAchievement: function(attrs, sources) {
    var _id, achievement, user;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('earned_achievement_');
    achievement = sources.achievement || this.makeLevelCompleteAchievement();
    user = sources.user || this.makeUser();
    attrs = _.extend({}, {
      _id: _id,
      "achievement": achievement.id,
      "user": user.id,
      "earnedRewards": _.clone(achievement.get('rewards')),
      "earnedPoints": achievement.get('worth'),
      "achievementName": achievement.get('name'),
      "notified": true
    }, attrs);
    return new EarnedAchievement(attrs);
  },
  makeThangType: function(attrs) {
    var _id;
    _id = _.uniqueId('thang_type_');
    attrs = _.extend({}, {
      _id: _id,
      name: _.string.humanize(_id),
      version: makeVersion(),
      original: _id
    }, attrs);
    return new ThangType(attrs);
  },
  makePayment: function(attrs, sources) {
    var _id;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('payment_');
    attrs = _.extend({}, {
      _id: _id
    }, attrs);
    return new ThangType(attrs);
  },
  makePrepaid: function(attrs, sources) {
    var _id, redeemer, redeemers;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('prepaid_');
    attrs = _.extend({}, {
      _id: _id,
      type: 'course',
      maxRedeemers: 10,
      endDate: moment().add(1, 'month').toISOString(),
      startDate: moment().subtract(1, 'month').toISOString()
    }, attrs);
    if (!attrs.redeemers) {
      redeemers = sources.redeemers || new Users();
      attrs.redeemers = (function() {
        var i, len, ref, results;
        ref = redeemers.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          redeemer = ref[i];
          results.push({
            userID: redeemer.id,
            date: moment().subtract(1, 'month').toISOString()
          });
        }
        return results;
      })();
    }
    return new Prepaid(attrs);
  },
  makeTrialRequest: function(attrs, sources) {
    var _id;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('trial_request_');
    return attrs = _.extend({}, {
      _id: _id,
      properties: {
        firstName: 'Mr',
        lastName: 'Professorson',
        name: 'Mr Professorson',
        email: 'an@email.com',
        phoneNumber: '555-555-5555',
        organization: 'Greendale',
        district: 'Green District'
      }
    }, attrs);
  },
  makeLevelComponent: function(attrs, sources) {
    var _id;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('level_component_');
    attrs = _.extend({}, {
      _id: _id,
      system: 'action',
      codeLanguage: 'coffeescript',
      name: _.uniqueId('Level Component '),
      version: makeVersion(),
      original: _id
    }, attrs);
    return new LevelComponent(attrs);
  },
  makeLevelSystem: function(attrs, sources) {
    var _id;
    if (sources == null) {
      sources = {};
    }
    _id = _.uniqueId('level_system_');
    attrs = _.extend({}, {
      _id: _id,
      codeLanguage: 'coffeescript',
      name: _.uniqueId('Level System '),
      version: makeVersion(),
      original: _id
    }, attrs);
    return new LevelSystem(attrs);
  }
};
});

;require.register("test/app/fixtures/campaigns", function(exports, require, module) {
var Campaign, Campaigns;

Campaign = require('models/Campaign');

Campaigns = require('collections/Campaigns');

module.exports = new Campaigns([
  new Campaign({
    _id: 'campaign0',
    levels: [
      {
        _id: 'level0_0',
        original: 'level0_0',
        name: 'level0_0',
        type: 'hero'
      }, {
        _id: 'level0_1',
        original: 'level0_1',
        name: 'level0_1',
        type: 'hero'
      }, {
        _id: 'level0_2',
        original: 'level0_2',
        name: 'level0_2',
        type: 'hero'
      }, {
        _id: 'level0_3',
        original: 'level0_3',
        name: 'level0_3',
        type: 'hero'
      }
    ]
  })
]);
});

;require.register("test/app/fixtures/classrooms/active-classroom", function(exports, require, module) {
var Classroom;

Classroom = require('models/Classroom');

module.exports = new Classroom({
  _id: "active-classroom",
  name: "Teacher Zero's Classroomiest Classroom",
  members: ["student0", "student1", "student2", "student3"],
  ownerID: "teacher0",
  aceConfig: {
    language: 'python'
  },
  courses: [
    {
      _id: "course0",
      levels: [
        {
          original: 'level0_0',
          name: 'level0_0',
          type: 'hero'
        }, {
          original: 'level0_1',
          name: 'level0_1',
          type: 'hero'
        }, {
          original: 'level0_2',
          name: 'level0_2',
          type: 'hero'
        }, {
          original: 'level0_3',
          name: 'level0_3',
          type: 'hero'
        }
      ]
    }, {
      _id: "course1",
      levels: []
    }
  ]
});
});

;require.register("test/app/fixtures/classrooms/archived-classroom", function(exports, require, module) {
var Classroom;

Classroom = require('models/Classroom');

module.exports = new Classroom({
  _id: "classroom_archived",
  name: "Teacher Zero's Archived Classroom",
  members: ["student0", "student3"],
  ownerID: "teacher0",
  aceConfig: {
    language: 'python'
  },
  archived: true
});
});

;require.register("test/app/fixtures/classrooms/classrooms", function(exports, require, module) {
var Classroom, Classrooms;

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

module.exports = new Classrooms([require('./active-classroom'), require('./empty-classroom'), require('./archived-classroom')]);
});

;require.register("test/app/fixtures/classrooms/empty-classroom", function(exports, require, module) {
var Classroom;

Classroom = require('models/Classroom');

module.exports = new Classroom({
  _id: "classroom0",
  name: "Teacher Zero's Other Classroom",
  ownerID: "teacher0",
  aceConfig: {
    language: 'python'
  },
  members: []
});
});

;require.register("test/app/fixtures/classrooms/unarchived-classrooms", function(exports, require, module) {
var Classroom, Classrooms;

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

module.exports = new Classrooms([require('./active-classroom'), require('./empty-classroom')]);
});

;require.register("test/app/fixtures/course-instances", function(exports, require, module) {
var CourseInstances;

CourseInstances = require('collections/CourseInstances');

module.exports = new CourseInstances([
  {
    _id: "instance0",
    courseID: "course0",
    classroomID: "active-classroom",
    ownerID: "teacher1",
    members: (require('test/app/fixtures/students')).map('id')
  }
]);
});

;require.register("test/app/fixtures/courses", function(exports, require, module) {
var Courses;

Courses = require('collections/Courses');

module.exports = new Courses([
  {
    _id: "course0",
    name: "course0",
    campaignID: "campaign0"
  }, {
    _id: "course1",
    name: "course1",
    campaignID: "campaign1"
  }
]);
});

;require.register("test/app/fixtures/curse.thang.type", function(exports, require, module) {
module.exports = {"_id":"53190ce07fe055000063e031","index":true,"slug":"curse","kind":"Mark","name":"Curse","creator":"5162fab9c92b4c751e000274","original":"53024d18a6efdd32359c5365","__v":0,"raw":{"shapes":{"0":{"t":[23.7,14.2],"p":"AgwC4QgIAAgFgEQgGgCgHgJQgKgMgTgiQgcgDgRgIQgUgJgGgOQgGgJAAgKQABgUAPgUIAAgZQAAg6ARgrQAPgkAbgWQAlgdA6AAIASABQAqAAAcALQAwATAXA0QARAqAAA7IgBAfQAPATAAAUQAAALgEAIQgFAKgLAHQgTANglADQgMAWgJANQgJAMgHAHQgGADgHAAIgFAAIgHgDIgCgFIgEgIQgDgIgBgLIgCgQIg4AAIAAADIgDAaQgBAJgEAHQgCAFgEADQgEACgDAAgAhIiXQgmASgTAsQgQApAAA1IABAbIABACIAAACIgDADQgLAOgCAMIgBAFQAAAFADAEQADAGAGAEQAGAEAJADQAPAFAWADIAFAAIADAEIAKASIAOAYQAGAHAEAEIADACIABAAIACgNIABgQIABgKIAAgDIAAgNIBeABIABAJIAAAEIABAJQAAAJADANIADAGIABAAIAEgGQAIgIASggIACgEIABgDIACgBIAEAAQAagDAQgGIADgBQAMgGAFgIQADgFgBgFIAAAAQAAgOgNgQIgDgEIABgJIABgbQAAg2gQgnQgOgfgXgSQgfgVg2gBIgSAAQgjAAgbAMg","fc":"#343A3C"},"1":{"t":[24.2,11.3],"p":"AAqAcQgDgLgGgYQgGgbACgCQABgCAVgBQAWgCAEADQAKAFAOAiQAOAmgRABIgSABQghAAgFgNgAhiAoQgQgBAOgmQAOgiAKgFQAEgDAWACQAVABABACQACACgGAbQgGAYgDALQgFANgiAAIgSgBg","fc":"#272B2D"},"2":{"t":[23.9,22.3],"p":"AhcAXIgGAAQgWgDgPgFIAQgBQAugGApghIACgCIAAADIgBAQIgCABIg5AigAAjgHIgCgBIgBgTIADADQApAgAtAGIAPABQgQAGgZADIgFAAIgBABg","fc":"#5F686D"},"3":{"t":[24.1,12.9],"p":"AANBQQgKgLgDgIQgEAIgKALIgHAHIgEADIgEACQgFAAgBgHIAAAAIACgBIABgQIAHgVQALgcANgDIAAgBIABABIAAgBIAAABQANADALAcIAGASIABATIACABQAAAHgFAAQgFAAgKgMgABAAdQgYgFgDgHQgKgVgGgZQgDgOgBgLQgBgaAPgDQAegIAQABQAUABAKARQAOAbAGAjQADALgBAKQgBAUgPABIgNABQgSAAgSgEgAA0g3QgVABgBACQgCACAGAbQAGAYADALQAGAQAygEQARgBgOgkQgOgkgKgFQgDgCgJAAIgOABgAhwAgQgPgBgBgVQgBgJADgLQAGgjAOgbQAKgRAVgBQAPgBAeAIQAPADgBAaQgBALgDAOQgGAZgKAVQgDAHgYAFQgTAEgRAAIgNgBgAhLg2QgKAFgOAkQgOAkAQABQAzAEAGgQQADgLAGgYQAGgbgCgCQgBgCgVgBIgOgBQgKAAgCACg","fc":"#42484C"},"4":{"t":[23.7,14],"p":"AhACXIgPgYIgDgMQAEgTAPAGQAQAFABAMIAAAHIgBAKIgCAMQgDAMgCACQgEgDgGgIgAA1CUQgDgRABgMQABgMAPgFQAQgFAEARQgTAggHAJIgEAFIgEgMgAgpBkIgEgLIANgDIALgIIAEgDIAOgMIADAAQAGAAAHAIQALANAUADIACAPgAifBCQACgMALgOIADgDIgBgCIAIgHIAGgDQAGgCADABIADAAQgHgHAAgRQABAUAPABQAYACAZgGQAZgFADgHQAKgVAFgYQAEgPAAgKQABAMgFAUQgFAYgKAWQgDAFgPAFIALgBQAPgBgOATQgkAUgYAHQgWAIgSAAIgBAAQgSAAgCgJgACRBLQgSAAgWgIQgPgEgYgMIgVgLQgEgFgBgEQgDgKAJABIAMABQgPgFgDgFQgKgWgFgYQgFgUABgMQAAAKAEAPQAFAYAKAVQADAHAZAFQAZAGAYgCQAPgBABgUQABARgHAHIABAAQAEgBALAFIACACIgBAJIADADQANARAAAOQgFACgJAAIgBAAgAAhA2IgGgTQgKgbgOgDIAAgBIgBAAIgBAAIAAABQgMADgLAbIgGAWIAAgDIgCACQgBgPAHgeIAMgnQALgSAKALQAHAGAJAWQAHAMADAdQACAPAAAIIgEgDgAhuhcQAAgIAHgRQAOghAvgJQAXgEATACQA0gBAgAVQAVANAKATQAEAJgNgDIgWgHQgHgCgnAGIglAHQg6gLgRABQgWACgKAPQgCAEgBAAQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBg","fc":"#9FB6C1"},"5":{"t":[23.7,14.1],"p":"AgzCkIgDgCQADgDACgMIACgMIgBAPIgCAOgAA1CaQgDgOAAgJIgBgJIAAgDIgBgJIhegBIAAAMIAAAEIAAgHQgBgMgQgFQgPgFgEASIAEANIgKgSIA5gkIAAAAQAAAHAFAAIAFgDIgKAIIgOADIAFAMIBWABIgCgPQgUgDgLgMQgHgJgGAAIgCABIgPAMIAHgIQAKgKACgJQAEAJAKAKQALANAFAAQAFAAAAgHIA1AiIgBADIgCADQgEgRgQAFQgPAFgBAMQgBAMADARIAEAMIgBABgAB7BfQgtgGgpghQAAgIgCgPQgDgdgHgMQgJgVgHgHQgJgLgLASIgMAoQgIAdABAPQgpAigvAGIgPACQgJgDgGgEQgGgEgDgGQgDgFAAgEIABgGQACAJAUAAQARAAAWgIQAYgHAkgUQAOgTgOABIgMABQAQgFACgFQAKgVAFgZQAFgUAAgMQABgagQgDQgdgJgQABQgUACgKARQgPAagFAjQgDAOABAJQgBAQAHAHIgDAAQgDAAgFABIgHADIgHAHIgBgCIgBgbQAAg1AQgoQATgtAmgRQAbgNAjAAIASABQA2AAAfAWQAXASAOAeQAQAnAAA3IgBAbIgCgCQgLgFgDABIgCAAQAHgHgBgQQABgJgDgOQgGgjgOgaQgKgRgVgCQgQgBgdAJQgPADABAaQgBAMAFAUQAFAZALAVQACAFAQAFIgNgBQgJAAADAJQACAFADAEIAVALQAYAMAPAEQAWAIASAAQAKAAAFgCIAAAAQABAFgDAFQgFAIgMAFIgDACIgPgCgAgqifQguAIgPAhQgGARgBAIQgBAIAFgIQAKgPAWgCQASgBA5ALIAmgGQAngHAGACIAWAHQAOADgFgJQgKgTgUgNQghgVg0ACIgNgBQgOAAgPADg","fc":"#788187"},"6":{"t":[25.2,16.2],"p":"AjjCgIgGgeIgWgUIgDgEIgBgIIACgYIAFgWIBjgWIEWiXIAigyIAHAAQAUAAAMADQAHABAGADQAEADACADQAGAIADAPIABAKIAhArIgqAnIgEADIgFABIgHAAIgWABIgsABIj0CCIhEBPgACPhuIgBADIkgCcIhZAUIgBAIQgDANAAAIIAZAWIADAQIABAHIAaAHIA9hHIABgBID8iHIADAAIBAgBIAKgBIADgCIAOgNIAKgKIgagiIgBgDIAAgDIgBgHQgCgLgDgEIgDgCIgLgCIgRgBg","fc":"#343A3C"},"7":{"t":[24.7,14.9],"p":"AjICGQgFgGAKgLIALgKQAggNADAHQACAEgMAMQgKAKgLAGQgHAEgFAAQgFAAgDgDgAjfBwQgEgBAAgJQgBgJACgFQACgDAsgLIAsgJQAGgEAKAAQALAAgGAGQgDAEgOAGQgPAIgHAFQgJAHgdAIQgYAHgGAAIgBAAgACYhbQABgFAMgSIAOgVQAMgCAHAHQAGAIgBANQgBALgYAGIgIACIgYATQgIAGhrA5IhwA7QgNAIgdABgADMg6IgTgCQgTgCgHgDQgHgEAEgEQADgEAHgCIAvgLQANAAACASQABAIgJAEIgDABQgFABgFAAIgDAAg","fc":"#9FB6C1"},"8":{"t":[25.8,19.9],"p":"AjYBqIgBgHIAGADQAMACAMgKQASgQAggtIEKiMIAvAAIARgBIADAAQAFAAAFgBIAMgDIgOAOIgDACIgLABIhAABIgCAAIj8CHIgBABIg9BHg","fc":"#5F686D"},"9":{"t":[24.9,15.5],"p":"AjKCRIgGgCIgDgRIgZgWQAAgIADgNIABgIIBZgTIEgidIABgDIAbgpIARABIALADIADABQADAFACAKIABAIIAAADIABACIAaAjIgKAJIgLACIACgBQAJgDAAgIQgCgTgOAAIgvAMQgGACgDADQgEAFAGADQAIADASADIATACIgRABIgvAAIkKCLQggAtgSAQQgKAJgKAAIgEgBgAi5BkIgLAKQgLALAFAGQAGAHAOgHQALgGALgLQALgLgCgFQgBgCgEAAQgJAAgUAIgAiKA6IgsAKQgsAKgCAEQgCAFABAIQABAKADAAQAFABAbgIQAdgIAIgHQAHgFAQgHQANgHAEgEQAFgFgLgBQgKAAgGAEgACxiOIgOAWQgLASgCAFIkTCXQAdgCANgHIBwg8QBrg5AIgGIAYgSIAIgCQAYgHABgLQABgNgFgHQgGgGgJAAIgFAAg","fc":"#788187"},"10":{"t":[24.8,16.6],"p":"ABrBrIkZiWIg7AAIgDgFQgKgPgFgOQgEgIAAgHQAAgFACgDQADgJALgKIAHgGIATg0IAJACIAjAIIAMADIAGAEIACACIAqA+IDzCEIBmANIASAyIgWAUIgEAeQgBAEgCACIgDACIgFAEIgnARgAB3BbIBBBAIATgJIAHgDIAFgiIASgQIgJgaIhdgMIgBAAIj7iJIgmg2IgGgJIABAAIgCgBIABABIgDgBIgggIIgPApIgCABIgCACIgGAFQgGAGgDAEIgBADIACAHIAFALIAGALIAxAAIADgBg","fc":"#343A3C"},"11":{"t":[24.3,15.5],"p":"AC3CGQgIgEgPgQIgTgUQgEgFALADQAJADAGADIAQAJQAQAKABAGQABAJgDADQgBABAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAQgDAAgEgDgAC2BmIlAijQgRgKABgEQABgEgOgQQgTgLgFgHQgFgFABgJIADgHQAEgDAMACQAMACAEAEQAFAEASAlIAHAOIEMCQIBMAOQANACgGAWQgBADgGAAQgKAAgWgJgAjThDQgFgCgCgCQgDgEAAgIQgBgHALgEIALgDQAKgBATAZQAFAHgUABIgKAAQgKAAgFgCg","fc":"#9FB6C1"},"12":{"t":[23.2,19.6],"p":"ACHA9IkhibIgDABIgwAAIgHgKIgFgMIgBgHIABgDIACAIQAFAMAPAEQAXAHAcgJIEhCdIAjAhQAZAVAOAJIgSAIg","fc":"#5F686D"},"13":{"t":[24.7,16.2],"p":"AClB5IgjghIkiieQgcAKgXgHQgOgEgFgMIgDgIQADgEAGgGIAGgFIACgCIACgBIAPgpIAgAIIADABIgBgBIACABIgBAAIAGAJIAmA2ID7CJIABAAIBdAMIAJAaIgSAQIgFAiIgIAEQgOgJgYgVgACIBXIATAUQAQAQAHAEQAIAFADgEQADgDgBgJQgBgGgQgKIgQgJQgFgDgKgDIgGgBQgBAAAAAAQgBABAAAAQAAAAAAABQABAAAAABgAjFiNIgCAHQgBAJAEAFQAGAHASALQAPAQgBAEQgBAEARAKIE/CjQAlAQACgKQAGgWgMgCIhMgOIkMiQIgIgOQgSglgEgEQgFgEgLgCIgJgBQgFAAgDACgAjNhoIgLADQgKAEAAAHQABAIACAEQACACAFACQAHADATgBQATgBgFgHQgSgYgKAAIgBAAg","fc":"#788187"}},"containers":{"Boot":{"c":["5","4","3","2","1","0"],"b":[5.6,-4.2,36.2,36.9]},"Bone_1":{"c":["9","8","7","6"],"b":[-0.8,-1,52.1,34.6]},"Bone":{"c":["13","12","11","10"],"b":[-0.7,-1.2,51.3,35.8]}},"animations":{"Cursed_JSCC":{"shapes":[],"containers":[{"bn":"instance","t":[29.1,47.3,1,1,0,0,0,24.7,16.7],"gn":"Bone"},{"bn":"instance_1","t":[33.4,47.3,1,1,0,0,0,25.1,16.4],"gn":"Bone_1"},{"bn":"instance_2","t":[30.9,33.5,1,1,0,0,0,24.2,26.6],"gn":"Boot"}],"animations":[],"tweens":[[{"n":"get","a":["instance"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":47.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":48.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":48.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":49.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":49.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":16.8,"rotation":-0.8,"x":29.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":16.7,"rotation":-1.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-3.1,"x":29.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":24.9,"regY":16.6,"rotation":-4.3,"y":49.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-3.6,"x":29.4,"y":49.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-3.1,"x":29.3,"y":49.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-2.6,"y":48.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-1.9,"y":48.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":16.7,"rotation":-1.3,"y":48.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":16.6,"rotation":-0.8,"x":29.2,"y":47.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":16.8,"rotation":-0.3,"y":47.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":24.7,"regY":16.7,"rotation":0,"x":29.1,"y":47.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":47.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":48.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":48.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":49.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":49.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":24.9,"rotation":4,"x":33.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.3,"y":49.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":25,"rotation":2.8,"x":33.4,"y":49.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":24.9,"rotation":2.3,"y":48.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.8,"x":33.3,"y":48.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.3,"y":48.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.8,"y":47.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.3,"y":47.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":25.1,"rotation":0,"x":33.4,"y":47.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":33.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":34.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":34.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":35.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":35.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.99,"y":35.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.98},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.97,"y":35.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":26.7,"scaleY":0.96,"y":35.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.96,"y":35.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.97,"y":35.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.97,"y":34.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.98,"y":34.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.98,"y":34.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.99,"y":34.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":33.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":26.6,"scaleY":1,"y":33.5},0]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[3.6,2.5,55.9,62.5],"frameBounds":[[3.6,2.5,55.9,62.5],[3.6,3,55.9,62.6],[3.6,3.4,55.9,62.7],[3.6,3.8,55.9,62.8],[3.6,4.1,55.9,62.9],[3.6,4.5,55.9,63],[3.4,5,56.4,62.9],[3.1,5.4,57,63],[2.8,5.8,57.6,63.2],[2.3,6.1,58.5,63.4],[2.5,5.6,58.1,63.3],[2.6,5.3,57.8,63.2],[2.8,4.8,57.6,63.1],[2.9,4.3,57.3,62.9],[3.1,3.8,57.1,62.9],[3.2,3.4,56.7,62.8],[3.4,2.9,56.4,62.7],[3.6,2.5,55.9,62.5]]}}},"actions":{"idle":{"animation":"Cursed_JSCC","framerate":20},"portrait":{"animation":"Cursed_JSCC","scale":1.5,"positions":{"registration":{"x":-5,"y":0}}}},"scale":0.3,"positions":{"registration":{"x":-30,"y":-70},"aboveHead":{"x":0,"y":-80},"mouth":{"x":0,"y":-30},"torso":{"x":0,"y":-50}},"commitMessage":"Renamed to curse.","parent":"5302534027471514685d5433","created":"2014-03-07T00:03:44.450Z","version":{"isLatestMinor":true,"isLatestMajor":true,"minor":3,"major":0}}

});

;require.register("test/app/fixtures/leather-boots.thang.type", function(exports, require, module) {
module.exports = {"_id":"53f6a5fdd822c23505b91a92","index":true,"slug":"leather-boots","kind":"Item","name":"Leather Boots","creator":"51538fdb812dd9af02000001","original":"53e2384453457600003e3f07","watchers":["512ef4805a67a8c507000001"],"__v":0,"components":[{"original":"524b85837fc0f6d519000020","majorVersion":0},{"original":"524b7b857fc0f6d519000012","majorVersion":0},{"original":"524b4150ff92f1f4f8000024","majorVersion":0},{"original":"53e12043b82921000051cdf9","majorVersion":0,"config":{"ownerID":"Tharin","slots":["feet"],"programmableProperties":["moveXY"],"moreProgrammableProperties":[],"extraHUDProperties":["maxSpeed"],"stats":{"maxSpeed":{"factor":1}}}},{"original":"524b7b8c7fc0f6d519000013","majorVersion":0,"config":{"locomotionType":"running","maxSpeed":5,"maxAcceleration":100}},{"original":"524b75ad7fc0f6d519000001","majorVersion":0,"config":{"pos":{"x":39.08,"y":20.72,"z":0.5},"width":1,"height":1,"depth":1,"shape":"ellipsoid"}},{"original":"524b7b7c7fc0f6d519000011","majorVersion":0}],"commitMessage":"added portrait","parent":"53eb988c1a100989a40ce465","raster":"db/thang.type/53e2384453457600003e3f07/boots.png","rasterIcon":"db/thang.type/53e2384453457600003e3f07/boots_2.jpg","created":"2014-08-22T02:07:57.209Z","version":{"isLatestMinor":true,"isLatestMajor":true,"minor":4,"major":0}}
});

;require.register("test/app/fixtures/level-sessions-completed", function(exports, require, module) {
var LevelSessions;

LevelSessions = require('collections/LevelSessions');

module.exports = new LevelSessions([
  {
    level: {
      original: "level0_0"
    },
    creator: "student0",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_1"
    },
    creator: "student0",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_2"
    },
    creator: "student0",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_3"
    },
    creator: "student0",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_0"
    },
    creator: "student1",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_1"
    },
    creator: "student1",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_2"
    },
    creator: "student1",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_3"
    },
    creator: "student1",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_0"
    },
    creator: "student2",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_1"
    },
    creator: "student2",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_2"
    },
    creator: "student2",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_3"
    },
    creator: "student2",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_0"
    },
    creator: "student3",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_1"
    },
    creator: "student3",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_2"
    },
    creator: "student3",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_3"
    },
    creator: "student3",
    state: {
      "complete": true
    }
  }
]);
});

;require.register("test/app/fixtures/level-sessions-partially-completed", function(exports, require, module) {
var LevelSessions;

LevelSessions = require('collections/LevelSessions');

module.exports = new LevelSessions([
  {
    level: {
      original: "level0_0"
    },
    creator: "student0",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_1"
    },
    creator: "student0",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_2"
    },
    creator: "student0",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_3"
    },
    creator: "student0",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_0"
    },
    creator: "student1",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_1"
    },
    creator: "student1",
    state: {
      "complete": true
    }
  }, {
    level: {
      original: "level0_2"
    },
    creator: "student1",
    state: {
      "complete": false
    }
  }, {
    level: {
      original: "level0_0"
    },
    creator: "student2",
    state: {
      "complete": false
    }
  }
]);
});

;require.register("test/app/fixtures/levels", function(exports, require, module) {
module.exports.LadderLevel = {
  name: 'Ladder Level',
  original: '0123456789abcdef',
  version: {
    major: 1,
    minor: 2,
    isLatestMajor: true,
    isLatestMinor: true
  }
};
});

;require.register("test/app/fixtures/ogre-fangrider.thang.type", function(exports, require, module) {
module.exports = {"_id":"5404e6f575465592a698ced7","index":true,"slug":"ogre-fangrider","name":"Ogre Fangrider","creator":"512ef4805a67a8c507000001","original":"529e5f0c6febb9ca7e00000c","__v":0,"raw":{"shapes":{"0":{"t":[52.3,75.3],"p":"AFRFmQgegFgKgCIgNgGQgDgBgCgDIgzhHIhiADIgigoIhZAwIhHAKIhEhLIgHgDIgNgCIgPAAQgRABgyAGIhdhXIgNgJIgJgDIgUgFQFJiRCNiYQBHhMAmhAQgLAzgWBSQgtCjg6CUQA9hLBDioQA0iFAchxQALANAmCfQAqCpgDGMQgNgHgUgEgADoD1IAEAHQAAACAXAjIASAaIAJAKIAFADQAFADAEAAIAHgCIAGgEQACgEABgEIACgJQACgPABgcIADhTIAAhegAglERIB+hSIjQgWgABbDKIBLBEIBPhnIhTgkg","fc":"#989588"},"1":{"t":[49.8,62.4],"p":"AGuJFIg/gjQgGgEgUgEIgogHQgSgGgLgJQgIgHgFgJIghgvIhgAEIgYgcIg+AgIhqAQIhKhSIgIAAQgWABg0AFIgKACIgIgGQgMgKgbgaIhCg9IAAAAIjVgyIBJggQDshsCoiZQCGh9BXiXQA/hrAghvQAQg3AEgjIAEgsIAjAVQALAHATASQAgAgAeAzQBgCfAuEXQAcCtgGCeQgHCQgiB0QgSA6gRAgIg0BfgAEwHWQACAEADABIANAFQAKADAeAFQAUADANAHIAzAdQAJgXAJgeQAghsAGiJQAHiYgcinQgMhIgPg/QgYiAgphTQg1hogagXIgIgKIgBgBIgCAFQgJApgOAqQgKAegNAeQgfBLgqBHQhYCUiFB9QiYCLjIBkIAwAMIABAAIAUAEIAJAEIANAJIBdBWQAygGARAAIAPAAIANACIAHACIBEBMIBHgLIBZgwIAiApIBigEgAE8HKIgFgEIgJgKIgSgaQgXgiAAgDIgEgHIBcicIAABdIgDBUQgBAcgCAOIgCAJQgBAFgCADIgGAFIgHABIgBABQgEAAgEgDgAEhF0IAZAoIAEAFIABgVIAChOgAheErIDQAVIh+BTgAgEFtIAkgYIg9gHgAB0FMIBHhHIBTAkIhPBmgACcFJIAhAdIAlgxIgigOg","fc":"#1D2226"},"2":{"t":[55.2,60],"p":"AFUIKQADmNgpioQgniegLgOQgbBxg1CDQhCCqg+BMQA7iXAsigQAXhSAKg0QgmBBhHBMQiNCWlJCTIAAAAIgxgMQDIhkCYiNQCGh7BYiUQAqhHAfhLQAMgeAKgeQAOgqAKgpIABgFIACABIAIAKQAaAXA0BoQAqBTAYCAQAPA/ALBIQAcCngHCYQgGCJggBsQgIAegKAXg","fc":"#605E4A"},"3":{"t":[35.8,47.5],"p":"AhvgWIitmCQFYCQBgC4QBgC2AhCRQgqhqhdiBQhNhng+g5QBGBzAoBbQA1B+AWCGQgwh8gyhRQgyhQiCi8QA4BpAVBuQATBwgWDtQgckKhLilg","fc":"#605E4A"},"4":{"t":[43.8,61.5],"p":"AigIhQAzk+iElxQgqhyhDiPQhIiXgIgVIgUg3IA2ASQGMB4EAGVIAAAAQCADHAyCyIARA7Ig4gaIAFALIhZgDIgIB1IgtAFIgEAbIg0AxIgTgRIgwgqIhOA0Ig9g9IinCigAksmoQBFCSArB1QB5FRgbEqIBahXIBDBEIALgIIgGgLIAmhJIAtAvIAAAAIAEAEQAEAGARAQIhYiNICWBUIgLAZIAXgDIAJh9ICUADIgvgqIgLgOIAAgGIAAAAIAAgBQgyiChaiMIAAAAQjgljlRh9IA0BugADBGWIAHgOIgZgOgAGhEVIACgBIgBgBIgBACg","fc":"#1D2226"},"5":{"t":[46.5,58.5],"p":"AjXiDQgrh0hFiSIg0hvQFRB+DgFjIAAAAQBaCMAyCBIAAABIAAABIAAAGIALANIAvAqIiUgCIgJB9IgXADIALgZIiWhVIBYCNQgRgQgEgGIgEgEIAAAAIgtgvIgmBKIAGALIgLAHIhDhDIhaBXQAbkqh5lSg","fc":"#989588"},"6":{"t":[52.6,49.2],"p":"AoVIIIgCgBIgFgFQgcgaAaggQAHgIAOgJIAAAAIABAAQAMgIASgIIAAAAIAygWIAAAAQGojGEAlpQB6itAwiLIAAAAIAJgcIAKgkIB7BLIADASQABAFgEAJQiXFsjQDdQj2EKloBoIgDABQgjAGgaAAQgnAAgRgPgAndHfIAIAAQARgBAYgEQFYhjDsj/QC2jCCJkyIAVgxIgegTQgyCRh/CxQkJF1m1DNIAAAAIgyAXIgBAAIgJAEg","fc":"#1D2226"},"7":{"t":[53.3,50.7],"p":"AnkHQIAJgEIAAAAIAzgXIAAAAQG0jNEKl1QB+ixAziRIAeATIgVAxQh4C/hKBnQhmCLhkBgQjFC/lbCLIgEAAIgEAAg","fc":"#DBDDBC"},"8":{"t":[52.7,54.1],"p":"ABLBkQBjhgBniLQBKhnB3i/QiJEyi1DCQjtD/lYBjQgYAEgQABQFbiKDFjAg","fc":"#605E4A"},"9":{"t":[20.3,69.9],"p":"AA5KwQgGgTAHgpIAAAAQBRnuismyQhXjZhmh3IgYgcIB3g5IAoAaQgQgcAJAJIABABIACACIABACQDeFDBLEpIAAAAQBZFfhsFnIgBABIAAACQgkBTgiALIgGACIgCAAIgCAAIgNACQgcAAgJgigABpKYIABAAIgIABIgBAAIAAABQARASgDgLQgCgJADgQQAKgQANgeIAAAAQBmlWhVlPQhHkYjNkxIgQAIIgRAIQBfB4BPDLQCzG+hSH7IAAAFIgBAAIAAABIgBAKQgHAKgGAFIgCACIABgBIABAAIADAAg","fc":"#1D2226"},"10":{"t":[22.8,70.7],"p":"ABIKSIABgBIAIgCIgBAAIgDAAIgDABIgBAAIABgBQAGgFAHgKIABgLIAAAAIABAAIAAgFIACgFQBpldhVlWQhHkajNkzIAQgHQDNExBHEXQBVFPhmFWIAAABQgNAdgKARQgDAQACAJQAAABAAABQAAABAAAAQAAABAAAAQAAAAgBAAQgCAAgLgLg","fc":"#DBDDBC"},"11":{"t":[21.1,70.5],"p":"ABYKTIACAAIgBABIgBgBgABbKQIgBACIgCAAIADgCgAAJlIQhQjKheh5IARgIQDNEzBHEaQBVFWhpFdIgCAFQBSn7izm/g","fc":"#605E4A"},"12":{"t":[10.6,19.7,1.081,1.081],"p":"Ag3BeQgCgRAEgXQAJguAigeQAigiARgaQAJgNABgHIAGAnQADAsgTAcQgWAjgpAkQgaAXgGAAQgEAAADgJg","fc":"#DBDDBC"},"13":{"t":[19.9,17.6,1.081,1.081],"p":"AB4CDQgGgTgMgOQgNgQgQgGQgSgHgUAGQgRAFgSARIgIgHQANgYAVgMQAYgQAeAEQAZADAXAQQABgPgFgMQgGgOgNgJQgNgJgXgFIgugLIgPgFQgJgEgGgFQgPgMgCgSIAAgQIABgQIgYAYIghAgQgTASgMAOQggAjgKAkQgKAnAPAuIgSAGQgWgxAHgwQAGgsAigtQAMgQASgWIAegjQAUgWAHgMQAMgRADgPIAFgaIAcAGQAKABAKAIQAMAJAFANQAFAOgBAWQgBASgEAdIAAABIA2ANQAgAKAUANQAeATALAdQAJAagCAiQgDAbgJAaIgUBBg","fc":"#1D2226"},"14":{"t":[19.5,18.4,1.081,1.081],"p":"AiECbQgRgNgHgcQgGgaAFgXQALgwAQgeQAUgoAggbQAtgnARgbQAHgLABgGQAAARAEAUQAHAqAXAOQATAMA/AdQA2AdgCAgQgEA1gHAaQgIgbgVgRQgpgkg/AsQgLAIglAkQgeAcgXALQgNAGgKAAQgOAAgKgJg","fc":"#605E4A"},"15":{"t":[25.5,4.2],"p":"AByAkQiIgDhJgEQhGgEgngHIgxgJIAwgJQBggUC3gMQBagFBGAAIAAAUIguABIhxAEQh7AHhVALIAoADQAqADBgADQBgACBxABIAAAUg","fc":"#1D2226"},"16":{"t":[105.2,4.1],"p":"AoyAoIABgUIOTgGIBegEIAugDQAZgBAQgEIADgCIABgCQgBgDgHgCIgKgFIxAgEIAAgTIREgEQAJACAKAEQAMAGAGAIQAFAHABAIQABAHgEAGQgDAIgKALIgDADIgEAAQgNADgkACIgvABIhfABIsSACIiCAAg","fc":"#1D2226"},"17":{"t":[86.2,2.8],"p":"ArdAJIFvgWQREAEAAAIQABACAEAHIADAGg","fc":"#B7991A"},"18":{"t":[84.4,3.7],"p":"Ar0AJIBkgTIKxgKQK2gIARALQARAMgEANIgIAMI2JAFg","fc":"#685814"},"19":{"t":[8.5,11.2],"p":"AgrAwQAJgbA9hLQAEgBANACIg9BtQgMgFgOgDg","fc":"#A1C5E5"},"20":{"t":[12.2,12.1],"p":"AAjBrQAQgcANgaIANgdIAJgbQAKgjgBgXQgCgPgFgHQgFgGgMgCQgWgBggAOIgNAHIgKAHQgKAIgKALQgfAjghBCIgegPQAkhFAjgmQALgMAOgLQAGgEAKgFIANgHQANgGATgFQAVgFAPACQAJABALAEQAKAGAHAJQAKAOABAXQAAAcgOAkQgcBKgTAsg","fc":"#1D2226"},"21":{"t":[17.8,12.9],"p":"AgzBKQAQgbAdg5QAdhAAMggQAhADghCNQgdAjgOAig","fc":"#4F6877"},"22":{"t":[12,11.9],"p":"AgmBCIgjgHQgYgFgMgHQAfg7AbglQAhgrASAFQAqgTAgAIQBAAPg0CDQgUAQgRAlQg0gYgjgLg","fc":"#91B1CE"},"23":{"t":[36.7,35.3],"p":"AAwCHQgIhagkhvIAdACIACAAQAugBAZgDQA6C6h2B/QAIgygGg8gAgch3QhigShEgsQglgYgcghIAKgGQBXA1CtAXQCiAEA1hLIAiAFQgHBNiIAkIgDABIgEACIAAAAQgJADhAABg","fc":"#4F3A23"},"24":{"t":[36.3,36.5],"p":"AABFNQgHAAgGgFQgHgGgCgIQgCgIAEgIQAehFgJhmIAAgCQgHhdgoh0QhTgQg+gjIgcgQQg2gjglgzQgFgGAAgJQAAgIAFgHQBSh2IIBeQAIABAGAGQAFAGABAIQAUB8iuA2QBQEFjfCgQgHAFgIAAIAAgBgAA0B7QAFA8gHAyQB2h/g6i6QgZAEguAAIgCAAIgegCQAlBvAIBagAj1kAIgKAGQAcAhAlAYQBEAsBiASIBAAFQBAgBAJgDIABAAIAEgCIACgBQCJgkAHhNIgigFQjDghh3AAQhwAAgxAcg","fc":"#1D2226"},"25":{"t":[26.9,35.9],"p":"AAACBIhgkCQA/AiBRARQAoB0AJBcg","fc":"#989588"},"26":{"t":[35.5,13.1],"p":"AAXAzQitgXhXgzQBng5F0A+QgyBFiTAAIgSAAg","fc":"#6B4F32"},"27":{"t":[12.3,18.6],"p":"Ag/AIIAMgaIAAAAIAPAEQATAFAUAAQAbAAAVgJIANAaQgbALgiAAQgkAAgegLg","fc":"#1D2226"},"28":{"t":[9.3,12.7],"p":"AABApQgMgLgMgiIgJgiQgCgLAaAJQAYAKALAPQAMAPgLAbQgHASgKAAQgFAAgFgEg","fc":"#BF18E8"},"29":{"t":[11.2,13.5],"p":"AgHCFQgQgHgLgNQgEgEgMgTIgRgeQgLgSgFgPQgOgjgHgaQgGgWAAgXQAAgdAKgVIABgFQBjgRAxAgQA0AgAGAdIADADIABADIAAAFQAAAKgEAaIgHAnIAAABQgDAMgBAVIgBAZQAAALgCAIQgDANgKAJQgIAHgOADQgKADgNAAQgXAAgTgIgAhIhWIAAAHQAAAQAEATQAIAbAMAeQAGAQAZApQAHANAFAFQAFAHAFADQAMAFASAAIAAAAQAJAAAFgCIAHgCIAAgBIABgBIAAgTIABgXQABgWAEgOIAAgBIAAgBIALg+Qgqg8gvAAQgbAAgeATg","fc":"#1D2226"},"30":{"t":[11,10.6],"p":"AgrBPQgcgigOg/QgGgggBgaQBzgjAXAmQAWAmALAHQALAHACAEQAEAMgJAoQgIAmgEADQgQASggAAIgCAAQgdAAgngPg","fc":"#532670"},"31":{"t":[12.2,21.3],"p":"AgKAmQgSgFgSghIgOgeQASgGAWgCQAsgDAZAXQAbAXggAVQgWANgUAAQgFAAgHgBg","fc":"#4F6877"},"32":{"t":[15.1,16.9],"p":"Ag9CQIA4hlQAehsgHhcIAmgBIABAJQAEAXABAbQgCBKgYBYIAAAAIAAABIgJAPIAAABIgPAVIgOASIgZAcIgMALg","fc":"#4F6877"},"33":{"t":[8.5,16.2],"p":"AAACVIAWg1IghAuIgHgEQgOgeAMgmIAiAKIgegTIgpAkIgHACQgKACgFgGQgFgFAAgNQAAgNAFgQIABgEQAGgNAFgIIAIgJIAEgDIAEgDIAIgDIAShWQAMg3gCgMQABADgBgDIBjgCQAHBbggBtIg5BlgAgTANIAdiSIgUAAQgYBaAPA4g","fc":"#91B1CE"},"34":{"t":[7.7,10.2],"p":"AgChIIAUAAIgdCRQgPg5AYhYg","fc":"#A1C5E5"},"35":{"t":[11.1,17.5],"p":"AhACMIgGgZIgOgGIgIgEIgMAAQgIgBgEgEQgJgIgEgOQgEgUAIgcIACgFQAIgUAJgJIAIgIIACgCIAGgDQAHhCAJgwQAKgwALACQAIABAEAQQABADgBgDQACAMgMA2IgSBYIgIADIgEADIgEABIgIAJQgFAIgGAOIgBADQgFARAAAMQAAANAFAGQAFAFAKgBIAHgCIApgkIAgATIgkgKQgMAlAOAeIAHAEIAjgtIgXA0IADACIAWAPIALgMIAZgbIAQgTIAPgVIAAgBIAJgPIAAgBIAAAAQAYhXAChLQgBgbgEgWIgBgJQAWAEALAKQACAYABAUQABAVgOBCQgNA/gMAaIgIAPIgQAWIgRAVQgGAHgUARQgXAUgIAGQgQgIgsgfg","fc":"#1D2226"},"36":{"t":[8,16.9],"p":"AATCXQgDgBACgGQABgGAHgBQAKgBAZAEQAVADADADIgCADQgHAGgLADIgKAAQgQAAgUgHgAgbCYIgJgEIgGgDIgCgBIgDgCIgBgBIgKgHIgCgDQgEgFAHABIASAGQAJADAHAGQAHAFgEACQAAAAgBABQAAAAgBAAQAAABgBAAQAAABAAAAIgEAAgAgpBcIgrgQQAJgEAlAFQAjAEAIAFIANAFQACADgHAGQgDACgGAAQgNAAgggKgAgmAGIAniUQAdgaABASIghCWQgYAOgJAAQgFAAACgIg","fc":"#A1C5E5"},"37":{"t":[8.5,16.4],"p":"AAYCiIgUgHIANgeIAGgDIACgBIABgBQAGgIADgHQAFgJABgJIAAgHQAJABAQAGQAUAJAJAMIgBABIAAACIgMAjIgDAFQgCgCgVgEQgagEgKABQgHABgBAGQgBAGADABQAZAKAUgDQAMgCAHgHIgBACQgCAFgEACQgHAFgLABQgMgCgRgFgAgZCaQADgBgHgGQgHgGgJgCIgRgHQgIgBAEAFIACADIgKgJIgNgNIgBgBIAbAFQATAFASAJIAKAHIgEALIgBABIgFADIgFABQABgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBgAgJBrQgKAAgRgFIg0gTIgFgBIgBgGQAAgGADgJIACgBIABgDQANgFAQAAQAsgCApAgIgBADQgDAJgLALIAAAAQgFADgGAAIgJgBgAhZBRIArAQQAtAOAJgGQAHgFgDgDIgMgGQgJgEgigFQgUgDgMAAQgKAAgEACgAAUAkQgPgEgQgCIgygBIAihrIAJg7IgIABQAIgJAMgIQANgJAOgDIARgDQAjgBANABIAAAAIgsDSIgWgGgAgCiJIgqCUQgFATApgbIAiiUQgBgHgFAAQgHAAgPAPg","fc":"#91B1CE"},"38":{"t":[10.1,15.1],"p":"AgoCVQgRgKgUgFIgagFIAAgDIAtANQASADAOABIACAAIgFANIgLgHgAAyBkQgPgGgJgBQAAgFgCgEIAGgBQAGAAAGACQAJACAQAGIgBAAQALAFADAJIABAEIgBAIIgBACQgIgMgVgJgAhKBBQgRAAgMAFIAIgNIAJgGIAHgCIACgHIAzABQARADAOAEIAWAGIAsjTQAMgBAUAEQADAJgDAaQAAAHgLAoIgDAMIgBAHIgBAAIgKCAIADACIACADIgBAGIgFgDIgGgCIgBAAQgOgDgMAAIgOAAIgGACQgFgJgKgFIAAAAQgQgGgIgCQgQgDgLAAQAKABAPAGQAQAHAFAFQAGAFACAFQABAEgCAGQgoghgsACg","fc":"#4F6877"},"39":{"t":[10.3,17.6],"p":"AAiC1IgCAAIgggIIgZgJIgBABIgJAEQgKACgLgCQgIgCgIgFIgOgIQgNgIgKgLIgMgKIgEgFIgBghIgEgHQgEgHAAgJQAAgKAEgMIABgDIABAAIAAgBIAJgPIAGgHIACgDIAHgIIAEgDIgBgBQAUgwAHghIABgBIAEgcIAEgXQAEgMARgEIAJgBIgKA7IgiBrIgCAHIgHACIgJAGIgIANIgCADIgBABQgEAJABAGIABAHIAFAAIA0ATQAQAFAKAAQAPACAHgDIABgBQAJgKADgKIAAgCQACgGgBgEQgCgFgGgFQgFgFgQgHQgPgGgKgBQALAAAQADQAIACAQAGIAAAAQAKAFAFAJIAGgCIAOAAQAMAAAOADIABAAIAGACIAFADIABgGIgCgDIgDgCIAKiAIABAAIABgHIADgMQALgoAAgHQADgagDgJIgBgDQAOgBAIAEQAMAGABAUQABAIgFAqIgIAyIAAABIgRBWIAAACIgEAfQACANgFANIABABIgCAIIABgBIgIAkQgDAJgDAEIAAAAIgDAEQgEAIgHAGQgHAGgLADQgJACgHAAIgDAAgAAWA7QACAEAAAFIgBAIQgBAIgFAJQgDAHgGAIIgBABIgBABIgGADIgLAeIASAHQARAGAMABQALAAAGgGQAEgCADgFIAAgBIACgDIADgGIALgjIAAgBIABgCIABgCIABgIIgBgEQgDgJgLgFIABAAQgQgGgJgCQgGgCgGAAIgGABgAhpBoIAAABIANANIALAJIAKAIIABABIADACIACABIAGADIAJADIAEABIAEgBIAFgCIABgBIAFgLIAFgNIgCAAQgOgBgSgDIgtgNg","fc":"#1D2226"},"40":{"t":[7.1,16.7],"p":"AAACTQgGgGgCgSIgCgQIgBgFQACgMAKANQALANADARQADAQgEAEIgDAAQgEAAgHgGgAgnAyQAAgyAZhHQAUg4ARgZIASAEQgLAahBDQQgEgLAAgZg","fc":"#A1C5E5"},"41":{"t":[10.3,16.6],"p":"AgZCeIgBAAIgCAAIgDgDIgGgIIgRg3IgBAsIgDgBQgFgGgDgJIgHgWIgCgLIAAgLQgCgLABgJIADgXQADgaANguQALgpAGgOQAHgUAKgTIANgYIAAgBQAKAAALAEQAOAEAXAJQATAHAKAHQglA5gcB9QgMA/gEAoIAAAAIgUABgAgrBmIABAFIACARQACARAIAHQAJAIAEgDQAFgDgDgQQgDgRgLgNQgHgHgDAAQgDAAgBAFgAgvhGQgZBGAAAyQAAAZAFALQBDjPAIgaIgQgFQgQAZgXA5g","fc":"#91B1CE"},"42":{"t":[15.7,18],"p":"Ag6CQQAEgoAOg/QAch9Ajg5IABgCQAeAJAFAVIgJAPQgQAegDAUIgLBcIAFAHIADAEQACAEABAGQACAKAAAMIAAADQgCAPgEALQgFALgGACQgKAEgIgJIAAgMIABgjIgzBDIgGAAg","fc":"#4F6877"},"43":{"t":[12,17.3],"p":"AgqCtIgBgBIgCAAIgDAAIgGgCQgFgDgFgEQgEgEgCgEIgDgEIgPgEIgBgCQgIgJgHgQIgIgYIgFgYQgHhCAlhsQAHgTAJgRQAKgPAFgDQAJgEAGgGQgBACAKgGQAJgEgEAJIAAACIgNAYQgKASgHAUQgGAPgLAoQgNAvgDAaIgDAWQgBAKACALIAAALIACAKIAHAWQADAKAFAGIADAAIABgsIARA3IAGAJIADACIACABIABAAIABAAIAUgBIAGAAIAyhDIgCAkIAAALQAKAKAKgEQAGgCAFgLQAFgMABgOIAAgEQAAgLgCgKQgBgGgCgFIgCgDIgGgIIALhbQADgVARgdIAJgPQAHgMAEgCQADgDAFAOQAEAPgCANQgYAygJAqIgBAGIgCANQgBAOABAJIAEAJQAEAOAAASIAAABIAAADQgDAbgLAPQgIAMgLADQgEABgIgCIgLgEQgNAAgLABIgNASIgVADg","fc":"#1D2226"},"44":{"t":[44.7,22.9],"p":"AD/CuQgEAAgCgEQgCgDAAgEQABgEADgDIBNg2IhXiTIhcBDQgDACgEAAQgEgBgDgDQgCgEAAgEQABgEADgCIBkhJQADgCADAAQADgBACACQADABABADIBhCkQADADgBAEQgBADgDADIhUA8QgDABgDAAIgCAAgAknB7IgzgmQgDgCgBgEQgBgEACgDIBhifQABgDADgBQADgCACABQADAAACACIBHA3QAEADAAAEQABAEgDADQgCADgEABQgEABgEgDIg+gxIhWCOIAsAhQAEACAAAEQABAEgDAEQgCADgEAAIgCAAQgDAAgDgBgABKgRQgEAAgDgDQgDgDAAgEIAFhyIirgMIAEBvQABAEgDADQgDADgEAAQgEAAgDgDQgDgCgBgEIgFh6QAAgDACgCQABgDADgBQACgCADABIDAAMQAEAAADADQADADgBAFIgFB8QAAAEgDACQgDADgEAAIAAAAg","fc":"#1D2226"},"45":{"t":[61.7,55.3],"p":"AgYgDQAAgUAIgPQAEgJAFgFIAaAdIAAAAIgBACQgEAIAAAKQAAAPALAZIgjAQQgOghAAgXg","fc":"#1D2226"},"46":{"t":[67,55.5],"p":"Ag7ASQAjACAYgSQAMgIALgNIAJgOIhbAQIgDgpIB9ABIgDANQgFATgLATQgJAQgQAQQgRAPgSAHQgSAIgYACg","fc":"#1D2226"},"47":{"t":[65.9,55.4],"p":"AgyAcIAGgPIBfgxQgLAPgQARQgdAggXAHQgHACgFAAQgKAAAAgJg","fc":"#4F6877"},"48":{"t":[65.7,55.2],"p":"AgtAmIgFg/IAggIQAlgHAgADQgBAZglAaQgeAZgWAAIgGgBg","fc":"#91B1CE"},"49":{"t":[71.3,27],"p":"AgMC6QgKgGgHgOIgBgCIAAgDQgDgNgGgNQgDgLgIgQQgKgXgSgbQgRgYgTgVQgUgUgXgRIgDgDIgCgDQgJgQADgSQACgLAGgGIAGgHIADgDIADgBIB1hbIABgBQAKgGANAAQALAAAKAHIAJAJIACADIABABICJDXIAFAKIACALQAAANgGAKQgDAGgFAEIgCACIgBAAIAAABIgBAAIAAABIh8BRIgLAFQgIACgHAAQgHgBgHgEgAh/hBIgDACIgCACIgBADIABAHQAaASAUAVQAXATASAdQARAaANAfIAMAeIAGAdIACAEIACAAIAEgCIADgBIAEgDIB1hDQAGgEACgDQADgEAAgFIgBgFIAAgCIgBgBIAAgBIgBgBIgSgdQgig2glg6IgwhKIgBgBIgBgCIgDgCQgIgGgJAHIABgBIhwBig","fc":"#1D2226"},"50":{"t":[66.4,26.6],"p":"AAvClQgHgFgZgeQABgCgBgDQgSgugTgbQgIgLgXgWQgVgTgJgNQAAgBgEgDQgPgdACgJQAGgVA6gqQAxglAjgOQgxBUAtB6QAXA+AiAuQgIAJgLAIQgLAIgKAAQgHAAgHgFg","fc":"#686C72"},"51":{"t":[78.1,22.2],"p":"AgQAPQhHh2AAgLQgBgKAGgFQADgDADAAQCdDrAGAMQAFAIgTAGIgUAEIhFh2g","fc":"#C7CDCF"},"52":{"t":[72,26.3],"p":"AABCuQgKgCgHgKIiFjFQgHgKADgLQACgMAKgGIB0hfQAJgGAMACQAJACAHAKICKDZQAHAKgCAMQgCALgKAHIh5BKQgHAFgIAAIgGgBg","fc":"#9BA7AA"},"53":{"t":[43.3,6.7],"p":"Ah4AAQgBglAIAAQAJgBBxADIBwADIhgAOQhfAPgJAEQgIAFgQARIgPAPQgCgTAAgTg","fc":"#C7CDCF"},"54":{"t":[43.7,11.6],"p":"ABwB6IAAAAIgCAAIg4gLIg3gIQgdgEgcgBIgcAAIgOABIgMACIgDABIgCAAQgRgBgNgMQgNgMgBgRIgBiTQABgPAMgKQALgKAPAAIAGAAIBjAIIBSAFIA+ACQAPAAALAMQALAMAAAOIgDCgQgCAMgHAHQgIAKgNACIgKABIgIgBgAB9BXIABgCIABgKIAAAAIANiQQAAgGgEgFQgEgGgHgBIg+gFIhSgFIhUgEIgUgBQgGAAgGAFQgFAFAAAHIAAABIAAAAIAAADIALCKQACAJAIABIAegFIAfgCQAdAAAeADQAoAFAUAEQAbAFAfAJIgBAAIAGABIABAAIAAAAg","fc":"#1D2226"},"55":{"t":[43.7,12.3],"p":"AAFBbQhhgMgigLQgSgFgCgQIABgPQA3ADA/gOQB9gbAphZQAIAnAAA5QAABGgOARQgIAIgmAAQgfAAgzgFg","fc":"#686C72"},"56":{"t":[43.7,10.7],"p":"Ah0BZQgMAAgJgJQgIgIAAgMIgGiLQAAgMAJgIQAIgJAMAAID1APQANAAAIAJQAIAIAAAMIgICQQgBAMgHAIQgJAJgMAAg","fc":"#9BA7AA"},"57":{"t":[43.4,44],"p":"ABmEwIgDAAIgDAAIgBAAIgDgBIgGgDQgGgEgDgGQgCgGAAgIIABgHQABgIAGgMQATgsAGgVQAGgPABgOQABgOgEgHQgFgHgMgDQgNgCgRABQgdADgPAWQgLAQgKArIgCAKQgCAHgDAGIgFAFQgEAEgFACIgGABIgFAAIgtgEQgogEgfgFIgIgBIgBgBIgEgBQgJgEgFgHQgGgIgDgQQgDgOAAgYQgBgdgBgEQAAgGgDgEIgCgBIgDABIgHACQgHACgJAFIgFgCQgDgLAJgMQAEgGAFgDQAEgDAIgDIADAAQAGAAAJADQAHADAGAHQAGAJADAOQADANABAYQABAXACAJQABAIADABIAAAAIAEABIBFAGIAjADIABAAIABgFIAJgkQAHgVALgQQALgTATgLQATgLAXgBQAXgCASAEQAMACAKAGQANAGAHAMQAHALADANQACAMgCALQgBARgHAWQgDAJgYA6IgBABIARgCQAfgEAagSQAYgPASgeIACgEQgwAegUACQgDAAgDgBQgDgCgBgDQgBgDABgEIAPg0QABgEAEgCQADgCAEABQAEABACAEQACADgBAEIgKAjQAYgKAtgeQANgnACgyQADhGgTg+QgVhGgpgxQgsg3g9gZQhAgZhCAOQhCAMg2AvQg1AsgdA/QgdA/gDBDQgBAcAEApQADAgAFAYIAFAHQgFhXAmgZQAmgcAnAkQABi1Bdh2QACgDAFgBQAEAAADACQADADABAEQAAAEgCADQhgB6AGDAQAAAEgCACQgCADgDABQgDABgDgBQgDgBgCgCQgjgvggAVQgjAbANBhQABAEgCACQgCADgDACQgDABgDgBQgDAAgCgDIgCgDQAGAXAGAPQAHARAJAKQAFAFADABIAEABIABgBIABAAIACgBIAKAbIgGACIgHABQgHAAgHgDQgLgEgIgKQgMgOgIgVQgLgcgIgqQgNhMAChEQAChHAghDQAghFA3gwQA8gzBGgOQAlgIAjACQAmADAjANQBFAZAyA9QAvA4AYBJQAWBEgDBLQgCBXghA6QgVAkggAWQghAWgoAGQgQADgNAAIgLgBgAgvBoQgEgBgBgDQgDgCAAgDQgNjfBlh4QADgDAEAAQAEgBADADQADADABAEQAAAEgDADQhaBtAGDCQAwgzBYALQAZABAwAaQAEACABAEQABAEgBAEQgCADgEACQgEABgEgCQgrgXgXgCIAAAAQhcgLgqA/QgCACgEACIgDAAIgCAAg","fc":"#1D2226"},"58":{"t":[36.1,29.7],"p":"AioBRQgKgfAhg1QAjg7BDgaQAbgKAZgEQgUAUgaAyQgbAxgLAjQgVAggfAOQgKAFgIAAQgQAAgHgWgAApAqIAFgWQAKgnAQgXQASgcAQgcIgBAAQAyAOANAiQANAhgqAVIhkAnIACgBg","fc":"#B4B4B4"},"59":{"t":[36.3,28.8],"p":"AgpAIQAQgpAHgNQATgqAZgIQATgCATACQgDAGAEAFQAEAEgGAMIgJARIgLAMQgIAIABAGQABAFgNAVQgMATgNAyIAEgDIhFAgQAGgpATgxg","fc":"#C7CDCF"},"60":{"t":[41.2,40.5],"p":"AkBCjQgQhHAEgxQABh3BbhZQBKhIBcgMQgRAWgnAuQglAtgbAjQgaAjgXAwIgZA2QgNAcgHAcQgGAcgEAZIAAA8IgPgMIAEAMIAMAIQgBASABATQgThFgEgSgAgUBkQgIglALg1QALgzAHghQAKghAIgQIAzhXIAPgcIAEgGQArALAnAaQBBArAjBIQh7A/g/AyQgmAggZAhIADgEIgNAGIgVANIgGABQgCAAgDgCg","fc":"#7C7C7C"},"61":{"t":[33.8,38.8],"p":"AgBDrQgsgCgWgIQgCg1gRgYQgOgWgSAKQgTAJgMAhIgFAUIAAghQADgZAGgLQANgaAhAAQAPAAAQANIAOANQABAAABAAQAAAAABAAQAAAAAAgBQABAAgBAAQACgIAAgNQAAgsAIgzQAKgzAPgmQAQgrAxhLIAZgmIAbgBQAcAAAaAGIgCAEQgUAfgjBGIgdA0QgRAfgHA3QgEAmgCAVIABAMIgBgGIAAAKQAAATAFAHQADASAGAAIAOgIIACAAIAQgHQglA5AAA7IgxAAg","fc":"#9BA7AA"},"62":{"t":[43.9,39.8],"p":"ACxDdQADgNAAgMIgCgdIgCgcQADgPgCgEQgBgGgUgQQgLgGgQgFQgigMgiAAQguAAghAYQgRANgKANIAAgBQgCgVgCgLIgBgWQAAgSAFg4QABgRAHgYIAMglQAPg2AagkQAlgxA3gGQAxAVApAsQBRBWAAB4QAABugNAxQgXAHgJAFQgKAFgWANQgTAMgMAEIAGgcgAkWDMIAAgFQAFhpAAgyQAAh4BRhWQBJhNBjgIIgWAXIAAgBQg4A9gfBbQgaBPAABRIAEASIgBAEIgXgPQgTgMgLAAQgHAAgRAMQgOALgFAGQgFAHgCAJIgCARQgCARgDAzIgQgIg","fc":"#626262"},"63":{"t":[43.1,43.4],"p":"ABoEBQALgoAEgXQARhbhBAAQgiAAgQATQgIAJgMAhQgJAdgPANQgXAUgtABQhCACgGhAIgCgrQgBgUgIAAQg9AAAJBdQACASAIAsQAFAagFgDQgugcgIhKQASALADAAQAEAAAAgFIgDgWQAAgOAFgqIACgOQACgIAGgGQACgEAOgKQAQgLAEAAQAFAAAZAPQAYAQACAAQAEAAAAgDIAAgEIgFgaQAAguAFgbQAFgiAOgtQAFgPALgYIASgmQAFgOAZghIAQgWIAAAAQAHAAASgcIAHgJIAQAAQAwAAArAPIgFABQhDAOgoBjQgmBYAABlQADA/AHAAQAGAAAMgNIAQgRQALgMAKgDQAOgGAegBIASAAQAaAAAlAPQAmAQAAANQAAAdADAqQAAAKgDALIgGAYIAAAOIAFABQAKAAAYgOIAdgSIAegLIgBAAQgkBnh/AFIAAAAQgJAAAGgcg","fc":"#686C72"},"64":{"t":[13.8,22.6],"p":"AgjBsQgXgXAEgHIBtjOIgiBRQggBTgCAXQgBARADA1IgYgVg","fc":"#C7CDCF"},"65":{"t":[19.9,25],"p":"AgaC4IgLgGIhnhUIgEgFQgEgEgCgFQgEgKABgMQACgLAGgJIgBABIA8hlIA5hpIAAgBIABAAQAKgOAQgDQAPgDAOAKIBtBkIACABIAGAGIAGALQAGALgCAMIgDAMIgEAJIgBABIAAAAIgoA+QgfAxgkAzIgMATIgBABIgCACIAAAAIgGAGQgJAIgLADIgIAAQgIAAgIgCgAgJibIhzDPIgBABQgFAIAEAIIAGAGIBiBGIADADIACABIADABQAGACAEgEIABgBIABgCIAAABIAKgTQAvhLASgbIAsg+IABgBIABgDQABgDgBgDIgCgCIgDgEIgBAAIhlhoQgFgEgHAAQgEAAgFAGg","fc":"#1D2226"},"66":{"t":[22.8,24.8],"p":"AhMChIgdgOQAlgsAcg+QA1h5gthWQAgAOAvAqQA1AtAFAWQAFAWg+BVQg4BSgWAQQgHAFgLAAQgMAAgQgGg","fc":"#686C72"},"67":{"t":[19.3,24.5],"p":"AgaCmIhlhNQgJgIgCgMQgCgLAHgKIB0jPQAHgJAKgCQALgCAKAHIBqBnQAKAGACANQABALgHAJIh5C3QgHAKgJABIgFAAQgJAAgIgFg","fc":"#9BA7AA"},"68":{"t":[25.9,62],"p":"AgFAPQgYgLAEgSQACgJAHACIAQAHQALACAJAJQAJAIgCAKQgCAIgIAAQgJAAgNgIg","fc":"#1D2226"},"69":{"t":[25.9,61.4],"p":"AASAYIAAgBIgFgKQgFgHgKgJQgRgOgbgQQAjAKAPAIQAQAHAJAIQAIAFAEAFIAEAJIACAGIAAAEIgBAFg","fc":"#1D2226"},"70":{"t":[46.5,64.3],"p":"AgcAJQAAgJALgHQAKgIAKAAQAHAAAMgDQAHgBAAAJQAAATgZAGQgLAEgIAAQgNAAAAgKg","fc":"#1D2226"},"71":{"t":[46.7,63.8],"p":"AgzATIABgDIADgGIAFgIQAGgEAIgEQALgGARgEQASgFAigDQgeALgTALQgMAHgGAFIgGAIIgBACIgdAFg","fc":"#1D2226"},"72":{"t":[33.6,72.6],"p":"AA0AMIgRgFQgSgFgPgCQgOAAgTgBIglgBQAPgLAUgEQAWgEAPADQAWAEAPAJIARAJQAKAJABAHQgFgEgMgEg","fc":"#1D2226"},"73":{"t":[35.2,67.1],"p":"AgEAfQgggFgRgLQgPgJgDgLQgEgNAIgNQABAPAFAGQAEAGAMAEQALADAhAEQAdAEAOgBQANgCAFgEQAHgFAFgNQAEAOgHALQgIANgPAEQgMAEgRAAIgVgBg","fc":"#1D2226"},"74":{"t":[44,56],"p":"AhcEsQgQgBgQgFQgQgGgMgKQgLgJgKgMIgRgWQgVgdgIgSQgNgZgFgdQgDgWAAghIAChnQABg+AMgtQAQg7AhgmQAVgXAWgNQAUgNAegJQAugPA7ADQA9ACAsAYQAxAZAcA1QAXAtAJA7QAFAnAABBQgBBEgLAoQgJAcgQAYQgPAVgZAVQgRAMggAQQgcANgWAHQg5AVgsAJQgfAGgWAAIgDAAgAhNkKQgxAPggAmQgeAkgMA1QgKAsACA4IABBmQABAfAEASQAEAYAMAUQAKATARAWQAUAaALAJQAQAMAVABQARAAAfgFQArgIA0gTQAggMAPgHQAbgLAPgMQAogeAPgsQALgiADhBQADg8gFgoQgGg4gUgoQgWgugsgXQgogWg3gDIgTgBQgqAAglAMg","fc":"#1D2226"},"75":{"t":[16.7,50.1],"p":"AAKAxQgQgIgRgRQgNgOgKgSQgKgVgDgTIgDgNIB9AHIgGAoIhZgVIAIAOQAJAOANAJQAXAUAiAAIgDAoQgWgDgUgKg","fc":"#1D2226"},"76":{"t":[17.4,50],"p":"AAaAlQgWgIgbgiIgZgiIBcA3IAFAPQAAAJgJAAQgGAAgIgDg","fc":"#608420"},"77":{"t":[17.9,49.9],"p":"AgPANQgjgcAAgZQAhgBAkAJQATAFANAFIgJA/IgEAAQgWAAgfgcg","fc":"#98CC46"},"78":{"t":[44.5,59.4],"p":"AiHDmQgmgXgZgwIgSgsQADgIAFgJQAKgQALABQAIAGAEAQIAHAeQANApAyALQAoAIAhgMQARgGAPgJQAggKAhgeQAigfgEgWQgCgKgigEQgWgCg2gBQhSgBgogIQgigFAGgHQAIgIBkAFQCcAIAshaQAQgiAGg7IAIhqQAMAJAOAwQAPA1AEA9QALCkhPBRQg7A8hdAPQgdAEgYAAQgwAAgegSg","fc":"#4F6877"},"79":{"t":[25.7,52.2],"p":"AgjCHQgEgJADg4IAEhgQABgmAahAIAYg4IgKAhQgJAsgCA1QgFBSAFAmQArA6gCACIg6A7QgKghgGgRg","fc":"#4F6877"},"80":{"t":[44.4,55.7],"p":"AjCDPQgehFADiZQADiBA1hFQA4hJBtABQBwAAA4BJQA1BFABCAQABCBhnBbQhcBRhlAAQhYAAghhPg","fc":"#91B1CE"},"81":{"t":[3.8,22.4],"p":"AAAAAQAAAAAAAA","sc":"#000000","ss":[0.1,1,1]},"82":{"t":[23.2,30.1],"p":"AAOD/IgOgaIAEhkIgmgdIgMgBIgPgFIgVgJQA1h9g8jXQAQAHAOASQAQAUAKAeQARAuAJBJQAHA/gBA5IAAADIACAfIAFARIACAGIAEAHIAHAHQAVAXAQAUQAUAaANAUIABACIgsgdIgggXIAAAnIABAwIgBgBg","fc":"#605E4A"},"83":{"t":[13.7,28.9],"p":"AAODgQgDgZAGgXQAGgXAQgQIAXgWIgFgBIACgCIAoAdIgFBkIgSggIgUgpIgBACIgCgEIgCANIghBDQgDgKgBgMgAAvBvIAMABIgFABgAhGgJQgZgvgChFQgCgiAEggQgBg2AeAAQAfAAAOBOQAOBPgSBAQgKAjgNAAQgKAAgMgUgAhZgZIAAgBIAGAQIgGgPg","fc":"#DBDDBC"},"84":{"t":[10.8,26.6],"p":"AA4ElQgFgLgEgMIAhhEIgRBnQgEgFgDgHgABVDBIAAgBIAVAogABUCJIAEgBIgCABgAgOBPQgLgNgKgPIgRgiIgCgFIgFgPQgGgRgDgUIgBgBIgOgvIgOggQgIgUABgOQgGhDApg0QApg0AgAkQAUAVACAFIgGgBQACAqACAAIAJADQA8DWg1B+QghgQgVgagAhCinQgDAfABAjQADBFAYAsQAcA0AQhAQARhBgOhOQgLhOgfAAIAAAAQgfAAABA2g","fc":"#989588"},"85":{"t":[18.8,31.7],"p":"AgHE1QgSgHgOgOQgKgLgJgRQgOgbgDggQgDghAIgeQAGgTAKgPQgngTgdghQghgngRg5QgOgygBg3QAAgcACgdIABABQgCAOAJATIANAhIAPAvIAAABQAEATAFASIAAABIAGAPIACAFIARAhQAJAPAMAMQAXAbAgAQIAWAIIAPAFIAFADIADAAIAFACIgVAVQgQAQgGAYQgGAWADAZQABAMADALQADAMAGALQADAGAEAFIAPhmIACgNIACAEIAVAnIASAgIAPAbIABAAIgBgvIgBgoIAhAXIArAdIgBgBQgMgVgVgZQgQgVgVgXIgGgHIgFgHIgCgFIgEgRIgEggIAAgDQAAg3gHhBQgJhJgQguQgJgdgPgVQgOgSgQgHIgJgCQgCgBgCgpIAGABIAGABQAUAEAQAMQANAKAMAQQATAZANAlQASAxAKBOQAHA8AABCIAAgBIADAbIAEAMIADAEQATATAVAbQAVAbAOAYQAKAPAFAOIAGATIAAANQgBAIgGAIIgLAOIgPgIIgtgbIgLgIIADA4IABAQIgPAGQgKADgMgFIgLgHQgIgHgEgGQgJgKgKgPIgBgDIgKA5g","fc":"#1D2226"},"86":{"t":[75,25.8],"p":"AgVAwQgUgdgNgjQgKgigDgzIAAgBIA7ABIAAAAQABASAEAZQAIAsAUAbQASAZAZANIgcA1QgmgVgXgjg","fc":"#1D2226"},"87":{"t":[80.8,22],"p":"AgnBXQACABAFgFIAMgIIAUgUQAWgXASgYQAUgXANgaQARggABgUIgBgKIAAgBIgHAAIgOACQgVAEglANQgfAOgWANIgYARQgNAKgFAIIgrgqQAMgKAVgLIAfgOQAdgMAigKQAggLAfgFQALgCAHAAQAPAAAIADIAJAEIACACIAEAFIADAGIACAGQAEAKgBAMQAAAQgHAUQgHAUgGAMQgMAYgUAhQgTAcgTAaIgWAbIgNANQgHAJgJAFg","fc":"#1D2226"},"88":{"t":[81.4,21],"p":"AgkBQQglgigSg5QA9AqBBg8QAigfAVgoQAEAPgEAcQgHA2gkA6QgPAWgUAPIgPAJQgPgEgSgRg","fc":"#AA9D85"},"89":{"t":[83.2,20],"p":"AhRAVIgGg1QAdgfA9gcQBAgcAMAPQAaAhgwBaQguBbgfABQgtgdgQg9g","fc":"#F0E7D7"},"90":{"t":[44.1,46.3],"p":"AAGBAQgOgBgMgGQgQgHgJgOQgIgMgCgSIAAgNQAAgHACgIIAEgHIABgBIAQgIIAOgGIAYgKQARgGAKgCIAIgBQADAAADACIABABIABABIACACQAEAFABAKQABAWgIAfQgFASgFAJIgIANIgIAIIgHADIgIACgAgHgBIgBAFQgBAGACAFQABAEAEAEQAEADAHACIAGgGQAIgIAHgLQAQgagBgTQAAgFgDgEIgBgBIAAAAIgFABQgJADgMAKQgLAJgFAJQgJANABAHIAEgHg","fc":"#1D2226"},"91":{"t":[44.9,45.8],"p":"AgpARIgDgaQAQgPAcgOQAggQAHAHQAOAQgQAoQgPApgRAAQgjgEgLgdg","fc":"#F0E7D7"},"92":{"t":[54,26.7],"p":"AACBnQgXgEgRgHQgXgLgNgVQgLgSgCgaQgBgNABgHIAFgXIACgGIACgCQAPgMAbgQIAmgUQAcgMAQgFIAOgBQAGgBADACIAFACIAEAFQAJAJACASQABASgFAdQgGAXgHATQgKAZgKASQgIANgHAHQgGAHgGADQgEADgFABIgHADgAgmAAIgBAOQAAAOAFAJQAEAKAMAGQAIAFAPAEIAFgDIAMgOQALgPALgTQAKgRAGgUQAHgWgCgQQAAgJgEgFIAAgBIgBAAIABABIgBAAIgIABQgPAEgVAOQgQALgPAOQgTATgFAMIAEgIIgDALg","fc":"#1D2226"},"93":{"t":[55.3,26.5],"p":"AgvA5QgZgbAMgbIAOAHQARAHAPgCQAwgFAThWQAXAAgWBIQgWBGgbAJQgFACgIAAQgUAAgTgUg","fc":"#AA9D85"},"94":{"t":[54.9,26.8],"p":"Ag0AcIgEgwQASgaAngYQApgYAIANQARAcgWBFQgVBGgVABQgqgIgNgzg","fc":"#F0E7D7"},"95":{"t":[22.1,47.5],"p":"AACBAIgHgBIgIgDQgFgCgEgEIgKgNQgHgLgGgPQgGgMgDgMQgFgQAAgNQAAgKAEgHIACgCIAAgBIABgBIAAAAIABgBQADgCAEgBIAJAAQAKABASAFIAaAIQAUAHAKAFIABABIAEAGQADAHABAIIACAPQAAAQgGANQgJARgOAIQgLAGgQADIgCABgAgqgmQABASASAXQAIAKAJAHIAGAFQAFgDADgDQADgDABgEQACgFgCgGIgBgFIgCgFIAEAHQAAgIgLgLQgGgIgLgHQgMgHgLgDIgDAAQgCADABAFg","fc":"#1D2226"},"96":{"t":[21.9,47.4],"p":"AgkAJQgSgmAOgQQAGgHAiANQAgAOAQAOIgDAaQgLAdgjAEQgRgBgSgmg","fc":"#F0E7D7"},"97":{"t":[15.6,28.8],"p":"AgBBiIgKgDQgHgEgGgFQgHgGgKgNQgLgQgNgYQgJgSgIgXQgJgdAAgRQAAgRAHgLIACgDIABgBIABAAIABgCIADgBIAJgDIAOAAQAVAEAYAIQATAHAWAJQANAFAJAFQANAHAJAGIACACIADAGIAHAVQADANAAAHQABAZgKAVQgKAXgWAMQgSALgXAEIgBABgAhFg8QAAARAKAVQAHAQANASQANATAMANQAIAIAGAEIADADQAOgEALgHQAKgHAEgLQAEgKgCgOIgCgMIgFgMIAFAHQgHgMgUgPQgNgKgVgMQgYgMgOgCIgIgBIgBAAQgDAGAAAJg","fc":"#1D2226"},"98":{"t":[14.7,28.6],"p":"AARBSQgOgDgOgQQg9g/gBgvQAAgPAFgLIAGgJIAoAzQAvAtAxgSQgGAjgVAdQgKAOgKAHIgFACIgFgBg","fc":"#AA9D85"},"99":{"t":[14.9,28.3],"p":"Ag0ANQgdhAAUgZQAJgKA0AbQAvAaAXAXIgFAoQgPAsgyAGQgZgBgbhCg","fc":"#F0E7D7"},"100":{"t":[50.8,18.9],"p":"Ai+ErIgEgCIjYh4IgEgDQgBgDAAgDIABghIABghIAAgBIACgFIAOgtIABgBIAAgBIAAAAQBQj0F5hmQAEgBADACQCuBcByCtIABABQAfAtAbA2QACADgBADQAAACgCADQgCACgCABIpUDXIgDABIgBAAgAmLCSIAAARIDOBzIJFjSQgWgrgZglIg1ASIAeAqIACAFIAAABQAAADgCACQgCADgDABIn3CxIgEAAIgFgBIjHh4IgBAbgAmHBhIDLB6IBOgbIGYiPIgagkIm0CnIgWAIIgEABIgFgCIi6h3gAhAjqQjhBbhKCiIgMAdIC7B4IHKitIADgBIA8gXQgcgqgggkQhbhph3hBQhEATg7AYgAi+BtIgFgCIiChSIgDgEIgBgFIABgFIAFgIQByihDUhKIAmgMIAEAAIAAAAIAEABIARALQBUA4A2BFIAAABQARAVAOAYQABACAAADIAAABQAAADgCACQgCACgCABImgCbIgEABIAAAAgAAGjUQiiA5hnBwIgDAEQgXAagUAaIB1BLIGPiVIAAAAQgKgRgNgQIAAAAIgBgCQg4hHhZg5IgkAMg","fc":"#1D2226"},"101":{"t":[41.8,18.6],"p":"AktBkIAKgdIC7B3IAEABIAEAAIAWgJIA3AMIhPAcgABgjRIAlgMQBYA5A4BHIACACIAAgBQAMARAKARIjBh5QinAyhtBZQBnhwChg5g","fc":"#C7CDCF"},"102":{"t":[48.8,17.9],"p":"Al3CcIABgbIDHB4IAEABIAEAAIH3ixQADgBACgDQACgCAAgDIAAgBIAhAFIogDIgAiRC+IG1inIAZAkImXCPgAlXAdQBJiiDihbQA5gYBFgTQB4BBBbBpQhohdhoggIgRgLIgDgBIgBAAIgEAAIgmAMQg5AGhVAwQhUAxgWAVQgjAbgnA3IgDAdIgFAIIgCAFIABAFIAEAEICCBSIAEACIAFgBIGfibQADgBACgCQABgCABgDIAAgBIAoAJInPC1gAkeAXQAUgaAXgaIAEgEQBthZCngyIDCB5IAAAAImPCVg","fc":"#9BA7AA"},"103":{"t":[50.6,21.1],"p":"AmJCNIABgRIDOBvIIhjIIghgFIgCgEIgegoIA1gUQAZAlAWArIpEDRgAl1AaIAMgcICwBxIHPi0IgogJQAAgDgBgCQgOgYgRgWIAAAAQg2hFhUg4QBnAgBoBcQAgAlAdApIg9AXIgCACInLCsgAk9gxQAmg2AjgbQAXgWBUgwQBUgxA6gFQjUBJhxCkg","fc":"#686C72"},"104":{"t":[18.2,18.9],"p":"AgQCBIgMgOIgTgbQgSgbgPgcQgQgfgLgaQgHgQgDgPQgGgTAAgQQAAgKACgKIAEgLIAFgHIABgCIACgCQAFgFAJgDIALgCIASgBQAgACAhAIQAjAJAZAJQASAGAOAHQATAIAOALIgrArQgEgHgMgKQgLgIgNgHQgZgNgbgJQgjgKgWgCIgMAAIgEABIAAAAIgBAEIgBAKQAAAXAOAeQAMAaARAXQAPAZAUAWIASAUIAKAIIAFAEIgYA2QgJgGgIgJg","fc":"#1D2226"},"105":{"t":[16.5,17.7],"p":"AACBbQgSgOgPgWQgkg7gHg1QgEgcAEgPQAQAgAbAZQA0AwA4ghQgTA5gVAqQgLAVgHAJQgHgCgKgIg","fc":"#AA9D85"},"106":{"t":[16.3,16.7],"p":"Ag4ATQgwhaAaghQAMgPBAAcQA9AcAdAfQACAZgIAcQgQA9gtAdQgegBgvhbg","fc":"#F0E7D7"},"107":{"t":[35.2,63.1],"p":"AgQAbQgLgUgCgNQgBgMAGgGQAFgGAMABQANABAUAKIAEADIgUAXIgWAWg","fc":"#1D2226"},"108":{"t":[24.9,63.2],"p":"AAAAUIgUgVIgJgNIADgEQAVgKANgBQAMgBAFAGQAGAGgBAMQgDAPgLASIgDADIgNgKg","fc":"#1D2226"},"109":{"t":[60.8,47.7],"p":"AgdBGQgQgHgDgaQgDgZANgcQANgdAUgPQASgQARAHQAQAHADAaQACAZgMAbQgNAdgUAQQgMALgNAAQgFAAgFgCg","fc":"#000000"},"110":{"t":[59.9,48.9],"p":"AgdBGQgQgHgDgaQgCgZAMgcQANgdAUgPQATgQAQAHQAQAHADAaQADAZgNAbQgNAdgUAQQgMALgMAAQgGAAgFgCg","fc":"#514F40"},"111":{"t":[23.1,42.5],"p":"AgSgBQgZADgTAPQAXhFAzAQQAVAHAPAVQAPATAAAcQgggxgxAJg","fc":"#DBDDBC"},"112":{"t":[27.1,48.3],"p":"Ag4A0IAnhvQAYAMAYAbQAaAaAAATQAAAYgyAIQgQADgOAAQgWAAgLgIg","fc":"#605E4A"},"113":{"t":[16.4,48.6],"p":"AAPA5QgJgCgKgTQgNgTgGgVQgHgYACgQQADgPALADQAJACAKATQANATAGAVQAHAYgCAQQgDANgIAAIgDgBg","fc":"#000000"},"114":{"t":[17,49.6],"p":"AAQA5QgLgCgLgTQgOgSgHgWQgHgYAEgPQADgQALADQAMACALASQANATAIAWQAHAXgEAQQgDAOgJAAIgDgBg","fc":"#605E4A"},"115":{"t":[52,42.4],"p":"AgSGoQgWgCgVgGQgngKgogVQhGgkhAg9Qg+g+gkhHQgohRAChQQABhZAShHQAYhaAzg5QA2g7BWgbQBEgWBcgCQBWgCBIAOQBaASA8AwQAgAZAYAlQAXAkANAnQAVBEAFBdIABAoQABASgDAWQgDApgOAoQgZBMg5BFQg4BAhGArQhPAvhQAJIgWACgAgQmIQhYADg+AVQhNAagtA1QgtA0gSBQQgPBCACBVQABBFAlBEQAiA/A5A2QA3AzBCAhQAjASAhAIQAWAFALABIAOAAIASgBQBDgHBFgoQBBglAxg4QA0g8AYhBQANgjAEgkQADgVAAgNQABgUgBgTQgChZgSg9QgXhOg1gsQgzgrhTgRQhBgOhHAAIgPAAg","fc":"#1D2226"},"116":{"t":[77.2,40.3],"p":"AgKgfQAjgPAjAaQgvAMgoAXIggAXQAJg2AogPg","fc":"#989588"},"117":{"t":[25.4,58.5],"p":"AgYAMIgSALQAOgwAdACQAeADANAsQgrgTgZAHg","fc":"#DBDDBC"},"118":{"t":[48.4,46.9],"p":"Ag4A0IAnhvQAYAMAZAaQAZAbAAATQAAAYgyAIQgPADgOAAQgXAAgLgIg","fc":"#605E4A"},"119":{"t":[58.1,29.4],"p":"AhNBCIA2iNQAgAPAiAiQAkAhgBAZQAAAehEAKQgWAEgTAAQgfAAgPgKg","fc":"#605E4A"},"120":{"t":[23,30.8],"p":"AhOBBIA2iMQAiAPAhAiQAkAhAAAZQAAAehFAKQgWAEgTAAQggAAgPgLg","fc":"#605E4A"},"121":{"t":[57.6,46.1],"p":"AirFNQg5gZgygwIgngqQAiAEA0gEQBngHBUgnQEMiAgQmSQAagGAhA/QAhBDANBcQAgD1iZCOQh8Bzh5AAQg7AAg7gbg","fc":"#605E4A"},"122":{"t":[39.1,19.6],"p":"AjSCHQgUgxAohSQArhXBPghQBWgkBaADQBdADAQAsQAHAVhCAVQhuAigpAWQhKAlhSBUQgcAcgKAEIgHACQgJAAgHgQg","fc":"#DBDDBC"},"123":{"t":[51.8,41.7],"p":"Ah0FzQhEggg8g2QiPiDAAiaQAAi7BMhgQBdh1DagBQDoAABZB2QBDBZAADCQAACeiDB8Qh7B0iGADIgCABQgyAAhAgfg","fc":"#989588"},"124":{"t":[38.2,66],"p":"AkRD3IAAgUQAPisgJiOQgJiQgpihQC2GOCCAbQELA0ApmSQAPA/AABHQAAC3hpCQQgwBDhDAvQhQA5hCA/QgQAPgWAAQhEAAh3iSg","fc":"#605E4A"},"125":{"t":[36.6,45.7],"p":"AByHOQBEgwAwhCQBoiRAAi5QAAhFgOg+QgYhmg+hRQhiiAjZhJQjchKAACXIAADoQApCgAJCPQAJCQgOCsIgBATIgtA9QgRgrgDg0QAekXgiiGQgsivgFj6QgEj7EDBdQEABdBzCQQBzCPAJDTQAJDVh7CpQhnCNh1BIg","fc":"#1D2226"},"126":{"t":[37.4,31.7],"p":"AABF4QiAgai2mOIgBjoQABiXDbBKQDZBJBiCAQA+BRAYBkQgkFljXAAQgcAAgfgGg","fc":"#989588"},"127":{"t":[24.9,30.5],"p":"AgmGvQg4gEgtgeQgsgcgdgvQgNgWgJgZQgKgbgCgYQgDgYADgcQAFgeAMgVQAHgNAMgIQANgIAQABQAVABAbAVIgLAQIgFALQgEAMABATQACATAPARQAQAQAJADQAJACAKgCQAKgDAKgNQALgOACgVQACgWgPgYQgPgZgjghQgigigyg8Qgyg/AIgjQAIgkAbgvQAXgoApgiIACgCIACgBQAVgLAYgRQAYgRAhgiQAggiBDgZQBFgaAkAZQAjAZAWCoQAVCoAJB2QAGBogvBiQgZAzghAkQgnApgvAVQgsATgtAAIgNAAgAjWCCQgJASgDAaQgCAYAEAXIACALQAKApAXAjQAbApAnAXQAmAYAwACQAuACApgUQBOglAuhgQAqhbgHhcQgHhrgShMIgbh7QgKgvgWgoQgWgohPAvQhOAugcAMIgtATQgNALgLALQgSATgMAUQgNAWgFAXIgBAHQgBANABAMQAAANADAMIAEAHIADAFIACACQAEAFAPAKQAMAEgDACQAOANA2BHQA2BIAJAiQAJAigGARQgHAQgSAYQgMAOgMAGIgBAAQgPAHgRgDIgMgDIgDgBQgJgFgFgEQgLgIgIgPQgPgbADgeQACgRAEgLIAHgMIAAgBIAFgFQgSgLgOAAQgUAAgMAWg","fc":"#1D2226"},"128":{"t":[16.6,42.2],"p":"AApCgQgPgGgOgMIgHgGQANgFALgOQATgYAGgRQAHgQgJgiQgKggg0hJQg2hIgNgNQAGABAIAAIA/AAQAhAVAqBJIAwBMQApBVgiAoQgcAhghAAQgOAAgOgFgAiOBoQgEgYADgXQACgbAKgRQAMgUAUAAQAOAAASAIIgFAFIgBABQglAagcBNIgCAFIgCgLg","fc":"#DBDDBC"},"129":{"t":[24.2,33],"p":"AgeF1QgwgCgngYQgngXgbgpQgXgjgKgpIACgEQAdAtBcAsQBwA2A6gtQBohQgyiAQgzh+glgTQgmgUhRABIg/ABQgHAAgHgCQADgCgNgEQgPgKgEgFIgCgCIgDgFIgDgHQgDgMgBgNQgBgMACgNIABgHQAEgWAOgXQALgUATgTQAKgLANgLIAtgTQAdgMBNguQBQgvAWAoQAWAoAKAvIAbB7QARBMAIBrQAGBcgqBbQgtBghPAlQglASgrAAIgGAAg","fc":"#605E4A"},"130":{"t":[20.8,45.5],"p":"Ag7CnQhcgsgdgtQAchOAlgXIgGAMQgEALgCAPQgDAeAOAbQAJAPALAIQAEAEAJAFIAEABIALADQARADAPgHIABAAIAHAGQAOAMAOAFQAxATAngvQAigogphTIgwhNQgohJgjgWQBRgBAmAUQAlATAzCAQAyB+hoBQQgbAVglAAQguAAg8geg","fc":"#989588"},"131":{"t":[26.6,25.4],"p":"AgEDgQgpAAgfgEQgpgEgcgJQgigMgRgXQgTgXgGgjQgGgdADgsQAJARANAJQAPAKATgEQAOgCASgMQAQgKAOgBQAIACAJAIIARAOQAQALAPADQBGAGAvgeQARgLAYgVQAYgUAHgJQggAXgkARQhGAhgvgOQgMgEgPgKQgLgHgKgLIgEgEIAAAAQgNgHgOAFIgBABIABAAIABAAIg3AYQgPAGgMgFQgPgFgLgQIAHg0QAHglAKghQALgkAPgeIgBACIAGgHIAJgIQAIgHALgGQAUgMAYgIQAsgOA1gCQA0gDAsAUQAYALATAPQAUAQAPASIAPAUQAKAUAHAXQAKAhAEAmQADAaAAAsIACAmQABAWgBANQgCASgGAMIgGAIIgDAEIgLAKQgXASgnAJQg1AOhPAAIgIAAgAjHCWQAXAeAsAZQA1ALAvACQAnACAWgFQAcgHABgUQABgSgZgYQg4g3h5gVQhlAVAtA7gAhgAQIALAEQAxAlAqgFQAsgFAdgdQAdgbAHgOQAHgOgigOQhAACgVABIgdABQgxgIg0gEQgNgBgKAAIAAAAQghABgRAQQgNAOAAAVQACA3AtgIQAUgDAbgRQAGgFAIAAIAJACg","fc":"#4F6877"},"132":{"t":[21.7,33.3],"p":"AAPCLQgtgCg1gLQgsgZgXgeQgtg7BlgTQB3ATA6A3QAZAYgBASQgBAUgcAHQgQAEgbAAIgUgBgAgkg5IgLgEQgNgEgKAHQgbARgUADQgtAIgCg5QAAgVANgOQARgQAhgBIAAAAQAKAAANABQA0AEAvAIIAfgBQAVgBBAgCQAiAOgHAOQgHAOgdAdQgdAdgsAFIgLABQgnAAgpghg","fc":"#91B1CE"},"133":{"t":[26.1,25.8],"p":"AhMD/QgsgFghgKQgsgPgagfQgZgggIgtQgGglADgqQACghAIgoQAGghANgpQAMgmASgiIABgBIAAAAIAGgHIAQgPQAKgIAOgIQAZgOAbgIQAugNA8gBQA7gBAxAYQAaANAUARIAIAIIAbAiQAUAaAQAqQAMAhAHApQAHAlAAAkIADAlQACAXgBAQQgCAZgIAQIgGAKIgGAJIgQAPQgaAVguAOQg5ARhdABQgtAAgfgDgAjZBuQAHAkASAXQASAWAiAMQAcAKAoAEQAgAEAoAAQBUABA5gPQAmgKAXgRIAMgLIADgDIAFgJQAHgMABgSQABgNgBgVIgBgmQAAgtgEgaQgEgmgKghQgHgXgJgTIgQgVQgOgSgVgQQgSgOgYgLQgtgUgzADQg2ABgrAOQgZAIgUAMQgKAHgJAHIgIAHIgGAHIAAgBQgPAegLAkQgKAggHAlIgHA0QAMAQAOAGQANAFAPgHIA3gYIgCABIAAgBIABAAQANgFANAHIABAAIADAEQALAKALAIQAOAKAMADQAvAOBGghQAkgQAggWQgHAHgXAUQgZAWgQAKQgwAehGgGQgOgCgQgLIgRgOQgKgIgIgCQgNAAgQALQgTALgOADQgTAEgPgLQgMgIgKgRQgCArAFAdg","fc":"#1D2226"},"134":{"t":[17,4.5],"p":"AhmA0QgFgCgDgDIhJhMQgEgFgBgGQgBgGACgGQADgGAGgDQAFgDAGABQCcAPCygXQAIgBAGAFQAHAEABAIQACAIgFAHIhDBmQgDAEgEACQgEACgFABIg1ABQheAAg6gUgAhVAPQBBAVBvgFIAng5QiCAOh3gHg","fc":"#1D2226"},"135":{"t":[17.5,4.7],"p":"AhaANIgigjQB3AHCCgOIgnA6IgoABQhTAAg1gRg","fc":"#532670"},"136":{"t":[33.7,46.7],"p":"AhBA/QgbgiABgOQAAgHA3gpQA8gzApgKQAPAPAMADIiCCqQgOgOgNgRg","fc":"#9F815D"},"137":{"t":[36.5,48.5],"p":"Ai/ABIAKgKQAWgdApgiQBQhFBWgiIAOgGIAJAMQARAVARAZIAkA2IAzBPIjyCsgAhagrQgeAZgUAUIBiB9IC0h/IhChkIgXghQhHAghEA6g","fc":"#1D2226"},"138":{"t":[36.4,48.3],"p":"AilADQAWgZAnghQBMhDBUghQAlAuBJBzIjTCWg","fc":"#6B4F32"},"139":{"t":[30.4,19.5],"p":"AhniFIAAgCIAAgBQgCgKAAgKQABgOAFgJQAFgHAGgEQAGgDAJAAQALAAALAEIAEACIACAEQAGAJASAiIA4CBQApBeAeBOIgQAHQguhqgfg/QgQgogXgtIgVgpIgUgkIgGgBIgCAAQgCACAAAHIABANICGFKIgNAGg","fc":"#1D2226"},"140":{"t":[29.6,19.9],"p":"AgMAIQhFioAEgCQAHgEAFgKICPFZIgXAIIhDipg","fc":"#B7991A"},"141":{"t":[30.6,19.6],"p":"AgZAXQhHifADgUQAEgUAQgCQAHgBAHADICZFNIgwAXQglhNgihQg","fc":"#685814"},"142":{"t":[21.2,24.2],"p":"Ah3h7IgBgBQgDgLgBgIQgBgOAEgKQADgHAHgFQAFgDAJgDQALgBAMAEIAEABIADADQAGAIAWAgIBIB5QAfA0A9BuIgQAJQg6hhgng9IgwhQIgagmIgZghIgGAAIgBAAQgCACAAAHIADANIgCgCICwE5IgNAIg","fc":"#1D2226"},"143":{"t":[20.5,24.6],"p":"AgLAJQhZidAEgEQAGgEAEgLIC3FFIgVAKIhXifg","fc":"#B7991A"},"144":{"t":[21.4,24.3],"p":"AgWAYQhaiVABgUQABgUAPgEQAIgCAHACIDAE4IgtAcQgthIgshLg","fc":"#685814"},"145":{"t":[14.1,30.8],"p":"AiDhtIAAgBIgBgCQgFgLgBgIQgCgNACgKQADgIAGgFQAGgFAIgCQALgDALADIAFAAIADADQAOAOASAXIBUBxQA7BPAyBIIgPAKIhxiTIhXhtQgRgTgKgKIgHgBIgBABQgCAEACAFIADAMIDOEjIgMAJg","fc":"#1D2226"},"146":{"t":[13.4,31.2],"p":"AgLAKQhpiUAEgDQADgDADgHIADgHIDYEwIgUANIhoiVg","fc":"#B7991A"},"147":{"t":[14.2,30.9],"p":"AgTAZQhqiKgBgVQgBgUAPgFQAHgDAIABIDgEiIgqAhQg1hCgzhHg","fc":"#685814"},"148":{"t":[25.7,5.7],"p":"AAIAyQAIgVAIgbQADgKACgMIADgMIAAgHIgJAFIgUAQIgZAYIgFAHIgBABIABgCIgTgIIADgEIABAAIACgBIAPgNQALgKAJgGIATgQIAMgHQAEgCAGAAIAFABIAAAAIABABIADACIABAGQABAGgBAJIgHAkIgMAyg","fc":"#1D2226"},"149":{"t":[31.3,18.8],"p":"AgMBAIgPgEQgOgGgKgLQgJgLgEgOQgDgKgBgNIAAgHIAFgDIBggtIAJgCQAEgBAGAAQAIABADADQAGAFAAAIIgBAMIgGARQgCAJgMARQgSAcgTAVIgFAGIgFAAIgBAAIgCAAIgKAAgAA0gxQgLABgRAIIhJAnQABATAKANQANAQAZABQAQgaAPgWIAPgaIAHgNQAEgKgFAAIAAAAg","fc":"#1D2226"},"150":{"t":[15.1,13.1],"p":"AgFBJQgOgCgMgLQgHgHgJgNIgEgGIAzhXIAKgMIAFgEIAGgDIAGAAIADAAIABAAIACABIAAAAIAGAEIADADIACAEIACAGIAEAQIABAcQAAAigCATIgBAFIgDAEIgLAJIgLAHQgMAGgKAAIgGgBgAAYg1IgBACQgIAKgTAjIgVAnQAKAQANAEQAPAGATgRQABgbgBgZIgBgaIgDgNQgBgFgBAAIAAAAIgCABg","fc":"#1D2226"},"151":{"t":[16.8,13.3],"p":"AgQA0IAchxIAFBxQgGAGgIACIgGACQgJAAgEgKg","fc":"#F2EBDA"},"152":{"t":[15.1,12.9],"p":"AgpAlIBGhkIANBsQgJAMgPAFQgHACgGAAQgWAAgYgbg","fc":"#AA9D85"},"153":{"t":[17.1,16.6],"p":"ABLB7QggAAgngLQghgKgfgQQgSgJgOgKIgOgLQgKgJgEgGQgGgIgKgQQgHgQgCgKQgCgQAEgQQAEgQAJgMQAPgUAdgQQAOgIALgDQAMgEARgCQAygEAzAiQAvAfAXAwIgJAFQgZgrgtgaQgwgcgqAGQgMABgKAFIgVAKQgYAPgKAPQgLASADAVQACAMAEAHQAEAJAHAJIABACIABAAQADAGAFAEQAGAGAGAEQANAKAPAIQAdAQAeALQAgALAhACQAkABAbgLIAHAQQgcAOgmAAIgFAAg","fc":"#1D2226"},"154":{"t":[16.5,22.7],"p":"AAsBpQg6gGgvgbQgMgGgMgJIgWgSQgUgTgSgUQgJgOgFgLQgGgRACgOQACgOAJgOQAIgLALgKIAHAIQgVAWgBAVQAAAUATAWQAQAQAVARIAsAbIAwASIAWAIQAQAEAJABQAvAGAxgOQADgMgBgMIgCgPIgEgQIARgFIAGARQACAJABAJQABASgEATIgBAFIgGACQguAQgtAAIgUgBg","fc":"#1D2226"},"155":{"t":[27.5,5.5],"p":"AgSAbIAlhEIgTBTg","fc":"#F2EBDA"},"156":{"t":[32.2,19.3],"p":"AghAuQgXgIAGgRIBmhHIg+BlQgMgBgLgEg","fc":"#F2EBDA"},"157":{"t":[25.7,5.6],"p":"AgmAKQBGg/AGAGQAGAGgaBZg","fc":"#AA9D85"},"158":{"t":[31.3,18.9],"p":"AgaAzQghgQgBgtIA6gbQA5gZAFAHQAIAMhABkIgEAAQgNAAgNgGg","fc":"#AA9D85"},"159":{"t":[22.3,12.5],"p":"AAcAwQgXgGgWgSQgYgRgLgSQgMgTAIgLQAHgKAXAFQAWAFAWASQAYARAMASQALAUgHAKQgGAHgMAAIgMgBg","fc":"#B4B4B4"},"160":{"t":[22.1,16.6],"p":"AAfBZQgLgHgRgVQgPgVgLgHQgSARglgOQgngPAXghQgQggAMgbQAPgjAZAAQBeABAvBbQAQAeAEAfQAEAegJACQACAVgSAGIgJABQgSAAgYgSg","fc":"#7C7C7C"},"161":{"t":[18,16.2],"p":"AgZBYQgkgPgdgUQgbgSABgGQgPgRgCgXQgEgzBAgpQANgIAjAEQAnAEAjATQBkA0gRB7QgbATgmAAQgoAAg0gWg","fc":"#626262"},"162":{"t":[25.8,29.7],"p":"AgXgQIA1gFIgFAqIg2ABg","fc":"#686C72"},"163":{"t":[12.8,26.5],"p":"AgZAHIgkgfIAKgPIBqAuIAFAHQAEALgEAPIgBAAQgqAAgqghg","fc":"#C7CDCF"},"164":{"t":[16.9,22.8],"p":"AAYBXQh3gRhAhqIAEgaQAGgaALgCQAoBiBqAdQBAARBPgKQAHAFABALQABANgMAGQgeAMgqAAQgYAAgcgEg","fc":"#9BA7AA"},"165":{"t":[18.4,40.4],"p":"AAwDfIgJgCIgLgEIgOgMIgXgZQgWgXgXggQhShug5iOIgDgJQAYiDBSBCIAFAKQAnBnBIBgQAiAsAnAqQAuAvAkAcIAQAMIgRAKQggAQggAKQgbAHgXAAIgSgBgAiliCQA1CFBMBoQAUAaAVAbQANAOALAJIALAJIACABIACABIAIABQAZAFAigJQAUgFAUgJQgegbgkglQgqgtghgsQhFhcgphlQgSgRgOAAQgZAAgIA4g","fc":"#1D2226"},"166":{"t":[18.1,45.3,0.852,0.997,0,6.1,-172.5],"p":"AiJCLQhIgQgFgRQAuggBlg7QAYADAugSQBggnB0hvQgHAziLCBQhFBBhDA4QgigEgkgIg","fc":"#6B4F32"},"167":{"t":[18.5,41.7,0.852,0.997,0,6.1,-172.5],"p":"AizCqIgqgdQBJgxBShCQCjiAAphOQBEgcAQBWQgoBEg5BGQhwCRhNAWQgUAFgTAAQgnAAglgSg","fc":"#9F815D"},"168":{"t":[24.2,38.5],"p":"Ah7DeQgdgEgjgUQgegRgbgYIAQgQQAcgYA3gjQAtgcAsgkQA4gtCajCQA9ALAVApQAKATgCASIgFAJQgsBAhHBRQhLBZgyAqQgcAYgbASQgRALgNAHIgQAIIgLABgABAhIQhBBLgrAjQgpAigyAhQgpAbglASQASAOASAKQAfASAZACIAIAAIAFAAIAMgGQANgGAQgMQAcgTAZgUQAtgpBJhVQBDhOAqg8Ig4g3QgiAwg7BEg","fc":"#1D2226"},"169":{"t":[23.1,41.7,0.852,0.997,0,6.1,-172.5],"p":"AgUBmQiGh1hWirQB0BvB6BLQA7AkAmAPIA4AiQA+AlAcAVQgFARhHAPIhHAMQgxgZhBg8g","fc":"#6B4F32"},"170":{"t":[23.5,38.5,0.852,0.997,0,6.1,-172.5],"p":"ABbDYQhOgWiJi1QhGhZg2hWQAJgNAPgOQAegbAegDQCPDCCUB2QBLA8AvAVQgQAQgbANQglARgmAAQgUAAgUgEg","fc":"#9F815D"},"171":{"t":[283.1,146.1],"p":"AgsAxQgSgVgBgcQABgbASgWQATgUAZAAQAaAAATAUQATAWAAAbQAAAcgTAVQgTAVgaAAQgZAAgTgVg","fc":"#4F6877"},"172":{"t":[11.2,13.8],"p":"AgHCCQgQgHgLgNQgEgEgMgTIgRgeQgLgSgFgPQgOgjgHgaQgGgWAAgXQAAgdAKgVIABgFIDCBIIAMAEIADADIABADIAAAFQAAAKgEAaIgHAnIAAABQgDAMgBAVIgBAZQAAALgCAIQgDANgKAJQgIAHgOADQgKADgNAAQgXAAgTgIgAhIhSQAAAQAEATQAIAbAMAeQAGAQAZApQAHANAFAFQAFAHAFADQAMAFASAAIAAAAQAJAAAFgCIAHgCIAAgBIABgBIAAgTIABgXQABgWAEgOIAAgBIAAgBIALg+QhSgHhAgig","fc":"#1D2226"},"173":{"t":[11,11.4],"p":"AgrBGQgcghgOg/QgGghgBgaQBHAqBQALIAYACQAIABABADQAEANgJAnQgIAngEADQgQARggABIgCAAQgdAAgngQg","fc":"#532670"},"174":{"t":[8,10.7],"p":"AAMhVQAJgEATAOIhPCiQAJhZAqhTg","fc":"#A1C5E5"},"175":{"t":[9.9,15.9],"p":"Ag9B2IgGgXIgFgZIAAgBIgCgRIAAAAIABAAQANhXAchDQALgXAMgSIAGgIIBOAmQgVBAhTBgIgIBhIgMAIIgMgigAgFiJQgtBSgJBaIBQiiQgPgLgHAAIgEABg","fc":"#91B1CE"},"176":{"t":[13.3,18.5],"p":"AhSB+IAMgIIAHhhQBThgAWhAIApATQgCACACgCQgHAKgLA0IgSBUIAFAFIADAGIACADIAEALQABAJAAAPIAAADQgCARgFALQgGAMgGACQgHADgIgFIgFgFIgWgvIgiADIAhAGQgCAmgYAVIgIABIgNg2IAAA4IgeADIgFgOg","fc":"#4F6877"},"177":{"t":[12,17.8],"p":"AhZCJQgLgWgCgJIgIgaIgEgZIgCgQQAAgcAOg+QANg/AJgSQAJgSAMgUQANgEAWAEIgGAIQgMASgLAXQgcBEgNBWIgBAAIAAAAIACASIAAAAIAFAaIAGAWIAMAiIAGAPIAegEIAAg4IANA2IAHAAQAXgWAEgmIgigFIAigEIAWAwIAGAEQAIAGAGgEQAHgCAFgLQAFgMACgQIABgEQAAgOgCgJIgDgLIgCgEIgDgFIgFgGIAShTQALg1AHgJQgDACACgDQAJgLAIABQALADgLAuQgKAvgUA7IAFAFIABADIADAKQAEANgBAVIAAAEQgEAdgLAQQgJALgMAEQgEABgIgCQgHgCgEgDIgJAAIgPAAIgNAUQgzALgQAAQgHgJgNgbg","fc":"#1D2226"},"178":{"t":[44.4,66.2],"p":"AjxARQEEhADaA6IATgBAj/ARIAOAA","sc":"#1D2226","ss":[3,1,1]},"179":{"t":[44.2,47],"p":"AhqFAQg6gIgvgKIgBAAIAAAAQgNgEgKgKQgIgIgFgKQgJgOgIgWQgMgegHgrQgIgngCgiQgEgjAAgnQABhwA8haQAegvArghQAsgiA1gOQA1gOA1AIQA1AIAwAeQAuAcAiAsQAiAqATA0QAUAzAFA2QABAQAAAkIgCA1QgFA/gLArQgIAegOAXQgKAQgMAJIgJAFIgTAIQheAlhzAAQg1AAg1gGgAjqDeQAIARAHAMQAJANAIADQA2AKAuAEQA4AFAtAAQB1gCBPgfIAUgIQAHgFAFgJQAHgLAGgRIAFgPQAMgpAGg6IADgzQABgdgCgUQgCgxgRgwQgRgxgdgnQgfgpgqgbQgrgbgxgIQgvgJgxAOQgwANgpAgQgnAegcAsQg2BVABBoQACBEAPBJQAGAdAJAZIgPAAIAPAAIAEANgADwDLIATAAg","fc":"#1D2226"},"180":{"t":[38.7,30.4],"p":"AikBZQgPgqAgg0QAkg7BDgaQBDgaBBAMQA/AMAPAoQANAhgpAVIhzAsQhXAqghAMQgVAJgPAAQgXAAgIgUg","fc":"#B4B4B4"},"181":{"t":[42.3,37.1],"p":"AjBhjQBXhxB+ABQBPAABCAtQBBArAjBIQgbAOhcAhQh1AogwAVQjXBXgUBFQgki7Bhh9g","fc":"#7C7C7C"},"182":{"t":[44.7,41.8],"p":"AjAEHIgCgBQgWgZgJAZIAAAAIgIgBIgGABIgNAAIgJgCIgBAAQgJgbgDgjQgCgOAAiZQAAh4BRhWQBShXBxAAQBzAABRBXQBRBWAAB4QAABrgIA3QgEAigHAaIAAAAQABgKgPANQgCgFAAgKIgTASIgWgOIgEAOIgBAAIgCABIgBAAQgKgXABgIIgfAAIgJAPIAAgJIgHAOQgEAFgJgOQABAUgDgdIgGAPQgBAGABgOQgFgbgHAaQgMAOgBgSQgDALACgUQgFATAAgOIAAAMQgUgfgIAMQgIALgDAIIAAABQgSgIg9AJQgJgCAAgCQAAgCgTADQgVAOAIgSQAIgSgMAPQgLAPgTAAIg5AGIgaAJg","fc":"#626262"},"183":{"t":[44.5,69.9],"p":"AAAA9QjLgCgOgLQgbgUgPgnIADAAIADAAIAQAAQAHgCAFACIACgGQAIgZAXAZIACABIAAAAIAagJIA5gFQATgBAMgPQAMgPgIASQgIASAVgNQASgEABACQAAACAJACQA8gJATAIIAAgBQACgHAIgMQAIgLAVAeIAAgMQAAAOAFgSQgDAUAEgLQABASALgPQAIgaAFAbQgCAOACgGIAGgPQACAdgBgUQAJAOAFgEIAHgPIAAAJIAJgPIAeAAQgBAJAKAWIACAAIACAAIABAAIAEgPIAWAOIATgSQgBAKADAFQAPgNgBAKIgCAIQgOAtgXAVQgOANihAAIguAAg","fc":"#686C72"},"184":{"t":[44.5,68.1],"p":"AEFgKIoJAKIICAL","sc":"#1D2226","ss":[0.1,1,1]},"185":{"t":[45.1,22.1],"p":"AEHCvQgGgBgEgEQgEgGABgGQABgGAFgDIBdhFIhWh4IhMAzQgGADgGgBQgGgBgDgFQgEgFABgEQABgGAGgEIBZg9QAFgEAGABQAGABADAGIBnCQQADAFgBAGQgBAGgEAEIhpBNQgEACgFAAIgCAAgAkcCjIhehLQgFgEAAgGQgBgGAEgFIBpiEQAEgFAGgBQAGgBAFAEIBEA3QAFAEABAHQAAAEgEAFQgEAEgGABQgGABgFgEIg4gsIhWBtIBSBBQAFAEABAGQAAAGgEAFQgEAFgGABIgBAAQgGAAgEgDgAhygvQgEgFAAgGIAAhlQAAgHAEgEQAEgEAHAAIC0AAQAGAAAFAEQAEAEAAAHIAABYQAAAGgEAFQgFAEgGAAQgGAAgEgEQgFgFAAgGIAAhJIiWAAIAABWQAAAGgFAFQgEAEgGAAQgHAAgEgEg","fc":"#1D2226"},"186":{"t":[44.1,45.3],"p":"AjoE7QgIgFgEgEQgLgNgKgbQgMgigHgsQgNhRAAhNQABgnAJgsQAJgvAQgjQAjhNA/gxQBHg1BOgFQAngDAoAKQAoAKAjAVQBDApAsBLQAlBBAJBjQADAZgBA0QgCAsgDAjQgGAvgJAgQgHAXgKARQgIANgMAGQgHAFgJAAQgEABgEgBIgDAAIAAAAIgBAAIgHgDIgFgFIgFgLIgBgIIAAgMIACgUIAFgmQAEgugLgVQgGgNgMgGQgNgGgRAAIgNAAIgDAAQgJABgGADQgMAFgHALQgGAKgDAUQgBAIgBAdIgCAOIgCAFQgCAFgFAEQgFAFgKAAIg8ABIgmgBIgLAAIgNgDQgKgDgHgIQgFgFgEgIQgEgKgDgMIgEgTQgEgTgHgLQgIgMgMgEQgNgEgRACQgRABgIAHQgJAHgCAPQgDAYAKAvIALA8QAAARgFALQgFAKgKAEIgEACIgBAAIgCABIgKABQgJAAgIgFgAgOkdQhMAFg8AwQg6AuggBJQgeBEABBLQACBLAOBNQAIAtAKAcQAJAUAHAIQADADACAAIAAAAIABgKIgDgRIgIglIgIgoQgDgcACgQQACgNAEgLQAGgMALgKQAJgIAOgFQALgEAMgBQAbgCAUAGQAaAJAOAXQAKAQAGAaIAFATIAEAPIACACIAFABIBbABIAEgkQADgaALgSQAOgYAZgJQAMgEALgCIAXAAQAYABAVAKQAXALAMAZQAIARACAbQABASgDAYIgHA3IADgEQAHgKAHgUQAIgbAGgvQAEghADgrQACgzgCgYQgGhMgkhBQgnhFg+gnQg7gkhBAAIgPAAg","fc":"#1D2226"},"187":{"t":[38.8,30.4],"p":"AikBZQgPgqAgg0QAkg7BDgaQBDgaBBAMQA/ANAQAnQANAigqAUIhyAsQhYAqghANQgVAIgPAAQgXAAgIgUg","fc":"#C7CDCF"},"188":{"t":[42.5,38.7],"p":"AhACQQgcgbgpgDQgogCgiAWQgkAXgMAoQgHgYAAgaQgBgZAFg6QABh4BShWQBRhVBxAAQBPABBCAsQBBArAjBIQhvA5g3AwQhcBUAABoIgjACQgDg1gggfg","fc":"#9BA7AA"},"189":{"t":[44.7,45.2],"p":"ADVEQIAChHQgFhuhBAAQgiAAgOATQgHAJgIAfQgIAcgOANQgUATgrABQglABgVgSQgOgMgNgeQgPgfgJgLQgSgTgeAAQhBAAACBrQAAAXAGAwQADAegFgEQgugigJhhQgCgQABiVQAAh6BRhWQBRhXBxAAQByAABRBXQBRBWAAB6QABBrgHA1QgNBlgmAjIgCACQgEAAAAgZg","fc":"#686C72"},"190":{"t":[43.4,6.9],"p":"Ah0AFQgBglAJAAIDhgKIhbAVQhcAVgJAGQgIAFgQARIgOAPQgCgTgBgTg","fc":"#C7CDCF"},"191":{"t":[43.7,11.7],"p":"AhPB6IgpgBIgCAAIgHgBQgMgDgJgJQgJgJgDgMIgBgMIAFifQAAgLAGgJQAFgJAKgFQAJgFAKABIBNABQA7ABA+gBIAegBIASAAQAKACAIAIQAIAIADAKIACAKIAFCkIgBAHIgFALQgGALgLAHQgGADgFABIgHABIhSADIh4gCgAgnhhIhNABQgEAAgFADQgJAFAAALIAFCfIABADIADAFQADADADAAIAqgBIB4gCIBQACIADAAIAFgEIACgFIAFiYIAAgNQgBgFgDgDQgEgEgFgBIgrgCIgzAAIhGAAg","fc":"#1D2226"},"192":{"t":[43.9,12.5],"p":"AAEBqQhqgEgcgJQgRgGABgZIAEgZQA1gBA9gSQB4giAphZQAKArADA+QAEBMgOARQgMANhSAAIgmAAg","fc":"#686C72"},"193":{"t":[43.9,11.4],"p":"Ah2BtQgMAAgIgJQgJgIAAgMIAAifQAAgMAJgIQAIgJAMAAIDtAAQAMAAAJAJQAIAIAAAMIAACfQAAAMgIAIQgJAJgMAAg","fc":"#9BA7AA"},"194":{"t":[79.6,24],"p":"AAGA1QgBgQhDiWQB0ClAIAMQAEAHgfAXIghAUQAFgsgBgRg","fc":"#C7CDCF"},"195":{"t":[72.6,26],"p":"AgCC/QgNgBgKgJIgGgGIgZghIhKhhIgvhCIgDgFIgDgMQgCgNAFgLIAHgLIAGgHIACgBIABAAICPhmQAGgEADgBQALgEAJACQAKACAJAHQAHAHAEAHIASAZIBJBjIAuA7QAHAJACAKQABAMgEAJIgFAKIgEAEIiNBwIgLAGQgHAEgJAAIgGgBgAACCdQADABACgCIADgBICFhdIABgBIAEgFQABgCAAgGQgBgGgCgDIgtg8IhJhjIgTgYQgFgIgDgCQgDgDgDAAQgEAAgFABIgDADIh/BjIABAAIgCABIAAAAIAAABIgBAAIgBADIgBAGIACAEIABABIAvA7IBIBjIASAZQAIALgBgCQABACACABg","fc":"#1D2226"},"196":{"t":[66.7,26.2],"p":"AA1CjQgYgRhBhUQhJhbAFgVQAFgVBAgqQAzgjAogSQgvBWAsB2QAWA8AfAqQgIAKgKAIQgMAJgLAAQgGAAgGgEg","fc":"#686C72"},"197":{"t":[72.7,25.9],"p":"AACCsQgKgCgHgJIiPi/QgHgKACgLQACgMAJgHICChgQAJgGAMABQAKACAHAKICOC+QAHAJgBAMQgCAMgKAHIiBBfQgIAGgJAAIgEAAg","fc":"#9BA7AA"},"198":{"t":[10.6,23.2],"p":"AgmBkQghgYAEgIQAHgLCBiyQgTAjgSAnQgkBLgBAXQgCARADA1QgRgJgRgMg","fc":"#C7CDCF"},"199":{"t":[17.4,26.1],"p":"AgTC8QgHgDgDgDQhggwgrg0IgCgBIgBgCIgEgFQgEgFgCgEQgEgLACgLQABgLAHgJICSi9IAMgOQAIgIAJgBQALgDAKAEIAKAGICHBkIACABIACACIAFAFQAEAGACAFQAFAMgBAMQgBAGgDAGIgCAFIgwBCIgkAxIg8BPIgCACIgBACIgGAFQgKAIgMACIgGAAQgJAAgIgDgAAHieQgFABgCADQgBAAgHAJIgSAYIhJBjIgtA8QgDAGAAADQgBAEADAEIACAEIACACICFBdIACABQADABADgBQACgBABgBQgBADAHgMICJi3IACgBIABgEQABgDgBgDIgBgDIgBAAIAAgBIgBAAIgBgCIiChlIgGgBIgCAAg","fc":"#1D2226"},"200":{"t":[23.3,26.2],"p":"AhXCeIgSgSQAggqAVg8QAsh2gvhWQAoASAzAjQBAAqAFAVQAFAVhJBbQhBBUgYARQgGAEgGAAQgLAAgMgJg","fc":"#686C72"},"201":{"t":[17.3,25.9],"p":"AgWCmIiChfQgJgHgCgMQgCgMAHgJICPi+QAHgKAKgCQALgBAKAGICBBgQAKAHACAMQABALgHAKIiOC/QgHAJgKACIgEAAQgJAAgIgGg","fc":"#9BA7AA"},"202":{"t":[32.7,64.2],"p":"AgDAPQgZgHAAgSQAAgJAIABIASADQAKAAAKAIQALAHAAAJQAAAKgNAAQgIAAgLgEg","fc":"#1D2226"},"203":{"t":[32.5,63.6],"p":"AAWAUIAAgBQgDgFgEgDQgFgHgNgGQgUgMgcgKQAgACAVAGQAOAEANAGQAIAFAFADIAGAIIADAGIABADIAAAGg","fc":"#1D2226"},"204":{"t":[55,64.2],"p":"AgcAJQAAgJALgHQAKgIAKAAQAHAAALgDQAIgBAAAJQAAASgZAHQgLAEgIAAQgNAAAAgKg","fc":"#1D2226"},"205":{"t":[55.2,63.6],"p":"AgzATIABgDIADgGQABgDAFgFQAFgDAIgFQANgGAOgEQAVgGAggCQgeALgTALQgKAFgIAIQgFAEgBAEIAAABIgeAFg","fc":"#1D2226"},"206":{"t":[44.4,72.1],"p":"AA1AKIgSgDQgPgDgUgBQgPgBgSABIgkADQAOgLAUgFQATgGARABQAUABATAIQAJAEAIADQAJAGAEAJIgRgGg","fc":"#1D2226"},"207":{"t":[44.1,67.2],"p":"AgyASQgPgIgFgKQgGgNAHgOQACAPAGAGQAFAFANACQANADAeAAQAhAAALgDQAMgBAFgFQAHgHADgOQAFAOgFAMQgFANgPAGQgUAIgfAAQgeAAgUgJg","fc":"#1D2226"},"208":{"t":[44,56.8],"p":"AgPEsQgbgDgcgOQgPgHgfgUIgWgNIgXgQQgXgSgPgYQgagogHhBQgEgkAAhDQABg7ALguQANg6AggnQAhgrA3gTQAtgPA6ACQA9ABAsAWQAyAYAdAxQAYApAKA9QAHAsAAA7QAABBgIAoQgHAegLAXQgMAZgVAVIgpAjQgWARgWAOQgZAQgaAIQgPAEgOABIgNABgAhUkLQgvAQgeAoQgaAjgMA2QgJAtACA2QACBCAFAhQAIA5AWAfQAMASAUAPQAKAIAJAFIAXANQAbARAQAHQAXALATACQAkAGAvgcQAagPA1gsQAggfAMgxQAIgkACg/QACg7gFgnQgIg4gVglQgYgsgrgWQgngUg4gCIgOgBQguAAgkANg","fc":"#1D2226"},"209":{"t":[71.6,50.7],"p":"Ag2AWQAiAAAXgUQANgJAJgOIAIgOIhZAVIgGgoIB9gHIgDANQgDATgKAVQgKASgNAOQgRARgQAIQgUAKgWADg","fc":"#1D2226"},"210":{"t":[70.9,50.6],"p":"AgwAfIAFgPIBcg3QgKAQgPASQgbAigWAIQgIADgGAAQgJAAAAgJg","fc":"#4F6877"},"211":{"t":[70.4,50.5],"p":"AgpApIgJg/IAggKQAkgJAhABQAAAZgjAcQgfAcgWAAIgEAAg","fc":"#91B1CE"},"212":{"t":[16.3,50.7],"p":"AAKAxQgQgIgRgRQgOgPgKgRQgJgWgDgSIgDgNIB9AHIgGAoIhZgVIAIAOQAJAOANAJQAXAUAiAAIgDAoQgWgDgUgKg","fc":"#1D2226"},"213":{"t":[17,50.6],"p":"AAaAlQgWgIgbgiIgZgiIBcA3IAFAPQAAAJgJAAQgGAAgIgDg","fc":"#4F6877"},"214":{"t":[17.5,50.5],"p":"AgPANQgjgcAAgZQAhgBAkAJQATAFANAFIgJA/IgEAAQgWAAgfgcg","fc":"#91B1CE"},"215":{"t":[44.5,59.5],"p":"AhgDcQgmgXgrgtIgjgoIAagdQAWgWALgFIgCAAQgLgJAIgHQAQgMBdABQCcgDAkhQQAOgeAEg4QADhDADgjQAMAJAOAwQAPA1AEA9QALCkhPBRQg6A7hLAIQgLACgNAAQgvAAgkgXgAgsA4IhoABQghAgApAuQAjAqAhAFQAKACA7AAIBAAAQAZgBAcgTQAagRAQgXQAPgaAAgMQgBgOgVgIQgNgFgVACIgjADIgOgIIgcgBIhSABg","fc":"#608420"},"216":{"t":[28.4,52.3],"p":"AgzB/QgEgNgDgvQgDgrABgtQABglAahAIAag4IAFAeQACAogCA1QgJBkAiAvQATAYATAEIgyALIgvAxQgIglgHgQg","fc":"#608420"},"217":{"t":[44,56.2],"p":"AidDPQhChTACiJQADiCA0hEQA5hKBtABQBwABA4BJQA1BEABCBQABCGhBBUQg/BQhfAAQhfAAg+hOg","fc":"#98CC46"},"218":{"t":[12.8,3.7],"p":"AAAgDIAAAH","sc":"#000000","ss":[0.1,1,1]},"219":{"t":[22.5,30],"p":"AAVEBIgPgaIAFhlIgmgcIgMgCIgPgFIgWgIQA7iLhOjNIAEABQAVAEASAXQAPAVALAeQAQAtAJBJQAFA/AAA6IAAACIAEAgIAEARIACAFIAFAIIAGAGQAVAXAQAVQAVAZAMAVIABABIgrgdIghgWIABAnIABAwIgBgBg","fc":"#605E4A"},"220":{"t":[13.7,30.8],"p":"AAODNQgDgZAGgXQAGgXAQgQIAXgWIgFgBIACgCIgFABIgHgCIAMABIAoAdIgFBkIgSggIgUgpIgBACIgCgEIgCANIghBDQgDgKgBgMgAhGgcQgZgvgChFQgCgiAEggQgBgcAeAUQAfAUANApQAPAygSBAQgKAlgNAAQgKAAgMgWgAhZgsIAAgBIAGAQIgGgPg","fc":"#DBDDBC"},"221":{"t":[12.2,30.6],"p":"AAqD9QgFgLgEgMIAhhEIgRBnQgEgFgDgHgABHCZIAAgBIAVAogABGBhIAEgBIgCABgAgcAnQgLgNgKgQIgRggIgCgFIgFgQQgNgqgEg2QgCgmAFgwIABAAQAbgVAWgJQAZgLASADQBODNg6CLQgfgQgXgagAhQjPQgDAfABAjQADBFAYAuQAcAyAShAQAPhBgNgxQgMgqgfgUQgNgIgHAAQgLAAABARg","fc":"#989588"},"222":{"t":[18.8,31.7],"p":"AgHE1QgSgHgOgOQgKgLgJgQQgOgcgDggQgDghAIgeQAGgTAKgPQgngTgdghQghgngRg4QgOgzgBg3QAAg0AJg1IADgPQAegXAagLQAngSAiAIQAUAFAQALQANALAMAQQATAZANAkQASAyAKBNQAHA8AABDIAAgCIADAbIAEAMIADAEQATATAVAbQAVAcAOAXQAKAPAFAOIAGATIAAANQgBAIgGAJIgLANIgPgIIgtgbIgLgHIADA4IABAPIgPAGQgKAEgMgGIgLgHQgIgHgEgGQgJgKgKgPIgBgCIgKA4gAhokKQgWAJgbAVIAAAAQgFAwACAmQADA2ANAqIAAABIAGAQIACAFIARAgQAJAPAMANQAXAaAgAQIAWAIIAPAFIAFADIADAAIAFACIgVAWQgQAPgGAYQgGAXADAZQABALADALQADAMAGALQADAHAEAFIAPhnIACgNIACAEIAVAnIASAhIAPAaIABABIgBgwIgBgnIAhAWIArAdIgBgBQgMgVgVgZQgQgVgVgXIgGgGIgFgIIgCgFIgEgRIgEggIAAgCQAAg4gHhBQgJhJgQgtQgJgegPgVQgSgXgVgEIgEgBIgBgIIABAIIgKgBQgQAAgUAJg","fc":"#1D2226"},"223":{"t":[51.9,42.5],"p":"Ag5GgQgngKgogVQhGgkhAg9Qg+g+gkhHQgohRAChQQABg0AGgvQgGgEgFgGIgMgNIgTgbQgSgbgQgdQgPgegMgcQgGgRgEgPQgFgTAAgPQAAgLACgJIAEgLIAFgIIABgBIACgDQAFgEAJgEIALgCIASAAQAgACAhAIQAlAIAZAKQASAGANAGIASAJQAvgnBCgVQBDgWBcgCQBXgCBHAOQBbASA7AwIAAAAIAHgDQANgGASgGQAYgJAmgJQAigIAfgCIASAAIALACQAJAEAFAEIACADIACABIAEAIIAEALQACAHAAANQAAANgFAVQgFARgFAPQgMAcgQAeQgOAdgTAbIgTAbIgMANIgCADQADAfACAiIABAoQABASgDAWQgDApgOAoQgZBMg5BFQg4BAhGArQhPAvhQAJIgrACQgWgCgVgGgAgLmIQhYADg/AVQhNAagtA1QgtA0gSBQQgPBCACBVQACBFAkBEQAiA/A5A2IAIAHQA0AuA+AfQAiASAhAIQAWAFALABIAPAAIARgBQBDgHBFgoQBBglAxg4QA1g8AXhBQANgjAFgkQACgVAAgNQABgUgBgTQgChZgSg9IAAgCQgIgYgKgVIAAgBQgXgtgjgdIgFgEQgygnhPgRQhBgOhJAAIgMAAgAnelfIAAABIgBADIAAAAIgBALQAAAWAOAeQAMAbAQAZQAQAYATAXIARAQQAShDAigwIALgPIgEgDQgLgIgNgHQgZgNgdgKQgjgKgWgCIgNAAgAGWlUQgdAKgZANIgRAKQAJAMAIAMIAGAJQATAgALAiIAIAeIAIgHQASgWARgZQATgeAJgWQAOgeABgWIgBgLIAAAAIgCgDIAAgBIgEgBIgMAAQgVACgkAKgAA5D3QgLgTgDgPQAAgMAFgGQAFgGANAAQARACASAKIAEADIgUAZIgMALIgMALgAgtDwIgGgGIgQgRIgKgNIAEgDQAVgLAPgBQAMAAAFAGQAGAGgCAMIgCAKQgDAMgIAMIgEAEIgMgLgAhOBxIgGgBIgHgDIgJgGQgHgGgDgHQgHgJgHgRQgFgMgEgOQgFgQABgNQAAgJADgGIACgCIAAgBIABgBIAAAAIABgBIAHgDIAJAAQALABARAFIAbAIIAKABIAWAJIAAAAIAEAHIAFAPIABAPQABARgHAOQgHAPgQAKQgLAHgPACIgCABgAh4ABIAAAAQgBACAAAGQACATASAXQAHAJAJAJIAGAFQAHgCADgEQAEgDABgEIAAgLIgEgMIAFAHQgBgHgKgMQgLgKgJgFQgLgHgLgDIgDAAIAAAAIAAgBIAAAAgABiBnIgOgCIgNgFQgQgHgKgOQgHgMgDgSIAAgPIACgPIAEgHIABgBIAQgHIAOgFIAagKIAbgIIAJgBQACAAAEACIABABIABABIABACQAEAFABAKIAAAKQgBASgGAZQgFASgEAJIgJANIgHAIIgHADIgFABIgEABgABSArQAAAIABADQACAEADAEQAFAEAIABIAGgGQAIgIAHgLQARgcgCgRQAAgFgDgEIAAgBIAAAAIAAAAQAAAAgBAAIgFABQgIADgNAJQgLAIgGAJQgJANAAAIIAFgIgAjrgkIgJgEIgNgJQgJgIgIgLQgIgKgJgPIgHgPQgLgWgHgUQgIgbgBgUIAAgEQABgNAGgKIADgEIAAAAIABgBIABgBIACgBIACgBIAIgCIAOAAQAVADAYAIIAsARIAVAKIABAAQAMAHAKAGIACABIADAGIACAFIAEARQADALAAALQACAagLAUQgKAWgWANQgQAKgVAEIgDABIgCAAgAkvjFQAAARAKAVQAHARANAUQAOATALANIAPAMIAEADQAOgEALgIQALgHAEgLQADgLgCgNIgBgHIgBgGQgBgIgDgEIgBgBQgHgJgOgLQgOgLgWgLQgYgLgOgDIgIAAIgBAAQgEAFAAAJgADRg1QgZgCgQgIQgYgLgMgVQgNgUgBgZQgBgMABgKIAFgWIACgGIACgCQAOgLAcgRQAVgMATgJQAegMAOgEIAOgCIABAAQAFABAEABIAFADIAEADQAHALACAQQACASgFAeQgEASgJAaQgKAZgKARQgHALgIAKIgBABQgGAGgFADQgEADgFABIgHACgACnibIgBAFIAAAIQAAANAEALQAGAKALAGQAJAFARAEIADgDIANgOQAMgQAJgSQAKgSAHgVQAHgWgCgRIgBgGQgBgFgCgCIAAAAIAAAAIgBAAIgIABQgPAEgVAOQgUAMgOANQgRARgGAOIAEgIQgDAHAAAGg","fc":"#1D2226"},"224":{"t":[53.3,49],"p":"AkFBPQgVgKgOgaQgOgZACgXIAAgGQADgVAOgJQAQgLAWALQAVAKAOAaIAAABQAOAXgCAZQgBAZgQAKQgIAFgKAAQgJAAgLgFgADmA5QgQgHgDgZQgDgZANgcIAIgRQAKgRAPgLQAUgPAQAHQARAHACAZQADAagMAbQgIASgLANQgHAIgHAGQgPAKgMAAQgFAAgFgCg","fc":"#000000"},"225":{"t":[77.5,50.3],"p":"AgTA5QgQgHgDgaQgDgYANgdQAHgRAKgMIgIARQgNAdADAYQADAZAQAHQAOAHAVgPQAIgGAGgIQgKAQgNAKQgOALgKAAQgGAAgFgCg","fc":"#514F40"},"226":{"t":[51.9,21.2],"p":"AjpCEIgPgMQgLgMgOgUQgNgTgHgRQgKgWAAgQQAAgJAEgFIABAAIAhApQAmAlAmgEIABAIQACAMgDAMQgEAKgLAIQgLAHgOAEgAC7BtQgLgGgGgKQgEgLAAgNIAAgJIAGAEQARAGAQgBQAvgFAThOIAAgBIABAGQACAPgHAWQgHAVgKARQgJATgMAQIgNANIgDAEQgRgEgJgFgAmTAZQgTgWgQgXQgQgZgMgaQgOgeAAgWIABgLIAAAAQAOAaAXAVQA1AxA3giQgiAxgSBBIgRgRgAGEADQgLghgTgfQArAMAqgmQAXgVAPgaIAAAAIABALQgBAWgOAeQgJAWgTAdQgRAYgSAVIgIAIIgIgeg","fc":"#AA9D85"},"227":{"t":[51.9,28.6],"p":"AhVDQQgJgJgHgJQgSgXgCgTQAAgFABgDIAAAAIABAAIAAAAIAAAAIAAAAIADABQALACALAHQAJAFALAKQAKAMABAHIgFgHIAEAMIAAALQgBAEgEADQgDAEgHADgABYDJQgDgDgCgFQgBgCAAgJIAEgNIgFAIQAAgIAJgMQAGgKALgJQANgKAIgDIAFgBQABABAAgBIAAAAIAAAAIAAABQADAEAAAFQACAUgRAbQgHALgIAIIgGAGQgIgBgFgEgAkJgeIghgqIAIAAQAOADAYAMQAWAKAOALQAOALAHAJIABABQADAEABAIIABAEIgHAAQgiAAgjgfgACsgIIgGgDIABgFQAAgGADgHIgEAIQAGgNARgSQAOgNAUgMQAVgOAPgEIAIgBIABAAIAAAAIADAIQgTBQgvAGIgGAAQgNAAgOgGgAFLhpIAAAAIAAACIAAgCgAm6ihQgXgVgOgaIABgDIAAAAIADgCIANAAQAWADAjAKQAdAJAZANQANAHALAIIAEADIgLAPQgWANgWAAQggAAgggdgAFmiHIgGgJQgIgMgJgMIARgKQAZgNAdgJQAkgLAVgCIAMAAIAEACIAAAAIACADQgPAagXAVQggAdggAAQgKAAgLgDg","fc":"#F0E7D7"},"228":{"t":[55.5,44.5],"p":"AgtFXQgLAAgWgFQghgJgjgRQg9ggg0guIAzAAQBAgEA5gRIAGAHIAMAKIAEgDQAHgNAEgMIAigOQBOgmA2g+IAAAAQgwAIgRgNIABgDIAOACIACAAIADAAIAGgBIAGgEIAIgHIAIgOQAFgJAFgSQAGgYABgRQAMAJAMAMQAMAMAGALQAPgZAMgZIAKgGQApgZAvgMQgigagmAOIgGADIAGgTIABgBQAIgJAHgLQAKgRAKgaQAJgZADgTQAGgegCgRQgCgRgIgKIgDgEIgGgDQgDgBgFAAQABgfgCggIABAAIAFAEQAjAcAWAtIAAABIABABQAKAUAIAYIAAADQASA9ACBZQABATgBATQAAAQgDATQgEAjgNAkQgYBBg0A8QgxA3hBAmQhFAohBAHIgSABgAAMCuQgFAGAAAMQADAQALATIADADIANgKIALgLIAUgZIgDgEQgTgJgQgCQgNAAgFAFgADogcQgOAKgLARQgKALgHARQgNAdADAaQADAZAQAHQAQAHAVgPQANgLAKgQQALgNAIgSQAMgdgDgXQgCgagRgHQgFgCgFAAQgMAAgOALgAkTCJQgZgLgRgaQgQgbABgZQAAgJACgHIAAAFQgCAaAOAZQAOAZAVALQAWAKAQgKQAQgLABgZQACgZgNgZIAJANQARAagBAaQgBAZgSAKQgIAFgKAAQgLAAgNgGgAhyBcIAEAAIABAAQAQgDALgHQAQgKAHgOQAHgPgBgRIgCgPIgEgMIgEgHIgBgBIgVgIIACgGQAaAMAYAZQAaAcAAATQAAAYgyAIQgSADgNAAQgQAAgKgEgAj+g5QAUgFARgKQAWgMAKgXQAKgTgBgbQAAgKgDgMIgFgRQAaAPAZAZQAjAkAAAZQAAAdhEALQgZADgSAAQgfAAgOgJgADokAIAAAAIAAAAQACADABAEIAAABIgDgIg","fc":"#605E4A"},"229":{"t":[39.3,32.9],"p":"AA2EQIgTAKQAPgyAeADQAeACANAuQgqgSgbAHgAicBkQgRADgRAIIgOAIQAZhGA5AQQAXAHAQAUQARAWAAAcQgjgzg3AJgAjSADQgRgpAbhDIAAAEQABATAIAbQAHAUALAXIAHAMQgPAOgGADIgHABQgJAAgHgPgAg0hlIgVgKIgrgQQgYgIgWgEIgOAAIgIADIgCAAQArhRBLgfQBWgkBaACQBdADAQAsQAHAWhCAVQhuAigpAVQgbAPgfAWIgBgBg","fc":"#DBDDBC"},"230":{"t":[49.6,35.6],"p":"AjIFEIgIgHQg5g2gig/QglhEgBhHQgChTAPhCQAShQAtg0QAtg1BNgaQA+gVBWgDQBSgBBHAPQBPAQAyAoIgBAAQACAhgBAeIgBAAIgOACQgPAEgdAMQgTAJgWAMQgbARgOALIgCACIgDAGIgEAWQgBAKABAMQABAZAMAUQANAVAXAJQARAIAZACIAHAAIAHgCQAFgBAEgDQAEgDAHgFIgGASIAGgDQAmgPAiAaQgvAMgpAZIgKAHQgMAbgPAZQgGgLgMgNQgMgNgMgJIAAgMQgBgKgEgFIgCgCIgBgBIgBgBQgDgCgDAAIgIABIgbAIIgaAKIgOAGIgQAIIgBABIgEAHIgCAPIAAAPQACASAIAMQAJAOAQAHIAOAFIgBACQARANAwgHIAAAAQg2A+hQAlIgiAPIACgKQABgMgFgGQgEgGgMAAQgPABgUALIgEADIAKANIAQARQg5AQhAAFgAAUEBQgNgugbgDQgfgCgOAyIASgLQAbgHAoATIAAAAgAj+BbQgOAJgDAVQgCAHAAAJQgBAaAQAaQARAaAZAMQAYALASgKQASgKABgaQABgZgRgaIgJgNIgBgBQgOgagVgKQgLgFgJAAQgKAAgIAFgAhtA6IAAABIgCACQgEAHAAAKQAAANAFAQQAEAOAFAMQAHARAGAJQAEAHAGAGIAJAGIAHADIAHABQASAHAlgGQAygJAAgXQAAgUgagcQgYgagYgNIgCAGIgKgDIgbgIQgSgFgKgBIgJAAIgHADIgBABIAAAAgAipB0QAAgcgQgWQgQgVgYgHQg5gQgYBHIAOgIQARgJARgDQA3gJAiA0IAAAAgAhrAkQBEgKAAgcQAAgZgjgjQgZgZgagPIgBgFIgEgGIgCgBQgJgGgMgHQAegVAdgPQAqgWBrgiQBDgVgIgVQgPgshdgDQhZgDhXAkQhLAggrBRIgCABIgBABIgBABIAAAAIgDAEQgGAJgBAOQgcBDASArQAIAVAOgHQAHgDAPgNQAIAPAJAJQAHAKAKAIIAMAJIAKAEIAMAAIACAAIADgBQAXAQBBgKgAEiimIABAAIAAAAg","fc":"#989588"},"231":{"t":[43.7,27.1],"p":"AiHgGQgyjsCnA9QBUAWBGBzQATA2gLBVQglBjg3AAQhLAAhwjIg","fc":"#DBDDBC"},"232":{"t":[36.3,59.3],"p":"AjsDFQhkiDAAi2QAAhzAmheQArH7EGgKQETgTAomTQAPA/AABHQAAC2hkCDQhiCAiLABQiKgBhiiAg","fc":"#605E4A"},"233":{"t":[36.3,48.3],"p":"AkRFbQhwiUAIjHQAJjFBpiUQBpiTCfAAQCgAABoCFQBnCGAKDVQAJDShxCSQhyCVigAAIAAAAQihAAhwiSgAjtlCQgmAygXA6QgnBeAAByQAAC3BkCDQBjCACKABQCKgBBiiAQBliDAAi3QAAhGgPg/QgYhmg+hRQhiiAiKAAQiKAAhjCAg","fc":"#1D2226"},"234":{"t":[37.5,39.9],"p":"Ak2iCQAYg6AmgyQBiiACLAAQCKAABiCAQA+BRAYBmQgpGSkRAUIgKAAQj+AAgrnxgAhJiGQC9FXBajwQALhVgTg4QhFhzhXgWQgigMgXAAQhiAAAoC7g","fc":"#989588"},"235":{"t":[23.8,43.8],"p":"AgcEpQg3gEg2giQg2gigPggQgPgfgGgYQgGgYgDgXQgCgYADgdQAEgeAMgSQAIgNAMgIQAMgJAQACQAVABAcAUIgMAQIgFAJQgEAMACATQACAUAPAQQAPARAJACQAKADAJgDQAKgDAIgNQAJgNAEgWQAFgVgXgaQjejDAMg4QANg3AtASIAGAOIAcA/QAEARAIASIALASQAUAiAjAfQAVAJASAUIAGAGQATAWAMAcQAMAbgBAdQgBAhgTAYQgLAOgNAFIgBABQgPAHgRgDIgLgDIgEgCQgJgEgEgEQgLgJgJgPQgOgbADgdQACgRAEgLIAGgLIABgBIAFgFQgSgKgOAAQgUAAgMAWQgKAPgCAbQgDAXAEAYIACAKQAKApAXAjQAbAqAnAXQAnAXAwADQAuABAogTQBPglAthhQAqhagGhbQgHhogehNIAAgBIA7gqQAIACAPApQAPAogBB1QAABzghBSQggBTglAmQgkAng6ASQgyAPgtAAIgQgBg","fc":"#1D2226"},"236":{"t":[18.4,30.7],"p":"AigDbQgEgXADgYQACgaAKgSQAMgWAUAAQAOAAASALIgFAFIgBABQglAZgcBOIgCAEIgCgLgAgYh+QAKisCWB1QA9CehMCdQgFAKgIAAQgnAAhdkOg","fc":"#DBDDBC"},"237":{"t":[24.1,38.3],"p":"AgdFAQgwgCgngYQgngXgbgpQgXgjgJgpIABgEQAdAtBcAsQBwA2A6gtQAbgVAdhMIAYhIQARhqAFimQAeBMAHBpQAGBagqBbQgtBghPAlQglATgqAAIgHgBgAhvgqQgjgfgUghIgKgSQgJgSgEgSIgcg/IArhhIAgASIgBABQgNANAOgOQgDCuBKB0QgTgUgVgKg","fc":"#605E4A"},"238":{"t":[22.4,34.5],"p":"AhLEUQhcgsgdgtQAchNAlgaIgGANQgEALgCARQgDAdAOAbQAJAPALAJQAEAEAJAEIAEACIALADQARADAPgHIABgBQANgFALgOQATgYABghQABgdgMgdQgMgcgTgWIgGgGQhJhyADiuQgOAPANgOIABgBIAWgUQAQgHAbgHQAXgEAXgCQAwgCAoAPQAqAQAfAjQAdAhATAuIACAGIAAAAQgFClgRBsIgYBIQgdBMgbAVQgbAUglAAQgsAAg+gegAhAilQBwFDAhg+QBMidg9ifQg9gvglAAQg4AAgGBmg","fc":"#989588"},"239":{"t":[26.9,25.7],"p":"AhjCfQAHgjAbgaQAgggAsgBQAvgCAiAeQAdAYAKAhQhBAyg8AAQg1AAg0gpgACoBiQhOgdgQgQQgVgUgHgnQgPhRAAgmQgWgng5gDQgZgHAQgLQBbgjBqA1QAtAoAKBTQAKBRgGAhQgFAdgVAAIgFgBgAjDAcQgNhCAVhBQAQgvATgSQA1gUAoApQAkAnABAwQAAAwgVAcQgWAfgWASQgrAYgaADIgDAAQgYAAgMhAg","fc":"#91B1CE"},"240":{"t":[26.5,25.4],"p":"AgEDgQgnAAgigDQgpgFgbgJQghgLgSgYQgSgVgIglQgJg0APhXQAFgeAMgoQAKgiAPgeIACgDIANgMQAIgHALgGQAUgMAYgIQArgNA2gDQA0gCAsAUQAVAJAWAQQAVAQANASIAQAUQAKAVAHAWQAKAhAEAmQAEAdgBAqIACAlQABAWgBANQgCASgGAMIgGAJIgIAIIgHAFQgWASgnAKQg1ANhOAAIgJAAgAAPBEQgsABggAgQgbAagHAjQBrBXB7hfQgKgigdgYQgggcgtAAIgEAAgAg1i1QgQAKAZAHQA5AEAWAnQAAAlAPBSQAHAmAVAVQAQAPBOAeQAZAEAGghQAGgggKhRQgKhTgtgpQg/gfg7AAQgmAAglAOgAiUikQgTARgQAvQgVBBANBCQANBEAagDQAagEArgXQAWgTAWgeQAVgdAAgwQgBgwgkgmQgbgcggAAQgQAAgSAHgAgDAOQgeAqguAeIBXguIBeAsQg1gggVgdIgUhog","fc":"#4F6877"},"241":{"t":[26,25.8],"p":"AhLD/QgugFgfgKQgtgOgaghQgZgfgHgtQgHgjAEgsQACgiAHgoQAGgfANgrQANgnASggIAAgBIABAAIAFgHIARgQQANgKALgGQAXgMAdgJQAvgOA7AAQA5gCAyAZQAYAMAXASIAIAHIAbAjQAUAbAQApQALAgAIAqQAFAhABAoIADAkQACAXgBARQgBAXgJASIgFAKIgHAJIgPAPQgcAWgtANQg8ARhaAAIgJAAQgfAAgjgCgAAGjjQg2ADgrANQgYAIgUAMQgLAGgIAHIgNAMIgCADQgPAegKAiQgMAogFAeQgPBXAJA0QAIAlASAVQASAYAhALQAbAJApAFQAiADAmAAQBUABA5gOQAngKAWgSIAHgFIAIgIIAGgJQAGgMACgSQABgNgBgWIgCglQABgqgEgdQgEgmgKghQgHgWgKgVIgQgUQgNgSgVgQQgWgQgVgJQgngSgtAAIgMAAgAAAAKIANhfIAUBoQAVAdA1AgIhegsIhXAuQAugeAcgqg","fc":"#1D2226"},"242":{"t":[35.8,59.3],"p":"AAZBSQgfgkgZggIgaghIgdgqQgbgiACgOQAAgGA2gsQA8gzApgJQAPAPg/A5IB0Fvg","fc":"#9F815D"},"243":{"t":[44.2,63.3],"p":"AAcC0Ih0lvQBBg6gPgPQgpAKg+AyQg2AsAAAGQgCAOAbAjIAdAqIAaAiIhmh4QAUgWAdgZQBEg6BKgfIAXAgIDdHJQgqBAg+AKg","fc":"#6B4F32"},"244":{"t":[35.9,48.5],"p":"Ai6AAIAKgJIAVgYIjCj9IgBgBIgBgCQgEgLgCgIQgCgNADgKQACgJAGgFQAGgEAIgCQALgDAMADIAEAAIADADQAOAOASAWIBWByIBUB1IAGgFIiqkYIgBgBQgDgMgBgHQgBgOAEgKQADgHAHgFQAFgDAJgDQALgBAMADIAEACIADADQAGAIAWAfIBKB6IAAAAIBKCEIALgHIiDkgIAAgCIAAgCQgCgJAAgLIAAgDQACgMAEgHQAFgHAGgEQAGgDAJgBQALABALAEIAEACIACADIANAYIALAUIA6CAIA1CGIATgIIANgFIAKAMQAQAVARAZIAkA2IDUG0Qg2Bgh0AWgAhVgrQgdAZgUATIBlB4QAaAhAeAkIBYCKIBWBmQA9gKArg/IjgnJIgXghQhHAghEA6gAlHlDIgCABQgBADABAGIAEAMIC2EAIALgLIAPgNIhYhzIhYhtQgRgUgLgKIgCAAIgCAAIgCAAgAhThgIANgKIAQgLIhPiDIgIgMIgqhDIgagnIgYggIgDgBIgEAAIgBABQgCABAAAIIADANIgCgCgAiCnGIgBAEIgBAFIABANIB3EhIAMgIIASgJQghhPgZg1IgOgdIgbg3IgVgqIgTggIgBgDIgCgBIgEgBg","fc":"#1D2226"},"245":{"t":[19.4,23.4],"p":"AiggyIgDgMQgCgFACgEIABgBIAEAAIC+EJIgMALgAhMh/IABACIgCgNQAAgHABgCIACAAIAEAAICjEiIgNAKgAAgi1IAAgNIAAgFIACgEIABAAIAEAAIB+EtIgOAIg","fc":"#B7991A"},"246":{"t":[20.6,22.9],"p":"AiqhDIACAAQALALARATIBZBrIBVBzIgPAOgAhTiOIADAAIAYAhIAaAmIAoBDIAIALIBPCCIgQALgAAbjFIACAAIABADIATAhIAWApIAbA3IANAeQAZAzAjBOIgSAJg","fc":"#685814"},"247":{"t":[-1.1,5.7,1,1,0,0,180],"p":"AAIAyQAIgVAIgbQADgKACgMIADgMIAAgHIgJAFIgUAQIgZAYIgFAHIgBABIABgCIgTgIIADgEIABAAIACgBIAPgNQALgKAJgGIATgQIAMgHQAEgCAGAAIAFABIAAAAIABABIADACIABAGQABAGgBAJIgHAkIgMAyg","fc":"#1D2226"},"248":{"t":[-6.7,18.8,1,1,0,0,180],"p":"AgMBAIgPgEQgOgGgKgLQgJgLgEgOQgDgKgBgNIAAgHIAFgDIBggtIAJgCQAEgBAGAAQAIABADADQAGAFAAAIIgBAMIgGARQgCAJgMARQgSAcgTAVIgFAGIgFAAIgBAAIgCAAIgKAAgAA0gxQgLABgRAIIhJAnQABATAKANQANAQAZABQAQgaAPgWIAPgaIAHgNQAEgKgFAAIAAAAg","fc":"#1D2226"},"249":{"t":[9.4,13.1,1,1,0,0,180],"p":"AgFBJQgOgCgMgLQgHgHgJgNIgEgGIAzhXIAKgMIAFgEIAGgDIAGAAIADAAIABAAIACABIAAAAIAGAEIADADIACAEIACAGIAEAQIABAcQAAAigCATIgBAFIgDAEIgLAJIgLAHQgMAGgKAAIgGgBgAAYg1IgBACQgIAKgTAjIgVAnQAKAQANAEQAPAGATgRQABgbgBgZIgBgaIgDgNQgBgFgBAAIAAAAIgCABg","fc":"#1D2226"},"250":{"t":[7.7,13.3,1,1,0,0,180],"p":"AgQA0IAchxIAFBxQgGAGgIACIgGACQgJAAgEgKg","fc":"#F2EBDA"},"251":{"t":[9.4,12.9,1,1,0,0,180],"p":"AgpAlIBGhkIANBsQgJAMgPAFQgHACgGAAQgWAAgYgbg","fc":"#AA9D85"},"252":{"t":[7.3,16.6,1,1,0,0,180],"p":"ABLB7QggAAgngLQghgKgfgQQgSgJgOgKIgOgLQgKgJgEgGQgGgIgKgQQgHgQgCgKQgCgQAEgQQAEgQAJgMQAPgUAdgQQAOgIALgDQAMgEARgCQAygEAzAiQAvAfAXAwIgJAFQgZgrgtgaQgwgcgqAGQgMABgKAFIgVAKQgYAPgKAPQgLASADAVQACAMAEAHQAEAJAHAJIABACIABAAQADAGAFAEQAGAGAGAEQANAKAPAIQAdAQAeALQAgALAhACQAkABAbgLIAHAQQgcAOgmAAIgFAAg","fc":"#1D2226"},"253":{"t":[7.9,22.7,1,1,0,0,180],"p":"AAsBpQg6gGgvgbQgMgGgMgJIgWgSQgUgTgSgUQgJgOgFgLQgGgRACgOQACgOAJgOQAIgLALgKIAHAIQgVAWgBAVQAAAUATAWQAQAQAVARIAsAbIAwASIAWAIQAQAEAJABQAvAGAxgOQACgMAAgMIgCgPIgEgQIARgFIAGARQACAJABAJQABASgEATIgBAFIgGACQguAQgtAAIgUgBg","fc":"#1D2226"},"254":{"t":[-2.9,5.5,1,1,0,0,180],"p":"AgSAbIAlhEIgTBTg","fc":"#F2EBDA"},"255":{"t":[-7.6,19.3,1,1,0,0,180],"p":"AghAuQgXgIAGgRIBmhHIg+BlQgMgBgLgEg","fc":"#F2EBDA"},"256":{"t":[-1.2,5.6,1,1,0,0,180],"p":"AgmAKQBGg/AGAGQAGAGgaBZg","fc":"#AA9D85"},"257":{"t":[-6.7,18.9,1,1,0,0,180],"p":"AgaAzQghgQgBgtIA6gbQA5gZAFAHQAIAMhABkIgEAAQgNAAgNgGg","fc":"#AA9D85"},"258":{"t":[2.2,12.5,1,1,0,0,180],"p":"AAcAwQgXgGgWgSQgYgRgLgSQgMgTAIgLQAHgKAXAFQAWAFAWASQAYARAMASQALAUgHAKQgGAHgMAAIgMgBg","fc":"#B4B4B4"},"259":{"t":[2.4,16.6,1,1,0,0,180],"p":"AAfBZQgLgHgRgVQgPgVgLgHQgSARglgOQgngPAXghQgQggAMgbQAPgjAZAAQBeABAvBbQAQAeAEAfQAEAegJACQACAVgSAGIgJABQgSAAgYgSg","fc":"#7C7C7C"},"260":{"t":[6.5,16.2,1,1,0,0,180],"p":"AgZBYQgkgPgdgUQgbgSABgGQgPgRgCgXQgEgzBAgpQANgIAjAEQAnAEAjATQBkA0gRB7QgbATgmAAQgoAAg0gWg","fc":"#626262"},"261":{"t":[-1.3,29.7,1,1,0,0,180],"p":"AgXgQIA1gFIgFAqIg2ABg","fc":"#686C72"},"262":{"t":[11.7,26.5,1,1,0,0,180],"p":"AgZAHIgkgfIAKgPIBqAuIAFAHQAEALgEAPIgBAAQgqAAgqghg","fc":"#C7CDCF"},"263":{"t":[7.5,22.8],"p":"AiTBPQgMgGABgNQABgLAHgFQBPAKBAgRQBqgdAohiQALACAGAaIAEAaQhABqh3ARQgcAEgYAAQgqAAgegMg","fc":"#9BA7AA"},"264":{"t":[28.6,41,1,1,0,0,180],"p":"AifC8QglgOgigUIgUgMIAVgLQAugXA7gpQAzglAtglQBghXA8hiIAHgKIB0BOIgGAJQhVCHhsBjQggAcgaAUQgRAMgQAKIgSAKIgNADIgKAAIgDABQgiAAgqgPgAgMAKQgrAng3AnQgvAhgnAWQAXAMAWAHQAoAOAegBIAIgBIAEAAIABgBIAPgIQANgHARgNQAdgXAbgYQBlhdBQh+IhIgwQg9BghdBTg","fc":"#1D2226"},"265":{"t":[28.6,44.7,1,1,0,0,180],"p":"AiJCLQhIgQgFgRQAuggBlg7QAYADAugSQBggnB0hvQgHAziLCBQhFBBhDA4QgigEgkgIg","fc":"#6B4F32"},"266":{"t":[28.6,41.4,1,1,0,0,180],"p":"AizCnIgqgdQBJgyBShBQCjiAAphOQAeAcA2AdQgoBEg5BHQhwCRhNAWQgUAEgTAAQgnAAglgRg","fc":"#9F815D"},"267":{"t":[30,37.4,1,1,0,0,180],"p":"ABsDvIgLgBIgMgDIgTgKQgOgIgTgNQgdgVgcgcQg2gxhNhiQhIhZgshFIgFgKQABgSAOgSQAegmBHgEQCdDWA7A0QAvApAxAjQA7AoAtAYIAVAKIgUAMQgiAVglANQgqAPgiAAIgCAAgAjvidQApBBBFBYQBKBcAyAuQAYAYAfAXQARANANAIIAPAIIABAAIAFABIAIAAQAdACAogOQAWgIAXgMQgpgXgsgfQg3gogrgnQgsgohFhTQg9hLghg1g","fc":"#1D2226"},"268":{"t":[30,41,1,1,0,0,180],"p":"AgUBmQiGh1hWirQB0BvB6BLQA7AkAmAPIA4AiQA+AlAcAVQgFARhHAPIhHAMQgxgZhBg8g","fc":"#6B4F32"},"269":{"t":[30.1,37.8,1,1,0,0,180],"p":"ABbDYQhOgWiJi1QhGhZg2hWQAJgNAPgOQAegbAegDQCPDCCUB2QBLA8AvAVQgQAQgbANQglARgmAAQgUAAgUgEg","fc":"#9F815D"},"270":{"t":[13.7,28.9],"p":"AAODgQgDgZAGgXQAGgXAQgQIAXgWIgFgBIACgCIgFABIgHgCIAMABIAoAdIgFBkIgSggIgUgpIgBACIgCgEIgCANIghBDQgDgKgBgMgAhGgJQgZgvgChFQgCgiAEggQgBg2AeAAQAfAAAOBOQAOBPgSBAQgKAjgNAAQgKAAgMgUgAhZgZIAAgBIAGAQIgGgPg","fc":"#DBDDBC"},"271":{"t":[12.2,21.3],"p":"AgKAmQgSgFgSghIgOgeQASgGAWgCQAsgDAZAXQAbAXggAVQgWANgUAAQgFAAgHgBg","fc":"#608420"},"272":{"t":[45.5,22.4],"p":"ACygIIBIg0IBqCTIhYA+AhshCIgChSICuAAIAGBOAklCNIg+g0IBhiJIA8Ao","sc":"#1D2226","ss":[3,1,1]},"273":{"t":[44.5,39.5],"p":"AhQjXIAAFEQhbgygqAeQgqAegUBhAEGCkQgSg2gegVQgqgehxAzIAAlFAEUDYQgGgdgIgX","sc":"#1D2226","ss":[3,1,1]},"274":{"t":[44.1,45.3],"p":"AjoE7QgIgFgEgEQgLgNgKgbQgMgigHgsQgNhRAAhNQABgnAJgsQAJgvAQgjQAjhNA/gxQBHg1BOgFQAngDAoAKQAoAKAjAVQBDApAsBLQAlBBAJBjQADAZgBA0QgCAsgDAjQgGAvgJAgQgHAXgKARQgIANgMAGQgHAFgJAAQgEABgEgBIgDAAIAAAAIgBAAIgHgDIgFgFIgFgLIgBgIIAAgMIACgUIAFgmQAEgugLgVQgGgNgMgGQgNgGgRAAIgNAAIgDAAQgJABgGADQgMAFgHALQgGAKgDAUQgBAIgBAdIgCAOIgCAFQgCAFgFAEQgFAFgKAAIg8ABIgmgBIgLAAIgNgDQgKgDgHgIQgFgFgEgIQgEgKgDgMIgEgTQgEgTgHgLQgIgMgMgEQgNgEgRACQgRABgIAHQgJAHgCAPQgDAYAKAvIALA8QAAARgFALQgFAKgKAEIgEACIgBAAIgCABIgKABQgJAAgIgFgAj9C2QAIAtAKAcQAJAUAHAIQADADACAAIAAAAIABgKIgDgRIgIglIgIgoQgDgcACgQQACgNAEgLQAGgMALgKQAJgIAOgFQALgEAMgBQAbgCAUAGQAaAJAOAXQAKAQAGAaIAFATIAEAPIACACIAFABIBbABIAEgkQADgaALgSQAOgYAZgJQAMgEALgCIAXAAQAYABAVAKQAXALAMAZQAIARACAbQABASgDAYIgHA3IADgEQAHgKAHgUQAIgbAGgvIAFgtQAHAXAGAcQgGgcgHgXIACgfQACgzgCgYQgGhMgkhBQggg6gxgkIgUgOQgUgMgqgMQgbgPgyADQghACgdAKQgoAOgiAbQg6AuggBJQgeBEABBLQABAtgDBSIACAAQALAAAFAZg","fc":"#1D2226"},"275":{"t":[38.8,28.2],"p":"AikA8QgPgfAgglQAkgrBDgSIAOgEIACAAIgCABIAAB3IhDAVQgVAGgPAAQgXAAgIgOgAB4hJQAkALALAVQANAYgqARIgSAEg","fc":"#B4B4B4"},"276":{"t":[43.2,28.5],"p":"AhFhKIABgDQA7gRA1AKQAOADAMAEIAABsIhYAjIgzAXg","fc":"#C7CDCF"},"277":{"t":[42.5,37.3],"p":"AkGChQgBgZAFg6QABh4BShWQAwgyA7gVIACAOQABAIACAGQgBAOAAAgIABA8QAAAHAEAaIAEAcQAAAbgEAcIgFAfIADAbIgCAMIgEgoQgEgtgIgcQgLghguAbQguAcgvBGQgKAOgFATQgGAZACAaQABAGgJAQQgGgWAAgXgABSjNQArALAnAaQBBArAjBIQhvA3g3AyIgQAQg","fc":"#7C7C7C"},"278":{"t":[34.4,38.7],"p":"AAPCQQgagbgpgDQgogCgiAWQgSALgMAQQAJgVAKgQQAEgJAEgEQAHgIAOgBQACAAAOgHQASgGAVAAQAVAAAaANIAYANQAEAAACgUIgDgbQAJhEAAgSQgIgrAAgRIgBg8QAAgjADgMIAAgIIgCAAIgEgWIgEACQAogOAuAAQAdAAAcAHIAAEYQhGBLAABbIglACQgDg1gggfg","fc":"#9BA7AA"},"279":{"t":[44.7,37],"p":"AEIC+IgQghQgJgQgSgPQgegZgfAAQgZAAghANQghAMgGgBIgBAAIAAAAQgCgHAAgMQALh5AAgdIgCgNIAAg1QgBgJgBgcIAAgeIAAgcQBIASA4A8QBRBWAAB4QAABOgDAxQgFgHgEgJgAkTBPQAAh4BRhWQAvgzA8gVIgFA3IgBAVQAAAOAEAIIAAApIAEA2QAEAsAAARIgDASQgDAPAAAHIAAAeQg2gWgjAAQgyAAggA1QgJAPgIATIAAhvg","fc":"#626262"},"280":{"t":[44.5,45.2],"p":"ADXEQIABhHQgEhuhCAAQghAAgOATQgHAJgIAfQgIAcgOANQgUATgrABQglABgWgSQgNgMgOgeQgOgfgJgLQgSgTgfAAQhAAAACBrQAAAXAGAwQADAegFgEQgugigJhhIgBglIAEgLQAHgZAQgWQAdgqArAAQAeAAA9AYQAFAAAAgWQAAgMACgTIADgXQAAgTgEguQgDgsgCgLIAAgoQgCgIAAgNIAAgUIABgMIACADIACgBQACgMAAgOIgBgVQAngNAoAAQAgAAAeAHIAABXIACAOIAAAzIABALQAAATgFA+IgFBEIAAAOQABANAHAAQAFAAAjgMQAjgMAYAAQAQAAAnAVQAHAEAIAMIAMARQACACASAqQAEAIAFAFIgCAWQgNBlgmAjIgCACQgEAAAAgZg","fc":"#686C72"},"281":{"t":[13,33.9],"p":"AAeAaIg7gy","sc":"#1D2226","ss":[3,1,1]},"282":{"t":[44.5,59.5],"p":"AhgDcQgmgXgrgtIgjgoIAagdQAWgWALgFIgCAAQgLgJAIgHQAQgMBdABQCcgDAkhQQAOgeAEg4QADhDADgjQAMAJAOAwQAPA1AEA9QALCkhPBRQg6A7hLAIQgLACgNAAQgvAAgkgXgAgsA4IhoABQghAgApAuQAjAqAhAFQAKACA7AAIBAAAQAZgBAcgTQAagRAQgXQAPgaAAgMQgBgOgVgIQgNgFgVACIgjADIgOgIIgcgBIhSABg","fc":"#4F6877"},"283":{"t":[28.4,52.3],"p":"AgzB/QgEgNgDgvQgDgrABgtQABglAahAIAag4IAFAeQACAogCA1QgJBkAiAvQATAYATAEIgyALIgvAxQgIglgHgQg","fc":"#4F6877"},"284":{"t":[44,56.2],"p":"AidDPQhChTACiJQADiCA0hEQA5hKBtABQBwABA4BJQA1BEABCBQABCGhBBUQg/BQhfAAQhfAAg+hOg","fc":"#91B1CE"},"285":{"t":[13.7,30.8],"p":"AAODNQgDgZAGgXQAGgXAQgQIAXgWIgFgBIACgCIAoAdIgFBkIgSggIgUgpIgBACIgCgEIgCANIghBDQgDgKgBgMgAAvBcIAMABIgFABgAhGgcQgZgvgChFQgCgiAEggQgBgcAeAUQAfAUANApQAPAygSBAQgKAlgNAAQgKAAgMgWgAhZgsIAAgBIAGAQIgGgPg","fc":"#DBDDBC"},"286":{"t":[50.3,27.1],"p":"AjaBJIgOgMQgMgNgOgTQgNgUgHgOQgJgWAAgQQgBgJAEgGIABAAIAhAqQAnAiAlgDIACAIQACAMgEAMQgEAKgLAIQgKAHgOAEgADKAyQgLgHgFgJQgFgLAAgNIAAgJIAGADQARAHAQgBQAvgGAThOIABgBIABAHQABAQgHAXQgHAUgJAQQgJATgNAQIgMANIgEADQgRgDgJgFg","fc":"#AA9D85"},"287":{"t":[50.5,34.4],"p":"AhHCWQgJgJgHgJQgSgXgCgTQAAgGABgCIAAAAIABgBIAAAAIAAABIAAAAIADAAQALADALAHQAJAFALAKQAKAMABAHIgFgHIAEAMIAAALQgBAEgEADQgDAEgHACgABmCPQgDgEgCgEQgBgDAAgIIAEgNIgFAIQAAgIAJgNQAGgJALgJQANgKAIgDIAFgBQABAAgBAAIABAAIAAAAIAAABQADAEAAAFQACATgRAcQgHALgIAIIgGAGQgIgCgFgDgAj7hYIghgqIAIAAQAOADAYALQAWALAOALQAOALAHAJIABABQADAEABAIIABAGIgHAAQgiAAgjghgAC6hCIgGgDIABgFQAAgGADgHIgEAIQAGgOARgRQAOgNAUgMQAVgOAPgEIAIgBIABAAIAAAAIADAIQgTBQgvAFIgGABQgNAAgOgGg","fc":"#F0E7D7"},"288":{"t":[50.4,35.1],"p":"AhFC6IgHgDIgJgHQgHgGgDgGQgHgKgHgQQgFgMgEgPQgFgQABgNQAAgKADgHIACgCIAAAAIABgBIAAAAIABgBIAHgDIAJAAQALABARAFIAbAIIAKADIAWAIIAAABIAEAHIAFAOIABAPQABARgHAPQgHAOgQAKQgLAHgPADIgCAAgAhpBKIAAAAQgBADAAAFQACATASAYQAHAIAJAKIAGAFQAHgDADgDQAEgEABgEIAAgLIgEgMIAFAHQgBgHgKgMQgLgKgJgFQgLgHgLgCIgDgBIAAAAIAAAAIAAAAgABxCwIgOgCIgNgEQgQgHgKgPQgHgMgDgSIAAgPIACgPIAEgHIABgBIAQgIIAOgGIAagKIAbgIIAJAAQACAAAEACIABAAIABABIABACQAEAFABAKIAAAMQgBATgGAYQgFASgEAJIgJAOIgHAHIgHAEIgFABIgEAAgABhB0QAAAJABACQACAFADADQAFAEAIABIAGgGQAIgIAHgLQARgbgCgTQAAgGgDgEIAAAAIAAAAIAAgBQAAABgBAAIgFABQgIADgNAJQgLAJgGAKQgJAMAAAJIAFgIgAjcAjIgJgDIgNgJQgJgIgIgLQgIgJgJgPIgHgOQgLgXgHgUQgIgbgBgTIAAgEQABgOAGgKIADgDIAAgBIABAAIABgCIACgBIACAAIAIgDIAOAAQAVAEAYAIIAsAQIAVAKIABABQAMAGAKAGIACACIADAGIAGAVQADAMAAAKQACAbgLATQgKAVgWAMQgQAKgVAFIgDAAIgCABgAkgh7QAAAQAKAWQAHAQANAUQAOATALANIAPAMIAEADQAOgEALgHQALgIAEgKQADgMgCgMIgBgIIgBgGQgBgHgDgFIgBAAQgHgKgOgKQgOgLgWgLQgYgMgOgCIgIgBIgBAAQgEAGAAAJgADgATQgZgDgQgIQgYgJgMgUQgNgVgBgYQgBgNABgJIAFgXIACgGIACgCQAOgLAcgQQAVgMATgJQAegNAOgEIAOgBIABAAQAFAAAEABIAFADIAEAEQAHAKACARQACARgFAeQgEATgJAZQgKAagKARQgHALgIAHIgBABQgGAHgFACQgEAEgFABIgHACgAC2hSIgBAFIAAAJQAAANAEALQAGAJALAHQAJAFARADIADgDIANgNQAMgQAJgTQAKgSAHgUQAHgXgCgQIgBgHQgBgEgCgDIAAAAIgBAAIgIABQgPAFgVANQgUAMgOAOQgRARgGANIAEgIQgDAHAAAGg","fc":"#1D2226"},"289":{"t":[52.6,18.2],"p":"AmwBXQARgrASgnIAoAUIgWAqQgBAAAAABQAAABAAAAQgBABAAAAQAAABAAAAIgYAGIGWDHIGVjIIgYgFQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAgBgBAAIgWgrIAogTQASAnARArImwDPIgBABgAAAC4IlVisIgBgCIgugUIAVgpIAJgPQCAh+ChhSQAhgSAigCQAgACAoAXQCeBMCDCBQAQAZAOAcIguAVIgBACIlWCtgAgFkfQgFAAgEADIgBABIAAAAQihBWhhBpIgCABQgWAVgLAOIgIAJQgDADAAAEIgBAFIAAACIgkAOIFnCrIFbi3IgegJQAAgFgCgDIgCgDIAAAAIgIgKIgCgCIgOgQIgJgJIgBgCQhxh3inhMIgBAAQgCgCgDAAIgBAAgAkcgmQALgMATgTIABgBIABgCID9CEIEKh6IACADIAAAAIAQARIkaCSg","fc":"#686C72"},"290":{"t":[52.6,16.5],"p":"AmVBeIAYgFIAAABIACAGIADADIF4CxIAAgBIF5iwIADgEIACgGIAAgBIAYAFImVDJgAlpBVIATgkIFICnIgpAMgAAPDXIFIimIATAjIkyCPgAlkgCIAkgOQAAAFADAEQACAFAFACIABAAIExCXQAEACADAAQAFAAAEgCIABAAIEpiaIABgBQAEgCADgFIABgCIABgJIAAgBIAeAJIlbC4gAj8g2IAgggQBwhIBsgsQB3AwBoBCQATASASATIAAAAIAHAHIkKB5gAAAiJIAAAAIAAAAIABgBIgBAAIAAABIAAgBIAAABgABGj7QgogXgggCQgiACghARQihBSiAB+QAIgMAIgKQAwg8BdhFQB7hdBNAAQBKAACLBpQBwBVAUAfIAPAZQiDiBiehLg","fc":"#9BA7AA"},"291":{"t":[52.7,17.2],"p":"Ag4DdIApgNIAPAIIAAABIAOgJIApAMIg3AbgAgFj1QCCA9BhBZQhohCh2gwQhtArhwBJQBXhTCBhFg","fc":"#C7CDCF"},"292":{"t":[52.6,17.5],"p":"AgCFNIm/jXIAAAAQgEgCgDgEIgCgCIgBgIQgCgGACgFIAAAAQAVg1AXguIgBAEIABgBIABgEQAnhQAwg+IACgDIAFgFIAPgOIAAAAQAUgSAJgFIACgBIgCABQBJg+A7ggQBPgrBBAAQBogBCOBrQCSBuAXBsIABAAQAXAuAUA2IAAAAQADAFgCAGIgCAHIgBACQgDAFgEABIAAAAIm7DWQgCACgDABIgCAAIgCgBgAmwBeIGwDPIABAAIGwjQQgRgrgSgnIgoAUIAWAqQABABAAABQAAAAAAABQABAAAAABQAAAAAAABIAAABIgCAGIgDADIl5CxIAAAAIl4iwIgDgEIgCgGIAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAgBABAAIAWgqIgogUQgSAngRArgAlpBKIEyCPIA3AaIA4gaIEyiPIgTgkIlICnIgPAJIAAgBIgOgIIlIimgAjJjTQhdBGgwA7QgIAKgIANIgJAPIgVAoIAuAVIABACIFVCsIAAAAIFWitIABgBIAugVQgOgcgQgaIgPgYQgUgfhwhVQiLhphKAAQhNAAh7BcgAADCOQgDAAgEgCIkxiWIgBAAQgFgDgCgEQgDgEAAgFIAAgCIABgFQAAgEADgDIAIgJQALgOAWgVIACgBQBhhpChhWIAAAAIABgBQAEgDAFAAQAEAAACACIABAAQCnBMBxB3IABACIAJAJIAOAQIACACIAIAKIAAAAIACADQACADAAAFIAAABIgBAJIgBACQgDAEgEADIgBAAIkpCaIgBABQgEABgFAAIAAAAgAjchhIggAgIgBACIgBABQgTATgLAMIEfCOIEaiSIgQgRIAAAAIgCgDIgHgHIAAAAQgSgSgTgSQhhhZiCg+QiBBGhXBSgAAAiUIAAAAIAAAAIABgBIgBABIAAAAIAAABIAAgBg","fc":"#1D2226"},"293":{"t":[51.9,42.5],"p":"Ag5GgQgngKgogVQhGgkhAg9Qg+g+gkhHQgohRAChQQABg0AGgvQgGgEgFgGIgMgNIgTgbQgSgbgQgdQgPgegMgcQgGgRgEgPQgFgTAAgPQAAgLACgJIAEgLIAFgIIABgBIACgDQAFgEAJgEIALgCIASAAQAgACAhAIQAlAIAZAKQASAGANAGIASAJQAvgnBCgVQBDgWBcgCQBXgCBHAOQBbASA7AwIAAAAIAHgDQANgGASgGQAYgJAmgJQAigIAfgCIASAAIALACQAJAEAFAEIACADIACABIAEAIIAEALQACAHAAANQAAANgFAVQgFARgFAPQgMAcgQAeQgOAdgTAbIgTAbIgMANIgCADQADAfACAiIABAoQABASgDAWQgDApgOAoQgZBMg5BFQg4BAhGArQhPAvhQAJIgrACQgWgCgVgGgAgLmIQhYADg/AVQhNAagtA1QgtA0gSBQQgPBCACBVQACBFAkBEQAiA/A5A2IAIAHQA0AuA+AfQAiASAhAIQAWAFALABIAPAAIARgBQBDgHBFgoQBBglAxg4QA1g8AXhBQANgjAFgkQACgVAAgNQABgUgBgTQgChZgSg9IAAgCQgIgYgKgVIAAgBQgXgtgjgdIgFgEQgygnhPgRQhBgOhJAAIgMAAgAnelfIAAABIgBADIAAAAIgBALQAAAWAOAeQAMAbAQAZQAQAYATAXIARAQQAShDAigwIALgPIgEgDQgLgIgNgHQgZgNgdgKQgjgKgWgCIgNAAgAGWlUQgdAKgZANIgRAKQAJAMAIAMIAGAJQATAgALAiIAIAeIAIgHQASgWARgZQATgeAJgWQAOgeABgWIgBgLIAAAAIgCgDIAAgBIgEgBIgMAAQgVACgkAKgAA5D3QgLgTgDgPQAAgMAFgGQAFgGANAAQARACASAKIAEADIgUAZIgMALIgMALgAgtDwIgGgGIgQgRIgKgNIAEgDQAVgLAPgBQAMAAAFAGQAGAGgCAMIgCAKQgDAMgIAMIgEAEIgMgLg","fc":"#1D2226"},"294":{"t":[51.9,16.5],"p":"AmTBIQgTgWgQgZQgQgZgMgYQgOgeAAgXIABgKIAAgBQAOAaAXAVQA1AvA3gfQgiAugSBEIgRgRgAGEAyQgLgjgTgeQArANAqgnQAXgVAPgaIAAABIABAKQgBAXgOAeQgJAVgTAcQgRAagSAVIgIAIIgIgeg","fc":"#AA9D85"},"295":{"t":[51.9,12.6],"p":"AFLA1IAAgBIAAACIAAgBgAm6gBQgXgVgOgaIABgEIAAAAIADgBIANAAQAWACAjAKQAdAJAZAOQANAGALAIIAEAEIgLAMQgWAOgWAAQggAAgggbgAFmAXIgGgJQgIgNgJgJIARgKQAZgOAdgJQAkgKAVgCIAMAAIAEABIAAAAIACAEQgPAagXAVQggAbggAAQgKAAgLgDg","fc":"#F0E7D7"},"296":{"t":[24.9,36.8],"p":"AgnFvQg3gEgugdQgsgcgcgwQgOgWgIgZQgKgbgDgXQgCgYADgdQAEgeAMgUQAIgNAMgIQAMgJAQACQAVABAcAUIgMAQIgFALQgEAMACAUQACATAPAQQAPARAJACQAKADAJgDQAKgDALgNQALgNACgWQACgVgPgZQgPgZgPgTQgOgSgSgGIgBAAIgCgCQgUgPgQgSQgQgSgNgUQgegugEgvQgFgzAbgwQAXgoAqgiIACgCIACgBQAVgJAegHQAZgGAbgBQA4gEAvATQA0ASAlArQAhAjAWA2QAhBRAJB3QAHBmgvBjQgZAygiAkQgnAqguAUQgsAUguAAIgNgBgAjWBDQgKARgCAbQgDAXAEAYIACALQAKAoAXAjQAbAqAnAXQAnAXAwADQAuABAogTQBPglAthhQAqhagGhdQgIhrgfhOQgTgugdghQgfgjgqgQQgogPgwACQgXACgXAEQgbAHgQAHQgNAKgKALQgTATgLAUQgOAXgEAXIgBAHQgCAMABANQABAMADANQAEARAIASIALASQAUAiAjAfQAYALAVAWQATAWAMAcQAMAdgBAdQgBAhgTAYQgLAOgNAFIgBABQgPAHgRgDIgLgDIgEgCQgJgEgEgEQgLgJgJgPQgOgbADgdQACgRAEgLIAGgNIABgBIAFgFQgSgKgOAAQgUAAgMAWg","fc":"#1D2226"},"297":{"t":[16.6,41],"p":"AApCsQgPgGgOgMIgHgGQANgFALgOQATgYABghQABgdgMgdQgMgagTgWQgTgYgYgLQgjgfgUgiIgLgSIgGgYQAPAaAegBQAfgBAOgMQAqAqAzBBIAwBMQApBVgiAoQgcAhghAAQgOAAgOgFgAiOB0QgEgYADgXQACgbAKgRQAMgWAUAAQAOAAASAKIgFAFIgBABQglAagcBNIgCAEIgCgKg","fc":"#DBDDBC"},"298":{"t":[24.2,37.1],"p":"AgeFMQgwgDgngXQgngXgbgqQgXgjgKgoIACgFQAdAtBcAsQBwA3A6gtQBohRhLi7QgbhEguggQgogdhXAMQgOANgfAAQgeABgPgaQgEgFgCgGQgDgNgBgMQgBgNACgMIABgHQAEgXAOgXQALgUATgTQAKgLANgKQAQgHAbgHQAXgEAXgCQAwgCAoAPQAqAQAfAjQAdAhATAuQAfBOAIBtQAGBbgqBaQgtBhhPAlQglASgrAAIgGAAg","fc":"#605E4A"},"299":{"t":[20.4,43.7],"p":"Ag2C5QhcgsgdgtQAchNAlgYIgHAKQgEALgCARQgDAeAPAbQAIAPALAIQAFAEAJAFIADABIAMADQARADAPgHIABAAIAGAGQAPAMANAFQAxATAogvQAigogqhTIgwhNQgwhBgsgqQBVgMAqAdQAuAgAbBEQBLC7hpBQQgaAVglAAQguAAg8gegAiYjWQADAHAEAFIAGAYQgJgSgEgSg","fc":"#989588"},"300":{"t":[26.1,35.7],"p":"AhUBmQgsgMgMgTQgbgkCOgdQCRgGAeAqQAMAQgNAQQgMARgdAHQgfAHgwADIgkACQgrAAgigIgAipgoQgdgYAPgWIAWgRQAogLAwARQAwARgPARQgUAWgiAMQgRAFgOAAQgZAAgTgQgABggiQgigDgQgTIgJgSQgWghBLgBQBKgCATAYQARAVggASQgYAOggAAIgQgBg","fc":"#91B1CE"},"301":{"t":[26.6,25.4],"p":"AgEDgQgrgBgegDQgpgEgbgKQghgLgTgXQgSgWgHglQgGggAEguQAKAXAPAQQAUAWAZAIQAaAJAdgGQAUgEAcgNQAYgLAWgDQALACAQAHIAdAMQAZAJAZABQALACAPgCIANgCIANgEQASgHAZgUIAcgaIAAAKIACAmQABAWgBANQgDAUgGAKIgDAGIgFAGIgGAFIgGAFQgVARgoAKQg3AOhNAAIgIAAgAgdBsQiPAdAbAlQANASAsANQAwAKBBgEQAwgDAegIQAdgHANgQQANgRgMgQQgbgkh1AAIgfAAgAiVBVQgWgEgVgPQgSgNgOgUQACgbAGgfQAFgfAMgnQAJggARgiIABgCIAMgLIAUgOQAUgMAYgHQArgOA2gCQAzgDAtAUQAXAKATAQQAWAQANASIAQAUQAJATAIAYQAJAgAFAnQACAWABAiIgjATQgZAOgRAEIgKACIgigCQgUgDgXgIQgmgQgWgFQgJAAgWAHIgdAKIguAPQgOAFgOAAQgHAAgIgBgAilgBIgWAPQgPAWAcAYQAeAaAtgPQAjgLAUgXQAPgRgwgRQgdgIgaAAQgRAAgQAEgABVgGQhKACAVAfIAKASQAQASAiAEQApAEAfgSQAggSgRgVQgSgUhBAAIgLAAg","fc":"#4F6877"},"302":{"t":[26.1,25.8],"p":"AhLD/QgugFgfgKQgtgOgaggQgYgfgIguQgGghACguQADgjAHgmQAHglAMgmQANglARgiIABgBIAAAAIALgNIAMgKQAJgHAPgJQAYgNAbgIQAwgOA6AAQA7gBAxAYQAYAMAXASIAIAHIAbAjQAUAaAQAqQAMAiAGAoQAGAgABApIADAlQACAXgBAQQgCAYgIARIgFAKIgHAJIgIAIIgIAHQgaAVguAOQg8ARhaABQgtAAgegDgAjZBuQAHAkASAWQATAYAhALQAbAJApAFQAeADAqABQBSABA7gPQAogLAVgQIAGgGIAGgFIAFgGIADgGQAGgJADgVQABgNgBgWIgCglIAAgLIgcAaQgZAVgSAHIgNAEIgNABQgPACgLgBQgZgCgZgIIgdgNQgQgHgLgBQgWACgYAMQgcANgUAEQgdAFgagJQgZgHgUgWQgPgQgKgYQgEAvAGAggAAGjjQg2ADgrANQgYAIgUAMIgUANIgMAMIgBACQgRAigJAgQgMAmgFAfQgGAfgCAcQAOAUASANQAVAPAWADQAVAFAWgIIAugPIAdgKQAWgHAJAAQAWAFAmAQQAXAIAUADIAiABIAKgBQARgFAZgOIAjgSQgBgjgCgWQgFgmgJghQgIgXgJgUIgQgUQgNgSgWgQQgTgPgXgKQgogSgtAAIgLAAg","fc":"#1D2226"},"303":{"t":[59,5.7],"p":"AAIAyQAIgVAIgbQADgKACgMIADgMIAAgHIgJAFIgUAQIgZAYIgFAHIgBABIABgCIgTgIIADgEIABAAIACgBIAPgNQALgKAJgGIATgQIAMgHQAEgCAGAAIAFABIAAAAIABABIADACIABAGQABAGgBAJIgHAkIgMAyg","fc":"#1D2226"},"304":{"t":[64.6,18.8],"p":"AgMBAIgPgEQgOgGgKgLQgJgLgEgOQgDgKgBgNIAAgHIAFgDIBggtIAJgCQAEgBAGAAQAIABADADQAGAFAAAIIgBAMIgGARQgCAJgMARQgSAcgTAVIgFAGIgFAAIgBAAIgCAAIgKAAgAA0gxQgLABgRAIIhJAnQABATAKANQANAQAZABQAQgaAPgWIAPgaIAHgNQAEgKgFAAIAAAAg","fc":"#1D2226"},"305":{"t":[48.4,13.1],"p":"AgFBJQgOgCgMgLQgHgHgJgNIgEgGIAzhXIAKgMIAFgEIAGgDIAGAAIADAAIABAAIACABIAAAAIAGAEIADADIACAEIACAGIAEAQIABAcQAAAigCATIgBAFIgDAEIgLAJIgLAHQgMAGgKAAIgGgBgAAYg1IgBACQgIAKgTAjIgVAnQAKAQANAEQAPAGATgRQABgbgBgZIgBgaIgDgNQgBgFgBAAIAAAAIgCABg","fc":"#1D2226"},"306":{"t":[50.1,13.3],"p":"AgQA0IAchxIAFBxQgGAGgIACIgGACQgJAAgEgKg","fc":"#F2EBDA"},"307":{"t":[48.4,12.9],"p":"AgpAlIBGhkIANBsQgJAMgPAFQgHACgGAAQgWAAgYgbg","fc":"#AA9D85"},"308":{"t":[50.4,16.6],"p":"ABLB7QggAAgngLQghgKgfgQQgSgJgOgKIgOgLQgKgJgEgGQgGgIgKgQQgHgQgCgKQgCgQAEgQQAEgQAJgMQAPgUAdgQQAOgIALgDQAMgEARgCQAygEAzAiQAvAfAXAwIgJAFQgZgrgtgaQgwgcgqAGQgMABgKAFIgVAKQgYAPgKAPQgLASADAVQACAMAEAHQAEAJAHAJIABACIABAAQADAGAFAEQAGAGAGAEQANAKAPAIQAdAQAeALQAgALAhACQAkABAbgLIAHAQQgcAOgmAAIgFAAg","fc":"#1D2226"},"309":{"t":[49.8,22.7],"p":"AAsBpQg6gGgvgbQgMgGgMgJIgWgSQgUgTgSgUQgJgOgFgLQgGgRACgOQACgOAJgOQAIgLALgKIAHAIQgVAWgBAVQAAAUATAWQAQAQAVARIAsAbIAwASIAWAIQAQAEAJABQAvAGAxgOQACgMAAgMIgCgPIgEgQIARgFIAGARQACAJABAJQABASgEATIgBAFIgGACQguAQgtAAIgUgBg","fc":"#1D2226"},"310":{"t":[60.8,5.5],"p":"AgSAbIAlhEIgTBTg","fc":"#F2EBDA"},"311":{"t":[65.5,19.3],"p":"AghAuQgXgIAGgRIBmhHIg+BlQgMgBgLgEg","fc":"#F2EBDA"},"312":{"t":[59,5.6],"p":"AgmAKQBGg/AGAGQAGAGgaBZg","fc":"#AA9D85"},"313":{"t":[64.6,18.9],"p":"AgaAzQghgQgBgtIA6gbQA5gZAFAHQAIAMhABkIgEAAQgNAAgNgGg","fc":"#AA9D85"},"314":{"t":[55.6,12.5],"p":"AAcAwQgXgGgWgSQgYgRgLgSQgMgTAIgLQAHgKAXAFQAWAFAWASQAYARAMASQALAUgHAKQgGAHgMAAIgMgBg","fc":"#B4B4B4"},"315":{"t":[55.4,16.6],"p":"AAfBZQgLgHgRgVQgPgVgLgHQgSARglgOQgngPAXghQgQggAMgbQAPgjAZAAQBeABAvBbQAQAeAEAfQAEAegJACQACAVgSAGIgJABQgSAAgYgSg","fc":"#7C7C7C"},"316":{"t":[51.3,16.2],"p":"AgZBYQgkgPgdgUQgbgSABgGQgPgRgCgXQgEgzBAgpQANgIAjAEQAnAEAjATQBkA0gRB7QgbATgmAAQgoAAg0gWg","fc":"#626262"},"317":{"t":[59.1,29.7],"p":"AgXgQIA1gFIgFAqIg2ABg","fc":"#686C72"},"318":{"t":[46.1,26.5],"p":"AgZAHIgkgfIAKgPIBqAuIAFAHQAEALgEAPIgBAAQgqAAgqghg","fc":"#C7CDCF"},"319":{"t":[50.2,22.8],"p":"AAYBXQh3gRhAhqIAEgaQAGgaALgCQAoBiBqAdQBAARBPgKQAHAFABALQABANgMAGQgeAMgqAAQgYAAgcgEg","fc":"#9BA7AA"},"320":{"t":[29.2,41],"p":"AifC8QglgOgigUIgUgMIAVgLQAugXA7gpQAzglAtglQBghXA8hiIAHgKIB0BOIgGAJQhVCHhsBjQggAcgaAUQgRAMgQAKIgSAKIgNADIgKAAIgDABQgiAAgqgPgAgMAKQgrAng3AnQgvAhgnAWQAXAMAWAHQAoAOAegBIAIgBIAEAAIABgBIAPgIQANgHARgNQAdgXAbgYQBlhdBQh+IhIgwQg9BghdBTg","fc":"#1D2226"},"321":{"t":[29.1,44.7],"p":"AiJCLQhIgQgFgRQAuggBlg7QAYADAugSQBggnB0hvQgHAziLCBQhFBBhDA4QgigEgkgIg","fc":"#6B4F32"},"322":{"t":[29.2,41.4],"p":"AizCnIgqgdQBJgyBShBQCjiAAphOQAeAcA2AdQgoBEg5BHQhwCRhNAWQgUAEgTAAQgnAAglgRg","fc":"#9F815D"},"323":{"t":[27.8,37.4],"p":"ABsDvIgLgBIgMgDIgTgKQgOgIgTgNQgdgVgcgcQg2gxhNhiQhIhZgshFIgFgKQABgSAOgSQAegmBHgEQCdDWA7A0QAvApAxAjQA7AoAtAYIAVAKIgUAMQgiAVglANQgqAPgiAAIgCAAgAjvidQApBBBFBYQBKBcAyAuQAYAYAfAXQARANANAIIAPAIIABAAIAFABIAIAAQAdACAogOQAWgIAXgMQgpgXgsgfQg3gogrgnQgsgohFhTQg9hLghg1g","fc":"#1D2226"},"324":{"t":[27.8,41],"p":"AgUBmQiGh1hWirQB0BvB6BLQA7AkAmAPIA4AiQA+AlAcAVQgFARhHAPIhHAMQgxgZhBg8g","fc":"#6B4F32"},"325":{"t":[27.7,37.8],"p":"ABbDYQhOgWiJi1QhGhZg2hWQAJgNAPgOQAegbAegDQCPDCCUB2QBLA8AvAVQgQAQgbANQglARgmAAQgUAAgUgEg","fc":"#9F815D"},"326":{"t":[10.8,4.8],"p":"AgeArQgUgBgRgGQgMgEgGgFQgJgGgFgJQgIgOADgVQAHAWAIAGQAKAKARACQATADAtgEQAugEAUgHQARgFAHgKQAIgKAAgWQAJAUgGASQgHAQgUALQgaAOgtAFIgbABIgIAAg","fc":"#1D2226"},"327":{"t":[10.5,3.9],"p":"AgdAiIglgEQgKgDgMgMQgLgLgEgMQgBgGAAgFIAMgBIAPARQAUAPAVAAQAuABAbgFQA0gJgEgiIAUASQABAEgEAHQgGALgTAMQgbATgyAAIgdgCg","fc":"#4F6877"},"328":{"t":[95.3,55.4],"p":"AgBBFQgIgDgEgVIgDgaIgBgTQgBgRgCgFQgCgGALgUIALgTIAEAAQAGgLAHAqQAHAngEAVQgIAugMAAIgBgBg","fc":"#C7CDCF"},"329":{"t":[87.5,59.5],"p":"AAhAqQgUgPgZgcQgLgMgTgPIgQgMQgHgRAnAGQAeAFAfANQASAIADARQAAAZAEAWQACAPgHAAQgHAAgPgMg","fc":"#C7CDCF"},"330":{"t":[57.5,43.5],"p":"AgCAcIgTgEQgHAAgNgFQgMgFgGgEQgEgCACgRIACgTQAAgFB0AgQAPABgbAOQgaAKgGAEQgCABgEAAIgJgBg","fc":"#C7CDCF"},"331":{"t":[45.7,39.9],"p":"AAFAqQgrgVgEgPQgDgKALgTIAQgXQAJgNAOAQQAOAOABANQABAHAHAQIAPAkQADAKgJAAQgJAAgXgLg","fc":"#C7CDCF"},"332":{"t":[72.1,52.8],"p":"ABDBBQgtgCgxgaQgngUgTgiIgKghQAFgRAjAEQAfAEAPAMIAlAcQAfAWAaAeQAcAggqAAIgEAAg","fc":"#C7CDCF"},"333":{"t":[52.4,66.3],"p":"AAfAhQgwgHgIABQgKACgMgKIgVgTQgKgIAXgMQASgJAQgDQAOgDATAGQAIABAXATQAZASAEAPQACAKgYAAIgTgBg","fc":"#9BA7AA"},"334":{"t":[42.8,57.5],"p":"AADAxQgJgHgTgWQgKgLAKgSQAFgKAGgHIAHgHQAIgVAFAAIAPAMQARANgNBIQgCAMgHAAQgFAAgIgGg","fc":"#9BA7AA"},"335":{"t":[56.5,59.1],"p":"ABYB0QgOgEhBgfQgqgWgdgqQgVgdAAgOQAAgJgUhAQABgNAZgDQAUgCASAFQALADAUAVQAXAaATANQAYAQAQAvQAPA4AKAWQALAZgPAAIgHgBg","fc":"#9BA7AA"},"336":{"t":[39.8,46],"p":"AAKA5QgWgDgXgaQgVgXgEgYQgCgNACgIQAGgPAfgBQAhgCAdAYQAcAWgGAYQgDAMgRAWQgJALgQAAIgGAAg","fc":"#9BA7AA"},"337":{"t":[22.8,32.9],"p":"AglEQQgHgCgIgFIihhoIgBghICzBpIAIADQAGABADgBQADgCAEgHQADgRAIgbIAPgrQAUguAYgkQAbgpAggeQAcgcAngdQAEgJAAgHIgDgHIgIgHIAAgBIgBAAIimiOQgGgFgHAAQgJAAgHAFIgGAFIgCACIAAABIjBEvQgDgSgEgQIAEgGIBqilIBEhuIABgBIABgCIACgDIAMgLQANgKARAAQAPAAAOAJIABAAIAAABICtCHIABABQAJAGAFAHQAIALACAMQADAMgEAMQgBAJgGALIgCAEIgEADQhDAxgyBKQgaAlgRAmQgKAWgGARQgIAYgEARIgBAEQgJATgOAIQgIAGgLABQgKAAgIgDg","fc":"#303233"},"338":{"t":[24.9,32],"p":"AgVAjQgKgFAQgaIAXghQAGgJAGACQAGABAAAGIgCASQgBAOgDADIgTAWQgBADgDADQgEADgFAAQgEAAgFgCg","fc":"#686C72"},"339":{"t":[24.3,37.9],"p":"AgVAuIgIgBQgDAAgDgCIgDgCIAHgMIAIgLQAGgJAFgDQAEgDAIgMQAIgNABAAIAYgWQABAAAAgBQABAAAAAAQABAAAAABQAAAAAAABIACAGQABADgBAIIgHARIgGAJIgGAIQgJAKgFAIQgDAFgCADIgDAEQgCADgIAEIgFABIgDAAg","fc":"#686C72"},"340":{"t":[32.6,23.8],"p":"AgpAzQAAgKADgMQAag6ADgBQACAAAPgUQAPgSACAEQADAEAJAFQAIAGgEARQgGAchEBCQgDADgCAAQgEAAABgOg","fc":"#686C72"},"341":{"t":[25.5,13.9],"p":"AgHAgQgHgEgFgIQgFgIAGgSQADgKAEgIQAEgJAFABQACAAAKAKQAFAEADAMQAEAJAAAHIgXAXIgGgBg","fc":"#C7CDCF"},"342":{"t":[20.4,21.7],"p":"AgaAwQgDgLAAgMQAAgJAVghQATgdAIgCQADgBABAJQACALADADQAFAFgHAOIgUAUIgOAUQgOAQgDAAIgBgBg","fc":"#C7CDCF"},"343":{"t":[12.6,30.9],"p":"AgdA4QgLgFAEgFIA5hgIARgIQAAAQgBARQgDASgIAMQgJASgLAKIgXAZIgMgCg","fc":"#C7CDCF"},"344":{"t":[11.7,50.3],"p":"ABNBIQgTgFgMgIQhlg7gvgbQAAgagCgVQAPAIANAJQAvAeCCBHQAHASgFAJQgCAEgHAAQgGAAgLgDg","fc":"#505459"},"345":{"t":[22.2,37],"p":"AhvCaQgvgigzgsIAAgBQAgAOAjAGQA/AJAwgZQApgXArhKQAZgtA8iKQAqARAKAMQAJAJAKAlQAEAQgWAoQgFADgBADQgNAUgfAdQgiAegMAQQgaAkgfBIQgBAEAAAEQgiAqgKAJQgEAEgHAAQgaAAhDgwg","fc":"#686C72"},"346":{"t":[12.5,26],"p":"Ah1CGIDQkzIAOgDQAMgBABANQgcAjgOAtQg2BVhJBzIgJAHQgMAJgPARIgZAcQgBgSgEgZg","fc":"#C7CDCF"},"347":{"t":[21.6,32],"p":"AgtD5IichgQAAg4gMgwIC2keQAKgPARgDQAPgDAOAJICqCLQAOAKAEARQADAQgKAPIjDEiQgKAOgPAEIgIABQgMAAgLgIg","fc":"#9BA7AA"},"348":{"t":[70.3,1.5],"p":"AAMAMIgygGQgLAAgLgGIgJgIICBgFQAIAGABAHQACALgJACQgDABgJAAQgNAAgZgCg","fc":"#C7CDCF"},"349":{"t":[66.8,15.9],"p":"Ag4APIgVgHIARgMQAVgPAVAAQAZAAAfACQAhADAGACQAFADgVAJQgTALgIACIgnAFIgSACQgRAAgQgFg","fc":"#686C72"},"350":{"t":[54.8,14.1],"p":"AggAPQgTgHgMgMIgHgMIAsAAQArAAAHgCQAHgCAOABQANAAAJACQAIACgIALQgIAJgLAFQgNAHgVACIgOABQgRAAgPgFg","fc":"#686C72"},"351":{"t":[73.4,3.6],"p":"AAUgQQgKgFhZgOICfAAQABAVgCAaIgBAYQgmgngUgNg","fc":"#C7CDCF"},"352":{"t":[61.6,14.1],"p":"Ai9CMQgTgDgLgNQgJgKgDgRQgCgLABgLIgFjXIAfAAIAAACIATDUIAAABIABAOQABABAAABQAAACABAAQAAABAAAAQAAAAAAgBIACAAIAKAAQAogMAsgJQArgJAtgFQAvgEAoABQATAAAaACIAsAHQAGgBAFgEQAFgFABgGIAOi8IAfAAIgCDAQgCAZgSAQQgSASgZAAIgCAAIgNgDIhHgDQglABgvAGIhRAMQg6AKgaAGIgCABIAAAAIgMAAIgNgBg","fc":"#303233"},"353":{"t":[43.2,12.9],"p":"AgIBzQgFgSgIheIgHhYIgBgrIAgAAIAbDxQAAAHgRAHQgFACgEAAQgJAAgDgOg","fc":"#505459"},"354":{"t":[61.8,12.9],"p":"AjCB0QgTgWgChVQgChFAKhDIAKAAQArCWC7AUQBfALBWgVQAEAKgCAMQgEAYgZAIQgzAQiOARQhNAIgtAAQg4AAgKgMg","fc":"#686C72"},"355":{"t":[61.7,12.6],"p":"AjGBwQgMgLAAgSIgLjPIG7AAIgICyQAAARgLAMQgNANgRAAIlVAdQgRAAgNgNg","fc":"#9BA7AA"},"356":{"t":[62.2,57.9],"p":"AjPG6Qg7gKgwggQgugggeg0QgbgsgNg8QgLg0gCg4QgChwAfhiQAjhsBDhQQBMhZBjglQAzgTA4gEQA0gEA1AMQBqAWBVBKQBQBGAvBkQAuBiAFBqQACBlgUBtQgMA+gQApQgMAfgQATQgMAPgPAFQgLAEgJAAIgKgBIgJgDIANgjIAEABIADABIAFgBQAHgCAHgIQALgMAMgbQAQgnANg6QAJgxAFg0QAGg7gCgqQgBgtgQgzQgNgogYg0QgqhZhMhAQgkgegrgSQgjgPg2gMQgdgHg1ACQhCACgoAQQhxAsgzBAQhBBPgbBXQgaBbADBpQAFB0AqBHQAZApAlAaQAnAZAvAHQAMACAQAAIgCgFIgVgvQgMgdgHgVQgKgggCgZQgCgRADgQQADgTALgPQAJgQASgKQAOgIASgEQAPgDAQAAQAPgBAOABQAiAEAbAOQAcARAQAbQAPAWAKAfQAGAQAIAkIACAJIADAAICZgNIAFgBIACAAIABgBQADgCADgMQACgKACglQADgrACgMQAGgWAIgKQAIgLAKgEQAKgEALAAIADAAIALAEIAHAFQAIAFAGAHQANAQgFASIgGACIgNgHIgZgJIgBAAQgCAAgCACQgEAFgBALQgCALgBAlQAAAjgDAVQgEAVgKAMQgIALgLAEIgIADIgLACQglAHhDAGIhCAFIgEABIgDAAIgJgCQgHgDgFgFIgGgHIgIgSIgEgOQgFgfgGgRQgKgZgKgPQgWgigsgEQgagBgSADQgTAFgIAKQgHALACAVQABATAJAaQAGATALAbIAVAwIAJAdIACALQAAALgDAIQgEAJgIAEIgIAEIgFABIgBAAIgDABIgBAAIgFAAIgRABQgUAAgUgDg","fc":"#303233"},"357":{"t":[72.7,37.3],"p":"ACQCTQhvg1hDgaQihg9gGgEQg+gfATgxQAWg6BegSQBfgSBjAnQBiAlA0BWQAxBPgYA9QgLAcghAAQgWAAgfgMg","fc":"#C7CDCF"},"358":{"t":[65.3,52.7],"p":"AFKDuQgRgxgbgOQgbgNgVAgQgYAjgFBOQggAMg/ADIhMAAQABiYiiiIQhdhMi0hbQAzhqBfg/QBhhBB0gBQCogBCDCAQCFCDABCvQAHBIgXBoQgHAegcBiQADhMgSg3g","fc":"#9BA7AA"},"359":{"t":[61.5,57],"p":"AiSGiQi5gHg3iWQgTg2gEhNQgBgQAAhlQAAixB3h/QB3h+CpAAQCmAAB3B+QB3B/AACxQAMCbgDBJQgGB9hLAtQgIAFAIgnQAMg/ADgbQANiJhZAAQgNAAgBAdQABApgDAXQgKBdhggDQhCgBgigdQgWgTgQgrQgQgwgMgNQgXgcgxAAQhgAAAZCGIAWBbQAJApgNAAIgBAAg","fc":"#686C72"},"360":{"t":[92.8,24.5],"p":"AgOgKQACgGAGgHQAGgHAAADQAEADAFAPQAHAPgBAKQAAAJgPADIgNABg","fc":"#686C72"},"361":{"t":[98.6,36.3],"p":"AASBAIgegrQgGgJgMgfIgLggQgGgNAGgMQAGgMAIAIQAEAEASAeQASAiARAUQASAXgEASIgFAeQAAAFgCAAQgEAAgPgUg","fc":"#686C72"},"362":{"t":[106.6,27.1],"p":"AgEAmQgjg2AAgXQAAg9ANALQAGAEAaA6IAdA7QAFAGAAAdQAAAJgGAJIgGAHQgRgagPgcg","fc":"#C7CDCF"},"363":{"t":[108.5,24.8],"p":"AAKCTQABgrgBgPQgDgggvh8QgYg/gYg4QCmEgAKARQAHAKgrAeIgrAcg","fc":"#C7CDCF"},"364":{"t":[97.6,28.6],"p":"AAQEDQgQgDgMgLIgHgHIgCgCIAAAAIAAAAIgCgCIAAgBIgBgBIgSgaIhgiNIg5hXIAAgBIgEgFIgDgIQgEgIAAgIQgCgRAHgPQAEgIAFgGIAGgGIACgCIABgBIACgBICaiLIACgBIAAAAQATgOAWAEQAXAEANATIABABIAAAAICbEOQAAAygCAyIiKBuIgEADQgGAEgJADQgKAEgLAAIgMgBgAgFjfIiWCWIgBABIAAAAIgBACIgCAEQgCAFABAEIABAEIABACIADADIA9BVQApA8A0BSIAQAbIAAABIACACQAIAIAJgEIAFgBIABgBICWhrIABgBIAEgFQAGgNgIgLIgBgBIAAgBQglhFgshMIgphKIgqhHQgHgIgKgBIgDAAQgIAAgFAEg","fc":"#303233"},"365":{"t":[90.3,14.6],"p":"AhkBGIBVhZIAkgjQAogkALgDQALgDAKAIQAFAEADAEIjBCvg","fc":"#505459"},"366":{"t":[94.1,28.3],"p":"AA1DrQgggXhTh5Qhbh+AHgeQAIggBKg/QBDg7AugUQiZCMBtCcQA4BPBWAzQgPASgTAPQgbAUgSAAQgJAAgGgFg","fc":"#686C72"},"367":{"t":[99.1,27.9],"p":"AAODwQgPgDgKgNIitkAQgKgNACgRQADgQANgKICYiQQAOgKAOADQARACAKAOICiEcIgBA8IgDADIiRBtQgLAIgNAAIgGgBg","fc":"#9BA7AA"},"368":{"t":[18.8,46.9],"p":"AgPBiIgHgpQgGglABgEIABguIAAhAQAAgQANAZQAMAZAEAYIAJAoQAFAUAGALQAIAQgFAIQgLAJgHAJQgJAQgIAFIgEADQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBg","fc":"#384C56"},"369":{"t":[36.3,32.9],"p":"AA/C1IhRgTQgEgBgYh8QgZh7gFgFQgOgLgWgpQgYgsAYAIIBuB+QBvCGAOA1QAMAvg6AAIgOAAg","fc":"#A1C7E2"},"370":{"t":[50.1,21.8],"p":"ABQCdQgFgIgohgQgjhXgSgXQgPgUgggeQgcgagEgJQgHgNAWgHQAVgHAQAFQAVAHAYANQAnAXASAbQATAbAKA6QAHAhAFA9QADAugEAWQgDAOgFAAQgEAAgFgKg","fc":"#A1C7E2"},"371":{"t":[50.4,57.7],"p":"AgRALQgLgBgEgFIgFgHQgCgDAkgDIAigEQAIAAgBAFQgBAEgGAHQgGAJgWAAIgUgCg","fc":"#A1C7E2"},"372":{"t":[49.9,70.3],"p":"AgxAVQgNgDALgOQAJgIALgHQAMgHATgDQAPgCAQADQAJABADACQAEADAJAOQAIAOgzAGQgXADgRAAQgOAAgIgCg","fc":"#A1C7E2"},"373":{"t":[28.5,61.7],"p":"AgbASQgMgLgIgKIgFgKQgEgLAVAAQATgBAIAFIAXAHQAVAGANAJQAPANgnAIQgPACgKAAQgSAAgJgHg","fc":"#A1C7E2"},"374":{"t":[16.5,33.5],"p":"AAzCnQgegFgPgSQgPgUgahQQgYhKgEgkQgCgVgMhJQABgmA/B9QAfBDAKAVQAbA8ADAeQADAdAJAUIAIAPIgGABQgKAAgLgDg","fc":"#4F6877"},"375":{"t":[39,66.4],"p":"AAIgkQABABAQAFQAOADgFABQgIABg9A+g","fc":"#384C56"},"376":{"t":[58.5,65.2],"p":"AgBgCIgcgfIAFgEQAHgEAGgIQAAAFATASIAUAUQAFAMgJAsQABgTgaghg","fc":"#4F6877"},"377":{"t":[35.3,68.2],"p":"AgXA4IhAg1IAdAHQAhAEAVgWIAcgjQAIgKADgGIABgDIA0ASQggAHgdA/QgEAIADAPIAEAOg","fc":"#4F6877"},"378":{"t":[34.9,43.4],"p":"AA2GoQhFgOhOgcQgqgQgegOQgtgWgagTQgigbgXggQgXgigNgpQgKgjgEgsQgDgdgBgwQAAhhAIg3QAMhXAhg/QAVgnAagaQAagcAmgVQBBghBYgEQBYgDBAAUQAnAMAiAVQAjAWAaAdQAxA4AWBVQATBFAABWIAAAAQACBiAAAzQAAAygFAeQgGAogTAmQgOAdgdAnIgXAgQgPASgQAMQgTAPgVAHQgVAIgYABIgHAAQgeAAgtgJgAgdmUQhRAEg6AgQhAAkggBCQgdA5gJBSQgHA7AEBYQADBcARAzQAVBBA7AsQAWARAnARQAgAPAkAMQBJAaBDANQAsAIAagBQAQgBANgEQANgFAMgJQARgNAdgmQAbgiANgZQARggAHggQAFgdABgrIACiVQAChSgPhAQgShPgrgyQgug4hIgWQg3gQg8AAIgcAAg","fc":"#1D2226"},"379":{"t":[28.8,64],"p":"ABhC2Qh1gQhUgtQhsg4gahFQgMgigIg5QgJg6ACgkQAoAJAYAVQAMALAEAJQgCASACAZQADAzARAiQAKARAjAfQAqAlA1AdQCRBQCSgbIglAaQgHAEgKACQgJACgQAAQggAAg6gIg","fc":"#384C56"},"380":{"t":[34,48.1],"p":"AACFZQiLgdhKhDQh6huATjzQAHhYAXhQQAVhHARgNQAOCFAEAVQAOBVAcA0QBICEDVgNIAlgCIAdgCQAMgCA1gbQAygXAFAAQAWABAFAMQAFANgLAQQgeApg9gHQgMgBg+AGQhJAIgoABQhRABgdADQgzAGgCAPQgGAfAyAtQAwAsAuAOIA8AYQA7ASA6gMQBOgQAKg6QAEgTgEgZIgGggQARgBAVAWQAKALAIAMQgIAcgSAjQgmBGg3AiQggATg5AAQguAAg+gMg","fc":"#4F6877"},"381":{"t":[61.5,38.5],"p":"Ag4CwQgDgBAggrIAegqIADgsQACg3gFhNQgDhNgOg/QgHgggGgQQATAcASAnQAoBNAAA1QACB9AGCJQAAASgLAmIgMAig","fc":"#4F6877"},"382":{"t":[34.3,43],"p":"AggGBQhNgfhAg4QiWiFACi7QABi6BNhkQBShpChgCQCggBBSBrQBNBjADC8QAFDegqBkQgxB0h/AAQhEAAhJgfg","fc":"#91B1CE"},"383":{"t":[4.9,5],"p":"AgvAXIAAgHIAAgEIACgIIAGgIQAGgJAGgFQAJgIARgIQAUgKAegEQgeAOgSAPQgLAKgIAJIgHAMIgVAlg","fc":"#1D2226"},"384":{"t":[4.7,4.7],"p":"AgRAdQgLgDAAgOQAAgNALgMQAIgLAKgDQANgDAHACQAIAEAAAOQAAANgHALQgGALgMACQgIADgGAAIgHgBg","fc":"#FFFFFF"},"385":{"t":[4.5,4.9],"p":"AgpAnQgCgBADgLIAFgSQANgTAWgQQAYgQARAAQACAKAAAOQgBAYgMAPQgMANgXAGQgLADgJAAQgKAAgGgEg","fc":"#384C56"},"386":{"t":[7.3,5],"p":"AAnAMQgFgHgGgFQgJgHgTgLQgegRgqgNQAvAGAdAIQAYAIAOAIQAOAJAFAFIAIAJIADAHIABAEIgCAhg","fc":"#1D2226"},"387":{"t":[7.8,4.7],"p":"AgGAbQgQgDgKgKQgLgLAAgOQAAgXAqAHQAPADAOALQAQAMAAANQAAARgbAAQgLAAgMgCg","fc":"#FFFFFF"},"388":{"t":[8,4.9],"p":"AAJAoQgkgGgQgNQgTgPgBgYQgBgOADgKQAaAAAjAQQAiAQAUAUIAIARQAFALgEACQgKADgOAAQgNAAgRgDg","fc":"#384C56"},"389":{"t":[41.3,51.6],"p":"AgZAIQgQgBgHgCQAVgIAbgDQAdgDAUAGQgUAHgdADIgOABIgLAAg","fc":"#384C56"},"390":{"t":[41.3,51.6],"p":"AgaAIQgOgBgJgCIgBAAQALgFAOgBQAMgDANgCIAAAAIAYAAQAOAAANADIgCABQgPADgUADIgOACIgVACIgFAAg","fc":"#384C56"},"391":{"t":[41.4,51.6],"p":"Ag0AFQALgFAPgBQAMgDAOgCIAZAAQAPAAANADQgRADgXADIgkAEIgIAAQgKAAgLgCg","fc":"#384C56"},"392":{"t":[41.3,51.6],"p":"Ag0AGQAPgGAIAAQAPgEAOgBQAigCAKACIAFABQABAAABABQAAAAABAAQAAAAAAABQABAAgBAAIgtAFIgfAEIgOAAQgIAAgGgBg","fc":"#384C56"},"393":{"t":[41.3,51.6],"p":"Ag0AHIAUgHQAQgEAQgBQAhgDAUAGQgLACgQABIgYABIgdAEIgTABIgGAAg","fc":"#384C56"},"394":{"t":[41.2,51.6],"p":"AgzAGIAUgGQAPgEAQgBIAAAAQAfgDAVAFIgCABIgXADIgYACIgDABIgZACIgEABIgMAAIgKgBg","fc":"#384C56"},"395":{"t":[41.2,51.6],"p":"AgxAGIATgGQAPgEAPgBIAAAAQAegDAUAFIAAABIgWAEIgYACIgEABIgXACIgEAAIgHAAQgLAAgEgBg","fc":"#384C56"},"396":{"t":[41.3,51.6],"p":"AgwAGIATgGQAOgEAPgBIAAAAQAdgDATAFIABABIgVAEIgXADIgFABIgWABIgEABQgQgBgGgBg","fc":"#384C56"},"397":{"t":[41.2,51.6],"p":"AgsAFIASgFQANgEANgBQAYgCAUAFQAAABgNABQgLACgKAAIgcAEIgOABQgIAAgEgCg","fc":"#384C56"},"398":{"t":[41,51.7],"p":"AgiADIAPgEIASgEIARAAQAKAAAKAEQgGACgLABIgcAEIgMAAQgJAAgEgDg","fc":"#384C56"},"399":{"t":[41.1,51.7],"p":"AgmAEIARgFIAUgEIABAAIASgBQALABAKADQgHADgMABIgUADIgKABIgJABIgBAAQgMAAgGgDg","fc":"#384C56"},"400":{"t":[41.2,51.7],"p":"AgpAEQAHgEAKgBQALgDALgBIACgBIAUAAQAMAAAKAEQgIADgMACIgWADIgLABIgKAAQgOAAgGgDg","fc":"#384C56"},"401":{"t":[41.2,51.6],"p":"AgsAFQAIgEAKgBQALgEAMgBIADgBQAMgBAJABQAOAAAKAEQgJADgMACIgYAEIgLAAIgMABQgPgBgGgCg","fc":"#384C56"},"402":{"t":[41.1,51.5],"p":"AgoAFIgBAAQARgHAXgCIABAAQAYgDARAGIABABQgOAEgcABIAAAAIgVABIgTgBg","fc":"#384C56"},"403":{"t":[41,51.5],"p":"AgiAFQAOgHATgCQAUgCARAGQgFACgfAAQgWADgJAAIgDAAg","fc":"#384C56"},"404":{"t":[41,51.5],"p":"AglAFQAQgHAUgCIABAAQAVgCARAGIgBAAQgKADgbAAIAAAAIgTACIgLAAIgHAAg","fc":"#384C56"},"405":{"t":[41.1,51.5],"p":"AgnAFQAQgHAWgCIABAAQAXgCARAFIgBABQgLADgcABIAAAAIgUACIgHAAIgMgBg","fc":"#384C56"},"406":{"t":[41.1,51.5],"p":"AgpAFQARgHAXgCIABAAQAYgDARAGIABABQgOAEgcABIAAAAIgVABIgUgBg","fc":"#384C56"},"407":{"t":[41.2,51.6],"p":"AgWAHQgPgBgGgBQARgHAZgDIABAAQAZgDASAGIABABQgQAFgbACIgBAAIgTABIgDAAg","fc":"#384C56"},"408":{"t":[41.3,51.6],"p":"AgXAHQgQAAgGgCQASgIAZgCIACAAQAagDATAFIABABQgRAGgcACIgBAAIgQABIgHAAg","fc":"#384C56"},"409":{"t":[41.8,53.7],"p":"AgXAAIAXgBQAMAAAMgDQgJAIgPABIgCAAQgLAAgKgFg","fc":"#384C56"},"410":{"t":[41.7,55.4],"p":"AgUAAIAUgBQALAAALgDQgIAIgOABIgCAAQgKAAgIgFg","fc":"#384C56"},"411":{"t":[41.7,57.2],"p":"AgSAAIATgBQAJAAAJgDQgHAIgMABIgCAAQgJAAgHgFg","fc":"#384C56"},"412":{"t":[41.7,56.6],"p":"AgTAAIAUAAQAKgBAJgCQgGAGgNABIgCAAQgKAAgIgEg","fc":"#384C56"},"413":{"t":[41.7,56.1],"p":"AgUAAIAVAAQAKgBAKgCQgGAGgOAAIgCABQgKAAgJgEg","fc":"#384C56"},"414":{"t":[41.7,55.5],"p":"AgVAAIAWAAQAKgBALgCQgHAGgOABIgCAAQgLAAgJgEg","fc":"#384C56"},"415":{"t":[41.7,54.9],"p":"AgVAAIAVAAQAMgBAKgCQgHAGgOABIgCAAQgLAAgJgEg","fc":"#384C56"},"416":{"t":[41.7,54.3],"p":"AgWAAIAWAAQAMgBALgDQgIAIgOABIgDAAQgLAAgJgFg","fc":"#384C56"},"417":{"t":[41.2,56.5],"p":"AgSAAIATAAQAJAAAJgCQgGAFgMAAIgBAAQgJAAgJgDg","fc":"#384C56"},"418":{"t":[40.7,57],"p":"AgPAAIAQAAQAHAAAIgCQgFAFgKAAQgJAAgHgDg","fc":"#384C56"},"419":{"t":[41,56.2],"p":"AgRAAIASAAQAIAAAJgCQgGAFgLAAIgBAAQgJAAgIgDg","fc":"#384C56"},"420":{"t":[41.2,55.3],"p":"AgTAAIAUAAQAJgBAKgCQgHAGgMABIgBAAQgKAAgJgEg","fc":"#384C56"},"421":{"t":[41.5,54.5],"p":"AgVAAIAVgBQALAAALgDQgIAIgNAAIgCABQgLAAgJgFg","fc":"#384C56"},"422":{"t":[40.9,56.4],"p":"AgQAAIARAAQAIAAAIgCQgFAFgLAAIgBAAQgIAAgIgDg","fc":"#384C56"},"423":{"t":[41.1,55.9],"p":"AgSAAIATAAQAJgBAIgCQgGAGgLAAIgBABQgJAAgJgEg","fc":"#384C56"},"424":{"t":[41.4,54.8],"p":"AgUAAIAUAAQALgBAKgCQgHAHgNAAIgCAAQgKAAgJgEg","fc":"#384C56"},"425":{"t":[41.6,54.3],"p":"AgVAAIAVgBQALAAALgDQgHAIgOABIgCAAQgLAAgJgFg","fc":"#384C56"},"426":{"t":[41.4,52.7],"p":"AghAFIgMgHQAQgFBLgFIgKAMQgNAJgWADIgHABQgPAAgMgIg","fc":"#6D9BBB"},"427":{"t":[41.4,53.4],"p":"AgeAOQgNgHgFgRQAkAqA9g0QgCAPgOAMQgMALgUADIgGAAQgOAAgLgHg","fc":"#6D9BBB"},"428":{"t":[41.3,54.1],"p":"AgbAXQgVgLgEgeQA2BaAzhlQAAAZgWATQgMAMgSACIgFABQgNAAgKgHg","fc":"#6D9BBB"},"429":{"t":[41.3,54],"p":"AgbAWIgBgBQgXgKgBgaIAAgBQAWAoAhgDQAigEAPgrIAAgBQAGAWgYASIgDADQgLAJgSACIgBAAIgGABQgMAAgKgGg","fc":"#6D9BBB"},"430":{"t":[41.4,53.8],"p":"AgeAUQgZgJACgZQARAlAogFQApgEAGgmQAMAUgeASQgMAJgUACIgGAAQgNAAgMgFg","fc":"#6D9BBB"},"431":{"t":[41.3,53.5],"p":"AgaARQgLgDgGgGQgGgIgBgKIAAgBQAQAaAmgEQAigEAMgYIAAgEQADAIgDAHQgFAJgPAJQgJAHgNABIgHABIgFABQgMAAgKgFg","fc":"#6D9BBB"},"432":{"t":[41.3,53.3],"p":"AgYAPQgJgDgGgGQgGgGgDgIIAAgBQAOAQAmgEQAcgDAQgPQAAAFgCAGQgGAHgNAHQgJAGgMABIgGABIgFAAQgKAAgJgDgAAwgRIABABIgBABIAAgCg","fc":"#6D9BBB"},"433":{"t":[41.3,53],"p":"AgWAMQgIgCgGgEQgGgGgEgFIAAgBQAMAGAmgCQAWgCAUgJQgCAFgDAGQgGAFgMAGQgJAEgKABIgEABIgGAAQgIAAgIgDgAAugNIAAAAIAAAAIAAAAgAAvgOIgBABIABgBg","fc":"#6D9BBB"},"434":{"t":[41.2,54],"p":"AgbAWIgEgCQgUgLAHgbIAAgBQACAVAPALQAMAJAPgBQASgCALgLQAOgLAAgXQAMAYgYAPIgJAGQgJAGgNABIAAAAIgHABQgKAAgKgFg","fc":"#6D9BBB"},"435":{"t":[41,54.3],"p":"AgcAXQgTgMAMgiQgEAXALAMQAKAMARgBQAQgBALgNQAMgMgCgYQAOAfgeAPQgJAIgNABIgGAAQgLAAgJgFg","fc":"#6D9BBB"},"436":{"t":[41.1,53.9],"p":"AgZATQgLgFgCgOQgBgHACgLQgCARAOAHQAKAJAPgBQAOgBALgKQALgHADgPQABAGgBAFQgBAPgUAJQgGAFgJACIgFAAIgFABQgKAAgIgFgAAmgXIABAEIAAAAIgBgEg","fc":"#6D9BBB"},"437":{"t":[41.2,53.5],"p":"AgWAQQgLgEgDgKQgDgGgBgJQACAKAQAEQAJAFANAAQANgBALgFQAKgGAGgJIgCAJQgEANgSAHQgGADgHACIgFAAIgEAAQgJAAgHgDgAAogSIABABIgBACIAAgDg","fc":"#6D9BBB"},"438":{"t":[41.3,53.1],"p":"AgUANQgJgCgGgIIgHgLQAEAEASACQAKACALgBQALgBALgEQAKgDAJgFIgFALQgHAJgQAFQgGADgGABIgDAAIgEABQgIAAgHgDgAAqgOIABgBIgBABIAAAAg","fc":"#6D9BBB"},"439":{"t":[41.2,53.5],"p":"AgWAQQgLgEgDgKQgDgGgBgJIAAAAQACAKAQAEQAJAFANAAQANgBALgFQAKgGAGgJIgCAJQgEANgSAHQgGADgHACIgFAAIgEAAQgJAAgHgDgAAogSIABABIgBACIAAgDg","fc":"#6D9BBB"},"440":{"t":[41,54],"p":"AgaAVQgLgHgBgOQgBgIADgMQgDATANAJQAKAKAQgBQAOgBALgLQALgIACgRIgBgEQADAIAAAHQgBARgVAJQgGAFgIACIgGABIgFAAQgLAAgIgEg","fc":"#6D9BBB"},"441":{"t":[41.1,53.8],"p":"AgYASQgLgFgCgMQgCgHABgLQgBAPAPAGQAKAIAOgBQAOgBALgJQAKgGAEgMIAAAKQgCAOgUAJQgGAEgIABIgFABIgEAAQgKAAgIgEgAAmgVIABADIAAABIgBgEg","fc":"#6D9BBB"},"442":{"t":[41.3,53.3],"p":"AgUAOQgKgDgFgJQgEgEgCgIQADAGASADQAJABALAAQANAAALgEQAJgEAIgGIgDAKQgHAKgRAGQgFADgHABIgDAAIgFABQgIAAgGgDgAApgQIABAAIgBACIAAgCg","fc":"#6D9BBB"},"443":{"t":[41.3,53],"p":"AgTANQgJgDgGgGIgJgKQAFACATAAQAKABAKAAQALgBALgDIAVgHIgCACIgFAKQgIAIgQAFQgFACgGABIgDAAIgEABQgHAAgHgCg","fc":"#6D9BBB"},"444":{"t":[41.8,51.2],"p":"AhUAJIgCgJICfgNIAOAJQgjAJgrAGQgRADgUAAQgaAAgegFg","fc":"#FFFDFC"},"445":{"t":[41.5,54.3],"p":"AgyAMQgUgMgNgLQBdAkBKgyQgNASgVAIQgVAXgaACQglgCgQgMg","fc":"#FFFDFC"},"446":{"t":[41.5,53.3],"p":"AhSgIIClgNQgdAogyAAQgMADgLAAQgpAAgWgeg","fc":"#6B1100"},"447":{"t":[75.8,99.2],"p":"AhPAFQANgIAKgEQAWgMAdgDQAagDAbAGQAcAFAVAOQgkgDgPAAQgUgBgbADQgcACgVAFIgYAIQgOAFgIAFQADgIAOgLg","fc":"#1D2226"},"448":{"t":[76,99.2],"p":"AhSAEQANgHALgFQAXgLAegDQAbgDAcAGQAdAFAWAOIg1gDQgVgBgcADQgdACgVAFIgZAHQgPAFgJAGQAEgIAOgMg","fc":"#1D2226"},"449":{"t":[76.1,99.1],"p":"AhVAEQAOgHALgFQAYgLAfgDQAcgDAcAGQAfAGAWANIg2gCQgWgBgdACQgeACgWAFIgaAHQgQAFgIAGQADgIAPgMg","fc":"#1D2226"},"450":{"t":[76.1,99.1],"p":"AhQAEQANgHAKgFQAXgLAegDQAagDAbAGQAdAFAVAOIg0gDQgUgBgcADQgcABgVAGIgZAHQgOAGgJAFQAEgIAOgMg","fc":"#1D2226"},"451":{"t":[76,99],"p":"AhLAFQAMgIAJgFQAWgLAcgDQAYgDAbAFQAaAGAVAOIgygDQgSgBgbADQgaABgVAGIgXAIQgNAFgJAFQAEgIAOgLg","fc":"#1D2226"},"452":{"t":[76.1,99],"p":"AhMAEQANgHAJgFQAWgLAcgDQAYgDAaAFQAcAGATAOIgxgDQgSgBgbADQgaABgUAGIgYAHQgOAGgHAFQADgIANgMg","fc":"#1D2226"},"453":{"t":[76.1,99],"p":"AhMAEQAMgHAKgFQAWgLAcgDQAYgDAbAGQAbAGAUANIgxgDQgUgBgaADQgbABgUAGIgXAHQgNAGgJAFQADgIAOgMg","fc":"#1D2226"},"454":{"t":[76.1,99],"p":"AhMAEIAWgMQAWgKAcgDQAYgEAaAGQAbAGAVANQgjgCgPAAQgTgBgaADQgaABgVAFIgXAHQgOAFgIAGQAEgIANgMg","fc":"#1D2226"},"455":{"t":[76.2,99],"p":"AhNAEQANgHAKgFQAWgKAcgDQAYgEAaAHQAbAGAVANQgjgCgPgBQgTgBgaADQgbABgUAFIgXAHQgOAFgIAGQADgIANgMg","fc":"#1D2226"},"456":{"t":[76.1,99.3],"p":"AhSAFQAOgIAKgFQAYgLAegDQAagEAbAGQAdAGAWAOQglgDgQAAQgUgBgdADQgcABgVAGIgZAIQgPAFgIAFQADgIAOgLg","fc":"#1D2226"},"457":{"t":[76,99.5],"p":"AhWAFQAOgHAKgFQAZgMAggEQAbgEAeAGQAfAFAXAOQgngDgRAAQgWAAgeADQgeACgXAGIgaAIQgPAGgJAFQAEgIAPgMg","fc":"#1D2226"},"458":{"t":[75.7,99.4],"p":"AhJAFQAMgIAKgEQAUgLAbgEQAXgDAYAGQAbAFATAOQghgDgOAAQgSgBgaADQgYACgUAFIgVAIQgOAFgHAFQADgIAMgLg","fc":"#1D2226"},"459":{"t":[75.3,99.3],"p":"Ag6AEQAJgHAIgFQARgKAVgDQASgDAUAGQAVAGAQAOQgbgDgLAAQgPgCgUADQgUABgQAFIgRAHQgLAFgGAFQADgIAKgLg","fc":"#1D2226"},"460":{"t":[75.5,99.2],"p":"Ag/AEQALgHAIgFQASgKAXgDQATgDAWAGQAWAGARAOQgcgDgNAAQgPgCgWADQgVABgRAFIgTAHQgMAFgGAFQADgIAKgLg","fc":"#1D2226"},"461":{"t":[75.8,99.1],"p":"AhDAEQALgHAIgFQAUgKAYgDQAWgDAWAGQAZAGARAOQgegDgNAAQgRgCgXADQgXABgSAFIgUAHQgNAFgGAFQACgIAMgLg","fc":"#1D2226"},"462":{"t":[76,99],"p":"AhIAEQAMgHAJgFQAVgKAagDQAXgDAYAGQAaAGATAOQghgDgOAAQgSgCgYADQgZABgTAFIgVAHQgOAFgHAFQADgIAMgLg","fc":"#1D2226"},"463":{"t":[76.3,98.9],"p":"AhMAEQAMgHAKgFQAWgKAcgDQAYgDAZAGQAcAGAUAOQgigDgPAAQgTgCgaADQgbABgTAFIgYAHQgNAFgIAFQADgIANgLg","fc":"#1D2226"},"464":{"t":[76.1,99],"p":"AhIAEQAMgHAJgFQAVgKAagDQAXgDAYAGQAbAGATAOQghgDgOAAQgSgCgZADQgZABgTAFIgWAHQgNAFgIAFQADgIANgLg","fc":"#1D2226"},"465":{"t":[75.9,99],"p":"AhFAEQAMgHAIgFQAUgKAZgDQAWgDAXAHQAZAGASANIgsgDQgSgBgXACQgYABgSAFIgVAHQgNAFgGAFQACgIAMgLg","fc":"#1D2226"},"466":{"t":[75.7,99.1],"p":"AhBADQALgHAIgEQATgKAYgDQAUgDAWAGQAYAGARAOQgdgDgNAAQgQgCgXADQgWABgRAFIgUAHQgMAFgHAFQADgIALgMg","fc":"#1D2226"},"467":{"t":[75.6,99.2],"p":"Ag+ADQALgHAHgEQASgKAXgDQATgDAVAHQAWAGAQANIgngDQgQgBgVACQgVABgQAFIgTAHQgMAFgFAFQACgIAKgMg","fc":"#1D2226"},"468":{"t":[75.4,99.2],"p":"Ag6ADQAKgHAHgEQARgKAVgDQASgDAUAHQAUAGAQANIglgDQgPgBgTACQgVABgPAFIgSAHQgKAFgGAFQADgIAJgMg","fc":"#1D2226"},"469":{"t":[75.5,99.2],"p":"Ag9AEQALgHAHgFQASgKAWgDQATgDAUAHQAXAGAQANIgngDQgQgBgUACQgWABgQAFIgTAHQgLAFgGAFQADgIAKgLg","fc":"#1D2226"},"470":{"t":[75.6,99.2],"p":"AhAADQALgHAIgEQASgKAYgDQAUgDAWAGQAXAGARANIgqgDQgQgBgWADQgWABgRAFIgUAHQgMAFgGAFQADgIALgMg","fc":"#1D2226"},"471":{"t":[75.8,99.1],"p":"AhEAEQAMgHAIgEQAUgLAYgDQAWgDAWAGQAZAGASANQgfgCgNAAQgRgBgXACQgYABgRAFIgVAHQgMAFgHAFQADgHALgMg","fc":"#1D2226"},"472":{"t":[75.9,99.1],"p":"AhHAEQAMgHAJgFQAUgLAagDQAXgCAXAGQAaAGATANQgggCgOgBQgSgBgYACQgZABgSAGIgWAHQgNAFgHAFQADgIAMgLg","fc":"#1D2226"},"473":{"t":[76,99.1],"p":"AhKAEQAMgHAJgEQAWgLAbgDQAYgDAYAGQAaAGAVANQgigCgOgBQgTgBgaADQgZABgUAFIgVAHQgOAFgIAFQADgHANgMg","fc":"#1D2226"},"474":{"t":[76.1,99.1],"p":"AhNAEQANgHAJgEQAXgMAcgDQAZgCAaAFQAbAHAUANQgigDgPAAQgTgBgcACQgaACgVAFIgXAHQgOAFgIAFQADgHAOgMg","fc":"#1D2226"},"475":{"t":[16.3,112.6],"p":"AgRAMQgGgGAKgHQAFgFAHgFIACgCQAHgGAHAEQAGAEgBAHQAAAEgGAFIgKAIQgEAEgEAAQgGAAgHgFg","fc":"#9BA7AA"},"476":{"t":[17.4,119.3],"p":"AgdAVQACgGAFgIIAWglIANABQAIABAHAHQAHAHgEADIgOAGQgGADgLAMQgOAOgKAFIgFACQgEAAAEgKg","fc":"#686C72"},"477":{"t":[23.7,106.4],"p":"AgDAwQgCgJAAgsIAAgsQABgDAEAUQAFAUABAKQABAJgFAZQgCASgBAAIgCgCg","fc":"#FFFAEE"},"478":{"t":[8.6,96.1],"p":"AAJAkQgEgGgIghIgJghQAAgGAFAEQAGAEACAHQADAIAGAjQAFAZgDAAQgBAAgCgFg","fc":"#FFFAEE"},"479":{"t":[1.3,117.9],"p":"AgEADIADgTQAGAUAAAMIAAABQgCAAgHgOg","fc":"#FFFAEE"},"480":{"t":[6.4,118.8],"p":"AAFAiIgDgHIgCgKIgEgLIgSgmQgCgGAFACQAFACADAEIANAWQAXAegCAEQgEAJgIACIgBAAQgDAAgCgDg","fc":"#AA9D85"},"481":{"t":[25.8,111.8],"p":"AgBAoIgFgFIACg8QABgKADgEQAAgBAAAAQAAAAAAgBQABAAAAABQABAAAAABQAIBEgFAJQgBAEgDAAIgCgCg","fc":"#AA9D85"},"482":{"t":[7.4,115.8],"p":"AgFBHQANgGAKgNQAOgTACgeIhcgwIgDgZIAlARQApATAlAUIAIAEIgBAJQgBATgEARQgGAUgOAPIgBABg","fc":"#4F3F2A"},"483":{"t":[1.7,121.1],"p":"AgOATIAFglIAYAlg","fc":"#4F3F2A"},"484":{"t":[27.2,108.1],"p":"AggBlQgKgFgIgGQgKgIgFgGIgEgFIgBgIQgDgXgBg3QgBgRADgZQACgOADgJIADgJIAHgKIAJgGIABAAIADgBIABAAIABgBIAEAAIAIABIAJAEIAHAGQAHAGAHAMIALARIAVAiQAZApAOAbIAFAJIgGAJQgKAQgNANQgRAPgVAEIgKABQgPAAgQgHgAglhQQgDACgBAFIgDATIgCAnQgBApACAjQALALAOAEQAPAGAKgEQASgFAPgYQgRgjgOgYQgZgxgOgRIgDgDIgCgBIAAAAg","fc":"#4F3F2A"},"485":{"t":[24.7,108.5],"p":"AgDBZIgVgMIAHinIAfBCIALBkQgFAPgNAAQgFAAgFgCg","fc":"#F2EBDA"},"486":{"t":[27.1,107.8],"p":"AgZBcQgOgFgMgLIgJgJIASigIBnCTQgiAoghAAQgJAAgKgCg","fc":"#AA9D85"},"487":{"t":[24.7,109],"p":"AA7CLIAIgEQAWgMATgOIARgPQAJgIAEgGIACgEQAKgMAGgPQAHgOACgQQAFgdgRgaQgQgYghgUQgSgKgOgGQgNgFgTgDQg+gIhHAoQhCAngkA9IgOgHQAjhGBEgtQBLgxBLAFQAUACAVAHQASAGATALQAqAWAXAfQANASAGAXQAGAVgDAXQgDAVgLAUQgJAUgOAQQgHAKgNALIgSAPg","fc":"#303233"},"488":{"t":[45.4,114.8],"p":"AgmBRQAPgNANgOQAaghgBgbQgBgegdghIALgLQAOANAMASQANAUADAVQACATgIAXQgGAPgQAXIgIAJg","fc":"#513319"},"489":{"t":[5.1,117.6],"p":"AgXA2IgVgiQAJg0AAgVIAhAYIAuBAQADALgFAIg","fc":"#F2EBDA"},"490":{"t":[6.4,116.5],"p":"AgwBAIgLgSIAIg3QAEgggCgWQAxAUA8AeQgCAzgdAag","fc":"#AA9D85"},"491":{"t":[16.6,107.2],"p":"AhUA+QgLgQARgdQARgbAjgaQAigZAggIQAhgHALAPQAMAPgRAeQgRAagkAbQghAaghAHQgKACgJAAQgRAAgIgKg","fc":"#C7CDCF"},"492":{"t":[16.9,110.2],"p":"AiYB/QgFhGA3hPQBGhnB3gBQAlAAAWA0QARAngYAtQAiAzg4AWQgWAIgZgBQgYgBgLgKQgLAIgNAOIgUAag","fc":"#9BA7AA"},"493":{"t":[22.9,109.8],"p":"AjDCDQgIijCOhDQAygZA2gFQAxgEAQALQBfA8gGBIQgCAYgMAWIgLARQABAFgVARQgXASgiASg","fc":"#686C72"},"494":{"t":[40.9,115.9],"p":"AhFBGQBIgyAlhZQAQADAJAmIAFAkQgUAigYAcg","fc":"#F9D180"},"495":{"t":[42.3,117.6],"p":"AAtA1Qg1gegugWIgjA0IgtAAIBIhpIAQAIQBbAsBaA1g","fc":"#3D2514"},"496":{"t":[44.9,121.7],"p":"AghAMIAmgYIAdAYg","fc":"#513B27"},"497":{"t":[41.1,119.7],"p":"AhTAgQAWggARggIAlASQAsAVAvAZg","fc":"#9F815D"},"498":{"t":[11.7,97.3],"p":"Ag5AKIgIgkIgDgSQAAgQAAgGIADgJIAFgEIABgBIAHgCQAHAAAHADQAJAEAJAHIAcAXQAOAKAQAOIAVASIAGAEIAEAFIgbANIguguQgOgMgPgLIgNgIIAAAKIADASIAJAiQAKAkAMAiIgbAJg","fc":"#4F3F2A"},"499":{"t":[9,97],"p":"Agbg9IAYAQIAaAyIAFAjIgbAWg","fc":"#F2EBDA"},"500":{"t":[11.6,97.1],"p":"AgsADQgRhDAGgGQAFgFA1AuQAcAXAaAWIhTA3g","fc":"#AA9D85"},"501":{"t":[35.6,74.4],"p":"AgHg3QAIAJAEAUQAJAmgWA4","sc":"#1D2226","ss":[4]},"502":{"t":[28.2,74.6],"p":"AAZBCQgagLgYgVQgWgTgPgZQgQgbgHgcIgDgNICxAEIgDAoIiQgUQAHAQAKAOQARAXASAMQAmAdA1gBIgBAoQghgDgagKg","fc":"#1D2226"},"503":{"t":[29.4,74.7],"p":"AAqAzQghgKgsgvIgngwICNBJQAHAMABAKQAAAOgOAAQgHAAgMgEg","fc":"#608420"},"504":{"t":[29.8,74.4],"p":"AgSAVQg2gngCglQAwgFA2ALQAdAFASAGQgBAngGA4IgJAAQggAAgtgkg","fc":"#98CC46"},"505":{"t":[23.6,122.5],"p":"AgUAEQAUgEAVgDIgLAHg","fc":"#CFEA6F"},"506":{"t":[23,119.8],"p":"ABLAfQgBgFgEgEQgIgKgRgBQgdgDgwAVIgDACIhQAAIAVgSQAKgHAMgGIAWgJQAWgJAagHQAbgHAYADQAPABAOAHQAQAIAJANQAKAMADATg","fc":"#2A380D"},"507":{"t":[31,121.4],"p":"AgPAPIAMgdQAOACAFAbg","fc":"#608420"},"508":{"t":[22.5,121.1],"p":"AhgASQAagUARACIA+gPQBDgJAVAqg","fc":"#98CC46"},"509":{"t":[94.7,109.9],"p":"AAeCCQA5h8ADgYQgJgfgqgUIgngNQglBag8B6IglAAQA/iAA8iDQBUgBAnA0QAUAaACAbIgFAOQgSApgtBkg","fc":"#3D2514"},"510":{"t":[101,116.5],"p":"AgfBBQAjhFAcg8QgZBBgaBAg","fc":"#513B27"},"511":{"t":[98.6,116],"p":"Ag0BFQAwg7A5hPQgVBBggBJg","fc":"#6B4F32"},"512":{"t":[94.5,111.5],"p":"AhnByQA2hrAvh4QAjACAnAlQAUATAMATQgaA9gnBZg","fc":"#9F815D"},"513":{"t":[61.7,107.7],"p":"AFTCYIgRg+QgSg7gZgtIgYgZQgQgNgQgJQgigUgogMQhIgXhXgCQhUgEhJAhQglARggAZQgiAagXAcIgVAdIgLAUQgKAXgKAfIgLAqIgYAAIAPgwQAMgiALgWQARghAPgSIAlgtIAUgUQAjgcAngSQBOgmBcACQBeABBKAWQAuAOAkAUQASAKATAPQAHAFAKAKIAIAJIAIAKIABAAIABACQAbAxAUA9QAMAiAJAog","fc":"#2A380D"},"514":{"t":[61.7,108.8],"p":"AEECNQgOgDgWgBIgQAEIl5AAIhDgJQgHADgGAGIhyAAQAQg9Ahg7QAQgcANgSIAggaIAegYQAkgZAtgQQCOgyCxA5QB6AoA1CsIADACIAJAkg","fc":"#4F6877"},"515":{"t":[61.1,108.3],"p":"AlrCSQAZhyAygnQAMgXAoggQA2gqBCgWQDDg/DfCXQAXA6AKAcQASAxALAxg","fc":"#98CC46"},"516":{"t":[95.7,113.4],"p":"AAYBfQgMgZgQgtQgWg1gIgjQgEgRAAgHQABgJAWADQASACAFAFQADADgCAXQgCAbAEARIAcBvg","fc":"#4F6877"},"517":{"t":[105.5,114.4],"p":"AAlBVIgQgQQgcgeggg1IgZgyQgJgLABgGQACgFALAEQApAPASAaQAKANAXAnIAoBKg","fc":"#A1C7E2"},"518":{"t":[108.5,115.4],"p":"AAUBLIhUiVIAPAJQAQAMAIAHIAfAqQAlAuAWAhg","fc":"#A1C7E2"},"519":{"t":[103.1,111.2],"p":"AB7B1QgxhYghgjQgPgRgQgLIgOgLIgUgJQgvgWgfADQgSABgIAKQgIALgBAVQgCAfAOA0IAWBAIggAAIgVg2QgUg4AAgmQABgiAPgVQAKgNAPgIQAOgHAPgBQAYgDAdAHQAXAGAYAKIAVALQAIAEAOAKQASANAUAUQArAtA7Btg","fc":"#1D2226"},"520":{"t":[93.3,112.8],"p":"AgmBlQgOg2gFg8QgGhVAdgCQAWA7BHCOg","fc":"#4F6877"},"521":{"t":[103.2,112.5],"p":"Ah/BoQhHi4BdgVQAvgKA7AbQAYgGAwA+QAoAxAuBTg","fc":"#91B1CE"},"522":{"t":[8.5,11.2],"p":"AgrAwQAJgbA5hHIAEgEIACAAQAFgBAKACIg9BtQgMgFgOgDg","fc":"#A1C5E5"},"523":{"t":[11.9,11.6],"p":"AglBFIgjgHIgPgDQAghAAfgiIAPgPQg8BIgJAaQAPADALAFIA+htQgKgCgDABIAJgIIANgGQAggPAWACQAKABAFAFQgMAfgZAyQgcA5gQAbIgsgRg","fc":"#91B1CE"},"524":{"t":[17.1,13.2],"p":"AgsBHIABAAQAQgbAbg4QAYg0AMgfIACACQAGAGABAQQABAXgKAiIgJAcIgMAdQgNAagPAbg","fc":"#4F6877"},"525":{"t":[12.2,12.1],"p":"AAuByIgGgEIgFgDIAAgBQARgbAMgaIANgdIAJgbQAKgjgBgXQgCgPgFgHIgCgCQgFgEgKgCQgWgBggAOIgNAHIgKAHIgCABIgDAEIgPAOQgfAiggBBIgBACIgegPQAkhFAjgmQALgMAOgLQAGgEAKgFIANgHQANgGATgFQAVgFAPACQAJABALAEQAKAGAHAJQAKAOABAXQAAAcgOAkIgPAoIgCAFIgeBJg","fc":"#1D2226"},"526":{"t":[18.8,20],"p":"AgYAgIAGADIgBABgAAZgjIgBAEIgBACIACgGg","fc":"#608420"},"527":{"t":[13,21.9],"p":"AAQATQgQAAgMgFQgGgDgGgHQgFgEgHgMIgCgDQARACATAAQAVAAAUgFIAAAOIgBARIgBABIAAABIgHACQgFACgIAAg","fc":"#4F6877"},"528":{"t":[11.2,13.5],"p":"AgHCFQgQgHgLgNQgEgEgMgTIgRgeQgLgSgFgPQgOgjgHgaQgGgWAAgXQAAgdAKgVIABgFQBjgRAxAgQA0AgAGAdIADADIABADIAAAFQAAAKgEAaIgHAnIAAABQgDAMgBAVIgBAZQAAALgCAIQgDANgKAJQgIAHgOADQgKADgNAAQgXAAgTgIgAgRBGQAHANAFAFQAFAHAFADQAMAFASAAIAAAAQAJAAAFgCIAHgCIAAgBIABgBIAAgTIAAgOQgTAFgYAAQgRAAgRgDIADAEgAhIhWIAAAHQAAAQAEATQAIAbAMAeIAIASIABAAIAPAEQATAEATAAQAaAAAUgHIADgNIAAgBIAAgBIALg+Qgqg8gvAAQgbAAgeATg","fc":"#1D2226"},"529":{"t":[11.2,10.2],"p":"AgYBEIgPgEIgBAAIgIgRQgMghgIgYQgEgTgBgQIAAgHQBRg2BCBeIgLA+IgBACIAAABIgCAMQgUAIgaAAQgUAAgSgFgAgygNIAJAgQALAkAPALQAPAMAKgaQAKgbgMgRQgIgNgbgKQgMgEgGAAQgHAAACAGg","fc":"#532670"},"530":{"t":[32.9,28.6],"p":"AiOEZQg8gIgpgsQgjglgVg7QgdhUAAh1IACg+IABgDIABgCQAhhOBCgmQA8ghBSAAQBnAAB4A0QBuAwBHBBIAIAHIgCAKQgMBSglBGQgkBGg3A1Qg4A1hFAdQhGAehNAAQgcAAgdgEgAjNjYQg2AegbBAIgCA2QAAA2AHAuQAJBCAUAtQAQAjAWAXQAhAiAtAGQAcAEAXAAQBFAAA+gbQA+gaAzgwQAzgwAghBQAgg7ALhFQg/g4higrQhxgwheAAQhJAAgxAcg","fc":"#1D2226"},"531":{"t":[6.9,19.8,1.234,1.234],"p":"AgTA8QgNgDgJgIIgDgEIgBgDIAAgGQAAgJACgKQABgLAEgMQAKghATgRIAFgGIAFAFQAbAUALAcQAHARAAAaIAAADQAAAHgEAHQgEAFgHACQgJAFgRAAQgMAAgMgDgAgPgMQgGAQgDARIgBAPIALAFQALACAIAAQAKAAAFgCQAEgBACgCIABgBIAAgDQAAgWgHgOQgHgTgPgOQgHAJgGAOg","fc":"#1D2226"},"532":{"t":[6.9,20,1.234,1.234],"p":"AACAzQgUgBgSgKQgEgDAKghQALgjARgUQAWAWALAcQALAYgHAQQgGANgWAAIgFgBg","fc":"#F9DDAC"},"533":{"t":[8.2,33.3,1.127,1.127],"p":"AgTA8QgOgEgIgHIgDgEIgBgEIgBgFIACgTIAGgXQAMgiAQgQIAHgGIAEAFQAbAUALAcQAIAQAAAbIAAADQAAAHgFAGQgEAFgHADQgKAFgQAAQgKAAgOgDgAgOgMQgHAOgDASIgCAQQAEACAIACQAKADAJAAQAHAAAIgCQAFgBABgCIABgBIAAgDQAAgXgGgNQgIgSgPgPQgGAIgGAPg","fc":"#1D2226"},"534":{"t":[8.2,33.5,1.127,1.127],"p":"AADAzQgVgBgSgLQgEgCAKgiQAMgiAQgUQAXAWALAbQALAZgIAQQgGANgWAAIgEgBg","fc":"#F9DDAC"},"535":{"t":[32.8,29.9],"p":"AiKD5Qh+gSghi8QgKg5AAhFIACg5QAhhOBGgiQgtAaguBFQgeC2BJBfQA0BDBJACQA8gBA1gUIARgHQAXgLAUgNQAjgXAdggQAXgYAUgcQARgaATgiIATgrIAMgiIAPhAQApAaAeAcQgaCth/BrQhrBaiBAAQgcAAgdgEg","fc":"#605E4A"},"536":{"t":[40.8,6.4],"p":"Ah2gnQB2ANB3BCQiThAhagPg","fc":"#6D665A"},"537":{"t":[51.9,15.9,1.139,1.139],"p":"AgXA6QgEgBgCgCIgCgDIgEgGIgGgTQgJgaAAgXQAAgQAEgMIADgIIAIABQAjAGAVAUQAPANAMAWQADAFAAAGQAAAFgDAFQgCAFgEAEQgGAHgLAGQgWAMgSAAgAgegWQAAAbALAaIADAIIABAAQAKAAAJgFQAMgEAIgGIAGgHIABgCIAAgBQgLgTgNgLQgOgOgWgFIgBANg","fc":"#1D2226"},"538":{"t":[52,15.9,1.139,1.139],"p":"AgWAwQgFAAgHgiQgIgkAGgZQAgAIAVATQAWASABAPQAAAQgXAKQgRAJgUAAIgCAAg","fc":"#F9DDAC"},"539":{"t":[15.9,40.1,1.323,1.323],"p":"AgUA6QgMgDgIgFQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBgBgBIgBgCIgCgMQABgWAFgSQAIgdAPgQIAGgGIAHAEQAcASAMAbQAJAQACAaIAAABQAAAIgGAHQgFAFgHACQgMAFgRAAQgLAAgJgCgAgUgCQgGARAAARIABADIAJADQAIACAIAAQALAAAHgCQAHgBABgDIABgBQgBgUgIgOQgJgSgQgOQgIALgFAUg","fc":"#1D2226"},"540":{"t":[15.9,40.3,1.323,1.323],"p":"AgjAoQgEgCAHggQAJgiAPgUQAYAUANAZQANAXgGAPQgGANgaAAQgUABgTgJg","fc":"#F9DDAC"},"541":{"t":[39.1,36.5,1.158,1.158],"p":"AgeA6IgGgDIgDgIIgFgOQgEgWAAgQQABgcAIgSIAEgIIAIACQAfAKAUAXQAOAPAKAYIABAHQgBAGgCAEIgGAIQgFAGgLAFQgUAJgSAAQgKAAgGgCgAgcgFQAAAXAHATIAAADIAHAAQALABAIgEQAMgDAGgFQAEgCABgEIABgBIAAgBQgIgUgLgMQgMgPgWgJQgDANgBARg","fc":"#1D2226"},"542":{"t":[39.2,36.6,1.158,1.158],"p":"AgdAwQgFgBgCgjQgCgkAIgYQAeAMATAWQAUATgCARQgBAPgZAIQgMAEgPAAIgNgBg","fc":"#F9DDAC"},"543":{"t":[47.4,25.9,1.225,1.221,0,0,4.6],"p":"AgeA6IgGgEIgBgCIgCgFIgFgOQgDgWAAgQQAAgcAIgTIAEgHIAIACQAgAKATAXQAOAPAKAYIABAHQgBAGgCAFIgFAIQgHAFgKAFQgUAJgSAAQgIABgIgDgAgcgFQAAAXAHASIABAEIAGABQAJgBAKgDQAMgEAGgEQAEgDABgDIABgBIAAAAQgIgWgMgLQgLgPgWgJQgDAMgBASg","fc":"#1D2226"},"544":{"t":[47.5,26,1.225,1.221,0,0,4.6],"p":"AgdAwQgFgBgCgjQgCgkAIgYQAeALATAWQAUATgCASQgBAPgZAIQgMAEgNAAIgPgBg","fc":"#F9DDAC"},"545":{"t":[27.4,42,1.243,1.243],"p":"AgmA3QgDgCgBgDIgCgDIgBgGIgBgQQAAgVAEgRQAHgaALgPIAFgHIAHAEQAdAQAPAbQALARADAZIABADQAAAJgHAHQgEAFgJAEQgPAGgRAAQgWgBgLgGgAgWgJQgEAQAAASIABAPQAHACANAAQAJAAAJgDQAJgCAEgDIABgDQgEgXgIgNQgKgSgSgMQgFAKgEAQg","fc":"#1D2226"},"546":{"t":[27.4,42.2,1.243,1.243],"p":"AgiAtQgFgCAFgjQAFgkANgWQAaASAQAZQAPAXgFAQQgFAPgZADIgJABQgQAAgPgGg","fc":"#F9DDAC"},"547":{"t":[27.8,22],"p":"AhVDGQhmhgANiTQAEgvAPguIAOglQB4gvBuAnQA4ATAgAdIgZBHQgeBQgYAyQggBCgvAmQgmAggnAAQgNAAgOgEg","fc":"#D63212"},"548":{"t":[29.2,24],"p":"AhcDTQhzgTgLirQgDg0AHg+IAJg0QBQhWCbAXQBPALBGAfQAKAEAIAJQAMAPALAgQgkCChABVQhPBphjAAQgRAAgRgDg","fc":"#9E2505"},"549":{"t":[29.7,26.3],"p":"AjZClQhKhfAfi2QArhBAngZQAugdBOgCQBCgBCIA0QBEAaA2AaIgQBEIgMAiQgHAUgMAVQgPAfgVAfQgUAdgWAYQgfAggiAWQgZAQgSAIIgTAIQgzAUg8AAQhIgBg0hEg","fc":"#998D7C"},"550":{"t":[75.2,21,0.986,0.986],"p":"AgVAwQgUgdgNgjQgKgigDgzIAAgBIA7ABIAAAAQABASAEAZQAIAsAUAbQASAZAZANIgcA1QgmgVgXgjg","fc":"#1D2226"},"551":{"t":[81,17.3,0.986,0.986],"p":"AgnBXQACABAFgFIAMgIIAUgUQAWgXASgYQAUgXANgaQARggABgUIgBgKIAAgBIgHAAIgOACQgVAEglANQgfAOgWANIgYARQgNAKgFAIIgrgqQAMgKAVgLIAfgOQAdgMAigKQAggLAfgFQALgCAHAAQAPAAAIADIAJAEIACACIAEAFIADAGIACAGQAEAKgBAMQAAAQgHAUQgHAUgGAMQgMAYgUAhQgTAcgTAaIgWAbIgNANQgHAJgJAFg","fc":"#1D2226"},"552":{"t":[81.6,16.2,0.986,0.986],"p":"AgkBQQglgigSg5QA9AqBBg8QAigfAVgoQAEAPgEAcQgHA2gkA6QgPAWgUAPIgPAJQgPgEgSgRg","fc":"#AA9D85"},"553":{"t":[83.3,15.3,0.986,0.986],"p":"AhRAVIgGg1QAdgfA9gcQBAgcAMAPQAaAhgwBaQguBbgfABQgtgdgQg9g","fc":"#F0E7D7"},"554":{"t":[44.8,41.2,0.986,0.986],"p":"AAGBAQgOgBgMgGQgQgHgJgOQgIgMgCgSIAAgNQAAgHACgIIAEgHIABgBIAQgIIAOgGIAYgKQARgGAKgCIAIgBQADAAADACIABABIABABIACACQAEAFABAKQABAWgIAfQgFASgFAJIgIANIgIAIIgHADIgIACgAgHgBIgBAFQgBAGACAFQABAEAEAEQAEADAHACIAGgGQAIgIAHgLQAQgagBgTQAAgFgDgEIgBgBIAAAAIgFABQgJADgMAKQgLAJgFAJQgJANABAHIAEgHg","fc":"#1D2226"},"555":{"t":[45.5,40.7,0.986,0.986],"p":"AgpARIgDgaQAQgPAcgOQAggQAHAHQAOAQgQAoQgPApgRAAQgjgEgLgdg","fc":"#F0E7D7"},"556":{"t":[54.5,21.9,0.986,0.986],"p":"AACBnQgXgEgRgHQgXgLgNgVQgLgSgCgaQgBgNABgHIAFgXIACgGIACgCQAPgMAbgQIAmgUQAcgMAQgFIAOgBQAGgBADACIAFACIAEAFQAJAJACASQABASgFAdQgGAXgHATQgKAZgKASQgIANgHAHQgGAHgGADQgEADgFABIgHADgAgmAAIgBAOQAAAOAFAJQAEAKAMAGQAIAFAPAEIAFgDIAMgOQALgPALgTQAKgRAGgUQAHgWgCgQQAAgJgEgFIAAgBIgBAAIABABIgBAAIgIABQgPAEgVAOQgQALgPAOQgTATgFAMIAEgIIgDALg","fc":"#1D2226"},"557":{"t":[55.8,21.7,0.986,0.986],"p":"AgvA5QgZgbAMgbIAOAHQARAHAPgCQAwgFAThWQAXAAgWBIQgWBGgbAJQgFACgIAAQgUAAgTgUg","fc":"#AA9D85"},"558":{"t":[55.5,22,0.986,0.986],"p":"Ag0AcIgEgwQASgaAngYQApgYAIANQARAcgWBFQgVBGgVABQgqgIgNgzg","fc":"#F0E7D7"},"559":{"t":[23.1,42.4,0.986,0.986],"p":"AACBAIgHgBIgIgDQgFgCgEgEIgKgNQgHgLgGgPQgGgMgDgMQgFgQAAgNQAAgKAEgHIACgCIAAgBIABgBIAAAAIABgBQADgCAEgBIAJAAQAKABASAFIAaAIQAUAHAKAFIABABIAEAGQADAHABAIIACAPQAAAQgGANQgJARgOAIQgLAGgQADIgCABgAgqgmQABASASAXQAIAKAJAHIAGAFQAFgDADgDQADgDABgEQACgFgCgGIgBgFIgCgFIAEAHQAAgIgLgLQgGgIgLgHQgMgHgLgDIgDAAQgCADABAFg","fc":"#1D2226"},"560":{"t":[22.9,42.3,0.986,0.986],"p":"AgkAJQgSgmAOgQQAGgHAiANQAgAOAQAOIgDAaQgLAdgjAEQgRgBgSgmg","fc":"#F0E7D7"},"561":{"t":[16.6,23.9,0.986,0.986],"p":"AgBBiIgKgDQgHgEgGgFQgHgGgKgNQgLgQgNgYQgJgSgIgXQgJgdAAgRQAAgRAHgLIACgDIABgBIABAAIABgCIADgBIAJgDIAOAAQAVAEAYAIQATAHAWAJQANAFAJAFQANAHAJAGIACACIADAGIAHAVQADANAAAHQABAZgKAVQgKAXgWAMQgSALgXAEIgBABgAhFg8QAAARAKAVQAHAQANASQANATAMANQAIAIAGAEIADADQAOgEALgHQAKgHAEgLQAEgKgCgOIgCgMIgFgMIAFAHQgHgMgUgPQgNgKgVgMQgYgMgOgCIgIgBIgBAAQgDAGAAAJg","fc":"#1D2226"},"562":{"t":[15.8,23.7,0.986,0.986],"p":"AARBSQgOgDgOgQQg9g/gBgvQAAgPAFgLIAGgJIAoAzQAvAtAxgSQgGAjgVAdQgKAOgKAHIgFACIgFgBg","fc":"#AA9D85"},"563":{"t":[15.9,23.4,0.986,0.986],"p":"Ag0ANQgdhAAUgZQAJgKA0AbQAvAaAXAXIgFAoQgPAsgyAGQgZgBgbhCg","fc":"#F0E7D7"},"564":{"t":[51.4,16.9],"p":"AjAElIjVh2QgDgCgBgCIgBgFIABggIABgiIAAgBQAAgBABAAQAAgBAAAAQAAAAAAgBQABAAAAgBIAPgtIAAgBIAAgBQBPjwF0hlQAEgBADACQCrBbBxCrIABAAQAeAtAbA1QACACgBADIgCAGIgEADIpMDUIgEAAIgEgBgAmFCQIgBARIDMBxII8jPQgVgqgZglIg0ASIAdApQABABAAAAQAAABABABQAAAAAAABQAAAAAAABIAAABIgCAGQgCACgDABInwCuIgEABIgEgCIjEh2IgBAbgAmCBgIDIB4IBNgbIGSiNIgYgjImvCkIgWAIIgEABQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAgBIi4h1gAg/jnQjfBahICfQgHAOgFAQIC4B1IHFiqIACgCIA8gWQgcgpgggkQhahnh2hAQhCASg6AYgAjBBpIiAhRQgCgBgBgDIgBgFQAAgCACgDIAFgHQBwifDQhIQASgHAUgGIAEAAIAEABIAQALQBTA3A2BFQARAWAOAXIABAFQAAADgCADQgCACgDABImaCYIgEABQgBAAAAAAQgBAAAAAAQgBgBgBAAQAAAAgBgBgAAFjRQifA4hlBuIgEAEQgXAagUAaIB0BJIGKiSIAAAAQgKgSgNgPIAAAAIgBgCQg4hGhXg4IgkAMg","fc":"#1D2226"},"565":{"t":[42.5,16.6],"p":"AkoBjIAJgdIC4B1QABABAAAAQAAAAABAAQAAABABAAQABAAAAAAIAFgBIAWgIIA1AMIhOAbgABfjOIAkgMQBXA4A4BGIABACIAAAAQAMAPAKASIi/h4QikAyhsBXQBlhuCgg4g","fc":"#C7CDCF"},"566":{"t":[49.5,15.9],"p":"AlyCaIABgbIDEB2IAEACIAFgBIHwiuQADgBACgCIABgGIAAgBIAhAFIoZDFgAiOC7IGuikIAZAjImSCNgAlTAcQBJifDfhaQA3gYBFgSQB2BABaBnQhnhbhmggIgQgLIgEgBIgEAAQgUAGgSAHQg5AFhTAvQhTAwgWAVQgjAbgmA2IgDAdIgFAHQgCADAAACIABAFQABADADABICABRQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIAFgBIGaiYQADgBABgCQACgDAAgDIAnAJInICygAkaAXQAUgaAWgaIAEgEQBshXCkgyIC/B4IABAAImKCSg","fc":"#9BA7AA"},"567":{"t":[51.2,19.1],"p":"AmDCLIAAgRIDLBuIIZjFIgggFQAAgBAAAAQAAgBAAgBQgBAAAAgBQAAAAgBgBIgdgnIA1gUQAYAlAVAqIo8DPgAlwAaQAGgQAGgMICtBwIHJiyIgngJIgBgFQgOgXgRgWQg2hFhTg3QBnAgBmBbQAgAkAcApIg8AWIgCACInFCqgAk5gwQAmg2AjgbQAWgVBTgwQBTgvA4gFQjQBIhwChg","fc":"#686C72"},"568":{"t":[19.2,15.7,0.986,0.986],"p":"AgQCBIgMgOIgTgbQgSgbgPgcQgQgfgLgaQgHgQgDgPQgGgTAAgQQAAgKACgKIAEgLIAFgHIABgCIACgCQAFgFAJgDIALgCIASgBQAgACAhAIQAjAJAZAJQASAGAOAHQATAIAOALIgrArQgEgHgMgKQgLgIgNgHQgZgNgbgJQgjgKgWgCIgMAAIgEABIAAAAIgBAEIgBAKQAAAXAOAeQAMAaARAXQAPAZAUAWIASAUIAKAIIAFAEIgYA2QgJgGgIgJg","fc":"#1D2226"},"569":{"t":[17.6,14.6,0.986,0.986],"p":"AACBbQgSgOgPgWQgkg7gHg1QgEgcAEgPQAQAgAbAZQA0AwA4ghQgTA5gVAqQgLAVgHAJQgHgCgKgIg","fc":"#AA9D85"},"570":{"t":[17.3,13.6,0.986,0.986],"p":"Ag4ATQgwhaAaghQAMgPBAAcQA9AcAdAfQACAZgIAcQgQA9gtAdQgegBgvhbg","fc":"#F0E7D7"},"571":{"t":[36.1,56.1,0.986,0.986],"p":"AgQAbQgLgUgCgNQgBgMAGgGQAFgGAMABQANABAUAKIAEADIgUAXIgWAWg","fc":"#1D2226"},"572":{"t":[25.8,56.3,0.986,0.986],"p":"AAAAUIgUgVIgJgNIADgEQAVgKANgBQAMgBAFAGQAGAGgBAMQgDAPgLASIgDADIgNgKg","fc":"#1D2226"},"573":{"t":[61.3,43,0.986,0.986],"p":"AgdBGQgQgHgDgaQgDgZANgcQANgdAUgPQASgQARAHQAQAHADAaQACAZgMAbQgNAdgUAQQgMALgNAAQgFAAgFgCg","fc":"#000000"},"574":{"t":[60.4,44.3,0.986,0.986],"p":"AgdBGQgQgHgDgaQgCgZAMgcQANgdAUgPQATgQAQAHQAQAHADAaQADAZgNAbQgNAdgUAQQgMALgMAAQgGAAgFgCg","fc":"#514F40"},"575":{"t":[20.4,37.6,0.986,0.986],"p":"AgSgBQgZADgTAPQAXhFAzAQQAVAHAPAVQAPATAAAcQgggxgxAJg","fc":"#DBDDBC"},"576":{"t":[28.1,42.9,0.986,0.986],"p":"Ag4A0IAnhvQAYAMAYAbQAaAaAAATQAAAYgyAIQgQADgOAAQgWAAgLgIg","fc":"#605E4A"},"577":{"t":[17.5,44,0.986,0.986],"p":"AAPA5QgJgCgKgTQgNgTgGgVQgHgYACgQQADgPALADQAJACAKATQANATAGAVQAHAYgCAQQgDANgIAAIgDgBg","fc":"#000000"},"578":{"t":[18.1,45,0.986,0.986],"p":"AAQA5QgLgCgLgTQgOgSgHgWQgHgYAEgPQADgQALADQAMACALASQANATAIAWQAHAXgEAQQgDAOgJAAIgDgBg","fc":"#605E4A"},"579":{"t":[52.7,36.3,1,1,0,0,0,0.3,-1.8],"p":"AhgF8QhygIhBgnQgMgIgUgaIgigwIghgsQgUgdgJgbQgMgigBgfQgDghAJgpIANhPQAHgvAGgZQAYhUAyg2QA1g4BUgZQBCgVBZgCQBVgCBFANQBZARA6AtQAfAYAYAjQAWAiAMAlQALAgADAsIACBMIABAkQADAXAKAmQALApAEAoQAEAngdAfQgeAehHAzQhGAzgqAKQgqAKg4ACIhOAEQgTACgXAAQgbAAgegCgAgSlgQhVADg9AUQhMAYgrAzQgsAxgSBMQgFAZgDAoIgEBGIgGBkQgCAPAYAhQANATApAwQAZAfAkAWQArAaAqACQBBACA/gBQBzgCAvgOQAbgHAYgLQAYgKBMguQAqgVALghIgHhfIgCg2QABgRgBgSIAAhHQAAgqgJgcQgXhLg0gpQgygohRgRQhAgNhIAAIgLAAg","fc":"#1D2226"},"580":{"t":[77.4,39.6,0.986,0.986],"p":"AgKgfQAjgPAjAaQgvAMgoAXIggAXQAJg2AogPg","fc":"#989588"},"581":{"t":[26.3,51.6,0.986,0.986],"p":"AgYAMIgSALQAOgwAdACQAeADANAsQgrgTgZAHg","fc":"#DBDDBC"},"582":{"t":[49,42.5,0.986,0.986],"p":"Ag4A0IAnhvQAYAMAZAaQAZAbAAATQAAAYgyAIQgPADgOAAQgXAAgLgIg","fc":"#605E4A"},"583":{"t":[58.6,24.5,0.986,0.986],"p":"AhNBCIA2iNQAgAPAiAiQAkAhgBAZQAAAehEAKQgWAEgTAAQgfAAgPgKg","fc":"#605E4A"},"584":{"t":[23.7,25.3,0.986,0.986],"p":"AhOBBIA2iMQAiAPAhAiQAkAhAAAZQAAAehFAKQgWAEgTAAQggAAgPgLg","fc":"#605E4A"},"585":{"t":[55.7,39.3,0.986,0.986],"p":"AgUE0QiGgHhIgMQhCgegegPQg1gbAFgPQAyANBQAKQBQAKAmgCQBLgFCNg/QCOhAgEmYQAbgGAgA/QAiBDAmCvQAnCtiRBLQiFBFh7AAIgVgBg","fc":"#605E4A"},"586":{"t":[39.9,17.5,0.986,0.986],"p":"AjSCHQgUgxAohSQArhXBPghQBWgkBaADQBdADAQAsQAHAVhCAVQhuAigpAWQhKAlhSBUQgcAcgKAEIgHACQgJAAgHgQg","fc":"#DBDDBC"},"587":{"t":[52.4,36,0.986,0.986],"p":"Ai6FHQh5gggogtQgogtAAibQAAi6BMhgQBdh1DagBQDoAABZB2QBDBZAADBQAACfhxBAQhwBBhzAKQgcADgbAAQhXAAhcgYg","fc":"#989588"},"588":{"t":[54.3,70.5],"p":"AAqBIQhAAZg3ghQg3ASgegTIgBAAQgcgRgggaQgXgJgPAEQgCABgDAAIgFgCQgyglgHgvQgBgEACgDQABgDAEgCQADgCADABIJ7AoQAEABADADQADADAAAEQAAAFgDADQgYAdgnAMQgbAzgpgIIgBAAQgRgEgUAAQgNATgjAHQgKACgKAAQgYAAgXgMgAAyAyQAYAPAegFQAcgGAJgPIAEgEQACgCADAAQAagBAYAGIgBAAQAbADAUgmQAAgBABAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBABAAQAAAAABAAQAWgHARgNIpSgmQAKAcAfAZQAUgEAcAKIADABQAfAaAcARIAAAAQAZAOAugRIAGgBIAFACQAyAgA6gZIAFgBQADAAADACg","fc":"#1D2226"},"589":{"t":[53.8,70.6],"p":"AA3AxQgCgCgDAAIgGABQg5AZgzggIgFgCIgFABQguARgZgOIAAABQgcgSgggZIgCgBQgdgLgTAEQgggZgKgcIJSAmQgQAOgWAGQgBAAgBABQAAAAgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBABAAAAQAAABgBAAQgTAmgbgDIAAAAQgXgGgaABQgDAAgCACIgEAEQgKAQgbAFIgPACQgVAAgTgMg","fc":"#E7634A"},"590":{"t":[59.9,72.8],"p":"Ag/A1IBRgGQACAogUAfQgngZgYgogAi8AuIBIADQALAigKAiQgugegbgpgABAAoIBPgNQADAXgEAUQgDARgKAWQgogYgZgtgAlJAAIBIACQALAigKAiQgtgegcgogAC3AKIA9gcQAMAfABARQAAAPgGAUQgqgNgagqgAD/hIIAzgtQAYAqAAAwQgogMgjghg","fc":"#F9DDAC"},"591":{"t":[58.7,72.8],"p":"AhmCVQhMgpgjhIIgBgCIAAABIAAABIAAABIAAAAIAAABIABABIAAABIAAACIAAABIABAAQgBAagMAaIgDAHQgEACgEAAQgDAAgEgCQhMgpgjhGQgDgEgIgeQgIgfAMAUQANAVAGADIBrAGQAEAAAEADQACACACAEIACAGIABACQANATAGADIBrAGQAEAAAEADQACACACAEIACAHIAAgBIAAgDIAAgBIAAgBQADgCADgBIB0gHQACAAADABIAAACIABACIABgCQACgDAEgBIBsgTIABAAQACgDAFgCIBVgqIAAAAIAAgBIAAAAIAAAAIAAgBIgBAAIgBgBIAAgBIgBAAIAAgCIgCgBIAAgBIgBAAIAAgBIAAAAIgBgBIgBgBIAAAAIAAAAIgBgBIgBgBIAAABIAAgBIgCgBIAAAAIAAAAIgCgCIAAgBIgBgBIAAAAIAAAAIAAgBIgBAAIAAgBIAAAAIgBAAIAAgBIgBgBIgBgCIgCgCIgBgCIAAAAIAAAAIgBgBIAAgBQAAgEADgCIBMhAQADgDAEgBQAFAAAEABQAEABADAEQAoA9gGBKIgDAGQgCADgEAAIgIABQgmgFghgWQAPAlgBATQgBAWgKAfQgCAFgEADQgFACgFAAQg2gLghgtQABATgDARQgGAagPAgQgCADgCACQgEACgEAAQgDAAgDgBQg0gbgfgzQAAAvgfAkQgEADgFABQgFABgDgBQg0gcgegxIgBgBIAAgBIAAAAIAAgBIgBgBIAAgDIgBAAIAAgBIAAgBIAAgBIAAgBIAAgBIgBgFIAAAAIAAAAIAAACIgBABIABABIAAADIAAADIABABIAAABIAAAAIAAABIAAABIgBAAIABABIAAABIABABIgBAAIAAACIABABIABAEIAAAAIABAEIAAABIAAABIAAABIAAABIAAAAIAAABIABABIAAABIAAACIAAABIABAAQgBAagMAaIgDAHQgEACgEAAIgBAAQgDAAgDgCgAg0A1QAZAoAmAZQAUgfgBgngAhnB1QAJgigKgiIhJgDQAcApAuAegABLApQAaAsAoAZQAJgWADgSQAEgUgDgXgAj0BGQAJgigKgiIhJgCQAcAoAuAegADCAKQAaAqAqAOQAGgVAAgOQgBgSgMgfgAELhIQAiAiAoALQAAgwgXgqg","fc":"#1D2226"},"592":{"t":[74.5,23.3],"p":"AgVAwQgUgdgNgjQgKgigDgzIAAgBIA7ABIAAAAQABASAEAZQAIAsAUAbQASAZAZANIgcA1QgmgVgXgjg","fc":"#1D2226"},"593":{"t":[80.3,19.5],"p":"AgnBXQACABAFgFIAMgIIAUgUQAWgXASgYQAUgXANgaQARggABgUIgBgKIAAgBIgHAAIgOACQgVAEglANQgfAOgWANIgYARQgNAKgFAIIgrgqQAMgKAVgLIAfgOQAdgMAigKQAggLAfgFQALgCAHAAQAPAAAIADIAJAEIACACIAEAFIADAGIACAGQAEAKgBAMQAAAQgHAUQgHAUgGAMQgMAYgUAhQgTAcgTAaIgWAbIgNANQgHAJgJAFg","fc":"#1D2226"},"594":{"t":[80.9,18.5],"p":"AgkBQQglgigSg5QA9AqBBg8QAigfAVgoQAEAPgEAcQgHA2gkA6QgPAWgUAPIgPAJQgPgEgSgRg","fc":"#AA9D85"},"595":{"t":[82.7,17.5],"p":"AhRAVIgGg1QAdgfA9gcQBAgcAMAPQAaAhgwBaQguBbgfABQgtgdgQg9g","fc":"#F0E7D7"},"596":{"t":[43.6,43.8],"p":"AAGBAQgOgBgMgGQgQgHgJgOQgIgMgCgSIAAgNQAAgHACgIIAEgHIABgBIAQgIIAOgGIAYgKQARgGAKgCIAIgBQADAAADACIABABIABABIACACQAEAFABAKQABAWgIAfQgFASgFAJIgIANIgIAIIgHADIgIACgAgHgBIgBAFQgBAGACAFQABAEAEAEQAEADAHACIAGgGQAIgIAHgLQAQgagBgTQAAgFgDgEIgBgBIAAAAIgFABQgJADgMAKQgLAJgFAJQgJANABAHIAEgHg","fc":"#1D2226"},"597":{"t":[44.4,43.3],"p":"AgpARIgDgaQAQgPAcgOQAggQAHAHQAOAQgQAoQgPApgRAAQgjgEgLgdg","fc":"#F0E7D7"},"598":{"t":[53.5,24.2],"p":"AACBnQgXgEgRgHQgXgLgNgVQgLgSgCgaQgBgNABgHIAFgXIACgGIACgCQAPgMAbgQIAmgUQAcgMAQgFIAOgBQAGgBADACIAFACIAEAFQAJAJACASQABASgFAdQgGAXgHATQgKAZgKASQgIANgHAHQgGAHgGADQgEADgFABIgHADgAgmAAIgBAOQAAAOAFAJQAEAKAMAGQAIAFAPAEIAFgDIAMgOQALgPALgTQAKgRAGgUQAHgWgCgQQAAgJgEgFIAAgBIgBAAIABABIgBAAIgIABQgPAEgVAOQgQALgPAOQgTATgFAMIAEgIIgDALg","fc":"#1D2226"},"599":{"t":[54.8,24],"p":"AgvA5QgZgbAMgbIAOAHQARAHAPgCQAwgFAThWQAXAAgWBIQgWBGgbAJQgFACgIAAQgUAAgTgUg","fc":"#AA9D85"},"600":{"t":[54.4,24.3],"p":"Ag0AcIgEgwQASgaAngYQApgYAIANQARAcgWBFQgVBGgVABQgqgIgNgzg","fc":"#F0E7D7"},"601":{"t":[21.6,45],"p":"AACBAIgHgBIgIgDQgFgCgEgEIgKgNQgHgLgGgPQgGgMgDgMQgFgQAAgNQAAgKAEgHIACgCIAAgBIABgBIAAAAIABgBQADgCAEgBIAJAAQAKABASAFIAaAIQAUAHAKAFIABABIAEAGQADAHABAIIACAPQAAAQgGANQgJARgOAIQgLAGgQADIgCABgAgqgmQABASASAXQAIAKAJAHIAGAFQAFgDADgDQADgDABgEQACgFgCgGIgBgFIgCgFIAEAHQAAgIgLgLQgGgIgLgHQgMgHgLgDIgDAAQgCADABAFg","fc":"#1D2226"},"602":{"t":[21.4,44.9],"p":"AgkAJQgSgmAOgQQAGgHAiANQAgAOAQAOIgDAaQgLAdgjAEQgRgBgSgmg","fc":"#F0E7D7"},"603":{"t":[15.1,26.3],"p":"AgBBiIgKgDQgHgEgGgFQgHgGgKgNQgLgQgNgYQgJgSgIgXQgJgdAAgRQAAgRAHgLIACgDIABgBIABAAIABgCIADgBIAJgDIAOAAQAVAEAYAIQATAHAWAJQANAFAJAFQANAHAJAGIACACIADAGIAHAVQADANAAAHQABAZgKAVQgKAXgWAMQgSALgXAEIgBABgAhFg8QAAARAKAVQAHAQANASQANATAMANQAIAIAGAEIADADQAOgEALgHQAKgHAEgLQAEgKgCgOIgCgMIgFgMIAFAHQgHgMgUgPQgNgKgVgMQgYgMgOgCIgIgBIgBAAQgDAGAAAJg","fc":"#1D2226"},"604":{"t":[14.2,26.1],"p":"AARBSQgOgDgOgQQg9g/gBgvQAAgPAFgLIAGgJIAoAzQAvAtAxgSQgGAjgVAdQgKAOgKAHIgFACIgFgBg","fc":"#AA9D85"},"605":{"t":[14.4,25.8],"p":"Ag0ANQgdhAAUgZQAJgKA0AbQAvAaAXAXIgFAoQgPAsgyAGQgZgBgbhCg","fc":"#F0E7D7"},"606":{"t":[50.7,18.4],"p":"AjCEpIjYh4QgDgBgBgDIgBgFIABghIABgiIAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABgBIAPguIAAgBIAAAAQBQj0F5hmQAEgBAEACQCtBcBzCtIAAABQAfAtAbA2QACACgBADIgCAGIgEADIpUDXIgEAAIgEgBgAmKCSIgBARIDPByIJEjRQgWgrgZglIg1ASIAeAqQABAAAAABQAAAAAAABQAAABABAAQAAABAAAAIAAABIgCAGQgCADgDABIn3CwIgEABIgEgCIjHh3IgBAbgAmHBhIDLB6IBOgcIGYiPIgZgjIm1CmIgWAJIgEAAQgBAAAAAAQgBAAgBAAQAAAAAAAAQgBgBAAAAIi7h3gAg/jqQjiBbhKChIgMAeIC7B3IHLisIACgCIA9gXQgdgpggglQhbhoh3hBQhEATg6AYgAjDBrIiChTQgCgBgBgDIgBgFQAAgCACgDIAFgHQBxiiDUhJQASgHAUgFIAEgBIAEACIARALQBUA4A2BFQARAWAOAYIABAFQAAADgCADQgBACgDABImgCbIgEAAQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAgAAGjUQiiA5hmBwIgEAEQgXAZgUAbIB1BKIGQiUIgBAAQgKgSgNgQIAAABIgBgCQg4hHhZg5IgkAMg","fc":"#1D2226"},"607":{"t":[41.7,18.1],"p":"AktBkIAKgdIC7B3QAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFAAIAVgJIA2AMIhOAcgABgjRIAlgMQBYA5A5BHIABACIAAgBQAMAQAKASIjBh5QinAyhtBZQBnhwChg5g","fc":"#C7CDCF"},"608":{"t":[48.8,17.4],"p":"Al3CcIABgbIDHB3IAEACIAFgBIH2iwQAEgBACgDIABgGIAAgBIAhAGIogDHgAiRC9IG1imIAZAkImYCPgAlYAdQBKiiDihbQA4gYBGgSQB3BABbBoQhnhchoggIgRgLIgDgCIgFABQgTAFgTAIQg6AEhUAxQhUAxgXAVQgiAbgnA2IgDAfIgFAHQgCACAAACIABAGQABACADABICBBTQABAAABABQAAAAABAAQAAAAABAAQAAABABAAIAFgBIGfibQADgBACgCQABgDAAgDIApAJInPC0gAkeAXQAUgbAXgZIAEgEQBthZCngyIDBB5IABAAImPCUg","fc":"#9BA7AA"},"609":{"t":[50.5,20.6],"p":"AmJCNIAAgRIDPBvIIhjIIgigFQAAAAAAgBQAAgBAAAAQAAgBAAAAQgBgBAAAAIgegoIA1gUQAZAlAWArIpFDRgAl1AaIAMgcICwBxIHPi0IgogJIgBgFQgOgYgRgWQg2hFhUg4QBoAgBnBcQAgAlAcApIg8AXIgDACInKCsgAk9gxQAmg3AjgaQAXgWBUgwQBUgxA6gFQjUBJhyCkg","fc":"#686C72"},"610":{"t":[18,18.1],"p":"AgQCBIgMgOIgTgbQgSgbgPgcQgQgfgLgaQgHgQgDgPQgGgTAAgQQAAgKACgKIAEgLIAFgHIABgCIACgCQAFgFAJgDIALgCIASgBQAgACAhAIQAjAJAZAJQASAGAOAHQATAIAOALIgrArQgEgHgMgKQgLgIgNgHQgZgNgbgJQgjgKgWgCIgMAAIgEABIAAAAIgBAEIgBAKQAAAXAOAeQAMAaARAXQAPAZAUAWIASAUIAKAIIAFAEIgYA2QgJgGgIgJg","fc":"#1D2226"},"611":{"t":[16.4,17],"p":"AACBbQgSgOgPgWQgkg7gHg1QgEgcAEgPQAQAgAbAZQA0AwA4ghQgTA5gVAqQgLAVgHAJQgHgCgKgIg","fc":"#AA9D85"},"612":{"t":[16.1,16],"p":"Ag4ATQgwhaAaghQAMgPBAAcQA9AcAdAfQACAZgIAcQgQA9gtAdQgegBgvhbg","fc":"#F0E7D7"},"613":{"t":[35,59.6],"p":"AgQAbQgLgUgCgNQgBgMAGgGQAFgGAMABQANABAUAKIAEADIgUAXIgWAWg","fc":"#1D2226"},"614":{"t":[24.7,59.7],"p":"AAAAUIgUgVIgJgNIADgEQAVgKANgBQAMgBAFAGQAGAGgBAMQgDAPgLASIgDADIgNgKg","fc":"#1D2226"},"615":{"t":[60.6,44.2],"p":"AgdBGQgQgHgDgaQgDgZANgcQANgdAUgPQASgQARAHQAQAHADAaQACAZgMAbQgNAdgUAQQgMALgNAAQgFAAgFgCg","fc":"#000000"},"616":{"t":[59.7,45.4],"p":"AgdBGQgQgHgDgaQgCgZAMgcQANgdAUgPQATgQAQAHQAQAHADAaQADAZgNAbQgNAdgUAQQgMALgMAAQgGAAgFgCg","fc":"#514F40"},"617":{"t":[22.9,39],"p":"AgSgBQgZADgTAPQAXhFAzAQQAVAHAPAVQAPATAAAcQgggxgxAJg","fc":"#DBDDBC"},"618":{"t":[26.9,44.8],"p":"Ag4A0IAnhvQAYAMAYAbQAaAaAAATQAAAYgyAIQgQADgOAAQgWAAgLgIg","fc":"#605E4A"},"619":{"t":[16.2,45.1],"p":"AAPA5QgJgCgKgTQgNgTgGgVQgHgYACgQQADgPALADQAJACAKATQANATAGAVQAHAYgCAQQgDANgIAAIgDgBg","fc":"#000000"},"620":{"t":[16.8,46.1],"p":"AAQA5QgLgCgLgTQgOgSgHgWQgHgYAEgPQADgQALADQAMACALASQANATAIAWQAHAXgEAQQgDAOgJAAIgDgBg","fc":"#605E4A"},"621":{"t":[52,39.6],"p":"AhJGEQgmgLgpgUQhGgkg/g+QgOgNgjgUQgYgOgOgdQgohQAChSQABhXAShIQAYhaAzg4QA2g8BWgaQBEgXBcgBQBWgDBIAOQBaASA8AwQAgAaAYAlQAXAjANAoQAVBDAFBdIABAmQABAVgDAVQgDApgOApQgKAegeASQgoAXgOAQQg3BBhHAqQhPAvhPAKIgrABQgXgCgVgFgAgQlrQhYACg+AVQhNAagtA2QgtA0gSBQQgPBBACBUQABBGAlBFQANAYAUAKQAdAOAOANQAZAXAaAQQATAMAmATQAjASAgAIQAWAFAMABIAQAAIARgBQBBgHBFgoQBCglAwg4QAOgPAqgSQAigOAJgaQADgIALgSQAIgOABgNQADgVAAgQQABgTgBgRQgChZgSg9QgXhPg1grQgzgrhTgSQhBgNhHAAIgPAAg","fc":"#1D2226"},"622":{"t":[25.2,55],"p":"AgYAMIgSALQAOgwAdACQAeADANAsQgrgTgZAHg","fc":"#DBDDBC"},"623":{"t":[48.2,43.4],"p":"Ag4A0IAnhvQAYAMAZAaQAZAbAAATQAAAYgyAIQgPADgOAAQgXAAgLgIg","fc":"#605E4A"},"624":{"t":[57.9,25.9],"p":"AhNBCIA2iNQAgAPAiAiQAkAhgBAZQAAAehEAKQgWAEgTAAQgfAAgPgKg","fc":"#605E4A"},"625":{"t":[22.8,27.3],"p":"AhOBBIA2iMQAiAPAhAiQAkAhAAAZQAAAehFAKQgWAEgTAAQggAAgPgLg","fc":"#605E4A"},"626":{"t":[58.3,43.7],"p":"AhmFPQhsgJg7gxIgpgrQAUAMA0gEQBngHBUgnQEMiAgQmSQAagGAhA/QAhBDANBcQAgD1inBtQiaBkhlAAIgSgBg","fc":"#605E4A"},"627":{"t":[38.9,18.6],"p":"AjSCHQgUgxAohSQArhXBPghQBWgkBaADQBdADAQAsQAHAVhCAVQhuAigpAWQhKAlhSBUQgcAcgKAEIgHACQgJAAgHgQg","fc":"#DBDDBC"},"628":{"t":[51.8,39.2],"p":"AhfFtQg1gVh4hSQh3hTAAiaQAAi6BMhgQBdh2DaAAQDoAABZB2QBDBZAADBQAACeiDBTQiCBShWATQgoAJggAAQgkAAgcgLg","fc":"#989588"},"629":{"t":[54.2,73.6],"p":"AgTASIBNgEQAAAXgGATQgFARgMAVQgjgdgTgvgAiVAOIBTAFQgDAogYAcQglgdgTgsgABkACIBAgUQAJAggCARQgCAPgIATQgogSgVgtgAkXgqIBIAMQAGAhgOAgQgqgigWgrgADSg4IA4glQASArgFAxQgngQgegng","fc":"#F9DDAC"},"630":{"t":[53.5,73.4],"p":"AAsB9QgDAAgDgCQgughgZg3QgGAvgjAgQgEADgFABQgFAAgDgCQgygigYg1IAAgBIgBAAIAAgBIAAAAIAAgBIgBgBIAAgDIAAAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAgFIAAgBIgBAAIAAgBIAAgDIAAgBIAAgDIgBgBIAAAAIABgBIAAgBIAAAAIAAgCIAAgDIAAgBIAAgBQADgCAEAAIB1AHIAFACIAAAAIABABIABgBQACgBAEAAIBtgGIAAAAQADgFAFgBIBaggIACAAIAAAAIACADIABABIAAAAIABABIAAAAIAAABIACABIABACIAAABIABAAIABAAIABABIAAAAIAAABIAAAAIABAAIABABIABABIAAAAIAAABIABAAIABABIAAAAIACABIAAABIAAAAIAAABIACABQALApgDAUQgEAVgNAeQgDAFgFACQgEACgGgBQg0gRgbgyQgCAUgFAQQgIAagUAeQgBACgDACIgGABIgCAAgAgMAUQARAuAlAeQAMgVAFgRQAGgTAAgXgAhWBZQAYgcADgoIhTgFQATArAlAegABrAEQAVAtAoASQAIgUACgOQACgRgJghgAjLBIQgEAAgDgCQhHgzgahJQgCgFgFgfQgEgfAKAVQAKAWAGAFIBpASQAEAAADAEQADACABAFIACANIAAAAIAAABIAAACIAAACIAAADIAAABIAAAAIAAACIgBABIAAABIAAADIAAADIABABIgBABIAAAAIAAABIAAABIAAAAIAAABIAAABIABABIgBAAIAAACIABABIAAACIAAAAIAAAEIAAABIAAABIAAABIAAABIAAAAIAAABIABACIAAABIAAABIAAABIAAABQgEAagOAYIgFAGIgFABIgCAAgAjQAlQAOgggGghIhIgMQAWAqAqAjgAEkAdQgvgOgmgnIAAAAIAAAAIgBAAIAAgBIAAAAIAAgBIgBAAIAAgBIAAgBIAAAAIAAgBIgBgBIAAAAIgBAAIAAgBIAAgBIgBgBIAAAAIgBgBIAAgBIgBgCIgBgBIAAAAIgBgBIAAAAIAAgBIgBgBIAAAAIAAAAIgBgBIgBgBIAAAAIAAAAIgBgBIAAgBIgBAAIgBgBIAAgBIgBgBIAAgBIAAAAIAAgBIgBAAIAAgBIAAAAIgBAAIAAgBIAAgBIgCgCIgBgDIgBgBIAAAAIAAgBIgBAAIAAgCIAAAAQABgDADgCIBTg3QAEgCAEAAQAEAAAEABQAEACADAEQAgBCgPBGIgDAGQgDADgEABIgFAAIgEAAgADZg2QAeAmAnAQQAFgwgSgrg","fc":"#1D2226"},"631":{"t":[75,24.6],"p":"AgVAwQgUgdgNgjQgKgigDgzIAAgBIA7ABIAAAAQABASAEAZQAIAsAUAbQASAZAZANIgcA1QgmgVgXgjg","fc":"#1D2226"},"632":{"t":[80.8,20.8],"p":"AgnBXQACABAFgFIAMgIIAUgUQAWgXASgYQAUgXANgaQARggABgUIgBgKIAAgBIgHAAIgOACQgVAEglANQgfAOgWANIgYARQgNAKgFAIIgrgqQAMgKAVgLIAfgOQAdgMAigKQAggLAfgFQALgCAHAAQAPAAAIADIAJAEIACACIAEAFIADAGIACAGQAEAKgBAMQAAAQgHAUQgHAUgGAMQgMAYgUAhQgTAcgTAaIgWAbIgNANQgHAJgJAFg","fc":"#1D2226"},"633":{"t":[81.4,19.7],"p":"AgkBQQglgigSg5QA9AqBBg8QAigfAVgoQAEAPgEAcQgHA2gkA6QgPAWgUAPIgPAJQgPgEgSgRg","fc":"#AA9D85"},"634":{"t":[83.2,18.7],"p":"AhRAVIgGg1QAdgfA9gcQBAgcAMAPQAaAhgwBaQguBbgfABQgtgdgQg9g","fc":"#F0E7D7"},"635":{"t":[44.1,45.1],"p":"AAGBAQgOgBgMgGQgQgHgJgOQgIgMgCgSIAAgNQAAgHACgIIAEgHIABgBIAQgIIAOgGIAYgKQARgGAKgCIAIgBQADAAADACIABABIABABIACACQAEAFABAKQABAWgIAfQgFASgFAJIgIANIgIAIIgHADIgIACgAgHgBIgBAFQgBAGACAFQABAEAEAEQAEADAHACIAGgGQAIgIAHgLQAQgagBgTQAAgFgDgEIgBgBIAAAAIgFABQgJADgMAKQgLAJgFAJQgJANABAHIAEgHg","fc":"#1D2226"},"636":{"t":[44.9,44.6],"p":"AgpARIgDgaQAQgPAcgOQAggQAHAHQAOAQgQAoQgPApgRAAQgjgEgLgdg","fc":"#F0E7D7"},"637":{"t":[54,25.5],"p":"AACBnQgXgEgRgHQgXgLgNgVQgLgSgCgaQgBgNABgHIAFgXIACgGIACgCQAPgMAbgQIAmgUQAcgMAQgFIAOgBQAGgBADACIAFACIAEAFQAJAJACASQABASgFAdQgGAXgHATQgKAZgKASQgIANgHAHQgGAHgGADQgEADgFABIgHADgAgmAAIgBAOQAAAOAFAJQAEAKAMAGQAIAFAPAEIAFgDIAMgOQALgPALgTQAKgRAGgUQAHgWgCgQQAAgJgEgFIAAgBIgBAAIABABIgBAAIgIABQgPAEgVAOQgQALgPAOQgTATgFAMIAEgIIgDALg","fc":"#1D2226"},"638":{"t":[55.3,25.3],"p":"AgvA5QgZgbAMgbIAOAHQARAHAPgCQAwgFAThWQAXAAgWBIQgWBGgbAJQgFACgIAAQgUAAgTgUg","fc":"#AA9D85"},"639":{"t":[54.9,25.6],"p":"Ag0AcIgEgwQASgaAngYQApgYAIANQARAcgWBFQgVBGgVABQgqgIgNgzg","fc":"#F0E7D7"},"640":{"t":[22.1,46.3],"p":"AACBAIgHgBIgIgDQgFgCgEgEIgKgNQgHgLgGgPQgGgMgDgMQgFgQAAgNQAAgKAEgHIACgCIAAgBIABgBIAAAAIABgBQADgCAEgBIAJAAQAKABASAFIAaAIQAUAHAKAFIABABIAEAGQADAHABAIIACAPQAAAQgGANQgJARgOAIQgLAGgQADIgCABgAgqgmQABASASAXQAIAKAJAHIAGAFQAFgDADgDQADgDABgEQACgFgCgGIgBgFIgCgFIAEAHQAAgIgLgLQgGgIgLgHQgMgHgLgDIgDAAQgCADABAFg","fc":"#1D2226"},"641":{"t":[21.9,46.1],"p":"AgkAJQgSgmAOgQQAGgHAiANQAgAOAQAOIgDAaQgLAdgjAEQgRgBgSgmg","fc":"#F0E7D7"},"642":{"t":[15.6,27.5],"p":"AgBBiIgKgDQgHgEgGgFQgHgGgKgNQgLgQgNgYQgJgSgIgXQgJgdAAgRQAAgRAHgLIACgDIABgBIABAAIABgCIADgBIAJgDIAOAAQAVAEAYAIQATAHAWAJQANAFAJAFQANAHAJAGIACACIADAGIAHAVQADANAAAHQABAZgKAVQgKAXgWAMQgSALgXAEIgBABgAhFg8QAAARAKAVQAHAQANASQANATAMANQAIAIAGAEIADADQAOgEALgHQAKgHAEgLQAEgKgCgOIgCgMIgFgMIAFAHQgHgMgUgPQgNgKgVgMQgYgMgOgCIgIgBIgBAAQgDAGAAAJg","fc":"#1D2226"},"643":{"t":[14.7,27.3],"p":"AARBSQgOgDgOgQQg9g/gBgvQAAgPAFgLIAGgJIAoAzQAvAtAxgSQgGAjgVAdQgKAOgKAHIgFACIgFgBg","fc":"#AA9D85"},"644":{"t":[14.9,27],"p":"Ag0ANQgdhAAUgZQAJgKA0AbQAvAaAXAXIgFAoQgPAsgyAGQgZgBgbhCg","fc":"#F0E7D7"},"645":{"t":[50.5,20.6],"p":"AmJCNIABgRIDOBvIIhjIIghgFIgCgEIgegoIA1gUQAZAlAWArIpEDRgAl1AaIAMgcICwBxIHPi0IgogJQAAgDgBgCQgOgYgRgWIAAAAQg2hFhUg4QBnAgBoBcQAgAlAdApIg9AXIgCACInLCsgAk9gxQAmg2AjgbQAXgWBUgwQBUgxA6gFQjUBJhxCkg","fc":"#686C72"},"646":{"t":[41.7,18.1],"p":"AktBkIAKgdIC7B3IAEABIAEAAIAWgJIA3AMIhPAcgABgjRIAlgMQBYA5A4BHIACACIAAgBQAMARAKARIjBh5QinAyhtBZQBnhwChg5g","fc":"#C7CDCF"},"647":{"t":[48.7,17.4],"p":"Al3CcIABgbIDHB4IAEABIAEAAIH3ixQADgBACgDQACgCAAgDIAAgBIAhAFIogDIgAiRC+IG1inIAZAkImXCPgAlXAdQBJiiDihbQA5gYBFgTQB4BBBbBpQhohdhoggIgRgLIgDgBIgBAAIgEAAIgmAMQg5AGhVAwQhUAxgWAVQgjAbgnA3IgDAdIgFAIIgCAFIABAFIAEAEICCBSIAEACIAFgBIGfibQADgBACgCQABgCABgDIAAgBIAoAJInPC1gAkeAXQAUgaAXgaIAEgEQBthZCngyIDCB5IAAAAImPCVg","fc":"#9BA7AA"},"648":{"t":[50.7,18.4],"p":"Ai+ErIgEgCIjYh4IgEgDQgBgDAAgDIABghIABghIAAgBIACgFIAOgtIABgBIAAgBIAAAAQBQj0F5hmQAEgBADACQCuBcByCtIABABQAfAtAbA2QACADgBADQAAACgCADQgCACgCABIpUDXIgDABIgBAAgAmLCSIAAARIDOBzIJFjSQgWgrgZglIg1ASIAeAqIACAFIAAABQAAADgCACQgCADgDABIn3CxIgEAAIgFgBIjHh4IgBAbgAmHBhIDLB6IBOgbIGYiPIgagkIm0CnIgWAIIgEABIgFgCIi6h3gAhAjqQjhBbhKCiIgMAdIC7B4IHKitIADgBIA8gXQgcgqgggkQhbhph3hBQhEATg7AYgAi+BtIgFgCIiChSIgDgEIgBgFIABgFIAFgIQByihDUhKIAmgMIAEAAIAAAAIAEABIARALQBUA4A2BFIAAABQARAVAOAYQABACAAADIAAABQAAADgCACQgCACgCABImgCbIgEABIAAAAgAAGjUQiiA5hnBwIgDAEQgXAagUAaIB1BLIGPiVIAAAAQgKgRgNgQIAAAAIgBgCQg4hHhZg5IgkAMg","fc":"#1D2226"},"649":{"t":[35.2,60.6],"p":"AgQAbQgLgUgCgNQgBgMAGgGQAFgGAMABQANABAUAKIAEADIgUAXIgWAWg","fc":"#1D2226"},"650":{"t":[24.9,60.7],"p":"AAAAUIgUgVIgJgNIADgEQAVgKANgBQAMgBAFAGQAGAGgBAMQgDAPgLASIgDADIgNgKg","fc":"#1D2226"},"651":{"t":[60.8,45.2],"p":"AgdBGQgQgHgDgaQgDgZANgcQANgdAUgPQASgQARAHQAQAHADAaQACAZgMAbQgNAdgUAQQgMALgNAAQgFAAgFgCg","fc":"#000000"},"652":{"t":[59.9,46.4],"p":"AgdBGQgQgHgDgaQgCgZAMgcQANgdAUgPQATgQAQAHQAQAHADAaQADAZgNAbQgNAdgUAQQgMALgMAAQgGAAgFgCg","fc":"#514F40"},"653":{"t":[23.1,40],"p":"AgSgBQgZADgTAPQAXhFAzAQQAVAHAPAVQAPATAAAcQgggxgxAJg","fc":"#DBDDBC"},"654":{"t":[27.1,45.8],"p":"Ag4A0IAnhvQAYAMAYAbQAaAaAAATQAAAYgyAIQgQADgOAAQgWAAgLgIg","fc":"#605E4A"},"655":{"t":[16.4,46.1],"p":"AAPA5QgJgCgKgTQgNgTgGgVQgHgYACgQQADgPALADQAJACAKATQANATAGAVQAHAYgCAQQgDANgIAAIgDgBg","fc":"#000000"},"656":{"t":[17,47.1],"p":"AAQA5QgLgCgLgTQgOgSgHgWQgHgYAEgPQADgQALADQAMACALASQANATAIAWQAHAXgEAQQgDAOgJAAIgDgBg","fc":"#605E4A"},"657":{"t":[52,41.3],"p":"Ag8GVQgmgKgpgVQhGgkg/g9Ig3gzQgdgdgQgfQgohRAChSQABhXAShHQAYhaAzg5QA2g7BWgbQBEgWBcgCQBWgCBIAOQBaASA8AwQAgAZAYAlQAXAkANAnQAVBEAFBdIABAmQABAUgDAWQgDApgOAoQgMAjgWAfIgvA5Qg3BAhHArQhPAvhPAJIgrACQgXgCgVgGgAgQl9QhYADg+AVQhNAagtA1QgtA0gSBQQgPBCACBTQABBHAlBEQAPAcAZAYQAPAOAiAeQAZAXAaARQATAMAmATQAjARAgAJQAWAFAMAAIAQABIAPgBQBDgHBFgoQBCgmAwg3QARgTAgggQAbgdAKgcQADgIALgTQAIgNABgOQADgVAAgPQABgSgBgTQgChZgSg9QgXhOg1gsQgzgrhTgRQhBgOhHAAIgPAAg","fc":"#1D2226"},"658":{"t":[25.4,56],"p":"AgYAMIgSALQAOgwAdACQAeADANAsQgrgTgZAHg","fc":"#DBDDBC"},"659":{"t":[48.4,44.4],"p":"Ag4A0IAnhvQAYAMAZAaQAZAbAAATQAAAYgyAIQgPADgOAAQgXAAgLgIg","fc":"#605E4A"},"660":{"t":[58.1,26.9],"p":"AhNBCIA2iNQAgAPAiAiQAkAhgBAZQAAAehEAKQgWAEgTAAQgfAAgPgKg","fc":"#605E4A"},"661":{"t":[23,28.3],"p":"AhOBBIA2iMQAiAPAhAiQAkAhAAAZQAAAehFAKQgWAEgTAAQggAAgPgLg","fc":"#605E4A"},"662":{"t":[75,21.5],"p":"AgVAwQgUgdgNgjQgKgigDgzIAAgBIA7ABIAAAAQABASAEAZQAIAsAUAbQASAZAZANIgcA1QgmgVgXgjg","fc":"#1D2226"},"663":{"t":[80.8,17.7],"p":"AgnBXQACABAFgFIAMgIIAUgUQAWgXASgYQAUgXANgaQARggABgUIgBgKIAAgBIgHAAIgOACQgVAEglANQgfAOgWANIgYARQgNAKgFAIIgrgqQAMgKAVgLIAfgOQAdgMAigKQAggLAfgFQALgCAHAAQAPAAAIADIAJAEIACACIAEAFIADAGIACAGQAEAKgBAMQAAAQgHAUQgHAUgGAMQgMAYgUAhQgTAcgTAaIgWAbIgNANQgHAJgJAFg","fc":"#1D2226"},"664":{"t":[81.4,16.6],"p":"AgkBQQglgigSg5QA9AqBBg8QAigfAVgoQAEAPgEAcQgHA2gkA6QgPAWgUAPIgPAJQgPgEgSgRg","fc":"#AA9D85"},"665":{"t":[83.2,15.6],"p":"AhRAVIgGg1QAdgfA9gcQBAgcAMAPQAaAhgwBaQguBbgfABQgtgdgQg9g","fc":"#F0E7D7"},"666":{"t":[44.1,42],"p":"AAGBAQgOgBgMgGQgQgHgJgOQgIgMgCgSIAAgNQAAgHACgIIAEgHIABgBIAQgIIAOgGIAYgKQARgGAKgCIAIgBQADAAADACIABABIABABIACACQAEAFABAKQABAWgIAfQgFASgFAJIgIANIgIAIIgHADIgIACgAgHgBIgBAFQgBAGACAFQABAEAEAEQAEADAHACIAGgGQAIgIAHgLQAQgagBgTQAAgFgDgEIgBgBIAAAAIgFABQgJADgMAKQgLAJgFAJQgJANABAHIAEgHg","fc":"#1D2226"},"667":{"t":[44.9,41.5],"p":"AgpARIgDgaQAQgPAcgOQAggQAHAHQAOAQgQAoQgPApgRAAQgjgEgLgdg","fc":"#F0E7D7"},"668":{"t":[54,22.4],"p":"AACBnQgXgEgRgHQgXgLgNgVQgLgSgCgaQgBgNABgHIAFgXIACgGIACgCQAPgMAbgQIAmgUQAcgMAQgFIAOgBQAGgBADACIAFACIAEAFQAJAJACASQABASgFAdQgGAXgHATQgKAZgKASQgIANgHAHQgGAHgGADQgEADgFABIgHADgAgmAAIgBAOQAAAOAFAJQAEAKAMAGQAIAFAPAEIAFgDIAMgOQALgPALgTQAKgRAGgUQAHgWgCgQQAAgJgEgFIAAgBIgBAAIABABIgBAAIgIABQgPAEgVAOQgQALgPAOQgTATgFAMIAEgIIgDALg","fc":"#1D2226"},"669":{"t":[55.3,22.2],"p":"AgvA5QgZgbAMgbIAOAHQARAHAPgCQAwgFAThWQAXAAgWBIQgWBGgbAJQgFACgIAAQgUAAgTgUg","fc":"#AA9D85"},"670":{"t":[54.9,22.5],"p":"Ag0AcIgEgwQASgaAngYQApgYAIANQARAcgWBFQgVBGgVABQgqgIgNgzg","fc":"#F0E7D7"},"671":{"t":[22.1,43.2],"p":"AACBAIgHgBIgIgDQgFgCgEgEIgKgNQgHgLgGgPQgGgMgDgMQgFgQAAgNQAAgKAEgHIACgCIAAgBIABgBIAAAAIABgBQADgCAEgBIAJAAQAKABASAFIAaAIQAUAHAKAFIABABIAEAGQADAHABAIIACAPQAAAQgGANQgJARgOAIQgLAGgQADIgCABgAgqgmQABASASAXQAIAKAJAHIAGAFQAFgDADgDQADgDABgEQACgFgCgGIgBgFIgCgFIAEAHQAAgIgLgLQgGgIgLgHQgMgHgLgDIgDAAQgCADABAFg","fc":"#1D2226"},"672":{"t":[21.9,43],"p":"AgkAJQgSgmAOgQQAGgHAiANQAgAOAQAOIgDAaQgLAdgjAEQgRgBgSgmg","fc":"#F0E7D7"},"673":{"t":[15.6,24.4],"p":"AgBBiIgKgDQgHgEgGgFQgHgGgKgNQgLgQgNgYQgJgSgIgXQgJgdAAgRQAAgRAHgLIACgDIABgBIABAAIABgCIADgBIAJgDIAOAAQAVAEAYAIQATAHAWAJQANAFAJAFQANAHAJAGIACACIADAGIAHAVQADANAAAHQABAZgKAVQgKAXgWAMQgSALgXAEIgBABgAhFg8QAAARAKAVQAHAQANASQANATAMANQAIAIAGAEIADADQAOgEALgHQAKgHAEgLQAEgKgCgOIgCgMIgFgMIAFAHQgHgMgUgPQgNgKgVgMQgYgMgOgCIgIgBIgBAAQgDAGAAAJg","fc":"#1D2226"},"674":{"t":[14.7,24.2],"p":"AARBSQgOgDgOgQQg9g/gBgvQAAgPAFgLIAGgJIAoAzQAvAtAxgSQgGAjgVAdQgKAOgKAHIgFACIgFgBg","fc":"#AA9D85"},"675":{"t":[14.9,23.9],"p":"Ag0ANQgdhAAUgZQAJgKA0AbQAvAaAXAXIgFAoQgPAsgyAGQgZgBgbhCg","fc":"#F0E7D7"},"676":{"t":[50.8,17.3],"p":"AjCEpIjYh4QgDgBgBgDIgBgFIABghIABgiIAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABgBIAPguIAAgBIAAAAQBQj0F5hmQAEgBAEACQCtBcBzCtIAAABQAfAtAbA2QACACgBADIgCAGIgEADIpUDXIgEAAIgEgBgAmKCSIgBARIDPByIJEjRQgWgrgZglIg1ASIAeAqQABAAAAABQAAAAAAABQAAABABAAQAAABAAAAIAAABIgCAGQgCADgDABIn3CwIgEABIgEgCIjHh3IgBAbgAmHBhIDLB6IBOgcIGYiPIgZgjIm1CmIgWAJIgEAAQgBAAAAAAQgBAAgBAAQAAAAAAAAQgBgBAAAAIi7h3gAg/jqQjiBbhKChIgMAeIC7B3IHLisIACgCIA9gXQgdgpggglQhbhoh3hBQhEATg6AYgAjDBrIiChTQgCgBgBgDIgBgFQAAgCACgDIAFgHQBxiiDUhJQASgHAUgFIAEgBIAEACIARALQBUA4A2BFQARAWAOAYIABAFQAAADgCADQgBACgDABImgCbIgEAAQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAgAAGjUQiiA5hmBwIgEAEQgXAZgUAbIB1BKIGQiUIgBAAQgKgSgNgQIAAABIgBgCQg4hHhZg5IgkAMg","fc":"#1D2226"},"677":{"t":[41.8,17],"p":"AktBkIAKgdIC7B3QAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAEAAIAXgJIA2AMIhPAcgABgjRIAlgMQBYA5A5BHIABACIAAgBQAMAQAKASIjBh5QinAyhtBZQBmhwCig5g","fc":"#C7CDCF"},"678":{"t":[48.9,16.3],"p":"Al3CcIABgbIDHB3IAEACIAEgBIH3iwQADgBADgDIABgFIAAgBIAhAEIogDIgAiQC+IG0inIAZAjImXCQgAlYAdQBKiiDihbQA5gYBFgSQB4BABaBpQhnhdhoggIgRgLIgEgCIgDABQgVAFgSAIQg6AFhUAwQhTAwgYAWQgiAagnA4IgDAdIgFAIQgCACAAACIABAGQABACADABICBBTQABAAABABQAAAAABAAQAAAAABAAQAAABABAAIAEgBIGgibQADAAACgDQABgCAAgEIApAJInPC1gAkeAXQAUgaAXgaIAEgEQBthZCngyIDBB5IABAAImPCUg","fc":"#9BA7AA"},"679":{"t":[50.6,19.5],"p":"AmJCNIAAgRIDPBvIIgjIIghgFQAAAAAAgBQAAgBAAAAQAAgBAAAAQgBgBAAAAIgegoIA1gUQAZAlAWArIpFDRgAl1AaIAMgcICwBxIHPi0IgogJIgBgFQgOgYgRgWQg2hFhUg4QBnAgBoBcQAgAlAdApIg9AXIgCACInLCsgAk9gxQAmg3AjgaQAXgWBUgwQBUgxA6gFQjUBJhyCkg","fc":"#686C72"},"680":{"t":[18.2,16.1],"p":"AgQCBIgMgOIgTgbQgSgbgPgcQgQgfgLgaQgHgQgDgPQgGgTAAgQQAAgKACgKIAEgLIAFgHIABgCIACgCQAFgFAJgDIALgCIASgBQAgACAhAIQAjAJAZAJQASAGAOAHQATAIAOALIgrArQgEgHgMgKQgLgIgNgHQgZgNgbgJQgjgKgWgCIgMAAIgEABIAAAAIgBAEIgBAKQAAAXAOAeQAMAaARAXQAPAZAUAWIASAUIAKAIIAFAEIgYA2QgJgGgIgJg","fc":"#1D2226"},"681":{"t":[16.5,14.9],"p":"AACBbQgSgOgPgWQgkg7gHg1QgEgcAEgPQAQAgAbAZQA0AwA4ghQgTA5gVAqQgLAVgHAJQgHgCgKgIg","fc":"#AA9D85"},"682":{"t":[16.3,13.9],"p":"Ag4ATQgwhaAaghQAMgPBAAcQA9AcAdAfQACAZgIAcQgQA9gtAdQgegBgvhbg","fc":"#F0E7D7"},"683":{"t":[35.2,57],"p":"AgQAbQgLgUgCgNQgBgMAGgGQAFgGAMABQANABAUAKIAEADIgUAXIgWAWg","fc":"#1D2226"},"684":{"t":[24.9,57.2],"p":"AAAAUIgUgVIgJgNIADgEQAVgKANgBQAMgBAFAGQAGAGgBAMQgDAPgLASIgDADIgNgKg","fc":"#1D2226"},"685":{"t":[60.8,43.8],"p":"AgdBGQgQgHgDgaQgDgZANgcQANgdAUgPQASgQARAHQAQAHADAaQACAZgMAbQgNAdgUAQQgMALgNAAQgFAAgFgCg","fc":"#000000"},"686":{"t":[59.9,45],"p":"AgdBGQgQgHgDgaQgCgZAMgcQANgdAUgPQATgQAQAHQAQAHADAaQADAZgNAbQgNAdgUAQQgMALgMAAQgGAAgFgCg","fc":"#514F40"},"687":{"t":[19.3,38.3],"p":"AgSgBQgZADgTAPQAXhFAzAQQAVAHAPAVQAPATAAAcQgggxgxAJg","fc":"#DBDDBC"},"688":{"t":[27.1,43.6],"p":"Ag4A0IAnhvQAYAMAYAbQAaAaAAATQAAAYgyAIQgQADgOAAQgWAAgLgIg","fc":"#605E4A"},"689":{"t":[16.4,44.8],"p":"AAPA5QgJgCgKgTQgNgTgGgVQgHgYACgQQADgPALADQAJACAKATQANATAGAVQAHAYgCAQQgDANgIAAIgDgBg","fc":"#000000"},"690":{"t":[17,45.8],"p":"AAQA5QgLgCgLgTQgOgSgHgWQgHgYAEgPQADgQALADQAMACALASQANATAIAWQAHAXgEAQQgDAOgJAAIgDgBg","fc":"#605E4A"},"691":{"t":[52.1,36.9],"p":"AhdFsQh0gMhBgnQgIgFgWgUQgVgSgRgJQgwgXgWhCQgLgjgCgfQgCgiAIgqIAOhPQAHgwAGgZQAYhWA0g2QA2g5BWgaQBEgVBbgCQBXgCBHANQBbASA7AtQAgAZAZAjQAWAiANAmQALAgADAtIACBNIABAkQADAYAKAmQAMAqACAnQACAnhJAyQgnAbgmARQgrATgzAMQhtAZhFAIIgWABQgjAAgrgFgAgQlSQhYACg+AUQhOAZgtA0QgtAxgSBNQgGAagCAoIgEBHIgHBmQgDAjBRAyIAXAVQASARAUAKQAzAYAuADQAvADBVgCQB1gCAxgOQAYgHAjgNIBEgZIA1gZIAHghQAJgsgCgpIgDg3QABgTgBgQIAAhIQAAgqgJgdQgYhMg1gpQgzgphTgRQhCgNhKAAIgKAAg","fc":"#1D2226"},"692":{"t":[25.4,52.4],"p":"AgYAMIgSALQAOgwAdACQAeADANAsQgrgTgZAHg","fc":"#DBDDBC"},"693":{"t":[48.4,43.3],"p":"Ag4A0IAnhvQAYAMAZAaQAZAbAAATQAAAYgyAIQgPADgOAAQgXAAgLgIg","fc":"#605E4A"},"694":{"t":[58.1,25],"p":"AhNBCIA2iNQAgAPAiAiQAkAhgBAZQAAAehEAKQgWAEgTAAQgfAAgPgKg","fc":"#605E4A"},"695":{"t":[22.7,25.8],"p":"AhOBBIA2iMQAiAPAhAiQAkAhAAAZQAAAehFAKQgWAEgTAAQggAAgPgLg","fc":"#605E4A"},"696":{"t":[58.7,40],"p":"Ag4E0QiGgHhIgMQhUgrANgjQBkAaBLgEQBLgFCNg/QCPhAgEmYQAagGAhA/QAhBDAnCvQAmCtiRBLQiEBFh6AAIgXgBg","fc":"#605E4A"},"697":{"t":[39.1,17.9],"p":"AjSCHQgUgxAohSQArhXBPghQBWgkBaADQBdADAQAsQAHAVhCAVQhuAigpAWQhKAlhSBUQgcAcgKAEIgHACQgJAAgHgQg","fc":"#DBDDBC"},"698":{"t":[51.8,36.6],"p":"Ai6FHQh5gggogtQgogtAAibQAAi6BMhgQBdh1DagBQDoAABZB2QBDBZAADBQAACfhxBAQhwBBhzAKQgcADgbAAQhXAAhcgYg","fc":"#989588"},"699":{"t":[51,69.1],"p":"AArBJQhBAZg4ghQg4ASgegTIgBAAQgdgSgggaQgXgJgPAEQgDABgDAAIgFgCQgzgmgGgvQgBgEABgDQACgDADgCQADgCAEABIKDApQAEAAAEADQADADAAAFQAAAEgDAEQgZAdgnAMQgcA0gpgIIgBAAQgSgFgTAAQgOAUgkAHQgKACgKAAQgZAAgWgMgAAzAyQAZAQAegFQAcgGAJgQIAEgEQADgCADAAQAagBAYAGIgBAAQAbADAUgmQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAgBABAAQABAAAAAAQAXgHARgOIpagmQAKAcAfAaQAVgEAcAKIADABQAgAaAcASIAAgBQAaAOAugRIAGgBIAFACQAzAhA7gaIAFgBQADAAADACg","fc":"#1D2226"},"700":{"t":[50.4,69.2],"p":"AA4AyQgCgCgDAAIgGABQg7AZgzggIgFgCIgFABQgvARgZgOIAAAAQgdgRgfgaIgDgBQgdgLgUAEQgggZgKgdIJbAnQgSAOgWAGQgBAAAAABQgBAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAABgBAAQAAABAAAAQgUAngcgDIABAAQgYgGgaABQgDAAgCACIgEAEQgKAPgcAGIgPACQgVAAgTgMg","fc":"#E7634A"},"701":{"t":[54.9,74.5],"p":"AgUATIBRgEQAAAYgGAUQgGASgMAVQglgfgUgwgAicAPIBXAFQgDAqgZAdQgngfgUgtgABpACIBDgVQAJAigCASQgCAPgJAVQgqgUgVgvgAkkgsIBLAMQAGAjgOAiQgsgkgXgtgADcg6IA7gnQATAtgGAzQgogRgggog","fc":"#F9DDAC"},"702":{"t":[54.2,74.3],"p":"AAuCDQgDAAgDgCQgxgigZg6QgGAxglAiQgFADgEABQgGAAgEgCQgzgkgag4IAAAAIAAgBIAAAAIgBgBIAAgBIAAAAIAAgDIgBgBIAAgBIABgBIAAgBIAAgBIgBgBIAAgFIAAgBIAAgBIAAgBIAAgDIgBAAIAAgEIgBAAIAAgBIABgBIAAgBIAAAAIAAgCIAAgDIAAgBIABgBQADgCAEAAIB6AHQADAAADACIAAAAIAAABIABgBQADgBAEAAIBygGIAAAAQADgFAFgBIBegiIADAAIAAAAIABADIABABIABAAIAAABIAAAAIABABQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAAAIABADIAAAAIABABIABAAIABAAIAAABIABAAIAAABIABAAIABABIAAAAIABABIAAAAIAAAAIABABIABABIABABIAAAAIABABIAAAAIABACQAMArgDAVQgFAWgNAgQgDAEgFADQgFABgGgBQg2gRgdg0QgCAUgFARQgJAbgUAgQgBACgDACIgHABIgCAAgAgNAVQATAwAmAfQANgVAFgSQAHgUAAgYgAhZBdQAYgdADgqIhXgFQAVAtAnAfgABxAEQAVAvAqAUQAJgVACgPQABgSgJgigAjVBMQgDAAgEgDQhKg1gchNQgCgEgFghQgEghAKAXQALAXAGAEIBuATQAEABAEADQADADABAFIACANIAAABIAAABIAAABIAAADIAAADIAAABIAAABIAAACIgBAAIAAACIAAADIAAADIABABIgBAAIAAABIAAABIAAABIAAAAIAAABIAAABIABABIgBAAIAAACIABABIAAACIAAAAIAAAFIAAABIAAABIAAAAIAAABIAAABIAAABIABABIAAABIAAACIAAABIAAAAQgEAcgPAZIgFAHIgGABIgCAAgAjZAnQAOgigHgjIhLgMQAYAtAsAkgAEyAeQgxgPgogoIAAgBIgBAAIAAAAIAAgBIAAAAIgBgBIAAAAIAAgBIAAgBIAAAAIgBgBIAAgBIgBAAIAAAAIAAgBIgBgBIAAgBIgBAAIAAgCIgCgBIAAgCIgBAAIAAgBIAAAAIgBgBIAAgBIAAAAIgBAAIgBgBIAAgBIgBAAIAAAAIgBgBIAAgBIAAAAIgCgBIAAgBIAAgBIAAgBIgBAAIAAgBIAAAAIAAgBIgBAAIAAgBIAAAAIgBgBIgCgDIgBgCIgBgCIAAAAIAAAAIgBgBIAAgBQABgEADgCIBXg6QAEgCAEAAIAJABQAEACADAFQAiBEgQBKIgEAHQgDACgEABIgFABIgEgBgADkg4QAfAoApAQQAFgygSgtg","fc":"#1D2226"},"703":{"t":[16.5,22.7],"p":"AAsBpQg6gGgvgbQgMgGgMgJIgWgSQgUgTgSgUQgJgOgFgLQgGgRACgOQACgOAJgOQAIgLALgKIAHAIQgVAWgBAVQAAAUATAWQAQAQAVARIAsAbIAwASIAWAIQAQAEAJABQAvAGAxgOQACgMAAgMIgCgPIgEgQIARgFIAGARQACAJABAJQABASgEATIgBAFIgGACQguAQgtAAIgUgBg","fc":"#1D2226"},"704":{"t":[22.3,12.5],"p":"AAcAwQgXgGgWgSQgYgRgLgSQgMgTAIgLQAHgKAXAFQAWAFAWASQAYARAMASQALAUgHAKQgGAHgMAAIgMgBg","fc":"#C7CDCF"},"705":{"t":[22.1,16.6],"p":"AAfBZQgLgHgRgVQgPgVgLgHQgSARglgOQgngPAXghQgQggAMgbQAPgjAZAAQBeABAvBbQAQAeAEAfQAEAegJACQACAVgSAGIgJABQgSAAgYgSg","fc":"#9BA7AA"},"706":{"t":[18,16.2],"p":"AgZBYQgkgPgdgUQgbgSABgGQgPgRgCgXQgEgzBAgpQANgIAjAEQAnAEAjATQBkA0gRB7QgbATgmAAQgoAAg0gWg","fc":"#686C72"},"707":{"t":[25.8,29.7],"p":"AgXgQIA1gFIgFAqIg2ABg","fc":"#CC911B"},"708":{"t":[12.8,26.5],"p":"AgZAHIgkgfIAKgPIBqAuIAFAHQAEALgEAPIgBAAQgqAAgqghg","fc":"#FFF2DC"},"709":{"t":[16.9,22.8],"p":"AAYBXQh3gRhAhqIAEgaQAGgaALgCQAoBiBqAdQBAARBPgKQAHAFABALQABANgMAGQgeAMgqAAQgYAAgcgEg","fc":"#F9D180"},"710":{"t":[20.3,69.9],"p":"AA5KwQgGgTAHgpIAAAAQBRnuismyQhXjZhmh3IgYgcIB3g5IAoAaQgQgcAJAJIABABIACACIABACQDeFDBLEpIAAAAQBZFfhsFnIgBABIAAACQgkBTgiALIgGACIgCAAIgCAAIgNACQgcAAgJgigABpKYIABAAIgIABIgBAAIAAABQARASgDgLQgCgJADgQQgHAKgGAFIgCACIABgBIABAAIADAAgABxJ+IgBAKQAKgQANgeIAAAAQBmlWhVlPQhHkYjNkxIgQAIIgRAIQBfB4BPDLQCzG+hSH7IAAAFIgBAAg","fc":"#1D2226"},"711":{"t":[51.9,15.8,1.139,1.139],"p":"AgXA6QgEgBgCgCIgCgDIgEgGIgGgTQgJgaAAgXQAAgQAEgMIADgIIAIABQAjAGAVAUQAPANAMAWQADAFAAAGQAAAFgDAFQgCAFgEAEQgGAHgLAGQgWAMgSAAgAgegWQAAAbALAaIADAIIABAAQAKAAAJgFQAMgEAIgGIAGgHIABgCIAAgBQgLgTgNgLQgOgOgWgFIgBANg","fc":"#1D2226"},"712":{"t":[52,15.8,1.139,1.139],"p":"AgWAwQgFAAgHgiQgIgkAGgZQAgAIAVATQAWASABAPQAAAQgXAKQgRAJgUAAIgCAAg","fc":"#F9DDAC"},"713":{"t":[52.7,36.2,1,1,0,0,0,0.3,-1.9],"p":"AhgF8QhygIhBgnQgMgIgUgaIgigwIghgsQgUgdgJgbQgMgigBgfQgDghAJgpIANhPQAHgvAGgZQAYhUAyg2QA1g4BUgZQBCgVBZgCQBVgCBFANQBZARA6AtQAfAYAYAjQAWAiAMAlQALAgADAsIACBMIABAkQADAXAKAmQALApAEAoQAEAngdAfQgeAehHAzQhGAzgqAKQgqAKg4ACIhOAEQgTACgXAAQgbAAgegCgAgSlgQhVADg9AUQhMAYgrAzQgsAxgSBMQgFAZgDAoIgEBGIgGBkQgCAPAYAhQANATApAwQAZAfAkAWQArAaAqACQBBACA/gBQBzgCAvgOQAbgHAYgLQAYgKBMguQAqgVALghIgHhfIgCg2QABgRgBgSIAAhHQAAgqgJgcQgXhLg0gpQgygohRgRQhAgNhIAAIgLAAg","fc":"#1D2226"},"714":{"t":[18.1,45.3,0.852,0.997,0,6.1,-172.6],"p":"AiJCLQhIgQgFgRQAuggBlg7QAYADAugSQBggnB0hvQgHAziLCBQhFBBhDA4QgigEgkgIg","fc":"#6B4F32"},"715":{"t":[18.5,41.7,0.852,0.997,0,6.1,-172.6],"p":"AizCqIgqgdQBJgxBShCQCjiAAphOQBEgcAQBWQgoBEg5BGQhwCRhNAWQgUAFgTAAQgnAAglgSg","fc":"#9F815D"},"716":{"t":[23.1,41.7,0.852,0.997,0,6.1,-172.6],"p":"AgUBmQiGh1hWirQB0BvB6BLQA7AkAmAPIA4AiQA+AlAcAVQgFARhHAPIhHAMQgxgZhBg8g","fc":"#6B4F32"},"717":{"t":[23.5,38.5,0.852,0.997,0,6.1,-172.6],"p":"ABbDYQhOgWiJi1QhGhZg2hWQAJgNAPgOQAegbAegDQCPDCCUB2QBLA8AvAVQgQAQgbANQglARgmAAQgUAAgUgEg","fc":"#9F815D"}},"containers":{"WingPart_05":{"c":["2","1","0"],"b":[-5.7,-4.8,111.1,134.5]},"WingPart_04":{"c":["5","4","3"],"b":[-1.3,-1.1,90.4,125.5]},"WingPart_03":{"c":["8","7","6"],"b":[-2.9,-4.2,111.2,107.1]},"WingPart_02":{"c":["11","10","9"],"b":[-4.4,-2.2,49.5,144.4]},"WingPart_01":{"c":["14","13","12"],"b":[0,-3.1,40,41.6]},"Spear":{"c":["18","17","16","15"],"b":[0,0,162,8.2]},"Sholder":{"c":["22","21","20","19"],"b":[0,0,24.3,24.2]},"Sedlo":{"c":["26","25","24","23"],"b":[4.8,3.1,63.2,66.8]},"Leg":{"c":["31","30","29","28","27"],"b":[0,-0.5,22.4,28.3]},"Heand_02":{"c":["35","34","33","32"],"b":[-2,-0.3,26.5,35.8]},"Heand_01":{"c":["39","38","37","36"],"b":[-3.2,-0.5,27.2,36.4]},"Heand":{"c":["43","42","41","40"],"b":[0,0,23.9,34.6]},"Head":{"c":["80","79","78","77","76","75","74","73","72","71","70","69","68","67","66","65","64","63","62","61","60","59","58","57","56","55","54","53","52","51","50","49","48","47","46","45","44"],"b":[4.4,-0.6,84,86.7]},"Dragon_Leg":{"c":["85","84","83","82","81"],"b":[0,-3.9,37.7,67.4]},"Dragon_Head":{"c":["123","122","121","120","119","118","117","116","115","114","113","112","111","110","109","108","107","106","105","104","103","102","101","100","99","98","97","96","95","94","93","92","91","90","89","88","87","86"],"b":[5.8,-10.9,87.9,95.9]},"Dragon_Body":{"c":["126","125","124"],"b":[-1,-14.9,75.3,121.3]},"D_tail":{"c":["130","129","128","127"],"b":[0,-12.6,50,86.4]},"Body":{"c":["133","132","131"],"b":[0,0,52.3,51.6]},"Belt":{"c":["135","134"],"b":[-1.9,-2.7,38,14.6]},"Bag":{"c":["147","146","145","144","143","142","141","140","139","138","137","136"],"b":[0,0,55.8,66.7]},"Armor_02":{"c":["164","163","162","161","160","159","158","157","156","155","154","153","152","151","150","149","148"],"b":[0,0,38.2,33.4]},"Armor":{"c":["170","169","168","167","166","165"],"b":[-1.3,16.2,50.1,46.7]},"Fly_Enemy_BackWalk_JSCC:Leg":{"c":["31","173","172","28","27"],"b":[0,0,22.4,27.7]},"Fly_Enemy_BackWalk_JSCC:Heand":{"c":["177","176","175","174"],"b":[0.3,0.4,23.6,34.7]},"Fly_Enemy_BackWalk_JSCC:Head":{"c":["217","216","215","214","213","212","211","210","209","208","207","206","205","204","203","202","201","200","199","198","197","196","195","194","193","192","191","190","189","188","187","186","185","184","183","182","181","180","179","178"],"b":[-1.1,-0.6,92.2,87.7]},"Fly_Enemy_BackWalk_JSCC:Dragon_Leg":{"c":["222","221","220","219","218"],"b":[0,0,37.7,63.4]},"Fly_Enemy_BackWalk_JSCC:Dragon_Head":{"c":["230","229","228","227","226","225","224","223"],"b":[0,0,103.7,84.9]},"Fly_Enemy_BackWalk_JSCC:Dragon_Body":{"c":["234","233","232","231"],"b":[-1.5,-1,75.8,98.7]},"Fly_Enemy_BackWalk_JSCC:D_tail":{"c":["238","237","236","235"],"b":[-4,3.9,55.9,69.8]},"Fly_Enemy_BackWalk_JSCC:Body":{"c":["241","240","239"],"b":[0,0,52.2,51.6]},"Fly_Enemy_BackWalk_JSCC:Bag":{"c":["246","245","244","243","242"],"b":[0,0,71.8,97]},"Fly_Enemy_BackWalk_JSCC:Armor":{"c":["269","268","267","266","265","264","263","262","261","260","259","258","257","256","255","254","253","252","251","250","249","248","247"],"b":[-13.7,0,71.5,61.3]},"Fly_Enemy_Death_JSCC:Dragon_Leg":{"c":["85","84","270","82","81"],"b":[0,-3.9,37.7,67.4]},"Fly_Enemy_Walk_JSCC:Leg":{"c":["271","173","172","28","27"],"b":[0,0,22.4,27.7]},"Fly_Enemy_Walk_JSCC:Head":{"c":["284","283","282","214","213","212","211","210","209","208","207","206","205","204","203","202","281","201","200","199","198","197","196","195","194","193","192","191","190","280","279","278","277","276","275","274","273","272"],"b":[-1.1,-0.6,92.2,87.7]},"Fly_Enemy_Walk_JSCC:Dragon_Leg":{"c":["222","221","285","219","218"],"b":[0,0,37.7,63.4]},"Fly_Enemy_Walk_JSCC:Dragon_Head":{"c":["230","229","228","295","294","225","224","293","292","291","290","289","288","287","286"],"b":[0,-15.9,103.7,100.9]},"Fly_Enemy_Walk_JSCC:D_tail":{"c":["299","298","297","296"],"b":[0,0,49.9,73.7]},"Fly_Enemy_Walk_JSCC:Body":{"c":["302","301","300"],"b":[0,0,52.2,51.6]},"Fly_Enemy_Walk_JSCC:Armor":{"c":["325","324","323","322","321","320","319","318","317","316","315","314","313","312","311","310","309","308","307","306","305","304","303"],"b":[0,0,71.5,61.3]},"NOuse_5":{"c":["327","326"],"b":[-60,-59.8,21.4,8.9]},"Helm_3":{"c":["367","366","365","364","363","362","361","360","359","358","357","356","355","354","353","352","351","350","349","348","347","346","345","344","343","342","341","340","339","338","337","336","335","334","333","332","331","330","329","328"],"b":[-60,-60,118.5,102.5]},"Face_05":{"c":["382","381","380","379","378","377","376","375","374","373","372","371","370","369","368"],"b":[-60,-60,69.8,86.7]},"Eye_51":{"c":["385","384","383"],"b":[-60,-60,9.9,9.9]},"Eye_5":{"c":["388","387","386"],"b":[-60,-60,14.7,9.9]},"Wing_Animation:Armor":{"c":["717","716","168","715","714","165"],"b":[-1.3,16.2,50.1,46.7]},"Wing_Animation:Belt":{"c":["135","134"],"b":[-2,-2.8,38,14.6]},"Wing_Animation:D_tail":{"c":["130","129","128","127"],"b":[0,-12.7,49.9,86.4]},"Wing_Animation:Dragon_Head":{"c":["123","122","121","120","119","118","117","116","115","114","113","112","111","110","109","108","107","106","105","104","103","102","101","100","99","98","97","96","95","94","93","92","91","90","89","88","87","86"],"b":[5.8,-11,87.9,95.9]},"Wing_Animation:Dragon_Head_Jaw1":{"c":["123","122","121","661","660","659","658","116","657","656","655","654","653","652","651","650","649","106","105","104","648","647","646","645","644","643","642","641","640","639","638","637","636","635","634","633","632","631"],"b":[5.8,-11.5,87.9,94.2]},"Wing_Animation:Dragon_Head_Jaw2":{"c":["630","629","628","627","626","625","624","623","622","116","621","620","619","618","617","616","615","614","613","612","611","610","609","608","607","606","605","604","603","602","601","600","599","598","597","596","595","594","593","592"],"b":[5.6,-11.5,87.6,97.5]},"Wing_Animation:Dragon_Head_Jaw3":{"c":["591","590","589","588","587","586","585","584","583","582","581","580","713","578","577","576","575","574","573","572","571","570","569","568","567","566","565","564","563","562","561","560","559","558","557","556","555","554","553","552","551","550"],"b":[7,-12.6,88.8,100.6]},"Wing_Animation:Dragon_Leg":{"c":["85","84","83","82","81"],"b":[0,-4,37.7,67.4]},"Wing_Animation:Head":{"c":["80","79","78","77","76","75","74","73","72","71","70","69","68","67","66","65","64","63","62","61","60","59","58","57","56","55","54","53","52","51","50","49","48","47","46","45","44"],"b":[4.4,-0.7,83.9,86.7]},"Wing_Animation:Jaw":{"c":["549","548","547","546","545","544","543","542","541","540","539","712","711","536","535","534","533","532","531","530"],"b":[0,0,65.9,57.2]},"Wing_Animation:Leg":{"c":["529","528","28","527"],"b":[0,-0.6,22.4,28.3]},"Wing_Animation:WingPart_01":{"c":["14","13","12"],"b":[0,-3.1,39.9,41.6]},"Wing_Animation:WingPart_02":{"c":["11","10","710"],"b":[-4.4,-2.3,49.5,144.4]},"Wing_Animation:WingPart_03":{"c":["8","7","6"],"b":[-3,-4.3,111.2,107.1]},"Wing_Animation:WingPart_04":{"c":["5","4","3"],"b":[-1.4,-1.2,90.4,125.5]},"Wing_Animation:WingPart_05":{"c":["2","1","0"],"b":[-5.7,-4.9,111.1,134.5]},"Fly_Enemy_SideEat_JSCC1:Armor_02":{"c":["709","708","707","706","705","704","158","157","156","155","703","153","152","151","150","149","148"],"b":[0,0,38.2,33.4]},"Dragon_Head_Jaw":{"c":["702","701","700","699","698","697","696","695","694","693","692","116","691","690","689","688","687","686","685","684","683","682","681","680","679","678","677","676","675","674","673","672","671","670","669","668","667","666","665","664","663","662"],"b":[5.8,-12.6,89.1,100.1]},"Dragon_Head_Jaw1":{"c":["123","122","121","661","660","659","658","116","657","656","655","654","653","652","651","650","649","106","105","104","648","647","646","645","644","643","642","641","640","639","638","637","636","635","634","633","632","631"],"b":[5.8,-11.4,87.9,94.2]},"Dragon_Head_Jaw2":{"c":["630","629","628","627","626","625","624","623","622","116","621","620","619","618","617","616","615","614","613","612","611","610","609","608","607","606","605","604","603","602","601","600","599","598","597","596","595","594","593","592"],"b":[5.6,-11.4,87.6,97.5]},"Dragon_Head_Jaw3":{"c":["591","590","589","588","587","586","585","584","583","582","581","580","579","578","577","576","575","574","573","572","571","570","569","568","567","566","565","564","563","562","561","560","559","558","557","556","555","554","553","552","551","550"],"b":[7,-12.6,88.8,100.6]},"Fly_Enemy_SideEat_JSCC1:Heand":{"c":["43","41","42","40"],"b":[0,0,23.9,34.6]},"Jaw":{"c":["549","548","547","546","545","544","543","542","541","540","539","538","537","536","535","534","533","532","531","530"],"b":[0,0,65.9,57.2]},"Fly_Enemy_SideEat_JSCC1:Leg":{"c":["529","528","28","527"],"b":[0,-0.5,22.4,28.3]},"Fly_Enemy_SideEat_JSCC1:Sholder":{"c":["526","525","524","523","522"],"b":[0,0,24.3,24.2]}},"animations":{"Wing_Animation":{"shapes":[],"containers":[{"bn":"instance","t":[53.6,-122,0.854,0.854,-40.9,0,0,7.3,29.9],"gn":"WingPart_01"},{"bn":"instance_1","t":[36.5,-35.8,0.854,0.854,-28.9,0,0,34.6,83],"gn":"WingPart_03"},{"bn":"instance_2","t":[61.2,-128.9,0.854,0.446,-56.8,0,0,11.2,11.8],"gn":"WingPart_02"},{"bn":"instance_3","t":[62.9,-121.7,0.854,0.603,-19.9,0,0,9.5,8.3],"gn":"WingPart_02"},{"bn":"instance_4","t":[55.4,-123.7,0.788,0.745,0,-30.9,-32.8,81.6,10.5],"gn":"WingPart_05"},{"bn":"instance_5","t":[64.9,-125.4,0.593,0.531,0,-22.4,-32.1,15.3,13.8],"gn":"WingPart_04"}],"animations":[],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"scaleX":0.82,"scaleY":0.79,"rotation":-10.8,"x":98.5,"y":-86.6},4]},{"n":"to","a":[{"scaleY":0.7,"rotation":9.3,"x":95.7,"y":-48.8},1]},{"n":"to","a":[{"scaleX":0.82,"scaleY":0.61,"rotation":29.4,"x":92.9,"y":-11},1]},{"n":"to","a":[{"scaleX":0.82,"scaleY":0.53,"rotation":49.7,"x":90.1,"y":26.6},1]},{"n":"to","a":[{"regX":7.2,"regY":29.8,"scaleY":0.66,"rotation":19.3,"x":101.2,"y":-27.9},2]},{"n":"to","a":[{"regX":7.3,"regY":29.9,"scaleY":0.79,"rotation":-10.8,"x":98.5,"y":-86.6},2]},{"n":"to","a":[{"scaleX":0.84,"scaleY":0.83,"rotation":-30.7,"x":68.5,"y":-110.1},2]},{"n":"to","a":[{"scaleX":0.84,"scaleY":0.84,"rotation":-33.9,"x":63.5,"y":-114.1},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"rotation":10.5,"y":-35.6},4]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.85,"rotation":38.6,"x":33.8,"y":-36.3},1]},{"n":"to","a":[{"regX":34.5,"scaleX":0.85,"scaleY":0.85,"rotation":66.9,"x":31.1,"y":-37},1]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.85,"rotation":95.2,"x":28.5,"y":-37.5},1]},{"n":"to","a":[{"regX":34.6,"scaleX":0.85,"scaleY":0.85,"rotation":52.9,"x":32.5,"y":-36.5},2]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.85,"rotation":10.5,"x":36.5,"y":-35.6},2]},{"n":"to","a":[{"regX":34.5,"scaleX":0.85,"scaleY":0.85,"rotation":-15.6,"x":36.4,"y":-35.7},2]},{"n":"to","a":[{"regX":34.4,"scaleX":0.85,"scaleY":0.85,"rotation":-19.9,"y":-35.6},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"scaleY":0.9,"rotation":-86.3,"x":105.7,"y":-89.7},4]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.79,"rotation":0,"skewX":-80.5,"skewY":-20.3,"x":102.6,"y":-50.6},1]},{"n":"to","a":[{"regY":11.7,"scaleX":0.84,"scaleY":0.73,"skewX":-93.8,"skewY":25.8,"x":99.7,"y":-11.4},1]},{"n":"to","a":[{"regX":11.1,"scaleX":0.83,"scaleY":0.79,"skewX":-97.5,"skewY":82.3,"x":101.7,"y":27.9},1]},{"n":"to","a":[{"regX":11.2,"regY":11.8,"scaleX":0.85,"scaleY":0.82,"rotation":-49.4,"skewX":0,"skewY":0,"x":114.3,"y":-32.9},2]},{"n":"to","a":[{"scaleY":0.85,"rotation":-66.9,"x":105.6,"y":-89.7},2]},{"n":"to","a":[{"regX":11.3,"scaleX":0.85,"scaleY":0.67,"rotation":-67,"x":76.9,"y":-114.7},2]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.59,"rotation":-63.7,"x":71.7,"y":-119.3},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"regY":8.5,"scaleY":0.49,"rotation":-7.3,"x":105.4,"y":-84.2},4]},{"n":"to","a":[{"regX":9.4,"regY":8.3,"scaleY":0.42,"rotation":0,"skewX":50.7,"skewY":-6.9,"x":101.7,"y":-48.3},1]},{"n":"to","a":[{"scaleY":0.35,"skewX":108.8,"skewY":-6.6,"x":98,"y":-12.3},1]},{"n":"to","a":[{"regX":9.6,"regY":8.6,"scaleY":0.29,"skewX":167,"x":94.3,"y":23.5},1]},{"n":"to","a":[{"regX":9.5,"regY":8.4,"scaleY":0.3,"rotation":-7.3,"skewX":0,"skewY":0,"x":107.2,"y":-29},2]},{"n":"to","a":[{"regY":8.5,"scaleY":0.49,"x":105.4,"y":-84.2},2]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.69,"rotation":-19.6,"x":77.6,"y":-107.9},2]},{"n":"to","a":[{"regX":9.6,"scaleX":0.85,"scaleY":0.66,"x":72.8,"y":-112.4},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"regX":81.5,"regY":10.7,"scaleX":0.86,"scaleY":0.59,"skewX":-14.2,"skewY":-10.5,"x":103,"y":-86.4},4]},{"n":"to","a":[{"regX":81.7,"regY":11.1,"scaleY":0.23,"skewX":43.7,"skewY":-0.3,"x":88.6,"y":-36.9},1]},{"n":"to","a":[{"regY":11.2,"scaleX":0.86,"scaleY":0.29,"skewX":111.5,"skewY":9.6,"x":92.9,"y":-19.1},1]},{"n":"to","a":[{"regX":81.4,"regY":11,"scaleX":0.86,"scaleY":0.36,"skewX":179.5,"skewY":19.9,"x":91.6,"y":24.9},1]},{"n":"to","a":[{"regY":11.2,"scaleY":0.21,"skewX":-0.3,"x":115.6,"y":-21.6},2]},{"n":"to","a":[{"regX":81.5,"regY":10.7,"scaleY":0.59,"skewX":-14.2,"skewY":-10.5,"x":103,"y":-86.4},2]},{"n":"to","a":[{"scaleX":0.86,"scaleY":0.75,"skewX":-25.1,"skewY":-16.3,"x":77.1,"y":-100.2},2]},{"n":"to","a":[{"regX":81.4,"scaleX":0.83,"scaleY":0.74,"skewX":-26.9,"skewY":-21.6,"x":69.9,"y":-107.9},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"regX":15.5,"scaleX":1.64,"scaleY":0.55,"skewX":-6.3,"skewY":-30.1,"x":107.2,"y":-82.7},4]},{"n":"to","a":[{"regX":43.6,"regY":61.1,"scaleX":2.11,"scaleY":0.59,"skewX":64.3,"skewY":-4.1,"x":142.6,"y":-40.1},1]},{"n":"to","a":[{"regX":43.8,"regY":61.2,"scaleX":1.62,"scaleY":0.42,"skewX":121.8,"skewY":7.6,"x":136.8,"y":-12},1]},{"n":"to","a":[{"regX":15.4,"regY":13.7,"scaleX":1.49,"scaleY":0.34,"skewX":179.3,"skewY":19.7,"x":94,"y":22.8},1]},{"n":"to","a":[{"regX":15.3,"regY":13.9,"scaleX":1.13,"scaleY":0.31,"skewX":9.8,"skewY":14.2,"x":116.8,"y":-30},2]},{"n":"to","a":[{"regX":15.4,"regY":13.8,"scaleX":1.26,"scaleY":0.5,"skewX":-8.5,"skewY":-14.9,"x":110.3,"y":-80.9},2]},{"n":"to","a":[{"regY":13.6,"scaleX":0.97,"scaleY":0.72,"skewX":-21.7,"skewY":-44,"x":85.7,"y":-107.1},2]},{"n":"to","a":[{"regY":13.7,"scaleX":0.84,"scaleY":0.66,"skewX":-21.9,"skewY":-39.9,"x":78.8,"y":-113.1},1]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[-27.7,-161.6,153.4,156.2],"frameBounds":[[-27.7,-161.6,153.4,156.2],[-31.8,-160.1,192,165.1],[-34.2,-163.9,230.5,178.2],[-34.3,-167.3,267,189.1],[1.8,-151.6,222.4,147.1],[-5,-114.6,276,130.6],[-13.2,-95.6,244.8,123],[6,-71.1,201.4,136.1],[-2.5,-95.9,251.2,134.5],[-0.3,-107.1,214.7,153.5],[-21.6,-137.1,244.8,185.6],[1.8,-121,217.6,116.6],[-15.1,-144.6,210.7,144.1],[-14.6,-166.7,183,167.9],[-19,-162.1,172.8,159.8]]},"Fly_Enemy_Attack_JSCC":{"shapes":[{"bn":"shape","gn":"171"}],"containers":[{"bn":"instance","t":[227,200.5,1,1,0,0,0,51.9,42.5],"gn":"Dragon_Head"},{"bn":"instance_1","t":[292.6,128.4,1,1,0,0,0,19.1,16.6],"gn":"Armor_02"},{"bn":"instance_2","t":[297.2,157.9,1,1,0,0,180,12,17.3],"gn":"Heand"},{"bn":"instance_3","t":[291.9,138.5,1,1,0,0,180,12.2,12.1],"gn":"Sholder"},{"bn":"instance_4","t":[278.2,137.3,1,1,0,0,0,35.8,30.7],"gn":"Armor"},{"bn":"instance_5","t":[285.7,176,1,1,0,-29.9,150,11.2,13.8],"gn":"Leg"},{"bn":"instance_6","t":[262.1,238,1,1,0,0,180,18.8,31.7],"gn":"Dragon_Leg"},{"bn":"instance_7","t":[264.8,171.2,1,1,0,0,0,16.1,4.8],"gn":"Belt"},{"bn":"instance_8","t":[268.6,204,1,1,0,0,0,29.1,42.3],"gn":"Sedlo"},{"bn":"instance_10","t":[269.8,93.1,1,1,0,0,0,45,43.5],"gn":"Head"},{"bn":"instance_11","t":[246.7,167.3,1,1,30,0,0,11.2,13.8],"gn":"Leg"},{"bn":"instance_12","t":[269.5,144.1,1,1,0,0,0,26.1,25.8],"gn":"Body"},{"bn":"instance_13","t":[244.5,152,1,1,0,0,0,12,17.3],"gn":"Heand"},{"bn":"instance_14","t":[224.4,125.7,1,1,0,97.9,97.2,12,17.4],"gn":"Heand_02"},{"bn":"instance_15","t":[239.2,108.5,1.036,0.967,0,173.5,178.4,11.9,17.3],"gn":"Heand_01"},{"bn":"instance_16","t":[249.1,134.3,1,1,0,0,0,12.2,12.1],"gn":"Sholder"},{"bn":"instance_17","t":[223.8,102.1,0.999,0.999,-5.9,0,0,81,4.2],"gn":"Spear","o":true},{"bn":"instance_18","t":[244.9,109.1,1,1,0,0,0,27.9,33.4],"gn":"Bag"},{"bn":"instance_19","t":[267.7,197.9,1,1,-44.9,0,0,36.3,42.1],"gn":"Dragon_Body"},{"bn":"instance_20","t":[235.8,238,1,1,0,0,0,18.8,31.7],"gn":"Dragon_Leg"},{"bn":"instance_21","t":[298.4,262.2,1,1,0,0,0,24.9,36.8],"gn":"D_tail"}],"animations":[{"bn":"instance_9","t":[313.9,145.6,1,1,0,0,0,49,-83.5],"gn":"Wing_Animation","a":["synched",0]},{"bn":"instance_22","t":[228.9,135.7,1,1,0,0,180,49,-83.5],"gn":"Wing_Animation","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":195.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":193},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":185.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":182.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":185.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":193},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":195.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.5},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":291.8,"y":127.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":291,"y":126.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":290.1,"y":125},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":289.3,"y":123.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":288.5,"y":122.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":291.1,"y":119.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":293.6,"y":116.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":296.1,"y":113.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":295.5,"y":115.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":294.9,"y":118.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":294.4,"y":120.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":293.8,"y":123.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":293.2,"y":125.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":292.6,"y":128.4},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":20.8,"skewY":200.9,"x":291.8,"y":154.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":41.9,"skewY":222,"x":286.3,"y":151.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":17.4,"scaleX":1,"scaleY":1,"skewX":63.1,"skewY":243.2,"x":280.8,"y":147.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":17.3,"scaleX":1,"scaleY":1,"skewX":84.2,"skewY":264.3,"x":275.4,"y":144.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":11.9,"skewX":105,"skewY":285.1,"x":269.9,"y":141},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":70.2,"skewY":250.3,"x":281.7,"y":140.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12,"scaleX":1,"scaleY":1,"skewX":34.9,"skewY":215,"x":293.7,"y":139.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":0,"skewY":180,"x":305.6,"y":139.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":304.2,"y":142.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":302.8,"y":145.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":301.4,"y":148.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":300,"y":151.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":298.6,"y":154.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":297.2,"y":157.9},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":11.8,"skewY":191.9,"x":290.4,"y":138.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":23.8,"skewY":203.9,"x":288.9,"y":137.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.2,"scaleX":1,"scaleY":1,"skewX":36.1,"skewY":216.2,"x":287.4,"y":137.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.1,"skewX":48.1,"skewY":228.2,"x":285.8,"y":136.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12,"scaleX":1,"scaleY":1,"skewX":60,"skewY":240.1,"x":284.4,"y":136.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.1,"scaleX":1,"scaleY":1,"skewX":30,"skewY":210.1,"x":288.9,"y":131.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12,"scaleX":1,"scaleY":1,"skewX":0,"skewY":180,"x":293.5,"y":126.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.2,"skewX":-29.8,"skewY":150,"x":298,"y":122.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-24.6,"skewY":155.2,"x":296.9,"y":124.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":-19.6,"skewY":160.2,"x":296,"y":127.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.1,"skewX":-14.6,"skewY":165.2,"x":294.9,"y":130.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.2,"skewX":-9.6,"skewY":170.2,"x":293.9,"y":133.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-4.8,"skewY":175,"x":292.9,"y":135.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.1,"skewX":0,"skewY":180,"x":291.9,"y":138.5},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":127.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":124},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":122.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":124.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":127.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-29.7,"skewY":150.1,"y":174.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":172.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":170.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":168.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":166.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":164.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-29.8,"skewY":150,"y":160.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-29.7,"skewY":150.1,"x":285.8,"y":163.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":165.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":168.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":171},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":173.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-29.8,"skewY":150,"x":285.7,"y":176},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":230.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":228},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":222.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":220.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":222.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":228},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":230.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":238},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":169.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":167.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":165.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":161.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":157.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":156},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":158.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":161.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":166.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":168.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":171.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":202.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":196.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":194.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":191.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":193.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":196.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":199},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":201.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":204},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape"}]},7]},{"n":"to","a":[{"state":[]},2]},{"n":"wait","a":[6]}],[{"n":"get","a":["instance_9"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143.1,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.6,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.1,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.6,"startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.1,"startPosition":5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.5,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.5,"startPosition":8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.1,"startPosition":9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.6,"startPosition":10},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.1,"startPosition":11},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.6,"startPosition":12},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143.1,"startPosition":13},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.6,"startPosition":14},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_10"]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.6,"x":270.2,"y":91.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":43.4,"rotation":1.3,"x":270.5,"y":89.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":43.5,"rotation":2.1,"x":271,"y":87.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.8,"x":271.4,"y":85.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.7,"x":271.8,"y":83.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.6,"x":270.2,"y":81.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-1.9,"x":268.5,"y":79.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-5,"x":266.9,"y":77.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":45.1,"rotation":-4.1,"x":267.5,"y":80.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":45,"regY":43.6,"rotation":-3.1,"x":267.9,"y":82.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":43.5,"rotation":-2.3,"x":268.3,"y":85.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":43.6,"rotation":-1.4,"x":268.8,"y":88.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":43.5,"rotation":-0.6,"x":269.3,"y":90.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0,"x":269.8,"y":93.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_11"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":29.9,"y":165.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":161.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":157.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":155.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":154},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":30,"y":152.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"scaleX":1,"scaleY":1,"rotation":29.9,"y":154.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":157.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":164.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.8,"scaleX":1,"scaleY":1,"rotation":30,"y":167.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_12"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"skewX":0.8,"x":269.2,"y":141.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02,"skewX":1.5,"x":268.8,"y":139.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":25.9,"scaleY":1.02,"skewX":2.3,"x":268.5,"y":137.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":25.8,"scaleY":1.03,"skewX":3,"x":268.2,"y":135.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.04,"skewX":4,"x":267.8,"y":133.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":26.2,"scaleY":1.03,"skewX":1.5,"x":267.2,"y":132},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"skewX":-0.4,"x":266.5,"y":130.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":26.1,"scaleY":1,"skewX":-2.9,"x":265.7,"y":128.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":-2.3,"x":266.4,"y":131.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":-1.8,"x":267,"y":133.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":-1.3,"x":267.7,"y":136.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":26.2,"scaleY":1,"skewX":-0.8,"x":268.4,"y":139.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":26.1,"skewX":-0.3,"x":268.9,"y":141.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":0,"x":269.5,"y":144.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance_13","p":{"regY":17.3,"scaleX":1,"scaleY":1,"rotation":0,"x":244.5,"y":152,"regX":12}}]}]},{"n":"to","a":[{"state":[{"t":"instance_13","p":{"regY":17.4,"scaleX":0.998,"scaleY":0.998,"rotation":32.4,"x":235.7,"y":144,"regX":12}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_13","p":{"regY":17.2,"scaleX":0.999,"scaleY":0.999,"rotation":64.9,"x":227,"y":135.8,"regX":12}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_14","p":{"scaleX":1,"scaleY":1,"skewX":97.9,"skewY":97.2,"x":224.4,"y":125.7,"rotation":0}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_14","p":{"scaleX":1.016,"scaleY":0.982,"skewX":135.6,"skewY":137.9,"x":231.8,"y":117.2,"rotation":0}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_15","p":{"scaleX":1.036,"scaleY":0.967,"skewX":173.5,"skewY":178.4,"x":239.2,"y":108.5,"regY":17.3}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_15","p":{"scaleX":1.022,"scaleY":0.976,"skewX":146.4,"skewY":149.7,"x":231,"y":110.6,"regY":17.3}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_15","p":{"scaleX":1.01,"scaleY":0.987,"skewX":119.3,"skewY":120.9,"x":222.9,"y":112.8,"regY":17.4}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_14","p":{"scaleX":0.999,"scaleY":0.999,"skewX":0,"skewY":0,"x":214.8,"y":115,"rotation":92.3}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_14","p":{"scaleX":0.998,"scaleY":0.998,"skewX":0,"skewY":0,"x":221.5,"y":125.8,"rotation":69.5}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_13","p":{"regY":17.3,"scaleX":0.998,"scaleY":0.998,"rotation":46.6,"x":228.2,"y":136.5,"regX":11.9}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_13","p":{"regY":17.3,"scaleX":0.997,"scaleY":0.997,"rotation":34.9,"x":232.3,"y":140.5,"regX":12}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_13","p":{"regY":17.4,"scaleX":0.998,"scaleY":0.998,"rotation":23.3,"x":236.4,"y":144.4,"regX":12}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_13","p":{"regY":17.3,"scaleX":0.999,"scaleY":0.999,"rotation":11.5,"x":240.4,"y":148.2,"regX":11.9}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_13","p":{"regY":17.3,"scaleX":1,"scaleY":1,"rotation":0,"x":244.5,"y":152,"regX":12}}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_16"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":14.8,"x":245.7,"y":132},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.2,"scaleX":1,"scaleY":1,"rotation":30,"x":242.3,"y":129.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.1,"regY":12.1,"scaleX":1,"scaleY":1,"rotation":47.8,"y":127.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":75.7,"x":242,"y":125.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.2,"scaleX":1,"scaleY":1,"rotation":103.6,"x":241.6,"y":123.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":94,"x":240.5,"y":121.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.1,"scaleX":1,"scaleY":1,"rotation":84.7,"x":239.4,"y":120},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.2,"scaleX":1,"scaleY":1,"rotation":75,"x":238.3,"y":118.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.2,"scaleX":1,"scaleY":1,"rotation":43.4,"x":240.1,"y":122.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.1,"rotation":12,"x":241.9,"y":126.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":8.8,"x":243.7,"y":128.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":5.8,"x":245.5,"y":130.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.8,"x":247.3,"y":132.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":0,"x":249.1,"y":134.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_17"]},{"n":"wait","a":[6]},{"n":"to","a":[{"_off":false},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":4.1,"scaleX":1,"scaleY":1,"rotation":-18.5,"x":188.3,"y":117.1},0]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]}],[{"n":"get","a":["instance_18"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":107.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":105.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":101.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":99.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":97.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":95.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":93.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":96.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":99},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":101.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":104.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":106.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":109.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_19"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-44.7,"y":195.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":187.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":185.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":182.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-44.8,"y":180.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-44.7,"y":182.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":185.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":187.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":195.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-44.8,"y":197.9},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_20"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":230.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":228},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":222.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":220.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":222.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":228},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":230.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":238},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_21"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":259.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":257.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":254.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":252.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":249.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":247.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":244.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":247.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":249.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":252.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":254.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":257.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":259.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":262.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_22"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.2,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.6,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.1,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.6,"startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":123.1,"startPosition":5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":120.6,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":118.1,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":120.6,"startPosition":8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":123.1,"startPosition":9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.6,"startPosition":10},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.1,"startPosition":11},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.6,"startPosition":12},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.2,"startPosition":13},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.7,"startPosition":14},0]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[152.3,48.8,238.3,250.2],"frameBounds":[[152.3,48.8,238.3,250.2],[117.8,46.6,307.2,250],[81.7,44.2,379.4,249.8],[45.3,41.7,452.1,249.9],[53.7,39.3,435.4,249.7],[7.1,36.8,528.7,249.7],[46.4,37,449.9,247],[70.6,34,401.7,247.5],[29.3,29.8,484.2,254.1],[63.6,33,415.6,253.5],[54.8,36.2,433.2,252.9],[58.6,39.3,425.7,252.2],[82.4,42.6,378,251.5],[109.6,45.6,323.7,251],[110.3,48.8,308.3,250.2]]},"Fly_Enemy_BackWalk_JSCC":{"shapes":[],"containers":[{"bn":"instance","t":[304.3,111.4,1,1,0,0,180,27.9,33.4],"gn":"Fly_Enemy_BackWalk_JSCC:Bag"},{"bn":"instance_1","t":[276.2,262.2,1,1,0,0,0,24.9,36.8],"gn":"Fly_Enemy_BackWalk_JSCC:D_tail"},{"bn":"instance_2","t":[275.9,202.1,1,1,0,0,0,36.3,42.1],"gn":"Fly_Enemy_BackWalk_JSCC:Dragon_Body"},{"bn":"instance_5","t":[282.5,137.3,1,1,0,0,0,35.8,30.7],"gn":"Fly_Enemy_BackWalk_JSCC:Armor"},{"bn":"instance_6","t":[298.5,167.3,1,1,0,-29.9,150,11.2,13.8],"gn":"Fly_Enemy_BackWalk_JSCC:Leg"},{"bn":"instance_7","t":[253.2,167.3,1,1,30,0,0,11.2,13.8],"gn":"Fly_Enemy_BackWalk_JSCC:Leg"},{"bn":"instance_8","t":[276,144.1,1,1,0,0,0,26.1,25.8],"gn":"Fly_Enemy_BackWalk_JSCC:Body"},{"bn":"instance_9","t":[243.3,154.7,1,1,0,0,0,12,17.3],"gn":"Fly_Enemy_BackWalk_JSCC:Heand"},{"bn":"instance_10","t":[308.2,154.2,1,1,0,0,180,12,17.3],"gn":"Fly_Enemy_BackWalk_JSCC:Heand"},{"bn":"instance_11","t":[302.9,134.7,1,1,0,0,180,12.2,12.1],"gn":"Sholder"},{"bn":"instance_12","t":[247.9,137,1,1,0,0,0,12.2,12.1],"gn":"Sholder"},{"bn":"instance_13","t":[276.3,93.1,1,1,0,0,0,45,43.5],"gn":"Fly_Enemy_BackWalk_JSCC:Head"},{"bn":"instance_14","t":[295.6,238,1,1,0,0,180,18.8,31.7],"gn":"Fly_Enemy_BackWalk_JSCC:Dragon_Leg"},{"bn":"instance_15","t":[258.8,238,1,1,0,0,0,18.8,31.7],"gn":"Fly_Enemy_BackWalk_JSCC:Dragon_Leg"},{"bn":"instance_16","t":[275.5,200.5,1,1,0,0,0,51.9,42.5],"gn":"Fly_Enemy_BackWalk_JSCC:Dragon_Head"}],"animations":[{"bn":"instance_3","t":[334.4,148.5,1,1,0,0,0,49,-83.5],"gn":"Wing_Animation","a":["synched",0]},{"bn":"instance_4","t":[218.3,149.1,1,1,0,0,180,49,-83.5],"gn":"Wing_Animation","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":110.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":108.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":107.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":106.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":104.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":101},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":104.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":106.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":107.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":109.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":111.4},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":260.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":258.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":256.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":254},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":251.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":249.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":247.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":249.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":251.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":254},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":256.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":258.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":260.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":262.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":199.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":196.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":195.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":194.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":191.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":193.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":195.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":197.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":202.6},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.4,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.4,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.3,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.2,"startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.2,"startPosition":5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.1,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.1,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.1,"startPosition":8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.2,"startPosition":9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.2,"startPosition":10},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.3,"startPosition":11},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.4,"startPosition":12},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.4,"startPosition":13},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":148.5,"startPosition":14},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":147.1,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.9,"startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.8,"startPosition":5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.8,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.7,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.8,"startPosition":8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.8,"startPosition":9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.9,"startPosition":10},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143,"startPosition":11},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145,"startPosition":12},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":147.1,"startPosition":13},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149.1,"startPosition":14},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":11.1,"regY":13.9,"scaleX":1,"scaleY":1,"skewX":-29.7,"skewY":150.1,"x":298.6,"y":166},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":164.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":160.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":158.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":11.2,"regY":13.8,"scaleX":1,"scaleY":1,"skewX":-29.8,"skewY":150,"x":298.5,"y":156.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"scaleX":1,"scaleY":1,"skewX":-29.7,"skewY":150.1,"y":158.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":160.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":165.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.8,"scaleX":1,"scaleY":1,"skewX":-29.8,"skewY":150,"y":167.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":29.9,"y":166},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":164.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":160.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":158.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":30,"y":156.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"scaleX":1,"scaleY":1,"rotation":29.9,"x":253.1,"y":158.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":160.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":165.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.8,"scaleX":1,"scaleY":1,"rotation":30,"x":253.2,"y":167.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":141.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_9"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":153.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":152.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":150.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":148.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":147.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":151.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":153},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":154.7},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_10"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":152.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":151.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":150.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":147.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":147.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":150.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":152.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":154.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_11"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":124.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":127.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.7},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_12"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":127.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_13"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":91.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":90.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":89.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":87.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":86.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":84},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":82.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":84.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":86.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":87.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":89.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":91.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":93.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_14"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":236.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":234.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":232.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":231.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":227.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":226},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":227.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":231.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":232.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":234.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":236.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":238},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_15"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":236},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":231.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":227.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":223.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":227.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":231.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":236},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":238},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_16"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":196.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":194.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":186.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":194.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":196.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.5},0]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[141.7,48.8,269.4,250.2],"frameBounds":[[141.7,48.8,269.4,250.2],[107.2,47.6,338.3,249.5],[71.1,46.3,410.5,248.7],[34.8,44.9,483.2,248],[43.1,43.7,466.5,247.2],[-3.5,42.3,559.8,246.4],[26.4,41.1,499.9,245.7],[25.9,39.8,500.8,256.6],[40.1,38.4,472.5,257.7],[53,40.2,446.7,248.6],[44.2,41.9,464.3,248.9],[47.9,43.7,456.8,249.3],[71.8,45.4,409.1,249.6],[98.9,47.1,354.8,249.9],[113.6,48.8,325.5,250.2]]},"Fly_Enemy_Death_JSCC":{"shapes":[],"containers":[{"bn":"instance","t":[227,200.5,1,1,0,0,0,51.9,42.5],"gn":"Dragon_Head"},{"bn":"instance_1","t":[292.6,128.4,1,1,0,0,0,19.1,16.6],"gn":"Armor_02"},{"bn":"instance_2","t":[297.2,157.9,1,1,0,0,180,12,17.3],"gn":"Heand"},{"bn":"instance_3","t":[291.9,138.5,1,1,0,0,180,12.2,12.1],"gn":"Sholder"},{"bn":"instance_4","t":[278.2,137.3,1,1,0,0,0,35.8,30.7],"gn":"Armor"},{"bn":"instance_5","t":[285.7,176,1,1,0,-29.9,150,11.2,13.8],"gn":"Leg"},{"bn":"instance_6","t":[262.1,238,1,1,0,0,180,18.8,31.7],"gn":"Fly_Enemy_Death_JSCC:Dragon_Leg"},{"bn":"instance_7","t":[244.5,152,1,1,0,0,0,12,17.3],"gn":"Heand"},{"bn":"instance_8","t":[264.8,171.2,1,1,0,0,0,16.1,4.8],"gn":"Belt"},{"bn":"instance_9","t":[268.6,204,1,1,0,0,0,29.1,42.3],"gn":"Sedlo"},{"bn":"instance_11","t":[269.8,93.1,1,1,0,0,0,45,43.5],"gn":"Head"},{"bn":"instance_12","t":[246.7,167.3,1,1,30,0,0,11.2,13.8],"gn":"Leg"},{"bn":"instance_13","t":[269.5,144.1,1,1,0,0,0,26.1,25.8],"gn":"Body"},{"bn":"instance_14","t":[249.1,134.3,1,1,0,0,0,12.2,12.1],"gn":"Sholder"},{"bn":"instance_15","t":[244.9,109.1,1,1,0,0,0,27.9,33.4],"gn":"Bag"},{"bn":"instance_16","t":[267.7,197.9,1,1,-44.9,0,0,36.3,42.1],"gn":"Dragon_Body"},{"bn":"instance_17","t":[235.8,238,1,1,0,0,0,18.8,31.7],"gn":"Fly_Enemy_Death_JSCC:Dragon_Leg"},{"bn":"instance_18","t":[298.4,262.2,1,1,0,0,0,24.9,36.8],"gn":"D_tail"}],"animations":[{"bn":"instance_10","t":[313.9,145.6,1,1,0,0,0,49,-83.5],"gn":"Wing_Animation","a":["synched",0]},{"bn":"instance_19","t":[228.9,135.7,1,1,0,0,180,49,-83.5],"gn":"Wing_Animation","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":51.8,"scaleX":1,"scaleY":1,"rotation":15.3,"x":225.8,"y":210.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":51.9,"rotation":30.7,"x":224.7,"y":221},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":0.99,"rotation":0,"skewX":32.6,"skewY":32.4,"x":224,"y":236.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.97,"skewX":34.3,"skewY":34.1,"x":223.2,"y":251.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.96,"skewX":36.1,"skewY":35.9,"x":222.5,"y":266.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.95,"skewX":37.9,"skewY":37.6,"x":221.7,"y":281.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":0.94,"skewX":39.8,"skewY":39.5,"x":221,"y":296.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":42.4,"scaleY":1,"rotation":32,"skewX":0,"skewY":0,"x":224,"y":294.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":51.8,"scaleX":1,"scaleY":1,"rotation":35.6,"y":296},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":51.9,"scaleX":1,"scaleY":1,"rotation":39.5,"y":297.6},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_1"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":16.7,"rotation":2.5,"x":293.7,"y":144.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":19.2,"regY":16.6,"rotation":5.1,"x":294.9,"y":160.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":7.8,"x":296.1,"y":176.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":19.1,"scaleX":1,"scaleY":1,"rotation":10.3,"x":297.3,"y":192.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":13,"x":298.4,"y":208.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":19.2,"rotation":15.6,"x":299.6,"y":224.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":19.1,"scaleX":1,"scaleY":1,"rotation":18.3,"x":300.7,"y":240.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":237.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"x":300.6,"y":239.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"x":300.7,"y":240.8},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":63.2,"skewY":243.3,"x":286.7,"y":169.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":11.9,"scaleX":1,"scaleY":1,"skewX":126.1,"skewY":306.2,"x":276,"y":180.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"x":274.5,"y":194.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":273,"y":207.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":271.5,"y":220.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":270,"y":234},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"x":268.5,"y":247.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":90,"skewY":270.1,"x":277.6,"y":254.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":17.2,"scaleX":1,"scaleY":1,"skewX":54.2,"skewY":234.3,"x":286.9,"y":262.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12,"regY":17.3,"scaleX":1,"scaleY":1,"skewX":18.3,"skewY":198.4,"x":295.9,"y":270.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":7.6,"skewY":187.7,"x":298.2,"y":269.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":18.3,"skewY":198.4,"x":295.9,"y":270.2},0]},{"n":"wait","a":[3]}],[{"n":"get","a":["instance_3"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.2,"scaleX":1,"scaleY":1,"skewX":49.1,"skewY":229.2,"x":289.5,"y":162},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":12.3,"scaleX":1,"scaleY":1,"skewX":98.2,"skewY":278.3,"x":287,"y":185.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":98.1,"skewY":278.2,"y":198.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":211.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":224.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":237.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":98.2,"skewY":278.3,"y":250.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":71.7,"skewY":251.8,"x":290.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.3,"scaleX":1,"scaleY":1,"skewX":44.9,"skewY":225,"x":293.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.2,"regY":12.2,"scaleX":1,"scaleY":1,"skewX":18.3,"skewY":198.4,"x":297},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_4"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":0.99,"rotation":1.8,"x":279.1,"y":151.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":35.7,"scaleX":0.99,"scaleY":0.97,"rotation":0,"skewX":3.8,"skewY":3.6,"x":280,"y":166.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":35.8,"scaleX":0.99,"scaleY":0.96,"skewX":5.8,"skewY":5.5,"x":281,"y":180.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.98,"scaleY":0.94,"skewX":7.8,"skewY":7.3,"x":281.8,"y":195},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.98,"scaleY":0.93,"skewX":9.8,"skewY":9.3,"x":282.8,"y":209.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.98,"scaleY":0.92,"skewX":11.8,"skewY":11.1,"x":283.7,"y":224},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":30.6,"scaleX":0.97,"scaleY":0.9,"skewX":13.8,"skewY":13.1,"x":284.6,"y":238.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":30.7,"scaleX":0.97,"scaleY":0.9,"skewY":13,"y":236.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":30.6,"scaleX":0.97,"scaleY":0.9,"skewY":13.1,"y":238.4},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_5"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"scaleX":1,"scaleY":1,"skewX":-29.7,"skewY":150.1,"x":285.8,"y":189.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":11.1,"skewX":-29.6,"skewY":150.2,"x":285.9,"y":203.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":11.2,"regY":13.8,"scaleX":1,"scaleY":1,"x":285.7,"y":216.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":285.8,"y":230.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"x":285.9,"y":243.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"x":285.8,"y":257.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"y":271},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":268},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.8,"scaleX":1,"scaleY":1,"x":285.7,"y":269.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"scaleX":1,"scaleY":1,"x":285.8,"y":271},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_6"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":3,"skewY":183.1,"x":258.3,"y":252.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":31.6,"skewX":6.4,"skewY":186.5,"x":254.6,"y":266},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":31.7,"skewX":-6.4,"skewY":173.4,"x":259.9,"y":278.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":31.6,"scaleX":1,"scaleY":1,"skewX":-19.6,"skewY":160.2,"x":265.3,"y":291.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":31.7,"skewX":-32.6,"skewY":147.2,"x":270.6,"y":304.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":31.6,"skewX":-45.9,"skewY":133.9,"x":276,"y":317},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-58.9,"skewY":120.9,"x":281.3,"y":329.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":18.7,"regY":31.7,"skewX":-54,"skewY":125.8,"x":281.4,"y":326.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":18.8,"scaleX":1,"scaleY":1,"skewX":-56.5,"skewY":123.3,"y":328.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":31.6,"scaleX":1,"scaleY":1,"skewX":-58.9,"skewY":120.9,"x":281.3,"y":329.9},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_7"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-25.3,"skewY":-25.9,"x":247.8,"y":164.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.1,"regY":17.4,"scaleX":1,"scaleY":1,"skewX":-50.9,"skewY":-52.1,"x":251.1,"y":176.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewY":-52.2,"y":188.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":213.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewY":-52.1,"y":237.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-33.9,"skewY":-34.6,"x":248.8,"y":240.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"skewX":-16.8,"skewY":-17.1,"x":246.7,"y":243.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12,"regY":17.3,"scaleX":1,"scaleY":1,"skewX":0,"skewY":0,"x":244.5,"y":246.8},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_8"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":184.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":211.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":238.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":252.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":266},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":263},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":264.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":266},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_9"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":217.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":231.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":244.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":258.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":271.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":285.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":298.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":295.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":297.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":298.8},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_10"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.2,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":172.7,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":186.2,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":199.8,"mode":"single","startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-0.3,"y":212.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":48.9,"rotation":-0.8,"y":224.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":49,"regY":-83.3,"rotation":-14.1,"x":315,"y":235.5,"startPosition":5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":-83.5,"rotation":-10.3,"x":313.9,"y":236,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":-83.3,"rotation":-4.8,"x":310.4,"y":232.6,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"y":233.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"y":234.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":7},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_11"]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.5,"x":272.7,"y":108},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":7,"x":275.6,"y":122.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":44.9,"scaleX":1,"scaleY":1,"rotation":10.5,"x":278.5,"y":137.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":45,"rotation":14,"x":281.4,"y":152.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":17.6,"x":284.4,"y":167.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":21.1,"x":287.3,"y":182.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":24.7,"x":290.2,"y":197.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":44.9,"regY":43.4,"rotation":0,"skewX":19.5,"skewY":20.2,"x":286.7,"y":193.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":43.5,"scaleX":1,"scaleY":1,"skewX":22.1,"skewY":22.3,"x":288.5,"y":195.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":45,"scaleX":1,"scaleY":1,"rotation":24.7,"skewX":0,"skewY":0,"x":290.2,"y":197.5},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_12"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":29.9,"y":180.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"rotation":29.8,"y":194.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.8,"scaleX":1,"scaleY":1,"y":207.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"y":221.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"y":248.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"x":246.6,"y":262.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":259.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"y":260.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"y":262.2},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_13"]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.6,"x":270.5,"y":158.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":7.3,"x":271.4,"y":172.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":26.2,"scaleX":1,"scaleY":1,"rotation":11,"x":272.3,"y":186.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":26.1,"rotation":14.8,"x":273.2,"y":200.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":18.5,"x":274.1,"y":214.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":26.2,"rotation":22.3,"x":275,"y":228.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":26,"x":275.9,"y":242.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":239.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":25.8,"y":240.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":26,"y":242.4},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_14"]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":7.8,"x":248.9,"y":147.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":15.8,"x":248.8,"y":161.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":23.8,"x":248.5,"y":174.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.1,"rotation":31.8,"x":248.4,"y":188.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.2,"scaleX":1,"scaleY":1,"rotation":39.8,"x":248.2,"y":201.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.1,"rotation":47.7,"x":248,"y":215.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.3,"regY":12.2,"scaleX":1,"scaleY":1,"rotation":55.7,"x":247.8,"y":228.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":12.2,"regY":12.1,"rotation":0,"x":249.1,"y":226.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":227.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229.1},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_15"]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":245.8,"y":122.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":246.8,"y":136.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":247.7,"y":149.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":248.6,"y":163.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":249.5,"y":176.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":250.4,"y":190.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":251.3,"y":203.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":202.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":203.9},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_16"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":36.2,"scaleX":0.99,"scaleY":1,"rotation":0,"skewX":-47.2,"skewY":-44.7,"x":269.1,"y":210},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":36.3,"scaleX":0.98,"scaleY":1.01,"skewX":-49.5,"x":270.7,"y":222.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":36.2,"scaleX":0.97,"scaleY":1.01,"skewX":-51.9,"x":272,"y":234.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":36.3,"scaleX":0.96,"scaleY":1.02,"skewX":-54.2,"x":273.6,"y":246.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":36.2,"scaleX":0.95,"scaleY":1.03,"skewX":-56.5,"x":275,"y":258.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":36.3,"scaleX":0.95,"scaleY":1.03,"skewX":-58.9,"x":276.5,"y":270.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":36.1,"regY":42,"scaleX":0.94,"scaleY":1.04,"skewX":-61.2,"x":278,"y":282.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":42.1,"scaleX":1,"x":279.6,"y":277.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1.04,"y":279.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1.04,"y":280.9},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_17"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":31.6,"scaleX":1,"scaleY":1,"rotation":26.1,"x":228.5,"y":247.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":31.7,"scaleX":1,"scaleY":1,"rotation":52.4,"x":221.1,"y":256.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":18.9,"scaleX":1,"scaleY":1,"rotation":32.6,"x":226.1,"y":270.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":18.8,"scaleX":1,"scaleY":1,"rotation":12.8,"x":231,"y":284.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":31.6,"rotation":-6.6,"x":235.9,"y":298.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":18.9,"regY":31.7,"rotation":-26.3,"x":241,"y":312.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":18.8,"scaleX":1,"scaleY":1,"rotation":-46,"x":245.9,"y":326.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-42.6,"x":245.8,"y":323.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-44.2,"x":245.9,"y":325.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-46,"y":326.6},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_18"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":25,"regY":36.9,"scaleY":0.98,"skewX":-1.8,"skewY":-1.6,"x":302.3,"y":272},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":24.9,"regY":36.8,"scaleY":0.96,"skewX":-3.8,"skewY":-3.6,"x":306,"y":281.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":36.9,"scaleY":0.94,"skewX":-5.9,"skewY":-5.6,"x":309.8,"y":291.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":36.8,"scaleY":0.91,"skewX":-8.1,"skewY":-7.6,"x":313.5,"y":301},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.89,"skewX":-10.1,"skewY":-9.6,"x":317.3,"y":310.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":0.87,"skewX":-12.1,"skewY":-11.6,"x":321.1,"y":320.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":36.6,"scaleX":1,"scaleY":0.85,"skewX":-14.3,"skewY":-13.7,"x":324.9,"y":330.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":327.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":25,"scaleX":1,"scaleY":0.85,"skewY":-13.6,"x":325,"y":328.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":24.9,"scaleX":1,"scaleY":0.85,"skewY":-13.7,"x":324.9,"y":330.1},0]},{"n":"wait","a":[5]}],[{"n":"get","a":["instance_19"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149.2,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.7,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":176.3,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":189.8,"mode":"single","startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":207.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"skewX":29.2,"skewY":209.3,"x":235.9,"y":214.5,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":48.9,"skewX":1.5,"skewY":181.6,"x":227.7,"y":222.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":49,"skewX":0,"skewY":180,"x":228.9,"y":227.5,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":230.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":7},0]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[152.3,48.8,238.3,250.2],"frameBounds":[[152.3,48.8,238.3,250.2],[117.8,61.4,307.2,247.3],[81.7,74.1,379.4,244.4],[45.3,86.9,452.1,241.1],[53.7,100,435.4,237.7],[53.7,113.3,436,234],[53.7,126.8,436.8,230.1],[22.6,114.8,531.9,251.8],[42.3,138.3,471.1,225.3],[70.6,139.4,410.5,244.7],[70.6,140.3,410.4,244.7],[70.6,140.3,410.5,245.8],[70.6,140.3,410.5,245.8],[70.6,140.3,410.5,245.8],[70.6,140.3,410.5,245.8]]},"Fly_Enemy_SideWalk_JSCC":{"shapes":[{"bn":"shape","gn":"171"}],"containers":[{"bn":"instance","t":[227,200.5,1,1,0,0,0,51.9,42.5],"gn":"Dragon_Head"},{"bn":"instance_1","t":[290.1,128.4,1,1,0,0,0,19.1,16.6],"gn":"Armor_02"},{"bn":"instance_2","t":[278.2,137.3,1,1,0,0,0,35.8,30.7],"gn":"Armor"},{"bn":"instance_3","t":[297.2,157.9,1,1,0,0,180,12,17.3],"gn":"Heand"},{"bn":"instance_4","t":[285.7,176,1,1,0,-29.9,150,11.2,13.8],"gn":"Leg"},{"bn":"instance_5","t":[291.9,138.5,1,1,0,0,180,12.2,12.1],"gn":"Sholder"},{"bn":"instance_6","t":[262.1,238,1,1,0,0,180,18.8,31.7],"gn":"Dragon_Leg"},{"bn":"instance_7","t":[264.8,171.2,1,1,0,0,0,16.1,4.8],"gn":"Belt"},{"bn":"instance_8","t":[268.6,204,1,1,0,0,0,29.1,42.3],"gn":"Sedlo"},{"bn":"instance_10","t":[269.8,93.1,1,1,0,0,0,45,43.5],"gn":"Head"},{"bn":"instance_11","t":[246.7,167.3,1,1,30,0,0,11.2,13.8],"gn":"Leg"},{"bn":"instance_12","t":[269.5,144.1,1,1,0,0,0,26.1,25.8],"gn":"Body"},{"bn":"instance_13","t":[244.5,152,1,1,0,0,0,12,17.3],"gn":"Heand"},{"bn":"instance_14","t":[249.1,134.3,1,1,0,0,0,12.2,12.1],"gn":"Sholder"},{"bn":"instance_15","t":[244.9,109.1,1,1,0,0,0,27.9,33.4],"gn":"Bag"},{"bn":"instance_16","t":[267.7,197.9,1,1,-44.9,0,0,36.3,42.1],"gn":"Dragon_Body"},{"bn":"instance_17","t":[235.8,238,1,1,0,0,0,18.8,31.7],"gn":"Dragon_Leg"},{"bn":"instance_18","t":[298.4,262.2,1,1,0,0,0,24.9,36.8],"gn":"D_tail"}],"animations":[{"bn":"instance_9","t":[313.9,145.6,1,1,0,0,0,49,-83.5],"gn":"Wing_Animation","a":["synched",0]},{"bn":"instance_19","t":[228.9,135.7,1,1,0,0,180,49,-83.5],"gn":"Wing_Animation","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":195.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":193},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":185.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":182.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":185.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":193},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":195.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.5},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":124.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":122.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":120.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":118.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":117},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":115.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":113.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":115.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":118.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":120.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":123.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.4},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":127.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":124},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":122.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":124.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":127.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":156},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":154.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":152.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":150.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":148.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":147.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":150.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":152.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":155.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":157.9},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-29.7,"skewY":150.1,"y":174.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":172.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":170.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":168.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":166.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":164.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-29.8,"skewY":150,"y":160.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-29.7,"skewY":150.1,"x":285.8,"y":163.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":165.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":168.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":171},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":173.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":-29.8,"skewY":150,"x":285.7,"y":176},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":127.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":123.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.5},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":230.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":228},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":222.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":220.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":222.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":228},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":230.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":238},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":169.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":167.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":165.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":161.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":157.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":156},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":158.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":161.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":166.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":168.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":171.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":202.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":196.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":194.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":191.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":193.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":196.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":199},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":201.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":204},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape"}]},7]},{"n":"to","a":[{"state":[]},2]},{"n":"wait","a":[6]}],[{"n":"get","a":["instance_9"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143.1,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.6,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.1,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.6,"startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.1,"startPosition":5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.5,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.5,"startPosition":8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.1,"startPosition":9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.6,"startPosition":10},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.1,"startPosition":11},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.6,"startPosition":12},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143.1,"startPosition":13},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.6,"startPosition":14},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_10"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":91.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":89.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":87.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":83.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":81.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":79.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":77.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":82.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":90.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":93.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_11"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":29.9,"y":165.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":161.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":157.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":155.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":154},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":30,"y":152.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"scaleX":1,"scaleY":1,"rotation":29.9,"y":154.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":157.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":164.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.8,"scaleX":1,"scaleY":1,"rotation":30,"y":167.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_12"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":139},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":141.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_13"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":150.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":148.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":139.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":141.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":152},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_14"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":124.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":122.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":121},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":119.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":121.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":124.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_15"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":107.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":105.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":101.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":99.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":97.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":95.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":93.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":96.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":99},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":101.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":104.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":106.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":109.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_16"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-44.7,"y":195.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":187.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":185.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":182.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-44.8,"y":180.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-44.7,"y":182.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":185.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":187.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":195.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-44.8,"y":197.9},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_17"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":230.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":228},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":222.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":220.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":222.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":228},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":230.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":235.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":238},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_18"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":259.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":257.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":254.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":252.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":249.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":247.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":244.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":247.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":249.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":252.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":254.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":257.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":259.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":262.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_19"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.2,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.6,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.1,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.6,"startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":123.1,"startPosition":5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":120.6,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":118.1,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":120.6,"startPosition":8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":123.1,"startPosition":9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.6,"startPosition":10},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.1,"startPosition":11},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.6,"startPosition":12},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.2,"startPosition":13},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.7,"startPosition":14},0]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[152.3,48.8,238.3,250.2],"frameBounds":[[152.3,48.8,238.3,250.2],[117.8,46.9,307.2,249.6],[81.7,45.1,379.4,249],[45.3,43.2,452.1,248.4],[53.7,41.3,435.4,247.8],[7.1,39.3,528.7,247.2],[46.4,37.4,449.9,246.5],[70.6,35.6,401.7,245.9],[29.3,33.7,484.2,250.3],[63.6,36.2,415.6,250.3],[54.8,38.7,433.2,250.3],[58.6,41.3,425.7,250.3],[82.4,43.8,378,250.2],[109.6,46.3,323.7,250.3],[124.2,48.8,294.4,250.2]]},"Fly_Enemy_Walk_JSCC":{"shapes":[],"containers":[{"bn":"instance","t":[275.5,200.5,1,1,0,0,0,51.9,42.5],"gn":"Fly_Enemy_Walk_JSCC:Dragon_Head"},{"bn":"instance_1","t":[243.3,154.7,1,1,0,0,0,12,17.3],"gn":"Heand"},{"bn":"instance_2","t":[276.3,93.1,1,1,0,0,0,45,43.5],"gn":"Fly_Enemy_Walk_JSCC:Head"},{"bn":"instance_3","t":[282.5,137.3,1,1,0,0,0,35.8,30.7],"gn":"Fly_Enemy_Walk_JSCC:Armor"},{"bn":"instance_4","t":[308.2,154.2,1,1,0,0,180,12,17.3],"gn":"Heand"},{"bn":"instance_5","t":[298.5,167.3,1,1,0,-29.9,150,11.2,13.8],"gn":"Fly_Enemy_Walk_JSCC:Leg"},{"bn":"instance_6","t":[302.9,134.7,1,1,0,0,180,12.2,12.1],"gn":"Sholder"},{"bn":"instance_7","t":[247.9,137,1,1,0,0,0,12.2,12.1],"gn":"Sholder"},{"bn":"instance_8","t":[253.2,167.3,1,1,30,0,0,11.2,13.8],"gn":"Fly_Enemy_Walk_JSCC:Leg"},{"bn":"instance_9","t":[276,144.1,1,1,0,0,0,26.1,25.8],"gn":"Fly_Enemy_Walk_JSCC:Body"},{"bn":"instance_10","t":[243.1,111.9,1,1,0,0,0,27.9,33.4],"gn":"Bag"},{"bn":"instance_11","t":[295.6,238,1,1,0,0,180,18.8,31.7],"gn":"Fly_Enemy_Walk_JSCC:Dragon_Leg"},{"bn":"instance_12","t":[258.8,238,1,1,0,0,0,18.8,31.7],"gn":"Fly_Enemy_Walk_JSCC:Dragon_Leg"},{"bn":"instance_13","t":[276.2,262.2,1,1,0,0,0,24.9,36.8],"gn":"Fly_Enemy_Walk_JSCC:D_tail"}],"animations":[{"bn":"instance_14","t":[218.3,146.5,1,1,0,0,180,49,-83.5],"gn":"Wing_Animation","a":["synched",0]},{"bn":"instance_15","t":[331.9,145.6,1,1,0,0,0,49,-83.5],"gn":"Wing_Animation","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":196.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":194.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":186.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":188.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":190.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":192.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":194.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":196.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":198.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.5},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":153.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":152.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":150.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":148.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":147.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":151.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":153},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":154.7},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":91.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":90.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":89.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":87.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":86.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":84},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":82.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":84.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":86.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":87.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":89.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":91.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":93.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":152.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":151.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":150.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":147.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":147.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":149},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":150.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":152.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":154.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":11.1,"regY":13.9,"scaleX":1,"scaleY":1,"skewX":-29.7,"skewY":150.1,"x":298.6,"y":166},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":164.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":160.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":158.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":11.2,"regY":13.8,"scaleX":1,"scaleY":1,"skewX":-29.8,"skewY":150,"x":298.5,"y":156.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"scaleX":1,"scaleY":1,"skewX":-29.7,"skewY":150.1,"y":158.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":160.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":165.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.8,"scaleX":1,"scaleY":1,"skewX":-29.8,"skewY":150,"y":167.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":125.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":124.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":127.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.7},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":129.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":127.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":126.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":128.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":130.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":29.9,"y":166},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":164.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":160.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":159.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":158.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":30,"y":156.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.9,"scaleX":1,"scaleY":1,"rotation":29.9,"x":253.1,"y":158.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":160.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":162.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":163.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":165.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.8,"scaleX":1,"scaleY":1,"rotation":30,"x":253.2,"y":167.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_9"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":141.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_10"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":110.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":109.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":108},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":106.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":105.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":104.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":101.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":104.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":106.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":108.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":110.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":111.9},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_11"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":236.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":234.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":232.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":231.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":227.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":226},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":227.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":231.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":232.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":234.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":236.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":238},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_12"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":236},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":231.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":227.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":223.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":225.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":227.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":229.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":231.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":233.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":236},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":238},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_13"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":260.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":258.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":256.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":254},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":251.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":249.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":247.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":249.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":251.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":254},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":256.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":258.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":260.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":262.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_14"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.4,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.4,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.3,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.2,"startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.2,"startPosition":5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.1,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":132.1,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":134.1,"startPosition":8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":136.2,"startPosition":9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":138.2,"startPosition":10},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":140.3,"startPosition":11},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":142.4,"startPosition":12},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":144.4,"startPosition":13},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":146.5,"startPosition":14},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_15"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143.6,"startPosition":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":141.5,"startPosition":2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":139.5,"startPosition":3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.4,"startPosition":4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.3,"startPosition":5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.3,"startPosition":6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":131.2,"startPosition":7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":133.3,"startPosition":8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":135.3,"startPosition":9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":137.4,"startPosition":10},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":139.5,"startPosition":11},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":141.5,"startPosition":12},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":143.6,"startPosition":13},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":145.6,"startPosition":14},0]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[141.7,48.8,266.9,250.2],"frameBounds":[[141.7,48.8,266.9,250.2],[107.2,47.6,335.8,249.5],[71.1,46.3,408,248.7],[34.8,44.9,480.7,248],[43.1,43.7,464,247.2],[-3.5,42.3,557.3,246.4],[35.8,41.1,478.5,245.7],[59.9,39.8,430.3,244.9],[18.7,38.4,512.8,248.3],[53,40.2,444.2,248.6],[44.2,41.9,461.8,248.9],[47.9,43.7,454.3,249.3],[71.8,45.4,406.6,249.6],[98.9,47.1,352.3,249.9],[113.6,48.8,323,250.2]]},"Manimation":{"shapes":[{"bn":"shape","gn":"389","m":"mask"},{"bn":"shape_1","gn":"390","m":"mask"},{"bn":"shape_2","gn":"391","m":"mask"},{"bn":"shape_3","gn":"392","m":"mask"},{"bn":"shape_4","gn":"393","m":"mask"},{"bn":"shape_5","gn":"394","m":"mask"},{"bn":"shape_6","gn":"395","m":"mask"},{"bn":"shape_7","gn":"396","m":"mask"},{"bn":"shape_8","gn":"397","m":"mask"},{"bn":"shape_9","gn":"398","m":"mask"},{"bn":"shape_10","gn":"399","m":"mask"},{"bn":"shape_11","gn":"400","m":"mask"},{"bn":"shape_12","gn":"401","m":"mask"},{"bn":"shape_13","gn":"402","m":"mask"},{"bn":"shape_14","gn":"403","m":"mask"},{"bn":"shape_15","gn":"404","m":"mask"},{"bn":"shape_16","gn":"405","m":"mask"},{"bn":"shape_17","gn":"406","m":"mask"},{"bn":"shape_18","gn":"407","m":"mask"},{"bn":"shape_19","gn":"408","m":"mask"},{"bn":"shape_20","gn":"409","m":"mask"},{"bn":"shape_21","gn":"410","m":"mask"},{"bn":"shape_22","gn":"411","m":"mask"},{"bn":"shape_23","gn":"412","m":"mask"},{"bn":"shape_24","gn":"413","m":"mask"},{"bn":"shape_25","gn":"414","m":"mask"},{"bn":"shape_26","gn":"415","m":"mask"},{"bn":"shape_27","gn":"416","m":"mask"},{"bn":"shape_28","gn":"417","m":"mask"},{"bn":"shape_29","gn":"418","m":"mask"},{"bn":"shape_30","gn":"419","m":"mask"},{"bn":"shape_31","gn":"420","m":"mask"},{"bn":"shape_32","gn":"421","m":"mask"},{"bn":"shape_33","gn":"422","m":"mask"},{"bn":"shape_34","gn":"423","m":"mask"},{"bn":"shape_35","gn":"424","m":"mask"},{"bn":"shape_36","gn":"425","m":"mask"},{"bn":"shape_37","gn":"426","m":"mask"},{"bn":"shape_38","gn":"427","m":"mask"},{"bn":"shape_39","gn":"428","m":"mask"},{"bn":"shape_40","gn":"429","m":"mask"},{"bn":"shape_41","gn":"430","m":"mask"},{"bn":"shape_42","gn":"431","m":"mask"},{"bn":"shape_43","gn":"432","m":"mask"},{"bn":"shape_44","gn":"433","m":"mask"},{"bn":"shape_45","gn":"434","m":"mask"},{"bn":"shape_46","gn":"435","m":"mask"},{"bn":"shape_47","gn":"436","m":"mask"},{"bn":"shape_48","gn":"437","m":"mask"},{"bn":"shape_49","gn":"438","m":"mask"},{"bn":"shape_50","gn":"439","m":"mask"},{"bn":"shape_51","gn":"440","m":"mask"},{"bn":"shape_52","gn":"441","m":"mask"},{"bn":"shape_53","gn":"442","m":"mask"},{"bn":"shape_54","gn":"443","m":"mask"},{"bn":"mask","im":true},{"bn":"shape_55","gn":"444","m":"mask"},{"bn":"shape_56","gn":"445","m":"mask"},{"bn":"shape_57","gn":"446","m":"mask"}],"containers":[],"animations":[],"tweens":[[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape"}]}]},{"n":"to","a":[{"state":[{"t":"shape_1"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_2"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_4"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_5"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_7"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_4"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_8"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_9"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_10"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_11"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_13"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_14"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_15"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_16"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_17"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_19"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["shape"]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]},{"n":"to","a":[{"_off":false},0]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]},{"n":"to","a":[{"_off":false},0]},{"n":"wait","a":[3]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]},{"n":"to","a":[{"_off":false},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_20"}]}]},{"n":"to","a":[{"state":[{"t":"shape_21"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_22"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_23"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_24"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_25"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_26"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_27"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_26"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_24"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_28"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_29"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_30"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_31"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_32"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_31"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_29"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_33"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_34"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_31"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_35"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_36"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["shape_20"]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]},{"n":"to","a":[{"_off":false},0]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]},{"n":"to","a":[{"_off":false},0]},{"n":"wait","a":[3]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]},{"n":"to","a":[{"_off":false},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_37"}]}]},{"n":"to","a":[{"state":[{"t":"shape_38"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_39"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_40"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_41"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_42"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_43"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_44"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_43"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_41"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_45"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_46"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_47"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_48"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_49"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_50"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_46"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_51"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_52"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_48"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_53"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_54"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["shape_37"]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]},{"n":"to","a":[{"_off":false},0]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]},{"n":"to","a":[{"_off":false},0]},{"n":"wait","a":[3]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[7]},{"n":"to","a":[{"_off":false},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["mask"]},{"n":"to","a":[{"graphics":"mask_graphics_0","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_1","x":41.3,"y":53.1}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_2","x":41.4,"y":53.8}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_3","x":41.3,"y":53.7}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_4","x":41.4,"y":53.5}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_5","x":41.4,"y":53.2}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_6","x":41.4,"y":53}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_7","x":41.3,"y":52.7}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_8","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_9","x":41.3,"y":52.9}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_10","x":41.4,"y":53.5}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_11","x":41.2,"y":53.8}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_12","x":40.9,"y":54.1}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_13","x":41.1,"y":53.7}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_14","x":41.2,"y":53.3}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_15","x":41.3,"y":52.9}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_16","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_17","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_18","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_19","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_20","x":41.2,"y":53.3}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_21","x":40.9,"y":54.1}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_22","x":41.1,"y":53.6}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_23","x":41,"y":53.5}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_24","x":41.1,"y":53.3}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_25","x":41.2,"y":53}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_26","x":41.2,"y":52.7}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_27","x":41.3,"y":52.4}]},{"n":"wait","a":[1]}],[{"n":"get","a":["shape_55"]},{"n":"wait","a":[28]}],[{"n":"get","a":["shape_56"]},{"n":"wait","a":[28]}],[{"n":"get","a":["shape_57"]},{"n":"wait","a":[28]}]],"graphics":[{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_0"},{"p":"AgdAMQgNgHgEgMQArgMAvACIADAGQgMAbgcACIgDAAIgIABQgPAAgKgHg","bn":"mask_graphics_1"},{"p":"AglANQgMgLgCgQQAygMA1ABQgHAugpAEIgFABQgWAAgOgNg","bn":"mask_graphics_2"},{"p":"AgkANIgFgEQgLgJABgNQAxgMA1ACIABABQABAOgLALQgNASgYADIgFAAIgCAAQgVAAgNgLg","bn":"mask_graphics_3"},{"p":"AgpAJQgOgKAEgKQAxgMA2ABQAEAMgOAOQgPARgaACIgDAAQgYAAgPgOg","bn":"mask_graphics_4"},{"p":"AgmAJQgMgJABgIIAAgBQAugLAzABQACAEAAAFQgDAHgHAFQgOAQgXACIgBAAIgGAAQgUAAgOgLg","bn":"mask_graphics_5"},{"p":"AgiAKQgMgIgBgHIAAgBQAsgLAvABQADADABADQgDAHgGAEQgOAPgVABIgBAAIgIAAQgRAAgMgHg","bn":"mask_graphics_6"},{"p":"AgeAKQgLgGgDgHIgBAAQApgLAsABIAGACQgEAHgFAEQgNANgUAAIgBAAIgLACQgNAAgJgFg","bn":"mask_graphics_7"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_8"},{"p":"AgiAMQgMgIgBgJQAugMAwABQACACgDAIQgDAHgEADQgOALgXABIgNABQgOAAgJgFg","bn":"mask_graphics_9"},{"p":"AgYAVQgNgDgHgGQgNgLAGgMQAxgMA2ACQAHAUgQAIQgUANgUACIgJABQgJAAgJgCg","bn":"mask_graphics_10"},{"p":"AgEAZQgMAAgIgFQgIgEgGgMQgGgIAAgJQAJgHAVgCIAigBIARgBQAHgBAAADQABAXgNAMQgDACgQAIQgGACgHAAIgEAAg","bn":"mask_graphics_11"},{"p":"AglALQgFgRAKgPQAWgFAKgBIAjABQALAYgOAMQgNAOgYADIgHABQgUAAgFgRg","bn":"mask_graphics_12"},{"p":"AgZAVQgEgDgEgKIgCgDIgCgKQgBgGACgEIAmgIIAiABIAAAAQAGAWgOAKQgGAEgHADQgLAFgMABIgFABQgIAAgEgDg","bn":"mask_graphics_13"},{"p":"AgWASQgGgDgEgHIgCgCIgFgKQABgEADgDQAdgGAJgBIAgAAIABAAIAEAGQgCAMgKAIQgGAEgGACIgNAEIgKACIgEAAQgHAAgEgCg","bn":"mask_graphics_14"},{"p":"AgUAPQgGgCgFgFIgCgCQgEgDgEgFIAHgFQAZgGANgBIAfgBIABAAIAGADQgFAMgKAGQgEAEgGACQgGABgHABIgKACIgEAAQgGAAgEgBg","bn":"mask_graphics_15"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_16"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_17"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_18"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_19"},{"p":"AghAEIgGgNQABgEAFABQAHABAEgDQASgEALgBIAhABQgBATgPAJQgFADgHACQgMAFgKAAQgNgBgKgPg","bn":"mask_graphics_20"},{"p":"AglALQgFgRAKgPQAWgFAKgBIAjABQALAYgOAMQgNAOgYADIgHABQgUAAgFgRg","bn":"mask_graphics_21"},{"p":"AgJAYQgVAAgHgTIAAgBQgBgLADgGQABgCAEgBIAGgDQANgDAIgBIAJAAIAZAAIAGADQAEARgHAIIgHAHIgCACQgLAIgOACIgGAAIgDAAg","bn":"mask_graphics_22"},{"p":"AgNAUQgPgDgIgRIgBgCQABgCgBgDQgCgEACgCIAKgBIAEgBIAGgCQANgDAGgBIAAAAIAKAAIAXAAIABAAIAAABIADAEQABAPgIAHIgDACIgFAFIgCABIgEABQgKAGgLABIgCAAQgFAAgDgCg","bn":"mask_graphics_23"},{"p":"AgngKQAJACAIgGQASgEAMgBIAfABIABAAQAAATgPAJQgFADgHACQgLAEgLABIAAAAQgPAAgPgeg","bn":"mask_graphics_24"},{"p":"AgogHIAAAAQAJAAAJgEQARgEAMgBIAfAAIABAAIACAFQgEAMgMAHQgFADgHACIgIACIgNACIgBAAQgRAAgOgYg","bn":"mask_graphics_25"},{"p":"AgpgEIAAAAQAJgBAJgDQAQgEANgBIAfgBIABAAIAEADQgGAMgLAGQgGADgFABIgJABIgLACIgDABQgUAAgMgTg","bn":"mask_graphics_26"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_27"}],"bounds":[-83.8,-69.2,10.3,5.3],"frameBounds":[[-83.8,-69.2,10.3,5.3],[-83.8,-69.2,10.3,5.3],[-24,-9.100000000000001,10.8,6.9],[-24,-9.200000000000003,10.8,7],[-204.1,-189.2,11,5.7],[-204.1,-189.2,11,5.7],[-204.1,-189.2,11,5.7],[-204.1,-189.2,11,5.7],[-83.8,-69.2,10.1,4.6],[-83.8,-69.2,10.1,4.6],[-24.1,-9.200000000000003,11,6.1],[-24.1,-9.100000000000001,11,6],[-203.3,-189.1,9.2,6.4],[-203.3,-189.1,9.2,6.4],[-203.3,-189.1,9.2,6.4],[-203.3,-189.1,9.2,6.4],[-143.6,-129.2,9.9,3.5],[-143.6,-129.2,9.9,3.5],[-143.6,-129.2,9.9,3.5],[-83.6,-69.2,9.9,5],[-83.6,-69.2,9.9,5],[-323.4,-309.2,9.4,6.5],[-323.4,-309.2,9.4,6.5],[-323.4,-309.2,9.4,6.5],[-323.4,-309.2,9.4,6.5],[-323.4,-309.2,9.4,6.5],[-323.4,-309.2,9.4,6.5],[-23.6,-9.200000000000003,9.9,3.5]]},"portrait":{"shapes":[{"bn":"shape","gn":"447"},{"bn":"shape_1","gn":"448"},{"bn":"shape_2","gn":"449"},{"bn":"shape_3","gn":"450"},{"bn":"shape_4","gn":"451"},{"bn":"shape_5","gn":"452"},{"bn":"shape_6","gn":"453"},{"bn":"shape_7","gn":"454"},{"bn":"shape_8","gn":"455"},{"bn":"shape_9","gn":"456"},{"bn":"shape_10","gn":"457"},{"bn":"shape_11","gn":"458"},{"bn":"shape_12","gn":"459"},{"bn":"shape_13","gn":"460"},{"bn":"shape_14","gn":"461"},{"bn":"shape_15","gn":"462"},{"bn":"shape_16","gn":"463"},{"bn":"shape_17","gn":"464"},{"bn":"shape_18","gn":"465"},{"bn":"shape_19","gn":"466"},{"bn":"shape_20","gn":"467"},{"bn":"shape_21","gn":"468"},{"bn":"shape_22","gn":"469"},{"bn":"shape_23","gn":"470"},{"bn":"shape_24","gn":"471"},{"bn":"shape_25","gn":"472"},{"bn":"shape_26","gn":"473"},{"bn":"shape_27","gn":"474"},{"bn":"shape_28","gn":"475"},{"bn":"shape_29","gn":"476"},{"bn":"shape_30","gn":"477"},{"bn":"shape_31","gn":"478"},{"bn":"shape_32","gn":"479"},{"bn":"shape_33","gn":"480"},{"bn":"shape_34","gn":"481"},{"bn":"shape_35","gn":"482"},{"bn":"shape_36","gn":"483"},{"bn":"shape_37","gn":"484"},{"bn":"shape_38","gn":"485"},{"bn":"shape_39","gn":"486"},{"bn":"shape_40","gn":"487"},{"bn":"shape_41","gn":"488"},{"bn":"shape_42","gn":"489"},{"bn":"shape_43","gn":"490"},{"bn":"shape_44","gn":"491"},{"bn":"shape_45","gn":"492"},{"bn":"shape_46","gn":"493"},{"bn":"shape_47","gn":"494"},{"bn":"shape_48","gn":"495"},{"bn":"shape_49","gn":"496"},{"bn":"shape_50","gn":"497"},{"bn":"shape_51","gn":"498"},{"bn":"shape_52","gn":"499"},{"bn":"shape_53","gn":"500"},{"bn":"shape_54","gn":"501"},{"bn":"shape_55","gn":"502"},{"bn":"shape_56","gn":"503"},{"bn":"shape_57","gn":"504"},{"bn":"shape_58","gn":"505"},{"bn":"shape_59","gn":"506"},{"bn":"shape_60","gn":"507"},{"bn":"shape_61","gn":"508"},{"bn":"shape_62","gn":"509"},{"bn":"shape_63","gn":"510"},{"bn":"shape_64","gn":"511"},{"bn":"shape_65","gn":"512"},{"bn":"shape_66","gn":"513"},{"bn":"shape_67","gn":"514"},{"bn":"shape_68","gn":"515"},{"bn":"shape_69","gn":"516"},{"bn":"shape_70","gn":"517"},{"bn":"shape_71","gn":"518"},{"bn":"shape_72","gn":"519"},{"bn":"shape_73","gn":"520"},{"bn":"shape_74","gn":"521"}],"containers":[{"bn":"instance","t":[59.6,51.2,1,1,0,0,0,59.2,51.2],"gn":"Helm_3"},{"bn":"instance_2","t":[58,88,1,1,0,0,0,7.3,5],"gn":"Eye_5"},{"bn":"instance_3","t":[89.5,85,1,1,0,0,0,4.9,5],"gn":"Eye_51"},{"bn":"instance_4","t":[74.9,91.9,1,1,0,0,0,10.7,4.5],"gn":"NOuse_5"},{"bn":"instance_5","t":[62.2,75.5,1,1,0,0,0,34.9,43.4],"gn":"Face_05"}],"animations":[{"bn":"instance_1","t":[77.1,104,1.922,1.922,-0.9,0,0,41.8,53.7],"gn":"Manimation","a":["synched",0,false]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.6},0]},{"n":"wait","a":[3]},{"n":"to","a":[{"y":51.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.5},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":51.6},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":51.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.4},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":51.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":51.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape"}]}]},{"n":"to","a":[{"state":[{"t":"shape_1"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_2"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_4"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_5"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_7"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_8"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_9"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_10"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_11"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_13"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_14"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_15"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_16"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_17"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_19"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_22"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_23"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_24"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_25"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_26"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_27"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"wait","a":[28]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_53"},{"t":"shape_52"},{"t":"shape_51"},{"t":"shape_50"},{"t":"shape_49"},{"t":"shape_48"},{"t":"shape_47"},{"t":"shape_46"},{"t":"shape_45"},{"t":"shape_44"},{"t":"shape_43"},{"t":"shape_42"},{"t":"shape_41"},{"t":"shape_40"},{"t":"shape_39"},{"t":"shape_38"},{"t":"shape_37"},{"t":"shape_36"},{"t":"shape_35"},{"t":"shape_34"},{"t":"shape_33"},{"t":"shape_32"},{"t":"shape_31"},{"t":"shape_30"},{"t":"shape_29"},{"t":"shape_28"}]}]},{"n":"to","a":[{"state":[{"t":"shape_53"},{"t":"shape_52"},{"t":"shape_51"},{"t":"shape_50"},{"t":"shape_49"},{"t":"shape_48"},{"t":"shape_47"},{"t":"shape_46"},{"t":"shape_45"},{"t":"shape_44"},{"t":"shape_43"},{"t":"shape_42"},{"t":"shape_41"},{"t":"shape_40"},{"t":"shape_39"},{"t":"shape_38"},{"t":"shape_37"},{"t":"shape_36"},{"t":"shape_35"},{"t":"shape_34"},{"t":"shape_33"},{"t":"shape_32"},{"t":"shape_31"},{"t":"shape_30"},{"t":"shape_29"},{"t":"shape_28"}]},27]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.2},0]},{"n":"wait","a":[4]},{"n":"to","a":[{"y":88.1},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":88},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.3},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":88.4},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":88.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88.2},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":88.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":88},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.4},0]},{"n":"wait","a":[3]},{"n":"to","a":[{"y":85.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.1},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":85.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.2},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":85.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85},0]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_4"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":91.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":91.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":92.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":92.1},0]},{"n":"wait","a":[2]},{"n":"to","a":[{"y":92},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":91.9},0]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_5"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.03},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":43.3,"scaleY":1.01,"y":75.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":43.4,"scaleY":1,"y":75.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.03},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.04,"y":75.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.05,"y":75.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.04},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.03},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.04},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.06},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.07},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.06},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.05},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.03},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_74"},{"t":"shape_73"},{"t":"shape_72"},{"t":"shape_71"},{"t":"shape_70"},{"t":"shape_69"},{"t":"shape_68"},{"t":"shape_67"},{"t":"shape_66"},{"t":"shape_65"},{"t":"shape_64"},{"t":"shape_63"},{"t":"shape_62"},{"t":"shape_61"},{"t":"shape_60"},{"t":"shape_59"},{"t":"shape_58"},{"t":"shape_57"},{"t":"shape_56"},{"t":"shape_55"},{"t":"shape_54"}]}]},{"n":"wait","a":[28]}]],"graphics":[],"bounds":[0.10000000000000142,0,120.8,123],"frameBounds":[[0.10000000000000142,0,120.8,123],[0.10000000000000142,0.20000000000000284,120.8,122.8],[-119.9,-119.6,120.8,122.6],[-119.9,-119.6,120.8,122.6],[-119.9,-119.6,120.8,122.6],[0.10000000000000142,0.29999999999999716,120.8,122.7],[0.10000000000000142,0.20000000000000284,120.8,122.8],[0.10000000000000142,0.10000000000000142,120.8,122.9],[0.10000000000000142,0,120.8,123],[0.10000000000000142,0.10000000000000142,120.8,122.9],[0.10000000000000142,0.20000000000000284,120.8,122.8],[0.10000000000000142,0.29999999999999716,120.8,122.7],[0.10000000000000142,0.3999999999999986,120.8,122.6],[0.10000000000000142,0.29999999999999716,120.8,122.7],[0.10000000000000142,0.20000000000000284,120.8,122.8],[0.10000000000000142,0.10000000000000142,120.8,122.9],[0.10000000000000142,0,120.8,123],[0.10000000000000142,0.10000000000000142,120.8,122.9],[0.10000000000000142,0.20000000000000284,120.8,122.8],[-59.9,-59.7,120.8,122.7],[-59.9,-59.7,120.8,122.7],[-59.9,-59.6,120.8,122.6],[-59.9,-59.6,120.8,122.6],[0.10000000000000142,0.29999999999999716,120.8,122.7],[-59.9,-59.8,120.8,122.8],[-59.9,-59.8,120.8,122.8],[0.10000000000000142,0.10000000000000142,120.8,122.9],[0.10000000000000142,0,120.8,123]]},"Wing_Animation:Wing_Animation":{"shapes":[],"containers":[{"bn":"instance","t":[53.6,-122,0.854,0.854,-41,0,0,7.3,29.9],"gn":"Wing_Animation:WingPart_01"},{"bn":"instance_1","t":[36.5,-35.8,0.854,0.854,-29,0,0,34.6,83],"gn":"Wing_Animation:WingPart_03"},{"bn":"instance_2","t":[61.2,-128.9,0.854,0.446,-56.9,0,0,11.2,11.8],"gn":"Wing_Animation:WingPart_02"},{"bn":"instance_3","t":[62.9,-121.8,0.854,0.603,-20,0,0,9.5,8.3],"gn":"Wing_Animation:WingPart_02"},{"bn":"instance_4","t":[55.4,-123.7,0.788,0.745,0,-31,-32.9,81.6,10.5],"gn":"Wing_Animation:WingPart_05"},{"bn":"instance_5","t":[64.9,-125.4,0.593,0.531,0,-22.5,-32.2,15.3,13.8],"gn":"Wing_Animation:WingPart_04"}],"animations":[],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"scaleX":0.82,"scaleY":0.79,"rotation":-11,"x":98.5,"y":-86.7},4]},{"n":"to","a":[{"scaleY":0.7,"rotation":9.3,"x":95.7,"y":-49},1]},{"n":"to","a":[{"scaleX":0.82,"scaleY":0.61,"rotation":29.4,"x":92.9,"y":-11.1},1]},{"n":"to","a":[{"scaleX":0.82,"scaleY":0.53,"rotation":49.7,"x":90.1,"y":26.6},1]},{"n":"to","a":[{"regX":7.2,"regY":29.8,"scaleY":0.66,"rotation":19.3,"x":101.2,"y":-28},2]},{"n":"to","a":[{"regX":7.3,"regY":29.9,"scaleY":0.79,"rotation":-11,"x":98.5,"y":-86.7},2]},{"n":"to","a":[{"scaleX":0.84,"scaleY":0.83,"rotation":-30.9,"x":68.5,"y":-110.2},2]},{"n":"to","a":[{"scaleX":0.84,"scaleY":0.84,"rotation":-34.1,"x":63.5,"y":-114.2},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"rotation":10.5},4]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.85,"rotation":38.6,"x":33.8,"y":-36.5},1]},{"n":"to","a":[{"regX":34.5,"scaleX":0.85,"scaleY":0.85,"rotation":66.9,"x":31.1,"y":-37.1},1]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.85,"rotation":95.2,"x":28.5,"y":-37.7},1]},{"n":"to","a":[{"regX":34.6,"scaleX":0.85,"scaleY":0.85,"rotation":52.9,"x":32.5,"y":-36.7},2]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.85,"rotation":10.5,"x":36.5,"y":-35.8},2]},{"n":"to","a":[{"regX":34.5,"scaleX":0.85,"scaleY":0.85,"rotation":-15.8,"x":36.4},2]},{"n":"to","a":[{"regX":34.4,"scaleX":0.85,"scaleY":0.85,"rotation":-20.1},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"scaleY":0.9,"rotation":-86.5,"x":105.7,"y":-89.8},4]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.79,"rotation":0,"skewX":-80.7,"skewY":-20.5,"x":102.6,"y":-50.7},1]},{"n":"to","a":[{"regY":11.7,"scaleX":0.84,"scaleY":0.73,"skewX":-94,"skewY":25.8,"x":99.7,"y":-11.6},1]},{"n":"to","a":[{"regX":11.1,"scaleX":0.83,"scaleY":0.79,"skewX":-97.7,"skewY":82.3,"x":101.7,"y":27.9},1]},{"n":"to","a":[{"regX":11.2,"regY":11.8,"scaleX":0.85,"scaleY":0.82,"rotation":-49.6,"skewX":0,"skewY":0,"x":114.3,"y":-33.1},2]},{"n":"to","a":[{"scaleY":0.85,"rotation":-67.1,"x":105.6,"y":-89.8},2]},{"n":"to","a":[{"regX":11.3,"scaleX":0.85,"scaleY":0.67,"rotation":-67.2,"x":76.9,"y":-114.9},2]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.59,"rotation":-63.9,"x":71.7,"y":-119.5},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"regY":8.5,"scaleY":0.49,"rotation":-7.5,"x":105.4,"y":-84.3},4]},{"n":"to","a":[{"regX":9.4,"regY":8.3,"scaleY":0.42,"rotation":0,"skewX":50.7,"skewY":-7.1,"x":101.7,"y":-48.4},1]},{"n":"to","a":[{"scaleY":0.35,"skewX":108.8,"skewY":-6.8,"x":98,"y":-12.5},1]},{"n":"to","a":[{"regX":9.6,"regY":8.6,"scaleY":0.29,"skewX":167,"x":94.3,"y":23.5},1]},{"n":"to","a":[{"regX":9.5,"regY":8.4,"scaleY":0.3,"rotation":-7.5,"skewX":0,"skewY":0,"x":107.2,"y":-29.2},2]},{"n":"to","a":[{"regY":8.5,"scaleY":0.49,"x":105.4,"y":-84.3},2]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.69,"rotation":-19.8,"x":77.6,"y":-108},2]},{"n":"to","a":[{"regX":9.6,"scaleX":0.85,"scaleY":0.66,"x":72.8,"y":-112.6},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"regX":81.5,"regY":10.7,"scaleX":0.86,"scaleY":0.59,"skewX":-14.4,"skewY":-10.7,"x":103,"y":-86.6},4]},{"n":"to","a":[{"regX":81.7,"regY":11.1,"scaleY":0.23,"skewX":43.7,"skewY":-0.5,"x":88.6,"y":-37.1},1]},{"n":"to","a":[{"regY":11.2,"scaleX":0.86,"scaleY":0.29,"skewX":111.5,"skewY":9.6,"x":92.9,"y":-19.2},1]},{"n":"to","a":[{"regX":81.4,"regY":11,"scaleX":0.86,"scaleY":0.36,"skewX":179.5,"skewY":19.9,"x":91.6,"y":24.9},1]},{"n":"to","a":[{"regY":11.2,"scaleY":0.21,"skewX":-0.5,"x":115.6,"y":-21.7},2]},{"n":"to","a":[{"regX":81.5,"regY":10.7,"scaleY":0.59,"skewX":-14.4,"skewY":-10.7,"x":103,"y":-86.6},2]},{"n":"to","a":[{"scaleX":0.86,"scaleY":0.75,"skewX":-25.3,"skewY":-16.5,"x":77.1,"y":-100.3},2]},{"n":"to","a":[{"regX":81.4,"scaleX":0.83,"scaleY":0.74,"skewX":-27.1,"skewY":-21.8,"x":69.9,"y":-108},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"regX":15.5,"scaleX":1.64,"scaleY":0.55,"skewX":-6.5,"skewY":-30.3,"x":107.2,"y":-82.9},4]},{"n":"to","a":[{"regX":43.6,"regY":61,"scaleX":2.11,"scaleY":0.59,"skewX":64.3,"skewY":-4.3,"x":142.6,"y":-40.3},1]},{"n":"to","a":[{"regX":43.8,"regY":61.2,"scaleX":1.62,"scaleY":0.42,"skewX":121.8,"skewY":7.6,"x":136.8,"y":-12.1},1]},{"n":"to","a":[{"regX":15.4,"regY":13.7,"scaleX":1.49,"scaleY":0.34,"skewX":179.3,"skewY":19.7,"x":94,"y":22.8},1]},{"n":"to","a":[{"regX":15.3,"regY":13.9,"scaleX":1.13,"scaleY":0.31,"skewX":9.8,"skewY":14.2,"x":116.8,"y":-30.2},2]},{"n":"to","a":[{"regX":15.4,"regY":13.8,"scaleX":1.26,"scaleY":0.5,"skewX":-8.7,"skewY":-15.1,"x":110.3,"y":-81},2]},{"n":"to","a":[{"regY":13.6,"scaleX":0.97,"scaleY":0.72,"skewX":-21.9,"skewY":-44.2,"x":85.7,"y":-107.2},2]},{"n":"to","a":[{"regY":13.7,"scaleX":0.84,"scaleY":0.66,"skewX":-22.1,"skewY":-40.1,"x":78.8,"y":-113.3},1]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[-27.7,-161.6,153.4,156.2],"frameBounds":[[-302.7,-361.6,153.4,156.2],[-264.7,-341.8,135.4,131],[-268.2,-332.8,165.1,118],[-270.8,-323.4,194,104.4],[-273.2,-351.6,222.4,147.1],[-280.1,-314.6,276,130.6],[-288.3,-295.7,244.8,123],[-269,-271.1,201.4,136.1],[-268.2,-264.6,219.2,96.6],[-275.3,-307.2,214.7,153.5],[-274.8,-280.6,211.7,74.4],[-273.2,-321.1,217.6,116.6],[-270,-326.6,184.2,108.9],[-289.6,-366.7,183,167.9],[-294.1,-362.1,172.8,159.8]]},"fangrider_eat":{"shapes":[{"bn":"shape","gn":"171"}],"containers":[{"bn":"instance","t":[227.3,202.2,0.999,0.999,13.2,0,0,51.9,42.4],"gn":"Wing_Animation:Dragon_Head_Jaw1"},{"bn":"instance_1","t":[227.1,210.1,1,1,13.3,0,0,51.8,42.5],"gn":"Wing_Animation:Dragon_Head_Jaw2"},{"bn":"instance_2","t":[225.5,218.1,1,1,13.2,0,0,52,42.5],"gn":"Wing_Animation:Dragon_Head_Jaw3"},{"bn":"instance_3","t":[225.7,218.4,1,1,6.5,0,0,51.9,42.5],"gn":"Dragon_Head_Jaw"},{"bn":"instance_4","t":[227,212.2,1,1,1.2,0,0,51.9,42.4],"gn":"Wing_Animation:Dragon_Head"},{"bn":"instance_5","t":[227,182.9,1,1,0,0,0,51.9,42.5],"gn":"Wing_Animation:Dragon_Head"},{"bn":"instance_6","t":[290.1,113.2,1,1,0,0,0,19.1,16.6],"gn":"Fly_Enemy_SideEat_JSCC1:Armor_02"},{"bn":"instance_7","t":[269.8,77.9,1,1,0,0,0,45,43.5],"gn":"Wing_Animation:Head"},{"bn":"instance_8","t":[278.2,122.1,1,1,0,0,0,35.8,30.7],"gn":"Wing_Animation:Armor"},{"bn":"instance_9","t":[234.1,174.8,1,1,-7,0,0,33.1,6.6],"gn":"Wing_Animation:Jaw"},{"bn":"instance_10","t":[297.2,142.7,1,1,0,0,180,12,17.3],"gn":"Fly_Enemy_SideEat_JSCC1:Heand"},{"bn":"instance_11","t":[285.7,160.8,1,1,0,-30,150,11.2,13.8],"gn":"Wing_Animation:Leg"},{"bn":"instance_12","t":[291.9,123.3,1,1,0,0,180,12.2,12.1],"gn":"Fly_Enemy_SideEat_JSCC1:Sholder"},{"bn":"instance_13","t":[262.1,220.4,1,1,0,0,180,18.8,31.7],"gn":"Wing_Animation:Dragon_Leg"},{"bn":"instance_14","t":[264.8,156,1,1,0,0,0,16.1,4.8],"gn":"Wing_Animation:Belt"},{"bn":"instance_15","t":[268.6,188.8,1,1,0,0,0,29.1,42.3],"gn":"Sedlo"},{"bn":"instance_17","t":[246.7,152.1,1,1,30,0,0,11.2,13.8],"gn":"Wing_Animation:Leg"},{"bn":"instance_18","t":[269.5,128.9,1,1,0,0,0,26.1,25.8],"gn":"Body"},{"bn":"instance_19","t":[244.5,136.8,1,1,0,0,0,12,17.3],"gn":"Fly_Enemy_SideEat_JSCC1:Heand"},{"bn":"instance_20","t":[249.1,119.1,1,1,0,0,0,12.2,12.1],"gn":"Fly_Enemy_SideEat_JSCC1:Sholder"},{"bn":"instance_21","t":[244.9,93.9,1,1,0,0,0,27.9,33.4],"gn":"Bag"},{"bn":"instance_22","t":[267.7,180.3,1,1,-45,0,0,36.3,42.1],"gn":"Dragon_Body"},{"bn":"instance_23","t":[235.8,220.4,1,1,0,0,0,18.8,31.7],"gn":"Wing_Animation:Dragon_Leg"},{"bn":"instance_24","t":[298.4,244.6,1,1,0,0,0,24.9,36.8],"gn":"Wing_Animation:D_tail"}],"animations":[{"bn":"instance_16","t":[313.9,127.9,1,1,0,0,0,49,-83.6],"gn":"Wing_Animation","a":["synched",9]},{"bn":"instance_25","t":[228.9,118,1,1,0,0,180,49,-83.6],"gn":"Wing_Animation","a":["synched",9]}],"tweens":[[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"instance","p":{"regY":42.4,"scaleX":0.999,"scaleY":0.999,"rotation":13.2,"x":227.3,"y":202.2}}]},4]},{"n":"to","a":[{"state":[{"t":"instance_1"}]},1]},{"n":"to","a":[{"state":[{"t":"instance_2"}]},1]},{"n":"to","a":[{"state":[{"t":"instance_3"}]},1]},{"n":"to","a":[{"state":[{"t":"instance","p":{"regY":42.5,"scaleX":1,"scaleY":1,"rotation":3.5,"x":226,"y":216.2}}]},1]},{"n":"to","a":[{"state":[{"t":"instance_4"}]},1]},{"n":"to","a":[{"state":[]},1]},{"n":"wait","a":[7]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":9.8,"x":227.2,"y":197.4},3]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[6]},{"n":"to","a":[{"_off":false,"regY":42.4,"scaleX":1,"scaleY":1,"rotation":0.8,"x":227,"y":204.7},0]},{"n":"to","a":[{"regY":42.5,"rotation":0,"y":192.7},2]},{"n":"to","a":[{"y":200.5},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"rotation":-25.2,"y":128.4},6]},{"n":"to","a":[{"regY":16.7,"rotation":-18,"x":290.2,"y":117.5},6]},{"n":"to","a":[{"regY":16.6,"rotation":0,"x":290.1,"y":128.4},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"regX":45.1,"rotation":-13,"x":260.6,"y":96.1},6]},{"n":"to","a":[{"regX":45,"regY":43.4,"rotation":0.5,"x":270.3,"y":82.1},6]},{"n":"to","a":[{"regY":43.5,"rotation":0,"x":269.8,"y":93.1},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"regY":30.6,"scaleX":0.96,"rotation":-4,"x":280,"y":136.7},6]},{"n":"to","a":[{"scaleX":0.98,"rotation":-1.5,"x":280.3,"y":125.7},6]},{"n":"to","a":[{"regY":30.7,"scaleX":1,"rotation":0,"x":278.2,"y":137.3},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_9"]},{"n":"to","a":[{"regY":6.5,"scaleX":1,"scaleY":1,"rotation":-23.6,"x":229,"y":204.2},4]},{"n":"to","a":[{"regY":6.6,"scaleX":1,"scaleY":1,"rotation":-22.1,"x":232.2,"y":215.9},1]},{"n":"to","a":[{"regX":33.3,"regY":6.5,"scaleX":1,"scaleY":1,"rotation":-28.9,"x":228.6,"y":227.3},1]},{"n":"to","a":[{"regX":33.1,"rotation":-19.6,"x":230.1,"y":222.7},1]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":33,"rotation":-14.2,"x":229.9,"y":212.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"x":230.9,"y":211.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":200.6},0]},{"n":"to","a":[{"_off":true},1]},{"n":"wait","a":[6]}],[{"n":"get","a":["instance_10"]},{"n":"to","a":[{"skewX":5.7,"skewY":185.7,"x":304.1,"y":153.4},6]},{"n":"to","a":[{"skewX":-0.6,"skewY":179.4,"x":303.4,"y":144.7},6]},{"n":"to","a":[{"skewX":0,"skewY":180,"x":297.2,"y":157.9},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_11"]},{"n":"to","a":[{"x":286.8,"y":177.6},6]},{"n":"to","a":[{"regY":13.9,"scaleX":1,"scaleY":1,"skewX":-29.9,"skewY":150.1,"x":286.2,"y":165.7},6]},{"n":"to","a":[{"regY":13.8,"scaleX":1,"scaleY":1,"skewX":-30,"skewY":150,"x":285.7,"y":176},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_12"]},{"n":"to","a":[{"regY":12.2,"skewX":-25.2,"skewY":154.8,"x":296.9,"y":137.1},6]},{"n":"to","a":[{"regY":12.3,"skewX":-19.8,"skewY":160.2,"x":295.5,"y":127.3},6]},{"n":"to","a":[{"regY":12.1,"skewX":0,"skewY":180,"x":291.9,"y":138.5},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_13"]},{"n":"to","a":[{"scaleY":0.86,"skewX":-25.5,"skewY":154.5,"x":270.9,"y":233.3},6]},{"n":"to","a":[{"scaleX":1,"scaleY":0.94,"skewX":-10.1,"skewY":169.9,"x":265.6,"y":225.1},6]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":0,"skewY":180,"x":262.1,"y":238},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_14"]},{"n":"to","a":[{"y":171.2},6]},{"n":"to","a":[{"y":160.2},6]},{"n":"to","a":[{"y":171.2},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_15"]},{"n":"to","a":[{"y":204},6]},{"n":"to","a":[{"y":193},6]},{"n":"to","a":[{"y":204},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["shape"]},{"n":"to","a":[{"_off":true},9]},{"n":"wait","a":[8]}],[{"n":"get","a":["instance_16"]},{"n":"to","a":[{"y":145.5,"startPosition":0},6]},{"n":"to","a":[{"y":134.5,"startPosition":10},6]},{"n":"to","a":[{"y":145.5,"startPosition":14},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_17"]},{"n":"to","a":[{"y":175.5},6]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":29.9,"y":159.6},6]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":30,"y":167.3},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_18"]},{"n":"to","a":[{"y":144.1},6]},{"n":"to","a":[{"y":133.1},6]},{"n":"to","a":[{"y":144.1},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_19"]},{"n":"to","a":[{"rotation":10.7,"x":237.1,"y":155.5},6]},{"n":"to","a":[{"regY":17.2,"rotation":15.7,"x":235.5,"y":142.2},6]},{"n":"to","a":[{"regY":17.3,"rotation":0,"x":244.5,"y":152},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_20"]},{"n":"to","a":[{"x":245.1,"y":138.5},6]},{"n":"to","a":[{"rotation":15.2,"x":246.8,"y":125.1},6]},{"n":"to","a":[{"rotation":0,"x":249.1,"y":134.3},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_21"]},{"n":"to","a":[{"rotation":5.5,"x":246.2,"y":109.1},6]},{"n":"to","a":[{"rotation":2,"x":245.4,"y":98.1},6]},{"n":"to","a":[{"rotation":0,"x":244.9,"y":109.1},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_22"]},{"n":"to","a":[{"regX":36.2,"scaleY":1.01,"rotation":0,"skewX":-69.7,"skewY":-62.2,"x":271.3,"y":191.4},6]},{"n":"to","a":[{"regX":36.1,"scaleX":1,"scaleY":1,"skewX":-54.9,"skewY":-51.9,"x":269,"y":184.4},6]},{"n":"to","a":[{"regX":36.3,"scaleX":1,"scaleY":1,"rotation":-45,"skewX":0,"skewY":0,"x":267.7,"y":197.9},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_23"]},{"n":"to","a":[{"regX":18.9,"regY":31.6,"scaleY":0.89,"rotation":30,"x":232.8,"y":223.7},6]},{"n":"to","a":[{"scaleX":1,"scaleY":0.96,"rotation":11.8,"x":234.7,"y":221.3},6]},{"n":"to","a":[{"regX":18.8,"regY":31.7,"scaleX":1,"scaleY":1,"rotation":0,"x":235.8,"y":238},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_24"]},{"n":"to","a":[{"rotation":-34.5,"x":324,"y":230.8},6]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-13.8,"x":308.7,"y":238.6},6]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":0,"x":298.4,"y":262.2},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_25"]},{"n":"to","a":[{"y":135.6,"startPosition":0},6]},{"n":"to","a":[{"y":124.6,"startPosition":10},6]},{"n":"to","a":[{"y":135.6,"startPosition":14},4]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[0,0,0,0],"frameBounds":[[70.69999999999999,33.69999999999999,401.5,247.8],[66.10000000000002,37.19999999999999,410.7,242.2],[63.19999999999999,40.5,416.4,236.5],[88.80000000000001,43.30000000000001,365.3,231.3],[114.10000000000002,46,314.7,226],[129.10000000000002,48.900000000000006,284.6,226.2],[157.89999999999998,49.69999999999999,227,238],[132.3,49.5,278.2,232.1],[106,47.5,330.8,222.1],[79.80000000000001,45.400000000000006,383.3,225.9],[54.5,43.30000000000001,433.9,229.5],[56.80000000000001,40.599999999999994,429.2,233.6],[66.10000000000002,37.80000000000001,410.7,242.6],[63.19999999999999,40.69999999999999,416.4,240.9],[88.80000000000001,43.400000000000006,365.3,244],[114.10000000000002,46.099999999999994,314.7,247.2],[129.10000000000002,48.900000000000006,284.6,250.2]]}}},"actions":{"move":{"relatedActions":{"side":{"animation":"Fly_Enemy_SideWalk_JSCC","flipX":true,"framerate":18},"back":{"animation":"Fly_Enemy_BackWalk_JSCC","framerate":18},"fore":{"animation":"Fly_Enemy_Walk_JSCC","framerate":18}}},"attack":{"animation":"Fly_Enemy_Attack_JSCC","framerate":18,"flipX":true,"goesTo":"idle","frames":"3,4,5,6,7,8,9,10,11,12,13,14"},"idle":{"animation":"Fly_Enemy_SideWalk_JSCC","loops":true,"flipX":true,"framerate":12},"portrait":{"animation":"portrait","scale":0.9,"positions":{"registration":{"x":5,"y":10}}},"die":{"animation":"Fly_Enemy_Death_JSCC","loops":false,"flipX":true},"impale":{"goesTo":"attack"},"flap":{"framerate":60,"animation":"Fly_Enemy_SideWalk_JSCC","flipX":true},"devour":{"animation":"fangrider_eat","flipX":true}},"rotationType":"isometric","scale":0.3,"positions":{"registration":{"x":-275,"y":-295},"torso":{"x":0,"y":-155},"aboveHead":{"x":0,"y":-275}},"commitMessage":"No need to spawn","parent":"53fe7659ad0cd13305f7960e","shadow":3,"components":[{"original":"524b85837fc0f6d519000020","majorVersion":0},{"original":"524b7b747fc0f6d519000010","majorVersion":0,"config":{"team":"ogres"}},{"original":"524b7b857fc0f6d519000012","majorVersion":0,"config":{"collisionType":"dynamic","collisionCategory":"air","mass":40,"fixedRotation":true,"restitution":0.5}},{"original":"524b7bab7fc0f6d519000017","majorVersion":0,"config":{"maxHealth":10,"healthReplenishRate":0.125}},{"original":"52e95818a3ca8546b7000001","majorVersion":0},{"original":"524b3e3fff92f1f4f800000d","majorVersion":0},{"original":"524b4150ff92f1f4f8000024","majorVersion":0},{"original":"524b7b9f7fc0f6d519000015","majorVersion":0},{"original":"524b7b977fc0f6d519000014","majorVersion":0},{"original":"53e217d253457600003e3ebb","majorVersion":0,"config":{"inventory":{"right-hand":"53f500e854e4f234059ef4ba"}}},{"original":"524b7b8c7fc0f6d519000013","majorVersion":0,"config":{"locomotionType":"flying","maxSpeed":13,"maxAcceleration":100,"dragCoefficient":0.04,"rollingResistance":0}},{"original":"524b75ad7fc0f6d519000001","majorVersion":0,"config":{"pos":{"x":10,"y":10,"z":7},"width":2,"height":2,"depth":2.5,"shape":"ellipsoid"}},{"original":"524b7b7c7fc0f6d519000011","majorVersion":0},{"original":"524b7bb67fc0f6d519000018","majorVersion":0},{"original":"52a399b98537a70000000003","majorVersion":0},{"original":"524b457bff92f1f4f8000031","majorVersion":0},{"original":"52872b0ead92b98561000002","majorVersion":0}],"soundTriggers":{"attack":[{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_attack_1.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_attack_1.ogg","delay":1},{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_attack_2.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_attack_2.ogg","delay":1},{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_attack_3.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_attack_3.ogg","delay":1}],"die":[{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/enemy_small_die.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/enemy_small_die.ogg"}],"selected":[{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_1.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_2.ogg"},{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_2.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_2.ogg"},{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_3.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_3.ogg"}],"say":{"defaultSimlish":[{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_1.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_1.ogg"},{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_2.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_2.ogg"},{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_3.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_select_3.ogg"},{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_simlish_1.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_simlish_1.ogg"},{"mp3":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_simlish_2.mp3","ogg":"db/thang.type/529e5f0c6febb9ca7e00000c/fangrider_simlish_2.ogg"}]}},"kind":"Unit","patches":[],"created":"2014-09-01T21:36:53.905Z","version":{"isLatestMinor":true,"isLatestMajor":true,"minor":22,"major":0}}

});

;require.register("test/app/fixtures/ogre-munchkin-m.thang.type", function(exports, require, module) {
module.exports = {"_id":"540638f21979880265fb1b10","index":true,"slug":"ogre-munchkin-m","name":"Ogre Munchkin M","creator":"51538fdb812dd9af02000001","original":"529e5d756febb9ca7e00000a","__v":0,"raw":{"shapes":{"0":{"p":"AhIAFIANgQIABABIARADQAdACAPAAQAeAAAagFIAOAPQgfAGgnABQgpgBgigGg","t":[7.9,9.3],"fc":"#1D2226"},"1":{"p":"AhOAIIANgaIABAAIAAABIAUAEQAdAEATAAQAfABAegJIAPAZQgjALgpAAQgtAAglgLg","t":[7.1,5],"fc":"#1D2226"},"2":{"p":"AABApQgMgLgMgiIgJgiQgCgLAaAJQAYAKALAPQAMAPgLAbQgHASgKAAQgFAAgFgEg","t":[4.1,1.2],"fc":"#B2AAA4"},"3":{"p":"AgHCCQgPgFgMgPIgJgNIgIgMQgSAAgDgYQAAgEADgBIACgCIgCgJQgBgBgHgDQgHgCgBgBQgDgEgHgRQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAIAFgGQgKgdgEgPQgGgWAAgXQAAgdAJgWIACgEIDCBIIAMAEQAAABABAAQAAAAAAAAQABABAAAAQABAAAAABIABACIAAAGQAAAKgEAaIgFAXQAIAAgBAGIgCATQgDANgHgCIgBALQAEABAAAFIABAMQAAACgGAEIAAAEQAAAMgCAHQgDAOgKAHQgKAJgMACQgKADgNAAQgYAAgSgIgAgxApQgCADADAGQAEAGAEACIATADIAEAHQAIANAEAEQAFAHAFADQAOAGAQgCIAOgBIAHgDIAAAAIAAgBIACghIAIAAQAHgBACgIQABgJgIgBIgCAAIgHgBIAEgZIAAgCIABgHIAKg3QhSgHhAgiIAAAHQAAARAEASQAHAZANAhQAFAMAKARQgGgCgDAAIgFAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAABg","t":[5.9,2.4],"fc":"#1D2226"},"4":{"p":"AgJAaIgqgCIgVgrICRgGIgDAtQg7AGgRAAIgDAAg","t":[7.2,7],"fc":"#604632"},"5":{"p":"AgDARQgQgCgPgMIgMgLQgFgDAxgDIAvgDQADACgBARQAAAKgRAEQgIACgLAAIgOgBg","t":[8,11.3],"fc":"#604632"},"6":{"p":"AgrBGQgcghgNg/QgHghgBgaQBJArBOAKIAYACQAIABABADQAGATgXBLQgPARghABIgCAAQgcAAgogQg","t":[5.7,0],"fc":"#8E7F75"},"7":{"p":"AgKAmQgSgFgSghIgOgeQASgGAWgCQAsgDAZAXQAaAXgfAVQgWANgUAAQgFAAgHgBg","t":[6.9,9.8],"fc":"#4F6877"},"8":{"p":"Ag/AIIAMgaIAAAAIAPAEQAYAFAPAAQAaAAAWgJIANAaQgdALggAAQgkAAgegLg","t":[7,7.1],"fc":"#1D2226"},"9":{"p":"AABApQgMgLgMgiIgJgiQgCgLAaAJQAYAJALAQQAMAPgLAbQgHASgKAAQgFAAgFgEg","t":[4,1.2],"fc":"#99643F"},"10":{"p":"AgHCCQgQgGgLgOQgGgHgKgRIgRgdQgLgSgFgPQgOgkgHgZQgGgWAAgXQAAgdAKgVIABgFIDCBIIAMAEQAAAAABABQAAAAAAAAQABABAAAAQABABAAAAIABADIAAAFQAAAKgEAaIgHAnIAAABQgDALgBAWIgBAZQAAALgCAIQgDANgKAJQgIAHgOADQgKADgNAAQgYAAgSgIgAhIhSQAAAQAEATQAHAXANAiQAGAQAZApQAGALAGAHQAFAHAFADQAMAFASAAIAAAAQAJAAAFgCQAFgBACgCIABgCIAAgSIABgYQABgVAEgOIAAgBIAAgBIALg+QhTgIg/ghg","t":[5.8,2.4],"fc":"#1D2226"},"11":{"p":"AgrBGQgcghgOg/QgGghgBgaQBJAqBOALIAYACQAIABABADQAEANgJAnQgIAngEADQgQARggABIgCAAQgdAAgngQg","t":[5.6,0],"fc":"#604632"},"12":{"p":"AgKAmQgSgFgSghIgOgeQASgGAWgCQAsgEAZAYQAbAXggAVQgWAOgUAAQgFAAgHgCg","t":[6.8,9.8],"fc":"#4F6877"},"13":{"p":"Ag/AIIALgaIABAAIAPAEQAUAFATAAQAbAAAVgJIAMAaQgaALgiAAQgkAAgegLg","t":[7,7.1],"fc":"#1D2226"},"14":{"p":"AABApQgMgLgMgiIgJgiQgDgLAaAJQAZAKALAPQAMAPgLAbQgHASgKAAQgEAAgGgEg","t":[4,1.2],"fc":"#99643F"},"15":{"p":"AgHCCQgOgFgNgPQgHgJgJgOIgRgeQgKgTgGgPQgOgjgHgZQgGgWAAgXQAAgcAKgXIACgEIDBBIIAMAEIADADIABACIAAAGQAAAHgEAdIgHAnIAAAAQgDAQgBASIAAAZQAAAIgCALQgEAPgKAGQgKAJgMACQgJADgNAAQgZAAgSgIgAhIhSQAAASAFARQAFAVAPAkQAEALAaAvQAIANAEAEQAFAHAFADIAAAAQAMAEASAAIAOgBIAHgDIAAAAIABgBIABgKIAAghIAFgjIAAgBIAAgBIALg+QhRgHhBgig","t":[5.8,2.4],"fc":"#1D2226"},"16":{"p":"AgrBGQgcghgNg/QgHghgBgaQBHAqBQALIAYACQAIABABADQAGATgWBLQgQARggABIgCAAQgdAAgogQg","t":[5.6,0],"fc":"#604632"},"17":{"p":"AAJCUQgMgLgBgdIAAgFQABgMAKANQAMANAEARQADAPgFAEIgCABQgEAAgGgGgAgjA0IgBgHIAEgWIAKg6IADgWIAEgNIAJgXQANgpAMgTIASAEQgKAbg4DSQgGgKAAgag","t":[27.1,29],"fc":"#A1C5E5"},"18":{"p":"AgRCfIgEAAIgDgDIgEgEIgBgDIgBgBIgUg2IABAsIgDgBIgHgMQgEgHgBgGIgEgSIgEgOQgBgMADgMIABgKIABAGQAAAaAGAKQA6jSAHgaIgQgEQgLATgPApIAFgOIALggIAHgTIAAgBQALgBALADIAlANQAVAGAJAHQgjA6gWB/QgLA/gEAnIAAABIgCAAIgMABIgEAAgAgmBoIABAEQABAeANALQAJAIAEgEQAFgDgDgQQgEgRgMgMQgGgHgEAAQgDAAgBAGg","t":[30.4,28.9],"fc":"#91B1CE"},"19":{"p":"Ag1CRQAEgoALg+QAWiAAhg6IABgBQAeAGAGAWIgIAPQgPAegCAUQgQA5AIAkIAHAHIABAEIAFAKQACAKAAALIAAAEQgBARgEAJQgEAKgGADQgKAFgLgJIAAgMIAAgjIguBFIgHAAg","t":[36,30.2],"fc":"#4F6877"},"20":{"p":"AguCqQgGgCgEgEQgEgDgDgFIgDgEIgPgEIgCgCQgHgHgIgRQgFgKgEgNIgGgYQgHgtANg/QAHgnAJgcQAHgUAJgQQAJgQAEgDIAPgKQAEgDAFgCQAIgEgDAJIgBABIgHATIgLAgIgFAOIgJAXIgDAMIgEAWIgKA7IgDAWIgCAKQgCAMABAMIAEAOIADASQACAGADAHIAIAMIACABIAAgsIAUA2IAAABIACADIAEAEIADADIAEAAQAHAAAIgBIAFAAIAGgBIAvhFIAAAkIAAALQALAJAKgEQAGgDAEgLQAEgIABgSIAAgEQAAgLgDgKIgEgKIgBgEIgHgHQgIgkAQg4QABgVAQgeIAIgPQAHgLAEgEQADgCAFAOQAGAOgDANQgWAzgHApIgBAIIgBAOQAAANABAJQACACACAHQAFANABATIAAAAIAAAEQgCAcgKAOQgIALgLAEQgEACgIgBIgMgEIgXABIgLAQIgDADIgDABIgRACQgIACgKgBIgCABg","t":[32.1,29.6],"fc":"#1D2226"},"21":{"p":"AAmBVIALgLIgigkQgQgVgRgMQgQgMgOgPQgPgQgHgWQgEgOACgIIABgDQAXAYArAoQAuAqAgAbIgGAHIgdAfIAAgBg","t":[5,14.5],"fc":"#4F6877"},"22":{"p":"AAbBJQgfgbgwgsQgrgmgWgYQADgGAJgFQAUgKAjACIAOABIAOADQgFACgJAFIBiBOQAIgJANgFIAQAJIATASQgEAHgJAHQgbAVglAOIgUAIg","t":[9.7,12],"fc":"#91B1CE"},"23":{"p":"Ag7giQAJgGAEgBIADgBQBUAvATAWIAAAAQgNAHgIAJg","t":[12,8.7],"fc":"#A1C5E5"},"24":{"p":"AhEA6IgBAAIgBgBIgfgiQgZgdgLgZQgIgXAEgQQADgLAIgJQAIgIAIgEQANgHAWgEQATgCAPABIARABQAKABAHACQAQAFAOAHQAvAWA1A3QAJAFAOAgQAEAVgYgUIgTgRIgQgKIAAAAQgSgWhVgxIgCABIgOgDIgOgBQgjgCgUAJQgJAFgDAHIgBACQgDAIAFAPQAHAWAOAQQAOANARANQAQANATAUIAgAkIgKAMIgKAKIg3g5g","t":[9.3,12.6],"fc":"#1D2226"},"25":{"p":"AhhCaIBti5IgPgJQgPgIgOgKIAAABIgkgnIACgDIgEgGIgCgJQAAgGACgKQAGAMAMALQAfAfAzAHQgDAFgEACQgEACgIAAIgWgHQgQgHgIgGQAIAJAPAHQAGAFAPAIIABAAQALADAIgDIAEAFIAJAKQAKAJAMAHIABABIAFABIAGAEIgEADIgDABIgEgBIhPBkIgDAHIgHAKQgTAlgFAFQgQAVgIAGQgRgLgIgKgABFgdIAAAAQgPgGgIgFQgGgDgFgFIgDgDQAEgCAEgEQAGAGAQAFQAVAIAPgDIAAACIgGAHIgDACQgFACgFAAQgFAAgFgBgAAiiCQgKgKgPgJIgogXIACgCIAXAPQAPAKAUAFIAMACIgFANIgCgBg","t":[26.4,33.7],"fc":"#4F6877"},"26":{"p":"AhMCkIgBgBQgJgIgZgYQgGgGgEgHQgJgNgEgRQgEgOAAgMIAGAHIAhgyIA0hoIAkAmIAAAAQAMAKAPAHIARAKIhtC5gABTgjQgQgGgGgFIAFgGQAEgGADgKQADgIABgKIAAgEIgDgGIALgeIAUAIQAQAIAJAHQAIAIABAIQABAFgBAFIAAACQgCgKgGgJQgNgQgZgLQgDgBgDAGQgEAFAFAFQAHAIAVAOQARAMAEAAIgBAGIgQAhIgBABIAAACIgKABQgLAAgPgGgAgfhgQgMgLgGgNIABgDIAAgCQAEgJAEgEIAGgDIAEADIAwAWQAPAHAIAHQAMAJADAHIAAABQAAAPgEAJIgBACQgzgGgfgfgAAAhrQAcAUAKAEIANAFQAEgBgBgJQgEgMgrgUIgogTQADAJAeAXgAAyiFQgUgFgRgKIgVgPIABAAIAQgBIAPABIgEAAQgHABAHAFIARAHQAIAFAJABQAJAAgBgEQAAAAgBgBQAAgBAAAAQAAgBAAAAQAAgBAAAAIADADIADAHIgFALIgMgCg","t":[24.3,32.6],"fc":"#91B1CE"},"27":{"p":"ABAAhQgVgOgHgIQgFgFAEgFQACgEADACQAaAIANAQQAGAKABAJIgBADQgEAAgRgMgAgMAjQgLgEgcgVQgfgUgEgKIArATQAqASACAMQABAJgCABIgMgEgAABgZQgGAAgIgGIgRgHQgHgEAHgCIAEAAIAMACIABAAIAEABIACABIAHACIAGADIADACQAAABAAAAQAAABAAAAQAAABAAAAQABABAAABQAAADgHAAIgCAAg","t":[29.5,20.7],"fc":"#A1C5E5"},"28":{"p":"AguDCQgIgDgJgKIACAAQAIgGAQgUQAFgGATgkIAHgLIADgGIBPhkIAEABIADgBIAEgEIgGgDIgFgCIgBAAQgMgIgKgJIgJgJIgEgGQgIADgLgDIgBAAQgRgIgEgEQgPgIgIgIQAIAFAQAHIAWAHQAIAAAEgCQAEgCADgFIABgCQAEgKAAgPIAAgBQgDgHgMgJQgIgGgPgIIgwgWIgEgDIgGAEQgEAEgEAIIAAACIgBAEQgCAKAAAGIACAJIAEAGIgCADIg0BpIghAxIgGgGQgKgPAGgMIANgTQALgPAFgGIAAgBQASgdATgyIACAAIgBgGIABgNIAAgKIAGgWQAFgKAHgIQAGgGAHgCIAIgDIAYgYIAGgBIAPABQANAAAPACIAQAEQAJADAIAEQAJAGAFAIIAFAJIgBABIAaALIAdARIABACQAIAFAFAKQAGAJAAAKQACAJgDAJIgBAEIABAAQgBAGgEAIIgTAfIAAgBIgEAHIgBAAQgFANgMAGIgRAZIgCACIgwBLIAAABIgdAqQgXAigHAFQgLALgKAAIgGgBgABkgYIADgCIAGgGIAAgDIAAgBIABgBIAQgiIABgGIACgDIAAgBQABgFgBgFQgBgJgIgHQgJgHgQgJIgUgIIgLAfIADAGIAAAEQgBAJgDAIQgDAKgEAHIgFAFQgEAEgEACIADAEQAFAFAGACQAIAFAPAGIAAAAQALADAJgEgAgRioIgBABIgCACIAoAWQAPAJAKAKIACACIAFgOIAFgLIgDgHIgDgDIgDgCIgIgDIgHgCIgCgBIgDAAIgCAAIgMgDIgOAAg","t":[25.3,33.1],"fc":"#1D2226"},"29":{"p":"AAcA0IgLgEIgRgKIgRgNIgPgPIgLgQIgTgzIB9gBIgDAoIhagPIAJANIALANIAKAIIAHAFIAHAEIAHACIAIADIAPADIAQABIgBAng","t":[21.1,29.5],"fc":"#000000"},"30":{"p":"AAdAjQgXgHgdggIgbggIBgAwIAFAQQAAAJgKAAQgFAAgHgCg","t":[22.2,29.5],"fc":"#5A6F7C"},"31":{"p":"AgMAOQglgagBgZQAhgDAkAHQAUADAMAFIgFA/IgGABQgWAAgegZg","t":[22.5,29.3],"fc":"#97B4CE"},"32":{"p":"AgDAPQgZgHAAgSQAAgJAIABIASADQAKAAAKAIQALAHAAAJQAAAKgNAAQgIAAgLgEg","t":[41.7,38.4],"fc":"#000000"},"33":{"p":"ACBCnQgIAHgKAAQgOAAgLgQQgKgRAAgXQAAgHACgLQgrhshZhjQhPhVgngHIASgHQAuANBJBPQBRBaApBmQALgQANgBQAPAAALARQAKARgBAXQAAAQgEAMIAfAkIgKAZIgigog","t":[50.2,23.5],"fc":"#000000"},"34":{"p":"AAXAWIgBAAIAAgBIgBgEQgBgCgEgCIgFgGIgfgRIgfgNIA1AIIAKADIAJADIAJAFIAJAEIAHAHIAEAHQACAFAAAEIAAABg","t":[41.5,37.7],"fc":"#000000"},"35":{"p":"AhBANQADgFAJgHIAKgFIAMgGQAPgGANgCIAMgBIAPABIAMACIAMADQAKADAFAEIAHAEIgIAAIg+ACQgZAEgWAHIgQAFIgGAEIAEgHg","t":[54.6,46.6],"fc":"#000000"},"36":{"p":"ABtCrQgGgXAFgPQgnhNgdgsQhIhphlhIIASgGQApAWA0AxQBnBiA0CEQACAZgCALQgCAGgCAAg","t":[45.6,20.4],"fc":"#5A6F7C"},"37":{"p":"AgfAfQgJAAgJgEQgJgEgGgGQgFgGgCgHIgBgJIABgJIADAIQAGAIAHAEQAJAFAQgBQAKAAAWgDQAXgDAKgCQAPgCAJgGQAGgFACgMIABgIIABACIADAGQACAFgBAFQAAAIgEAFQgHAOgVAIQgQAGgUADIgUABIgQgBg","t":[52.9,41.2],"fc":"#000000"},"38":{"p":"ABEErQghgEgjgLQgjgJgkgNQgpgQgdgQQgmgWgYgjQgXgggIguQgGglAAgsQgBhgARg9QALgnAXghQAXghAjgVQA4ggBUADQAkABAfAIQAfAIAcARQAbARASAWQARAUAMAZQARAkAIAuQAFAfABAYIACB/QAAAbgDAUQgEAcgMAZQgFAKgKAQIgRAZIgSAZQgNAPgPAJQgRALgUADIgVACgAgYkVQgOABgTADQglAIgbAQQgeASgTAdQgSAbgKAnQgPA5AEBcQACAvAGAcQAJAnASAZQAUAcAfARQAdAQAlANQAgAMAhAJQAlAJAbADIAOABIAOgBQAOgDAJgFQANgJAYgeIAQgXIANgVQAKgTAFgYQADgSABgYIABh+QAAgZgDgaQgGgrgOggQgKgXgPgSQgQgUgWgQQgtgdhGgDIgPAAIgRABg","t":[44.1,30],"fc":"#000000"},"39":{"p":"Ag2AWIAXgDIAPgFIAOgHIARgOIAKgOIAIgOIhZAVIgGgnIB9gIIgIAiQgDAKgFAJQgEAIgGAIIgOAQIgQAOIgHAGIgKAFIgUAIIgKACIgLADg","t":[71.4,24.1],"fc":"#000000"},"40":{"p":"AgwAfIAFgPIBcg3QgKAQgPASQgbAigWAIQgIADgFAAQgJAAgBgJg","t":[70.7,24.1],"fc":"#5A6F7C"},"41":{"p":"AgpApIgJg/IAggKQAkgJAhABQAAAZgjAdQgfAbgWAAIgEAAg","t":[70.3,23.9],"fc":"#97B4CE"},"42":{"p":"AAFD0QhdgQg7g7QhPhRALikQAEg9APg1QAOgwAMgJQAEAjAEBHQAGA7AQAiQAsBaCcgIQBkgFAHAIQAHAHgiAFQgpAIhRABQg3ABgVACQgjAEgBAKQgEAWAiAfQAhAeAfAKQAGABAbAOQAhAMAogIQAygLANgpIAHgfQAEgQAIgFQALgBAKAQQAFAJADAIQgFAUgNAYQgaAwgmAXQgdASgwAAQgYAAgdgEg","t":[43.7,33.5],"fc":"#5A6F7C"},"43":{"p":"AgmB+QgBgBAWgeIAUgdQAFglgFhUQgDg0gIgsIgKghIAYA4QAaBBABAlIAFBfQADA5gEAJQgHAQgJAig","t":[62.4,26.3],"fc":"#5A6F7C"},"44":{"p":"Ah3DNQhnhbABiBQABiAA1hFQA4hIBvgBQBugBA5BJQA0BFADCBQADCZgdBFQgiBPhXAAQhlAAhdhRg","t":[43.7,29.8],"fc":"#97B4CE"},"45":{"p":"AhNCIQgcgHgBgUQgBgSAZgYQA6g3B3gTQBlATgtA7QgXAegsAZQg1ALgtACIgUABQgbAAgQgEgAg2gZQgsgFgdgdQgdgdgHgOQgHgOAigOQBAACAVABIAfABQAvgIA0gEQANgBAKAAIAAAAQAhABARAQQANAOAAAVQgCA5gtgIQgUgDgbgRQgKgHgNAEIgLAEQgpAhgnAAIgLgBg","t":[31.9,38.4],"fc":"#91B1CE"},"46":{"p":"AiHDSQgngJgXgSIgLgKIgDgEIgGgIQgGgMgCgSQgBgNABgWIACgmQAAgsADgaQAEgmAKghQAHgXAKgUIAPgUQAPgSAUgQQATgPAYgLQAsgUA0ADQA1ACAsAOQAYAIAUAMQALAGAIAHIAJAIIAGAHIgBgCQAPAeALAkQAKAhAHAlIAHA0QgLAQgPAFQgMAFgPgGIg3gYIABAAIABAAIgBgBQgOgFgNAHIAAAAIgEAEQgKALgLAHQgPAKgMAEQgvAOhGghQgkgRgggXQAHAJAYAUQAYAVARALQAvAeBGgGQAPgDAQgLIARgOQAJgIAIgCQAOABAQAKQASAMAOACQATAEAPgKQANgJAJgRQADAsgGAdQgGAjgTAXQgRAXgiAMQgcAJgpAEQgfAEgpAAIgIAAQhPAAg1gOgAghCSQgZAYABASQABAUAcAHQAWAFAngCQAvgCA1gLQAsgZAXgeQAtg7hlgVQh5AVg4A3gAhygXQAHAOAdAbQAdAdAsAFQAqAFAxglIALgEQANgEAKAHQAbARAUADQAtAIACg3QAAgVgNgOQgRgQghgBIAAAAQgKAAgNABQg0AEgxAIIgdgBQgVgBhAgCQgiAOAHAOg","t":[27,30.5],"fc":"#4F6877"},"47":{"p":"AiVDwQgugOgagVIgQgPIgGgJIgGgKQgIgQgCgZQgBgQACgXIADglQAAgkAHglQAHgpAMghQAQgqAUgaIAbgiIAIgIQAUgRAagNQAxgYA7ABQA8ABAuANQAbAIAZAOQAOAIAKAIIAQAPIAGAHIAAAAIABABQASAiAMAmQANApAGAhQAIAoACAhQADAqgGAlQgIAtgZAgQgaAfgsAPQghAKgsAFQgfADgtAAQhdgBg5gRgAhljRQgYALgSAOQgVAQgOASIgQAVQgJATgHAXQgKAhgEAmQgEAaAAAtIgBAmQgBAVABANQABASAHAMIAFAJIADADIAMALQAXARAmAKQA5APBUgBQAoAAAggEQAogEAcgKQAigMASgWQASgXAHgkQAFgdgCgrQgKARgMAIQgPALgTgEQgOgDgTgLQgQgLgNAAQgIACgKAIIgRAOQgQALgOACQhGAGgwgeQgQgKgZgWQgXgUgHgHQAgAWAkAQQBGAhAvgOQAMgDAOgKQALgIALgKIADgEIABAAQANgHANAFIABAAIAAABIgCgBIA3AYQAPAHANgFQAOgGAMgQIgHg0QgHglgKggQgLgkgPgeIAAABIgGgHIgIgHQgJgHgKgHQgUgMgZgIQgrgOg2gBIgNgBQgsAAgnASg","t":[27.5,30.8],"fc":"#1D2226"},"48":{"p":"AAgApIgPgDIgugJIgHgBIgRgEIgKgFIgCgBIgFgFQgEgFgFgIIgGgNIgLgcQANAJAKAKIALALIAIAJIACABIABAAIACABIAfABIAOACIAcAHQAVAHADAAIAEAAIAFgBIAMgHQAKgFASgEIgJAKIgKAKQgGAIgEAEQgEAEgEACIgGACIgEABIgJABIgJgBg","t":[51.4,26.3,0.92,1,0,0,179.7],"fc":"#1D2226"},"49":{"p":"AhegUQAiAGAmABQA7ABA0gPIAGADIgXAeIhlAWQgIgIg5gog","t":[49.5,26.7],"fc":"#8E7F75"},"50":{"p":"AgtAYIAAglIBbgWQAAAFgDAQIgDARIAAABIgbAZIgkAHg","t":[62.9,18.9],"fc":"#838B8E"},"51":{"p":"AAEAVIgLgrIAOAIIABAlg","t":[57.4,19],"fc":"#5B6568"},"52":{"p":"Ag1AHIAAgBIBegUIANAJIAAABIhbATg","t":[62.1,15.9],"fc":"#B4BBBF"},"53":{"p":"AAABHQgmgBghgHQgfgFgbgLQgigOgbgRIgYgQIgFgEQgDgFgBgOQgBgLACgHIAIgdIALAPIgCAFIgFAMQgCAIADADIAaARQAcAOAfALQA8AVBAAAQAkACAlgGIAOgCIgBgBIgDgXIgGgdIB5gYIAHAFIAHAGIAAgDIgBgIIgCgJIALgKQACAEABAMQACALgBAFQgDAZgFAHIgBABIABAXIgmAiIgyAJIgKgGIgGgDQgyAPg5AAIgFAAgABdgOIAAAAIANAsIAEACIAVAMIAngHIAagZIAAgBIADgRQADgPAAgGIAAgBIgMgJg","t":[47.2,18.1],"fc":"#1D2226"},"54":{"p":"AAGAAIAAAAIgLABIALgBg","t":[55.3,21.2],"fc":"#604632"},"55":{"p":"AAAArQhAAAg9gVQgfgLgbgOIgagRQgDgDABgIIAFgMQATAUAeANQBGAeBggBQAnAAAigGIAEAXIgNADQgdAFgeAAIgOgBgADMgjIAHgFIABAIIAAADg","t":[47.3,17.4],"fc":"#835B2C"},"56":{"p":"AgkAOIAAgcIBJAAIAAAcg","t":[151.8,65.3,0.999,0.999,0,-84.9,95],"fc":"#1D2226"},"57":{"p":"AhKAPIAAgdICVAAIAAAdg","t":[145,64,0.999,0.999,0,-84.9,95],"fc":"#1D2226"},"58":{"p":"AgDHGIAAi2IhUAAIAAhAIAAACIgBgLIAAgHIABgFIAAgPIAvAAIgnm/IhgirIElgIIACA5IAAAAIAAI5IA2gBIAAABIABAAIAABkIhXAAIAAC2gAg6DNIAAAlIBTAAIAAC3IAhAAIAAi3IBYAAIAAgoIgCAAIAAgBIg1AAIAFp3IjqADIBZCPIAqHmIgzAAg","t":[126.6,58.2,0.999,0.999,0,-84.9,95],"fc":"#1D2226"},"59":{"p":"AgXj+IAvg7IgBJyIgkACg","t":[113.1,65,0.999,0.999,0,-84.9,95],"fc":"#89857E"},"60":{"p":"AhzAAQgCgKABgGIACgEIDngBIAAAcQg5AJg5AEQgXACgUAAQhHAAgEgWg","t":[147,63.9,0.999,0.999,0,-84.9,95],"fc":"#89857E"},"61":{"p":"AgKAkIgChxIASACIAHCZg","t":[160.5,66.6,0.999,0.999,0,-84.9,95],"fc":"#BA7B09"},"62":{"p":"Ah0AjIAAhEIDpAAIAABEg","t":[148.3,64.2,0.999,0.999,0,-84.9,95],"fc":"#686C72"},"63":{"p":"AgeBsIAAjXIA9AAIAADXg","t":[159.2,65,0.999,0.999,0,-84.9,95],"fc":"#775105"},"64":{"p":"AgBEeIgjnlIgvhVICogFIgDJDg","t":[116.9,59.4,0.999,0.999,0,-84.9,95],"fc":"#B5B1A9"},"65":{"p":"AgoidIhcidIEJgFIgDJ9IiCACg","t":[114.6,54.4,0.999,0.999,0,-84.9,95],"fc":"#FCF8F0"},"66":{"p":"AAIAyQALgeAEgSQAEgKACgMIACgMIABgHIgJAFIgtAoIgGAHIAAABIAAgCIgSgIIADgEIABAAIAHgGIAKgIQALgKAJgGQAJgKAKgGIAMgHQAFgCAFAAIAEABIABAAIABABIAAAAIACACQACAEAAACQABAGgBAJIgTBWg","t":[40.5,13.8,1,1,-11.1],"fc":"#1D2226"},"67":{"p":"AgMBAIgPgEQgOgGgKgLQgHgKgGgPQgDgKgBgNIAAgHIAFgDIBhgtIAIgCQAEgBAGAAQAJACACACQAGAFAAAIIgBAMIgGARQgCAJgMARQgRAbgTAWIgFAGIgGAAIgCAAIgLAAgAAzgxQgKABgRAIIhJAnQABATAKANQANAQAZABQANgUASgcIAQgaIAGgNIACgHQAAgBAAgBQAAAAgBgBQAAAAgBAAQAAAAgBAAIgBAAg","t":[48.5,25.6,1,1,-11.1],"fc":"#1D2226"},"68":{"p":"AgFBJQgNgCgNgLQgIgIgHgMIgFgGIAEgGIAbguIAUgjIAKgMIAFgEIAGgDIAGAAIADAAIABAAIACABIABAAIAGAEIACADIACAEIACAGQAEAJAAAHIACAcQgCAogBANIgBAFIgDAEIgLAJQgEAEgHADQgMAFgLAAIgFAAgAAXgzQgLAMgPAhQgLARgLAWQAKAQANAEQAPAGATgRIAAg0IgBgaIgDgNIgCgFIAAAAIgDADg","t":[31.5,23.1,1,1,-11.1],"fc":"#1D2226"},"69":{"p":"AgQA0IAchxIAFBxQgGAGgIACIgGACQgJAAgEgKg","t":[33.2,23,1,1,-11.1],"fc":"#F2EBDA"},"70":{"p":"AgpAlIBGhkIANBsQgJAMgPAFQgHACgHAAQgVAAgYgbg","t":[31.5,22.9,1,1,-11.1],"fc":"#AA9D85"},"71":{"p":"ABLB7QggAAgngLQghgKgfgQQgSgKgNgJIgPgLQgIgHgFgHIgCgCQgGgJgIgOQgIgPgCgLQgCgQAEgQQAEgQAJgMQAPgUAdgQQAQgIAKgDQALgEARgCQAygEA0AiQAuAfAXAwIgJAFQgZgrgtgaQgvgcgrAGQgLABgLAFQgNAFgIAFQgWAOgMAQQgMASAEAVQACAKAEAJQAFALAGAHIACACIAAAAIAIAKIAMAKQANAKAPAIQAcAQAfALQAhALAgACQAkABAbgLIAHAQQgcAOgmAAIgFAAg","t":[34.2,26.1,1,1,-11.1],"fc":"#1D2226"},"72":{"p":"AAsBpQg7gGgugbIgYgPIgWgSQgVgTgRgUQgKgNgEgMQgGgPABgQQACgOAJgOQAIgLALgKIAIAIQgWAWAAAVQgBAUATAWQARAQAVARIALAIIAgATIAwASIAXAIIAZAFQAvAGAxgOQACgNAAgLQAAgIgCgHIgEgQIARgFQAEAJABAIQADAJAAAJQACAQgEAVIgCAFIgFACQguAQgtAAIgUgBg","t":[34.9,32.3,1,1,-11.1],"fc":"#1D2226"},"73":{"p":"AgSAbIAlhEIgTBTg","t":[42.2,13.3,1,1,-11.1],"fc":"#F2EBDA"},"74":{"p":"AghAuQgXgIAGgRIBmhHIg+BlQgMgBgLgEg","t":[49.5,25.9,1,1,-11.1],"fc":"#F2EBDA"},"75":{"p":"AgmAKQBGg/AGAGQAGAGgaBZg","t":[40.5,13.7,1,1,-11.1],"fc":"#AA9D85"},"76":{"p":"AgaAzQgggQgCgtIA6gbQA5gZAFAHQAIAMhABkIgEAAQgNAAgNgGg","t":[48.6,25.7,1,1,-11.1],"fc":"#AA9D85"},"77":{"p":"AAbAwQgWgGgWgSQgYgRgMgSQgLgTAHgLQAIgKAWAFQAXAFAWASQAYARALASQAMAUgIAKQgFAHgMAAIgNgBg","t":[38.5,21.1,1,1,-11.1],"fc":"#C7CDCF"},"78":{"p":"AAfBZQgLgHgRgVQgPgVgLgHQgSARglgOQgngPAXghQgQggAMgbQAPgjAZAAQBeABAvBbQAQAeAEAfQAEAegJACQACAVgSAGIgJABQgSAAgYgSg","t":[39.1,25.2,1,1,-11.1],"fc":"#9BA7AA"},"79":{"p":"AgZBYQgkgPgdgUQgbgSABgGQgPgRgCgXQgEgzBBgpQAMgIAjAEQAnAEAjATQBkA0gRB7QgbATgmAAQgoAAg0gWg","t":[35,25.7,1,1,-11.1],"fc":"#686C72"},"80":{"p":"AgWgQIA0gFIgFAqIg2ABg","t":[45.3,37.4,1,1,-11.1],"fc":"#CC911B"},"81":{"p":"AgZAHIgkgfIAKgPIBqAuIAFAHQAEALgEAPIgBAAQgpAAgrghg","t":[31.9,36.7,1,1,-11.1],"fc":"#FFF2DC"},"82":{"p":"AAYBXQh3gRg/hqQAAgNADgNQAGgaALgCQAoBiBrAdQBAARBOgKQAIAFAAALQACANgNAGQgeAMgqAAQgYAAgcgEg","t":[35.2,32.3,1,1,-11.1],"fc":"#F9D180"},"83":{"p":"AifC8QglgOgigUIgUgMIAVgLQAugXA7gpQAxgiAvgoQBfhVA9hkIAHgKIB0BOIgGAJQhWCIhrBiQgfAbgbAVQgVAPgMAHIgSAKIgHACIgGABIgKAAIgDABQgiAAgqgPgAgMAKQguApg0AlQgsAggpAXQAXAMAWAHQAnAOAegBIAIgBIAEAAIARgJQANgIAQgMQAegXAagYQBlhdBQh+IhIgwQg9BghdBTg","t":[21.8,46.7,1,1,-11.1],"fc":"#1D2226"},"84":{"p":"AiJCLQhIgQgFgRQAuggBlg7QAZADAtgSQBggnB0hvQgGAziMCBQhFBBhDA4QgigEgkgIg","t":[22.5,50.3,1,1,-11.1],"fc":"#6B4F32"},"85":{"p":"AizCnIgqgdQBJgyBThBQCiiAAphOQAeAcA2AdQgoBEg5BHQhwCRhNAWQgUAEgTAAQgnAAglgRg","t":[22,47.1,1,1,-11.1],"fc":"#9F815D"},"86":{"p":"ApIm4QOsgaDlMfQg/BBhYAsQjJr+sxh0g","t":[328.6,206.8],"fc":"rgba(255,255,255,0.4)"},"87":{"p":"AnynCQMhAiDEL7QhLA7hcAtQibr+qjiHg","t":[338,209.5],"fc":"rgba(255,255,255,0.4)"},"88":{"p":"AmbnMQKVBeCiLXQhWA1hgAvQhtr/oUiag","t":[347.5,212.1],"fc":"rgba(255,255,255,0.4)"},"89":{"p":"AlFnVQIKCZCBKzIjGBfQg+r+mHitg","t":[356.9,214.8],"fc":"rgba(255,255,255,0.4)"},"90":{"p":"AhIAFIANgQIABABIARADQAdACAPAAQAeAAAagFIAOAPQgfAGgnABQgpgBgigGg","t":[8.3,9.1],"fc":"#1D2226"},"91":{"p":"AhOAIIANgaIABAAIAAABIAUAEQAdAEATAAQAfABAegJIAPAZQgjALgpAAQgtAAglgLg","t":[7.5,4.8],"fc":"#1D2226"},"92":{"p":"AABApQgMgLgMgiIgJgiQgCgLAaAJQAYAKALAPQAMAPgLAbQgHASgKAAQgFAAgFgEg","t":[4.5,1],"fc":"#B2AAA4"},"93":{"p":"AgHCCQgPgFgMgPIgJgNIgIgMQgSAAgDgYQAAgEADgBIACgCIgCgJQgBgBgHgDQgHgCgBgBQgDgEgHgRQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAIAFgGQgKgdgEgPQgGgWAAgXQAAgdAJgWIACgEIDCBIIAMAEQAAABABAAQAAAAAAAAQABABAAAAQABAAAAABIABACIAAAGQAAAKgEAaIgFAXQAIAAgBAGIgCATQgDANgHgCIgBALQAEABAAAFIABAMQAAACgGAEIAAAEQAAAMgCAHQgDAOgKAHQgKAJgMACQgKADgNAAQgYAAgSgIgAgxApQgCADADAGQAEAGAEACIATADIAEAHQAIANAEAEQAFAHAFADQAOAGAQgCIAOgBIAHgDIAAAAIAAgBIACghIAIAAQAHgBACgIQABgJgIgBIgCAAIgHgBIAEgZIAAgCIABgHIAKg3QhSgHhAgiIAAAHQAAARAEASQAHAZANAhQAFAMAKARQgGgCgDAAIgFAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAABg","t":[6.3,2.2],"fc":"#1D2226"},"94":{"p":"AgJAaIgqgCIgVgrICRgGIgDAtQg7AGgRAAIgDAAg","t":[7.6,6.8],"fc":"#604632"},"95":{"p":"AgDARQgQgCgPgMIgMgLQgFgDAxgDIAvgDQADACgBARQAAAKgRAEQgIACgLAAIgOgBg","t":[8.4,11.1],"fc":"#604632"},"96":{"p":"AgrBGQgcghgNg/QgHghgBgaQBJArBOAKIAYACQAIABABADQAGATgXBLQgPARghABIgCAAQgcAAgogQg","t":[6.1,-0.2],"fc":"#8E7F75"},"97":{"p":"AgKAmQgSgFgSghIgOgeQASgGAWgCQAsgDAZAXQAaAXgfAVQgWANgUAAQgFAAgHgBg","t":[7.3,9.6],"fc":"#4F6877"},"98":{"p":"Ag/AIIAMgaIAAAAIAPAEQAYAFAPAAQAaAAAWgJIANAaQgdALggAAQgkAAgegLg","t":[7.4,6.9],"fc":"#1D2226"},"99":{"p":"AABApQgMgLgMgiIgJgiQgCgLAaAJQAYAJALAQQAMAPgLAbQgHASgKAAQgFAAgFgEg","t":[4.4,1],"fc":"#99643F"},"100":{"p":"AgHCCQgQgGgLgOQgGgHgKgRIgRgdQgLgSgFgPQgOgkgHgZQgGgWAAgXQAAgdAKgVIABgFIDCBIIAMAEQAAAAABABQAAAAAAAAQABABAAAAQABABAAAAIABADIAAAFQAAAKgEAaIgHAnIAAABQgDALgBAWIgBAZQAAALgCAIQgDANgKAJQgIAHgOADQgKADgNAAQgYAAgSgIgAhIhSQAAAQAEATQAHAXANAiQAGAQAZApQAGALAGAHQAFAHAFADQAMAFASAAIAAAAQAJAAAFgCQAFgBACgCIABgCIAAgSIABgYQABgVAEgOIAAgBIAAgBIALg+QhTgIg/ghg","t":[6.2,2.2],"fc":"#1D2226"},"101":{"p":"AgrBGQgcghgOg/QgGghgBgaQBJAqBOALIAYACQAIABABADQAEANgJAnQgIAngEADQgQARggABIgCAAQgdAAgngQg","t":[6,-0.1],"fc":"#604632"},"102":{"p":"AgKAmQgSgFgSghIgOgeQASgGAWgCQAsgEAZAYQAbAXggAVQgWAOgUAAQgFAAgHgCg","t":[7.2,9.6],"fc":"#4F6877"},"103":{"p":"Ag3CQQAEgnAMg/QAZh+Aig6IACgCQAdAIAFAVIgHAPQgRAegCAVQgRA3AIAkIAGAIIACADIADALQADAKAAALIAAADQgBASgFAIQgEALgGADQgKAEgJgJIAAgLIAAgkIgwBEIgHABg","t":[33.9,29.2],"fc":"#4F6877"},"104":{"p":"AgmCsIgDAAIgJgDQgFgCgEgEQgEgCgDgGIgDgDIgPgFIgCgCQgHgIgIgQQgEgKgEgNIgGgYQgFgtANg/QAIgoAKgbQAHgUAJgQQAJgQAFgDQAKgFAFgEIAJgGQAIgDgDAJIgBABIgHATQgHAPgFARIgGANIgJAXIgEANIgEAVIgLA7IgDAWIgCAKQgDAMACALIADAPIADASQABAGAEAHQADAGAEAHIADABIAAgtIATA3IABABIABADIAEADIADADIABAAIADABIAPgBIAFAAIAHAAIAvhEIgBAjIAAALQALAKAKgFQAGgCAEgLQAFgIABgSIAAgDQAAgMgDgKIgDgKIgCgEIgGgHQgIgkARg4QACgVARgdIAHgPQAIgMAEgDQADgCAEAOQAGAOgCAMQgXA0gIAoIgCAIIgBAOQAAANABAKIAEAIQAFANAAATIAAAAIAAAEQgDAcgKAOQgIALgLAEQgFABgHgBQgIgCgFgCIgWABIgLAQIgDADIgCABIgSACIgJABIgJgBg","t":[30.1,28.6],"fc":"#1D2226"},"105":{"p":"AAFCUQgLgLAAgdIgBgFQABgMALANQALANAEARQADAQgFADIgDAAQgEAAgGgFgAglAzIAAgHIADgVIALg7IAEgWIAEgMIAJgXIAGgNQALgfAJgPIASAEQgJAag8DRQgFgKgBgag","t":[25.1,27.9],"fc":"#A1C5E5"},"106":{"p":"AgUCfIgDgBIgBAAIgDgDIgEgDIgBgDIgBgBIgTg3IAAAtIgDgBQgEgHgDgGQgEgHgBgGIgDgSIgDgPQgCgLADgMIACgKIAAAGQABAaAFAKQA+jQAHgbIgQgEQgJAPgNAfQAFgRAHgPIAHgTIABgBQAKAAALADIAlANQAUAGAKAIQgkA5gZB+QgMA/gCAoIAAAAIgFAAIgKABIgFAAgAgoBnIABAFQAAAeANALQAJAHAEgDQAFgDgDgQQgEgRgLgNQgHgGgEAAQgDAAAAAFg","t":[28.4,27.9],"fc":"#91B1CE"},"107":{"p":"AgrAwQAJgbA9hLQAEgBANACIg9BtQgMgFgOgDg","t":[15.1,13.6,1,1,0,-21.4,158.5],"fc":"#A1C5E5"},"108":{"p":"AAgBsIASgvQAKgZALgSQAKgSAIgSQAHgUgBgXQgBgPgGgHQgEgGgNgCQgWgBggAOIgNAHIgMAJQgHAGgQAZIg7BXQgZA5gFgcQABgkAGgJQAdhEAkgmQAKgMAPgLQAGgEAJgFIANgHQANgGAUgFQAVgFAPACQAJABALAEQAKAGAHAJQAKAOAAAXQAAAcgNAkQgcBKgUAsg","t":[12.1,15.7,1,1,0,-21.4,158.5],"fc":"#1D2226"},"109":{"p":"Ag0BVQATgmAdg5QAdhAAMggQAhADghCNQgdAjgOAig","t":[7.2,18.5,1,1,0,-21.4,158.5],"fc":"#4F6877"},"110":{"p":"AgLBiQgmABghgJQghgKAHghQAfg7AbglQAhgrASAFQAqgTAgAIQBAAPg0CDQgUAQgRAlQgYgDglAAg","t":[12.1,15.5,1,1,0,-21.4,158.5],"fc":"#91B1CE"},"111":{"p":"Ag1CgIA/jNIgQgFQgQgEgQgHIAAABIgrgeIAAgDIgFgFIgEgJQgBgFAAgKQAJAKAOAIQAkAYA0gGQgCAFgDAEQgEADgIABIgXgCQgRgCgIgEQAJAGAPAEQAIADAQAEIABAAQAMABAHgFIAFAFIALAHQALAGAOAFIABAAIAGABIAGABIgDAFIgCACIgFgBIg4B0IAAAAIgCAHIgDALQgKAogDAHQgKAYgIAHQgTgHgJgIgAApg+QgFAAgGgEIgFgDQAEgDADgEQAHAEARACQAXADANgHIAAADIgEAIIgCACQgIAGgLgBIAAAAQgQgCgKgEgAAKiTQgKgGgQgGIgvgNIACgCIAaAJQATAGASAAIAMAAIgBAOIgDgCg","t":[25.6,38.4],"fc":"#4F6877"},"112":{"p":"AgkCrQgMgGgcgTQgIgDgGgHQgMgLgHgPQgHgNgDgLIAHAFIAWg4IAbhyIArAeIAAAAQARAHANAEIATAFIhADNgABLg6QgRgDgIgEIAEgHQADgHAAgKQABgIgBgKIAAgCIgBgBIgEgGIAFggIAUAEQASAEAKAEQAJAGAEAJQACAEAAAFIAAABQgEgIgJgIQgQgNgagEQgDgBgCAGQgDAGAHADQAHAHAZAJQATAIAEgBIAAAGIgIAkIAAABIAAACQgKAFgOAAIgMgBgAgyhcQgOgJgJgKIAAgEIAAgCQABgJAEgFIAEgFIAFACIA3AKQANAEAKAFQANAGAFAGIAAABQAEAPgCAKIgBACIgVABQgmAAgdgSgAgVhuQAeANALACIANABQAEgBgDgJQgGgLgsgKIgugJQAFAJAkAPgAgRiZIgZgJIAAgBIASgFIAOgDIgDACQgGADAHACIAQAEQAJADAJgCQAJgBgCgEIgCgEIAEADIADAEIAAACIgCALIgMABQgUAAgRgGg","t":[23.8,37.3],"fc":"#91B1CE"},"113":{"p":"AgHAlQgLgCgggNQgjgPgFgHIAtAIQAtAJAGALQACAJgDABIgMgBgABEASQgZgJgIgHQgGgCADgFQACgFACAAQAbAFAQAKQAJAIADAIIgBAFIAAAAQgFAAgRgIgAgWgaIgTgEQgHgCAGgDIAEgBIAMAAIABAAIAFgBIACAAIAGAAIAJACIADABIAAAFQACADgHABIgHABQgFAAgFgCg","t":[26.7,23.9],"fc":"#A1C5E5"},"114":{"p":"AACDEQgHgBgLgHIACgCQAHgHAJgYQADgHALgnIAEgLIACgIIgBAAIA5hzIAEAAIACgBIADgGIgGgBIgFAAIgCgBQgOgFgKgGIgMgHIgEgFQgIAFgMAAIAAAAQgQgEgIgDQgPgFgKgGQAJAEARADIAXACQAIgCADgDQAEgDABgGIABgCQACgKgEgPIAAgBQgEgGgOgGQgJgFgOgEIg3gKIgFgCIgEAFQgDAFgCAJIABACIAAAEQgBAKABAFIAFAKIAFAFIgBACIgbByIgWA4IgGgFQgNgMADgNIAIgWIALgaIgBgBQALgeAIg1IACAAIgDgFIgCgOIgCgJIAAgSIABgCIAAgDQACgLAFgJQAGgIAGgEIAHgEIASgcIAGgDIAPgCQAOgEAPgBIAPAAQAJABAJACQAJAEAIAGIAGAJIAAABIAbAFIAhAJIABACQAIADAIAJQAIAHADAKQADAIgBAJIABAFIAAAAQAAAFgCAJIgLAjIgBgBIgCAHIgBABQgCAOgJALIgMAZIgBADIgeBUIAAAAIgTAwQgQAmgGAHQgLARgNAAIAAgBgAAsh0IAEAGIABABIAAACQACAKgCAIQAAAKgDAHIgDAHQgDAFgEACIAEAEQAGADAGABQAJAEARACIgBgBQAMACAHgGIADgDIAEgIIAAgCIAAgCIAAgBIAIgkIAAgGIABgEIAAgBQAAgFgCgEQgDgJgJgGQgLgEgSgEIgUgEgAggioIgSAFIAAABIgCACIAuANQAPAFAMAHIACABIACgOIACgLIgBgCIgDgEIgEgDIgDgCIgJgBIgHAAIAAgBIgEABIgBAAIgNAAIgOADg","t":[24.6,37.3],"fc":"#1D2226"},"115":{"p":"AhNCIQgcgHgBgUQgBgSAZgYQA6g3B3gTQBlATgtA7QgXAegsAZQg1ALgtACIgUABQgbAAgQgEgAg2gZQgsgFgdgdQgdgdgHgOQgHgOAigOQBAACAVABIAfABQAvgIA0gEQANgBAKAAIAAAAQAhABARAQQANAOAAAVQgCA5gtgIQgUgDgbgRQgKgHgNAEIgLAEQgpAhgnAAIgLgBg","t":[32,38.6],"fc":"#91B1CE"},"116":{"p":"AiHDSQgngJgXgSIgLgKIgDgEIgGgIQgGgMgCgSQgBgNABgWIACgmQAAgsADgaQAEgmAKghQAHgXAKgUIAPgUQAPgSAUgQQATgPAYgLQAsgUA0ADQA1ACAsAOQAYAIAUAMQALAGAIAHIAJAIIAGAHIgBgCQAPAeALAkQAKAhAHAlIAHA0QgLAQgPAFQgMAFgPgGIg3gYIABAAIABAAIgBgBQgOgFgNAHIAAAAIgEAEQgKALgLAHQgPAKgMAEQgvAOhGghQgkgRgggXQAHAJAYAUQAYAVARALQAvAeBGgGQAPgDAQgLIARgOQAJgIAIgCQAOABAQAKQASAMAOACQATAEAPgKQANgJAJgRQADAsgGAdQgGAjgTAXQgRAXgiAMQgcAJgpAEQgfAEgpAAIgIAAQhPAAg1gOgAghCSQgZAYABASQABAUAcAHQAWAFAngCQAvgCA1gLQAsgZAXgeQAtg7hlgVQh5AVg4A3gAhygXQAHAOAdAbQAdAdAsAFQAqAFAxglIALgEQANgEAKAHQAbARAUADQAtAIACg3QAAgVgNgOQgRgQghgBIAAAAQgKAAgNABQg0AEgxAIIgdgBQgVgBhAgCQgiAOAHAOg","t":[27.1,30.7],"fc":"#4F6877"},"117":{"p":"AiVDwQgugOgagVIgQgPIgGgJIgGgKQgIgQgCgZQgBgQACgXIADglQAAgkAHglQAHgpAMghQAQgqAUgaIAbgiIAIgIQAUgRAagNQAxgYA7ABQA8ABAuANQAbAIAZAOQAOAIAKAIIAQAPIAGAHIAAAAIABABQASAiAMAmQANApAGAhQAIAoACAhQADAqgGAlQgIAtgZAgQgaAfgsAPQghAKgsAFQgfADgtAAQhdgBg5gRgAhljRQgYALgSAOQgVAQgOASIgQAVQgJATgHAXQgKAhgEAmQgEAaAAAtIgBAmQgBAVABANQABASAHAMIAFAJIADADIAMALQAXARAmAKQA5APBUgBQAoAAAggEQAogEAcgKQAigMASgWQASgXAHgkQAFgdgCgrQgKARgMAIQgPALgTgEQgOgDgTgLQgQgLgNAAQgIACgKAIIgRAOQgQALgOACQhGAGgwgeQgQgKgZgWQgXgUgHgHQAgAWAkAQQBGAhAvgOQAMgDAOgKQALgIALgKIADgEIABAAQANgHANAFIABAAIAAABIgCgBIA3AYQAPAHANgFQAOgGAMgQIgHg0QgHglgKggQgLgkgPgeIAAABIgGgHIgIgHQgJgHgKgHQgUgMgZgIQgrgOg2gBIgNgBQgsAAgnASg","t":[27.6,31.1],"fc":"#1D2226"},"118":{"p":"AghAvIgogiIABgXQgBgSACgIIAAgIIARgLICAAWIgLBDIgsAWgAg7gkQAAAEADARIAEASIAAABIAcAYIAoAHIAcgOIANgsIhmgWg","t":[64.4,19.2,1,1,0,0,180],"fc":"#1D2226"},"119":{"p":"AgQAhIgjgYQgBgkADgNIBmAVIgBAxIgVALg","t":[65.6,19.6,1,1,0,0,180],"fc":"#838B8E"},"120":{"p":"AgJgQIAUgMIgEAkIgRAVg","t":[59.2,19.3,1,1,0,0,180],"fc":"#5B6568"},"121":{"p":"AgZAiIgng9QAFgHAMgHIBwAXIgIAqIgjASg","t":[64.6,18.6,1,1,0,0,180],"fc":"#B4BBBF"},"122":{"p":"AiLA0QgogNgagRQgRgKgMgMQgFgHgDgZQgBgFABgLQACgMACgEIAMAKQgDAJgBAIQAAALAFAFQAKALARAJQAbANAlAKQBDASBEgDQBFAABCgWQAigLAegOIAcgRQADgDgBgIIgIgSIALgPQACADAIAbQABAHAAALQgBANgEAGIgFAEIgbAQQgcARglAOQg+AWhPADIgFAAQhJAAg+gUg","t":[48.4,18.1,1,1,0,0,180],"fc":"#1D2226"},"123":{"p":"AAgApIgPgDIgugJIgHgBIgRgEIgKgFIgCgBIgFgFQgEgFgFgIIgGgNIgLgcQANAJAKAKIALALIAIAJIACABIABAAIACABIAtADIAcAHQAVAHADAAIAEAAIAFgBIAMgHQAKgFASgEIgJAKIgKAKQgGAIgEAEQgEAEgEACIgGACIgEABIgJABIgJgBg","t":[52.9,26.4,1,1,0,0,180],"fc":"#1D2226"},"124":{"p":"AgrAzIgMgCQgtgEglgLIAPADQg7gRgvgbQgLgfAIgDQBYA7CFAAQBpAABMgeQAmgQAVgXIAFAmQgTALggAMQgyAZg7ALQgoAGgmAAQgUAAgUgBg","t":[48.4,17.6,1,1,0,0,180],"fc":"#835B2C"},"125":{"p":"AiMgUQBMARBtgWQA3gMAogPIhBBTIhtAWQgMgLheg+g","t":[51.1,24.3],"fc":"#8E7F75"},"126":{"p":"AhIAFIANgQIABABIARADQAdACAPAAQAeAAAagFIAOAPQgfAGgnABQgpgBgigGg","t":[21.8,13.6],"fc":"#1D2226"},"127":{"p":"AhOAIIANgaIABAAIAAABIAUAEQAdAEATAAQAfABAegJIAPAZQgjALgpAAQgtAAglgLg","t":[21,9.2],"fc":"#1D2226"},"128":{"p":"AABApQgMgLgMgiIgJgiQgCgLAaAJQAYAKALAPQAMAPgLAbQgHASgKAAQgFAAgFgEg","t":[18,5.4],"fc":"#B2AAA4"},"129":{"p":"AgHCCQgPgFgMgPIgJgNIgIgMQgSAAgDgYQAAgEADgBIACgCIgCgJQgBgBgHgDQgHgCgBgBQgDgEgHgRQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAIAFgGQgKgdgEgPQgGgWAAgXQAAgdAJgWIACgEIDCBIIAMAEQAAABABAAQAAAAAAAAQABABAAAAQABAAAAABIABACIAAAGQAAAKgEAaIgFAXQAIAAgBAGIgCATQgDANgHgCIgBALQAEABAAAFIABAMQAAACgGAEIAAAEQAAAMgCAHQgDAOgKAHQgKAJgMACQgKADgNAAQgYAAgSgIgAgxApQgCADADAGQAEAGAEACIATADIAEAHQAIANAEAEQAFAHAFADQAOAGAQgCIAOgBIAHgDIAAAAIAAgBIACghIAIAAQAHgBACgIQABgJgIgBIgCAAIgHgBIAEgZIAAgCIABgHIAKg3QhSgHhAgiIAAAHQAAARAEASQAHAZANAhQAFAMAKARQgGgCgDAAIgFAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAABg","t":[19.8,6.6],"fc":"#1D2226"},"130":{"p":"AgJAaIgqgCIgVgrICRgGIgDAtQg7AGgRAAIgDAAg","t":[21.1,11.2],"fc":"#604632"},"131":{"p":"AgDARQgQgCgPgMIgMgLQgFgDAxgDIAvgDQADACgBARQAAAKgRAEQgIACgLAAIgOgBg","t":[21.9,15.6],"fc":"#604632"},"132":{"p":"AgrBGQgcghgNg/QgHghgBgaQBJArBOAKIAYACQAIABABADQAGATgXBLQgPARghABIgCAAQgcAAgogQg","t":[19.6,4.2],"fc":"#8E7F75"},"133":{"p":"AgKAmQgSgFgSghIgOgeQASgGAWgCQAsgDAZAXQAaAXgfAVQgWANgUAAQgFAAgHgBg","t":[20.8,14],"fc":"#4F6877"},"134":{"p":"AhAApQgLgDgHgGIgCgDQADgDAVgDQAZgEAKABQAHABABAGQACAGgDABQgUAIgQAAIgKgBgAAVAgQgEgCAHgFQAHgGAJgDIASgGQAHgBgEAFIgCADIgKAHIgBABIgDACIgCABIgGADIgJAEIgEAAQAAAAAAAAQgBgBAAAAQgBgBAAAAQgBAAAAgBgAgMgPQgHgGACgDIANgFQAIgFAjgEQAlgFAJAEIgrAQQggAKgNAAQgGAAgDgCg","t":[32.7,41.6],"fc":"#A1C5E5"},"135":{"p":"AANCNIADAAQAOAAARgEIAugMIAAADIgbAFQgTAEgSAKIgKAHgAhaB2IgBgJIABgDQADgJAKgFIAAAAQAQgGAJgCQAGgCAGAAIAGAAQgCAEAAAGQgJAAgPAHQgVAIgIANgAgVBUQABgFAHgFQAHgEAOgHQAPgHAJgBQgKAAgQAEQgHABgRAGIAAAAQgKAGgFAIIgHgBIgNgBQgMABgOACIgBABIgGACIgGACIAAgGIACgDIADgBIAagMQAVgKAZgGQAPgEAQgCIgUhsIAAAAIgMhXQAOADANAJQAMAIAIAJIgIgCIAJA8IAlByIAHACIAIAFIAJANQgMgEgRgBQgsgBgpAgQgBgFABgFg","t":[31.8,28.2],"fc":"#4F6877"},"136":{"p":"Ag5CjQgEgCgDgFIAAgBQAHAGALACQAUADAagKQABgBgBgGQAAgGgHAAQgKgBgZAEQgVADgDADIgDgGIgLgjIAAgBIgBgCQAIgMAVgJQAPgGAJgBIABAIQABAIAFAJQADAHAGAIIABABIABABIAGADIALAeIgSAHQgRAGgMABQgLAAgGgGgAAmCdIgFgCIgBgBIgFgLIALgHQARgKAUgFIAagFIAAABIgNANIgLAJIACgCQAEgGgHACIgSAGQgJACgHAGQgHAGAEACQAAAAABAAQABABAAAAQAAAAABABQAAAAAAABIgEgBgAABBqIgBgBQgJgKgDgKIAAgCQAoghAsACQARAAAMAFIACADIABABQAEAJgBAGIgBAHIgFAAIg0ATQgQAFgKAAIgKABQgHAAgFgCgAA5BSQgjAFgKAEIgMAGQgBADAFAGQALAGAtgPIArgPQgEgCgLAAQgLAAgUACgAhZhAIgBAAIgBgIIgDgLQgLgoAAgHQgDgaADgJQAUgEAMABIABABQAMgBAjABIARACIAKBYIABAAIAVBrQgRADgOAEQgZAGgVAJIgaAMg","t":[30.9,29.4],"fc":"#91B1CE"},"137":{"p":"Ag0CzQgLgDgHgGQgHgGgEgIIgDgEIAAAAQgDgEgDgJIgIgkIABABIgCgIIABgBQgFgNACgNIgEgfIAAgCIgRhWIAAgBIgIgyQgFgqABgIQABgUAMgGQAIgEAOABIgBADQgDAJADAaQAAAHALAoIADALIABAIIABAAIAKCAIgDACIgCADIABAGIAFgDIAGgCIABAAQAOgDAMAAIAOAAIAGACQAFgJAKgFIAAAAQAQgGAIgCQAQgDALAAQgKABgPAGQgQAHgFAFQgGAFgCAFQgBAEACAGIAAACQADAKAJAKIABABQAHADAPgCQAKAAAQgFIA0gTIAFAAIABgHQABgGgEgJIgBgBIgCgDIgIgNIgJgGIgHgCIgkhyIgKg7IAJABQARAEAEAMIAEAXIAEAcIABAAQAHAiAUAwIgBABIAEADIAHAIIACADIAGAHIAJAPIAAABIABAAIABADQAEAMAAAKQAAAJgEAHIgEAHIgBAhIgEAFIgMAKQgKALgNAIIgOAIQgIAFgIACQgLACgKgCIgJgEIgBgBIgZAJIggAIIgCAAIgDAAQgHAAgJgCgAgnA8QgJACgQAGIABAAQgLAFgDAJIgBAEIABAIIABACIABACIAAABIALAjIADAGIACADIAAABQADAFAEACQAGAGALAAQAMgBARgGIASgHIgMgeIgFgDIgBgBIgBgBQgGgIgDgHQgFgJgBgIIgBgIQAAgFACgEIgGgBQgGAAgGACgAAgCDIAFALIABABIAFACIAEABIAEgBIAJgDIAGgDIACgBIADgCIABgBIAKgIIALgJIANgNIAAgBIAAgDIgtANQgSADgOABIgCAAg","t":[30.4,30.6],"fc":"#1D2226"},"138":{"p":"AgrAwQAJgbA9hLQAEgBANACIg9BtQgMgFgOgDg","t":[12.6,16.9,1,1,0,0,180],"fc":"#A1C5E5"},"139":{"p":"AAgBsIASgvQAKgZALgSQAKgSAIgSQAHgUgBgXQgBgPgGgHQgEgGgNgCQgWgBggAOIgNAHIgMAJQgHAGgQAZIg7BXQgZA5gFgcQABgkAGgJQAdhEAkgmQAKgMAPgLQAGgEAJgFIANgHQANgGAUgFQAVgFAPACQAJABALAEQAKAGAHAJQAKAOAAAXQAAAcgNAkQgcBKgUAsg","t":[9,17.8,1,1,0,0,180],"fc":"#1D2226"},"140":{"p":"Ag0BVQATgmAdg5QAdhAAMggQAhADghCNQgdAjgOAig","t":[3.5,18.6,1,1,0,0,180],"fc":"#4F6877"},"141":{"p":"AgLBiQgmABghgJQghgKAHghQAfg7AbglQAhgrASAFQAqgTAgAIQBAAPg0CDQgUAQgRAlQgYgDglAAg","t":[9.2,17.6,1,1,0,0,180],"fc":"#91B1CE"},"142":{"p":"AATAiQgDgBACgGQABgGAHgBQAKgBAZAEQAVADADADIgCADQgHAGgLADIgKABQgQAAgUgIgAgbAjIgJgEIgGgDIgCgBIgDgCIgBgBIgKgHIgCgDQgEgFAHABIASAGQAJADAHAGQAHAFgEACQAAABgBAAQAAAAgBABQAAAAgBABQAAAAAAAAIgEAAgAgpgXIgrgQQAJgEAlAFQAjAEAIAFIANAFQACADgHAGQgDACgGAAQgNAAgggKg","t":[14.5,48.7],"fc":"#A1C5E5"},"143":{"p":"AgcCTQgSgKgTgEIgbgFIAAgDIAuAMQARAEAOAAIADAAIgGANIgKgHgAA9BjQgPgHgJAAQAAgGgCgEIAGAAQAGAAAGACQAJACAQAGIAAAAQAKAFADAJIABADIgBAJIgBACQgIgNgVgIgAg/A/QgRABgMAEIAJgNIAIgFIAHgCIAlhyIAJg8IgIACQAIgJAMgIQANgJAOgDIgMBXIAAAAIgUBsQAPACAQAEQAZAGAVAKIAaAMIADABIACADIAAAGIgGgCIgGgCIgBgBQgOgCgMgBIgNABIgHABQgFgIgKgGIAAAAQgRgGgHgBQgQgEgKAAQAJABAPAHQAOAHAHAEQAHAFABAFQABAFgBAFQgpgggsABg","t":[15.5,35.3],"fc":"#4F6877"},"144":{"p":"AAiC1IgCAAIgggIIgZgJIgBABIgJAEQgKACgLgCQgIgCgIgFIgOgIQgNgIgKgLIgMgKIgEgFIgBghIgEgHQgEgHAAgJQAAgKAEgMIABgDIABAAIAAgBIAJgPIAGgHIACgDIAHgIIAEgDIgBgBQAUgwAHghIABgBIAEgcIAEgXQAEgMARgEIAJgBIgKA7IgkByIgHACIgJAGIgIANIgCADIgBABQgEAJABAGIABAHIAFAAIA0ATQAQAFAKAAQAPACAHgDIABgBQAJgKADgKIAAgCQACgGgBgEQgCgFgGgFQgFgFgQgHQgPgGgKgBQALAAAQADQAIACAQAGIAAAAQAKAFAFAJIAGgCIAOAAQAMAAAOADIABAAIAGACIAFADIABgGIgCgDIgDgCIAKiAIABAAIABgHIADgMQALgoAAgHQADgagDgJIgBgDQAOgBAIAEQAMAGABAUQABAIgFAqIgIAyIAAABIgRBWIAAACIgEAfQACANgFANIABABIgCAIIABgBIgIAkQgDAJgDAEIAAAAIgDAEQgEAIgHAGQgHAGgLADQgJACgHAAIgDAAgAAWA7QACAEAAAFIgBAIQgBAIgFAJQgDAHgGAIIgBABIgBABIgGADIgLAeIASAHQARAGAMABQALAAAGgGQAEgCADgFIAAgBIACgDIADgGIALgjIAAgBIABgCIABgCIABgIIgBgEQgDgJgLgFIABAAQgQgGgJgCQgGgCgGAAIgGABgAhpBoIAAABIANANIALAJIAKAIIABABIADACIACABIAGADIAJADIAEABIAEgBIAFgCIABgBIAFgLIAFgNIgCAAQgOgBgSgDIgtgNg","t":[16.8,37.7],"fc":"#1D2226"},"145":{"p":"AAMCiIgSgHIALgeIAGgDIABgBIABgBQAGgIADgHQAFgJABgIIABgIQAJABAPAGQAVAJAIAMIgBACIAAABIgLAjIgDAGQgDgDgVgDQgZgEgKABQgHAAgBAGQAAAGABABQAaAKAUgDQALgCAHgGIAAABQgDAFgEACQgGAGgLAAQgMgBgRgGgAgmCbQAEgCgHgGQgHgGgJgCIgSgGQgHgCAEAGIACACIgLgJIgNgNIAAgBIAaAFQAUAFARAKIALAHIgFALIgBABIgFACIgEABQAAgBAAAAQABgBAAAAQAAAAABgBQABAAAAAAgAgWBrQgKAAgQgFIg0gTIgFAAIgBgHQgBgGAEgJIABgBIACgDQAMgFARAAQAsgCAoAhIAAACQgDAKgKAKIAAABQgFACgHAAIgKgBgAhmBSIArAPQAtAPALgGQAFgGgCgDIgLgGQgKgEgjgFQgUgCgLAAQgLAAgEACgAA2A0QgVgJgZgGQgOgEgRgDIAVhrIABAAIAKhYIARgCQAjgBAMABIABgBQAMgBAUAEQADAJgDAaQAAAHgLAoIgDAMIgBAHIgBAAIgKCAIgagMg","t":[16.3,36.5],"fc":"#91B1CE"},"146":{"p":"AgOEsQgbgDgdgOQgWgLgYgQIgWgNQgNgIgJgIQgXgSgQgYQgagogHhBQgFgtABg6QAAg6AMgvQAOg7AfgmQAigrA2gTQAugPA6ACQA8ABAsAWQAyAYAdAxQAYApAKA9QAHApAAA+QAABBgIAoQgGAegMAXQgMAZgVAVIgVATIgUAQQgZATgTAMQgaAQgZAIQgQAEgNABIgNABgAhUkLQguAQgfAoQgaAjgLA2QgJApABA6QACA9AFAmQAJA6AVAeQANASATAPIAqAaQAbARAQAHQAXALATACQAlAGAvgcQAagPA0gsQAggfAMgxQAIgkACg/QACg7gFgnQgHg3gVgmQgYgsgsgWQgmgUg5gCIgOgBQgtAAglANg","t":[34,30.2],"fc":"#000000"},"147":{"p":"Ag2AWQAiAAAXgUQANgKAJgNIAIgOIhZAVIgGgoIB9gHIgDANQgDAVgJATQgJARgPAPQgRARgQAIQgTAJgXAEg","t":[61.6,24.1],"fc":"#000000"},"148":{"p":"AgwAfIAFgPIBcg3QgKAQgPASQgbAigWAIQgIADgGAAQgJAAAAgJg","t":[60.9,24],"fc":"#5A6F7C"},"149":{"p":"AgpApIgJg/IAggKQAkgJAgABQAAAZgjAcQgdAcgXAAIgEAAg","t":[60.5,23.9],"fc":"#97B4CE"},"150":{"p":"AALAxQgSgIgPgRQgPgPgKgRQgIgTgEgVIgDgNIB9AHIgGAoIhZgVIAIAOQAJAOANAJQAXAUAiAAIgDAoQgXgDgSgKg","t":[6.4,24.1],"fc":"#000000"},"151":{"p":"AAaAlQgWgIgbgiIgYgiIBbA3IAFAPQAAAJgKAAQgFAAgIgDg","t":[7.1,24],"fc":"#5A6F7C"},"152":{"p":"AgPANQgjgcAAgZQAhgBAkAJQATAFANAFIgJA/IgEAAQgWAAgfgcg","t":[7.5,23.9],"fc":"#97B4CE"},"153":{"p":"AhrDcQgmgXgggjIgYgeIAEgMQAGgMALABQANAJAhAhQAhAcASADQAKACA7AAIA/AAQAZgBAcgTQAagRARgXQAPgagBgMQAAgOgVgIQgNgFgWACIgjADIgNgIQgBgBhFABIhHAAIgxgJQgbgFBZABQCcgDArhXQAQghAFg6IAJhoQAMAJANAwQAPA1AEA9QAMCkhQBRQg6A7hKAIQgLACgNAAQgvAAgkgXg","t":[35.6,32.9],"fc":"#5A6F7C"},"154":{"p":"AgaB+QgEgMgDguQgDgsABgtQAAglAahAQALggANgYIAFAdQADApgDA1QgDA1AGAoQAEAWADAMQAIA6gDABIguAwQgIgkgHgRg","t":[15.9,25.7],"fc":"#5A6F7C"},"155":{"p":"AidDPQhChTACiJQADiBA1hFQA4hKBtABQBwABA4BJQA1BEABCBQABCGhBBUQg/BQhfAAQheAAg/hOg","t":[34,29.6],"fc":"#97B4CE"},"156":{"p":"AhjCfQAHgjAbgaQAgggAsgBQAvgCAiAeQAdAYAKAhQhBAyg8AAQg1AAg0gpgACoBiQhOgdgQgQQgVgUgIgnQgOhRAAgmQgXgng4gDQgZgHAPgLQBcgjBqA1QAtAoAKBTQAKBRgGAhQgFAdgVAAIgFgBgAjDAcQgNhCAVhBQAQgvATgSQA1gUAoApQAkAnAAAwQAAAwgVAcQgVAegWATQgrAYgaADIgDAAQgYAAgMhAg","t":[40.6,22.6],"fc":"#91B1CE"},"157":{"p":"AgEDgQgnAAgigDQgpgFgbgJQghgLgSgYQgSgVgIglQgJg0APhXQAFgeAMgoQAKgiAPgeIACgDIANgMQAIgHALgGQAUgMAYgIQArgNA2gDQA0gCAsAUQAVAJAWAQQAVAQANASIAQAUQAKAVAHAWQAKAhAEAmQAEAdgBAqIACAlQABAWgBANQgCASgGAMIgGAJIgIAIIgHAFQgWASgnAKQg1ANhOAAIgJAAgAAPBEQgsABggAgQgbAagHAjQBrBXB7hfQgKgigdgYQgggcgtAAIgEAAgAg1i1QgQAKAZAHQA5AEAWAnQAAAlAPBRQAHAnAVAVQAQAPBOAeQAZADAGggQAGgggKhRQgKhTgtgpQg/gfg8AAQglAAglAOgAiUikQgTARgQAvQgVBBANBCQANBEAagDQAagEArgXQAXgTAVgeQAVgdAAgwQgBgwgkgmQgbgcggAAQgQAAgSAHgAgDAOQgeAqguAeIBXguIBeAsQg1gggVgdIgUhog","t":[40.2,22.3],"fc":"#4F6877"},"158":{"p":"AhLD/QgugFgfgKQgtgOgaghQgZgfgHgtQgHgjAEgsQACgiAHgoQAGgfANgrQANgnASggIAAgBIABAAIAFgHIARgQQANgKALgGQAXgMAdgJQAvgOA7AAQA5gCAyAZQAYAMAXASIAIAHIAbAjQAUAbAQApQALAgAIAqQAFAhABAoIADAkQACAXgBARQgBAXgJASIgFAKIgHAJIgPAPQgcAWgtANQg8ARhaAAIgJAAQgfAAgjgCgAAGjjQg2ADgrANQgYAIgUAMQgLAGgIAHIgNAMIgCADQgPAegKAiQgMAogFAeQgPBXAJA0QAIAlASAVQASAYAhALQAbAJApAFQAiADAmAAQBUABA5gOQAngKAWgSIAHgFIAIgIIAGgJQAGgMACgSQABgNgBgWIgCglQABgqgEgdQgEgmgKghQgHgWgKgVIgQgUQgNgSgVgQQgWgQgVgJQgngSgtAAIgMAAgAAAAKIANhfIAUBoQAVAdA1AgIhegsIhXAuQAugeAcgqg","t":[39.7,22.7],"fc":"#1D2226"},"159":{"p":"AAAAAIAAAA","t":[59.1,28],"sc":"#000000","ss":[0.1,1,1]},"160":{"p":"AgyAtIANh8IBfBoQhPA3gZAAQgTAAAPgjg","t":[28.9,20.2],"fc":"#C7CDCF"},"161":{"p":"Ah+DOQghgRgOgJQgLgIgJgJIAAAAIgBgBQgIgKgGgKQgIgQAAgVIABgMIgCgBIgCgJQgGgaAAgdIABgMQgIgeAAgmQAAgsANghQAKgXAOgRIADgFIAHgKQAJgLAMgFQAJgFAKAAIABAAQAYgNAhgIQAxgOAxAAQBEAAAxAXQAiAQAXAYIAFAFIADAEQAMAPAIASQAUApAAA1QAAAggHAgIABABIAAAHQgBAfgHAcIAAABIAAALQAAAogWAcQgTAXgpAUQg2AchDAAQhIAAhGgjgAjEBpQAAAPAGANQAFALAMAKQARAPAnAUQBBAgBEAAQA9AAA0gaQAkgSAQgUQASgWAAghIgJADQgUAGgPAKQgMAIgGAKQgUAfgeARQghASgvAAIgJAAQgzAAgigUQgggRgSghIgBAAQgFgKgMgJQgKgHgNgGIgSgGIAAAIgAiKBcQARAMAJAPIAAAAQAPAbAYANQAbAQAsAAIAJAAQAnAAAbgOQAXgNAPgZIAAAAQAJgPASgMQANgJAQgGQANgFAMgDIABgGIAEgcIAAgBIgBAAIgBgBIABAAQgIgIgGgKQgIgNgEgOQgIgcAAgjQAAgpAIgkIgBAAIgDgFIgJgJIgiAjIgBABQAOBAgLAtQgTBOhcAxQgiAUhPgbIg1gUIAOAJgAiaAGQgkBOCRhgIhhhqgADEh7QgEAbAAAZQAAAXADATQAEAVAJAMIABACQAEgYAAgXQAAgwgRgkgAjIh6QgNAfABAnQAAAcAFAZIACgCQAGgIAEgOQAGgWAAgjQAAgYgDgbIgBgGIgHAPgAhSjPQgUAFgRAIQAHAFAJAIIAZAaQAkAkATANQATALAKAAIACAAQAOAAAOgGQAOgFAPgMQAWgOAfghIAWgXQgzgghOAAQgsAAgxANg","t":[39.4,24.1],"fc":"#1D2226"},"162":{"p":"AgYCpQgsAAgbgQQgYgNgPgbIAAAAQgJgPgRgMIgOgJIA1AUQBPAbAkgUQBagxAThOQALgtgOhAIABgBIAigjIAJAJIADAFIABAAQgIAkAAApQAAAjAIAcQAEAOAIANQAGAKAIAIIgBAAIABABIABAAIAAABIgBgBIABABIgEAcIgBAGQgMADgNAFQgQAGgNAJQgSAMgJAPIAAAAQgPAZgXANQgbAOglAAgACvAhg","t":[41.6,24.7],"fc":"#686C72"},"163":{"p":"Ah1C9QgngUgRgPQgMgKgFgLQgGgNAAgPIAAgIIASAGQANAGAKAHQAMAJAFAKIABAAQASAhAgARQAiAUAzAAIAJAAQAvAAAhgSQAegRAUgfQAGgKAMgIQAPgKAUgGIAJgDQAAAhgSAWQgQAUgkASQg0Aag9AAQhEAAhBgggADQAEQgJgMgEgVQgDgTAAgXQAAgZAEgbIAAgCQARAkAAAwQAAAXgEAYIgBgCgAjUg0QgBgnANgfIAHgPIABAGQADAbAAAYQAAAjgGAWQgEAOgGAIIgCACQgFgZAAgcgAAGhfQgKAAgTgLQgTgNgkgkIgZgaQgJgIgHgFQARgIAUgFQAxgNAsAAQBOAAAzAgIgWAXQgfAhgWAOQgPAMgOAFQgOAGgOAAg","t":[39.4,24.1],"fc":"#3A3736"},"164":{"p":"AiKA0QgogNgbgRQgTgNgJgJQgDgEgGgcQgBgFABgLQACgMACgEIANAKQgJAXAJAKQALALAQAJQAdAOAjAJQBCASBFgDQBEAABDgWQAhgLAfgOIAdgRQADgDgCgIIgIgSIALgPQACADAIAbQACAGgBAMQgBANgEAGIgFAEIgaAPQgeASgkANQg/AXhOADQhLAAhAgUg","t":[40.2,20.2],"fc":"#1D2226"},"165":{"p":"AgrAcIgKgDIgCgBIgBgBIgCAAIgEgDQgGgFgFgIIgIgKIgRgYQAHADAUALIAWANIADABIAAAAIAFAAIApgCIAeABIAZAAIABAAIABAAIACAAIAEgBIALgJQAIgHARgJIgOAZQgEAHgDAFIgHAHIgGADIgBABIgDABQgLAEgWAAIg1ABIgSAAg","t":[40.1,29.9],"fc":"#1D2226"},"166":{"p":"AiMgVQArAHA4AAQBwAABGggQhPBQgJAMIhwABg","t":[41.2,26.6],"fc":"#8E7F75"},"167":{"p":"AgrAzIgFAAIgHgBQgpgEgpgMIAPADQg8gQgtgcQgLgfAHgDQBYA7CGABQBpAABLgeQAngRAUgXIAFAmQgTAMggAMQgyAYg7ALQgoAGglAAQgVAAgUgBg","t":[40.2,19.7],"fc":"#835B2C"},"168":{"p":"AAIAyQALgeAEgSQAEgKACgMIACgMIABgHIgJAFIgtAoIgGAHIAAABIAAgCIgSgIIADgEIABAAIAHgGIAKgIQALgKAJgGQAJgKAKgGIAMgHQAFgCAFAAIAEABIABAAIABABIAAAAIACACQACAEAAACQABAGgBAJIgTBWg","t":[54.9,5.7],"fc":"#1D2226"},"169":{"p":"AgMBAIgPgEQgOgGgKgLQgHgKgGgPQgDgKgBgNIAAgHIAFgDIBhgtIAIgCQAEgBAGAAQAJACACACQAGAFAAAIIgBAMIgGARQgCAJgMARQgRAbgTAWIgFAGIgGAAIgCAAIgLAAgAAzgxQgKABgRAIIhJAnQABATAKANQANAQAZABQANgUASgcIAQgaIAGgNIACgHQAAgBAAgBQAAAAgBgBQAAAAgBAAQAAAAgBAAIgBAAg","t":[60.5,18.8],"fc":"#1D2226"},"170":{"p":"AgFBJQgNgCgNgLQgIgIgHgMIgFgGIAEgGIAbguIAUgjIAKgMIAFgEIAGgDIAGAAIADAAIABAAIACABIABAAIAGAEIACADIACAEIACAGQAEAJAAAHIACAcQgCAogBANIgBAFIgDAEIgLAJQgEAEgHADQgMAFgLAAIgFAAgAAXgzQgLAMgPAhQgLARgLAWQAKAQANAEQAPAGATgRIAAg0IgBgaIgDgNIgCgFIAAAAIgDADg","t":[44.3,13.1],"fc":"#1D2226"},"171":{"p":"AgQA0IAchxIAFBxQgGAGgIACIgGACQgJAAgEgKg","t":[46,13.3],"fc":"#F2EBDA"},"172":{"p":"AgpAlIBGhkIANBsQgJAMgPAFQgHACgHAAQgVAAgYgbg","t":[44.4,12.9],"fc":"#AA9D85"},"173":{"p":"ABLB7QggAAgngLQghgKgfgQQgSgKgNgJIgPgLQgIgHgFgHIgCgCQgGgJgIgOQgIgPgCgLQgCgQAEgQQAEgQAJgMQAPgUAdgQQAQgIAKgDQALgEARgCQAygEA0AiQAuAfAXAwIgJAFQgZgrgtgaQgvgcgrAGQgLABgLAFQgNAFgIAFQgWAOgMAQQgMASAEAVQACAKAEAJQAFALAGAHIACACIAAAAIAIAKIAMAKQANAKAPAIQAcAQAfALQAhALAgACQAkABAbgLIAHAQQgcAOgmAAIgFAAg","t":[46.4,16.6],"fc":"#1D2226"},"174":{"p":"AAsBpQg7gGgugbIgYgPIgWgSQgVgTgRgUQgKgNgEgMQgGgPABgQQACgOAJgOQAIgLALgKIAIAIQgWAWAAAVQgBAUATAWQARAQAVARIALAIIAgATIAwASIAXAIIAZAFQAvAGAxgOQACgNAAgLQAAgIgCgHIgEgQIARgFQAEAJABAIQADAJAAAJQACAQgEAVIgCAFIgFACQguAQgtAAIgUgBg","t":[45.8,22.7],"fc":"#1D2226"},"175":{"p":"AgSAbIAlhEIgTBTg","t":[56.7,5.5],"fc":"#F2EBDA"},"176":{"p":"AghAuQgXgIAGgRIBmhHIg+BlQgMgBgLgEg","t":[61.5,19.3],"fc":"#F2EBDA"},"177":{"p":"AgmAKQBGg/AGAGQAGAGgaBZg","t":[55,5.6],"fc":"#AA9D85"},"178":{"p":"AgaAzQgggQgCgtIA6gbQA5gZAFAHQAIAMhABkIgEAAQgNAAgNgGg","t":[60.5,18.9],"fc":"#AA9D85"},"179":{"p":"AAbAwQgWgGgWgSQgYgRgMgSQgLgTAHgLQAIgKAWAFQAXAFAWASQAYARALASQAMAUgIAKQgFAHgMAAIgNgBg","t":[51.6,12.5],"fc":"#C7CDCF"},"180":{"p":"AAfBZQgLgHgRgVQgPgVgLgHQgSARglgOQgngPAXghQgQggAMgbQAPgjAZAAQBeABAvBbQAQAeAEAfQAEAegJACQACAVgSAGIgJABQgSAAgYgSg","t":[51.3,16.6],"fc":"#9BA7AA"},"181":{"p":"AgZBYQgkgPgdgUQgbgSABgGQgPgRgCgXQgEgzBBgpQAMgIAjAEQAnAEAjATQBkA0gRB7QgbATgmAAQgoAAg0gWg","t":[47.2,16.2],"fc":"#686C72"},"182":{"p":"AgWgQIA0gFIgFAqIg2ABg","t":[55.1,29.7],"fc":"#CC911B"},"183":{"p":"AgZAHIgkgfIAKgPIBqAuIAFAHQAEALgEAPIgBAAQgpAAgrghg","t":[42.1,26.5],"fc":"#FFF2DC"},"184":{"p":"AAYBXQh3gRg/hqQAAgNADgNQAGgaALgCQAoBiBrAdQBAARBOgKQAIAFAAALQACANgNAGQgeAMgqAAQgYAAgcgEg","t":[46.2,22.8],"fc":"#F9D180"},"185":{"p":"AifC8QglgOgigUIgUgMIAVgLQAugXA7gpQAxgiAvgoQBfhVA9hkIAHgKIB0BOIgGAJQhWCIhrBiQgfAbgbAVQgVAPgMAHIgSAKIgHACIgGABIgKAAIgDABQgiAAgqgPgAgMAKQguApg0AlQgsAggpAXQAXAMAWAHQAnAOAegBIAIgBIAEAAIARgJQANgIAQgMQAegXAagYQBlhdBQh+IhIgwQg9BghdBTg","t":[25.1,41],"fc":"#1D2226"},"186":{"p":"AiJCLQhIgQgFgRQAuggBlg7QAZADAtgSQBggnB0hvQgGAziMCBQhFBBhDA4QgigEgkgIg","t":[25.1,44.7],"fc":"#6B4F32"},"187":{"p":"AizCnIgqgdQBJgyBThBQCiiAAphOQAeAcA2AdQgoBEg5BHQhwCRhNAWQgUAEgTAAQgnAAglgRg","t":[25.2,41.4],"fc":"#9F815D"},"188":{"p":"AghCVQgFgngDhAQgFiBAWg/IABgDQAcABALATIgFARQgJAhADAUQgDA7APAgIAIAGIADADIAGAJQAEAKADALIABADQACASgCAJQgBALgGAEQgJAHgMgHIgDgLIgHgjIgfBOIgGACg","t":[33.7,34.2],"fc":"#4F6877"},"189":{"p":"AATCdIgEgCIgEgDIgCgDIgBAAIgdgxIAKAsIgDgBIgKgLQgFgGgCgFIgIgRIgGgNQgEgLAAgNIgBgKIACAHQAGAZAIAJQAMjaADgcIgSAAQgHAVgHArIACgOIAEgiIAEgUIAAgBQAKgDANAAIAmAFQAUABAMAFQgWBAAFCAQACBBAFAnIAAABIgEABQgIACgHABIgCABgAgHBrIACAEQAFAdAPAIQAKAGAEgFQAEgEgHgPQgIgPgNgKQgFgEgEAAQgEAAABAGg","t":[25.9,34],"fc":"#91B1CE"},"190":{"p":"AAcCTQgPgIgHgdIgCgEQgBgMAPAKQANAKAIAPQAHAPgEAEQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQgDAAgGgDgAgjA+IgCgGIgBgWIgEg8IAAgWIABgNIADgYQAHgsAHgUIASAAQgDAcgMDZQgIgJgGgZg","t":[24.6,34.1],"fc":"#A1C5E5"},"191":{"p":"AgKCoQgFgBgFgDQgFgCgEgEIgDgDIgQgBIgDgBQgIgGgLgOQgHgJgHgMIgLgWQgQgrgBhAQgBgoADgdQACgVAFgSQAGgSAEgEQAIgHAEgFIAHgHQAIgGgCAKIAAABIgDAUIgFAiIgBAOIgEAZIgBANIABAWIADA7IABAWIABALQAAAMAEALIAGANIAIARQADAGAEAGIALAKIACABIgJgsIAeAxIABABIACACIAFADIAEACIABAAIADAAQAFgBAHgDIAFgBIAGgCIAhhOIAHAjIADALQAMAHAJgHQAGgEABgMQACgJgCgRIgBgDQgDgLgEgKIgGgJIgDgDIgIgGQgPgfADg8QgDgVAJghIAFgQQAEgNAEgEQACgCAIAMQAIANABAMQgLA3ACAsIABAHIACAMQACANAEAJIAFAHQAIAMAFASIAAABIAAAEQAEAbgGAQQgFANgLAGQgEACgHABQgJAAgEgBIgWAGIgHASIgDAEIgDACIgRAFQgIAEgKABIAAABg","t":[28.6,34.9],"fc":"#1D2226"},"192":{"p":"AAcCUIgfhNIgHAiIgDALQgMAHgJgGQgFgFgCgLQgCgJACgSIABgDQADgLAEgJIAHgJIACgEIAIgFIAMhcQADgUgJghIgFgRQALgTAcgBIABACQAWBAgFCBQgDBAgEAoIgBAAg","t":[12.4,36.4],"fc":"#4F6877"},"193":{"p":"AAACoQgJgBgIgDIgRgGIgDgCIgDgEIgHgRIgWgGQgEABgJgBQgHAAgEgCQgLgHgFgMQgGgQAEgcIAAgEIAAAAQAFgSAIgMIAFgHQAEgJACgOIACgLIABgIQACgrgLg3QABgNAIgMQAIgNACADQAEAEAEAMIAFARQAJAhgDAUIgMBcIgIAFIgDAEIgGAJQgEAJgDALIgBADQgCASACAJQABALAGAFQAJAGAMgHIADgLIAHgiIAhBNIAGACIAFABQAHADAFABIADABIABAAIAEgCIAFgDIACgDIABAAIAegxIgJArIACAAQAGgFAGgIQAHgJAGgLIADgKIAEgKQAEgKABgKIADgXQAEgZgBgxQAAgogCgRQgCgVgFgVIgGgaIAAgBQgCgLAIAGIAHAHQAEAGAIAHQAEAEAGASQAFARACAVQADAdgBAoQgBBAgQArIgLAWQgHAMgHAJQgLAOgIAGIgDACIgQABIgDACQgEAFgFACQgFADgFAAIgKABg","t":[17.5,37.1],"fc":"#1D2226"},"194":{"p":"AgpCUQgEgEAGgPQAIgPAOgKQAPgKgBAMIgCAEQgHAdgPAIQgGADgEAAQgBAAAAAAQgBAAgBAAQAAgBgBAAQAAAAAAgBgAAGiVIATAAQAIAaAJA+QAGBKgMAxQgHAZgHAJQgNjZgDgcg","t":[21.5,36.4],"fc":"#A1C5E5"},"195":{"p":"AgXCdIgCgBQgHgBgIgCIgEgCIAAAAQAFgnAChBQAFiAgWhAQAMgFAUgBIAmgFQANAAAKADIAAABIAGAaQAFAVADAVQABASABAoQAAAwgDAZIgDAYQgCAJgEALIgDAJIgEAKQgGALgHAJQgGAIgFAFIgDAAIAKgrIgdAxIgBAAIgCADIgEADIgEACgAgHBpQgNAKgIAPQgHAPAEAEQAEAFAKgGQAPgIAFgdIACgEQABgGgEAAQgCAAgHAEgAAgBiQAIgJAGgZQANgxgHhLQgIg+gJgaIgSAAQADAcAMDag","t":[20.4,36.3],"fc":"#91B1CE"},"196":{"p":"AgcAJQAAgJALgHQAKgIAKAAQAHAAALgDQAIgBAAAJQAAASgZAHQgLAEgIAAQgNAAAAgKg","t":[45,37.6],"fc":"#000000"},"197":{"p":"Ai6CrIAygjQgIgNAAgQQAAgXAQgQQAQgRAYAAQAWAAARAPQAggZAcgeQA2gwAigqQAzg/AWg2IAPAKQgXA8gwA9QglAvgyAvIhAA8QADALAAAHQAAAYgQAQQgRAQgXAAQgQAAgMgHQgaAVgcAUg","t":[31.3,26.1],"fc":"#000000"},"198":{"p":"AgzAXIACgJIAFgHIAGgHIAIgDIAJgGIAKgDIA/gLIggANIgRAJIgGADIgMAKIgFAGIgCADIAAABIgdACg","t":[45.3,37],"fc":"#343739"},"199":{"p":"ABFAPIgFgCQgGgCgJgCQgYgFgYgBIgkAAIgLABIgRACIgGAAIAFgEIAPgHIALgEIAbgGIANAAQAQABAMAEQAIACAEADIALAFQAJAEAFAGQADADAAADg","t":[34.5,45.5],"fc":"#000000"},"200":{"p":"AgkAXQgVgGgJgNQgFgEgBgHIAAgLIACgGIABgDIACAJQADALAHAEQAIAEARACQAKABAWAAIAhgBQARgBAIgEQAIgGADgKIADgHIACAIIAAALQgCAGgEAFQgGAJgHADQgHAFgLACQgOAEgXAAQgUAAgQgFg","t":[34.2,40.6],"fc":"#000000"},"201":{"p":"AAAEtIgBgBIgRAAIgVgFIgJgDQgagJgjgWIgngZIgMgJQgwgmgPg7QgJgegDg1IgBgzIACg9QABgPACgPQAGgqARgnQAEgLAIgNQADgGAMgQIAJgLIAKgLIARgOIAogYIAXgIQAmgKAcAAIAhAAQAKAAAZADQAuAJAZAOQAjATAYAfQAWAdANApQAUA8AABfQAAAvgEAfQgFAtgRAiQgRAlgjAbQgrAigRALQgoAZggAGIgTACIgGAAIgCABgAgPkYQgZABgkAJIgbALIgMAGIgLAIQgnAbgUAzQgOAjgFAoIgBAdIgBAWIADBWQAEAuAKAdQANAvAmAdIALAIIAnAXQAgAUAWAHIAGACIAMADIAJABIAHABIAGAAIAOgCQAXgDAkgVQAWgPAjgbQAdgXAPgcQAOgbAGgoQAFgcABgvQADhbgRg3QgKgmgUgaQgUgcgegRQgvgZhDAAIgNAAg","t":[34.1,30.2],"fc":"#000000"},"202":{"p":"Ai5CmIAygjQgIgOAAgPQAAgXAQgQQARgRAXAAQAWAAARAQQAegZAfgeQAzgvAkgsQAvg6AVgwIASAHQgVA0gvA9QgkAtg0AyQgeAdgiAeQADAJAAAJQAAAYgQAQQgQAQgYABQgPAAgMgIQgiAagUAOg","t":[31.5,27.4],"fc":"#5A6F7C"},"203":{"p":"Ag3AWIAIgBIAIgBIAIgBIAIgCIAOgGIAHgFIAEgEIAHgEIAFgGIALgNIAHgOIhZAVIgFgoIB9gHIgIAiQgDAIgFALIgKAQIgOAQQgEAFgEACIgIAHIgRALIgKAFIgKADIgVAFg","t":[61.7,24.1],"fc":"#000000"},"204":{"p":"AgoApIgJg/IAfgKQAkgJAhABQAAAZgkAcQgdAcgXAAIgDAAg","t":[60.5,23.9],"fc":"#97B4CE"},"205":{"p":"AAfA5IgKgDIgKgFIgKgFIgQgNIgVgXIgKgQQgFgLgDgIIgIgiIB9AHIgGAoIhZgVIAIAOIAKANIAMAKIAFAEIAHAFIAOAGIAIACIAIABIAHABIAIABIgDAog","t":[6.4,24.1],"fc":"#000000"},"206":{"p":"AAaAlQgWgIgbgiIgZgiIBcA3IAEAPQAAAJgJAAQgFAAgIgDg","t":[7.1,24],"fc":"#5A6F7C"},"207":{"p":"AhrDcQgmgXgggjIgYgeIAEgMQAGgMALABQANAJAhAhQAhAcASADQAKACA7AAIA/AAQAZgBAcgTQAagRARgXQAPgagBgMQAAgOgVgIQgNgFgWACIgjADIgNgIQgBgBhFABIhHAAIgxgJQgbgFBZABQCcgDArhXQAQghAFg6IAJhoQAMAJANAwQAPA1AEA9QAMCkhQBRQg6A7hKAIQgLACgNAAQgvAAgkgXg","t":[35.7,32.9],"fc":"#5A6F7C"},"208":{"p":"AgaB+QgEgMgDguQgDgsABgtQAAglAahAQALggANgYIAFAdQADApgDA1QgDA1AGAoQAEAWADAMQAIA6gDABIguAwQgIgkgHgRg","t":[16,25.7],"fc":"#5A6F7C"},"209":{"p":"AgNAkQghgDgRgTIgJgQQgWghBLgBQBIgCATAYQARATgfASQgZAOggAAIgOgBg","t":[51,25.1],"fc":"#91B1CE"},"210":{"p":"Ag4AZQgcgYAPgUIAWgRQAogLAuARQAwARgPAPQgUAXgjALQgQAFgMAAQgaAAgTgQg","t":[28.6,25.6],"fc":"#91B1CE"},"211":{"p":"AhLD/QgugFgfgKQgtgOgaggQgYgfgIguQgGghACguQADgjAHgmQAHglAMgmQANglARgiIABgBIAAAAIALgNIAMgKQAJgHAPgJQAYgNAbgIQAwgOA6AAQA7gBAxAYQAYAMAXASIAIAHIAbAjQAUAaAQAqQAMAiAGAoQAGAgABApIADAlQACAXgBAQQgCAYgIARIgFAKIgHAJIgIAIIgIAHQgaAVguAOQg8ARhaABQgtAAgegDgAAGjjQg2ADgrANQgYAIgUAMIgUANIgMAMIgBACQgRAigJAgQgMAmgFAfQgPBXAJA0QAHAkASAWQATAYAhALQAbAJApAFQAeADAqABQBSABA7gPQAogLAVgQIAGgGIAGgFIAFgGIADgGQAGgJADgVQABgNgBgWIgCglQAAgsgDgbQgFgmgJghQgIgXgJgUIgQgUQgNgSgWgQQgTgPgXgKQgogSgtAAIgLAAg","t":[39.9,22.4],"fc":"#1D2226"},"212":{"p":"AidAhQgYgHgUgWQgRgQgKgaQAOAWAUAOQAUANAWADQAWAFAWgIIAtgNIAdgKQAWgHAMAAQATAFAmAOQAXAIAVADIAhABIAKgBQARgFAZgMIArgXIgkAgQgYAVgTAHIgNAEIgNABQgPACgLgBQgZgCgZgIIgdgNQgQgHgLgBQgWACgXAMQgdANgUAEQgLACgKAAQgSAAgQgGg","t":[40.6,29.1],"fc":"#1D2226"},"213":{"p":"AilDMQgJgEgKgIQgPgKgMgLQgKgKgCgFQgDgGgCgMIgFgYQgPg3ALhOQAFgoAJgdIACAAQAfhtBOgZQBvgkBWAfQAtAQAZAZIATARIAaAsQAbA2ADAzQAPA7gDA5QgEA8gWAbQgoAxiGAJIgqABQhoAAg9gmgAgcBnQiPAdAbAlQANASAsANQAwAKBBgEQAwgDAegIQAdgHANgQQANgRgMgQQgbgkh1AAIgfAAg","t":[40.3,22.6],"fc":"#4F6877"},"214":{"p":"Ai/C/QgfgggKhEQgIgxAFgiQAIg+AOgsIAchMQCLhfB5AoQApANAiAbQAYATAIAOQAwAoAHB5QAHB5gmA6QhGA6iAAAIgDAAQh4AAhMgzg","t":[40,22.1],"fc":"#91B1CE"},"215":{"p":"AgUAxIgtgaIgDgXQgDgXAAgJIAAgDIABgJICOgEIAABEIgmAdgAgygYIAEAhIAAABIAgATIApAAIAZgTIAAglg","t":[39.3,22.5],"fc":"#1D2226"},"216":{"p":"AgRAbIgngSQgFgSAAgOIB7gDIAAAiIggATg","t":[39.3,23.7],"fc":"#838B8E"},"217":{"p":"AgRAiIgngWQgFgYAAgRIB7gEIAAArIggAYg","t":[39.3,22],"fc":"#B4BBBF"},"218":{"p":"AiLA0QgogNgagRQgTgMgKgKQgDgFgGgbQgBgFACgLQACgMACgEIAMAKQgJAXAKAKQAKALARAJQAcAOAkAJQBCASBEgDQBEAABEgWQAhgLAfgOIAcgRQADgDgBgIQgBgGgIgMIAMgPQACADAIAbQABAHAAALQgBANgEAGIgFAEIgbAPQgbASgmANQhAAXhNADQhMAAhAgUg","t":[38.9,19.5],"fc":"#1D2226"},"219":{"p":"AgrAcQgGgBgEgCIgCgBIgCgBIgBAAIgEgDQgFgEgGgJIgJgKQgMgQgEgIIAaAOIANAIIAKAFIACABIABAAIAFAAIAMgBIAdgBIAeABIAZAAIABAAIABAAIACAAIAEgBIALgJQAIgHARgJQgEAJgKAQIgIAMQgCADgEAEIgFADIgFACQgLAEgWAAIg1ABIgSAAg","t":[38.8,29.1],"fc":"#1D2226"},"220":{"p":"AiMgVQAqAHA5AAQBwAABGggQhQBQgIAMIhwABg","t":[39.8,25.8],"fc":"#8E7F75"},"221":{"p":"AgrAzIgFAAIgHgBQgqgEgogMIAPADQg7gQgvgcQgLgfAIgDQBXA7CGABQBpAABMgeQAmgRAVgXIAFAmQgTAMggAMQgyAYg8ALQgmAGgmAAQgUAAgVgBg","t":[38.9,18.9],"fc":"#835B2C"},"222":{"p":"AhIAFIANgQIABABIARADQAdACAPAAQAeAAAagFIAOAPQgfAGgnABQgpgBgigGg","t":[20.4,12],"fc":"#1D2226"},"223":{"p":"AhOAIIANgaIABAAIAAABIAUAEQAdAEATAAQAfABAegJIAPAZQgjALgpAAQgtAAglgLg","t":[19.6,7.6],"fc":"#1D2226"},"224":{"p":"AABApQgMgLgMgiIgJgiQgCgLAaAJQAYAKALAPQAMAPgLAbQgHASgKAAQgFAAgFgEg","t":[16.6,3.8],"fc":"#B2AAA4"},"225":{"p":"AgHCCQgPgFgMgPIgJgNIgIgMQgSAAgDgYQAAgEADgBIACgCIgCgJQgBgBgHgDQgHgCgBgBQgDgEgHgRQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAIAFgGQgKgdgEgPQgGgWAAgXQAAgdAJgWIACgEIDCBIIAMAEQAAABABAAQAAAAAAAAQABABAAAAQABAAAAABIABACIAAAGQAAAKgEAaIgFAXQAIAAgBAGIgCATQgDANgHgCIgBALQAEABAAAFIABAMQAAACgGAEIAAAEQAAAMgCAHQgDAOgKAHQgKAJgMACQgKADgNAAQgYAAgSgIgAgxApQgCADADAGQAEAGAEACIATADIAEAHQAIANAEAEQAFAHAFADQAOAGAQgCIAOgBIAHgDIAAAAIAAgBIACghIAIAAQAHgBACgIQABgJgIgBIgCAAIgHgBIAEgZIAAgCIABgHIAKg3QhSgHhAgiIAAAHQAAARAEASQAHAZANAhQAFAMAKARQgGgCgDAAIgFAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAABg","t":[18.4,5],"fc":"#1D2226"},"226":{"p":"AgJAaIgqgCIgVgrICRgGIgDAtQg7AGgRAAIgDAAg","t":[19.7,9.6],"fc":"#604632"},"227":{"p":"AgDARQgQgCgPgMIgMgLQgFgDAxgDIAvgDQADACgBARQAAAKgRAEQgIACgLAAIgOgBg","t":[20.5,14],"fc":"#604632"},"228":{"p":"AgrBGQgcghgNg/QgHghgBgaQBJArBOAKIAYACQAIABABADQAGATgXBLQgPARghABIgCAAQgcAAgogQg","t":[18.2,2.6],"fc":"#8E7F75"},"229":{"p":"AgKAmQgSgFgSghIgOgeQASgGAWgCQAsgDAZAXQAaAXgfAVQgWANgUAAQgFAAgHgBg","t":[19.4,12.4],"fc":"#4F6877"},"230":{"p":"Ag/AIIAMgaIAAAAIAPAEQAYAFAPAAQAaAAAWgJIANAaQgdALggAAQgkAAgegLg","t":[19.5,9.8],"fc":"#1D2226"},"231":{"p":"AABApQgMgLgMgiIgJgiQgCgLAaAJQAYAJALAQQAMAPgLAbQgHASgKAAQgFAAgFgEg","t":[16.5,3.9],"fc":"#99643F"},"232":{"p":"AgHCCQgQgGgLgOQgGgHgKgRIgRgdQgLgSgFgPQgOgkgHgZQgGgWAAgXQAAgdAKgVIABgFIDCBIIAMAEQAAAAABABQAAAAAAAAQABABAAAAQABABAAAAIABADIAAAFQAAAKgEAaIgHAnIAAABQgDALgBAWIgBAZQAAALgCAIQgDANgKAJQgIAHgOADQgKADgNAAQgYAAgSgIgAhIhSQAAAQAEATQAHAXANAiQAGAQAZApQAGALAGAHQAFAHAFADQAMAFASAAIAAAAQAJAAAFgCQAFgBACgCIABgCIAAgSIABgYQABgVAEgOIAAgBIAAgBIALg+QhTgIg/ghg","t":[18.3,5],"fc":"#1D2226"},"233":{"p":"AgrBGQgcghgOg/QgGghgBgaQBJAqBOALIAYACQAIABABADQAEANgJAnQgIAngEADQgQARggABIgCAAQgdAAgngQg","t":[18.1,2.6],"fc":"#604632"},"234":{"p":"AgKAmQgSgFgSghIgOgeQASgGAWgCQAsgEAZAYQAbAXggAVQgWAOgUAAQgFAAgHgCg","t":[19.3,12.5],"fc":"#4F6877"},"235":{"p":"AgrAwQAJgbA9hLQAEgBANACIg9BtQgMgFgOgDg","t":[14.5,13.9,1,1,0,-21.4,158.5],"fc":"#A1C5E5"},"236":{"p":"AAgBsIASgvQAKgZALgSQAKgSAIgSQAHgUgBgXQgBgPgGgHQgEgGgNgCQgWgBggAOIgNAHIgMAJQgHAGgQAZIg7BXQgZA5gFgcQABgkAGgJQAdhEAkgmQAKgMAPgLQAGgEAJgFIANgHQANgGAUgFQAVgFAPACQAJABALAEQAKAGAHAJQAKAOAAAXQAAAcgNAkQgcBKgUAsg","t":[11.4,16,1,1,0,-21.4,158.5],"fc":"#1D2226"},"237":{"p":"Ag0BVQATgmAdg5QAdhAAMggQAhADghCNQgdAjgOAig","t":[6.6,18.8,1,1,0,-21.4,158.5],"fc":"#4F6877"},"238":{"p":"AgLBiQgmABghgJQghgKAHghQAfg7AbglQAhgrASAFQAqgTAgAIQBAAPg0CDQgUAQgRAlQgYgDglAAg","t":[11.5,15.8,1,1,0,-21.4,158.5],"fc":"#91B1CE"},"239":{"p":"AAUAkIgEgDQgDgDAIgEQAHgFAJgBIASgEQAIgBgFAFIgCACIgLAGIgBABIgEACIgCAAIgGADIgJACIgDAAgAhFAgQgLgEgGgHIgBgDQADgDAVAAQAZgCAKADQAHABAAAGQABAGgDABQgPAEgNAAQgKAAgIgCgAgLgSQgGgGACgDIANgEQAJgDAjgBQAmgBAIAGIgtAKQgZAGgPAAQgKAAgEgEg","t":[18.6,59.3],"fc":"#A1C5E5"},"240":{"p":"AAHCUIADABQAOABASgCIAugHIAAADIgbABQgUADgSAIIgMAGgAhdBxIAAgJIABgDQAFgJAKgDIAAAAQAQgFAKgBQAGgBAGAAIAFABQgCAFAAAFQgJAAgRAEQgVAHgJALgAgUBXQABgEAIgFIAVgIQAQgFAKAAQgLgBgQABQgIABgRAEIAAAAQgLAFgFAHIgGgCIgOgCQgMgBgPABIgBAAIgFACIgGABIABgGIABgCIAEgCIAEiAIAAAAIgBgHIgCgNQgGgoAAgHQABgbADgJQAUgBAMACIAZDWIATgCQAOgDARAAIAAgBIAzAJIABAEIAHACIAIAHIAHAOQgNgGgQgCQgrgHgsAbQgBgFACgFg","t":[18.1,45.1],"fc":"#4F6877"},"241":{"p":"Ag5C4QgJAAgKgFQgKgDgHgIQgGgGgEgJIgCgEIAAAAQgDgEgBgKIgEgkIABABIgBgIIAAgBQgDgNAEgOIgBgeIAAgDIgHhXIAAAAIgCgzQAAgqACgJQADgTANgFQAIgDANADIgBACQgEAJAAAaQAAAIAGAoIABAMIABAIIABAAIgECAIgEABIgCADIAAAGIAGgCIAFgBIABgBQAPgBAMABIAOACIAGADQAFgIALgEIAAAAQAQgEAJgBQAQgCALACQgKAAgQAEIgWAJQgHAEgCAFQgBAEAAAGIABACQACAKAJAMIABABQAHAEANAAQAKAAAQgDIA2gNIAFAAIACgGQABgGgCgJIgBgBIgCgEIgHgOIgIgGIgGgDIgBgDIgWhyIgDg8IAIACQARAFACANIABAYQACAUgBAIIABAAQADAjAPAxIgBABIAEAEIAHALIAGAIIAHAQIAAACIABADQADALgBAKQgCAKgEAGIgFAHIgFAhIgEAEIgNAIQgLAKgOAHIgPAGQgIAEgJABQgLABgJgDIgJgGIAAgBIgZAHIgiAEgAgxA/QgKABgQAEIAAAAQgLAEgEAJIgBADIgBAJIABACIABABIAAACIAHAkIADAFIABAEIAAABQACAFAEADQAGAGALACQALAAASgEIAVgFIgKgfIgFgDIgCgBIgBgCQgFgIgCgIQgEgKAAgIIAAgHQABgGACgEIgFgBIgFAAIgHABgAANCNIADAMIABABIAFADIAFABIADAAIAJgDIAGgCIACgBIAEgCIABgBIALgFIAMgIIAOgMIABgBIAAgDIgvAIQgRABgOgBIgDAAg","t":[17.9,47.1],"fc":"#1D2226"},"242":{"p":"AhOCiQgDgDgCgFIgBgBQAHAGALAEQATAFAbgHQADAAgBgHQAAgGgHgBQgKgCgaABQgVABgDACIgCgFIgIgkIAAgCIAAgBQAJgMAWgGQAQgFAJABIgBAHQAAAIAEAKQADAIAFAIIABACIABABIAGADIAJAfIgUAFQgSAEgMAAQgLgCgGgGgAASCnIgFgDIgBgBIgDgMIALgFQASgIAUgDIAbgCIAAABIgPAMIgLAIIACgDQAFgFgIABIgSAEQgKABgHAFQgHAFADACIADAEIgEgBgAAIB0QgNAAgHgEIAAgBQgKgMgCgKIAAgCQAsgbArAGQARACAMAGIABAEIABABQADAJgBAGIgCAGIgFAAIg2ANQgOADgKAAIgDAAgAAtBeQgjABgKADIgMAEQgDADAGAHQAJAHAugJIAtgLQgHgFghAAIgGAAgAASAnIAAAAQgRABgOACIgTADIgYjWIAAAAIABABQAMAAAjAFQAIABAGADQAPAGANAKQALAJAIAKIgJgCIADA8IAXByg","t":[18.4,46.1],"fc":"#91B1CE"},"243":{"p":"AhNCIQgcgHgBgTQgBgTAZgXQA6g4B3gTQBlAUgtA7QgXAdgsAZQg1AMgtACIgUAAQgbAAgQgEgAg2gZQgsgFgdgdQgdgcgHgOQgHgOAigOQBAABAVACIAfAAQAvgHA0gFIAXgBIAAAAQAiABAQARQANANAAAVQgCA5gtgHQgUgEgbgRQgKgGgNADIgLAFQgpAggnAAIgLgBg","t":[27.7,29.9],"fc":"#91B1CE"},"244":{"p":"AiVDwQgugOgagVIgQgPIgGgJIgGgKQgIgQgCgZQgBgQACgXIADglQAAgkAHglQAHgpAMghQAQgqAUgaIAbgiIAIgIQAUgRAagNQAxgYA7ABQA8ABAuANQAbAIAZAOQAOAIAKAIIAQAPIAGAHIAAAAIABABQASAiAMAmQANApAGAhQAIAoACAhQADAqgGAlQgIAtgZAgQgaAfgsAPQghAKgsAFQgfADgtAAQhdgBg5gRgAhljRQgYALgSAOQgVAQgOASIgQAVQgJATgHAXQgKAhgEAmQgEAaAAAtIgBAmQgBAVABANQABASAHAMIAFAJIADADIAMALQAXARAmAKQA5APBUgBQAoAAAggEQAogEAcgKQAigMASgWQASgXAHgkQAFgdgCgsQgKASgMAIQgPALgTgEQgOgDgTgLQgQgLgNAAQgIACgKAIIgRAOQgQALgOACQhGAGgwgeQgQgKgZgWQgXgUgHgHQAgAWAkAQQBGAhAvgOQAMgDAOgKQALgIAKgKIAEgEIAAgBQAOgGANAFIABAAIAAABIgCgBIA3AYQAPAHANgFQAOgGAMgQQgDgXgEgdQgHglgKggQgLgkgPgeIAAABIgGgHIgIgHQgJgHgKgHQgUgMgZgIQgrgOg2gBIgNgBQgsAAgnASg","t":[23.2,22.4],"fc":"#1D2226"},"245":{"p":"AiHDSQgngJgXgSIgLgKIgDgEIgGgIQgGgMgCgSQgBgNABgWIACgmQAAgsADgaQAEgmAKghQAHgXAKgUIAPgUQAPgSAUgQQATgPAYgLQAsgUA0ADQA1ACAsAOQAYAIAUAMQALAGAIAHIAJAIIAGAHIgBgCQAPAeALAkQAKAhAHAlQAFAbACAZQgLAQgPAFQgMAFgPgGIg3gYIABAAIABAAIgBgBQgOgFgNAHIAAAAIgEAEQgKALgLAHQgPAKgMAEQgvAOhGghQgkgRgggXQAHAJAYAUQAYAVARALQAvAeBGgGQAPgDAQgLIARgOQAJgIAIgCQAOABAQAKQASAMAOACQATAEAPgKQANgJAJgRQADAsgGAdQgGAjgTAXQgRAXgiAMQgcAJgpAEQgfAEgpAAIgIAAQhPAAg1gOgAghCSQgZAYABASQABAUAcAHQAWAFAngCQAvgCA1gLQAsgZAXgeQAtg7hlgVQh5AVg4A3gAhygXQAHAOAdAbQAdAdAsAFQAqAFAxglIALgEQANgEAKAGQAbASAUADQAtAIACg3QAAgVgNgOQgQgQgigCIAAABIgXABQg0AEgxAIIgdgBQgVgBhAgCQgiAOAHAOg","t":[22.8,22.1],"fc":"#4F6877"},"246":{"p":"AgbAjIACgFIgEADIgUgJIAAgmIBjgUQAAAFgDAPIgEARIAAABIgcAZIgoAHg","t":[69.8,17.3],"fc":"#838B8E"},"247":{"p":"AAEAVIgMgsIABAAIAPAJIAAAmg","t":[63.9,17.3],"fc":"#5B6568"},"248":{"p":"Ag6AGIBngUIAOAJIAAABIhjATg","t":[68.9,14.2],"fc":"#B4BBBF"},"249":{"p":"AAAAsQhGAAhCgWQghgLgegOIgdgRQgDgDACgIIAFgMQAVATAhAOQBLAeBpAAQAqAAAlgGIAEAXIgPADQgfAEgfAAIgQAAgADeghIAHgFIABAIIAAADg","t":[52.8,15.6],"fc":"#835B2C"},"250":{"p":"AgbAVIgFgCIgMgGQgKgFgSgHIABADIgbgRQAkAGApABQBAABA4gPIgBACIgLALIgIAHIgCABIgBAAIgCABIgtAFIgdAHQgUAHgDAAg","t":[54.9,24.2],"fc":"#8E7F75"},"251":{"p":"AgDBhIgFgBIgFgCQgFgCgDgDQgFgEgGgIIgJgLIgIgJIgCgDQATAHAKAFIAMAGIAFACIADAAQACAAAVgHIAdgHIAugFIABgBIABAAIACgCIAJgIIAKgLIACgCQg5APhAgBQgpgBgkgGQgigHgegLQglgNgcgQIgbgSIgFgEQgEgFgBgOQAAgLABgHQAIgaACgDIALAPIgCAFIgGAMQgBAIADADIAcARQAeAQAiALQBCAUBFABQAnABAogFIAPgCIAAgBIgEgVIgGggICDgWIAHAFIAJAFIAAgCIgBgIIgDgKIAMgKQACAFACALQABAMgBAFQgDAYgFAHIgCACIABAYIgoAgIg3AJIgGgDIgCAEIgGANQgEAKgEAFIgGAGIgCABIgJAFIgRAEIgHAAIgwAJIgPADIgJABIgHgBgACNASIACABIAqgHIAcgWIAAgBIAEgUQADgPAAgFIAAgBIgOgJIhoAWIgBAAIAOAsIAEACIAUAKIAEgDIgCAEg","t":[52.8,18.9],"fc":"#1D2226"},"252":{"p":"AAHAAIAAAAIgNABIANgBg","t":[61.5,19.5],"fc":"#604632"},"253":{"p":"AAVCdQgNgDgIgNQgMgSgDgeIAAgEIAAgBQAAgVAEgPIAEgKQAEgHgFgjQgJgygeg+QgDgOAGgRQAFgQADADQAIAGAQAbQARAhADAYIANBoIgDAEIgGAJQgDAFgBAHQgDAKAAAPIABADQABATAFALQAGAMAHADQAMAFAMgMIgBAXQgFADgJACIgHABIgGgBg","t":[4.9,21.7],"fc":"#343739"},"254":{"p":"AgMAfQgFgEADgSQAEgRALgPQANgPACANIgBAGQAAAggNAMQgGAHgEAAIgEgBg","t":[18.9,33.3],"fc":"#A6C7E4"},"255":{"p":"AgtiCIAUgGQATAeAXA/QAdBRAAA5QAAAdgFANQhKjtgMgeg","t":[19.2,15.2],"fc":"#A6C7E4"},"256":{"p":"AgJAfIAShAIABBDg","t":[21,32.9],"fc":"#343739"},"257":{"p":"AgRDEIgZgCIgQgVQgXAAgEgBQABgRgBgTIgCgoIA7BMIANABQAIABAHgBIACAAIACgBIAEgDQADgCABgDIACgDIABgDIADgFIAVgHQAFgHAEgKIAIgZQACgFAAgHIABgNQABgMgBgLIgDgaQgDgdgQg2QgLgqgHgUQgJgXgKgWIgOgbQgFgMALAEIAIAGQAGAGALAFQAGADALARQAKASAJAXQAMAiAKAqQARBHgFA0QgBAGgGAVQgFAUgEAIQgHASgJAJIgCADIgRAFIgDAEIgHAJQgEAEgHAEIgHACIgDABIgCAAIgBAAIgJABIgKgBg","t":[18.4,19.7],"fc":"#343739"},"258":{"p":"AAQCCQgDALgQAKQgRAHgNgWQgJgOgFgYQAAgiAFgQQABgDgDgDIABgJQAAgHgJgFQgEgDADgSIAEgZIAAgMQgCgHACgFQAGABACgEIABgBQgDgKgNgbIgLgaQgEgnAtgNQApBBAgCRQAQBIAGAtQgDAKgJAAQgJAAgggng","t":[9.3,21],"fc":"#5A6F7C"},"259":{"p":"AAaB6QgigMgNADQgHADgfg0Qgdg0gHAFIACgnQAAgCgOglQAEgVAOgMQAMgLAagJIArgPQAcgJAQAJQAMARARAoQANAhAHAaQAwCSg2ABIgBAAQgPAAglgMg","t":[15.2,14.3],"fc":"#97B4CE"},"260":{"p":"AAAgKQABAMgBAHIAAACg","t":[5.2,26],"fc":"#97B4CE"},"261":{"p":"AAOBNQgKgCgUgYIgVgYIgPAQQgTAOgSgJQgQgSgDgeQgFgpAhgYQBQgYBiAbQAJAEACAHQACAGgEAGIgLAoQgNAsgLAGIgaARQgRAJgLAAIgEAAg","t":[15.2,30.8],"fc":"#97B4CE"},"262":{"p":"AgSAWQgOgBAAgLQAAgKAMgJQAMgIALAAQAIAAAOgEQAIgBAAAKQAAAWgdAIQgNAEgIAAIgBAAg","t":[5.8,3.6],"fc":"#343739"},"263":{"p":"Ag6AaIACgJIAFgJIAIgIIAJgEIALgFIAXgJIA7gJIgjAPIgUALIgHADIgIAGIgHAHIgEAFIgDAFIAAABIghABg","t":[6,2.8],"fc":"#343739"},"264":{"p":"AgpAaQgYgGgLgPQgFgFgCgJIABgMIACgHIABgCIACAJQADALAJAHQAPAHAyAAIAmgBQATgBAJgEQAHgFAGgNIADgJIACAJQABAIgBAEQgBAIgGAGQgGAJgJAEQgJAFgLADQgSAEgYAAQgVAAgUgFg","t":[8.4,3.2],"fc":"#343739"},"265":{"p":"ABJAPIgSgEIg2gHIhQADIAGgEQAJgGAIgDIANgFIAOgDIAQgCIAPgBQAQABAQAEIAOAGIAMAGQALAFAFAHQADADABADg","t":[8.1,1.9],"fc":"#343739"},"266":{"p":"AgxA2QAJgeBHhWQAEgBAQACIhHB8QgNgGgQgDg","t":[9.7,12.7],"fc":"#A6C7E4"},"267":{"p":"AAnB7QANgVAKgTIAUgoIAOgrQAHgUADgUQAEgYgEgQQgCgKgEgEQgEgFgHgCQgPgFgWAGQgKACgKAEIglAUIgJAHIgJAIIgfAmQgMARgOAXQgMAVgMAYIghgRQAdg3AZgiIARgWIAdgdIAYgRIANgGIgBAAIAWgKIAXgHQARgDAJAAQAPgBANAFQARAGAJAMQAIAKAEASQAEAUgGAfQgEASgJAZIgSAsIgjBVg","t":[13.8,13.7],"fc":"#343739"},"268":{"p":"Ag6BUQATgfAghAQAhhKANgkQAnADgnChQggAogRAng","t":[20.3,14.7],"fc":"#5A6F7C"},"269":{"p":"AgqBLIgpgIQgcgFgNgIQAkhFAfgpQAlgxAUAGQAxgWAkAJQBJASg8CVQgVASgVArQg2gZgsgQg","t":[13.6,13.5],"fc":"#97B4CE"},"270":{"p":"AghCdQgJgCgFgDIgBgXQAMAMANgFQAHgDAFgMQAFgLACgTIAAgDQAAgPgCgKQgBgHgDgFIgGgJIgDgEIAGgzQAGg1ABAAQADgYARghQAQgbAHgGQADgDAGAQQAFARgDAOQgeA+gIAyQgEAbACAPIAEAKQAFAPAAAVIAAABIgBAEQgCAegNASQgHANgNADIgGABIgIgBg","t":[22.2,21.7],"fc":"#343739"},"271":{"p":"AgBAZQgIgHgDgSIgCgTIgBgGQACgNANAPQALAPAEARQADASgFAEIgEABQgEAAgGgHg","t":[8.3,33.3],"fc":"#A6C7E4"},"272":{"p":"AgtBfQAAg5AdhRQAWg/AUgeIAUAGQgLAehLDtQgFgNAAgdg","t":[8,15.2],"fc":"#A6C7E4"},"273":{"p":"AgIghIATBAIgVADg","t":[6.3,32.9],"fc":"#343739"},"274":{"p":"AgBDEIgBAAIgCAAIgDgBIgHgCQgHgEgEgEIgIgJIgCgEIgRgFIgCgDQgJgJgHgSQgEgIgFgUQgGgVgBgGQgFg0ARhHQAKgqAMgiQAHgUAMgVQALgRAGgDQALgFAFgGQAAABAJgHQAKgEgFAMIgOAbQgJAXgJAWQgHASgMAsQgPA2gDAdIgDAaQgBALABAMIABANQAAAHACAFIAIAZQAEAKAFAHIAVAHIADAFIABADIACADIAEAFIAEADIACABIABAAQAHABAJgBIANgBIA7hMIgCAoQgBAOABAWIgbABIgQAVIgZACIgKABIgJgBg","t":[8.8,19.7],"fc":"#343739"},"275":{"p":"AhBCkIgDgFQAGgtAQhIQAgiRAphBQAtANgEAnIgMAaQgMAbgDAKIABABQACAEAGgBQABAFgBAHQgBAJAAADIAFAZQADASgEADQgJAFAAAHIABAJQgDACABAEQAEAQABAiQgFAYgJAOQgNAWgRgHQgJgGgGgIIgEgHQggAngJAAQgGAAgDgFg","t":[17.9,21],"fc":"#5A6F7C"},"276":{"p":"AhNCGQg3gBAwiSQAHgaAOghQAQgoAMgRQAQgJAcAJQARAEAaALQAaAJAMALQAOAMADAVIgNAnIACAnQgHgFgdA0QgfA0gHgDQgNgDgiAMQglAMgOAAIgBAAg","t":[12,14.3],"fc":"#97B4CE"},"277":{"p":"AgtBEIgagRQgLgGgNgsIgLgoQgEgGACgGQACgHAJgEQBhgbBRAYQAhAYgFApQgDAegQASQgSAJgTgOIgPgQQgmAvgNADIgEAAQgLAAgRgJg","t":[12,30.8],"fc":"#97B4CE"},"278":{"p":"AgDASQgdgIAAgWQAAgKAJABIAVAEQALAAAMAIQAMAJAAAKQAAALgNABIgCAAQgJAAgMgEg","t":[6.3,3.6],"fc":"#343739"},"279":{"p":"AAZAaIABgBIgDgFIgEgFIgHgHIgPgJIgUgLIgkgPIA9AJIAWAJIALAFQAFACAFACIAHAIIAFAJQACAFAAAEIAAABg","t":[6,2.8],"fc":"#343739"},"280":{"p":"AghFTIgVgHQgcgJgqgaIg7gnQgdgXgSgdQgPgZgJggQgKgmgEg6QgBgaAAggIAAgrIACgZQABgUADgQQAHgxATgrQAEgLAJgPIARgaIAKgMIALgNIAUgRIAugaIAagJQAqgLAhgBIAmAAIAoADQA0AKAdAQQAoAWAbAkQAZAgAQAwQAVBCABBtQAAA0gEAmQgGAzgTAnQgTApgpAgQgvAmgVANQgtAdglAHIgLABIgWACgAgRk+QgcAAgqALIgXAIIgWALIgMAJQgsAegXA7QgQAqgFArQgCAMgBAVIAEB7QAEAyALAlQAQA1ArAhIA4AjQAmAXAXAIIAWAGIASABIACAAIAEAAIAJgBIAIgBQAdgEAlgXQAVgNAtgjQAfgYATgiQAQgeAHguQAGgnABgvIAAgpIgBgqQgFg0gJgfQgOgtgUgcQgYgggigTQg2gdhOAAIgNABg","t":[38.8,34.4],"fc":"#343739"},"281":{"p":"Ag/AZIAJgBIAJgBIASgEIAIgDIAIgEIAOgKIANgLIAMgPIAJgQIhmAYIgGgtICPgIIgJAmQgEAKgFALIgMATIgIAJQgEAGgDADIgJAJIgKAIIgJAGIgLAGIgLAFIgLAEIgYAFg","t":[70.3,27.4],"fc":"#343739"},"282":{"p":"Ag2AjIAEgRIBpg/QgLATgRAUQgeAmgaAKQgKAEgFAAQgLAAABgLg","t":[69.4,27.4],"fc":"#5A6F7C"},"283":{"p":"AgvAvIgIg0IgCgVIAkgLQAqgLAlACQAAAdgoAgQgjAggaAAIgEAAg","t":[68.9,27.3],"fc":"#97B4CE"},"284":{"p":"AAvBEIgYgHIgLgFIgLgGIgIgGIgTgRIgPgSQgHgJgFgKQgGgMgCgJIgKgmICPAIIgGAtIhngYIAJAQIANAPIAGAHIAHAEIAFAFIAQAJIAJADIARAEIAJABIAJABIgEAtg","t":[7.3,27.4],"fc":"#343739"},"285":{"p":"AAeAqQgZgKgggmIgcgnIBpA/IAGARQAAALgLAAQgGAAgJgEg","t":[8.1,27.4],"fc":"#5A6F7C"},"286":{"p":"AgRAPQgoggAAgdQAlgCAqALQAWAGAOAFIgDAVIgIA0IgDAAQgaAAgjggg","t":[8.6,27.3],"fc":"#97B4CE"},"287":{"p":"AhuD7QgrgagxgzIgoguQANgQAQgRQAZgZANgFIgDAAQgLgLAJgHQASgPBpABQCygEAqhbQAPgiAFhAQADhLAEgpQAOALAPA2QARA9AFBFQANC8hbBcQhCBDhVAJQgMACgOAAQg2AAgqgagAgyBAIh3ABQglAlAuA1QAoAvAmAGQALACBDAAIBJAAQAcgCAggVQAegTASgaQASgegBgOQgBgQgXgJQgPgGgZADQghADgGAAIgQgJIgVgBIhoABg","t":[39.4,37.5],"fc":"#5A6F7C"},"288":{"p":"Ag6CQQgGgNgCg2QgDgwAAg1QABgqAehJQAPglAOgcIAGAiQADAugDA9QgKByAnA2QAVAbAXAFIgcAGIgeAGIg1A4QgJgqgIgTg","t":[21,29.3],"fc":"#5A6F7C"},"289":{"p":"AizDsQhMhfADicQADiTA8hOQBAhUB9ABQB/ABBBBTQA8BOABCSQABCZhKBgQhIBbhsAAQhsAAhHhZg","t":[38.8,33.7],"fc":"#97B4CE"},"290":{"p":"AAKA6IAZhYIACgPIgFADIgQAMQgNAJgMAPQgHAGgLAKIgEAEIgVgJIAAgBIACgDIACgBIAFgDIAwgpIASgNIAMgFIAEgBIADAAIAEABIABAAIACACIAAAAIADAEIABACIAAABIAAACQABAIgCAQIgVBbg","t":[65.6,6.5],"fc":"#343739"},"291":{"p":"AgGBJIgIgBQgJgBgHgDQgSgHgKgMQgJgLgGgRQgEgPAAgNIgBgHIBjgwIAagJQAGgBAHAAIAFAAQAEABAEADQAGAGAAAKQAAAGgCAHIgGATQgEANgMARIgfArIgLANIgFAHIgHAAIgDAAIgEAAgAA7g4QgGAAgKAEIgQAGIgdAPIg2AdQACAXALAOQAHAJAMAFQALAFANABQAOgYAWgfIAZgtQADgLgEAAIgBAAg","t":[72,21.5],"fc":"#343739"},"292":{"p":"AgGBTQgQgDgNgMQgKgJgIgNIgFgHIA6hjQAEgHAHgIIAGgEIAHgDIADgBIAGAAIABABIABAAIACABIABAAIAEACIADACIADAEIADAEIACAHQADAKABAIQACAPAAARIgBAeIgCAfIgBAGIgDAEIgHAGIgGAFQgHAFgGADQgMAGgMAAIgIgBgAAag6QgHAHgLARIgNAaIgXAuQALASAOAEQAIADALgEQALgEAJgIQABgegBgcIgBgfIgCgOQgBgFgCAAIgBgBIgDAEg","t":[53.6,14.9],"fc":"#343739"},"293":{"p":"AgTA7IAhiBIAGCBQgIAHgJADIgHACQgKAAgFgMg","t":[55.5,15.2],"fc":"#F2EADB"},"294":{"p":"AgvAqIBQhyIAPB8QgLAOgRAFQgHACgHAAQgaAAgbgfg","t":[53.6,14.7],"fc":"#ACA08B"},"295":{"p":"AAtCJIgogJQglgLglgTQgTgKgQgLQgKgHgHgGQgLgKgGgIQgJgMgHgOQgJgRgCgOQgDgSAFgRQAEgRALgPQAIgMAPgMQANgKAOgHQARgJAMgEQAPgGARgBQAdgCAgAKQAbAIAcASQA1AjAbA4IgLAFQgcgxgzgeQgZgPgbgGQgagHgZADQgOACgLAFQgLAFgNAHQgOAIgIAIQgKAIgHAKQgNAVAEAXQACANAFAJQAGANAGAIIACACIAAAAQADAFAHAGIAOAMQAMAJATALQAjATAhAMIAkAJQAWAFAQAAIAlgBIARgEIASgGIAIATIgTAHIgVAFIgVADIgUABQgTgBgWgDg","t":[55.9,18.9],"fc":"#343739"},"296":{"p":"AAyB4IgQgCIgQgDIgIgCIgVgGQgKgCgUgJQgLgEgRgKQgLgFgDgDIgbgTIgMgKIgWgXIgVgWQgLgPgGgOQgGgSACgRIAGgVIACgDIAEgHQAKgOAMgLIAIAJQgKALgHAMIgDAHIgCAGQgCADAAADIgBAHQAAAXAWAZQAGAHAOAMIAWATIAMAJIAmAVIAbALIAbAKIANAFIAqAKIAcACIA6gGIAXgFIACgKIAAgJIgBgZIgFgTIATgFIAGASIAEAVIAAAVIgEAbIgHACQgWAIgJABIgfAHIggACIgHABIgagBg","t":[55.3,25.9],"fc":"#343739"},"297":{"p":"AgVAfIArhOIgWBfg","t":[67.7,6.3],"fc":"#F2EADB"},"298":{"p":"AgnA0QgZgJAGgTIB2hRIhIBzQgOgBgNgFg","t":[73.1,22],"fc":"#F2EADB"},"299":{"p":"AgsAMQBQhIAHAGQAIAHgfBmg","t":[65.7,6.3],"fc":"#ACA08B"},"300":{"p":"AgeA6QglgSgBgzIBCgfQBBgdAGAIQAFAIgiA8IgjA8IgFAAQgOAAgQgHg","t":[72,21.6],"fc":"#ACA08B"},"301":{"p":"AAgA2QgagFgZgVQgcgUgNgVQgNgWAIgMQAJgMAaAGQAZAGAaAUQAbAUANAVQANAXgIALQgGAIgNAAQgHAAgIgCg","t":[61.8,14.2],"fc":"#C9CED0"},"302":{"p":"AAkBlQgNgIgUgYQgRgYgMgIQgUAUgrgRQgsgRAaglQgTgkAOgfQARgoAcAAQBsAAA1BoQATAjAFAkQAEAhgKADQACAYgUAGQgGACgFAAQgUAAgbgVg","t":[61.6,18.9],"fc":"#9EAAAC"},"303":{"p":"AgcBkQgpgRgigXQgfgUABgHQgRgTgCgbQgEg6BJgvQAOgJAoAFQAsAEAoAVQBzA8gUCNQgeAVgrAAQgvAAg6gZg","t":[56.9,18.5],"fc":"#6F7378"},"304":{"p":"AgagTIA9gFIgGAvIg+ADg","t":[65.9,33.9],"fc":"#CB9444"},"305":{"p":"AgcAIIgqgkIAMgRIB5A1IAFAIQAFAMgEASIgBAAQgwAAgwgmg","t":[51,30.3],"fc":"#FFF2DF"},"306":{"p":"AAbBkQiIgUhIh5QABgPADgPQAHgeAMgCQAuBwB6AhQBHATBbgKQAIAFACANQABAPgPAGQghAOgwAAQgcAAgggEg","t":[55.7,26],"fc":"#F8D18A"},"307":{"p":"AiKDiQgXgEgVgIQgYgIgRgJQgZgMgOgJIgXgOIByhBICKhpIAagXIAXgYIAYgZIAug1IBEhhICEBZIg3BTIgaAjIg3BBIg8BAIhiBVIgkAZIgWALIgIACIgBABIgGAAIgKABQgZAAgWgFgABUhYIhKBNIgzAuIgcAXIg5ArIhaA6IgHAEIANAHQASAIAUAHQATAHAVAEQASAEAUAAIALgBIAEAAIACgBIARgJIAigXIAfgaIAggcIAegdIAegfIAOgPIBchyIAog9IhSg3g","t":[31.7,46.7],"fc":"#343739"},"308":{"p":"AidCfQhRgSgGgUQA1glByhDQAcAEA1gVQBtgsCEh/QgHA6ifCTQhPBLhMA/QgogFgpgIg","t":[31.7,50.9],"fc":"#715943"},"309":{"p":"AjMC+IgxghQBVg5BdhKQC6iSAuhZQAiAhA/AgQguBOhBBQQiAClhYAaQgXAFgWAAQgsAAgqgUg","t":[31.8,47.2],"fc":"#A28667"},"310":{"p":"AgXA4IgzgeIgEgbQgDgZAAgLIAAgOICjgEIAABOIgrAhgAg5gcIAEAmIAAACIAlAVIAvAAIAcgWIAAgqg","t":[31.6,72.2],"fc":"#343739"},"311":{"p":"AgTAnIgsgaQgHgbAAgUICNgEIAAAxIglAcg","t":[31.6,71.7],"fc":"#B7BDC0"},"312":{"p":"AieA7QgugOgegUQgWgPgKgLQgDgDgEgOIgEgTQgBgFACgOQACgMADgGIAOAMQgLAbALALQAMAMATAKQAfAQAqALQBNAUBNgDQBNAABNgZQAlgMAjgRIAhgTQADgDgBgKQgBgEgJgQIAOgRQAEAGAGAcQACAHAAANQgBAPgFAHIgkAXQgiAUgoAPQhJAbhYACQhYAAhHgXg","t":[31.2,68.8],"fc":"#343739"},"313":{"p":"AgyA6IgNgCQgsgEgugNIAOADQhEgSg1ggIgFgSQgEgTAGgCQBjBDCZABQB4AABWgjQArgSAYgbIAGArQgWAOglAOQg4AchEAMQgtAIgrAAQgXAAgYgCg","t":[31.2,68.2],"fc":"#876440"},"314":{"p":"AgwAgIgLgDIgGgDIAAAAIgBgBIgEgCIgFgFIgIgJIgdgoIAKAFIAMAGIAfAUQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAIACABIABAAIADAAIABABIABAAIACgBIAWgBIADAAIABAAIAJgBIAoAAIAUABQAMABAFgBQADAAAIgGIAPgLIAVgNIgUAiQgHANgKAGQgLAGgQABIhGABIgTABIgIAAg","t":[31,79.8],"fc":"#343739"},"315":{"p":"AiggYQAxAIBAAAQB/AABRglQhbBbgJAPIiBABg","t":[32.2,76.1],"fc":"#92847B"},"316":{"p":"AgPAqQgngEgSgVIgLgTQgYglBVgCQBSgCAWAbQAUAWgkAVQgdAQgkAAIgQgBg","t":[42.5,44.9],"fc":"#97B4CE"},"317":{"p":"AhAAdQgggbASgXIAYgUQAugNA1AUQA2AUgRARQgWAagoAMQgTAGgOAAQgdAAgWgSg","t":[16.9,45.4],"fc":"#97B4CE"},"318":{"p":"AhWEiQgygFgmgMIgbgLIgDgCIgBAAIgBgBIgBAAIgJgGIgVgPQgKgKgHgIQgbgigKg1QgHgnADgzQADgpAJgsIAJgqIATg+IAdg/IAMgOIANgLQALgIARgKQATgKAKgEIAPgGIAPgEQAUgGAKgCQANgDASgCIAfgDIAdgBIALAAIAEABIAIAAIAIABQAKAAAVAEQAfAHAdAOQAbANAaAVIAGAFIAiArQALANANAYQAIARAJAXQAOAoAHAsQAGAiACAyIAEAqQACAZgBATQgCAbgKAVIgKARIgEAEIgRARQgeAZg0APQggAKg3AGQguAEgnAAIgQABQgkAAgigEgAAHkDIgbACIgcAEIg3AMIgbAKQgNAGgLAHQgNAHgJAIIgOANIgDAEIgPAjIgTA6IgOA8QgHApgCAmQgDAtAGAiQAJAqAUAYQAGAIAGAFIANAKIAJAGIAZAKQAeALAvAFQArAEAnAAQAtABAkgDQArgDAlgKQAsgMAagTIANgMIAGgHIAEgGQAHgPACgTQABgPgBgZIgCgrQgBg8gDgVQgFgsgLglQgHgWgHgQIgEgJIgSgZQgIgKgLgKQgKgKgLgIQgYgTgYgKQgbgMgbgFIgbgDIgWAAg","t":[29.8,41.9],"fc":"#343739"},"319":{"p":"AizAmQgbgJgXgYQgVgUgLgcQARAYAXAQQAXAPAYAFQAZAEAagJIAzgPIAhgLQAZgIANAAQAXAGAsAQQAaAJAXAEIAZABIANAAIAMgBQAQgEAfgPIAygbQgSASgYATQgdAYgTAHIgQAFIgOACQgRACgNgCQgbgBgegLIghgNQgTgIgMgCQgYACgbAOQgfAOgZAFQgNACgNAAQgTAAgSgGg","t":[30.7,49.5],"fc":"#343739"},"320":{"p":"Ai9DoQgKgFgLgIQgRgLgNgNQgMgLgCgGQgEgHgCgOIgFgbQgSg/ANhZIAPhPIACAAQAkh8BZgcQB+gpBjAjQAzATAcAcIAWATIAeAyQAeA+AEA6QASBDgFBBQgEBEgZAfQguA4iYAKIguACQh4AAhHgsgAghB1QiiAhAeAqQAQAVAxAPQA3ALBKgFQA3gEAjgIQAhgIAOgTQAPgTgNgSQgfgpiFAAIglAAg","t":[30.3,42.1],"fc":"#5A6F7C"},"321":{"p":"AjbDaQgjglgLhOQgJg3AFgnQAJhGAQgzIAhhXQCehrCKAtQAvAPAmAeQAcAXAJAQQA3AtAICKQAICKgsBBQhQBCiSABIgCAAQiJAAhYg6g","t":[30,41.5],"fc":"#97B4CE"},"322":{"p":"AhBCaQgQgEgJgIQgMgKgEgPQgCgIAAgOIAAgDQgGgGAAgCIAAgNIACgEQACgDACAAIgCgMQgIABgDgNIgCgXQgCgGAJAAIgFgbQgFgcAAgNIABgGIABgDQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAIAOgFIDchSIADAFQALAZAAAgQAAAbgHAZIgJAbIgIAXIAGAHQAAAAAAABQAAAAAAABQAAAAAAABQAAABAAABQgGAPgGAIQgBACgIACQgIACAAACIgDALIADACQADACAAAEQgEAagUABIgIANQgGAKgFAFQgNAQgSAHQgWAJgaAAQgQAAgKgDgAhTg3IAMBHIAAACIAAAAQADAJACAVIgIAAIgDABQgJABABAKQACAJAJABIAJAAIABAaQgBAGABAFIABABIAAABQACACAGABQAGACAJAAIABAAQAUAAAOgGQAGgDAGgIIAOgUIAEgHIAVgFQAGgBAEgHQADgHgCgEQAAAAAAgBQAAAAgBgBQAAAAgBAAQAAgBgBAAIgGABIgJABIAQghQARgrAGgXQAGgVAAgTIgBgIQhHAnhfAIg","t":[47,79.3],"fc":"#343739"},"323":{"p":"AgeBiQglgBgSgUQgahVAIgWQABgDAIgBIAcgDQBbgLBRgxIgJBDQgPBIggAmQgtASghAAIgCAAg","t":[47.2,76.5],"fc":"#92847B"},"324":{"p":"AgICUQgSgHgNgQQgFgFgFgKIgJgNQgVgBgDgaQAAgEADgCIADgCIgDgLQgBgCgHgCQgJgCgBgCQgEgGgHgRQgBgEABgBIAGgHIgIgXIgJgbQgHgZAAgbQAAgfALgaIADgFIDcBSIAOAFIADADIABADIABAGQAAAIgFAhIgFAbQAIAAgBAGIgCAXQgDANgIgBIgCAMQAFABABAGIAAANQAAACgGAGIAAADIgDAWQgDAPgMAKQgJAIgPAEQgLADgPAAQgcAAgVgJgAg4AuQgCAEADAHQAFAHAFABQAOAEAHABIAEAHQAJAPAFAFQAGAHAGAEQAOAGAUAAIABAAQAJAAAGgCQAGgBABgCIABgBIAAgBIACgLIAAgaIAKAAQAIgBACgJQABgKgJgBIgCgBIgBAAIgIAAQABgQADgOIAAAAIABgCIANhHQhggIhHgnIAAAIQAAATAFAVQAHAbAPAnQAFALANAWIgKgBIgHgBQAAAAAAABQgBAAAAAAQAAABgBAAQAAABAAAAg","t":[15.5,79.3],"fc":"#343739"},"325":{"p":"AgxBQQgggmgPhIIgJhDQBSAxBaALIAcADQAJABABADQAEAPgKAtQgJAsgEADQgSAUgkABIgCAAQgiAAgtgSg","t":[15.2,76.5],"fc":"#92847B"},"326":{"t":[16.3,2.8,1.04,1],"p":"AgUANQgMgBgFgGIgGgIQgCgDAqgFIAogEQAPgBgPAUQgHAKgcAAIgWgCg","fc":"#A1C7E2"},"327":{"t":[13,5.2,1.04,1],"p":"AgjAwQgXgBgUgGQgKgDgKgHQgKgHgGgKQgKgQADgYQAHAZAKAJQAKAMAVAEQAXADA1gEQA1gFAYgJQAUgIAJgLQAJgMgBgZQAKAWgIAUQgIASgXANQgdAPg2AGIghABIgHAAg","fc":"#1D2226"},"328":{"t":[12.8,4.2,1.04,1],"p":"AgiAoQglgDgGgCQgMgDgOgOQgNgNgEgOQgCgIABgGIANAAIASAUQAXARAZABQA2ABAfgHQA8gKgFgoIAYAWQAAAEgEAIQgHANgWAPQgXAQgkAEQgMABgPAAQgPAAgWgCg","fc":"#4F6877"},"329":{"t":[22.3,54.2,1.04,1],"p":"AgRByIgIgvQgIgsACgEIABg2QABg7gBgPQgBgSAPAcQAPAdAEAcIALAvQAGAXAHANQAKASgHAJQgNALgHAKQgMATgIAHIgFACQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAgBg","fc":"#384C56"},"330":{"t":[43.5,37.9,1.04,1],"p":"ABJDTQgbgDgjgJIgggKQgFgBgciRQgdiPgGgGQgQgNgZgvQgcg0AbAJICACTQCCCdAQA9QAPA3hFAAIgQAAg","fc":"#A1C7E2"},"331":{"t":[60.1,25,1.04,1],"p":"ABdC3QgFgJgvhwQgphmgVgaQgSgYglgjQgggfgFgKQgHgOAZgIQAYgIATAGQAaAJAaAOQAtAaAVAfQAWAhANBCQAHAmAGBIQAEA1gGAbQgDAPgFAAQgFAAgGgLg","fc":"#A1C7E2"},"332":{"t":[59.8,81.4,1.04,1],"p":"Ag5AYQgQgDAOgQQAKgKANgIQAOgIAWgDQASgDATADQAKACADACQAFADAKARQAKARg8AGQgbADgTAAQgRAAgJgCg","fc":"#A1C7E2"},"333":{"t":[34,71.4,1.04,1],"p":"AgfAVQgOgMgJgNIgGgLQgFgNAYgBQAWAAAKAGIAbAIQAYAHAPAKQASAQgtAJQgSADgMAAQgVAAgKgJg","fc":"#A1C7E2"},"334":{"t":[19.5,38.6,1.04,1],"p":"AA8DDQgkgHgRgUQgSgYgdhdQgdhWgEgqQgDgZgOhUQACgsBICRQAkBKAOAcQAfBGADAjQAEAiAJAYIAKARIgHAAQgLAAgNgCg","fc":"#4F6877"},"335":{"t":[46.6,76.9,1.04,1],"p":"AgSALIAcg1QACACASAFQAPAEgFAAQgJAChHBIg","fc":"#384C56"},"336":{"t":[70.2,75.5,1.04,1],"p":"AgBgDIghgkIAGgEQAIgGAHgIQABAFAVAWIAYAWQAFARgKAyQACgXgfgng","fc":"#4F6877"},"337":{"t":[42.2,79,1.04,1],"p":"AgbBBIhLg+IAiAJQAmAEAZgaQAZgdAIgMQAJgKADgJIACgDIA9AVQgmAKgiBHQgEAKADATIAFAQg","fc":"#4F6877"},"338":{"t":[41.7,49.9,1.04,1],"p":"ABAHpQhOgQhdghQgzgTgggPQg0gZgdgWQgngegagmQgbglgOgwQgUhDgChxQgBhuAJhDQAPhmAlhHQAYgsAegfQAhgiApgVQBKgnBmgEQBkgFBMAYQAuAOAmAYQAnAZAfAjQA4BAAZBiQAVBOABBkIAAABIACCuQAAA2gGAlQgHAugWAsQgTAkgfApIgbAlQgRAVgSANQgVARgYAJQgYAIgbABIgGAAQghAAg2gKgAginXQhhAGhCAkQhKAogoBPQghBDgMBhQgIBDAEBoQAEBtAUA7QAYBNBGA1QAYASAwAWQAlARArAPQBVAfBPAPQA1AJAdgBQARAAASgGQAPgGARgMQAVgQAhgsQAegnARgfQATgjAIgqQAGgeACg2IABiuQAChfgShLQgWhcgxg8Qg3hBhUgaQg+gThJAAIghABg","fc":"#1D2226"},"339":{"t":[34.3,74,1.04,1],"p":"ABxDUQiIgShig1Qh+hCgehQQgNgngKhCQgLhEACgqQAvALAcAZQAOAMAFAKQgCAVACAeQAEA6ATAoQAMAUAoAkQAyArA9AiQCpBdCqgfIgsAeQgIAFgLACQgLACgTAAQglAAhDgJg","fc":"#384C56"},"340":{"t":[40.6,55.6,1.04,1],"p":"AACGRQiigihWhOQiOh/AXkcQAIhmAbhcQAYhTAUgQQARCbAEAZQAQBjAgA8QBVCaD3gPIArgCQAUAAAOgDQAPgCARgYQAQgWAGAAQAzAEgCAhQgCAhgrAGQhkAOh1ACQhgACghADQg6AGgDASQgHAkA6A1QA3AzA3AQQAJADA8AZQBFAVBEgOQBagTAMhDQAEgWgFgdIgGglQATgCAYAaQANANAIAOQgIAhgWAoQgrBShBAnQgmAXhCAAQg1AAhIgPg","fc":"#4F6877"},"341":{"t":[73.9,44.5,1.04,1],"p":"AgKEHQg1g5gDgBQgDgCAlgyIAkgxIADgzQAChAgFhZQgEhagQhJQgJglgHgSQAXAgAUAtQAuBZABA+IAFCyIAECAQABAVgOArIgNAnIgzg4g","fc":"#4F6877"},"342":{"t":[41,49.7,1.04,1],"p":"AgmHAQhaglhJhBQiviaACjaQABjZBahzQBfh6C8gCQC6gCBfB8QBZB0AEDaQAGEDgxB1Qg5CGiUAAQhPAAhVgkg","fc":"#91B1CE"},"343":{"t":[51,52.2,1.04,1],"p":"AgmAtQgPgjAdguQAIgOAQgFQAIgCAHAAQAQAHAMAjQAEAMgIALIgTAWQgOARgPAHQgHAEgGAAQgLAAgFgNg","fc":"#30383D"},"344":{"t":[28.7,27.8,1.04,1],"p":"ACVDGQgMgRgRghQgvhoh1iEIhthxQgKgEAUgCQARgCASASQBaBCBVB7QAsA8AhA7QAKAPADBMIgIgKg","fc":"#30383D"},"345":{"t":[31.6,35,1.04,1],"p":"ADZEaQgNAMgQAAQgYAAgSgcQgRgbAAgoQAAgQADgOQhIi3iYinQiFiPhCgOIAegKQBQAWB9CBQCQCWBECpQAIgLAGgEQAGgDAMAAQAZAAARAcQASAcAAAnQAAAbgJAVIA1A9IgSApg","fc":"#1D2226"},"346":{"t":[23.6,29.9,1.04,1],"p":"AC7EQQgMgaAHgWQhAiCgzhKQh6iziqh5IAegLIAuAeQA5AnA3AzQCtCmBYDhQAEApgFASIgFAKIgSADg","fc":"#4F6877"},"347":{"t":[8.7,4.2,1.04,1],"p":"AA1AlIAAgDIgDgHQgEgGgKgJQgQgMgUgIQgggSgygPQAxAGAnAMQAcALAQAIQALAGAJAJQAGAGACAGIAEAHIABAFIAAAGg","fc":"#1D2226"},"348":{"t":[9.4,5.4,1.04,1],"p":"AgHAgQgTgEgMgMQgMgMAAgQQAAgQAQgEQAKgDAXAEQASADAQANQASAOAAAPQAAARgTADIgMAAQgLAAgQgCg","fc":"#FFFFFF"},"349":{"t":[9.7,5.7,1.04,1],"p":"AALAvQgqgHgTgQQgWgRgCgdQAAgPADgMQAfAAAoASQAoATAXAXIAJAUQAGANgFACQgLAEgRAAQgPAAgTgDg","fc":"#384C56"},"350":{"t":[8.9,10.9,1.04,1],"p":"AgqAOIBXgyQgEAPgNAQQgZAfgtALQgEgXAEAAg","fc":"#384C56"},"351":{"t":[10.7,9.9,1.04,1],"p":"AhZAwQAbgBAcgJQAZgJAVgTQAVgPAQgbQALgQAHgRIiiAhIgHgxIDNgQIgEARQgGAggPAgQgRAegXAYQgZAagfAOQggAQgjAEg","fc":"#1D2226"},"352":{"t":[9.7,10,1.04,1],"p":"AhSA0QABgLAHgOICdhdQgFAYgSAcQglA3hDAWQgNAEgJAAQgQAAAAgPg","fc":"#4F6877"},"353":{"t":[9.8,9.8,1.04,1],"p":"AhNBGQACg7gBg3IAtgOQA2gNA3ADQAAAqg7AxQg0AvgmAAIgGAAg","fc":"#91B1CE"},"354":{"t":[11.2,9.3,1.04,1],"p":"AAYBNQgggOgZgXQgagWgRgdQgSgfgIghIgEgQIDVAEIgEAxIirgXQAHAQAMAQQARAYAXAQQAWARAaAHQAZAIAegBIgBAyQgkgCghgNg","fc":"#1D2226"},"355":{"t":[13.8,10.4,1.04,1],"p":"AAyApQgZgDgZgPQgbgQgYgYIgTgYQAhAjBpASQAFAAgEAdIgIABIgLgBg","fc":"#384C56"},"356":{"t":[12.5,9.8,1.04,1],"p":"Ag9gPQgOgSgHgSIgEgPIA6AkQBCAhAxgBQABAOgCANIgHAmQhfgcgtg2g","fc":"#4F6877"},"357":{"t":[12.8,9.1,1.04,1],"p":"AgUAZQg/gugCgqQA2gGA/AMQAhAHAWAHQgCAsgHBAIgKABQglAAgzgpg","fc":"#91B1CE"},"358":{"t":[14.2,49.9,1.04,1],"p":"AgYBAQgJgDAAgDQAAgEAUgEQADAAAKg2QANg4AOgEIAHBYQABAigIABQgfAGgNAAIgHgBg","fc":"#A1C5E5"},"359":{"t":[30.2,33.3,1.04,1],"p":"AgbAQQgLgFABgDQAAgDAIgJQAIgPAjADQATAAAEAKQAEAHgLADIgcAKQgKADgIAAQgGAAgFgBg","fc":"#A09E85"},"360":{"t":[30.8,34.5,1.04,1],"p":"AANAjQgVgDgHgEIgagOQgVgMAAgFQgBgKApgTQANgFAPACQARABAPAIQAVALAEAPQAEARgVAQQgFAEgLAAIgRgCg","fc":"#87866C"},"361":{"t":[9.9,35.4,1.04,1],"p":"AhGATIAwgTQAzgTAVAAIAVABIgxAQIg1APQgYAHgKAAIgFgBg","fc":"#E8D19E"},"362":{"t":[10.8,22.4,1.04,1],"p":"AgHAJQgRgEgTgKQgYgPgDgQIAVAPQAXAQARAFQBCAVAOAQQgmgRgogLg","fc":"#E8D19E"},"363":{"t":[21.7,23,1.04,1],"p":"AgMAVQgUhBABgkQAOA5AZA1IAYAsIgaAHg","fc":"#CCB681"},"364":{"t":[9.4,37.5,1.04,1],"p":"AhTASQAYADAggKIA3gUQAdgOAbAIQgiAOgUADQgfAKgQADQgYAEgUAAQgMAAgKgBg","fc":"#E8D19E"},"365":{"t":[10.8,38.1,1.04,1],"p":"AhlAaIABgOQAzACA/gdQAkgSAcAMQAOAGAHAKQAJAEgTACQgRADgVAAQgOAAgfAHQglAKgVADQgUADgPAAIgOgBg","fc":"#CCB681"},"366":{"t":[25.3,39.1,1.04,1],"p":"AA6AtQgQgPgXgPQgTgOgWgJQgagOgSgIIgXgKIAUgPIAtgTQAbgJASAAQgQAFgWARIgSAPIAaAQQAVARARAOQAuArAPAoQgLgSgVgVg","fc":"#3D3428"},"367":{"t":[29.5,43.2,1.04,1],"p":"AgPgeQgZgSgkgUQgZgNACgCQA3gtA+ACQAfABAVAKQAMAVAJAoQASBQgSBlQgPhchbhBg","fc":"#5E5E4C"},"368":{"t":[8.6,25.5,1.04,1],"p":"AhGAAIASgEQA8gUA/AYQgmgKhnAYg","fc":"#E8D19E"},"369":{"t":[9.5,33.7,1.04,1],"p":"AhTADQAngPAXgIQAjgMAbAEQAZAEATATQgWgNg1AQIhYAeIgGACg","fc":"#E8D19E"},"370":{"t":[12.3,32.1,1.04,1],"p":"AA6gCQgcgOgeAAQgOAAgTAGIgfAKIgtAQIACgkQBAgTAqAFQAiAEAeATQAbARAUAeIgBABQgYgcgbgLg","fc":"#3D3428"},"371":{"t":[19.1,31.5,1.04,1],"p":"ACmDUQgOgegYgaQgagZgegMQgdgMgkABQgdAAgjAMIAAgBQglAMglACQgaABgagDIABgWQAWAEAcgCQAdgBAagHIANgDQAlgNAiAAQAmgBAjAOQAjAPAbAcQANAOAJANQgFgngRglQgNgYgVgYQgWgcgPgTQgggygXg8QgNgmgCgXQgBgVABgTQgPAOgLAUQgGAPgDARIgBAQIAAAPIAAACQABAJgEAIQgDAFgFADIgFACIgGABQgJAAgNgDQgRgGgRgKQgQgKgPgLIgOgLQgBAGACAHQAEAOARANIASANIgTANQgQAKgSABQABg2gHgyIARgSIALAKQAaAaAZAPQAPAKAMADIAIACIAAgQIACgUQAEgVALgRQAKgTAPgMQAPgNARgIIAVgKIgIAWQgJAXACAhQAEAgAJAZQAPAqAqA+QARAYASAXQAXAeALAXQAPAdAGAdQAHAdAAAhIAAAsg","fc":"#3D3428"},"372":{"t":[4.9,28.2,1.04,1],"p":"AgjgDQA2gLARABQgsAQgbALg","fc":"#9B8C5F"},"373":{"t":[10.9,29,1.04,1],"p":"ABHASQghgUiDATIAAgRQA0gUApgFQA6gIAiAYQgCAGAEAbQAAABAAABQAAABAAAAQgBABAAAAQgBAAgBAAQgFAAgPgKg","fc":"#9B8C5F"},"374":{"t":[22.2,20.2,1.04,1],"p":"AAdBvIg4gpIgNhNQgHhSAdgZQgFAcAOA5QAMA5AYAsQAVAmgIAFg","fc":"#9B8C5F"},"375":{"t":[18.5,36.4,1.04,1],"p":"AChBsQgZgWgWgLQhagvh6AqQgqAIglgEIAEgxQAlABAigTQAZgMAhgFQArgFAeAPQABgwgygFQAZgaAPgkQBLBAAwBOQAnBCgEAWQAAAAAAABQgBAAAAAAQAAAAAAAAQgBAAAAAAQgEAAgLgIg","fc":"#9B8C5F"},"376":{"t":[18.5,29.9,1.04,1],"p":"AAEBiQgiAEgnAQIgfAQQgjAAgpgHIAIhfQAEg1AAgnQAWAAAAgOQgOgKgKgMIgFgrQAGgGAIgFQARAdAuAYQAxAZABghIABgjQAMgoAvgfQABAAACAnQACA1ANAqQAHAgAGARQAKAeAaARIATAMIArA3QAoBDgKA7Qg2h9h1ALg","fc":"#CCB681"},"377":{"t":[24.9,49.9,1.04,1],"p":"AgGBIIgRgBIAah8QAFgUAFABQAEACAHAJIgFBAQgFBCgDACQgCACgJAAIgGgBg","fc":"#61889B"},"378":{"t":[12.8,45.2,1.04,1],"p":"AgOgLIAUhXQAFgFAXgFIgXDUQgTAAgZAFQgDgeAWhag","fc":"#A1C5E5"},"379":{"t":[21.6,42.4,1.04,1],"p":"AB5CPQALgtgBgoQgBgugPggQgRgkghgTQgPgJgVgGQgbgHgLgCQgtgHgVASQgGAFgFAHIgFAJIAAAAIgBACIgCAFQgHAQgHAXQgKAkgGAvIgJBYIgggBQABg8ACgfQADgzAJgnQAFgXAJgXIACgFIAJgTQAIgMALgKQAVgTAfgFQAYgEAcAEQAYAEAWAHQAYAHAWAPQArAdATAzQAQApgDA1QgBApgNAzg","fc":"#1D2226"},"380":{"t":[31.8,45,1.04,1],"p":"AgRCCIglgKQASidgGhaQA1gSAsCWQgSBAgEA9g","fc":"#4F6877"},"381":{"t":[20.7,44,1.04,1],"p":"AiWCMQAGhwARhFQAVhUAhgGIAfgGQAlgFAfAIQBpAXAUCDQgTAmgCBFQhcgBhCAHQgKABgZAGg","fc":"#91B1CE"},"382":{"t":[58.9,35,1.04,1],"p":"AmpDkQADhhAUhKQALgtARgkQAHgSAMgXIARgdIAXgdIAQgRQAQgQAUgQQAmgdArgUQBUgoBiAEQBmAEBQAZQAuAPAnAXQAVANASAPQAKAHAIAJIAIAJIAJAMIABABIAAABQAWAsAOApQAOApAKAtQAKAmAGA0QAGApADAxIABASItWAMgAgojJQgVACgTAEQgqAJgjARQgnASgeAZQgUAQgLAMIgUAWIgFAHIgBABIgFAHIgPAZQgIAPgIAUQgPAigKAnQgQBAgFBAIL+AMQgGglgGghQgJgwgLglQgNgugPgkQgSgrgTgjIABACIgMgNIgPgNQgNgKgWgMQgjgUgpgLQhJgVhegBg","fc":"#1D2226"},"383":{"t":[90.2,55.5,1.04,1],"p":"AgHAYQgUgEgNgHQgOgIAAgHIArgBQAsgFATgPQAEAMgCAMQgCARgOAGg","fc":"#999B87"},"384":{"t":[56.6,55,1.04,1],"p":"AhZAeQgRgKgNgMIgJgIQgLgPAcgJQAbgJAYAKQAOAFBOALQBOAIAWAKQgIAKgRAJg","fc":"#999B87"},"385":{"t":[37.8,55.3,1.04,1],"p":"AANAbQgrgkgNgRIAdAUQAdASAdAPg","fc":"#35352B"},"386":{"t":[99.6,54.3,1.04,1],"p":"AgSAlQAXgcAOgtQgGAngNAig","fc":"#35352B"},"387":{"t":[74.8,49.5,1.04,1],"p":"AgMBVIAOgQIgUgUQgbgbgTgWQgdgkgLgbQAMAXAfAeQAUARAdAVIAfAWIAUgYQAPgUAUgeQASgcAOggQgEAfgQAtQgMAegTAgIgHAOIAiARg","fc":"#35352B"},"388":{"t":[57,35.5,1.04,1],"p":"Al0DhQAAgmAGg8QAJhaARglQAXg0A4g+QA/hGA2gSIAAAHIA7gOQBIgOBBAAQDVgCBOCHQAEAIAQATQANARgFALQgHAQiNARQi2AUj6gIQgZgCgQAdQgQAbACAfQAHBhAEAhg","fc":"#4C4C3F"},"389":{"t":[73,57.1,1.04,1],"p":"AgPAJIAXgRQAEAKAFAHg","fc":"#5E5E4C"},"390":{"t":[59.9,35.3,1.04,1],"p":"AFdDjQASgVACgrQABg/iAgHQiOAUhAACQhTAEhvgOQgjAQAFAmQAEAkAlAgIkCAAQAFgqAKgoQAGhWAthaQAWguAVgcIAhgcIAggZQAmgbAvgQQCTg1C8A8QCDAqA1C1IAEACQAGAWAHAkQAOBIACBCg","fc":"#5E5E4C"},"391":{"t":[82.2,56.9,1.04,1],"p":"AgYALQAGgLAFgKIALAHIAbAOg","fc":"#5E5E4C"},"392":{"t":[73.6,47.2,1.04,1],"p":"AgGA4Qg7gvg6hTQB+AvB5g5QgGArgoBCIgmA8QgSgGgcgXg","fc":"#4F6877"},"393":{"t":[59.8,34.8,1.04,1],"p":"AmQDoQAAhpAYhWQAZhbAtglQANgYAqghQA4gtBGgXQDNhCDqCfQAiBUAOArQAYBLANBrQACASAAAYg","fc":"#7E816F"},"394":{"t":[108.2,45.3,1.04,1],"p":"AgcAcQgMg6gIhCQAPABAYA1IAWAyQAVgBAKApQAJAngIAFQgFADgUABIgaABIgBAAQgIAAgNhFg","fc":"#A1C5E5"},"395":{"t":[88.3,27.8,1.04,1],"p":"AAAAQIgcgEQgMgBADgKQACgIATgEQAhgKAKANQAGAHAGADQABADgKAHQgIAEgNAAIgJAAg","fc":"#A09E85"},"396":{"t":[87.8,29.6,1.04,1],"p":"AglAnQgZgMABgTQABgOATgPQANgKAQgFQAOgFAOADQAUAFAIADQAQAGACAHQABAHgTAOIgXATQgFAFgVAHQgQAFgJAAIgHgBg","fc":"#87866C"},"397":{"t":[108.5,26.2,1.04,1],"p":"AAiAJIg3gHIgzgEIAUgFQAVgEA1AJIAzAJQgFADgOAAIgUgBg","fc":"#E8D19E"},"398":{"t":[105.1,13.8,1.04,1],"p":"AAKgCQAYgNAcgiQAAAQgUATQgQAOgQAHQgmASghAZQAKgSA9gig","fc":"#E8D19E"},"399":{"t":[94.6,16.1,1.04,1],"p":"AgSBRIAPgvQAOg6AEg6QAHAjgGBDIgJA/g","fc":"#CCB681"},"400":{"t":[109.4,28.5,1.04,1],"p":"AgcAGQgNgBgXgEIgVgCIARgFQAUgFAUAFIA8AJQAfAEAXgHQgbAJglAAIgygDg","fc":"#E8D19E"},"401":{"t":[110.3,29,1.04,1],"p":"AhrATQgTAAAIgFIASgSQAZgRAmAKQAuALAjAAQAnAAAmgSIAAADQgSAPgRAHQgRAGghABQgVABgngBQgfgBgOADQgSADgQAAIgEAAg","fc":"#CCB681"},"402":{"t":[94.5,33.8,1.04,1],"p":"AgfgBQANgTASgVIAVgVIgTgLQgYgMgRgCQAPgDAeADIAvAKIAYALIgVAPQgUANgTAQQgRAOgTAQQgVAWgLAQQgRAYgIAUQAJgrAkgwg","fc":"#3D3428"},"403":{"t":[89.9,38.5,1.04,1],"p":"AhagrQABgqAIgXIANgIQARgIAUgFQA7gOA/AiQACACgWARQgfAbgVAVQhNBSADBeQglhgAChRg","fc":"#5E5E4C"},"404":{"t":[111.6,15.7,1.04,1],"p":"AAPgGQArAFAvgSIAAALQggASgggCQhvgGgjASQA5gjA/AJg","fc":"#E8D19E"},"405":{"t":[111.3,24,1.04,1],"p":"AA5ASQg8gLgggDQg4gEgTAQQAQgVAYgIQAZgKAmAFQAVADApAKIA3ALIABALQgNADgQAAQgMAAgNgCg","fc":"#E8D19E"},"406":{"t":[108.1,24.3,1.04,1],"p":"Ah8AyQAOgiAXgVQAagZAigLQA1gSBjATIgIAjQg4gLgVgCIghgFQgSgDgNADQgfAGgaARQgZATgRAfg","fc":"#3D3428"},"407":{"t":[103.5,26.2,1.04,1],"p":"Ai5DbQgGgfABgfQAAgfAKgfQAGgYARghQAJgTAQgiQAdhHAHgqQAFgdgDgeQgEghgNgVIgNgTIAYAFQATAFARAJQASAKANAQQANAPAIAUQAEAIADALQACAIABAIQACgBACgDQALgGAOgLQAWgUAVgeIAJgNIAMAJQAOAJAGAMQAHAOgBARQgCAOgGANQAXgBAXgMQASgIAMgJIgBAmIgQAHQgWALgVADQgaAFgWgIIgWgJIAQgQQAOgPACgQQAAgHgDgHIgLAOQgQASgKAJQgQAPgPAHQgJAFgJACIgEAAIgDAAIgFgBQgFgCgEgEQgGgHgBgJIAAgCIgCgPQgCgIgDgIQgFgPgKgNQgMgSgVgKQAGATABATQACAagGAlQgKBBgXA1QgKAYgRAdQgPAdgIAaQgLAoADAnQAIgRAJgPQAVggAfgVQAfgUAngHQAigHAmAFIAAAAQAhAEAkgFQAlgGAegNIAPgIIADAZIgJAEQghAOgoAFQgmAGglgFIAAAAQgjgEgfAFQgjAHgaARQgcASgUAdQgTAegIAfIgJArg","fc":"#3D3428"},"408":{"t":[118.5,20.9,1.04,1],"p":"AACAYIgqgKIAogPIATgKIAVgQQAAAbABAcQgWAAgRgEg","fc":"#3D3428"},"409":{"t":[115.3,18.5,1.04,1],"p":"AA3AQIgvgKIhNgNQASgFAzABQAxABAIgCQAHgBAGgCIAAAYQgLAHgDAAIgBAAg","fc":"#9B8C5F"},"410":{"t":[109.3,21.2,1.04,1],"p":"Ah0AgQgCgegCgDQAqgsBnAOQA0AGAsAQQgtgBgyAEQhhAGgXAWQgOAOgFAAQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBAAgBg","fc":"#9B8C5F"},"411":{"t":[94.4,13.9,1.04,1],"p":"AgaB2QgJgDANgpQAPgwADg6QADg7gKgaQAfASAJBTIACBNIgvA0QgFAFgEAAIgBAAg","fc":"#9B8C5F"},"412":{"t":[103.7,30.8,1.04,1],"p":"Ai5CAQgIgVAahIQAfhXA+hMQAVAgAfAVQgxAPAKAwQAcgWApgDQAhgCAcAJQA4ASA7gdQABARADAdQgsAZhDAAQh/gRhQA/QgTAQgVAZQgKAMgDAAIgCgBg","fc":"#9B8C5F"},"413":{"t":[103.8,24.4,1.04,1],"p":"AiqBeQANglASgZIAQgQQAXgUAEghQACgSAAghQAGgrgIg0QgGgoABABQA2AUATAmQAJATgBAPQAHAgApgiQApggALggQAgALgHAbQgFASgUAWQADAQAhgKQAbgJAmgXIAABfQgTAPgOAFQAQAOASAAIAEBJQgfAPgpAMIgjAJQg1gVg4AGQh1AMgeCEQgUg3AbhKg","fc":"#CCB681"},"414":{"t":[96.8,43.5,1.04,1],"p":"AABBGQgBgBgRhAIgSg+IADgFQADgGADgBQACgCAFAIQAEAGACAFIAxB0IgQAEQgMADgFAAIgCgBg","fc":"#61889B"},"415":{"t":[109,40.8,1.04,1],"p":"AhCiOIAMACQAOABADACQAaA6AYA/QAzB9ADAeQgPgBgRACIgOADg","fc":"#A1C5E5"},"416":{"t":[101.6,38.5,1.04,1],"p":"ACCBYQgSg2gSgoQgag8gSggQgRgagKgJIgFgEIAAAAIgBAAIABAAIgBAAIgWADQg1AIgkAVQgpAZgOArQgMAlAMA3QAMAuAYAwIgcAOQgdg5gLgrQgSg/AMgwQAHgdARgaQASgYAagRQArgeBAgKIAagCIAGAAIAHABQAHABAFADQAIAEAIAIQAQAPATAhQAYArAUA4QAlBiAWBoIggAHQgQg5gPgqgAASiJg","fc":"#1D2226"},"417":{"t":[90.1,40.4,1.04,1],"p":"Ag+AJQgIgNAUhCQAWhKAjAFQAMBgAvCQIhQAnQgPg/ghhEg","fc":"#4F6877"},"418":{"t":[102.4,39.1,1.04,1],"p":"ABpCnQg4gDgKABQgaADg5gYQg5gXgcAGQgQhFgZggQgFiEBigrQAxgWAxAFQAiAAAwBzQAnBdAdB5QgPAFgdAAIgWgBg","fc":"#91B1CE"},"419":{"t":[41.3,51.6],"p":"AgZAIQgQgBgHgCQAVgIAbgDQAdgDAUAGQgUAHgdADIgOABIgLAAg","fc":"#384C56"},"420":{"t":[41.3,51.6],"p":"AgaAIQgOgBgJgCIgBAAQALgFAOgBQAMgDANgCIAAAAIAYAAQAOAAANADIgCABQgPADgUADIgOACIgVACIgFAAg","fc":"#384C56"},"421":{"t":[41.4,51.6],"p":"Ag0AFQALgFAPgBQAMgDAOgCIAZAAQAPAAANADQgRADgXADIgkAEIgIAAQgKAAgLgCg","fc":"#384C56"},"422":{"t":[41.3,51.6],"p":"Ag0AGQAPgGAIAAQAPgEAOgBQAigCAKACIAFABQABAAABABQAAAAABAAQAAAAAAABQABAAgBAAIgtAFIgfAEIgOAAQgIAAgGgBg","fc":"#384C56"},"423":{"t":[41.3,51.6],"p":"Ag0AHIAUgHQAQgEAQgBQAhgDAUAGQgLACgQABIgYABIgdAEIgTABIgGAAg","fc":"#384C56"},"424":{"t":[41.2,51.6],"p":"AgzAGIAUgGQAPgEAQgBIAAAAQAfgDAVAFIgCABIgXADIgYACIgDABIgZACIgEABIgMAAIgKgBg","fc":"#384C56"},"425":{"t":[41.2,51.6],"p":"AgxAGIATgGQAPgEAPgBIAAAAQAegDAUAFIAAABIgWAEIgYACIgEABIgXACIgEAAIgHAAQgLAAgEgBg","fc":"#384C56"},"426":{"t":[41.3,51.6],"p":"AgwAGIATgGQAOgEAPgBIAAAAQAdgDATAFIABABIgVAEIgXADIgFABIgWABIgEABQgQgBgGgBg","fc":"#384C56"},"427":{"t":[41.2,51.6],"p":"AgsAFIASgFQANgEANgBQAYgCAUAFQAAABgNABQgLACgKAAIgcAEIgOABQgIAAgEgCg","fc":"#384C56"},"428":{"t":[41,51.7],"p":"AgiADIAPgEIASgEIARAAQAKAAAKAEQgGACgLABIgcAEIgMAAQgJAAgEgDg","fc":"#384C56"},"429":{"t":[41.1,51.7],"p":"AgmAEIARgFIAUgEIABAAIASgBQALABAKADQgHADgMABIgUADIgKABIgJABIgBAAQgMAAgGgDg","fc":"#384C56"},"430":{"t":[41.2,51.7],"p":"AgpAEQAHgEAKgBQALgDALgBIACgBIAUAAQAMAAAKAEQgIADgMACIgWADIgLABIgKAAQgOAAgGgDg","fc":"#384C56"},"431":{"t":[41.2,51.6],"p":"AgsAFQAIgEAKgBQALgEAMgBIADgBQAMgBAJABQAOAAAKAEQgJADgMACIgYAEIgLAAIgMABQgPgBgGgCg","fc":"#384C56"},"432":{"t":[41.1,51.5],"p":"AgoAFIgBAAQARgHAXgCIABAAQAYgDARAGIABABQgOAEgcABIAAAAIgVABIgTgBg","fc":"#384C56"},"433":{"t":[41,51.5],"p":"AgiAFQAOgHATgCQAUgCARAGQgFACgfAAQgWADgJAAIgDAAg","fc":"#384C56"},"434":{"t":[41,51.5],"p":"AglAFQAQgHAUgCIABAAQAVgCARAGIgBAAQgKADgbAAIAAAAIgTACIgLAAIgHAAg","fc":"#384C56"},"435":{"t":[41.1,51.5],"p":"AgnAFQAQgHAWgCIABAAQAXgCARAFIgBABQgLADgcABIAAAAIgUACIgHAAIgMgBg","fc":"#384C56"},"436":{"t":[41.1,51.5],"p":"AgpAFQARgHAXgCIABAAQAYgDARAGIABABQgOAEgcABIAAAAIgVABIgUgBg","fc":"#384C56"},"437":{"t":[41.2,51.6],"p":"AgWAHQgPgBgGgBQARgHAZgDIABAAQAZgDASAGIABABQgQAFgbACIgBAAIgTABIgDAAg","fc":"#384C56"},"438":{"t":[41.3,51.6],"p":"AgXAHQgQAAgGgCQASgIAZgCIACAAQAagDATAFIABABQgRAGgcACIgBAAIgQABIgHAAg","fc":"#384C56"},"439":{"t":[41.8,53.7],"p":"AgXAAIAXgBQAMAAAMgDQgJAIgPABIgCAAQgLAAgKgFg","fc":"#384C56"},"440":{"t":[41.7,55.4],"p":"AgUAAIAUgBQALAAALgDQgIAIgOABIgCAAQgKAAgIgFg","fc":"#384C56"},"441":{"t":[41.7,57.2],"p":"AgSAAIATgBQAJAAAJgDQgHAIgMABIgCAAQgJAAgHgFg","fc":"#384C56"},"442":{"t":[41.7,56.6],"p":"AgTAAIAUAAQAKgBAJgCQgGAGgNABIgCAAQgKAAgIgEg","fc":"#384C56"},"443":{"t":[41.7,56.1],"p":"AgUAAIAVAAQAKgBAKgCQgGAGgOAAIgCABQgKAAgJgEg","fc":"#384C56"},"444":{"t":[41.7,55.5],"p":"AgVAAIAWAAQAKgBALgCQgHAGgOABIgCAAQgLAAgJgEg","fc":"#384C56"},"445":{"t":[41.7,54.9],"p":"AgVAAIAVAAQAMgBAKgCQgHAGgOABIgCAAQgLAAgJgEg","fc":"#384C56"},"446":{"t":[41.7,54.3],"p":"AgWAAIAWAAQAMgBALgDQgIAIgOABIgDAAQgLAAgJgFg","fc":"#384C56"},"447":{"t":[41.2,56.5],"p":"AgSAAIATAAQAJAAAJgCQgGAFgMAAIgBAAQgJAAgJgDg","fc":"#384C56"},"448":{"t":[40.7,57],"p":"AgPAAIAQAAQAHAAAIgCQgFAFgKAAQgJAAgHgDg","fc":"#384C56"},"449":{"t":[41,56.2],"p":"AgRAAIASAAQAIAAAJgCQgGAFgLAAIgBAAQgJAAgIgDg","fc":"#384C56"},"450":{"t":[41.2,55.3],"p":"AgTAAIAUAAQAJgBAKgCQgHAGgMABIgBAAQgKAAgJgEg","fc":"#384C56"},"451":{"t":[41.5,54.5],"p":"AgVAAIAVgBQALAAALgDQgIAIgNAAIgCABQgLAAgJgFg","fc":"#384C56"},"452":{"t":[40.9,56.4],"p":"AgQAAIARAAQAIAAAIgCQgFAFgLAAIgBAAQgIAAgIgDg","fc":"#384C56"},"453":{"t":[41.1,55.9],"p":"AgSAAIATAAQAJgBAIgCQgGAGgLAAIgBABQgJAAgJgEg","fc":"#384C56"},"454":{"t":[41.4,54.8],"p":"AgUAAIAUAAQALgBAKgCQgHAHgNAAIgCAAQgKAAgJgEg","fc":"#384C56"},"455":{"t":[41.6,54.3],"p":"AgVAAIAVgBQALAAALgDQgHAIgOABIgCAAQgLAAgJgFg","fc":"#384C56"},"456":{"t":[41.4,52.7],"p":"AghAFIgMgHQAQgFBLgFIgKAMQgNAJgWADIgHABQgPAAgMgIg","fc":"#6D9BBB"},"457":{"t":[41.4,53.4],"p":"AgeAOQgNgHgFgRQAkAqA9g0QgCAPgOAMQgMALgUADIgGAAQgOAAgLgHg","fc":"#6D9BBB"},"458":{"t":[41.3,54.1],"p":"AgbAXQgVgLgEgeQA2BaAzhlQAAAZgWATQgMAMgSACIgFABQgNAAgKgHg","fc":"#6D9BBB"},"459":{"t":[41.3,54],"p":"AgbAWIgBgBQgXgKgBgaIAAgBQAWAoAhgDQAigEAPgrIAAgBQAGAWgYASIgDADQgLAJgSACIgBAAIgGABQgMAAgKgGg","fc":"#6D9BBB"},"460":{"t":[41.4,53.8],"p":"AgeAUQgZgJACgZQARAlAogFQApgEAGgmQAMAUgeASQgMAJgUACIgGAAQgNAAgMgFg","fc":"#6D9BBB"},"461":{"t":[41.3,53.5],"p":"AgaARQgLgDgGgGQgGgIgBgKIAAgBQAQAaAmgEQAigEAMgYIAAgEQADAIgDAHQgFAJgPAJQgJAHgNABIgHABIgFABQgMAAgKgFg","fc":"#6D9BBB"},"462":{"t":[41.3,53.3],"p":"AgYAPQgJgDgGgGQgGgGgDgIIAAgBQAOAQAmgEQAcgDAQgPQAAAFgCAGQgGAHgNAHQgJAGgMABIgGABIgFAAQgKAAgJgDgAAwgRIABABIgBABIAAgCg","fc":"#6D9BBB"},"463":{"t":[41.3,53],"p":"AgWAMQgIgCgGgEQgGgGgEgFIAAgBQAMAGAmgCQAWgCAUgJQgCAFgDAGQgGAFgMAGQgJAEgKABIgEABIgGAAQgIAAgIgDgAAugNIAAAAIAAAAIAAAAgAAvgOIgBABIABgBg","fc":"#6D9BBB"},"464":{"t":[41.2,54],"p":"AgbAWIgEgCQgUgLAHgbIAAgBQACAVAPALQAMAJAPgBQASgCALgLQAOgLAAgXQAMAYgYAPIgJAGQgJAGgNABIAAAAIgHABQgKAAgKgFg","fc":"#6D9BBB"},"465":{"t":[41,54.3],"p":"AgcAXQgTgMAMgiQgEAXALAMQAKAMARgBQAQgBALgNQAMgMgCgYQAOAfgeAPQgJAIgNABIgGAAQgLAAgJgFg","fc":"#6D9BBB"},"466":{"t":[41.1,53.9],"p":"AgZATQgLgFgCgOQgBgHACgLQgCARAOAHQAKAJAPgBQAOgBALgKQALgHADgPQABAGgBAFQgBAPgUAJQgGAFgJACIgFAAIgFABQgKAAgIgFgAAmgXIABAEIAAAAIgBgEg","fc":"#6D9BBB"},"467":{"t":[41.2,53.5],"p":"AgWAQQgLgEgDgKQgDgGgBgJQACAKAQAEQAJAFANAAQANgBALgFQAKgGAGgJIgCAJQgEANgSAHQgGADgHACIgFAAIgEAAQgJAAgHgDgAAogSIABABIgBACIAAgDg","fc":"#6D9BBB"},"468":{"t":[41.3,53.1],"p":"AgUANQgJgCgGgIIgHgLQAEAEASACQAKACALgBQALgBALgEQAKgDAJgFIgFALQgHAJgQAFQgGADgGABIgDAAIgEABQgIAAgHgDgAAqgOIABgBIgBABIAAAAg","fc":"#6D9BBB"},"469":{"t":[41.2,53.5],"p":"AgWAQQgLgEgDgKQgDgGgBgJIAAAAQACAKAQAEQAJAFANAAQANgBALgFQAKgGAGgJIgCAJQgEANgSAHQgGADgHACIgFAAIgEAAQgJAAgHgDgAAogSIABABIgBACIAAgDg","fc":"#6D9BBB"},"470":{"t":[41,54],"p":"AgaAVQgLgHgBgOQgBgIADgMQgDATANAJQAKAKAQgBQAOgBALgLQALgIACgRIgBgEQADAIAAAHQgBARgVAJQgGAFgIACIgGABIgFAAQgLAAgIgEg","fc":"#6D9BBB"},"471":{"t":[41.1,53.8],"p":"AgYASQgLgFgCgMQgCgHABgLQgBAPAPAGQAKAIAOgBQAOgBALgJQAKgGAEgMIAAAKQgCAOgUAJQgGAEgIABIgFABIgEAAQgKAAgIgEgAAmgVIABADIAAABIgBgEg","fc":"#6D9BBB"},"472":{"t":[41.3,53.3],"p":"AgUAOQgKgDgFgJQgEgEgCgIQADAGASADQAJABALAAQANAAALgEQAJgEAIgGIgDAKQgHAKgRAGQgFADgHABIgDAAIgFABQgIAAgGgDgAApgQIABAAIgBACIAAgCg","fc":"#6D9BBB"},"473":{"t":[41.3,53],"p":"AgTANQgJgDgGgGIgJgKQAFACATAAQAKABAKAAQALgBALgDIAVgHIgCACIgFAKQgIAIgQAFQgFACgGABIgDAAIgEABQgHAAgHgCg","fc":"#6D9BBB"},"474":{"t":[41.8,51.2],"p":"AhUAJIgCgJICfgNIAOAJQgjAJgrAGQgRADgUAAQgaAAgegFg","fc":"#FFFDFC"},"475":{"t":[41.5,54.3],"p":"AgyAMQgUgMgNgLQBdAkBKgyQgNASgVAIQgVAXgaACQglgCgQgMg","fc":"#FFFDFC"},"476":{"t":[41.5,53.3],"p":"AhSgIIClgNQgdAogyAAQgMADgLAAQgpAAgWgeg","fc":"#6B1100"},"477":{"t":[74,92.8],"p":"AhZACQAKgEARgFQAcgKAggBQAdgBAfAGQAfAHAXANQgegHgbAAQgdgCgbABQgeABgbADIgbAGQgSAGgJAEQAGgIARgJg","fc":"#1D2226"},"478":{"t":[74,92.8],"p":"AhZACQAKgEARgFQAcgJAggCQAdgBAfAHQAfAGAXANQgegHgbAAQgdgCgbABQgeABgbADIgbAGQgSAFgJAFQAGgIARgJg","fc":"#1D2226"},"479":{"t":[74,92.7],"p":"AhZACQAKgEARgFQAcgJAggBQAdgBAfAGQAfAGAXAMQgegGgbAAQgdgCgbABQgeABgbADIgbAGQgSAFgJAEQAGgIARgIg","fc":"#1D2226"},"480":{"t":[74,92.7],"p":"AhZACQAKgEARgFQAcgIAggCQAdAAAfAFQAfAGAXAMQgegGgbAAQgdgCgbABQgeABgbADIgbAGQgSAFgJAEQAGgIARgIg","fc":"#1D2226"},"481":{"t":[74,92.7],"p":"AhZACQAKgDARgFQAcgJAggCQAdAAAfAGQAfAGAXAMQgegGgbgBQgdgCgbACQgeAAgbADIgbAGQgSAFgJAEQAGgHARgJg","fc":"#1D2226"},"482":{"t":[74,92.7],"p":"AhZACQAKgEARgFQAcgIAggCQAdgBAfAGQAfAGAXANQgegHgbAAQgdgCgbABQgeABgbADIgbAGQgSAFgJAEQAGgHARgJg","fc":"#1D2226"},"483":{"t":[74,92.8],"p":"AheACQAMgDARgGQAegIAhgCQAfAAAgAFQAgAGAZAMQghgGgcAAQgegCgcABQgfABgcADIgdAGQgTAFgJAEQAGgHARgJg","fc":"#1D2226"},"484":{"t":[74.1,92.9],"p":"AhiACQAMgDASgGQAggIAigCQAgAAAiAFQAhAGAaAMQgigGgeAAQgegCgdABQgiABgdADIgeAGQgUAFgJAEQAGgHASgJg","fc":"#1D2226"},"485":{"t":[73.7,92.9],"p":"AhTACQALgDAPgGQAagJAdgCQAbAAAcAFQAdAHAWANQgdgHgZAAQgagCgZABQgbABgZADIgaAHQgQAFgHAEQAEgIAPgJg","fc":"#1D2226"},"486":{"t":[73.2,92.9],"p":"AhCACQAHgEANgGQAVgJAYgCQAVgBAXAHQAXAHASANQgXgHgUAAQgWgCgTABQgWABgVADIgVAHQgNAGgGAEQAEgIANgKg","fc":"#1D2226"},"487":{"t":[73.4,92.9],"p":"AhJACQAJgEAOgFQAXgKAagCQAXAAAZAGQAZAHATANQgZgHgWAAQgXgCgVABQgYABgXADIgWAHQgPAGgGAEQAEgIANgKg","fc":"#1D2226"},"488":{"t":[73.6,92.8],"p":"AhOACQAKgEAOgFQAZgJAcgCQAZgBAbAGQAbAHAUANQgbgHgXAAQgZgCgXABQgaABgYADIgYAHQgQAFgHAFQAFgIAOgKg","fc":"#1D2226"},"489":{"t":[73.8,92.8],"p":"AhUACQAKgEAQgFQAbgKAegBQAbgBAcAGQAdAHAWAMQgdgGgZAAQgbgCgYABQgdABgZADIgaAGQgRAGgHAEQAFgIAPgJg","fc":"#1D2226"},"490":{"t":[74,92.8],"p":"AhZACQAKgEARgFQAcgJAggCQAdgBAfAGQAfAHAXAMQgegGgbAAQgdgCgbABQgeABgbADIgbAGQgSAFgJAFQAGgIARgJg","fc":"#1D2226"},"491":{"t":[73.8,92.8],"p":"AhVACQAKgEAQgFQAbgKAfgBQAbgBAdAGQAeAHAWANQgdgHgaAAQgbgCgZABQgdABgaADIgaAGQgRAGgIAEQAFgIAQgJg","fc":"#1D2226"},"492":{"t":[73.6,92.9],"p":"AhRACQAKgEAPgGQAagJAdgCQAagBAcAHQAbAHAWANQgcgHgZAAQgagCgXABQgcABgYADIgZAGQgQAGgIAFQAFgJAPgJg","fc":"#1D2226"},"493":{"t":[73.5,92.9],"p":"AhNACQAKgEAOgGQAYgJAcgCQAYgBAbAGQAaAHAVAOQgbgHgYAAQgXgDgXACQgaABgXADQgJACgPAFQgPAFgIAFQAFgIAOgKg","fc":"#1D2226"},"494":{"t":[73.3,93],"p":"AhIACQAJgEANgGQAXgKAagCQAXgBAZAHQAZAHATAOQgZgHgWAAQgXgDgVACQgZABgVADIgXAHQgOAGgHAFQAEgJAOgKg","fc":"#1D2226"},"495":{"t":[73.1,93],"p":"AhEACQAJgEAMgGQAWgKAZgCQAVgBAXAHQAYAHASAPQgXgIgVAAQgWgDgUACQgXABgVADIgUAHQgOAGgHAFQAEgJANgKg","fc":"#1D2226"},"496":{"t":[73.3,93],"p":"AhHACQAIgEANgGQAYgKAagCQAWgBAYAHQAaAHASAPQgZgIgVAAQgXgDgVACQgYABgWADIgWAHQgPAGgGAFQAEgJAOgKg","fc":"#1D2226"},"497":{"t":[73.4,92.9],"p":"AhLACQAJgEAOgGQAYgJAbgCQAYgBAaAGQAaAIAUANQgagHgXAAQgYgCgWABQgZABgXADIgXAHQgQAGgHAFQAFgJAOgKg","fc":"#1D2226"},"498":{"t":[73.5,92.9],"p":"AhPACQAKgEAPgFQAZgKAcgCQAZgBAbAHQAcAHAUANQgbgHgYAAQgZgCgXABQgbABgXADIgZAHQgQAGgHAEQAFgIAOgKg","fc":"#1D2226"},"499":{"t":[73.7,92.8],"p":"AhSACQAKgEAPgFQAagKAegBQAagBAcAGQAdAHAWANQgdgHgZAAQgagCgYABQgcABgZADQgJACgQAFQgRAFgIAFQAFgIAQgKg","fc":"#1D2226"},"500":{"t":[73.8,92.8],"p":"AhWACQALgEAPgFQAcgKAfgBQAcgBAdAGQAdAHAXAMQgegGgZAAQgcgCgZABQgdABgaADIgaAGQgSAGgIAEQAGgIAPgJg","fc":"#1D2226"},"501":{"t":[27.8,44.7],"p":"AgwAoQAggRAbggQAOgRAIgOIAKAIQAKAMgHARQgHASggAPQgWALgVAAIgMgBg","fc":"#E8D19E"},"502":{"t":[29.5,54.3],"p":"AAQgLQAhABAbAGQgDAEgyAEQgVADhNAFQAbgZBAACg","fc":"#E8D19E"},"503":{"t":[48.7,46.4],"p":"AgbA+QgGgIAIgMQAMgNAMgSQAUgigCgYQgDgcAIAMQAHAMACAWQABAUgTAkQgQAigJAFIgGACQgFAAgEgGg","fc":"#E8D19E"},"504":{"t":[59.7,60.1],"p":"AgCgBIgdgXQgEgMAMAAQALABANAGQAOAGAFANQAGALAGAjQgFgNgdgYg","fc":"#E8D19E"},"505":{"t":[74.5,51.1],"p":"AgPgCIABgxQAAgLALATQAIATAFAUQAGAYAAANQAAAUgPADQgOgJgCgxg","fc":"#E8D19E"},"506":{"t":[62.7,50],"p":"AgoBLQgDgOAAgSQAXg6AhgoQASgUANgIQgWAXgbA+QgXA0gGAYQgCAGgBAAQgCAAgBgJg","fc":"#E8D19E"},"507":{"t":[65,50.8],"p":"AAEgUQAUgaASgUIgHAaQgFAUgIAMQgWAggpArQAHgjAmg0g","fc":"#E8D19E"},"508":{"t":[92.9,53.2],"p":"Ag2gCQAbgKAbgBQAXAAAfAGIAgAHQgcAIgYgCQgfgChOAJIgFABQgSAAAsgQg","fc":"#E8D19E"},"509":{"t":[85.1,49.9],"p":"AgUAmIAQgnQAQgqAIgJQAJgLgEAoQgFAngOASQgMAUgMABIgCAAQgKAAAKgRg","fc":"#E8D19E"},"510":{"t":[80.1,47.9],"p":"Ag2BAQgBgHADgCIBrh8QgmBFgeAnQgYAdgKABIgCABQgEAAgBgGg","fc":"#E8D19E"},"511":{"t":[80.8,55.8],"p":"AAHAYIgUgJIgugmQgHgJB+AxQgSAIgSAAQgIAAgJgBg","fc":"#E8D19E"},"512":{"t":[72.9,59.1],"p":"AgJATQgHgEgegFIgdgFQgBgFAfgKQAfgMAFADIBVAcQg2AMgVAAQgGAAgEgCg","fc":"#CCB681"},"513":{"t":[71.7,22.7],"p":"AiDBPQBhgXBFhJQAkgmAQgiQANgBAOATQANASAFAXQAEASgnAZQgSANg7AgQglAVgwAIQgRADgNAAQgaAAgKgLg","fc":"#9BA7AA"},"514":{"t":[101.5,26.7],"p":"AAAAPIgegWQgOgLAIgDQAHgCAHADIA3AYQAJADgCAGQgDAEgLAEIgGABQgJAAgLgHg","fc":"#F2EBDA"},"515":{"t":[21.8,30.3],"p":"AgVADIANgLQAPgHALACQAKACgBAJQgCALgrAGIgDAAQgKAAAKgMg","fc":"#AA9D85"},"516":{"t":[33.2,24.7],"p":"AglAOQAcgYAKgHQAvgcAJAIQAFAFgRATIgaAYQgHAIgTAIQgUAHgXAFIgEAAQgLAAAcgZg","fc":"#AA9D85"},"517":{"t":[52.2,59.3],"p":"AAMAbQgigOgRgSQgOgQAFgHQAMgQAhANQAKAEALAQIATAaQAOASgBADQAAAAAAABQAAAAgBAAQAAAAgBABQgBAAgBAAQgIAAgagLg","fc":"#CCB681"},"518":{"t":[38.8,47],"p":"AAFA9QgVgKgHgPQAFgVgEgnIgGgmQAMALATAlQAZApABAVQAAAPgLAAQgFAAgIgCg","fc":"#CCB681"},"519":{"t":[27.3,54.8],"p":"AgnAAQAqgWBBAEIgFATQgCAHgFACQgCACgyABQgzABgUAFIAAAAQgBAAAdgTg","fc":"#CCB681"},"520":{"t":[81.8,56.5],"p":"AglASQgmgHgEgLQgDgHAXgIQAUgGAMABQALABAWAHQAmAKAkAOQgsAJgkAAQgTAAgSgDg","fc":"#CCB681"},"521":{"t":[64.9,51.5],"p":"AgyBLQgCgJAIgUQA1hcArglQACAigeA+QgcBDgWADIgJABQgOAAgBgJg","fc":"#CCB681"},"522":{"t":[102.2,23.5],"p":"AAhAgQgygagZgRQgSgNgLgNIgGgKQAZgLA7ArQA0AjASAZQAEAFgFAAQgIAAgjgSg","fc":"#FFF5E3"},"523":{"t":[24.3,23.6],"p":"AiJBCQA5hQBvgiQA4gRAtgBQAPgCgYAVQgZAVgXAKQhAAcguAVQhPAigTAAIgEgBg","fc":"#FFF5E3"},"524":{"t":[25.4,27.5],"p":"AjoCbQgOgIgEgRQgCgIAAgKIABgSIAAgCIABgCQAZhSA8g3QA1gwBIgbQBjgnB7AAQARAAAOAIQAoAZAABgQAAArgZAjQgUAagiASQgfAPgiAGIgBACIgFgCIgDABIAAgBQgfgGgeAAQgsAAg0ANQgdAIg1ATQgeAKgOADQgNAEgKAAQgPAAgLgHgAAkhcQhoAZg9A6QgzAtgUBEIgBAGIAGgCQAJgBALgFIA4gTQBZgeBFAAQAjAAAiAHIAJgCQAZgGAUgNQAPgJAKgOQAQgSAAgeQAAgigTgrIgCAAQhOAAhEARg","fc":"#4F3F2A"},"525":{"t":[25.3,28.4],"p":"AjlCIQgBgCAgguQBngOBjgjQDKhFgIhqQAqA2gNA3QgQBEhqAdQgoAAgvADQhaAHhmAnQgtASgJAAIgBgBg","fc":"#8C7F6B"},"526":{"t":[25.3,27.4],"p":"AjLA1QAYAIAvAAQA8AABDgYQA7gWAjgbQAZgVAXgvQAVgpAFgBQAQgFAYARQAcATgPAdQgDAFgOA9QgJAmgiAKQg5ARhaAHIjlAwg","fc":"#AA9D85"},"527":{"t":[25.1,26.8],"p":"Ai+B3QgZgIAAgHQAAgMAjhLQAfhAC5gqQBdgWBXgIQhcDsgEgLQgFgKgcgKQgkgMg2gBQgvgChDAbQg1AWgQAAIgEgBg","fc":"#F2EBDA"},"528":{"t":[90.4,56.7],"p":"AAmAmQgFgHghgVIghgUQgMgJABgIQABgIALgEQAbgIAgAgQAOANADAYQACATgEAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQgBgBgBgBg","fc":"#CCB681"},"529":{"t":[58.9,60.3],"p":"AgFAFIgVgTQgRgJgEgOQgDgPAhAGQBEAOgDBQQgdgSgYgZg","fc":"#CCB681"},"530":{"t":[60.6,22.1],"p":"AmDDXQALh+AshcQA3h3Bkg1QBMgpBlgDIAAAAQBbAABMAkQBDAgAyA9QAsA1AbBFQAYA/AJBGIgzAHQgMhkgthNQg0hbhUgpQhAgehQAAIAAAAQhWAChCAjQg7AggpA5QhFBggPClg","fc":"#303233"},"531":{"t":[60.8,51.8],"p":"AAiDSQgJgBgKgFIgjgSIgUgJIgCAAIgBAAIgugGIg1gKQgygLg2gRIgNgEIgBAAQgKANgSALQgJAFgTAHIgGACIgHgBQgIgCgHgHIgEgEIgCgFQgDgFgBgFIgCgOIgBgLIg5gBQgegCgRgFIgNgDIgMgHIgEgCIgBgBQgNgLgGgPQgKgYAGghQAEgTAJgYIAOgkQABgPACgJQACgMAGgPQAIgTARgbIAcgqIARAvQAJAcAKARQAGAMAGAFIABACQAKgKAJgPQAIgNADgKIAEgJIg7gwIA7AHIAAgGIAeAEQAkAHAhAPIgCgBQASAHAUAPQAOAMAQAPIAXAbIAHgyIACgPIAMAAQAagCAWAHQAaAIATARQASASAMAWIAAABIAFgGQASgVAWgPQAcgSAZgDQAfgGAbALIALAFIgEAKIgIAeQgBAGABAFIADADIADACIACABIAFgIIAJgMQAXglAYgRQASgLAVgDQATgEAVAGIAnAIIgZAgIAAABQACAEAJAEIAHACIABAAQAGgDALgLQASgSAIgFQALgIAIgDQAKgEANAAQAMgBALADQAMACALAIQAJAHAHAJIAJALIAhAlIghAEIgDAMQgEAVgEAOIABAEQABAFAIAJQAKAOAFAIQAGALAAALIgCAJIgCAEIAAADIgBAAIAAAAIAAACIgJAKIgOAJIgMAGIg1AUIgCABIgHAkQgGAYgFAJQgFAIgDADIgEACIgCABIgCACIgDACIgCABIAAAAIgCAAIgCABIgBAAIgBABIgDAAIgFAAIgIgBIgLgEQgJgDgRgMIgUgMIgLgEIABAAIgUAIQg5AUgvAKQgbAGgbADIgYACIgBACQgHANgEAFQgHAHgJADQgCABgHABgAkIBLIACAAIABAAIAeAKQAzARAwAKQAYAGAbADIA3AIQAIADASAJIAXANIAKAEQAGgLAEgGQAHgIAKgDIAIgBIAEAAIAZgCIAxgIQAugKAzgTIAXgJIABAAIACgBIAFgBQAJgBAOAEIAQAGIAZAPIANAIIACgJIAIgqIADgJIAEgGIAEgGIAAAAIAAAAIACgCQAGgFALgEIA7gXIgHgIQgNgRgCgHQgFgJAAgKQgBgMADgJIAAABIALg0IgGgGQgGgDgIAAIgHACIgHAEQgIAGgNANIgNALQgIAIgKAFIgOAEQgIABgIgBQgLgCgLgFQgYgMgLgTQgEgJgCgJQgIABgIAFQgPAIgXAeIgLAMQgIALgIAFQgIAEgIABQgKABgIgFIgJgGQgFgDgDgEQgKgLAAgOQAAgJAEgMIAIgRQgPgBgPAFQgTAFgTAQQgSAQgNATQgIALgFAIIgKAVIgsA2IgBg/IgDgRIgGgSQgGgRgLgOQgNgOgPgHQgKgEgLgCIADAkQAAAUgCALQgEATgMAPIgWAVIglg2IgWgaQgQgQgJgGQgNgLgLgEIgBAAIgBgBQgNgGgOgEIAAACIgEAAIgEALQgFANgKASQgVAigZARIgOAKIgQgKIgLgIQgJgGgEgGQgJgJgKgRIgBgDQgFANAAARIAAAEIgBADQgFAQgLAaQgKAYgBAKQgEAUAFAIQABAEAEAEIADABIAHACQALADAbABIBDACIADABIACAAIALADIAIAHQAEAEAEAHIADAJIACAMQAFgDACgEIADgFIABgCIACgFIABgCIAEgEQAGgHALAAgACahbIACAAIACABIgDgBIgBAAg","fc":"#3D3428"},"532":{"t":[34.8,56.6],"p":"AhDAmIAFgSQAFgMAMgMQAXgcAggHQA1gKAFADQhrBWgSAHIgFABQgGAAABgKg","fc":"#CCB681"},"533":{"t":[18.4,54],"p":"Ag5AAIAGgGQAIgHAMgEQAjgKA2AeQgkAQgXABIgDAAQgfAAgWgUg","fc":"#CCB681"},"534":{"t":[84.7,47.9],"p":"AgcBMQgMgDAJgSIAeg8QAcg9AJgKQgGAmgCA2QgEAmgTAMQgQALgMAAIgFgBg","fc":"#CCB681"},"535":{"t":[93.9,53.3],"p":"AhbABQAbgLArgIQAZgFAhAHQAyALAVACQgMAMg6AGQgxAFgZgFQgRgDgVAEIgTAFQgdgGAfgOg","fc":"#CCB681"},"536":{"t":[60.3,52.6],"p":"AAHChQgdgQgMgBQhrgLh6grQgDAAgFAOQgMASgiALQgFgBgCgaQgDgagLAAIhNgCQgqgEgMgKQgagZATg4QAag9gBgQQATA4AxARQAsAQApgVQAqgVACgnQACgtg5gtQCBANAcBYQALAigIAkQgGAfgSAUQB3gLgEhZQgBgjgUgfQgTgegXgGQA5gDAWA+QASAygIBHQACALAOAJQAHAFAHACQAPgwAbgwQA2hjA0gHQgLAjgFBGQgGBSAWAKQAbgNApg9QAegwAxhhQgMAZANBFQANBEANgBQAhgYAVgfQAcgoAWhBQAYANAJAdQAKAegLAhQgFAQATAaQATAYgFAIQgEAJglANQgpAPgEAEQgFAEgHAoQgGAkgNADQgIACghgVQghgUgOAFQgzAUgkAJQg5AQg7AEQgHAAgHAQQgHAPgIAAQgLAAgdgQg","fc":"#9B8C5F"},"537":{"t":[53.9,14.2],"p":"AhhBpQhEgCgJgaQgJgcApgwQApguA3gZQBogwA+ATQAqAOAOAoQAJAbgzAqQgxArg6AUQg1ASg7AAIgMAAg","fc":"#CAD0D2"},"538":{"t":[61.1,50.2],"p":"AkjBtIgfgIQhFgUgmgpQghgkgBglQgBggAGgSQAGgVAVghQARAvAQAUQAFAGATAOQAZgSASgfQASghgCgZQA+AKAtAlQAmAeAVArQANgNADgdIABg4QA/gDAhA2QAQAbAEAbQAQgfAbgcQA6g4A6ATQgNAlAAADQgCATAWAKQAKAFALgOQAGgJAQgZQAkgyA8ANQgRAUAVASQASARARgCQAUgBAlgpQAmgbApAvQgKABgIAfIgSBEQgcBgg5AIQgSAChDAVQhEAUg4AJQg1AIg6AAQiNAAitgxg","fc":"#CCB681"},"539":{"t":[62.2,40.1],"p":"AgwB6QjKgLhMgeQgYgKgIgLIgEgIQgEgdATgZQAkg3BxALIB+BEIAegNIAkgmQArgrAugOQAPgFAeAbQAQAOAMAOICGhXIArAAIAeCRQgWAdg/AbQhqAuieAAQgdAAghgCg","fc":"#505459"},"540":{"t":[61.5,29.4],"p":"AloBbQAAgcAJgcIAKgWQBkAYBzgPQDlgbBOi/QBZAbA7CFQAWAxAHArQAHArgLAGQhlA8iEAWQg8AKg6AAQi8AAivhqg","fc":"#686C72"},"541":{"t":[61.9,29.4],"p":"AgmEOQiQgEi5hVQAAjJBmh+QBkh7CbAAQCeAABrByQBxB6AADEQjXBrivAAIgQAAg","fc":"#9BA7AA"},"542":{"t":[97.7,26.1],"p":"ACkCfIhQgbQhTgbg6AAQgjAAgiAIIgMgyQAmgKArAAQA1AAA5APQAeAIA3AUIAnANIAGAAIgBgGIAAgBQgVhCgygtQgsgphAgYQhZgjhxAAIgeABIgBAAIgDg0IAigBQBRAABMATQB1AcBHBEQA+A3AZBSIAAABIAAACIABASQAAAMgCAJQgFAMgJAHQgGAFgGACQgJADgJAAQgHAAgRgDg","fc":"#4F3F2A"},"543":{"t":[98.8,30.6],"p":"ACSBUQhigchggEQhTgDgDgCQgdgRgSgvQgPg1gHgTQBQA5CbAgQBPAOA/AEQAhAkgEAWQgDAOgVAAQgNAAgUgGg","fc":"#8C7F6B"},"544":{"t":[99.1,25.4],"p":"ACJBkQhCgVgNgDIhhgOQhBgKgMgLQgUgRgZg7QgbhCAZgEQB7BaBtAqQA3AWAfAEIACAFQADACAGAMQAHAOACAOQACAGgJAAQgKAAgVgGg","fc":"#AA9D85"},"545":{"t":[97.3,25.4],"p":"ABwBjQhAgbgsABQgzABgiANQgbAJgEALQgEAKhXjsIA0AHQBAAJA2AOQCuArAdBAQAhBLAAALQABAHgYAIIgEABQgQAAgwgVg","fc":"#F2EBDA"},"546":{"t":[74.6,60.8],"p":"AgwAQIADgLIAGgJQADgFAJgJQAKgIAQgIQASgIAggGQgcAOgUAQQgLAKgIAIQgEAFgDAHIgWAlg","fc":"#1D2226"},"547":{"t":[74.3,60.5],"p":"AgcAMQAAgMAKgMQAKgLAJgDQANgDAHACQAIADAAAOQAAANgHALQgHALgLACQgHACgHAAQgSAAAAgRg","fc":"#FFFFFF"},"548":{"t":[74.2,60.8],"p":"AgpAoQgDgCAEgLIAFgRQANgUAWgQQAYgQARAAIACAYQgBAYgMAPQgMANgXAGQgMADgJAAQgJAAgGgDg","fc":"#384C56"},"549":{"t":[24.4,54.1],"p":"AgSByIgIgvQgHgsACgEQADhngBgZQgBgSAPAcQAPAdAEAcIAKAvQAGAXAHANQAJATgGAJQgFAGgQAPQgLASgJAHIgFACQAAAAgBAAQAAAAAAgBQAAAAAAgBQgBAAAAgBg","fc":"#384C56"},"550":{"t":[44.9,37.9],"p":"ABIDTQgbgDgjgJIgggKQgFgCgciQQgbiQgGgFQgQgNgZgwQgcg0AbAKQA+BDBBBQQCBCeAQA9QAOA3hCAAIgSgBg","fc":"#A1C7E2"},"551":{"t":[61,25.2],"p":"ABbC3QgFgIguhxQgohmgUgbQgSgXglgkQgggfgFgKQgHgOAZgIQAZgIASAGQAVAHAeARQAuAaAVAfQAWAhAMBCQAHAqAFBFQAEA0gGAbQgDAPgGAAQgEAAgHgLg","fc":"#A1C7E2"},"552":{"t":[61,66.9],"p":"AgUANQgMgBgGgGIgFgIQgCgEAqgEIAogEQAIAAAAAGQgBAFgIAIQgGAKgcAAIgWgCg","fc":"#A1C7E2"},"553":{"t":[35.6,71.4],"p":"AggAUQgOgMgIgMIgGgMQgFgMAYgBQAWgBAKAHIAaAIQAZAHAPALQASAPguAJQgRADgMAAQgVAAgLgKg","fc":"#A1C7E2"},"554":{"t":[21.8,38.5],"p":"AA6DDQgjgGgRgVQgSgYgdhdQgchWgEgqQgQhVABgYQABgsBICRQAjBMANAbQAfBGADAjQADAiAKAYQAFAMAEAFIgGAAQgMAAgNgDg","fc":"#4F6877"},"555":{"t":[57.8,69.3],"p":"AhOApQgMgFgIgFQgKgHgGgKQgJgQACgZQAHAZAKAJQALANAUADQAXAEA1gEQA0gEAZgKQAVgIAIgKQAKgOgCgYQAKAWgIAVQgIASgXAMQgeAPg1AFIgcACQgiAAgVgHg","fc":"#1D2226"},"556":{"t":[38.1,63.1],"p":"AA1AlIAAgCIgEgHQgFgIgIgHQgNgMgXgJQgegRg0gQQA0AHAkALQAaAKARAKQAMAFAJAJQAGAHACAFIADAIIABAFIAAAGg","fc":"#1D2226"},"557":{"t":[47.7,76.9],"p":"AAKgqQABACATAFQAPAEgFABQgGABglAjIgmAlg","fc":"#384C56"},"558":{"t":[38.8,64.3],"p":"AgHAgQgTgEgLgMQgNgNAAgPQAAgRAPgDQALgDAXAEQASADAQANQASAPAAAPQAAAQgUADIgLAAQgMAAgPgCg","fc":"#FFFFFF"},"559":{"t":[70.4,75.7],"p":"AgBgCIghglQAKgEALgOQABAGAVAVIAYAWQAGAOgMA1QACgWgegng","fc":"#4F6877"},"560":{"t":[43.4,79],"p":"AgbBBIhLg/IAhAKQAnAEAYgaQAZgdAJgLQAJgLADgJIACgDIA9AWQgmAJgiBHQgIAQALAdg","fc":"#4F6877"},"561":{"t":[39.1,64.6],"p":"AAKAvQgqgHgTgQQgWgSgBgcIADgbQAeAAApASQAoATAWAXIAJAVQAGANgFABQgKAEgQAAQgPAAgVgDg","fc":"#384C56"},"562":{"t":[43.1,50],"p":"AA+HpQhPgRhcghQgpgPgqgUQg1gagbgVQgngfgbglQgbgmgNgwQgMgogFgyQgDgigBg4QAAhvAKhCQAOhlAnhIQAXgrAggfQAggiAqgVQBJgmBmgEQBkgEBNAZQAtAOAmAYQAoAZAdAjQA4BAAZBiQAVBPgBBkIAAABQAAA4ACB2QgBA5gGAiQgHAugXAsQgRAhggAsIgcAkQgRAVgSANQgWARgXAIQgaAJgaAAIgFABQghAAg2gLgAgfnYQhfAEhEAlQhKAogoBPQgjBDgMBgQgHA/ADBsQACBpAUA/QAYBNBFA1QAZATAvAWQAiAQAuARQBYAgBMAPQAxAKAggCQARAAATgGQASgGAOgLQAVgQAhgsQAegkASgiQATglAIgnQAHghACgzIACiuQADhfgRhMQgWhbgxg9Qg2hBhVgbQg/gThKAAIgfAAg","fc":"#1D2226"},"563":{"t":[35.9,74],"p":"ABwDVQiIgUhig1Qh+hDgchPQgOgogKhCQgJhEACgqQAvALAbAZQAOANAFAKIAAAyQADA7AUAoQALAUApAkQAxAsA9AiQCoBeCqgeIgsAdQgIAGgLACQgLACgRAAQgmAAhEgKg","fc":"#384C56"},"564":{"t":[42,55.5],"p":"AAAGRQihgjhWhOQiNiBAYkaQAIhnAchcQAZhSAUgQQAQCcAEAYQAPBiAgA9QBTCaD4gNIArgCQAUAAAOgCQAPgCARgYQARgWAFAAQA0AEgDAiQgCAhgrAFQhxAOhoAAQheABgjAEQg6AGgEARQgGAlA5A1QA3AyA2ARQAKADA7AaQBFAVBEgOQBagSANhDQAFgWgFgdIgGglQATgCAYAbQAMANAIANQgIAhgXApQgrBRhBAmQglAXhBAAQg2AAhJgQg","fc":"#4F6877"},"565":{"t":[57.6,68.4],"p":"AgiAnQgmgDgGgCQgLgDgPgOQgNgNgDgOIgBgOIANgBIASAUQAXASAYABQA4ABAdgGQA9gKgFgoIAYAWQAAAEgEAIQgHANgWAOQgYAQgkAEIgZACQgQAAgWgDg","fc":"#4F6877"},"566":{"t":[74,44.7],"p":"AhCDMQgCgCAlgwIAkgyQACgRABgiQAChAgEhZQgFhagOhJIgQg4IAsBOQAtBZABA/QAACCAGCvQABAigcBFg","fc":"#4F6877"},"567":{"t":[45.8,34],"p":"AC5ERQgMgZAIgXQhDiGgvhGQh5iziph7IAdgLQBGAmBXBTQCtCnBXDhQAEAqgFASQgDAJgDABIgSACQgHgIgGgMg","fc":"#4F6877"},"568":{"t":[42.5,49.7],"p":"AB8HkQhQAAhUglQhaglhJhBQiuicADjaQADjYBah0QBgh6C7AAQC7AABfB8QBYB1ADDZQADEEgxBzQg6CGiSAAIgBAAg","fc":"#91B1CE"},"569":{"t":[24.6,46.3],"p":"AgrB/IAziNIAKg7QAKg4ACABQAEACALAHIgEAyQgKBJgeB7QgBACgLAAIgggCg","fc":"#61889B"},"570":{"t":[13.8,49.9],"p":"AgeBKQgJgEABgDQAAgEAVAAIAVhDQAWhEAOgCIgGBYQgEAigJgBQgGAAgUAPQgSANgGAAIgBgBg","fc":"#A1C5E5"},"571":{"t":[34.2,54.6],"p":"AgUAsIAdhbIAMBdQAAACgHAAQgKAAgYgEg","fc":"#1D2226"},"572":{"t":[17.5,43.6],"p":"AikBaQAFghAPggQAYgyAwg4QAZgdAYgRQAegYAjgGQASgDAVAEQAMADAHADIAEABIAEACIAIAFQANAJAOAOIAXAZIgXAVQgOgQgigLIgYgHQgMgCgKABQgVACgaARQgTAPgVAYQgwAygWArQgQAegEAXQgGAcAIAZIgeALQgNggAFgmg","fc":"#1D2226"},"573":{"t":[30.7,45.9],"p":"Ag+CEQAPg3AOhGQAQhTAEg4QA3gKAVCbIgQAoQgPAsgJAlg","fc":"#4F6877"},"574":{"t":[13.6,45.1],"p":"AgxB1QACgdAihmIAhhhQAEgDANgCIAMgCIg0DsQgVgDgZACg","fc":"#A1C5E5"},"575":{"t":[19.2,45],"p":"AiYCMQgng+BIhtQAbgrAigfQAhgfASAAIAZgFQAhgDAcAJQBXAdABCEQgCAVgKAhQgLAngEAWIiDABQhAAAgIABg","fc":"#91B1CE"},"576":{"t":[104.2,42.7],"p":"Ah9AGQgogOgkgUIgcgQIgBgJQAFgHAeAIQCRBFBkAOQAoAGBKgHQAlgFACgQIgEgMIAHgUQAmAhgUAWQgWAXhTACQh2AAh+gzg","fc":"#513319"},"577":{"t":[127.7,24.4],"p":"AgsAPQALgIBPgYQADAAgRAMQgRAJgJAEQgIAFgZADIgPACQgHAAAFgDg","fc":"#FFFAEE"},"578":{"t":[123.4,28.7],"p":"AgiAQQgGgBACgGIADgHIA5gQQAKgCAFACQABAAAAAAQABAAAAABQAAAAAAABQAAAAgBABQg7AbgMAAIgBAAg","fc":"#AA9D85"},"579":{"t":[126.5,28.5],"p":"AgYBXQgUgEgPgIQgVgNgJgRQgLgTADgYQAAgIAEgKQADgJAFgKIADgGIAIgEQAYgLAygSQAOgGAYgGIAYgDIAJABIAHABIAFACIAFADIAEAEIAAAAIACADIADAFIACAJIgBAJIgDAJQgEAJgJALIgmAuIgzA7IgHAIgAAtg6IgmALIhHAZQgGAPgBANQAAAQAIAKQAKAPAcAGQAcgcASgUIAagcQAOgRAIgOQADgFgBgBIgHgBIgTADg","fc":"#4F3F2A"},"580":{"t":[125.9,26.6],"p":"AhSAXIAFgXICggvIg0AyIhbAtQgWgBAAgYg","fc":"#F2EBDA"},"581":{"t":[126.6,28.8],"p":"AhUACQAAgMAGgPIAGgNICdgjIhpCTQg/gZgBgvg","fc":"#AA9D85"},"582":{"t":[107.3,37.9],"p":"AhUAmQgngNgjgQIgbgMIATgjIAKAGQAOAJAXAKQAhAPBdASQBXAQAuACQAOgOAHgqIAEgqIARgFQAIAhgKAsQgIAmgKANQghADghAAQhaAAhagcg","fc":"#303233"},"583":{"t":[109.5,25.3],"p":"AgCANIgLgHQgGgFgBgEQgBgHAGgEQAGgEAHAEIACACQAcAMgJAKQgHAHgHAAQgEAAgDgEg","fc":"#9BA7AA"},"584":{"t":[109.1,31.9],"p":"AAaAcQgKgEgPgNQgNgLgGgCIgOgEQgEgDAGgIQAGgHAIgCIAOgCIAYAjQASAWgIAAIgGgBg","fc":"#686C72"},"585":{"t":[108.1,38.4],"p":"ABeArQg3gGg8gSQg4gQgvgOIgigNIAOgMQASgLAPADQAaAFBqAJIArAYQAzAVAsgEQgEARAAALQAAAEgGABQgEACgLAAQgOAAgagDg","fc":"#686C72"},"586":{"t":[101.7,19.7],"p":"AAAAgQgGgYAAgJQgBgKAEgUQADgVAAADQAJBTgCANQAAABAAABQgBAAAAAAQAAABAAAAQAAAAgBAAQgCAAgDgSg","fc":"#FFFAEE"},"587":{"t":[100.2,25.3],"p":"AgDAmQgDgFgBgiQgBgiACgEQAAgBABAAQAAgBABAAQAAAAABABQAAAAABABQACAEABAKIAHA7QgFAIgDAAQgBAAgCgEg","fc":"#AA9D85"},"588":{"t":[98.6,21.6],"p":"AgCBtQgVgCgSgOQgNgKgNgQIgGgJIAEgJIAghHIAcg2IAMgUIAHgGIAIgFIAJgBIAFAAIAEABIAAAAIAFACIAFADIAEAEIAEAGIAEAIQAFAMACALQAFAcABANQADA6AAAUIgBAIIgDAGQgFAGgKAJQgHAHgJAFQgSAKgUAAIgDAAgAAXhNQgJAOgKAUIgOAjQgMAXgNAnQAPAWATAEQALACAOgGQAOgGALgMIgHhLIgFgnQgCgNgDgGIgEgGg","fc":"#4F3F2A"},"589":{"t":[101.5,21.8],"p":"AgZBPIAEhlIAYhFIAWCmQgIAJgMAEQgFAEgGAAQgMAAgHgNg","fc":"#F2EBDA"},"590":{"t":[98.8,21.2],"p":"Ag9A9IBaicIAhCeQgMATgVAJQgMAFgMAAQgeAAgkgjg","fc":"#AA9D85"},"591":{"t":[115.7,8.1],"p":"AgIARQACgiAEgJQACgIAEgEQAGgFgBAHQgJA+gEALQgCAEgBAAQgDAAACgYg","fc":"#FFFAEE"},"592":{"t":[100.9,23.1],"p":"AiNCCQgOgLgHgIQgQgRgKgRQgNgUgFgUQgFgWAEgWQADgXAMgUQAVghAngZQATgNARgHQARgIAXgEQBKgMBQAqQBHAnApBEIgOAHQgog6hGghQhJgig+AOQgQADgQAIQgKAGgTANQgfAWgPAaQgOAbAHAcQAEAPAIAPQAHANALAMIACADIABAAQADAGALAIQAIAHALAGQAOAJAcANIAIAEIhKAGg","fc":"#303233"},"593":{"t":[81.1,30],"p":"AgGBIQgQgRgJgSQgLgXABgTQABgUAMgWQAJgSAQgPIAJAKQgaAkACAdQABAbAdAeIAeAaIgqADg","fc":"#513319"},"594":{"t":[108.8,19.9],"p":"AAuBCQghgFgjgWQgmgXgTgaQgUgbAKgQQAKgQAhAEQAiAFAjAXQAlAWAUAaQAUAbgKAQQgIANgWAAIgOgBg","fc":"#C7CDCF"},"595":{"t":[103.6,41.4],"p":"AgaAhQhbgWg8ghIgpgeIAagGQAfgEAWAMQAYAOCLAfQCIAdAQgCQARgBAVgUIAEAKQACANgDAMQgaAYg2AAQg4gBhrgag","fc":"#F9D180"},"596":{"t":[109.1,25.5],"p":"AA+CEIg8gSIgMgHIgIgFIATgRIABgBQgSgUgPgIQgKALgYAEQgYADgWgHQg7gRAdgzQgbgtANgoQAHgWAMgPQAPgSAUgCQB4gKBPBhQA9BJABBHIgKABQAEAJgBATQgBAQgDAHQgCAFgMAAQgVAAg0gNg","fc":"#9BA7AA"},"597":{"t":[103.2,23.7],"p":"AiTBlQgXgPAAgFQgXgXgHglQgMhIBZhEQAQgNAxABQA4AAAyATQCTA3AHCkIkhAZQgjgPgZgQg","fc":"#686C72"},"598":{"t":[85.6,31],"p":"AhHAMQgBgRADgTQAFgoAPgEQAsBVBNAsIheAIQgbgZgWggg","fc":"#F9D180"},"599":{"t":[112.6,9.1],"p":"AAVBNQAJgkAHgkQADgJACgZIACgSIAAgLIgNAKQgNALgNAOIgoAuIgCAEIgcgKIADgGIACgCIAXgWIAbgbQAOgPANgLQAKgIAGgDQAIgEAGgBQACgBAFACIACABIABABIAEADQACADABAFQACAJAAANIgRCBg","fc":"#4F3F2A"},"600":{"t":[115.3,9],"p":"AgWAsIACgkIAUg0IAYgSIgTB9g","fc":"#F2EBDA"},"601":{"t":[112.7,9],"p":"Ag1AYIAxgxQAxgyAGAEQAKAIgaCHg","fc":"#AA9D85"},"602":{"t":[103.1,35.9],"p":"AgVgCQAYAAASADIgdACg","fc":"#CFEA6F"},"603":{"t":[103.7,33.7],"p":"AhoAAQAJgMANgJQANgHAQgDQAYgFAdAFQAWADAZAIIAXAJQAOAGAJAFIAXAOIhRAHIgDgBQgwgRgeAFQgRADgHALQgCACgCAHIgpAEQABgTAKgQg","fc":"#2A380D"},"604":{"t":[95.7,35.4],"p":"AACgPIAOAcIgfADQACgcAPgDg","fc":"#608420"},"605":{"t":[104.3,34.8],"p":"AgLgUQAgABAfALQARgGAcASIjBARQARgsBEADg","fc":"#98CC46"},"606":{"t":[92.2,46.1],"p":"AAnCCQBKh7AFgZQgMgfg3gUIgzgNQgvBYhPB8IgxAAQA1hTA5hcQAuhMAEgIQBvgBAzA0QAaAaADAbIgIANQgeA2g0BYg","fc":"#3D2514"},"607":{"t":[100.6,52.6],"p":"AgpBBQAkg0AvhNQgfA+glBDg","fc":"#513B27"},"608":{"t":[97.4,52.2],"p":"AhEBFQBJhFBAhEQggBGglBDg","fc":"#6B4F32"},"609":{"t":[92,47.7],"p":"AiHByQBJhtA7h2QAvABAzAmQAZATAQASQgiA+gzBZg","fc":"#9F815D"},"610":{"t":[58.2,34.6],"p":"AmjDjQAFhcAUhNQALgsARgjQAIgVAKgTIAMgTQAHgLAGgIIgBABQAMgRAUgSQASgTARgMQAngeAogSQBTgmBfAEQBkADBPAaQAwAPAkAWQAVANARAOIARAQQAKAKAGAJIABABIAAAAQAUAqAPArQAOAnALAuQAKAsAGAuQAHAuACAsIAAALItHADgAiiiyQgmASghAaIggAcQgPAQgLAPIgBAAIAAABIgUAgQgIAOgKAWQgPAhgLApQgRBCgGBLIMOANQgFgrgGghQgIgvgLgoQgOgwgOgiQgPgpgUgmIgMgOQgHgHgJgHQgNgKgWgNQgigUgsgNQhIgWhhgCIgMAAQhRAAhFAgg","fc":"#1D2226"},"611":{"t":[56.1,35.2],"p":"Al0DfQABgrAGg3QAJhZARgkQAXg1A4g+QBBhGA2gRIAAAHQBbgbBoAAQDVAABNCHQAFAHAQATQAMASgFALQgHAQiNAQQi2ATj6gKQgZgBgRAdQgPAaACAeQAHBoADAbg","fc":"#384C56"},"612":{"t":[58.8,35.1],"p":"AFdDkQASgUACgrQABhAiAgHQhiAMheAJIjBATQg3APAFAXQADAPAqAmIkBgCQAFgqAKgoQAGhWAuhZQAXguAVgcIAhgbQAqgqBMgbQCTg0C8A+QCBArA1C2IADABIAOA6QANBIACBCg","fc":"#4F6877"},"613":{"t":[58.8,34.6],"p":"AmRDkQABhpAZhWQAbhbAsgkQANgYAqghQA5gsBGgWQDNhBDpCgIAvB/QAXBLANBsQACASABAXg","fc":"#91B1CE"},"614":{"t":[105.7,46.2],"p":"AgdAcQgOhGgHg/QAOABAYA1IAWAzQAVAAANAwQALAwgIAFQgFACgUACIgaABIAAAAQgJgBgQhNg","fc":"#A1C5E5"},"615":{"t":[94.4,43.5],"p":"AAABGQgCgCghh9IADgFQAEgGACgBQADgCAFAIIAFALIAxB0QgZAHgIAAIgDgBg","fc":"#61889B"},"616":{"t":[106.4,41.6],"p":"AhEiWIAMABQAOABADADIA0CCQA1CGADAeQgPgCgRACIgOACg","fc":"#A1C5E5"},"617":{"t":[99.5,39.4],"p":"ACCBeQgPgugWg0QgZg9gTghQgNgZgOgQIgHgFIgBgBIAAAAIgGAAIgKADQgzAJgnAZQgqAbgOAtQgMAoALA3QAMAxAZAwIgdAPQgeg+gKgqQgSg/AMgyQAIghARgYQARgZAagTQArggBBgNIAUgDIACAAIAHAAIAFABQAKACAMAJQAHAFAGAHQAOARASAhQAWApAWA9QAmBoAVBoIggAHQgRg9gOgpgAAOiSIABAAIgCAAgAAOiSIgBAAIAAAAg","fc":"#1D2226"},"618":{"t":[87.9,41.2],"p":"AgoA1QgPglgHgQQgIgMAVhDQAWhJAjAFQALBdAuCTIhKA4QgJgogWg4g","fc":"#4F6877"},"619":{"t":[100.1,40.5],"p":"ABhC3IhNgBQgYADgxggQgvgegbAGQgIgkgOgjQgNghgLgPQgFiEBjgrQAxgVAxAGQAhgBAzCCQAqBnAdB8QgUAHgyAAIgHAAg","fc":"#91B1CE"},"620":{"t":[72.5,92.9],"p":"AhMADQAIgEAPgFQAXgJAcgCQAYgDAbAFQAaAEAVALQgbgDgXgBQgZgBgWACQgZACgXAEIgXAGQgPAFgIAFQAFgIAOgIg","fc":"#1D2226"},"621":{"t":[72.5,92.8],"p":"AhMADQAIgEAPgEQAXgKAcgCQAYgCAbAEQAaAEAVALQgbgDgXgBQgZgBgWACQgZACgXAEIgXAGQgPAFgIAEQAFgHAOgIg","fc":"#1D2226"},"622":{"t":[72.5,92.8],"p":"AhMADQAIgDAPgFQAXgJAcgCQAYgCAbADQAaAEAVALQgbgDgXgBQgZgBgWADQgZACgXACIgYAHQgOAFgIAEQAFgHAOgIg","fc":"#1D2226"},"623":{"t":[72.5,92.7],"p":"AhMADQAIgDAPgFQAXgJAcgCQAYgCAbAEQAaADAVALQgbgDgXgBQgZgBgWADQgZACgXACIgYAHQgOAFgIAEQAFgHAOgIg","fc":"#1D2226"},"624":{"t":[72.5,92.8],"p":"AhMADQAIgDAPgFQAXgJAcgCQAYgCAbAEQAaADAVALQgbgDgXgBQgZgBgWADQgZABgXADIgXAHQgPAFgIAEQAFgHAOgIg","fc":"#1D2226"},"625":{"t":[72.5,92.8],"p":"AhMADQAIgDAPgFQAXgJAcgCQAYgCAbAEQAaADAVALQgbgDgXgBQgZgBgWADQgZABgXAEIgXAGQgPAFgIAEQAFgHAOgIg","fc":"#1D2226"},"626":{"t":[72.6,92.9],"p":"AhQADQAJgDAPgFQAZgJAdgCQAZgCAcADQAcAEAVALQgcgEgYAAQgZgBgYADQgaABgYAEIgZAGQgPAFgIAEQAFgHAOgIg","fc":"#1D2226"},"627":{"t":[72.6,93],"p":"AhUAEQALgEAOgFQAcgJAcgCQAcgCAdADQAdADAVALQgdgEgZABQgagBgZACQgcACgYAEIgaAGQgQAFgJAEQAFgHAPgHg","fc":"#1D2226"},"628":{"t":[72.3,93],"p":"AhGADQAIgDANgGQAWgJAZgCQAWgCAYAEQAZAEATALQgZgEgVAAQgWgBgUACQgYACgVAEIgWAGIgUAJQAEgHANgIg","fc":"#1D2226"},"629":{"t":[71.9,92.9],"p":"Ag5ADQAHgEAKgFQASgJAUgDQASgBATAFQAUAFAQAKQgUgDgRgBQgSgBgQABQgUADgRADIgRAHQgMAFgEAEQADgHAKgJg","fc":"#1D2226"},"630":{"t":[72.1,92.9],"p":"Ag+ADQAHgDAMgGQATgJAWgCQATgCAWAFQAVAFARAJQgVgCgTgBQgUgBgRACQgVACgTADIgTAHQgMAFgFAEQADgHALgJg","fc":"#1D2226"},"631":{"t":[72.3,92.9],"p":"AhDADQAIgEAMgFQAVgJAXgCQAWgCAXAEQAXAFASAKQgXgDgUgBQgWAAgSABQgXACgUAEIgUAGQgNAGgHAEQAEgHAMgJg","fc":"#1D2226"},"632":{"t":[72.4,92.8],"p":"AhHADQAIgDANgFQAWgKAagCQAXgCAYAEQAZAFAUAKQgZgDgWgBQgXgBgVADQgYABgVAEIgWAGQgOAGgHAEQAFgHANgJg","fc":"#1D2226"},"633":{"t":[72.5,92.8],"p":"AhMADQAIgEAPgEQAXgKAcgCQAYgCAbAEQAaAEAVALQgbgEgXgBQgZAAgWACQgZACgXADIgXAHQgPAFgIAEQAFgHAOgIg","fc":"#1D2226"},"634":{"t":[72.4,92.8],"p":"AhJADQAJgDANgFQAXgKAagCQAXgCAZAEQAaAEATALQgZgDgWgBQgYgBgVADQgYABgWAEIgWAGQgOAGgHAEQAEgHANgJg","fc":"#1D2226"},"635":{"t":[72.3,92.9],"p":"AhFADQAIgEAMgFQAWgJAZgCQAWgCAYAEQAYAFASAKQgXgDgWgBQgWgBgTADQgYABgUAEIgWAGQgNAGgHAEQAFgHAMgJg","fc":"#1D2226"},"636":{"t":[72.1,92.9],"p":"AhCADQAIgEAMgFQAUgJAYgDQAUgCAXAFQAXAFASAKQgXgDgUgBQgVgBgTACQgWACgTAEIgUAHQgNAFgGAEQADgHAMgJg","fc":"#1D2226"},"637":{"t":[72,93],"p":"Ag+ADQAHgEALgFQATgKAXgCQATgCAWAFQAVAFASALQgWgDgUgBQgTgCgRACQgWACgSAEIgTAHQgMAFgGAFQAEgIALgJg","fc":"#1D2226"},"638":{"t":[71.9,93],"p":"Ag6ADQAGgEALgGQASgJAVgDQASgBAUAFQAVAFAQALQgUgDgTgBQgSgCgRACQgTACgSAEIgRAHQgMAFgFAFQADgIALgJg","fc":"#1D2226"},"639":{"t":[72,93],"p":"Ag+ADQAIgEALgFQATgKAWgCQATgCAVAFQAWAFARALQgWgDgTgBQgTgCgSACQgUACgTAEIgSAHQgNAFgFAFQADgIALgJg","fc":"#1D2226"},"640":{"t":[72.1,92.9],"p":"AhAADQAHgEAMgFQAUgJAXgDQAUgCAXAFQAWAFASALQgXgDgUgBQgUgCgTADQgVABgTAEIgUAHQgNAFgGAFQAEgIAMgJg","fc":"#1D2226"},"641":{"t":[72.2,92.9],"p":"AhDADQAHgEANgFQAVgJAYgDQAVgCAXAFQAYAFATAKQgYgDgUgBQgWgBgUACQgWACgVAEIgUAGQgNAGgGAEQAEgHAMgJg","fc":"#1D2226"},"642":{"t":[72.3,92.9],"p":"AhHADQAJgEANgFQAWgJAZgCQAWgCAYAEQAZAEATALQgYgDgWgBQgXgBgUACQgXACgWAEIgUAGQgPAGgGAEQAEgHAMgJg","fc":"#1D2226"},"643":{"t":[72.4,92.8],"p":"AhJADQAIgDAOgFQAXgKAagCQAXgCAaAEQAZAEAUALQgagDgWgBQgXgBgWADQgYABgWAEIgWAGIgWAKQAFgHANgJg","fc":"#1D2226"}},"containers":{"R_Leg":{"c":["7","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1","0"],"b":[-5.3,-11.4,22.5,27.7]},"R_Heand":{"c":["20","19","18","17"],"b":[20.5,12.4,23.3,34.6]},"L_Sholder":{"c":["24","23","22","21"],"b":[-5,1,28.7,23.2]},"L_Heand":{"c":["28","27","26","25"],"b":[9.7,13.6,31.2,39.1]},"head":{"c":["44","43","42","41","40","39","38","37","36","35","34","33","32","31","30","29"],"b":[14.8,0,63.1,60.1]},"Body_01":{"c":["47","46","45"],"b":[1.4,5.1,52.3,51.6]},"Belt_01":{"c":["55","54","53","52","51","50","49","48"],"b":[24.8,11,45,19.6]},"Axe":{"c":["65","64","63","62","61","60","59","58","57","56"],"b":[80.3,36.8,91.6,41.4]},"Armor":{"c":["85","84","83","82","81","80","79","78","77","76","75","74","73","72","71","70","69","68","67","66"],"b":[0,7.6,54.5,61.1]},"enemy_small_die:R_Leg":{"c":["102","101","100","99","98","97","96","95","94","93","92","91","90"],"b":[-4.9,-11.6,22.5,27.7]},"enemy_small_die:R_Heand":{"c":["106","105","104","103"],"b":[18.4,11.3,23.6,34.6]},"enemy_small_die:L_Sholder":{"c":["110","109","108","107"],"b":[-2,6,28.7,23.2]},"enemy_small_die:L_Heand":{"c":["114","113","112","111"],"b":[10.8,17.6,27.7,39.4]},"enemy_small_die:Body_01":{"c":["117","116","115"],"b":[1.5,5.3,52.3,51.6]},"enemy_small_die:Belt_01":{"c":["125","124","123","122","121","120","119","118"],"b":[24,10.9,48.9,19.7]},"enemy_small_move_back:R_Leg":{"c":["133","132","131","130","129","128","127","126"],"b":[8.7,-7.1,22.4,27.6]},"enemy_small_move_back:R_Heand":{"c":["137","136","135","134"],"b":[16.9,12.4,27.2,36.4]},"enemy_small_move_back:L_Sholder":{"c":["141","140","139","138"],"b":[-3.1,5.7,24.4,24.2]},"enemy_small_move_back:L_Heand":{"c":["145","144","143","142"],"b":[3.3,19.5,27.2,36.4]},"enemy_small_move_back:head":{"c":["155","154","153","152","151","150","149","148","147","146"],"b":[0,0,67.9,60.4]},"enemy_small_move_back:Body_01":{"c":["163","162","161","160","159","158","157","156"],"b":[13.6,-3,52.2,51.6]},"belt":{"c":["167","166","165","164"],"b":[15.8,13,48.9,19.8]},"enemy_small_move_back:Armor":{"c":["187","186","185","184","183","182","181","180","179","178","177","176","175","174","173","172","171","170","169","168"],"b":[0,0,67.5,61.3]},"enemy_small_move_fore:R_Heand":{"c":["191","190","189","188"],"b":[17.2,17.9,22.9,33.9]},"enemy_small_move_fore:L_Heand":{"c":["195","194","193","192"],"b":[6.1,20.2,22.8,33.9]},"enemy_small_move_fore:head":{"c":["155","208","207","152","206","205","204","148","203","202","201","200","199","198","197","196"],"b":[0,0.1,68.1,60.3]},"Body":{"c":["214","213","212","211","210","209"],"b":[13.8,-3.3,52.2,51.6]},"enemy_small_move_fore:belt":{"c":["221","220","219","218","217","216","215"],"b":[14.5,12.3,48.9,19.8]},"enemy_small_move_side:R_Leg":{"c":["234","233","232","231","230","229","228","227","226","225","224","223","222"],"b":[7.2,-8.7,22.5,27.7]},"enemy_small_move_side:L_Sholder":{"c":["238","237","236","235"],"b":[-2.7,6.3,28.7,23.2]},"enemy_small_move_side:L_Heand":{"c":["242","241","240","239"],"b":[5.6,28.6,24.7,37]},"enemy_small_move_side:Body_01":{"c":["245","244","243"],"b":[-2.8,-3.3,52.3,51.6]},"enemy_small_move_side:Belt_01":{"c":["252","251","250","249","248","247","246"],"b":[28.4,9.1,48.9,19.7]},"Rforearm":{"c":["261","260","259","258","257","256","255","254","253"],"b":[0,0,27.3,39.4]},"Reye":{"c":["263","262"],"b":[0,0,12,5.8]},"nose":{"c":["264"],"b":[0,0,16.9,6.4]},"mouth":{"c":["265"],"b":[0,0,16.2,3.7]},"Lshoulder":{"c":["269","268","267","266"],"b":[0,0,27.7,27.5]},"Lforearm":{"c":["277","276","275","274","273","272","271","270"],"b":[0,0,27.2,39.4]},"Leye":{"c":["279","278"],"b":[0,0,12,5.8]},"portrait:head":{"c":["289","288","287","286","285","284","283","282","281","280"],"b":[0,0.1,77.5,68.7]},"body":{"c":["325","324","323","322","321","320","319","318","317","316","315","314","313","312","311","310","309","308","307","306","305","304","303","302","301","300","299","298","297","296","295","294","293","292","291","290"],"b":[0.1,0,79.9,95]},"Symbol1":{"c":[],"b":[0,0,63.7,75.5]},"Nouse_3":{"c":["328","327","326"],"b":[0,0,25.8,10.1]},"FAce_3":{"c":["342","341","340","339","338","337","336","335","334","333","332","331","330","329"],"b":[0,0,83.4,99.9]},"Eye_black":{"c":["346","345","344","343"],"b":[0,0,62,70]},"Eye_3":{"c":["349","348","347"],"b":[0,0,17.6,10.8]},"Ear1":{"c":["353","352","351","350"],"b":[0,0,21.5,19.7]},"Ear":{"c":["357","356","355","354"],"b":[0,0,22.5,18.6]},"Body_3":{"c":["418","417","416","415","414","413","412","411","410","409","408","407","406","405","404","403","402","401","400","399","398","397","396","395","394","393","392","391","390","389","388","387","386","385","384","383","382","381","380","379","378","377","376","375","374","373","372","371","370","369","368","367","366","365","364","363","362","361","360","359","358"],"b":[0,0,123.5,60.9]},"HelmT":{"c":["545","544","543","542","541","540","539","538","537","536","535","534","533","532","531","530","529","528","527","526","525","524","523","522","521","520","519","518","517","516","515","514","513","512","511","510","509","508","507","506","505","504","503","502","501"],"b":[0,0,121.2,72.9]},"Face_26_JSCC:FAce_3":{"c":["568","567","566","565","564","563","562","561","560","559","558","557","556","555","554","553","552","551","550","549","548","547","546"],"b":[3,0,80.1,100]},"Face_26_JSCC:Body_3":{"c":["619","618","617","616","615","614","613","612","611","610","609","608","607","606","605","604","603","602","601","600","599","598","597","596","595","594","593","592","591","590","589","588","587","586","585","584","583","582","581","580","579","578","577","576","575","574","573","572","571","570","569"],"b":[0.8,0.8,135.7,58.9]}},"animations":{"enemy_small_attack":{"shapes":[{"bn":"shape","gn":"86"},{"bn":"shape_1","gn":"87"},{"bn":"shape_2","gn":"88"},{"bn":"shape_3","gn":"89"}],"containers":[{"bn":"instance","t":[292.6,227.1,1,1,0,0,0,46.2,30],"gn":"head"},{"bn":"instance_1","t":[288.2,273.8,1,1,-5.9,0,0,14.6,63.2],"gn":"Armor"},{"bn":"instance_2","t":[261,258.3,1,1,0,0,180,12.2,18.6],"gn":"L_Sholder"},{"bn":"instance_3","t":[255,249.4,1,1,-21.4,0,0,35.1,10.3],"gn":"R_Heand"},{"bn":"instance_4","t":[279.4,286.3,1,1,0,0,0,40.8,26.9],"gn":"Belt_01"},{"bn":"instance_5","t":[296.3,275,1,1,0,0,0,41.7,48.5],"gn":"Body_01"},{"bn":"instance_6","t":[298.9,255.7,1,1,17.7,0,0,7.5,51.4],"gn":"L_Heand"},{"bn":"instance_7","t":[309.5,250.1,1,1,-27.6,0,0,11.2,16.1],"gn":"L_Sholder"},{"bn":"instance_8","t":[316.4,214.7,1,1,42.9,0,0,136.6,56.6],"gn":"Axe"},{"bn":"instance_9","t":[286.2,290.2,1,1.069,0,-16.4,180,19.4,8.3],"gn":"R_Leg"},{"bn":"instance_10","t":[281.2,299.3,1,1.086,0,27.9,17,19.6,7.9],"gn":"R_Leg"}],"animations":[],"tweens":[[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape"}]},7]},{"n":"to","a":[{"state":[{"t":"shape_1"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_2"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3"}]},1]},{"n":"to","a":[{"state":[]},1]},{"n":"wait","a":[7]}],[{"n":"get","a":["instance"]},{"n":"to","a":[{"x":289.2,"y":224.5},4]},{"n":"to","a":[{"x":294.3,"y":230.6},3]},{"n":"to","a":[{"x":294.9,"y":225.3},3]},{"n":"to","a":[{"x":293.7,"y":229.8},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"rotation":-11,"x":288.3,"y":271.5},4]},{"n":"to","a":[{"rotation":-3,"x":287,"y":276.6},3]},{"n":"to","a":[{"rotation":-3,"y":273.6},3]},{"n":"to","a":[{"rotation":-5.8,"x":288.2,"y":273.8},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"regY":18.7,"skewX":-13.4,"skewY":166.4,"x":262.2,"y":259.4},4]},{"n":"to","a":[{"skewX":18.3,"skewY":198.4,"x":261.2,"y":256.4},3]},{"n":"to","a":[{"regY":18.6,"skewX":12.9,"skewY":193,"x":258.7,"y":252.3},3]},{"n":"to","a":[{"skewX":0,"skewY":180,"x":261,"y":258.3},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"rotation":-23,"x":257,"y":252},4]},{"n":"to","a":[{"rotation":-2.8,"x":259.5,"y":245.6},3]},{"n":"to","a":[{"rotation":-8.8,"x":255.3,"y":241.7},3]},{"n":"to","a":[{"rotation":-21.3,"x":255,"y":249.4},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"regX":40.6,"scaleX":1,"scaleY":1.01,"skewX":-7.2,"skewY":-4.1,"x":281.3,"y":284.5},4]},{"n":"to","a":[{"regX":40.8,"scaleX":1.04,"scaleY":0.94,"skewX":-3.2,"skewY":0,"x":278.9,"y":288},3]},{"n":"to","a":[{"scaleX":1,"scaleY":1.01,"skewX":-6.1,"x":279,"y":286.3},3]},{"n":"to","a":[{"scaleY":1,"skewX":0,"x":279.4},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"scaleY":1.03,"skewX":-0.4,"x":295.8,"y":273.5},4]},{"n":"to","a":[{"regX":41.8,"scaleX":0.95,"scaleY":0.98,"skewY":4.6,"x":296.5,"y":277.6},3]},{"n":"to","a":[{"regX":41.7,"scaleX":1,"scaleY":1.03,"skewY":0,"x":295.8,"y":274},3]},{"n":"to","a":[{"scaleY":1,"skewX":0,"x":296.3,"y":275},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"regX":7.7,"regY":51.5,"rotation":9.1,"x":298.1,"y":252.6},4]},{"n":"to","a":[{"regX":7.6,"regY":51.4,"scaleX":1,"scaleY":1,"rotation":34.6,"x":297.5,"y":247.1},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":88.2,"x":306.3,"y":240.3},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":141.6,"x":315.3,"y":245.3},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"x":315.1,"y":244},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"y":241.2},2]},{"n":"to","a":[{"regX":7.5,"regY":51.5,"rotation":116,"x":310.3,"y":238.5},1]},{"n":"to","a":[{"regX":7.6,"scaleX":1,"scaleY":1,"rotation":55.7,"x":300.8,"y":241.4},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":32.9,"x":296.5,"y":249.7},1]},{"n":"to","a":[{"regX":7.7,"regY":51.6,"rotation":21.3,"x":297,"y":252},1]},{"n":"wait","a":[4]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"rotation":-64.5,"x":307.4,"y":249.3},4]},{"n":"to","a":[{"regY":16,"scaleX":1,"scaleY":1,"rotation":-35.4,"x":306.2,"y":249},1]},{"n":"to","a":[{"regY":16.1,"scaleX":1,"scaleY":1,"rotation":-6.3,"x":305,"y":248.9},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":22.5,"x":307.8,"y":254.2},1]},{"n":"to","a":[{"x":306.8,"y":250.5},3]},{"n":"to","a":[{"rotation":0.7,"x":309.7,"y":249.8},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-31.9,"x":306.2,"y":248.2},1]},{"n":"to","a":[{"rotation":-51.5,"x":306.9,"y":248.9},3]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-27.5,"x":309.5,"y":250.1},2]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":39.6,"x":313,"y":211.1},1]},{"n":"to","a":[{"rotation":36.3,"x":311.3,"y":210.4},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":29.7,"x":307.6,"y":209},2]},{"n":"to","a":[{"regX":136.4,"regY":56.8,"scaleX":1,"scaleY":1,"rotation":54.6,"x":324.4,"y":211.7},1]},{"n":"to","a":[{"regX":136.3,"regY":56.6,"scaleX":1,"scaleY":1,"rotation":107.6,"x":350.9,"y":239.7},1]},{"n":"to","a":[{"regX":136.4,"regY":56.8,"scaleX":1,"scaleY":1,"rotation":153.1,"x":343,"y":276.9},1]},{"n":"to","a":[{"regY":56.7,"scaleX":1,"scaleY":1,"rotation":160.9,"x":342.2,"y":277.2},1]},{"n":"to","a":[{"regY":56.8,"scaleX":1,"scaleY":1,"rotation":157.8,"x":342,"y":273.9},2]},{"n":"to","a":[{"regX":136.3,"regY":56.7,"scaleX":1,"scaleY":1,"rotation":150.6,"x":349.4,"y":264.6},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":77.4,"x":339.3,"y":218},1]},{"n":"to","a":[{"regX":136.2,"scaleX":1,"scaleY":1,"rotation":55.5,"x":322.5,"y":212.5},1]},{"n":"to","a":[{"regX":136.3,"regY":56.8,"scaleX":1,"scaleY":1,"rotation":47.4,"x":314.7,"y":212.2},1]},{"n":"wait","a":[4]}],[{"n":"get","a":["instance_9"]},{"n":"to","a":[{"regX":19.6,"regY":8.2,"scaleY":0.94,"skewX":-20.8,"skewY":159,"x":285.8,"y":289.7},4]},{"n":"to","a":[{"regX":18.9,"regY":8.3,"scaleY":0.99,"skewX":-16.3,"skewY":180,"x":287.5,"y":292.6},3]},{"n":"to","a":[{"regX":19.4,"scaleY":1.07,"x":286.2,"y":290.2},3]},{"n":"wait","a":[8]}],[{"n":"get","a":["instance_10"]},{"n":"to","a":[{"scaleY":1.15,"skewX":29.4,"x":283.8,"y":298.8},4]},{"n":"to","a":[{"regX":19.5,"scaleY":0.98,"skewX":29.1,"x":280.8,"y":300.2},3]},{"n":"to","a":[{"regX":19.6,"regY":8,"scaleX":1.12,"scaleY":1.11,"skewX":26.8,"x":281.3,"y":299.2},3]},{"n":"to","a":[{"regX":19.5,"scaleX":1.02,"scaleY":1.12,"skewX":28.9,"x":281.8,"y":299.3},7]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"wait","a":[18]}]],"graphics":[],"bounds":[242.2,161.9,113.6,152.8],"frameBounds":[[242.2,161.9,113.6,152.8],[243.3,160.1,109.4,154.6],[243.8,161.1,107.6,153.6],[244,158.3,107.6,156.4],[244.3,163.9,103.7,150.8],[240.5,154.4,120.8,160.3],[237.1,179.8,149.6,134.9],[245,162.6,157.2,152.1],[243.7,164.3,158,150.4],[242.4,166,160,148.7],[241.2,167.7,160.3,147],[241.2,196,166.8,118.7],[241.2,159.1,125.3,155.6],[241.2,155.2,117.8,159.5],[241.3,157.5,112.2,157.2],[242.2,157.5,111.3,157.2]]},"enemy_small_die":{"shapes":[],"containers":[{"bn":"instance","t":[287.8,229.4,1,1,0,0,0,46.2,30],"gn":"head"},{"bn":"instance_1","t":[263,260.4,1,1,0,-11.4,168.5,12.2,18.6],"gn":"enemy_small_die:L_Sholder"},{"bn":"instance_2","t":[258.2,257.9,1,1,-21.4,0,0,35.1,10.3],"gn":"enemy_small_die:R_Heand"},{"bn":"instance_3","t":[283.6,277.3,1,1,0,0,0,14.1,62.6],"gn":"Armor"},{"bn":"instance_4","t":[278.1,289.5,0.954,1,0,0,0,40.8,26.9],"gn":"enemy_small_die:Belt_01"},{"bn":"instance_5","t":[297.2,277,1,1,0,0,0,41.7,48.5],"gn":"enemy_small_die:Body_01"},{"bn":"instance_6","t":[311.1,250.3,1,1,134.8,0,0,7.6,51.5],"gn":"enemy_small_die:L_Heand"},{"bn":"instance_7","t":[300.4,254.5,1,1,17.5,0,0,11.2,16.1],"gn":"enemy_small_die:L_Sholder"},{"bn":"instance_8","t":[284.7,301.8,1.1,1.066,17,0,0,19.6,7.9],"gn":"enemy_small_die:R_Leg"},{"bn":"instance_9","t":[287.7,295.1,1,1.069,0,-16.4,180,19.4,8.3],"gn":"enemy_small_die:R_Leg"}],"animations":[],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"rotation":-61.8,"x":243.7,"y":230},1]},{"n":"to","a":[{"regY":29.9,"rotation":-63.8,"x":237.9,"y":230.2},2]},{"n":"to","a":[{"regX":46.3,"regY":30,"rotation":-98.8,"x":218.2,"y":298.6},4]},{"n":"to","a":[{"regX":46.2,"rotation":-113.8,"x":219.9,"y":294.7},1]},{"n":"to","a":[{"x":219.5,"y":298.1},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"skewX":-79,"skewY":100.8,"x":255,"y":265.7},3]},{"n":"to","a":[{"regX":12.1,"regY":18.7,"skewX":-132.3,"skewY":47.5,"x":262.3,"y":307.9},4]},{"n":"to","a":[{"regX":12.2,"skewX":-141,"skewY":38.8,"x":261.4,"y":306.7},1]},{"n":"to","a":[{"regX":12.1,"skewX":-132.3,"skewY":47.5,"x":262.3,"y":307.9},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"rotation":-101.2,"x":248.2,"y":269.8},3]},{"n":"to","a":[{"regX":34.9,"regY":10.4,"rotation":-100.8,"x":261.8,"y":307.5},4]},{"n":"to","a":[{"regY":10.5,"rotation":-95.6,"x":260.1,"y":305},1]},{"n":"to","a":[{"regY":10.4,"rotation":-100.8,"x":261.8,"y":307.5},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-61.6,"x":279.5,"y":254.5},1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"rotation":-64.5,"x":278.7,"y":256.2},2]},{"n":"to","a":[{"regX":14.2,"rotation":-116.5,"x":268,"y":285.2},4]},{"n":"to","a":[{"rotation":-114.3,"y":284.7},1]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-116.5,"y":285.2},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"regX":40.9,"regY":26.8,"scaleX":1,"rotation":-70.1,"x":289.4,"y":262},3]},{"n":"to","a":[{"regX":40.8,"regY":26.7,"scaleX":0.85,"rotation":-93.1,"x":281.4,"y":293.1},4]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.78,"x":281.5,"y":294.3},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"regY":48.6,"rotation":-51.8,"x":286.1,"y":247.8},3]},{"n":"to","a":[{"regX":41.5,"regY":48.7,"scaleX":0.94,"scaleY":1,"rotation":0,"skewX":-85.4,"skewY":-83.2,"x":272.5,"y":283.3},4]},{"n":"to","a":[{"x":272.2,"y":279},1]},{"n":"to","a":[{"x":272.5,"y":283.3},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"regX":7.5,"regY":51.4,"rotation":52.6,"x":267.6,"y":224.2},3]},{"n":"to","a":[{"rotation":63.5,"x":228.4,"y":271.5},4]},{"n":"wait","a":[3]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"rotation":-46.3,"x":272.3,"y":232.7},3]},{"n":"to","a":[{"regX":11.3,"rotation":-63.5,"x":239.2,"y":285.5},4]},{"n":"wait","a":[3]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"regX":19.5,"regY":8,"scaleX":1,"scaleY":1.07,"rotation":0,"skewX":-71.2,"skewY":-74.7,"x":299.5,"y":256.3},3]},{"n":"to","a":[{"regX":19.1,"regY":8.1,"scaleX":0.99,"scaleY":1.28,"skewX":-76.2,"skewY":-79.5,"x":295.5,"y":286.5},4]},{"n":"to","a":[{"regX":19.2,"skewX":-67,"skewY":-70.3,"x":296.1,"y":288.6},1]},{"n":"to","a":[{"regX":19.1,"skewX":-76.2,"skewY":-79.5,"x":295.5,"y":286.5},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_9"]},{"n":"to","a":[{"regX":19.5,"scaleY":1.03,"skewX":-91.7,"skewY":92.1,"x":303.3,"y":258.5},3]},{"n":"to","a":[{"regX":19.4,"regY":8.2,"skewX":-86.3,"skewY":97.5,"x":286.6,"y":294},4]},{"n":"to","a":[{"skewX":-77,"skewY":106.7,"x":285.9,"y":296.2},1]},{"n":"to","a":[{"skewX":-86.3,"skewY":97.5,"x":286.6,"y":294},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"wait","a":[10]}]],"graphics":[],"bounds":[243,199.4,90,115.3],"frameBounds":[[243,199.4,90,115.3],[202.4,188,120.1,126.7],[201.4,195.8,119.8,118.9],[197.3,188.6,123.9,126.1],[189.9,205.4,131.3,109.3],[181.3,212.9,139.9,102.7],[173.8,223.4,147.4,108.2],[183.7,246.5,137.5,88],[179.7,245.6,141.5,90.1],[179.3,246.5,141.9,92.6]]},"enemy_small_move_back":{"shapes":[],"containers":[{"bn":"instance","t":[272.2,248.8,1,1,0,0,180,33.7,30.7],"gn":"enemy_small_move_back:Armor"},{"bn":"instance_1","t":[241,261.6,1,1,0,-9.6,170.3,25.7,27.6],"gn":"enemy_small_move_back:L_Sholder"},{"bn":"instance_2","t":[330.1,250.5,0.95,0.928,0,-12.3,-10.6,25.7,27.6],"gn":"enemy_small_move_back:L_Sholder"},{"bn":"instance_3","t":[286,283.7,1.001,0.999,0,-2.3,-2.9,40.3,26.9],"gn":"belt"},{"bn":"instance_4","t":[285,282,1,0.943,0,0,0,40.4,48.5],"gn":"enemy_small_move_back:Body_01"},{"bn":"instance_5","t":[284.8,219.4,1,1,0,0,0,34,30.2],"gn":"enemy_small_move_back:head"},{"bn":"instance_6","t":[298.5,294.5,1,0.74,0,0,180,19.5,19.7],"gn":"enemy_small_move_back:R_Leg"},{"bn":"instance_7","t":[273.2,302.4,1,1.077,0,-7.8,0,19.5,19.7],"gn":"enemy_small_move_back:R_Leg"},{"bn":"instance_8","t":[324.8,261.8,1,1,-9.3,0,0,26.2,33.3],"gn":"enemy_small_move_back:L_Heand"},{"bn":"instance_9","t":[258.1,253.4,0.902,0.897,-7.4,0,0,33,14.7],"gn":"enemy_small_move_back:R_Heand"}],"animations":[],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"y":244.8},3]},{"n":"to","a":[{"y":249.4},2]},{"n":"to","a":[{"y":245.6},3]},{"n":"to","a":[{"y":248.4},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"skewX":0,"skewY":180,"x":238.5,"y":250.7},3]},{"n":"to","a":[{"scaleX":0.95,"scaleY":0.98,"skewX":10.9,"skewY":191,"x":239.3,"y":254},2]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":0,"skewY":180,"x":238.5,"y":251.3},3]},{"n":"to","a":[{"x":238.3,"y":255.8},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":0,"skewY":0,"x":330.9,"y":250.7},3]},{"n":"to","a":[{"y":255.7},2]},{"n":"to","a":[{"rotation":-9.9,"x":330.7,"y":247.1},3]},{"n":"to","a":[{"regX":25.6,"rotation":-7,"x":330.4,"y":252.4},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"regX":40.4,"skewX":-0.7,"skewY":-1,"x":285.4,"y":281.7},3]},{"n":"to","a":[{"regX":40.5,"scaleX":1,"skewY":1.8,"x":285.5,"y":283.1},2]},{"n":"to","a":[{"scaleX":1,"skewX":-0.6,"skewY":-0.1,"x":285.6,"y":281.6},3]},{"n":"to","a":[{"regY":27.1,"skewX":-0.7,"skewY":-1,"x":285.5,"y":283.9},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"scaleY":0.98,"y":278.1},3]},{"n":"to","a":[{"scaleY":0.96,"y":281.1},1]},{"n":"to","a":[{"scaleY":0.94,"y":282},1]},{"n":"to","a":[{"scaleY":0.98,"y":278.1},3]},{"n":"to","a":[{"scaleY":0.96,"y":281.1},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"y":214.9},3]},{"n":"to","a":[{"y":218.7},1]},{"n":"to","a":[{"y":221.7},1]},{"n":"to","a":[{"y":213.7},3]},{"n":"to","a":[{"y":219.7},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"regX":19.4,"regY":19.6,"scaleY":0.89,"skewX":6.3,"x":297.6,"y":296.7},3]},{"n":"to","a":[{"scaleY":1.07,"skewX":8.9,"x":295.6,"y":302.5},2]},{"n":"to","a":[{"scaleY":0.84,"skewX":0,"x":298.6,"y":296},3]},{"n":"to","a":[{"regX":19.5,"scaleY":0.76,"x":298.5,"y":296.5},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"scaleY":0.86,"skewX":0,"x":270.5,"y":295},3]},{"n":"to","a":[{"scaleY":0.76,"y":294.5},2]},{"n":"to","a":[{"regX":19.4,"regY":19.6,"scaleY":0.95,"skewX":-2.9,"x":272.5,"y":297.1},3]},{"n":"to","a":[{"regX":19.5,"regY":19.7,"scaleY":1.07,"skewX":-10.7,"x":274.1,"y":301},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"scaleY":0.92,"rotation":0,"x":323.6,"y":259.7},3]},{"n":"to","a":[{"regY":33.2,"scaleX":0.92,"scaleY":0.87,"skewX":22.6,"skewY":19.6,"x":320.7,"y":264.8},2]},{"n":"to","a":[{"regY":33.3,"scaleX":1,"scaleY":1,"rotation":-5,"skewX":0,"skewY":0,"x":324.8,"y":257.6},3]},{"n":"to","a":[{"regY":33.4,"scaleX":0.97,"rotation":-12.7,"x":324.9,"y":261.9},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_9"]},{"n":"to","a":[{"regX":32.9,"scaleX":1,"scaleY":1,"rotation":1.8,"x":258.7,"y":245.8},3]},{"n":"to","a":[{"regX":33,"rotation":18.5,"x":260.3,"y":254.1},2]},{"n":"to","a":[{"regX":32.9,"scaleX":1,"scaleY":1,"rotation":10.7,"x":259.3,"y":250.2},3]},{"n":"to","a":[{"regX":33,"scaleX":0.93,"scaleY":0.9,"rotation":2.3,"x":257.8,"y":253.4},1]},{"n":"wait","a":[2]}],[{"n":"get","a":[null]},{"n":"wait","a":[11]}]],"graphics":[],"bounds":[238.5,189.2,94.2,125.5],"frameBounds":[[238.5,189.2,94.2,125.5],[238.5,187.7,94.6,127],[238.5,186.2,95,128.5],[238.5,184.7,89.4,130],[237.6,188.5,91,126.2],[234.2,191.5,94.7,123.2],[233.5,188.8,100,125.9],[233,186.1,105.1,128.6],[237.2,183.5,93.8,131.2]]},"enemy_small_move_fore":{"shapes":[],"containers":[{"bn":"instance","t":[284.3,222.4,1,1,0,0,0,34,30.2],"gn":"enemy_small_move_fore:head"},{"bn":"instance_1","t":[241.3,264.9,1,1,0,-9.6,170.3,25.7,27.6],"gn":"enemy_small_move_back:L_Sholder"},{"bn":"instance_2","t":[253.9,251.8,1,1,-32.3,0,0,33,14.7],"gn":"enemy_small_move_fore:R_Heand"},{"bn":"instance_3","t":[295.2,248.3,1,1,0,0,0,33.7,30.7],"gn":"enemy_small_move_back:Armor"},{"bn":"instance_4","t":[328.2,254.9,0.95,0.928,0,-12.3,-10.6,25.7,27.6],"gn":"enemy_small_move_back:L_Sholder"},{"bn":"instance_5","t":[323.2,265.4,0.879,0.911,0,5.5,5,26.1,33.5],"gn":"enemy_small_move_fore:L_Heand"},{"bn":"instance_6","t":[286,283.7,1.001,0.999,0,-2.3,-2.9,40.3,26.9],"gn":"enemy_small_move_fore:belt"},{"bn":"instance_7","t":[285,282,1,0.943,0,0,0,40.4,48.5],"gn":"Body"},{"bn":"instance_8","t":[298.5,294.5,1,0.74,0,0,180,19.5,19.7],"gn":"enemy_small_move_back:R_Leg"},{"bn":"instance_9","t":[270.5,302.4,1,1.066,0,0,0,19.5,19.7],"gn":"enemy_small_move_back:R_Leg"}],"animations":[],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"x":283.6,"y":218.4},3]},{"n":"to","a":[{"x":285.3,"y":223.9},2]},{"n":"to","a":[{"x":283.9,"y":219},3]},{"n":"to","a":[{"x":284.3,"y":222.4},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"skewX":0,"skewY":180,"x":238.8,"y":254},3]},{"n":"to","a":[{"scaleX":0.95,"scaleY":0.98,"skewX":10.9,"skewY":191,"x":239.6,"y":257.3},2]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":0,"skewY":180,"x":238.8,"y":254.6},3]},{"n":"to","a":[{"x":238.5,"y":259.1},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"rotation":12.9,"x":259.3,"y":246.1},3]},{"n":"to","a":[{"regX":32.9,"regY":14.6,"scaleX":0.88,"scaleY":0.84,"rotation":-5,"x":255.9,"y":249.5},2]},{"n":"to","a":[{"regX":33,"regY":14.7,"scaleX":1,"scaleY":1,"rotation":-8.6,"x":255.1,"y":246.2},3]},{"n":"to","a":[{"rotation":-22.1,"x":254.3,"y":248.8},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"y":245.8},3]},{"n":"to","a":[{"y":248.3},2]},{"n":"to","a":[{"y":245.8},3]},{"n":"to","a":[{"y":247},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"skewX":0,"skewY":0,"x":329.1,"y":255.1},3]},{"n":"to","a":[{"y":260.1},2]},{"n":"to","a":[{"rotation":-9.9,"x":328.8,"y":251.5},3]},{"n":"to","a":[{"regX":25.6,"rotation":-7,"x":328.6,"y":256.8},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"regX":26.2,"regY":33.3,"scaleX":1,"scaleY":1,"skewX":0,"skewY":0,"x":322.8,"y":264.1},3]},{"n":"to","a":[{"regY":33.2,"rotation":23.2,"x":318.6,"y":269.1},2]},{"n":"to","a":[{"regY":33.3,"rotation":-5,"x":325.2,"y":260.8},3]},{"n":"to","a":[{"regX":26.1,"regY":33.2,"scaleX":0.96,"scaleY":0.98,"rotation":-3.3,"x":323.4,"y":264.2},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"regX":40.4,"skewX":-0.7,"skewY":-1,"x":285.4,"y":281.7},3]},{"n":"to","a":[{"regX":40.5,"scaleX":1,"skewY":1.8,"x":285.5,"y":283.1},2]},{"n":"to","a":[{"scaleX":1,"skewX":-0.6,"skewY":-0.1,"x":285.6,"y":281.6},3]},{"n":"to","a":[{"regY":27.1,"skewX":-0.7,"skewY":-1,"x":285.5,"y":283.9},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"scaleY":0.98,"y":278.1},3]},{"n":"to","a":[{"scaleY":0.96,"y":281.1},1]},{"n":"to","a":[{"scaleY":0.94,"y":282},1]},{"n":"to","a":[{"scaleY":0.98,"y":278.1},3]},{"n":"to","a":[{"scaleY":0.96,"y":281.1},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"scaleY":0.83,"skewX":-9.2,"x":302,"y":294.6},3]},{"n":"to","a":[{"regX":19.4,"regY":19.6,"scaleY":1.06,"skewX":-0.1,"x":298.7,"y":302.5},2]},{"n":"to","a":[{"regY":19.7,"scaleY":0.89,"skewX":0,"x":298.6,"y":296},3]},{"n":"to","a":[{"regX":19.5,"regY":19.6,"scaleY":0.83,"x":298.5,"y":296.4},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_9"]},{"n":"to","a":[{"regX":19.1,"scaleY":0.86,"skewX":4.8,"x":270.1,"y":295},3]},{"n":"to","a":[{"regX":19.5,"scaleY":0.76,"skewX":0,"x":270.5,"y":294.5},2]},{"n":"to","a":[{"regY":19.6,"scaleY":0.95,"skewX":3.3,"x":269.1,"y":296.7},3]},{"n":"to","a":[{"scaleY":1.05,"skewX":0,"x":270.5,"y":300.9},1]},{"n":"wait","a":[2]}],[{"n":"get","a":[null]},{"n":"wait","a":[11]}]],"graphics":[],"bounds":[242,192.2,87,122.5],"frameBounds":[[242,192.2,87,122.5],[234.1,190.9,94.9,123.8],[227.3,189.6,101.7,125.1],[235.6,188.2,93.4,126.5],[235.6,191,93.4,123.7],[242.4,193.7,86.6,121],[241.5,192.1,90.1,122.6],[240.1,190.5,96.5,124.2],[239.9,188.9,89.8,125.8]]},"enemy_small_move_side":{"shapes":[],"containers":[{"bn":"instance","t":[289.2,226.1,1,1,0,0,0,46.2,30],"gn":"head"},{"bn":"instance_1","t":[260.3,253.3,1,1,0,0,180,12.2,18.6],"gn":"enemy_small_move_side:L_Sholder"},{"bn":"instance_2","t":[260.5,244.8,1,1,-11.1,0,0,35,10.2],"gn":"enemy_small_move_fore:R_Heand"},{"bn":"instance_3","t":[297.6,244.3,1,1,0,0,0,29.1,34.3],"gn":"Armor"},{"bn":"instance_4","t":[270.6,286.3,1.012,1.003,0,4.6,2.5,40.9,26.9],"gn":"enemy_small_move_side:Belt_01"},{"bn":"instance_5","t":[302.1,282,1,0.948,0,0,0,41.7,48.5],"gn":"enemy_small_move_side:Body_01"},{"bn":"instance_6","t":[268,288,1,0.986,0,28.3,23.9,19.5,7.9],"gn":"enemy_small_move_side:R_Leg"},{"bn":"instance_7","t":[297.1,286,1,1.115,0,-23,180,19.5,8.2],"gn":"enemy_small_move_side:R_Leg"},{"bn":"instance_8","t":[304.3,272.4,1,1,-24.1,0,0,7.7,51.3],"gn":"enemy_small_move_side:L_Heand"},{"bn":"instance_9","t":[303.4,246.4,1,1,37.2,0,0,11.2,16.1],"gn":"enemy_small_move_side:L_Sholder"}],"animations":[],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"x":289.6,"y":220.5},3]},{"n":"to","a":[{"y":225.1},2]},{"n":"to","a":[{"x":288.9,"y":220.6},3]},{"n":"to","a":[{"y":222},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"regX":12.1,"skewX":-15,"skewY":164.8,"x":260.4,"y":251.6},3]},{"n":"to","a":[{"regX":12.2,"skewX":-22.3,"skewY":157.5,"x":264.7,"y":257.2},2]},{"n":"to","a":[{"regX":12.1,"regY":18.7,"skewX":-8.5,"skewY":171.3,"x":263.1,"y":251.4},3]},{"n":"to","a":[{"regX":12.2,"regY":18.6,"skewX":-7.2,"skewY":172.6,"x":262},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"regX":35.1,"regY":10.3,"rotation":-17.8,"x":260.3,"y":245.7},3]},{"n":"to","a":[{"rotation":-30.9,"x":261.7,"y":249.2},2]},{"n":"to","a":[{"rotation":-19.6,"x":261.5,"y":245.1},3]},{"n":"to","a":[{"regX":35,"rotation":-16,"x":261.4,"y":244.7},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"y":241.8},3]},{"n":"to","a":[{"y":245.1},2]},{"n":"to","a":[{"y":242.3},3]},{"n":"to","a":[{"y":243.6},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"regY":26.8,"scaleX":1.02,"scaleY":1,"skewX":-2.7,"skewY":3.5,"x":272.1,"y":284.5},3]},{"n":"to","a":[{"regX":40.7,"regY":26.9,"scaleX":1.03,"scaleY":1,"skewX":-5.6,"skewY":0,"x":274.1,"y":287.5},2]},{"n":"to","a":[{"regX":40.5,"scaleX":0.99,"scaleY":1,"skewX":-0.5,"skewY":4.1,"x":271.6,"y":284.8},3]},{"n":"to","a":[{"regX":41,"regY":26.8,"scaleX":1.04,"scaleY":1,"skewX":2.1,"skewY":4.3,"x":271.2,"y":284.7},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"scaleY":1,"y":279.5},3]},{"n":"to","a":[{"scaleY":0.95,"y":282},2]},{"n":"to","a":[{"scaleY":1,"y":279.5},3]},{"n":"to","a":[{"scaleY":0.97,"y":280.8},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"regX":19.4,"scaleY":0.79,"skewX":-6.9,"skewY":-3.3,"x":272.9,"y":287.6},3]},{"n":"to","a":[{"regX":19.5,"scaleY":0.97,"skewX":-12.5,"skewY":-3.3,"x":281.6,"y":290},2]},{"n":"to","a":[{"regX":19.6,"scaleX":0.98,"scaleY":0.98,"skewX":1.9,"skewY":0.8,"x":274.7,"y":290.3},3]},{"n":"to","a":[{"regX":19.4,"regY":7.8,"scaleX":0.93,"scaleY":1,"skewX":16.2,"skewY":9.1,"x":270.8,"y":290.5},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"scaleY":1.03,"skewX":6,"x":292.1},3]},{"n":"to","a":[{"scaleY":1.1,"skewX":21.1,"x":281.6,"y":286.5},2]},{"n":"to","a":[{"scaleY":0.8,"skewX":-2.1,"x":290.4,"y":284.7},3]},{"n":"to","a":[{"regX":19.6,"scaleY":0.97,"skewX":-14.3,"x":292.7,"y":286.1},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"regX":7.6,"regY":51.4,"rotation":-5.5,"x":294.9,"y":268.2},3]},{"n":"to","a":[{"regX":7.7,"rotation":-5.5,"x":288.3,"y":270.8},2]},{"n":"to","a":[{"rotation":-19.5,"x":301.8,"y":269.4},3]},{"n":"to","a":[{"regY":51.3,"rotation":-24,"x":304.3,"y":270.7},1]},{"n":"wait","a":[2]}],[{"n":"get","a":["instance_9"]},{"n":"to","a":[{"rotation":56.9,"x":303.6,"y":243.1},3]},{"n":"to","a":[{"rotation":61.7,"x":297.4,"y":244.8},2]},{"n":"to","a":[{"regY":16,"rotation":41.5,"x":303.6,"y":242.8},3]},{"n":"to","a":[{"regY":16.1,"rotation":37.2,"x":303.4,"y":244.7},1]},{"n":"wait","a":[2]}],[{"n":"get","a":[null]},{"n":"wait","a":[11]}]],"graphics":[],"bounds":[244.5,196.1,86.4,118.6],"frameBounds":[[244.5,196.1,86.4,118.6],[244.6,194.3,85.8,120.4],[244.6,192.4,85.4,122.3],[243.7,190.5,79.2,124.2],[245.6,192.8,77.3,121.9],[246.1,195.1,76.9,119.6],[244.7,193.6,79.4,121.1],[243.4,192.1,84,122.6],[246.1,190.6,81.7,124.1]]},"portrait":{"shapes":[],"containers":[{"bn":"instance_7","t":[31.9,63,1,1,0,0,0,31.9,37.7],"gn":"Symbol1"}],"animations":[{"bn":"instance","t":[49.3,56.1,0.97,0.97,0,0,0,7.5,1.9],"gn":"mouth","a":["synched",0]},{"bn":"instance_1","t":[48.7,50,1,1,0,0,0,8.4,3.1],"gn":"nose","a":["synched",0]},{"bn":"instance_2","t":[62.9,45.3,1,1,0,0,0,6,2.9],"gn":"Reye","a":["synched",0]},{"bn":"instance_3","t":[62.9,45.3,1,1,0,0,0,6,2.9],"gn":"Reye","a":["synched",0]},{"bn":"instance_4","t":[34.8,45.3,1,1,0,0,0,6,2.9],"gn":"Leye","a":["synched",0]},{"bn":"instance_5","t":[34.8,45.3,1,1,0,0,0,6,2.9],"gn":"Leye","a":["synched",0]},{"bn":"instance_6","t":[48.3,37.5,1,1,0,0,0,38.8,34.4],"gn":"head","a":["synched",0]},{"bn":"instance_8","t":[19,59.2,1,1,0,0,0,13.8,13.8],"gn":"Lshoulder","a":["synched",0]},{"bn":"instance_9","t":[57,77.3,1,1,0,0,0,40,47.5],"gn":"body","a":["synched",0]},{"bn":"instance_10","t":[85.1,81.1,1,1,0,0,0,13.6,19.7],"gn":"Rforearm","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":8.1,"scaleX":1.06,"scaleY":1.06,"rotation":-0.2,"x":49.7,"y":56.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.15,"scaleY":1.15,"rotation":-0.5,"x":49.6,"y":56.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.23,"scaleY":1.23,"rotation":-0.9,"x":49.5,"y":57.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.32,"scaleY":1.32,"rotation":-1.2,"x":49.3,"y":57.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.14,"scaleY":1.14,"rotation":-1.6,"x":49.2,"y":57.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.96,"scaleY":0.96,"rotation":-1.9,"x":49.1,"y":57.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.77,"scaleY":0.77,"rotation":-2.3,"x":49,"y":57.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.59,"scaleY":0.59,"rotation":-2.7,"x":48.9,"y":57.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.41,"scaleY":0.41,"rotation":-3,"x":48.7,"y":58},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.59,"scaleY":0.59,"rotation":-3.4,"x":48.8,"y":58.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.77,"scaleY":0.77,"rotation":-3.7,"x":49,"y":58.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.94,"scaleY":0.94,"rotation":-4.1,"x":49.1,"y":58.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.12,"scaleY":1.12,"rotation":-4.4,"x":49.2,"y":58.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.3,"scaleY":1.3,"rotation":-4.8,"x":49.3,"y":58.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.19,"scaleY":1.19,"rotation":-1.6,"y":58.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.07,"scaleY":1.07,"rotation":1.4,"y":58.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.96,"scaleY":0.96,"rotation":4.6,"x":49.2,"y":58},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.84,"scaleY":0.84,"rotation":7.8,"x":49.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.73,"scaleY":0.73,"rotation":11,"y":57.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.77,"scaleY":0.77,"rotation":8,"x":49.2,"y":57.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.81,"scaleY":0.81,"rotation":5,"y":57.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.85,"scaleY":0.85,"rotation":2,"x":49.3,"y":57.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.89,"scaleY":0.89,"rotation":-0.8,"y":57},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":0.93,"scaleY":0.93,"rotation":-3.8,"y":56.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-3,"x":49.4,"y":56.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-2.2,"y":56.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-1.4,"x":49.5,"y":56.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-0.6,"y":56.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0,"y":56},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance_1"}]}]},{"n":"wait","a":[30]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[15]},{"n":"to","a":[{"startPosition":0,"_off":false},0]},{"n":"wait","a":[15]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"_off":true},13]},{"n":"wait","a":[17]}],[{"n":"get","a":["instance_4"]},{"n":"wait","a":[15]},{"n":"to","a":[{"startPosition":0,"_off":false},0]},{"n":"wait","a":[15]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"_off":true},13]},{"n":"wait","a":[17]}],[{"n":"get","a":["instance_6"]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.3,"x":48.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.6,"y":37.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.9,"x":48.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.1,"x":48.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.4,"x":48.7,"y":37.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2,"x":48.8,"y":37.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.3,"x":48.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.9,"x":49,"y":37.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.1,"x":49.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.4,"x":49.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.7,"y":38},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":4,"x":49.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.7,"x":49.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.2,"x":49.1,"y":37.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.9,"x":49},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.7,"y":37.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.4,"x":48.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.1,"x":48.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.9,"y":37.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.6,"x":48.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.3,"x":48.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.1,"y":37.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.8,"x":48.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.3,"x":48.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0,"x":48.3,"y":37.5},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":31.8,"rotation":-0.7,"x":31.7,"y":62.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-1.5,"y":62.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-2.4,"x":31.5,"y":62.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-3.2,"x":31.4,"y":62},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-4.1,"x":31.3,"y":61.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-4.9,"x":31.2,"y":61.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-5.8,"x":31.1,"y":61.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-6.7,"x":30.9,"y":61},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-7.5,"x":30.8,"y":60.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-8.4,"x":30.7,"y":60.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-9.2,"x":30.6,"y":60.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-10.1,"x":30.5,"y":59.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-10.9,"x":30.4,"y":59.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-11.8,"x":30.3,"y":59.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-11,"y":59.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-10.2,"x":30.5,"y":59.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-9.4,"x":30.6,"y":60.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-8.6,"x":30.7,"y":60.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-7.8,"x":30.8,"y":60.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-7,"y":60.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-6.2,"x":31,"y":61.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-5.4,"x":31.1,"y":61.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-4.6,"x":31.2,"y":61.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-3.8,"x":31.3,"y":61.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-3,"x":31.4,"y":62.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-2.2,"x":31.5,"y":62.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-1.4,"x":31.6,"y":62.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":-0.6,"x":31.7,"y":62.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0,"x":31.8,"y":63},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":13.7,"y":59.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"startPosition":0},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance_9"}]}]},{"n":"wait","a":[30]}],[{"n":"get","a":["instance_10"]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.9,"x":84.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.7,"x":84.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.6,"x":84.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.4,"x":84.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":4.3,"x":84.2,"y":81.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":5.1,"x":84.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":6,"x":83.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":6.9,"x":83.7,"y":81.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":7.7,"x":83.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":8.6,"x":83.4,"y":81.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":9.4,"x":83.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":10.3,"x":83.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":11.1,"x":82.9,"y":81.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":12,"x":82.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":11.2,"x":82.8,"y":81.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":10.4,"x":83},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":9.6,"x":83.1,"y":81.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":8.8,"x":83.3,"y":81.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":8,"x":83.5,"y":81.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":7.2,"x":83.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":6.4,"x":83.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":5.6,"x":84},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":4.8,"x":84.1,"y":81.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":4,"x":84.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":3.2,"x":84.4,"y":81.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":2.4,"x":84.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":1.6,"x":84.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0.8,"x":84.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"rotation":0,"x":85.1},0]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[0,3.1,98.7,121.7],"frameBounds":[[0,3.1,98.7,121.7],[-0.5,3,99.4,121.9],[-1.1,2.9,100.1,122],[-1.8,2.7,100.9,122.1],[-2.4,2.5,101.7,122.3],[-3.2,2.5,102.5,122.4],[-3.8,2.3,103.2,122.5],[-4.5,2.1,104.1,122.7],[-5,1.9,104.7,122.9],[-5.5,1.8,105.3,123],[-6.2,1.7,106.1,123.1],[-6.8,1.5,106.8,123.3],[-7.4,1.4,107.5,123.4],[-8,1.3,108.1,123.6],[-8.7,1,108.9,123.9],[-8,1.3,108.1,123.6],[-7.4,1.4,107.5,123.4],[-6.9,1.5,106.9,123.3],[-6.4,1.6,106.3,123.2],[-5.8,1.8,105.5,123],[-5.3,1.9,104.9,122.9],[-4.7,2,104.2,122.8],[-4.2,2.2,103.7,122.6],[-3.5,2.3,103,122.6],[-2.9,2.5,102.2,122.4],[-2.3,2.6,101.5,122.2],[-1.7,2.6,100.8,122.2],[-1.2,2.9,100.1,122],[-0.5,3,99.4,121.9],[0,3.1,98.7,121.7]]},"Manimation":{"shapes":[{"bn":"shape","gn":"419","m":"mask"},{"bn":"shape_1","gn":"420","m":"mask"},{"bn":"shape_2","gn":"421","m":"mask"},{"bn":"shape_3","gn":"422","m":"mask"},{"bn":"shape_4","gn":"423","m":"mask"},{"bn":"shape_5","gn":"424","m":"mask"},{"bn":"shape_6","gn":"425","m":"mask"},{"bn":"shape_7","gn":"426","m":"mask"},{"bn":"shape_8","gn":"427","m":"mask"},{"bn":"shape_9","gn":"428","m":"mask"},{"bn":"shape_10","gn":"429","m":"mask"},{"bn":"shape_11","gn":"430","m":"mask"},{"bn":"shape_12","gn":"431","m":"mask"},{"bn":"shape_13","gn":"432","m":"mask"},{"bn":"shape_14","gn":"433","m":"mask"},{"bn":"shape_15","gn":"434","m":"mask"},{"bn":"shape_16","gn":"435","m":"mask"},{"bn":"shape_17","gn":"436","m":"mask"},{"bn":"shape_18","gn":"437","m":"mask"},{"bn":"shape_19","gn":"438","m":"mask"},{"bn":"shape_20","gn":"439","m":"mask"},{"bn":"shape_21","gn":"440","m":"mask"},{"bn":"shape_22","gn":"441","m":"mask"},{"bn":"shape_23","gn":"442","m":"mask"},{"bn":"shape_24","gn":"443","m":"mask"},{"bn":"shape_25","gn":"444","m":"mask"},{"bn":"shape_26","gn":"445","m":"mask"},{"bn":"shape_27","gn":"446","m":"mask"},{"bn":"shape_28","gn":"447","m":"mask"},{"bn":"shape_29","gn":"448","m":"mask"},{"bn":"shape_30","gn":"449","m":"mask"},{"bn":"shape_31","gn":"450","m":"mask"},{"bn":"shape_32","gn":"451","m":"mask"},{"bn":"shape_33","gn":"452","m":"mask"},{"bn":"shape_34","gn":"453","m":"mask"},{"bn":"shape_35","gn":"454","m":"mask"},{"bn":"shape_36","gn":"455","m":"mask"},{"bn":"shape_37","gn":"456","m":"mask"},{"bn":"shape_38","gn":"457","m":"mask"},{"bn":"shape_39","gn":"458","m":"mask"},{"bn":"shape_40","gn":"459","m":"mask"},{"bn":"shape_41","gn":"460","m":"mask"},{"bn":"shape_42","gn":"461","m":"mask"},{"bn":"shape_43","gn":"462","m":"mask"},{"bn":"shape_44","gn":"463","m":"mask"},{"bn":"shape_45","gn":"464","m":"mask"},{"bn":"shape_46","gn":"465","m":"mask"},{"bn":"shape_47","gn":"466","m":"mask"},{"bn":"shape_48","gn":"467","m":"mask"},{"bn":"shape_49","gn":"468","m":"mask"},{"bn":"shape_50","gn":"469","m":"mask"},{"bn":"shape_51","gn":"470","m":"mask"},{"bn":"shape_52","gn":"471","m":"mask"},{"bn":"shape_53","gn":"472","m":"mask"},{"bn":"shape_54","gn":"473","m":"mask"},{"bn":"mask","im":true},{"bn":"shape_55","gn":"474","m":"mask"},{"bn":"shape_56","gn":"475","m":"mask"},{"bn":"shape_57","gn":"476","m":"mask"}],"containers":[],"animations":[],"tweens":[[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape"}]}]},{"n":"to","a":[{"state":[{"t":"shape_1"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_2"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_4"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_5"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_7"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_4"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_8"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_9"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_10"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_11"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_13"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_14"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_15"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_16"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_17"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_19"}]},1]},{"n":"to","a":[{"state":[{"t":"shape"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_20"}]}]},{"n":"to","a":[{"state":[{"t":"shape_21"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_22"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_23"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_24"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_25"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_26"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_27"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_26"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_24"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_28"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_29"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_30"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_31"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_32"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_31"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_29"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_33"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_34"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_31"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_35"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_36"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_37"}]}]},{"n":"to","a":[{"state":[{"t":"shape_38"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_39"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_40"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_41"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_42"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_43"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_44"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_43"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_41"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_45"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_46"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_47"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_48"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_49"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_50"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_46"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_51"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_52"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_48"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_53"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_54"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":["mask"]},{"n":"to","a":[{"graphics":"mask_graphics_0","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_1","x":41.3,"y":53.1}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_2","x":41.4,"y":53.8}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_3","x":41.3,"y":53.7}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_4","x":41.4,"y":53.5}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_5","x":41.4,"y":53.2}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_6","x":41.4,"y":53}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_7","x":41.3,"y":52.7}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_8","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_9","x":41.3,"y":52.9}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_10","x":41.4,"y":53.5}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_11","x":41.2,"y":53.8}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_12","x":40.9,"y":54.1}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_13","x":41.1,"y":53.7}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_14","x":41.2,"y":53.3}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_15","x":41.3,"y":52.9}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_16","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_17","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_18","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_19","x":41.3,"y":52.4}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_20","x":41.2,"y":53.3}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_21","x":40.9,"y":54.1}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_22","x":41.1,"y":53.6}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_23","x":41,"y":53.5}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_24","x":41.1,"y":53.3}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_25","x":41.2,"y":53}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_26","x":41.2,"y":52.7}]},{"n":"wait","a":[1]},{"n":"to","a":[{"graphics":"mask_graphics_27","x":41.3,"y":52.4}]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_55"}]}]},{"n":"wait","a":[28]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_56"}]}]},{"n":"wait","a":[28]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_57"}]}]},{"n":"wait","a":[28]}]],"graphics":[{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_0"},{"p":"AgdAMQgNgHgEgMQArgMAvACIADAGQgMAbgcACIgDAAIgIABQgPAAgKgHg","bn":"mask_graphics_1"},{"p":"AglANQgMgLgCgQQAygMA1ABQgHAugpAEIgFABQgWAAgOgNg","bn":"mask_graphics_2"},{"p":"AgkANIgFgEQgLgJABgNQAxgMA1ACIABABQABAOgLALQgNASgYADIgFAAIgCAAQgVAAgNgLg","bn":"mask_graphics_3"},{"p":"AgpAJQgOgKAEgKQAxgMA2ABQAEAMgOAOQgPARgaACIgDAAQgYAAgPgOg","bn":"mask_graphics_4"},{"p":"AgmAJQgMgJABgIIAAgBQAugLAzABQACAEAAAFQgDAHgHAFQgOAQgXACIgBAAIgGAAQgUAAgOgLg","bn":"mask_graphics_5"},{"p":"AgiAKQgMgIgBgHIAAgBQAsgLAvABQADADABADQgDAHgGAEQgOAPgVABIgBAAIgIAAQgRAAgMgHg","bn":"mask_graphics_6"},{"p":"AgeAKQgLgGgDgHIgBAAQApgLAsABIAGACQgEAHgFAEQgNANgUAAIgBAAIgLACQgNAAgJgFg","bn":"mask_graphics_7"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_8"},{"p":"AgiAMQgMgIgBgJQAugMAwABQACACgDAIQgDAHgEADQgOALgXABIgNABQgOAAgJgFg","bn":"mask_graphics_9"},{"p":"AgYAVQgNgDgHgGQgNgLAGgMQAxgMA2ACQAHAUgQAIQgUANgUACIgJABQgJAAgJgCg","bn":"mask_graphics_10"},{"p":"AgEAZQgMAAgIgFQgIgEgGgMQgGgIAAgJQAJgHAVgCIAigBIARgBQAHgBAAADQABAXgNAMQgDACgQAIQgGACgHAAIgEAAg","bn":"mask_graphics_11"},{"p":"AglALQgFgRAKgPQAWgFAKgBIAjABQALAYgOAMQgNAOgYADIgHABQgUAAgFgRg","bn":"mask_graphics_12"},{"p":"AgZAVQgEgDgEgKIgCgDIgCgKQgBgGACgEIAmgIIAiABIAAAAQAGAWgOAKQgGAEgHADQgLAFgMABIgFABQgIAAgEgDg","bn":"mask_graphics_13"},{"p":"AgWASQgGgDgEgHIgCgCIgFgKQABgEADgDQAdgGAJgBIAgAAIABAAIAEAGQgCAMgKAIQgGAEgGACIgNAEIgKACIgEAAQgHAAgEgCg","bn":"mask_graphics_14"},{"p":"AgUAPQgGgCgFgFIgCgCQgEgDgEgFIAHgFQAZgGANgBIAfgBIABAAIAGADQgFAMgKAGQgEAEgGACQgGABgHABIgKACIgEAAQgGAAgEgBg","bn":"mask_graphics_15"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_16"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_17"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_18"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_19"},{"p":"AghAEIgGgNQABgEAFABQAHABAEgDQASgEALgBIAhABQgBATgPAJQgFADgHACQgMAFgKAAQgNgBgKgPg","bn":"mask_graphics_20"},{"p":"AglALQgFgRAKgPQAWgFAKgBIAjABQALAYgOAMQgNAOgYADIgHABQgUAAgFgRg","bn":"mask_graphics_21"},{"p":"AgJAYQgVAAgHgTIAAgBQgBgLADgGQABgCAEgBIAGgDQANgDAIgBIAJAAIAZAAIAGADQAEARgHAIIgHAHIgCACQgLAIgOACIgGAAIgDAAg","bn":"mask_graphics_22"},{"p":"AgNAUQgPgDgIgRIgBgCQABgCgBgDQgCgEACgCIAKgBIAEgBIAGgCQANgDAGgBIAAAAIAKAAIAXAAIABAAIAAABIADAEQABAPgIAHIgDACIgFAFIgCABIgEABQgKAGgLABIgCAAQgFAAgDgCg","bn":"mask_graphics_23"},{"p":"AgngKQAJACAIgGQASgEAMgBIAfABIABAAQAAATgPAJQgFADgHACQgLAEgLABIAAAAQgPAAgPgeg","bn":"mask_graphics_24"},{"p":"AgogHIAAAAQAJAAAJgEQARgEAMgBIAfAAIABAAIACAFQgEAMgMAHQgFADgHACIgIACIgNACIgBAAQgRAAgOgYg","bn":"mask_graphics_25"},{"p":"AgpgEIAAAAQAJgBAJgDQAQgEANgBIAfgBIABAAIAEADQgGAMgLAGQgGADgFABIgJABIgLACIgDABQgUAAgMgTg","bn":"mask_graphics_26"},{"p":"AgrgBQAqgLAtABQgOAWgZgBQgHACgIAAQgXAAgKgNg","bn":"mask_graphics_27"}],"bounds":[36.4,50.8,9.9,3.5],"frameBounds":[[36.4,50.8,9.9,3.5],[36.2,50.9,10.3,5.2],[36,50.9,10.8,6.9],[36,50.8,10.8,6.4],[35.9,50.8,11,5.7],[36.1,50.8,10.4,5.2],[36.2,50.8,10.2,4.6],[36.3,50.8,10,4.1],[36.4,50.8,9.9,3.5],[36.2,50.8,10.2,4.6],[35.9,50.8,11,5.7],[36.5,50.9,9.5,6],[36.9,51,8.2,6.4],[37.1,51,8,5.6],[36.9,50.9,8.6,4.9],[36.7,50.9,9.2,4.2],[36.4,50.8,9.9,3.5],[36.4,50.8,9.9,3.5],[36.4,50.8,9.9,3.5],[36.4,50.8,9.9,3.5],[36.9,50.9,8.5,4.9],[36.9,51,8.2,6.4],[37.1,51,8,5.9],[37.1,50.9,8.1,5.4],[36.9,50.9,8.5,4.9],[36.8,50.9,8.9,4.4],[36.6,50.8,9.4,4],[36.4,50.8,9.9,3.5]]},"Face_3SJCC":{"shapes":[{"bn":"shape","gn":"477"},{"bn":"shape_1","gn":"478"},{"bn":"shape_2","gn":"479"},{"bn":"shape_3","gn":"480"},{"bn":"shape_4","gn":"481"},{"bn":"shape_5","gn":"482"},{"bn":"shape_6","gn":"483"},{"bn":"shape_7","gn":"484"},{"bn":"shape_8","gn":"485"},{"bn":"shape_9","gn":"486"},{"bn":"shape_10","gn":"487"},{"bn":"shape_11","gn":"488"},{"bn":"shape_12","gn":"489"},{"bn":"shape_13","gn":"490"},{"bn":"shape_14","gn":"491"},{"bn":"shape_15","gn":"492"},{"bn":"shape_16","gn":"493"},{"bn":"shape_17","gn":"494"},{"bn":"shape_18","gn":"495"},{"bn":"shape_19","gn":"496"},{"bn":"shape_20","gn":"497"},{"bn":"shape_21","gn":"498"},{"bn":"shape_22","gn":"499"},{"bn":"shape_23","gn":"500"}],"containers":[{"bn":"instance_1","t":[17.5,64.8,1,1,0,0,0,11.2,9.3],"gn":"Ear"},{"bn":"instance_2","t":[67.2,54.9,1,1,0,0,0,31,35],"gn":"Eye_black"},{"bn":"instance_3","t":[52,80.1,1,1,0,0,0,8.8,5.4],"gn":"Eye_3"},{"bn":"instance_4","t":[72.3,84.8,1,1,0,0,0,12.9,5],"gn":"Nouse_3"},{"bn":"instance_5","t":[56.9,65.8,1,1,0,0,0,41.6,50],"gn":"FAce_3"},{"bn":"instance_6","t":[104.7,55.7,1,1,0,0,0,10.8,9.8],"gn":"Ear1"},{"bn":"instance_7","t":[59.1,95.4,1,1,0,0,0,61.6,30.4],"gn":"Body_3"}],"animations":[{"bn":"instance","t":[74.8,98.7,2.296,2.296,2.1,0,0,41.7,53.7],"gn":"Manimation","a":["synched",0,false]}],"tweens":[[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape"}]}]},{"n":"to","a":[{"state":[{"t":"shape_1"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_2"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_4"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_5"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_5"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_5"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_5"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_7"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_8"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_9"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_10"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_11"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_13"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_14"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_15"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_16"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_17"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_19"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_22"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_23"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_13"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance"}]}]},{"n":"wait","a":[28]}],[{"n":"get","a":["instance_1"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.7},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.8},0]},{"n":"wait","a":[3]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.7},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.8},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":64.8},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[2]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":54.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":54.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":54.8},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":54.9},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":54.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":54.8},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":54.9},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.2},0]},{"n":"wait","a":[2]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.1},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":54.9},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"wait","a":[2]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":79.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.1},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":79.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.1},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.2},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.4},0]},{"n":"wait","a":[2]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.3},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.2},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":80.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":85},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":84.9},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":84.8},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.06,"y":85.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.12,"y":85.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.11,"y":85.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.08,"y":85.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.05,"y":85},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02,"y":84.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":84.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02,"y":84.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.03},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.05,"y":85},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.06,"y":85.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.08,"y":85.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.07,"y":85.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.05,"y":85},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.04},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.03},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":84.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":66},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":66},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":65.8},0]},{"n":"wait","a":[4]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02,"y":66.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":65.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":65.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":65.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":49.9,"scaleY":1,"y":66},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":50,"scaleY":1.01,"y":66.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":49.9,"scaleY":1,"y":65.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":50,"scaleY":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":65.8},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.5},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.6},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.7},0]},{"n":"wait","a":[2]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.5},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.6},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.4},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.3},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.5},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":55.7},0]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance_7"}]}]},{"n":"wait","a":[28]}]],"graphics":[],"bounds":[-2.5,15.8,123.5,110.2],"frameBounds":[[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.1],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.1],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.1],[-2.5,15.8,123.5,110.2],[-2.5,15.8,123.5,110.2]]}}},"actions":{"attack":{"animation":"enemy_small_attack","framerate":24,"goesTo":"idle"},"idle":{"animation":"enemy_small_move_side","frames":"0","loops":false},"move":{"relatedActions":{"back":{"animation":"enemy_small_move_back","framerate":16},"fore":{"animation":"enemy_small_move_fore","framerate":16},"side":{"animation":"enemy_small_move_side","framerate":16}}},"die":{"animation":"enemy_small_die","loops":false,"positions":{"aboveHead":{"x":-70,"y":-50},"torso":{"x":-30,"y":-15}},"framerate":20},"portrait":{"animation":"Face_3SJCC","scale":0.83}},"rotationType":"isometric","positions":{"registration":{"x":-285,"y":-300},"aboveHead":{"x":0,"y":-100},"torso":{"x":0,"y":-40},"mouth":{"x":35,"y":-60}},"commitMessage":"HasAPI","parent":"53fe761e81b81d35051761c2","scale":0.3,"shadow":1.75,"components":[{"original":"524b85837fc0f6d519000020","majorVersion":0},{"original":"524b7b747fc0f6d519000010","majorVersion":0,"config":{"team":"ogres"}},{"original":"524b7b857fc0f6d519000012","majorVersion":0,"config":{"collisionType":"dynamic","collisionCategory":"ground","mass":20,"fixedRotation":true,"restitution":0.5}},{"original":"524b7bab7fc0f6d519000017","majorVersion":0,"config":{"maxHealth":7,"healthReplenishRate":0.125}},{"original":"52e95818a3ca8546b7000001","majorVersion":0},{"original":"524b3e3fff92f1f4f800000d","majorVersion":0},{"original":"524b4150ff92f1f4f8000024","majorVersion":0},{"original":"524b7b977fc0f6d519000014","majorVersion":0},{"original":"524b7b9f7fc0f6d519000015","majorVersion":0},{"original":"53e217d253457600003e3ebb","majorVersion":0,"config":{"inventory":{"right-hand":"53e950190cd04e000051f037"}}},{"original":"524b7b8c7fc0f6d519000013","majorVersion":0,"config":{"locomotionType":"running","maxSpeed":11,"maxAcceleration":100}},{"original":"524b75ad7fc0f6d519000001","majorVersion":0,"config":{"pos":{"x":10,"y":10,"z":1},"width":1.5,"height":1.5,"depth":2,"shape":"ellipsoid"}},{"original":"524b7b7c7fc0f6d519000011","majorVersion":0},{"original":"524b7bb67fc0f6d519000018","majorVersion":0},{"original":"52a399b98537a70000000003","majorVersion":0},{"original":"524b457bff92f1f4f8000031","majorVersion":0},{"original":"52872b0ead92b98561000002","majorVersion":0},{"original":"52e816058c875f0000000001","majorVersion":0}],"soundTriggers":{"attack":[{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_1.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_1.ogg","delay":10},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_2.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_2.ogg","delay":10},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_3.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_3.ogg","delay":10},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_4.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_4.ogg","delay":10},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_5.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/sword_attack_5.ogg","delay":10}],"die":[{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/enemy_small_die.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/enemy_small_die.ogg"}],"selected":[{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_1.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_1.ogg"},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_2.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_2.ogg"},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_3.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_3.ogg"}],"say_explain":[{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_1.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_1.ogg"},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_2.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_2.ogg"},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_3.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_3.ogg"}],"jump":[{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_3.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_select_3.ogg"}],"say":{"defaultSimlish":[{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_simlish_1.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_simlish_1.ogg"},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_simlish_2.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_simlish_2.ogg"},{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_simlish_3.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/munchkin_simlish_3.ogg"}],"krogg":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/krogg.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/krogg.ogg"},"gort":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/gort.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/gort.ogg"},"get-them":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/get_them.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/get_them.ogg"},"quiet-prisoners":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/quiet_prisoners.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/quiet_prisoners.ogg"},"behead":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_behead.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_behead.ogg"},"bones":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_bones.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_bones.ogg"},"destroy":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_destroy.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_destroy.ogg"},"die-humans":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_die_humans.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_die_humans.ogg"},"for-thoktar":{"ogg":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_for_thoktar.ogg","mp3":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_for_thoktar.mp3"},"raah":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_raah.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_raah.ogg"},"slice-and-dice":{"mp3":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_slice_and_dice.mp3","ogg":"db/thang.type/529e5d756febb9ca7e00000a/ogre_munchkin_slice_and_dice.ogg"}}},"kind":"Unit","colorGroups":{"team":["4","5","11","16","54","55","59","60","84","85","94","95","101","124","130","131","167","186","187","221","226","227","233","249","252","294","299","300","308","309","313"]},"patches":[],"created":"2014-09-02T21:38:58.621Z","version":{"isLatestMinor":true,"isLatestMajor":true,"minor":25,"major":0}}

});

;require.register("test/app/fixtures/prepaids", function(exports, require, module) {
var Prepaids;

Prepaids = require('collections/Prepaids');

module.exports = new Prepaids([
  {
    _id: 'unused-prepaid',
    creator: 'teacher1',
    exhausted: false,
    maxRedeemers: 2,
    redeemers: []
  }
]);
});

;require.register("test/app/fixtures/students", function(exports, require, module) {
var Users;

Users = require('collections/Users');

module.exports = new Users([
  {
    _id: "student0",
    name: "Student Zero"
  }, {
    _id: "student1",
    name: "Student One"
  }, {
    _id: "student2",
    name: "Student Two"
  }, {
    _id: "student3",
    name: "Student Three"
  }
]);
});

;require.register("test/app/fixtures/teacher", function(exports, require, module) {
var User;

User = require('models/User');

module.exports = new User({
  "_id": "teacher1",
  "testGroupNumber": 169,
  "anonymous": false,
  "__v": 0,
  "email": "teacher1@example.com",
  "emails": {
    "recruitNotes": {
      "enabled": true
    },
    "anyNotes": {
      "enabled": true
    },
    "generalNews": {
      "enabled": false
    }
  },
  "name": "Teacher Teacherson",
  "slug": "teacher-teacherson",
  "points": 20,
  "earned": {
    "gems": 0
  },
  "referrer": "http://localhost:3000/",
  "activity": {
    "login": {
      "last": "2016-03-07T19:57:05.007Z",
      "count": 8,
      "first": "2016-02-26T23:59:15.181Z"
    }
  },
  "volume": 1,
  "role": "teacher",
  "stripe": {
    "customerID": "cus_80OTFCpv2hArmT"
  },
  "dateCreated": "2016-02-26T23:49:23.696Z"
});
});

;require.register("test/app/fixtures/tree1.thang.type", function(exports, require, module) {
module.exports = {"_id":"52c3604dbc3cc4c2d0000010","rotationType":"fixed","index":true,"slug":"tree-1","name":"Tree 1","creator":"5162fab9c92b4c751e000274","original":"52b09ef7ccbc67137200000f","__v":0,"raw":{"shapes":{"0":{"p":"AgpARQgIgRARgQQAMgLAOgEQAVgIALADQAVAFgDAfQgCAjgnADIgGAAQgeAAgIgVg","t":[61.6,50.9],"fc":"#69ED14"},"1":{"p":"AgKAeQgigQAAgWQABgSAVgGQAPgEALADQAYAFAJAIQAQANgPAYQgKASgSAAQgKAAgKgFg","t":[53.1,47.8],"fc":"#69ED14"},"2":{"p":"Ag+ARQgRgQAWgNQAQgKAUgFQAhgHASABQAhADAHAdQAHAdg8AFIgSABQgqAAgTgRg","t":[95.5,45.7],"fc":"#69ED14"},"3":{"p":"Ag8AfQgTgSAUgUQAPgPATgIQAggOASAAQAigBAJAkQAKAkg7AOQgTAEgPAAQgdAAgQgOg","t":[43.1,49.1],"fc":"#69ED14"},"4":{"p":"AhAAZQgZgIAcgYQAbgYAOgBQAXgCAcAMQAcANAPASQAOATg+AEIgdACQglAAgYgJg","t":[42.3,34.8],"fc":"#69ED14"},"5":{"p":"AAHATQg8gBgmgDQhJgFASgLQARgOBsgBQA0AAAyACIAGgDQALgDAdACQARACAFAHQAGAHgMAFQgcARhPAAIgdgBg","t":[54.7,41.1],"fc":"#69ED14"},"6":{"p":"Ag5AfQgjgEALgSQALgQAYgFIBLgTQAKgBALAJIAdAXQAUAMg8AMQgnAIgfAAQgOAAgMgBg","t":[68.5,36.3],"fc":"#69ED14"},"7":{"p":"AhIAaQgBgJAMgXQACgFAsgNIApgNQA4gBgKARQgJAShHAcQgfANgRAAQgPAAgBgMg","t":[89.8,34.3],"fc":"#69ED14"},"8":{"p":"AhkAmQgLgEAKgNQANgPCNgsQARgGAbAbQAbAZgvAJQhMAPhYAIIgCAAQgGAAgFgCg","t":[81.4,30.6],"fc":"#69ED14"},"9":{"p":"AgvAcQgogDAAgUIALgMQAPgNAPgCIBHgFQBHgBgJAQQgXAmg5AAQgWACgSAAIgOAAg","t":[53.7,37.9],"fc":"#69ED14"},"10":{"p":"AgVAUQgQgBgHgNQgGgMAPgJQANgIAWAFQAMADAJAEQAOACAEADQAGAEABAJQACAOgrAAIgagBg","t":[23.2,37.5],"fc":"#69ED14"},"11":{"p":"Ag2ATQgSgEAbgSQAbgUAJAAQAXAAAWAJQAXAKADANQACANgyACIgOAAQghAAgVgFg","t":[30.7,34.1],"fc":"#69ED14"},"12":{"p":"Ag6AXQgYgLAIgMQAGgJAfgLQAhgLAMADIBAAPQAKAIgJAFQgMAKgvANQgVAHgSAAQgSAAgPgHg","t":[23.6,32.3],"fc":"#69ED14"},"13":{"p":"AEDA/IhDgcQgBgCgEgBQgJgCgUACQghAHg6gVIgzgUIgOANQgOANgYgFIg5gSIgrAXQgbAOgYgEIgTgGQAKgGg8ASQglALgSgGIgLgJQgCgGAigbQAogfAugQQA8gUBJgIQBUgJBEANQBFAOBDAoQA7AiAuAxQACAIgLAAQgPAAgngOg","t":[58,11.4],"fc":"#69ED14"},"14":{"p":"Ag8AgQgogTAcgbQAZgZAzgEQAagCAWADQAsAPgQAeQgQAegsAJQgPADgMAAQgcAAgZgNg","t":[47.8,14.7],"fc":"#69ED14"},"15":{"p":"AgCAXQgUgEgLgQQgLgOASgJQARgHAUAIQAMAEAIAGQAOANgOAMQgKAIgOAAIgJgBg","t":[57,10.5],"fc":"#69ED14"},"16":{"p":"AgdAPQgQgMAOgMQANgNAWAAQAMgBAKADQATAJgKAOQgJAQgUADIgIABQgPAAgMgIg","t":[44.5,10.7],"fc":"#69ED14"},"17":{"p":"AAAAuQgpgEgYgdQgZgdAigTQAfgSAsAMQAXAGARAJQAgAagbAaQgVAVghAAIgKgBg","t":[67.5,12],"fc":"#69ED14"},"18":{"p":"AgwAtQglgPAUggQASgeAvgMQAVgGATAAQAqAIgLAkQgKAhgmAPQgVAJgRAAQgRAAgQgGg","t":[32.3,16.2],"fc":"#69ED14"},"19":{"p":"AhAGYIgsgMQhBgUgWgFQhLgCgygUQgsgSgYgcQgNgPgGgSIgCgIIgygHQgsgBgegPQgggPgOgdQgJgSAAgWQAAgpAggnQAWgZAfgQQgHgLgGgMQgKgXAAgYQAAgbANgZQAMgUATgRQAcgXAtgTIAGgCQgDgRAAgQQAAgpAWgjQAUgeAmgZQA7gkBugbQBHgQBEAAQBuAABnAsQBBAeAxAoQBNBAArBDQAnA7AMA5QAfAKAXAMIAAAAQAdAQAOAdQAMAbAAAkQAAAwgVAuQgWAygmAaQgeATgiAAIgEAAQgGAAgJAFQgLAFgNAKQgSANgdAaQgYAVgcALQggAMg0ADQiHAnhqAAQgSAAgXgFgAiSlZQhLARguAWQg1AYgVAgQgOAWAAAaQAAAUAIAWIAIAbIgrAMIgcALQgkARgQAXQgNAQAAASQAAAOAHAOQAIAQARAVIAZAeIglALQgmALgYAcQgUAXAAAXQAAAKAEAHQAFAJAHAGQAVARAtAAIACAAIBeANIgCAZIABAGQADAIAEAIQASAZAqAPQAnANBAACIACAAIADABQAXAGAvAOQArANATAEQATAFALAAQBlgBCAglIADgBIADAAQAsgCAcgLQAUgHAQgOIAjgfQAZgUAXgLQAVgLARAAIADAAQATABAQgLQARgMANgUQAOgUAHgaQAIgZAAgYQAAgZgIgRQgHgPgMgHIgBAAIgBgBIAAAAIAAAAIgBAAIAAAAIgBgBIgNgGQgRgHgbgGIgQgFIgCgRQgHg0gng7Qgpg+hFg5Qgqgkg8gaQhcgohkAAQg/gBhBAQg","t":[59,41.4],"fc":"#32680F"},"20":{"p":"AAfAgQgdgMgpgZQg+AWhMgRIhAgVIAAgHQgCgJgEgJQAtAbBagIQAtgFAngJIAKABQAMAEAYASQAfASBFAAQBDgBA/gUQgfAfgfAQQghASgqADIgKAAQghAAglgPg","t":[46.7,30],"fc":"#439110"},"21":{"p":"AinCcQhGgQglgKIgYgHQgOgFgRgMQgggYgKgiQgFgBgagMQgSgJgLADQgKACgkgLQgqgNgVgRQhAg5CkhGQgeAcALAVQAJASAlAHQAgAGAlgKQAOgEAxgVQgGAYANAfQAMAeAVAOQAxAlBCgMQA4gKAzgoQApAoA3AQQAoALAugEQAvgEAjgUQAWgMASgbQASgcACgZQBmAJA5gNQBhgVgGhRQAJBXgNAuQgPA5g0ASIhIAYIgQAEQgXAUghATQhDAng3ABQiDAjhUAFIgXAAQhMAAhHgWg","t":[58.7,61.1],"fc":"#439110"},"22":{"p":"AidAvQCSgBBOgzQAogaALgbQAGAAAJAOQAOAUALAnQgIAah5ANQgvAFgoAAQg8AAgngMg","t":[89.3,37.3],"fc":"#439110"},"23":{"p":"AhNAhQgWgJgKgeQgHgYADgMIAQAMQAWANAZAIQBPAWBWgjQgZAoggAOQgZALgiAAQghAAgrgKg","t":[22.4,43.9],"fc":"#439110"},"24":{"p":"AhlF1QhIgWgSgEQh/gEgtg2QgOgRgEgTQgCgKABgHIhJgFQg3AAgcgYQgagVACghQABggAagdQAcgfAsgOQhJhUBCg+QAogmA7gNIgBgBQgehXBHg2QAygnCBgmQCLgoCRAwQBjAgA9A0QBIA8ArBBQAqBAAIA6QAnAMAaANQAeANAJArQAHAngNAtQgNAvgdAeQggAhgogBQgUgBgjAZQgSANgfAcQgUASgYAJQgfAMgxACQiEAnhpAAQgYAAg1gQg","t":[59.4,41.2],"fc":"#58C114"},"25":{"p":"AhBCRQgdgWAAgiIAKipQAAgjAZgYQAZgZAigBQAiABAYAZQAZAYAAAjIAMCdQAAAigfAcQgfAaghAAQglAAgcgUgAgyiDQgVAVAAAeIAACaQAAAdAVAVQAVAVAdAAQAcAAAVgVQAVgVAAgdIAAiaQAAgegVgVQgVgVgcAAQgdAAgVAVg","t":[58.3,91.2],"fc":"#3A2110"},"26":{"p":"AgkA0QgQgLgIgbQgEgOgBgJIAPghQACARAFASQAKAjAPAJQgEgHgFgiIgEgjIAigaIAKAtQALAqAEgDQAJgHAEhAIAXAdQAFAVgFAPQgMAlgfAMQgKAEgLAAQgRAAgTgOg","t":[58.2,99.2],"fc":"#96582D"},"27":{"p":"Ag1CEQgXgWAAghIAAiZQAAggAXgXQAXgXAeAAQAgAAAXAXQAWAWAAAhIAACZQAAAhgWAWQgXAXggAAQgeAAgXgXg","t":[58.2,90.8],"fc":"#633C22"},"28":{"p":"AjTB5QhXgygBhHQABhGBXgzQBZgyB6AAQB8AABXAyQBZAzAABGQAABHhZAyQhXAzh8AAQh6AAhZgzg","t":[58.9,101.3],"fc":"rgba(0,0,0,0.549)"}},"containers":{"tree_1":{"c":[{"t":[60.1,54.6,1.017,1.012,0,0,0,59,53.9]}],"b":[60,60,120,120]},"Tree_4":{"c":["28","27","26","25","24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1","0"],"b":[0,0,118,118.6]}}},"actions":{"idle":{"container":"Tree_4"},"portrait":{"container":"Tree_4","scale":0.8,"positions":{"registration":{"x":-2,"y":-2}}}},"scale":0.3,"positions":{"registration":{"x":-59,"y":-100}},"commitMessage":"Added portrait.","parent":"52b5eed9590a79c8a400000e","shadow":0,"components":[{"original":"524b7b857fc0f6d519000012","majorVersion":0,"config":{"collisionCategory":"ground","collisionType":"static","fixedRotation":true,"isBullet":false,"mass":500,"restitution":0.5}},{"original":"524b4150ff92f1f4f8000024","majorVersion":0,"config":{"stateless":true}},{"original":"524b75ad7fc0f6d519000001","majorVersion":0,"config":{"pos":{"x":10,"y":10,"z":2},"width":2,"height":2,"depth":4,"shape":"ellipsoid"}}],"kind":"Doodad","created":"2014-01-01T00:24:45.731Z","version":{"isLatestMinor":true,"isLatestMajor":true,"minor":3,"major":0}}

});

;require.register("test/app/lib/CoursesHelper.spec", function(exports, require, module) {
var Campaigns, Classrooms, CourseInstances, Courses, LevelSessions, Levels, Users, factories, helper;

helper = require('lib/coursesHelper');

Campaigns = require('collections/Campaigns');

Users = require('collections/Users');

Courses = require('collections/Courses');

CourseInstances = require('collections/CourseInstances');

Classrooms = require('collections/Classrooms');

Levels = require('collections/Levels');

LevelSessions = require('collections/LevelSessions');

factories = require('test/app/factories');

describe('CoursesHelper', function() {
  return describe('calculateAllProgress', function() {
    beforeEach(function() {
      var courseInstance;
      this.course = factories.makeCourse();
      this.courses = new Courses([this.course]);
      this.members = new Users(_.times(2, function() {
        return factories.makeUser();
      }));
      this.levels = new Levels(_.times(2, function() {
        return factories.makeLevel();
      }));
      this.practiceLevel = factories.makeLevel({
        practice: true
      });
      this.levels.push(this.practiceLevel);
      this.classroom = factories.makeClassroom({}, {
        courses: this.courses,
        members: this.members,
        levels: [this.levels]
      });
      this.classrooms = new Classrooms([this.classroom]);
      courseInstance = factories.makeCourseInstance({}, {
        course: this.course,
        classroom: this.classroom,
        members: this.members
      });
      return this.courseInstances = new CourseInstances([courseInstance]);
    });
    describe('when all students have completed a course', function() {
      beforeEach(function() {
        var creator, i, j, len, len1, level, ref, ref1, sessions;
        sessions = [];
        ref = this.levels.models;
        for (i = 0, len = ref.length; i < len; i++) {
          level = ref[i];
          if (level === this.practiceLevel) {
            continue;
          }
          ref1 = this.members.models;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            creator = ref1[j];
            sessions.push(factories.makeLevelSession({
              state: {
                complete: true
              }
            }, {
              level: level,
              creator: creator
            }));
          }
        }
        return this.classroom.sessions = new LevelSessions(sessions);
      });
      describe('progressData.get({classroom, course})', function() {
        return it('returns object with .completed=true and .started=true', function() {
          var progress, progressData;
          progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
          progress = progressData.get({
            classroom: this.classroom,
            course: this.course
          });
          expect(progress.completed).toBe(true);
          return expect(progress.started).toBe(true);
        });
      });
      describe('progressData.get({classroom, course, level, user})', function() {
        return it('returns object with .completed=true and .started=true', function() {
          var i, len, progress, progressData, ref, results, student;
          ref = this.members.models;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            student = ref[i];
            progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
            progress = progressData.get({
              classroom: this.classroom,
              course: this.course,
              user: student
            });
            expect(progress.completed).toBe(true);
            results.push(expect(progress.started).toBe(true));
          }
          return results;
        });
      });
      describe('progressData.get({classroom, course, level, user})', function() {
        return it('returns object with .completed=true and .started=true', function() {
          var i, len, level, progress, progressData, ref, results;
          progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
          ref = this.levels.models;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            level = ref[i];
            if (level === this.practiceLevel) {
              continue;
            }
            progress = progressData.get({
              classroom: this.classroom,
              course: this.course,
              level: level
            });
            expect(progress.completed).toBe(true);
            results.push(expect(progress.started).toBe(true));
          }
          return results;
        });
      });
      return describe('progressData.get({classroom, course, level, user})', function() {
        return it('returns object with .completed=true and .started=true', function() {
          var i, len, level, progress, progressData, ref, results, user;
          progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
          ref = this.levels.models;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            level = ref[i];
            if (level === this.practiceLevel) {
              continue;
            }
            results.push((function() {
              var j, len1, ref1, results1;
              ref1 = this.members.models;
              results1 = [];
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                user = ref1[j];
                progress = progressData.get({
                  classroom: this.classroom,
                  course: this.course,
                  level: level,
                  user: user
                });
                expect(progress.completed).toBe(true);
                results1.push(expect(progress.started).toBe(true));
              }
              return results1;
            }).call(this));
          }
          return results;
        });
      });
    });
    describe('when NOT all students have completed a course', function() {
      beforeEach(function() {
        var i, len, level, ref, sessions;
        sessions = [];
        this.finishedMember = this.members.first();
        this.unfinishedMember = this.members.last();
        ref = this.levels.models;
        for (i = 0, len = ref.length; i < len; i++) {
          level = ref[i];
          if (level === this.practiceLevel) {
            continue;
          }
          sessions.push(factories.makeLevelSession({
            state: {
              complete: true
            }
          }, {
            level: level,
            creator: this.finishedMember
          }));
        }
        sessions.push(factories.makeLevelSession({
          state: {
            complete: false
          }
        }, {
          level: this.levels.first(),
          creator: this.unfinishedMember
        }));
        return this.classroom.sessions = new LevelSessions(sessions);
      });
      it('progressData.get({classroom, course}) returns object with .completed=false', function() {
        var progress, progressData;
        progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
        progress = progressData.get({
          classroom: this.classroom,
          course: this.course
        });
        return expect(progress.completed).toBe(false);
      });
      describe('when NOT all students have completed a level', function() {
        return it('progressData.get({classroom, course, level}) returns object with .completed=false and .started=true', function() {
          var i, len, level, progress, progressData, ref, results;
          progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
          ref = this.levels.models;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            level = ref[i];
            if (level.get('practice')) {
              continue;
            }
            progress = progressData.get({
              classroom: this.classroom,
              course: this.course,
              level: level
            });
            results.push(expect(progress.completed).toBe(false));
          }
          return results;
        });
      });
      describe('when the student has completed the course', function() {
        return it('progressData.get({classroom, course, user}) returns object with .completed=true and .started=true', function() {
          var progress, progressData;
          progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
          progress = progressData.get({
            classroom: this.classroom,
            course: this.course,
            user: this.finishedMember
          });
          expect(progress.completed).toBe(true);
          return expect(progress.started).toBe(true);
        });
      });
      describe('when the student has NOT completed the course', function() {
        return it('progressData.get({classroom, course, user}) returns object with .completed=false and .started=true', function() {
          var progress, progressData;
          progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
          progress = progressData.get({
            classroom: this.classroom,
            course: this.course,
            user: this.unfinishedMember
          });
          expect(progress.completed).toBe(false);
          return expect(progress.started).toBe(true);
        });
      });
      describe('when the student has completed the level', function() {
        return it('progressData.get({classroom, course, level, user}) returns object with .completed=true and .started=true', function() {
          var i, len, level, progress, progressData, ref, results;
          progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
          ref = this.levels.models;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            level = ref[i];
            if (level.get('practice')) {
              continue;
            }
            progress = progressData.get({
              classroom: this.classroom,
              course: this.course,
              level: level,
              user: this.finishedMember
            });
            expect(progress.completed).toBe(true);
            results.push(expect(progress.started).toBe(true));
          }
          return results;
        });
      });
      describe('when the student has NOT completed the level but has started', function() {
        return it('progressData.get({classroom, course, level, user}) returns object with .completed=true and .started=true', function() {
          var level, progress, progressData;
          progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
          level = this.levels.first();
          progress = progressData.get({
            classroom: this.classroom,
            course: this.course,
            level: level,
            user: this.unfinishedMember
          });
          expect(progress.completed).toBe(false);
          return expect(progress.started).toBe(true);
        });
      });
      return describe('when the student has NOT started the level', function() {
        return it('progressData.get({classroom, course, level, user}) returns object with .completed=false and .started=false', function() {
          var level, progress, progressData;
          progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
          level = this.levels.last();
          progress = progressData.get({
            classroom: this.classroom,
            course: this.course,
            level: level,
            user: this.unfinishedMember
          });
          expect(progress.completed).toBe(false);
          return expect(progress.started).toBe(false);
        });
      });
    });
    return describe('progressData.get({classroom, course, level:practiceLevel})', function() {
      return it('returns an object with .completed=true if there\'s at least one completed session and no incomplete sessions', function() {
        var progress, progressData;
        this.classroom.sessions = new LevelSessions();
        progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
        progress = progressData.get({
          classroom: this.classroom,
          course: this.course,
          level: this.practiceLevel
        });
        expect(progress.completed).toBe(false);
        expect(progress.started).toBe(false);
        this.classroom.sessions.push(factories.makeLevelSession({
          state: {
            complete: true
          }
        }, {
          level: this.practiceLevel,
          creator: this.members.first()
        }));
        progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
        progress = progressData.get({
          classroom: this.classroom,
          course: this.course,
          level: this.practiceLevel
        });
        expect(progress.completed).toBe(true);
        expect(progress.started).toBe(true);
        progress = progressData.get({
          classroom: this.classroom,
          course: this.course,
          level: this.practiceLevel
        });
        this.classroom.sessions.push(factories.makeLevelSession({
          state: {
            complete: false
          }
        }, {
          level: this.practiceLevel,
          creator: this.members.last()
        }));
        progressData = helper.calculateAllProgress(this.classrooms, this.courses, this.courseInstances, this.members);
        progress = progressData.get({
          classroom: this.classroom,
          course: this.course,
          level: this.practiceLevel
        });
        expect(progress.completed).toBe(false);
        return expect(progress.started).toBe(true);
      });
    });
  });
});
});

;require.register("test/app/lib/GoalManager.spec", function(exports, require, module) {
xdescribe('GoalManager', function() {
  var GoalManager, deadState, halfLiveState, liveState;
  GoalManager = require('lib/world/GoalManager');
  liveState = {
    stateMap: {
      '1': {
        health: 10
      },
      '2': {
        health: 5
      }
    }
  };
  halfLiveState = {
    stateMap: {
      '1': {
        health: 0
      },
      '2': {
        health: 5
      }
    }
  };
  deadState = {
    stateMap: {
      '1': {
        health: 0
      },
      '2': {
        health: -5
      }
    }
  };
  it('can tell when everyone is dead', function() {
    var gm, goal, world;
    gm = new GoalManager(1);
    world = {
      frames: [liveState, liveState, liveState]
    };
    gm.setWorld(world);
    goal = {
      id: 'die',
      name: 'Kill Everyone',
      killGuy: ['1', '2']
    };
    gm.addGoal(goal);
    expect(gm.goalStates['die'].complete).toBe(false);
    world.frames.push(deadState);
    world.frames.push(deadState);
    gm.setWorld(world);
    expect(gm.goalStates['die'].complete).toBe(true);
    return expect(gm.goalStates['die'].frameCompleted).toBe(3);
  });
  return it('can tell when someone is saved', function() {
    var gm, goal, world;
    gm = new GoalManager(1);
    world = {
      frames: [liveState, liveState, liveState, deadState, deadState]
    };
    gm.setWorld(world);
    goal = {
      id: 'live',
      name: 'Save guy 2',
      saveGuy: '2'
    };
    gm.addGoal(goal);
    expect(gm.goalStates['live'].complete).toBe(false);
    world = {
      frames: [liveState, liveState, liveState, liveState, liveState]
    };
    gm.setWorld(world);
    return expect(gm.goalStates['live'].complete).toBe(true);
  });
});
});

;require.register("test/app/lib/HtmlExtractor.spec", function(exports, require, module) {
var HtmlExtractor;

HtmlExtractor = require('lib/HtmlExtractor');

xdescribe('HtmlExtractor', function() {
  var studentHtml;
  studentHtml = "<style>\n  #some-id {}\n  .thing1, .thing2 {\n    color: blue;\n  }\n  div { something: invalid }\n  .element[with=\"attributes\"] {}\n</style>\n<script>\n  var paragraphs = $(  \t\"p\" )\n  paragraphs.toggleClass(\"some-class\")\n  $('div').children().insertAfter($('<a> '))\n</script>\n<div>\n  Hi there!\n</div>";
  return describe('extractCssSelectors', function() {
    it('extracts a list of all CSS selectors used in CSS code or jQuery calls', function() {
      var extractedSelectors, ref, scripts, styles;
      ref = HtmlExtractor.extractStylesAndScripts(studentHtml), styles = ref.styles, scripts = ref.scripts;
      extractedSelectors = HtmlExtractor.extractCssSelectors(styles, scripts);
      return expect(extractedSelectors).toEqual(['#some-id', '.thing1, .thing2', 'div', '.element[with="attributes"]', 'p', 'div']);
    });
    it('extracts a list of all CSS selectors used in CSS code', function() {
      var extractedSelectors, ref, scripts, styles;
      ref = HtmlExtractor.extractStylesAndScripts(studentHtml), styles = ref.styles, scripts = ref.scripts;
      extractedSelectors = HtmlExtractor.extractSelectorsFromCss(styles, scripts);
      return expect(extractedSelectors).toEqual(['#some-id', '.thing1, .thing2', 'div', '.element[with="attributes"]']);
    });
    return it('extracts a list of all CSS selectors used in jQuery calls', function() {
      var extractedSelectors, ref, scripts, styles;
      ref = HtmlExtractor.extractStylesAndScripts(studentHtml), styles = ref.styles, scripts = ref.scripts;
      extractedSelectors = HtmlExtractor.extractSelectorsFromJS(scripts);
      return expect(extractedSelectors).toEqual(['p', 'div']);
    });
  });
});
});

;require.register("test/app/lib/LevelLoader.spec", function(exports, require, module) {
var Level, LevelComponent, LevelLoader, LevelSession, SuperModel, levelWithOgreWithMace, levelWithShaman, levelWithShamanWithSuperWand, sessionWithAnyaWithGloves, sessionWithTharinWithHelmet, thangTypeAnyaWithJumpsComponent, thangTypeOgreWithPhysicalComponent, thangTypeShamanWithWandEquipped, thangTypeTharinWithHealsComponent, thangTypeWand,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Level = require('models/Level');

LevelSession = require('models/LevelSession');

SuperModel = require('models/SuperModel');

LevelComponent = require('models/LevelComponent');

LevelLoader = require('lib/LevelLoader');

levelWithOgreWithMace = {
  thangs: [
    {
      thangType: 'ogre',
      components: [
        {
          original: LevelComponent.EquipsID,
          majorVersion: 0,
          config: {
            inventory: {
              'left-hand': 'mace'
            }
          }
        }
      ]
    }
  ]
};

levelWithShaman = {
  thangs: [
    {
      thangType: 'shaman'
    }
  ]
};

levelWithShamanWithSuperWand = {
  thangs: [
    {
      thangType: 'shaman',
      components: [
        {
          original: LevelComponent.EquipsID,
          majorVersion: 0,
          config: {
            inventory: {
              'left-hand': 'super-wand'
            }
          }
        }
      ]
    }
  ]
};

sessionWithTharinWithHelmet = {
  heroConfig: {
    thangType: 'tharin',
    inventory: {
      'head': 'helmet'
    }
  }
};

sessionWithAnyaWithGloves = {
  heroConfig: {
    thangType: 'anya',
    inventory: {
      'head': 'gloves'
    }
  }
};

thangTypeOgreWithPhysicalComponent = {
  name: 'Ogre',
  original: 'ogre',
  components: [
    {
      original: 'physical',
      majorVersion: 0
    }
  ]
};

thangTypeShamanWithWandEquipped = {
  name: 'Shaman',
  original: 'shaman',
  components: [
    {
      original: LevelComponent.EquipsID,
      majorVersion: 0,
      config: {
        inventory: {
          'left-hand': 'wand'
        }
      }
    }
  ]
};

thangTypeTharinWithHealsComponent = {
  name: 'Tharin',
  original: 'tharin',
  components: [
    {
      original: 'heals',
      majorVersion: 0
    }
  ]
};

thangTypeWand = {
  name: 'Wand',
  original: 'wand',
  components: [
    {
      original: 'poisons',
      majorVersion: 0
    }
  ]
};

thangTypeAnyaWithJumpsComponent = {
  name: 'Anya',
  original: 'anya',
  components: [
    {
      original: 'jumps',
      majorVersion: 0
    }
  ]
};

describe('LevelLoader', function() {
  describe('loadDependenciesForSession', function() {
    it('loads hero and item thang types from heroConfig in the given session', function() {
      var levelLoader, r, requests, session, urls;
      levelLoader = new LevelLoader({
        supermodel: new SuperModel(),
        sessionID: 'id',
        levelID: 'id'
      });
      levelLoader.sessionDependenciesRegistered = {};
      session = new LevelSession(sessionWithAnyaWithGloves);
      levelLoader.loadDependenciesForSession(session);
      requests = jasmine.Ajax.requests.all();
      urls = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = requests.length; i < len; i++) {
          r = requests[i];
          results.push(r.url);
        }
        return results;
      })();
      expect(indexOf.call(urls, '/db/thang.type/gloves/version?project=name,components,original,rasterIcon,kind') >= 0).toBeTruthy();
      return expect(indexOf.call(urls, '/db/thang.type/anya/version') >= 0).toBeTruthy();
    });
    it('loads components for the hero in the heroConfig in the given session', function() {
      var levelLoader, r, requests, responses, session, urls;
      levelLoader = new LevelLoader({
        supermodel: new SuperModel(),
        sessionID: 'id',
        levelID: 'id'
      });
      levelLoader.sessionDependenciesRegistered = {};
      session = new LevelSession(sessionWithAnyaWithGloves);
      levelLoader.loadDependenciesForSession(session);
      responses = {
        '/db/thang.type/anya/version': thangTypeAnyaWithJumpsComponent
      };
      jasmine.Ajax.requests.sendResponses(responses);
      requests = jasmine.Ajax.requests.all();
      urls = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = requests.length; i < len; i++) {
          r = requests[i];
          results.push(r.url);
        }
        return results;
      })();
      return expect(indexOf.call(urls, '/db/level.component/jumps/version/0') >= 0).toBeTruthy();
    });
    return it('is idempotent', function() {
      var levelLoader, numRequestsAfter, numRequestsBefore, responses, session;
      levelLoader = new LevelLoader({
        supermodel: new SuperModel(),
        sessionID: 'id',
        levelID: 'id'
      });
      responses = {
        '/db/level/id': levelWithOgreWithMace
      };
      jasmine.Ajax.requests.sendResponses(responses);
      responses = {
        '/db/level.session/id': sessionWithTharinWithHelmet
      };
      jasmine.Ajax.requests.sendResponses(responses);
      session = new LevelSession(sessionWithTharinWithHelmet);
      levelLoader.loadDependenciesForSession(session);
      numRequestsBefore = jasmine.Ajax.requests.count();
      levelLoader.loadDependenciesForSession(session);
      levelLoader.loadDependenciesForSession(session);
      numRequestsAfter = jasmine.Ajax.requests.count();
      return expect(numRequestsAfter).toBe(numRequestsBefore);
    });
  });
  it('loads thangs for items that the level thangs have in their Equips component configs', function() {
    var r, requests, responses, supermodel, urls;
    new LevelLoader({
      supermodel: supermodel = new SuperModel(),
      sessionID: 'id',
      levelID: 'id'
    });
    responses = {
      '/db/level/id': levelWithOgreWithMace
    };
    jasmine.Ajax.requests.sendResponses(responses);
    requests = jasmine.Ajax.requests.all();
    urls = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = requests.length; i < len; i++) {
        r = requests[i];
        results.push(r.url);
      }
      return results;
    })();
    return expect(indexOf.call(urls, '/db/thang.type/mace/version?project=name,components,original,rasterIcon,kind,prerenderedSpriteSheetData') >= 0).toBeTruthy();
  });
  it('loads components which are inherited by level thangs from thang type default components', function() {
    var r, requests, responses, urls;
    new LevelLoader({
      supermodel: new SuperModel(),
      sessionID: 'id',
      levelID: 'id'
    });
    responses = {
      '/db/level/id': levelWithOgreWithMace,
      '/db/thang.type/names': [thangTypeOgreWithPhysicalComponent]
    };
    jasmine.Ajax.requests.sendResponses(responses);
    requests = jasmine.Ajax.requests.all();
    urls = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = requests.length; i < len; i++) {
        r = requests[i];
        results.push(r.url);
      }
      return results;
    })();
    return expect(indexOf.call(urls, '/db/level.component/physical/version/0') >= 0).toBeTruthy();
  });
  it('loads item thang types which are inherited by level thangs from thang type default equips component configs', function() {
    var r, requests, responses, urls;
    new LevelLoader({
      supermodel: new SuperModel(),
      sessionID: 'id',
      levelID: 'id'
    });
    responses = {
      '/db/level/id': levelWithShaman,
      '/db/thang.type/names': [thangTypeShamanWithWandEquipped]
    };
    jasmine.Ajax.requests.sendResponses(responses);
    requests = jasmine.Ajax.requests.all();
    urls = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = requests.length; i < len; i++) {
        r = requests[i];
        results.push(r.url);
      }
      return results;
    })();
    return expect(indexOf.call(urls, '/db/thang.type/wand/version?project=name,components,original,rasterIcon,kind,prerenderedSpriteSheetData') >= 0).toBeTruthy();
  });
  return it('loads components for item thang types which are inherited by level thangs from thang type default equips component configs', function() {
    var r, requests, responses, urls;
    new LevelLoader({
      supermodel: new SuperModel(),
      sessionID: 'id',
      levelID: 'id'
    });
    responses = {
      '/db/level/id': levelWithShaman,
      '/db/thang.type/names': [thangTypeShamanWithWandEquipped],
      '/db/thang.type/wand/version?project=name,components,original,rasterIcon,kind': thangTypeWand
    };
    jasmine.Ajax.requests.sendResponses(responses);
    requests = jasmine.Ajax.requests.all();
    urls = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = requests.length; i < len; i++) {
        r = requests[i];
        results.push(r.url);
      }
      return results;
    })();
    return expect(indexOf.call(urls, '/db/level.component/poisons/version/0') >= 0).toBeTruthy();
  });
});
});

;require.register("test/app/lib/ScriptManager.spec", function(exports, require, module) {
describe('ScriptManager', function() {
  var ScriptManager;
  ScriptManager = require('lib/scripts/ScriptManager');
  xit('broadcasts note with event upon hearing from channel', function() {
    var f, gotEvent, note, noteGroup, script, sm;
    note = {
      channel: 'cnn',
      event: {
        1: 1
      }
    };
    noteGroup = {
      duration: 0,
      notes: [note]
    };
    script = {
      channel: 'pbs',
      noteChain: [noteGroup]
    };
    sm = new ScriptManager({
      scripts: [script]
    });
    sm.paused = false;
    gotEvent = {};
    f = function(event) {
      return gotEvent = event;
    };
    Backbone.Mediator.subscribe('cnn', f, this);
    Backbone.Mediator.publish('pbs');
    expect(gotEvent[1]).toBe(note.event[1]);
    sm.destroy();
    return Backbone.Mediator.unsubscribe('cnn', f, this);
  });
  xit('is silent when script event do not match', function() {
    var f, gotEvent, note, noteGroup, script, sm;
    note = {
      channel: 'cnn',
      event: {
        1: 1
      }
    };
    noteGroup = {
      duration: 0,
      notes: [note]
    };
    script = {
      channel: 'pbs',
      eventPrereqs: [
        {
          eventProps: 'foo',
          equalTo: 'bar'
        }
      ],
      noteChain: [noteGroup]
    };
    sm = new ScriptManager([script]);
    sm.paused = false;
    gotEvent = null;
    f = function(event) {
      return gotEvent = event;
    };
    Backbone.Mediator.subscribe('cnn', f, this);
    Backbone.Mediator.publish('pbs', {
      foo: 'rad'
    });
    expect(gotEvent).toBeNull();
    Backbone.Mediator.publish('pbs', 'bar');
    Backbone.Mediator.publish('pbs');
    Backbone.Mediator.publish('pbs', {
      foo: 'bar'
    });
    expect(gotEvent[1]).toBe(note.event[1]);
    sm.destroy();
    return Backbone.Mediator.unsubscribe('cnn', f, this);
  });
  xit('makes no subscriptions when something is invalid', function() {
    var note, noteGroup, script, sm;
    note = {
      event: {
        1: 1
      }
    };
    noteGroup = {
      notes: [note]
    };
    script = {
      channel: 'pbs',
      noteChain: [noteGroup]
    };
    sm = new ScriptManager([script]);
    expect(sm.subscriptions['pbs']).toBe(void 0);
    return sm.destroy();
  });
  xit('fills out lots of notes based on note group properties', function() {
    var channels, note, noteGroup, script, sm;
    note = {
      channel: 'cnn',
      event: {
        1: 1
      }
    };
    noteGroup = {
      duration: 0,
      botPos: [1, 2],
      botMessage: 'testers',
      domHighlight: '#code-area',
      surfaceHighlights: ['Guy0', 'Guy1'],
      scrubToTime: 20,
      notes: [note]
    };
    script = {
      channel: 'pbs',
      noteChain: [noteGroup]
    };
    sm = new ScriptManager([script]);
    sm.paused = false;
    Backbone.Mediator.publish('pbs');
    expect(sm.lastNoteGroup.notes.length).toBe(7);
    channels = (function() {
      var i, len, ref, results;
      ref = sm.lastNoteGroup.notes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        note = ref[i];
        results.push(note.channel);
      }
      return results;
    })();
    expect(channels).toContain('cnn');
    expect(channels).toContain('level-bot-move');
    expect(channels).toContain('level-bot-say');
    expect(channels).toContain('level-highlight-dom');
    expect(channels).toContain('level-highlight-sprites');
    expect(channels).toContain('level-set-time');
    expect(channels).toContain('level-disable-controls');
    return sm.destroy();
  });
  xit('releases notes based on user confirmation', function() {
    var f, f1, f2, gotCbsEvent, gotCnnEvent, note1, note2, noteGroup1, noteGroup2, script, sm;
    note1 = {
      channel: 'cnn',
      event: {
        1: 1
      }
    };
    note2 = {
      channel: 'cbs',
      event: {
        2: 2
      }
    };
    noteGroup1 = {
      duration: 0,
      notes: [note1]
    };
    noteGroup2 = {
      duration: 0,
      notes: [note2]
    };
    script = {
      channel: 'pbs',
      noteChain: [noteGroup1, noteGroup2]
    };
    sm = new ScriptManager({
      scripts: [script]
    });
    sm.paused = false;
    gotCnnEvent = null;
    f1 = function(event) {
      return gotCnnEvent = event;
    };
    Backbone.Mediator.subscribe('cnn', f1, this);
    gotCbsEvent = null;
    f2 = function(event) {
      return gotCbsEvent = event;
    };
    Backbone.Mediator.subscribe('cbs', f2, this);
    Backbone.Mediator.publish('pbs');
    expect(gotCnnEvent[1]).toBe(1);
    expect(gotCbsEvent).toBeNull();
    expect(sm.scriptInProgress).toBe(true);
    runs(function() {
      return Backbone.Mediator.publish('script:end-current-script');
    });
    f = function() {
      return gotCbsEvent != null;
    };
    waitsFor(f, 'The next event should have been published', 20);
    f = function() {
      expect(gotCnnEvent[1]).toBe(1);
      expect(gotCbsEvent[2]).toBe(2);
      expect(sm.scriptInProgress).toBe(true);
      Backbone.Mediator.publish('end-current-script');
      expect(sm.scriptInProgress).toBe(false);
      sm.destroy();
      Backbone.Mediator.unsubscribe('cnn', f1, this);
      return Backbone.Mediator.unsubscribe('cbs', f2, this);
    };
    return runs(f);
  });
  return xit('ignores triggers for scripts waiting for other scripts to fire', function() {
    var f, gotCbsEvent, note1, note2, noteGroup1, noteGroup2, script1, script2, sm;
    note1 = {
      channel: 'cnn',
      event: {
        1: 1
      }
    };
    note2 = {
      channel: 'cbs',
      event: {
        2: 2
      }
    };
    noteGroup1 = {
      duration: 0,
      notes: [note1]
    };
    noteGroup2 = {
      duration: 0,
      notes: [note2]
    };
    script1 = {
      channel: 'channel1',
      id: 'channel1Script',
      noteChain: [noteGroup1]
    };
    script2 = {
      channel: 'channel2',
      scriptPrereqs: ['channel1Script'],
      noteChain: [noteGroup2]
    };
    sm = new ScriptManager([script1, script2]);
    sm.paused = false;
    gotCbsEvent = null;
    f = function(event) {
      return gotCbsEvent = event;
    };
    Backbone.Mediator.subscribe('cbs', f, this);
    Backbone.Mediator.publish('channel2');
    expect(gotCbsEvent).toBeNull();
    Backbone.Mediator.publish('channel1');
    expect(gotCbsEvent).toBeNull();
    Backbone.Mediator.publish('channel2');
    expect(gotCbsEvent).toBeNull();
    Backbone.Mediator.publish('script:end-current-script');
    expect(gotCbsEvent[1]).toBe(2);
    sm.destroy();
    return Backbone.Mediator.unsubscribe('cnn', f, this);
  });
});
});

;require.register("test/app/lib/local_mongo.spec", function(exports, require, module) {
describe('Local Mongo queries', function() {
  var LocalMongo;
  LocalMongo = require('lib/LocalMongo');
  beforeEach(function() {
    this.fixture1 = {
      'id': 'somestring',
      'value': 9000,
      'levels': [3, 8, 21],
      'worth': 6,
      'type': 'unicorn',
      'likes': ['poptarts', 'popsicles', 'popcorn'],
      nested: {
        str: 'ing'
      }
    };
    return this.fixture2 = {
      "this": {
        is: {
          so: 'deep'
        }
      }
    };
  });
  it('regular match of a property', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'gender': 'unicorn'
    })).toBeFalsy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'type': 'unicorn'
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'type': 'zebra'
    })).toBeFalsy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      'type': 'unicorn',
      'id': 'somestring'
    })).toBeTruthy();
  });
  it('array match of a property', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'likes': 'poptarts'
    })).toBeTruthy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      'likes': 'walks on the beach'
    })).toBeFalsy();
  });
  it('nested match', function() {
    var mixedQuery;
    expect(LocalMongo.matchesQuery(this.fixture2, {
      'this.is.so': 'deep'
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture2, {
      "this": {
        is: {
          so: 'deep'
        }
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture2, {
      'this.is': {
        so: 'deep'
      }
    })).toBeTruthy();
    mixedQuery = {
      nested: {
        str: 'ing'
      },
      worth: {
        $gt: 3
      }
    };
    expect(LocalMongo.matchesQuery(this.fixture1, mixedQuery)).toBeTruthy();
    return expect(LocalMongo.matchesQuery(this.fixture2, mixedQuery)).toBeFalsy();
  });
  it('$gt selector', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$gt': 8000
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$gt': [8000, 10000]
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'levels': {
        '$gt': [10, 20, 30]
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$gt': 9000
      }
    })).toBeFalsy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$gt': 8000
      },
      'worth': {
        '$gt': 5
      }
    })).toBeTruthy();
  });
  it('$gte selector', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$gte': 9001
      }
    })).toBeFalsy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$gte': 9000
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$gte': [9000, 10000]
      }
    })).toBeTruthy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      'levels': {
        '$gte': [21, 30]
      }
    })).toBeTruthy();
  });
  it('$lt selector', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$lt': 9001
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$lt': 9000
      }
    })).toBeFalsy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$lt': [9001, 9000]
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'levels': {
        '$lt': [10, 20, 30]
      }
    })).toBeTruthy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$lt': 9001
      },
      'worth': {
        '$lt': 7
      }
    })).toBeTruthy();
  });
  it('$lte selector', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$lte': 9000
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$lte': 8000
      }
    })).toBeFalsy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$lte': 9000
      },
      'worth': {
        '$lte': [6, 5]
      }
    })).toBeTruthy();
  });
  it('$ne selector', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'value': {
        '$ne': 9000
      }
    })).toBeFalsy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'id': {
        '$ne': 'otherstring'
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'id': {
        '$ne': ['otherstring', 'somestring']
      }
    })).toBeFalsy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      'likes': {
        '$ne': ['popcorn', 'chicken']
      }
    })).toBeFalsy();
  });
  it('$in selector', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'type': {
        '$in': ['unicorn', 'zebra']
      }
    })).toBeTruthy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'type': {
        '$in': ['cats', 'dogs']
      }
    })).toBeFalsy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      'likes': {
        '$in': ['popcorn', 'chicken']
      }
    })).toBeTruthy();
  });
  it('$nin selector', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'type': {
        '$nin': ['unicorn', 'zebra']
      }
    })).toBeFalsy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      'type': {
        '$nin': ['cats', 'dogs']
      }
    })).toBeTruthy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      'likes': {
        '$nin': ['popcorn', 'chicken']
      }
    })).toBeFalsy();
  });
  it('$or operator', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      $or: [
        {
          value: 9000
        }, {
          type: 'zebra'
        }
      ]
    })).toBeTruthy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      $or: [
        {
          value: 9001
        }, {
          worth: {
            '$lt': 10
          }
        }
      ]
    })).toBeTruthy();
  });
  it('$and operator', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      $and: [
        {
          value: 9000
        }, {
          type: 'zebra'
        }
      ]
    })).toBeFalsy();
    expect(LocalMongo.matchesQuery(this.fixture1, {
      $and: [
        {
          value: 9000
        }, {
          type: 'unicorn'
        }
      ]
    })).toBeTruthy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      $and: [
        {
          value: {
            '$gte': 9000
          }
        }, {
          worth: {
            '$lt': 10
          }
        }
      ]
    })).toBeTruthy();
  });
  return it('$exists operator', function() {
    expect(LocalMongo.matchesQuery(this.fixture1, {
      type: {
        $exists: true
      }
    })).toBeTruthy();
    return expect(LocalMongo.matchesQuery(this.fixture1, {
      interesting: {
        $exists: false
      }
    })).toBeTruthy();
  });
});
});

;require.register("test/app/lib/surface/Camera.spec", function(exports, require, module) {
describe('Camera (Surface point of view)', function() {
  var Camera, checkCameraPos, checkConversionsFromWorldPos, expectPositionsEqual, testAngles, testCanvasSizes, testFOVs, testLayer, testWops, testZoomTargets, testZooms;
  Camera = require('lib/surface/Camera');
  expectPositionsEqual = function(p1, p2) {
    expect(p1.x).toBeCloseTo(p2.x);
    expect(p1.y).toBeCloseTo(p2.y);
    if (p2.z != null) {
      return expect(p1.z).toBeCloseTo(p2.z);
    }
  };
  checkConversionsFromWorldPos = function(wop, cam) {
    var cap, scp, sup, wop2;
    sup = cam.worldToSurface(wop);
    expect(sup.x).toBeCloseTo(wop.x * Camera.PPM);
    expect(sup.y).toBeCloseTo(-(wop.y + wop.z * cam.z2y) * cam.y2x * Camera.PPM);
    cap = cam.worldToCanvas(wop);
    expect(cap.x).toBeCloseTo((sup.x - cam.surfaceViewport.x) * cam.zoom);
    expect(cap.y).toBeCloseTo((sup.y - cam.surfaceViewport.y) * cam.zoom);
    scp = cam.worldToScreen(wop);
    wop2 = cam.surfaceToWorld(sup);
    expect(wop2.x).toBeCloseTo(wop.x);
    expect(wop2.y).toBeCloseTo(wop.y + wop.z * cam.z2y);
    expectPositionsEqual(sup, cam.worldToSurface(wop2));
    expectPositionsEqual(cap, cam.surfaceToCanvas(sup));
    expectPositionsEqual(scp, cam.canvasToScreen(cap));
    expectPositionsEqual(cap, cam.screenToCanvas(scp));
    expectPositionsEqual(sup, cam.canvasToSurface(cap));
    expectPositionsEqual(wop2, cam.surfaceToWorld(sup));
    expectPositionsEqual(wop2, cam.canvasToWorld(cap));
    expectPositionsEqual(cap, cam.worldToCanvas(wop));
    expectPositionsEqual(scp, cam.worldToScreen(wop));
    expectPositionsEqual(scp, cam.surfaceToScreen(sup));
    expectPositionsEqual(sup, cam.screenToSurface(scp));
    return expectPositionsEqual(wop2, cam.screenToWorld(scp));
  };
  checkCameraPos = function(cam, wop) {
    var botDist, botFOV, camDist, d, decimalPlaces, dx, dy, dz, targetPos;
    botFOV = cam.x2y * cam.vFOV / (cam.y2x + cam.x2y);
    botDist = cam.worldViewport.height * Math.sin(cam.angle) / Math.sin(botFOV);
    camDist = (cam.worldViewport.height / 2) * Math.sin(Math.PI - cam.angle - botFOV) / Math.sin(botFOV);
    targetPos = {
      x: cam.worldViewport.cx,
      y: cam.worldViewport.cy - camDist * cam.y2x * cam.z2y,
      z: camDist * cam.z2x * cam.y2z
    };
    expectPositionsEqual(cam.cameraWorldPos(), targetPos);
    if (wop) {
      dx = targetPos.x - wop.x;
      dy = targetPos.y - wop.y;
      dz = targetPos.z - wop.z;
      d = cam.distanceTo(wop);
      expect(d).toBeCloseTo(Math.sqrt(dx * dx + dy * dy + dz * dz));
      decimalPlaces = 3 - Math.floor(Math.log(d / camDist) / Math.log(10));
      return expect(cam.distanceRatioTo(wop)).toBeCloseTo(d / camDist, decimalPlaces);
    }
  };
  testWops = [
    {
      x: 3,
      y: 4,
      z: 7
    }, {
      x: -4,
      y: 12,
      z: 2
    }, {
      x: 0,
      y: 0,
      z: 0
    }
  ];
  testCanvasSizes = [
    {
      width: 100,
      height: 100
    }, {
      width: 200,
      height: 50
    }
  ];
  testLayer = {
    scaleX: 1,
    scaleY: 1,
    regX: 0,
    regY: 0
  };
  testZooms = [0.5, 1, 2];
  testZoomTargets = [
    null, {
      x: 50,
      y: 50
    }, {
      x: 0,
      y: 150
    }
  ];
  testAngles = [0, Math.PI / 4, null, Math.PI / 2];
  testFOVs = [Math.PI / 6, Math.PI / 3, Math.PI / 2, Math.PI];
  it('handles lots of different cases correctly', function() {
    var angle, cam, fov, i, len, results, size, target, wop, zoom;
    results = [];
    for (i = 0, len = testWops.length; i < len; i++) {
      wop = testWops[i];
      results.push((function() {
        var j, len1, results1;
        results1 = [];
        for (j = 0, len1 = testCanvasSizes.length; j < len1; j++) {
          size = testCanvasSizes[j];
          results1.push((function() {
            var k, len2, results2;
            results2 = [];
            for (k = 0, len2 = testZooms.length; k < len2; k++) {
              zoom = testZooms[k];
              results2.push((function() {
                var l, len3, results3;
                results3 = [];
                for (l = 0, len3 = testZoomTargets.length; l < len3; l++) {
                  target = testZoomTargets[l];
                  results3.push((function() {
                    var len4, m, results4;
                    results4 = [];
                    for (m = 0, len4 = testAngles.length; m < len4; m++) {
                      angle = testAngles[m];
                      results4.push((function() {
                        var len5, n, results5;
                        results5 = [];
                        for (n = 0, len5 = testFOVs.length; n < len5; n++) {
                          fov = testFOVs[n];
                          cam = new Camera({
                            attr: function(attr) {
                              if ('attr' === 'width') {
                                return size.width;
                              } else {
                                return size.height;
                              }
                            }
                          }, angle, fov);
                          checkCameraPos(cam, wop);
                          cam.zoomTo(target, zoom, 0);
                          checkConversionsFromWorldPos(wop, cam);
                          results5.push(checkCameraPos(cam, wop));
                        }
                        return results5;
                      })());
                    }
                    return results4;
                  })());
                }
                return results3;
              })());
            }
            return results2;
          })());
        }
        return results1;
      })());
    }
    return results;
  });
  it('works at default angle of asin(0.75) ~= 48.9 degrees', function() {
    var angle, cam;
    cam = new Camera({
      attr: function(attr) {
        return 100;
      }
    }, null);
    angle = Math.asin(3 / 4);
    expect(cam.angle).toBeCloseTo(angle);
    expect(cam.x2y).toBeCloseTo(4 / 3);
    expect(cam.x2z).toBeCloseTo(1 / Math.cos(angle));
    return expect(cam.z2y).toBeCloseTo((4 / 3) * Math.cos(angle));
  });
  xit('works at 2x zoom, 90 degrees', function() {
    var cam, cap, wop;
    cam = new Camera({
      attr: function(attr) {
        return 100;
      }
    }, Math.PI / 2);
    cam.zoomTo(null, 2, 0);
    checkCameraPos(cam);
    wop = {
      x: 5,
      y: 2.5,
      z: 7
    };
    cap = cam.worldToCanvas(wop);
    expectPositionsEqual(cap, {
      x: 50,
      y: 100
    });
    cam.zoomTo({
      x: 50,
      y: 75
    }, 2, 0);
    checkCameraPos(cam);
    cap = cam.worldToCanvas(wop);
    expectPositionsEqual(cap, {
      x: 50,
      y: 50
    });
    cam.zoomTo({
      x: 50,
      y: 75
    }, 4, 0);
    checkCameraPos(cam);
    cap = cam.worldToCanvas(wop);
    expectPositionsEqual(cap, {
      x: 50,
      y: 50
    });
    cam.zoomTo({
      x: 100,
      y: 100
    }, 2, 0);
    checkCameraPos(cam);
    cap = cam.worldToCanvas(wop);
    return expectPositionsEqual(cap, {
      x: 0,
      y: 50
    });
  });
  xit('works at 2x zoom, 30 degrees', function() {
    var cam, cap, sup, wop;
    cam = new Camera({
      attr: function(attr) {
        return 100;
      }
    }, Math.PI / 6);
    cam.zoomTo(null, 2, 0);
    expect(cam.x2y).toBeCloseTo(1);
    expect(cam.x2z).toBeGreaterThan(9001);
    checkCameraPos(cam);
    wop = {
      x: 5,
      y: 4,
      z: 6 * cam.y2z
    };
    sup = cam.worldToSurface(wop);
    expect(cam.surfaceToWorld(sup).y).toBeCloseTo(10);
    expectPositionsEqual(sup, {
      x: 50,
      y: 50
    });
    cap = cam.surfaceToCanvas(sup);
    expectPositionsEqual(cap, {
      x: 50,
      y: 50
    });
    cam.zoomTo({
      x: 50,
      y: 100
    }, 2, 0);
    checkCameraPos(cam);
    cap = cam.worldToCanvas(wop);
    expectPositionsEqual(cap, {
      x: 50,
      y: 0
    });
    cam.zoomTo({
      x: 50,
      y: 100
    }, 4, 0);
    checkCameraPos(cam);
    cap = cam.worldToCanvas(wop);
    return expectPositionsEqual(cap, {
      x: 50,
      y: -100
    });
  });
  it('works at 2x zoom, 60 degree hFOV', function() {
    var cam;
    cam = new Camera({
      attr: function(attr) {
        return 100;
      }
    }, null, Math.PI / 3);
    cam.zoomTo(null, 2, 0);
    return checkCameraPos(cam);
  });
  it('works at 2x zoom, 60 degree hFOV, 40 degree vFOV', function() {
    var cam;
    cam = new Camera({
      attr: function(attr) {
        if (attr === 'height') {
          return 63.041494;
        } else {
          return 100;
        }
      }
    }, null, Math.PI / 3);
    cam.zoomTo(null, 2, 0);
    return checkCameraPos(cam);
  });
  return xit('works at 2x zoom on a surface wider than it is tall, 30 degrees, default viewing upper left corner', function() {
    var cam, cap, wop;
    cam = new Camera({
      attr: function(attr) {
        return 100;
      }
    }, Math.PI / 6);
    cam.zoomTo(null, 2, 0);
    checkCameraPos(cam);
    expect(cam.zoom).toBeCloseTo(2);
    wop = {
      x: 5,
      y: 4,
      z: 6 * cam.y2z
    };
    cap = cam.worldToCanvas(wop);
    expectPositionsEqual(cap, {
      x: 100,
      y: 0
    });
    cam.zoomTo({
      x: 9001,
      y: 25
    }, 0.1, 0);
    checkCameraPos(cam);
    cap = cam.worldToCanvas(wop);
    return expectPositionsEqual(cap, {
      x: -200,
      y: 0
    });
  });
});
});

;require.register("test/app/lib/surface/LankBoss.spec", function(exports, require, module) {
var Camera, GameUIState, LankBoss, ThangType, World, curseData, fangriderData, munchkinData, treeData;

LankBoss = require('lib/surface/LankBoss');

Camera = require('lib/surface/Camera');

World = require('lib/world/world');

ThangType = require('models/ThangType');

GameUIState = require('models/GameUIState');

treeData = require('test/app/fixtures/tree1.thang.type');

munchkinData = require('test/app/fixtures/ogre-munchkin-m.thang.type');

fangriderData = require('test/app/fixtures/ogre-fangrider.thang.type');

curseData = require('test/app/fixtures/curse.thang.type');

describe('LankBoss', function() {
  var canvas, init, lankBoss, midRenderExpectations, showMe, stage;
  lankBoss = null;
  canvas = null;
  stage = null;
  midRenderExpectations = [];
  init = function(done) {
    var camera, defaultLayer, fangrider, i, len, options, ref, segmentedMunchkin, segmentedTree, singularMunchkin, singularTree, t, thang, thangTypes, world;
    if (lankBoss) {
      return done();
    }
    t = new Date();
    canvas = $('<canvas width="800" height="600"></canvas>');
    camera = new Camera(canvas);
    world = new World();
    world.thangs = [
      {
        id: 'Segmented Tree',
        spriteName: 'Segmented Tree',
        exists: true,
        shape: 'disc',
        depth: 2,
        pos: {
          x: 10,
          y: -8,
          z: 1
        },
        action: 'idle',
        health: 20,
        maxHealth: 20,
        rotation: Math.PI / 2,
        acts: true
      }, {
        id: 'Singular Tree',
        spriteName: 'Singular Tree',
        exists: true,
        shape: 'disc',
        depth: 2,
        pos: {
          x: 8,
          y: -8,
          z: 1
        },
        action: 'idle',
        health: 20,
        maxHealth: 20,
        rotation: Math.PI / 2,
        acts: true
      }, {
        id: 'Disappearing Tree',
        spriteName: 'Singular Tree',
        exists: true,
        shape: 'disc',
        depth: 2,
        pos: {
          x: 0,
          y: 0,
          z: 1
        },
        action: 'idle',
        health: 20,
        maxHealth: 20,
        rotation: Math.PI / 2,
        acts: true
      }
    ];
    world.thangMap = {};
    ref = world.thangs;
    for (i = 0, len = ref.length; i < len; i++) {
      thang = ref[i];
      world.thangMap[thang.id] = thang;
    }
    fangrider = new ThangType($.extend({}, fangriderData, {
      spriteType: 'segmented',
      name: 'Fangrider',
      slug: 'fangrider'
    }));
    segmentedMunchkin = new ThangType($.extend({}, munchkinData, {
      spriteType: 'segmented',
      name: 'Segmented Munchkin',
      slug: 'segmented-munchkin'
    }));
    singularMunchkin = new ThangType($.extend({}, munchkinData, {
      spriteType: 'singular',
      name: 'Singular Munchkin',
      slug: 'singular-munchkin'
    }));
    segmentedTree = new ThangType($.extend({}, treeData, {
      spriteType: 'segmented',
      name: 'Segmented Tree',
      slug: 'segmented-tree'
    }));
    singularTree = new ThangType($.extend({}, treeData, {
      spriteType: 'singular',
      name: 'Singular Tree',
      slug: 'singular-tree'
    }));
    thangTypes = [fangrider, segmentedMunchkin, singularMunchkin, segmentedTree, singularTree];
    window.stage = stage = new createjs.SpriteStage(canvas[0]);
    options = {
      camera: camera,
      webGLStage: stage,
      surfaceTextLayer: new createjs.Container(),
      world: world,
      thangTypes: thangTypes,
      gameUIState: new GameUIState()
    };
    window.lankBoss = lankBoss = new LankBoss(options);
    defaultLayer = lankBoss.layerAdapters.Default;
    defaultLayer.buildAsync = false;
    defaultLayer.defaultActions = ['idle'];
    lankBoss.update(true);
    midRenderExpectations.push([lankBoss.lanks['Segmented Tree'].sprite.children.length, 1, 'static segmented action']);
    midRenderExpectations.push([lankBoss.lanks['Segmented Tree'].sprite.children[0].currentFrame, 0, 'static segmented action']);
    midRenderExpectations.push([lankBoss.lanks['Segmented Tree'].sprite.children[0].paused, true, 'static segmented action']);
    midRenderExpectations.push([lankBoss.lanks['Singular Tree'].sprite.currentFrame, 0, 'static singular action']);
    midRenderExpectations.push([lankBoss.lanks['Singular Tree'].sprite.paused, true, 'static singular action']);
    return defaultLayer.once('new-spritesheet', function() {
      var child, j, k, len1, len2, ref1, ref2;
      world.thangs = world.thangs.concat([
        {
          id: 'Ogre N',
          spriteName: 'Segmented Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: 0,
            y: 8,
            z: 1
          },
          action: 'move',
          health: 10,
          maxHealth: 10,
          rotation: -Math.PI / 2,
          acts: true,
          scaleFactorX: 1.5,
          hudProperties: ['health']
        }, {
          id: 'Ogre W',
          spriteName: 'Segmented Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: -8,
            y: 0,
            z: 1
          },
          action: 'move',
          health: 8,
          maxHealth: 10,
          rotation: 0,
          acts: true,
          scaleFactorY: 1.5,
          hudProperties: ['health']
        }, {
          id: 'Ogre E',
          spriteName: 'Segmented Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: 8,
            y: 0,
            z: 1
          },
          action: 'move',
          health: 5,
          maxHealth: 10,
          rotation: Math.PI,
          acts: true,
          alpha: 0.5,
          hudProperties: ['health']
        }, {
          id: 'Ogre S',
          spriteName: 'Segmented Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: 0,
            y: -8,
            z: 1
          },
          action: 'move',
          health: 2,
          maxHealth: 10,
          rotation: Math.PI / 2,
          acts: true,
          hudProperties: ['health'],
          effectNames: ['curse']
        }, {
          id: 'Singular Ogre',
          spriteName: 'Singular Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: -10,
            y: -8,
            z: 1
          },
          action: 'move',
          health: 10,
          maxHealth: 10,
          rotation: -Math.PI / 2,
          acts: true,
          alpha: 0.5
        }, {
          id: 'Segmented Ogre',
          spriteName: 'Segmented Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: -8,
            y: -8,
            z: 1
          },
          action: 'move',
          health: 10,
          maxHealth: 10,
          rotation: -Math.PI / 2,
          acts: true
        }, {
          id: 'Dying Ogre 1',
          spriteName: 'Segmented Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: -14,
            y: 0,
            z: 1
          },
          action: 'die',
          health: 5,
          maxHealth: 10,
          rotation: 0,
          acts: true
        }, {
          id: 'Dying Ogre 2',
          spriteName: 'Segmented Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: -13.5,
            y: 1,
            z: 1
          },
          action: 'die',
          health: 5,
          maxHealth: 10,
          rotation: 0,
          acts: true
        }, {
          id: 'Dying Ogre 3',
          spriteName: 'Segmented Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: -13,
            y: 2,
            z: 1
          },
          action: 'die',
          health: 5,
          maxHealth: 10,
          rotation: 0,
          acts: true
        }, {
          id: 'Dying Ogre 4',
          spriteName: 'Segmented Munchkin',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: -12.5,
            y: 3,
            z: 1
          },
          action: 'die',
          health: 5,
          maxHealth: 10,
          rotation: 0,
          acts: true
        }, {
          id: 'Fangrider',
          spriteName: 'Fangrider',
          exists: true,
          shape: 'disc',
          depth: 2,
          pos: {
            x: 8,
            y: 8,
            z: 1
          },
          action: 'move',
          health: 20,
          maxHealth: 20,
          rotation: 0,
          acts: true,
          currentEvents: ['aoe-' + JSON.stringify([0, 0, 8, '#00F'])]
        }
      ]);
      _.find(world.thangs, {
        id: 'Disappearing Tree'
      }).exists = false;
      ref1 = world.thangs;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        thang = ref1[j];
        world.thangMap[thang.id] = thang;
      }
      lankBoss.update(true);
      jasmine.Ajax.requests.sendResponses({
        '/db/thang.type/curse': curseData
      });
      midRenderExpectations.push([lankBoss.lanks['Segmented Ogre'].sprite.children.length, 10, 'animated segmented action']);
      ref2 = lankBoss.lanks['Segmented Ogre'].sprite.children;
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        child = ref2[k];
        midRenderExpectations.push([child.children[0].currentFrame, 0, 'animated segmented action']);
      }
      midRenderExpectations.push([lankBoss.lanks['Singular Ogre'].sprite.currentFrame, 0, 'animated singular action']);
      midRenderExpectations.push([lankBoss.lanks['Singular Ogre'].sprite.paused, true, 'animated singular action']);
      return defaultLayer.once('new-spritesheet', function() {
        return done();
      });
    });
  };
  beforeEach(function(done) {
    return init(done);
  });
  showMe = function() {
    var listener, ticks;
    canvas.css('position', 'absolute').css('index', 1000).css('background', 'white');
    $('body').append(canvas);
    ticks = 0;
    listener = {
      handleEvent: function() {
        if (ticks >= 100) {
          return;
        }
        ticks += 1;
        if (ticks % 20 === 0) {
          lankBoss.update(true);
        }
        return stage.update();
      }
    };
    createjs.Ticker.addEventListener("tick", listener);
    return $('body').append($('<div style="position: absolute; top: 295px; left: 395px; height: 10px; width: 10px; background: red;"></div>'));
  };
  it('does not display anything for sprites whose animations or containers have not been rendered yet', function() {
    var expectation, i, len, results;
    results = [];
    for (i = 0, len = midRenderExpectations.length; i < len; i++) {
      expectation = midRenderExpectations[i];
      if (expectation[0] !== expectation[1]) {
        console.error('This type of action display failed:', expectation[2]);
      }
      results.push(expect(expectation[0]).toBe(expectation[1]));
    }
    return results;
  });
  it('rotates and animates sprites according to thang rotation', function() {
    expect(lankBoss.lanks['Ogre N'].sprite.currentAnimation).toBe('move_fore');
    expect(lankBoss.lanks['Ogre E'].sprite.currentAnimation).toBe('move_side');
    expect(lankBoss.lanks['Ogre W'].sprite.currentAnimation).toBe('move_side');
    expect(lankBoss.lanks['Ogre S'].sprite.currentAnimation).toBe('move_back');
    expect(lankBoss.lanks['Ogre E'].sprite.scaleX).toBeLessThan(0);
    return expect(lankBoss.lanks['Ogre W'].sprite.scaleX).toBeGreaterThan(0);
  });
  it('positions sprites according to thang pos', function() {
    expect(lankBoss.lanks['Ogre N'].sprite.x).toBe(0);
    expect(lankBoss.lanks['Ogre N'].sprite.y).toBeCloseTo(-60);
    expect(lankBoss.lanks['Ogre E'].sprite.x).toBeCloseTo(80);
    expect(lankBoss.lanks['Ogre E'].sprite.y).toBe(0);
    expect(lankBoss.lanks['Ogre W'].sprite.x).toBe(-80);
    expect(lankBoss.lanks['Ogre W'].sprite.y).toBeCloseTo(0);
    expect(lankBoss.lanks['Ogre S'].sprite.x).toBe(0);
    return expect(lankBoss.lanks['Ogre S'].sprite.y).toBeCloseTo(60);
  });
  it('scales sprites according to thang scaleFactorX and scaleFactorY', function() {
    expect(lankBoss.lanks['Ogre N'].sprite.scaleX).toBe(lankBoss.lanks['Ogre N'].sprite.baseScaleX * 1.5);
    return expect(lankBoss.lanks['Ogre W'].sprite.scaleY).toBe(lankBoss.lanks['Ogre N'].sprite.baseScaleY * 1.5);
  });
  it('sets alpha based on thang alpha', function() {
    return expect(lankBoss.lanks['Ogre E'].sprite.alpha).toBe(0.5);
  });
  it('orders sprites in the layer based on thang pos.y\'s', function() {
    var container, i1, i2, i3, i4, l;
    container = lankBoss.layerAdapters.Default.container;
    l = container.children;
    i1 = container.getChildIndex(_.find(container.children, function(c) {
      return c.lank.thang.id === 'Dying Ogre 1';
    }));
    i2 = container.getChildIndex(_.find(container.children, function(c) {
      return c.lank.thang.id === 'Dying Ogre 2';
    }));
    i3 = container.getChildIndex(_.find(container.children, function(c) {
      return c.lank.thang.id === 'Dying Ogre 3';
    }));
    i4 = container.getChildIndex(_.find(container.children, function(c) {
      return c.lank.thang.id === 'Dying Ogre 4';
    }));
    expect(i1).toBeGreaterThan(i2);
    expect(i2).toBeGreaterThan(i3);
    return expect(i3).toBeGreaterThan(i4);
  });
  return it('only contains children Sprites and SpriteContainers whose spritesheet matches the Layer', function() {
    var c, defaultLayerContainer, i, len, ref, results;
    defaultLayerContainer = lankBoss.layerAdapters.Default.container;
    ref = defaultLayerContainer.children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      results.push(expect(c.spriteSheet).toBe(defaultLayerContainer.spriteSheet));
    }
    return results;
  });
});
});

;require.register("test/app/lib/surface/LayerAdapter.spec", function(exports, require, module) {
var Lank, LayerAdapter, SpriteBuilder, ThangType, ogreMunchkinThangType, treeThangType,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

LayerAdapter = require('lib/surface/LayerAdapter');

Lank = require('lib/surface/Lank');

ThangType = require('models/ThangType');

treeThangType = new ThangType(require('test/app/fixtures/tree1.thang.type'));

ogreMunchkinThangType = new ThangType(require('test/app/fixtures/ogre-munchkin-m.thang.type'));

SpriteBuilder = require('lib/sprites/SpriteBuilder');

describe('LayerAdapter', function() {
  var layer;
  layer = null;
  beforeEach(function() {
    layer = new LayerAdapter({
      webGL: true
    });
    layer.buildAutomatically = false;
    return layer.buildAsync = false;
  });
  it('creates containers for animated actions if set to spriteType=segmented', function() {
    var colorConfig, key, sheet, sprite;
    ogreMunchkinThangType.set('spriteType', 'segmented');
    colorConfig = {
      team: {
        hue: 0,
        saturation: 1,
        lightness: 0.5
      }
    };
    sprite = new Lank(ogreMunchkinThangType, {
      colorConfig: colorConfig
    });
    layer.addLank(sprite);
    sheet = layer.renderNewSpriteSheet();
    key = layer.renderGroupingKey(ogreMunchkinThangType, 'head', colorConfig);
    return expect(indexOf.call(sheet.getAnimations(), key) >= 0).toBe(true);
  });
  it('creates the container for static actions if set to spriteType=segmented', function() {
    var key, sheet, sprite;
    treeThangType.set('spriteType', 'segmented');
    sprite = new Lank(treeThangType);
    layer.addLank(sprite);
    sheet = layer.renderNewSpriteSheet();
    key = layer.renderGroupingKey(treeThangType, 'Tree_4');
    return expect(indexOf.call(sheet.getAnimations(), key) >= 0).toBe(true);
  });
  it('creates animations for animated actions if set to spriteType=singular', function() {
    var colorConfig, key, sheet, sprite;
    ogreMunchkinThangType.set('spriteType', 'singular');
    colorConfig = {
      team: {
        hue: 0,
        saturation: 1,
        lightness: 0.5
      }
    };
    sprite = new Lank(ogreMunchkinThangType, {
      colorConfig: colorConfig
    });
    layer.addLank(sprite);
    sheet = layer.renderNewSpriteSheet();
    key = layer.renderGroupingKey(ogreMunchkinThangType, 'idle', colorConfig);
    return expect(indexOf.call(sheet.getAnimations(), key) >= 0).toBe(true);
  });
  it('creates animations for static actions if set to spriteType=singular', function() {
    var key, sheet, sprite;
    treeThangType.set('spriteType', 'singular');
    sprite = new Lank(treeThangType);
    layer.addLank(sprite);
    sheet = layer.renderNewSpriteSheet();
    key = layer.renderGroupingKey(treeThangType, 'idle');
    return expect(indexOf.call(sheet.getAnimations(), key) >= 0).toBe(true);
  });
  it('only renders frames used by actions when spriteType=singular', function() {
    var animations, colorConfig, key, oldDefaults, sheet, sprite;
    oldDefaults = ThangType.defaultActions;
    ThangType.defaultActions = ['idle'];
    ogreMunchkinThangType.set('spriteType', 'singular');
    colorConfig = {
      team: {
        hue: 0,
        saturation: 1,
        lightness: 0.5
      }
    };
    sprite = new Lank(ogreMunchkinThangType, {
      colorConfig: colorConfig
    });
    layer.addLank(sprite);
    sheet = layer.renderNewSpriteSheet();
    key = layer.renderGroupingKey(ogreMunchkinThangType, 'idle', colorConfig);
    animations = sheet.getAnimations();
    expect(animations.length).toBe(1);
    expect(animations[0]).toBe(key);
    expect(sheet.getNumFrames()).toBe(2);
    return ThangType.defaultActions = oldDefaults;
  });
  it('renders a raster image onto a sheet', function(done) {
    var bootsThangType;
    bootsThangType = new ThangType(require('test/app/fixtures/leather-boots.thang.type'));
    bootsThangType.loadRasterImage();
    bootsThangType.once('raster-image-loaded', function() {
      var key, sheet, sprite;
      sprite = new Lank(bootsThangType);
      layer.addLank(sprite);
      sheet = layer.renderNewSpriteSheet();
      key = layer.renderGroupingKey(bootsThangType);
      expect(indexOf.call(sheet.getAnimations(), key) >= 0).toBe(true);
      return done();
    });
    return bootsThangType.once('raster-image-load-errored', function() {
      return done();
    });
  });
  it('loads ThangTypes for Lanks that are added to it and need to be loaded', function() {
    var sprite, thangType;
    thangType = new ThangType({
      _id: 1
    });
    sprite = new Lank(thangType);
    layer.addLank(sprite);
    expect(layer.numThingsLoading).toBe(1);
    return expect(jasmine.Ajax.requests.count()).toBe(1);
  });
  it('loads raster images for ThangType', function() {
    var bootsThangTypeData, sprite, thangType;
    bootsThangTypeData = require('test/app/fixtures/leather-boots.thang.type');
    thangType = new ThangType({
      _id: 1
    });
    sprite = new Lank(thangType);
    layer.addLank(sprite);
    expect(layer.numThingsLoading).toBe(1);
    spyOn(thangType, 'loadRasterImage');
    jasmine.Ajax.requests.sendResponses({
      '/db/thang.type/1': bootsThangTypeData
    });
    spyOn(layer, 'renderNewSpriteSheet');
    expect(layer.numThingsLoading).toBe(1);
    expect(thangType.loadRasterImage).toHaveBeenCalled();
    thangType.loadedRaster = true;
    thangType.trigger('raster-image-loaded', thangType);
    expect(layer.numThingsLoading).toBe(0);
    return expect(layer.renderNewSpriteSheet).toHaveBeenCalled();
  });
  it('renders a new SpriteSheet only once everything has loaded', function() {
    var bootsThangTypeData, thangType1, thangType2;
    bootsThangTypeData = require('test/app/fixtures/leather-boots.thang.type');
    thangType1 = new ThangType({
      _id: 1
    });
    thangType2 = new ThangType({
      _id: 2
    });
    layer.addLank(new Lank(thangType1));
    expect(layer.numThingsLoading).toBe(1);
    layer.addLank(new Lank(thangType2));
    expect(layer.numThingsLoading).toBe(2);
    spyOn(thangType2, 'loadRasterImage');
    spyOn(layer, '_renderNewSpriteSheet');
    jasmine.Ajax.requests.sendResponses({
      '/db/thang.type/1': ogreMunchkinThangType.attributes
    });
    expect(layer.numThingsLoading).toBe(1);
    jasmine.Ajax.requests.sendResponses({
      '/db/thang.type/2': bootsThangTypeData
    });
    expect(layer.numThingsLoading).toBe(1);
    expect(layer._renderNewSpriteSheet).not.toHaveBeenCalled();
    expect(thangType2.loadRasterImage).toHaveBeenCalled();
    thangType2.loadedRaster = true;
    thangType2.trigger('raster-image-loaded', thangType2);
    expect(layer.numThingsLoading).toBe(0);
    return expect(layer._renderNewSpriteSheet).toHaveBeenCalled();
  });
  it('recycles *containers* from previous sprite sheets, rather than building repeatedly from raw vector data', function() {
    var i, j, len, ref, sheet, sprite;
    treeThangType.set('spriteType', 'segmented');
    sprite = new Lank(treeThangType);
    layer.addLank(sprite);
    spyOn(SpriteBuilder.prototype, 'buildContainerFromStore').and.callThrough();
    ref = _.range(2);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      sheet = layer.renderNewSpriteSheet();
    }
    return expect(SpriteBuilder.prototype.buildContainerFromStore.calls.count()).toBe(1);
  });
  it('*does not* recycle *containers* from previous sprite sheets when the resolutionFactor has changed', function() {
    var i, j, len, ref, sheet, sprite;
    treeThangType.set('spriteType', 'segmented');
    sprite = new Lank(treeThangType);
    layer.addLank(sprite);
    spyOn(SpriteBuilder.prototype, 'buildContainerFromStore').and.callThrough();
    ref = _.range(2);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      layer.resolutionFactor *= 1.1;
      sheet = layer.renderNewSpriteSheet();
    }
    return expect(SpriteBuilder.prototype.buildContainerFromStore.calls.count()).toBe(2);
  });
  it('recycles *animations* from previous sprite sheets, rather than building repeatedly from raw vector data', function() {
    var i, j, len, numFrameses, ref, sheet, sprite;
    ogreMunchkinThangType.set('spriteType', 'singular');
    sprite = new Lank(ogreMunchkinThangType);
    layer.addLank(sprite);
    numFrameses = [];
    spyOn(SpriteBuilder.prototype, 'buildMovieClip').and.callThrough();
    ref = _.range(2);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      sheet = layer.renderNewSpriteSheet();
      numFrameses.push(sheet.getNumFrames());
    }
    expect(numFrameses[0]).toBe(numFrameses[1]);
    return expect(SpriteBuilder.prototype.buildMovieClip.calls.count()).toBe(5);
  });
  return it('*does not* recycles *animations* from previous sprite sheets when the resolutionFactor has changed', function() {
    var i, j, len, ref, sheet, sprite;
    ogreMunchkinThangType.set('spriteType', 'singular');
    sprite = new Lank(ogreMunchkinThangType);
    layer.addLank(sprite);
    spyOn(SpriteBuilder.prototype, 'buildMovieClip').and.callThrough();
    ref = _.range(2);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      layer.resolutionFactor *= 1.1;
      sheet = layer.renderNewSpriteSheet();
    }
    return expect(SpriteBuilder.prototype.buildMovieClip.calls.count()).toBe(10);
  });
});
});

;require.register("test/app/lib/surface/SegmentedSprite.spec", function(exports, require, module) {
var Lank, LayerAdapter, SegmentedSprite, SpriteBuilder, ThangType, ogreFangriderThangType, ogreMunchkinThangType, scaleTestUtils, treeThangType;

LayerAdapter = require('lib/surface/LayerAdapter');

SegmentedSprite = require('lib/surface/SegmentedSprite');

Lank = require('lib/surface/Lank');

ThangType = require('models/ThangType');

SpriteBuilder = require('lib/sprites/SpriteBuilder');

ogreMunchkinThangType = new ThangType(require('test/app/fixtures/ogre-munchkin-m.thang.type'));

ogreFangriderThangType = new ThangType(require('test/app/fixtures/ogre-fangrider.thang.type'));

treeThangType = new ThangType(require('test/app/fixtures/tree1.thang.type'));

scaleTestUtils = require('./scale-testing-utils');

describe('SegmentedSprite', function() {
  var segmentedSprite, showMe, stage;
  segmentedSprite = null;
  stage = null;
  showMe = function() {
    var canvas, listener, scale, ticks;
    canvas = $('<canvas width="600" height="400"></canvas>').css('position', 'absolute').css('index', 1000).css('background', 'white');
    $('body').append(canvas);
    stage = new createjs.Stage(canvas[0]);
    stage.addChild(segmentedSprite);
    scale = 3;
    stage.scaleX = stage.scaleY = scale;
    stage.regX = -300 / scale;
    stage.regY = -200 / scale;
    window.stage = stage;
    ticks = 0;
    listener = {
      handleEvent: function() {
        if (ticks >= 100) {
          return;
        }
        ticks += 1;
        segmentedSprite.tick(arguments[0].delta);
        return stage.update();
      }
    };
    return createjs.Ticker.addEventListener("tick", listener);
  };
  describe('with Tree ThangType', function() {
    beforeEach(function() {
      var layer, prefix, sheet, sprite;
      layer = new LayerAdapter({
        webGL: true,
        name: 'Default'
      });
      layer.buildAutomatically = false;
      layer.buildAsync = false;
      treeThangType.markToRevert();
      treeThangType.set('spriteType', 'segmented');
      sprite = new Lank(treeThangType);
      layer.addLank(sprite);
      sheet = layer.renderNewSpriteSheet();
      prefix = layer.renderGroupingKey(treeThangType) + '.';
      return window.segmentedSprite = segmentedSprite = new SegmentedSprite(sheet, treeThangType, prefix);
    });
    it('scales rendered containers to the size of the source container', function() {
      var builder, container, hitRate;
      segmentedSprite.gotoAndStop('idle');
      builder = new SpriteBuilder(treeThangType);
      container = builder.buildContainerFromStore('Tree_4');
      container.scaleX = container.scaleY = 0.3;
      container.regX = 59;
      container.regY = 100;
      showMe();
      stage.addChild(container);
      stage.update();
      hitRate = scaleTestUtils.hitTest(stage, new createjs.Rectangle(-15, -30, 35, 40));
      expect(hitRate).toBeGreaterThan(0.92);
      return $('canvas').remove();
    });
    return it('scales placeholder containers to the size of the source container', function() {
      var builder, container, hitRate;
      segmentedSprite.usePlaceholders = true;
      segmentedSprite.gotoAndStop('idle');
      builder = new SpriteBuilder(treeThangType);
      container = builder.buildContainerFromStore('Tree_4');
      container.scaleX = container.scaleY = 0.3;
      container.regX = 59;
      container.regY = 100;
      showMe();
      stage.addChild(container);
      stage.update();
      hitRate = scaleTestUtils.hitTest(stage, new createjs.Rectangle(-15, -30, 35, 40));
      expect(hitRate).toBeGreaterThan(0.73);
      return $('canvas').remove();
    });
  });
  describe('with Ogre Munchkin ThangType', function() {
    beforeEach(function() {
      var actions, colorConfig, layer, prefix, sheet, sprite;
      layer = new LayerAdapter({
        webGL: true,
        name: 'Default'
      });
      layer.buildAutomatically = false;
      layer.buildAsync = false;
      ogreMunchkinThangType.markToRevert();
      ogreMunchkinThangType.set('spriteType', 'segmented');
      actions = ogreMunchkinThangType.getActions();
      actions.littledance = {
        animation: 'enemy_small_move_side',
        framerate: 1,
        frames: '0,6,2,6,2,8,0',
        name: 'littledance'
      };
      actions.onestep = {
        animation: 'enemy_small_move_side',
        loops: false,
        name: 'onestep'
      };
      actions.head = {
        container: 'head',
        name: 'head'
      };
      colorConfig = {
        team: {
          hue: 0,
          saturation: 1,
          lightness: 0.5
        }
      };
      sprite = new Lank(ogreMunchkinThangType, {
        colorConfig: colorConfig
      });
      layer.addLank(sprite);
      sheet = layer.renderNewSpriteSheet();
      prefix = layer.renderGroupingKey(ogreMunchkinThangType, null, colorConfig) + '.';
      return window.segmentedSprite = segmentedSprite = new SegmentedSprite(sheet, ogreMunchkinThangType, prefix);
    });
    afterEach(function() {
      return ogreMunchkinThangType.revert();
    });
    it('has gotoAndPlay, gotoAndStop, currentAnimation, and paused like a MovieClip or Sprite', function() {
      segmentedSprite.gotoAndPlay('move_fore');
      expect(segmentedSprite.baseMovieClip).toBeDefined();
      expect(segmentedSprite.paused).toBe(false);
      segmentedSprite.gotoAndStop('move_fore');
      expect(segmentedSprite.paused).toBe(true);
      return expect(segmentedSprite.currentAnimation).toBe('move_fore');
    });
    it('has a tick function which moves the animation forward', function() {
      segmentedSprite.gotoAndPlay('attack');
      segmentedSprite.tick(100);
      return expect(segmentedSprite.baseMovieClip.currentFrame).toBe(segmentedSprite.framerate * 100 / 1000);
    });
    it('will interpolate between frames of a custom frame set', function() {
      segmentedSprite.gotoAndPlay('littledance');
      segmentedSprite.tick(1000);
      expect(segmentedSprite.baseMovieClip.currentFrame).toBe(6);
      segmentedSprite.tick(1000);
      expect(segmentedSprite.baseMovieClip.currentFrame).toBe(2);
      segmentedSprite.tick(500);
      expect(segmentedSprite.baseMovieClip.currentFrame).toBe(4);
      segmentedSprite.tick(500);
      return expect(segmentedSprite.baseMovieClip.currentFrame).toBe(6);
    });
    it('emits animationend for animations where loops is false and there is no goesTo', function(done) {
      var fired;
      fired = false;
      segmentedSprite.gotoAndPlay('onestep');
      segmentedSprite.on('animationend', function() {
        return fired = true;
      });
      segmentedSprite.tick(1000);
      return _.defer(function() {
        expect(fired).toBe(true);
        return done();
      });
    });
    it('scales rendered animations like a MovieClip', function() {
      var builder, hitRate, movieClip;
      segmentedSprite.gotoAndStop('idle');
      builder = new SpriteBuilder(ogreMunchkinThangType);
      movieClip = builder.buildMovieClip('enemy_small_move_side');
      movieClip.scaleX = movieClip.scaleY = 0.3;
      movieClip.regX = 285;
      movieClip.regY = 300;
      movieClip.stop();
      showMe();
      stage.addChild(movieClip);
      stage.update();
      hitRate = scaleTestUtils.hitTest(stage, new createjs.Rectangle(-10, -30, 25, 35));
      expect(hitRate).toBeGreaterThan(0.91);
      expect(segmentedSprite.baseScaleX).toBe(0.3);
      expect(segmentedSprite.baseScaleY).toBe(0.3);
      return $('canvas').remove();
    });
    return it('scales placeholder animations like a MovieClip', function() {
      var builder, hitRate, movieClip;
      segmentedSprite.usePlaceholders = true;
      segmentedSprite.gotoAndStop('idle');
      builder = new SpriteBuilder(ogreMunchkinThangType);
      movieClip = builder.buildMovieClip('enemy_small_move_side');
      movieClip.scaleX = movieClip.scaleY = 0.3;
      movieClip.regX = 285;
      movieClip.regY = 300;
      movieClip.stop();
      showMe();
      stage.addChild(movieClip);
      stage.update();
      hitRate = scaleTestUtils.hitTest(stage, new createjs.Rectangle(-10, -30, 25, 35));
      expect(hitRate).toBeGreaterThan(0.96);
      return $('canvas').remove();
    });
  });
  return describe('with Ogre Fangrider ThangType', function() {
    beforeEach(function() {
      var colorConfig, layer, prefix, sheet, sprite;
      layer = new LayerAdapter({
        webGL: true
      });
      layer.buildAutomatically = false;
      layer.buildAsync = false;
      ogreFangriderThangType.markToRevert();
      ogreFangriderThangType.set('spriteType', 'segmented');
      colorConfig = {
        team: {
          hue: 0,
          saturation: 1,
          lightness: 0.5
        }
      };
      sprite = new Lank(ogreFangriderThangType, {
        colorConfig: colorConfig
      });
      layer.addLank(sprite);
      sheet = layer.renderNewSpriteSheet();
      prefix = layer.renderGroupingKey(ogreFangriderThangType, null, colorConfig) + '.';
      return window.segmentedSprite = segmentedSprite = new SegmentedSprite(sheet, ogreFangriderThangType, prefix);
    });
    afterEach(function() {
      return ogreFangriderThangType.revert();
    });
    it('synchronizes animations with child movie clips properly', function() {
      var expectedFrame, j, len, movieClip, ref, results;
      segmentedSprite.gotoAndPlay('die');
      segmentedSprite.tick(100);
      expectedFrame = segmentedSprite.framerate * 100 / 1000;
      expect(segmentedSprite.currentFrame).toBe(expectedFrame);
      ref = segmentedSprite.childMovieClips;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        movieClip = ref[j];
        results.push(expect(movieClip.currentFrame).toBe(expectedFrame));
      }
      return results;
    });
    it('does not include shapes from the original animation', function() {
      var child, j, len, ref, results;
      segmentedSprite.gotoAndPlay('attack');
      segmentedSprite.tick(230);
      ref = segmentedSprite.children;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        results.push(expect(_.isString(child)).toBe(false));
      }
      return results;
    });
    return it('maintains the right number of shapes', function() {
      var i, j, len, lengths, ref, results;
      segmentedSprite.gotoAndPlay('idle');
      lengths = [];
      ref = _.range(10);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        segmentedSprite.tick(10);
        results.push(expect(segmentedSprite.children.length).toBe(20));
      }
      return results;
    });
  });
});
});

;require.register("test/app/lib/surface/SingularSprite.spec", function(exports, require, module) {
var Lank, LayerAdapter, SingularSprite, SpriteBuilder, ThangType, ogreMunchkinThangType, scaleTestUtils, treeThangType;

LayerAdapter = require('lib/surface/LayerAdapter');

SingularSprite = require('lib/surface/SingularSprite');

Lank = require('lib/surface/Lank');

SpriteBuilder = require('lib/sprites/SpriteBuilder');

ThangType = require('models/ThangType');

ogreMunchkinThangType = new ThangType(require('test/app/fixtures/ogre-munchkin-m.thang.type'));

treeThangType = new ThangType(require('test/app/fixtures/tree1.thang.type'));

scaleTestUtils = require('./scale-testing-utils');

describe('SingularSprite', function() {
  var showMe, singularSprite, stage;
  singularSprite = null;
  stage = null;
  showMe = function() {
    var canvas, listener, scale, ticks;
    canvas = $('<canvas width="600" height="400"></canvas>').css('position', 'absolute').css('index', 1000).css('background', 'white');
    $('body').append(canvas);
    stage = new createjs.Stage(canvas[0]);
    stage.addChild(singularSprite);
    scale = 3;
    stage.scaleX = stage.scaleY = scale;
    stage.regX = -300 / scale;
    stage.regY = -200 / scale;
    window.stage = stage;
    ticks = 0;
    listener = {
      handleEvent: function() {
        if (ticks >= 100) {
          return;
        }
        ticks += 1;
        return stage.update();
      }
    };
    return createjs.Ticker.addEventListener("tick", listener);
  };
  afterEach(function() {
    var g, s;
    g = new createjs.Graphics();
    g.beginFill(createjs.Graphics.getRGB(64, 255, 64, 0.7));
    g.drawCircle(0, 0, 1);
    s = new createjs.Shape(g);
    return stage.addChild(s);
  });
  describe('with Tree ThangType', function() {
    beforeEach(function() {
      var layer, prefix, sheet, sprite;
      layer = new LayerAdapter({
        webGL: true,
        name: 'Default'
      });
      layer.buildAutomatically = false;
      layer.buildAsync = false;
      treeThangType.markToRevert();
      treeThangType.set('spriteType', 'singular');
      sprite = new Lank(treeThangType);
      layer.addLank(sprite);
      sheet = layer.renderNewSpriteSheet();
      prefix = layer.renderGroupingKey(treeThangType) + '.';
      window.singularSprite = singularSprite = new SingularSprite(sheet, treeThangType, prefix);
      singularSprite.x = 0;
      return singularSprite.y = 0;
    });
    it('scales rendered containers to the size of the source container, taking into account ThangType scaling', function() {
      var builder, container, hitRate;
      singularSprite.gotoAndStop('idle');
      builder = new SpriteBuilder(treeThangType);
      container = builder.buildContainerFromStore('Tree_4');
      container.regX = 59;
      container.regY = 100;
      container.scaleX = container.scaleY = 0.3;
      showMe();
      stage.addChild(container);
      stage.update();
      hitRate = scaleTestUtils.hitTest(stage, new createjs.Rectangle(-15, -30, 35, 40));
      return expect(hitRate).toBeGreaterThan(0.92);
    });
    return it('scales placeholder containers to the size of the source container, taking into account ThangType scaling', function() {
      var builder, container, hitRate;
      singularSprite.usePlaceholders = true;
      singularSprite.gotoAndStop('idle');
      builder = new SpriteBuilder(treeThangType);
      container = builder.buildContainerFromStore('Tree_4');
      container.regX = 59;
      container.regY = 100;
      container.scaleX = container.scaleY = 0.3;
      showMe();
      stage.addChild(container);
      stage.update();
      hitRate = scaleTestUtils.hitTest(stage, new createjs.Rectangle(-15, -30, 35, 40));
      return expect(hitRate).toBeGreaterThan(0.73);
    });
  });
  return describe('with Ogre Munchkin ThangType', function() {
    beforeEach(function() {
      var actions, colorConfig, layer, prefix, sheet, sprite;
      layer = new LayerAdapter({
        webGL: true,
        name: 'Default'
      });
      layer.buildAutomatically = false;
      layer.buildAsync = false;
      ogreMunchkinThangType.markToRevert();
      ogreMunchkinThangType.set('spriteType', 'singular');
      actions = ogreMunchkinThangType.getActions();
      colorConfig = {
        team: {
          hue: 0,
          saturation: 1,
          lightness: 0.5
        }
      };
      sprite = new Lank(ogreMunchkinThangType, {
        colorConfig: colorConfig
      });
      layer.addLank(sprite);
      sheet = layer.renderNewSpriteSheet();
      prefix = layer.renderGroupingKey(ogreMunchkinThangType, null, colorConfig) + '.';
      return window.singularSprite = singularSprite = new SingularSprite(sheet, ogreMunchkinThangType, prefix);
    });
    afterEach(function() {
      return ogreMunchkinThangType.revert();
    });
    it('has the same interface as Sprite for animation', function() {
      singularSprite.gotoAndPlay('move_fore');
      return singularSprite.gotoAndStop('attack');
    });
    it('scales rendered animations like a MovieClip, taking into account ThangType scaling', function() {
      var builder, hitRate, movieClip;
      singularSprite.gotoAndStop('idle');
      builder = new SpriteBuilder(ogreMunchkinThangType);
      movieClip = builder.buildMovieClip('enemy_small_move_side');
      movieClip.scaleX = movieClip.scaleY = 0.3;
      movieClip.regX = 285;
      movieClip.regY = 300;
      movieClip.stop();
      showMe();
      stage.addChild(movieClip);
      stage.update();
      hitRate = scaleTestUtils.hitTest(stage, new createjs.Rectangle(-10, -30, 25, 35));
      expect(hitRate).toBeGreaterThan(0.91);
      return $('canvas').remove();
    });
    return it('scales placeholder animations like a MovieClip, taking into account ThangType scaling', function() {
      var builder, hitRate, movieClip;
      singularSprite.usePlaceholders = true;
      singularSprite.gotoAndStop('idle');
      builder = new SpriteBuilder(ogreMunchkinThangType);
      movieClip = builder.buildMovieClip('enemy_small_move_side');
      movieClip.scaleX = movieClip.scaleY = 0.3;
      movieClip.regX = 285;
      movieClip.regY = 300;
      movieClip.stop();
      showMe();
      stage.addChild(movieClip);
      stage.update();
      hitRate = scaleTestUtils.hitTest(stage, new createjs.Rectangle(-10, -30, 25, 35));
      expect(hitRate).toBeGreaterThan(0.71);
      return $('canvas').remove();
    });
  });
});
});

;require.register("test/app/lib/surface/scale-testing-utils", function(exports, require, module) {
module.exports.hitTest = function(stage, bounds) {
  var g, hasShape, hasSprite, hits, i, j, len, len1, objects, ref, ref1, s, tests, x, y;
  tests = hits = 0;
  ref = _.range(bounds.x, bounds.x + bounds.width, 5);
  for (i = 0, len = ref.length; i < len; i++) {
    x = ref[i];
    ref1 = _.range(bounds.y, bounds.y + bounds.height, 5);
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      y = ref1[j];
      tests += 1;
      objects = stage.getObjectsUnderPoint(x, y);
      hasSprite = _.any(objects, function(o) {
        return o instanceof createjs.Sprite;
      });
      hasShape = _.any(objects, function(o) {
        return o instanceof createjs.Shape;
      });
      if ((hasSprite && hasShape) || !(hasSprite || hasShape)) {
        hits += 1;
      }
      g = new createjs.Graphics();
      if (hasSprite && hasShape) {
        g.beginFill(createjs.Graphics.getRGB(64, 64, 255, 0.7));
      } else if (!(hasSprite || hasShape)) {
        g.beginFill(createjs.Graphics.getRGB(64, 64, 64, 0.7));
      } else {
        g.beginFill(createjs.Graphics.getRGB(255, 64, 64, 0.7));
      }
      g.drawCircle(0, 0, 2);
      s = new createjs.Shape(g);
      s.x = x;
      s.y = y;
      stage.addChild(s);
    }
  }
  return hits / tests;
};
});

;require.register("test/app/lib/world/GoalManager.spec", function(exports, require, module) {
describe('GoalManager', function() {
  var GoalManager, getItemGoal, getToLocGoal, keepFromLocGoal, keepItemGoal, killGoal, leaveMapGoal, saveGoal, stayMapGoal;
  GoalManager = require('lib/world/GoalManager');
  killGoal = {
    name: 'Kill Guy',
    killThangs: ['Guy1', 'Guy2'],
    id: 'killguy'
  };
  saveGoal = {
    name: 'Save Guy',
    saveThangs: ['Guy1', 'Guy2'],
    id: 'saveguy'
  };
  getToLocGoal = {
    name: 'Go there',
    getToLocation: {
      target: 'Frying Pan',
      who: 'Potato'
    },
    id: 'id'
  };
  keepFromLocGoal = {
    name: 'Go there',
    keepFromLocation: {
      target: 'Frying Pan',
      who: 'Potato'
    },
    id: 'id'
  };
  leaveMapGoal = {
    name: 'Go away',
    leaveOffSide: {
      who: 'Yall'
    },
    id: 'id'
  };
  stayMapGoal = {
    name: 'Stay here',
    keepFromLeavingOffSide: {
      who: 'Yall'
    },
    id: 'id'
  };
  getItemGoal = {
    name: 'Mine',
    getItem: {
      who: 'Grabby',
      itemID: 'Sandwich'
    },
    id: 'id'
  };
  keepItemGoal = {
    name: 'Not Yours',
    keepFromGettingItem: {
      who: 'Grabby',
      itemID: 'Sandwich'
    },
    id: 'id'
  };
  it('handles kill goal', function() {
    var gm, goalStates;
    gm = new GoalManager();
    gm.setGoals([killGoal]);
    gm.worldGenerationWillBegin();
    gm.submitWorldGenerationEvent('world:thang-died', {
      thang: {
        id: 'Guy1'
      }
    }, 10);
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.killguy.status).toBe('incomplete');
    expect(goalStates.killguy.killed.Guy1).toBe(true);
    expect(goalStates.killguy.killed.Guy2).toBe(false);
    expect(goalStates.killguy.keyFrame).toBe(0);
    gm.submitWorldGenerationEvent('world:thang-died', {
      thang: {
        id: 'Guy2'
      }
    }, 20);
    goalStates = gm.getGoalStates();
    expect(goalStates.killguy.status).toBe('success');
    expect(goalStates.killguy.killed.Guy1).toBe(true);
    expect(goalStates.killguy.killed.Guy2).toBe(true);
    return expect(goalStates.killguy.keyFrame).toBe(20);
  });
  it('handles save goal', function() {
    var gm, goalStates;
    gm = new GoalManager();
    gm.setGoals([saveGoal]);
    gm.worldGenerationWillBegin();
    gm.submitWorldGenerationEvent('world:thang-died', {
      thang: {
        id: 'Guy1'
      }
    }, 10);
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.saveguy.status).toBe('failure');
    expect(goalStates.saveguy.killed.Guy1).toBe(true);
    expect(goalStates.saveguy.killed.Guy2).toBe(false);
    expect(goalStates.saveguy.keyFrame).toBe(10);
    gm = new GoalManager();
    gm.setGoals([saveGoal]);
    gm.worldGenerationWillBegin();
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.saveguy.status).toBe('success');
    expect(goalStates.saveguy.killed.Guy1).toBe(false);
    expect(goalStates.saveguy.killed.Guy2).toBe(false);
    return expect(goalStates.saveguy.keyFrame).toBe('end');
  });
  xit('handles getToLocation', function() {
    var gm, goalStates;
    gm = new GoalManager();
    gm.setGoals([getToLocGoal]);
    gm.worldGenerationWillBegin();
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('incomplete');
    expect(goalStates.id.arrived.Potato).toBe(false);
    expect(goalStates.id.keyFrame).toBe(0);
    gm = new GoalManager();
    gm.setGoals([getToLocGoal]);
    gm.worldGenerationWillBegin();
    gm.submitWorldGenerationEvent('world:thang-touched-goal', {
      actor: {
        id: 'Potato'
      },
      touched: {
        id: 'Frying Pan'
      }
    }, 10);
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('success');
    expect(goalStates.id.arrived.Potato).toBe(true);
    return expect(goalStates.id.keyFrame).toBe(10);
  });
  xit('handles keepFromLocation', function() {
    var gm, goalStates;
    gm = new GoalManager();
    gm.setGoals([keepFromLocGoal]);
    gm.worldGenerationWillBegin();
    gm.submitWorldGenerationEvent('world:thang-touched-goal', {
      actor: {
        id: 'Potato'
      },
      touched: {
        id: 'Frying Pan'
      }
    }, 10);
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('failure');
    expect(goalStates.id.arrived.Potato).toBe(true);
    expect(goalStates.id.keyFrame).toBe(10);
    gm = new GoalManager();
    gm.setGoals([keepFromLocGoal]);
    gm.worldGenerationWillBegin();
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('success');
    expect(goalStates.id.arrived.Potato).toBe(false);
    return expect(goalStates.id.keyFrame).toBe('end');
  });
  xit('handles leaveOffSide', function() {
    var gm, goalStates;
    gm = new GoalManager();
    gm.setGoals([leaveMapGoal]);
    gm.worldGenerationWillBegin();
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('incomplete');
    expect(goalStates.id.left.Yall).toBe(false);
    expect(goalStates.id.keyFrame).toBe(0);
    gm = new GoalManager();
    gm.setGoals([leaveMapGoal]);
    gm.worldGenerationWillBegin();
    gm.submitWorldGenerationEvent('world:thang-left-map', {
      thang: {
        id: 'Yall'
      }
    }, 10);
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('success');
    expect(goalStates.id.left.Yall).toBe(true);
    return expect(goalStates.id.keyFrame).toBe(10);
  });
  xit('handles keepFromLeavingOffSide', function() {
    var gm, goalStates;
    gm = new GoalManager();
    gm.setGoals([stayMapGoal]);
    gm.worldGenerationWillBegin();
    gm.submitWorldGenerationEvent('world:thang-left-map', {
      thang: {
        id: 'Yall'
      }
    }, 10);
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('failure');
    expect(goalStates.id.left.Yall).toBe(true);
    expect(goalStates.id.keyFrame).toBe(10);
    gm = new GoalManager();
    gm.setGoals([stayMapGoal]);
    gm.worldGenerationWillBegin();
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('success');
    expect(goalStates.id.left.Yall).toBe(false);
    return expect(goalStates.id.keyFrame).toBe('end');
  });
  xit('handles getItem', function() {
    var gm, goalStates;
    gm = new GoalManager();
    gm.setGoals([getItemGoal]);
    gm.worldGenerationWillBegin();
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('incomplete');
    expect(goalStates.id.collected.Grabby).toBe(false);
    expect(goalStates.id.keyFrame).toBe(0);
    gm = new GoalManager();
    gm.setGoals([getItemGoal]);
    gm.worldGenerationWillBegin();
    gm.submitWorldGenerationEvent('world:thang-collected-item', {
      actor: {
        id: 'Grabby'
      },
      item: {
        id: 'Sandwich'
      }
    }, 10);
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('success');
    expect(goalStates.id.collected.Grabby).toBe(true);
    return expect(goalStates.id.keyFrame).toBe(10);
  });
  return xit('handles keepFromGettingItem', function() {
    var gm, goalStates;
    gm = new GoalManager();
    gm.setGoals([keepItemGoal]);
    gm.worldGenerationWillBegin();
    gm.submitWorldGenerationEvent('world:thang-collected-item', {
      actor: {
        id: 'Grabby'
      },
      item: {
        id: 'Sandwich'
      }
    }, 10);
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('failure');
    expect(goalStates.id.collected.Grabby).toBe(true);
    expect(goalStates.id.keyFrame).toBe(10);
    gm = new GoalManager();
    gm.setGoals([keepItemGoal]);
    gm.worldGenerationWillBegin();
    gm.worldGenerationEnded();
    goalStates = gm.getGoalStates();
    expect(goalStates.id.status).toBe('success');
    expect(goalStates.id.collected.Grabby).toBe(false);
    return expect(goalStates.id.keyFrame).toBe('end');
  });
});
});

;require.register("test/app/lib/world/ellipse.spec", function(exports, require, module) {
describe('Ellipse', function() {
  var Ellipse, Rectangle, Vector;
  Ellipse = require('lib/world/ellipse');
  Rectangle = require('lib/world/rectangle');
  Vector = require('lib/world/vector');
  it('contains its own center', function() {
    var ellipse;
    ellipse = new Ellipse(0, 0, 10, 10);
    return expect(ellipse.containsPoint(new Vector(0, 0))).toBe(true);
  });
  it('contains a point when rotated', function() {
    var ellipse;
    ellipse = new Ellipse(0, -20, 40, 40, 3 * Math.PI / 4);
    expect(ellipse.containsPoint(new Vector(0, 0))).toBe(true);
    return expect(ellipse.containsPoint(new Vector(0, 2))).toBe(false);
  });
  it('contains more points properly', function() {
    var ellipse;
    ellipse = new Ellipse(1, 2, 4, 6, Math.PI / 4);
    expect(ellipse.containsPoint(new Vector(1, 2))).toBe(true);
    expect(ellipse.containsPoint(new Vector(-1, 3))).toBe(true);
    expect(ellipse.containsPoint(new Vector(0, 4))).toBe(true);
    expect(ellipse.containsPoint(new Vector(1, 4))).toBe(true);
    expect(ellipse.containsPoint(new Vector(3, 0))).toBe(true);
    expect(ellipse.containsPoint(new Vector(1, 0))).toBe(true);
    expect(ellipse.containsPoint(new Vector(0, 1))).toBe(true);
    expect(ellipse.containsPoint(new Vector(-1, 2))).toBe(true);
    expect(ellipse.containsPoint(new Vector(2, 2))).toBe(true);
    expect(ellipse.containsPoint(new Vector(0, 0))).toBe(false);
    expect(ellipse.containsPoint(new Vector(0, 5))).toBe(false);
    expect(ellipse.containsPoint(new Vector(3, 4))).toBe(false);
    expect(ellipse.containsPoint(new Vector(4, 0))).toBe(false);
    expect(ellipse.containsPoint(new Vector(2, -1))).toBe(false);
    expect(ellipse.containsPoint(new Vector(0, -3))).toBe(false);
    expect(ellipse.containsPoint(new Vector(-2, -2))).toBe(false);
    expect(ellipse.containsPoint(new Vector(-2, 0))).toBe(false);
    return expect(ellipse.containsPoint(new Vector(-2, 4))).toBe(false);
  });
  xit('correctly calculates distance to a faraway point', function() {
    var d, ellipse, p;
    ellipse = new Ellipse(100, 50, 20, 40);
    p = new Vector(200, 300);
    d = 10 * Math.sqrt(610);
    expect(ellipse.distanceToPoint(p)).toBeCloseTo(d);
    ellipse.rotation = Math.PI / 2;
    d = 80 * Math.sqrt(10);
    return expect(ellipse.distanceToPoint(p)).toBeCloseTo(d);
  });
  it('does not modify itself or target Vector when calculating distance', function() {
    var ellipse, ellipse2, p, p2;
    ellipse = new Ellipse(-100, -200, 1, 100);
    ellipse2 = ellipse.copy();
    p = new Vector(-100.25, -101);
    p2 = p.copy();
    ellipse.distanceToPoint(p);
    expect(p.x).toEqual(p2.x);
    expect(p.y).toEqual(p2.y);
    expect(ellipse.x).toEqual(ellipse2.x);
    expect(ellipse.y).toEqual(ellipse2.y);
    expect(ellipse.width).toEqual(ellipse2.width);
    expect(ellipse.height).toEqual(ellipse2.height);
    return expect(ellipse.rotation).toEqual(ellipse2.rotation);
  });
  it('correctly calculates distance to contained point', function() {
    var ellipse, ellipse2, p, p2;
    ellipse = new Ellipse(-100, -200, 1, 100);
    ellipse2 = ellipse.copy();
    p = new Vector(-100.25, -160);
    p2 = p.copy();
    expect(ellipse.distanceToPoint(p)).toBe(0);
    ellipse.rotation = 0.00000001 * Math.PI;
    return expect(ellipse.distanceToPoint(p)).toBe(0);
  });
  it('AABB works when not rotated', function() {
    var aabb1, aabb2, ellipse, i, len, prop, rect, ref, results;
    ellipse = new Ellipse(10, 20, 30, 40);
    rect = new Rectangle(10, 20, 30, 40);
    aabb1 = ellipse.axisAlignedBoundingBox();
    aabb2 = ellipse.axisAlignedBoundingBox();
    ref = ['x', 'y', 'width', 'height'];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      prop = ref[i];
      results.push(expect(aabb1[prop]).toBe(aabb2[prop]));
    }
    return results;
  });
  it('AABB works when rotated', function() {
    var aabb1, aabb2, ellipse, i, len, prop, rect, ref, results;
    ellipse = new Ellipse(10, 20, 30, 40, Math.PI / 3);
    rect = new Rectangle(10, 20, 30, 40, Math.PI / 3);
    aabb1 = ellipse.axisAlignedBoundingBox();
    aabb2 = ellipse.axisAlignedBoundingBox();
    ref = ['x', 'y', 'width', 'height'];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      prop = ref[i];
      results.push(expect(aabb1[prop]).toBe(aabb2[prop]));
    }
    return results;
  });
  return it('calculates ellipse intersections properly', function() {
    var ellipse;
    ellipse = new Ellipse(1, 2, 4, 6, Math.PI / 4);
    expect(ellipse.intersectsShape(new Rectangle(0, 0, 2, 2, 0))).toBe(true);
    expect(ellipse.intersectsShape(new Rectangle(0, -1, 2, 3, 0))).toBe(true);
    expect(ellipse.intersectsShape(new Rectangle(-1, -0.5, 2 * Math.SQRT2, 2 * Math.SQRT2, Math.PI / 4))).toBe(true);
    expect(ellipse.intersectsShape(new Rectangle(-1, -0.5, 2 * Math.SQRT2, 2 * Math.SQRT2, 0))).toBe(true);
    expect(ellipse.intersectsShape(new Rectangle(-1, -1, 2 * Math.SQRT2, 2 * Math.SQRT2, 0))).toBe(true);
    expect(ellipse.intersectsShape(new Rectangle(-1, -1, 2 * Math.SQRT2, 2 * Math.SQRT2, Math.PI / 4))).toBe(false);
    expect(ellipse.intersectsShape(new Rectangle(-2, -2, 2, 2, 0))).toBe(false);
    expect(ellipse.intersectsShape(new Rectangle(-Math.SQRT2 / 2, -Math.SQRT2 / 2, Math.SQRT2, Math.SQRT2, 0))).toBe(false);
    expect(ellipse.intersectsShape(new Rectangle(-Math.SQRT2 / 2, -Math.SQRT2 / 2, Math.SQRT2, Math.SQRT2, Math.PI / 4))).toBe(false);
    expect(ellipse.intersectsShape(new Rectangle(-2, 0, 2, 2, 0))).toBe(false);
    expect(ellipse.intersectsShape(new Rectangle(0, -2, 2, 2, 0))).toBe(false);
    return expect(ellipse.intersectsShape(new Rectangle(1, 2, 1, 1, 0))).toBe(true);
  });
});
});

;require.register("test/app/lib/world/line_segment.spec", function(exports, require, module) {
describe('LineSegment', function() {
  var LineSegment, Vector, v00, v04, v11, v22, v30, v34, vneg;
  LineSegment = require('lib/world/line_segment');
  Vector = require('lib/world/vector');
  v00 = new Vector(0, 0);
  v11 = new Vector(1, 1);
  v22 = new Vector(2, 2);
  v34 = new Vector(3, 4);
  v04 = new Vector(0, 4);
  v30 = new Vector(3, 0);
  vneg = new Vector(-1, -1);
  it('intersects itself', function() {
    var lineSegment;
    lineSegment = new LineSegment(v00, v34);
    return expect(lineSegment.intersectsLineSegment(lineSegment)).toBe(true);
  });
  it('intersects other segments properly', function() {
    var l1, l2, l3;
    l1 = new LineSegment(v00, v34);
    l2 = new LineSegment(v04, v30);
    l3 = new LineSegment(v00, v11);
    expect(l1.intersectsLineSegment(l2)).toBe(true);
    expect(l2.intersectsLineSegment(l1)).toBe(true);
    expect(l1.intersectsLineSegment(l3)).toBe(true);
    expect(l3.intersectsLineSegment(l1)).toBe(true);
    expect(l2.intersectsLineSegment(l3)).toBe(false);
    return expect(l3.intersectsLineSegment(l2)).toBe(false);
  });
  it('can tell when a point is on a line or segment', function() {
    var lineSegment;
    lineSegment = new LineSegment(v00, v11);
    expect(lineSegment.pointOnLine(v22, false)).toBe(true);
    expect(lineSegment.pointOnLine(v22, true)).toBe(false);
    expect(lineSegment.pointOnLine(v00, false)).toBe(true);
    expect(lineSegment.pointOnLine(v00, true)).toBe(true);
    expect(lineSegment.pointOnLine(v11, true)).toBe(true);
    expect(lineSegment.pointOnLine(v11, false)).toBe(true);
    expect(lineSegment.pointOnLine(v34, false)).toBe(false);
    return expect(lineSegment.pointOnLine(v34, true)).toBe(false);
  });
  return it('correctly calculates distance to points', function() {
    var lineSegment, nullSegment;
    lineSegment = new LineSegment(v00, v11);
    expect(lineSegment.distanceToPoint(v00)).toBe(0);
    expect(lineSegment.distanceToPoint(v11)).toBe(0);
    expect(lineSegment.distanceToPoint(v22)).toBeCloseTo(Math.SQRT2);
    expect(lineSegment.distanceToPoint(v34)).toBeCloseTo(Math.sqrt(2 * 2 + 3 * 3));
    expect(lineSegment.distanceToPoint(v04)).toBeCloseTo(Math.sqrt(1 * 1 + 3 * 3));
    expect(lineSegment.distanceToPoint(v30)).toBeCloseTo(Math.sqrt(2 * 2 + 1 * 1));
    expect(lineSegment.distanceToPoint(vneg)).toBeCloseTo(Math.SQRT2);
    nullSegment = new LineSegment(v11, v11);
    expect(lineSegment.distanceToPoint(v11)).toBe(0);
    return expect(lineSegment.distanceToPoint(v22)).toBeCloseTo(Math.SQRT2);
  });
});
});

;require.register("test/app/lib/world/rectangle.spec", function(exports, require, module) {
describe('Rectangle', function() {
  var Ellipse, Rectangle, Vector;
  Rectangle = require('lib/world/rectangle');
  Vector = require('lib/world/vector');
  Ellipse = require('lib/world/ellipse');
  it('contains its own center', function() {
    var rect;
    rect = new Rectangle(0, 0, 10, 10);
    return expect(rect.containsPoint(new Vector(0, 0))).toBe(true);
  });
  it('contains a point when rotated', function() {
    var p, rect;
    rect = new Rectangle(0, -20, 40, 40, 3 * Math.PI / 4);
    p = new Vector(0, 2);
    return expect(rect.containsPoint(p, true)).toBe(true);
  });
  it('correctly calculates distance to a faraway point', function() {
    var d, p, rect;
    rect = new Rectangle(100, 50, 20, 40);
    p = new Vector(200, 300);
    d = 10 * Math.sqrt(610);
    expect(rect.distanceToPoint(p)).toBeCloseTo(d);
    rect.rotation = Math.PI / 2;
    d = 80 * Math.sqrt(10);
    return expect(rect.distanceToPoint(p)).toBeCloseTo(d);
  });
  it('does not modify itself or target Vector when calculating distance', function() {
    var p, p2, rect, rect2;
    rect = new Rectangle(-100, -200, 1, 100);
    rect2 = rect.copy();
    p = new Vector(-100.25, -101);
    p2 = p.copy();
    rect.distanceToPoint(p);
    expect(p.x).toEqual(p2.x);
    expect(p.y).toEqual(p2.y);
    expect(rect.x).toEqual(rect2.x);
    expect(rect.y).toEqual(rect2.y);
    expect(rect.width).toEqual(rect2.width);
    expect(rect.height).toEqual(rect2.height);
    return expect(rect.rotation).toEqual(rect2.rotation);
  });
  it('correctly calculates distance to contained point', function() {
    var p, p2, rect, rect2;
    rect = new Rectangle(-100, -200, 1, 100);
    rect2 = rect.copy();
    p = new Vector(-100.25, -160);
    p2 = p.copy();
    expect(rect.distanceToPoint(p)).toBe(0);
    rect.rotation = 0.00000001 * Math.PI;
    return expect(rect.distanceToPoint(p)).toBe(0);
  });
  it('correctly calculates distance to other rectangles', function() {
    expect(new Rectangle(0, 0, 4, 4, Math.PI / 4).distanceToRectangle(new Rectangle(4, -4, 2, 2, 0))).toBeCloseTo(2.2426);
    expect(new Rectangle(0, 0, 3, 3, 0).distanceToRectangle(new Rectangle(0, 0, 2, 2, 0))).toBe(0);
    expect(new Rectangle(0, 0, 3, 3, 0).distanceToRectangle(new Rectangle(0, 0, 2.5, 2.5, Math.PI / 4))).toBe(0);
    expect(new Rectangle(0, 0, 4, 4, 0).distanceToRectangle(new Rectangle(4, 2, 2, 2, 0))).toBe(1);
    return expect(new Rectangle(0, 0, 4, 4, 0).distanceToRectangle(new Rectangle(4, 2, 2, 2, Math.PI / 4))).toBeCloseTo(2 - Math.SQRT2);
  });
  it('has predictable vertices', function() {
    var rect, v;
    rect = new Rectangle(50, 50, 100, 100);
    v = rect.vertices();
    expect(v[0].x).toEqual(0);
    expect(v[0].y).toEqual(0);
    expect(v[1].x).toEqual(0);
    expect(v[1].y).toEqual(100);
    expect(v[2].x).toEqual(100);
    expect(v[2].y).toEqual(100);
    expect(v[3].x).toEqual(100);
    return expect(v[3].y).toEqual(0);
  });
  it('has predictable vertices when rotated', function() {
    var d, rect, v;
    rect = new Rectangle(50, 50, 100, 100, Math.PI / 4);
    v = rect.vertices();
    d = (Math.sqrt(2 * 100 * 100) - 100) / 2;
    expect(v[0].x).toBeCloseTo(-d);
    expect(v[0].y).toBeCloseTo(50);
    expect(v[1].x).toBeCloseTo(50);
    expect(v[1].y).toBeCloseTo(100 + d);
    expect(v[2].x).toBeCloseTo(100 + d);
    expect(v[2].y).toBeCloseTo(50);
    expect(v[3].x).toBeCloseTo(50);
    return expect(v[3].y).toBeCloseTo(-d);
  });
  it('is its own AABB when not rotated', function() {
    var aabb, i, len, prop, rect, ref, results;
    rect = new Rectangle(10, 20, 30, 40);
    aabb = rect.axisAlignedBoundingBox();
    ref = ['x', 'y', 'width', 'height'];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      prop = ref[i];
      results.push(expect(rect[prop]).toBe(aabb[prop]));
    }
    return results;
  });
  it('is its own AABB when rotated 180', function() {
    var aabb, i, len, prop, rect, ref, results;
    rect = new Rectangle(10, 20, 30, 40, Math.PI);
    aabb = rect.axisAlignedBoundingBox();
    ref = ['x', 'y', 'width', 'height'];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      prop = ref[i];
      results.push(expect(rect[prop]).toBe(aabb[prop]));
    }
    return results;
  });
  it('calculates rectangle intersections properly', function() {
    var rect;
    rect = new Rectangle(1, 1, 2, 2, 0);
    expect(rect.intersectsShape(new Rectangle(3, 1, 2, 2, 0))).toBe(true);
    expect(rect.intersectsShape(new Rectangle(3, 3, 2, 2, 0))).toBe(true);
    expect(rect.intersectsShape(new Rectangle(1, 1, 2, 2, 0))).toBe(true);
    expect(rect.intersectsShape(new Rectangle(1, 1, Math.SQRT1_2, Math.SQRT1_2, Math.PI / 4))).toBe(true);
    expect(rect.intersectsShape(new Rectangle(4, 1, 2, 2, 0))).toBe(false);
    expect(rect.intersectsShape(new Rectangle(3, 4, 2, 2, 0))).toBe(false);
    expect(rect.intersectsShape(new Rectangle(1, 4, 2 * Math.SQRT1_2, 2 * Math.SQRT1_2, Math.PI / 4))).toBe(false);
    expect(rect.intersectsShape(new Rectangle(3, 1, 2, 2, Math.PI / 4))).toBe(true);
    return expect(rect.intersectsShape(new Rectangle(1, 2, 2 * Math.SQRT2, 2 * Math.SQRT2, Math.PI / 4))).toBe(true);
  });
  return it('calculates ellipse intersections properly', function() {
    var rect;
    rect = new Rectangle(1, 1, 2, 2, 0);
    expect(rect.intersectsShape(new Ellipse(1, 1, Math.SQRT1_2, Math.SQRT1_2, Math.PI / 4))).toBe(true);
    expect(rect.intersectsShape(new Ellipse(4, 1, 2, 2, 0))).toBe(false);
    expect(rect.intersectsShape(new Ellipse(3, 4, 2, 2, 0))).toBe(false);
    return expect(rect.intersectsShape(new Ellipse(1, 4, 2 * Math.SQRT1_2, 2 * Math.SQRT1_2, Math.PI / 4))).toBe(false);
  });
});
});

;require.register("test/app/lib/world/vector.spec", function(exports, require, module) {
describe('Vector', function() {
  var Rectangle, Vector;
  Rectangle = require('lib/world/rectangle');
  Vector = require('lib/world/vector');
  it('rotates properly', function() {
    var v;
    v = new Vector(200, 300);
    v.rotate(Math.PI / 2);
    expect(v.x).toBeCloseTo(-300);
    expect(v.y).toBeCloseTo(200);
    v.rotate(Math.PI / 4);
    expect(v.x).toBeCloseTo(-250 * Math.sqrt(2));
    return expect(v.y).toBeCloseTo(-50 * Math.sqrt(2));
  });
  it('hardly moves when rotated a tiny bit', function() {
    var v, v2;
    v = new Vector(-100.25, -101);
    v2 = v.copy();
    v2.rotate(0.0000001 * Math.PI);
    expect(v.distance(v2)).toBeCloseTo(0);
    v = new Vector(100.25, -101);
    v2 = v.copy();
    v2.rotate(1.99999999 * Math.PI);
    expect(v.distance(v2)).toBeCloseTo(0);
    v = new Vector(10.25, 301);
    v2 = v.copy();
    v2.rotate(-0.0000001 * Math.PI);
    return expect(v.distance(v2)).toBeCloseTo(0);
  });
  it('has class methods equivalent to the instance methods', function() {
    var expectEquivalentMethods;
    expectEquivalentMethods = function(method, arg) {
      var classResult, instanceResult, v;
      v = new Vector(7, 7);
      classResult = Vector[method](v, arg);
      instanceResult = v[method](arg);
      return expect(classResult).toEqual(instanceResult);
    };
    expectEquivalentMethods('add', new Vector(1, 1));
    expectEquivalentMethods('subtract', new Vector(3, 3));
    expectEquivalentMethods('multiply', 4);
    expectEquivalentMethods('divide', 2);
    expectEquivalentMethods('limit', 3);
    expectEquivalentMethods('normalize');
    expectEquivalentMethods('rotate', 0.3);
    expectEquivalentMethods('magnitude');
    expectEquivalentMethods('heading');
    expectEquivalentMethods('distance', new Vector(2, 2));
    expectEquivalentMethods('distanceSquared', new Vector(4, 4));
    expectEquivalentMethods('dot', new Vector(3, 3));
    expectEquivalentMethods('equals', new Vector(7, 7));
    return expectEquivalentMethods('copy');
  });
  xit("doesn't mutate when in player code", function() {
    var expectNoMutation;
    expectNoMutation = function(fn) {
      var v, v2;
      v = new Vector(5, 5);
      v2 = fn(v);
      expect(v.x).toEqual(5);
      return expect(v).not.toBe(v2);
    };
    expectNoMutation(function(v) {
      return v.normalize();
    });
    expectNoMutation(function(v) {
      return v.limit(2);
    });
    expectNoMutation(function(v) {
      return v.subtract(new Vector(2, 2));
    });
    expectNoMutation(function(v) {
      return v.add(new Vector(2, 2));
    });
    expectNoMutation(function(v) {
      return v.divide(2);
    });
    expectNoMutation(function(v) {
      return v.multiply(2);
    });
    return expectNoMutation(function(v) {
      return v.rotate(0.5);
    });
  });
  return it('mutates when not in player code', function() {
    var expectMutation;
    expectMutation = function(fn) {
      var v, v2;
      v = new Vector(5, 5);
      v2 = fn(v);
      expect(v.x).not.toEqual(5);
      return expect(v).toBe(v2);
    };
    expectMutation(function(v) {
      return v.normalize();
    });
    expectMutation(function(v) {
      return v.limit(2);
    });
    expectMutation(function(v) {
      return v.subtract(new Vector(2, 2));
    });
    expectMutation(function(v) {
      return v.add(new Vector(2, 2));
    });
    expectMutation(function(v) {
      return v.divide(2);
    });
    expectMutation(function(v) {
      return v.multiply(2);
    });
    return expectMutation(function(v) {
      return v.rotate(0.5);
    });
  });
});
});

;require.register("test/app/models/CocoModel.spec", function(exports, require, module) {
var BlandClass, CocoModel, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('models/CocoModel');

utils = require('core/utils');

BlandClass = (function(superClass) {
  extend(BlandClass, superClass);

  function BlandClass() {
    return BlandClass.__super__.constructor.apply(this, arguments);
  }

  BlandClass.className = 'Bland';

  BlandClass.schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      number: {
        type: 'number'
      },
      object: {
        type: 'object'
      },
      string: {
        type: 'string'
      },
      _id: {
        type: 'string'
      }
    }
  };

  BlandClass.prototype.urlRoot = '/db/bland';

  return BlandClass;

})(CocoModel);

describe('CocoModel', function() {
  describe('setProjection', function() {
    it('takes an array of properties to project and adds them as a query parameter', function() {
      var b, request;
      b = new BlandClass({});
      b.setProjection(['number', 'object']);
      b.fetch();
      request = jasmine.Ajax.requests.mostRecent();
      return expect(decodeURIComponent(request.url).indexOf('project=number,object')).toBeGreaterThan(-1);
    });
    return it('can update its projection', function() {
      var b, baseURL, unprojectedURL;
      baseURL = '/db/bland/test?filter-creator=Mojambo&project=number,object&ignore-evil=false';
      unprojectedURL = baseURL.replace(/&project=number,object/, '');
      b = new BlandClass({});
      b.setURL(baseURL);
      expect(b.getURL()).toBe(baseURL);
      b.setProjection(['number', 'object']);
      expect(b.getURL()).toBe(baseURL);
      b.setProjection(['number']);
      expect(b.getURL()).toBe(baseURL.replace(/,object/, ''));
      b.setProjection([]);
      expect(b.getURL()).toBe(unprojectedURL);
      b.setProjection(null);
      expect(b.getURL()).toBe(unprojectedURL);
      b.setProjection(['object', 'number']);
      return expect(b.getURL()).toBe(unprojectedURL + '&project=object,number');
    });
  });
  describe('save', function() {
    it('saves to db/<urlRoot>', function() {
      var b, request, res;
      b = new BlandClass({});
      res = b.save();
      request = jasmine.Ajax.requests.mostRecent();
      expect(res).toBeDefined();
      expect(request.url).toBe(b.urlRoot);
      return expect(request.method).toBe('POST');
    });
    it('does not save if the data is invalid based on the schema', function() {
      var b, request, res;
      b = new BlandClass({
        number: 'NaN'
      });
      res = b.save();
      expect(res).toBe(false);
      request = jasmine.Ajax.requests.mostRecent();
      return expect(request).toBeUndefined();
    });
    return it('uses PUT when _id is included', function() {
      var b, request;
      b = new BlandClass({
        _id: 'test'
      });
      b.save();
      request = jasmine.Ajax.requests.mostRecent();
      return expect(request.method).toBe('PUT');
    });
  });
  describe('patch', function() {
    it('PATCHes only properties that have changed', function() {
      var b, params, request;
      b = new BlandClass({
        _id: 'test',
        number: 1
      });
      b.loaded = true;
      b.set('string', 'string');
      b.patch();
      request = jasmine.Ajax.requests.mostRecent();
      params = JSON.parse(request.params);
      expect(params.string).toBeDefined();
      return expect(params.number).toBeUndefined();
    });
    it('collates all changes made over several sets', function() {
      var b, params, request;
      b = new BlandClass({
        _id: 'test',
        number: 1
      });
      b.loaded = true;
      b.set('string', 'string');
      b.set('object', {
        4: 5
      });
      b.patch();
      request = jasmine.Ajax.requests.mostRecent();
      params = JSON.parse(request.params);
      expect(params.string).toBeDefined();
      expect(params.object).toBeDefined();
      return expect(params.number).toBeUndefined();
    });
    it('does not include data from previous patches', function() {
      var attrs, b, params, request;
      b = new BlandClass({
        _id: 'test',
        number: 1
      });
      b.loaded = true;
      b.set('object', {
        1: 2
      });
      b.patch();
      request = jasmine.Ajax.requests.mostRecent();
      attrs = JSON.stringify(b.attributes);
      request.respondWith({
        status: 200,
        responseText: attrs
      });
      b.set('number', 3);
      b.patch();
      request = jasmine.Ajax.requests.mostRecent();
      params = JSON.parse(request.params);
      return expect(params.object).toBeUndefined();
    });
    return it('does nothing when there\'s nothing to patch', function() {
      var b, request;
      b = new BlandClass({
        _id: 'test',
        number: 1
      });
      b.loaded = true;
      b.set('number', 1);
      b.patch();
      request = jasmine.Ajax.requests.mostRecent();
      return expect(request).toBeUndefined();
    });
  });
  xdescribe('Achievement polling', function() {
    return it('achievements are polled upon saving a model', function(done) {
      var b, collection, model, request, res;
      Backbone.Mediator.subscribe('achievements:new', function(collection) {
        Backbone.Mediator.unsubscribe('achievements:new');
        expect(collection.constructor.name).toBe('NewAchievementCollection');
        return done();
      });
      b = new BlandClass({});
      res = b.save();
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith({
        status: 200,
        responseText: '{}'
      });
      collection = [];
      model = {
        _id: "5390f7637b4d6f2a074a7bb4",
        achievement: "537ce4855c91b8d1dda7fda8"
      };
      collection.push(model);
      return utils.keepDoingUntil(function(ready) {
        var achievementURLMatch;
        request = jasmine.Ajax.requests.mostRecent();
        achievementURLMatch = /.*achievements\?notified=false$/.exec(request.url);
        if (achievementURLMatch) {
          ready(true);
        } else {
          return ready(false);
        }
        request.respondWith({
          status: 200,
          responseText: JSON.stringify(collection)
        });
        return utils.keepDoingUntil(function(ready) {
          var userURLMatch;
          request = jasmine.Ajax.requests.mostRecent();
          userURLMatch = /^\/db\/user\/[a-zA-Z0-9]*$/.exec(request.url);
          if (userURLMatch) {
            ready(true);
          } else {
            return ready(false);
          }
          return request.respondWith({
            status: 200,
            responseText: JSON.stringify(me)
          });
        });
      });
    });
  });
  return describe('updateI18NCoverage', function() {
    var FlexibleClass;
    FlexibleClass = (function(superClass) {
      extend(FlexibleClass, superClass);

      function FlexibleClass() {
        return FlexibleClass.__super__.constructor.apply(this, arguments);
      }

      FlexibleClass.className = 'Flexible';

      FlexibleClass.schema = {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          innerObject: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              i18n: {
                type: 'object',
                format: 'i18n',
                props: ['name']
              }
            }
          },
          i18n: {
            type: 'object',
            format: 'i18n',
            props: ['description', 'name', 'prop1']
          }
        }
      };

      return FlexibleClass;

    })(CocoModel);
    it('only includes languages for which all objects include a translation', function() {
      var m;
      m = new FlexibleClass({
        i18n: {
          es: {
            name: '+',
            description: '+'
          },
          fr: {
            name: '+',
            description: '+'
          }
        },
        name: 'Name',
        description: 'Description',
        innerObject: {
          i18n: {
            es: {
              name: '+'
            },
            de: {
              name: '+'
            },
            fr: {}
          },
          name: 'Name'
        }
      });
      m.updateI18NCoverage();
      return expect(_.isEqual(m.get('i18nCoverage'), ['es'])).toBe(true);
    });
    return it('ignores objects for which there is nothing to translate', function() {
      var m;
      m = new FlexibleClass();
      m.set({
        name: 'Name',
        i18n: {
          '-': {
            '-': '-'
          },
          'es': {
            name: 'Name in Spanish'
          }
        },
        innerObject: {
          i18n: {
            '-': {
              '-': '-'
            }
          }
        }
      });
      m.updateI18NCoverage();
      return expect(_.isEqual(m.get('i18nCoverage'), ['es'])).toBe(true);
    });
  });
});
});

;require.register("test/app/models/CourseInstance.spec", function(exports, require, module) {
var CourseInstance, factories;

CourseInstance = require('models/CourseInstance');

factories = require('test/app/factories');

describe('CourseInstance', function() {
  beforeEach(function() {
    return this.courseInstance = factories.makeCourseInstance();
  });
  describe('addMember(userID, opts)', function() {
    return it('returns a jqxhr', function() {
      var res;
      res = this.courseInstance.addMember('1234');
      return expect(res.readyState).toBe(1);
    });
  });
  describe('addMembers(userIDs, opts)', function() {
    return it('returns a jqxhr', function() {
      var res;
      res = this.courseInstance.addMembers(['1234']);
      return expect(res.readyState).toBe(1);
    });
  });
  return describe('removeMember(userID, opts)', function() {
    return it('returns a jqxhr', function() {
      var res;
      res = this.courseInstance.removeMember('1234');
      return expect(res.readyState).toBe(1);
    });
  });
});
});

;require.register("test/app/models/Level.spec", function(exports, require, module) {
var Level, SuperModel, ThangType;

SuperModel = require('models/SuperModel');

Level = require('models/Level');

ThangType = require('models/ThangType');

describe('Level', function() {
  return describe('denormalize', function() {
    var level, result, supermodel, thangType, tharinThangComponents;
    level = new Level({
      thangs: [
        {
          "thangType": "A",
          "id": "Tharin",
          "components": [
            {
              "original": "a",
              "majorVersion": 0
            }, {
              "original": "b",
              "majorVersion": 0,
              "config": {
                i: 2
              }
            }, {
              "original": "c",
              "majorVersion": 0,
              "config": {
                i: 1,
                ii: 2,
                nest: {
                  iii: 3
                }
              }
            }
          ]
        }
      ],
      type: 'hero'
    });
    thangType = new ThangType({
      original: 'A',
      version: {
        major: 0,
        minor: 0
      },
      components: [
        {
          "original": "a",
          "majorVersion": 0,
          "config": {
            i: 1
          }
        }, {
          "original": "c",
          "majorVersion": 0,
          "config": {
            i: 3,
            nest: {
              iv: 4
            }
          }
        }, {
          "original": "d",
          "majorVersion": 0,
          "config": {
            i: 1
          }
        }
      ]
    });
    supermodel = new SuperModel();
    supermodel.registerModel(thangType);
    result = level.denormalize(supermodel);
    tharinThangComponents = result.thangs[0].components;
    it('adds default configs to thangs without any config', function() {
      var aComp;
      aComp = _.find(tharinThangComponents, {
        original: 'a'
      });
      return expect(_.isEqual(aComp.config, {
        i: 1
      })).toBeTruthy();
    });
    it('leaves alone configs for components the level thang has but the thang type does not', function() {
      var bComp;
      bComp = _.find(tharinThangComponents, {
        original: 'b'
      });
      return expect(_.isEqual(bComp.config, {
        i: 2
      })).toBeTruthy();
    });
    it('merges configs where both the level thang and thang type have one, giving priority to the level thang', function() {
      var cComp;
      cComp = _.find(tharinThangComponents, {
        original: 'c'
      });
      return expect(_.isEqual(cComp.config, {
        i: 1,
        ii: 2,
        nest: {
          iii: 3,
          iv: 4
        }
      })).toBeTruthy();
    });
    return it('adds components from the thang type that do not exist in the level thang', function() {
      var dComp;
      dComp = _.find(tharinThangComponents, {
        original: 'd'
      });
      expect(dComp).toBeTruthy();
      return expect(_.isEqual(dComp != null ? dComp.config : void 0, {
        i: 1
      })).toBeTruthy();
    });
  });
});
});

;require.register("test/app/models/SuperModel.spec", function(exports, require, module) {
var LevelComponents, SuperModel, User, factories;

SuperModel = require('models/SuperModel');

User = require('models/User');

LevelComponents = require('collections/LevelComponents');

factories = require('test/app/factories');

describe('SuperModel', function() {
  describe('.trackRequest(jqxhr, value)', function() {
    return it('takes a jqxhr and tracks its progress', function(done) {
      var jqxhrA, jqxhrB, reqA, reqB, s;
      s = new SuperModel();
      jqxhrA = $.get('/db/a');
      reqA = jasmine.Ajax.requests.mostRecent();
      jqxhrB = $.get('/db/b');
      reqB = jasmine.Ajax.requests.mostRecent();
      s.trackRequest(jqxhrA, 1);
      s.trackRequest(jqxhrB, 3);
      expect(s.progress).toBe(0);
      reqA.respondWith({
        status: 200,
        responseText: '[]'
      });
      return _.defer(function() {
        expect(s.progress).toBe(0.25);
        reqB.respondWith({
          status: 200,
          responseText: '[]'
        });
        return _.defer(function() {
          expect(s.progress).toBe(1);
          return done();
        });
      });
    });
  });
  describe('progress (property)', function() {
    it('is finished by default', function() {
      var s;
      s = new SuperModel();
      return expect(s.finished()).toBeTruthy();
    });
    return it('is based on resource completion and value', function(done) {
      var r1, r2, s;
      s = new SuperModel();
      r1 = s.addSomethingResource('???', 2);
      r2 = s.addSomethingResource('???', 3);
      expect(s.progress).toBe(0);
      r1.markLoaded();
      return _.defer(function() {
        expect(s.progress).toBe(0.4);
        r2.markLoaded();
        return _.defer(function() {
          expect(s.progress).toBe(1);
          return done();
        });
      });
    });
  });
  describe('loadModel (function)', function() {
    it('starts loading the model if it isn\'t already loading', function() {
      var m, request, s;
      s = new SuperModel();
      m = new User({
        _id: '12345'
      });
      s.loadModel(m);
      request = jasmine.Ajax.requests.mostRecent();
      return expect(request).toBeDefined();
    });
    it('also loads collections', function() {
      var c, request, s;
      s = new SuperModel();
      c = new LevelComponents();
      s.loadModel(c);
      request = jasmine.Ajax.requests.mostRecent();
      return expect(request).toBeDefined();
    });
    return xdescribe('timeout handling', function() {
      beforeEach(function() {
        return jasmine.clock().install();
      });
      afterEach(function() {
        return jasmine.clock().uninstall();
      });
      it('automatically retries stalled requests', function() {
        var i, m, s, timeUntilRetry, timesTried;
        s = new SuperModel();
        m = new User({
          _id: '12345'
        });
        s.loadModel(m);
        timeUntilRetry = 5000;
        for (timesTried = i = 1; i <= 5; timesTried = ++i) {
          expect(s.failed).toBeFalsy();
          expect(s.resources[1].loadsAttempted).toBe(timesTried);
          expect(jasmine.Ajax.requests.all().length).toBe(timesTried);
          jasmine.clock().tick(timeUntilRetry);
          timeUntilRetry *= 1.5;
        }
        expect(s.resources[1].loadsAttempted).toBe(5);
        expect(jasmine.Ajax.requests.all().length).toBe(5);
        return expect(s.failed).toBe(true);
      });
      return it('stops retrying once the model loads', function(done) {
        var i, m, request, s, timeUntilRetry, timesTried;
        s = new SuperModel();
        m = new User({
          _id: '12345'
        });
        s.loadModel(m);
        timeUntilRetry = 5000;
        for (timesTried = i = 1; i <= 2; timesTried = ++i) {
          expect(s.failed).toBeFalsy();
          expect(s.resources[1].loadsAttempted).toBe(timesTried);
          expect(jasmine.Ajax.requests.all().length).toBe(timesTried);
          jasmine.clock().tick(timeUntilRetry);
          timeUntilRetry *= 1.5;
        }
        expect(s.finished()).toBeFalsy();
        expect(s.failed).toBeFalsy();
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          status: 200,
          responseText: JSON.stringify(factories.makeUser({
            _id: '12345'
          }).attributes)
        });
        return _.defer(function() {
          expect(s.finished()).toBe(true);
          expect(s.failed).toBeFalsy();
          expect(s.resources[1].loadsAttempted).toBe(3);
          expect(jasmine.Ajax.requests.all().length).toBe(3);
          jasmine.clock().tick(60000);
          expect(s.resources[1].loadsAttempted).toBe(3);
          expect(jasmine.Ajax.requests.all().length).toBe(3);
          return done();
        });
      });
    });
  });
  describe('events', function() {
    return it('triggers "loaded-all" when finished', function(done) {
      var m, request, s, triggered;
      s = new SuperModel();
      m = new User({
        _id: '12345'
      });
      triggered = false;
      s.once('loaded-all', function() {
        return triggered = true;
      });
      s.loadModel(m);
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith({
        status: 200,
        responseText: '{}'
      });
      return _.defer(function() {
        expect(triggered).toBe(true);
        return done();
      });
    });
  });
  return describe('collection loading', function() {
    return it('combines models which are fetched from multiple sources', function() {
      var c1, c2, request, s;
      s = new SuperModel();
      c1 = new LevelComponents();
      c1.url = '/db/level.component?v=1';
      s.loadCollection(c1, 'components');
      c2 = new LevelComponents();
      c2.url = '/db/level.component?v=2';
      s.loadCollection(c2, 'components');
      request = jasmine.Ajax.requests.sendResponses({
        '/db/level.component?v=1': [
          {
            "_id": "id",
            "name": "Something"
          }
        ],
        '/db/level.component?v=2': [
          {
            "_id": "id",
            "description": "This is something"
          }
        ]
      });
      expect(s.models['/db/level.component/id'].get('name')).toBe('Something');
      return expect(s.models['/db/level.component/id'].get('description')).toBe('This is something');
    });
  });
});
});

;require.register("test/app/models/User.spec", function(exports, require, module) {
var User;

User = require('models/User');

describe('UserModel', function() {
  it('experience functions are correct', function() {
    expect(User.expForLevel(User.levelFromExp(0))).toBe(0);
    expect(User.levelFromExp(User.expForLevel(1))).toBe(1);
    expect(User.levelFromExp(User.expForLevel(10))).toBe(10);
    expect(User.expForLevel(1)).toBe(0);
    return expect(User.expForLevel(2)).toBeGreaterThan(User.expForLevel(1));
  });
  it('level is calculated correctly', function() {
    me.clear();
    me.set('points', 0);
    expect(me.level()).toBe(1);
    me.set('points', 50);
    return expect(me.level()).toBe(User.levelFromExp(50));
  });
  return describe('user emails', function() {
    it('has anyNotes, generalNews and recruitNotes enabled by default', function() {
      var defaultEmails, u;
      u = new User();
      expect(u.get('emails')).toBeUndefined();
      defaultEmails = u.get('emails', true);
      expect(defaultEmails.anyNotes.enabled).toBe(true);
      expect(defaultEmails.generalNews.enabled).toBe(true);
      return expect(defaultEmails.recruitNotes.enabled).toBe(true);
    });
    it('maintains defaults of other emails when one is explicitly set', function() {
      var defaultEmails, ref, ref1, u;
      u = new User();
      u.setEmailSubscription('recruitNotes', false);
      defaultEmails = u.get('emails', true);
      expect((ref = defaultEmails.anyNotes) != null ? ref.enabled : void 0).toBe(true);
      expect((ref1 = defaultEmails.generalNews) != null ? ref1.enabled : void 0).toBe(true);
      return expect(defaultEmails.recruitNotes.enabled).toBe(false);
    });
    return it('does not populate raw data for other emails when one is explicitly set', function() {
      var emails, u;
      u = new User();
      u.setEmailSubscription('recruitNotes', false);
      u.buildAttributesWithDefaults();
      emails = u.get('emails');
      expect(emails.anyNotes).toBeUndefined();
      return expect(emails.generalNews).toBeUndefined();
    });
  });
});
});

;require.register("test/app/require.spec", function(exports, require, module) {
describe('require', function() {
  return it('has no modules that error when you import them', function() {
    var error, i, len, module, modules, results;
    modules = window.require.list();
    results = [];
    for (i = 0, len = modules.length; i < len; i++) {
      module = modules[i];
      try {
        results.push(require(module));
      } catch (error) {
        console.error('Could not load', module);
        results.push(expect(false).toBe(true));
      }
    }
    return results;
  });
});
});

;require.register("test/app/vendorTests/lodash.spec", function(exports, require, module) {
describe('merge', function() {
  it('combines nested objects recursively', function() {
    var a, b, res;
    a = {
      i: 0,
      nest: {
        iii: 0
      }
    };
    b = {
      ii: 0,
      nest: {
        iv: 0
      }
    };
    res = _.merge(a, b);
    return expect(_.isEqual(res, {
      i: 0,
      ii: 0,
      nest: {
        iii: 0,
        iv: 0
      }
    })).toBeTruthy();
  });
  it('overwrites values from source to object', function() {
    var a, b, res;
    a = {
      i: 0
    };
    b = {
      i: 1
    };
    res = _.merge(a, b);
    return expect(_.isEqual(res, b)).toBeTruthy();
  });
  return it('treats arrays as atomic', function() {
    var a, b, res;
    a = {
      i: 0
    };
    b = {
      i: [1, 2, 3]
    };
    res = _.merge(a, b);
    expect(_.isEqual(res, b)).toBeTruthy();
    a = {
      i: [5, 4, 3]
    };
    b = {
      i: [1, 2, 3]
    };
    res = _.merge(a, b);
    return expect(_.isEqual(res, b)).toBeTruthy();
  });
});
});

;require.register("test/app/views/account/IsraelSignupView.spec", function(exports, require, module) {
var IsraelSignupView, utils;

IsraelSignupView = require('views/account/IsraelSignupView');

utils = require('core/utils');

describe('IsraelSignupView', function() {
  return describe('initialize()', function() {
    it('sets state.fatalError to "signed-in" if the user is not anonymous', function() {
      var view;
      spyOn(me, 'isAnonymous').and.returnValue(false);
      view = new IsraelSignupView();
      return expect(view.state.get('fatalError')).toBe('signed-in');
    });
    return it('sets state.fatalError to "missing-input" if the proper query parameters are not provided', function() {
      var queryVariables;
      queryVariables = null;
      spyOn(me, 'isAnonymous').and.returnValue(true);
      spyOn(utils, 'getQueryVariables').and.callFake(function() {
        return queryVariables;
      });
      queryVariables = {};
      expect(new IsraelSignupView().state.get('fatalError')).toBe('missing-input');
      queryVariables = {
        email: 'notanemail',
        israelId: '...'
      };
      expect(new IsraelSignupView().state.get('fatalError')).toBe('invalid-email');
      queryVariables = {
        email: 'test@email.com',
        israelId: '...'
      };
      return expect(new IsraelSignupView().state.get('fatalError')).toBe(null);
    });
  });
});
});

;require.register("test/app/views/account/PaymentsView.spec", function(exports, require, module) {
var Payments, PaymentsView, factories;

PaymentsView = require('views/account/PaymentsView');

Payments = require('collections/Payments');

factories = require('test/app/factories');

describe('PaymentsView', function() {
  return it('displays the payment "description" if the payment\'s productID is "custom"', function() {
    var payment, view;
    view = new PaymentsView();
    payment = factories.makePayment({
      productID: 'custom',
      description: 'Custom Description'
    });
    view.payments.fakeRequests[0].respondWith({
      status: 200,
      responseText: new Payments([payment]).stringify()
    });
    view.render();
    expect(_.contains(view.$el.text(), 'Custom Description')).toBe(true);
    return jasmine.demoEl(view.$('#site-content-area'));
  });
});
});

;require.register("test/app/views/core/AuthModal.spec", function(exports, require, module) {
var AuthModal, RecoverModal;

AuthModal = require('views/core/AuthModal');

RecoverModal = require('views/core/RecoverModal');

describe('AuthModal', function() {
  var modal;
  modal = null;
  beforeEach(function() {
    application.facebookHandler.fakeAPI();
    application.gplusHandler.fakeAPI();
    modal = new AuthModal();
    return modal.render();
  });
  afterEach(function() {
    return modal.stopListening();
  });
  it('opens the recover modal when you click the recover link', function() {
    var args;
    spyOn(modal, 'openModalView');
    modal.$el.find('#link-to-recover').click();
    expect(modal.openModalView.calls.count()).toEqual(1);
    args = modal.openModalView.calls.argsFor(0);
    return expect(args[0] instanceof RecoverModal).toBeTruthy();
  });
  return it('(demo)', function() {
    return jasmine.demoModal(modal);
  });
});
});

;require.register("test/app/views/core/CocoView.spec", function(exports, require, module) {
var AuthModal, BlandView, CocoView, CreateAccountModal, User,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

User = require('models/User');

CreateAccountModal = require('views/core/CreateAccountModal');

AuthModal = require('views/core/AuthModal');

BlandView = BlandView = (function(superClass) {
  extend(BlandView, superClass);

  function BlandView() {
    return BlandView.__super__.constructor.apply(this, arguments);
  }

  BlandView.prototype.template = function() {
    if (this.specialMessage) {
      return '<div id="content">custom message</div>';
    } else {
      return '<div id="content">normal message</div>';
    }
  };

  BlandView.prototype.initialize = function() {
    this.user1 = new User({
      _id: _.uniqueId()
    });
    this.supermodel.loadModel(this.user1);
    this.user2 = new User({
      _id: _.uniqueId()
    });
    return this.supermodel.loadModel(this.user2);
  };

  BlandView.prototype.onResourceLoadFailed = function(e) {
    var resource;
    resource = e.resource;
    if (resource.jqxhr.status === 400 && resource.model === this.user1) {
      this.specialMessage = true;
      return this.render();
    } else {
      return BlandView.__super__.onResourceLoadFailed.apply(this, arguments);
    }
  };

  return BlandView;

})(CocoView);

describe('CocoView', function() {
  return describe('network error handling', function() {
    var respond, view;
    view = null;
    respond = function(code, index) {
      var requests;
      if (index == null) {
        index = 0;
      }
      view.render();
      requests = jasmine.Ajax.requests.all();
      return requests[index].respondWith({
        status: code,
        responseText: JSON.stringify({})
      });
    };
    beforeEach(function() {
      return view = new BlandView();
    });
    describe('when the view overrides onResourceLoadFailed', function() {
      beforeEach(function() {
        view.render();
        expect(view.$('#content').hasClass('hidden')).toBe(true);
        return respond(400);
      });
      it('can show a custom message for a given error and model', function() {
        expect(view.$('#content').hasClass('hidden')).toBe(false);
        expect(view.$('#content').text()).toBe('custom message');
        respond(200, 1);
        expect(view.$('#content').hasClass('hidden')).toBe(false);
        return expect(view.$('#content').text()).toBe('custom message');
      });
      return it('(demo)', function() {
        return jasmine.demoEl(view.$el);
      });
    });
    describe('when the server returns 401', function() {
      beforeEach(function() {
        me.set('anonymous', true);
        return respond(401);
      });
      it('shows a login button which opens the AuthModal', function() {
        var button;
        button = view.$el.find('.login-btn');
        expect(button.length).toBe(3);
        spyOn(view, 'openModalView').and.callFake(function(modal) {
          expect(modal instanceof AuthModal).toBe(true);
          return modal.stopListening();
        });
        button.click();
        return expect(view.openModalView).toHaveBeenCalled();
      });
      it('shows a create account button which opens the CreateAccountModal', function() {
        var button;
        button = view.$el.find('#create-account-btn');
        expect(button.length).toBe(1);
        spyOn(view, 'openModalView').and.callFake(function(modal) {
          expect(modal instanceof CreateAccountModal).toBe(true);
          return modal.stopListening();
        });
        button.click();
        return expect(view.openModalView).toHaveBeenCalled();
      });
      it('says "Login Required"', function() {
        return expect(view.$('[data-i18n="loading_error.login_required"]').length).toBeTruthy();
      });
      return it('(demo)', function() {
        return jasmine.demoEl(view.$el);
      });
    });
    describe('when the server returns 402', function() {
      beforeEach(function() {
        return respond(402);
      });
      return it('does nothing, because it is up to the view to handle payment next steps');
    });
    describe('when the server returns 403', function() {
      beforeEach(function() {
        me.set('anonymous', false);
        return respond(403);
      });
      it('includes a logout button which logs out the account', function() {
        var button, request;
        button = view.$el.find('#logout-btn');
        expect(button.length).toBe(1);
        button.click();
        request = jasmine.Ajax.requests.mostRecent();
        return expect(request.url).toBe('/auth/logout');
      });
      return it('(demo)', function() {
        return jasmine.demoEl(view.$el);
      });
    });
    describe('when the server returns 404', function() {
      beforeEach(function() {
        return respond(404);
      });
      it('includes one of the 404 images', function() {
        var img;
        img = view.$el.find('#not-found-img');
        return expect(img.length).toBe(1);
      });
      return it('(demo)', function() {
        return jasmine.demoEl(view.$el);
      });
    });
    describe('when the server returns 408', function() {
      beforeEach(function() {
        return respond(408);
      });
      it('includes "Server Timeout" in the header', function() {
        return expect(view.$('[data-i18n="loading_error.timeout"]').length).toBeTruthy();
      });
      it('shows a message encouraging refreshing the page or following links', function() {
        return expect(view.$('[data-i18n="loading_error.general_desc"]').length).toBeTruthy();
      });
      return it('(demo)', function() {
        return jasmine.demoEl(view.$el);
      });
    });
    describe('when no connection is made', function() {
      beforeEach(function() {
        return respond();
      });
      it('shows "Connection Failed"', function() {
        return expect(view.$('[data-i18n="loading_error.connection_failure"]').length).toBeTruthy();
      });
      return it('(demo)', function() {
        return jasmine.demoEl(view.$el);
      });
    });
    return describe('when the server returns any other number >= 400', function() {
      beforeEach(function() {
        return respond(9001);
      });
      it('includes "Unknown Error" in the header', function() {
        return expect(view.$('[data-i18n="loading_error.unknown"]').length).toBeTruthy();
      });
      it('shows a message encouraging refreshing the page or following links', function() {
        return expect(view.$('[data-i18n="loading_error.general_desc"]').length).toBeTruthy();
      });
      return it('(demo)', function() {
        return jasmine.demoEl(view.$el);
      });
    });
  });
});
});

;require.register("test/app/views/core/CreateAccountModal.spec", function(exports, require, module) {
var Classroom, CreateAccountModal, factories, forms, responses;

CreateAccountModal = require('views/core/CreateAccountModal');

Classroom = require('models/Classroom');

forms = require('core/forms');

factories = require('test/app/factories');

responses = {
  signupSuccess: {
    status: 200,
    responseText: JSON.stringify({
      email: 'some@email.com'
    })
  }
};

xdescribe('CreateAccountModal', function() {
  var modal;
  modal = null;
  describe('click SIGN IN button', function() {
    return it('switches to AuthModal', function() {
      modal = new CreateAccountModal();
      modal.render();
      jasmine.demoModal(modal);
      spyOn(modal, 'openModalView');
      modal.$('.login-link').click();
      return expect(modal.openModalView).toHaveBeenCalled();
    });
  });
  describe('ChooseAccountTypeView', function() {
    beforeEach(function() {
      modal = new CreateAccountModal();
      modal.render();
      return jasmine.demoModal(modal);
    });
    describe('click sign up as TEACHER button', function() {
      beforeEach(function() {
        spyOn(application.router, 'navigate');
        return modal.$('.teacher-path-button').click();
      });
      return it('navigates the user to /teachers/signup', function() {
        var args;
        expect(application.router.navigate).toHaveBeenCalled();
        args = application.router.navigate.calls.argsFor(0);
        return expect(args[0]).toBe('/teachers/signup');
      });
    });
    describe('click sign up as STUDENT button', function() {
      beforeEach(function() {
        return modal.$('.student-path-button').click();
      });
      return it('switches to SegmentCheckView and sets "path" to "student"', function() {
        expect(modal.signupState.get('path')).toBe('student');
        return expect(modal.signupState.get('screen')).toBe('segment-check');
      });
    });
    return describe('click sign up as INDIVIDUAL button', function() {
      beforeEach(function() {
        return modal.$('.individual-path-button').click();
      });
      return it('switches to SegmentCheckView and sets "path" to "individual"', function() {
        expect(modal.signupState.get('path')).toBe('individual');
        return expect(modal.signupState.get('screen')).toBe('segment-check');
      });
    });
  });
  describe('SegmentCheckView', function() {
    var segmentCheckView;
    segmentCheckView = null;
    describe('INDIVIDUAL path', function() {
      beforeEach(function(done) {
        modal = new CreateAccountModal();
        modal.render();
        jasmine.demoModal(modal);
        modal.$('.individual-path-button').click();
        segmentCheckView = modal.subviews.segment_check_view;
        return _.defer(done);
      });
      return it('has a birthdate form', function() {
        return expect(modal.$('.birthday-form-group').length).toBe(1);
      });
    });
    return describe('STUDENT path', function() {
      beforeEach(function(done) {
        modal = new CreateAccountModal();
        modal.render();
        jasmine.demoModal(modal);
        modal.$('.student-path-button').click();
        segmentCheckView = modal.subviews.segment_check_view;
        spyOn(segmentCheckView, 'checkClassCodeDebounced');
        return _.defer(done);
      });
      it('has a classCode input', function() {
        return expect(modal.$('.class-code-input').length).toBe(1);
      });
      it('checks the class code when the input changes', function() {
        modal.$('.class-code-input').val('test').trigger('input');
        return expect(segmentCheckView.checkClassCodeDebounced).toHaveBeenCalled();
      });
      describe('fetchClassByCode()', function() {
        return it('is memoized', function() {
          var promise1, promise2, promise3;
          promise1 = segmentCheckView.fetchClassByCode('testA');
          promise2 = segmentCheckView.fetchClassByCode('testA');
          promise3 = segmentCheckView.fetchClassByCode('testB');
          expect(promise1).toBe(promise2);
          return expect(promise1).not.toBe(promise3);
        });
      });
      describe('checkClassCode()', function() {
        return it('shows a success message if the classCode is found', function() {
          var request;
          request = jasmine.Ajax.requests.mostRecent();
          expect(_.string.startsWith(request.url, '/db/classroom')).toBe(false);
          modal.$('.class-code-input').val('test').trigger('input');
          segmentCheckView.checkClassCode();
          request = jasmine.Ajax.requests.mostRecent();
          expect(_.string.startsWith(request.url, '/db/classroom')).toBe(true);
          return request.respondWith({
            status: 200,
            responseText: JSON.stringify({
              data: factories.makeClassroom({
                name: 'Some Classroom'
              }).toJSON(),
              owner: factories.makeUser({
                name: 'Some Teacher'
              }).toJSON()
            })
          });
        });
      });
      return describe('on submit with class code', function() {
        var classCodeRequest;
        classCodeRequest = null;
        beforeEach(function() {
          var request;
          request = jasmine.Ajax.requests.mostRecent();
          expect(_.string.startsWith(request.url, '/db/classroom')).toBe(false);
          modal.$('.class-code-input').val('test').trigger('input');
          modal.$('form.segment-check').submit();
          classCodeRequest = jasmine.Ajax.requests.mostRecent();
          return expect(_.string.startsWith(classCodeRequest.url, '/db/classroom')).toBe(true);
        });
        describe('when the classroom IS found', function() {
          beforeEach(function(done) {
            classCodeRequest.respondWith({
              status: 200,
              responseText: JSON.stringify({
                data: factories.makeClassroom({
                  name: 'Some Classroom'
                }).toJSON(),
                owner: factories.makeUser({
                  name: 'Some Teacher'
                }).toJSON()
              })
            });
            return _.defer(done);
          });
          it('navigates to the BasicInfoView', function() {
            return expect(modal.signupState.get('screen')).toBe('basic-info');
          });
          return describe('on the BasicInfoView for students', function() {});
        });
        return describe('when the classroom IS NOT found', function() {
          beforeEach(function(done) {
            classCodeRequest.respondWith({
              status: 404,
              responseText: '{}'
            });
            return segmentCheckView.once('special-render', done);
          });
          return it('shows an error', function() {
            return expect(modal.$('[data-i18n="signup.classroom_not_found"]').length).toBe(1);
          });
        });
      });
    });
  });
  describe('CoppaDenyView', function() {
    var coppaDenyView;
    coppaDenyView = null;
    beforeEach(function() {
      modal = new CreateAccountModal();
      modal.signupState.set({
        path: 'individual',
        screen: 'coppa-deny'
      });
      modal.render();
      jasmine.demoModal(modal);
      return coppaDenyView = modal.subviews.coppa_deny_view;
    });
    return it('shows an input for a parent\'s email address to sign up their child', function() {
      return expect(modal.$('#parent-email-input').length).toBe(1);
    });
  });
  describe('BasicInfoView', function() {
    var basicInfoView;
    basicInfoView = null;
    beforeEach(function() {
      modal = new CreateAccountModal();
      modal.signupState.set({
        path: 'student',
        screen: 'basic-info'
      });
      modal.render();
      jasmine.demoModal(modal);
      return basicInfoView = modal.subviews.basic_info_view;
    });
    it('checks for name conflicts when the name input changes', function() {
      spyOn(basicInfoView, 'checkName');
      basicInfoView.$('#username-input').val('test').trigger('change');
      return expect(basicInfoView.checkName).toHaveBeenCalled();
    });
    describe('checkEmail()', function() {
      beforeEach(function() {
        basicInfoView.$('input[name="email"]').val('some@email.com');
        return basicInfoView.checkEmail();
      });
      it('shows checking', function() {
        return expect(basicInfoView.$('[data-i18n="signup.checking"]').length).toBe(1);
      });
      describe('if email DOES exist', function() {
        beforeEach(function(done) {
          jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            responseText: JSON.stringify({
              exists: true
            })
          });
          return _.defer(done);
        });
        return it('says an account already exists and encourages to sign in', function() {
          expect(basicInfoView.$('[data-i18n="signup.account_exists"]').length).toBe(1);
          return expect(basicInfoView.$('.login-link[data-i18n="signup.sign_in"]').length).toBe(1);
        });
      });
      return describe('if email DOES NOT exist', function() {
        beforeEach(function(done) {
          jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            responseText: JSON.stringify({
              exists: false
            })
          });
          return _.defer(done);
        });
        return it('says email looks good', function() {
          return expect(basicInfoView.$('[data-i18n="signup.email_good"]').length).toBe(1);
        });
      });
    });
    describe('checkName()', function() {
      beforeEach(function() {
        basicInfoView.$('input[name="name"]').val('Some Name').trigger('change');
        return basicInfoView.checkName();
      });
      it('shows checking', function() {
        return expect(basicInfoView.$('[data-i18n="signup.checking"]').length).toBe(1);
      });
      return describe('if email DOES NOT exist', function() {
        beforeEach(function(done) {
          jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            responseText: JSON.stringify({
              conflicts: false
            })
          });
          return _.defer(done);
        });
        return it('says name looks good', function() {
          return expect(basicInfoView.$('[data-i18n="signup.name_available"]').length).toBe(1);
        });
      });
    });
    return describe('onSubmitForm()', function() {
      it('shows required errors for empty fields when on INDIVIDUAL path', function() {
        modal.signupState.set('path', 'individual');
        basicInfoView.$('input').val('');
        basicInfoView.$('#basic-info-form').submit();
        return expect(basicInfoView.$('.form-group.has-error').length).toBe(3);
      });
      it('shows required errors for empty fields when on STUDENT path', function() {
        modal.signupState.set('path', 'student');
        modal.render();
        basicInfoView.$('#basic-info-form').submit();
        return expect(basicInfoView.$('.form-group.has-error').length).toBe(4);
      });
      return describe('submit with password', function() {
        beforeEach(function() {
          forms.objectToForm(basicInfoView.$el, {
            email: 'some@email.com',
            password: 'password',
            name: 'A Username',
            firstName: 'First',
            lastName: 'Last'
          });
          return basicInfoView.$('form').submit();
        });
        it('checks for email and name conflicts', function() {
          var emailCheck, nameCheck;
          emailCheck = _.find(jasmine.Ajax.requests.all(), function(r) {
            return _.string.startsWith(r.url, '/auth/email');
          });
          nameCheck = _.find(jasmine.Ajax.requests.all(), function(r) {
            return _.string.startsWith(r.url, '/auth/name');
          });
          return expect(_.all([emailCheck, nameCheck])).toBe(true);
        });
        describe('a check does not pass', function() {
          beforeEach(function(done) {
            var emailCheck, nameCheck;
            nameCheck = _.find(jasmine.Ajax.requests.all(), function(r) {
              return _.string.startsWith(r.url, '/auth/name');
            });
            nameCheck.respondWith({
              status: 200,
              responseText: JSON.stringify({
                conflicts: false
              })
            });
            emailCheck = _.find(jasmine.Ajax.requests.all(), function(r) {
              return _.string.startsWith(r.url, '/auth/email');
            });
            emailCheck.respondWith({
              status: 200,
              responseText: JSON.stringify({
                exists: true
              })
            });
            return _.defer(done);
          });
          return it('re-enables the form and shows which field failed', function() {});
        });
        return describe('both checks do pass', function() {
          beforeEach(function(done) {
            var emailCheck, nameCheck;
            nameCheck = _.find(jasmine.Ajax.requests.all(), function(r) {
              return _.string.startsWith(r.url, '/auth/name');
            });
            nameCheck.respondWith({
              status: 200,
              responseText: JSON.stringify({
                conflicts: false
              })
            });
            emailCheck = _.find(jasmine.Ajax.requests.all(), function(r) {
              return _.string.startsWith(r.url, '/auth/email');
            });
            emailCheck.respondWith({
              status: 200,
              responseText: JSON.stringify({
                exists: false
              })
            });
            return _.defer(done);
          });
          it('saves the user', function() {
            var body, request;
            request = jasmine.Ajax.requests.mostRecent();
            expect(_.string.startsWith(request.url, '/db/user')).toBe(true);
            body = JSON.parse(request.params);
            expect(body.firstName).toBe('First');
            expect(body.lastName).toBe('Last');
            return expect(body.emails.generalNews.enabled).toBe(true);
          });
          describe('saving the user FAILS', function() {
            beforeEach(function(done) {
              var request;
              request = jasmine.Ajax.requests.mostRecent();
              request.respondWith({
                status: 422,
                responseText: JSON.stringify({
                  message: 'Some error happened'
                })
              });
              return _.defer(done);
            });
            return it('displays the server error', function() {
              return expect(basicInfoView.$('.alert-danger').length).toBe(1);
            });
          });
          return describe('saving the user SUCCEEDS', function() {
            beforeEach(function(done) {
              var request;
              request = jasmine.Ajax.requests.mostRecent();
              request.respondWith({
                status: 200,
                responseText: '{}'
              });
              return _.defer(done);
            });
            it('signs the user up with the password', function() {
              var request;
              request = jasmine.Ajax.requests.mostRecent();
              return expect(_.string.endsWith(request.url, 'signup-with-password')).toBe(true);
            });
            describe('after signup STUDENT', function() {
              beforeEach(function(done) {
                var request;
                basicInfoView.signupState.set({
                  path: 'student',
                  classCode: 'ABC',
                  classroom: new Classroom()
                });
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith(responses.signupSuccess);
                return _.defer(done);
              });
              return it('joins the classroom', function() {
                var request;
                request = jasmine.Ajax.requests.mostRecent();
                return expect(request.url).toBe('/db/classroom/~/members');
              });
            });
            return describe('signing the user up SUCCEEDS', function() {
              beforeEach(function(done) {
                var request;
                spyOn(basicInfoView, 'finishSignup');
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith(responses.signupSuccess);
                return _.defer(done);
              });
              return it('calls finishSignup()', function() {
                return expect(basicInfoView.finishSignup).toHaveBeenCalled();
              });
            });
          });
        });
      });
    });
  });
  describe('ConfirmationView', function() {
    var confirmationView;
    confirmationView = null;
    beforeEach(function() {
      modal = new CreateAccountModal();
      modal.signupState.set('screen', 'confirmation');
      modal.render();
      jasmine.demoModal(modal);
      return confirmationView = modal.subviews.confirmation_view;
    });
    return it('(for demo testing)', function() {
      me.set('name', 'A Sweet New Username');
      me.set('email', 'some@email.com');
      return confirmationView.signupState.set('ssoUsed', 'gplus');
    });
  });
  describe('SingleSignOnConfirmView', function() {
    var singleSignOnConfirmView;
    singleSignOnConfirmView = null;
    beforeEach(function() {
      modal = new CreateAccountModal();
      modal.signupState.set({
        screen: 'sso-confirm',
        email: 'some@email.com'
      });
      modal.render();
      jasmine.demoModal(modal);
      return singleSignOnConfirmView = modal.subviews.single_sign_on_confirm_view;
    });
    return it('(for demo testing)', function() {
      me.set('name', 'A Sweet New Username');
      me.set('email', 'some@email.com');
      return singleSignOnConfirmView.signupState.set('ssoUsed', 'facebook');
    });
  });
  return describe('CoppaDenyView', function() {
    var coppaDenyView;
    coppaDenyView = null;
    beforeEach(function() {
      modal = new CreateAccountModal();
      modal.signupState.set({
        screen: 'coppa-deny'
      });
      modal.render();
      jasmine.demoModal(modal);
      return coppaDenyView = modal.subviews.coppa_deny_view;
    });
    return it('(for demo testing)', function() {});
  });
});
});

;require.register("test/app/views/courses/CoursesUpdateAccountView.spec", function(exports, require, module) {
var CoursesUpdateAccountView, factories;

CoursesUpdateAccountView = require('views/courses/CoursesUpdateAccountView');

factories = require('test/app/factories');

describe('/students/update-account', function() {
  describe('when logged out', function() {
    beforeEach(function(done) {
      me.clear();
      this.view = new CoursesUpdateAccountView();
      this.view.render();
      return done();
    });
    return it('shows log in button', function() {
      return expect(this.view.$el.find('.login-btn').length).toEqual(1);
    });
  });
  describe('when logged in as individual', function() {
    beforeEach(function(done) {
      me.set(factories.makeUser({}).attributes);
      this.view = new CoursesUpdateAccountView();
      this.view.render();
      expect(this.view.$el.find('.login-btn').length).toEqual(0);
      return done();
    });
    it('shows update to teacher button', function() {
      return expect(this.view.$el.find('.update-teacher-btn').length).toEqual(1);
    });
    return it('shows update to student button and classCode input', function() {
      expect(this.view.$el.find('.update-student-btn').length).toEqual(1);
      return expect(this.view.$el.find('input[name="classCode"]').length).toEqual(1);
    });
  });
  describe('when logged in as student', function() {
    beforeEach(function(done) {
      me.set(factories.makeUser({
        role: 'student'
      }).attributes);
      this.view = new CoursesUpdateAccountView();
      this.view.render();
      expect(this.view.$el.find('.login-btn').length).toEqual(0);
      expect(this.view.$el.find('.remain-teacher-btn').length).toEqual(0);
      expect(this.view.$el.find('.logout-btn').length).toEqual(1);
      return done();
    });
    it('shows remain a student button', function() {
      expect(this.view.$el.find('.remain-student-btn').length).toEqual(1);
      return expect(this.view.$el.find('input[name="classCode"]').length).toEqual(0);
    });
    return it('shows update to teacher button', function() {
      return expect(this.view.$el.find('.update-teacher-btn').length).toEqual(1);
    });
  });
  return describe('when logged in as teacher', function() {
    beforeEach(function(done) {
      me.set(factories.makeUser({
        role: 'teacher'
      }).attributes);
      this.view = new CoursesUpdateAccountView();
      this.view.render();
      expect(this.view.$el.find('.login-btn').length).toEqual(0);
      expect(this.view.$el.find('.remain-student-btn').length).toEqual(0);
      return done();
    });
    it('shows remain a teacher button', function() {
      return expect(this.view.$el.find('.remain-teacher-btn').length).toEqual(1);
    });
    return it('shows update to student button', function() {
      expect(this.view.$el.find('.update-student-btn').length).toEqual(1);
      return expect(this.view.$el.find('input[name="classCode"]').length).toEqual(1);
    });
  });
});
});

;require.register("test/app/views/courses/CoursesView.spec", function(exports, require, module) {
var Classrooms, CourseInstances, Courses, CoursesView, HeroSelectModal, auth, factories;

CoursesView = require('views/courses/CoursesView');

HeroSelectModal = require('views/courses/HeroSelectModal');

Classrooms = require('collections/Classrooms');

CourseInstances = require('collections/CourseInstances');

Courses = require('collections/Courses');

auth = require('core/auth');

factories = require('test/app/factories');

describe('CoursesView', function() {
  var modal, view;
  modal = null;
  view = null;
  return describe('Change Hero button', function() {
    beforeEach(function(done) {
      var classrooms, courseInstances, courses;
      me.set(factories.makeUser({
        role: 'student'
      }).attributes);
      view = new CoursesView();
      classrooms = new Classrooms([factories.makeClassroom()]);
      courseInstances = new CourseInstances([factories.makeCourseInstance()]);
      courses = new Courses([factories.makeCourse()]);
      view.classrooms.fakeRequests[0].respondWith({
        status: 200,
        responseText: classrooms.stringify()
      });
      view.ownedClassrooms.fakeRequests[0].respondWith({
        status: 200,
        responseText: classrooms.stringify()
      });
      view.courseInstances.fakeRequests[0].respondWith({
        status: 200,
        responseText: courseInstances.stringify()
      });
      view.render();
      jasmine.demoEl(view.$el);
      return done();
    });
    return it('opens the modal when you click Change Hero', function() {
      var args;
      spyOn(view, 'openModalView');
      view.$('.change-hero-btn').click();
      expect(view.openModalView).toHaveBeenCalled();
      args = view.openModalView.calls.argsFor(0);
      return expect(args[0] instanceof HeroSelectModal).toBe(true);
    });
  });
});
});

;require.register("test/app/views/courses/EnrollmentsView.spec", function(exports, require, module) {
var Classrooms, Courses, EnrollmentsView, Prepaids, TeachersContactModal, Users, factories;

EnrollmentsView = require('views/courses/EnrollmentsView');

Courses = require('collections/Courses');

Prepaids = require('collections/Prepaids');

Users = require('collections/Users');

Classrooms = require('collections/Classrooms');

factories = require('test/app/factories');

TeachersContactModal = require('views/teachers/TeachersContactModal');

describe('EnrollmentsView', function() {
  beforeEach(function() {
    var classrooms, courses, i, j, len, prepaid, prepaids, ref, request, students, userSlice, userSlices;
    me.set('anonymous', false);
    me.set('role', 'teacher');
    me.set('enrollmentRequestSent', false);
    this.view = new EnrollmentsView();
    prepaid = factories.makePrepaid();
    students = new Users(_.times(10, function(i) {
      return factories.makeUser({}, {
        prepaid: i % 2 ? prepaid : null
      });
    }));
    userSlices = [new Users(students.slice(0, 5)), new Users(students.slice(3, 8)), new Users(students.slice(7, 10))];
    classrooms = new Classrooms((function() {
      var j, len, results;
      results = [];
      for (j = 0, len = userSlices.length; j < len; j++) {
        userSlice = userSlices[j];
        results.push(factories.makeClassroom({}, {
          members: userSlice
        }));
      }
      return results;
    })());
    this.view.classrooms.fakeRequests[0].respondWith({
      status: 200,
      responseText: classrooms.stringify()
    });
    ref = this.view.members.fakeRequests;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      request = ref[i];
      request.respondWith({
        status: 200,
        responseText: userSlices[i].stringify()
      });
    }
    prepaids = new Prepaids([
      factories.makePrepaid({}, {
        redeemers: new Users(_.times(5, function() {
          return factories.makeUser();
        }))
      }), factories.makePrepaid(), factories.makePrepaid({
        startDate: moment().add(2, 'months').toISOString(),
        endDate: moment().add(14, 'months').toISOString()
      }), factories.makePrepaid({
        maxRedeemers: 2
      }, {
        redeemers: new Users(_.times(2, function() {
          return factories.makeUser();
        }))
      })
    ]);
    this.view.prepaids.fakeRequests[0].respondWith({
      status: 200,
      responseText: prepaids.stringify()
    });
    courses = new Courses([
      factories.makeCourse({
        free: true
      }), factories.makeCourse({
        free: false
      }), factories.makeCourse({
        free: false
      }), factories.makeCourse({
        free: false
      })
    ]);
    this.view.courses.fakeRequests[0].respondWith({
      status: 200,
      responseText: courses.stringify()
    });
    jasmine.demoEl(this.view.$el);
    return window.view = this.view;
  });
  describe('For low priority leads', function() {
    beforeEach(function() {
      var leadPriorityRequest;
      leadPriorityRequest = jasmine.Ajax.requests.filter(function(r) {
        return r.url === '/db/user/-/lead-priority';
      })[0];
      leadPriorityRequest.respondWith({
        status: 200,
        responseText: JSON.stringify({
          priority: 'low'
        })
      });
      return this.view.render();
    });
    return it('shows the Starter License upsell', function() {
      return expect(this.view.$('a[href="/teachers/starter-licenses"]').length).toBe(1);
    });
  });
  describe('For low priority leads', function() {
    beforeEach(function() {
      var leadPriorityRequest;
      leadPriorityRequest = jasmine.Ajax.requests.filter(function(r) {
        return r.url === '/db/user/-/lead-priority';
      })[0];
      leadPriorityRequest.respondWith({
        status: 200,
        responseText: JSON.stringify({
          priority: 'high'
        })
      });
      return this.view.render();
    });
    return it("doesn't show the Starter License upsell", function() {
      return expect(this.view.$('a[href="/teachers/starter-licenses"]').length).toBe(0);
    });
  });
  return describe('For no priority leads', function() {
    beforeEach(function() {
      var leadPriorityRequest;
      leadPriorityRequest = jasmine.Ajax.requests.filter(function(r) {
        return r.url === '/db/user/-/lead-priority';
      })[0];
      leadPriorityRequest.respondWith({
        status: 200,
        responseText: JSON.stringify({
          priority: void 0
        })
      });
      return this.view.render();
    });
    it("doesn't show the Starter License upsell", function() {
      return expect(this.view.$('a[href="/teachers/starter-licenses"]').length).toBe(0);
    });
    describe('"Get Licenses" area', function() {
      return describe('when the teacher has made contact', function() {
        beforeEach(function() {
          me.set('enrollmentRequestSent', true);
          return this.view.render();
        });
        return it('shows confirmation and a mailto link to schools@codecombat.com', function() {
          if (!this.view.$('#request-sent-btn').length) {
            fail('Request button not found.');
          }
          if (!this.view.$('#enrollment-request-sent-blurb').length) {
            return fail('License request sent blurb not found.');
          }
        });
      });
    });
    return describe('when there are no prepaids to show', function() {
      beforeEach(function(done) {
        this.view.prepaids.reset([]);
        this.view.updatePrepaidGroups();
        return _.defer(done);
      });
      return it('fills the void with the rest of the page content', function() {
        return expect(this.view.$('#actions-col').length).toBe(0);
      });
    });
  });
});
});

;require.register("test/app/views/courses/HeroSelectModal.spec", function(exports, require, module) {
var HeroSelectModal, factories;

HeroSelectModal = require('views/courses/HeroSelectModal');

factories = require('test/app/factories');

describe('HeroSelectModal', function() {
  var coursesView, hero1, hero2, heroesResponse, modal, user;
  modal = null;
  coursesView = null;
  user = null;
  hero1 = factories.makeThangType({
    original: "hero1original",
    _id: "hero1id",
    heroClass: "Warrior",
    name: "Hero 1"
  });
  hero2 = factories.makeThangType({
    original: "hero2original",
    _id: "hero2id",
    heroClass: "Warrior",
    name: "Hero 2"
  });
  heroesResponse = JSON.stringify([hero1, hero2]);
  beforeEach(function(done) {
    var subview;
    window.me = user = factories.makeUser({
      heroConfig: {
        thangType: hero1.get('original')
      }
    });
    modal = new HeroSelectModal();
    subview = modal.subviews.hero_select_view;
    subview.heroes.fakeRequests[0].respondWith({
      status: 200,
      responseText: heroesResponse
    });
    jasmine.demoModal(modal);
    return _.defer(function() {
      modal.render();
      return done();
    });
  });
  afterEach(function() {
    return modal.stopListening();
  });
  it('highlights the current hero', function() {
    return expect(modal.$(".hero-option[data-hero-original='" + (hero1.get('original')) + "']")[0].className.split(" ")).toContain('selected');
  });
  it('saves when you change heroes', function(done) {
    modal.$(".hero-option[data-hero-original='" + (hero2.get('original')) + "']").click();
    return _.defer(function() {
      var ref, request;
      expect(user.fakeRequests.length).toBe(1);
      request = user.fakeRequests[0];
      expect(request.method).toBe("PUT");
      expect((ref = JSON.parse(request.params).heroConfig) != null ? ref.thangType : void 0).toBe(hero2.get('original'));
      return done();
    });
  });
  return it('triggers its events properly', function(done) {
    var request;
    spyOn(modal, 'trigger');
    modal.render();
    modal.$('.hero-option:nth-child(2)').click();
    request = jasmine.Ajax.requests.mostRecent();
    request.respondWith({
      status: 200,
      responseText: me.attributes
    });
    expect(modal.trigger).toHaveBeenCalled();
    expect(modal.trigger.calls.argsFor(0)[0]).toBe('hero-select:success');
    expect(modal.trigger).not.toHaveBeenCalledWith('hide');
    modal.$('.select-hero-btn').click();
    expect(modal.trigger).toHaveBeenCalledWith('hide');
    return done();
  });
});
});

;require.register("test/app/views/courses/TeacherCoursesView.spec", function(exports, require, module) {
var Campaigns, Classrooms, Courses, HeroSelectModal, Levels, TeacherCoursesView, auth, factories;

TeacherCoursesView = require('views/courses/TeacherCoursesView');

HeroSelectModal = require('views/courses/HeroSelectModal');

Classrooms = require('collections/Classrooms');

Courses = require('collections/Courses');

Campaigns = require('collections/Campaigns');

Levels = require('collections/Levels');

auth = require('core/auth');

factories = require('test/app/factories');

describe('TeacherCoursesView', function() {
  var modal, view;
  modal = null;
  view = null;
  return describe('Play Level form', function() {
    beforeEach(function(done) {
      var campaigns, classrooms, courses, levels1, levels2;
      me.set(factories.makeUser({
        role: 'teacher'
      }).attributes);
      view = new TeacherCoursesView();
      classrooms = new Classrooms([factories.makeClassroom()]);
      levels1 = new Levels([
        factories.makeLevel({
          name: 'Dungeons of Kithgard'
        }), factories.makeLevel(), factories.makeLevel()
      ]);
      levels2 = new Levels([factories.makeLevel(), factories.makeLevel(), factories.makeLevel()]);
      campaigns = new Campaigns([
        factories.makeCampaign({}, {
          levels: levels1
        }), factories.makeCampaign({}, {
          levels: levels2
        })
      ]);
      courses = new Courses([
        factories.makeCourse({}, {
          campaign: campaigns.at(0)
        }), factories.makeCourse({}, {
          campaign: campaigns.at(1)
        })
      ]);
      view.ownedClassrooms.fakeRequests[0].respondWith({
        status: 200,
        responseText: classrooms.stringify()
      });
      view.campaigns.fakeRequests[0].respondWith({
        status: 200,
        responseText: campaigns.stringify()
      });
      view.courses.fakeRequests[0].respondWith({
        status: 200,
        responseText: courses.stringify()
      });
      view.render();
      return done();
    });
    it('opens HeroSelectModal for the first level of the first course', function(done) {
      var args, modalView;
      spyOn(view, 'openModalView').and.callFake(function(modal) {
        return modal;
      });
      spyOn(application.router, 'navigate');
      view.$('.play-level-button').first().click();
      expect(view.openModalView).toHaveBeenCalled();
      expect(application.router.navigate).not.toHaveBeenCalled();
      args = view.openModalView.calls.argsFor(0);
      modalView = args[0];
      expect(modalView instanceof HeroSelectModal).toBe(true);
      modalView.trigger('hero-select:success');
      expect(application.router.navigate).not.toHaveBeenCalled();
      modalView.trigger('hide');
      modalView.trigger('hidden');
      return _.defer(function() {
        expect(application.router.navigate).toHaveBeenCalled();
        return done();
      });
    });
    it("doesn't open HeroSelectModal for other levels", function() {
      var secondLevelSlug;
      spyOn(view, 'openModalView');
      spyOn(application.router, 'navigate');
      secondLevelSlug = view.$('.level-select:first option:nth-child(2)').val();
      view.$('.level-select').first().val(secondLevelSlug);
      view.$('.play-level-button').first().click();
      expect(view.openModalView).not.toHaveBeenCalled();
      return expect(application.router.navigate).toHaveBeenCalled();
    });
    it("doesn't open HeroSelectModal for other courses", function() {
      spyOn(view, 'openModalView');
      spyOn(application.router, 'navigate');
      view.$('.play-level-button').get(1).click();
      expect(view.openModalView).not.toHaveBeenCalled();
      return expect(application.router.navigate).toHaveBeenCalled();
    });
    return it("remembers the selected hero");
  });
});
});

;require.register("test/app/views/courses/TeachersContactModal.spec", function(exports, require, module) {
var TeachersContactModal, TrialRequests, factories;

TeachersContactModal = require('views/teachers/TeachersContactModal');

TrialRequests = require('collections/TrialRequests');

factories = require('test/app/factories');

describe('TeachersContactModal', function() {
  beforeEach(function(done) {
    var trialRequests;
    this.modal = new TeachersContactModal();
    this.modal.render();
    trialRequests = new TrialRequests([factories.makeTrialRequest()]);
    this.modal.trialRequests.fakeRequests[0].respondWith({
      status: 200,
      responseText: trialRequests.stringify()
    });
    this.modal.supermodel.once('loaded-all', done);
    return jasmine.demoModal(this.modal);
  });
  it('shows an error when the name is empty and the form is submitted', function() {
    this.modal.$('input[name="name"]').val('');
    this.modal.$('form').submit();
    return expect(this.modal.$('input[name="name"]').closest('.form-group').hasClass('has-error')).toBe(true);
  });
  it('shows an error when the email is invalid and the form is submitted', function() {
    this.modal.$('input[name="email"]').val('not an email');
    this.modal.$('form').submit();
    return expect(this.modal.$('input[name="email"]').closest('.form-group').hasClass('has-error')).toBe(true);
  });
  it('shows an error when licensesNeeded is not > 0 and the form is submitted', function() {
    this.modal.$('input[name="licensesNeeded"]').val('');
    this.modal.$('form').submit();
    return expect(this.modal.$('input[name="licensesNeeded"]').closest('.form-group').hasClass('has-error')).toBe(true);
  });
  it('shows an error when the message is empty and the form is submitted', function() {
    this.modal.$('textarea[name="message"]').val('');
    this.modal.$('form').submit();
    return expect(this.modal.$('textarea[name="message"]').closest('.form-group').hasClass('has-error')).toBe(true);
  });
  return describe('submit form', function() {
    beforeEach(function() {
      this.modal.$('input[name="licensesNeeded"]').val(777);
      return this.modal.$('form').submit();
    });
    it('disables inputs', function() {
      var el, i, len, ref, results;
      ref = this.modal.$('button, input, textarea');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        el = ref[i];
        results.push(expect($(el).is(':disabled')).toBe(true));
      }
      return results;
    });
    describe('failed contact', function() {
      beforeEach(function() {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        return request.respondWith({
          status: 500
        });
      });
      return it('shows an error', function() {
        return expect(this.modal.$('.alert-danger').length).toBe(1);
      });
    });
    return describe('successful contact', function() {
      beforeEach(function() {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        return request.respondWith({
          status: 200,
          responseText: '{}'
        });
      });
      it('shows a success message', function() {
        return expect(this.modal.$('.alert-success').length).toBe(1);
      });
      return it('disables the submit button', function() {
        return expect(this.modal.$('#submit-btn').is(':disabled')).toBe(true);
      });
    });
  });
});
});

;require.register("test/app/views/editor/PatchModal.spec", function(exports, require, module) {
var LevelComponent, Patch, PatchModal;

LevelComponent = require('models/LevelComponent');

Patch = require('models/Patch');

PatchModal = require('views/editor/PatchModal');

describe('PatchModal', function() {
  return describe('acceptPatch', function() {
    return it('triggers LevelComponents and Systems to recompile their code', function() {
      var levelComponent, patch, patchModal;
      levelComponent = new LevelComponent({
        code: 'newList = (item.prop for item in list)',
        id: 'id'
      });
      levelComponent.markToRevert();
      levelComponent.set('code', 'func = -> console.log()');
      patch = new Patch({
        delta: levelComponent.getDelta(),
        target: 'id'
      });
      levelComponent = new LevelComponent({
        code: 'newList = (item.prop for item in list)',
        id: 'id'
      });
      levelComponent.markToRevert();
      patchModal = new PatchModal(patch, levelComponent);
      patchModal.render();
      patchModal.acceptPatch();
      return expect(levelComponent.get('js').indexOf('function()')).toBeGreaterThan(-1);
    });
  });
});
});

;require.register("test/app/views/editor/component/ThangComponentsEditView.spec", function(exports, require, module) {
var LevelComponent, SuperModel, ThangComponentEditView, componentC, responses,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ThangComponentEditView = require('views/editor/component/ThangComponentsEditView');

SuperModel = require('models/SuperModel');

LevelComponent = require('models/LevelComponent');

responses = {
  '/db/level.component/B/version/0': {
    system: 'System',
    original: 'B',
    version: {
      major: 0,
      minor: 0
    },
    name: 'B (depends on A)',
    dependencies: [
      {
        original: 'A',
        majorVersion: 0
      }
    ]
  },
  '/db/level.component/A/version/0': {
    system: 'System',
    original: 'A',
    version: {
      major: 0,
      minor: 0
    },
    name: 'A',
    configSchema: {
      type: 'object',
      properties: {
        propA: {
          type: 'number'
        },
        propB: {
          type: 'string'
        }
      }
    }
  }
};

componentC = new LevelComponent({
  system: 'System',
  original: 'C',
  version: {
    major: 0,
    minor: 0
  },
  name: 'C (depends on B)',
  dependencies: [
    {
      original: 'B',
      majorVersion: 0
    }
  ]
});

componentC.loaded = true;

describe('ThangComponentsEditView', function() {
  var view;
  view = null;
  beforeEach(function(done) {
    var supermodel;
    supermodel = new SuperModel();
    supermodel.registerModel(componentC);
    view = new ThangComponentEditView({
      components: [],
      supermodel: supermodel
    });
    return _.defer(function() {
      var success;
      view.render();
      view.componentsTreema.set('/', [
        {
          original: 'C',
          majorVersion: 0
        }
      ]);
      spyOn(window, 'noty');
      success = jasmine.Ajax.requests.sendResponses(responses);
      expect(success).toBeTruthy();
      return _.defer(function() {
        return done();
      });
    });
  });
  afterEach(function() {
    return view.destroy();
  });
  it('loads dependencies when you add a component with the left side treema', function() {
    return expect(_.size(view.subviews)).toBe(3);
  });
  it('adds dependencies to its components list', function() {
    var c, componentOriginals;
    componentOriginals = (function() {
      var i, len, ref, results;
      ref = view.components;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.original);
      }
      return results;
    })();
    expect(indexOf.call(componentOriginals, 'A') >= 0).toBeTruthy();
    expect(indexOf.call(componentOriginals, 'B') >= 0).toBeTruthy();
    return expect(indexOf.call(componentOriginals, 'C') >= 0).toBeTruthy();
  });
  return it('removes components that are dependent on a removed component', function() {
    var c;
    view.components = (function() {
      var i, len, ref, results;
      ref = view.components;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        if (c.original !== 'A') {
          results.push(c);
        }
      }
      return results;
    })();
    view.onComponentsChanged();
    expect(view.components.length).toBe(0);
    return expect(_.size(view.subviews)).toBe(0);
  });
});
});

;require.register("test/app/views/editor/level/EditorLevelView.spec", function(exports, require, module) {
var LevelEditView, emptyLevel;

LevelEditView = require('views/editor/level/LevelEditView');

emptyLevel = {
  '_id': '53a0a1e2d9048dbc3a793c81',
  'name': 'Emptiness',
  'description': 'Tis nothing..',
  'documentation': {
    'generalArticles': [],
    'specificArticles': []
  },
  'scripts': [],
  'thangs': [],
  'systems': [],
  'victory': {},
  'version': {
    'minor': 0,
    'major': 0,
    'isLatestMajor': true,
    'isLatestMinor': true
  },
  'index': '5388f9ac9a904d0000d94f87',
  'slug': 'emptiness',
  'creator': '5388f9ac9a904d0000d94f87',
  'original': '53a0a1e2d9048dbc3a793c81',
  'watchers': ['5388f9ac9a904d0000d94f87'],
  '__v': 0,
  'created': '2014-06-17T20:15:30.207Z',
  'permissions': [
    {
      'access': 'owner',
      'target': '5388f9ac9a904d0000d94f87'
    }
  ]
};

describe('LevelEditView', function() {
  return describe('revert button', function() {
    return it('opens just one modal when you click it', function() {
      var request, view;
      view = new LevelEditView({}, 'something');
      request = jasmine.Ajax.requests.first();
      request.respondWith({
        status: 200,
        responseText: JSON.stringify(emptyLevel)
      });
      me.set('anonymous', false);
      view.render();
      spyOn(view, 'openModalView');
      view.$el.find('#revert-button').click();
      return expect(view.openModalView.calls.count()).toBe(1);
    });
  });
});
});

;require.register("test/app/views/editor/level/modals/LoadBranchModal.spec", function(exports, require, module) {
var LevelComponents, LevelSystems, LoadBranchModal, factories;

factories = require('test/app/factories');

LoadBranchModal = require('views/editor/level/modals/LoadBranchModal');

LevelComponents = require('collections/LevelComponents');

LevelSystems = require('collections/LevelSystems');

describe('LoadBranchModal', function() {
  return it('loads branch patches into local systems and components', function(done) {
    var branch, component, componentFine, componentNewVersion, componentNewWillFailVersion, componentOldVersion, componentOldWillFailVersion, componentOverwrite, components, modal, patches, system;
    patches = [];
    component = factories.makeLevelComponent({
      name: 'Unchanged'
    });
    system = factories.makeLevelSystem({
      name: 'Unchanged System'
    });
    componentFine = factories.makeLevelComponent({
      name: 'BasicCase'
    });
    componentFine.markToRevert();
    componentFine.set('description', 'Adding a description');
    patches.push(componentFine.makePatch().toJSON());
    componentFine.revert();
    componentOverwrite = factories.makeLevelComponent({
      name: 'OverWriting'
    });
    componentOverwrite.markToRevert();
    componentOverwrite.set('description', 'Adding a description');
    patches.push(componentOverwrite.makePatch().toJSON());
    componentOverwrite.revert();
    componentOverwrite.set('searchStrings', 'unrelated setting that will be overwritten');
    componentOverwrite.set('description', 'local change to description that will be overwritten');
    componentOldVersion = factories.makeLevelComponent({
      name: 'OldVersion'
    });
    componentOldVersion.markToRevert();
    componentOldVersion.set('description', 'Change that should make it');
    patches.push(componentOldVersion.makePatch().toJSON());
    componentNewVersion = componentOldVersion.clone(false);
    componentNewVersion.set({
      _id: _.uniqueId('new_version'),
      'version': {
        major: 0,
        minor: 1,
        isLatestMajor: true,
        isLatestMinor: true
      },
      system: 'ai'
    });
    componentNewVersion.markToRevert();
    componentOldVersion.revert();
    componentOldVersion.set('version', {
      major: 0,
      minor: 0,
      isLatestMajor: false,
      isLatestMinor: false
    });
    componentOldVersion.markToRevert();
    componentOldWillFailVersion = factories.makeLevelComponent({
      name: 'ErrorCausingChangesVersion',
      dependencies: [
        {
          majorVersion: 0,
          original: '1234'
        }
      ]
    });
    componentOldWillFailVersion.markToRevert();
    componentOldWillFailVersion.set('dependencies', [
      {
        majorVersion: 1,
        original: '1234'
      }
    ]);
    patches.push(componentOldWillFailVersion.makePatch().toJSON());
    componentNewWillFailVersion = componentOldWillFailVersion.clone(false);
    componentNewWillFailVersion.set({
      _id: _.uniqueId('new_version'),
      'version': {
        major: 0,
        minor: 1,
        isLatestMajor: true,
        isLatestMinor: true
      },
      dependencies: null
    });
    componentNewWillFailVersion.markToRevert();
    componentOldWillFailVersion.revert();
    componentOldWillFailVersion.set('version', {
      major: 0,
      minor: 0,
      isLatestMajor: false,
      isLatestMinor: false
    });
    componentOldWillFailVersion.markToRevert();
    branch = {
      name: 'First Branch',
      patches: patches,
      updatedBy: me.id,
      updatedByName: 'Author name',
      updated: moment().subtract(1, 'day').toISOString()
    };
    components = new LevelComponents([component, componentFine, componentOverwrite, componentNewVersion, componentNewWillFailVersion]);
    modal = new LoadBranchModal({
      components: components,
      systems: new LevelSystems([system])
    });
    jasmine.demoModal(modal);
    jasmine.Ajax.requests.mostRecent().respondWith({
      status: 200,
      responseText: JSON.stringify([branch])
    });
    return _.defer((function(_this) {
      return function() {
        var requests, unexpectedChanges, willNotWorkComponentRequest, willWorkComponentRequest;
        requests = jasmine.Ajax.requests.all();
        willWorkComponentRequest = _.find(requests, function(r) {
          return _.string.endsWith(r.url, componentOldVersion.id);
        });
        willWorkComponentRequest.respondWith({
          status: 200,
          responseText: JSON.stringify(componentOldVersion.toJSON())
        });
        willNotWorkComponentRequest = _.find(requests, function(r) {
          return _.string.endsWith(r.url, componentOldWillFailVersion.id);
        });
        willNotWorkComponentRequest.respondWith({
          status: 200,
          responseText: JSON.stringify(componentOldWillFailVersion.toJSON())
        });
        expect(componentFine.get('description')).toBeUndefined();
        expect(componentOverwrite.get('searchStrings')).toBe('unrelated setting that will be overwritten');
        expect(componentOverwrite.get('description')).toBe('local change to description that will be overwritten');
        expect(componentNewVersion.get('system')).toBe('ai');
        unexpectedChanges = 0;
        component.on('change', function() {
          return unexpectedChanges++;
        });
        componentNewWillFailVersion.on('change', function() {
          return unexpectedChanges++;
        });
        modal.hide = _.noop;
        modal.$('#load-branch-btn').click();
        expect(unexpectedChanges).toBe(0);
        expect(componentFine.get('description')).toBe('Adding a description');
        expect(componentOverwrite.get('searchStrings')).toBeUndefined();
        expect(componentOverwrite.get('description')).toBe('Adding a description');
        expect(componentNewVersion.get('system')).toBe('ai');
        expect(componentNewVersion.get('description')).toBe('Change that should make it');
        return done();
      };
    })(this));
  });
});
});

;require.register("test/app/views/editor/level/modals/SaveBranchModal.spec", function(exports, require, module) {
var LevelComponents, LevelSystems, SaveBranchModal, factories, makeBranch;

factories = require('test/app/factories');

SaveBranchModal = require('views/editor/level/modals/SaveBranchModal');

LevelComponents = require('collections/LevelComponents');

LevelSystems = require('collections/LevelSystems');

makeBranch = function(attrs, arg) {
  var branch, component, components, i, j, len, len1, patches, ref, ref1, system, systems;
  if (attrs == null) {
    attrs = {};
  }
  systems = arg.systems, components = arg.components;
  branch = new Branch(attrs);
  patches = [];
  ref = components.models;
  for (i = 0, len = ref.length; i < len; i++) {
    component = ref[i];
    patches.push(component.makePatch().toJSON());
  }
  ref1 = systems.models;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    system = ref1[j];
    patches.push(system.makePatch().toJSON());
  }
  branch.set({
    patches: patches
  });
  return branch;
};

describe('SaveBranchModal', function() {
  return it('saves a new branch with all local changes to systems and components', function(done) {
    var changedComponent, changedSystem, component, componentV0, componentV0Changed, componentV1, modal, system;
    component = factories.makeLevelComponent({
      name: 'Unchanged Component'
    });
    system = factories.makeLevelSystem({
      name: 'Unchanged System'
    });
    changedComponent = factories.makeLevelComponent({
      name: 'Changed Component'
    });
    changedSystem = factories.makeLevelSystem({
      name: 'Changed System'
    });
    changedComponent.markToRevert();
    changedComponent.set('description', 'new description');
    changedSystem.markToRevert();
    changedSystem.set('description', 'also a new description');
    componentV0 = factories.makeLevelComponent({
      name: 'Versioned Component',
      version: {
        major: 0,
        minor: 0,
        isLatestMajor: false,
        isLatestMinor: false
      }
    });
    componentV1 = factories.makeLevelComponent({
      name: 'Versioned Component',
      original: componentV0.get('original'),
      description: 'Recent description change',
      version: {
        major: 0,
        minor: 1,
        isLatestMajor: true,
        isLatestMinor: true
      }
    });
    componentV0Changed = componentV0.clone();
    componentV0Changed.markToRevert();
    componentV0Changed.set({
      name: 'Unconflicting change',
      description: 'Conflicting change'
    });
    modal = new SaveBranchModal({
      components: new LevelComponents([component, changedComponent, componentV1]),
      systems: new LevelSystems([changedSystem, system])
    });
    jasmine.demoModal(modal);
    jasmine.Ajax.requests.mostRecent().respondWith({
      status: 200,
      responseText: JSON.stringify([
        {
          name: 'First Branch',
          patches: [componentV0Changed.makePatch().toJSON()],
          updatedBy: me.id,
          updatedByName: 'Myself',
          updated: moment().subtract(1, 'day').toISOString()
        }, {
          name: 'Newer Branch By Someone Else',
          updatedBy: _.uniqueId('user_'),
          updatedByName: 'Someone Else',
          updated: moment().subtract(5, 'hours').toISOString()
        }, {
          name: 'Older Branch By Me',
          updatedBy: me.id,
          updatedByName: 'Myself',
          updated: moment().subtract(2, 'days').toISOString()
        }, {
          name: 'Older Branch By Someone Else',
          updatedBy: _.uniqueId('user_'),
          updatedByName: 'Someone Else',
          updated: moment().subtract(1, 'week').toISOString()
        }
      ])
    });
    return _.defer((function(_this) {
      return function() {
        var body, componentRequest, saveBranchRequest, targetIds;
        componentRequest = jasmine.Ajax.requests.mostRecent();
        expect(componentRequest.url).toBe(componentV0.url());
        componentRequest.respondWith({
          status: 200,
          responseText: JSON.stringify(componentV0.toJSON())
        });
        modal.$('#branches-list-group input').val('Branch Name');
        modal.$('#save-branch-btn').click();
        saveBranchRequest = jasmine.Ajax.requests.mostRecent();
        expect(saveBranchRequest.url).toBe('/db/branches');
        expect(saveBranchRequest.method).toBe('POST');
        body = JSON.parse(saveBranchRequest.params);
        expect(body.patches.length).toBe(2);
        targetIds = _.map(body.patches, function(patch) {
          return patch.id;
        });
        expect(_.contains(targetIds, changedComponent.id));
        expect(_.contains(targetIds, changedSystem.id));
        return done();
      };
    })(this));
  });
});
});

;require.register("test/app/views/game-menu/InventoryView.spec", function(exports, require, module) {

});

;require.register("test/app/views/play/CampaignView.spec", function(exports, require, module) {
var CampaignView, Levels, factories;

factories = require('test/app/factories');

CampaignView = require('views/play/CampaignView');

Levels = require('collections/Levels');

describe('CampaignView', function() {
  return describe('when 4 earned levels', function() {
    beforeEach(function() {
      var earned, i, len, level, levels, ref;
      this.campaignView = new CampaignView();
      this.campaignView.levelStatusMap = {};
      levels = new Levels(_.times(4, function() {
        return factories.makeLevel();
      }));
      this.campaignView.campaign = factories.makeCampaign({}, {
        levels: levels
      });
      this.levels = (function() {
        var i, len, ref, results;
        ref = levels.models;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          level = ref[i];
          results.push(level.toJSON());
        }
        return results;
      })();
      earned = me.get('earned') || {};
      if (earned.levels == null) {
        earned.levels = [];
      }
      ref = this.levels;
      for (i = 0, len = ref.length; i < len; i++) {
        level = ref[i];
        earned.levels.push(level.original);
      }
      return me.set('earned', earned);
    });
    describe('and 3rd one is practice in classroom only', function() {
      beforeEach(function() {
        this.levels[2].practice = true;
        return this.campaignView.annotateLevels(this.levels);
      });
      return it('does not hide the not-really-practice level', function() {
        expect(this.levels[2].hidden).toEqual(false);
        return expect(this.levels[3].hidden).toEqual(false);
      });
    });
    describe('and 3rd one is practice', function() {
      beforeEach(function() {
        this.levels[2].practice = true;
        this.levels[2].name += ' A';
        this.levels[2].slug += '-a';
        return this.campaignView.annotateLevels(this.levels);
      });
      return it('hides next levels if there are practice levels to do', function() {
        expect(this.levels[2].hidden).toEqual(false);
        return expect(this.levels[3].hidden).toEqual(true);
      });
    });
    return describe('and 2nd rewards a practice a non-practice level', function() {
      beforeEach(function() {
        this.campaignView.levelStatusMap[this.levels[0].slug] = 'complete';
        this.campaignView.levelStatusMap[this.levels[1].slug] = 'complete';
        this.levels[1].rewards = [
          {
            level: this.levels[2].original
          }, {
            level: this.levels[3].original
          }
        ];
        this.levels[2].practice = true;
        this.levels[2].name += ' A';
        this.levels[2].slug += '-a';
        this.campaignView.annotateLevels(this.levels);
        return this.campaignView.determineNextLevel(this.levels);
      });
      return it('points at practice level first', function() {
        expect(this.levels[2].next).toEqual(true);
        return expect(this.levels[3].next).not.toBeDefined(true);
      });
    });
  });
});
});

;require.register("test/app/views/play/ladder/LadderTabView.spec", function(exports, require, module) {
var LadderTabView, Level, factories;

LadderTabView = require('views/ladder/LadderTabView');

Level = require('models/Level');

factories = require('test/app/factories');

describe('LeaderboardData', function() {
  return it('triggers "sync" when its request is finished', function() {
    var leaderboard, level, request, triggered;
    level = factories.makeLevel();
    leaderboard = new LadderTabView.LeaderboardData(level, 'humans', null, 4);
    leaderboard.fetch();
    expect(jasmine.Ajax.requests.count()).toBe(1);
    request = jasmine.Ajax.requests.mostRecent();
    triggered = false;
    leaderboard.once('sync', function() {
      return triggered = true;
    });
    request.respondWith({
      status: 200,
      responseText: '{}'
    });
    return expect(triggered).toBe(true);
  });
});
});

;require.register("test/app/views/play/level/HintsView.spec", function(exports, require, module) {
var HintsView, factories, hintWithCode, longHint;

HintsView = require('views/play/level/HintsView');

factories = require('test/app/factories');

hintWithCode = "Hint #2 rosebud\n\n```python\nprint('Hello World')\n```\n\n```javascript\nconsole.log('Hello World')\n```";

longHint = _.times(100, function() {
  return 'Beuller...';
}).join('\n\n');

xdescribe('HintsView', function() {
  beforeEach(function() {
    var level;
    level = factories.makeLevel({
      documentation: {
        hints: [
          {
            body: 'Hint #1 xyzzy'
          }, {
            body: hintWithCode
          }, {
            body: longHint
          }
        ]
      }
    });
    this.session = factories.makeLevelSession({
      playtime: 0
    });
    this.view = new HintsView({
      level: level,
      session: this.session
    });
    this.view.render();
    return jasmine.demoEl(this.view.$el);
  });
  describe('when the first hint is shown', function() {
    return it('does not show the previous button', function() {
      return expect(this.view.$el.find('.previous-btn').length).toBe(0);
    });
  });
  describe('when the user has played for a while', function() {
    beforeEach(function() {
      return this.view.render();
    });
    it('shows the first hint', function() {
      return expect(_.string.contains(this.view.$el.text(), 'xyzzy')).toBe(true);
    });
    return it('shows the next hint button', function() {
      return expect(this.view.$el.find('.next-btn').length).toBe(1);
    });
  });
  return it('filters out all code blocks but those of the selected language', function() {
    this.session.set({
      codeLanguage: 'javascript',
      playtime: 9001
    });
    this.view.state.set('hintIndex', 1);
    this.view.render();
    if (_.string.contains(this.view.$el.text(), 'print')) {
      fail('Python code snippet found, should be filtered out');
    }
    if (!_.string.contains(this.view.$el.text(), 'console')) {
      return fail('JavaScript code snippet not found');
    }
  });
});
});

;require.register("test/app/views/play/level/WebSurfaceView.spec", function(exports, require, module) {
var WebSurfaceView;

WebSurfaceView = require('views/play/level/WebSurfaceView');

describe('WebSurfaceView', function() {
  var studentHtml, view;
  view = new WebSurfaceView({
    goalManager: void 0
  });
  view.iframeLoaded = true;
  view.iframe = {
    contentWindow: {
      postMessage: function() {}
    }
  };
  studentHtml = "<style>\n  #some-id {}\n  .thing1, .thing2 {\n    color: blue;\n  }\n  div { something: invalid }\n  .element[with=\"attributes\"] {}\n</style>\n<script>\n  var paragraphs = $(  \t\"p\" )\n  paragraphs.toggleClass(\"some-class\")\n  $('div').children().insertAfter($('<a> '))\n</script>\n<div>\n  Hi there!\n</div>";
  return describe('onHTMLUpdated', function() {
    return it('extracts a list of all CSS selectors used', function() {
      view.onHTMLUpdated({
        html: studentHtml
      });
      return expect(view.cssSelectors).toEqual(['#some-id', '.thing1, .thing2', 'div', '.element[with="attributes"]', 'p', 'div']);
    });
  });
});
});

;require.register("test/app/views/play/level/modal/CourseVictoryModal.fixtures", function(exports, require, module) {
module.exports = {
  achievements: [
    {
      "_id": "541a23431ccc8eaae19f3bf6",
      "slug": "gems-in-the-deep-completed",
      "related": "54173c90844506ae0195a0b4",
      "userField": "creator",
      "description": "You completed Gems in the Deep.",
      "collection": "level.sessions",
      "query": {
        "state.complete": true,
        "level.original": "54173c90844506ae0195a0b4"
      },
      "name": "Gems in the Deep Completed",
      "__v": 32,
      "rewards": {
        "levels": ["54174347844506ae0195a0b8"],
        "gems": 18
      },
      "worth": 11,
      "i18n": {},
      "i18nCoverage": [],
      "patches": []
    }, {
      "_id": "5452e14006a59e000067e501",
      "slug": "gems-in-the-deep-clean-code",
      "i18nCoverage": [],
      "i18n": {},
      "related": "54173c90844506ae0195a0b4",
      "userField": "creator",
      "description": "Clean code: no code errors or warnings.",
      "collection": "level.sessions",
      "query": {
        "level.original": "54173c90844506ae0195a0b4",
        "state.goalStates.clean-code.status": "success",
        "state.complete": true
      },
      "name": "Gems in the Deep Clean Code",
      "__v": 29,
      "rewards": {
        "gems": 9
      },
      "worth": 5,
      "patches": []
    }
  ],
  campaign: {
    "_id": "55b29efd1cd6abe8ce07db0d",
    "slug": "intro",
    "name": "Intro",
    "watchers": ["512ef4805a67a8c507000001"],
    "__v": 30,
    "adjacentCampaigns": {
      "549f0801e21e041139ef28c8": {
        "name": "Forest",
        "slug": "forest",
        "position": {
          "x": 94.5,
          "y": 7
        },
        "rotation": -35,
        "color": "purple",
        "showIfUnlocked": "541b67f71ccc8eaae19f3c62",
        "i18n": {}
      }
    },
    "ambientSound": {
      "mp3": "db/campaign/549f07f7e21e041139ef28c7/ambient-dungeon.mp3",
      "ogg": "db/campaign/549f07f7e21e041139ef28c7/ambient-dungeon.ogg"
    },
    "backgroundColor": "rgba(68, 54, 45, 1)",
    "backgroundColorTransparent": "rgba(68, 54, 45, 0)",
    "backgroundImage": [
      {
        "image": "db/campaign/549f07f7e21e041139ef28c7/map_dungeon_1920.jpg",
        "width": 1920
      }, {
        "image": "db/campaign/549f07f7e21e041139ef28c7/map_dungeon_1366.jpg",
        "width": 1366
      }
    ],
    "description": "1 hour: syntax, methods, parameters, strings, loops, variables",
    "fullName": "Introduction to Computer Science",
    "i18n": {},
    "i18nCoverage": [],
    "levels": {
      "5411cb3769152f1707be029c": {
        "campaignIndex": 0,
        "rewards": [
          {
            "achievement": "541a198a1ccc8eaae19f3be4",
            "level": "54173c90844506ae0195a0b4"
          }, {
            "achievement": "541a198a1ccc8eaae19f3be4",
            "level": "55525bcaaf92058705a94c02"
          }
        ],
        "name": "Dungeons of Kithgard",
        "description": "Grab the gem, but touch nothing else. In this level you'll learn basic movement for your hero.",
        "i18n": {},
        "type": "hero",
        "slug": "dungeons-of-kithgard",
        "original": "5411cb3769152f1707be029c",
        "disableSpaces": 3,
        "hidesSubmitUntilRun": true,
        "hidesPlayButton": true,
        "hidesRunShortcut": true,
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "lockDefaultCode": false,
        "autocompleteFontSizePx": 20,
        "requiredCode": ["moveRight"],
        "requiredGear": {},
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07"]
        },
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["basic_syntax"],
        "position": {
          "x": 19.209888199437682,
          "y": 12.51725346209055
        }
      },
      "54173c90844506ae0195a0b4": {
        "position": {
          "y": 12.117739757859558,
          "x": 28.059445721561577
        },
        "concepts": ["basic_syntax"],
        "tasks": [],
        "campaign": "dungeon",
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07"]
        },
        "requiredGear": {},
        "autocompleteFontSizePx": 20,
        "lockDefaultCode": false,
        "backspaceThrottle": true,
        "hidesRealTimePlayback": true,
        "hidesCodeToolbar": true,
        "hidesSay": true,
        "hidesHUD": true,
        "hidesRunShortcut": true,
        "hidesPlayButton": true,
        "hidesSubmitUntilRun": true,
        "disableSpaces": 4,
        "original": "54173c90844506ae0195a0b4",
        "slug": "gems-in-the-deep",
        "type": "hero",
        "i18n": {},
        "description": "Quickly collect the gems; you will need them.",
        "name": "Gems in the Deep",
        "rewards": [
          {
            "achievement": "541a23431ccc8eaae19f3bf6",
            "level": "54174347844506ae0195a0b8"
          }
        ],
        "campaignIndex": 1
      },
      "54174347844506ae0195a0b8": {
        "campaignIndex": 2,
        "rewards": [
          {
            "achievement": "54253cfb5d84cd00002e7f62",
            "level": "544a98f62d002f0000fe331a"
          }, {
            "achievement": "54253cfb5d84cd00002e7f62",
            "level": "54cfc6e2d06e8152051eb8a4"
          }
        ],
        "name": "Shadow Guard",
        "description": "Evade the ogre.",
        "i18n": {},
        "type": "hero",
        "slug": "shadow-guard",
        "original": "54174347844506ae0195a0b8",
        "disableSpaces": 4,
        "hidesSubmitUntilRun": true,
        "hidesPlayButton": true,
        "hidesRunShortcut": true,
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "lockDefaultCode": false,
        "autocompleteFontSizePx": 20,
        "requiredGear": {},
        "restrictedGear": {
          "right-hand": ["53e218d853457600003e3ebe"],
          "feet": ["53e2384453457600003e3f07"]
        },
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["basic_syntax"],
        "position": {
          "x": 33.762835987432396,
          "y": 11.364727709666788
        }
      },
      "54ca592de4983255055a5478": {
        "concepts": ["basic_syntax", "arguments"],
        "tasks": [],
        "campaign": "dungeon",
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07", "546d4d259df4a17d0d449ac5", "546d4d589df4a17d0d449ac9"],
          "right-hand": ["53e218d853457600003e3ebe", "544d7d918494308424f564a7", "544d7deb8494308424f564ab", "544d7ffd8494308424f564c3", "544d80598494308424f564c7", "544d80928494308424f564cb", "544d87188494308424f564f1", "544d874f8494308424f564f5", "544d877d8494308424f564f9"],
          "programming-book": ["53e4108204c00d4607a89f78"]
        },
        "requiredGear": {},
        "autocompleteFontSizePx": 20,
        "lockDefaultCode": false,
        "backspaceThrottle": true,
        "hidesRealTimePlayback": true,
        "hidesCodeToolbar": true,
        "hidesSay": true,
        "hidesHUD": true,
        "hidesRunShortcut": true,
        "hidesPlayButton": true,
        "adminOnly": false,
        "practice": true,
        "adventurer": false,
        "original": "54ca592de4983255055a5478",
        "slug": "enemy-mine",
        "type": "hero",
        "requiresSubscription": true,
        "i18n": {},
        "description": "Tread carefully, danger is afoot!",
        "name": "Enemy Mine",
        "rewards": [
          {
            "achievement": "54caa165fcf7f1540532890b",
            "level": "54caa542e1bd9a4f054648b0"
          }
        ],
        "campaignIndex": 3,
        "position": {
          "x": 40.39966204407879,
          "y": 11.364727709666788
        }
      },
      "541875da4c16460000ab990f": {
        "campaignIndex": 4,
        "rewards": [
          {
            "achievement": "541b15561ccc8eaae19f3c07",
            "level": "5418aec24c16460000ab9aa6"
          }, {
            "achievement": "541b15561ccc8eaae19f3c07",
            "level": "54527a6257e83800009730c7"
          }, {
            "achievement": "541b15561ccc8eaae19f3c07",
            "level": "5452972f57e83800009730de"
          }
        ],
        "name": "True Names",
        "description": "Learn an enemy's true name to defeat it.",
        "i18n": {},
        "type": "hero",
        "slug": "true-names",
        "original": "541875da4c16460000ab990f",
        "disableSpaces": 6,
        "hidesPlayButton": true,
        "hidesRunShortcut": true,
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "lockDefaultCode": false,
        "autocompleteFontSizePx": 20,
        "requiredCode": ["Brak"],
        "requiredGear": {},
        "restrictedGear": {
          "programming-book": ["53e4108204c00d4607a89f78"],
          "feet": ["53e2384453457600003e3f07"]
        },
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["basic_syntax", "strings"],
        "position": {
          "x": 47.92144985442785,
          "y": 10.462675898908136
        }
      },
      "55ca293b9bc1892c835b0136": {
        "position": {
          "x": 53.50629543094496,
          "y": 11.712539745627982
        },
        "concepts": ["basic_syntax", "while_loops"],
        "tasks": [],
        "campaign": "dungeon",
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07", "546d4d8e9df4a17d0d449acd", "546d4d589df4a17d0d449ac9", "546d4d259df4a17d0d449ac5"]
        },
        "requiredGear": {},
        "autocompleteFontSizePx": 20,
        "moveRightLoopSnippet": true,
        "lockDefaultCode": false,
        "backspaceThrottle": true,
        "hidesRealTimePlayback": true,
        "hidesCodeToolbar": true,
        "hidesSay": true,
        "hidesHUD": true,
        "hidesRunShortcut": true,
        "original": "55ca293b9bc1892c835b0136",
        "slug": "fire-dancing",
        "type": "hero",
        "i18n": {},
        "description": "Save typing (and your hero) with loops!",
        "name": "Fire Dancing",
        "rewards": [
          {
            "achievement": "55ca43609bc1892c835b0144",
            "level": "565ce2291b940587057366dd"
          }
        ],
        "campaignIndex": 5,
        "suspectCode": [
          {
            "name": "double-while",
            "pattern": "while(.|\\n|\\r)*while"
          }
        ]
      },
      "565ce2291b940587057366dd": {
        "campaignIndex": 6,
        "rewards": [
          {
            "achievement": "565f86219a120c86055496b3",
            "level": "545a5914d820eb0000f6dc0a"
          }
        ],
        "name": "Loop Da Loop",
        "description": "Loops are a life saver!",
        "i18n": {},
        "type": "hero",
        "slug": "loop-da-loop",
        "original": "565ce2291b940587057366dd",
        "adventurer": true,
        "hidesRunShortcut": true,
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "autocompleteFontSizePx": 20,
        "requiredGear": {},
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["basic_syntax", "while_loops"],
        "position": {
          "x": 60.674649532710276,
          "y": 11.953497615262322
        }
      },
      "545a5914d820eb0000f6dc0a": {
        "campaignIndex": 7,
        "rewards": [
          {
            "achievement": "545a6d67d820eb0000f6dc21",
            "level": "5452a84d57e83800009730e4"
          }, {
            "achievement": "545a6d67d820eb0000f6dc21",
            "level": "5418cf256bae62f707c7e1c3"
          }
        ],
        "name": "Haunted Kithmaze",
        "description": "A maze constructed to confuse travelers.",
        "i18n": {},
        "type": "hero",
        "slug": "haunted-kithmaze",
        "original": "545a5914d820eb0000f6dc0a",
        "hidesRunShortcut": true,
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "lockDefaultCode": false,
        "moveRightLoopSnippet": true,
        "autocompleteFontSizePx": 20,
        "requiredCode": ["loop"],
        "requiredGear": {},
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07"]
        },
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["basic_syntax", "while_loops"],
        "position": {
          "x": 66.94834061194076,
          "y": 11.215687947100905
        }
      },
      "5418cf256bae62f707c7e1c3": {
        "concepts": ["basic_syntax", "while_loops"],
        "tasks": [],
        "campaign": "dungeon",
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07"]
        },
        "requiredGear": {},
        "autocompleteFontSizePx": 20,
        "moveRightLoopSnippet": true,
        "lockDefaultCode": false,
        "backspaceThrottle": true,
        "hidesRealTimePlayback": true,
        "hidesCodeToolbar": true,
        "hidesSay": true,
        "hidesHUD": true,
        "original": "5418cf256bae62f707c7e1c3",
        "slug": "the-second-kithmaze",
        "type": "hero",
        "i18n": {},
        "description": "Many have tried, few have found their way through this maze.",
        "name": "The Second Kithmaze",
        "rewards": [
          {
            "achievement": "54253d5c5d84cd00002e7f63",
            "level": "5418d40f4c16460000ab9ac2"
          }, {
            "achievement": "54253d5c5d84cd00002e7f63",
            "item": "5441c2be4e9aeb727cc97105"
          }
        ],
        "campaignIndex": 8,
        "position": {
          "x": 80.63272271770526,
          "y": 12.770871081984192
        }
      },
      "5418d40f4c16460000ab9ac2": {
        "campaignIndex": 9,
        "rewards": [
          {
            "achievement": "541b22b21ccc8eaae19f3c19",
            "level": "5452adea57e83800009730ee"
          }, {
            "achievement": "541b22b21ccc8eaae19f3c19",
            "level": "54e0cdefe308cb510555a7f5"
          }
        ],
        "name": "Dread Door",
        "description": "Behind a dread door lies a chest full of riches.",
        "i18n": {},
        "type": "hero",
        "slug": "dread-door",
        "original": "5418d40f4c16460000ab9ac2",
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "lockDefaultCode": 9,
        "autocompleteFontSizePx": 20,
        "requiredGear": {},
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07"],
          "right-hand": ["53f4e6e3d822c23505b74f42", "54694ba3a2b1f53ce794444d"]
        },
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["basic_syntax", "while_loops", "strings"],
        "position": {
          "x": 88.25112251874386,
          "y": 19.244678910956324
        }
      },
      "54e0cdefe308cb510555a7f5": {
        "position": {
          "y": 26.728260086243417,
          "x": 81.15679685579524
        },
        "campaignIndex": 10,
        "rewards": [
          {
            "achievement": "54e2ab6e0f6efa5005600737",
            "level": "54e8e4047578d754057f852b"
          }
        ],
        "name": "Cupboards of Kithgard",
        "description": "Who knows what horrors lurk in the Cupboards of Kithgard?",
        "i18n": {},
        "requiresSubscription": true,
        "type": "hero",
        "slug": "cupboards-of-kithgard",
        "original": "54e0cdefe308cb510555a7f5",
        "adventurer": false,
        "adminOnly": false,
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "lockDefaultCode": false,
        "autocompleteFontSizePx": 20,
        "requiredGear": {},
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07", "546d4d8e9df4a17d0d449acd", "546d4d589df4a17d0d449ac9", "546d4d259df4a17d0d449ac5"]
        },
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["basic_syntax", "while_loops", "strings"]
      },
      "54f0e074a375e47f055d619c": {
        "position": {
          "y": 30.34167921686747,
          "x": 73.73231720900935
        },
        "concepts": ["basic_syntax", "while_loops", "strings"],
        "tasks": [],
        "campaign": "dungeon",
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07", "546d4d8e9df4a17d0d449acd", "546d4d589df4a17d0d449ac9", "546d4d259df4a17d0d449ac5"]
        },
        "requiredGear": {},
        "autocompleteFontSizePx": 20,
        "lockDefaultCode": false,
        "backspaceThrottle": true,
        "hidesRealTimePlayback": true,
        "hidesCodeToolbar": true,
        "hidesSay": true,
        "hidesHUD": true,
        "adminOnly": false,
        "adventurer": false,
        "original": "54f0e074a375e47f055d619c",
        "slug": "breakout",
        "type": "hero",
        "requiresSubscription": true,
        "i18n": {},
        "description": "Munchkins are chasing you, and the way ahead is blocked!",
        "name": "Breakout",
        "rewards": [],
        "campaignIndex": 11
      },
      "5452adea57e83800009730ee": {
        "campaignIndex": 12,
        "rewards": [
          {
            "achievement": "5452bb6757e83800009730f4",
            "item": "53e238df53457600003e3f0b"
          }, {
            "achievement": "5452bb6757e83800009730f4",
            "level": "5452c3ce57e83800009730f7"
          }
        ],
        "name": "Known Enemy",
        "description": "Using your first variable to achieve victory.",
        "i18n": {},
        "type": "hero",
        "slug": "known-enemy",
        "original": "5452adea57e83800009730ee",
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "lockDefaultCode": false,
        "autocompleteFontSizePx": 20,
        "suspectCode": [
          {
            "name": "enemy-in-quotes",
            "pattern": "['\"]enemy"
          }
        ],
        "requiredGear": {},
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07"]
        },
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["variables", "basic_syntax", "strings"],
        "position": {
          "x": 69.65270816049042,
          "y": 25.67195662532944
        }
      },
      "5452c3ce57e83800009730f7": {
        "position": {
          "y": 26.387842017483997,
          "x": 56.47568004086775
        },
        "concepts": ["basic_syntax", "variables"],
        "tasks": [],
        "campaign": "dungeon",
        "restrictedGear": {
          "feet": ["53e2384453457600003e3f07"]
        },
        "requiredGear": {},
        "suspectCode": [
          {
            "name": "lone-find-nearest-enemy",
            "pattern": "^[ ]*(self|this|@)?[:.]?findNearestEnemy()"
          }
        ],
        "requiredCode": ["findNearestEnemy"],
        "autocompleteFontSizePx": 20,
        "lockDefaultCode": false,
        "backspaceThrottle": true,
        "hidesRealTimePlayback": true,
        "hidesCodeToolbar": true,
        "hidesSay": true,
        "hidesHUD": true,
        "original": "5452c3ce57e83800009730f7",
        "slug": "master-of-names",
        "type": "hero",
        "i18n": {},
        "description": "Use your new coding powers to target nameless enemies.",
        "name": "Master of Names",
        "rewards": [
          {
            "achievement": "5452e88a06a59e000067e50e",
            "level": "541b24511ccc8eaae19f3c1f"
          }
        ],
        "campaignIndex": 13
      },
      "55ca29439bc1892c835b0137": {
        "campaignIndex": 14,
        "rewards": [
          {
            "achievement": "55ca45629bc1892c835b014c",
            "level": "541b434e1ccc8eaae19f3c33"
          }
        ],
        "name": "A Mayhem of Munchkins",
        "description": "Survive a neverending stream of ogres with mentorship from two experienced heroes!",
        "i18n": {},
        "type": "hero",
        "slug": "a-mayhem-of-munchkins",
        "original": "55ca29439bc1892c835b0137",
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "lockDefaultCode": false,
        "autocompleteFontSizePx": 20,
        "suspectCode": [
          {
            "name": "lone-find-nearest-enemy",
            "pattern": "^[ ]*(self|this|@)?[:.]?findNearestEnemy()"
          }
        ],
        "requiredGear": {},
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["basic_syntax", "variables", "arguments", "while_loops"],
        "position": {
          "x": 61.29479872441925,
          "y": 34.55907063311842
        }
      },
      "5452d8b906a59e000067e4fa": {
        "position": {
          "y": 40.53034954760448,
          "x": 68.66942399136555
        },
        "concepts": ["basic_syntax", "variables", "while_loops"],
        "tasks": [],
        "campaign": "dungeon",
        "restrictedGear": {
          "right-hand": ["53f4e6e3d822c23505b74f42"],
          "feet": ["53e2384453457600003e3f07"]
        },
        "requiredGear": {},
        "suspectCode": [
          {
            "name": "lone-find-nearest-enemy",
            "pattern": "^[ ]*(self|this|@)?[:.]?findNearestEnemy()"
          }
        ],
        "autocompleteFontSizePx": 20,
        "lockDefaultCode": false,
        "backspaceThrottle": true,
        "hidesRealTimePlayback": true,
        "hidesCodeToolbar": true,
        "hidesSay": true,
        "hidesHUD": true,
        "practice": true,
        "original": "5452d8b906a59e000067e4fa",
        "slug": "the-gauntlet",
        "type": "hero",
        "requiresSubscription": true,
        "i18n": {},
        "description": "Use all of your skills to survive the gauntlet.",
        "name": "The Gauntlet",
        "rewards": [
          {
            "achievement": "5452db0106a59e000067e4fc",
            "level": "54d24c49bf87255405a8f834"
          }
        ],
        "campaignIndex": 15
      },
      "541b434e1ccc8eaae19f3c33": {
        "campaignIndex": 16,
        "rewards": [
          {
            "achievement": "54253e065d84cd00002e7f65",
            "level": "541c9a30c6362edfb0f34479"
          }, {
            "achievement": "54253e065d84cd00002e7f65",
            "level": "5452d8b906a59e000067e4fa"
          }, {
            "achievement": "54253e065d84cd00002e7f65",
            "item": "53f4e6e3d822c23505b74f42"
          }
        ],
        "name": "The Final Kithmaze",
        "description": "To escape you must find your way through an elder Kithman's maze.",
        "i18n": {},
        "type": "hero",
        "slug": "the-final-kithmaze",
        "original": "541b434e1ccc8eaae19f3c33",
        "hidesHUD": true,
        "hidesSay": true,
        "hidesCodeToolbar": true,
        "hidesRealTimePlayback": true,
        "backspaceThrottle": true,
        "lockDefaultCode": false,
        "autocompleteFontSizePx": 20,
        "suspectCode": [
          {
            "name": "lone-find-nearest-enemy",
            "pattern": "^[ ]*(self|this|@)?[:.]?findNearestEnemy()"
          }
        ],
        "requiredGear": {},
        "campaign": "dungeon",
        "tasks": [],
        "concepts": ["basic_syntax", "while_loops", "variables"],
        "position": {
          "x": 74.56912900611479,
          "y": 46.45561310182135
        }
      },
      "541c9a30c6362edfb0f34479": {
        "position": {
          "y": 54.939545780779376,
          "x": 80.71431897968904
        },
        "concepts": ["basic_syntax", "arguments", "strings"],
        "tasks": [],
        "campaign": "dungeon",
        "restrictedGear": {},
        "requiredGear": {},
        "autocompleteFontSizePx": 20,
        "lockDefaultCode": false,
        "backspaceThrottle": true,
        "hidesRealTimePlayback": true,
        "hidesCodeToolbar": true,
        "hidesSay": true,
        "original": "541c9a30c6362edfb0f34479",
        "slug": "kithgard-gates",
        "type": "hero",
        "i18n": {},
        "description": "Escape the Kithgard dungeons, and don't let the guardians get you.",
        "name": "Kithgard Gates",
        "rewards": [
          {
            "achievement": "541c9cf0c6362edfb0f3447a",
            "level": "541b67f71ccc8eaae19f3c62"
          }, {
            "achievement": "541c9cf0c6362edfb0f3447a",
            "level": "5578843e5cda3d8905654190"
          }
        ],
        "campaignIndex": 17
      },
      "5630eab0c0fcbd86057cc2f8": {
        "hidesRealTimePlayback": true,
        "rewards": [],
        "name": "Wakka Maul",
        "description": "![Nov17 wakka maul](/file/db/level/5630eab0c0fcbd86057cc2f8/NOV17-Wakka Maul.png)\n\nBattle your classmates while gobbling up gems! Use your programming skills and creative thinking to gain an edge over your friends.",
        "i18n": {},
        "type": "course-ladder",
        "slug": "wakka-maul",
        "original": "5630eab0c0fcbd86057cc2f8",
        "hidesCodeToolbar": true,
        "backspaceThrottle": true,
        "autocompleteFontSizePx": 20,
        "campaign": "intro",
        "tasks": [],
        "concepts": ["basic_syntax", "algorithms", "arguments", "strings", "while_loops"],
        "position": {
          "x": 17.481313926042485,
          "y": 78.3938778580024
        },
        "campaignIndex": 18,
        "requiredGear": {}
      }
    },
    "patches": [],
    "type": "course"
  },
  course: {
    "_id": "560f1a9f22961295f9427742",
    "name": "Introduction to Computer Science",
    "slug": "introduction-to-computer-science",
    "campaignID": "55b29efd1cd6abe8ce07db0d",
    "concepts": ["basic_syntax", "arguments", "strings", "while_loops", "variables"],
    "description": "Learn basic syntax, while loops, and the CodeCombat environment.",
    "duration": 1,
    "pricePerSeat": 0,
    "free": true,
    "screenshot": "/images/pages/courses/101_info.png"
  },
  courseInstanceSessions: [
    {
      "_id": "542c78d49ba93600003ee6d3",
      "changed": "2016-01-11T18:45:07.927Z",
      "level": {
        "original": "5411cb3769152f1707be029c"
      },
      "state": {
        "complete": true
      },
      "playtime": 1609
    }, {
      "_id": "54380da36e7af40021bf5155",
      "changed": "2016-01-11T23:33:09.763Z",
      "level": {
        "original": "54173c90844506ae0195a0b4"
      },
      "state": {
        "complete": true
      },
      "playtime": 724
    }, {
      "_id": "542ef2c480d9aa104e81272f",
      "changed": "2016-01-11T18:48:40.722Z",
      "level": {
        "original": "54174347844506ae0195a0b8"
      },
      "state": {
        "complete": true
      },
      "playtime": 409
    }, {
      "_id": "542edae22d8c150000019128",
      "changed": "2016-01-11T18:31:36.932Z",
      "level": {
        "original": "541875da4c16460000ab990f"
      },
      "state": {
        "complete": true
      },
      "playtime": 1659
    }, {
      "_id": "543c3dd43eb2580000d33045",
      "changed": "2015-11-19T17:56:04.522Z",
      "level": {
        "original": "5418cf256bae62f707c7e1c3"
      },
      "state": {
        "complete": true
      },
      "playtime": 93
    }, {
      "_id": "542ecadc2d8c150000019125",
      "changed": "2015-11-29T19:23:11.133Z",
      "level": {
        "original": "5418d40f4c16460000ab9ac2"
      },
      "state": {
        "complete": true
      },
      "playtime": 117
    }, {
      "_id": "5463e15d6f4cc40000b14f3a",
      "changed": "2015-11-29T19:28:33.799Z",
      "level": {
        "original": "541b434e1ccc8eaae19f3c33"
      },
      "state": {
        "complete": true
      },
      "playtime": 59
    }, {
      "_id": "547e0c62e19f8e58056bf872",
      "changed": "2015-11-29T19:29:18.715Z",
      "level": {
        "original": "541c9a30c6362edfb0f34479"
      },
      "state": {
        "complete": true
      },
      "playtime": 42
    }, {
      "_id": "545ae2504425d30000ee7db6",
      "changed": "2015-11-29T19:25:47.361Z",
      "level": {
        "original": "5452adea57e83800009730ee"
      },
      "state": {
        "complete": true
      },
      "playtime": 1259
    }, {
      "_id": "565b513dd458ab9219b9527b",
      "changed": "2015-11-29T19:26:19.521Z",
      "level": {
        "original": "5452c3ce57e83800009730f7"
      },
      "state": {
        "complete": true
      },
      "playtime": 29
    }, {
      "_id": "565b5188d458ab9219b9528a",
      "changed": "2015-12-27T23:34:21.144Z",
      "level": {
        "original": "5452d8b906a59e000067e4fa"
      },
      "state": {
        "complete": true
      },
      "playtime": 26
    }, {
      "_id": "546badf73470fc1104015f50",
      "changed": "2015-11-29T19:48:44.660Z",
      "level": {
        "original": "545a5914d820eb0000f6dc0a"
      },
      "state": {
        "complete": true
      },
      "playtime": 57
    }, {
      "_id": "55dfd5d592e9cfb607cabc2c",
      "changed": "2015-12-03T20:06:32.309Z",
      "level": {
        "original": "54ca592de4983255055a5478"
      },
      "state": {
        "complete": true
      },
      "playtime": 42
    }, {
      "_id": "565b50a4d458ab9219b95260",
      "changed": "2015-11-29T19:23:52.221Z",
      "level": {
        "original": "54e0cdefe308cb510555a7f5"
      },
      "state": {
        "complete": true
      },
      "playtime": 34
    }, {
      "_id": "565b50cad458ab9219b9526c",
      "changed": "2015-11-29T19:25:23.814Z",
      "level": {
        "original": "54f0e074a375e47f055d619c"
      },
      "state": {
        "complete": true
      },
      "playtime": 88
    }, {
      "_id": "55f4570530825985054b0260",
      "changed": "2015-11-29T19:48:39.224Z",
      "level": {
        "original": "55ca293b9bc1892c835b0136"
      },
      "state": {
        "complete": true
      },
      "playtime": 207
    }, {
      "_id": "565b515dd458ab9219b95282",
      "changed": "2015-12-27T23:38:34.709Z",
      "level": {
        "original": "55ca29439bc1892c835b0137"
      },
      "state": {
        "complete": true
      },
      "playtime": 113
    }
  ],
  earnedAchievements: [
    {
      "collection": "level.sessions",
      "triggeredBy": "54380da36e7af40021bf5155",
      "achievement": "541a23431ccc8eaae19f3bf6",
      "_id": "543c21473eb2580000d3303c",
      "user": "5162fab9c92b4c751e000274",
      "achievementName": "Gems in the Deep Completed",
      "earnedRewarsd": {
        "gems": 5,
        "levels": ["54174347844506ae0195a0b8"]
      },
      "earnedPoints": 11,
      "changed": "2015-04-02T21:18:27.994Z",
      "created": "2014-10-13T19:00:23.833Z",
      "__v": 0,
      "earnedRewards": {
        "gems": 18,
        "levels": ["54174347844506ae0195a0b8"],
        "items": ["53e4108204c00d4607a89f78"]
      },
      "notified": true
    }, {
      "collection": "level.sessions",
      "triggeredBy": "54380da36e7af40021bf5155",
      "achievement": "5452e14006a59e000067e501",
      "_id": "5453164e60cfd0188a82a52d",
      "user": "5162fab9c92b4c751e000274",
      "earnedRewards": {
        "gems": 9
      },
      "earnedPoints": 5,
      "achievementName": "Gems in the Deep Clean Code",
      "changed": "2015-04-02T21:18:38.200Z",
      "notified": true
    }
  ],
  level: {
    "_id": "568d3143b38ab75c00c2a4e5",
    "slug": "gems-in-the-deep",
    "name": "Gems in the Deep",
    "creator": "568d15a28d909b2500464181",
    "original": "54173c90844506ae0195a0b4",
    "watchers": [],
    "__v": 0,
    "thangs": [],
    "systems": [],
    "goals": [],
    "commitMessage": "",
    "parent": "56898f85450ac83600d8c945",
    "scripts": [],
    "type": "hero",
    "description": "Quickly collect the gems; you will need them.",
    "victory": {
      "body": "You will find a use for these gems soon.",
      "i18n": []
    },
    "nextLevel": {
      "original": "54174347844506ae0195a0b8",
      "majorVersion": 0
    },
    "terrain": "Dungeon",
    "patches": [],
    "i18n": [],
    "documentation": [],
    "i18nCoverage": [],
    "index": true,
    "buildTime": 14891,
    "concepts": ["basic_syntax"],
    "campaignIndex": 1,
    "created": "2016-01-06T15:22:43.033Z",
    "version": {
      "isLatestMinor": true,
      "isLatestMajor": true,
      "minor": 123,
      "major": 0
    },
    "permissions": [
      {
        "access": "owner",
        "target": "51538fdb812dd9af02000001"
      }, {
        "access": "read",
        "target": "public"
      }
    ]
  },
  nextLevel: {
    "_id": "568127b67e81751f00de45f7",
    "slug": "shadow-guard",
    "name": "Shadow Guard",
    "creator": "53b54cda7e17883a0575767a",
    "original": "54174347844506ae0195a0b8",
    "watchers": [],
    "__v": 0,
    "scripts": [],
    "thangs": [],
    "systems": [],
    "commitMessage": "i18n patch",
    "parent": "566fc0cb66f91c2500c38f0a",
    "type": "hero",
    "description": "Evade the ogre.",
    "victory": {},
    "nextLevel": {
      "original": "54ca592de4983255055a5478",
      "majorVersion": 0
    },
    "terrain": "Dungeon",
    "goals": [],
    "patches": [],
    "i18n": {},
    "i18nCoverage": [],
    "loadingTip": "We automatically save your code every few seconds.",
    "documentation": {},
    "requiredGear": {},
    "restrictedGear": {},
    "helpVideos": [],
    "campaign": "dungeon",
    "tasks": [],
    "buildTime": 1923,
    "scoreTypes": ["time"],
    "index": true,
    "concepts": ["basic_syntax"],
    "campaignIndex": 2,
    "created": "2015-12-28T12:14:46.362Z",
    "version": {
      "isLatestMinor": true,
      "isLatestMajor": true,
      "minor": 123,
      "major": 0
    },
    "permissions": [
      {
        "access": "owner",
        "target": "51538fdb812dd9af02000001"
      }, {
        "access": "read",
        "target": "public"
      }
    ]
  },
  session: {
    "_id": "54380da36e7af40021bf5155",
    "changed": "2016-01-08T19:01:18.508Z",
    "level": {
      "original": "54173c90844506ae0195a0b4",
      "majorVersion": 0
    },
    "creator": "5162fab9c92b4c751e000274",
    "state": {
      "topScores": [
        {
          "type": "time",
          "date": "2015-10-26T17:46:17.508Z",
          "score": -13.600000000000001
        }
      ],
      "playing": true,
      "selected": "Hero Placeholder",
      "complete": true,
      "scripts": {
        "ended": {
          "Real-Time Submission": 6,
          "Debugging Victory": 5,
          "First Code Run": 4,
          "First Code Preload": 3,
          "First Code Edit": 2,
          "Introduction": 1,
          "Taking Too Long": 7
        },
        "currentScriptOffset": 0,
        "currentScript": null
      },
      "goalStates": {
        "humans-survive": {
          "status": "success",
          "keyFrame": "end",
          "killed": {
            "Hero Placeholder": false
          }
        },
        "collect-gems": {
          "collected": {
            "Gem 4": true,
            "Gem 3": true,
            "Gem 2": true,
            "Gem 1": true,
            "Gem": true
          },
          "keyFrame": 118,
          "status": "success"
        },
        "clean-code": {
          "problems": {
            "Hero Placeholder": false
          },
          "optional": false,
          "keyFrame": "end",
          "status": "success"
        }
      },
      "frame": 0,
      "flagHistory": []
    },
    "codeLanguage": "python",
    "__v": 1,
    "heroConfig": {
      "inventory": {
        "programming-book": "53e4108204c00d4607a89f78",
        "feet": "53e237bf53457600003e3f05",
        "waist": "5437002a7beba4a82024a97d",
        "right-hand": "53e218d853457600003e3ebe",
        "gloves": "5469425ca2b1f53ce7944421",
        "torso": "53e22eac53457600003e3efc",
        "eyes": "53e238df53457600003e3f0b",
        "head": "5441c2be4e9aeb727cc97105"
      },
      "thangType": "529ffbf1cf1818f2be000001"
    },
    "code": {
      "hero-placeholder": {
        "plan": "# Grab all the gems using your movement commands.\n\nself.moveRight()\nself.moveUp()\nself.moveRight()\nself.moveDown()\nself.moveLeft()\nself.moveDown()\nself.moveUp()\n\n"
      }
    },
    "playtime": 698,
    "teamSpells": {
      "humans": ["hero-placeholder/plan"]
    },
    "creatorName": "Scott",
    "levelID": "gems-in-the-deep",
    "levelName": "Gems in the Deep",
    "multiplayer": false,
    "browser": {
      "version": "47.0.2526.106",
      "platform": "mac",
      "name": "chrome",
      "desktop": true
    },
    "permissions": [
      {
        "target": "5162fab9c92b4c751e000274",
        "access": "owner"
      }
    ],
    "created": "2014-10-10T16:47:31.077Z"
  },
  thangType: {
    "_id": "568fe842cc51432f0036beb6",
    "slug": "programmaticon-i",
    "name": "Programmaticon I",
    "original": "53e4108204c00d4607a89f78",
    "components": [
      {
        "original": "524b4150ff92f1f4f8000024",
        "majorVersion": 0
      }, {
        "original": "53e12043b82921000051cdf9",
        "majorVersion": 0,
        "config": {
          "slots": ["programming-book"]
        }
      }, {
        "original": "524c81cab8bb087aaf000069",
        "majorVersion": 0,
        "config": {
          "programmableSnippets": ["loop"]
        }
      }
    ],
    "description": "Grants access to loops.",
    "version": {
      "isLatestMinor": true,
      "isLatestMajor": true,
      "minor": 56,
      "major": 0
    }
  }
};
});

;require.register("test/app/views/play/level/modal/CourseVictoryModal.spec", function(exports, require, module) {
var Course, CourseVictoryModal, Level, LevelSession, ProgressView, factories;

Course = require('models/Course');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

CourseVictoryModal = require('views/play/level/modal/CourseVictoryModal');

ProgressView = require('views/play/level/modal/ProgressView');

factories = require('test/app/factories');

describe('CourseVictoryModal', function() {
  var handleRequests, makeViewOptions, nextLevelRequest;
  beforeEach(function() {
    return me.clear();
  });
  it('will eventually be the only victory modal');
  makeViewOptions = function() {
    var course, courseInstance, level;
    level = factories.makeLevel();
    course = factories.makeCourse();
    courseInstance = factories.makeCourseInstance();
    return {
      course: factories.makeCourse(),
      level: level,
      session: factories.makeLevelSession({
        state: {
          complete: true
        }
      }, {
        level: level
      }),
      nextLevel: factories.makeLevel(),
      courseInstanceID: courseInstance.id,
      courseID: course.id
    };
  };
  nextLevelRequest = null;
  handleRequests = function(modal) {
    var lastRequest, requests;
    requests = jasmine.Ajax.requests.all();
    modal.levelSessions.fakeRequests[0].respondWith({
      status: 200,
      responseText: '[]'
    });
    modal.classroom.fakeRequests[0].respondWith({
      status: 200,
      responseText: factories.makeClassroom().stringify()
    });
    if (me.fakeRequests) {
      lastRequest = _.last(me.fakeRequests);
      if (!lastRequest.response) {
        lastRequest.respondWith({
          status: 200,
          responseText: factories.makeUser().stringify()
        });
      }
    }
    return nextLevelRequest = modal.nextLevel.fakeRequests[0];
  };
  describe('given a course level with a next level and no item or hero rewards', function() {
    var modal;
    modal = null;
    beforeEach(function(done) {
      var options;
      options = makeViewOptions();
      modal = new CourseVictoryModal(options);
      handleRequests(modal);
      nextLevelRequest.respondWith({
        status: 200,
        responseText: factories.makeLevel().stringify()
      });
      return _.defer(done);
    });
    it('only shows the ProgressView', function() {
      expect(_.size(modal.views)).toBe(1);
      return expect(modal.views[0] instanceof ProgressView).toBe(true);
    });
    it('(demo)', function() {
      return jasmine.demoModal(modal);
    });
    return describe('its ProgressView', function() {
      it('has a next level button which navigates to the next level on click', function() {
        var button;
        spyOn(application.router, 'navigate');
        button = modal.$el.find('#next-level-btn');
        expect(button.length).toBe(1);
        button.click();
        return expect(application.router.navigate).toHaveBeenCalled();
      });
      return it('has two columns', function() {
        expect(modal.$('.row:first .col-sm-12').length).toBe(0);
        expect(modal.$('.row:first .col-sm-5').length).toBe(1);
        return expect(modal.$('.row:first .col-sm-7').length).toBe(1);
      });
    });
  });
  return describe('given a course level without a next level', function() {
    var modal;
    modal = null;
    beforeEach(function(done) {
      var level, options;
      options = makeViewOptions();
      level = options.level;
      level.unset('nextLevel');
      delete options.nextLevel;
      modal = new CourseVictoryModal(options);
      handleRequests(modal);
      nextLevelRequest.respondWith({
        status: 404,
        responseText: '{}'
      });
      return _.defer(done);
    });
    describe('its ProgressView', function() {
      it('has a single large column, since there is no next level to display', function() {
        expect(modal.$('.row:first .col-sm-12').length).toBe(1);
        expect(modal.$('.row:first .col-sm-5').length).toBe(0);
        return expect(modal.$('.row:first .col-sm-7').length).toBe(0);
      });
      return it('has a done button which navigates to the CourseDetailsView for the given course instance', function() {
        var button;
        spyOn(application.router, 'navigate');
        button = modal.$el.find('#done-btn');
        expect(button.length).toBe(1);
        button.click();
        return expect(application.router.navigate).toHaveBeenCalled();
      });
    });
    return it('(demo)', function() {
      return jasmine.demoModal(modal);
    });
  });
});
});

;require.register("test/app/views/play/level/modal/ImageGalleryModal.spec", function(exports, require, module) {
var Course, ImageGalleryModal, Level, LevelSession, ProgressView, factories, utils;

Course = require('models/Course');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

ImageGalleryModal = require('views/play/level/modal/ImageGalleryModal');

ProgressView = require('views/play/level/modal/ProgressView');

factories = require('test/app/factories');

utils = require('core/utils');

describe('ImageGalleryModal', function() {
  var modal;
  modal = null;
  beforeEach(function(done) {
    modal = new ImageGalleryModal();
    modal.render();
    return _.defer(done);
  });
  it('(demo)', function() {
    return jasmine.demoModal(modal);
  });
  it('shows a list of images', function() {
    return expect(modal.$('img').length).toBeGreaterThan(16);
  });
  describe('clicking an image', function() {
    beforeEach(function(done) {
      this.clickedImage = modal.$('li:nth-child(5)').click();
      this.clickedImagePath = this.clickedImage.data('portrait-url');
      this.clickedImageUrl = utils.pathToUrl(this.clickedImagePath);
      this.clickedImageTag = '<img src="' + this.clickedImageUrl + '"/>';
      return _.defer(done);
    });
    it('highlights the chosen image', function() {
      return expect(modal.$('li:nth-child(5)').hasClass('selected')).toBe(true);
    });
    return it('displays the URL/image tags in the Copy section', function() {
      expect(modal.$('.image-url').text()).toBe(this.clickedImageUrl);
      return expect(modal.$('.image-tag').text()).toBe(this.clickedImageTag);
    });
  });
  return describe("How to Copy/Paste section", function() {
    var userAgents;
    userAgents = {
      windows: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
      mac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    };
    it('Shows Windows shortcuts to Windows users', function(done) {
      spyOn(utils, 'userAgent').and.callFake(function() {
        return userAgents.windows;
      });
      modal.render();
      expect(modal.$('.how-to-copy-paste :not(.hidden)').text()).toMatch(/Control|Ctrl/i);
      expect(modal.$('.how-to-copy-paste :not(.hidden)').text()).not.toMatch(/Command|Cmd/i);
      this.clickedImage = modal.$('li:nth-child(5)').click();
      return _.defer(function() {
        expect(modal.$('.how-to-copy-paste :not(.hidden)').text()).toMatch(/Control|Ctrl/i);
        expect(modal.$('.how-to-copy-paste :not(.hidden)').text()).not.toMatch(/Command|Cmd/i);
        return done();
      });
    });
    return it('Shows Mac shortcuts to Mac users', function(done) {
      spyOn(utils, 'userAgent').and.callFake(function() {
        return userAgents.mac;
      });
      modal.render();
      expect(modal.$('.how-to-copy-paste :not(.hidden)').text()).toMatch(/Command|Cmd/i);
      expect(modal.$('.how-to-copy-paste :not(.hidden)').text()).not.toMatch(/Control|Ctrl/i);
      this.clickedImage = modal.$('li:nth-child(5)').click();
      return _.defer(function() {
        expect(modal.$('.how-to-copy-paste :not(.hidden)').text()).toMatch(/Command|Cmd/i);
        expect(modal.$('.how-to-copy-paste :not(.hidden)').text()).not.toMatch(/Control|Ctrl/i);
        return done();
      });
    });
  });
});
});

;require.register("test/app/views/play/level/modal/ShareProgressModal.spec", function(exports, require, module) {
var Achievements, Course, Level, LevelSession, ShareProgressModal;

ShareProgressModal = require('views/play/modal/ShareProgressModal');

Course = require('models/Course');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

Achievements = require('collections/Achievements');

describe('ShareProgressModal', function() {
  beforeEach(function() {
    return me.clear();
  });
  return describe('continue button in other languages', function() {
    var modal;
    modal = null;
    beforeEach(function(done) {
      me.set('preferredLanguage', 'es-ES');
      modal = new ShareProgressModal();
      modal.render();
      return _.defer(done);
    });
    xit('should be positioned high enough', function() {
      var background, backgroundBottom, link, linkBottom;
      jasmine.demoModal(modal);
      link = modal.$('.continue-link');
      linkBottom = link.offset().top + link.height();
      background = modal.$('.background-img');
      backgroundBottom = background.offset().top + background.height();
      return expect(linkBottom).toBeLessThan(backgroundBottom - 30);
    });
    return it('(demo)', function() {
      return jasmine.demoModal(modal);
    });
  });
});
});

;require.register("test/app/views/play/level/tome/Problem.spec", function(exports, require, module) {
var Problem;

Problem = require('views/play/level/tome/Problem');

describe('Problem', function() {
  var ace, aether, aetherProblem, levelID;
  ace = {
    getSession: function() {
      return {
        getDocument: function() {
          return {
            createAnchor: function() {}
          };
        },
        addMarker: function() {}
      };
    }
  };
  aether = {
    raw: "this.say('hi');\nthis.sad('bye');",
    language: {
      id: 'javascript'
    }
  };
  aetherProblem = {
    hint: 'did you mean say instead of sad?',
    id: 'unknown_ReferenceError',
    level: 'error',
    message: 'Line 1: tmp2[tmp3] is not a function',
    range: [
      {
        row: 1
      }, {
        row: 1
      }
    ],
    type: 'runtime'
  };
  levelID = 'awesome';
  xit('save user code problem', function() {
    var params, request;
    new Problem({
      aether: aether,
      aetherProblem: aetherProblem,
      ace: ace,
      isCast: false,
      levelID: levelID
    });
    expect(jasmine.Ajax.requests.count()).toBe(1);
    request = jasmine.Ajax.requests.mostRecent();
    expect(request.url).toEqual("/db/user.code.problem");
    params = JSON.parse(request.params);
    expect(params.code).toEqual(aether.raw);
    expect(params.codeSnippet).toEqual("this.sad('bye');");
    expect(params.errHint).toEqual(aetherProblem.hint);
    expect(params.errId).toEqual(aetherProblem.id);
    expect(params.errLevel).toEqual(aetherProblem.level);
    expect(params.errMessage).toEqual(aetherProblem.message);
    expect(params.errRange).toEqual(aetherProblem.range);
    expect(params.errType).toEqual(aetherProblem.type);
    expect(params.language).toEqual(aether.language.id);
    return expect(params.levelID).toEqual(levelID);
  });
  xit('save user code problem no range', function() {
    var params, request;
    aetherProblem.range = null;
    new Problem({
      aether: aether,
      aetherProblem: aetherProblem,
      ace: ace,
      isCast: false,
      levelID: levelID
    });
    expect(jasmine.Ajax.requests.count()).toBe(1);
    request = jasmine.Ajax.requests.mostRecent();
    expect(request.url).toEqual("/db/user.code.problem");
    params = JSON.parse(request.params);
    expect(params.code).toEqual(aether.raw);
    expect(params.errHint).toEqual(aetherProblem.hint);
    expect(params.errId).toEqual(aetherProblem.id);
    expect(params.errLevel).toEqual(aetherProblem.level);
    expect(params.errMessage).toEqual(aetherProblem.message);
    expect(params.errType).toEqual(aetherProblem.type);
    expect(params.language).toEqual(aether.language.id);
    expect(params.levelID).toEqual(levelID);
    expect(params.codeSnippet).toBeUndefined();
    return expect(params.errRange).toBeUndefined();
  });
  return xit('save user code problem multi-line snippet', function() {
    var params, request;
    aether.raw = "this.say('hi');\nthis.sad\n('bye');";
    aetherProblem.range = [
      {
        row: 1
      }, {
        row: 2
      }
    ];
    new Problem({
      aether: aether,
      aetherProblem: aetherProblem,
      ace: ace,
      isCast: false,
      levelID: levelID
    });
    expect(jasmine.Ajax.requests.count()).toBe(1);
    request = jasmine.Ajax.requests.mostRecent();
    expect(request.url).toEqual("/db/user.code.problem");
    params = JSON.parse(request.params);
    expect(params.code).toEqual(aether.raw);
    expect(params.codeSnippet).toEqual("this.sad\n('bye');");
    expect(params.errHint).toEqual(aetherProblem.hint);
    expect(params.errId).toEqual(aetherProblem.id);
    expect(params.errLevel).toEqual(aetherProblem.level);
    expect(params.errMessage).toEqual(aetherProblem.message);
    expect(params.errRange).toEqual(aetherProblem.range);
    expect(params.errType).toEqual(aetherProblem.type);
    expect(params.language).toEqual(aether.language.id);
    return expect(params.levelID).toEqual(levelID);
  });
});
});

;require.register("test/app/views/play/level/tome/SpellView.spec", function(exports, require, module) {

});

;require.register("test/app/views/teachers/ActivateLicensesModal.spec", function(exports, require, module) {
var ActivateLicensesModal, Classrooms, Courses, Levels, Prepaids, Users, factories, forms;

ActivateLicensesModal = require('views/courses/ActivateLicensesModal');

Classrooms = require('collections/Classrooms');

Courses = require('collections/Courses');

Levels = require('collections/Levels');

Prepaids = require('collections/Prepaids');

Users = require('collections/Users');

forms = require('core/forms');

factories = require('test/app/factories');

describe('ActivateLicensesModal', function() {
  beforeEach(function(done) {
    var options, prepaids, selectedUsers;
    this.members = new Users(_.times(4, function(i) {
      return factories.makeUser();
    }));
    this.classrooms = new Classrooms([
      factories.makeClassroom({}, {
        members: this.members
      }), factories.makeClassroom()
    ]);
    selectedUsers = new Users(this.members.slice(0, 3));
    options = _.extend({}, {
      classroom: this.classrooms.first(),
      classrooms: this.classrooms,
      users: this.members,
      selectedUsers: selectedUsers
    }, options);
    this.modal = new ActivateLicensesModal(options);
    this.prepaidThatExpiresSooner = factories.makePrepaid({
      maxRedeemers: 1,
      endDate: moment().add(1, 'month').toISOString()
    });
    this.prepaidThatExpiresLater = factories.makePrepaid({
      maxRedeemers: 1,
      endDate: moment().add(2, 'months').toISOString()
    });
    prepaids = new Prepaids([
      factories.makePrepaid({
        maxRedeemers: 0,
        endDate: moment().add(1, 'day').toISOString()
      }), factories.makePrepaid({
        maxRedeemers: 10,
        endDate: moment().subtract(1, 'day').toISOString()
      }), factories.makePrepaid({
        maxRedeemers: 100,
        startDate: moment().add(1, 'month').toISOString(),
        endDate: moment().add(2, 'months').toISOString()
      }), this.prepaidThatExpiresSooner, this.prepaidThatExpiresLater
    ]);
    this.modal.prepaids.fakeRequests[0].respondWith({
      status: 200,
      responseText: prepaids.stringify()
    });
    this.modal.classrooms.fakeRequests[0].respondWith({
      status: 200,
      responseText: this.classrooms.stringify()
    });
    this.modal.classrooms.first().users.fakeRequests[0].respondWith({
      status: 200,
      responseText: this.members.stringify()
    });
    jasmine.demoModal(this.modal);
    return _.defer(done);
  });
  describe('the class dropdown', function() {
    it('contains an All Students option', function() {
      return expect(this.modal.$('select option:last-child').data('i18n')).toBe('teacher.all_students');
    });
    it('displays the current classname', function() {
      return expect(this.modal.$('option:selected').html()).toBe(this.classrooms.first().get('name'));
    });
    return it('contains all of the teacher\'s classes', function() {
      return expect(this.modal.$('select option').length).toBe(3);
    });
  });
  describe('the checklist of students', function() {
    it('should separate the unenrolled from the enrolled students');
    it('should have a checkmark by the selected students');
    return it('should display all the students');
  });
  describe('the credits availble count', function() {
    return it('should match the number of unused prepaids', function() {
      return expect(this.modal.$('#total-available').html()).toBe('2');
    });
  });
  describe('the Enroll button', function() {
    it('should show the number of selected students', function() {
      return expect(this.modal.$('#total-selected-span').html()).toBe('3');
    });
    it('should fire off one request when clicked');
    describe('when the teacher has enough licenses', function() {
      beforeEach(function() {
        var selected;
        selected = this.modal.state.get('selectedUsers');
        return selected.remove(selected.first());
      });
      it('should be enabled', function() {
        return expect(this.modal.$('#activate-licenses-btn').hasClass('disabled')).toBe(false);
      });
      return describe('when clicked', function() {
        beforeEach(function() {
          return this.modal.$('form').submit();
        });
        return it('enrolls the selected students with the soonest-to-expire, available prepaid', function() {
          var request;
          request = jasmine.Ajax.requests.mostRecent();
          if (request.url.indexOf(this.prepaidThatExpiresSooner.id) === -1) {
            fail('The first prepaid should be the prepaid that expires sooner');
          }
          request.respondWith({
            status: 200,
            responseText: '{ "redeemers": [{}] }'
          });
          request = jasmine.Ajax.requests.mostRecent();
          if (request.url.indexOf(this.prepaidThatExpiresLater.id) === -1) {
            return fail('The second prepaid should be the prepaid that expires later');
          }
        });
      });
    });
    return describe('when the teacher doesn\'t have enough licenses', function() {
      return it('should be disabled', function() {
        return expect(this.modal.$('#activate-licenses-btn').hasClass('disabled')).toBe(true);
      });
    });
  });
  return describe('the Purchase More button', function() {
    return it('should redirect to the license purchasing page');
  });
});
});

;require.register("test/app/views/teachers/ConvertToTeacherAccountView.spec", function(exports, require, module) {
var ConvertToTeacherAccountView, forms, storage;

ConvertToTeacherAccountView = require('views/teachers/ConvertToTeacherAccountView');

storage = require('core/storage');

forms = require('core/forms');

describe('/teachers/update-account', function() {
  describe('when logged out', function() {
    return it('redirects to /teachers/signup', function() {
      var args;
      spyOn(me, 'isAnonymous').and.returnValue(true);
      spyOn(application.router, 'navigate');
      Backbone.history.loadUrl('/teachers/update-account');
      expect(application.router.navigate.calls.count()).toBe(1);
      args = application.router.navigate.calls.argsFor(0);
      return expect(args[0]).toBe('/teachers/signup');
    });
  });
  return describe('when logged in', function() {
    return it('displays ConvertToTeacherAccountView', function() {
      var args;
      spyOn(me, 'isAnonymous').and.returnValue(false);
      spyOn(me, 'isTeacher').and.returnValue(false);
      spyOn(application.router, 'routeDirectly');
      Backbone.history.loadUrl('/teachers/update-account');
      expect(application.router.routeDirectly.calls.count()).toBe(1);
      args = application.router.routeDirectly.calls.argsFor(0);
      return expect(args[0]).toBe('teachers/ConvertToTeacherAccountView');
    });
  });
});

describe('ConvertToTeacherAccountView (/teachers/update-account)', function() {
  var successForm, view;
  view = null;
  successForm = {
    phoneNumber: '555-555-5555',
    role: 'Teacher',
    organization: 'School',
    district: 'District',
    city: 'Springfield',
    state: 'AA',
    country: 'asdf',
    numStudents: '1-10',
    educationLevel: ['Middle'],
    firstName: 'Mr',
    lastName: 'Bean'
  };
  beforeEach(function() {
    spyOn(application.router, 'navigate');
    me.clear();
    me.set({
      _id: '1234',
      anonymous: false,
      email: 'some@email.com',
      name: 'Existing User'
    });
    me._revertAttributes = {};
    view = new ConvertToTeacherAccountView();
    view.render();
    jasmine.demoEl(view.$el);
    return spyOn(storage, 'load').and.returnValue({
      lastName: 'Saved Changes'
    });
  });
  afterEach(function(done) {
    return _.defer(done);
  });
  describe('when the form is unchanged', function() {
    return it('does not prevent navigating away', function() {
      return expect(_.result(view, 'onLeaveMessage')).toBeFalsy();
    });
  });
  describe('when the form has changed but is not submitted', function() {
    beforeEach(function() {
      return view.$el.find('form').trigger('change');
    });
    return it('prevents navigating away', function() {
      return expect(_.result(view, 'onLeaveMessage')).toBeTruthy();
    });
  });
  describe('when the user already has a TrialRequest and is a teacher', function() {
    beforeEach(function(done) {
      spyOn(me, 'isTeacher').and.returnValue(true);
      _.last(view.trialRequests.fakeRequests).respondWith({
        status: 200,
        responseText: JSON.stringify([
          {
            _id: '1',
            properties: {
              firstName: 'First',
              lastName: 'Last'
            }
          }
        ])
      });
      return _.defer(done);
    });
    return xit('redirects to /teachers/courses', function() {
      var args;
      expect(application.router.navigate).toHaveBeenCalled();
      args = application.router.navigate.calls.argsFor(0);
      return expect(args[0]).toBe('/teachers/courses');
    });
  });
  describe('when the user has role "student"', function() {
    beforeEach(function() {
      me.set('role', 'student');
      _.last(view.trialRequests.fakeRequests).respondWith({
        status: 200,
        responseText: JSON.stringify('[]')
      });
      return view.render();
    });
    it('shows a warning that they will convert to a teacher account', function() {
      return expect(view.$('#conversion-warning').length).toBe(1);
    });
    return describe('submitting the form', function() {
      beforeEach(function() {
        var form;
        form = view.$('form');
        forms.objectToForm(form, successForm, {
          overwriteExisting: true
        });
        spyOn(view, 'openModalView');
        return form.submit();
      });
      return it('requires confirmation', function() {
        var confirmModal, request;
        expect(view.trialRequest.fakeRequests.length).toBe(0);
        confirmModal = view.openModalView.calls.argsFor(0)[0];
        confirmModal.trigger('confirm');
        request = _.last(view.trialRequest.fakeRequests);
        expect(request.url).toBe('/db/trial.request');
        return expect(request.method).toBe('POST');
      });
    });
  });
  describe('"Log out" link', function() {
    beforeEach(function() {
      return _.last(view.trialRequests.fakeRequests).respondWith({
        status: 200,
        responseText: JSON.stringify('[]')
      });
    });
    return it('logs out the user and redirects them to /teachers/signup', function() {
      spyOn(me, 'logout');
      view.$('#logout-link').click();
      return expect(me.logout).toHaveBeenCalled();
    });
  });
  describe('submitting the form', function() {
    beforeEach(function() {
      var form;
      view.$el.find('#request-form').trigger('change');
      _.last(view.trialRequests.fakeRequests).respondWith({
        status: 200,
        responseText: JSON.stringify('[]')
      });
      form = view.$('form');
      forms.objectToForm(form, successForm, {
        overwriteExisting: true
      });
      return form.submit();
    });
    it('does not prevent navigating away', function() {
      return expect(_.result(view, 'onLeaveMessage')).toBeFalsy();
    });
    it('creates a new TrialRequest with the information', function() {
      var attrs, ref, ref1, ref2, request;
      request = _.last(view.trialRequest.fakeRequests);
      expect(request).toBeTruthy();
      expect(request.method).toBe('POST');
      attrs = JSON.parse(request.params);
      expect((ref = attrs.properties) != null ? ref.firstName : void 0).toBe('Mr');
      expect((ref1 = attrs.properties) != null ? ref1.siteOrigin : void 0).toBe('convert teacher');
      return expect((ref2 = attrs.properties) != null ? ref2.email : void 0).toBe('some@email.com');
    });
    it('redirects to /teachers/classes', function() {
      var args, request;
      request = _.last(view.trialRequest.fakeRequests);
      request.respondWith({
        status: 201,
        responseText: JSON.stringify(_.extend({
          _id: 'fraghlarghl'
        }, JSON.parse(request.params)))
      });
      expect(application.router.navigate).toHaveBeenCalled();
      args = application.router.navigate.calls.argsFor(0);
      return expect(args[0]).toBe('/teachers/classes');
    });
    return it('sets a teacher role', function() {
      var request;
      request = _.last(view.trialRequest.fakeRequests);
      request.respondWith({
        status: 201,
        responseText: JSON.stringify(_.extend({
          _id: 'fraghlarghl'
        }, JSON.parse(request.params)))
      });
      return expect(me.get('role')).toBe(successForm.role.toLowerCase());
    });
  });
  describe('submitting the form without school', function() {
    beforeEach(function() {
      var form, formData;
      view.$el.find('#request-form').trigger('change');
      form = view.$('form');
      formData = _.omit(successForm, ['organization']);
      forms.objectToForm(form, formData);
      return form.submit();
    });
    return it('submits a trial request, which does not include school setting', function() {
      var attrs, ref, ref1, request;
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/db/trial.request');
      expect(request.method).toBe('POST');
      attrs = JSON.parse(request.params);
      expect((ref = attrs.properties) != null ? ref.organization : void 0).toBeUndefined();
      return expect((ref1 = attrs.properties) != null ? ref1.district : void 0).toEqual('District');
    });
  });
  describe('submitting the form without district', function() {
    beforeEach(function() {
      var form, formData;
      view.$el.find('#request-form').trigger('change');
      form = view.$('form');
      formData = _.omit(successForm, ['district']);
      forms.objectToForm(form, formData);
      return form.submit();
    });
    return it('displays a validation error on district and not school', function() {
      expect(view.$('#organization-control').parent().hasClass('has-error')).toEqual(false);
      return expect(view.$('#district-control').parent().hasClass('has-error')).toEqual(true);
    });
  });
  return describe('submitting the form district set to n/a', function() {
    beforeEach(function() {
      var form, formData;
      view.$el.find('#request-form').trigger('change');
      form = view.$('form');
      formData = _.omit(successForm, ['organization']);
      formData.district = 'N/A';
      forms.objectToForm(form, formData);
      return form.submit();
    });
    return it('submits a trial request, which does not include district setting', function() {
      var attrs, ref, request;
      expect(view.$('#organization-control').parent().hasClass('has-error')).toEqual(false);
      expect(view.$('#district-control').parent().hasClass('has-error')).toEqual(false);
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/db/trial.request');
      expect(request.method).toBe('POST');
      attrs = JSON.parse(request.params);
      return expect((ref = attrs.properties) != null ? ref.district : void 0).toBeUndefined();
    });
  });
});
});

;require.register("test/app/views/teachers/CreateTeacherAccountView.spec", function(exports, require, module) {
var CreateTeacherAccountView, forms;

CreateTeacherAccountView = require('views/teachers/CreateTeacherAccountView');

forms = require('core/forms');

describe('/teachers/signup', function() {
  describe('when logged out', function() {
    return it('displays CreateTeacherAccountView', function() {
      var args;
      spyOn(me, 'isAnonymous').and.returnValue(true);
      spyOn(application.router, 'routeDirectly');
      Backbone.history.loadUrl('/teachers/signup');
      expect(application.router.routeDirectly.calls.count()).toBe(1);
      args = application.router.routeDirectly.calls.argsFor(0);
      return expect(args[0]).toBe('teachers/CreateTeacherAccountView');
    });
  });
  return describe('when logged in', function() {
    return it('redirects to /teachers/update-account', function() {
      var args;
      spyOn(me, 'isAnonymous').and.returnValue(false);
      spyOn(application.router, 'navigate');
      Backbone.history.loadUrl('/teachers/signup');
      expect(application.router.navigate.calls.count()).toBe(1);
      args = application.router.navigate.calls.argsFor(0);
      return expect(args[0]).toBe('/teachers/update-account');
    });
  });
});

describe('CreateTeacherAccountView', function() {
  var successForm, view;
  view = null;
  successForm = {
    name: 'New Name',
    phoneNumber: '555-555-5555',
    role: 'Teacher',
    organization: 'School',
    district: 'District',
    city: 'Springfield',
    state: 'AA',
    country: 'asdf',
    numStudents: '1-10',
    educationLevel: ['Middle'],
    email: 'some@email.com',
    firstName: 'Mr',
    lastName: 'Bean',
    password1: 'letmein',
    password2: 'letmein'
  };
  beforeEach(function(done) {
    var request;
    me.clear();
    me.set('_id', '1234');
    me._revertAttributes = {};
    spyOn(me, 'isAnonymous').and.returnValue(true);
    view = new CreateTeacherAccountView();
    view.render();
    jasmine.demoEl(view.$el);
    request = jasmine.Ajax.requests.mostRecent();
    request.respondWith({
      status: 200,
      responseText: JSON.stringify([
        {
          _id: '1',
          properties: {
            firstName: 'First',
            lastName: 'Last'
          }
        }
      ])
    });
    return _.defer(done);
  });
  describe('when the form is unchanged', function() {
    return it('does not prevent navigating away', function() {
      return expect(_.result(view, 'onLeaveMessage')).toBeFalsy();
    });
  });
  describe('when the form has changed but is not submitted', function() {
    beforeEach(function() {
      return view.$el.find('form').trigger('change');
    });
    return it('prevents navigating away', function() {
      return expect(_.result(view, 'onLeaveMessage')).toBeTruthy();
    });
  });
  describe('"Log in" link', function() {
    return it('opens the log in modal', function() {
      var AuthModal;
      spyOn(view, 'openModalView');
      view.$('.alert .login-link').click();
      expect(view.openModalView.calls.count()).toBe(1);
      AuthModal = require('views/core/AuthModal');
      return expect(view.openModalView.calls.argsFor(0)[0] instanceof AuthModal).toBe(true);
    });
  });
  describe('clicking the Facebook button', function() {
    beforeEach(function() {
      var request;
      application.facebookHandler.fakeAPI();
      view.$('#facebook-signup-btn').click();
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/db/user?facebookID=abcd&facebookAccessToken=1234');
      return expect(request.method).toBe('GET');
    });
    describe('when an associated user already exists', function() {
      beforeEach(function() {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        return request.respondWith({
          status: 200,
          responseText: JSON.stringify({
            _id: 'abcd'
          })
        });
      });
      return it('logs them in and redirects them to the ConvertToTeacherAccountView', function() {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        return expect(request.url).toBe('/auth/login-facebook');
      });
    });
    return describe('when the user connects with Facebook and there isn\'t already an associated account', function() {
      beforeEach(function() {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        return request.respondWith({
          status: 404,
          responseText: '{}'
        });
      });
      it('disables and fills in the email, first name, last name and password fields', function() {
        var field, i, len, ref, results;
        ref = ['email', 'firstName', 'lastName', 'password1', 'password2'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          field = ref[i];
          results.push(expect(view.$("input[name='" + field + "']").attr('disabled')).toBeTruthy());
        }
        return results;
      });
      it('hides the social login buttons and shows a success message', function() {
        expect(view.$('#facebook-logged-in-row').hasClass('hide')).toBe(false);
        return expect(view.$('#social-network-signups').hasClass('hide')).toBe(true);
      });
      return describe('and the user finishes filling in the form and submits', function() {
        beforeEach(function() {
          var form;
          form = view.$('form');
          forms.objectToForm(form, successForm);
          return form.submit();
        });
        return it('creates a user associated with the Facebook account', function(done) {
          var request;
          request = jasmine.Ajax.requests.mostRecent();
          expect(request.url).toBe('/db/trial.request');
          request.respondWith({
            status: 201,
            responseText: JSON.stringify(_.extend({
              _id: 'fraghlarghl'
            }, JSON.parse(request.params)))
          });
          return view.once('update-settings', (function(_this) {
            return function() {
              var body;
              request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toBe("/db/user/1234");
              body = JSON.parse(request.params);
              expect(body.firstName).toBe('Mr');
              expect(body.lastName).toBe('Bean');
              request.respondWith({
                status: 200,
                responseText: '{}'
              });
              return view.once('signup', function() {
                var actual, expected;
                request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe("/db/user/1234/signup-with-facebook");
                expected = {
                  "name": "New Name",
                  "email": "some@email.com",
                  "facebookID": "abcd",
                  "facebookAccessToken": "1234"
                };
                actual = JSON.parse(request.params);
                expect(_.isEqual(expected, actual)).toBe(true);
                return done();
              });
            };
          })(this));
        });
      });
    });
  });
  describe('clicking the G+ button', function() {
    beforeEach(function() {
      var request;
      application.gplusHandler.fakeAPI();
      view.$('#gplus-signup-btn').click();
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/db/user?gplusID=abcd&gplusAccessToken=1234');
      return expect(request.method).toBe('GET');
    });
    describe('when an associated user already exists', function() {
      beforeEach(function() {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        return request.respondWith({
          status: 200,
          responseText: JSON.stringify({
            _id: 'abcd'
          })
        });
      });
      return it('logs them in and redirects them to the ConvertToTeacherAccountView', function() {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        return expect(request.url).toBe('/auth/login-gplus');
      });
    });
    return describe('when the user connects with G+ and there isn\'t already an associated account', function() {
      beforeEach(function() {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        return request.respondWith({
          status: 404,
          responseText: '{}'
        });
      });
      it('disables and fills in the email, first name, last name and password fields', function() {
        var field, i, len, ref, results;
        ref = ['email', 'firstName', 'lastName', 'password1', 'password2'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          field = ref[i];
          results.push(expect(view.$("input[name='" + field + "']").attr('disabled')).toBeTruthy());
        }
        return results;
      });
      it('hides the social login buttons and shows a success message', function() {
        expect(view.$('#gplus-logged-in-row').hasClass('hide')).toBe(false);
        return expect(view.$('#social-network-signups').hasClass('hide')).toBe(true);
      });
      return describe('and the user finishes filling in the form and submits', function() {
        beforeEach(function() {
          var form;
          form = view.$('form');
          forms.objectToForm(form, successForm);
          return form.submit();
        });
        return it('creates a user associated with the GPlus account', function(done) {
          var request;
          request = jasmine.Ajax.requests.mostRecent();
          expect(request.url).toBe('/db/trial.request');
          request.respondWith({
            status: 201,
            responseText: JSON.stringify(_.extend({
              _id: 'fraghlarghl'
            }, JSON.parse(request.params)))
          });
          return view.once('update-settings', (function(_this) {
            return function() {
              var body;
              request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toBe("/db/user/1234");
              body = JSON.parse(request.params);
              expect(body.firstName).toBe('Mr');
              expect(body.lastName).toBe('Bean');
              request.respondWith({
                status: 200,
                responseText: '{}'
              });
              return view.once('signup', function() {
                var actual, expected;
                request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe("/db/user/1234/signup-with-gplus");
                expected = {
                  "name": "New Name",
                  "email": "some@email.com",
                  "gplusID": "abcd",
                  "gplusAccessToken": "1234"
                };
                actual = JSON.parse(request.params);
                expect(_.isEqual(expected, actual)).toBe(true);
                return done();
              });
            };
          })(this));
        });
      });
    });
  });
  describe('submitting the form successfully', function() {
    beforeEach(function() {
      var form;
      view.$el.find('#request-form').trigger('change');
      form = view.$('form');
      forms.objectToForm(form, successForm);
      return form.submit();
    });
    it('does not prevent navigating away', function() {
      return expect(_.result(view, 'onLeaveMessage')).toBeFalsy();
    });
    it('submits a trial request, which does not include "account" settings', function() {
      var attrs, ref, ref1, ref2, request;
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/db/trial.request');
      expect(request.method).toBe('POST');
      attrs = JSON.parse(request.params);
      expect(attrs.password1).toBeUndefined();
      expect(attrs.password2).toBeUndefined();
      expect(attrs.name).toBeUndefined();
      expect((ref = attrs.properties) != null ? ref.siteOrigin : void 0).toBe('create teacher');
      expect((ref1 = attrs.properties) != null ? ref1.organization : void 0).toEqual('School');
      return expect((ref2 = attrs.properties) != null ? ref2.district : void 0).toEqual('District');
    });
    return describe('after saving the new trial request', function() {
      beforeEach(function(done) {
        var request;
        view.once('update-settings', done);
        request = jasmine.Ajax.requests.mostRecent();
        return request.respondWith({
          status: 201,
          responseText: JSON.stringify(_.extend({
            _id: 'fraghlarghl'
          }, JSON.parse(request.params)))
        });
      });
      it('updates user and signs up with password', function(done) {
        var attr, attrs, i, len, ref, request;
        request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('/db/user/1234');
        expect(request.method).toBe('PUT');
        attrs = JSON.parse(request.params);
        ref = ['role', 'firstName', 'lastName'];
        for (i = 0, len = ref.length; i < len; i++) {
          attr = ref[i];
          expect(attrs[attr]).toBeDefined();
        }
        request.respondWith({
          status: 201,
          responseText: '{}'
        });
        return view.once('signup', (function(_this) {
          return function() {
            var body, j, len1, ref1;
            request = jasmine.Ajax.requests.mostRecent();
            expect(request.url).toBe('/db/user/1234/signup-with-password');
            body = JSON.parse(request.params);
            ref1 = ['email', 'password', 'name'];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              attr = ref1[j];
              expect(body[attr]).toBeDefined();
            }
            return done();
          };
        })(this));
      });
      return describe('after saving the new user', function() {
        beforeEach(function(done) {
          var request;
          spyOn(application.router, 'navigate');
          spyOn(application.router, 'reload');
          request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            status: 201,
            responseText: JSON.stringify(_.extend({
              _id: 'fraghlarghl'
            }, JSON.parse(request.params)))
          });
          expect(request.url).toBe('/db/user/1234');
          return view.once('signup', (function(_this) {
            return function() {
              request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toBe('/db/user/1234/signup-with-password');
              request.respondWith({
                status: 201,
                responseText: '{}'
              });
              return _.defer(done);
            };
          })(this));
        });
        return it('redirects to "/teachers/courses"', function() {
          expect(application.router.navigate).toHaveBeenCalled();
          return expect(application.router.reload).toHaveBeenCalled();
        });
      });
    });
  });
  describe('submitting the form with an email for an existing account', function() {
    beforeEach(function() {
      var form, request;
      form = view.$('form');
      forms.objectToForm(form, successForm);
      form.submit();
      request = jasmine.Ajax.requests.mostRecent();
      return request.respondWith({
        status: 409,
        responseText: '{}'
      });
    });
    return it('displays an error with a log in link', function() {
      expect(view.$('#email-form-group').hasClass('has-error')).toBe(true);
      spyOn(view, 'openModalView');
      view.$('#email-form-group .login-link').click();
      return expect(view.openModalView).toHaveBeenCalled();
    });
  });
  describe('submitting the form without school', function() {
    beforeEach(function() {
      var form, formData;
      view.$el.find('#request-form').trigger('change');
      form = view.$('form');
      formData = _.omit(successForm, ['organization']);
      forms.objectToForm(form, formData);
      return form.submit();
    });
    return it('submits a trial request, which does not include school setting', function() {
      var attrs, ref, ref1, request;
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/db/trial.request');
      expect(request.method).toBe('POST');
      attrs = JSON.parse(request.params);
      expect((ref = attrs.properties) != null ? ref.organization : void 0).toBeUndefined();
      return expect((ref1 = attrs.properties) != null ? ref1.district : void 0).toEqual('District');
    });
  });
  describe('submitting the form without district', function() {
    beforeEach(function() {
      var form, formData;
      view.$el.find('#request-form').trigger('change');
      form = view.$('form');
      formData = _.omit(successForm, ['district']);
      forms.objectToForm(form, formData);
      return form.submit();
    });
    return it('displays a validation error on district and not school', function() {
      expect(view.$('#organization-control').parent().hasClass('has-error')).toEqual(false);
      return expect(view.$('#district-control').parent().hasClass('has-error')).toEqual(true);
    });
  });
  return describe('submitting the form district set to n/a', function() {
    beforeEach(function() {
      var form, formData;
      view.$el.find('#request-form').trigger('change');
      form = view.$('form');
      formData = _.omit(successForm, ['organization']);
      formData.district = 'N/A';
      forms.objectToForm(form, formData);
      return form.submit();
    });
    return it('submits a trial request, which does not include district setting', function() {
      var attrs, ref, request;
      expect(view.$('#organization-control').parent().hasClass('has-error')).toEqual(false);
      expect(view.$('#district-control').parent().hasClass('has-error')).toEqual(false);
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/db/trial.request');
      expect(request.method).toBe('POST');
      attrs = JSON.parse(request.params);
      return expect((ref = attrs.properties) != null ? ref.district : void 0).toBeUndefined();
    });
  });
});
});

;require.register("test/app/views/teachers/EditStudentModal.spec", function(exports, require, module) {
var EditStudentModal, User, factories;

EditStudentModal = require('views/teachers/EditStudentModal');

User = require('models/User');

factories = require('test/app/factories');

describe('EditStudentModal', function() {
  var email, modal, newPassword, user;
  user = null;
  modal = null;
  email = "test@example.com";
  newPassword = "new password";
  describe('for a verified user', function() {
    beforeEach(function(done) {
      var classroom, request;
      user = factories.makeUser({
        email: email,
        emailVerified: true
      });
      classroom = factories.makeClassroom();
      modal = new EditStudentModal({
        user: user,
        classroom: classroom
      });
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith({
        status: 200,
        responseText: JSON.stringify(user)
      });
      jasmine.demoModal(modal);
      modal.render();
      return _.defer(done);
    });
    it('has a button to send a password reset email', function() {
      if (modal.$('.send-recovery-email-btn').length < 1) {
        return fail("Expected there to be a Send Recovery Email button");
      }
    });
    it('sends the verification email request', function() {
      var request;
      modal.$('.send-recovery-email-btn').click();
      request = jasmine.Ajax.requests.mostRecent();
      return expect(request.params).toEqual("email=" + (encodeURIComponent(email)));
    });
    return it('updates the button after the request is sent', function() {
      var request;
      modal.$('.send-recovery-email-btn').click();
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith({
        status: 200,
        responseText: "{}"
      });
      return expect(modal.$('.send-recovery-email-btn [data-i18n]').data('i18n')).toEqual('teacher.email_sent');
    });
  });
  return describe('for an unverified user', function() {
    beforeEach(function(done) {
      var classroom, request;
      user = factories.makeUser({
        email: email,
        emailVerified: false
      });
      classroom = factories.makeClassroom();
      modal = new EditStudentModal({
        user: user,
        classroom: classroom
      });
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith({
        status: 200,
        responseText: JSON.stringify(user)
      });
      jasmine.demoModal(modal);
      modal.render();
      return _.defer(done);
    });
    it("has a new password field", function() {
      if (modal.$('.new-password-input').length < 1) {
        return fail("Expected there to be a new password input field");
      }
    });
    it("has a change password button", function() {
      if (modal.$('.change-password-btn').length < 1) {
        return fail("Expected there to be a Change Password button");
      }
    });
    return describe('when you click the button', function() {
      it('sends a request', function() {
        var request;
        modal.$('.change-password-btn').click();
        request = jasmine.Ajax.requests.mostRecent();
        return expect(request).toBeDefined();
      });
      return xit('updates the button', function() {
        var request1, request2;
        request1 = jasmine.Ajax.requests.mostRecent();
        if (!request1) {
          fail("Expected a request to be sent");
        }
        modal.$('.new-password-input').val(newPassword).change().trigger('input');
        modal.$('.change-password-btn').click();
        request2 = jasmine.Ajax.requests.mostRecent();
        expect(request1).not.toBe(request2);
        if (request1 != null) {
          request1.respondWith({
            status: 200,
            responseText: JSON.stringify(user)
          });
        }
        return expect(modal.$('.change-password-btn [data-i18n]').data('i18n')).toEqual('teacher.changed');
      });
    });
  });
});
});

;require.register("test/app/views/teachers/InviteToClassroomModal.spec", function(exports, require, module) {
var InviteToClassroomModal, User, factories;

InviteToClassroomModal = require('views/courses/InviteToClassroomModal');

User = require('models/User');

factories = require('test/app/factories');

describe('InviteToClassroomModal', function() {
  var modal;
  modal = null;
  beforeEach(function(done) {
    window.me = this.teacher = factories.makeUser();
    this.classroom = factories.makeClassroom({
      code: "wordsouphere",
      codeCamel: "WordSoupHere",
      ownerID: this.teacher.id
    });
    modal = new InviteToClassroomModal({
      classroom: this.classroom
    });
    jasmine.demoModal(modal);
    modal.render();
    return _.defer(done);
  });
  return describe('Invite by email', function() {
    beforeEach(function(done) {
      this.emails = ['test@example.com', 'test2@example.com'];
      modal.$('#invite-emails-textarea').val(this.emails.join('\n'));
      modal.$('#send-invites-btn').click();
      return _.defer(done);
    });
    return it('sends the request', function(done) {
      var request;
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe("/db/classroom/" + this.classroom.id + "/invite-members");
      expect(request.method).toBe("POST");
      expect(request.data()['emails[]']).toEqual(this.emails);
      return _.defer(done);
    });
  });
});
});

;require.register("test/app/views/teachers/RequestQuoteView.spec", function(exports, require, module) {
var RequestQuoteView, forms;

RequestQuoteView = require('views/teachers/RequestQuoteView');

forms = require('core/forms');

describe('RequestQuoteView', function() {
  var isSubmitRequest, successForm, view;
  view = null;
  successForm = {
    firstName: 'A',
    lastName: 'B',
    email: 'C@D.com',
    phoneNumber: '555-555-5555',
    role: 'Teacher',
    organization: 'School',
    district: 'District',
    city: 'Springfield',
    state: 'AA',
    country: 'asdf',
    numStudents: '1-10',
    numStudentsTotal: '10,000+',
    purchaserRole: 'Approve Funds',
    educationLevel: ['Middle']
  };
  isSubmitRequest = function(r) {
    return _.string.startsWith(r.url, '/db/trial.request') && r.method === 'POST';
  };
  describe('when an anonymous user', function() {
    beforeEach(function(done) {
      me.clear();
      me.set('_id', '1234');
      me._revertAttributes = {};
      spyOn(me, 'isAnonymous').and.returnValue(true);
      view = new RequestQuoteView();
      view.render();
      jasmine.demoEl(view.$el);
      return _.defer(done);
    });
    describe('has an existing trial request', function() {
      beforeEach(function(done) {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          status: 200,
          responseText: JSON.stringify([
            {
              _id: '1',
              properties: {
                firstName: 'First',
                lastName: 'Last'
              }
            }
          ])
        });
        return view.supermodel.once('loaded-all', done);
      });
      return it('shows request received', function() {
        expect(view.$('#request-form').hasClass('hide')).toBe(true);
        return expect(view.$('#form-submit-success').hasClass('hide')).toBe(false);
      });
    });
    describe('does NOT have an existing trial request', function() {
      beforeEach(function(done) {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          status: 200,
          responseText: '[]'
        });
        return _.defer(done);
      });
      describe('when the form is unchanged', function() {
        return it('does not prevent navigating away', function() {
          return expect(_.result(view, 'onLeaveMessage')).toBeFalsy();
        });
      });
      describe('when the form has changed but is not submitted', function() {
        beforeEach(function() {
          return view.$el.find('#request-form').trigger('change');
        });
        return it('prevents navigating away', function() {
          return expect(_.result(view, 'onLeaveMessage')).toBeTruthy();
        });
      });
      return describe('on successful form submit', function() {
        beforeEach(function() {
          view.$el.find('#request-form').trigger('change');
          forms.objectToForm(view.$el, successForm);
          view.$('#request-form').submit();
          this.submitRequest = _.last(jasmine.Ajax.requests.filter(isSubmitRequest));
          return this.submitRequest.respondWith({
            status: 201,
            responseText: JSON.stringify(_.extend({
              _id: 'a'
            }, successForm))
          });
        });
        it('does not prevent navigating away', function() {
          return expect(_.result(view, 'onLeaveMessage')).toBeFalsy();
        });
        it('creates a new trial request', function() {
          var attrs, ref;
          expect(this.submitRequest).toBeTruthy();
          expect(this.submitRequest.method).toBe('POST');
          attrs = JSON.parse(this.submitRequest.params);
          return expect((ref = attrs.properties) != null ? ref.siteOrigin : void 0).toBe('demo request');
        });
        it('sets the user\'s role to the one they chose', function() {
          var request;
          request = _.last(jasmine.Ajax.requests.filter(function(r) {
            return _.string.startsWith(r.url, '/db/user');
          }));
          expect(request).toBeTruthy();
          expect(request.method).toBe('PUT');
          return expect(JSON.parse(request.params).role).toBe('teacher');
        });
        it('shows a signup form', function() {
          expect(view.$('#form-submit-success').hasClass('hide')).toBe(false);
          return expect(view.$('#request-form').hasClass('hide')).toBe(true);
        });
        return describe('signup form', function() {
          beforeEach(function() {
            application.facebookHandler.fakeAPI();
            return application.gplusHandler.fakeAPI();
          });
          it('fills the username field with the given first and last names', function() {
            return expect(view.$('input[name="name"]').val()).toBe('A B');
          });
          it('includes a facebook button which will sign them in immediately', function() {
            var request;
            view.$('#facebook-signup-btn').click();
            request = jasmine.Ajax.requests.mostRecent();
            expect(request.method).toBe('PUT');
            return expect(request.url).toBe('/db/user?facebookID=abcd&facebookAccessToken=1234');
          });
          it('includes a gplus button which will sign them in immediately', function() {
            var request;
            view.$('#gplus-signup-btn').click();
            request = jasmine.Ajax.requests.mostRecent();
            expect(request.method).toBe('PUT');
            return expect(request.url).toBe('/db/user?gplusID=abcd&gplusAccessToken=1234');
          });
          return it('can sign them up with username and password', function() {
            var form, request;
            form = view.$('#signup-form');
            forms.objectToForm(form, {
              password1: 'asdf',
              password2: 'asdf',
              name: 'some name'
            });
            form.submit();
            request = jasmine.Ajax.requests.mostRecent();
            expect(request.method).toBe('PUT');
            return expect(request.url).toBe('/db/user/1234');
          });
        });
      });
    });
    describe('tries to submit a request with an existing user\'s email', function() {
      beforeEach(function() {
        forms.objectToForm(view.$el, successForm);
        view.$('#request-form').submit();
        this.submitRequest = _.last(jasmine.Ajax.requests.filter(isSubmitRequest));
        return this.submitRequest.respondWith({
          status: 409,
          responseText: '{}'
        });
      });
      return it('shows an error that the email already exists', function() {
        expect(view.$('#email-form-group').hasClass('has-error')).toBe(true);
        return expect(view.$('#email-form-group .error-help-block').length).toBe(1);
      });
    });
    describe('submits the form without school', function() {
      beforeEach(function() {
        var form, formData;
        view.$el.find('#request-form').trigger('change');
        form = view.$('#request-form');
        formData = _.omit(successForm, ['organization']);
        forms.objectToForm(form, formData);
        return form.submit();
      });
      return it('submits a trial request, which does not include school setting', function() {
        var attrs, ref, ref1, request;
        request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('/db/trial.request');
        expect(request.method).toBe('POST');
        attrs = JSON.parse(request.params);
        expect((ref = attrs.properties) != null ? ref.organization : void 0).toBeUndefined();
        return expect((ref1 = attrs.properties) != null ? ref1.district : void 0).toEqual('District');
      });
    });
    describe('submits the form without district', function() {
      beforeEach(function() {
        var form, formData;
        view.$el.find('#request-form').trigger('change');
        form = view.$('#request-form');
        formData = _.omit(successForm, ['district']);
        forms.objectToForm(form, formData);
        return form.submit();
      });
      return it('displays a validation error on district and not school', function() {
        expect(view.$('#organization-control').parent().hasClass('has-error')).toEqual(false);
        return expect(view.$('#district-control').parent().hasClass('has-error')).toEqual(true);
      });
    });
    return describe('submits form with district set to n/a', function() {
      beforeEach(function() {
        var form, formData;
        view.$el.find('#request-form').trigger('change');
        form = view.$('#request-form');
        formData = _.omit(successForm, ['organization']);
        formData.district = 'N/A';
        forms.objectToForm(form, formData);
        return form.submit();
      });
      return it('submits a trial request, which does not include district setting', function() {
        var attrs, ref, request;
        expect(view.$('#organization-control').parent().hasClass('has-error')).toEqual(false);
        expect(view.$('#district-control').parent().hasClass('has-error')).toEqual(false);
        request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('/db/trial.request');
        expect(request.method).toBe('POST');
        attrs = JSON.parse(request.params);
        return expect((ref = attrs.properties) != null ? ref.district : void 0).toBeUndefined();
      });
    });
  });
  return describe('when a signed in user', function() {
    beforeEach(function(done) {
      me.clear();
      me.set('_id', '1234');
      me._revertAttributes = {};
      spyOn(me, 'isAnonymous').and.returnValue(false);
      view = new RequestQuoteView();
      view.render();
      jasmine.demoEl(view.$el);
      return _.defer(done);
    });
    describe('has an existing trial request', function() {
      beforeEach(function(done) {
        var request;
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          status: 200,
          responseText: JSON.stringify([
            {
              _id: '1',
              properties: {
                firstName: 'First',
                lastName: 'Last'
              }
            }
          ])
        });
        return view.supermodel.once('loaded-all', done);
      });
      return it('shows form with data from the most recent request', function() {
        return expect(view.$('input[name="firstName"]').val()).toBe('First');
      });
    });
    return describe('has role "student"', function() {
      beforeEach(function(done) {
        var request;
        me.clear();
        me.set('role', 'student');
        me.set('name', 'Some User');
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          status: 200,
          responseText: '[]'
        });
        return _.defer(done);
      });
      it('shows a conversion warning', function() {
        return expect(view.$('#conversion-warning').length).toBe(1);
      });
      return it('requires confirmation to submit the form', function() {
        var confirmModal, form, submitRequest;
        form = view.$('#request-form');
        forms.objectToForm(form, successForm);
        spyOn(view, 'openModalView');
        form.submit();
        expect(view.openModalView).toHaveBeenCalled();
        submitRequest = _.last(jasmine.Ajax.requests.filter(isSubmitRequest));
        expect(submitRequest).toBeFalsy();
        confirmModal = view.openModalView.calls.argsFor(0)[0];
        confirmModal.trigger('confirm');
        submitRequest = _.last(jasmine.Ajax.requests.filter(isSubmitRequest));
        return expect(submitRequest).toBeTruthy();
      });
    });
  });
});
});

;require.register("test/app/views/teachers/TeacherClassView.spec", function(exports, require, module) {
var CourseInstances, Courses, LevelSessions, Levels, Prepaids, TeacherClassView, Users, factories, forms, storage;

TeacherClassView = require('views/courses/TeacherClassView');

storage = require('core/storage');

forms = require('core/forms');

factories = require('test/app/factories');

Users = require('collections/Users');

Courses = require('collections/Courses');

Levels = require('collections/Levels');

LevelSessions = require('collections/LevelSessions');

CourseInstances = require('collections/CourseInstances');

Prepaids = require('collections/Prepaids');

describe('/teachers/classes/:handle', function() {});

describe('TeacherClassView', function() {
  return describe('when logged in', function() {
    beforeEach(function(done) {
      var expired, me;
      me = factories.makeUser({});
      this.courses = new Courses([
        factories.makeCourse({
          name: 'First Course'
        }), factories.makeCourse({
          name: 'Second Course'
        }), factories.makeCourse({
          name: 'Beta Course',
          releasePhase: 'beta'
        })
      ]);
      this.releasedCourses = new Courses(this.courses.where({
        releasePhase: 'released'
      }));
      this.available1 = factories.makePrepaid({
        maxRedeemers: 1
      });
      this.available2 = factories.makePrepaid({
        maxRedeemers: 1,
        type: 'starter_license',
        includedCourseIDs: [this.courses.at(0).id]
      });
      expired = factories.makePrepaid({
        endDate: moment().subtract(1, 'day').toISOString()
      });
      this.prepaids = new Prepaids([this.available1, this.available2, expired]);
      this.students = new Users([
        factories.makeUser({
          name: 'Abner'
        }), factories.makeUser({
          name: 'Abigail'
        }), factories.makeUser({
          name: 'Abby'
        }, {
          prepaid: this.available1
        }), factories.makeUser({
          name: 'Ben'
        }, {
          prepaid: this.available2
        }), factories.makeUser({
          name: 'Ned'
        }, {
          prepaid: expired
        }), factories.makeUser({
          name: 'Ebner'
        }, {
          prepaid: expired
        })
      ]);
      this.levels = new Levels(_.times(2, function() {
        return factories.makeLevel({
          concepts: ['basic_syntax', 'arguments', 'functions']
        });
      }));
      this.levels.push(factories.makeLevel({
        name: "Practice Level",
        concepts: ['basic_syntax', 'arguments', 'functions'],
        practice: true
      }));
      this.levels.push(factories.makeLevel({
        concepts: ['basic_syntax', 'arguments', 'functions'],
        primerLanguage: 'javascript'
      }));
      return _.defer(done);
    });
    describe('when python classroom', function() {
      beforeEach(function(done) {
        var i, len, level, ref, sessions;
        this.classroom = factories.makeClassroom({
          aceConfig: {
            language: 'python'
          }
        }, {
          courses: this.releasedCourses,
          members: this.students,
          levels: [this.levels, new Levels()]
        });
        this.courseInstances = new CourseInstances([
          factories.makeCourseInstance({}, {
            course: this.releasedCourses.first(),
            classroom: this.classroom,
            members: this.students
          }), factories.makeCourseInstance({}, {
            course: this.releasedCourses.last(),
            classroom: this.classroom,
            members: this.students
          })
        ]);
        sessions = [];
        this.finishedStudent = this.students.models[0];
        this.finishedStudentWithPractice = this.students.models[1];
        this.unfinishedStudent = this.students.last();
        ref = this.levels.models;
        for (i = 0, len = ref.length; i < len; i++) {
          level = ref[i];
          sessions.push(factories.makeLevelSession({
            state: {
              complete: true
            },
            playtime: 60
          }, {
            level: level,
            creator: this.finishedStudentWithPractice
          }));
          if (level.get('practice')) {
            continue;
          }
          sessions.push(factories.makeLevelSession({
            state: {
              complete: true
            },
            playtime: 60
          }, {
            level: level,
            creator: this.finishedStudent
          }));
        }
        sessions.push(factories.makeLevelSession({
          state: {
            complete: true
          },
          playtime: 60
        }, {
          level: this.levels.first(),
          creator: this.unfinishedStudent
        }));
        this.levelSessions = new LevelSessions(sessions);
        this.view = new TeacherClassView({}, this.courseInstances.first().id);
        this.view.classroom.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.classroom.stringify()
        });
        this.view.courses.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.courses.stringify()
        });
        this.view.courseInstances.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.courseInstances.stringify()
        });
        this.view.students.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.students.stringify()
        });
        this.view.classroom.sessions.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.levelSessions.stringify()
        });
        this.view.levels.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.levels.stringify()
        });
        this.view.prepaids.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.prepaids.stringify()
        });
        jasmine.demoEl(this.view.$el);
        return _.defer(done);
      });
      it('has contents', function() {
        return expect(this.view.$el.children().length).toBeGreaterThan(0);
      });
      describe('the Students tab', function() {
        beforeEach(function(done) {
          this.view.state.set('activeTab', '#students-tab');
          return _.defer(done);
        });
        return describe('bulk-assign controls', function() {
          return it('shows alert when assigning but no students are selected', function(done) {
            expect(this.view.$el.find('.no-students-selected').hasClass('visible')).toBe(false);
            this.view.$el.find('.assign-to-selected-students').click();
            return _.defer((function(_this) {
              return function() {
                expect(_this.view.$el.find('.no-students-selected').hasClass('visible')).toBe(true);
                return done();
              };
            })(this));
          });
        });
      });
      describe('the License Status tab', function() {
        beforeEach(function(done) {
          this.view.state.set('activeTab', '#license-status-tab');
          return _.defer(done);
        });
        return describe('Enroll button', function() {
          return it('calls enrollStudents with that user when clicked', function() {
            var users;
            spyOn(this.view, 'enrollStudents');
            this.view.$el.find('.enroll-student-button:first').click();
            expect(this.view.enrollStudents).toHaveBeenCalled();
            users = this.view.enrollStudents.calls.argsFor(0)[0];
            expect(users.size()).toBe(1);
            return expect(users.first().id).toBe(this.view.students.first().id);
          });
        });
      });
      return describe('Export Student Progress (CSV) button', function() {
        return it('downloads a CSV file', function() {
          spyOn(window, 'open').and.callFake((function(_this) {
            return function(encodedCSV) {
              var CSVHeader, i, len, line, lines, progressData, simplerLine;
              progressData = decodeURI(encodedCSV);
              CSVHeader = 'data:text\/csv;charset=utf-8,';
              expect(progressData).toMatch(new RegExp('^' + CSVHeader));
              lines = progressData.slice(CSVHeader.length).split('\n');
              expect(lines.length).toBe(_this.students.length + 1);
              for (i = 0, len = lines.length; i < len; i++) {
                line = lines[i];
                simplerLine = line.replace(/"[^"]+"/g, '""');
                expect(simplerLine.match(/[^,]+/g).length).toBe(5 + _this.releasedCourses.length * 2 + 1);
                if (simplerLine.match(new RegExp(_this.finishedStudent.get('email')))) {
                  expect(simplerLine).toMatch(/3,3 minutes,3,3 minutes,0/);
                } else if (simplerLine.match(new RegExp(_this.finishedStudentWithPractice.get('email')))) {
                  expect(simplerLine).toMatch(/3,3 minutes,3,3 minutes,0/);
                } else if (simplerLine.match(new RegExp(_this.unfinishedStudent.get('email')))) {
                  expect(simplerLine).toMatch(/1,a minute,1,a minute,0/);
                } else if (simplerLine.match(/@/)) {
                  expect(simplerLine).toMatch(/0,0,0/);
                }
              }
              return true;
            };
          })(this));
          this.view.$el.find('.export-student-progress-btn').click();
          return expect(window.open).toHaveBeenCalled();
        });
      });
    });
    describe('when javascript classroom', function() {
      beforeEach(function(done) {
        var classLanguage, i, len, level, ref, ref1, sessions;
        this.classroom = factories.makeClassroom({
          aceConfig: {
            language: 'javascript'
          }
        }, {
          courses: this.releasedCourses,
          members: this.students,
          levels: [this.levels, new Levels()]
        });
        this.courseInstances = new CourseInstances([
          factories.makeCourseInstance({}, {
            course: this.releasedCourses.first(),
            classroom: this.classroom,
            members: this.students
          }), factories.makeCourseInstance({}, {
            course: this.releasedCourses.last(),
            classroom: this.classroom,
            members: this.students
          })
        ]);
        sessions = [];
        this.finishedStudent = this.students.first();
        this.unfinishedStudent = this.students.last();
        classLanguage = (ref = this.classroom.get('aceConfig')) != null ? ref.language : void 0;
        ref1 = this.levels.models;
        for (i = 0, len = ref1.length; i < len; i++) {
          level = ref1[i];
          if (classLanguage && classLanguage === level.get('primerLanguage')) {
            continue;
          }
          if (level.get('practice')) {
            continue;
          }
          sessions.push(factories.makeLevelSession({
            state: {
              complete: true
            },
            playtime: 60
          }, {
            level: level,
            creator: this.finishedStudent
          }));
        }
        sessions.push(factories.makeLevelSession({
          state: {
            complete: true
          },
          playtime: 60
        }, {
          level: this.levels.first(),
          creator: this.unfinishedStudent
        }));
        this.levelSessions = new LevelSessions(sessions);
        this.view = new TeacherClassView({}, this.courseInstances.first().id);
        this.view.classroom.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.classroom.stringify()
        });
        this.view.courses.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.courses.stringify()
        });
        this.view.courseInstances.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.courseInstances.stringify()
        });
        this.view.students.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.students.stringify()
        });
        this.view.classroom.sessions.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.levelSessions.stringify()
        });
        this.view.levels.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.levels.stringify()
        });
        this.view.prepaids.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.prepaids.stringify()
        });
        jasmine.demoEl(this.view.$el);
        return _.defer(done);
      });
      return describe('Export Student Progress (CSV) button', function() {
        return it('downloads a CSV file', function() {
          spyOn(window, 'open').and.callFake((function(_this) {
            return function(encodedCSV) {
              var CSVHeader, i, len, line, lines, progressData, simplerLine;
              progressData = decodeURI(encodedCSV);
              CSVHeader = 'data:text\/csv;charset=utf-8,';
              expect(progressData).toMatch(new RegExp('^' + CSVHeader));
              lines = progressData.slice(CSVHeader.length).split('\n');
              expect(lines.length).toBe(_this.students.length + 1);
              for (i = 0, len = lines.length; i < len; i++) {
                line = lines[i];
                simplerLine = line.replace(/"[^"]+"/g, '""');
                expect(simplerLine.match(/[^,]+/g).length).toBe(5 + _this.releasedCourses.length * 2 + 1);
                if (simplerLine.match(new RegExp(_this.finishedStudent.get('email')))) {
                  expect(simplerLine).toMatch(/2,2 minutes,2,2 minutes,0/);
                } else if (simplerLine.match(new RegExp(_this.unfinishedStudent.get('email')))) {
                  expect(simplerLine).toMatch(/1,a minute,1,a minute,0/);
                } else if (simplerLine.match(/@/)) {
                  expect(simplerLine).toMatch(/0,0,0/);
                }
              }
              return true;
            };
          })(this));
          this.view.$el.find('.export-student-progress-btn').click();
          return expect(window.open).toHaveBeenCalled();
        });
      });
    });
    describe('.assignCourse(courseID, members)', function() {
      beforeEach(function(done) {
        var classLanguage, i, len, level, ref, ref1, sessions;
        this.classroom = factories.makeClassroom({
          aceConfig: {
            language: 'javascript'
          }
        }, {
          courses: this.releasedCourses,
          members: this.students,
          levels: [this.levels, new Levels()]
        });
        this.courseInstances = new CourseInstances([
          factories.makeCourseInstance({}, {
            course: this.releasedCourses.first(),
            classroom: this.classroom,
            members: new Users()
          }), factories.makeCourseInstance({}, {
            course: this.releasedCourses.last(),
            classroom: this.classroom,
            members: new Users()
          })
        ]);
        sessions = [];
        this.finishedStudent = this.students.first();
        this.unfinishedStudent = this.students.last();
        classLanguage = (ref = this.classroom.get('aceConfig')) != null ? ref.language : void 0;
        ref1 = this.levels.models;
        for (i = 0, len = ref1.length; i < len; i++) {
          level = ref1[i];
          if (classLanguage && classLanguage === level.get('primerLanguage')) {
            continue;
          }
          sessions.push(factories.makeLevelSession({
            state: {
              complete: true
            },
            playtime: 60
          }, {
            level: level,
            creator: this.finishedStudent
          }));
        }
        sessions.push(factories.makeLevelSession({
          state: {
            complete: true
          },
          playtime: 60
        }, {
          level: this.levels.first(),
          creator: this.unfinishedStudent
        }));
        this.levelSessions = new LevelSessions(sessions);
        this.view = new TeacherClassView({}, this.courseInstances.first().id);
        this.view.classroom.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.classroom.stringify()
        });
        this.view.courses.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.courses.stringify()
        });
        this.view.courseInstances.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.courseInstances.stringify()
        });
        this.view.students.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.students.stringify()
        });
        this.view.classroom.sessions.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.levelSessions.stringify()
        });
        this.view.levels.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.levels.stringify()
        });
        this.view.prepaids.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.prepaids.stringify()
        });
        jasmine.demoEl(this.view.$el);
        return _.defer(done);
      });
      return describe('when the student has a starter license', function() {
        return describe('and the course is NOT covered by starter licenses', function() {
          beforeEach(function(done) {
            spyOn(this.view.prepaids.at(1), 'redeem');
            this.starterStudent = this.students.find(function(s) {
              return s.prepaidType() === 'starter_license';
            });
            this.view.assignCourse(this.courses.at(1).id, [this.starterStudent.id]);
            return this.view.wait('begin-redeem-for-assign-course').then(done);
          });
          return it('replaces their license with a full license', function(done) {
            expect(this.view.prepaids.at(1).redeem).toHaveBeenCalled();
            return done();
          });
        });
      });
    });
    return describe('.assignCourse(courseID, members)', function() {
      beforeEach(function(done) {
        var classLanguage, i, len, level, ref, ref1, sessions;
        this.classroom = factories.makeClassroom({
          aceConfig: {
            language: 'javascript'
          }
        }, {
          courses: this.releasedCourses,
          members: this.students,
          levels: [this.levels, new Levels()]
        });
        this.courseInstances = new CourseInstances([
          factories.makeCourseInstance({}, {
            course: this.releasedCourses.first(),
            classroom: this.classroom,
            members: this.students
          }), factories.makeCourseInstance({}, {
            course: this.releasedCourses.last(),
            classroom: this.classroom,
            members: this.students
          })
        ]);
        sessions = [];
        this.finishedStudent = this.students.first();
        this.unfinishedStudent = this.students.last();
        classLanguage = (ref = this.classroom.get('aceConfig')) != null ? ref.language : void 0;
        ref1 = this.levels.models;
        for (i = 0, len = ref1.length; i < len; i++) {
          level = ref1[i];
          if (classLanguage && classLanguage === level.get('primerLanguage')) {
            continue;
          }
          sessions.push(factories.makeLevelSession({
            state: {
              complete: true
            },
            playtime: 60
          }, {
            level: level,
            creator: this.finishedStudent
          }));
        }
        sessions.push(factories.makeLevelSession({
          state: {
            complete: true
          },
          playtime: 60
        }, {
          level: this.levels.first(),
          creator: this.unfinishedStudent
        }));
        this.levelSessions = new LevelSessions(sessions);
        this.view = new TeacherClassView({}, this.courseInstances.first().id);
        this.view.classroom.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.classroom.stringify()
        });
        this.view.courses.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.courses.stringify()
        });
        this.view.courseInstances.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.courseInstances.stringify()
        });
        this.view.students.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.students.stringify()
        });
        this.view.classroom.sessions.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.levelSessions.stringify()
        });
        this.view.levels.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.levels.stringify()
        });
        this.view.prepaids.fakeRequests[0].respondWith({
          status: 200,
          responseText: this.prepaids.stringify()
        });
        jasmine.demoEl(this.view.$el);
        return _.defer(done);
      });
      describe('when no course instance exists for the given course', function() {
        beforeEach(function(done) {
          this.view.courseInstances.reset();
          this.view.assignCourse(this.courses.first().id, this.students.pluck('_id').slice(0, 1));
          return this.view.courseInstances.wait('add').then(done);
        });
        it('creates the missing course instance', function() {
          var request;
          request = jasmine.Ajax.requests.mostRecent();
          expect(request.method).toBe('POST');
          return expect(request.url).toBe('/db/course_instance');
        });
        return it('shows a noty if the course instance request fails', function(done) {
          var request;
          spyOn(window, 'noty').and.callFake(done);
          request = jasmine.Ajax.requests.mostRecent();
          return request.respondWith({
            status: 500,
            responseText: JSON.stringify({
              message: "Internal Server Error"
            })
          });
        });
      });
      describe('when the course is not free and some students are not enrolled', function() {
        beforeEach(function(done) {
          this.view.assignCourse(this.courses.first().id, this.students.pluck('_id').slice(0, 2));
          return this.view.wait('begin-redeem-for-assign-course').then(done);
        });
        it('enrolls all unenrolled students', function(done) {
          var numberOfRequests;
          numberOfRequests = _(this.view.prepaids.models).map(function(prepaid) {
            return prepaid.fakeRequests.length;
          }).reduce(function(num, value) {
            return num + value;
          });
          expect(numberOfRequests).toBe(2);
          return done();
        });
        return it('shows a noty if a redeem request fails', function(done) {
          var request;
          spyOn(window, 'noty').and.callFake(done);
          request = jasmine.Ajax.requests.mostRecent();
          return request.respondWith({
            status: 500,
            responseText: JSON.stringify({
              message: "Internal Server Error"
            })
          });
        });
      });
      describe('when there are not enough licenses available', function() {
        beforeEach(function(done) {
          this.view.assignCourse(this.courses.first().id, this.students.pluck('_id'));
          return spyOn(this.view, 'openModalView').and.callFake(done);
        });
        return it('shows CoursesNotAssignedModal', function() {
          return expect(this.view.openModalView).toHaveBeenCalled();
        });
      });
      return describe('when there is nothing else to do first', function() {
        beforeEach(function(done) {
          this.courseInstance = this.view.courseInstances.first();
          this.courseInstance.set('members', []);
          this.view.assignCourse(this.courseInstance.get('courseID'), this.students.pluck('_id').slice(2, 4));
          return this.view.wait('begin-assign-course').then(done);
        });
        it('adds students to the course instances', function() {
          var request;
          request = jasmine.Ajax.requests.mostRecent();
          expect(request.url).toBe("/db/course_instance/" + this.courseInstance.id + "/members");
          return expect(request.method).toBe('POST');
        });
        return it('shows a noty if POSTing students fails', function(done) {
          var request;
          spyOn(window, 'noty').and.callFake(done);
          request = jasmine.Ajax.requests.mostRecent();
          return request.respondWith({
            status: 500,
            responseText: JSON.stringify({
              message: "Internal Server Error"
            })
          });
        });
      });
    });
  });
});
});

;
//# sourceMappingURL=/javascripts/app/tests.js.map