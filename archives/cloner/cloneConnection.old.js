// DO NOT USE THIS FUNCTION, FOR cloneBrain USE ONLY!
const Connection = require('../constructors/connection');
const setPrototypeOf = require('./setprototypeof');
const cloneNeuron = require('./cloneneuron');

function cloneConnection(connection, newBrain, oldBrain) {
	if (!connection.target) {
		throw '!!! ANOMALY when cloning connection: target missing';
	} else if (!connection.source) {
		throw '!!! ANOMALY when cloning connection: source missing';
	}
	var toClone = Object.assign({}, connection);
	//var source = Object.assign({}, connection.source);
	//var target = Object.assign({}, connection.target);
	delete toClone.source;
	delete toClone.target;
	delete toClone.brain;
	var clone = Object.assign({}, JSON.parse(JSON.stringify(toClone)));
	clone.source = cloneNeuron(connection.source, newBrain, oldBrain.globalReferenceConnections);
	clone.target = cloneNeuron(connection.target, newBrain, oldBrain.globalReferenceConnections);
	console.log('[DEBUG 1] CLONED SOURCE: ', clone.source);
	console.log('[DEBUG 2] CLONED TARGET: ', clone.target);
	clone.brain = newBrain;
	Connection.prototype.bindMethods(clone);
	setPrototypeOf(clone, Connection.prototype);
	return clone;
}
module.exports = cloneConnection; 