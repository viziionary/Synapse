const connectionToArray = require('./connectionToArray');
function brainToArray(brain){
  var neuronIdConversionMap = {}
  console.log('brain to convert',brain);
  var connections = [];
  var neurons = brain.structure.map((layer,layerIndex)=>{
    return Object.entries(layer).map((neuronPair,neuronIndex)=>{
      let neuron = neuronPair[1];
      console.log('id:',neuron.id);
      neuronIdConversionMap[neuron.id] = [layerIndex,neuronIndex];
      return [neuron.weight,neuron.memory,neuron.polarization];
    });
  });
  Object.values(brain.globalReferenceConnections).forEach(connection=>{
    let parentLocation = neuronIdConversionMap[connection.source.id];
    let childLocation = neuronIdConversionMap[connection.target.id];
    if (parentLocation && childLocation) {
      if (!connections[parentLocation[0]]) {
        connections[parentLocation[0]] = [];
      }
      connections[parentLocation[0]][parentLocation[1]] = [childLocation,connectionToArray(connection)];
    } else {
      console.log(parentLocation,childLocation);
      console.log('Synapse: convert brain to array error, connection parent child mismatch');
    }
  });
  return [neurons,connections];
}
module.exports = brainToArray;
