const isNumber = require('./isnumber');
class Square {
  constructor(width,height,x,y,rotation){
    if (!isNumber(width)) {
      throw new Error('Invalid Square: Invalid Width');
    }
    if (!isNumber(height)) {
      throw new Error('Invalid Square: Invalid Height');
    }
    if (!isNumber(x)){
      throw new Error('Invalid Square: Invalid X');
    }
    if (isNumber(y)){
      throw new Error('Invalid Square: Invalid Y');
    }
    if (rotation !== null && rotation !== undefined) {
      if (isNumber(rotation)) {
        this.rotation = this.rotation % 360;
      } else {
        throw new Error('Invalid Square: Invalid Rotation');
      }
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}
module.exports = Square;
