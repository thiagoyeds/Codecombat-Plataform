require.register("views/play/level/modal/KeyboardShortcutsModal", function(exports, require, module) {
var KeyboardShortcutsModal, ModalView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/level/modal/keyboard_shortcuts');

module.exports = KeyboardShortcutsModal = (function(superClass) {
  extend(KeyboardShortcutsModal, superClass);

  function KeyboardShortcutsModal() {
    return KeyboardShortcutsModal.__super__.constructor.apply(this, arguments);
  }

  KeyboardShortcutsModal.prototype.id = 'keyboard-shortcuts-modal';

  KeyboardShortcutsModal.prototype.template = template;

  KeyboardShortcutsModal.prototype.isMac = function() {
    return false;
  };

  KeyboardShortcutsModal.prototype.getRenderData = function() {
    var c;
    c = KeyboardShortcutsModal.__super__.getRenderData.call(this);
    c.ctrl = this.isMac() ? '⌘' : '^';
    c.ctrlName = this.isMac() ? 'Cmd' : 'Ctrl';
    c.alt = this.isMac() ? '⌥' : '⎇';
    c.altName = this.isMac() ? 'Opt' : 'Alt';
    c.enter = $.i18n.t('keyboard_shortcuts.enter');
    c.space = $.i18n.t('keyboard_shortcuts.space');
    c.escapeKey = $.i18n.t('keyboard_shortcuts.escape');
    c.shift = $.i18n.t('keyboard_shortcuts.shift');
    return c;
  };

  return KeyboardShortcutsModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/modal/KeyboardShortcutsModal.js.map