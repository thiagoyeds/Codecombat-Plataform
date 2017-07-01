require.register("lib/HtmlExtractor", function(exports, require, module) {
var dekuify, extractCssLines, extractCssSelectors, extractJQueryLines, extractSelectorsFromCss, extractSelectorsFromJS, extractStylesAndScripts, parseUserHtml, unwrapDekuNodes;

dekuify = function(elem) {
  var c;
  if (elem.type === 'text') {
    return elem.data;
  }
  if (elem.type === 'comment') {
    return null;
  }
  elem.attribs = _.omit(elem.attribs, function(val, attr) {
    return !attr.match(/^[^\s"'<>\\\/=]+$/);
  });
  if (!elem.name) {
    console.log('Failed to dekuify', elem);
    return elem.type;
  }
  return deku.element(elem.name, elem.attribs, (function() {
    var i, len, ref, ref1, results;
    ref1 = (ref = elem.children) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      c = ref1[i];
      results.push(dekuify(c));
    }
    return results;
  })());
};

unwrapDekuNodes = function(dekuNode) {
  var child;
  if (_.isString(dekuNode)) {
    return dekuNode;
  }
  if (_.isArray(dekuNode)) {
    return _.filter(_.flatten((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = dekuNode.length; i < len; i++) {
        child = dekuNode[i];
        results.push(unwrapDekuNodes(child));
      }
      return results;
    })()));
  } else {
    return _.filter(_.flatten([
      dekuNode.nodeValue, (function() {
        var i, len, ref, results;
        ref = dekuNode.children || [];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          results.push(unwrapDekuNodes(child));
        }
        return results;
      })()
    ]));
  }
};

parseUserHtml = function(html) {
  var bodyNode, dom, htmlNode, ref, ref1;
  dom = htmlparser2.parseDOM(html, {});
  bodyNode = (ref = _.find(dom, {
    name: 'body'
  })) != null ? ref : {
    name: 'body',
    attribs: null,
    children: dom
  };
  htmlNode = (ref1 = _.find(dom, {
    name: 'html'
  })) != null ? ref1 : {
    name: 'html',
    attribs: null,
    children: [bodyNode]
  };
  return dekuify(htmlNode);
};

extractStylesAndScripts = function(html) {
  var dekuTree, recurse, ref, scripts, styles, virtualDom, wrappedScripts, wrappedStyles;
  dekuTree = parseUserHtml(html);
  recurse = function(dekuTree) {
    var childScripts, childStyles, ref;
    if (dekuTree.type === '#text') {
      return {
        virtualDom: dekuTree,
        styles: [],
        scripts: []
      };
    }
    if (dekuTree.type === 'style') {
      return {
        styles: [dekuTree],
        scripts: []
      };
    }
    if (dekuTree.type === 'script') {
      return {
        styles: [],
        scripts: [dekuTree]
      };
    }
    childStyles = [];
    childScripts = [];
    if ((ref = dekuTree.children) != null) {
      ref.forEach((function(_this) {
        return function(dekuChild, index) {
          var ref1, scripts, styles, virtualDom;
          ref1 = recurse(dekuChild), virtualDom = ref1.virtualDom, styles = ref1.styles, scripts = ref1.scripts;
          dekuTree.children[index] = virtualDom;
          childStyles = childStyles.concat(styles);
          return childScripts = childScripts.concat(scripts);
        };
      })(this));
    }
    dekuTree.children = _.filter(dekuTree.children);
    return {
      virtualDom: dekuTree,
      scripts: childScripts,
      styles: childStyles
    };
  };
  ref = recurse(dekuTree), virtualDom = ref.virtualDom, scripts = ref.scripts, styles = ref.styles;
  wrappedStyles = deku.element('head', {}, styles);
  wrappedScripts = deku.element('head', {}, scripts);
  return {
    virtualDom: virtualDom,
    scripts: wrappedScripts,
    styles: wrappedStyles
  };
};

extractCssSelectors = function(dekuStyles, dekuScripts) {
  var cssSelectors, jQuerySelectors;
  cssSelectors = extractSelectorsFromCss(dekuStyles);
  jQuerySelectors = extractSelectorsFromJS(dekuScripts);
  return cssSelectors.concat(jQuerySelectors);
};

extractSelectorsFromCss = function(styles) {
  var cssSelectors;
  styles = unwrapDekuNodes(styles);
  if (!_.isArray(styles)) {
    styles = [styles];
  }
  cssSelectors = _.flatten(styles.map(function(rawCss) {
    var e, error, parsedCss;
    try {
      parsedCss = parseCss(rawCss);
      return parsedCss.stylesheet.rules.map(function(rule) {
        return rule.selectors.join(', ').trim();
      });
    } catch (error) {
      e = error;
      return [];
    }
  }));
  return cssSelectors;
};

extractSelectorsFromJS = function(scripts) {
  var jQuerySelectors;
  scripts = unwrapDekuNodes(scripts);
  if (!_.isArray(scripts)) {
    scripts = [scripts];
  }
  jQuerySelectors = _.flatten(scripts.map(function(script) {
    return (script.match(/\$\(\s*['"](?!<)(.*?)(?!>)['"]\s*\)/g) || []).map(function(jQueryCall) {
      return jQueryCall.match(/\$\(\s*['"](?!<)(.*?)(?!>)['"]\s*\)/)[1];
    });
  }));
  return jQuerySelectors;
};

extractCssLines = function(dekuStyles) {
  var rawCssLines;
  rawCssLines = [];
  dekuStyles.children.forEach((function(_this) {
    return function(styleNode) {
      var rawCss;
      rawCss = styleNode.children[0].nodeValue;
      return rawCssLines = rawCssLines.concat(rawCss.split('\n'));
    };
  })(this));
  return rawCssLines;
};

extractJQueryLines = function(dekuScripts) {
  return _.flatten(dekuScripts.children.map(function(dekuScript) {
    var rawScript;
    rawScript = dekuScript.children[0].nodeValue;
    return _.filter(rawScript.split('\n').map(function(line) {
      return (line.match(/^.*\$\(\s*['"].*['"]\s*\).*$/g) || [])[0];
    }));
  }));
};

module.exports = {
  dekuify: dekuify,
  unwrapDekuNodes: unwrapDekuNodes,
  parseUserHtml: parseUserHtml,
  extractStylesAndScripts: extractStylesAndScripts,
  extractCssSelectors: extractCssSelectors,
  extractSelectorsFromCss: extractSelectorsFromCss,
  extractSelectorsFromJS: extractSelectorsFromJS,
  extractCssLines: extractCssLines,
  extractJQueryLines: extractJQueryLines
};
});

;
//# sourceMappingURL=/javascripts/app/lib/HtmlExtractor.js.map