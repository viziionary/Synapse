const findNewPoint = require('./findnewpoint');
const interceptOnCircle = require('./entity/interceptoncircle');
const lineSegmentIntersection = require('./entity/linesegmentintersection');
const getDistance = require('./getdistance');
const interceptCircles = require('./interceptcircles');
const circleInBounds = require('./circleinbounds');

var debugHistory = [];

class Entity {
  constructor(run, surroundings, self, target, viewer) {
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
        points: [p2, p3],
        size: 50 //this.nerveLength
      };
      this.nerves[i1] = nerve;
    }
    this.bindMethods(this);
  }
  bindMethods(self) {
    self.think = this.think.bind(self);
  }
  think(bounds, width, height, time, child) {
    console.log('[CHECKPOINT]');

    var reset = true;
    var input = [];
    for (var i1 = 0; i1 < this.nerveCount; i1++) {
      var angle = (360 / this.nerveCount) * i1;
      var p1 = this.self.location;
      var p2 = findNewPoint(this.self.location.x, this.self.location.y, angle, this.self.radius);
      var p3 = findNewPoint(p2.x, p2.y, angle, this.nerveLength);
      var nerve = {
        points: [p2, p3],
        size: 50 //this.nerveLength
      };
      this.nerves[i1] = nerve;
    }
    for (var i1 = 0; i1 < this.nerveCount; i1++) {
      var collisions = bounds.map(bound=>{
            return lineSegmentIntersection(this.nerves[i1].points,bound,i1,reset);
          }).filter(distance=>{
            return distance && distance < 50;
          });
      if (collisions.length > 0) {
        this.nerves[i1].size = Math.min(...collisions);
      }
      //if (length != 50) {
      //}


      //debugging

      if (i1 === '10') {
        debugHistory.unshift(this.nerves[i1].size);
        debugHistory = debugHistory.slice(0, 6);
        //console.log(debugHistory);
        if ((debugHistory[0] < 50) && (debugHistory[1] == 50) && (debugHistory[2] < 50) && (debugHistory[3] == 50) && (debugHistory[4] < 50) && (debugHistory[5] == 50)) {
          console.log('[ENTITY] We found a blip pattern: ', debugHistory);
        }
      }

      //if (i1 === '1') {
      //  console.log('Nerve calculated size: ' + this.nerves[i1].size);
      //}
    }

    //console.log('Input', input)

    //console.log('Thinking', input)
    var output = this.run(this.nerves.map(nerve=>nerve.size/50), time);

    //console.log('Acting', output)
    //console.log(result);
    var self = this.self;
    var surroundings = this.surroundings;
    //console.log('Self before:', entity.self.location);
    //console.log('Input', input);


    ///*
    var speed = 7;
    if (output[0] >= 0.5) this.self.location.x += (0.5 - output[0]) * speed;
    if (output[0] < 0.5) this.self.location.x -= (output[0] - 0.5) * speed;
    if (output[1] >= 0.5) this.self.location.y += (0.5 - output[1]) * speed;
    if (output[1] < 0.5) this.self.location.y -= (output[1] - 0.5) * speed;
    //*/

    /*
    var speed = 2;
    if (output[0] >= 0.5) this.self.location.x += speed;
    if (output[0] < 0.5) this.self.location.x -= speed;
    if (output[1] >= 0.5) this.self.location.y += speed;
    if (output[1] < 0.5) this.self.location.y -= speed;
    */

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
    this.viewer.render(this, this.surroundings, this.target);
    return result;
  }
}
module.exports = Entity;
