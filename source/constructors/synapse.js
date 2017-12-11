import Brain from './brain.js';
import cloneBrain from '../functions/clonebrain.js';

class Synapse {
  constructor(inputSize, outputSize, runFunction) {
    this.topScore = false;
    this.threads = [];
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.runFunction = runFunction;
    this.threadCount = navigator.hardwareConcurrency * 4;
    for (let i1 = 0; i1 < this.threadCount; i1++) {
      this.threads.push({});
    }
    for (let i1 = 0; i1 < threadCount; i1++) {
      var that = this;
      this.threads[i1] = {};
      this.threads[i1].brain = new Brain(inputSize, outputSize);
      this.threads[i1].active = true;
      (async function run(i1) {
        console.log('Running Synapse [THREAD ' + i1 + ']');
        if (that.threads[i1].active) {
          if (!that.threads[i1].complete) {
            that.threads[i1].child = cloneBrain(that.threads[i1].brain);
            that.threads[i1].child.generate();
          } else {
            for (let i2 = 0; i2 < threadCount; i2++) {
              if (!that.threads[i2].complete) {
                that.threads[i2].active = false;
              }
            }
          }

          if (that.threads[i1].child.score === that.topScore) {
            that.threads[i1].child.leader = true;
          } else {
            that.threads[i1].child.leader = false;
          }
          var childScore = that.runFunction(that.threads[i1].child.input, that.threads[i1].child);
          if (childScore instanceof Promise) {
            childScore = await childScore;
          }
          that.threads[i1].child.score = childScore;
          if (childScore === true) {
            that.threads[i1].complete = true;
          } else {
            if (that.brain.score) {
              if (that.brain.score < childScore) {
                console.log('Evolved from ' + that.brain.score + ' to ' + that.threads[i1].child.score);
                that.brain = that.threads[i1].child;
              }
            } else {
              that.brain = that.threads[i1].child;
              console.log('Brain born with score of ' + that.threads[i1].child.score);
            }
          }
          run();
        }
      })(i1);
    }
  }


}
export default Synapse;