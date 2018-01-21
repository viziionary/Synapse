import Neuron from './neuron.js';
import mutate from '../functions/mutate.js';
import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomLowNumber from '../functions/getrandomlownumber.js';
import createStructure from '../functions/createstructure.js';

var list = {};
var times = 1000000;

for (let i = 1; i < times; i++) {
  var number = getRandomLowNumber(1, 100, 0.5);
  if (typeof list[number] == 'number') {
    list[number]++;
  } else {
    list[number] = 1;
  }
}

console.log('List: ', list);

class Brain {
  constructor(inputSize, outputSize) {
    this.bindMethods(this);
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.layers = {};
    this.layers.input = {};
    this.layers.hidden = {};
    this.layers.output = {};
    this.counter = 0;
    this.globalReferenceNeurons = {};
    this.globalReferenceConnections = {};
    //this.score = 0;
    this.activations = 0;
    this.mutationRate = 1;


    for (let i1 = 0; i1 < outputSize; i1++) {
      new Neuron(this, 'output');
    }
    for (let i1 = 0; i1 < getRandomLowNumber(Math.round((inputSize + outputSize) / 4), Math.round((inputSize + outputSize) / 2)); i1++) {
      new Neuron(this, 'hidden');
    }
    for (let i1 = 0; i1 < inputSize; i1++) {
      new Neuron(this, 'input');
    }
    for (let prop in this.layers.hidden) {
      this.layers.hidden[prop].test();
    }


    //create(this, 'input', 0, inputSize);
    //create(this, 'hidden', 0, 10); //getRandomLowNumber(Math.round((inputSize + outputSize) / 2), ((inputSize + outputSize) / 4)));
    //create(this, 'output', 0, 2);
    //console.log('Brain', this)

    function create(brain, type, count, max) {
      if (count < max) {
        count++;
        new Neuron(brain, type);
        create(brain, type, count, max);
      }
    }

  }
  bindMethods(self) {
    self.deleteNeuron = this.deleteNeuron.bind(self);
    self.deleteConnection = this.deleteConnection.bind(self);
    self.input = this.input.bind(self);
    self.generate = this.generate.bind(self);
    self.resetLimiters = this.resetLimiters.bind(self);
    self.getAllNeurons = this.getAllNeurons.bind(self);
    self.getAllConnections = this.getAllConnections.bind(self);
  }
  getAllNeurons() {
    return Object.values(this.globalReferenceNeurons);
  }
  getAllConnections() {
    return Object.values(this.globalReferenceConnections);
  }
  resetLimiters() {
    //this.getAllNeurons().forEach(neuron => {
    //  neuron.resistance = 0;
    //});
    this.getAllConnections().forEach(connection => {
      connection.energy = 1;
    });
  }
  input(array) {
    //console.log('Brain input', array, time)
    Object.values(this.layers.input).forEach((input, index) => {
      input.transmit(array[index]);
    });
    this.resetLimiters();
    return Object.values(this.layers.output).map(neuron => {
      //console.log('Brain output', neuron.id, neuron.measure())
      return neuron.measure();
    });

  }
  deleteConnection(connectionId) {
    if (this.globalReferenceConnections.hasOwnProperty(connectionId)) {
      let connection = this.globalReferenceConnections[connectionId];
      let source = connection.source;
      let target = connection.target;
      if (source) {
        if (source.connections[connectionId]) {
          delete source.connections[connectionId];
        }
      } else {
        console.log('!!! [ANOMALY] Connection was deleted but had no source.');
      }
      if (target) {
        if (target.connected[connectionId]) {
          delete target.connected[connectionId];
        }
      } else {
        console.log('!!! [ANOMALY] Connection was deleted but had no target.');
      }
      delete this.globalReferenceConnections[connectionId];
    }
  }
  deleteNeuron(neuronId) {
    if (this.globalReferenceNeurons.hasOwnProperty(neuronId)) {
      let neuron = this.globalReferenceNeurons[neuronId];
      Object.values(neuron.connections).concat(Object.values(neuron.connected)).forEach(connection => {
        connection.delete();
      });
      delete this.globalReferenceNeurons[neuronId];
    }
  }
  generate() {
    this.activations = 0;
    //console.log('Current mutation rate: ', this.mutationRate);
    //console.log('Mutation rate mutationRateGrowth: ', this.mutationRateGrowth);
    this.mutationRate = getRandomLowNumber(1, 100, 0.75); //change the max to be based on the current complexity of the network
    //console.log('New mutation rate: ', this.mutationRate);
    //console.log(this.mutationRate);
    mutate(this.mutationRate, this);
  }
}
export default Brain;