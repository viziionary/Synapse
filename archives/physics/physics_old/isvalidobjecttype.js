const Circle = require('./circle.js');
const Square = require('./square.js');
const validObjectTypes = [Circle,Square];

function isValidObjectType(object){
  var output = false;
  validObjectTypes.forEach((validObjectType)=>{
    if (object instanceof validObjectType) {
      output = true;
    }
  });
  return output;
}
module.exports = isValidObjectType;
