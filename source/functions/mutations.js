const getRandomProperty = require('./getrandomproperty');
const getRandomNumber = require('./getrandomnumber');
const getRandomDecimal = require('./getrandomdecimal');
const getRandomLowNumber = require('./getrandomlownumber');
const Neuron = require('../constructors/neuron');

var mutations = {
  connect: {
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {
      console.log('Connecting neurons.');
      var count = getRandomNumber(1, 10);
      for (let i = 0; i < count; i++) {
        var neuron1 = getRandomProperty(brain.layers.hidden);
        var neuron2 = getRandomProperty(brain.layers.input);
        var rand = getRandomNumber(0, 1);
        if (rand === 1) {
          neuron1 = neuron2;
        }
        var neuron3 = getRandomProperty(brain.layers.hidden);
        var neuron4 = getRandomProperty(brain.layers.output);
        var rand = getRandomNumber(0, 1);
        if (rand === 1) {
          neuron3 = neuron4;
        }
        neuron1.connect(neuron3);
      }
    }
  },
  disconnect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      console.log('Disconnecting neurons.');
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
      console.log('Biasing connections.');
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
      console.log('Unbiasing connections.');
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
      console.log('Adding neurons.');
      var count = getRandomLowNumber(1, 10);
      for (let i = 0; i < count; i++) {
        var neuron = new Neuron(brain, 'hidden');
      }
    }
  },
  remove: { //remove a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      console.log('Removing neurons.');
      var count = getRandomLowNumber(1, 10);
      for (let i = 0; i < count; i++) {
          var neuron = getRandomProperty(brain.layers.hidden);
          neuron.delete();
      }
    }
  },
  fillMemory: { //add memory capacity
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      console.log('Filling memory.');
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.memory += 1;
    }
  },
  drainMemory: { //shorten memory capacity
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      console.log('Draining memory');
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.memory -= 1;
      if (neuron.memory < 1) {
        neuron.memory = 1;
      }
    }
  },
  /*
  polarize: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.polarization += getRandomDecimal(0, 1);
      if (neuron.polarization > 1) {
        neuron.polarization = 1;
      }
    }
  },
  depolarize: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.polarization -= getRandomDecimal(0, 1);
      if (neuron.polarization < 0) {
        neuron.polarization = 0;
      }
    }
  },
  excite: { //lower action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.threshold += getRandomDecimal(0, 1);
      if (neuron.threshold > 1) {
        neuron.threshold = 1;
      }
    }
  },
  calm: { //raise action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.threshold -= getRandomDecimal(0, 1);
      if (neuron.threshold < 0) {
        neuron.threshold = 0;
      }
    }
  },
  charge: { //raise action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.chargeRate -= getRandomDecimal(0, 1);
      if (neuron.chargeRate < 0) {
        neuron.chargeRate = 0;
      }
    }
  },
  decharge: { //raise action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.chargeRate -= getRandomDecimal(0, 1);
      if (neuron.chargeRate < 0) {
        neuron.chargeRate = 0;
      }
    }
  }
  */
};
module.exports = mutations;
