const Neuron = require('./neuron');
const mutate = require('../functions/mutate.js');
const getRandomNumber = require('../functions/getrandomnumber');

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
    for (var i1 = 0; i1 < this.layers - 1; i1++) {
      var layer1 = i1;
      var layer2 = i1 + 1;
      var list = [];
      for (var prop1 in this.globalReferenceNeurons) {
        if (this.globalReferenceNeurons[prop1].layer == layer1) {
          for (var prop2 in this.globalReferenceNeurons) {
            if (this.globalReferenceNeurons[prop2].layer == layer2) {
              this.globalReferenceNeurons[prop1].connect(this.globalReferenceNeurons[prop2]);
            }
          }
        }
      }
    }
  }
  bindMethods(self) {
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
      let connection = this.globalReferenceConnections;
      let sourceIndex = connection.source.connections.indexOf(connection);
      if (sourceIndex > -1) {
        connection.source.connections.splice(sourceIndex, 1);
      }
      let targetIndex = connection.target.connected.indexOf(connection);
      if (targetIndex > -1) {
        connection.target.connections.splice(targetIndex, 1);
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
      delete this.globalReferenceNeurons[neuronId];
    }
  }
  generate() {
    this.activations = 0;
    var max = Math.floor(this.mutationRate);
    if (max === this.mutationMax) {
      this.mutationRate = 0;
    }
    this.mutationRate += this.mutationRateGrowth;
    //console.log(this.mutationRate);
    mutate(this.mutationRate, this);
  }
}
module.exports = Brain;
