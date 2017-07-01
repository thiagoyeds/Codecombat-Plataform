require.register("templates/play/menu/save-load-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"row\"><div class=\"col-sm-4\"><div data-toggle=\"buttons\" id=\"save-granularity-toggle\" class=\"btn-group\"><label class=\"btn btn-primary active\"><input type=\"radio\" checked=\"checked\" value=\"level-sessions\"/><span data-i18n=\"save_load.granularity_saved_games\" title=\"Manage your saved games\"></span></label><label class=\"btn btn-primary\"><input type=\"radio\" value=\"change-history\"/><span data-i18n=\"save_load.granularity_change_history\" title=\"See your autosaved code edit history\"></span></label></div><div class=\"save-list level-sessions\"><ul class=\"list-group\"><li class=\"list-group-item\">Save 001</li><li class=\"list-group-item\">Greedy Algorithm</li><li class=\"list-group-item\">Defensive Strategy</li></ul></div><div class=\"save-list change-history secret\"><ul class=\"list-group\"><li class=\"list-group-item\">--item switches yeah--</li><li class=\"list-group-item\">Autosaved 17:05</li><li class=\"list-group-item\">Autosaved 14:45</li><li class=\"list-group-item\">Autosaved 16:40</li><li class=\"list-group-item\">Autosaved 5:05</li><li class=\"list-group-item\">Autosaved 5:00</li><li class=\"list-group-item\">--item switches yeah--</li><li class=\"list-group-item\">Autosaved 4:50</li><li class=\"list-group-item\">Autosaved 7/7/14</li><li class=\"list-group-item\">Autosaved 7/7/14</li></ul></div></div><div class=\"col-sm-8\"><div class=\"save-pane level-sessions\"><img src=\"/images/pages/game-menu/save-load-stub.png\"/><h3>Interactions:</h3><ul><li>On the left is a flat list of saves for this level. Click one and the stuff on the right appears.</li><li>There are name and description input boxes. Editing them auto updates the save on the left.</li><li>There are also items showing what the current equipment is, and below the current code. Neither are editable.</li><li>If you click the red box on any save, or click the delete button for the selected save, it asks for confirmation, then deletes.</li><li>Click the new save button: current code, items and empty name/description appear on the right, and a new save slot appears at the top of the list on the left, which is selected. Works like editing otherwise.</li></ul></div><div class=\"save-pane change-history secret\"><img src=\"/images/pages/game-menu/save-load-history-stub.png\"/><h3>Interactions</h3><ul><li>Similar to WebStorm. Click ‘history’ tab in the upper left of the save/load screen to switch to this view.</li><li>Click the left row of VCS versions, and the hero, language, items and code for it shows on the right.</li><li>Click revert to set the code back to the version of the code on the left. Modal closes with the new code.</li><li>Might experiment with showing diffs with difflib. More of an interface issue than a showing-diff issue.</li></ul></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/play/menu/SaveLoadView", function(exports, require, module) {
var CocoView, SaveLoadView, ThangType, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/menu/save-load-view');

me = require('core/auth').me;

ThangType = require('models/ThangType');

module.exports = SaveLoadView = (function(superClass) {
  extend(SaveLoadView, superClass);

  function SaveLoadView() {
    return SaveLoadView.__super__.constructor.apply(this, arguments);
  }

  SaveLoadView.prototype.id = 'save-load-view';

  SaveLoadView.prototype.className = 'tab-pane';

  SaveLoadView.prototype.template = template;

  SaveLoadView.prototype.events = {
    'change #save-granularity-toggle input': 'onSaveGranularityChanged'
  };

  SaveLoadView.prototype.afterRender = function() {
    return SaveLoadView.__super__.afterRender.call(this);
  };

  SaveLoadView.prototype.onSaveGranularityChanged = function(e) {
    var toShow;
    this.playSound('menu-button-click');
    toShow = $(e.target).val();
    this.$el.find('.save-list, .save-pane').hide();
    return this.$el.find('.save-list.' + toShow + ', .save-pane.' + toShow).show();
  };

  return SaveLoadView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/menu/SaveLoadView.js.map