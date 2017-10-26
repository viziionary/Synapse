const Brain = require('../constructors/brain');
function cloneBrain(brain){
  var toClone = Object.assign({},brain);
  delete toClone.globalReferenceNeurons;
  delete toClone.globalReferenceConnections;
  clone = new Brain(toClone.inputSize,toClone.outputSize);
  Object.assign(clone,JSON.parse(JSON.stringify(toClone)));
  return clone;
}
module.exports = cloneBrain;
