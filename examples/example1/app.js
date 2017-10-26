import Viewer from './viewer';
import Synapse from '../../source/index';
import getTimer from './gettimer';

window.addEventListener("load", function() {

	var canvas = document.getElementById("brain");
	var viewer;
	var counter = 0;

	var network = new Synapse(2, 1, (run) => {
		viewer.render(network.child);
		var output1 = run([1, 1])[0];
		var output2 = run([0, 0])[0];
		var output3 = run([1, 0])[0];
		var output4 = run([0, 1])[0];
		counter++;
		if (counter % 10 == 0){
			console.log("Working...");
		}
		if (counter > 1000000) {
			console.log('Ended without reaching target: ' + total);
			return false;
		}
		if (output1 < 0.5 && output2 < 0.5 && output3 > 0.5 && output4 > 0.5) {
			console.log('Done!');
			network.brain = network.child;
			console.log(network.child);
			console.log('Verfiying:');
			console.log('[1,1]:' + network.child.input([1, 1]));
			console.log('[0,0]:' + network.child.input([0, 0]));
			console.log('[1,0]:' + network.child.input([1, 0]));
			console.log('[0,1]:' + network.child.input([0, 1]));
			return false;
		} else {
			return getTimer(0, 1);
		}
	});
	viewer = new Viewer(canvas);
	network.run();
});
