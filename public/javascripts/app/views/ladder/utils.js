require.register("views/ladder/utils", function(exports, require, module) {
var hslToHex;

hslToHex = require('core/utils').hslToHex;

module.exports.teamDataFromLevel = function(level) {
  var alliedSystem, bgColor, color, displayName, i, len, otherTeam, primaryColor, ref, ref1, team, teamConfig, teamConfigs, teamName, teamNames, teams;
  alliedSystem = _.find(level.get('systems', true), function(value) {
    var ref;
    return ((ref = value.config) != null ? ref.teams : void 0) != null;
  });
  teamNames = (function() {
    var ref, results;
    ref = alliedSystem.config.teams;
    results = [];
    for (teamName in ref) {
      teamConfig = ref[teamName];
      if (teamConfig.playable) {
        results.push(teamName);
      }
    }
    return results;
  })();
  teamConfigs = alliedSystem.config.teams;
  teams = [];
  ref = teamNames || [];
  for (i = 0, len = ref.length; i < len; i++) {
    team = ref[i];
    otherTeam = team === 'ogres' ? 'humans' : 'ogres';
    color = teamConfigs[team].color;
    bgColor = hslToHex([color.hue, color.saturation, color.lightness + (1 - color.lightness) * 0.5]);
    primaryColor = hslToHex([color.hue, 0.5, 0.5]);
    if ((ref1 = level.get('slug')) === 'wakka-maul') {
      displayName = _.string.titleize(team);
    } else {
      displayName = $.i18n.t("ladder." + team);
    }
    teams.push({
      id: team,
      name: _.string.titleize(team),
      displayName: displayName,
      otherTeam: otherTeam,
      otherTeamDisplayName: $.i18n.t("ladder." + otherTeam),
      bgColor: bgColor,
      primaryColor: primaryColor
    });
  }
  return teams;
};
});

;
//# sourceMappingURL=/javascripts/app/views/ladder/utils.js.map