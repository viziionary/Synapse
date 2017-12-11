import Synapse from '../../source/constructors/synapse.js';
import Engine from '../resources/engine.js';
import Viewer from '../resources/viewer.js';

window.addEventListener("load", function() {
	var threadCount = navigator.hardwareConcurrency * 4;
	var canvasThreads = [];
	var canvasClassList = ['']
	for (let i1 = 0; i1 < threadCount; i1++) {
		canvasThreads.push({});
		var setWrapper = document.createElement('div');
		setWrapper.classList.add('wrapper');
		document.body.appendChild(setWrapper);
		for (let i2 = 0; i2 < 4; i2++) {
			var name = 'canvas' + i1 + 'x' + i2;
			var canvasWrapper = document.createElement('div');
			var canvas = document.createElement('canvas');
			canvas.classList.add(canvasClassList[i2]);
			canvasWrapper.classList.add('canvas-wrapper');
			canvasThreads[i1][name] = canvas;
			canvas.id = name;

			if (i2 > 1) {
				setWrapper.appendChild(canvas);
			} else {
				setWrapper.appendChild(canvasWrapper);
				canvasWrapper.appendChild(canvas);
			}
		}
	}
	console.log('Canvas threads: ', canvasThreads);
	/*
	var viewer = new Viewer(canvas1, canvas2, canvas3, canvas4);
	var counter = 0;
	var network = new Synapse(20, 2, async(run, child) => {
		viewer.update(child);
		canvas3.width = document.body.clientWidth;
		canvas3.height = document.body.clientHeight;
		canvas4.width = document.body.clientWidth;
		canvas4.height = document.body.clientHeight;
		var width = canvas1.width;
		var height = canvas1.height;
		var bounds = [
			[{
				x: 0,
				y: 0
			}, {
				x: canvas2.width,
				y: 0
			}],
			[{
				x: canvas2.width,
				y: 0
			}, {
				x: canvas2.width,
				y: canvas2.height
			}],
			[{
				x: 0,
				y: canvas2.height
			}, {
				x: canvas2.width,
				y: canvas2.height
			}],
			[{
				x: 0,
				y: 0
			}, {
				x: 0,
				y: canvas2.height
			}]
		];
		var targetScore = 1000;
		var surroundings = [];
		for (let i1 = 0; i1 < 5; i1++) {
			for (let i2 = 0; i2 < 5; i2++) {
				surroundings.push({
					location: {
						x: (width * 0.25) * i1,
						y: (height * 0.25) * i2
					},
					radius: 15,
					color: '#388751',
					stroke: '#4fad8b'
				});
			}
		}
		var self = {
			radius: 30,
			location: {
				x: 50,
				y: 50
			},
			color: '#7a5ebc',
			stroke: '#bc82e5'
		}
		var target = {
			location: {
				x: width * 0.875,
				y: height * 0.875
			},
			radius: 30,
			color: '#e59f44',
			stroke: '#ead379'
		};
		var engine = new Engine(run, child, 1, 0, 10000, surroundings, self, bounds, width, height, target, viewer);
		var score = await engine.simulate();
		counter++;
		if (counter > 100000) {
			console.log('Ended without reaching target score: ' + targetScore);
			return false;
		}
		if (score > targetScore) {
			console.log('Done!');
			console.log(child);
			return true;
		} else {
			return score;
		}
	});
	*/
});