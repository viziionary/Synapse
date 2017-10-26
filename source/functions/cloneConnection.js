// DO NOT USE THIS FUNCTION, FOR cloneBrain USE ONLY!
const Connection = require('../constructors/neuron');
const setPrototypeOf = require('./setprototypeof');
function cloneConnection(connection){
  var toClone = Object.assign({},connection);
  delete toClone.source;
  delete toClone.target;
  var clone = Object.assign({},JSON.parse(JSON.stringify(toClone)));
  clone.bindMethods(clone);
  setPrototypeOf(clone,Connection.prototype);
  return clone;
}
module.exports = cloneConnection;
