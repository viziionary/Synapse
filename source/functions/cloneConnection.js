// DO NOT USE THIS FUNCTION, FOR cloneBrain USE ONLY!
const Connection = require('../constructors/connection');
const setPrototypeOf = require('./setprototypeof');

function cloneConnection(connection, newBrain) {
	if (!connection.target) {
		throw '!!! ANOMALY when cloning connection: target missing';
	} else if (!connection.source) {
		throw '!!! ANOMALY when cloning connection: source missing';
	}
	var toClone = Object.assign({}, connection);
	delete toClone.source;
	delete toClone.target;
	delete toClone.brain;
	var clone = Object.assign({}, JSON.parse(JSON.stringify(toClone)));
	clone.brain = newBrain;
	Connection.prototype.bindMethods(clone);
	setPrototypeOf(clone, Connection.prototype);
	return clone;
}
module.exports = cloneConnection;