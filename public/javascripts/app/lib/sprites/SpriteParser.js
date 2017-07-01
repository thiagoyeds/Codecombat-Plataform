require.register("lib/sprites/SpriteParser", function(exports, require, module) {
var SpriteParser,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module.exports = SpriteParser = (function() {
  function SpriteParser(thangTypeModel) {
    var base, base1, base2;
    this.thangTypeModel = thangTypeModel;
    this.thangType = $.extend(true, {}, this.thangTypeModel.attributes.raw);
    if (this.thangType == null) {
      this.thangType = {};
    }
    if ((base = this.thangType).shapes == null) {
      base.shapes = {};
    }
    if ((base1 = this.thangType).containers == null) {
      base1.containers = {};
    }
    if ((base2 = this.thangType).animations == null) {
      base2.animations = {};
    }
    this.shapeLongKeys = {};
    this.containerLongKeys = {};
    this.containerRenamings = {};
    this.animationLongKeys = {};
    this.animationRenamings = {};
    this.populateLongKeys();
  }

  SpriteParser.prototype.populateLongKeys = function() {
    var animation, container, longKey, ref, ref1, ref2, results, shape, shortKey;
    ref = this.thangType.shapes;
    for (shortKey in ref) {
      shape = ref[shortKey];
      longKey = JSON.stringify(_.values(shape));
      this.shapeLongKeys[longKey] = shortKey;
    }
    ref1 = this.thangType.containers;
    for (shortKey in ref1) {
      container = ref1[shortKey];
      longKey = JSON.stringify(_.values(container));
      this.containerLongKeys[longKey] = shortKey;
    }
    ref2 = this.thangType.animations;
    results = [];
    for (shortKey in ref2) {
      animation = ref2[shortKey];
      longKey = JSON.stringify(_.values(animation));
      results.push(this.animationLongKeys[longKey] = shortKey);
    }
    return results;
  };

  SpriteParser.prototype.parse = function(source) {
    var addChildArgs, animation, ast, blocks, bn, bounds, boundsIndex, c, childrenMovieClips, container, containers, gotIt, index, instructions, j, k, l, lastBounds, len, len1, len2, len3, len4, len5, len6, len7, len8, localAnimations, localContainers, localGraphics, localShapes, localTweens, m, mainClip, movieClip, movieClips, n, options, p, properties, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, shape, shapeKeys;
    properties = source.match(/.*lib\.properties = \{\n.*?width: (\d+),\n.*?height: (\d+)/im);
    this.width = parseInt((ref = properties != null ? properties[1] : void 0) != null ? ref : '0', 10);
    this.height = parseInt((ref1 = properties != null ? properties[2] : void 0) != null ? ref1 : '0', 10);
    source = source.replace(/lib\.webfontAvailable = (.|\n)+?};/, '');
    options = {
      loc: false,
      range: true
    };
    ast = esprima.parse(source, options);
    blocks = this.findBlocks(ast, source);
    containers = _.filter(blocks, {
      kind: 'Container'
    });
    movieClips = _.filter(blocks, {
      kind: 'MovieClip'
    });
    mainClip = (ref2 = _.last(movieClips)) != null ? ref2 : _.last(containers);
    this.animationName = mainClip.name;
    for (index = j = 0, len = containers.length; j < len; index = ++j) {
      container = containers[index];
      if (index === containers.length - 1 && !movieClips.length && ((ref3 = container.bounds) != null ? ref3.length : void 0)) {
        container.bounds[0] -= this.width / 2;
        container.bounds[1] -= this.height / 2;
      }
      ref4 = this.getShapesFromBlock(container, source), shapeKeys = ref4[0], localShapes = ref4[1];
      localContainers = this.getContainersFromMovieClip(container, source, true);
      addChildArgs = this.getAddChildCallArguments(container, source);
      instructions = [];
      for (k = 0, len1 = addChildArgs.length; k < len1; k++) {
        bn = addChildArgs[k];
        gotIt = false;
        for (l = 0, len2 = localShapes.length; l < len2; l++) {
          shape = localShapes[l];
          if (shape.bn === bn) {
            instructions.push(shape.gn);
            gotIt = true;
            break;
          }
        }
        if (gotIt) {
          continue;
        }
        for (m = 0, len3 = localContainers.length; m < len3; m++) {
          c = localContainers[m];
          if (c.bn === bn) {
            instructions.push({
              t: c.t,
              gn: c.gn
            });
            break;
          }
        }
      }
      if (!(container.bounds && instructions.length)) {
        continue;
      }
      this.addContainer({
        c: instructions,
        b: container.bounds
      }, container.name);
    }
    childrenMovieClips = [];
    for (index = n = 0, len4 = movieClips.length; n < len4; index = ++n) {
      movieClip = movieClips[index];
      lastBounds = null;
      ref5 = movieClip.frameBounds;
      for (boundsIndex = p = 0, len5 = ref5.length; p < len5; boundsIndex = ++p) {
        bounds = ref5[boundsIndex];
        if (!bounds) {
          movieClip.frameBounds[boundsIndex] = _.clone(lastBounds);
        } else {
          lastBounds = bounds;
        }
      }
      localGraphics = this.getGraphicsFromBlock(movieClip, source);
      ref6 = this.getShapesFromBlock(movieClip, source), shapeKeys = ref6[0], localShapes = ref6[1];
      localContainers = this.getContainersFromMovieClip(movieClip, source, true);
      localAnimations = this.getAnimationsFromMovieClip(movieClip, source, true);
      for (q = 0, len6 = localAnimations.length; q < len6; q++) {
        animation = localAnimations[q];
        childrenMovieClips.push(animation.gn);
      }
      localTweens = this.getTweensFromMovieClip(movieClip, source, localShapes, localContainers, localAnimations);
      this.addAnimation({
        shapes: localShapes,
        containers: localContainers,
        animations: localAnimations,
        tweens: localTweens,
        graphics: localGraphics,
        bounds: movieClip.bounds,
        frameBounds: movieClip.frameBounds
      }, movieClip.name);
    }
    for (r = 0, len7 = movieClips.length; r < len7; r++) {
      movieClip = movieClips[r];
      if (ref7 = movieClip.name, indexOf.call(childrenMovieClips, ref7) < 0) {
        ref8 = movieClip.frameBounds;
        for (s = 0, len8 = ref8.length; s < len8; s++) {
          bounds = ref8[s];
          bounds[0] -= this.width / 2;
          bounds[1] -= this.height / 2;
        }
        movieClip.bounds[0] -= this.width / 2;
        movieClip.bounds[1] -= this.height / 2;
      }
    }
    this.saveToModel();
    return (ref9 = movieClips[0]) != null ? ref9.name : void 0;
  };

  SpriteParser.prototype.saveToModel = function() {
    return this.thangTypeModel.set('raw', this.thangType);
  };

  SpriteParser.prototype.addShape = function(shape) {
    var longKey, shortKey;
    longKey = JSON.stringify(_.values(shape));
    shortKey = this.shapeLongKeys[longKey];
    if (shortKey == null) {
      shortKey = '' + _.size(this.thangType.shapes);
      while (this.thangType.shapes[shortKey]) {
        shortKey += '+';
      }
      this.thangType.shapes[shortKey] = shape;
      this.shapeLongKeys[longKey] = shortKey;
    }
    return shortKey;
  };

  SpriteParser.prototype.addContainer = function(container, name) {
    var longKey, shortKey;
    longKey = JSON.stringify(_.values(container));
    shortKey = this.containerLongKeys[longKey];
    if (shortKey == null) {
      shortKey = name;
      if (this.thangType.containers[shortKey] != null) {
        shortKey = this.animationName + ':' + name;
      }
      this.thangType.containers[shortKey] = container;
      this.containerLongKeys[longKey] = shortKey;
    }
    this.containerRenamings[name] = shortKey;
    return shortKey;
  };

  SpriteParser.prototype.addAnimation = function(animation, name) {
    var longKey, shortKey;
    longKey = JSON.stringify(_.values(animation));
    shortKey = this.animationLongKeys[longKey];
    if (shortKey != null) {
      this.animationRenamings[shortKey] = name;
    } else {
      shortKey = name;
      if (this.thangType.animations[shortKey] != null) {
        shortKey = this.animationName + ':' + name;
      }
      this.thangType.animations[shortKey] = animation;
      this.animationLongKeys[longKey] = shortKey;
      this.animationRenamings[name] = shortKey;
    }
    return shortKey;
  };

  SpriteParser.prototype.walk = function(node, parent, fn) {
    var child, grandchild, j, key, len;
    node.parent = parent;
    for (key in node) {
      child = node[key];
      if (key === 'parent') {
        continue;
      }
      if (_.isArray(child)) {
        for (j = 0, len = child.length; j < len; j++) {
          grandchild = child[j];
          if (_.isString(grandchild != null ? grandchild.type : void 0)) {
            this.walk(grandchild, node, fn);
          }
        }
      } else if (_.isString(child != null ? child.type : void 0)) {
        node.parent = parent;
        this.walk(child, node, fn);
      }
    }
    return fn(node);
  };

  SpriteParser.prototype.orphanify = function(node) {
    var child, grandchild, key, results;
    if (node.parent) {
      delete node.parent;
    }
    results = [];
    for (key in node) {
      child = node[key];
      if (key === 'parent') {
        continue;
      }
      if (_.isArray(child)) {
        results.push((function() {
          var j, len, results1;
          results1 = [];
          for (j = 0, len = child.length; j < len; j++) {
            grandchild = child[j];
            if (_.isString(grandchild != null ? grandchild.type : void 0)) {
              results1.push(this.orphanify(grandchild));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }).call(this));
      } else if (_.isString(child != null ? child.type : void 0)) {
        if (node.parent) {
          delete node.parent;
        }
        results.push(this.orphanify(child));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  SpriteParser.prototype.subSourceFromRange = function(range, source) {
    return source.slice(range[0], range[1]);
  };

  SpriteParser.prototype.grabFunctionArguments = function(source, literal) {
    var args;
    if (literal == null) {
      literal = false;
    }
    args = source.replace(/.*?\(/, '[').replace(/\)[^)]*?$/, ']');
    if (literal) {
      return eval(args);
    } else {
      return args;
    }
  };

  SpriteParser.prototype.findBlocks = function(ast, source) {
    var functionExpressions, gatherFunctionExpressions, rectangles;
    functionExpressions = [];
    rectangles = [];
    gatherFunctionExpressions = (function(_this) {
      return function(node) {
        var arg, argSource, bounds, expression, frameBounds, frameBoundsRange, frameBoundsSource, frameBoundsStatement, i, j, kind, lastRect, len, name, nominalBounds, nominalBoundsRange, nominalBoundsSource, nominalBoundsStatement, ref, ref1, ref2, ref3, ref4, ref5, statement, statementIndex;
        if (node.type === 'FunctionExpression') {
          name = (ref = node.parent) != null ? (ref1 = ref.left) != null ? (ref2 = ref1.property) != null ? ref2.name : void 0 : void 0 : void 0;
          if (name) {
            expression = node.parent.parent;
            if (!((ref3 = expression.parent) != null ? (ref4 = ref3.right) != null ? ref4.right : void 0 : void 0)) {
              if (/frame_[\d]+/.test(name)) {
                return;
              }
            }
            kind = expression.parent.right.right.callee.property.name;
            statement = node.parent.parent.parent.parent;
            statementIndex = _.indexOf(statement.parent.body, statement);
            nominalBoundsStatement = statement.parent.body[statementIndex + 1];
            nominalBoundsRange = nominalBoundsStatement.expression.right.range;
            nominalBoundsSource = _this.subSourceFromRange(nominalBoundsRange, source);
            nominalBounds = _this.grabFunctionArguments(nominalBoundsSource, true);
            frameBoundsStatement = statement.parent.body[statementIndex + 2];
            if (frameBoundsStatement) {
              frameBoundsRange = frameBoundsStatement.expression.right.range;
              frameBoundsSource = _this.subSourceFromRange(frameBoundsRange, source);
              if (frameBoundsSource.search(/\[rect/) === -1) {
                console.log('Didn\'t have multiframe bounds for this movie clip.');
                frameBounds = [_.clone(nominalBounds)];
              } else {
                lastRect = nominalBounds;
                frameBounds = [];
                ref5 = frameBoundsStatement.expression.right.elements;
                for (i = j = 0, len = ref5.length; j < len; i = ++j) {
                  arg = ref5[i];
                  bounds = null;
                  argSource = _this.subSourceFromRange(arg.range, source);
                  if (arg.type === 'Identifier') {
                    bounds = lastRect;
                  } else if (arg.type === 'NewExpression') {
                    bounds = _this.grabFunctionArguments(argSource, true);
                  } else if (arg.type === 'AssignmentExpression') {
                    bounds = _this.grabFunctionArguments(argSource.replace('rect=', ''), true);
                    lastRect = bounds;
                  } else if (arg.type === 'Literal' && arg.value === null) {
                    bounds = [0, 0, 1, 1];
                  }
                  frameBounds.push(_.clone(bounds));
                }
              }
            } else {
              frameBounds = [_.clone(nominalBounds)];
            }
            return functionExpressions.push({
              name: name,
              bounds: nominalBounds,
              frameBounds: frameBounds,
              expression: node.parent.parent,
              kind: kind
            });
          }
        }
      };
    })(this);
    this.walk(ast, null, gatherFunctionExpressions);
    return functionExpressions;
  };


  /*
    this.shape_1.graphics.f('#605E4A').s().p('AAOD/IgOgaIAEhkIgmgdIgMgBIgPgFIgVgJQA1h9g8jXQAQAHAOASQAQAUAKAeQARAuAJBJQAHA/gBA5IAAADIACAfIAFARIACAGIAEAHIAHAHQAVAXAQAUQAUAaANAUIABACIgsgdIgggXIAAAnIABAwIgBgBg');
    this.shape_1.sett(23.2,30.1);
  
    this.shape.graphics.f().s('#000000').ss(0.1,1,1).p('AAAAAQAAAAAAAA');
    this.shape.sett(3.8,22.4);
   */

  SpriteParser.prototype.getGraphicsFromBlock = function(block, source) {
    var gatherShapeDefinitions, localGraphics;
    block = block.expression.object.right.body;
    localGraphics = [];
    gatherShapeDefinitions = (function(_this) {
      return function(node) {
        var blockName, graphicsString;
        if (!(node.type === 'NewExpression' && node.callee.property.name === 'Graphics')) {
          return;
        }
        blockName = node.parent.parent.parent.id.name;
        graphicsString = node.parent.parent["arguments"][0].value;
        return localGraphics.push({
          p: graphicsString,
          bn: blockName
        });
      };
    })(this);
    this.walk(block, null, gatherShapeDefinitions);
    return localGraphics;
  };

  SpriteParser.prototype.getShapesFromBlock = function(block, source) {
    var gatherShapeDefinitions, localShapes, shapeKeys;
    block = block.expression.object.right.body;
    shapeKeys = [];
    localShapes = [];
    gatherShapeDefinitions = (function(_this) {
      return function(node) {
        var body, callName, drawEllipse, drawEllipseSource, exp, fillCall, fillColor, graphicsStatement, graphicsStatementIndex, j, len, linearGradientFill, linearGradientFillSource, linearGradientStroke, linearGradientStrokeSource, localShape, mask, matchedName, name, path, radialGradientFill, radialGradientFillSource, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref3, ref4, ref5, ref6, ref7, ref8, ref9, shape, shapeKey, statement, strokeCall, strokeColor, strokeStyle, strokeStyleSource, t, tSource;
        if (node.type !== 'MemberExpression') {
          return;
        }
        name = (ref = node.object) != null ? (ref1 = ref.object) != null ? (ref2 = ref1.property) != null ? ref2.name : void 0 : void 0 : void 0;
        if (!name) {
          name = (ref3 = node.parent) != null ? (ref4 = ref3.parent) != null ? (ref5 = ref4.id) != null ? ref5.name : void 0 : void 0 : void 0;
          if (!(name && name.indexOf('mask') === 0 && ((ref6 = node.property) != null ? ref6.name : void 0) === 'Shape')) {
            return;
          }
          shape = {
            bn: name,
            im: true
          };
          localShapes.push(shape);
          return;
        }
        if (!(name.search('shape') === 0 && ((ref7 = node.object.property) != null ? ref7.name : void 0) === 'graphics')) {
          return;
        }
        fillCall = node.parent;
        if (fillCall.callee.property.name === 'lf') {
          linearGradientFillSource = _this.subSourceFromRange(fillCall.parent.range, source);
          linearGradientFill = _this.grabFunctionArguments(linearGradientFillSource.replace(/.*?lf\(/, 'lf('), true);
        } else if (fillCall.callee.property.name === 'rf') {
          radialGradientFillSource = _this.subSourceFromRange(fillCall.parent.range, source);
          radialGradientFill = _this.grabFunctionArguments(radialGradientFillSource.replace(/.*?lf\(/, 'lf('), true);
        } else {
          fillColor = (ref8 = (ref9 = fillCall["arguments"][0]) != null ? ref9.value : void 0) != null ? ref8 : null;
          callName = fillCall.callee.property.name;
          if (callName !== 'f') {
            console.error('What is this?! Not a fill!', callName);
          }
        }
        strokeCall = node.parent.parent.parent.parent;
        if (strokeCall.object.callee.property.name === 'ls') {
          linearGradientStrokeSource = _this.subSourceFromRange(strokeCall.parent.range, source);
          linearGradientStroke = _this.grabFunctionArguments(linearGradientStrokeSource.replace(/.*?ls\(/, 'ls(').replace(/\).ss\(.*/, ')'), true);
        } else {
          strokeColor = (ref10 = (ref11 = strokeCall.object["arguments"]) != null ? (ref12 = ref11[0]) != null ? ref12.value : void 0 : void 0) != null ? ref10 : null;
          if (strokeCall.object.callee.property.name !== 's') {
            console.error('What is this?! Not a stroke!');
          }
        }
        strokeStyle = null;
        graphicsStatement = strokeCall.parent;
        if (strokeColor || linearGradientStroke) {
          strokeStyleSource = _this.subSourceFromRange(strokeCall.parent.range, source);
          if (strokeStyleSource.search(/ss\(/) !== -1) {
            strokeStyle = _this.grabFunctionArguments(strokeStyleSource.replace(/.*?ss\(/, 'ss('), true);
            graphicsStatement = strokeCall.parent.parent.parent;
          }
        }
        if (graphicsStatement.callee.property.name === 'de') {
          drawEllipseSource = _this.subSourceFromRange(graphicsStatement.parent.range, source);
          drawEllipse = _this.grabFunctionArguments(drawEllipseSource.replace(/.*?de\(/, 'de('), true);
        } else {
          path = (ref13 = (ref14 = graphicsStatement["arguments"]) != null ? (ref15 = ref14[0]) != null ? ref15.value : void 0 : void 0) != null ? ref13 : null;
          if (graphicsStatement.callee.property.name !== 'p') {
            console.error('What is this?! Not a path!');
          }
        }
        body = graphicsStatement.parent.parent.body;
        graphicsStatementIndex = _.indexOf(body, graphicsStatement.parent);
        t = body[graphicsStatementIndex + 1].expression;
        tSource = _this.subSourceFromRange(t.range, source);
        if (tSource.search('setTransform') === -1) {
          t = [0, 0];
        } else {
          t = _this.grabFunctionArguments(tSource, true);
        }
        ref16 = body.slice(graphicsStatementIndex + 2);
        for (j = 0, len = ref16.length; j < len; j++) {
          statement = ref16[j];
          if (((ref17 = statement.expression) != null ? (ref18 = ref17.left) != null ? (ref19 = ref18.property) != null ? ref19.name : void 0 : void 0 : void 0) !== 'mask') {
            continue;
          }
          exp = statement.expression;
          matchedName = false;
          while (exp) {
            matchedName = matchedName || ((ref20 = exp.left) != null ? (ref21 = ref20.object) != null ? (ref22 = ref21.property) != null ? ref22.name : void 0 : void 0 : void 0) === name;
            mask = exp.name;
            exp = exp.right;
          }
          if (!matchedName) {
            continue;
          }
          break;
        }
        shape = {
          t: t
        };
        if (path) {
          shape.p = path;
        }
        if (drawEllipse) {
          shape.de = drawEllipse;
        }
        if (strokeColor) {
          shape.sc = strokeColor;
        }
        if (strokeStyle) {
          shape.ss = strokeStyle;
        }
        if (fillColor) {
          shape.fc = fillColor;
        }
        if (linearGradientFill) {
          shape.lf = linearGradientFill;
        }
        if (radialGradientFill) {
          shape.rf = radialGradientFill;
        }
        if (linearGradientStroke) {
          shape.ls = linearGradientStroke;
        }
        if (name.search('shape') !== -1 && shape.fc === 'rgba(0,0,0,0.451)' && !shape.ss && !shape.sc) {
          console.log('Skipping a shadow', name, shape, 'because we\'re doing shadows separately now.');
          return;
        }
        shapeKeys.push(shapeKey = _this.addShape(shape));
        localShape = {
          bn: name,
          gn: shapeKey
        };
        if (mask) {
          localShape.m = mask;
        }
        return localShapes.push(localShape);
      };
    })(this);
    this.walk(block, null, gatherShapeDefinitions);
    return [shapeKeys, localShapes];
  };

  SpriteParser.prototype.getContainersFromMovieClip = function(movieClip, source, possibleAnimations) {
    var block, gatherContainerDefinitions, localContainers;
    if (possibleAnimations == null) {
      possibleAnimations = false;
    }
    block = movieClip.expression.object.right.body;
    localContainers = [];
    gatherContainerDefinitions = (function(_this) {
      return function(node) {
        var args, bn, body, expressionStatement, expressionStatementIndex, gn, libName, localContainer, o, ref, ref1, ref2, ref3, ref4, ref5, t, tSource;
        if (!(node.type === 'Identifier' && node.name === 'lib')) {
          return;
        }
        args = node.parent.parent["arguments"];
        libName = node.parent.property.name;
        if (args.length && !possibleAnimations) {
          return;
        }
        gn = _this.containerRenamings[libName];
        if (possibleAnimations && !gn) {
          return;
        }
        bn = node.parent.parent.parent.left.property.name;
        expressionStatement = node.parent.parent.parent.parent;
        body = expressionStatement.parent.body;
        expressionStatementIndex = _.indexOf(body, expressionStatement);
        t = body[expressionStatementIndex + 1].expression;
        tSource = _this.subSourceFromRange(t.range, source);
        t = _this.grabFunctionArguments(tSource, true);
        o = body[expressionStatementIndex + 2].expression;
        localContainer = {
          bn: bn,
          t: t,
          gn: gn
        };
        if (o && ((ref = o.left) != null ? (ref1 = ref.object) != null ? (ref2 = ref1.property) != null ? ref2.name : void 0 : void 0 : void 0) === bn && ((ref3 = o.left.property) != null ? ref3.name : void 0) === '_off') {
          localContainer.o = o.right.value;
        } else if (o && ((ref4 = o.left) != null ? (ref5 = ref4.property) != null ? ref5.name : void 0 : void 0) === 'alpha') {
          localContainer.al = o.right.value;
        }
        return localContainers.push(localContainer);
      };
    })(this);
    this.walk(block, null, gatherContainerDefinitions);
    return localContainers;
  };

  SpriteParser.prototype.getAnimationsFromMovieClip = function(movieClip, source, possibleContainers) {
    var block, gatherAnimationDefinitions, localAnimations;
    if (possibleContainers == null) {
      possibleContainers = false;
    }
    block = movieClip.expression.object.right.body;
    localAnimations = [];
    gatherAnimationDefinitions = (function(_this) {
      return function(node) {
        var args, bn, body, expressionStatement, expressionStatementIndex, gn, libName, localAnimation, ref, t, tSource;
        if (!(node.type === 'Identifier' && node.name === 'lib')) {
          return;
        }
        args = node.parent.parent["arguments"];
        libName = node.parent.property.name;
        if (!(args.length || possibleContainers)) {
          return;
        }
        if (_this.containerRenamings[libName] && !_this.animationRenamings[libName]) {
          return;
        }
        args = _this.grabFunctionArguments(_this.subSourceFromRange(node.parent.parent.range, source), true);
        bn = node.parent.parent.parent.left.property.name;
        expressionStatement = node.parent.parent.parent.parent;
        body = expressionStatement.parent.body;
        expressionStatementIndex = _.indexOf(body, expressionStatement);
        t = body[expressionStatementIndex + 1].expression;
        tSource = _this.subSourceFromRange(t.range, source);
        t = _this.grabFunctionArguments(tSource, true);
        gn = (ref = _this.animationRenamings[libName]) != null ? ref : libName;
        localAnimation = {
          bn: bn,
          t: t,
          gn: gn,
          a: args
        };
        return localAnimations.push(localAnimation);
      };
    })(this);
    this.walk(block, null, gatherAnimationDefinitions);
    return localAnimations;
  };

  SpriteParser.prototype.getTweensFromMovieClip = function(movieClip, source, localShapes, localContainers, localAnimations) {
    var block, gatherTweens, localTweens;
    block = movieClip.expression.object.right.body;
    localTweens = [];
    gatherTweens = (function(_this) {
      return function(node) {
        var callExpressions, gatherCallExpressions, ref, tweenNode;
        if (((ref = node.property) != null ? ref.name : void 0) !== 'addTween') {
          return;
        }
        callExpressions = [];
        tweenNode = node;
        gatherCallExpressions = function(node) {
          var a, args, argsSource, flattenedRanges, name, range, ref1, ref2, ref3, ref4, ref5, ref6, shadowTween;
          if (node.type !== 'CallExpression') {
            return;
          }
          name = (ref1 = node.callee.property) != null ? ref1.name : void 0;
          if (name !== 'get' && name !== 'to' && name !== 'wait') {
            return;
          }
          if (name === 'get' && callExpressions.length) {
            return;
          }
          flattenedRanges = _.flatten([
            (function() {
              var j, len, ref2, results;
              ref2 = node["arguments"];
              results = [];
              for (j = 0, len = ref2.length; j < len; j++) {
                a = ref2[j];
                results.push(a.range);
              }
              return results;
            })()
          ]);
          range = [_.min(flattenedRanges), _.max(flattenedRanges)];
          argsSource = _this.subSourceFromRange(range, source);
          argsSource = argsSource.replace(/mask/g, 'this.mask');
          argsSource = argsSource.replace(/this\.([a-z_0-9]+)/ig, '"$1"');
          argsSource = argsSource.replace(/cjs(.+)\)/, '"createjs$1)"');
          if (argsSource === 'this') {
            argsSource = '{}';
          }
          args = eval("[" + argsSource + "]");
          shadowTween = ((ref2 = args[0]) != null ? typeof ref2.search === "function" ? ref2.search('shape') : void 0 : void 0) === 0 && !_.find(localShapes, {
            bn: args[0]
          });
          shadowTween = shadowTween || ((ref3 = args[0]) != null ? (ref4 = ref3.state) != null ? (ref5 = ref4[0]) != null ? (ref6 = ref5.t) != null ? typeof ref6.search === "function" ? ref6.search('shape') : void 0 : void 0 : void 0 : void 0 : void 0) === 0 && !_.find(localShapes, {
            bn: args[0].state[0].t
          });
          if (shadowTween) {
            console.log('Skipping tween', name, argsSource, args, 'from localShapes', localShapes, 'presumably because it\'s a shadow we skipped.');
            return;
          }
          return callExpressions.push({
            n: name,
            a: args
          });
        };
        _this.walk(node.parent.parent, null, gatherCallExpressions);
        return localTweens.push(callExpressions);
      };
    })(this);
    this.walk(block, null, gatherTweens);
    return localTweens;
  };

  SpriteParser.prototype.getAddChildCallArguments = function(block, source) {
    var gatherAddChildCalls, localArgs;
    block = block.expression.object.right.body;
    localArgs = [];
    gatherAddChildCalls = (function(_this) {
      return function(node) {
        var arg, args, j, len;
        if (!(node.type === 'Identifier' && node.name === 'addChild')) {
          return;
        }
        args = node.parent.parent["arguments"];
        args = (function() {
          var j, len, results;
          results = [];
          for (j = 0, len = args.length; j < len; j++) {
            arg = args[j];
            results.push(arg.property.name);
          }
          return results;
        })();
        for (j = 0, len = args.length; j < len; j++) {
          arg = args[j];
          localArgs.push(arg);
        }
      };
    })(this);
    this.walk(block, null, gatherAddChildCalls);
    return localArgs;
  };

  return SpriteParser;

})();


/*

  this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.82,scaleY:0.79,rotation:-10.8,x:98.4,y:-86.5},4).to({scaleY:0.7,rotation:9.3,x:95.6,y:-48.8},1).to({scaleX:0.82,scaleY:0.61,rotation:29.4,x:92.8,y:-11},1).to({regX:7.3,scaleX:0.82,scaleY:0.53,rotation:49.7,x:90.1,y:26.6},1).to({regX:7.2,regY:29.8,scaleY:0.66,rotation:19.3,x:101.2,y:-27.8},2).to({regY:29.9,scaleY:0.79,rotation:-10.8,x:98.4,y:-86.5},2).to({scaleX:0.84,scaleY:0.83,rotation:-30.7,x:68.4,y:-110},2).to({regX:7.3,scaleX:0.84,scaleY:0.84,rotation:-33.9,x:63.5,y:-114},1).wait(1));
 */


/*
simpleSample = """
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.enemy_flying_move_side = function(mode,startPosition,loop) {
  this.initialize(mode,startPosition,loop,{});

  // D_Head
  this.instance = new lib.Dragon_Head();
  this.instance.setTransform(227,200.5,1,1,0,0,0,51.9,42.5);

  this.timeline.addTween(cjs.Tween.get(this.instance).to({y:182.9},7).to({y:200.5},7).wait(1));

  // Layer 7
  this.shape = new cjs.Shape();
  this.shape.graphics.f('#4F6877').s().p('AgsAxQgSgVgB');
  this.shape.setTransform(283.1,146.1);

  // Layer 7 2
  this.shape_1 = new cjs.Shape();
  this.shape_1.graphics.f('rgba(255,255,255,0.4)').s().p('ArTs0QSMB7EbVGQhsBhiGBHQjg1IvVkhg');
  this.shape_1.setTransform(400.2,185.5);

  this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},7).to({state:[]},2).wait(6));

  // Wing
  this.instance_9 = new lib.Wing_Animation('synched',0);
  this.instance_9.setTransform(313.9,145.6,1,1,0,0,0,49,-83.5);

  this.timeline.addTween(cjs.Tween.get(this.instance_9).to({y:128,startPosition:7},7).wait(1));

  // Example hard one with two shapes
  this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},7).to({state:[{t:this.shape_1}]},1).to({state:[]},1).wait(7));


}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7.1,48.9,528.7,431.1);

(lib.Dragon_Head = function() {
  this.initialize();

  // Isolation Mode
  this.shape = new cjs.Shape();
  this.shape.graphics.f('#1D2226').s().p('AgVAwQgUgdgN');
  this.shape.setTransform(75,25.8);

  this.shape_1 = new cjs.Shape();
  this.shape_1.graphics.f('#1D2226').s().p('AgnBXQACABAF');
  this.shape_1.setTransform(80.8,22);

  this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(5.8,0,87.9,85);

(lib.WingPart_01 = function() {
  this.initialize();

  // Layer 1
  this.shape = new cjs.Shape();
  this.shape.graphics.f('#DBDDBC').s().p('Ag3BeQgCgRA');
  this.shape.setTransform(10.6,19.7,1.081,1.081);

  this.shape_1 = new cjs.Shape();
  this.shape_1.graphics.f('#1D2226').s().p('AB4CDQgGg');
  this.shape_1.setTransform(19.9,17.6,1.081,1.081);

  this.shape_2 = new cjs.Shape();
  this.shape_2.graphics.f('#605E4A').s().p('AiECbQgRg');
  this.shape_2.setTransform(19.5,18.4,1.081,1.081);

  this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-3.1,40,41.6);


(lib.Wing_Animation = function(mode,startPosition,loop) {
  this.initialize(mode,startPosition,loop,{});

  // WP_02
  this.instance = new lib.WingPart_01();
  this.instance.setTransform(53.6,-121.9,0.854,0.854,-40.9,0,0,7.2,29.9);

  this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleY:0.7,rotation:9.3,x:95.6,y:-48.8},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.7,-161.6,153.4,156.2);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
"""
 */
});

;
//# sourceMappingURL=/javascripts/app/lib/sprites/SpriteParser.js.map