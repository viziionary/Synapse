function Brain(inputSize, outputSize, layers) {
    var that = this;
    if (!layers) {
        layers = 3;
    } else if (layers < 3) {
        throw 'The layers parameter must be a number equal to 3 or greater.'
    }
    var that = this;
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.layers = layers;
    this.counter = 0;
    this.globalReferenceNeurons = {};
    this.globalReferenceConnections = {};
    this.score = 0;
    this.activations = 0;
    this.mutationRate = 1;
    this.mutationRateGrowth = 1;
    this.mutationMax = 100;


    this.input = (array) => {
        var inputs = [];
        //console.log(that.globalReferenceNeurons);
        Object.values(this.globalReferenceNeurons).forEach(neuron=>{
          if (neuron.layer == 0) {
            inputs.push(neuron);
          }
        });
//             for (prop1 in this.globalReferenceNeurons) {
//                 if (this.globalReferenceNeurons[prop1].layer == 0) {
//                     inputs.push(this.globalReferenceNeurons[prop1]);
//                 }
//             }
        //console.log('Input size: ' + inputs.length);
        inputs.forEach((input,index)=>{
          input.transmit(array[index]);
        });
//             for (var i1 = 0; i1 < inputs.length; i1++) {
//                 inputs[i1].transmit(array[i1]);
//             }

//             for (var i1 = 0; i1 < outputSize; i1++) { /* FUCK UP */
            //console.log(this.brain[this.brain.length - 1][i2]);
        return Object.values(this.globalReferenceNeurons).filter(neuron=>{return neuron.layer == layers - 1}).map(neuron=>{
          return neuron.measure();
        });
//                 for (prop1 in this.globalReferenceNeurons) {
//                     if (this.globalReferenceNeurons[prop1].layer == layers - 1) {
//                         output.push(this.globalReferenceNeurons[prop1].measure());
//                     }
//                 }

//}
    };

    //this.mutate = function() {
    //    for (var i1 = 0; i1 < Math.floor(this.mutationRate); i1++) {
    //        var mutationsList = [];
    //        for (var name in this.mutations) {
    //            for (var i2 = 0; i2 < this.mutations[name].frequency; i2++) {
    //                mutationsList.push(this.mutations[name]);
    //            }
    //        }
    //        mutationsList[getRandomInt(0, mutationsList.length - 1)].mutate(that);
    //    }
    //}

    this.generate = function() {
        //console.log('Mutating...');
        //console.time('generation');
        //console.time('extension');
        that.activations = 0;
        //var child = clone(this, true);
        //console.timeEnd('extension');
        //console.time('selection');
        //console.timeEnd('selection');
        //console.time('mutation');

        var max = Math.floor(that.mutationRate);
        if (max === that.mutationMax) {
          that.mutationRate = 0;
        }
  that.mutationRate += that.mutationRateGrowth;
  console.log(that.mutationRate);
        mutate(0, that.mutationRate, that);
        return that;

        //console.log('Mutation complete.');
        //console.timeEnd('mutation');

        //console.timeEnd('generation');

    };
    for (var i1 = 0; i1 < layers; i1++) {
        var layer = [];
        var size = 0;
        if (i1 === 0) {
            size = inputSize;
        } else if (i1 == layers - 1) {
            size = outputSize;
        } else {
            size = Math.round((inputSize + outputSize) / 2);
        }
        for (var i2 = 0; i2 < size; i2++) {
            //if (i1 == 2) {
            //  console.log('Uh oh #2.')
            //}
            new Neuron(this, i1);
        }
    }
    for (var i1 = 0; i1 < layers - 1; i1++) {
        //console.log('Connecting layer ' + i1 + ' to layer ' + (i1 + 1));
        var layer1 = i1;
        var layer2 = i1 + 1;
        var list = [];
      // NEW CODE
//           	Object.values(that.globalReferenceNeurons).forEach(neuron=>{
//               if (neuron.layer == layer1) {
//                 var passed = 0;
//                 var total = 0;
//                 Object.values(that.globalReferenceNeurons).forEach(neuron2=>{
//                   if (neuron2.layer == layer2) {
//                   	total++;
//                   }
//                 });
//                 Object.values(that.globalReferenceNeurons).forEach(neuron2=>{

//                 });
//               }
//             });
      // END OF NEW CODE
        for (var prop1 in that.globalReferenceNeurons) {
            if (that.globalReferenceNeurons[prop1].layer == layer1) {
                var passed = 0;
                var total = 0;
                for (var prop2 in that.globalReferenceNeurons) {
                    if (that.globalReferenceNeurons[prop2].layer == layer2) {
                        total++;
                    }
                }
                for (var prop2 in that.globalReferenceNeurons) {
                    if (that.globalReferenceNeurons[prop2].layer == layer2) {
                        passed++;
                        //console.log('[Connections: ' + Object.keys(that.globalReferenceNeurons[prop1].connections).length + '] / [Weight: ' + that.globalReferenceNeurons[prop1].weight + ']');
                        if (Object.keys(that.globalReferenceNeurons[prop1].connections).length <= that.globalReferenceNeurons[prop1].weight) {
                            var rand = getRandomInt(0, 3);
                            var existing = Object.keys(that.globalReferenceNeurons[prop1].connections).length;
                            var weight = that.globalReferenceNeurons[prop1].weight;
                            var needed = weight - existing;
                            var remaining = total - passed;
                            //console.log('Total: ' + total);
                            //console.log('Passed: ' + passed);
                            //console.log('Remaining: ' + remaining);
                            //console.log('Needed: ' + needed);
                            if (needed === remaining || rand === 1) {
                                that.globalReferenceNeurons[prop1].connect(that.globalReferenceNeurons[prop2]);
                            }
                        }
                    }
                    //console.log(layer1 + ' connecting to ' + layer2)
                }
            }
        }
    }
}
module.exports = Brain;
