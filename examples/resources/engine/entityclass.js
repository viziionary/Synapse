const findNewPoint = require('./findnewpoint');
const interceptOnCircle = require('./entity/interceptoncircle');
const lineSegmentIntersection = require('./entity/linesegmentintersection');
const getDistance = require('./getdistance');
const interceptCircles = require('./interceptcircles');
const circleInBounds = require('./circleinbounds');
class Entity {
  constructor(run, surroundings, self, target, viewer){
    //console.log('Self', self);
    this.run = run;
    this.age = 0;
    this.target = target;
    this.origin = {
      x: self.location.x,
      y: self.location.y
    };
    this.surroundings = surroundings;
    //console.log('Surroundings', surroundings);
    this.self = self;
    this.viewer = viewer;
    this.nerveCount = 20;
    this.nerveLength = 50;
    this.nerves = [];
    for (var i1 = 0; i1 < this.nerveCount; i1++) {
      var angle = (360 / this.nerveCount) * i1;
      var p1 = self.location;
      var p2 = findNewPoint(self.location.x, self.location.y, angle, self.radius);
      var p3 = findNewPoint(p2.x, p2.y, angle, this.nerveLength);
      var nerve = {
        points : [p2, p3],
        size: this.nerveLength
      }
      //console.log('before nerves', this.nerves);
      this.nerves[i1] = nerve;
      //console.log('after nerves', this.nerves);
    }
    this.nerves = JSON.parse(JSON.stringify(this.nerves, null, 4));
    console.log('JSON nerves', JSON.parse(JSON.stringify(this.nerves, null, 4)));
    console.log('Original nerves', this.nerves);
    this.bindMethods(this);
  }
  bindMethods(self){
    self.think = this.think.bind(self);
  }
  think(bounds, width, height, time, child) {
    var input = [];

    for (let i1 in this.nerves) {
      var inputMin = 1;

      for (let i2 = 0; i2 < this.surroundings.length; i2++) {
      	var objectCoords = this.surroundings[i2].location;
      	var objectRadius = this.surroundings[i2].radius;
      	//console.log('Nerves 1', this.nerves, 'i1', i1);
        var nerves = JSON.parse(JSON.stringify(this.nerves, null, 4));
        //console.log('PARSED FUCKING NERVES OBJECT:', nerves)
      	var collision = interceptOnCircle(nerves[i1].points[0], nerves[i1].points[1], objectCoords, objectRadius);
      	if (collision) {
      		//console.log('Collision', collision);
      		var length = collision / this.nerveLength;
      		if (inputMin > length) inputMin = length;
      	}
      }
      for (let i2 = 0; i2 < bounds.length; i2++) {
      	//console.log('Nerves 2', this.nerves)
        var nerves = JSON.parse(JSON.stringify(this.nerves, null, 4));
        //console.log('PARSED FUCKING NERVES OBJECT:', nerves)
      	var collision = lineSegmentIntersection(nerves[i1].points, bounds[i2]);
      	if (collision) {
      		var length = collision / this.nerveLength;
      		if (inputMin > length){
      			inputMin = length;
      		}
      	}
      }

      this.nerves[i1].size = inputMin * this.nerveLength;
      input.push(inputMin);
    }
    //console.log('Input', input)
    var input = this.run(input, time);
    //console.log(result);
    var self = this.self;
    var surroundings = this.surroundings;
    //console.log('Self before:', entity.self.location);
    //console.log('Input', input);
    var speed = 1;
    if (input[0] >= 0.5) this.self.location.x += (0.5 - input[0]) * speed;
    if (input[0] < 0.5) this.self.location.x -= (input[0] - 0.5) * speed;
    if (input[1] >= 0.5) this.self.location.y += (0.5 - input[1]) * speed;
    if (input[1] < 0.5) this.self.location.y -= (input[1] - 0.5) * speed;
    //console.log('Self after:', entity.self.location);
    var distanceFromTarget = getDistance(this.self.location, this.target.location);
    var distanceFromStart = getDistance(this.origin, this.self.location);
    var score = distanceFromStart + (distanceFromTarget * -1); //- Math.round(entity.age / 10);

    var result = {
      surroundings: surroundings,
      score: score,
      self: this.self
    }


    for (var i1 = 0; i1 < surroundings.length; i1++) {
      if (interceptCircles(this.self, this.surroundings[i1])) {
        result.state = 'complete';
      }
    }

    if (interceptCircles(this.self, this.target)) {
      result.state = 'complete';
    }
    if (!circleInBounds(width, height, this.self)) {
      result.state = 'complete';
    }
    this.viewer.render(child, this, this.surroundings, this.target);
    return result;
  }
}
module.exports = Entity;
