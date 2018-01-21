/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constructors_brain_js__ = __webpack_require__(6);
//import testFunc from './test.js';


onmessage = function(e) {
	//testFunc();
	//console.log(e.data[0])
	var products = [];
	for (var i1 = 0; i1 < e.data[0]; i1++) {
		var brain = new __WEBPACK_IMPORTED_MODULE_0__constructors_brain_js__["a" /* default */](20, 2);
		brain.generate();
	}
	postMessage(e.data[1]);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getRandomNumber(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
/* harmony default export */ __webpack_exports__["a"] = (getRandomNumber);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getrandomdecimal_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getrandomnumber_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logb_js__ = __webpack_require__(8);




function getRandomLowNumber(min=0, max=100, factor=0.9) {
	var base = 1.0 / factor;
		var evtcnt = Math.floor(Math.pow(base, max-min+1) - 1) / (base-1);
		var rndnum = Object(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber_js__["a" /* default */])(1, evtcnt);
		var expflr = Math.floor(Object(__WEBPACK_IMPORTED_MODULE_2__logb_js__["a" /* default */])((rndnum-1) * (base-1) + 1, base));
		var rndres = max - expflr + min;
        return rndres;
}
/* harmony default export */ __webpack_exports__["a"] = (getRandomLowNumber);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getRandomDecimal(min,max){
    return Math.random()*(max-min)+min;
}
/* harmony default export */ __webpack_exports__["a"] = (getRandomDecimal);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__connection_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_isnumber_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functions_getrandomnumber_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__functions_getrandomdecimal_js__ = __webpack_require__(3);






class Neuron {
  constructor(brain, type) {
    this.type = type;
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceNeurons[this.brain.counter] = this;
    this.brain.layers[type][this.brain.counter] = this;
    this.active = true;
    this.id = brain.counter;
    this.weight = 2;
    this.connected = {};
    this.connections = {};
    this.recentCharges = [];
    this.memory = Object(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber_js__["a" /* default */])(1, 10, 0.5);
    //console.log('Memory', this.memory)
    for (let i = 0; i < this.memory; i++){
      this.recentCharges.push(Object(__WEBPACK_IMPORTED_MODULE_4__functions_getrandomdecimal_js__["a" /* default */])(0, 1));
    }
    this.polarization = Object(__WEBPACK_IMPORTED_MODULE_4__functions_getrandomdecimal_js__["a" /* default */])(0, 1);
    this.depolarizationRate = 0.1;
    this.chargeRate = Object(__WEBPACK_IMPORTED_MODULE_4__functions_getrandomdecimal_js__["a" /* default */])(0, 1);
    this.threshold = Object(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber_js__["a" /* default */])(1, 10);
    this.inverse = Object(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomnumber_js__["a" /* default */])(0, 1);
    this.bias = null;
    this.recentCharge = null;
    this.bindMethods(this);
    var initialChildrenCount = Object(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber_js__["a" /* default */])(1, Object.keys(this.brain.globalReferenceNeurons).length, 0.65);
    var neurons = Object.values(this.brain.globalReferenceNeurons);
    //if (this.id === 4) {
    //  console.log('FIRST', neurons);
    //  throw 'stop';
    //}
    for (let i = 0; i < initialChildrenCount; i++) {
      let child = neurons[Math.floor(Math.random() * neurons.length)];
      this.connect(child);
    }
  }

  bindMethods(self) {
    self.connect = this.connect.bind(self);
    self.measure = this.measure.bind(self);
    self.delete = this.delete.bind(self);
    self.transmit = this.transmit.bind(self);
  }

  // Alternate brain structuring system

  ///*
  test() {
    //console.log('Connecting neuron ' + this.id + ' to neuron ' + target.id);
    if ((Object.keys(this.connected).length === 0 || Object.keys(this.connections).length === 0) && this.type != 'input' && this.type != 'output') {
      this.delete();
    }
  };
  //*/

  connect(target) {
    return new __WEBPACK_IMPORTED_MODULE_0__connection_js__["a" /* default */](this.brain, this, target);
    //console.log('Connecting neuron ' + this.id + ' to neuron ' + target.id);
  };
  delete() {
    this.brain.deleteNeuron(this.id);
  }
  measure() {
    return this.bias;
  }
  transmit(charge, time) {
    var total = 0;
    for (let i = 0; i < this.recentCharges.length; i++) {
      total += this.recentCharges[i];
    }
    var bias = total / this.recentCharges.length;
    this.bias = bias;
    this.recentCharges.push(charge);
    if (this.recentCharges.length > this.memory) {
      this.recentCharges.splice(0, 1);
    }
    this.recentCharge = charge;
    //this.polarization += charge * this.chargeRate;
    //if (this.polarization >= this.threshold) {
    //this.polarization = 0;
    Object.values(this.connections).forEach(connection => {
      connection.activate(charge, time);
    });
    //}
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Neuron);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getRandomProperty(obj) {
    //console.log('Getting random property:');
    //console.log(obj);
    if (obj) {
        var keys = Object.keys(obj);
        //console.log(keys);
        var num = keys.length * Math.random() << 0;
        //console.log(num);
        //console.log('Grp successful.');
        //console.log(obj[keys[num]]);
        return obj[keys[num]];
    } else {
        throw ('Null or undefined object passed to grp.');
    }
}
/* harmony default export */ __webpack_exports__["a"] = (getRandomProperty);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__neuron_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_mutate_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functions_getrandomnumber_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__functions_createstructure_js__ = __webpack_require__(12);






var list = {};
var times = 1000000;

for (let i = 1; i < times; i++) {
  var number = Object(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber_js__["a" /* default */])(1, 100, 0.5);
  if (typeof list[number] == 'number') {
    list[number]++;
  } else {
    list[number] = 1;
  }
}

console.log('List: ', list);

class Brain {
  constructor(inputSize, outputSize) {
    this.bindMethods(this);
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.layers = {};
    this.layers.input = {};
    this.layers.hidden = {};
    this.layers.output = {};
    this.counter = 0;
    this.globalReferenceNeurons = {};
    this.globalReferenceConnections = {};
    //this.score = 0;
    this.activations = 0;
    this.mutationRate = 1;


    for (let i1 = 0; i1 < outputSize; i1++) {
      new __WEBPACK_IMPORTED_MODULE_0__neuron_js__["a" /* default */](this, 'output');
    }
    for (let i1 = 0; i1 < Object(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber_js__["a" /* default */])(Math.round((inputSize + outputSize) / 4), Math.round((inputSize + outputSize) / 2)); i1++) {
      new __WEBPACK_IMPORTED_MODULE_0__neuron_js__["a" /* default */](this, 'hidden');
    }
    for (let i1 = 0; i1 < inputSize; i1++) {
      new __WEBPACK_IMPORTED_MODULE_0__neuron_js__["a" /* default */](this, 'input');
    }
    for (let prop in this.layers.hidden) {
      this.layers.hidden[prop].test();
    }


    //create(this, 'input', 0, inputSize);
    //create(this, 'hidden', 0, 10); //getRandomLowNumber(Math.round((inputSize + outputSize) / 2), ((inputSize + outputSize) / 4)));
    //create(this, 'output', 0, 2);
    //console.log('Brain', this)

    function create(brain, type, count, max) {
      if (count < max) {
        count++;
        new __WEBPACK_IMPORTED_MODULE_0__neuron_js__["a" /* default */](brain, type);
        create(brain, type, count, max);
      }
    }

  }
  bindMethods(self) {
    self.deleteNeuron = this.deleteNeuron.bind(self);
    self.deleteConnection = this.deleteConnection.bind(self);
    self.input = this.input.bind(self);
    self.generate = this.generate.bind(self);
    self.resetLimiters = this.resetLimiters.bind(self);
    self.getAllNeurons = this.getAllNeurons.bind(self);
    self.getAllConnections = this.getAllConnections.bind(self);
  }
  getAllNeurons() {
    return Object.values(this.globalReferenceNeurons);
  }
  getAllConnections() {
    return Object.values(this.globalReferenceConnections);
  }
  resetLimiters() {
    //this.getAllNeurons().forEach(neuron => {
    //  neuron.resistance = 0;
    //});
    this.getAllConnections().forEach(connection => {
      connection.energy = 100;
    });
  }
  input(array, time) {
    //console.log('Brain input', array, time)
    Object.values(this.layers.input).forEach((input, index) => {
      input.transmit(array[index], time);
    });
    this.resetLimiters();
    return Object.values(this.layers.output).map(neuron => {
      //console.log('Brain output', neuron.id, neuron.measure())
      return neuron.measure();
    });

  }
  deleteConnection(connectionId) {
    if (this.globalReferenceConnections.hasOwnProperty(connectionId)) {
      let connection = this.globalReferenceConnections[connectionId];
      let source = connection.source;
      let target = connection.target;
      if (source) {
        if (source.connections[connectionId]) {
          delete source.connections[connectionId];
        }
      } else {
        console.log('!!! [ANOMALY] Connection was deleted but had no source.');
      }
      if (target) {
        if (target.connected[connectionId]) {
          delete target.connected[connectionId];
        }
      } else {
        console.log('!!! [ANOMALY] Connection was deleted but had no target.');
      }
      delete this.globalReferenceConnections[connectionId];
    }
  }
  deleteNeuron(neuronId) {
    if (this.globalReferenceNeurons.hasOwnProperty(neuronId)) {
      let neuron = this.globalReferenceNeurons[neuronId];
      Object.values(neuron.connections).concat(Object.values(neuron.connected)).forEach(connection => {
        connection.delete();
      });
      delete this.globalReferenceNeurons[neuronId];
    }
  }
  generate() {
    this.activations = 0;
    //console.log('Current mutation rate: ', this.mutationRate);
    //console.log('Mutation rate mutationRateGrowth: ', this.mutationRateGrowth);
    this.mutationRate = Object(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber_js__["a" /* default */])(1, 100, 0.75); //change the max to be based on the current complexity of the network
    //console.log('New mutation rate: ', this.mutationRate);
    //console.log(this.mutationRate);
    Object(__WEBPACK_IMPORTED_MODULE_1__functions_mutate_js__["a" /* default */])(this.mutationRate, this);
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Brain);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_getrandomnumber_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_getrandomlownumber_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal_js__ = __webpack_require__(3);




class Connection {
  constructor(brain, source, target) {
    if (typeof target == 'object' && target.constructor.name == 'Neuron' && typeof source == 'object' && source.constructor.name == 'Neuron' && brain.constructor.name == 'Brain') {
      if (!(source.type == 'input' && target.type == 'input') && !(source.type == 'output' && target.type == 'output') && target.id != source.id && source.type != 'output') {
        //console.log('Connection initiated: source id' + source.id + ', target id: ' + target.id);
        this.brain = brain;
        this.brain.counter++;
        this.brain.globalReferenceConnections[this.brain.counter] = this;
        //console.log('Assigned Connection #', this.brain.counter, '[', this,'] from Neuron # ', source.id, '[', source,'] -> Neuron # ', target.id, '[', target, ']');
        this.active = true;
        this.id = brain.counter;
        this.bias = Object(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal_js__["a" /* default */])(0, 1);
        this.source = source;
        this.target = target;
        this.recentCharges = [];
        this.memory = Object(__WEBPACK_IMPORTED_MODULE_1__functions_getrandomlownumber_js__["a" /* default */])(1, 10, 0.5);
        //console.log(this.memory)
        for (let i = 0; i < this.memory; i++) {
          this.recentCharges.push(Object(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal_js__["a" /* default */])(0, 1));
        }
        this.deresistanceRate = Object(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal_js__["a" /* default */])(0, 1);
        this.resistanceGain = Object(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal_js__["a" /* default */])(0, 0.001, 0.5);
        this.resistance = 0;
        this.energy = 100;
        this.lastTime = 0;
        this.lastCharge = null;
        this.inverse = Object(__WEBPACK_IMPORTED_MODULE_0__functions_getrandomnumber_js__["a" /* default */])(0, 1);

        /*

        -|- -|- -|-              -|- -|- -|-
        |_|_|_|_|_| NEVER FORGET |_|_|_|_|_|

        .................
        ..............................

        source.connections[target.id] = this; // :( 

        [][] https://i.imgur.com/PbSV9DP.png [][]

        RIP Sunday Night Deadline - October 28th, 2017 - October 29th, 2017 -  It was born into a cruel, cruel world with high expectations, and was conquered brutally, meeting none of them.
    
        */

        source.connections[this.id] = this;
        target.connected[this.id] = this;
        this.bindMethods(this);
      }
    } else {
      console.log('!!! ANOMALY neuron failed to make connection because either target, source, or brain was invalid', source, target, brain);
    }
  }
  bindMethods(self) {
    self.updateBias = this.updateBias.bind(self);
    self.activate = this.activate.bind(self);
    self.delete = this.delete.bind(self);
  }
  activate(charge, time) {
    //if (time - this.lastTime > 1000) {
    //this.lastTime = time;
    //this.energy = 1000;
    //}
    this.energy--;
    if (this.energy > 0) {
      if (this.inverse === 1) {
        charge = charge / 2;
      }
      this.brain.activations++;
      this.updateBias(charge);
      if (this.target) {
        if (this.memory > 0) {
          charge = ((charge + charge + this.bias) / 3);
        }
        this.lastCharge = charge;
        this.target.transmit(charge, time);
      }
    }
  }
  delete() {
    this.brain.deleteConnection(this.id);
  }
  updateBias(charge) {
    if (this.active == true) {
      var total = 0;
      this.recentCharges.push(charge);
      if (this.recentCharges.length > this.memory) this.recentCharges.splice(0, 1);
      for (var i1 = 0; i1 < this.recentCharges.length; i1++) {
        total += this.recentCharges[i1];
      }
      this.bias = total / this.recentCharges.length;
    }
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Connection);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function logb(val, base) {
  return Math.log10(val) / Math.log10(base)
}
/* harmony default export */ __webpack_exports__["a"] = (logb);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
/* unused harmony default export */ var _unused_webpack_default_export = (isNumber);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getrandomnumber_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getrandomproperty_js__ = __webpack_require__(5);



var mutationList = [];
Object.keys(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["a" /* default */]).map((key) => {
	for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__mutations_js__["a" /* default */][key].frequency; i++) {
		mutationList.push(key);
	}
});

function mutate(max, child) {
	//console.log('Max mutations: ', max);
	for (let i = 0; i < max; i++) {
		if (mutationList.length > 0) {
			var rand = Object(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber_js__["a" /* default */])(0, mutationList.length - 1);
			var mutation = mutationList[rand];
			//console.log('Debug: ', rand, mutationList, mutation)
			__WEBPACK_IMPORTED_MODULE_0__mutations_js__["a" /* default */][mutation].mutate(child);
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (mutate);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getrandomnumber_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getrandomdecimal_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getrandomlownumber_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constructors_neuron_js__ = __webpack_require__(4);






var mutations = {
  connect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Connecting neurons.');
      var count = Object(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber_js__["a" /* default */])(1, 10);
      for (let i = 0; i < count; i++) {
        (Object(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber_js__["a" /* default */])(0,1) === 0 ? Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.layers.hidden) : Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.layers.input)).connect(
          Object(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber_js__["a" /* default */])(0,1) === 0 ? Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.layers.hidden) : Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.layers.output)
        );
      }
    }
  },
  disconnect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Disconnecting neurons.');
      var count = Object(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber_js__["a" /* default */])(1, 10);
      for (let i = 0; i < count; i++) {
        var connection = Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.globalReferenceConnections);
        if (connection) { /* FUCKUP */
          connection.delete();
        }
      }
    }
  },
  bias: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Biasing connections.');
      var connection = Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.globalReferenceConnections);
      if (connection) {
        connection.bias += Object(__WEBPACK_IMPORTED_MODULE_2__getrandomdecimal_js__["a" /* default */])(0, 1);
        if (connection.bias > 1) connection.bias = 1;
      }
    }
  },
  unbias: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Unbiasing connections.');
      var connection = Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.globalReferenceConnections);
      if (connection) {
        connection.bias -= Object(__WEBPACK_IMPORTED_MODULE_2__getrandomdecimal_js__["a" /* default */])(0, 1);
        if (connection.bias < 0) connection.bias = 0;
      }
    }
  },
  add: { //add a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Adding neurons.');
      var count = Object(__WEBPACK_IMPORTED_MODULE_3__getrandomlownumber_js__["a" /* default */])(1, 10);
      for (let i = 0; i < count; i++) {
        var neuron = new __WEBPACK_IMPORTED_MODULE_4__constructors_neuron_js__["a" /* default */](brain, 'hidden');
      }
    }
  },
  remove: { //remove a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Removing neurons.');
      var count = Object(__WEBPACK_IMPORTED_MODULE_3__getrandomlownumber_js__["a" /* default */])(1, 10);
      for (let i = 0; i < count; i++) {
          var neuron = Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.layers.hidden);
          neuron.delete();
      }
    }
  },
  fillMemory: { //add memory capacity
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Filling memory.');
      var neuron = Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.globalReferenceNeurons);
      neuron.memory += 1;
    }
  },
  drainMemory: { //shorten memory capacity
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Draining memory');
      var neuron = Object(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty_js__["a" /* default */])(brain.globalReferenceNeurons);
      neuron.memory -= 1;
      if (neuron.memory < 1) {
        neuron.memory = 1;
      }
    }
  },
  /*
  polarize: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.polarization += getRandomDecimal(0, 1);
      if (neuron.polarization > 1) {
        neuron.polarization = 1;
      }
    }
  },
  depolarize: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.polarization -= getRandomDecimal(0, 1);
      if (neuron.polarization < 0) {
        neuron.polarization = 0;
      }
    }
  },
  excite: { //lower action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.threshold += getRandomDecimal(0, 1);
      if (neuron.threshold > 1) {
        neuron.threshold = 1;
      }
    }
  },
  calm: { //raise action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.threshold -= getRandomDecimal(0, 1);
      if (neuron.threshold < 0) {
        neuron.threshold = 0;
      }
    }
  },
  charge: { //raise action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.chargeRate -= getRandomDecimal(0, 1);
      if (neuron.chargeRate < 0) {
        neuron.chargeRate = 0;
      }
    }
  },
  decharge: { //raise action threshold
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      var neuron = getRandomProperty(brain.globalReferenceNeurons);
      neuron.chargeRate -= getRandomDecimal(0, 1);
      if (neuron.chargeRate < 0) {
        neuron.chargeRate = 0;
      }
    }
  }
  */
};
/* harmony default export */ __webpack_exports__["a"] = (mutations);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function createStructure(brain){
  var output = [];
  Object.values(brain.globalReferenceNeurons).forEach(neuron=>{
    if (!output[neuron.layer]) {
      output[neuron.layer] = {};
    }
    output[neuron.layer][neuron.id] = neuron;
  });
  return output;
}
/* unused harmony default export */ var _unused_webpack_default_export = (createStructure);


/***/ })
/******/ ]);