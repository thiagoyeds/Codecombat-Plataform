require.register("views/play/level/DialogueAnimator", function(exports, require, module) {
var DialogueAnimator;

module.exports = DialogueAnimator = (function() {
  DialogueAnimator.prototype.jqueryElement = null;

  DialogueAnimator.prototype.childrenToAdd = null;

  DialogueAnimator.prototype.charsToAdd = null;

  DialogueAnimator.prototype.childAnimator = null;

  function DialogueAnimator(html, jqueryElement) {
    var d;
    this.jqueryElement = jqueryElement;
    d = $('<div></div>').html(html);
    this.childrenToAdd = _.map(d[0].childNodes, function(e) {
      return e;
    });
    this.t0 = new Date();
    this.charsAdded = 0;
    this.charsPerSecond = 25;
  }

  DialogueAnimator.prototype.tick = function() {
    if (!this.charsToAdd && !this.childAnimator) {
      this.addNextElement();
    }
    if (this.charsToAdd) {
      this.addSingleChar();
      return;
    }
    if (this.childAnimator) {
      this.childAnimator.tick();
      if (this.childAnimator.done()) {
        return this.childAnimator = null;
      }
    }
  };

  DialogueAnimator.prototype.addNextElement = function() {
    var newElem, nextElem, value;
    if (!this.childrenToAdd.length) {
      return;
    }
    nextElem = this.childrenToAdd[0];
    this.childrenToAdd = this.childrenToAdd.slice(1);
    if (nextElem.nodeName === '#text') {
      return this.charsToAdd = nextElem.nodeValue;
    } else {
      value = nextElem.innerHTML;
      newElem = $(nextElem).html('');
      this.jqueryElement.append(newElem);
      if (value) {
        if (this.childAnimator) {
          this.charsAdded += this.childAnimator.getCharsAdded();
        }
        return this.childAnimator = new DialogueAnimator(value, newElem);
      }
    }
  };

  DialogueAnimator.prototype.addSingleChar = function() {
    var elapsed, nAdded, nToAdd, nToHaveBeenAdded;
    elapsed = (new Date()) - this.t0;
    nAdded = this.getCharsAdded();
    nToHaveBeenAdded = Math.round(this.charsPerSecond * elapsed / 1000);
    nToAdd = Math.min(nToHaveBeenAdded - nAdded, this.charsToAdd.length);
    this.jqueryElement.html(this.jqueryElement.html() + this.charsToAdd.slice(0, nToAdd));
    this.charsToAdd = this.charsToAdd.slice(nToAdd);
    if (this.charsToAdd.length === 0) {
      this.charsToAdd = null;
    }
    return this.charsAdded += nToAdd;
  };

  DialogueAnimator.prototype.getCharsAdded = function() {
    var ref, ref1;
    return this.charsAdded + ((ref = (ref1 = this.childAnimator) != null ? ref1.charsAdded : void 0) != null ? ref : 0);
  };

  DialogueAnimator.prototype.done = function() {
    if (this.childrenToAdd.length > 0) {
      return false;
    }
    if (this.charsToAdd) {
      return false;
    }
    if (this.childAnimator) {
      return false;
    }
    return true;
  };

  return DialogueAnimator;

})();
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/DialogueAnimator.js.map