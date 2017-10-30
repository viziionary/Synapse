const findNewPoint = require('./findnewpoint');
const interceptOnCircle = require('./entity/interceptoncircle');
const lineSegmentIntersection = require('./entity/linesegmentintersection');

function Entity(run, surroundings, self) {
	//console.log('Self', self);
	var that = this;
	this.age = 0;
	this.origin = {
		x : self.location.x,
		y : self.location.y
	};
	this.surroundings = surroundings;
	this.self = self;
	this.nerveCount = 20;
	this.nerveLength = 150;
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
	this.think = function(bounds) {
		var input = [];
		for (var i1 = 0; i1 < that.nerves.length - 1; i1++) {
			input.push(1);
			var inputMin = 1;
			for (var i2 = 0; i2 < that.surroundings.length; i2++) {
				var objectCoords = that.surroundings[i2].location;
				var objectRadius = that.surroundings[i2].radius;
				var collision = interceptOnCircle(that.nerves[i1][0], that.nerves[i1][1], objectCoords, objectRadius);
				if (collision) {
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
		var result = run(input);
		console.log(result);
		return result;
	}
};
module.exports = Entity;