!function (exports) {

   "use strict";

   var states = {
      east : EAST,
      north : NORTH,
      west : WEST,
      south : SOUTH,
      take : TAKE,
      pass : PASS
   };

   /**
    * calculates how much of different fruits is on the board
    */
   var buildTypes = function () {
      var board = get_board();
      var count = 0;

      board.forEach(function (row) {
         row.forEach(function (type) {
            count = count > type ? count : type;
         });
      });
      return count;
   };

   /**
    * function calculates how much of the given fruit type is left on the table
    */
   var leftItems = function (type) {
      var board = get_board();
      var count = 0;

      board.forEach(function (row) {
         row.forEach(function (item) {
            if (item == type) {
               count++;
            }
         });
      });
      return count; 
   };

   var Bot = function () {};

   Bot.prototype.new = function () {
      this.types = buildTypes();

      this.initialize();
   };

   Bot.prototype.initialize = function () {
      this.ownFruits = {};
      this.availableTypes = [];
      for (var i = 1; i <= this.types; i++) { 
         this.ownFruits[i] = 0;
         this.availableTypes.push(i);
      };
   };

   Bot.prototype.calculateFruitStage = function (type) {
      var oponentItems = get_opponent_item_count(type);
      var leftItems = leftItems(type);
      var ownItems = this.ownFruits[type];

      if (ownFruits > oponentItems + leftItems) {
         return { win: true };
      }

      if (oponentItems > ownFruits + leftItems) {
         return { lose: true };
      }

      if (oponentItems > ownFruits) {
         return { lossing: true };
      }

      if (ownFruits > oponentItems) {
         return { winnig: true };
      }
   };

   Bot.prototype.calculateStatePerFruit = function () {
      this.fruits = {};
      for (var i = 0; i <= this.availableTypes; i++) {
         this.fruits[i] = this.calculateFruitStage(i);
      };
   };

   Bot.prototype.removeItemFromAvailableFruits = function (item) {
      var index = this.availableTypes.indexOf(item);
      if (index != -1) {
         this.availableTypes.splice(index, 1);
      }
   };

   Bot.prototype.throwUselessFruits = function () {
      for (var item in this.fruits) {
         if (!this.fruits.hasOwnProperty(key)) continue;

         if (this.fruits[key].lose || this.fruits[key].win) {
            this.removeItemFromAvailableFruits(key);
         }
      };
   };

   Bot.prototype.calculateWinnigFruitsPath = function () {
      
   };

   Bot.prototype.getPhaseOptions = function () {
      this.calculateStatePerFruit();
      this.throwUselessFruits();
      this.handleOponentPath();

      return this.getNextMove();
   };

   Bot.prototype.move = function () {
      this.getPhaseOptions();
   };

   var bot = new Bot();

   exports.make_move = function () {
      return bot.move();
   };

   exports.new_game = function () {
      bot.new();
   };

} (window);