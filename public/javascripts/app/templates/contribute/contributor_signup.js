require.register("templates/contribute/contributor_signup", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),contributorClassName = locals_.contributorClassName;buf.push("<label" + (jade.attrs({ 'for':(contributorClassName), "class": [('checkbox'),('well')] }, {"for":true})) + "><input" + (jade.attrs({ 'type':('checkbox'), 'name':(contributorClassName), 'id':(contributorClassName) }, {"type":true,"name":true,"id":true})) + "/><span" + (jade.attrs({ 'data-i18n':("contribute." + (contributorClassName) + "_subscribe_desc") }, {"data-i18n":true})) + "></span><div class=\"saved-notification\"><span class=\"spr\">✓</span><span data-i18n=\"save_load.granularity_saved_games\">Saved</span></div></label>");;return buf.join("");
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

;
//# sourceMappingURL=/javascripts/app/templates/contribute/contributor_signup.js.map