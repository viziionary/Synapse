const Entity = require('./engine/entity');
const compute = require('./engine/compute');

function Engine(run, child, tick, targetScore, maxGens, surroundings, self, motion, target) {
	var generationCount = 0;
	var canvas1 = document.getElementById('environment');
	var context1 = canvas1.getContext('2d');
	var entity = new Entity(run, surroundings, self);
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
	this.simulate = function sim() {
		return new Promise((resolve, reject) => {
			var contents = [];
			var endResult;
			//var entity = new Entity(run, surroundings, self);
			var maxTime = 2000;
			var time = 0;
			var timer = setInterval(() => {
				time += tick;
				entity.age = time;
				var input = entity.think(bounds);
				console.log('Input', input);
				var result = compute(input, contents, entity, canvas1, context1, run, child, target);
				//console.log('Result output', result);
				//console.log('Score output', result.score);
				entity.contents = result.contents;
				entity.self = result.self;
				if (result.state == 'complete' || time > maxTime) {
					clearInterval(timer);
					resolve(result.score);
				}
			}, tick);
		});
	}
}
module.exports = Engine;