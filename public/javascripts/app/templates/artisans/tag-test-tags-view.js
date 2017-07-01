require.register("templates/artisans/tag-test-tags-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;if ( view.error)
{
buf.push("<div class=\"alert alert-danger\"><pre>" + (jade.escape((jade.interp = view.error) == null ? '' : jade.interp)) + "</pre></div>");
}
buf.push("<div>");
// iterate (view.tags || [])
;(function(){
  var $$obj = (view.tags || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var tag = $$obj[$index];

buf.push("<span style=\"margin: 5px; float: left; line-height: 1.2em\" class=\"label label-primary\">" + (jade.escape((jade.interp = tag) == null ? '' : jade.interp)) + "</span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var tag = $$obj[$index];

buf.push("<span style=\"margin: 5px; float: left; line-height: 1.2em\" class=\"label label-primary\">" + (jade.escape((jade.interp = tag) == null ? '' : jade.interp)) + "</span>");
    }

  }
}).call(this);

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
//# sourceMappingURL=/javascripts/app/templates/artisans/tag-test-tags-view.js.map