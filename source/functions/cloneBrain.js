import cloneBrainProperty from './clonebrainproperty.js';

function cloneBrain(brain) {
	//console.log('Source Brain: ', brain);
	var clone = cloneBrainProperty(brain);
	//console.log('Cloned Brain: ', clone);
	return clone;
}
export default cloneBrain;