function validHashTable(hashtable){
  return typeof hashtable === 'object' && hashtable instanceof HashTable && hashtable.hasOwnProperty('keys') && hashtable.hasOwnProperty('values') && Array.isArray(hashtable.keys) && Array.isArray(hashtable.values);
}
const HashHandler = {ownKeys:(target)=>{
  return target.keys;
},get:(target,property)=>{
  // if (!validHashTable(target)) {
  //   throw new Error('HashTable Proxy: Cannot Set on Non-HashTable');
  // }
  if (property === 'values'){
    return target.values;
  }
  if (property === 'keys') {
    return target.keys;
  }
  let keyIndex = target.keys.indexOf(property);
  if (keyIndex > -1) {
    let targetValue = target.values[keyIndex];
    if (targetValue !== undefined && targetValue !== null) {
      return targetValue;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
},set:(target, property, value, receiver)=>{
  console.log('assigning',typeof property);
  // if (!validHashTable(target)) {
  //   throw new Error('HashTable Proxy: Cannot Set on Non-HashTable');
  // }
  if (!target.keys.includes(property)) {
    target.keys.push(property);
  }
  target.values[target.keys.indexOf(property)] = value;
  return true;
}};
class HashTable {
  constructor(){

    console.log();
    this.keys = [];
    this.values = [];
  }
}
function getHashTable(){
  return new Proxy(new HashTable(),HashHandler);
}

module.exports = getHashTable;
