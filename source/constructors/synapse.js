const Brain = require('./brain');
const cloneBrain = require('../functions/clonebrain');
import Worker from '../workers/sim.js';

class Synapse {
  constructor(inputSize, outputSize, runFunction) {

    //var brain = new Brain(inputSize, outputSize);
    //var child = cloneBrain(brain);
    //brain.score = 100;
    //child.score = 200;
    //brain.score = 100;
    //console.log('Brain score: ' + brain.score);
    //console.log('Child score: ' + child.score);

    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize, outputSize);
    //console.log('Global Reference Connections:',Object.entries(this.brain.globalReferenceConnections).length,this.brain.globalReferenceConnections);
    this.initiate = this.initiate.bind(this);
    this.getScoredChild = this.getScoredChild.bind(this);
  }
  async initiate() {
    
    const simWorker = new Worker();
    simWorker.postMessage('hi');
    myWorker.onmessage = function(e) {
      result.textContent = e.data;
      console.log('Message received from worker: ', result.textContent);
    }; 
    
    if (this.child) {
      this.child = cloneBrain(this.brain); 
      this.child.generate();
    } else { 
      var newChild = null;
      for (let i = 0; i < 100; i++) {
        console.log('Searching for Chosen One... [' + i + ']'); // expected execution order
        var childData = await this.getScoredChild(); // debug 2 & 3 should execute here
        //console.log('Debug 6'); // expected execution order
        var child = childData[0];
        var childScore = childData[1];
        child.score = childScore;
        if (newChild) {
          console.log('Comparing top child score [' + newChild.score + '] to tested child score [' + child.score + ']');
        }
        if (newChild === null || newChild.score < child.score) {
          newChild = child;
        }
      }
      console.log('Chosen One:', newChild, 'Score:', newChild.score);
      this.child = newChild;
    }

    var childScore = this.runFunction(this.child.input, this.child);
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
          console.log('EVOLVED from ' + this.brain.score + ' to ' + this.child.score);
          this.brain = this.child;
        }
      } else {
        this.brain = this.child;
        console.log('Brain born with score of ' + brain.score);
      }
      return this.initiate();
    }
    //setTimeout(function(){}, 10);
  }
  async getScoredChild() {
    var child = new Brain(this.inputSize, this.outputSize);
    child.generate();
    child = cloneBrain(child);
    let oldChild = this.child;
    this.child = child;
    var childScore = this.runFunction(child.input, child);
    this.child = oldChild;
    while (childScore instanceof Promise) {
      childScore = await childScore;
    }
    return [child, childScore];
  }
}
export default Synapse;