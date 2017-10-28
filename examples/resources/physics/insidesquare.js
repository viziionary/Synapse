import Square from './square.js';
import isNumber from './isnumber';

function insideSquare(square,x,y){
  console.log({x,y})
  if (!square instanceof Square) {
    throw new Error('Inside Square: Object Not Square Type ;(');
  }
  var output = (x >= square.x - square.width / 2 && x <= square.x + square.width / 2) && (y >= square.y - square.height / 2 && y <= square.y + square.height / 2);
  //console.log('insideSquare',square,x,y,output);
  return output;
}
export default insideSquare;
