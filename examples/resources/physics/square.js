import Environment from './environment';
import isNumber from './isnumber';
class Square {
  constructor(environment,x,y,width,height,rotation){
    if (!isNumber(width)) {
      throw new Error('Invalid Square: Invalid Width');
    }
    if (!isNumber(height)) {
      throw new Error('Invalid Square: Invalid Height');
    }
    if (!isNumber(x)){
      throw new Error('Invalid Square: Invalid X');
    }
    if (!isNumber(y)){
      throw new Error('Invalid Square: Invalid Y');
    }
    if (!(environment instanceof Environment)) {
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
    this.move = this.move.bind(this);
    this.set = this.set.bind(this);
    this.environment.addObject(this);
  }
  move(x,y){
    return this.environment.setObjectPosition(this,this.x+x,this.y+y);
  }
  set(x,y){
    this.environment.setObjectPosition(this,x,y);
  }
}
export default Square;
