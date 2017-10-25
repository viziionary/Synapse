const Brain = require('./brain');
const clone = require('../functions/clone');
const isNumeric = require('../functions/isNumeric');
class Synapse {
  constructor(runFunction, inputSize, outputSize) {
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize, outputSize);
    this.run = this.run.bind(this);
  }
  run(times){
    if (times === null) {
      this.runOnce();
    } else {
      if (!isNumeric(times)) {
        throw new Error('Synapse: Invalid Run Input');
      }
      for (var i = 0; i < times; i++) {
        this.runOnce();
      }
    }
  }
  runOnce() {
    var child = clone(this.brain, true);
    child.generate();
    var childScore = this.runFunction(child.input);
    if (this.brain.score) {
      if (this.brain.score > childScore) {
        this.brain = child;
      }
    } else {
      this.brain = child;
    }
    this.brain.score = childScore;
  }
}
module.exports = Synapse;
