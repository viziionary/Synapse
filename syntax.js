// basic creation and usage of a network
var network1 = new Network(4, 4, (brain) => {      // define a network
	var output = brain.input([0, 0, 0, 0]);        // exchange inputs and outputs with the nework until ready to score
	var score = output.reduce((a, b) => a + b);    // score the result
	return score;                                  // return the score so Synapse knows how well the network being tested performed
});

var network2 = new Network(4, 4, (brain) => {
	var output = brain.input([0, 0, 0, 0]);
	var score = output.reduce((a, b) => a + b);
	return score;
});

var network3 = new Network(4, 4, (brain) => {
	var output = brain.input([0, 0, 0, 0]);
	var score = output.reduce((a, b) => a + b);
	return score;  
});

// modifiers accept an input array like networks, but produce an output based on a function rather than a neural structure
var modifier1 = new Modifier((input) => { 
	var output = input.forEach((int) => int + 1);
	return output;
});

var modifier2 = new Modifier((input) => {
	var output = input.forEach((int) => int + 2);
	return output;
});

// mind syntax - for more complex and interesting applications, multiple networks can be joined and fitted with processor functions which manipulate data manually within the mind. 
network1.feed(network2);
network2.feed(modifier1);
modifier1.feed(network3);
network3.feed(modifier2);
var output = network1.input([0, 0, 0, 0]); // [0, 0, 0, 0] => network1 => network2 => modifier1 => network3 => modifier2 => output

// or shorthand:
network1.feed(network2).feed(modifier1).feed(network3).feed(modifier2);
var output = network1.input([0, 0, 0, 0]);

// in addition to feeding one network into another, it's sometimes desirable to fuse two or more networks together
network1.fuse(network2, network3);
var output = network1.input([0, 0, 0, 0]); // now network1, network2, and network3 will each individually handle inputs to network1 and the most common output will be selected, or, if no winner is clear, network1 will win by default. 

// this is useful in cases where, in the process of training, you established multiple networks that succeeded in accomplishing a task in different ways and you want to leverage each network's opinion. 
// in the above example if network 1, 2, and 3 each arrive at different conclusions (outputs), network1's output will be used, but if both network 2 and 3 agree on a particular choice differing from network 1, their decision will be used. 