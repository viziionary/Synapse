const getDistance = require('./getdistance');
const findNewPoint = require('./findnewpoint');
const renderNerve = require('./rendernerve');
const interceptCircles = require('./interceptcircles');
const renderObject = require('./renderobject');
const renderLine = require('./renderline');
const circleInBounds = require('./circleinbounds');

function compute(input, surroundings, entity, canvas1, context1, run, child, target, viewer) {
	//console.log(surroundings);
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

	// FUCKUP: Nothing below this point belongs in compute, should be moved to the viewer

	context1.clearRect(0, 0, canvas1.width, canvas1.height);
	var result = {
		surroundings: surroundings,
		score: score,
		self: self
	}
	var points = [];
	for (var i1 = 0; i1 < child.inputSize; i1++) {
		var space = canvas1.height / child.inputSize;
		var distance = ((i1 + 1) * space) - (0.5 * space);
		var point = {
			location: {
				x: distance,
				y: 5
			},
			radius: 5,
			color: '#1d273c',
			stroke: '#0f1623'
		}
		points.push(point);
	}
	for (var i1 = 0; i1 < entity.nerves.length; i1++) {
		var angle = (360 / entity.nerveCount) * i1;
		var p1 = self.location;
		var p2 = findNewPoint(self.location.x, self.location.y, angle, self.radius);
		var p3 = findNewPoint(p2.x, p2.y, angle, entity.nerveLength);
		entity.nerves[i1] = [p2, p3];
		renderNerve(context1, entity.nerves[i1]);
		renderObject(context1, points[i1]);
		var sourcePoint = {
			location: {
				x: p3.x,
				y: p3.y
			},
			radius: 3,
			color: '#1d273c',
			stroke: '#0f1623'
		}
		renderObject(context1, sourcePoint);
		renderLine(context1, p3, points[i1].location, '#1d273c');
	}
	for (var i1 = 0; i1 < surroundings.length; i1++) {
		renderObject(context1, surroundings[i1]);
		if (interceptCircles(self, surroundings[i1])) {
			result.state = 'complete';
		}
	}
	renderObject(context1, self);
	renderObject(context1, target);

	if (interceptCircles(self, target)) {
		result.state = 'complete';
	}
	if (!circleInBounds(canvas1, self)) {
		result.state = 'complete';
	}

	return result;
}
module.exports = compute;