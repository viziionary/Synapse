import Environment from './environment';
import isNumber from './isnumber';

class Circle {
  constructor(environment,x,y,radius){
    if (!isNumber(radius)) {
      throw new Error('Invalid Circle: Invalid Radius');
    }
    if (!isNumber(x)){
      throw new Error('Invalid Circle: Invalid X');
    }
    if (!isNumber(y)){
      throw new Error('Invalid Circle: Invalid Y');
    }
    if (!(environment instanceof Environment)) {
      throw new Error('Invalid Circle: Invalid Environment!');
    }
    this.radius = radius;
    this.noClip = false;
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
export default Circle;
