import Connection from './connection';
import isNumber from '../functions/isnumber';
import getRandomNumber from '../functions/getrandomnumber';
import getRandomLowNumber from '../functions/getrandomlownumber';
import getRandomDecimal from '../functions/getrandomdecimal';

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
    this.recentCharges = [];
    this.memory = getRandomLowNumber(1, 10, 0.5);
    //console.log('Memory', this.memory)
    for (let i = 0; i < this.memory; i++){
      this.recentCharges.push(getRandomDecimal(0, 1));
    }
    this.polarization = getRandomDecimal(0, 1);
    this.depolarizationRate = 0.1;
    this.chargeRate = getRandomDecimal(0, 1);
    this.threshold = getRandomLowNumber(1, 10);
    this.inverse = getRandomNumber(0, 1);
    this.bias = null;
    this.recentCharge = null;
    this.bindMethods(this);
    var initialChildrenCount = getRandomLowNumber(1, Object.keys(this.brain.globalReferenceNeurons).length, 0.65);
    var neurons = Object.values(this.brain.globalReferenceNeurons);
    //if (this.id === 4) {
    //  console.log('FIRST', neurons);
    //  throw 'stop';
    //}
    for (let i = 0; i < initialChildrenCount; i++) {
      let child = neurons[Math.floor(Math.random() * neurons.length)];
      this.connect(child);
    }
  }

  bindMethods(self) {
    self.connect = this.connect.bind(self);
    self.measure = this.measure.bind(self);
    self.delete = this.delete.bind(self);
    self.transmit = this.transmit.bind(self);
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
    return new Connection(this.brain, this, target);
    //console.log('Connecting neuron ' + this.id + ' to neuron ' + target.id);
  };
  delete() {
    this.brain.deleteNeuron(this.id);
  }
  measure() {
    return this.bias;
  }
  transmit(charge, time) {
    var total = 0;
    for (let i = 0; i < this.recentCharges.length; i++) {
      total += this.recentCharges[i];
    }
    var bias = total / this.recentCharges.length;
    this.bias = bias;
    this.recentCharges.push(charge);
    if (this.recentCharges.length > this.memory) {
      this.recentCharges.splice(0, 1);
    }
    this.recentCharge = charge;
    //this.polarization += charge * this.chargeRate;
    //if (this.polarization >= this.threshold) {
    //this.polarization = 0;
    Object.values(this.connections).forEach(connection => {
      connection.activate(charge, time);
    });
    //}
  }
}
export default Neuron;