const Neuron = require('./neuron');
const mutate = require('../functions/mutate.js');
const getRandomNumber = require('../functions/getrandomnumber');

function Brain(inputSize, outputSize) {

}
class Brain {
  constructor(inputSize, outputSize){
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

    for (var i1 = 0; i1 < layers; i1++) {
      var layer = [];
      var size = 0;
      if (i1 === 0) {
        size = inputSize;
      } else if (i1 == layers - 1) {
        size = outputSize;
      } else {
        size = Math.round((inputSize + outputSize) / 2);
      }
      for (var i2 = 0; i2 < size; i2++) {
        new Neuron(this, i1);
      }
    }
    for (var i1 = 0; i1 < layers - 1; i1++) {
      var layer1 = i1;
      var layer2 = i1 + 1;
      var list = [];
      for (var prop1 in this.globalReferenceNeurons) {
        if (this.globalReferenceNeurons[prop1].layer == layer1) {
          var passed = 0;
          var total = 0;
          for (var prop2 in this.globalReferenceNeurons) {
            if (this.globalReferenceNeurons[prop2].layer == layer2) {
              total++;
            }
          }
          for (var prop2 in this.globalReferenceNeurons) {
            if (this.globalReferenceNeurons[prop2].layer == layer2) {
              passed++;
              if (Object.keys(this.globalReferenceNeurons[prop1].connections).length <= this.globalReferenceNeurons[prop1].weight) {
                var rand = getRandomNumber(0, 3);
                var existing = Object.keys(this.globalReferenceNeurons[prop1].connections).length;
                var weight = this.globalReferenceNeurons[prop1].weight;
                var needed = weight - existing;
                var remaining = total - passed;
                if (needed === remaining || rand === 1) {
                  this.globalReferenceNeurons[prop1].connect(this.globalReferenceNeurons[prop2]);
                }
              }
            }
          }
        }
      }
    }
  }
  bindMethods(self){
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
      return neuron.layer == layers - 1
    }).map(neuron => {
      return neuron.measure();
    });
  }
  generate(){
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
