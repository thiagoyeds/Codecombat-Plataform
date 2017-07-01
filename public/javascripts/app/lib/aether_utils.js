require.register("lib/aether_utils", function(exports, require, module) {
var functionParameters, utils;

require('aether');

require('esper');

utils = require('core/utils');

Aether.addGlobal('Vector', require('./world/vector'));

Aether.addGlobal('_', _);

module.exports.createAetherOptions = function(options) {
  var aetherOptions, parameters;
  if (!options.functionName) {
    throw new Error('Specify a function name to create an Aether instance');
  }
  if (!options.codeLanguage) {
    throw new Error('Specify a code language to create an Aether instance');
  }
  aetherOptions = {
    functionName: options.functionName,
    protectAPI: !options.skipProtectAPI,
    includeFlow: Boolean(options.includeFlow),
    noVariablesInFlow: true,
    skipDuplicateUserInfoInFlow: true,
    yieldConditionally: options.functionName === 'plan',
    simpleLoops: true,
    whileTrueAutoYield: true,
    globals: ['Vector', '_'],
    problems: {
      jshint_W040: {
        level: 'ignore'
      },
      jshint_W030: {
        level: 'ignore'
      },
      jshint_W038: {
        level: 'ignore'
      },
      jshint_W091: {
        level: 'ignore'
      },
      jshint_E043: {
        level: 'ignore'
      },
      jshint_Unknown: {
        level: 'ignore'
      },
      aether_MissingThis: {
        level: 'error'
      }
    },
    problemContext: options.problemContext,
    executionLimit: 3 * 1000 * 1000,
    language: options.codeLanguage,
    useInterpreter: true
  };
  parameters = functionParameters[options.functionName];
  if (!parameters) {
    console.warn("Unknown method " + options.functionName + ": please add function parameters to lib/aether_utils.coffee.");
    parameters = [];
  }
  if (options.functionParameters && !_.isEqual(options.functionParameters, parameters)) {
    console.error("Update lib/aether_utils.coffee with the right function parameters for " + options.functionName + " (had: " + parameters + " but this gave " + options.functionParameters + ".");
    parameters = options.functionParameters;
  }
  aetherOptions.functionParameters = parameters.slice();
  return aetherOptions;
};

functionParameters = {
  hear: ['speaker', 'message', 'data'],
  makeBid: ['tileGroupLetter'],
  findCentroids: ['centroids'],
  isFriend: ['name'],
  evaluateBoard: ['board', 'player'],
  getPossibleMoves: ['board'],
  minimax_alphaBeta: ['board', 'player', 'depth', 'alpha', 'beta'],
  distanceTo: ['target'],
  chooseAction: [],
  plan: [],
  initializeCentroids: [],
  update: [],
  getNearestEnemy: [],
  die: []
};
});

;
//# sourceMappingURL=/javascripts/app/lib/aether_utils.js.map