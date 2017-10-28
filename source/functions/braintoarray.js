function BrainToArray(brain){
  var neuronIdConversionMap = new WeakMap();
  var neurons = brain.structure.map((layer,layerIndex)=>{
    return Object.entries(layer).map((neuronPair,neuronIndex)=>{
      neuronIdConversionMap.set(neuronPair[1].id,[layerIndex,neuronIndex]);
      return [[],neuron.weight,neuron.memory,neuron.polarization];
    });
  });
  brain.globalReferenceConnections.forEach(connection=>{
    let parent = neuronIdConversionMap.get(connection.source.id);
    let child = neuronIdConversionMap.get(connection.target.id);
    if (parent && child) {
      let parent = neurons[parent[0]][parent[1]];
      parent[0].push(child);
    } else {
      console.log('Synapse: convert brain to array error, connection parent child mismatch');
    }
  });
}
