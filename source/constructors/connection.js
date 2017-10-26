class Connection {
  constructor(brain, source, target, callback){
    //console.log('Connection initiated: source id' + source.id + ', target id: ' + target.id);
    var check1 = Object.values(source.connections).includes(target);
    var check2 = Object.values(target.connections).includes(source);
    if (source.id === target.id || source.layer >= target.layer || check1 == true || check2 == true) {
      //console.log('Synapse: Refused backward connection: source layer ' + source.layer + ' > ' + target.layer + ' || check1 !== true [' + check1 + '] || check2 !== true [' + check2 + ']');
      return new Error('Refused backwards connection');
    }
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceConnections[this.brain.counter] = this;
    this.active = true;
    this.id = brain.counter;
    this.bias = 0.5;
    this.source = source;
    this.target = target;
    this.recentCharges = [0.5, 0.5, 0.5, 0.5, 0.5];
    this.memory = 5;
    this.weight = [0.5, 0.5, 0.5];
    target.connected[this.id] = this;
    this.bindMethods(this);
    callback(this.id, this);
  }
  bindMethods(self){
    self.updateBias = this.updateBias.bind(self);
    self.activate = this.activate.bind(self);
    self.destroy = this.destroy.bind(self);
    self.delete = this.delete.bind(this);
  }
  activate(charge){
    if (this.active == true) {
      this.brain.activations++;
      if (this.target.active == true) {
        this.target.transmit((charge + this.bias) / 2);
      }
    }
  }
<<<<<<< HEAD
  delete(){
    this.brain.deleteConnection(this.id);
  }
  destroy(){
    this.active = false;
  }
=======
>>>>>>> e56bb54b871819e0704b7b559b3033627c4a88e6
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
