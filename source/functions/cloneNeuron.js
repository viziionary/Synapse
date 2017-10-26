// DO NOT USE THIS FUNCTION, FOR cloneBrain USE ONLY!
const Neuron = require('../constructors/neuron');
const setPrototypeOf = require('./setprototypeof');
function cloneNeuron(neuron,newBrain,globalReferenceConnections){
  var toClone = Object.assign({},neuron);
  delete toClone.brain;
  delete toClone.connections;
  delete toClone.connected;
  var clone = {connections:{},connected:{}};
  Object.assign(clone,JSON.parse(JSON.stringify(toClone)));
  clone.brain = newBrain;
  if (globalReferenceConnections) {
    clone.connected = {};
    Object.keys(neuron.connected).forEach(id=>{
      if (globalReferenceConnections.hasOwnProperty(id)){
        globalReferenceConnections[id].target = clone;
        clone.connected[id] = globalReferenceConnections[id];
      }
    });
    Object.keys(neuron.connections).forEach(id=>{
      if (globalReferenceConnections.hasOwnProperty(id)){
        globalReferenceConnections[id].source = clone;
        clone.connections[id] = globalReferenceConnections[id];
      }
    });
  }
  setPrototypeOf(clone,Neuron.prototype);
  clone.bindMethods(clone);
  return clone;
}
module.exports = cloneNeuron;
