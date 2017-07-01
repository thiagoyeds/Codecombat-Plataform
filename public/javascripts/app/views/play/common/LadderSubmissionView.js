require.register("views/play/common/LadderSubmissionView", function(exports, require, module) {
var CocoView, LadderSubmissionView, LevelSession, createAetherOptions, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/common/ladder_submission');

createAetherOptions = require('lib/aether_utils').createAetherOptions;

LevelSession = require('models/LevelSession');

module.exports = LadderSubmissionView = (function(superClass) {
  extend(LadderSubmissionView, superClass);

  LadderSubmissionView.prototype.className = 'ladder-submission-view';

  LadderSubmissionView.prototype.template = template;

  LadderSubmissionView.prototype.events = {
    'click .rank-button': 'rankSession',
    'click .help-simulate': 'onHelpSimulate'
  };

  function LadderSubmissionView(options) {
    LadderSubmissionView.__super__.constructor.call(this, options);
    this.session = options.session;
    this.mirrorSession = options.mirrorSession;
    this.level = options.level;
  }

  LadderSubmissionView.prototype.getRenderData = function() {
    var ctx, ref, ref1, ref2, submitDate;
    ctx = LadderSubmissionView.__super__.getRenderData.call(this);
    ctx.readyToRank = (ref = this.session) != null ? ref.readyToRank() : void 0;
    ctx.isRanking = (ref1 = this.session) != null ? ref1.get('isRanking') : void 0;
    ctx.simulateURL = "/play/ladder/" + (this.level.get('slug')) + "#simulate";
    if (submitDate = (ref2 = this.session) != null ? ref2.get('submitDate') : void 0) {
      ctx.lastSubmitted = moment(submitDate).fromNow();
    }
    return ctx;
  };

  LadderSubmissionView.prototype.afterRender = function() {
    LadderSubmissionView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.rankButton = this.$el.find('.rank-button');
    return this.updateButton();
  };

  LadderSubmissionView.prototype.updateButton = function() {
    var rankingState, ref, ref1;
    rankingState = 'unavailable';
    if ((ref = this.session) != null ? ref.readyToRank() : void 0) {
      rankingState = 'rank';
    } else if ((ref1 = this.session) != null ? ref1.get('isRanking') : void 0) {
      rankingState = 'ranking';
    }
    return this.setRankingButtonText(rankingState);
  };

  LadderSubmissionView.prototype.setRankingButtonText = function(spanClass) {
    var helpSimulate, showLastSubmitted;
    this.rankButton.find('span').hide();
    this.rankButton.find("." + spanClass).show();
    this.rankButton.toggleClass('disabled', spanClass !== 'rank');
    helpSimulate = spanClass === 'submitted' || spanClass === 'ranking';
    this.$el.find('.help-simulate').toggle(helpSimulate, 'slow');
    showLastSubmitted = !(spanClass === 'submitting');
    return this.$el.find('.last-submitted').toggle(showLastSubmitted);
  };

  LadderSubmissionView.prototype.showApologeticSignupModal = function() {
    var CreateAccountModal;
    CreateAccountModal = require('views/core/CreateAccountModal');
    return this.openModalView(new CreateAccountModal({
      showRequiredError: true
    }));
  };

  LadderSubmissionView.prototype.rankSession = function(e) {
    var failure, success;
    if (!this.session.readyToRank()) {
      return;
    }
    if (me.get('anonymous')) {
      return this.showApologeticSignupModal();
    }
    this.playSound('menu-button-click');
    this.setRankingButtonText('submitting');
    success = (function(_this) {
      return function() {
        if (!_this.destroyed) {
          _this.setRankingButtonText('submitted');
        }
        return Backbone.Mediator.publish('ladder:game-submitted', {
          session: _this.session,
          level: _this.level
        });
      };
    })(this);
    failure = (function(_this) {
      return function(jqxhr, textStatus, errorThrown) {
        console.log(jqxhr.responseText);
        if (!_this.destroyed) {
          return _this.setRankingButtonText('failed');
        }
      };
    })(this);
    return this.session.save(null, {
      success: (function(_this) {
        return function() {
          var ajaxData, ajaxOptions, mirrorAjaxData, mirrorAjaxOptions, mirrorCode;
          ajaxData = {
            session: _this.session.id,
            levelID: _this.level.id,
            originalLevelID: _this.level.get('original'),
            levelMajorVersion: _this.level.get('version').major
          };
          ajaxOptions = {
            type: 'POST',
            data: ajaxData,
            success: success,
            error: failure
          };
          if (_this.mirrorSession && _this.mirrorSession.get('submittedCode')) {
            mirrorAjaxData = _.clone(ajaxData);
            mirrorAjaxData.session = _this.mirrorSession.id;
            mirrorCode = _this.mirrorSession.get('code');
            if (_this.session.get('team') === 'humans') {
              mirrorCode['hero-placeholder-1'] = _this.session.get('code')['hero-placeholder'];
            } else {
              mirrorCode['hero-placeholder'] = _this.session.get('code')['hero-placeholder-1'];
            }
            mirrorAjaxOptions = _.clone(ajaxOptions);
            mirrorAjaxOptions.data = mirrorAjaxData;
            ajaxOptions.success = function() {
              var patch, tempSession;
              patch = {
                code: mirrorCode,
                codeLanguage: _this.session.get('codeLanguage')
              };
              tempSession = new LevelSession({
                _id: _this.mirrorSession.id
              });
              return tempSession.save(patch, {
                patch: true,
                type: 'PUT',
                success: function() {
                  return $.ajax('/queue/scoring', mirrorAjaxOptions);
                }
              });
            };
          }
          return $.ajax('/queue/scoring', ajaxOptions);
        };
      })(this)
    });
  };

  LadderSubmissionView.prototype.onHelpSimulate = function() {
    this.playSound('menu-button-click');
    return $('a[href="#simulate"]').tab('show');
  };

  return LadderSubmissionView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/common/LadderSubmissionView.js.map