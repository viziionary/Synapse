const Neuron = require('./neuron');
const mutate = require('../functions/mutate.js');
const getRandomNumber = require('../functions/getrandomnumber');

function Brain(inputSize, outputSize) {
  var that = this;
  var layers = 3;
  this.inputSize = inputSize;
  this.outputSize = outputSize;
  this.layers = layers;
  this.counter = 0;
  this.globalReferenceNeurons = {};
  this.globalReferenceConnections = {};
  //this.score = 0;
  this.activations = 0;
  this.mutationRate = 1;
  this.mutationRateGrowth = 1;
  this.mutationMax = 100;

  this.evolve = (functionIn) => {
    this.score = functionIn();
  }
  this.input = (array) => {
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
  };

  this.generate = function() {
    that.activations = 0;

    var max = Math.floor(that.mutationRate);
    if (max === that.mutationMax) {
      that.mutationRate = 0;
    }
    that.mutationRate += that.mutationRateGrowth;
    //console.log(that.mutationRate);
    mutate(0, that.mutationRate, that);
    return that;
  };
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
    // NEW CODE
    //           	Object.values(that.globalReferenceNeurons).forEach(neuron=>{
    //               if (neuron.layer == layer1) {
    //                 var passed = 0;
    //                 var total = 0;
    //                 Object.values(that.globalReferenceNeurons).forEach(neuron2=>{
    //                   if (neuron2.layer == layer2) {
    //                   	total++;
    //                   }
    //                 });
    //                 Object.values(that.globalReferenceNeurons).forEach(neuron2=>{

    //                 });
    //               }
    //             });
    // END OF NEW CODE
    for (var prop1 in that.globalReferenceNeurons) {
      if (that.globalReferenceNeurons[prop1].layer == layer1) {
        var passed = 0;
        var total = 0;
        for (var prop2 in that.globalReferenceNeurons) {
          if (that.globalReferenceNeurons[prop2].layer == layer2) {
            total++;
          }
        }
        for (var prop2 in that.globalReferenceNeurons) {
          if (that.globalReferenceNeurons[prop2].layer == layer2) {
            passed++;
            if (Object.keys(that.globalReferenceNeurons[prop1].connections).length <= that.globalReferenceNeurons[prop1].weight) {
              var rand = getRandomNumber(0, 3);
              var existing = Object.keys(that.globalReferenceNeurons[prop1].connections).length;
              var weight = that.globalReferenceNeurons[prop1].weight;
              var needed = weight - existing;
              var remaining = total - passed;
              if (needed === remaining || rand === 1) {
                that.globalReferenceNeurons[prop1].connect(that.globalReferenceNeurons[prop2]);
              }
            }
          }
        }
      }
    }
  }
}

module.exports = Brain;
