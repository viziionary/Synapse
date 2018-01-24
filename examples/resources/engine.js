import Entity from './engine/entity.js';

function Engine(run, child, tick, targetScore, maxGens, surroundings, self, bounds, width, height, target, viewer) {
	var generationCount = 0;
	var entity = new Entity(run, surroundings, self, target, viewer);
	this.simulate = function sim() {
		return new Promise((resolve, reject) => {
			var contents = [];
			var endResult;
			//var entity = new Entity(run, surroundings, self);
			var maxTime = 1500;
			var time = 0;
			var timer = setInterval(() => {
				time += tick;
				entity.age = time;
				var result = entity.think(bounds, width, height, child);
				//viewer.update(child);
				//entity.surroundings = result.surroundings;
				//entity.self = result.self;
				if (result.state == 'complete' || time > maxTime) {
					clearInterval(timer);
					resolve(result.score);
				}
			}, tick);
		});
	}
}
export default Engine;