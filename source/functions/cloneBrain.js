const Brain = require('../constructors/brain');
const setPrototypeOf = require('./setprototypeof');
const cloneNeuron = require('./cloneNeuron');
function cloneBrain(brain){
  var toClone = Object.assign({},brain);
  delete toClone.globalReferenceNeurons;
  delete toClone.globalReferenceConnections;
  clone = {globalReferenceNeurons:{},globalReferenceConnections:{}};
  setPrototypeOf(clone,Brain.prototype);
  Object.assign(clone,JSON.parse(JSON.stringify(toClone)));
  Object.entries(brain.globalReferenceConnections).forEach((connectionPair)=>{
    clone.globalReferenceNeurons[connectionPair[0]] = cloneConnection(connectionPair[1]);
  });
  Object.entries(brain.globalReferenceNeurons).forEach((neuronPair)=>{
    clone.globalReferenceNeurons[neuronPair[0]] = cloneNeuron(neuronPair[1],clone,clone.globalReferenceConnections);
  });
  return clone;
}
module.exports = cloneBrain;
