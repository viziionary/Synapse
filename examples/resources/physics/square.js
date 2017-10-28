const isNumber = require('./isnumber');
class Square {
  constructor(evironment,width,height,x,y,rotation){
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
    if (!(environment instanceof Enviroment)) {
      throw new Error('Invalid Square: Invalid Environment!');
    }
    if (rotation !== null && rotation !== undefined) {
      if (isNumber(rotation)) {
        if (rotation >= 0) {
          this.rotation = rotation % 360;
        } else {
          this.rotation = -(-rotation % 360);
        }
      } else {
        throw new Error('Invalid Square: Invalid Rotation');
      }
    }
    this.noClip = false;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.environment = environment;
    this.environment.addObject(this);
  }
}
module.exports = Square;
