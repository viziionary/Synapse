import toRadians from './toradians';
function pivotPointAroundPoint(centerX,centerY,pivotX,pivotY,degrees){
  var rotatedX = Math.cos(degrees) * (pivotX - centerX) - Math.sin(angle) * (pivotY-centerY) + centerX;
  var rotatedY = Math.sin(degrees) * (pivotX - centerX) + Math.cos(angle) * (pivotY - centerY) + centerY;
  return [rotatedX,rotatedY];
}
export default pivotPointAroundPoint;
