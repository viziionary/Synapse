const Entity = require('./engine/entity');
const compute = require('./engine/compute');

function Engine(run, child, tick, targetScore, maxGens, surroundings, self, motion, target, viewer) {
	var generationCount = 0;
	var entity = new Entity(run, surroundings, self, viewer);
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
				var result = entity.think(bounds, time);
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