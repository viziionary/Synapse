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
        size: this.nerveLength
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

      /*
      var angle = (360 / this.nerveCount) * i1;
      var p1 = this.self.location;
      var p2 = findNewPoint(this.self.location.x, this.self.location.y, angle, this.self.radius);
      if (this.nerves[i1].size) {
        var p3 = findNewPoint(p2.x, p2.y, angle, this.nerves[i1].size);
      } else {
        var p3 = findNewPoint(p2.x, p2.y, angle, this.nerveLength);
      }
      var nerve = {
        points : [p2, p3],
        //size: this.nerveLength
      }
      //this.nerves[i1] = nerve;
    }
    */

    // var input = [];
    //
    // for (let i1 in this.nerves) {
    //   var inputMin = 50;
    //
    //   /*
    //   for (let i2 = 0; i2 < this.surroundings.length; i2++) {
    //     var objectCoords = this.surroundings[i2].location;
    //     var objectRadius = this.surroundings[i2].radius;
    //     var collision = interceptOnCircle(this.nerves[i1].points[0], this.nerves[i1].points[1], objectCoords, objectRadius);
    //     if (isNaN(collision)) {
    //       throw 'Bad collision';
    //     }
    //     //console.log('Circle collision: ' + collision);
    //     //console.log('Collision', collision);
    //     var length = collision;
    //     if (inputMin > length) {
    //       inputMin = length;
    //     }
    //   }
    //   */
    //
    //   for (let i2 = 0; i2 < bounds.length; i2++) {
    //     var collision = lineSegmentIntersection(this.nerves[i1].points, bounds[i2], i1, reset);
    //     if (i1 === '10') {
    //       reset = false;
    //     }
    //     //if (isNaN(collision)) {
    //     //  throw 'Bad collision';
    //     //}
    //
    //     /*
    //     if ((this.nerves[i1].points[0].x < 0 || this.nerves[i1].points[1].x < 0) && ((bounds[i2][0].y == 0 && bounds[i2][0].x == 0) && (bounds[i2][1].y == 400 && bounds[i2][1].x == 0)) && collision == 50) {
    //       console.log('Test', {
    //         line1 : this.nerves[i1].points,
    //         line2 : bounds[i2]
    //       });
    //     }
    //     */
    //
    //     //console.log(' Segment collision: ' + collision);
    //
    //     var length = collision;
    //     if (inputMin > length) {
    //       inputMin = length;
    //     }
    //
    //     //this.nerves[i1].points = [p2, p3];
    //
    //   }

      //console.log('Length: ' + inputMin);
      var length = Math.min(50,...bounds.map(bound=>{
            return lineSegmentIntersection(this.nerves[i1].points,bound,i1,reset);
          }).filter(distance=>{
            return distance && distance < 50;
          }));
      this.nerves[i1].size = length;

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

      input.push(length / 50);
    }
    //console.log('Input', input)

    //console.log('Thinking', input)
    var output = this.run(input, time);

    //console.log('Acting', output)
    //console.log(result);
    var self = this.self;
    var surroundings = this.surroundings;
    //console.log('Self before:', entity.self.location);
    //console.log('Input', input);


    ///*
    var speed = 14;
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
    this.viewer.render(/*child,*/ this, this.surroundings, this.target);
    return result;
  }
}
module.exports = Entity;
