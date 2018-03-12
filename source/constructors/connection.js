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
        this.resistanceGain = getRandomDecimal(0, 0.0001);
        this.resistance = 0;
        this.energy = 1;
        this.lastTime = 0;
        this.lastCharge = null;
        this.inverse = getRandomNumber(0, 1);
        this.unstarted = true;
        source.connections[this.id] = this;
        target.connected[this.id] = this;
        this.bindMethods(this);
      }
    } else {
      console.log('Neuron failed to make connection because either target, source, or brain was invalid', source, target, brain);
      throw '[ANOMALY]';
    }
  }
  bindMethods(self) {
    self.activate = this.activate.bind(self);
    self.delete = this.delete.bind(self);
  }
  activate(charge) {
      this.unstarted = false;
      if (isNaN(charge)){
        throw 'neuron fired a non numerical charge value.'
      }
      this.brain.activations++;
      if (this.target) {
        this.lastCharge = charge;
        //console.log('[Connection Internal Log] Last charge: ', this.lastCharge);
        if (this.inverse) {

        }
        this.target.transmit(charge);
      } else {
        console.log('We found a neuron without a target.');
        throw '[ANOMALY]';
      }
  }
  delete() {
    this.brain.deleteConnection(this.id);
  }
}
export default Connection;