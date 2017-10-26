const Brain = require('./brain');
const cloneBrain = require('../functions/clonebrain');

class Synapse {
  constructor(inputSize, outputSize, runFunction) {
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize, outputSize);
    //console.log('Global Reference Connections:',Object.entries(this.brain.globalReferenceConnections).length,this.brain.globalReferenceConnections);
    this.run = this.run.bind(this);
  }
  async run() {
    //console.log('score',this.brain.score);
    var child = cloneBrain(this.brain);
    this.child = child;
    child.generate();
    //console.log(child);
    //console.log(child.counter);
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
