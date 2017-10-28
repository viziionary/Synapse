const Brain = require('../constructors/brain');
const setPrototypeOf = require('./setprototypeof');
const arrayToNeuron = require('./arraytoneuron');

function arrayToBrain(array){
  var output = {globalReferenceNeurons:{},counter:0};
  var connectionArrays = [];
  array.forEach((layer,layerIndex)=>{
    layer.forEach((neuron,neuronIndex)=>{
      let convertNeuronOutput = arrayToNeuron(neuron,layerIndex);
      connectionArrays = connectionArrays.concat([[neuronIndex,layerIndex],convertedNeuronOutput[1][0],convertNeuronOutput[1]][1]);
      output.counter++;
      let id = output.counter;
      convertedNeuronOutput[0].id = id;
      output.globalReferenceNeurons[id] = convertedNeuronOutput[0];
    });
  });
  console.log({connectionArrays});
  connectionArrays.forEach(connectionDataArray=>{
    connectionDataArray
  });
  setPrototypeOf(output,Brain.prototype);
  Brain.prototype.bindMethods(output);
  return output;
}
module.exports = arrayToBrain;
