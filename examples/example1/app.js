import Viewer from './viewer';
import Synapse from '../../source/index';
import getTimer from './gettimer';

window.addEventListener("load", function() {

	var canvas = document.getElementById("brain");
	var viewer;
	var counter = 0;

	var network = new Synapse(2, 1, (run) => {
		viewer.render();
		var output1 = run([1, 1])[0];
		var output2 = 1 - run([1, 0])[0];
		var output3 = run([0, 0])[0];
		var total = 3 - (output1 + output2 + output3);
		counter++;
		var interval = 25 % counter;  
		if (interval == 0){
			console.log(total);
		}
		if (counter > 1000) {
			console.log('Ended without reaching target: ' + total);
			return false;
		}
		if (total < 2.7) {
			return getTimer(50,total);
		} else {
			console.log("Done: " + total);
			return false;
		}
	});
	viewer = new Viewer(canvas, network.brain);
	network.run();

})
