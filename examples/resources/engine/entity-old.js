const findNewPoint = require('./findnewpoint');
const interceptOnCircle = require('./entity/interceptoncircle');
const lineSegmentIntersection = require('./entity/linesegmentintersection');
const getDistance = require('./getdistance');
const interceptCircles = require('./interceptcircles');
const circleInBounds = require('./circleinbounds');

function Entity(run, surroundings, self, target, viewer) {
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
	this.nerves = {};
	for (var i1 = 0; i1 < this.nerveCount; i1++) {
			var angle = (360 / this.nerveCount) * i1;
			var p1 = self.location;
			var p2 = findNewPoint(self.location.x, self.location.y, angle, self.radius);
			var p3 = findNewPoint(p2.x, p2.y, angle, this.nerveLength);
			var nerve = {
				points : [p2, p3], 
				size : this.nerveLength
			}
			this.nerves[i1] = nerve;
	}
	//console.log('Original nerves', this.nerves)
	this.think = function(bounds, width, height, time, child) {
		var input = [];

		for (let i1 in that.nerves) {
			var inputMin = 1;

			for (let i2 = 0; i2 < that.surroundings.length; i2++) {
				var objectCoords = that.surroundings[i2].location;
				var objectRadius = that.surroundings[i2].radius;
				//console.log('Nerves 1', that.nerves, 'i1', i1);
				var collision = interceptOnCircle(that.nerves[i1].points[0], that.nerves[i1].points[1], objectCoords, objectRadius);
				if (collision) {
					//console.log('Collision', collision);
					var length = collision / that.nerveLength;
					if (inputMin > length) inputMin = length;
				}
			}
			for (let i2 = 0; i2 < bounds.length; i2++) {
				//console.log('Nerves 2', that.nerves)
				var collision = lineSegmentIntersection(that.nerves[i1].points, bounds[i2]);
				if (collision) {
					var length = collision / that.nerveLength;
					if (inputMin > length){
						inputMin = length;
					} 
				}
			}
			that.nerves[i1].size = inputMin * that.nerveLength;
			input.push(inputMin);
		}
		//console.log('Input', input)
		var input = run(input, time);
		//console.log(result);
		var self = this.self;
		var surroundings = this.surroundings;
		//console.log('Self before:', entity.self.location);
		//console.log('Input', input);
		var speed = 1;
		if (input[0] >= 0.5) self.location.x += (0.5 - input[0]) * speed;
		if (input[0] < 0.5) self.location.x -= (input[0] - 0.5) * speed;
		if (input[1] >= 0.5) self.location.y += (0.5 - input[1]) * speed;
		if (input[1] < 0.5) self.location.y -= (input[1] - 0.5) * speed;
		//console.log('Self after:', entity.self.location);
		var distanceFromTarget = getDistance(self.location, target.location);
		var distanceFromStart = getDistance(this.origin, self.location);
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
		if (!circleInBounds(width, height, self)) {
			result.state = 'complete';
		}
		viewer.render(child, this, surroundings, target);
		return result;
	}
};
module.exports = Entity;