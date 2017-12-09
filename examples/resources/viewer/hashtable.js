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
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }
  get(property){
    let keyIndex = this.keys.indexOf(property);
    if (keyIndex > -1) {
      let targetValue = this.values[keyIndex];
      if (targetValue !== undefined && targetValue !== null) {
        return targetValue;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  set(property,value){
    console.log('setting',property,value);
    if (!this.keys.includes(property)) {
      this.keys.push(property);
    }
    this.values[this.keys.indexOf(property)] = value;
    console.log('after',this);
    return true;
  }

}

export default HashTable;
