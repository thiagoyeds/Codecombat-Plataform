require.register("views/play/level/tome/editor/snippets", function(exports, require, module) {

/*
  This is essentially a copy from the snippet completer from Ace's ext/language-tools.js
  However this completer assigns a score to the snippets to ensure that snippet suggestions are
  treated better in the autocomplete than local values
 */
var Fuzziac, ace, getCurrentWord, getFullIdentifier, identifierRegex, lineBreak, score, scrubSnippet,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

score = fuzzaldrin.score;

lineBreak = /\r\n|[\n\r\u2028\u2029]/g;

identifierRegex = /[\.a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;

Fuzziac = require('./fuzziac');

ace = require('ace');

module.exports = function(SnippetManager, autoLineEndings) {
  var Range, baseInsertSnippet, util;
  Range = ace.require('ace/range').Range;
  util = ace.require('ace/autocomplete/util');
  ({
    identifierRegexps: [identifierRegex]
  });
  baseInsertSnippet = SnippetManager.insertSnippet;
  SnippetManager.insertSnippet = function(editor, snippet) {
    var afterIndex, afterRange, completer, completion, cursor, extraEndLength, extraIndex, finalScore, fuzzer, i, j, lang, len, len1, line, match, originalCompletion, originalObject, originalPrefix, prevObject, prevObjectIndex, prevWord, prevWordIndex, range, ref, ref1, ref2, ref3, snippetIndex, snippetStart, trailingText;
    cursor = editor.getCursorPosition();
    line = editor.session.getLine(cursor.row);
    if (cursor.column > 0) {
      prevWord = util.retrievePrecedingIdentifier(line, cursor.column - 1, identifierRegex);
      if (prevWord.length > 0) {
        prevWordIndex = snippet.toLowerCase().indexOf(prevWord.toLowerCase());
        if (prevWordIndex === 0) {
          range = new Range(cursor.row, cursor.column - 1 - prevWord.length, cursor.row, cursor.column);
          editor.session.remove(range);
        } else {
          ref = editor.completers;
          for (i = 0, len = ref.length; i < len; i++) {
            completer = ref[i];
            if (completer.completions != null) {
              ref1 = completer.completions;
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                completion = ref1[j];
                if (completion.snippet === snippet) {
                  originalCompletion = completion;
                  break;
                }
              }
              if (originalCompletion) {
                break;
              }
            }
          }
          if (originalCompletion != null) {
            lang = (ref2 = editor.session.getMode()) != null ? (ref3 = ref2.$id) != null ? ref3.substr('ace/mode/'.length) : void 0 : void 0;
            extraEndLength = 1;
            if (autoLineEndings[lang] != null) {
              extraEndLength += autoLineEndings[lang].length;
            }
            if (snippetIndex = originalCompletion.content.indexOf(snippet.substr(0, snippet.length - extraEndLength))) {
              originalPrefix = originalCompletion.content.substring(0, snippetIndex);
            } else {
              originalPrefix = '';
            }
            snippetStart = cursor.column - originalPrefix.length;
            if (snippetStart > 0 && snippetStart <= line.length) {
              extraIndex = snippetStart - 1;
              if (line[extraIndex] === '.') {
                originalObject = originalCompletion.content.substring(0, originalCompletion.content.indexOf('.'));
                prevObjectIndex = extraIndex - 1;
                if (prevObjectIndex >= 0 && /\w/.test(line[prevObjectIndex])) {
                  while (prevObjectIndex >= 0 && /\w/.test(line[prevObjectIndex])) {
                    prevObjectIndex--;
                  }
                  if (prevObjectIndex < 0 || !/\w/.test(line[prevObjectIndex])) {
                    prevObjectIndex++;
                  }
                  prevObject = line.substring(prevObjectIndex, extraIndex);
                  fuzzer = new Fuzziac(originalObject);
                  finalScore = 0;
                  if (fuzzer) {
                    finalScore = fuzzer.score(prevObject);
                  }
                  if (finalScore > 0.5) {
                    range = new Range(cursor.row, prevObjectIndex, cursor.row, snippetStart);
                    editor.session.remove(range);
                  } else if (/^[^.]+\./.test(snippet)) {
                    snippet = snippet.replace(/^[^.]+\./, '');
                  }
                }
              } else if (/\w/.test(line[extraIndex])) {
                while (extraIndex >= 0 && /\w/.test(line[extraIndex])) {
                  extraIndex--;
                }
                if (extraIndex < 0 || !/\w/.test(line[extraIndex])) {
                  extraIndex++;
                }
                range = new Range(cursor.row, extraIndex, cursor.row, snippetStart);
                editor.session.remove(range);
              }
            }
          }
        }
      }
    }
    afterIndex = cursor.column;
    trailingText = line.substring(afterIndex);
    match = trailingText.match(/^[a-zA-Z_0-9]*(\(\s*\))?/);
    if (match) {
      afterIndex += match[0].length;
    }
    afterRange = new Range(cursor.row, cursor.column, cursor.row, afterIndex);
    editor.session.remove(afterRange);
    return baseInsertSnippet.call(this, editor, snippet);
  };
  return {
    getCompletions: function(editor, session, pos, prefix, callback) {
      var beginningOfLine, completions, fullPrefix, fullPrefixParts, keywords, lang, line, ref, ref1, ref2, ref3, snippetMap, word;
      lang = (ref = session.getMode()) != null ? (ref1 = ref.$id) != null ? ref1.substr('ace/mode/'.length) : void 0 : void 0;
      line = session.getLine(pos.row);
      completions = [];
      fullPrefix = getFullIdentifier(session, pos);
      fullPrefixParts = fullPrefix.split(/[.:]/g);
      word = getCurrentWord(session, pos);
      if (fullPrefixParts.length > 2) {
        this.completions = [];
        return callback(null, completions);
      }
      beginningOfLine = session.getLine(pos.row).substring(0, pos.column - prefix.length);
      if (!((fullPrefixParts.length < 3 && /^(hero|self|this|@)$/.test(fullPrefixParts[0])) || /^\s*$/.test(beginningOfLine))) {
        this.completions = completions;
        return callback(null, completions);
      }
      snippetMap = SnippetManager.snippetMap;
      SnippetManager.getActiveScopes(editor).forEach(function(scope) {
        var caption, fuzzScore, i, len, ref2, ref3, results, s, snippet, snippets;
        snippets = snippetMap[scope] || [];
        results = [];
        for (i = 0, len = snippets.length; i < len; i++) {
          s = snippets[i];
          caption = s.name || s.tabTrigger;
          if (!caption) {
            continue;
          }
          ref2 = scrubSnippet(s.content, caption, line, prefix, pos, lang, autoLineEndings, s.captureReturn), snippet = ref2[0], fuzzScore = ref2[1];
          results.push(completions.push({
            content: s.content,
            caption: caption,
            snippet: snippet,
            score: (ref3 = fuzzScore * s.importance) != null ? ref3 : 1.0,
            meta: s.meta || (s.tabTrigger && !s.name ? s.tabTrigger + '\u21E5' : 'snippets')
          }));
        }
        return results;
      }, this);
      keywords = (ref2 = session.getMode()) != null ? (ref3 = ref2.$highlightRules) != null ? ref3.$keywordList : void 0 : void 0;
      if (keywords && indexOf.call(keywords, prefix) >= 0) {
        this.completions = _.filter(completions, function(x) {
          return x.caption.indexOf(prefix === 0);
        });
        return callback(null, this.completions);
      }
      this.completions = completions;
      return callback(null, completions);
    }
  };
};

getCurrentWord = function(doc, pos) {
  var end, start, text;
  end = pos.column;
  start = end - 1;
  text = doc.getLine(pos.row);
  while (start >= 0 && !text[start].match(/\s+|[\.\@]/)) {
    start--;
  }
  if (start >= 0) {
    start++;
  }
  return text.substring(start, end);
};

getFullIdentifier = function(doc, pos) {
  var end, start, text;
  end = pos.column;
  start = end - 1;
  text = doc.getLine(pos.row);
  while (start >= 0 && !text[start].match(/\s+/)) {
    start--;
  }
  if (start >= 0) {
    start++;
  }
  return text.substring(start, end);
};

scrubSnippet = function(snippet, caption, line, input, pos, lang, autoLineEndings, captureReturn) {
  var captionStart, fuzzScore, linePrefix, linePrefixIndex, lineSuffix, prefixStart, snippetLineBreaks, snippetPrefix, snippetPrefixIndex, snippetSuffix, startsWith, toLinePrefix;
  fuzzScore = 0.1;
  snippetLineBreaks = (snippet.match(lineBreak) || []).length;
  if (prefixStart = snippet.toLowerCase().indexOf(input.toLowerCase()) > -1) {
    captionStart = snippet.indexOf(caption);
    snippetPrefix = snippet.substring(0, captionStart);
    snippetSuffix = snippet.substring(snippetPrefix.length + caption.length);
    linePrefixIndex = pos.column - input.length - 1;
    if (linePrefixIndex >= 0 && snippetPrefix.length > 0 && line[linePrefixIndex] === snippetPrefix[snippetPrefix.length - 1]) {
      snippetPrefixIndex = snippetPrefix.length - 1;
      while (line[linePrefixIndex] === snippetPrefix[snippetPrefixIndex]) {
        if (linePrefixIndex === 0 || snippetPrefixIndex === 0) {
          break;
        }
        linePrefixIndex--;
        snippetPrefixIndex--;
      }
      linePrefix = line.substr(linePrefixIndex, pos.column - input.length - linePrefixIndex);
    } else {
      linePrefix = '';
    }
    lineSuffix = line.substr(pos.column, snippetSuffix.length - 1 + caption.length - input.length + 1);
    if (snippet.indexOf(lineSuffix) < 0) {
      lineSuffix = '';
    }
    if (pos.column - input.length >= 0 && line[pos.column - input.length - 1] === '(' && pos.column < line.length && line[pos.column] === ')' && lineSuffix === ')') {
      lineSuffix = '';
    }
    fuzzScore += score(snippet, linePrefix + input + lineSuffix);
    if (snippetPrefix.length > 0 && snippetPrefix === linePrefix) {
      snippet = snippet.slice(snippetPrefix.length);
    }
    if (lineSuffix.length > 0) {
      snippet = snippet.slice(0, snippet.length - lineSuffix.length);
    }
    if (lineSuffix.length === 0 && /^\s*$/.test(line.slice(pos.column))) {
      toLinePrefix = line.substring(0, linePrefixIndex);
      if (linePrefixIndex < 0 || linePrefixIndex >= 0 && !/[\(\)]/.test(toLinePrefix) && !/^[ \t]*(?:if\b|elif\b)/.test(toLinePrefix)) {
        if (snippetLineBreaks === 0 && autoLineEndings[lang]) {
          snippet += autoLineEndings[lang];
        }
        if (snippetLineBreaks === 0 && !/\$\{/.test(snippet)) {
          snippet += "\n";
        }
        if (captureReturn && /^\s*$/.test(toLinePrefix)) {
          snippet = captureReturn + linePrefix + snippet;
        }
      }
    }
  } else {
    if (line.trim() === input) {
      if (snippetLineBreaks === 0 && autoLineEndings[lang]) {
        snippet += autoLineEndings[lang];
      }
      if (snippetLineBreaks === 0 && !/\$\{/.test(snippet)) {
        snippet += "\n";
      }
    }
    fuzzScore += score(snippet, input);
  }
  startsWith = function(string, searchString, position) {
    position = position || 0;
    return string.substr(position, searchString.length) === searchString;
  };
  if (startsWith(caption, input)) {
    fuzzScore *= 2;
  }
  fuzzScore -= caption.length / 500;
  if (caption === input) {
    fuzzScore = 10;
  }
  return [snippet, fuzzScore];
};
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/editor/snippets.js.map