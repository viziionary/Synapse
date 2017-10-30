function generateLayers(brain){
  var output = {};
  brain.getAllNeurons().forEach(neuron=>{
    if (!output[neuron.type]) {
      output[neuron.type] = [];
    }
    output[neuron.type].push(neuron);
  });
  return output;
}
module.exports = generateLayers;
