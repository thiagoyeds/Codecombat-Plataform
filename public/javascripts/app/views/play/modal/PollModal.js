require.register("templates/play/modal/poll-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,i18n = locals_.i18n,poll = locals_.poll,marked = locals_.marked,me = locals_.me;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h1><span>" + (jade.escape(null == (jade.interp = i18n(poll.attributes, "name")) ? "" : jade.interp)) + "</span></h1></div><div class=\"modal-body\"><div class=\"description\">");
if ( poll.get("description"))
{
buf.push("<div>" + (null == (jade.interp = marked(i18n(poll.attributes, "description"))) ? "" : jade.interp) + "</div>");
}
else
{
buf.push("<div>&nbsp;</div>");
}
buf.push("</div><div class=\"answers-container-wrapper\"><div class=\"answers-container\"><table class=\"table table-hover\">");
// iterate poll.get("answers") || []
;(function(){
  var $$obj = poll.get("answers") || [];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var answer = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'data-answer':(answer.key), "class": [("answer")] }, {"class":true,"data-answer":true})) + "><td>" + (null == (jade.interp = marked(i18n(answer, "text"))) ? "" : jade.interp) + "</td><td class=\"graph-cell\"><div class=\"progress\"><div class=\"progress-bar\"></div></div></td><td class=\"votes-cell\"><span class=\"badge vote-percentage\"></span></td>");
if ( me.isAdmin())
{
buf.push("<td class=\"votes-cell\"><span class=\"badge vote-count\"></span></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var answer = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'data-answer':(answer.key), "class": [("answer")] }, {"class":true,"data-answer":true})) + "><td>" + (null == (jade.interp = marked(i18n(answer, "text"))) ? "" : jade.interp) + "</td><td class=\"graph-cell\"><div class=\"progress\"><div class=\"progress-bar\"></div></div></td><td class=\"votes-cell\"><span class=\"badge vote-percentage\"></span></td>");
if ( me.isAdmin())
{
buf.push("<td class=\"votes-cell\"><span class=\"badge vote-count\"></span></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table></div></div><div class=\"random-gems-container-wrapper\"><div class=\"random-gems-container\"><code class=\"random-gems-code\"><span>randomNumber = Math.random()                   </span><span id=\"random-number-comment\" class=\"comment\"></span></code><code class=\"random-gems-code\"><span>gems = Math.ceil(2 * randomNumber * me.level)  </span><span id=\"random-gems-comment\" class=\"comment\"></span></code><code class=\"random-gems-code\"><span>me.gems += gems                                </span><span id=\"total-gems-comment\" class=\"comment\"></span></code></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"play_level.done\" class=\"btn btn-illustrated btn-lg done-button\">Done</button></div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/play/modal/PollModal", function(exports, require, module) {
var ModalView, PollModal, UserPollsRecord, commentStarts, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/modal/poll-modal');

utils = require('core/utils');

UserPollsRecord = require('models/UserPollsRecord');

module.exports = PollModal = (function(superClass) {
  extend(PollModal, superClass);

  PollModal.prototype.id = 'poll-modal';

  PollModal.prototype.template = template;

  PollModal.prototype.subscriptions = {};

  PollModal.prototype.events = {
    'click #close-modal': 'hide',
    'click .answer:not(.selected)': 'onClickAnswer'
  };

  function PollModal(options) {
    var ref, ref1;
    PollModal.__super__.constructor.call(this, options);
    this.poll = options.poll;
    this.userPollsRecord = options.userPollsRecord;
    this.previousAnswer = ((ref = this.userPollsRecord.get('polls')) != null ? ref : {})[this.poll.id];
    this.previousReward = ((ref1 = this.userPollsRecord.get('rewards')) != null ? ref1 : {})[this.poll.id];
  }

  PollModal.prototype.getRenderData = function(c) {
    c = PollModal.__super__.getRenderData.call(this, c);
    c.poll = this.poll;
    c.i18n = utils.i18n;
    c.marked = marked;
    return c;
  };

  PollModal.prototype.afterRender = function() {
    PollModal.__super__.afterRender.call(this);
    this.playSound('game-menu-open');
    return this.updateAnswers();
  };

  PollModal.prototype.onHidden = function() {
    PollModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  PollModal.prototype.updateAnswers = function(answered) {
    var $answer, answer, j, k, len, len1, maxVotes, myAnswer, ref, ref1, ref2, ref3, totalVotes, votePercentage, votes, widthPercentage;
    myAnswer = ((ref = this.userPollsRecord.get('polls')) != null ? ref : {})[this.poll.id];
    answered = myAnswer != null;
    this.$el.find('table, .random-gems-container-wrapper').toggleClass('answered', answered);
    if (!answered) {
      return;
    }
    this.awardRandomGems();
    ref1 = [0, 0], maxVotes = ref1[0], totalVotes = ref1[1];
    ref2 = this.poll.get('answers') || [];
    for (j = 0, len = ref2.length; j < len; j++) {
      answer = ref2[j];
      votes = answer.votes || 0;
      if (answer.key === this.previousAnswer) {
        --votes;
      }
      if (answer.key === myAnswer) {
        ++votes;
      }
      answer.votes = votes;
      totalVotes += votes;
      maxVotes = Math.max(maxVotes, votes || 0);
    }
    this.previousAnswer = myAnswer;
    this.poll.set('answers', this.poll.get('answers'));
    ref3 = this.poll.get('answers');
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      answer = ref3[k];
      $answer = this.$el.find(".answer[data-answer='" + answer.key + "']");
      $answer.toggleClass('selected', answer.key === myAnswer);
      votes = answer.votes || 0;
      if (!totalVotes) {
        votes = maxVotes = totalVotes = 1;
      }
      widthPercentage = (100 * votes / maxVotes) + '%';
      votePercentage = Math.round(100 * votes / totalVotes) + '%';
      $answer.find('.progress-bar').css('width', '0%').animate({
        width: widthPercentage
      }, 'slow');
      $answer.find('.vote-percentage').text(votePercentage);
      if (me.isAdmin()) {
        $answer.find('.vote-count').text(votes);
      }
    }
    return this.trigger('vote-updated');
  };

  PollModal.prototype.onClickAnswer = function(e) {
    var $selectedAnswer, pollVotes, ref;
    $selectedAnswer = $(e.target).closest('.answer');
    pollVotes = (ref = this.userPollsRecord.get('polls')) != null ? ref : {};
    pollVotes[this.poll.id] = $selectedAnswer.data('answer').toString();
    this.userPollsRecord.set('polls', pollVotes);
    this.updateAnswers(true);
    return this.userPollsRecord.save({
      polls: pollVotes
    }, {
      success: (function(_this) {
        return function() {
          return typeof _this.awardRandomGems === "function" ? _this.awardRandomGems() : void 0;
        };
      })(this)
    });
  };

  PollModal.prototype.awardRandomGems = function() {
    var commentStart, fn, gemNoisesPlayed, i, j, playSound, randomGems, randomNumber, ref, ref1, ref2, reward, totalGems;
    if (!(reward = ((ref = this.userPollsRecord.get('rewards')) != null ? ref : {})[this.poll.id])) {
      return;
    }
    this.$randomNumber = this.$el.find('#random-number-comment').empty();
    this.$randomGems = this.$el.find('#random-gems-comment').hide();
    this.$totalGems = this.$el.find('#total-gems-comment').hide();
    commentStart = commentStarts[(ref1 = (ref2 = me.get('aceConfig')) != null ? ref2.language : void 0) != null ? ref1 : 'python'];
    randomNumber = reward.random;
    randomGems = Math.ceil(2 * randomNumber * reward.level);
    totalGems = this.previousReward ? me.gems() : Math.round(me.gems() + randomGems);
    playSound = this.playSound;
    if (this.previousReward) {
      utils.replaceText(this.$randomNumber.show(), commentStart + randomNumber.toFixed(7));
      utils.replaceText(this.$randomGems.show(), commentStart + randomGems);
      return utils.replaceText(this.$totalGems.show(), commentStart + totalGems);
    } else {
      gemNoisesPlayed = 0;
      fn = (function(_this) {
        return function(i) {
          _this.$randomNumber.queue(function() {
            var gemTrigger, number;
            number = i === 1000 ? randomNumber : Math.random();
            utils.replaceText($(this), commentStart + number.toFixed(7));
            $(this).dequeue();
            if (Math.random() < randomGems / 40) {
              gemTrigger = 'gem-' + (gemNoisesPlayed % 4);
              ++gemNoisesPlayed;
              return playSound(gemTrigger, 0.475 + i / 2000);
            }
          });
          return _this.$randomNumber.delay(25);
        };
      })(this);
      for (i = j = 0; j <= 1000; i = j += 25) {
        fn(i);
      }
      this.$randomGems.delay(1100).queue(function() {
        utils.replaceText($(this), commentStart + randomGems);
        $(this).show();
        return $(this).dequeue();
      });
      this.$totalGems.delay(1200).queue(function() {
        utils.replaceText($(this), commentStart + totalGems);
        $(this).show();
        return $(this).dequeue();
      });
      this.previousReward = reward;
      return _.delay(((function(_this) {
        return function() {
          var earned, ref3;
          if (_this.destroyed) {
            return;
          }
          earned = (ref3 = me.get('earned')) != null ? ref3 : {};
          earned.gems += randomGems;
          me.set('earned', earned);
          return me.trigger('change:earned');
        };
      })(this)), 1200);
    }
  };

  return PollModal;

})(ModalView);

commentStarts = {
  javascript: '// ',
  python: '# ',
  coffeescript: '# ',
  lua: '-- ',
  java: '// '
};
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/PollModal.js.map