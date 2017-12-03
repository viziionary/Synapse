const Connection = require('../constructors/connection');
const Neuron = require('../constructors/neuron');
const Brain = require('../constructors/brain');
var cloneBrainProperty = function clone(sourceProperty, clonedBrain = null) {
    var clonedProperty = sourceProperty;
    if (sourceProperty instanceof Brain) {
        if (clonedBrain == null) {
            clonedProperty = new Brain(sourceProperty.inputSize, sourceProperty.outputSize);
            clonedBrain = clonedProperty;
        } else {
            clonedProperty = clonedBrain;
        }
    } else if (sourceProperty instanceof Neuron) {
        clonedProperty = new Neuron(clonedBrain, sourceProperty.type);
    } else if (sourceProperty instanceof Connection) {
        clonedProperty = new Connection(clonedBrain, sourceProperty.source, sourceProperty.target);
    }
    if (typeof sourceProperty == 'object' && (!(sourceProperty instanceof Brain) || clonedBrain == null)) {
        for (let prop in sourceProperty) {
            if (sourceProperty.hasOwnProperty(prop)) {
                clonedProperty[prop] = clone(sourceProperty[prop], clonedBrain);
            }
        }
    }
    return clonedProperty;
};
module.exports = cloneBrainProperty;