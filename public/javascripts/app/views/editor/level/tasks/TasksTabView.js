require.register("views/editor/level/tasks/TasksTabView", function(exports, require, module) {
var CocoView, Level, TasksTabView, defaultTasks, deprecatedTaskNames, heroBased, ladder, notWebDev, renamedTaskNames, tasksForLevel, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/tasks-tab');

Level = require('models/Level');

module.exports = TasksTabView = (function(superClass) {
  extend(TasksTabView, superClass);

  function TasksTabView() {
    return TasksTabView.__super__.constructor.apply(this, arguments);
  }

  TasksTabView.prototype.id = 'editor-level-tasks-tab-view';

  TasksTabView.prototype.className = 'tab-pane';

  TasksTabView.prototype.template = template;

  TasksTabView.prototype.events = {
    'click .task-row': 'onClickTaskRow',
    'click .task-input': 'onClickTaskInput',
    'click .start-edit': 'onClickStartEdit',
    'click #create-task': 'onClickCreateTask',
    'keydown #cur-edit': 'onKeyDownCurEdit',
    'blur #cur-edit': 'onBlurCurEdit'
  };

  TasksTabView.prototype.subscriptions = {
    'editor:level-loaded': 'onLevelLoaded'
  };

  TasksTabView.prototype.applyTaskName = function(_task, _input) {
    var name, potentialTask;
    name = _input.value;
    potentialTask = this.tasks.findWhere({
      'name': _input
    });
    if (potentialTask && potentialTask !== _task) {
      noty({
        timeout: 5000,
        text: 'Task with name already exists!',
        type: 'error',
        layout: 'topCenter'
      });
      return _input.focus();
    } else if (name === '') {
      this.tasks.remove(_task);
      this.pushTasks();
      return this.render();
    } else {
      _task.set('name', name);
      _task.set('curEdit', false);
      this.pushTasks();
      return this.render();
    }
  };

  TasksTabView.prototype.focusEditInput = function() {
    var editInput, len;
    editInput = this.$('#cur-edit')[0];
    if (editInput) {
      editInput.focus();
      len = editInput.value.length * 2;
      return editInput.setSelectionRange(len, len);
    }
  };

  TasksTabView.prototype.getTaskByCID = function(_cid) {
    return this.tasks.get(_cid);
  };

  TasksTabView.prototype.taskMap = function() {
    var ref;
    return (ref = this.tasks) != null ? ref.map(function(_obj) {
      return {
        name: _obj.get('name'),
        complete: _obj.get('complete') || false
      };
    }) : void 0;
  };

  TasksTabView.prototype.taskArray = function() {
    var ref;
    return (ref = this.tasks) != null ? ref.toArray() : void 0;
  };

  TasksTabView.prototype.onLevelLoaded = function(e) {
    var Task, TaskList;
    this.level = e.level;
    this.defaultTasks = tasksForLevel(this.level);
    this.level.set('tasks', _.clone(this.defaultTasks));
    Task = Backbone.Model.extend({
      initialize: function() {
        var ref, ref1;
        if ((e != null ? (ref = e.level) != null ? (ref1 = ref._revertAttributes) != null ? ref1.tasks : void 0 : void 0 : void 0) != null) {
          if (_.find(e.level._revertAttributes.tasks, {
            name: arguments[0].name
          })) {
            return this.set('revert', _.find(e.level._revertAttributes.tasks, {
              name: arguments[0].name
            }));
          } else {
            return this.set('revert', arguments[0]);
          }
        } else {
          return this.set('revert', arguments[0]);
        }
      }
    });
    TaskList = Backbone.Collection.extend({
      model: Task
    });
    this.tasks = new TaskList(this.level.get('tasks'));
    this.pushTasks();
    return this.render();
  };

  TasksTabView.prototype.pushTasks = function() {
    return this.level.set('tasks', this.taskMap());
  };

  TasksTabView.prototype.onClickTaskRow = function(e) {
    var checkbox, task;
    if (!$(e.target).is('input') && !$(e.target).is('a') && !$(e.target).hasClass('start-edit') && this.$('#cur-edit').length === 0) {
      task = this.tasks.get($(e.target).closest('tr').data('task-cid'));
      checkbox = $(e.currentTarget).find('.task-input')[0];
      if (task.get('complete')) {
        task.set('complete', false);
      } else {
        task.set('complete', true);
      }
      checkbox.checked = task.get('complete');
      return this.pushTasks();
    }
  };

  TasksTabView.prototype.onClickTaskInput = function(e) {
    var task;
    task = this.tasks.get($(e.target).closest('tr').data('task-cid'));
    task.set('complete', e.currentTarget.checked);
    return this.pushTasks();
  };

  TasksTabView.prototype.onClickStartEdit = function(e) {
    var task;
    if (this.$('#cur-edit').length === 0) {
      task = this.tasks.get($(e.target).closest('tr').data('task-cid'));
      task.set('curEdit', true);
      this.render();
      return this.focusEditInput();
    }
  };

  TasksTabView.prototype.onKeyDownCurEdit = function(e) {
    var editInput;
    if (e.keyCode === 13) {
      editInput = this.$('#cur-edit')[0];
      return editInput.blur();
    }
  };

  TasksTabView.prototype.onBlurCurEdit = function(e) {
    var editInput, task;
    editInput = this.$('#cur-edit')[0];
    task = this.tasks.get($(e.target).closest('tr').data('task-cid'));
    return this.applyTaskName(task, editInput);
  };

  TasksTabView.prototype.onClickCreateTask = function(e) {
    if (this.$('#cur-edit').length === 0) {
      this.tasks.add({
        name: '',
        complete: false,
        curEdit: true,
        revert: {
          name: 'null',
          complete: false
        }
      });
      this.render();
      return this.focusEditInput();
    }
  };

  TasksTabView.prototype.getTaskURL = function(_n) {
    if (_.find(this.defaultTasks, {
      name: _n
    }) != null) {
      return _.string.slugify(_n);
    }
    return null;
  };

  return TasksTabView;

})(CocoView);

notWebDev = ['hero', 'course', 'hero-ladder', 'course-ladder', 'game-dev'];

heroBased = ['hero', 'course', 'hero-ladder', 'course-ladder'];

ladder = ['hero-ladder', 'course-ladder'];

defaultTasks = [
  {
    name: 'Set level type.',
    complete: function(level) {
      return level.get('type');
    }
  }, {
    name: 'Name the level.'
  }, {
    name: 'Create a Referee stub, if needed.',
    types: notWebDev
  }, {
    name: 'Replace "Hero Placeholder" with mcp.',
    types: ['game-dev']
  }, {
    name: 'Do basic set decoration.',
    types: notWebDev
  }, {
    name: 'Publish.',
    complete: function(level) {
      return level.isPublished();
    }
  }, {
    name: 'Choose the Existence System lifespan and frame rate.',
    types: notWebDev
  }, {
    name: 'Choose the UI System paths and coordinate hover if needed.',
    types: notWebDev
  }, {
    name: 'Choose the AI System pathfinding and Vision System line of sight.',
    types: notWebDev
  }, {
    name: 'Build the level.'
  }, {
    name: 'Set up goals.'
  }, {
    name: 'Add the "win-game" goal.',
    types: ['game-dev']
  }, {
    name: 'Write the sample code.',
    complete: function(level) {
      if (level.isType('web-dev')) {
        return level.getSampleCode().html;
      } else {
        return level.getSampleCode().javascript && level.getSampleCode().python;
      }
    }
  }, {
    name: 'Write the solution.',
    complete: function(level) {
      if (level.isType('web-dev')) {
        return _.find(level.getSolutions(), {
          language: 'html'
        });
      } else {
        return _.find(level.getSolutions(), {
          language: 'javascript'
        }) && _.find(level.getSolutions(), {
          language: 'python'
        });
      }
    }
  }, {
    name: 'Make both teams playable and non-defaulted.',
    types: ladder
  }, {
    name: 'Set up goals for both teams.',
    types: ladder
  }, {
    name: 'Fill out the sample code for both Hero Placeholders.',
    types: ladder
  }, {
    name: 'Fill out default AI for both Hero Placeholders.',
    types: ladder
  }, {
    name: 'Make sure the level ends promptly on success and failure.'
  }, {
    name: 'Adjust script camera bounds.',
    types: notWebDev
  }, {
    name: 'Choose music file in Introduction script.',
    types: notWebDev
  }, {
    name: 'Choose autoplay in Introduction script.',
    types: heroBased
  }, {
    name: 'Write the description.'
  }, {
    name: 'Write the guide.'
  }, {
    name: 'Write intro guide.'
  }, {
    name: 'Write a loading tip, if needed.',
    complete: function(level) {
      return level.get('loadingTip');
    }
  }, {
    name: 'Add programming concepts covered.'
  }, {
    name: 'Set level kind.',
    complete: function(level) {
      return level.get('kind');
    }
  }, {
    name: 'Mark whether it requires a subscription.',
    complete: function(level) {
      return level.get('requiresSubscription') != null;
    }
  }, {
    name: 'Choose leaderboard score types.',
    types: ['hero', 'course'],
    complete: function(level) {
      return level.get('scoreTypes') != null;
    }
  }, {
    name: 'Do thorough set decoration.',
    types: notWebDev
  }, {
    name: 'Playtest with a slow/tough hero.',
    types: ['hero', 'hero-ladder']
  }, {
    name: 'Playtest with a fast/weak hero.',
    types: ['hero', 'hero-ladder']
  }, {
    name: 'Playtest with a couple random seeds.',
    types: heroBased
  }, {
    name: 'Remove/simplify unnecessary doodad collision.',
    types: notWebDev
  }, {
    name: 'Add to a campaign.'
  }, {
    name: 'Choose level options like required/restricted gear.',
    types: ['hero', 'hero-ladder']
  }, {
    name: 'Create achievements, including unlocking next level.'
  }, {
    name: 'Configure the hero\'s expected equipment.',
    types: ['hero', 'course', 'course-ladder']
  }, {
    name: 'Configure the API docs.',
    types: ['web-dev', 'game-dev']
  }, {
    name: 'Write victory text.',
    complete: function(level) {
      var ref;
      return (ref = level.get('victory')) != null ? ref.body : void 0;
    }
  }, {
    name: 'Write level hints.'
  }, {
    name: 'Set up solutions for the Verifier.'
  }, {
    name: 'Click the Populate i18n button.'
  }, {
    name: 'Add slug to ladder levels that should be simulated, if needed.',
    types: ladder
  }, {
    name: 'Write the advanced AIs (shaman, brawler, chieftain, etc).',
    types: ladder
  }, {
    name: 'Add achievements for defeating the advanced AIs.',
    types: ['hero-ladder']
  }, {
    name: 'Release to adventurers.'
  }, {
    name: 'Release to everyone.'
  }, {
    name: 'Create two sample projects.',
    types: ['game-dev', 'web-dev']
  }, {
    name: 'Write Lua sample code.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return level.getSampleCode().lua;
    }
  }, {
    name: 'Write Java sample code.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return level.getSampleCode().java;
    }
  }, {
    name: 'Write CoffeeScript sample code.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return level.getSampleCode().coffeescript;
    }
  }, {
    name: 'Write Lua solution.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return _.find(level.getSolutions(), {
        language: 'lua'
      });
    }
  }, {
    name: 'Write Java solution.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return _.find(level.getSolutions(), {
        language: 'java'
      });
    }
  }, {
    name: 'Write CoffeeScript solution.',
    types: notWebDev,
    optional: true,
    complete: function(level) {
      return _.find(level.getSolutions(), {
        language: 'coffeescript'
      });
    }
  }
];

deprecatedTaskNames = ['Add Io/Clojure/Lua/CoffeeScript.', 'Add Lua/CoffeeScript/Java.', 'Translate the sample code comments.', 'Add i18n field for the sample code comments.', 'Check completion/engagement/problem analytics.', 'Add a walkthrough video.', 'Do any custom scripting, if needed.', 'Write a really awesome description.'];

renamedTaskNames = {
  'Release to adventurers.': 'Release to adventurers via MailChimp.',
  'Release to everyone.': 'Release to everyone via MailChimp.'
};

tasksForLevel = function(level) {
  var complete, i, inappropriateTasks, j, k, len1, len2, len3, newTasks, oldName, oldTask, oldTasks, ref, ref1, ref2, task, tasks;
  tasks = [];
  inappropriateTasks = {};
  for (i = 0, len1 = defaultTasks.length; i < len1; i++) {
    task = defaultTasks[i];
    if (task.name === 'Create two sample projects' && level.get('shareable') !== 'project') {
      inappropriateTasks[task.name] = task;
    } else if (task.types && (ref = level.get('realType') || level.get('type', true), indexOf.call(task.types, ref) < 0)) {
      inappropriateTasks[task.name] = task;
    } else {
      tasks.push(task);
    }
  }
  oldTasks = ((ref1 = level.get('tasks')) != null ? ref1 : []).slice();
  newTasks = [];
  for (j = 0, len2 = tasks.length; j < len2; j++) {
    task = tasks[j];
    oldName = renamedTaskNames[task.name] || task.name;
    if (oldTask = _.find(oldTasks, {
      name: oldName
    }) || _.find(oldTasks, {
      name: task.name
    })) {
      complete = oldTask.complete || Boolean(typeof task.complete === "function" ? task.complete(level) : void 0);
      _.remove(oldTasks, {
        name: oldTask.name
      });
    } else {
      complete = Boolean(typeof task.complete === "function" ? task.complete(level) : void 0);
      if (!complete && task.optional) {
        continue;
      }
    }
    newTasks.push({
      name: task.name,
      complete: complete
    });
  }
  for (k = 0, len3 = oldTasks.length; k < len3; k++) {
    oldTask = oldTasks[k];
    if (!((ref2 = oldTask.name, indexOf.call(deprecatedTaskNames, ref2) >= 0) || inappropriateTasks[oldTask.name])) {
      newTasks.push(oldTask);
    }
  }
  return newTasks;
};
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/tasks/TasksTabView.js.map