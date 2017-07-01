require.register("core/services/twitter", function(exports, require, module) {
var initializeTwitter;

module.exports = initializeTwitter = function() {
  return (function(d, s, id) {
    var fjs, js, p;
    js = void 0;
    fjs = d.getElementsByTagName(s)[0];
    p = (/^http:/.test(d.location) ? 'http' : 'https');
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = p + '://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  })(document, 'script', 'twitter-wjs');
};
});

;
//# sourceMappingURL=/javascripts/app/core/services/twitter.js.map