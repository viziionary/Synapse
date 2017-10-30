const Brain = require('./brain');
const cloneBrain = require('../functions/clonebrain');

class Synapse {
  constructor(inputSize, outputSize, runFunction) {
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize, outputSize);
    //console.log('Global Reference Connections:',Object.entries(this.brain.globalReferenceConnections).length,this.brain.globalReferenceConnections);
    this.initiate = this.initiate.bind(this);
    this.getScoredChild = this.getScoredChild.bind(this);
  }
  async initiate() {
    //console.log('score',this.brain.score);

    if (this.child) {
      this.child = cloneBrain(this.brain);
      this.child.generate();
    } else {
      var newChild = null;
      for (let i = 0; i < 100; i++) {
        console.log('Searching for chosen one... [' + i + ']'); // expected execution order
        var childData = await this.getScoredChild(); // debug 2 & 3 should execute here
        //console.log('Debug 6'); // expected execution order
        var child = childData[0];
        var childScore = childData[1];
        child.score = childScore;
        if (newChild === null || newChild.score < child.score) {
          newChild = child;
        }
      }
      this.child = newChild;
    }

    var childScore = this.runFunction(this.child.input,this.child);
    if (childScore instanceof Promise) {
      childScore = await childScore;
      //console.log(childScore);
    }
    this.child.score = childScore;
    if (childScore === false) {
      return this.brain;
    } else if (childScore instanceof Brain) {
      this.brain = childScore;
      return this.initiate();
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
      return this.initiate();
    }
    //setTimeout(function(){}, 10);
  }
  async getScoredChild() {
    var child = new Brain(this.inputSize, this.outputSize);
    console.log('Child', child);
    //console.log('Debug 2:', child); // expected execution order
    let oldChild = this.child;
    this.child = child;
    //console.log('Debug 1 ', child);
    var childScore = this.runFunction(child.input, child);
    //console.log('Debug 4:', this.child); // expected execution order
    this.child = oldChild;
    while (childScore instanceof Promise) {
      childScore = await childScore;
    }
    //console.log('Debug 5:', this.child); // expected execution order
    
    return [child, childScore];
  }
}

module.exports = Synapse;
