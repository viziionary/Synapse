const mutations = require('./mutations');
const getRandomItem = require('./getrandomitem');
var weights = Object.values(mutations).map(mutation => {
  return mutation.frequency
});
var mutationList = Object.keys(mutations);

function mutate(max, child) {
  //console.log({count,max,child});
  for (let i = 0; i < max; i++) {
    var mutation = getRandomItem(mutationList, weights);
    mutations[mutation].mutate(child);
  }
}

module.exports = mutate;