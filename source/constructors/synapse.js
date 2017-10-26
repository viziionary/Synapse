const Brain = require('./brain');
const mutate = require('../functions/mutate.js');
const Neuron = require('./neuron');
const Connection = require('./connection');
// clone = require('../functions/clone');

function cloneBrain(brainParent) {
  var brain = Object.assign({}, brainParent);

  /*
  brain.evolve = (functionIn) => {
    brain.score = functionIn();
  }
  brain.input = (array) => {
    var inputs = [];
    Object.values(brain.globalReferenceNeurons).forEach(neuron => {
      if (neuron.layer == 0) {
        inputs.push(neuron);
      }
    });
    inputs.forEach((input, index) => {
      input.transmit(array[index]);
    });
    return Object.values(brain.globalReferenceNeurons).filter(neuron => {
      return neuron.layer == layers - 1
    }).map(neuron => {
      return neuron.measure();
    });
  };

  brain.generate = function() {
    brain.activations = 0;
    var max = Math.floor(brain.mutationRate);
    if (max === brain.mutationMax) {
      brain.mutationRate = 0;
    }
    brain.mutationRate += brain.mutationRateGrowth;
    mutate(brain.mutationRate, brain);
  };

  for (var prop in brainParent.globalReferenceNeurons) {
    if (brainParent.globalReferenceNeurons.hasOwnProperty(prop)) {
      brain.globalReferenceNeurons[prop].connect = (target) => {
        new Connection(brain, brain.globalReferenceNeurons[prop], target, (id, connection) => {
          brain.globalReferenceConnections[id] = connection;
          brain.globalReferenceNeurons[prop].connections[id] = connection;
        });
      };
      brain.globalReferenceNeurons[prop].disconnect = (id) => {
        brain.globalReferenceNeurons[prop].connections[id].active = false;
      };
      brain.globalReferenceNeurons[prop].destroy = () => {
        brain.globalReferenceNeurons[prop].active = false;
        Object.values(brain.globalReferenceNeurons[prop].connected).forEach(connection => {
          connection.active = false;
        });
        Object.values(brain.globalReferenceNeurons[prop].connections).forEach(connection => {
          connection.active = false;
        });
      };
      brain.globalReferenceNeurons[prop].measure = () => {
        var total = 0;
        var bias;
        for (var i1 = 0; i1 < brain.globalReferenceNeurons[prop].recentCharges.length; i1++) {
          total += brain.globalReferenceNeurons[prop].recentCharges[i1];
        }
        bias = total / brain.globalReferenceNeurons[prop].recentCharges.length;
        return bias;
      }
      brain.globalReferenceNeurons[prop].transmit = (charge) => {
        brain.globalReferenceNeurons[prop].recentCharges.push(charge);
        if (brain.globalReferenceNeurons[prop].recentCharges.length > brain.globalReferenceNeurons[prop].memory) brain.globalReferenceNeurons[prop].recentCharges.splice(0, 1);
        brain.globalReferenceNeurons[prop].polarization += charge;
        if (brain.globalReferenceNeurons[prop].polarization >= brain.globalReferenceNeurons[prop].threshold) {
          brain.globalReferenceNeurons[prop].polarization = 0;
          Object.values(brain.globalReferenceNeurons[prop].connections).forEach(connection => {
            if (connection.active == true && isNumber(charge)) {
              connection.activate(brain.globalReferenceNeurons[prop].recentCharges.reduce((cur, element) => {
                return cur + (element / brain.globalReferenceNeurons[prop].recentCharges.length)
              }, 0));
            }
          });
        }
      };
    }
  }

  for (var prop in brain.globalReferenceConnections) {
    if (brain.globalReferenceConnections.hasOwnProperty(prop)) {
      brain.globalReferenceConnections[prop].updateBias = function(charge) {
        if (that.active == true) {
          var total = 0;
          that.recentCharges.push(charge); 
          if (that.recentCharges.length > that.memory) that.recentCharges.splice(0, 1);
          for (var i1 = 0; i1 < brain.globalReferenceConnections[prop].recentCharges.length; i1++) {
            total += that.recentCharges[i1];
          }
          for (var i1 = 0; i1 < that.weight.length; i1++) {
            total += that.weight[i1];
          }
          that.bias = total / (that.recentCharges.length + that.weight.length);
        }
      };
      brain.globalReferenceConnections[prop].destroy = () => {
        brain.globalReferenceConnections[prop].active = false;
      };
      brain.globalReferenceConnections[prop].activate = (charge) => {
        if (brain.globalReferenceConnections[prop].active == true) {
          brain.activations++;
          if (brain.globalReferenceConnections[prop].target.active == true) {
            brain.globalReferenceConnections[prop].target.transmit((charge + brain.globalReferenceConnections[prop].bias) / 2);
          }
        }
      };
    }
  }
  */

  console.log('Cloned brain:');
  console.log(brain);
  console.log('Cloned brain counter:');
  console.log(brain.counter);
  return brain;
}

class Synapse {
  constructor(inputSize, outputSize, runFunction) {
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize, outputSize);
    this.run = this.run.bind(this);
  }
  async run() {
    //console.log('score',this.brain.score);
    var child = cloneBrain(this.brain);
    child.generate();
    console.log(child);
    console.log(child.counter);
    var childScore = this.runFunction(child.input);
    if (childScore instanceof Promise) {
      childScore = await childScore;
    }
    child.score = childScore;
    if (childScore === false) {
      return this.brain;
    } else {
      if (this.brain.score) {
        if (this.brain.score < childScore) {
          this.brain = child;
        }
      } else {
        this.brain = child;
      }
      return this.run();
    }
    setTimeout(function() {}, 10);
  }
}

module.exports = Synapse;