const mutations = require('./mutations');
const getRandomNumber = require('./getrandomnumber');
const getRandomProperty = require('./getrandomproperty');
var mutationList = [];
Object.keys(mutations).map((key) => {
	for (let i = 0; i < mutations[key].frequency; i++) {
		mutationList.push(key);
	}
});

function mutate(max, child) {
	//console.log('Max mutations: ', max);
	for (let i = 0; i < max; i++) {
		if (mutationList.length > 0) {
			var rand = getRandomNumber(0, mutationList.length - 1);
			var mutation = mutationList[rand];
			//console.log('Debug: ', rand, mutationList, mutation)
			mutations[mutation].mutate(child);
		}
	}
}

module.exports = mutate;