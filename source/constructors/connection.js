const getRandomNumber = require('../functions/getrandomnumber');
const getRandomDecimal = require('../functions/getrandomdecimal');

class Connection {
  constructor(brain, source, target) {
    if (typeof source !== 'object' || source.constructor.name !== 'Neuron') {
      //console.log('Source:',source);
      throw new Error('Connection: Source not Neuron!');
    }
    if (typeof target !== 'object' || target.constructor.name !== 'Neuron') {
      //console.log('Target:',target);
      throw new Error('Connection: Target not Neuron!');
    }
    //console.log('Connection initiated: source id' + source.id + ', target id: ' + target.id);
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceConnections[this.brain.counter] = this;
    //console.log('Assigned Connection #', this.brain.counter, '[', this,'] from Neuron # ', source.id, '[', source,'] -> Neuron # ', target.id, '[', target, ']');
    this.active = true;
    this.id = brain.counter;
    this.bias = getRandomDecimal(0, 1);
    this.source = source;
    this.target = target;
    this.recentCharges = [getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1)];
    this.memory = getRandomNumber(1, 10); // maybe 0, 10 ?
    this.weight = [getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1)];
    this.deresistanceRate = getRandomDecimal(0, 1);
    this.resistanceGain = getRandomDecimal(0, 0.001, 0.5);
    this.resistance = 0;
    this.energy = 100;
    this.lastTime = 0;
    this.inverse = getRandomNumber(0,1);

    /*

    -|- -|- -|-              -|- -|- -|-
    |_|_|_|_|_| NEVER FORGET |_|_|_|_|_|

    .................
    ..............................

    source.connections[target.id] = this; // :( 

    [][] https://i.imgur.com/PbSV9DP.png [][]

    RIP Sunday Night Deadline - October 28th, 2017 - October 29th, 2017 -  It was born into a cruel, cruel world with high expectations, and was conquered by it brutally, meeting none of them.
    
    */

    source.connections[this.id] = this;
    target.connected[this.id] = this;
    this.bindMethods(this);
  }
  bindMethods(self) {
    self.updateBias = this.updateBias.bind(self);
    self.activate = this.activate.bind(self);
    self.delete = this.delete.bind(self);
  }
  activate(charge, time) {
    if (time - this.lastTime > 1000) {
      this.lastTime = time;
      //this.energy = 1000;
    }
    this.energy--;
    if (this.energy > 0) {
      if (this.inverse === 1) {
        charge = charge / 2;
      }
      this.brain.activations++;
      this.resistance += this.resistanceGain;
      this.updateBias(charge);
      this.target.transmit((((charge + this.bias) / 2) - this.resistance), time);
    }
  }
  delete() {
    this.brain.deleteConnection(this.id);
  }
  updateBias(charge) {
    if (this.active == true) {
      var total = 0;
      this.recentCharges.push(charge);
      if (this.recentCharges.length > this.memory) this.recentCharges.splice(0, 1);
      for (var i1 = 0; i1 < this.recentCharges.length; i1++) {
        total += this.recentCharges[i1];
      }
      for (var i1 = 0; i1 < this.weight.length; i1++) {
        total += this.weight[i1];
      }
      this.bias = total / (this.recentCharges.length + this.weight.length);
    }
  }
}
module.exports = Connection;
