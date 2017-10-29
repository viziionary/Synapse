const getRandomProperty = require('./getrandomproperty');
const getRandomNumber = require('./getrandomnumber');
const getRandomDecimal = require('./getrandomdecimal');
const Neuron = require('../constructors/neuron');

var mutations = {
  connect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Connecting neurons.');
      var count = getRandomNumber(1, 10);
      for (let i = 0; i < count; i++) {
        var neuron1 = getRandomProperty(brain.globalReferenceNeurons);
        var neuron2 = getRandomProperty(brain.globalReferenceNeurons);
        neuron1.connect(neuron2);
      }
    }
  },
  disconnect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Disconnecting neurons.');
      var count = getRandomNumber(1, 10);
      for (let i = 0; i < count; i++) {
        var connection = getRandomProperty(brain.globalReferenceConnections);
        if (connection) { /* FUCKUP */
          connection.delete();
        }
      }
    }
  },
  bias: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var connection = getRandomProperty(brain.globalReferenceConnections);
      if (connection) {
        connection.bias += getRandomDecimal(0, 1);
        if (connection.bias > 1) connection.bias = 1;
      }
    }
  },
  unbias: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var connection = getRandomProperty(brain.globalReferenceConnections);
      if (connection) {
        connection.bias -= getRandomDecimal(0, 1);
        if (connection.bias < 0) connection.bias = 0;
      }
    }
  },
  add: { //add a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Adding neurons.');
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
    }
  },
  remove: { //remove a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Removing neurons.');
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
  }
};
module.exports = mutations;
