// DO NOT USE THIS FUNCTION, FOR cloneBrain USE ONLY!
const Neuron = require('../constructors/neuron');
const setPrototypeOf = require('./setprototypeof');
function cloneNeuron(neuron,newBrain,oldGlobalReferenceConnections){
  var toClone = Object.assign({},neuron);
  delete toClone.brain;
  delete toClone.connections;
  delete toClone.connected;
  var clone = {connections:{},connected:{}};
  Object.assign(clone,JSON.parse(JSON.stringify(toClone)));
  clone.brain = newBrain;
  if (oldGlobalReferenceConnections) {
    clone.connected = {};
    Object.keys(neuron.connected).forEach(id=>{
      if (oldGlobalReferenceConnections.hasOwnProperty(id) && newBrain.globalReferenceConnections.hasOwnProperty(id)){
        newBrain.globalReferenceConnections[id].target = clone;
        clone.connected[id] = newBrain.globalReferenceConnections[id];
      }
    });
    Object.keys(neuron.connections).forEach(id=>{
      if (oldGlobalReferenceConnections.hasOwnProperty(id) && newBrain.globalReferenceConnections.hasOwnProperty(id)){
        newBrain.globalReferenceConnections[id].source = clone;
        clone.connections[id] = newBrain.globalReferenceConnections[id];
      }
    });
  }
  setPrototypeOf(clone,Neuron.prototype);
  Neuron.prototype.bindMethods(clone);
  return clone;
}
module.exports = cloneNeuron;
