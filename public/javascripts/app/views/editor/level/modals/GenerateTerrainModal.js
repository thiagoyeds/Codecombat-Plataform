require.register("views/editor/level/modals/GenerateTerrainModal", function(exports, require, module) {
var CocoModel, GenerateTerrainModal, ModalView, clusters, presetSizes, presets, template, thangSizes,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/generate-terrain-modal');

CocoModel = require('models/CocoModel');

clusters = {
  'hero': {
    'thangs': ['Hero Placeholder'],
    'margin': 1
  },
  'rocks': {
    'thangs': ['Rock 1', 'Rock 2', 'Rock 3', 'Rock 4', 'Rock 5', 'Rock Cluster 1', 'Rock Cluster 2', 'Rock Cluster 3'],
    'margin': 1
  },
  'trees': {
    'thangs': ['Tree 1', 'Tree 2', 'Tree 3', 'Tree 4'],
    'margin': 0.5
  },
  'tree_stands': {
    'thangs': ['Tree Stand 1', 'Tree Stand 2', 'Tree Stand 3', 'Tree Stand 4', 'Tree Stand 5', 'Tree Stand 6'],
    'margin': 3
  },
  'shrubs': {
    'thangs': ['Shrub 1', 'Shrub 2', 'Shrub 3'],
    'margin': 0.5
  },
  'houses': {
    'thangs': ['House 1', 'House 2', 'House 3', 'House 4'],
    'margin': 4
  },
  'animals': {
    'thangs': ['Cow', 'Horse'],
    'margin': 1
  },
  'wood': {
    'thangs': ['Firewood 1', 'Firewood 2', 'Firewood 3'],
    'margin': 1
  },
  'farm': {
    'thangs': ['Farm'],
    'margin': 9
  },
  'cave': {
    'thangs': ['Cave'],
    'margin': 5
  },
  'stone': {
    'thangs': ['Gargoyle', 'Rock Cluster 1', 'Rock Cluster 2', 'Rock Cluster 3'],
    'margin': 1
  },
  'torch': {
    'thangs': ['Torch'],
    'margin': 0
  },
  'chains': {
    'thangs': ['Chains'],
    'margin': 0
  },
  'barrel': {
    'thangs': ['Barrel'],
    'margin': 1
  },
  'doors': {
    'thangs': ['Dungeon Door'],
    'margin': -1
  },
  'grass_floor': {
    'thangs': ['Grass01', 'Grass02', 'Grass03', 'Grass04', 'Grass05'],
    'margin': -1
  },
  'dungeon_wall': {
    'thangs': ['Dungeon Wall'],
    'margin': 2
  },
  'dungeon_floor': {
    'thangs': ['Dungeon Floor'],
    'margin': -1
  },
  'indoor_wall': {
    'thangs': ['Indoor Wall'],
    'margin': 2
  },
  'indoor_floor': {
    'thangs': ['Indoor Floor'],
    'margin': -1
  },
  'furniture': {
    'thangs': ['Bookshelf', 'Chair', 'Table', 'Candle', 'Treasure Chest'],
    'margin': -1
  },
  'desert_walls': {
    'thangs': ['Desert Wall 1', 'Desert Wall 2', 'Desert Wall 3', 'Desert Wall 4', 'Desert Wall 5', 'Desert Wall 6', 'Desert Wall 7', 'Desert Wall 8'],
    'margin': 6
  },
  'desert_floor': {
    'thangs': ['Sand 01', 'Sand 02', 'Sand 03', 'Sand 04', 'Sand 05', 'Sand 06'],
    'margin': -1
  },
  'oases': {
    'thangs': ['Oasis 1', 'Oasis 2', 'Oasis 3'],
    'margin': 4
  },
  'mountain_floor': {
    'thangs': ['Talus 1', 'Talus 2', 'Talus 3', 'Talus 4', 'Talus 5', 'Talus 6'],
    'margin': -1
  },
  'mountain_walls': {
    'thangs': ['Mountain 1', 'Mountain 3'],
    'margin': 6
  },
  'glacier_floor': {
    'thangs': ['Firn 1', 'Firn 2', 'Firn 3', 'Firn 4', 'Firn 5', 'Firn 6'],
    'margin': -1
  },
  'glacier_walls': {
    'thangs': ['Ice Wall'],
    'margin': 2
  }
};

presets = {
  'dungeon': {
    'terrainName': 'Dungeon',
    'type': 'dungeon',
    'borders': 'dungeon_wall',
    'borderNoise': 0,
    'borderSize': 4,
    'borderThickness': 1,
    'floors': 'dungeon_floor',
    'decorations': {
      'Room': {
        'num': [1, 1],
        'width': [12, 20],
        'height': [8, 16],
        'thickness': [2, 2],
        'cluster': 'dungeon_wall'
      },
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'Barrels': {
        'num': [1, 1],
        'width': [8, 12],
        'height': [8, 12],
        'numBarrels': [4, 6],
        'cluster': 'barrel'
      },
      'cave': {
        'num': [1, 1],
        'width': 10,
        'height': 10,
        'clusters': {
          'cave': [1, 1],
          'stone': [2, 4]
        }
      }
    }
  },
  'indoor': {
    'terrainName': 'Indoor',
    'type': 'indoor',
    'borders': 'indoor_wall',
    'borderNoise': 0,
    'borderSize': 4,
    'borderThickness': 1,
    'floors': 'indoor_floor',
    'decorations': {
      'Room': {
        'num': [1, 1],
        'width': [12, 20],
        'height': [8, 16],
        'thickness': [2, 2],
        'cluster': 'indoor_wall'
      },
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'furniture': {
        'num': [1, 2],
        'width': 15,
        'height': 15,
        'clusters': {
          'furniture': [2, 4]
        }
      }
    }
  },
  'grassy': {
    'terrainName': 'Grass',
    'type': 'grassy',
    'borders': 'tree_stands',
    'borderNoise': 1,
    'borderSize': 2,
    'borderThickness': 2,
    'floors': 'grass_floor',
    'decorations': {
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'house': {
        'num': [1, 2],
        'width': 15,
        'height': 15,
        'clusters': {
          'houses': [1, 1],
          'trees': [1, 2],
          'shrubs': [0, 3],
          'rocks': [1, 2]
        }
      },
      'farm': {
        'num': [1, 1],
        'width': 25,
        'height': 15,
        'clusters': {
          'farm': [1, 1],
          'shrubs': [2, 3],
          'wood': [2, 4],
          'animals': [2, 3]
        }
      }
    }
  },
  'desert': {
    'terrainName': 'Desert',
    'type': 'desert',
    'borders': 'desert_walls',
    'borderNoise': 2,
    'borderSize': 4,
    'borderThickness': 4,
    'floors': 'desert_floor',
    'decorations': {
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'oasis': {
        'num': [1, 2],
        'width': 10,
        'height': 10,
        'clusters': {
          'oases': [1, 1],
          'shrubs': [0, 5],
          'rocks': [0, 2]
        }
      }
    }
  },
  'mountain': {
    'terrainName': 'Mountain',
    'type': 'mountain',
    'floors': 'mountain_floor',
    'borders': 'mountain_walls',
    'borderNoise': 1,
    'borderSize': 1,
    'borderThickness': 1,
    'decorations': {
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      }
    }
  },
  'glacier': {
    'terrainName': 'Glacier',
    'type': 'glacier',
    'floors': 'glacier_floor',
    'borders': 'glacier_walls',
    'borderNoise': 0,
    'borderSize': 4,
    'borderThickness': 1,
    'decorations': {
      'hero': {
        'num': [1, 1],
        'width': 2,
        'height': 2,
        'clusters': {
          'hero': [1, 1]
        }
      },
      'Room': {
        'num': [1, 1],
        'width': [12, 20],
        'height': [8, 16],
        'thickness': [2, 2],
        'cluster': 'glacier_walls'
      }
    }
  }
};

presetSizes = {
  'small': {
    'x': 80,
    'y': 68,
    'sizeFactor': 1
  },
  'large': {
    'x': 160,
    'y': 136,
    'sizeFactor': 2
  }
};

thangSizes = {
  'floorSize': {
    'x': 20,
    'y': 17
  },
  'borderSize': {
    'x': 4,
    'y': 4
  }
};

module.exports = GenerateTerrainModal = (function(superClass) {
  extend(GenerateTerrainModal, superClass);

  GenerateTerrainModal.prototype.id = 'generate-terrain-modal';

  GenerateTerrainModal.prototype.template = template;

  GenerateTerrainModal.prototype.plain = true;

  GenerateTerrainModal.prototype.modalWidthPercent = 90;

  GenerateTerrainModal.prototype.events = {
    'click .choose-option': 'onGenerate'
  };

  function GenerateTerrainModal(options) {
    GenerateTerrainModal.__super__.constructor.call(this, options);
    this.presets = presets;
    this.presetSizes = presetSizes;
  }

  GenerateTerrainModal.prototype.onRevertModel = function(e) {
    var id;
    id = $(e.target).val();
    CocoModel.backedUp[id].revert();
    $(e.target).closest('tr').remove();
    return this.reloadOnClose = true;
  };

  GenerateTerrainModal.prototype.onGenerate = function(e) {
    var presetSize, presetType, target;
    target = $(e.target);
    presetType = target.attr('data-preset-type');
    presetSize = target.attr('data-preset-size');
    this.generateThangs(presetType, presetSize);
    Backbone.Mediator.publish('editor:random-terrain-generated', {
      thangs: this.thangs,
      terrain: presets[presetType].terrainName
    });
    return this.hide();
  };

  GenerateTerrainModal.prototype.generateThangs = function(presetName, presetSize) {
    var preset;
    this.falseCount = 0;
    preset = presets[presetName];
    presetSize = presetSizes[presetSize];
    this.thangs = [];
    this.rects = [];
    this.generateFloor(preset, presetSize);
    this.generateBorder(preset, presetSize, preset.borderNoise);
    return this.generateDecorations(preset, presetSize);
  };

  GenerateTerrainModal.prototype.generateFloor = function(preset, presetSize) {
    var i, j, k, len, ref, results;
    ref = _.range(0, presetSize.x, thangSizes.floorSize.x);
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      results.push((function() {
        var l, len1, ref1, results1;
        ref1 = _.range(0, presetSize.y, thangSizes.floorSize.y);
        results1 = [];
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          j = ref1[l];
          results1.push(this.thangs.push({
            'id': this.getRandomThang(clusters[preset.floors].thangs),
            'pos': {
              'x': i + thangSizes.floorSize.x / 2,
              'y': j + thangSizes.floorSize.y / 2
            },
            'margin': clusters[preset.floors].margin
          }));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.generateBorder = function(preset, presetSize, noiseFactor) {
    var i, j, k, l, len, len1, len2, m, ref, ref1, ref2, results;
    if (noiseFactor == null) {
      noiseFactor = 1;
    }
    ref = _.range(0, presetSize.x, thangSizes.borderSize.x);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      ref1 = _.range(preset.borderThickness);
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        j = ref1[l];
        while (!this.addThang({
            'id': this.getRandomThang(clusters[preset.borders].thangs),
            'pos': {
              'x': i + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.x / 2, thangSizes.borderSize.x / 2),
              'y': 0 + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.y / 2, thangSizes.borderSize.y)
            },
            'margin': clusters[preset.borders].margin
          })) {
          continue;
        }
        while (!this.addThang({
            'id': this.getRandomThang(clusters[preset.borders].thangs),
            'pos': {
              'x': i + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.x / 2, thangSizes.borderSize.x / 2),
              'y': presetSize.y - preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.y, thangSizes.borderSize.y / 2)
            },
            'margin': clusters[preset.borders].margin
          })) {
          continue;
        }
        if (preset.type === 'dungeon') {
          this.addThang({
            'id': this.getRandomThang(clusters[preset.borders].thangs),
            'pos': {
              'x': i + preset.borderSize / 2,
              'y': presetSize.y - 3 * preset.borderSize / 2
            },
            'margin': clusters[preset.borders].margin
          });
          if ((i / preset.borderSize) % 2 && i !== presetSize.x - thangSizes.borderSize.x) {
            this.addThang({
              'id': this.getRandomThang(clusters['torch'].thangs),
              'pos': {
                'x': i + preset.borderSize,
                'y': presetSize.y - preset.borderSize / 2
              },
              'margin': clusters['torch'].margin
            });
          } else if ((i / preset.borderSize) % 2 === 0 && i && _.random(100) < 30) {
            this.addThang({
              'id': this.getRandomThang(clusters['chains'].thangs),
              'pos': {
                'x': i + preset.borderSize,
                'y': presetSize.y - preset.borderSize / 2
              },
              'margin': clusters['chains'].margin
            });
          }
        }
      }
    }
    ref2 = _.range(0, presetSize.y, thangSizes.borderSize.y);
    results = [];
    for (m = 0, len2 = ref2.length; m < len2; m++) {
      i = ref2[m];
      results.push((function() {
        var len3, n, ref3, results1;
        ref3 = _.range(preset.borderThickness);
        results1 = [];
        for (n = 0, len3 = ref3.length; n < len3; n++) {
          j = ref3[n];
          while (!this.addThang({
              'id': this.getRandomThang(clusters[preset.borders].thangs),
              'pos': {
                'x': 0 + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.x / 2, thangSizes.borderSize.x),
                'y': i + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.y / 2, thangSizes.borderSize.y / 2)
              },
              'margin': clusters[preset.borders].margin
            })) {
            continue;
          }
          results1.push((function() {
            var results2;
            results2 = [];
            while (!this.addThang({
                'id': this.getRandomThang(clusters[preset.borders].thangs),
                'pos': {
                  'x': presetSize.x - preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.x, thangSizes.borderSize.x / 2),
                  'y': i + preset.borderSize / 2 + noiseFactor * _.random(-thangSizes.borderSize.y / 2, thangSizes.borderSize.y / 2)
                },
                'margin': clusters[preset.borders].margin
              })) {
              continue;
            }
            return results2;
          }).call(this));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.generateDecorations = function(preset, presetSize) {
    var cluster, decoration, i, name, num, range, rect, ref, results;
    ref = preset.decorations;
    results = [];
    for (name in ref) {
      decoration = ref[name];
      results.push((function() {
        var k, len, ref1, results1;
        ref1 = _.range(presetSize.sizeFactor * _.random(decoration.num[0], decoration.num[1]));
        results1 = [];
        for (k = 0, len = ref1.length; k < len; k++) {
          num = ref1[k];
          if (this['build' + name] !== void 0) {
            this['build' + name](preset, presetSize, decoration);
            continue;
          }
          while (true) {
            rect = {
              'x': _.random(decoration.width / 2 + preset.borderSize / 2 + thangSizes.borderSize.x, presetSize.x - decoration.width / 2 - preset.borderSize / 2 - thangSizes.borderSize.x),
              'y': _.random(decoration.height / 2 + preset.borderSize / 2 + thangSizes.borderSize.y, presetSize.y - decoration.height / 2 - preset.borderSize / 2 - thangSizes.borderSize.y),
              'width': decoration.width,
              'height': decoration.height
            };
            if (this.addRect(rect)) {
              break;
            }
          }
          results1.push((function() {
            var ref2, results2;
            ref2 = decoration.clusters;
            results2 = [];
            for (cluster in ref2) {
              range = ref2[cluster];
              results2.push((function() {
                var l, len1, ref3, results3;
                ref3 = _.range(_.random(range[0], range[1]));
                results3 = [];
                for (l = 0, len1 = ref3.length; l < len1; l++) {
                  i = ref3[l];
                  results3.push((function() {
                    var results4;
                    results4 = [];
                    while (!this.addThang({
                        'id': this.getRandomThang(clusters[cluster].thangs),
                        'pos': {
                          'x': _.random(rect.x - rect.width / 2, rect.x + rect.width / 2),
                          'y': _.random(rect.y - rect.height / 2, rect.y + rect.height / 2)
                        },
                        'margin': clusters[cluster].margin
                      })) {
                      continue;
                    }
                    return results4;
                  }).call(this));
                }
                return results3;
              }).call(this));
            }
            return results2;
          }).call(this));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.buildRoom = function(preset, presetSize, room) {
    var bottomDoor, bottomDoorX, grid, i, k, l, len, len1, len2, m, rect, ref, ref1, ref2, results, roomThickness, t, thang, topDoor, topDoorX, xRange;
    grid = preset.borderSize;
    while (true) {
      rect = {
        'width': presetSize.sizeFactor * (room.width[0] + grid * _.random(0, (room.width[1] - room.width[0]) / grid)),
        'height': presetSize.sizeFactor * (room.height[0] + grid * _.random(0, (room.height[1] - room.height[0]) / grid))
      };
      rect.width = Math.round((rect.width - grid) / (2 * grid)) * 2 * grid + grid;
      rect.height = Math.round((rect.height - grid) / (2 * grid)) * 2 * grid + grid;
      roomThickness = _.random(room.thickness[0], room.thickness[1]);
      rect.x = _.random(rect.width / 2 + grid * (roomThickness + 1.5), presetSize.x - rect.width / 2 - grid * (roomThickness + 1.5));
      rect.y = _.random(rect.height / 2 + grid * (roomThickness + 2.5), presetSize.y - rect.height / 2 - grid * (roomThickness + 3.5));
      rect.x = Math.round((rect.x - grid / 2) / grid) * grid;
      rect.y = Math.round((rect.y - grid / 2) / grid) * grid;
      if (this.addRect({
        'x': rect.x,
        'y': rect.y,
        'width': rect.width + 2.5 * roomThickness * grid,
        'height': rect.height + 2.5 * roomThickness * grid
      })) {
        break;
      }
    }
    xRange = _.range(rect.x - rect.width / 2 + grid, rect.x + rect.width / 2, grid);
    topDoor = _.random(1) > 0.5;
    topDoorX = xRange[_.random(0, xRange.length - 1)];
    bottomDoor = !topDoor ? true : _.random(1) > 0.5;
    bottomDoorX = xRange[_.random(0, xRange.length - 1)];
    ref = _.range(0, roomThickness + 1);
    for (k = 0, len = ref.length; k < len; k++) {
      t = ref[k];
      ref1 = _.range(rect.x - rect.width / 2 - (t - 1) * grid, rect.x + rect.width / 2 + t * grid, grid);
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        i = ref1[l];
        thang = {
          'id': this.getRandomThang(clusters[room.cluster].thangs),
          'pos': {
            'x': i,
            'y': rect.y - rect.height / 2 - t * grid
          },
          'margin': clusters[room.cluster].margin
        };
        if (i === bottomDoorX && bottomDoor) {
          thang.id = this.getRandomThang(clusters['doors'].thangs);
          thang.pos.y -= grid / 3;
        }
        if (!(i === bottomDoorX && t !== roomThickness && bottomDoor)) {
          this.addThang(thang);
        }
        if (t === roomThickness && i !== rect.x - rect.width / 2 - (t - 1) * grid && preset.type === 'dungeon') {
          if ((i !== bottomDoorX && i !== bottomDoorX + grid) || !bottomDoor) {
            this.addThang({
              'id': this.getRandomThang(clusters['torch'].thangs),
              'pos': {
                'x': thang.pos.x - grid / 2,
                'y': thang.pos.y + grid
              },
              'margin': clusters['torch'].margin
            });
          }
        }
        thang = {
          'id': this.getRandomThang(clusters[room.cluster].thangs),
          'pos': {
            'x': i,
            'y': rect.y + rect.height / 2 + t * grid
          },
          'margin': clusters[room.cluster].margin
        };
        if (i === topDoorX && topDoor) {
          thang.id = this.getRandomThang(clusters['doors'].thangs);
          thang.pos.y -= grid;
        }
        if (!(i === topDoorX && t !== roomThickness && topDoor)) {
          this.addThang(thang);
        }
      }
    }
    ref2 = _.range(0, roomThickness);
    results = [];
    for (m = 0, len2 = ref2.length; m < len2; m++) {
      t = ref2[m];
      results.push((function() {
        var len3, n, ref3, results1;
        ref3 = _.range(rect.y - rect.height / 2 - t * grid, rect.y + rect.height / 2 + (t + 1) * grid, grid);
        results1 = [];
        for (n = 0, len3 = ref3.length; n < len3; n++) {
          i = ref3[n];
          this.addThang({
            'id': this.getRandomThang(clusters[room.cluster].thangs),
            'pos': {
              'x': rect.x - rect.width / 2 - t * grid,
              'y': i
            },
            'margin': clusters[room.cluster].margin
          });
          results1.push(this.addThang({
            'id': this.getRandomThang(clusters[room.cluster].thangs),
            'pos': {
              'x': rect.x + rect.width / 2 + t * grid,
              'y': i
            },
            'margin': clusters[room.cluster].margin
          }));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.buildBarrels = function(preset, presetSize, decoration) {
    var i, j, k, len, num, rect, results, x, y;
    rect = {
      'width': presetSize.sizeFactor * (_.random(decoration.width[0], decoration.width[1])),
      'height': presetSize.sizeFactor * (_.random(decoration.height[0], decoration.height[1]))
    };
    x = [rect.width / 2 + preset.borderSize, presetSize.x - rect.width / 2 - preset.borderSize];
    y = [rect.height / 2 + preset.borderSize, presetSize.y - rect.height / 2 - 2 * preset.borderSize];
    results = [];
    for (k = 0, len = x.length; k < len; k++) {
      i = x[k];
      results.push((function() {
        var l, len1, results1;
        results1 = [];
        for (l = 0, len1 = y.length; l < len1; l++) {
          j = y[l];
          if (_.random(100) < 40) {
            rect = {
              'x': i,
              'y': j,
              'width': rect.width,
              'height': rect.height
            };
            if (this.addRect(rect)) {
              results1.push((function() {
                var len2, m, ref, results2;
                ref = _.range(_.random(decoration.numBarrels[0], decoration.numBarrels[1]));
                results2 = [];
                for (m = 0, len2 = ref.length; m < len2; m++) {
                  num = ref[m];
                  results2.push((function() {
                    var results3;
                    results3 = [];
                    while (!this.addThang({
                        'id': this.getRandomThang(clusters[decoration.cluster].thangs),
                        'pos': {
                          'x': _.random(rect.x - rect.width / 2, rect.x + rect.width / 2),
                          'y': _.random(rect.y - rect.height / 2, rect.y + rect.height / 2)
                        },
                        'margin': clusters[decoration.cluster].margin
                      })) {
                      continue;
                    }
                    return results3;
                  }).call(this));
                }
                return results2;
              }).call(this));
            } else {
              results1.push(void 0);
            }
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GenerateTerrainModal.prototype.addThang = function(thang) {
    var existingThang, k, len, ref;
    if (this.falseCount > 100) {
      console.log('infinite loop', thang);
      this.falseCount = 0;
      return true;
    }
    ref = this.thangs;
    for (k = 0, len = ref.length; k < len; k++) {
      existingThang = ref[k];
      if (existingThang.margin === -1 || thang.margin === -1) {
        continue;
      }
      if (Math.abs(existingThang.pos.x - thang.pos.x) < thang.margin + existingThang.margin && Math.abs(existingThang.pos.y - thang.pos.y) < thang.margin + existingThang.margin) {
        this.falseCount++;
        return false;
      }
    }
    this.thangs.push(thang);
    return true;
  };

  GenerateTerrainModal.prototype.addRect = function(rect) {
    var existingRect, k, len, ref;
    if (this.falseCount > 100) {
      console.log('infinite loop', rect);
      this.falseCount = 0;
      return true;
    }
    ref = this.rects;
    for (k = 0, len = ref.length; k < len; k++) {
      existingRect = ref[k];
      if (Math.abs(existingRect.x - rect.x) <= rect.width / 2 + existingRect.width / 2 && Math.abs(existingRect.y - rect.y) <= rect.height / 2 + existingRect.height / 2) {
        this.falseCount++;
        return false;
      }
    }
    this.rects.push(rect);
    return true;
  };

  GenerateTerrainModal.prototype.getRandomThang = function(thangList) {
    return thangList[_.random(0, thangList.length - 1)];
  };

  GenerateTerrainModal.prototype.onHidden = function() {
    if (this.reloadOnClose) {
      return location.reload();
    }
  };

  return GenerateTerrainModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/modals/GenerateTerrainModal.js.map