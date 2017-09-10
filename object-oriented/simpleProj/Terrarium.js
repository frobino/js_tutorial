// Import classes defined in external files (node)
var Dictionary = require("./Dictionary.js");
var Grid = require("./Grid.js");
var StupidBug = require("./StupidBug.js");
var Point = require("./Point.js");

/*************************************************************
 * Class
 ************************************************************/
function Terrarium(plan) {
  var grid = new Grid(plan[0].length, plan.length);
  for (var y = 0; y < plan.length; y++) {
    var line = plan[y];
    for (var x = 0; x < line.length; x++) {
      grid.setValueAt(new Point(x, y), elementFromCharacter(line.charAt(x)));
    }
  }
  this.grid = grid;
}

// Terrarium.prototype.toString
Terrarium.prototype.toString = function() {
  var characters = [];
  var endOfLine = this.grid.width - 1;
  this.grid.each(function(point, value) {
    characters.push(characterFromElement(value));
    if (point.x == endOfLine)
      characters.push("\n");
  });
  return characters.join("");
};

// Terrarium.prototype.step
Terrarium.prototype.listActingCreatures = function() {
  var found = [];
  this.grid.each(function(point, value) {
    if (value != undefined && value.act)
      found.push({object: value, point: point});
  });
  return found;
};

Terrarium.prototype.listSurroundings = function(center) {
  var result = {};
  var grid = this.grid;
  directions.each(function(name, direction) {
    var place = center.add(direction);
    if (grid.isInside(place))
      result[name] = characterFromElement(grid.valueAt(place));
    else
      result[name] = "#";
  });
  return result;
};

// DANGER: processCreature seems wrong on web
// Terrarium.prototype.processCreature = function(creature) {
Terrarium.prototype.processCreature = function(creature) {
  var action = creature.object.act(this.listSurroundings(creature.point));

  if (action.type == "move" && directions.contains(action.direction)) {
    var to = creature.point.add(directions.lookup(action.direction));
    if (this.grid.isInside(to) && this.grid.valueAt(to) == undefined)
      this.grid.moveValue(creature.point, to);
  }
  else {
    throw new Error("Unsupported action: " + action.type);
  }
};

Terrarium.prototype.step = function() {
  forEach(this.listActingCreatures(), bind(this.processCreature, this));
};

/*************************************************************
 * helpers
 *************************************************************/
 // forEach
 function forEach(object, action) {
   for (var property in object) {
     if (Object.prototype.hasOwnProperty.call(object, property))
       action(object[property]);
   }
 }

// forEachIn
function forEachIn(object, action) {
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property))
      action(property, object[property]);
  }
}

function elementFromCharacter(character) {
  if (character == " ")
    return undefined;
  else if (character == "#")
    return wall;
  else if (character == "o")
    return new StupidBug();
}

// bind and method
function bind(func, object) {
  return function(){
    return func.apply(object, arguments);
  };
}

function method(object, name) {
  return function() {
    object[name].apply(object, arguments);
  };
}

/*************************************************************
// main down here:
*************************************************************/

// terrarium plan
var thePlan =
  ["############################",
   "#      #    #      o      ##",
   "#                          #",
   "#          #####           #",
   "##         #   #    ##     #",
   "###           ##     #     #",
   "#           ###      #     #",
   "#   ####                   #",
   "#   ##       o             #",
   "# o  #         o       ### #",
   "#    #                     #",
   "############################"];

// directions object
var directions = new Dictionary({
  "n": new Point(0, -1),
  "ne": new Point(1, -1),
  "e": new Point(1, 0),
  "se": new Point(1, 1),
  "s": new Point(0, 1),
  "sw": new Point(-1, 1),
  "w": new Point(-1, 0),
  "nw": new Point(-1, -1)
});

// Terrarium
var wall = {};

// characterFromElement
wall.character = "#";
StupidBug.prototype.character = "o";

function characterFromElement(element) {
  if (element == undefined)
    return " ";
  else
    return element.character;
}

var terrarium = new Terrarium(thePlan);
console.log(terrarium.toString());
terrarium.step();
console.log(terrarium.toString());
