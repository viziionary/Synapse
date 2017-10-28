const circle = require('./circle.js');
const square = require('./square.js');
const validObjectTypes = [circle,square];

isValidObjectType(object){
  validObjectTypes.forEach(validObjectType=>{
    if (object instanceof validObjectType) {
      return true;
    }
  });
  return false;
}
