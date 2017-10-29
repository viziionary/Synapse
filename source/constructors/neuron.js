const Connection = require('./connection');
const isNumber = require('../functions/isnumber');
const getRandomNumber = require('../functions/getrandomnumber');
const getRandomLowNumber = require('../functions/getrandomlownumber');

class Neuron {
  constructor(brain) {
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceNeurons[this.brain.counter] = this;
    this.active = true;
    this.layer = layer;
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

    let initialParentCount = getRandomLowNumber(1,Object.keys(this.brain.globalReferenceNeurons).length);
    let initialChildrenCount = getRandomLowNumber(1,Object.keys(this.brain.globalReferenceNeurons).length);
    let neurons = Object.values(this.brain.globalReferenceNeurons);
    for (var i = 0; i < initialParentCount; i++){
      let parent = neurons[Math.floor(Math.random() * neurons.length];
      parent.connect(this);
    }
    for (var i = 0; i < initialChildrenCount; i++){
      let child = neurons[Math.floor(Math.random() * neurons.length];
      this.connect(child);
    }
  }

  bindMethods(self) {
    self.connect = this.connect.bind(self);
    self.disconnect = this.disconnect.bind(self);
    self.measure = this.measure.bind(self);
    self.delete = this.delete.bind(self);
  }
  connect(target) {
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
  connect(target) {
    //console.log('Connecting neuron ' + this.id + ' to neuron ' + target.id);
    return new Connection(this.brain, this, target, (id, connection) => {
      this.brain.globalReferenceConnections[id] = connection;
      this.connections[id] = connection;
    });
  }
  disconnect(id) {
    this.connections[id].active = false;
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
