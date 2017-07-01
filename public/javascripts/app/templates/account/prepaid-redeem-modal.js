require.register("templates/account/prepaid-redeem-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Prepaid Code Details (" + (jade.escape((jade.interp = view.ppc.get('code')) == null ? '' : jade.interp)) + ")</h3></div><div class=\"modal-body\">");
if ( view.redeemedOn)
{
buf.push("<p>You redeemed this code: " + (jade.escape((jade.interp = view.redeemedOn) == null ? '' : jade.interp)) + "</p>");
}
else
{
if ( view.ppc.openSpots())
{
buf.push("<p><strong>Adds " + (jade.escape((jade.interp = view.ppc.get('properties').months) == null ? '' : jade.interp)) + " month(s) to your current subscription.</strong></p><p>You can redeem this code.</p>");
}
else
{
buf.push("<p>You cannot redeem this code. </p>");
}
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"close\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\">Cancel</button>");
if ( !view.redeemedOn && view.ppc.openSpots() > 0)
{
buf.push("<button id=\"redeem\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\">Redeem Code To My Account</button>");
}
buf.push("</div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/account/prepaid-redeem-modal.js.map