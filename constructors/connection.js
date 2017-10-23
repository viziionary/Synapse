function Connection(brain, source, target, callback) {
  var that = this;
  var check1 = Object.keys(source.connections).indexOf(target); // FUCK UP
  var check2 = Object.keys(target.connections).indexOf(source); // FUCK UP

  // Source.connections for example looks something like this {id:connection,id:connection,id:connection}
  // Object.keys(source.connections) would then return an array of ID's like this [id,id,id]
  // So we are looking inside the array of ids for a neuron instance which doesn't make sense

  if (source.id !== target.id && source.layer < target.layer && /*FUCK UP*/ check1 === -1 && check2 === -1 /*FUCK UP*/ ) {
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
    this.updateBias = function(charge) {
      if (that.active == true) {
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
    };
    this.destroy = () => {
      this.active = false;
    };
    this.activate = (charge) => {
      if (this.active == true) {
        brain.activations++;
        if (this.target.active == true) {
          this.target.transmit((charge + this.bias) / 2);
        }
      }
    };
    callback(this.id, this);
  } else {
    //console.log('Refused backward connection');
  }
}
module.exports = Connection;
