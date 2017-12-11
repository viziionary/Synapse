import cloneBrainProperty from './clonebrainproperty.js';

function cloneBrain(brain) {
	var neurons = {};
	var connections = {};
	console.log('Source Brain: ', brain);
	var clone = cloneBrainProperty(brain, null, neurons, connections);
	console.log('Cloned Brain: ', clone);
	return clone;
}
export default cloneBrain;