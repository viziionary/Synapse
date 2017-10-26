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
<<<<<<< HEAD
		var interval = counter % 100;  
=======
		var interval = counter % 10;
>>>>>>> 21efc0e1c272672d79375e12a528deb73067c9d7

		if (interval){
			console.log(total);
		}
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
		return getTimer(50);
	});
	viewer = new Viewer(canvas, network.brain);
	network.run();

})
