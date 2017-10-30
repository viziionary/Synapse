const HashTable = require('./viewer/hashtable');

function visualizeLayers(brain){
  return treeToArray(getTree(brain));
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
function getTree(brain){
  //console.log('brain',brain);
  var tree = new HashTable();
  var toCheck = [];
  let checkConnection = (neuron,layer=0)=>{
    let check = tree.get(neuron);
    //console.log('check',check);
    if (check === undefined || check === null) {
      tree.set(neuron,layer);
      //console.log('NR',neuron);
      Object.values(neuron.connections).forEach(connection=>{
        toCheck.push(connection.target);
      })
    }
  }
  Object.values(brain.layers.input).forEach(input=>{
    checkConnection(input,0);
  });
  var layer = 1;
  while (toCheck.length > 0 ) {
    var checking = toCheck.slice(0);
    toCheck = [];
    checking.forEach(neuron=>{
      checkConnection(neuron,layer);
    })
    layer++;
  }
  return tree;
}
module.exports = visualizeLayers;
