require.register("views/play/level/tome/SpellDebugView", function(exports, require, module) {
var CocoView, Range, SpellDebugView, TokenIterator, ace, serializedClasses, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/tome/spell_debug');

ace = require('ace');

Range = ace.require('ace/range').Range;

TokenIterator = ace.require('ace/token_iterator').TokenIterator;

serializedClasses = {
  Thang: require('lib/world/thang'),
  Vector: require('lib/world/vector'),
  Rectangle: require('lib/world/rectangle'),
  Ellipse: require('lib/world/ellipse'),
  LineSegment: require('lib/world/line_segment')
};

module.exports = SpellDebugView = (function(superClass) {
  extend(SpellDebugView, superClass);

  SpellDebugView.prototype.className = 'spell-debug-view';

  SpellDebugView.prototype.template = template;

  SpellDebugView.prototype.subscriptions = {
    'god:new-world-created': 'onNewWorld',
    'god:debug-value-return': 'handleDebugValue',
    'god:debug-world-load-progress-changed': 'handleWorldLoadProgressChanged',
    'tome:cast-spells': 'onTomeCast',
    'surface:frame-changed': 'onFrameChanged',
    'tome:spell-has-changed-significantly-calculation': 'onSpellChangedCalculation'
  };

  SpellDebugView.prototype.events = {};

  function SpellDebugView(options) {
    this.notifyPropertyHovered = bind(this.notifyPropertyHovered, this);
    this.updateTooltipProgress = bind(this.updateTooltipProgress, this);
    this.onMouseMove = bind(this.onMouseMove, this);
    this.setTooltipProgress = bind(this.setTooltipProgress, this);
    this.setTooltipText = bind(this.setTooltipText, this);
    this.setTooltipKeyAndValue = bind(this.setTooltipKeyAndValue, this);
    this.calculateCurrentTimeString = bind(this.calculateCurrentTimeString, this);
    var className, serializedClass;
    SpellDebugView.__super__.constructor.call(this, options);
    this.ace = options.ace;
    this.thang = options.thang;
    this.spell = options.spell;
    this.progress = 0;
    this.variableStates = {};
    this.globals = {
      Math: Math,
      _: _,
      String: String,
      Number: Number,
      Array: Array,
      Object: Object
    };
    for (className in serializedClasses) {
      serializedClass = serializedClasses[className];
      this.globals[className] = serializedClass;
    }
    this.onMouseMove = _.throttle(this.onMouseMove, 25);
    this.cache = {};
    this.lastFrameRequested = -1;
    this.workerIsSimulating = false;
    this.spellHasChanged = false;
    this.currentFrame = 0;
    this.frameRate = 10;
    this.debouncedTooltipUpdate = _.debounce(this.updateTooltipProgress, 100);
  }

  SpellDebugView.prototype.pad2 = function(num) {
    if ((num == null) || num === 0) {
      return '00';
    } else {
      return (num < 10 ? '0' : '') + num;
    }
  };

  SpellDebugView.prototype.calculateCurrentTimeString = function() {
    var mins, secs, time;
    time = this.currentFrame / this.frameRate;
    mins = Math.floor(time / 60);
    secs = (time - mins * 60).toFixed(1);
    return mins + ":" + (this.pad2(secs));
  };

  SpellDebugView.prototype.setTooltipKeyAndValue = function(key, value) {
    var message;
    this.hideProgressBarAndShowText();
    message = "Time: " + (this.calculateCurrentTimeString()) + "\n" + key + ": " + value;
    this.$el.find('code').text(message);
    return this.$el.show().css(this.pos);
  };

  SpellDebugView.prototype.setTooltipText = function(text) {
    this.hideProgressBarAndShowText();
    this.$el.find('code').text(text);
    return this.$el.show().css(this.pos);
  };

  SpellDebugView.prototype.setTooltipProgress = function(progress) {
    this.showProgressBarAndHideText();
    this.$el.find('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
    return this.$el.show().css(this.pos);
  };

  SpellDebugView.prototype.showProgressBarAndHideText = function() {
    this.$el.find('pre').css('display', 'none');
    return this.$el.find('.progress').css('display', 'block');
  };

  SpellDebugView.prototype.hideProgressBarAndShowText = function() {
    this.$el.find('pre').css('display', 'block');
    return this.$el.find('.progress').css('display', 'none');
  };

  SpellDebugView.prototype.onTomeCast = function() {
    return this.invalidateCache();
  };

  SpellDebugView.prototype.invalidateCache = function() {
    return this.cache = {};
  };

  SpellDebugView.prototype.retrieveValueFromCache = function(thangID, spellID, variableChain, frame) {
    var joinedVariableChain, ref, ref1, ref2, value;
    joinedVariableChain = variableChain.join();
    value = (ref = this.cache[frame]) != null ? (ref1 = ref[thangID]) != null ? (ref2 = ref1[spellID]) != null ? ref2[joinedVariableChain] : void 0 : void 0 : void 0;
    return value != null ? value : void 0;
  };

  SpellDebugView.prototype.updateCache = function(thangID, spellID, variableChain, frame, value) {
    var currentObject, j, key, keyIndex, keys, ref;
    currentObject = this.cache;
    keys = [frame, thangID, spellID, variableChain.join()];
    for (keyIndex = j = 0, ref = keys.length - 1; 0 <= ref ? j < ref : j > ref; keyIndex = 0 <= ref ? ++j : --j) {
      key = keys[keyIndex];
      if (!(key in currentObject)) {
        currentObject[key] = {};
      }
      currentObject = currentObject[key];
    }
    return currentObject[keys[keys.length - 1]] = value;
  };

  SpellDebugView.prototype.handleDebugValue = function(e) {
    var key, value;
    key = e.key, value = e.value;
    this.workerIsSimulating = false;
    this.updateCache(this.thang.id, this.spell.name, key.split('.'), this.lastFrameRequested, value);
    if (this.variableChain && !key === this.variableChain.join('.')) {
      return;
    }
    return this.setTooltipKeyAndValue(key, value);
  };

  SpellDebugView.prototype.handleWorldLoadProgressChanged = function(e) {
    return this.progress = e.progress;
  };

  SpellDebugView.prototype.afterRender = function() {
    SpellDebugView.__super__.afterRender.call(this);
    return this.ace.on('mousemove', this.onMouseMove);
  };

  SpellDebugView.prototype.setVariableStates = function(variableStates) {
    this.variableStates = variableStates;
    return this.update();
  };

  SpellDebugView.prototype.isIdentifier = function(t) {
    return t && (t.type === 'identifier' || t.value === 'this' || this.globals[t.value]);
  };

  SpellDebugView.prototype.onMouseMove = function(e) {
    var chain, end, endOfLine, it, offsetX, offsetY, pos, prev, ref, ref1, ref2, ref3, ref4, start, token, w;
    if (this.destroyed) {
      return;
    }
    pos = e.getDocumentPosition();
    it = new TokenIterator(e.editor.session, pos.row, pos.column);
    endOfLine = ((ref = it.getCurrentToken()) != null ? ref.index : void 0) === it.$rowTokens.length - 1;
    while (it.getCurrentTokenRow() === pos.row && !this.isIdentifier(token = it.getCurrentToken())) {
      if (endOfLine || !token) {
        break;
      }
      it.stepBackward();
    }
    if (this.isIdentifier(token)) {
      start = it.getCurrentTokenColumn();
      ref1 = [[token.value], start, start + token.value.length], chain = ref1[0], start = ref1[1], end = ref1[2];
      while (it.getCurrentTokenRow() === pos.row) {
        it.stepBackward();
        if (((ref2 = it.getCurrentToken()) != null ? ref2.value : void 0) !== '.') {
          break;
        }
        it.stepBackward();
        token = null;
        if (!this.isIdentifier(prev = it.getCurrentToken())) {
          break;
        }
        token = prev;
        start = it.getCurrentTokenColumn();
        chain.unshift(token.value);
      }
    }
    if (token && (true || token.value in this.variableStates || token.value === 'this' || this.globals[token.value])) {
      this.variableChain = chain;
      offsetX = (ref3 = e.domEvent.offsetX) != null ? ref3 : e.clientX - $(e.domEvent.target).offset().left;
      offsetY = (ref4 = e.domEvent.offsetY) != null ? ref4 : e.clientY - $(e.domEvent.target).offset().top;
      w = $(document).width();
      if (e.clientX + 300 > w) {
        offsetX = w - $(e.domEvent.target).offset().left - 300;
      }
      this.pos = {
        left: offsetX + 50,
        top: offsetY + 20
      };
      this.markerRange = new Range(pos.row, start, pos.row, end);
    } else {
      this.variableChain = this.markerRange = null;
    }
    return this.update();
  };

  SpellDebugView.prototype.onMouseOut = function(e) {
    this.variableChain = this.markerRange = null;
    return this.update();
  };

  SpellDebugView.prototype.updateTooltipProgress = function() {
    if (this.variableChain && this.progress < 1) {
      this.setTooltipProgress(this.progress * 100);
      return _.delay(this.updateTooltipProgress, 100);
    }
  };

  SpellDebugView.prototype.onNewWorld = function(e) {
    if (this.thang) {
      this.thang = this.options.thang = e.world.thangMap[this.thang.id];
    }
    return this.frameRate = e.world.frameRate;
  };

  SpellDebugView.prototype.onFrameChanged = function(data) {
    this.currentFrame = Math.round(data.frame);
    return this.frameRate = data.world.frameRate;
  };

  SpellDebugView.prototype.onSpellChangedCalculation = function(data) {
    return this.spellHasChanged = data.hasChangedSignificantly;
  };

  SpellDebugView.prototype.update = function() {
    var cacheValue, ref;
    if (this.variableChain) {
      if (this.spellHasChanged) {
        this.setTooltipText('You\'ve changed this spell! \nPlease recast to use the hover debugger.');
      } else if (this.variableChain.length === 2 && this.variableChain[0] === 'this') {
        this.setTooltipKeyAndValue(this.variableChain.join('.'), this.stringifyValue(this.thang[this.variableChain[1]], 0));
      } else if (this.variableChain.length === 1 && Aether.globals[this.variableChain[0]]) {
        this.setTooltipKeyAndValue(this.variableChain.join('.'), this.stringifyValue(Aether.globals[this.variableChain[0]], 0));
      } else if (this.workerIsSimulating && this.progress < 1) {
        this.debouncedTooltipUpdate();
      } else if (this.currentFrame === this.lastFrameRequested && (cacheValue = this.retrieveValueFromCache(this.thang.id, this.spell.name, this.variableChain, this.currentFrame))) {
        this.setTooltipKeyAndValue(this.variableChain.join('.'), cacheValue);
      } else {
        Backbone.Mediator.publish('tome:spell-debug-value-request', {
          thangID: this.thang.id,
          spellID: this.spell.name,
          variableChain: this.variableChain,
          frame: this.currentFrame
        });
        if (this.currentFrame !== this.lastFrameRequested) {
          this.workerIsSimulating = true;
        }
        this.lastFrameRequested = this.currentFrame;
        this.progress = 0;
        this.debouncedTooltipUpdate();
      }
    } else {
      this.$el.hide();
    }
    if (((ref = this.variableChain) != null ? ref.length : void 0) === 2) {
      if (this.hoveredPropertyTimeout) {
        clearTimeout(this.hoveredPropertyTimeout);
      }
      this.hoveredPropertyTimeout = _.delay(this.notifyPropertyHovered, 500);
    } else {
      this.notifyPropertyHovered();
    }
    return this.updateMarker();
  };

  SpellDebugView.prototype.stringifyValue = function(value, depth) {
    var brackets, i, isArray, isObject, j, k, key, len, len1, prefix, ref, ref1, ref2, ref3, s, sep, size, v, values;
    if (!value || _.isString(value)) {
      return value;
    }
    if (_.isFunction(value)) {
      if (depth === 2) {
        return void 0;
      } else {
        return '<Function>';
      }
    }
    if (value === this.thang && depth) {
      return "<this " + value.id + ">";
    }
    if (depth === 2) {
      if (((ref = value.constructor) != null ? ref.className : void 0) === 'Thang') {
        value = "<" + (value.type || value.spriteName) + " - " + value.id + ", " + (value.pos ? value.pos.toString() : 'non-physical') + ">";
      } else {
        value = value.toString();
      }
      return value;
    }
    isArray = _.isArray(value);
    isObject = _.isObject(value);
    if (!(isArray || isObject)) {
      return value.toString();
    }
    brackets = isArray ? ['[', ']'] : ['{', '}'];
    size = _.size(value);
    if (!size) {
      return brackets.join('');
    }
    values = [];
    if (isArray) {
      for (j = 0, len = value.length; j < len; j++) {
        v = value[j];
        s = this.stringifyValue(v, depth + 1);
        if (s !== void 0) {
          values.push('' + s);
        }
      }
    } else {
      ref2 = (ref1 = value.apiProperties) != null ? ref1 : _.keys(value);
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        key = ref2[k];
        s = this.stringifyValue(value[key], depth + 1);
        if (s !== void 0) {
          values.push(key + ': ' + s);
        }
      }
    }
    sep = '\n' + ((function() {
      var l, ref3, results;
      results = [];
      for (i = l = 0, ref3 = depth; 0 <= ref3 ? l < ref3 : l > ref3; i = 0 <= ref3 ? ++l : --l) {
        results.push('  ');
      }
      return results;
    })()).join('');
    prefix = (ref3 = value.constructor) != null ? ref3.className : void 0;
    if (isArray) {
      if (prefix == null) {
        prefix = 'Array';
      }
    }
    if (isObject) {
      if (prefix == null) {
        prefix = 'Object';
      }
    }
    prefix = prefix ? prefix + ' ' : '';
    return "" + prefix + brackets[0] + sep + "  " + (values.join(sep + '  ')) + sep + brackets[1];
  };

  SpellDebugView.prototype.notifyPropertyHovered = function() {
    var oldHoveredProperty, ref;
    if (this.hoveredPropertyTimeout) {
      clearTimeout(this.hoveredPropertyTimeout);
    }
    this.hoveredPropertyTimeout = null;
    oldHoveredProperty = this.hoveredProperty;
    this.hoveredProperty = ((ref = this.variableChain) != null ? ref.length : void 0) === 2 ? {
      owner: this.variableChain[0],
      property: this.variableChain[1]
    } : {};
    if (!_.isEqual(oldHoveredProperty, this.hoveredProperty)) {
      return Backbone.Mediator.publish('tome:spell-debug-property-hovered', this.hoveredProperty);
    }
  };

  SpellDebugView.prototype.updateMarker = function() {
    if (this.marker) {
      this.ace.getSession().removeMarker(this.marker);
      this.marker = null;
    }
    if (this.markerRange) {
      return this.marker = this.ace.getSession().addMarker(this.markerRange, 'ace_bracket', 'text');
    }
  };

  SpellDebugView.prototype.destroy = function() {
    var ref;
    if ((ref = this.ace) != null) {
      ref.removeEventListener('mousemove', this.onMouseMove);
    }
    return SpellDebugView.__super__.destroy.call(this);
  };

  return SpellDebugView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/SpellDebugView.js.map