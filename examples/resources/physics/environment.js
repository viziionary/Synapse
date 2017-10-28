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
  setObjectPosition(object,x,y){
    if (!this.objects.includes(object)) {
      throw new Error('Environment: Cannot Set Position Of Unsaved Object!');
    }
    if (this.allowCollision === true  || object.noClip === true) {
      object.x = x;
      object.y = y;
      return true;
    } else {
      if (this.outsideBoundaries(object,x,y,true)) {
        return false;
      }
      var output = true;
      var oldX = object.x;
      var oldY = object.y;
      object.x = x;
      object.y = y;
      this.objects.forEach(checkObject=>{
        let collision = collides(object,checkObject);
        // if (collision) {
        //   //console.log('collision',checkObject);
        // }
        if (output === true && object !==checkObject && collision) {
          output = false;
        }
      });
      if (output !== true) {
        object.x = oldX;
        object.y = oldY;
      }
      return output;
    }
  }
  outsideBoundaries(object,x,y,rebound=false){
    if (object.constructor.name === 'Square') {
      if (rebound){
        if (x - object.width / 2 < 0) {
          object.x = object.width/2;
        } else if (x + object.width / 2 > this.width) {
          object.x = this.width - object.width/2;
        }
        if (y - object.height / 2 < 0) {
          object.y = object.height/2;
        } else if (y + object.height / 2 > this.height) {
          object.y = this.height - object.height/2;
        }
      }
      return x - object.width / 2 < 0 || x + object.width / 2 > this.width || /*HEIGHT*/y - object.height / 2 < 0 || y + object.height / 2 > this.height;
    } else if (object.constructor.name === 'circle') {
      if (rebound) {
        if (x - object.radius < 0) {
          object.x = object.radius;
        } else if (x + object.radius > this.width) {
          object.x = this.width - object.radius;
        }
        if (y - object.radius < 0) {
          object.y = object.radius;
        } else if (y + object.radius > this.height) {
          object.y = this.height - object.radius;
        }
      }
      return x - object.radius < 0 || x+ object.radius > this.width || y - object.radius < 0 || y + object.radius > this.height;
    }
  }
}
export default Environment;
