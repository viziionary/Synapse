const findNewPoint = require('./findnewpoint');
const interceptOnCircle = require('./entity/interceptoncircle');
const lineSegmentIntersection = require('./entity/linesegmentintersection');
const getDistance = require('./getdistance');
const interceptCircles = require('./interceptcircles');
const circleInBounds = require('./circleinbounds');

function Entity(run, surroundings, self, viewer) {
	//console.log('Self', self);
	var that = this;
	this.age = 0;
	this.origin = {
		x: self.location.x,
		y: self.location.y
	};
	this.surroundings = surroundings;
	//console.log('Surroundings', surroundings);
	this.self = self;
	this.nerveCount = 20;
	this.nerveLength = 50;
	this.nerves = [];
	for (var i1 = 0; i1 < this.nerveCount; i1++) {
		for (var i1 = 0; i1 < this.nerveCount; i1++) {
			var angle = (360 / this.nerveCount) * i1;
			var p1 = self.location;
			var p2 = findNewPoint(self.location.x, self.location.y, angle, self.radius);
			var p3 = findNewPoint(p2.x, p2.y, angle, this.nerveLength);
			this.nerves.push([p2, p3]);
		}
	}
	this.think = function(bounds, time) {
		var input = [];
		for (var i1 = 0; i1 < that.nerves.length - 1; i1++) {
			input.push(1);
			var inputMin = 1;
			for (var i2 = 0; i2 < that.surroundings.length; i2++) {
				var objectCoords = that.surroundings[i2].location;
				var objectRadius = that.surroundings[i2].radius;
				var collision = interceptOnCircle(that.nerves[i1][0], that.nerves[i1][1], objectCoords, objectRadius);
				if (collision) {
					//console.log('Collision', collision);
					var length = collision / that.nerveLength;
					if (inputMin > length) inputMin = length;
				}
			}
			for (var i2 = 0; i2 < bounds.length; i2++) {
				var collision = lineSegmentIntersection(that.nerves[i1], bounds[i2]);
				if (collision) {
					var length = collision / that.nerveLength;
					if (inputMin > length) inputMin = length;
				}
			}
			input[i1] = inputMin;
		}
		//console.log('Input', input)
		var input = run(input, time);
		//console.log(result);
		var self = entity.self;
		var surroundings = entity.surroundings;
		//console.log('Self before:', entity.self.location);
		//console.log('Input', input);
		var speed = 1;
		if (input[0] >= 0.5) entity.self.location.x += (0.5 - input[0]) * speed;
		if (input[0] < 0.5) entity.self.location.x -= (input[0] - 0.5) * speed;
		if (input[1] >= 0.5) entity.self.location.y += (0.5 - input[1]) * speed;
		if (input[1] < 0.5) entity.self.location.y -= (input[1] - 0.5) * speed;
		//console.log('Self after:', entity.self.location);
		var distanceFromTarget = getDistance(self.location, target.location);
		var distanceFromStart = getDistance(entity.origin, self.location);
		var score = distanceFromStart + (distanceFromTarget * -1); //- Math.round(entity.age / 10);

		var result = {
			surroundings: surroundings,
			score: score,
			self: self
		}
		

		for (var i1 = 0; i1 < surroundings.length; i1++) {
			if (interceptCircles(self, surroundings[i1])) {
				result.state = 'complete';
			}
		}

		if (interceptCircles(self, target)) {
			result.state = 'complete';
		}
		if (!circleInBounds(canvas1, self)) {
			result.state = 'complete';
		}
		viewer.render(child, entity);
		return result;
	}
};
module.exports = Entity;