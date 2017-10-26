const Neuron = require('../constructors/neuron');
const setPrototypeOf = require('./setprototypeof');
function cloneNeuron(neuron){
  var toClone = Object.assign({},neuron);
  delete toClone.connections;
  delete toClone.connected;
  var clone = {connections:{},connected:{}};
  Object.assign(clone,toClone);
  setPrototypeOf(clone,Neuron.prototype);
  return clone;
}
module.exports = cloneNeuron;
