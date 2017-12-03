const cloneBrainProperty = require('./clonebrainproperty');

function cloneBrain(brain) {
	//console.log('Source Brain: ', brain);
	var clone = cloneBrainProperty(brain);
	//console.log('Cloned Brain: ', clone);
	return clone;
}
module.exports = cloneBrain;