import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomLowNumber from '../functions/getrandomlownumber.js';
import getRandomDecimal from '../functions/getrandomdecimal.js';

class Connection {
  constructor(brain, source, target) {
    if (typeof target == 'object' && target.constructor.name == 'Neuron' && typeof source == 'object' && source.constructor.name == 'Neuron' && brain.constructor.name == 'Brain') {
      if (!(source.type == 'input' && target.type == 'input') && !(source.type == 'output' && target.type == 'output') && target.id != source.id && source.type != 'output') {
        //console.log('Connection initiated: source id' + source.id + ', target id: ' + target.id);
        this.brain = brain;
        this.brain.counter++;
        this.brain.globalReferenceConnections[this.brain.counter] = this;
        //console.log('Assigned Connection #', this.brain.counter, '[', this,'] from Neuron # ', source.id, '[', source,'] -> Neuron # ', target.id, '[', target, ']');
        this.active = true;
        this.id = brain.counter;
        this.bias = getRandomDecimal(0, 1);
        this.source = source;
        this.target = target;
        this.recentCharges = [];
        this.memory = getRandomLowNumber(1, 10, 0.5);
        //console.log(this.memory)
        for (let i = 0; i < this.memory; i++) {
          this.recentCharges.push(getRandomDecimal(0, 1));
        }
        this.deresistanceRate = getRandomDecimal(0, 1);
        this.resistanceGain = getRandomDecimal(0, 0.001, 0.5);
        this.resistance = 0;
        this.energy = 100;
        this.lastTime = 0;
        this.lastCharge = null;
        this.inverse = getRandomNumber(0, 1);

        /*

        -|- -|- -|-              -|- -|- -|-
        |_|_|_|_|_| NEVER FORGET |_|_|_|_|_|

        .................
        ..............................

        source.connections[target.id] = this; // :( 

        [][] https://i.imgur.com/PbSV9DP.png [][]

        RIP Sunday Night Deadline - October 28th, 2017 - October 29th, 2017 -  It was born into a cruel, cruel world with high expectations, and was conquered brutally, meeting none of them.
    
        */

        source.connections[this.id] = this;
        target.connected[this.id] = this;
        this.bindMethods(this);
      }
    } else {
      console.log('!!! ANOMALY neuron failed to make connection because either target, source, or brain was invalid', source, target, brain);
    }
  }
  bindMethods(self) {
    self.updateBias = this.updateBias.bind(self);
    self.activate = this.activate.bind(self);
    self.delete = this.delete.bind(self);
  }
  activate(charge, time) {
    //if (time - this.lastTime > 1000) {
    //this.lastTime = time;
    //this.energy = 1000;
    //}
    this.energy--;
    if (this.energy > 0) {
      if (this.inverse === 1) {
        charge = charge / 2;
      }
      this.brain.activations++;
      this.updateBias(charge);
      if (this.target) {
        if (this.memory > 0) {
          charge = ((charge + charge + this.bias) / 3);
        }
        this.lastCharge = charge;
        this.target.transmit(charge, time);
      }
    }
  }
  delete() {
    this.brain.deleteConnection(this.id);
  }
  updateBias(charge) {
    if (this.active == true) {
      var total = 0;
      this.recentCharges.push(charge);
      if (this.recentCharges.length > this.memory) this.recentCharges.splice(0, 1);
      for (var i1 = 0; i1 < this.recentCharges.length; i1++) {
        total += this.recentCharges[i1];
      }
      this.bias = total / this.recentCharges.length;
    }
  }
}
export default Connection;