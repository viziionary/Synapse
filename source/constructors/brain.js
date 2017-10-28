const Neuron = require('./neuron');
const mutate = require('../functions/mutate.js');
const getRandomNumber = require('../functions/getrandomnumber');
const getRandomLowNumber = require('../functions/getrandomlownumber');

var list = {};
var times = 1000000;
for (let i = 0; i < 101; i++) {
  list[i] = 0;
}
for (let i = 0; i < times; i++) {
  var number = getRandomLowNumber();
  list[number]++;
}
Object.entries(list).forEach(numberSet=>{
  list[numberSet[0]] = Math.round((numberSet[1] || 0)/times*10000)/100+'%';
});
console.log('List: ', list);

class Brain {
  constructor(inputSize, outputSize) {
    this.bindMethods(this);
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.layers = 3;
    this.counter = 0;
    this.globalReferenceNeurons = {};
    this.globalReferenceConnections = {};
    //this.score = 0;
    this.activations = 0;
    this.mutationRate = 1;
    this.mutationRateGrowth = 1;
    this.mutationMax = 100;
    this.structure = [];

    for (var i1 = 0; i1 < this.layers; i1++) {
      var layer = [];
      var size = 0;
      if (i1 === 0) {
        size = inputSize;
      } else if (i1 == this.layers - 1) {
        size = outputSize;
      } else {
        size = Math.round((inputSize + outputSize) / 2);
      }
      for (var i2 = 0; i2 < size; i2++) {
        new Neuron(this, i1);
      }
    }
  }
  bindMethods(self) {
    self.deleteNeuron = this.deleteNeuron.bind(self);
    self.deleteConnection = this.deleteConnection.bind(self);
    self.input = this.input.bind(self);
    self.generate = this.generate.bind(self);
  }
  input(array) {
    var inputs = [];
    Object.values(this.globalReferenceNeurons).forEach(neuron => {
      if (neuron.layer == 0) {
        inputs.push(neuron);
      }
    });
    inputs.forEach((input, index) => {
      input.transmit(array[index]);
    });
    return Object.values(this.globalReferenceNeurons).filter(neuron => {
      return neuron.layer == this.layers - 1
    }).map(neuron => {
      return neuron.measure();
    });
  }
  deleteConnection(connectionId){
    if (this.globalReferenceConnections.hasOwnProperty(connectionId)){
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
  deleteNeuron(neuronId){
    if (this.globalReferenceNeurons.hasOwnProperty(neuronId)){
      let neuron = this.globalReferenceNeurons[neuronId];
      Object.values(neuron.connections).concat(Object.values(neuron.connected)).forEach(connection=>{
        this.deleteConnection(connection.id);
      });
      delete this.structure[this.globalReferenceNeurons[neuronId].layer][neuronId];
      delete this.globalReferenceNeurons[neuronId];
    }
  }
  generate() {
    this.activations = 0;
    console.log('Current mutation rate: ', this.mutationRate);
    console.log('Mutation rate mutationRateGrowth: ', this.mutationRateGrowth);
    this.mutationRate = getRandomLowNumber(1, 50); //change the max to be based on the current complexity of the network
    console.log('New mutation rate: ', this.mutationRate);
    //console.log(this.mutationRate);
    mutate(this.mutationRate, this);
  }
}
module.exports = Brain;
