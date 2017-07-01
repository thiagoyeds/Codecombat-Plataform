require.register("lib/world/script_event_prereqs", function(exports, require, module) {
var downTheChain, scriptMatchesEventPrereqs;

downTheChain = require('./world_utils').downTheChain;

module.exports.scriptMatchesEventPrereqs = scriptMatchesEventPrereqs = function(script, event) {
  var ap, i, len, ref, v;
  if (!script.eventPrereqs) {
    return true;
  }
  ref = script.eventPrereqs;
  for (i = 0, len = ref.length; i < len; i++) {
    ap = ref[i];
    v = downTheChain(event, ap.eventProps);
    if ((ap.equalTo != null) && v !== ap.equalTo) {
      return false;
    }
    if ((ap.notEqualTo != null) && v === ap.notEqualTo) {
      return false;
    }
    if ((ap.greaterThan != null) && !(v > ap.greaterThan)) {
      return false;
    }
    if ((ap.greaterThanOrEqualTo != null) && !(v >= ap.greaterThanOrEqualTo)) {
      return false;
    }
    if ((ap.lessThan != null) && !(v < ap.lessThan)) {
      return false;
    }
    if ((ap.lessThanOrEqualTo != null) && !(v <= ap.lessThanOrEqualTo)) {
      return false;
    }
    if ((ap.containingString != null) && (!v || v.search(ap.containingString) === -1)) {
      return false;
    }
    if ((ap.notContainingString != null) && (v != null ? v.search(ap.notContainingString) : void 0) !== -1) {
      return false;
    }
    if ((ap.containingRegexp != null) && (!v || v.search(new RegExp(ap.containingRegexp)) === -1)) {
      return false;
    }
    if ((ap.notContainingRegexp != null) && (v != null ? v.search(new RegExp(ap.notContainingRegexp)) : void 0) !== -1) {
      return false;
    }
  }
  return true;
};
});

;
//# sourceMappingURL=/javascripts/app/lib/world/script_event_prereqs.js.map