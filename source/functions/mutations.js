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
      delete brain.globalReferenceConnections[connection.id].source.connections[connection.id];
      delete brain.globalReferenceConnections[connection.id].target.connected[connection.id];
      delete brain.globalReferenceConnections[connection.id];
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
    frequency: 0,
    mutate: function(brain) {
      //console.log('Removing neurons.');
      //console.time('remove');
      var layer = getRandomNumber(1, brain.layers - 2);
      for (var prop1 in brain.globalReferenceNeurons) {
        var neuron = brain.globalReferenceNeurons[prop1];
        if (neuron.layer == layer) {
          for (prop in brain.globalReferenceNeurons[neuron.id].connected) {
            var connected = brain.globalReferenceNeurons[neuron.id].connected[prop];
            delete brain.globalReferenceConnections[connected.id].source.connections[connected.id];
            delete brain.globalReferenceConnections[connected.id].target.connected[connected.id];
            delete brain.globalReferenceConnections[connected.id];
          }
          delete brain.globalReferenceNeurons[neuron.id];
          delete brain.globalReferenceNeurons[neuron.id];
          delete brain.globalReferenceNeurons[neuron.id];
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
  },
  reBias: { //randomize all bias
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  reWeight: { //randomize all input and output weights
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  reConnect: { //randomize connection layout
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  reThreshold: { //randomize each neuron's threshold level
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  reToggleThreshold: { //randomize whether each neuron uses a threshold mechanic
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  reMemorize: { //randomize the length of each neuron's memory
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  reToggleMemory: { //randomize whether each neuron uses memory
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  massReThreshold: { //randomize each neuron's threshold level (monotonous outcome)
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  massReToggleThreshold: { //randomize whether each neuron uses a threshold mechanic (monotonous outcome)
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  massReMemorize: { //randomize the length of each neuron's memory (monotonous outcome)
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
  massReToggleMemory: { //randomize whether each neuron uses memory (monotonous outcome)
    frequencyMod: 0,
    frequency: 0,
    mutate: function(brain) {}
  },
};
module.exports = mutations;