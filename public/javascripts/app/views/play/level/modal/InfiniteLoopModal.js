require.register("views/play/level/modal/InfiniteLoopModal", function(exports, require, module) {
var InfiniteLoopModal, ModalView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/level/modal/infinite_loop');

module.exports = InfiniteLoopModal = (function(superClass) {
  extend(InfiniteLoopModal, superClass);

  function InfiniteLoopModal() {
    return InfiniteLoopModal.__super__.constructor.apply(this, arguments);
  }

  InfiniteLoopModal.prototype.id = '#infinite-loop-modal';

  InfiniteLoopModal.prototype.template = template;

  InfiniteLoopModal.prototype.events = {
    'click #restart-level-infinite-loop-retry-button': function() {
      return Backbone.Mediator.publish('tome:cast-spell', {});
    },
    'click #restart-level-infinite-loop-confirm-button': function() {
      return Backbone.Mediator.publish('level:restart', {});
    },
    'click #restart-level-infinite-loop-comment-button': function() {
      return Backbone.Mediator.publish('tome:comment-my-code', {});
    }
  };

  return InfiniteLoopModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/modal/InfiniteLoopModal.js.map