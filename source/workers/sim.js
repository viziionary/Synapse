//import testFunc from './test.js';
import Brain from '../constructors/brain.js';

onmessage = function(e) {
	//testFunc();
	//console.log(e.data[0])
	var products = [];
	for (var i1 = 0; i1 < e.data[0]; i1++) {
		var brain = new Brain(20, 2);
		brain.generate();
	}
	postMessage(e.data[1]);
}