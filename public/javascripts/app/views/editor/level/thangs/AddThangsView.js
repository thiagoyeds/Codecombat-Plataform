require.register("views/editor/level/thangs/AddThangsView", function(exports, require, module) {
var AddThangsView, CocoCollection, CocoView, ThangType, ThangTypeSearchCollection, add_thangs_template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CocoView = require('views/core/CocoView');

add_thangs_template = require('templates/editor/level/add-thangs-view');

ThangType = require('models/ThangType');

CocoCollection = require('collections/CocoCollection');

ThangTypeSearchCollection = (function(superClass) {
  extend(ThangTypeSearchCollection, superClass);

  function ThangTypeSearchCollection() {
    return ThangTypeSearchCollection.__super__.constructor.apply(this, arguments);
  }

  ThangTypeSearchCollection.prototype.url = '/db/thang.type?project=original,name,version,description,slug,kind,rasterIcon';

  ThangTypeSearchCollection.prototype.model = ThangType;

  ThangTypeSearchCollection.prototype.addTerm = function(term) {
    if (term) {
      return this.url += "&term=" + term;
    }
  };

  return ThangTypeSearchCollection;

})(CocoCollection);

module.exports = AddThangsView = (function(superClass) {
  extend(AddThangsView, superClass);

  AddThangsView.prototype.id = 'add-thangs-view';

  AddThangsView.prototype.className = 'add-thangs-palette';

  AddThangsView.prototype.template = add_thangs_template;

  AddThangsView.prototype.events = {
    'keyup input#thang-search': 'runSearch'
  };

  function AddThangsView(options) {
    this.runSearch = bind(this.runSearch, this);
    AddThangsView.__super__.constructor.call(this, options);
    this.world = options.world;
    this.thangTypes = this.supermodel.loadCollection(new ThangTypeSearchCollection(), 'thangs').model;
  }

  AddThangsView.prototype.getRenderData = function(context) {
    var group, groupMap, groupName, groups, i, j, kind, len, len1, models, ref, someThangTypes, thangType, thangTypes;
    if (context == null) {
      context = {};
    }
    context = AddThangsView.__super__.getRenderData.call(this, context);
    if (this.searchModels) {
      models = this.searchModels;
    } else {
      models = this.supermodel.getModels(ThangType);
    }
    thangTypes = _.uniq(models, false, function(thangType) {
      return thangType.get('original');
    });
    thangTypes = _.reject(thangTypes, function(thangType) {
      var ref;
      return (ref = thangType.get('kind')) === 'Mark' || ref === 'Item' || ref === (void 0);
    });
    groupMap = {};
    for (i = 0, len = thangTypes.length; i < len; i++) {
      thangType = thangTypes[i];
      kind = thangType.get('kind');
      if (groupMap[kind] == null) {
        groupMap[kind] = [];
      }
      groupMap[kind].push(thangType);
    }
    groups = [];
    ref = Object.keys(groupMap).sort();
    for (j = 0, len1 = ref.length; j < len1; j++) {
      groupName = ref[j];
      someThangTypes = groupMap[groupName];
      someThangTypes = _.sortBy(someThangTypes, function(thangType) {
        return thangType.get('name');
      });
      group = {
        name: groupName,
        thangs: someThangTypes
      };
      groups.push(group);
    }
    groups = _.sortBy(groups, function(group) {
      var index;
      index = ['Wall', 'Floor', 'Unit', 'Doodad', 'Misc'].indexOf(group.name);
      if (index === -1) {
        return 9001;
      } else {
        return index;
      }
    });
    context.thangTypes = thangTypes;
    context.groups = groups;
    return context;
  };

  AddThangsView.prototype.afterRender = function() {
    AddThangsView.__super__.afterRender.call(this);
    return this.buildAddThangPopovers();
  };

  AddThangsView.prototype.buildAddThangPopovers = function() {
    return this.$el.find('#thangs-list .add-thang-palette-icon').addClass('has-tooltip').tooltip({
      container: 'body',
      animation: false
    });
  };

  AddThangsView.prototype.runSearch = function(e) {
    var term;
    if ((e != null ? e.which : void 0) === 27) {
      this.onEscapePressed();
    }
    term = this.$el.find('input#thang-search').val();
    if (term === this.lastSearch) {
      return;
    }
    this.searchModels = this.thangTypes.filter(function(model) {
      var regExp;
      if (!term) {
        return true;
      }
      regExp = new RegExp(term, 'i');
      return model.get('name').match(regExp);
    });
    this.render();
    this.$el.find('input#thang-search').focus().val(term);
    return this.lastSearch = term;
  };

  AddThangsView.prototype.onEscapePressed = function() {
    this.$el.find('input#thang-search').val('');
    return this.runSearch;
  };

  return AddThangsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/thangs/AddThangsView.js.map