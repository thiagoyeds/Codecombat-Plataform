require.register("templates/core/auth-modal-gplus-checklist", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),steps = locals_.steps;buf.push("<ul class=\"list-group\">");
// iterate steps
;(function(){
  var $$obj = steps;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var step = $$obj[$index];

buf.push("<li" + (jade.attrs({ "class": [('list-group-item'),(step.done ? 'list-group-item-success' : 'list-group-item-warning')] }, {"class":true})) + "><span" + (jade.attrs({ 'data-i18n':(step.i18n) }, {"data-i18n":true})) + "></span>");
if ( step.done)
{
buf.push("<span class=\"glyphicon glyphicon-ok pull-right\"></span>");
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var step = $$obj[$index];

buf.push("<li" + (jade.attrs({ "class": [('list-group-item'),(step.done ? 'list-group-item-success' : 'list-group-item-warning')] }, {"class":true})) + "><span" + (jade.attrs({ 'data-i18n':(step.i18n) }, {"data-i18n":true})) + "></span>");
if ( step.done)
{
buf.push("<span class=\"glyphicon glyphicon-ok pull-right\"></span>");
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ul>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/auth-modal-gplus-checklist.js.map