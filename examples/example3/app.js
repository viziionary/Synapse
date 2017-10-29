import Viewer from './viewer';
import Synapse from '../../source/index';
import getTimer from './gettimer';

window.addEventListener("load", function() {

	var canvas = document.getElementById("brain");
	var viewer;
	var counter = 0;

	var network = new Synapse(20, 2, async(run, child) => {
		viewer.render(child);
		var evolution = new Evolution(run, child, 1, 0, 10000);
		var score = await evolution.simulate();
		//console.log('Child score', score);
		//console.log('Score final', score);
		counter++;
		//if (counter % 10 == 0) {
			console.log("Score: " + score);
		//}
		if (counter > 1000) {
			console.log('Ended without reaching target score: ' + 0);
			return false;
		}
		if (score > 0) {
			console.log('Done!');
			console.log(child);
			return false;
		} else {
			return score;
		}
	});
	viewer = new Viewer(canvas);
	network.initiate();

	function findNewPoint(x, y, angle, distance) {
		var result = {};
		result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
		result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);
		return result;
	}

	function getDistance(point1, point2) {
		return Math.hypot(point2.x - point1.x, point2.y - point1.y);
	}

	function interceptCircles(circle1, circle2) {
		var dx = circle1.location.x - circle2.location.x;
		var dy = circle1.location.y - circle2.location.y;
		var distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < circle1.radius + circle2.radius) {
			return true;
		} else {
			return false;
		}
	}

	function lineSegmentIntersection(line1, line2) {
		var x1 = line1[0].x;
		var x2 = line1[1].x;
		var x3 = line2[0].x;
		var x4 = line2[1].x;
		var y1 = line1[0].y;
		var y2 = line1[1].y;
		var y3 = line2[0].y;
		var y4 = line2[1].y;

		var a_dx = x2 - x1;
		var a_dy = y2 - y1;
		var b_dx = x4 - x3;
		var b_dy = y4 - y3;
		var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
		var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
		if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
			var collision = {
				x: x1 + t * a_dx,
				y: y1 + t * a_dy
			};
			var distance = getDistance(line1[0], collision);
			return distance;
		} else {
			return false;
		}
	}

	function Entity(run) {
		var that = this;
		this.age = 0;
		this.contents = [];
		for (let i1 = 0; i1 < 5; i1++) {
			for (let i2 = 0; i2 < 5; i2++) {
				this.contents.push({
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

		this.self = {
			radius: 30,
			location: {
				x: 75,
				y: 75
			}
		}

		function interceptOnCircle(p1, p2, c, r) {
			var p3 = {
				x: p1.x - c.x,
				y: p1.y - c.y
			};
			var p4 = {
				x: p2.x - c.x,
				y: p2.y - c.y
			};
			var m = (p4.y - p3.y) / (p4.x - p3.x); //slope of the line
			var b = p3.y - m * p3.x; //y-intercept of line
			var underRadical = Math.pow(r, 2) * Math.pow(m, 2) + Math.pow(r, 2) - Math.pow(b, 2); //the value under the square root sign
			if (underRadical < 0) {
				return false;
			} else {
				var t1 = (-m * b + Math.sqrt(underRadical)) / (Math.pow(m, 2) + 1); //one of the intercept x's
				var t2 = (-m * b - Math.sqrt(underRadical)) / (Math.pow(m, 2) + 1); //other intercept's x
				var i1 = {
					x: t1 + c.x,
					y: m * t1 + b + c.y
				};
				var i2 = {
					x: t2 + c.x,
					y: m * t2 + b + c.y
				};
				var length = Math.hypot(p1.x - p2.x, p1.y - p2.y);
				var distance1 = Math.hypot(p1.x - i2.x, p1.y - i2.y);
				var distance2 = Math.hypot(p1.x - i1.x, p1.y - i1.y);
				var lowerBounds = Math.min(distance1, distance2);
				if (lowerBounds < length) {
					return lowerBounds;
				} else {
					return false;
				}
			}
		}

		this.nerveCount = 20;
		this.nerveLength = 150;
		this.nerves = [];
		for (var i1 = 0; i1 < this.nerveCount; i1++) {
			for (var i1 = 0; i1 < this.nerveCount; i1++) {
				var angle = (360 / this.nerveCount) * i1;
				var p1 = this.self.location;
				var p2 = findNewPoint(this.self.location.x, this.self.location.y, angle, this.self.radius);
				var p3 = findNewPoint(p2.x, p2.y, angle, this.nerveLength);
				this.nerves.push([p2, p3]);
			}
		}

		this.think = function(bounds) {
			var input = [];
			for (var i1 = 0; i1 < that.nerves.length - 1; i1++) {
				input.push(1);
				var inputMin = 1;
				for (var i2 = 0; i2 < that.contents.length; i2++) {
					var objectCoords = that.contents[i2].location;
					var objectRadius = that.contents[i2].radius;
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
			return result;
		}
	};

	function circleInBounds(canvas, circle) {
		var x = circle.location.x;
		var y = circle.location.y;
		var width = canvas.width;
		var height = canvas.height;
		if (x > width - circle.radius || x < 0 + circle.radius || y > height - circle.radius || y < 0 + circle.radius) {
			return false;
		} else {
			return true;
		}
	}

	function renderObject(context, object) {
		var x = object.location.x;
		var y = object.location.y;
		var radius = object.radius;
		var color = object.color;
		var stroke = object.stroke;
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = color;
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = stroke;
		context.stroke();
	}

	function renderNerve(context, nerve) {
		var p1 = nerve[0];
		var p2 = nerve[1];
		context.beginPath();
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.lineWidth = 1;
		context.strokeStyle = '#a0f6ff';
		context.stroke();
	}

	function renderLine(context, p1, p2, color) {
		context.beginPath();
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.lineWidth = 1;
		context.strokeStyle = color;
		context.stroke();
	}

	function renderBrain(brain, ctx, canvas) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var width = canvas.width;
		var height = canvas.height;
		var layers = brain.layers;
		var heightDiv = height / layers;
		var layerList = [];
		var effectiveLayerList = [];
		var effectiveLinkList = [];
		for (var i1 = 0; i1 < brain.layers; i1++) {
			layerList.push([]);
			for (var prop1 in brain.globalReferenceNeurons) {
				if (brain.globalReferenceNeurons[prop1].layer === i1) {
					layerList[i1].push(brain.globalReferenceNeurons[prop1]);
				}
			}
		}
		for (var i1 = 0; i1 < brain.layers; i1++) {
			effectiveLayerList.push([]);
		}
		var coord; // to hold node coordinates defined here to prevent pointless memory allocation dealocation cycle
		// Gets the node position based on its ID and layer position
		function nodePosition(node, coord = {}) {
			var pos;
			var pos = effectiveLayerList[node.layer].findIndex(item => item.id == node.id);
			var widthDiv = width / effectiveLayerList[node.layer].length;
			coord.x = (widthDiv * pos) + (0.5 * widthDiv);
			coord.y = (heightDiv * node.layer) + (0.5 * heightDiv);
			return coord;
		}

		function drawNode(node) {
			ctx.strokeStyle = '#56cc41';
			ctx.fillStyle = '#adf442';
			ctx.lineWidth = 2;
			coord = nodePosition(node, coord);
			ctx.beginPath();
			ctx.arc(coord.x, coord.y, 5, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		}

		function drawLink(node1, node2) {
			ctx.strokeStyle = '#56cc41';
			ctx.lineWidth = 1;
			coord = nodePosition(node1, coord);
			ctx.beginPath();
			ctx.moveTo(coord.x, coord.y);
			coord = nodePosition(node2, coord);
			ctx.lineTo(coord.x, coord.y);
			ctx.stroke();
		}

		function isPathActive(node) {
			var paths, i, nextNode;
			if (node.active) {
				if (node.layer === 2) {
					return true;
				}
				paths = Object.keys(node.connections).map(key => node.connections[key]);
				for (i = 0; i < paths.length; i++) {
					nextNode = paths[i].target;
					if (nextNode.active) {
						if (nextNode.layer === 2) {
							return true;
						}
						if (isPathActive(nextNode)) {
							return true;
						}
					}
				}
			}
			return false;
		}

		function renderPath(node) {
			var i;
			paths = Object.keys(node.connections).map(key => node.connections[key]);
			for (i = 0; i < paths.length; i++) {
				nextNode = paths[i].target;
				if (isPathActive(nextNode)) {
					var duplicate = effectiveLinkList.findIndex(function(item) {
						if (item.node1.id === node.id) {
							if (item.node2.id === nextNode.id) {
								return true;
							}
						}
					});
					if (duplicate == -1) {
						effectiveLinkList.push({
							node1: node,
							node2: nextNode
						});
					}
					renderPath(nextNode);
				}
			}
			var duplicate = effectiveLayerList[node.layer].find(item => item.id === node.id);
			if (!duplicate) {
				effectiveLayerList[node.layer].push(node);
			}
		}

		function renderActivePaths(layer) {
			var i;
			for (i = 0; i < layer.length; i++) {
				if (isPathActive(layer[i])) {
					renderPath(layer[i])
				}
			}
		}
		renderActivePaths(layerList[0]);
		for (var i1 = 0; i1 < effectiveLinkList.length; i1++) {
			drawLink(effectiveLinkList[i1].node1, effectiveLinkList[i1].node2);
		}
		for (var i1 = 0; i1 < effectiveLayerList.length; i1++) {
			for (var i2 = 0; i2 < effectiveLayerList[i1].length; i2++) {
				drawNode(effectiveLayerList[i1][i2]);
			}
		}
	}



	function process(input, contents, entity, canvas1, context1, run, child) {
		var self = entity.self;
		var contents = entity.contents;
		if (input[0] >= 0.5) self.location.x++;
		if (input[0] < 0.5) self.location.x--;
		if (input[1] >= 0.5) self.location.y++;
		if (input[1] < 0.5) self.location.y--;
		var target = {
			location: {
				x: 450,
				y: 450
			},
			radius: 30,
			color: '#f3a13a',
			stroke: '#f3663a'
		}
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

	function Evolution(run, child, tick, targetScore, maxGens) {
		var generationCount = 0;
		var canvas1 = document.getElementById('environment');
		var context1 = canvas1.getContext('2d');
		var self = new Entity();
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
				var entity = new Entity(run);
				var maxTime = 2000;
				var time = 0;
				var timer = setInterval(() => {
					time += tick;
					entity.age = time;
					var input = entity.think(bounds);
					var result = process(input, contents, entity, canvas1, context1, run, child);
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
});