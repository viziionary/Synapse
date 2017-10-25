const Brain = require('./brain');
class Synapse {
  constructor(runFunction,inputSize,outputSize){
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize,outputSize);
    this.run = this.run.bind(this);
  }
  run(){
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
   if (this.score) {
         if (score > this.score) {
           score = result.score;
         } else {
           sim(copy);
         }
       } else {
         console.log('Assigning parent score.');
         this.score = result.score;
         sim(parent);
       }
    clone()
  }
}
