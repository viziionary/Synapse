const getHashTable = require('./gethashtable');

function visualizeLayers(brain){
  let inputs = Object.values(brain.layers.input);
  return inputs.map(input=>{
    return getTree(input);
  });
}
function getTree(neuron,currentData={tree:[],locationMap:[]}){
  neuron.connections.forEach(connection=>{
    if (locationMap) {

    }
  });
}
module.exports = visualizeLayers;
