require.register("templates/play/level/tome/spell_palette_entry_popover", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),doc = locals_.doc,_ = locals_._,writable = locals_.writable,marked = locals_.marked,cooldowns = locals_.cooldowns,selectedMethod = locals_.selectedMethod,argumentExamples = locals_.argumentExamples,language = locals_.language,docName = locals_.docName,value = locals_.value,item = locals_.item;buf.push("<h4><span class=\"prop-name\">" + (jade.escape(null == (jade.interp = doc.shortName) ? "" : jade.interp)) + "</span> - ");
var skillType = (doc.type == 'function' && doc.owner == 'this' ? 'method' : doc.type)
buf.push("<code" + (jade.attrs({ 'data-i18n':('skill_docs.' + skillType), "class": [('prop-type')] }, {"data-i18n":true})) + "><!-- In case there's no translation in en.coffee because we missed one-->" + (jade.escape(null == (jade.interp = skillType) ? "" : jade.interp)) + "</code><!-- Redundant in case some tag docs are missing an owner-->");
if ( !_.contains(['function', 'basic tag', 'spawnable', 'event'], doc.type) && doc.owner != 'HTML')
{
buf.push(" (");
if ( writable)
{
buf.push("<span data-i18n=\"skill_docs.writable\">writable</span>");
}
else
{
buf.push("<span data-i18n=\"skill_docs.read_only\">read-only</span>");
}
buf.push(")");
}
buf.push("</h4>");
if ( doc.translatedShortName)
{
buf.push("<h5><span class=\"translated-name\">" + (jade.escape(null == (jade.interp = doc.translatedShortName) ? "" : jade.interp)) + "</span></h5>");
}
buf.push("<div class=\"description\"><p>" + (null == (jade.interp = marked(doc.description || 'Still undocumented, sorry.')) ? "" : jade.interp) + "</p><div style=\"clear: both\" class=\"clear\"></div>");
if ( cooldowns && (cooldowns.cooldown || cooldowns.specificCooldown))
{
buf.push("<p><span>");
if ( cooldowns.type == 'spell')
{
buf.push("<span data-i18n=\"skill_docs.spell\">Spell</span>");
}
else
{
buf.push("<span data-i18n=\"skill_docs.action\">Action</span>");
}
buf.push("<span data-i18n=\"skill_docs.action_name\" class=\"spl\">name</span><span class=\"spr\">:</span><code>\"" + (jade.escape((jade.interp = cooldowns.name) == null ? '' : jade.interp)) + "\"</code>.</span><span class=\"spl\"><span data-i18n=\"skill_docs.action_cooldown\">Takes</span><span class=\"spr\">:</span><code>" + (jade.escape(null == (jade.interp = cooldowns.cooldown) ? "" : jade.interp)) + "</code>s.</span>");
if ( cooldowns.specificCooldown)
{
buf.push("<span class=\"spl\"><span data-i18n=\"skill_docs.action_specific_cooldown\">Cooldown</span><span class=\"spr\">:</span><code>" + (jade.escape(null == (jade.interp = cooldowns.specificCooldown) ? "" : jade.interp)) + "</code>s.</span>");
}
if ( cooldowns.damage)
{
buf.push("<span class=\"spl\"><span data-i18n=\"skill_docs.action_damage\">Damage</span><span class=\"spr\">:</span><code>" + (jade.escape(null == (jade.interp = cooldowns.damage) ? "" : jade.interp)) + "</code>.</span>");
}
if ( cooldowns.range)
{
buf.push("<span class=\"spl\"><span data-i18n=\"skill_docs.action_range\">Range</span><span class=\"spr\">:</span><code>" + (jade.escape(null == (jade.interp = cooldowns.range) ? "" : jade.interp)) + "</code>m.</span>");
}
if ( cooldowns.radius)
{
buf.push("<span class=\"spl\"><span data-i18n=\"skill_docs.action_radius\">Radius</span><span class=\"spr\">:</span><code>" + (jade.escape(null == (jade.interp = cooldowns.radius) ? "" : jade.interp)) + "</code>m.</span>");
}
if ( cooldowns.duration)
{
buf.push("<span class=\"spl\"><span data-i18n=\"skill_docs.action_duration\">Duration</span><span class=\"spr\">:</span><code>" + (jade.escape(null == (jade.interp = cooldowns.duration) ? "" : jade.interp)) + "</code>s.</span>");
}
buf.push("</p>");
}
buf.push("</div>");
if ( !selectedMethod)
{
if ( doc.example)
{
buf.push("<p class=\"example\"><strong><span data-i18n=\"skill_docs.example\">Example</span>:</strong><div class=\"docs-ace-container\"><div class=\"docs-ace\">" + (jade.escape(null == (jade.interp = doc.example) ? "" : jade.interp)) + "</div></div></p>");
}
else if ( doc.type == 'function' && argumentExamples.length)
{
buf.push("<p class=\"example\"><strong><span data-i18n=\"skill_docs.example\">Example</span>:</strong><div><div class=\"docs-ace-container\"><div class=\"docs-ace\">");
if ( language == 'javascript')
{
buf.push("<span>" + (jade.escape(null == (jade.interp = doc.owner + '.' + docName + '(' + argumentExamples.join(', ') + ');') ? "" : jade.interp)) + "</span>");
}
else if ( language == 'coffeescript')
{
buf.push("<span>" + (jade.escape(null == (jade.interp = doc.ownerName + (doc.ownerName == '@' ? '' : '.') + docName + ' ' + argumentExamples.join(', ')) ? "" : jade.interp)) + "</span>");
}
else if ( language == 'python')
{
buf.push("<span>" + (jade.escape(null == (jade.interp = doc.ownerName + '.' + docName + '(' + argumentExamples.join(', ') + ')') ? "" : jade.interp)) + "</span>");
}
else if ( language == 'clojure')
{
buf.push("<span>" + (jade.escape(null == (jade.interp = '(.' + docName + ' ' + doc.ownerName + ' ' + argumentExamples.join(', ') + ')') ? "" : jade.interp)) + "</span>");
}
else if ( language == 'lua')
{
buf.push("<span>" + (jade.escape(null == (jade.interp = doc.ownerName + ':' + docName + '(' + argumentExamples.join(', ') + ')') ? "" : jade.interp)) + "</span>");
}
else if ( language == 'io')
{
buf.push("<span>" + (jade.escape(null == (jade.interp = (doc.ownerName == 'this' ? '' : doc.ownerName + ' ') + docName + '(' + argumentExamples.join(', ') + ')') ? "" : jade.interp)) + "</span>");
}
buf.push("</div></div></div></p>");
}
}
if ( (doc.type != 'function' && doc.type != 'snippet' && doc.type != 'spawnable' && doc.type != 'event' && !_.contains(['HTML', 'CSS', 'WebJavaScript', 'jQuery'], doc.owner)) || doc.name == 'now')
{
buf.push("<p class=\"value\"><strong><span data-i18n=\"skill_docs.current_value\">Current Value</span><span class=\"spr\">:</span></strong><pre><code" + (jade.attrs({ 'data-prop':(doc.name), "class": [('current-value')] }, {"data-prop":true})) + ">" + (jade.escape(null == (jade.interp = value) ? "" : jade.interp)) + "</code></pre></p>");
}
var argumentEntry_mixin = function(arg){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div><code>" + (jade.escape(null == (jade.interp = arg.name) ? "" : jade.interp)) + "</code><span class=\"spr\">:</span><code>" + (jade.escape(null == (jade.interp = arg.type) ? "" : jade.interp)) + "</code>");
if ( arg.example)
{
buf.push(" (<span data-i18n=\"skill_docs.ex\">ex</span><span class=\"spr\">:</span><code>" + (jade.escape(null == (jade.interp = arg.example) ? "" : jade.interp)) + "</code>)");
}
if ( arg.description)
{
buf.push("<div>" + (null == (jade.interp = marked(arg.description)) ? "" : jade.interp) + "</div>");
}
if ( arg.default)
{
buf.push("<div><em><span data-i18n=\"skill_docs.default_value\">Default value</span><span class=\"spr\">:</span></em><code>" + (jade.escape(null == (jade.interp = arg.default) ? "" : jade.interp)) + "</code></div>");
}
buf.push("</div>");
};
if ( doc.args && doc.args.length)
{
var hasOptionalArguments = _.any(doc.args, function(arg){ return arg.optional })
buf.push("<p class=\"args\"><strong>");
if ( hasOptionalArguments)
{
buf.push("<span data-i18n=\"skill_docs.required_parameters\">Required Parameters</span>");
}
else
{
buf.push("<span data-i18n=\"skill_docs.parameters\">Parameters</span>");
}
buf.push("<span class=\"spr\">:</span></strong>");
// iterate doc.args
;(function(){
  var $$obj = doc.args;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var arg = $$obj[$index];

if (!( arg.optional))
{
argumentEntry_mixin(arg);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var arg = $$obj[$index];

if (!( arg.optional))
{
argumentEntry_mixin(arg);
}
    }

  }
}).call(this);

buf.push("</p>");
if ( hasOptionalArguments)
{
buf.push("<p class=\"args\"><strong><span data-i18n=\"skill_docs.optional_parameters\">Optional Parameters</span><span class=\"spr\">:</span></strong>");
// iterate doc.args
;(function(){
  var $$obj = doc.args;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var arg = $$obj[$index];

if ( arg.optional)
{
argumentEntry_mixin(arg);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var arg = $$obj[$index];

if ( arg.optional)
{
argumentEntry_mixin(arg);
}
    }

  }
}).call(this);

buf.push("</p>");
}
}
if ( doc.returns)
{
buf.push("<p class=\"returns\"><strong><span data-i18n=\"skill_docs.returns\">Returns</span><span class=\"spr\">:</span></strong><div><code>" + (jade.escape(null == (jade.interp = doc.returns.type) ? "" : jade.interp)) + "</code>");
if ( doc.returns.example)
{
buf.push(" (<span data-i18n=\"skill_docs.ex\">ex</span><span class=\"spr\">:</span><code>" + (jade.escape(null == (jade.interp = doc.returns.example) ? "" : jade.interp)) + "</code>)");
}
if ( doc.returns.description)
{
buf.push("<div>" + (null == (jade.interp = marked(doc.returns.description)) ? "" : jade.interp) + "</div>");
}
buf.push("</div></p>");
}
if ( item)
{
buf.push("<p><em><span data-i18n=\"skill_docs.granted_by\" class=\"spr\">Granted by</span>" + (jade.escape((jade.interp = item.get('name')) == null ? '' : jade.interp)) + ".</em></p>");
}
if ( selectedMethod)
{
buf.push("<p><em>Write the body of this method below.</em></p>");
};return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/spell_palette_entry_popover.js.map