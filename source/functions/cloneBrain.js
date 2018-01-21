import cloneDeep from './clonedeep.js';
//import cloneDeep2 from './clonedeep2.js';

function cloneBrain(brain) {
	//console.log('Source Brain: ', brain);
	var clone = cloneDeep(brain);
	//console.log('Cloned Brain: ', clone);
	return clone;
}
export default cloneBrain;