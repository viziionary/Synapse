const Brain = require('./brain');
const cloneBrain = require('../functions/clonebrain');

class Synapse {
  constructor(inputSize, outputSize, runFunction) {
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize, outputSize);
    //console.log('Global Reference Connections:',Object.entries(this.brain.globalReferenceConnections).length,this.brain.globalReferenceConnections);
    this.run = this.run.bind(this);
    this.getScoredChild = this.getScoredChild.bind(this);
  }
  async getScoredChild() {
    var child = cloneBrain(this.brain);
    var childScore;
    childScore = this.runFunction(child.input);
    while (childScore instanceof Promise) {
      childScore = await childScore;
    }
    return [child, childScore];
  }
  async run() {
    //console.log('score',this.brain.score);

    if (this.child) {
      this.child = cloneBrain(this.brain);
      this.child.generate()
    } else {
      for (let i = 0; i < 1000; i++) {
        var childData = getScoredChild();
        var child = childData[0]
        var childScore = [1]
        children[childScore] = child;
      }
      this.child = Object.keys(children).sort((a, b) => {
        return a > b ? 1 : -1
      })[0];
    }

    var childScore = this.runFunction(this.child.input);
    if (childScore instanceof Promise) {
      childScore = await childScore;
      //console.log(childScore);
    }
    this.child.score = childScore;
    if (childScore === false) {
      return this.brain;
    } else if (childScore instanceof Brain) {
      this.brain = childScore;
      return this.run();
    } else {
      if (this.brain.score) {
        if (this.brain.score < childScore) {
          this.brain = this.child;
          console.log('EVOLVED from ' + this.brain.score + ' to ' + this.child.score);
        }
      } else {
        console.log('Brain born with score of ' + child.score);
        this.brain = this.child;
      }
      return this.run();
    }
    //setTimeout(function(){}, 10);
  }
}

module.exports = Synapse;