require.register("lib/SolutionConceptTagger", function(exports, require, module) {
var TagSolution, concepts;

concepts = require('schemas/concepts');

module.exports = TagSolution = function(solution) {
  var ast, code, engine, key, result, tkn;
  code = solution.source;
  engine = new esper.Engine();
  engine.load(code);
  ast = engine.evaluator.ast;
  result = [];
  for (key in concepts) {
    tkn = concepts[key].tagger;
    if (!tkn) {
      continue;
    }
    if (typeof tkn === 'function') {
      if (tkn(ast)) {
        result.push(concepts[key].concept);
      }
    } else {
      if (ast.find(tkn).length > 0) {
        result.push(concepts[key].concept);
      }
    }
  }
  console.log(result);
  return result;
};
});

;
//# sourceMappingURL=/javascripts/app/lib/SolutionConceptTagger.js.map