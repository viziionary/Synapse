const getRandomNumber = require('../functions/getrandomnumber');
const getRandomDecimal = require('../functions/getrandomdecimal');

class Connection {
  constructor(brain, source, target) {
    //console.log('Connection initiated: source id' + source.id + ', target id: ' + target.id);
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceConnections[this.brain.counter] = this;
    this.active = true;
    this.id = brain.counter;
    this.brain.globalReferenceConnections[this.id] = this;
    this.bias = getRandomDecimal(0, 1);
    this.source = source;
    this.target = target;
    this.recentCharges = [getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1)];
    this.memory = getRandomNumber(1, 10); // maybe 0, 10 ?
    this.weight = [getRandomDecimal(0, 1), getRandomDecimal(0, 1), getRandomDecimal(0, 1)];
    this.deresistanceRate = getRandomDecimal(0, 1);
    this.resistanceGain = getRandomDecimal(0, 1);
    this.resistance = 0;
    source.connections[target.id] = this;
    target.connected[this.id] = this;
    this.bindMethods(this);
  }
  bindMethods(self) {
    self.updateBias = this.updateBias.bind(self);
    self.activate = this.activate.bind(self);
    self.destroy = this.destroy.bind(self);
    self.delete = this.delete.bind(self);
  }
  activate(charge) {
    this.brain.activations++;
    this.resistance += this.resistanceGain;
    this.target.transmit(((charge + this.bias) / 2) - this.resistance);
    updateBias(charge);
  }
  delete() {
    this.brain.deleteConnection(this.id);
    let sourceIndex = this.source.connected.indexOf(this);
    if (sourceIndex > -1) {
      delete this.source.connected[this.id];
    }
    let targetIndex = this.target.connected.indexOf(this);
    if (targetIndex > -1) {
      delete this.target.connected[this.id];
    }
  }
  destroy() {
    this.active = false;
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
