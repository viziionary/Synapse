import Viewer from './viewer';
import Synapse from '../../source/index';

//document.addEventListener("load", function() {

	var canvas = document.getElementById("brain");
	var viewer;

	var network = new Synapse(2, 1, (run) => {

		var counter = 0;
		viewer.render();

		var output1 = run([1, 1])[0];
		var output2 = 1 - run([1, 0])[0];
		var output3 = run([0, 0])[0];
		var total = 3 - (output1 + output2 + output3);
		counter++;
		if (counter > 1000) {
			console.log('Ended without reaching target: ' + total);
			return false;
		}
		if (total < 2.7) {
			return total;
		} else {
			console.log("Done: " + total);
			return false;
		}
	});
	viewer = new Viewer(canvas, network.brain);
	network.run();

	
//})