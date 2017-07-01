require.register("views/admin/CodePlaybackView", function(exports, require, module) {
var CocoView, CodeLog, CodePlaybackView, ace, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

CodeLog = require('models/CodeLog');

ace = require('ace');

utils = require('core/utils');

template = require('templates/admin/codeplayback-view');

module.exports = CodePlaybackView = (function(superClass) {
  extend(CodePlaybackView, superClass);

  CodePlaybackView.prototype.id = 'codeplayback-view';

  CodePlaybackView.prototype.template = template;

  CodePlaybackView.prototype.controlsEnabled = true;

  CodePlaybackView.prototype.events = {
    'click #play-button': 'onPlayClicked',
    'input #slider': 'onSliderInput',
    'click #pause-button': 'onPauseClicked',
    'click .speed-button': 'onSpeedButtonClicked'
  };

  function CodePlaybackView(options) {
    this.updateSlider = bind(this.updateSlider, this);
    CodePlaybackView.__super__.constructor.call(this);
    this.spade = new Spade();
    this.options = options;
    this.options.decompressedLog = LZString.decompressFromUTF16(this.options.rawLog);
    if (this.options.decompressedLog == null) {
      return;
    }
    this.options.events = this.spade.expand(JSON.parse(this.options.decompressedLog));
    this.maxTime = this.options.events[this.options.events.length - 1].timestamp;
  }

  CodePlaybackView.prototype.afterRender = function() {
    var div, ev, i, len, ref, results;
    if (this.options.events == null) {
      return;
    }
    this.ace = ace.edit('acearea');
    this.ace.$blockScrolling = Infinity;
    this.ace.setValue(this.options.events[0].difContent);
    this.$el.find('#start-time').text('0s');
    this.$el.find('#end-time').text((this.maxTime / 1000) + 's');
    ref = this.options.events;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      ev = ref[i];
      div = $('<div></div>');
      div.addClass('event');
      div.css('left', "calc(" + ((ev.timestamp / this.maxTime) * 100) + "% + 7px - " + (15 * ev.timestamp / this.maxTime) + "px)");
      results.push(this.$el.find('#slider-container').prepend(div));
    }
    return results;
  };

  CodePlaybackView.prototype.updateSlider = function() {
    this.$el.find('#slider')[0].value = (this.spade.elapsedTime / this.maxTime) * 100;
    this.$el.find('#start-time').text((this.spade.elapsedTime / 1000).toFixed(0) + 's');
    if (this.spade.elapsedTime >= this.maxTime) {
      return this.clearPlayback();
    }
  };

  CodePlaybackView.prototype.onPlayClicked = function(e) {
    this.clearPlayback();
    this.spade.play(this.options.events, this.ace, this.$el.find('#slider')[0].value / 100);
    return this.interval = setInterval(this.updateSlider, 1);
  };

  CodePlaybackView.prototype.onSpeedButtonClicked = function(e) {
    this.spade.speed = $(e.target).data('speed');
    $(e.target).siblings().removeClass('clicked');
    return $(e.target).addClass('clicked');
  };

  CodePlaybackView.prototype.onSliderInput = function(e) {
    var render;
    this.clearPlayback();
    this.$el.find('#start-time').text(((this.$el.find('#slider')[0].value / 100 * this.maxTime) / 1000).toFixed(0) + 's');
    render = this.spade.renderTime(this.options.events, this.ace, this.$el.find('#slider')[0].value / 100);
    this.ace.setValue(render.result);
    if ((render.selFIndex != null) && (render.selEIndex != null)) {
      this.ace.selection.moveCursorToPosition(render.selFIndex);
      return this.ace.selection.setSelectionAnchor(render.selEIndex.row, render.selEIndex.column);
    }
  };

  CodePlaybackView.prototype.clearPlayback = function() {
    if (this.interval != null) {
      clearInterval(this.interval);
    }
    this.interval = void 0;
    if (this.spade.playback != null) {
      clearInterval(this.spade.playback);
    }
    return this.spade.playback = void 0;
  };

  CodePlaybackView.prototype.onPauseClicked = function(e) {
    return this.clearPlayback();
  };

  CodePlaybackView.prototype.destroy = function() {
    this.clearPlayback();
    return CodePlaybackView.__super__.destroy.call(this);
  };

  return CodePlaybackView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/CodePlaybackView.js.map