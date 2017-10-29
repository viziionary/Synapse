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
    this.threshold = 1;
    this.bindMethods(this);
    let initialChildrenCount = getRandomLowNumber(1,Object.keys(this.brain.globalReferenceNeurons).length);
    let neurons = Object.values(this.brain.globalReferenceNeurons);
    for (var i = 0; i < initialChildrenCount; i++){
      let child = neurons[Math.floor(Math.random() * neurons.length)];
      this.connect(child);
    }
  }

  bindMethods(self) {
    self.connect = this.connect.bind(self);
    self.disconnect = this.disconnect.bind(self);
    self.measure = this.measure.bind(self);
    self.delete = this.delete.bind(self);
  }

  // Alternate brain structuring system

  /*
  test() {
    //console.log('Connecting neuron ' + this.id + ' to neuron ' + target.id);
    if (Object.keys(this.connected).length === 0) {
      this.delete();
    }
  };
  */

  connect(target) {
    if (typeof target !== 'object' || target.constructor.name !== 'Neuron') {
      console.log('Target:',target);
      throw new Error('Neuron: Cannot connect to non-neuron');
    }
    //console.log('Connecting neuron ' + this.id + ' to neuron ' + target.id);
    return new Connection(this.brain, this, target);
  };
  disconnect(id) {
    this.connections[id].active = false;
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
  transmit(charge) {
    this.recentCharges.push(charge);
    if (this.recentCharges.length > this.memory) this.recentCharges.splice(0, 1);
    this.polarization += charge * this.chargeRate;
    if (this.polarization >= this.threshold) {
      this.polarization = 0;
      Object.values(this.connections).forEach(connection => {
        if (connection.active == true && isNumber(charge)) {
          connection.activate(this.recentCharges.reduce((cur, element) => {
            return cur + (element / this.recentCharges.length);
          }, 0));
        }
      });
    }
  }
}
module.exports = Neuron;
