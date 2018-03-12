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
		this.brain = null;
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
						if (that.topScore) {
							if (that.threads[i1].parent.score < that.topScore) {
								that.threads[i1].parent = cloneBrain(that.brain);
							}
						}
						//that.threads[i1].child = new Brain(inputSize, outputSize); //test
						that.threads[i1].child = cloneBrain(that.threads[i1].parent); //real
						that.threads[i1].child.generate();
					} else {
						console.log('Thread ' + i1 + ' completed.');
						that.threads[i1].active = false;
					}

					//var testBrain = new Brain(inputSize, outputSize); // test
					//var childScore = that.runFunction(testBrain); // test

					var childScore = that.runFunction(cloneBrain(that.threads[i1].child)); //real
					that.threads[i1].child.score = childScore;
					if (childScore === true) {
						that.threads[i1].complete = true;
					} else {
						if (that.brain && that.brain.score) {
							if (!that.threads[i1].parent.score) {
								that.threads[i1].parent.score = childScore;
							}
							if (that.threads[i1].parent.score < childScore) {
								console.log('Thread ' + i1 + ' evolved from ' + that.threads[i1].parent.score + ' to ' + that.threads[i1].child.score + '. Synapse top score is ' + that.brain.score);
								that.threads[i1].parent = cloneBrain(that.threads[i1].child);
							}
							if (that.brain.score < that.threads[i1].parent.score) {
								console.log('Network evolved from ' + that.brain.score + ' to ' + that.threads[i1].parent.score);
								//that.brain = new Brain(inputSize, outputSize); //test
								that.brain = cloneBrain(that.threads[i1].parent); //real
							}
						} else {
							that.brain = that.threads[i1].child;
							console.log('Network born with score of ' + that.threads[i1].child.score);
						}
					}
					setTimeout(function() {
						run(i1);
					}, 1000);

				} else {
					console.log('Thread ' + i1 + ' inactive.');
				}
			})(i1);
		}
	}
}
export default Synapse;