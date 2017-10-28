const Neuron = require('../constructors/neuron');
const setPrototypeOf = require('./setprototypeof');

//[[],neuron.weight,neuron.memory,neuron.polarization]
function arrayToNeuron(array,arrayLayerNumber){
  var output = {connections:{}};
  output.weight = array[1];
  output.memory = array[2];
  output.polarization = array[3];
  setPrototypeOf(output,Neuron.prototype);
  Neuron.prototype.bindMethods(clone);
  return [output,array[0]];
}
module.exports = arrayToNeuron;
