const Connection = require('./connection');
const isNumber = require('../functions/isnumber');

class Neuron {
  constructor(brain, layer) {
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceNeurons[this.brain.counter] = this;
    this.active = true;
    this.layer = layer;
    this.id = brain.counter;
    this.weight = 2;
    this.connected = {};
    this.connections = {};
    this.recentCharges = [0.5, 0.5, 0.5, 0.5, 0.5];
    this.memory = 5;
    this.polarization = 0.5;
    this.depolarizationRate = 0.1;
    this.deresistanceRate = 0.05;
    this.resistance = 0;
    this.chargeRate = 0.3;
    this.threshold = 1;
    this.resistanceGain = 0.1;
    this.bindMethods(this);
  }
  bindMethods(self) {
    self.connect = this.connect.bind(self);
    self.disconnect = this.disconnect.bind(self);
    self.destroy = this.destroy.bind(self);
    self.measure = this.measure.bind(self);
  }
  connect(target) {
    //console.log('Connecting neuron ' + this.id + ' to neuron ' + target.id);
    return new Connection(this.brain, this, target, (id, connection) => {
      this.brain.globalReferenceConnections[id] = connection;
      this.connections[id] = connection;
    });
  };
  disconnect(id) {
    this.connections[id].active = false;
  };
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
    this.polarization += charge;
    if (this.polarization >= this.threshold) {
      this.polarization = 0;
      Object.values(this.connections).forEach(connection => {
        if (connection.active == true && isNumber(charge)) {
          connection.activate(this.recentCharges.reduce((cur, element) => {
            return cur + (element / this.recentCharges.length)
          }, 0));
        }
      });
    }
  }
}
module.exports = Neuron;