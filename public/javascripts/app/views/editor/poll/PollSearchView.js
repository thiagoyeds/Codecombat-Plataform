require.register("views/editor/poll/PollSearchView", function(exports, require, module) {
var PollSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = PollSearchView = (function(superClass) {
  extend(PollSearchView, superClass);

  function PollSearchView() {
    return PollSearchView.__super__.constructor.apply(this, arguments);
  }

  PollSearchView.prototype.id = 'editor-poll-home-view';

  PollSearchView.prototype.modelLabel = 'Poll';

  PollSearchView.prototype.model = require('models/Poll');

  PollSearchView.prototype.modelURL = '/db/poll';

  PollSearchView.prototype.tableTemplate = require('templates/editor/poll/poll-search-table');

  PollSearchView.prototype.projection = ['name', 'description', 'slug', 'priority', 'created'];

  PollSearchView.prototype.getRenderData = function() {
    var context;
    context = PollSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.poll_title';
    context.currentNew = 'editor.new_poll_title';
    context.currentNewSignup = 'editor.new_poll_title_login';
    context.currentSearch = 'editor.poll_search_title';
    context.newModelsAdminOnly = true;
    if (!me.isAdmin()) {
      context.unauthorized = true;
    }
    return context;
  };

  return PollSearchView;

})(SearchView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/poll/PollSearchView.js.map