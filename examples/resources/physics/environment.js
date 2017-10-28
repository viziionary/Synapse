const isValidObjectType = require('./isvalidobjecttype');
class Environment {
  constructor(width,height){
    this.width = width;
    this.height = height;
    this.objects = [];

    this.addObject = this.addObject.bind(this);
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
}
