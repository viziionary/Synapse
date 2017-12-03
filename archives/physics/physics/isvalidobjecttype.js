import Circle from './circle.js';
import Square from './square.js';
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
export default isValidObjectType;
