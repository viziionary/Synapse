const HashTable = require('./hashtable');

function visualizeLayers(brain){
  let tree = getTree(brain);
  let output = treeToArray(tree);
  return output;
}
function treeToArray(tree){
  var output = [];
  tree.keys.forEach((key,index)=>{
    let layer = tree.values[index];
    if (!output[layer]) {
      output[layer] = [];
    }
    output[layer].push(key);
  });
  return output;
}
function checkConnection(neuron,layer,tree){
  let check = tree.get(neuron);
  if (check === undefined || check === null) {
    tree.set(neuron,layer);
    //console.log('NR',neuron);
    var output = [];
    Object.values(neuron.connections).forEach(connection=>{
      output.push(connection.target);
    });
    return output;
  } else {
    return null;
  }
}
function getTree(brain){
  //console.log('brain',brain);
  var tree = new HashTable();
  var toCheck = Object.values(brain.layers.input);
  var layer = 0;
  while (toCheck.length > 0 ) {
    var checking = toCheck.slice(0);
    toCheck = [];
    checking.forEach(neuron=>{
      let newChecks = checkConnection(neuron,layer,tree);
      if (newChecks) {
        toCheck = toCheck.concat(newChecks);
      }
    });
    layer++;
  }
  return tree;
}
module.exports = visualizeLayers;
