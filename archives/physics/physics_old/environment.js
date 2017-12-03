const isValidObjectType = require('./isvalidobjecttype');
const collides = require('./collides');
class Environment {
  constructor(width,height){
    this.width = width;
    this.height = height;
    this.objects = [];
    this.allowCollision = false;
    this.addObject = this.addObject.bind(this);
    this.setObjectPosition = this.setObjectPosition.bind(this);
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
      output = true;
      this.objects.forEach(checkObject=>{
        if (object === true && object !==checkObject && collides(object,checkObject)) {
          output = false;
        }
      });
      if (output === true) {
        object.x = x;
        object.y = y;
      }
      return output;
    }
  }
}
module.exports = Environment;
