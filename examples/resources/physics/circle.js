const isNumber = require('./isnumber');
class Circle {
  constructor(radius,x,y){
    if (!isNumber(radius)) {
      throw new Error('Invalid Circle: Invalid Radius');
    }
    if (!isNumber(x)){
      throw new Error('Invalid Circle: Invalid X');
    }
    if (!isNumber(y)){
      throw new Error('Invalid Circle: Invalid Y');
    }
    this.radius = radius;
    this.x = x;
    this.y = y;
  }
}
module.exports = Circle;
