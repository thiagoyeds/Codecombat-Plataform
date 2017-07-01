require.register("core/social-handlers/GitHubHandler", function(exports, require, module) {
var CocoClass, GitHubHandler, me, storage,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

me = require('core/auth').me;

storage = require('core/storage');

module.exports = GitHubHandler = (function(superClass) {
  extend(GitHubHandler, superClass);

  GitHubHandler.prototype.scopes = 'user:email';

  GitHubHandler.prototype.subscriptions = {
    'auth:log-in-with-github': 'commenceGitHubLogin'
  };

  function GitHubHandler() {
    GitHubHandler.__super__.constructor.apply(this, arguments);
    this.clientID = application.isProduction() ? '9b405bf5fb84590d1f02' : 'fd5c9d34eb171131bc87';
    this.redirectURI = application.isProduction() ? 'http://codecombat.com/github/auth_callback' : 'http://localhost:3000/github/auth_callback';
  }

  GitHubHandler.prototype.commenceGitHubLogin = function(e) {
    var request;
    request = {
      scope: this.scopes,
      client_id: this.clientID,
      redirect_uri: this.redirectURI
    };
    return location.href = "https://github.com/login/oauth/authorize?" + $.param(request);
  };

  return GitHubHandler;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/core/social-handlers/GitHubHandler.js.map