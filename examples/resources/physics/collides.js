import Circle from './circle.js';
import Square from './square.js';
import isValidObjectType from './isvalidobjecttype';
import insideSquare from './insidesquare';
import getCorners from './getcorners';
import getSides from './getsides';
import insideCircle from './insidecircle';
import pivotPointAroundPoint from './pivotpointaroundpoint';


function collides(object1,object2){
  if (object1 instanceof Square && object2 instanceof Square) {
    var output = false;
    getCorners(object1).forEach(cornerPair=>{
      if (object1.rotation) {
        let newPair = pivotPointAroundPoint(cornerPair[0],cornerPair[1],object1.x,object.y,0-object.rotation);
        var x = newPair[0];
        var y = newPair[1];
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
    //console.log({square,circle});
    var output = false;
    getSides(square).concat(getCorners(square)).forEach(cornerPair=>{
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
        if (insideCircle(circle,cornerPair[0],cornerPair[1])){
          output = true;
          //console.log('inside square');
        } //else {
        //   console.log('Not inside square');
        // }
      }
    });
    return output;
  } else {
    throw new Error('Collision: Cannot Compare, Invalid Object Types.');
  }
}
export default collides;
