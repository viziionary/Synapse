const getDistance = require('./getdistance');
const findNewPoint = require('./findnewpoint');
const renderNerve = require('./rendernerve');
const interceptCircles = require('./interceptcircles');
const renderObject = require('./renderobject');
const renderLine = require('./renderline');
const circleInBounds = require('./circleinbounds');

function compute(input, contents, entity, canvas1, context1, run, child, target) {
	var self = entity.self;
	var contents = entity.contents;
	if (input[0] >= 0.5) self.location.x++;
	if (input[0] < 0.5) self.location.x--;
	if (input[1] >= 0.5) self.location.y++;
	if (input[1] < 0.5) self.location.y--;
	var distanceFromTarget = getDistance(self.location, target.location) * -1;
	var distanceFromStart = getDistance({
		x: 75,
		y: 75
	}, self.location);
	//console.log('Distance from target: ', distanceFromTarget);
	//console.log('Distance from start: ', distanceFromStart);
	//console.log('Age: ', entity.age)
	var score = distanceFromStart + (distanceFromTarget * 2) - Math.round(entity.age / 2);
	//console.log('Score source', score);
	context1.clearRect(0, 0, canvas1.width, canvas1.height);
	var result = {
		contents: contents,
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
		//console.log('Debug 1:', entity.nerves[i1]);
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
		//console.log('Debug 2:', sourcePoint);
		renderLine(context1, p3, points[i1].location, '#1d273c');
	}
	for (var i1 = 0; i1 < contents.length; i1++) {
		renderObject(context1, contents[i1]);
		//console.log('Debug 3:', contents[i1]);
		if (interceptCircles(self, contents[i1])) {
			result.state = 'complete';
		}
	}
	renderObject(context1, self);
	//console.log('Debug 4:', self);
	renderObject(context1, target);
	//console.log('Debug 5:', target);

	if (interceptCircles(self, target)) {
		result.state = 'complete';
	}
	if (!circleInBounds(canvas1, self)) {
		result.state = 'complete';
	}
	return result;
}
module.exports = compute;