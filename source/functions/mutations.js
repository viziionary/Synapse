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
      console.log()
      var neuron1 = getRandomProperty(brain.globalReferenceNeurons);
      var neuron2 = getRandomProperty(brain.globalReferenceNeurons);
      neuron1.connect(neuron2);
      //console.timeEnd('connect');
    }
  },
  disconnect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      console.log('Disconnecting neurons.');
      //console.time('disconnect');
      var connection = getRandomProperty(brain.globalReferenceConnections);
      console.log(brain.globalReferenceConnections[connection.id]);
      connection.delete();
      console.log(brain.globalReferenceConnections[connection.id]);
      console.log(brain);
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
        connection.bias += 0.1;
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
        connection.bias -= 0.1;
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
      var layer = getRandomNumber(1, brain.layers - 2);
      var neuron1 = new Neuron(brain, layer);
      //console.timeEnd('add');
    }
  },
  remove: { //remove a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Removing neurons.');
      //console.time('remove');
      var layer = getRandomNumber(1, brain.layers - 2);
      for (var prop1 in brain.globalReferenceNeurons) {
        var neuron = brain.globalReferenceNeurons[prop1];
        if (neuron.layer == layer) {
          neuron.delete();
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