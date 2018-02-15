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
    for (let i1 = 0; i1 < this.threadCount; i1++) {
      var that = this;
      this.threads[i1] = {};
      this.threads[i1].parent = new Brain(inputSize, outputSize);
      this.threads[i1].active = true;
      (async function run(i1) {

        console.log('Running Synapse [THREAD ' + i1 + ']');
        if (that.threads[i1].active) {
          if (!that.threads[i1].complete) {
            if (!that.threads[i1].parent.leader) {
              that.threads[i1].child = cloneBrain(that.threads[i1].parent);
              that.threads[i1].child.generate();
            }
          } else {
            console.log('Thread ' + i1 + ' completed.');
            that.threads[i1].active = false;
          }
          //var testBrain = new Brain(inputSize, outputSize);
          //var childScore = that.runFunction(testBrain.input, testBrain, i1); //test
          var childScore = that.runFunction(that.threads[i1].child.input, that.threads[i1].child, i1);
          if (childScore instanceof Promise) {
            childScore = await childScore;
          }
          that.threads[i1].child.score = childScore;
          if (childScore === true) {
            that.threads[i1].complete = true;
          } else {
            if (that.brain && that.brain.score) {
              //console.log('Synapse score: ' + that.brain.score)
              //console.log('Thread ' + i1 + ' parent score: ' + that.threads[i1].parent.score);
              //console.log('Thread ' + i1 + ' child score: ' + that.threads[i1].child.score);
              if (!that.threads[i1].parent.score) {
                that.threads[i1].parent.score = childScore;
              }
              if (that.threads[i1].parent.score < childScore) {
                console.log('Thread ' + i1 + ' evolved from ' + that.threads[i1].parent.score + ' to ' + that.threads[i1].child.score + '. Synapse top score is ' + that.brain.score);
                that.threads[i1].parent = that.threads[i1].child;
              }
              if (that.brain.score < that.threads[i1].parent.score) {
                console.log('Synapse evolved from ' + that.brain.score + ' to ' + that.threads[i1].parent.score);
                for (let i2 = 0; i2 < that.threads.length; i2++) {
                  that.threads[i2].parent.leader = false;
                }
                that.threads[i1].parent.leader = true;
                
                that.brain = cloneBrain(that.threads[i1].parent);
                console.log('Thread ' + i1 + ' became leader.');
              }
            } else {
              that.brain = that.threads[i1].child;
              console.log('Brain born with score of ' + that.threads[i1].child.score);
            }
          }
          run(i1);

        } else {
          console.log('Thread ' + i1 + ' inactive.');
        }
      })(i1);
    }
  }
}
export default Synapse;