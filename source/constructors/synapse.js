const Brain = require('./brain');
class Synapse {
  constructor(runFunction, inputSize, outputSize) {
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize, outputSize);
    this.run = this.run.bind(this);
  }
  run() {
    var child = clone(this, true);
    child.generate();
    var childScore = this.runFunction(child.input);
    if (this.brain.score) {
      if (this.brain.score > childScore) {
        this.brain = child;
      }
    } else {
      this.brain = child;
    }
  }
}
