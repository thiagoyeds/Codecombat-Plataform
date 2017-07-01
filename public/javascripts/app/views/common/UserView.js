require.register("views/common/UserView", function(exports, require, module) {
var RootView, User, UserView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/common/user');

User = require('models/User');

module.exports = UserView = (function(superClass) {
  extend(UserView, superClass);

  UserView.prototype.template = template;

  UserView.prototype.className = 'user-view';

  UserView.prototype.viewName = null;

  function UserView(userID, options) {
    this.userID = userID;
    UserView.__super__.constructor.call(this, options);
    this.listenTo(this, 'userNotFound', this.ifUserNotFound);
    this.fetchUser(this.userID);
  }

  UserView.prototype.fetchUser = function() {
    if (this.isMe()) {
      this.user = me;
      this.onLoaded();
    }
    this.user = new User({
      _id: this.userID
    });
    return this.supermodel.loadModel(this.user, {
      cache: false
    });
  };

  UserView.prototype.isMe = function() {
    var ref;
    return (ref = this.userID) === me.id || ref === me.get('slug');
  };

  UserView.prototype.onLoaded = function() {
    var ref;
    if (!((ref = this.user) != null ? ref.isAnonymous() : void 0)) {
      this.userData = this.user;
    }
    this.userID = this.user.id;
    return UserView.__super__.onLoaded.call(this);
  };

  UserView.prototype.ifUserNotFound = function() {
    console.warn('user not found');
    return this.render();
  };

  return UserView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/common/UserView.js.map