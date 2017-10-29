const Neuron = require('./neuron');
const mutate = require('../functions/mutate.js');
const getRandomNumber = require('../functions/getrandomnumber');
const getRandomLowNumber = require('../functions/getrandomlownumber');
const createStructure = require('../functions/createstructure');

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
    this.layers.input = [];
    this.layers.output = [];
    this.counter = 0;
    this.globalReferenceNeurons = {};
    this.globalReferenceConnections = {};
    //this.score = 0;
    this.activations = 0;
    this.mutationRate = 1;

    for (var i = 0; i < inputSize; i++) {
      let newInput = new Neuron(this, 'input');
      this.layers.input[newInput.id] = newInput;
    }
    for (var i = 0; i < outputSize; i++) {
      let newOutput = new Neuron(this, 'output');
      this.layers.output[newOutput.id] = newOutput;
    }
    let totalNeurons = getRandomLowNumber(0, 100, 0.9);

    var currentInputNumber = 0;
    var currentChain = [];
    var currentChainMax = getRandomLowNumber(1, 20);

    for (var i = 0; i < totalNeurons; i++) {
      if (currentChain.length >= currentChainMax) {
        this.layers.hidden.push(currentChain);
        currentChain[currentChain.length - 1].connect(getRandomNumber(0, this.layers.output.length - 1));
        currentChain = [this.layers.input[currentInputNumber]];
        currentInputNumber++;
        currentChainMax = getRandomLowNumber(1, 20);
      }
      let newNeuron = new Neuron(this, 'hidden');
      currentChain[currentChain.length - 1].connect(newNeuron);
      currentChain.push(newNeuron);
    }

    // Alternate brain structuring system

    /*
    for (let i1 = 0; i1 < inputSize; i1++) {
      new Neuron(this, 'output');
    }
    for (let i1 = 0; i1 < getRandomLowNumber(Math.round((inputSize + outputSize) / 2), ((inputSize + outputSize) * 2)); i1++) {
      new Neuron(this, 'hidden');
    }
    for (let i1 = 0; i1 < outputSize; i1++) {
      new Neuron(this, 'input');
    }
    for (let prop in this.layers.hidden) {
      this.layers.hidden[prop].test();
    }
    */

  }
  bindMethods(self) {
    self.deleteNeuron = this.deleteNeuron.bind(self);
    self.deleteConnection = this.deleteConnection.bind(self);
    self.input = this.input.bind(self);
    self.generate = this.generate.bind(self);
    self.resetResistance = this.resetResistance.bind(self);
    self.getAllNeurons = this.getAllNeurons.bind(self);
    self.getAllConnections = this.getAllConnections.bind(self);
  }
  getAllNeurons() {
    return Object.values(this.globalReferenceNeurons);
  }
  getAllConnections() {
    return Object.values(this.globalReferenceConnections);
  }
  resetResistance() {
    this.getAllNeurons().forEach(neuron => {
      neuron.resistance = 0;
    });
  }
  input(array) {
    this.layers.input.forEach((input, index) => {
      input.transmit(array[index]);
    });
    return this.layers.output.map(neuron => {
      return neuron.measure();
    });
  }
  deleteConnection(connectionId) {
    if (this.globalReferenceConnections.hasOwnProperty(connectionId)) {
      let connection = this.globalReferenceConnections[connectionId];
      if (connection.connections && connection.connections.hasOwnProperty(connectionId)) {
        delete connection.connections[connectionId];
      }
      if (connection.connected && connection.connected.hasOwnProperty(connectionId)) {
        delete connection.connected[connectionId];
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
    this.mutationRate = getRandomLowNumber(1, 100, 0.1); //change the max to be based on the current complexity of the network
    //console.log('New mutation rate: ', this.mutationRate);
    //console.log(this.mutationRate);
    mutate(this.mutationRate, this);
  }
}
module.exports = Brain;
