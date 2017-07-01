require.register("templates/contribute/contributor_list", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),contributors = locals_.contributors,contributorClassName = locals_.contributorClassName;buf.push("<div class=\"row\">");
if ( contributors)
{
// iterate contributors
;(function(){
  var $$obj = contributors;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var contributor = $$obj[$index];

buf.push("<div class=\"col-xs-6 col-md-3\"><div class=\"thumbnail\">");
var src = "/images/pages/contribute/" + contributorClassName + ".png";
if(contributor.avatar)
src = src.replace(contributorClassName, contributorClassName + "/" + contributor.avatar + "_small");
if(contributor.id)
src = "/db/user/" + contributor.id + "/avatar?s=100&fallback=" + src;
buf.push("<a" + (jade.attrs({ 'href':(contributor.github ? "https://github.com/codecombat/codecombat/commits?author=" + contributor.github : null), "class": [(contributor.github ? 'has-github' : '')] }, {"href":true,"class":true})) + "><img" + (jade.attrs({ 'src':(src), 'alt':(contributor.name), "class": [('img-responsive')] }, {"src":true,"alt":true})) + "/><div class=\"caption\"><h4>" + (jade.escape(null == (jade.interp = contributor.name) ? "" : jade.interp)) + "</h4></div></a></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var contributor = $$obj[$index];

buf.push("<div class=\"col-xs-6 col-md-3\"><div class=\"thumbnail\">");
var src = "/images/pages/contribute/" + contributorClassName + ".png";
if(contributor.avatar)
src = src.replace(contributorClassName, contributorClassName + "/" + contributor.avatar + "_small");
if(contributor.id)
src = "/db/user/" + contributor.id + "/avatar?s=100&fallback=" + src;
buf.push("<a" + (jade.attrs({ 'href':(contributor.github ? "https://github.com/codecombat/codecombat/commits?author=" + contributor.github : null), "class": [(contributor.github ? 'has-github' : '')] }, {"href":true,"class":true})) + "><img" + (jade.attrs({ 'src':(src), 'alt':(contributor.name), "class": [('img-responsive')] }, {"src":true,"alt":true})) + "/><div class=\"caption\"><h4>" + (jade.escape(null == (jade.interp = contributor.name) ? "" : jade.interp)) + "</h4></div></a></div></div>");
    }

  }
}).call(this);

}
buf.push("</div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/contribute/contributor_list.js.map