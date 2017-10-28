import isValidObjectType from './isvalidobjecttype';
import collides from './collides';
class Environment {
  constructor(width,height){
    this.width = width;
    this.height = height;
    this.objects = [];
    this.allowCollision = false;
    this.addObject = this.addObject.bind(this);
    this.setObjectPosition = this.setObjectPosition.bind(this);
    this.outsideBoundaries = this.outsideBoundaries.bind(this);
    this.isObstructed = this.isObstructed.bind(this);
  }
  addObject(object){
    if (typeof object !== 'object' || !isValidObjectType(object)) {
      throw new Error('Environment: Cannot Add Object, Invalid Object Type');
    }
    if (object.x < 0 || object.x > this.width || object.y < 0 || object.y > this.height) {
      throw new Error('Environment: Cannot Add Object, Out of Bounds');
    }
    this.objects.push(object);
  }
  isObstructed(object,x,y){
    if (!this.objects.includes(object)) {
      throw new Error('Environment: Cannot Set Position Of Unsaved Object!');
    } else if (this.allowCollision === true) {
       return false;
    } else {
      if(this.outsideBoundaries(object,x,y)) {
        return true;
      } else {
        var output = false;
        var oldX = object.x;
        var oldY = object.y;
        object.x = x;
        object.y = y;
        this.objects.forEach(objectCheck=>{
          if (output === false && object !== objectCheck) {
            if (collides(object,objectCheck)) {
              output = true;
            }
          }
        });
        object.x = oldX;
        object.y = oldY;
        return output;
      }
    }
  }
  setObjectPosition(object,x,y){
    object.x = x;
    object.y = y;
  }
  outsideBoundaries(object,x,y){
    if (object.constructor.name === 'Square') {
      return x - object.width / 2 < 0 || x + object.width / 2 > this.width || /*HEIGHT*/y - object.height / 2 < 0 || y + object.height / 2 > this.height;
    } else if (object.constructor.name === 'circle') {
      return x - object.radius < 0 || x+ object.radius > this.width || y - object.radius < 0 || y + object.radius > this.height;
    }
  }
}
export default Environment;
