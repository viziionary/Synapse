const Circle = require('./square.js');
function insideCircle(circle,x,y){
  if (!circle instanceof Square) {
    throw new Error('Inside Circle: Object Not Circle Type ;(');
  }
  return Math.abs(circle.x - x) + Math.abs(circle.y - y) <= circle.radius;
}
module.exports = insideCircle;
