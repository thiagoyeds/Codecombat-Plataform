require.register("views/play/level/LevelChatView", function(exports, require, module) {
var CocoView, LevelBus, LevelChatView, me, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/chat');

me = require('core/auth').me;

LevelBus = require('lib/LevelBus');

module.exports = LevelChatView = (function(superClass) {
  extend(LevelChatView, superClass);

  LevelChatView.prototype.id = 'level-chat-view';

  LevelChatView.prototype.template = template;

  LevelChatView.prototype.open = false;

  LevelChatView.prototype.events = {
    'keypress textarea': 'onChatKeydown',
    'click i': 'onIconClick'
  };

  LevelChatView.prototype.subscriptions = {
    'bus:new-message': 'onNewMessage'
  };

  function LevelChatView(options) {
    this.clearOldMessages = bind(this.clearOldMessages, this);
    this.levelID = options.levelID;
    this.session = options.session;
    this.listenTo(this.session, 'change:multiplayer', this.updateMultiplayerVisibility);
    this.sessionID = options.sessionID;
    this.bus = LevelBus.get(this.levelID, this.sessionID);
    LevelChatView.__super__.constructor.call(this);
    this.regularlyClearOldMessages();
    this.playNoise = _.debounce(this.playNoise, 100);
  }

  LevelChatView.prototype.updateMultiplayerVisibility = function() {
    var e, error;
    if (this.$el == null) {
      return;
    }
    try {
      return this.$el.toggle(Boolean(this.session.get('multiplayer')));
    } catch (error) {
      e = error;
      return console.error("Couldn't toggle the style on the LevelChatView to " + (Boolean(this.session.get('multiplayer'))) + " because of an error:", e);
    }
  };

  LevelChatView.prototype.afterRender = function() {
    this.chatTables = $('table', this.$el);
    return this.updateMultiplayerVisibility();
  };

  LevelChatView.prototype.regularlyClearOldMessages = function() {
    return this.clearOldMessagesInterval = setInterval(this.clearOldMessages, 5000);
  };

  LevelChatView.prototype.clearOldMessages = function() {
    var added, j, len, results, row, rows;
    rows = $('.closed-chat-area tr');
    results = [];
    for (j = 0, len = rows.length; j < len; j++) {
      row = rows[j];
      row = $(row);
      added = row.data('added');
      if (new Date().getTime() - added > 60 * 1000) {
        results.push(row.fadeOut(1000, function() {
          return $(this).remove();
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  LevelChatView.prototype.onNewMessage = function(e) {
    if (!e.message.system) {
      this.$el.show();
    }
    this.addOne(e.message);
    this.trimClosedPanel();
    if (e.message.authorID !== me.id) {
      return this.playNoise();
    }
  };

  LevelChatView.prototype.playNoise = function() {
    return this.playSound('chat_received');
  };

  LevelChatView.prototype.messageObjectToJQuery = function(message) {
    var content, td, tr;
    td = $('<td></td>');
    content = message.content;
    content = _.string.escapeHTML(content);
    content = content.replace(/\n/g, '<br/>');
    content = content.replace(RegExp('  ', 'g'), '&nbsp; ');
    if (_.string.startsWith(content, '/me')) {
      content = message.authorName + content.slice(3);
    }
    if (message.system) {
      td.append($('<span class="system"></span>').html(content));
    } else if (_.string.startsWith(content, '/me')) {
      td.append($('<span class="action"></span>').html(content));
    } else {
      td.append($('<strong></strong>').text(message.authorName + ': '));
      td.append($('<span></span>').html(content));
    }
    tr = $('<tr></tr>');
    if (message.authorID === me.id) {
      tr.addClass('me');
    }
    return tr.append(td);
  };

  LevelChatView.prototype.addOne = function(message) {
    var distanceFromBottom, doScroll, height, openPanel, tr;
    if (message.system && message.authorID === me.id) {
      return;
    }
    if (this.open) {
      openPanel = $('.open-chat-area', this.$el);
      height = openPanel.outerHeight();
      distanceFromBottom = openPanel[0].scrollHeight - height - openPanel[0].scrollTop;
      doScroll = distanceFromBottom < 10;
    }
    tr = this.messageObjectToJQuery(message);
    tr.data('added', new Date().getTime());
    this.chatTables.append(tr);
    if (doScroll) {
      return this.scrollDown();
    }
  };

  LevelChatView.prototype.trimClosedPanel = function() {
    var closedPanel, i, j, len, limit, results, row, rows;
    closedPanel = $('.closed-chat-area', this.$el);
    limit = 5;
    rows = $('tr', closedPanel);
    results = [];
    for (i = j = 0, len = rows.length; j < len; i = ++j) {
      row = rows[i];
      if (rows.length - i <= limit) {
        break;
      }
      results.push(row.remove());
    }
    return results;
  };

  LevelChatView.prototype.onChatKeydown = function(e) {
    var message;
    if (key.isPressed('enter')) {
      message = _.string.strip($(e.target).val());
      if (!message) {
        return false;
      }
      this.bus.sendMessage(message);
      $(e.target).val('');
      return false;
    }
  };

  LevelChatView.prototype.onIconClick = function() {
    var closedPanel, openPanel, sel;
    this.open = !this.open;
    openPanel = $('.open-chat-area', this.$el).toggle(this.open);
    closedPanel = $('.closed-chat-area', this.$el).toggle(!this.open);
    if (this.open) {
      this.scrollDown();
    }
    if (window.getSelection != null) {
      sel = window.getSelection();
      if (typeof sel.empty === "function") {
        sel.empty();
      }
      return typeof sel.removeAllRanges === "function" ? sel.removeAllRanges() : void 0;
    } else {
      return document.selection.empty();
    }
  };

  LevelChatView.prototype.scrollDown = function() {
    var openPanel;
    openPanel = $('.open-chat-area', this.$el)[0];
    return openPanel.scrollTop = openPanel.scrollHeight || 1000000;
  };

  LevelChatView.prototype.destroy = function() {
    key.deleteScope('level');
    if (this.clearOldMessagesInterval) {
      clearInterval(this.clearOldMessagesInterval);
    }
    return LevelChatView.__super__.destroy.call(this);
  };

  return LevelChatView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/LevelChatView.js.map