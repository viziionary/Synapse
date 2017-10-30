const Viewer = require('../resources/viewer');
const Synapse = require('../../source/index');
const Engine = require('../resources/engine');

window.addEventListener("load", function() {
	var viewer;
	var counter = 0;
	var network = new Synapse(20, 2, async(run, child) => {
		//console.log('Debug 2', child);
		var canvas1 = document.getElementById('environment');
		var canvas2 = document.getElementById('brain');
		var canvas3 = document.getElementById('overlay');
		viewer = new Viewer(canvas1, canvas2, canvas3, child);
		var bounds = [
			[{
				x: 0,
				y: 0
			}, {
				x: 0,
				y: canvas1.width
			}],
			[{
				x: canvas1.width,
				y: 0
			}, {
				x: canvas1.width,
				y: canvas1.height
			}],
			[{
				x: 0,
				y: canvas1.height
			}, {
				x: canvas1.width,
				y: canvas1.height
			}],
			[{
				x: 0,
				y: 0
			}, {
				x: 0,
				y: canvas1.height
			}]
		];
		var targetScore = 1000;
		var surroundings = [];
		for (let i1 = 0; i1 < 5; i1++) {
			for (let i2 = 0; i2 < 5; i2++) {
				surroundings.push({
					location: {
						x: 125 * i1,
						y: 125 * i2
					},
					radius: 15,
					color: '#1fa71f',
					stroke: '#003300'
				});
			}
		}
		var self = {
			radius: 30,
			location: {
				x: 50,
				y: 50
			}
		}
		var target = {
			location: {
				x: 450,
				y: 450
			},
			radius: 30,
			color: '#f3a13a',
			stroke: '#f3663a'
		};
		var engine = new Engine(run, child, 1, 0, 10000, surroundings, self, bounds, target, viewer);
		var score = await engine.simulate();
		//console.log('Child score', score);
		//console.log('Score final', score);
		counter++;
		//if (counter % 10 == 0) {
		//console.log("Score: " + score);
		//}
		if (counter > 100000) {
			console.log('Ended without reaching target score: ' + targetScore);
			return false;
		}
		if (score > targetScore) {
			console.log('Done!');
			console.log(child);
			return false;
		} else {
			return score;
		}
	});
	//viewer = new Viewer(canvas);
	network.initiate();
});