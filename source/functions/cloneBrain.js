const Brain = require('../constructors/brain');
const setPrototypeOf = require('./setprototypeof');
const cloneNeuron = require('./cloneneuron');
const cloneConnection = require('./cloneconnection');
const createStructure = require('./createstructure');
const generateLayers = require('./generatelayers');

function cloneBrain(brain){
  console.log('DOING OSME CLONE BRAIN VWOOOSH');
  //console.log('OLD BRAIN MUTATION RATE',brain.mutationRate);
  var toClone = Object.assign({},brain);
  delete toClone.globalReferenceNeurons;
  delete toClone.globalReferenceConnections;
  delete toClone.layers;
  clone = {globalReferenceNeurons:{},globalReferenceConnections:{}};
  setPrototypeOf(clone,Brain.prototype);
  Object.assign(clone,JSON.parse(JSON.stringify(toClone)));
  Object.entries(brain.globalReferenceConnections).forEach((connectionPair)=>{
    clone.globalReferenceConnections[connectionPair[0]] = cloneConnection(connectionPair[1],clone);
  });
    console.log('doing some stuff');
    Object.entries(brain.globalReferenceNeurons).forEach((neuronPair)=>{
    console.log('doing some more stuff');
    clone.globalReferenceNeurons[neuronPair[0]] = cloneNeuron(neuronPair[1],clone,brain.globalReferenceConnections);
  });
  clone.layers = generateLayers(clone);
  Brain.prototype.bindMethods(clone);
  //console.log('NEW BRAIN MUTATION RATE',clone.mutationRate);
  console.log('old',brain,'new',clone);
  return clone;
}
module.exports = cloneBrain;
