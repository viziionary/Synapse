const Connection = require('./connection');
const isNumber = require('../functions/isnumber');
const getRandomNumber = require('../functions/getrandomnumber');
const getRandomLowNumber = require('../functions/getrandomlownumber');
const getRandomDecimal = require('../functions/getrandomdecimal');

class Neuron {
  constructor(brain, type) {
    this.type = type;
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceNeurons[this.brain.counter] = this;
    this.brain.layers[type][this.brain.counter] = this;
    this.active = true;
    this.id = brain.counter;
    this.weight = 2;
    this.connected = {};
    this.connections = {};
    this.recentCharges = [getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1)];
    this.memory = 5;
    this.polarization = getRandomDecimal(0, 1);
    this.depolarizationRate = 0.1;
    this.chargeRate = getRandomDecimal(0, 1);
    this.threshold = getRandomLowNumber(0, 10);
    this.inverse = getRandomNumber(0,1);
    this.bindMethods(this);
    var initialChildrenCount = getRandomLowNumber(1, Object.keys(this.brain.globalReferenceNeurons).length);
    var neurons = Object.values(this.brain.globalReferenceNeurons);
    //if (this.id === 4) {
    //  console.log('FIRST', neurons);
    //  throw 'stop';
    //}
    for (let i = 0; i < initialChildrenCount; i++){
      let child = neurons[Math.floor(Math.random() * neurons.length)];
        this.connect(child);
    }
  }

  bindMethods(self) {
    self.connect = this.connect.bind(self);
    self.measure = this.measure.bind(self);
    self.delete = this.delete.bind(self);
  }

  // Alternate brain structuring system

  ///*
  test() {
    //console.log('Connecting neuron ' + this.id + ' to neuron ' + target.id);
    if ((Object.keys(this.connected).length === 0 || Object.keys(this.connections).length === 0) && this.type != 'input' && this.type != 'output') {
      this.delete();
    }
  };
  //*/

  connect(target) {
    if (typeof target == 'object' && target.constructor.name == 'Neuron' && !(this.type == 'input' && target.type == 'input') && !(this.type == 'output' && target.type == 'output') && target.id != this.id) {
      return new Connection(this.brain, this, target);
    }
    //console.log('Connecting neuron ' + this.id + ' to neuron ' + target.id);
  };
  delete() {
    this.brain.deleteNeuron(this.id);
  }
  measure() {
    var total = 0;
    var bias;
    for (var i1 = 0; i1 < this.recentCharges.length; i1++) {
      total += this.recentCharges[i1];
    }
    bias = total / this.recentCharges.length;
    return bias;
  }
  transmit(charge, time) {
    this.recentCharges.push(charge);
    //if (this.recentCharges.length > this.memory) {
    //  this.recentCharges.splice(0, 1);
    //}
    //this.polarization += charge * this.chargeRate;
    //if (this.polarization >= this.threshold) {
      //this.polarization = 0;
      Object.values(this.connections).forEach(connection => {
        if (connection.active == true && isNumber(charge)) {
          //var value = this.recentCharges.reduce((cur, element) => {
          //  return cur + (element / this.recentCharges.length);
          //}, 0);
          if (this.inverse === 1) {
            charge = charge / 2;
          }
          connection.activate(charge, time);
        }
      });
    //}
  }
}
module.exports = Neuron;
