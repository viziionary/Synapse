// DO NOT USE THIS FUNCTION, FOR cloneBrain USE ONLY!
const Neuron = require('../constructors/neuron');
const setPrototypeOf = require('./setprototypeof');
function cloneNeuron(neuron,newBrain,oldGlobalReferenceConnections){
  //console.log('CLONIN NEURON');
  var toClone = Object.assign({},neuron);
  delete toClone.brain;
  delete toClone.connections;
  delete toClone.connected;
  var clone = {connections:{},connected:{}};
  Object.assign(clone,JSON.parse(JSON.stringify(toClone)));
  clone.brain = newBrain;
  if (oldGlobalReferenceConnections) {
    Object.keys(neuron.connected).forEach(id=>{
      if (oldGlobalReferenceConnections.hasOwnProperty(id) && newBrain.globalReferenceConnections.hasOwnProperty(id)){
        newBrain.globalReferenceConnections[id].target = clone;
        clone.connected[id] = newBrain.globalReferenceConnections[id];
      } else {
        console.log('Problematic Neuron', neuron);
        console.log('Global Reference',oldGlobalReferenceConnections);
        throw new Error('Global Reference Connections Missing CONNECTED #' + id);
      }
    });
    Object.keys(neuron.connections).forEach(id=>{
      console.log(id,oldGlobalReferenceConnections.hasOwnProperty(id),newBrain.globalReferenceConnections.hasOwnProperty(id))
      if (oldGlobalReferenceConnections.hasOwnProperty(id) && newBrain.globalReferenceConnections.hasOwnProperty(id)){
        newBrain.globalReferenceConnections[id].source = clone;
        clone.connections[id] = newBrain.globalReferenceConnections[id];
      } else {
        console.log('Problematic Neuron', neuron);
        console.log('Global Reference',oldGlobalReferenceConnections);
        throw new Error('Global Reference Connections Missing CONNECTION #' + id);
      }
    });
  }
  setPrototypeOf(clone,Neuron.prototype);
  Neuron.prototype.bindMethods(clone);
    console.log('CLONING NEURON',neuron,'result:',clone);
  return clone;
}
module.exports = cloneNeuron;
