const circle = require('./circle.js');
const square = require('./square.js');
const isValidObjectType = require('./isvalidobjecttype');
const insideSquare = require('./insideSquare');
const collides = require('./collides');

function collides(object1,object2){
  if (object1 instanceof square && object2 instanceof square) {
    return !collides(object1,object2.x -object2.width / 2) && !collides(object1,object2.x + object2.width / 2) && /*Y PART*/ !collides(object1,object2.y -object2.height / 2) && !collides(object1,object2.y + object2.height / 2);
  } else if (object1 instanceof circle && object2 instanceof circle) {

  } else if ((object1 instanceof circle || object1 instanceof square) && (object2 instanceof circle || object2 instanceof square)){
    var square;
    var circle;
    if (object1 instanceof square) {
      square = object1;
      circle = object2;
    } else {
      square = object2;
      circle = object1;
    }
  } else {
    throw new Error('Collision: Cannot Compare, Invalid Object Types.');
  }
}
module.exports = collides;
