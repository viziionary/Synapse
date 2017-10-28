const Circle = require('./circle.js');
const Square = require('./square.js');
const isValidObjectType = require('./isvalidobjecttype');
const insideSquare = require('./insidesquare');
const getCorners = require('./getcorners');
const insideCircle = require('./insidecircle');
const pivotPointAroundPoint = require('./pivotpointaroundpoint');


function collides(object1,object2){
  if (object1 instanceof Square && object2 instanceof Square) {
    var output = false;
    getCorners(object1).forEach(cornerPair=>{
      if (object1.rotation) {
        let newPair = pivotPointAroundPoint(cornerPair[0],cornerPair[1],object1.x,object.y,0-object.rotation);
        x = newPair[0];
        y = newPair[1];
        if (insideSquare(object2,x,y)){
          output = true;
        }
      } else {
        if (insideSquare(object2,cornerPair[0],cornerPair[1])){
          output = true;
        }
      }
    });
    return output;
  } else if (object1 instanceof Circle && object2 instanceof Circle) {
    return Math.abs(object1.x - object2.x) + Math.abs(object1.y - object2.y) <= object1.radius + object2.radius;
  } else if ((object1 instanceof Circle || object1 instanceof Square) && (object2 instanceof Circle || object2 instanceof Square)){
    var square;
    var circle;
    if (object1 instanceof Square) {
      square = object1;
      circle = object2;
    } else {
      square = object2;
      circle = object1;
    }
    var output = false;
    getCorners(square).forEach(cornerPair=>{
      if (output !== false) {
        return;
      }
      if (square.rotation) {
        let newPair = pivotPointAroundPoint(cornerPair[0],cornerPair[1],square.x,square.y,0-square.rotation);
        x = newPair[0];
        y = newPair[1];
        if (insideCircle(circle,x,y)){
          output = true;
        }
      } else {
        if (insideSquare(circle,cornerPair[0],cornerPair[1])){
          output = true;
        }
      }
    });
    return output;
  } else {
    throw new Error('Collision: Cannot Compare, Invalid Object Types.');
  }
}
module.exports = collides;
