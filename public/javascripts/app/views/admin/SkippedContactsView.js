require.register("views/admin/SkippedContactsView", function(exports, require, module) {
var RootView, SkippedContactInfo, SkippedContacts, SkippedContactsComponent, SkippedContactsView, User, skippedContactApi, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/base-flat');

SkippedContacts = require('collections/SkippedContacts');

User = require('models/User');

require('vendor/co');

require('vendor/vue');

require('vendor/vuex');

skippedContactApi = {
  setArchived: function(_id, archived) {
    return $.ajax({
      url: '/db/skipped-contact/' + _id,
      type: 'PUT',
      data: {
        _id: _id,
        archived: archived
      }
    });
  }
};

SkippedContactInfo = {
  template: require('templates/admin/skipped-contacts/skipped-contact-info')(),
  props: {
    skippedContact: {
      type: Object,
      "default": function() {
        return {};
      }
    },
    user: {
      type: Object,
      "default": function() {
        return void 0;
      }
    }
  },
  computed: {
    noteData: function() {
      var i, len, noteData, prop, props;
      noteData = "";
      this.skippedContact;
      if (this.skippedContact.trialRequest.properties) {
        props = this.skippedContact.trialRequest.properties;
        if (props.name) {
          noteData += props.name + "\n";
        }
        if (props.email) {
          noteData += "demo_email: " + (props.email.toLowerCase()) + "\n";
        }
        if (this.skippedContact.trialRequest.created) {
          noteData += "demo_request: " + this.skippedContact.trialRequest.created + "\n";
        }
        if (props.educationLevel) {
          noteData += "demo_educationLevel: " + (props.educationLevel.join(', ')) + "\n";
        }
        for (i = 0, len = props.length; i < len; i++) {
          prop = props[i];
          if (['email', 'educationLevel', 'created'].indexOf(prop) >= 0) {
            continue;
          }
          noteData += "demo_" + prop + ": " + props[prop] + "\n";
        }
      }
      if (this.skippedContact.intercomUrl) {
        noteData += "intercom_url: " + this.skippedContact.intercomUrl + "\n";
      }
      if (this.skippedContact.intercomLastSeen) {
        noteData += "intercom_lastSeen: " + this.skippedContact.intercomLastSeen + "\n";
      }
      if (this.skippedContact.intercomSessionCount) {
        noteData += "intercom_sessionCount: " + this.skippedContact.intercomSessionCount + "\n";
      }
      if (this.user) {
        noteData += "coco_userID: " + this.user._id + "\n";
        if (this.user.firstName) {
          noteData += "coco_firstName: " + this.user.firstName + "\n";
        }
        if (this.user.lastName) {
          noteData += "coco_lastName: " + this.user.lastName + "\n";
        }
        if (this.user.name) {
          noteData += "coco_name: " + this.user.name + "\n";
        }
        if (this.user.emaillower) {
          noteData += "coco_email: " + this.user.emailLower + "\n";
        }
        if (this.user.gender) {
          noteData += "coco_gender: " + this.user.gender + "\n";
        }
        if (this.user.lastLevel) {
          noteData += "coco_lastLevel: " + this.user.lastLevel + "\n";
        }
        if (this.user.role) {
          noteData += "coco_role: " + this.user.role + "\n";
        }
        if (this.user.schoolName) {
          noteData += "coco_schoolName: " + this.user.schoolName + "\n";
        }
        if (this.user.stats && this.user.stats.gamesCompleted) {
          noteData += "coco_gamesCompleted: " + this.user.stats.gamesCompleted + "\n";
        }
        noteData += "coco_preferredLanguage: " + (this.user.preferredLanguage || 'en-US') + "\n";
      }
      if (this.numClassrooms) {
        noteData += "coco_numClassrooms: " + skippedContact.numClassrooms + "\n";
      }
      if (this.numStudents) {
        noteData += "coco_numStudents: " + skippedContact.numStudents + "\n";
      }
      return noteData;
    },
    queryString: function() {
      var leadName, query, trialRequest;
      if (this.skippedContact.trialRequest) {
        trialRequest = this.skippedContact.trialRequest;
        leadName = trialRequest.properties.nces_name || trialRequest.properties.organization || trialRequest.properties.school || trialRequest.properties.district || trialRequest.properties.nces_district || trialRequest.properties.email;
        query = "name:\"" + leadName + "\"";
        if (trialRequest.properties.nces_school_id) {
          query = "custom.demo_nces_id:\"" + trialRequest.properties.nces_school_id + "\"";
        } else if (trialRequest.properties.nces_district_id) {
          query = "custom.demo_nces_district_id:\"" + trialRequest.properties.nces_district_id + "\" custom.demo_nces_id:\"\" custom.demo_nces_name:\"\"";
        }
        return query;
      }
    },
    queryURL: function() {
      return "https://app.close.io/search/" + encodeURIComponent(this.queryString);
    }
  },
  methods: {
    onClickArchiveContact: function(e) {
      var archived;
      archived = true;
      return this.$store.dispatch('archiveContact', {
        skippedContact: this.skippedContact,
        archived: archived
      });
    },
    onClickUnarchiveContact: function(e) {
      var archived;
      archived = false;
      return this.$store.dispatch('archiveContact', {
        skippedContact: this.skippedContact,
        archived: archived
      });
    }
  }
};

SkippedContactsComponent = Vue.extend({
  template: require('templates/admin/skipped-contacts/skipped-contacts-view')(),
  data: function() {
    return {
      sortOrder: 'date (ascending)',
      showArchived: true
    };
  },
  computed: _.assign({}, Vuex.mapState(['skippedContacts', 'users']), Vuex.mapGetters(['numArchivedUsers']), {
    sortedContacts: function(state) {
      switch (state.sortOrder) {
        case 'date (ascending)':
          return _(state.skippedContacts).sortBy(function(s) {
            return s.trialRequest.created;
          }).value();
        case 'date (descending)':
          return _(state.skippedContacts).sortBy(function(s) {
            return s.trialRequest.created;
          }).reverse().value();
        case 'email':
          return _(state.skippedContacts).sortBy(function(s) {
            return s.trialRequest.properties.email;
          }).value();
        case 'archived':
          return _(state.skippedContacts).sortBy(function(s) {
            return !!s.archived;
          }).reverse().value();
        case 'unarchived':
          return _(state.skippedContacts).sortBy(function(s) {
            return !!s.archived;
          }).value();
        default:
          return state.skippedContacts;
      }
    }
  }),
  components: {
    'skipped-contact-info': SkippedContactInfo
  },
  created: co.wrap(function*() {
    var skippedContacts;
    skippedContacts = new SkippedContacts();
    (yield skippedContacts.fetch());
    skippedContacts = skippedContacts.toJSON();
    this.$store.commit('loadContacts', skippedContacts);
    return (yield skippedContacts.map(co.wrap((function(_this) {
      return function*(skippedContact) {
        var index, user;
        user = new User({
          _id: skippedContact.trialRequest.applicant
        });
        index = _.findIndex(_this.skippedContacts, function(s) {
          return s._id === skippedContact._id;
        });
        (yield user.fetch());
        return _this.$store.commit('addUser', {
          skippedContact: skippedContact,
          user: user.toJSON()
        });
      };
    })(this))));
  })
});

module.exports = SkippedContactsView = (function(superClass) {
  extend(SkippedContactsView, superClass);

  function SkippedContactsView() {
    return SkippedContactsView.__super__.constructor.apply(this, arguments);
  }

  SkippedContactsView.prototype.id = 'skipped-contacts-view';

  SkippedContactsView.prototype.template = template;

  SkippedContactsView.prototype.initialize = function() {
    SkippedContactsView.__super__.initialize.apply(this, arguments);
    return this.store = new Vuex.Store({
      state: {
        skippedContacts: [],
        users: {}
      },
      actions: {
        archiveContact: function(arg, arg1) {
          var archived, commit, skippedContact, state;
          commit = arg.commit, state = arg.state;
          skippedContact = arg1.skippedContact, archived = arg1.archived;
          return skippedContactApi.setArchived(skippedContact._id, archived).then(function() {
            return commit('archiveContact', {
              skippedContact: skippedContact,
              archived: archived
            });
          });
        }
      },
      strict: !application.isProduction(),
      mutations: {
        archiveContact: function(state, arg) {
          var archived, index, oldContact, skippedContact;
          skippedContact = arg.skippedContact, archived = arg.archived;
          index = _.findIndex(state.skippedContacts, function(s) {
            return s._id === skippedContact._id;
          });
          oldContact = state.skippedContacts[index];
          return Vue.set(state.skippedContacts, index, _.assign({}, oldContact, {
            archived: archived
          }));
        },
        addUser: function(state, arg) {
          var skippedContact, user;
          skippedContact = arg.skippedContact, user = arg.user;
          return Vue.set(state.users, skippedContact._id, user);
        },
        loadContacts: function(state, skippedContacts) {
          return state.skippedContacts = skippedContacts;
        }
      },
      getters: {
        numArchivedUsers: function(state) {
          return _.countBy(state.skippedContacts, function(contact) {
            return contact.archived;
          })[true];
        }
      }
    });
  };

  SkippedContactsView.prototype.afterRender = function() {
    var ref;
    if ((ref = this.vueComponent) != null) {
      ref.$destroy();
    }
    this.vueComponent = new SkippedContactsComponent({
      el: this.$el.find('#site-content-area')[0],
      store: this.store
    });
    return SkippedContactsView.__super__.afterRender.apply(this, arguments);
  };

  return SkippedContactsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/SkippedContactsView.js.map