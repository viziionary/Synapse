const getRandomProperty = require('./getrandomproperty');
const getRandomNumber = require('./getrandomnumber');
const Neuron = require('../constructors/neuron');

var mutations = {
  connect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Connecting neurons.');
      //console.time('connect');
      var count = getRandomNumber(1, 10);
      for (let i = 0; i < count; i++) {
        var neuron1 = getRandomProperty(brain.globalReferenceNeurons);
        var neuron2 = getRandomProperty(brain.globalReferenceNeurons);
        neuron1.connect(neuron2);
      }
      //console.timeEnd('connect');
    }
  },
  disconnect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Disconnecting neurons.');
      //console.time('disconnect');
      var count = getRandomNumber(1, 10);
      for (let i = 0; i < count; i++) {
        var connection = getRandomProperty(brain.globalReferenceConnections);
        if (connection) { /* FUCKUP */
          connection.delete();
        }
      }
      //console.timeEnd('disconnect');
    }
  },
  bias: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.time('bias');
      var connection = getRandomProperty(brain.globalReferenceConnections);
      if (connection) {
        connection.bias += getRandomNumber(0, 1);
        if (connection.bias > 1) connection.bias = 1;
      }
      //console.timeEnd('bias');
    }
  },
  unbias: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.time('unbias');
      var connection = getRandomProperty(brain.globalReferenceConnections);
      if (connection) {
        connection.bias -= getRandomNumber(0, 1);
        if (connection.bias < 0) connection.bias = 0;
      }
      //console.timeEnd('unbias');
    }
  },
  add: { //add a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Adding neurons.');
      //console.time('add');
      var count = getRandomNumber(1, 10);
      var layer = getRandomNumber(1, brain.layers - 2);
      for (let i = 0; i < count; i++) {
        var neuron1 = new Neuron(brain, layer);
        for (prop in brain.globalReferenceNeurons) {
          if (brain.globalReferenceNeurons[prop].layer === layer + 1) {
            var neuron2 = brain.globalReferenceNeurons[prop];
            neuron1.connect(neuron2);
            //break
          }
        }
      }
      //console.timeEnd('add');
    }
  },
  remove: { //remove a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Removing neurons.');
      //console.time('remove');
      var count = getRandomNumber(1, 10);
      var layer = getRandomNumber(1, brain.layers - 2);
      for (let i = 0; i < count; i++) {
        for (var prop in brain.globalReferenceNeurons) {
          var neuron = brain.globalReferenceNeurons[prop];
          if (neuron.layer == layer) {
            neuron.delete();
          }
        }
      }
      //console.timeEnd('remove');
    }
  },
  fillMemory: { //add memory capacity
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.memory += 1;
    }
  },
  drainMemory: { //shorten memory capacity
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.memory -= 1;
      if (neuron.memory < 1) {
        neuron.memory = 1;
      }
    }
  },
  polarize: {
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  depolarize: {
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  excite: { //lower action threshold
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  calm: { //raise action threshold
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  toggleThreshold: { //choose whether to use threshold adjustment
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  inputShift: { //shift a neuron's input weight (how many neurons connect to it from the previous layer)
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  outputShift: { //shift a neuron's output weight (how many neurons in the next layer it connects to)
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  }
};
module.exports = mutations;