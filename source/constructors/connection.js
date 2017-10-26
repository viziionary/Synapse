class Connection {
  constructor(brain, source, target, callback){
    var check1 = Object.values(source.connections).includes(target);
    var check2 = Object.values(target.connections).includes(source);
    if (source.id === target.id || source.layer > target.layer || check1 !== true || check2 !== true) {
      return new Error('Synapse: Refused backward connection');
    }
    brain.counter++;
    brain.globalReferenceConnections[brain.counter] = this;
    this.active = true;
    this.id = brain.counter;
    this.bias = 0.5;
    this.source = source;
    this.target = target;
    this.recentCharges = [0.5, 0.5, 0.5, 0.5, 0.5];
    this.memory = 5;
    this.weight = [0.5, 0.5, 0.5];
    target.connected[this.id] = this;
    this.updateBias = this.updateBias.bind(this);
    this.activate = this.activate.bind(this);
    this.destroy = this.destroy.bind(this);
    callback(this.id, this);
  }
  activate(){
    if (this.active == true) {
      brain.activations++;
      if (this.target.active == true) {
        this.target.transmit((charge + this.bias) / 2);
      }
    }
  }
  destroy(){
    this.active = false;
  }
  updateBias(charge) {
    if (this.active == true) {
      var total = 0;
      this.recentCharges.push(charge); /*FUCK UP: 'THIS' IS A BAD REFERENCE*/
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
