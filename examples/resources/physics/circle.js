const isNumber = require('./isnumber');
const Environment = require('./environment');
class Circle {
  constructor(environment,radius,x,y){
    if (!isNumber(radius)) {
      throw new Error('Invalid Circle: Invalid Radius');
    }
    if (!isNumber(x)){
      throw new Error('Invalid Circle: Invalid X');
    }
    if (!isNumber(y)){
      throw new Error('Invalid Circle: Invalid Y');
    }
    if (!(environment instanceof Enviroment)) {
      throw new Error('Invalid Circle: Invalid Environment!');
    }
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.environment = environment;
    this.environment.addObject(this);
  }
  move(x,y){

  }
  set(x,y){

  }
}
module.exports = Circle;
