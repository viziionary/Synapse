const Neuron = require('../constructors/neuron');
const setPrototypeOf = require('./setprototypeof');

function arrayToNeuron(array){
  var output = {connections:{},connected:{}};
  setPrototypeOf(output,Neuron.prototype);
  Neuron.prototype.bindMethods(clone);

}
module.exports = arrayToNeuron;
