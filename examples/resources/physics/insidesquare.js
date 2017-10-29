import Square from './square.js';
import isNumber from './isnumber';

function insideSquare(square,x,y){
  if (!square instanceof Square) {
    throw new Error('Inside Square: Object Not Square Type ;(');
  }
  let squareDimensions = {x1:square.x-square.width/2,y1:square.y-square.height/2,x2:square.x+square.width/2,y2:square.y+square.height/2};
  var output = x >= squareDimensions.x1 && x <= squareDimensions.x2 && y >= squareDimensions.y1 && y <= squareDimensions.y2;
  //console.log('#insideSquare - output:',output,'square:',squareDimensions,'x:',x,'y:',y);
  return output;
}
export default insideSquare;
