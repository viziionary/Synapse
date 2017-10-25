const Connection = require('./connection');
const isNumber = require('../functions/isnumber');

function Neuron(brain, layer) {
  brain.counter++;
  brain.globalReferenceNeurons[brain.counter] = this;
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
  this.connect = (target) => {
    new Connection(brain, this, target, (id, connection) => {
      brain.globalReferenceConnections[id] = connection;
      this.connections[id] = connection;
    });
  };
  this.disconnect = (id) => {
    this.connections[id].active = false;
  };
  this.destroy = () => {
    this.active = false;
    Object.values(this.connected).forEach(connection => {
      connection.active = false;
    });
    Object.values(this.connections).forEach(connection => {
      connection.active = false;
    });
  };
  this.measure = () => {
    var total = 0;
    var bias;
    for (var i1 = 0; i1 < this.recentCharges.length; i1++) {
      total += this.recentCharges[i1];
    }
    bias = total / this.recentCharges.length;
    return bias;
  }
  this.transmit = (charge) => {
    this.recentCharges.push(charge);
    if (this.recentCharges.length > this.memory) this.recentCharges.splice(0, 1);
    this.polarization += charge;
    if (this.polarization >= this.threshold) {
      this.polarization = 0;
      Object.values(this.connections).forEach(connection => {
        if (connection.active == true && isNumber(charge)) {
          connection.activate(charge);
        }
      });
    }
  };
}
module.exports = Neuron;
