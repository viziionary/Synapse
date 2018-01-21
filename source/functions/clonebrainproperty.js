import Connection from '../constructors/connection.js';
import Neuron from '../constructors/neuron.js';
import Brain from '../constructors/brain.js';
var cloneBrainProperty = function clone(sourceProperty, clonedBrain = null, neurons, connections, parent = null, propertyName = null) {
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
        if (!connections[sourceProperty.id]) {
            clonedProperty = new Connection(clonedBrain, sourceProperty.source, sourceProperty.target);
            connections[sourceProperty.id] = clonedProperty;
        } else {
            clonedProperty = connections[sourceProperty.id];
        }
    } else {
        //console.log('Assigning key ' + propertyName + ' with value ', sourceProperty, ' to object ', parent)
        parent[propertyName] = sourceProperty;
    }

    for (let prop in sourceProperty) {
        if (sourceProperty.hasOwnProperty(prop)) {
            if (typeof sourceProperty[prop] == 'object' && sourceProperty[prop] != null && !neurons[sourceProperty[prop].id] && !connections[sourceProperty[prop].id] && !(sourceProperty[prop] instanceof Brain)) {
                clonedProperty[prop] = clone(sourceProperty[prop], clonedBrain, neurons, connections, clonedProperty, prop);
            }
        }
    }
    return clonedProperty;
};
export default cloneBrainProperty;