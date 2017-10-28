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
module.exports = createStructure;
