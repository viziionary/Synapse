const Brain = require('../constructors/brain');
const setPrototypeOf = require('./setprototypeof');
const cloneNeuron = require('./cloneNeuron');
const cloneConnection = require('./cloneConnection');

function cloneBrain(brain){
  var toClone = Object.assign({},brain);
  delete toClone.globalReferenceNeurons;
  delete toClone.globalReferenceConnections;
  delete toClone.structure;
  clone = {globalReferenceNeurons:{},globalReferenceConnections:{}};
  setPrototypeOf(clone,Brain.prototype);
  Object.assign(clone,JSON.parse(JSON.stringify(toClone)));
  Object.entries(brain.globalReferenceConnections).forEach((connectionPair)=>{
    clone.globalReferenceConnections[connectionPair[0]] = cloneConnection(connectionPair[1],clone);
  });
  Object.entries(brain.globalReferenceNeurons).forEach((neuronPair)=>{
    clone.globalReferenceNeurons[neuronPair[0]] = cloneNeuron(neuronPair[1],clone,brain.globalReferenceConnections);
  });
  Brain.prototype.bindMethods(clone);
  clone.structure = createStructure(clone);
  return clone;
}
function createStructure(brain){
  var output = [];
  Object.values(brain.globalReferenceNeurons).forEach(neuron=>{
    if (!output[neuron.layer]) {
      output[neuron.layer] = {};
    }
    output[neuron.layer][neuron.id] = neuron;
  });
  return output;
}
module.exports = cloneBrain;
