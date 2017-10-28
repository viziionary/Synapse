const isNumber = require('./isnumber');
const pivotPointAroundPoint = require('./pivotpointaroundpoint');

function insideSquare(square,x,y){
  if (!square instanceof square) {
    throw new Error('Inside Square: Object Not Square Type ;(');
  }
  if (square.rotation) {
    let newPair = pivotPointAroundPoint(x,y,square.x,square.y,0-square.rotation);
    x = newPair[0];
    y = newPair[1];
  }
  return (x >= square.x - square.width / 2 && x <= square.x + square.width / 2) && (y >= square.y - square.height / 2 && y <= square.y + square.height / 2);
}
module.exports = insideSquare;
