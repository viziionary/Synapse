const Brain = require('./brain');
const clone = require('../functions/clone');

class Synapse {
  constructor(inputSize, outputSize, runFunction) {
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize, outputSize);
    this.run = this.run.bind(this);
  }
  async run() {
    //console.log('score',this.brain.score);
    var child = clone(this.brain, true);
    child.generate();
    console.log(child);
    console.log(child.counter);
    var childScore = this.runFunction(child.input);
    if (childScore instanceof Promise){
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
    setTimeout(function(){}, 10);
  }
}

module.exports = Synapse;
