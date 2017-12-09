import Connection from '../constructors/connection.js';
import Neuron from '../constructors/neuron.js';
import Brain from '../constructors/brain.js';
var neurons = {};
var connections = {};
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
        if (!neurons[sourceProperty.id]) {
            clonedProperty = new Neuron(clonedBrain, sourceProperty.type);
            neurons[sourceProperty.id] = clonedProperty;
        } else {
            clonedProperty = neurons[sourceProperty.id];
        }
    } else if (sourceProperty instanceof Connection) {
        if (!neurons[sourceProperty.id]) {
            clonedProperty = new Connection(clonedBrain, sourceProperty.source, sourceProperty.target);
            connections[sourceProperty.id] = clonedProperty;
        } else {
            clonedProperty = connections[sourceProperty.id];
        }
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
export default cloneBrainProperty; 