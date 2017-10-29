import Circle from './square.js';
function insideCircle(circle,x,y){
  if (!circle instanceof Circle) {
    throw new Error('Inside Circle: Object Not Circle Type ;(');
  }
  return Math.abs(circle.x - x) + Math.abs(circle.y - y) <= circle.radius;
}
export default insideCircle;
