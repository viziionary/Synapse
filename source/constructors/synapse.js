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
    var chosenOne;
    var children = {};
    for (let i = 0; i < 1000; i++) {
      var child = cloneBrain(this.brain);
      child.generate();
      console.log('Debug 1');
      var childScore = this.runFunction(child.input);
      console.log('Debug 2');
      if (childScore instanceof Promise){
        console.log('Debug 3');
        childScore = await childScore;
        console.log('Debug 4');
        children[score] = child;
        //console.log(childScore);
      }
    }

    this.child = Object.keys(children).sort((a,b)=>{return a>b ? 1 : -1});
    console.log('Found the chosen one!', this.child);
    //console.log(child);
    //console.log(child.counter);
    var childScore = this.runFunction(child.input);
    if (childScore instanceof Promise){
      childScore = await childScore;
      //console.log(childScore);
    }
    child.score = childScore;
    if (childScore === false) {
      return this.brain;
    } else if (childScore instanceof Brain){
      this.brain = childScore;
      return this.run();
    } else {
      if (this.brain.score) {
        if (this.brain.score < childScore) {
          this.brain = child;
          console.log('EVOLVED from ' + this.brain.score + ' to ' + child.score);
        }
      } else {
        console.log('Brain born with score of ' + child.score);
        this.brain = child;
      }
      return this.run();
    }
    //setTimeout(function(){}, 10);
  }
}

module.exports = Synapse;
