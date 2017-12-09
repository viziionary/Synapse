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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getRandomNumber(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
/* harmony default export */ __webpack_exports__["a"] = (getRandomNumber);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getRandomDecimal(min,max){
    return Math.random()*(max-min)+min;
}
/* harmony default export */ __webpack_exports__["a"] = (getRandomDecimal);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getrandomdecimal__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getrandomnumber__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logb__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__logb__);




function getRandomLowNumber(min=0, max=100, factor=0.9) {
	var base = 1.0 / factor;
		var evtcnt = Math.floor(Math.pow(base, max-min+1) - 1) / (base-1);
		var rndnum = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber__["a" /* default */])(1, evtcnt);
		var expflr = Math.floor(__WEBPACK_IMPORTED_MODULE_2__logb___default()((rndnum-1) * (base-1) + 1, base));
		var rndres = max - expflr + min;
        return rndres;
}
/* harmony default export */ __webpack_exports__["a"] = (getRandomLowNumber);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__connection__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_isnumber__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functions_getrandomnumber__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__functions_getrandomdecimal__ = __webpack_require__(1);






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
    this.memory = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber__["a" /* default */])(1, 10, 0.5);
    //console.log('Memory', this.memory)
    for (let i = 0; i < this.memory; i++){
      this.recentCharges.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__functions_getrandomdecimal__["a" /* default */])(0, 1));
    }
    this.polarization = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__functions_getrandomdecimal__["a" /* default */])(0, 1);
    this.depolarizationRate = 0.1;
    this.chargeRate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__functions_getrandomdecimal__["a" /* default */])(0, 1);
    this.threshold = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber__["a" /* default */])(1, 10);
    this.inverse = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomnumber__["a" /* default */])(0, 1);
    this.bias = null;
    this.recentCharge = null;
    this.bindMethods(this);
    var initialChildrenCount = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber__["a" /* default */])(1, Object.keys(this.brain.globalReferenceNeurons).length, 0.65);
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
    return new __WEBPACK_IMPORTED_MODULE_0__connection__["a" /* default */](this.brain, this, target);
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function findNewPoint(x, y, angle, distance) {
	var result = {};
	result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
	result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);
	return result;
}
/* harmony default export */ __webpack_exports__["a"] = (findNewPoint);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getDistance(point1, point2) {
	return Math.hypot(point2.x - point1.x, point2.y - point1.y);
	//var a = point1.x - point2.x
	//var b = point1.y - point2.y
	//return Math.sqrt(a * a + b * b);
}
/* harmony default export */ __webpack_exports__["a"] = (getDistance);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function drawLink(x1, y1, x2, y2, ctx, connection) {
	ctx.strokeStyle = '#ffffff';
	if (connection.energy < 0) {
		ctx.strokeStyle = '#c40000';
	} else if (connection.lastCharge >= 0.5){
		ctx.strokeStyle = '#6e69ff';
	} else if (connection.lastCharge < 0.5){
		ctx.strokeStyle = '#69ff7a';
	}
	connection.lastCharge == null;

	ctx.lineWidth = 0.5;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
/* harmony default export */ __webpack_exports__["a"] = (drawLink);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__neuron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_mutate_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functions_getrandomnumber__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__functions_createstructure__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__functions_createstructure___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__functions_createstructure__);






var list = {};
var times = 1000000;

for (let i = 1; i < times; i++) {
  var number = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber__["a" /* default */])(1, 100, 0.5);
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
      new __WEBPACK_IMPORTED_MODULE_0__neuron__["a" /* default */](this, 'output');
    }
    for (let i1 = 0; i1 < __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber__["a" /* default */])(Math.round((inputSize + outputSize) / 4), Math.round((inputSize + outputSize) / 2)); i1++) {
      new __WEBPACK_IMPORTED_MODULE_0__neuron__["a" /* default */](this, 'hidden');
    }
    for (let i1 = 0; i1 < inputSize; i1++) {
      new __WEBPACK_IMPORTED_MODULE_0__neuron__["a" /* default */](this, 'input');
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
        new __WEBPACK_IMPORTED_MODULE_0__neuron__["a" /* default */](brain, type);
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
    this.mutationRate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__functions_getrandomlownumber__["a" /* default */])(1, 100, 0.75); //change the max to be based on the current complexity of the network
    //console.log('New mutation rate: ', this.mutationRate);
    //console.log(this.mutationRate);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_mutate_js__["a" /* default */])(this.mutationRate, this);
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Brain);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_getrandomnumber__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_getrandomlownumber__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal__ = __webpack_require__(1);




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
        this.bias = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal__["a" /* default */])(0, 1);
        this.source = source;
        this.target = target;
        this.recentCharges = [];
        this.memory = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_getrandomlownumber__["a" /* default */])(1, 10, 0.5);
        //console.log(this.memory)
        for (let i = 0; i < this.memory; i++) {
          this.recentCharges.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal__["a" /* default */])(0, 1));
        }
        this.deresistanceRate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal__["a" /* default */])(0, 1);
        this.resistanceGain = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__functions_getrandomdecimal__["a" /* default */])(0, 0.001, 0.5);
        this.resistance = 0;
        this.energy = 100;
        this.lastTime = 0;
        this.lastCharge = null;
        this.inverse = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functions_getrandomnumber__["a" /* default */])(0, 1);

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
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_entity__ = __webpack_require__(15);


function Engine(run, child, tick, targetScore, maxGens, surroundings, self, bounds, width, height, target, viewer) {
	var generationCount = 0;
	var entity = new __WEBPACK_IMPORTED_MODULE_0__engine_entity__["a" /* default */](run, surroundings, self, target, viewer);
	this.simulate = function sim() {
		return new Promise((resolve, reject) => {
			var contents = [];
			var endResult;
			//var entity = new Entity(run, surroundings, self);
			var maxTime = 1500;
			var time = 0;
			var timer = setInterval(() => {
				time += tick;
				entity.age = time;
				var result = entity.think(bounds, width, height, time, child);
				//entity.surroundings = result.surroundings;
				//entity.self = result.self;
				if (result.state == 'complete' || time > maxTime) {
					clearInterval(timer);
					resolve(result.score);
				}
			}, tick);
		});
	}
}
/* harmony default export */ __webpack_exports__["a"] = (Engine);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer_drawnode__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer_drawlink__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_findnewpoint__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__source_functions_getrandomnumber__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__viewer_rendernerve__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__viewer_renderobject__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__viewer_renderline__ = __webpack_require__(20);








var debugHistory = [];

//const visualizeLayers = require('./viewer/vizualizelayers');
class Viewer {
  constructor(canvas1, canvas2, canvas3, canvas4, brain) {
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.canvas3 = canvas3;
    this.canvas4 = canvas4;
    this.context1 = canvas1.getContext('2d');
    this.context2 = canvas2.getContext('2d');
    this.context3 = canvas3.getContext('2d');
    this.context4 = canvas4.getContext('2d');
    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  update(brain) {
    this.brain = brain;
    this.map = false;
    if (brain.map) {
      this.map = brain.map;
    }
  }
  render(entity, surroundings, target) {
    //console.log('Rendering...');
    //console.log(entity);
    //console.log('Debug 2', brain);
    var padding = 10;
    var occupiedCoords = [];
    var brainContext = this.context1;
    var simContext = this.context2;
    var linkContext = this.context3;
    var underLinkContext = this.context4;
    var brainCanvas = this.canvas1;
    var simCanvas = this.canvas2;
    var linkCanvas = this.canvas3;
    var offsetX = simCanvas.getBoundingClientRect().left;
    var offsetY = simCanvas.getBoundingClientRect().top;
    var offsetXAlt = brainCanvas.getBoundingClientRect().left;
    var offsetYAlt = brainCanvas.getBoundingClientRect().top;
    var linkColor = '#253a5b';
    var borderColor = '#253a5b';

    //console.log('x', offsetX);
    //console.log('y', offsetY);

    var self = entity.self;

    // LINK CANVAS RENDERING

    linkContext.clearRect(0, 0, linkCanvas.width, linkCanvas.height);
    underLinkContext.clearRect(0, 0, linkCanvas.width, linkCanvas.height);
    simContext.clearRect(0, 0, simCanvas.width, simCanvas.height);
    brainContext.clearRect(0, 0, brainCanvas.width, brainCanvas.height);

    var points = [];
    for (var i1 = 0; i1 < this.brain.inputSize; i1++) {
      var space = (linkCanvas.width / 2) / this.brain.inputSize;
      var distance = ((i1 + 1) * space) - (0.5 * space) + linkCanvas.width / 4;
      //console.log(distance);
      var point = {
        location: {
          x: distance,
          y: document.body.clientHeight * 0.15
        },
        radius: 5,
        color: '#d0c7ed',
        stroke: '#465893'
      }
      points.push(point);
    }
    for (let i = 0; i < points.length; i++) {
      var angle = (360 / entity.nerveCount) * i;
      var p1 = self.location;
      var p2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__engine_findnewpoint__["a" /* default */])(self.location.x, self.location.y, angle, self.radius);
      var p3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__engine_findnewpoint__["a" /* default */])(p2.x, p2.y, angle, entity.nerves[i].size);
      if (entity.nerves[i].size >= entity.nerveLength * 0.5) {
        linkColor = '#6e69ff';
        borderColor = '#6e69ff';
      } else {
        linkColor = '#69ff7a';
        borderColor = '#69ff7a';
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__viewer_renderobject__["a" /* default */])(linkContext, points[i], false, false, borderColor);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__viewer_renderline__["a" /* default */])(underLinkContext, p3, points[i].location, linkColor, offsetX, offsetY);
    }

    // SIM CANVAS RENDERING

    for (var i1 = 0; i1 < surroundings.length; i1++) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__viewer_renderobject__["a" /* default */])(simContext, surroundings[i1]);
    }
    for (let i1 in entity.nerves) {
      var angle = (360 / entity.nerveCount) * i1;
      var p1 = self.location;
      var p2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__engine_findnewpoint__["a" /* default */])(self.location.x, self.location.y, angle, self.radius);
      var p3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__engine_findnewpoint__["a" /* default */])(p2.x, p2.y, angle, entity.nerves[i1].size);

      entity.nerves[i1].points = [p2, p3];
      //console.log('Nerves', entity.nerves[i1])
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__viewer_rendernerve__["a" /* default */])(simContext, entity.nerves[i1]);
      var sourcePoint = {
        location: {
          x: p3.x,
          y: p3.y
        },
        radius: 3,
        color: '#859db2',
        stroke: '#859db2'
      }
      if (entity.nerves[i1].size >= entity.nerveLength * 0.5) {
        linkColor = '#6e69ff';
        borderColor = '#6e69ff';
      } else {
        linkColor = '#69ff7a';
        borderColor = '#69ff7a';
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__viewer_renderobject__["a" /* default */])(linkContext, sourcePoint, offsetX, offsetY, linkColor);
    }
    //console.log(self);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__viewer_renderobject__["a" /* default */])(simContext, self);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__viewer_renderobject__["a" /* default */])(simContext, target);

    // BRAIN CANVAS RENDERING


    var width = brainCanvas.width;
    var height = brainCanvas.height;
    //var structure = visualizeLayers(brain);
    //console.log('Structure', structure)
    //console.log('Brain', brain)
    //var inputList = Object.values(brain.layers.input);
    var hiddenList = Object.values(this.brain.layers.hidden);
    //var outputList = Object.values(brain.layers.output);
    //console.log('Map', this.map)
    if (!this.map) {
      this.map = {};
      //console.log('Input', inputList);
      //console.log('Hidden', hiddenList);
      //console.log('Output', outputList);
      Object.values(this.brain.layers.input).forEach((inputNeuron, index, inputArray) => {
        this.map[inputNeuron.id] = {
          x: (width / inputArray.length) * (index + 0.5),
          y: padding
        };

      });
      // for (let i = 0; i < inputList.length; i++) {
      //   var x = (width / inputList.length) * (i + 0.5);
      //   var y = padding;
      //   this.map[inputList[i].id] = {
      //     x: x,
      //     y: y
      //   };
      // }
      Object.values(this.brain.layers.output).forEach((outputNeuron, index, outputArray) => {
        this.map[outputNeuron.id] = {
          x: (width / outputArray.length) * (index + 0.5),
          y: height - padding
        };
      });
      // for (let i = 0; i < outputList.length; i++) {
      //   var x = (width / outputList.length) * (i + 0.5);
      //   var y = height - padding;
      //   this.map[outputList[i].id] = {
      //     x: x,
      //     y: y
      //   };
      // }
      Object.values(this.brain.layers.hidden).forEach((hiddenNeuron, index, hiddenArray) => {
        this.map[hiddenNeuron.id] = {
          x: (padding * 4) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__source_functions_getrandomnumber__["a" /* default */])(0, width - (padding * 8)),
          y: (padding * 4) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__source_functions_getrandomnumber__["a" /* default */])(0, height - (padding * 8))
        }
      });
      // for (let i = 0; i < hiddenList.length; i++) {
      //   var x = ;
      //   var y = ;
      //   this.map[hiddenList[i].id] = {
      //     x: x,
      //     y: y
      //   };
      // }
    }
    Object.values(this.brain.layers.input).forEach((inputNeuron, index, inputArray) => {
      //console.log('Debug 1')
      if (entity.nerves[index].size >= entity.nerveLength * 0.5) {
        linkColor = '#6e69ff';
      } else {
        linkColor = '#69ff7a';
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__viewer_renderline__["a" /* default */])(underLinkContext, this.map[inputNeuron.id], points[index].location, linkColor, offsetXAlt, offsetYAlt);

    });
    for (let prop1 in this.brain.globalReferenceConnections) {
      var connection = this.brain.globalReferenceConnections[prop1];
      if (connection.hasOwnProperty('source') && connection.hasOwnProperty('target') && typeof connection.source == 'object' && connection.source.constructor.name == 'Neuron' && typeof connection.target == 'object' && connection.target.constructor.name == 'Neuron') {
        //console.log('Map', this.map);
        if (this.map[connection.source.id] && this.map[connection.target.id]) {
          //console.log('Connection', connection);
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__viewer_drawlink__["a" /* default */])(this.map[connection.source.id].x, this.map[connection.source.id].y, this.map[connection.target.id].x, this.map[connection.target.id].y, brainContext, connection);
        }
      } else {
        if (typeof connection !== 'object' || connection.constructor.name !== 'Connection') {
          console.log('Connection not correct type of object', onnection);
          //throw new Error('Connection is not a connection :(')
        }
        if (!connection.hasOwnProperty('source') || typeof connection.source !== 'object' || connection.source.constructor.name !== 'Neuron') {
          console.log('Connection has missing or invalid source', connection);
          //throw new Error('connection does not have a valid source :(');
        }
        if (!connection.hasOwnProperty('target') || typeof connection.target !== 'object' || connection.target.constructor.name !== 'Neuron') {
          console.log('Connection has missing or invalid target', connection);
          //throw new Error('connection does not have a valid target :(');
        };
        console.log('!!! ANOMALY connection was missing vital property, interaction skipped.')
      }
    }
    for (var prop in this.map) {
      if (this.brain.globalReferenceNeurons[prop]) {
        //console.log('Debug 1', brain.globalReferenceNeurons[prop])
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__viewer_drawnode__["a" /* default */])(this.brain.globalReferenceNeurons[prop], brainContext, this.map[prop].x, this.map[prop].y, this.brain.globalReferenceNeurons[prop]);
      }
    }
    this.brain.map = this.map;
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Viewer);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Synapse = __webpack_require__(23);
module.exports = Synapse;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__source_index__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__source_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__source_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources_engine__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resources_viewer__ = __webpack_require__(11);



var Worker = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"worker-loader!worker.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
var simWorker = new Worker;
//const simWorker = new Worker('worker.js');
setTimeout(function() {
	simWorker.postMessage('hi');
	console.log('worker created');
	simWorker.onmessage = function(e) {
		result.textContent = e.data;
		console.log('Message received from worker: ', result.textContent);
	};
}, 10);


window.addEventListener("load", function() {
	var canvas1 = document.getElementById('brain');
	var canvas2 = document.getElementById('environment');
	var canvas3 = document.getElementById('overlay');
	var canvas4 = document.getElementById('underlay');
	var viewer = new __WEBPACK_IMPORTED_MODULE_2__resources_viewer__["a" /* default */](canvas1, canvas2, canvas3, canvas4);
	var counter = 0;
	var network = new __WEBPACK_IMPORTED_MODULE_0__source_index___default.a(20, 2, async(run, child) => {
		viewer.update(child);
		canvas3.width = document.body.clientWidth;
		canvas3.height = document.body.clientHeight;
		canvas4.width = document.body.clientWidth;
		canvas4.height = document.body.clientHeight;
		var width = canvas1.width;
		var height = canvas1.height;
		var bounds = [
			[{
				x: 0,
				y: 0
			}, {
				x: canvas2.width,
				y: 0
			}],
			[{
				x: canvas2.width,
				y: 0
			}, {
				x: canvas2.width,
				y: canvas2.height
			}],
			[{
				x: 0,
				y: canvas2.height
			}, {
				x: canvas2.width,
				y: canvas2.height
			}],
			[{
				x: 0,
				y: 0
			}, {
				x: 0,
				y: canvas2.height
			}]
		];
		var targetScore = 1000;
		var surroundings = [];
		for (let i1 = 0; i1 < 5; i1++) {
			for (let i2 = 0; i2 < 5; i2++) {
				surroundings.push({
					location: {
						x: (width * 0.25) * i1,
						y: (height * 0.25) * i2
					},
					radius: 15,
					color: '#388751',
					stroke: '#4fad8b'
				});
			}
		}
		var self = {
			radius: 30,
			location: {
				x: 50,
				y: 50
			},
			color: '#7a5ebc',
			stroke: '#bc82e5'
		}
		var target = {
			location: {
				x: width * 0.875,
				y: height * 0.875
			},
			radius: 30,
			color: '#e59f44',
			stroke: '#ead379'
		};
		var engine = new __WEBPACK_IMPORTED_MODULE_1__resources_engine__["a" /* default */](run, child, 1, 0, 10000, surroundings, self, bounds, width, height, target, viewer);
		var score = await engine.simulate();
		counter++;
		if (counter > 100000) {
			console.log('Ended without reaching target score: ' + targetScore);
			return false;
		}
		if (score > targetScore) {
			console.log('Done!');
			console.log(child);
			return false;
		} else {
			return score;
		}
	});
	network.initiate();
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function circleInBounds(width, height, circle) {
	var x = circle.location.x;
	var y = circle.location.y;
	if (x > width - circle.radius || x < 0 + circle.radius || y > height - circle.radius || y < 0 + circle.radius) {
		return false;
	} else {
		return true;
	}
}
/* harmony default export */ __webpack_exports__["a"] = (circleInBounds);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__findnewpoint__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity_interceptoncircle__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entity_linesegmentintersection__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getdistance__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interceptcircles__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__circleinbounds__ = __webpack_require__(14);







var debugHistory = [];

class Entity {
  constructor(run, surroundings, self, target, viewer) {
    this.run = run;
    this.age = 0;
    this.target = target;
    this.origin = {
      x: self.location.x,
      y: self.location.y
    };
    this.surroundings = surroundings;
    this.self = self;
    this.viewer = viewer;
    this.nerveCount = 20;
    this.nerveLength = 50;
    this.nerves = [];
    for (var i1 = 0; i1 < this.nerveCount; i1++) {
      var angle = (360 / this.nerveCount) * i1;
      var p1 = self.location;
      var p2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__findnewpoint__["a" /* default */])(self.location.x, self.location.y, angle, self.radius);
      var p3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__findnewpoint__["a" /* default */])(p2.x, p2.y, angle, this.nerveLength);
      var nerve = {
        points: [p2, p3],
        size: 50 //this.nerveLength
      };
      this.nerves[i1] = nerve;
    }
    this.bindMethods(this);
  }
  bindMethods(self) {
    self.think = this.think.bind(self);
  }
  think(bounds, width, height, time, child) {
    var reset = true;
    var input = [];
    for (var i1 = 0; i1 < this.nerveCount; i1++) {
      var angle = (360 / this.nerveCount) * i1;
      var p1 = this.self.location;
      var p2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__findnewpoint__["a" /* default */])(this.self.location.x, this.self.location.y, angle, this.self.radius);
      var p3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__findnewpoint__["a" /* default */])(p2.x, p2.y, angle, this.nerveLength);
      var nerve = {
        points: [p2, p3],
        size: 50 //this.nerveLength
      };
      this.nerves[i1] = nerve;
    }
    for (var i1 = 0; i1 < this.nerveCount; i1++) {
      var lineCollisions = bounds.map(bound => {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__entity_linesegmentintersection__["a" /* default */])(this.nerves[i1].points, bound);
      }).filter(distance => {
        return distance && distance < 50;
      });
      var circleCollisions = this.surroundings.map(obstacle => {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__entity_interceptoncircle__["a" /* default */])(this.nerves[i1].points[0], this.nerves[i1].points[1], obstacle.location, obstacle.radius);
      }).filter(distance => {
        return distance && distance < 50;
      });
      var totalCollisions = circleCollisions.concat(lineCollisions);
      if (totalCollisions.length > 0) {
        this.nerves[i1].size = Math.min(...totalCollisions);
      }
    }
    var output = this.run(this.nerves.map(nerve => nerve.size / 50), time);
    var self = this.self;
    var surroundings = this.surroundings;
    ///*
    var speed = 7;
    if (output[0] >= 0.5) this.self.location.x += (0.5 - output[0]) * speed;
    if (output[0] < 0.5) this.self.location.x -= (output[0] - 0.5) * speed;
    if (output[1] >= 0.5) this.self.location.y += (0.5 - output[1]) * speed;
    if (output[1] < 0.5) this.self.location.y -= (output[1] - 0.5) * speed;
    //*/

    /*
    var speed = 2;
    if (output[0] >= 0.5) this.self.location.x += speed;
    if (output[0] < 0.5) this.self.location.x -= speed;
    if (output[1] >= 0.5) this.self.location.y += speed;
    if (output[1] < 0.5) this.self.location.y -= speed;
    */

    var distanceFromTarget = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__getdistance__["a" /* default */])(this.self.location, this.target.location);
    var distanceFromStart = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__getdistance__["a" /* default */])(this.origin, this.self.location);
    var score = distanceFromStart + (distanceFromTarget * -1); //- Math.round(entity.age / 10);

    var result = {
      surroundings: surroundings,
      score: score,
      self: this.self
    }
    for (var i1 = 0; i1 < surroundings.length; i1++) {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__interceptcircles__["a" /* default */])(this.self, this.surroundings[i1])) {
        result.state = 'complete';
      }
    }
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__interceptcircles__["a" /* default */])(this.self, this.target)) {
      result.state = 'complete';
    }
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__circleinbounds__["a" /* default */])(width, height, this.self)) {
      result.state = 'complete';
    }
    this.viewer.render(this, this.surroundings, this.target);
    return result;
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Entity);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function interceptOnCircle(p1, p2, c, r) {
    //console.log('Inputs', p1, p2, c, r)
    //p1 is the first line point
    //p2 is the second line point
    //c is the circle's center
    //r is the circle's radius

    var p3 = {
        x: p1.x - c.x,
        y: p1.y - c.y
    }; //shifted line points
    var p4 = {
        x: p2.x - c.x,
        y: p2.y - c.y
    };

    var m = (p4.y - p3.y) / (p4.x - p3.x); //slope of the line
    var b = p3.y - m * p3.x; //y-intercept of line

    var underRadical = Math.pow(r, 2) * Math.pow(m, 2) + Math.pow(r, 2) - Math.pow(b, 2); //the value under the square root sign 

    if (underRadical < 0) {
        //line completely missed
        return null;
    } else {
        var t1 = (-m * b + Math.sqrt(underRadical)) / (Math.pow(m, 2) + 1); //one of the intercept x's
        var t2 = (-m * b - Math.sqrt(underRadical)) / (Math.pow(m, 2) + 1); //other intercept's x
        var i1 = {
            x: t1 + c.x,
            y: m * t1 + b + c.y
        }; //intercept point 1
        var i2 = {
            x: t2 + c.x,
            y: m * t2 + b + c.y
        }; //intercept point 2
        var distance1 = Math.hypot(p1.x - i2.x, p1.y - i2.y);
        var distance2 = Math.hypot(p1.x - i1.x, p1.y - i1.y);
        var lowerBounds = Math.min(distance1, distance2);
        //console.log('Collision', lowerBounds);
        if (lowerBounds < 50) {
            return lowerBounds;
        } else {
            return null;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (interceptOnCircle);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getdistance__ = __webpack_require__(5);


function lineSegmentIntersection(line1, line2) {
	var x1 = line1[0].x;
	var x2 = line1[1].x;
	var x3 = line2[0].x;
	var x4 = line2[1].x;
	var y1 = line1[0].y;
	var y2 = line1[1].y;
	var y3 = line2[0].y;
	var y4 = line2[1].y;
	var a_dx = x2 - x1;
	var a_dy = y2 - y1;
	var b_dx = x4 - x3;
	var b_dy = y4 - y3;
	var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
	var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
	if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
		var collision = {
			x: x1 + t * a_dx,
			y: y1 + t * a_dy
		};
		var distance = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getdistance__["a" /* default */])(line1[0], collision);
		return distance;
	} else {
		return null;
	}
}
/* harmony default export */ __webpack_exports__["a"] = (lineSegmentIntersection);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function interceptCircles(circle1, circle2) {
	var dx = circle1.location.x - circle2.location.x;
	var dy = circle1.location.y - circle2.location.y;
	var distance = Math.sqrt(dx * dx + dy * dy);
	if (distance < circle1.radius + circle2.radius) {
		return true;
	} else {
		return false;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (interceptCircles);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__source_functions_getrandomnumber__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawlink__ = __webpack_require__(6);


function drawNode(node, ctx, x, y, neuron) {
  //ctx.strokeStyle = '#ffffff';
  //ctx.fillStyle = '#ffffff';
  if (neuron.bias == null) {
    ctx.fillStyle = '#ffffff';
  } else if (neuron.bias >= 0.5) {
    ctx.fillStyle = '#6e69ff';
  } else if (neuron.bias < 0.5){
    ctx.fillStyle = '#69ff7a';
  }
  if (neuron.recentCharge === false) {
    ctx.strokeStyle = '#ffffff';
  } else if (neuron.recentCharge >= 0.5) {
    ctx.strokeStyle = '#6e69ff';
  } else if (neuron.recentCharge < 0.5){
    ctx.strokeStyle = '#69ff7a';
  }
  neuron.recentCharge = null;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
/* harmony default export */ __webpack_exports__["a"] = (drawNode);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function renderLine(context, p1, p2, color, offsetX = 0, offsetY = 0) {
	//console.log('Inputs', p1, p2, color, offsetX, offsetY)
	context.beginPath();
	context.moveTo(p1.x + offsetX, p1.y + offsetY);
	context.lineTo(p2.x, p2.y);
	context.lineWidth = 0.5;
	context.strokeStyle = color;
	context.stroke();
}
/* harmony default export */ __webpack_exports__["a"] = (renderLine);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function renderNerve(context, nerve) {
	var p1 = nerve.points[0];
	var p2 = nerve.points[1];
	context.beginPath();
	context.moveTo(p1.x, p1.y);
	context.lineTo(p2.x, p2.y);
	context.lineWidth = 1;
	context.strokeStyle = '#7a5ebc';
	context.stroke();
}
/* harmony default export */ __webpack_exports__["a"] = (renderNerve);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function renderObject(context, object, offsetX = 0, offsetY = 0, forceColor = false) {
	var x = object.location.x + offsetX;
	var y = object.location.y + offsetY;
	//console.log('render X', x);
	//console.log('render Y', y);
	var radius = object.radius;
	var color = object.color;
	var stroke = object.stroke;
	if (forceColor) {
		stroke = forceColor;
	}
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = stroke;
	context.stroke();
}

/* harmony default export */ __webpack_exports__["a"] = (renderObject);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__brain__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_clonebrain__ = __webpack_require__(24);



class Synapse {
  constructor(inputSize, outputSize, runFunction) {

    //var brain = new Brain(inputSize, outputSize);
    //var child = cloneBrain(brain);
    //brain.score = 100;
    //child.score = 200;
    //brain.score = 100;
    //console.log('Brain score: ' + brain.score);
    //console.log('Child score: ' + child.score);

    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.runFunction = runFunction;
    this.brain = new __WEBPACK_IMPORTED_MODULE_0__brain__["a" /* default */](inputSize, outputSize);
    //console.log('Global Reference Connections:',Object.entries(this.brain.globalReferenceConnections).length,this.brain.globalReferenceConnections);
    this.initiate = this.initiate.bind(this);
    this.getScoredChild = this.getScoredChild.bind(this);
  }
  async initiate() {

    

    if (this.child) {
      this.child = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_clonebrain__["a" /* default */])(this.brain);
      this.child.generate();
    } else {
      var newChild = null;
      for (let i = 0; i < 100; i++) {
        console.log('Searching for Chosen One... [' + i + ']'); // expected execution order
        var childData = await this.getScoredChild(); // debug 2 & 3 should execute here
        //console.log('Debug 6'); // expected execution order
        var child = childData[0];
        var childScore = childData[1];
        child.score = childScore;
        if (newChild) {
          console.log('Comparing top child score [' + newChild.score + '] to tested child score [' + child.score + ']');
        }
        if (newChild === null || newChild.score < child.score) {
          newChild = child;
        }
      }
      console.log('Chosen One:', newChild, 'Score:', newChild.score);
      this.child = newChild;
    }

    var childScore = this.runFunction(this.child.input, this.child);
    if (childScore instanceof Promise) {
      childScore = await childScore;
      //console.log(childScore);
    }
    this.child.score = childScore;
    if (childScore === false) {
      return this.brain;
    } else if (childScore instanceof __WEBPACK_IMPORTED_MODULE_0__brain__["a" /* default */]) {
      this.brain = childScore;
      return this.initiate();
    } else {
      if (this.brain.score) {
        if (this.brain.score < childScore) {
          console.log('EVOLVED from ' + this.brain.score + ' to ' + this.child.score);
          this.brain = this.child;
        }
      } else {
        this.brain = this.child;
        console.log('Brain born with score of ' + brain.score);
      }
      return this.initiate();
    }
    //setTimeout(function(){}, 10);
  }
  async getScoredChild() {
    var child = new __WEBPACK_IMPORTED_MODULE_0__brain__["a" /* default */](this.inputSize, this.outputSize);
    child.generate();
    child = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_clonebrain__["a" /* default */])(child);
    let oldChild = this.child;
    this.child = child;
    var childScore = this.runFunction(child.input, child);
    this.child = oldChild;
    while (childScore instanceof Promise) {
      childScore = await childScore;
    }
    return [child, childScore];
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Synapse);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clonebrainproperty__ = __webpack_require__(25);


function cloneBrain(brain) {
	//console.log('Source Brain: ', brain);
	var clone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__clonebrainproperty__["a" /* default */])(brain);
	//console.log('Cloned Brain: ', clone);
	return clone;
}
/* harmony default export */ __webpack_exports__["a"] = (cloneBrain);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constructors_connection__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constructors_neuron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constructors_brain__ = __webpack_require__(7);



var neurons = {};
var connections = {};
var cloneBrainProperty = function clone(sourceProperty, clonedBrain = null) {
    var clonedProperty = sourceProperty;
    if (sourceProperty instanceof __WEBPACK_IMPORTED_MODULE_2__constructors_brain__["a" /* default */]) {
        if (clonedBrain == null) {
            clonedProperty = new __WEBPACK_IMPORTED_MODULE_2__constructors_brain__["a" /* default */](sourceProperty.inputSize, sourceProperty.outputSize);
            clonedBrain = clonedProperty;
        } else {
            clonedProperty = clonedBrain;
        }
    } else if (sourceProperty instanceof __WEBPACK_IMPORTED_MODULE_1__constructors_neuron__["a" /* default */]) {
        if (!neurons[sourceProperty.id]) {
            clonedProperty = new __WEBPACK_IMPORTED_MODULE_1__constructors_neuron__["a" /* default */](clonedBrain, sourceProperty.type);
            neurons[sourceProperty.id] = clonedProperty;
        } else {
            clonedProperty = neurons[sourceProperty.id];
        }
    } else if (sourceProperty instanceof __WEBPACK_IMPORTED_MODULE_0__constructors_connection__["a" /* default */]) {
        if (!neurons[sourceProperty.id]) {
            clonedProperty = new __WEBPACK_IMPORTED_MODULE_0__constructors_connection__["a" /* default */](clonedBrain, sourceProperty.source, sourceProperty.target);
            connections[sourceProperty.id] = clonedProperty;
        } else {
            clonedProperty = connections[sourceProperty.id];
        }
    }
    if (typeof sourceProperty == 'object' && (!(sourceProperty instanceof __WEBPACK_IMPORTED_MODULE_2__constructors_brain__["a" /* default */]) || clonedBrain == null)) {
        for (let prop in sourceProperty) {
            if (sourceProperty.hasOwnProperty(prop)) {
                clonedProperty[prop] = clone(sourceProperty[prop], clonedBrain);
            }
        }
    }
    return clonedProperty;
};
/* harmony default export */ __webpack_exports__["a"] = (cloneBrainProperty); 

/***/ }),
/* 26 */
/***/ (function(module, exports) {

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
module.exports = createStructure;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
/* unused harmony default export */ var _unused_webpack_default_export = (isNumber);


/***/ }),
/* 28 */
/***/ (function(module, exports) {

function logb(val, base) {
  return Math.log10(val) / Math.log10(base)
}
module.exports = logb;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getrandomnumber__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getrandomproperty__ = __webpack_require__(9);



var mutationList = [];
Object.keys(__WEBPACK_IMPORTED_MODULE_0__mutations__["a" /* default */]).map((key) => {
	for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__mutations__["a" /* default */][key].frequency; i++) {
		mutationList.push(key);
	}
});

function mutate(max, child) {
	//console.log('Max mutations: ', max);
	for (let i = 0; i < max; i++) {
		if (mutationList.length > 0) {
			var rand = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber__["a" /* default */])(0, mutationList.length - 1);
			var mutation = mutationList[rand];
			//console.log('Debug: ', rand, mutationList, mutation)
			__WEBPACK_IMPORTED_MODULE_0__mutations__["a" /* default */][mutation].mutate(child);
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (mutate);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getrandomproperty__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getrandomnumber__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getrandomdecimal__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getrandomlownumber__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constructors_neuron__ = __webpack_require__(3);






var mutations = {
  connect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Connecting neurons.');
      var count = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber__["a" /* default */])(1, 10);
      for (let i = 0; i < count; i++) {
        (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber__["a" /* default */])(0,1) === 0 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.layers.hidden) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.layers.input)).connect(
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber__["a" /* default */])(0,1) === 0 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.layers.hidden) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.layers.output)
        );
      }
    }
  },
  disconnect: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Disconnecting neurons.');
      var count = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getrandomnumber__["a" /* default */])(1, 10);
      for (let i = 0; i < count; i++) {
        var connection = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.globalReferenceConnections);
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
      var connection = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.globalReferenceConnections);
      if (connection) {
        connection.bias += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__getrandomdecimal__["a" /* default */])(0, 1);
        if (connection.bias > 1) connection.bias = 1;
      }
    }
  },
  unbias: {
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Unbiasing connections.');
      var connection = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.globalReferenceConnections);
      if (connection) {
        connection.bias -= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__getrandomdecimal__["a" /* default */])(0, 1);
        if (connection.bias < 0) connection.bias = 0;
      }
    }
  },
  add: { //add a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Adding neurons.');
      var count = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__getrandomlownumber__["a" /* default */])(1, 10);
      for (let i = 0; i < count; i++) {
        var neuron = new __WEBPACK_IMPORTED_MODULE_4__constructors_neuron__["a" /* default */](brain, 'hidden');
      }
    }
  },
  remove: { //remove a neuron
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Removing neurons.');
      var count = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__getrandomlownumber__["a" /* default */])(1, 10);
      for (let i = 0; i < count; i++) {
          var neuron = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.layers.hidden);
          neuron.delete();
      }
    }
  },
  fillMemory: { //add memory capacity
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Filling memory.');
      var neuron = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.globalReferenceNeurons);
      neuron.memory += 1;
    }
  },
  drainMemory: { //shorten memory capacity
    frequencyMod: 0,
    frequency: 1,
    mutate: function(brain) {
      //console.log('Draining memory');
      var neuron = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getrandomproperty__["a" /* default */])(brain.globalReferenceNeurons);
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


/***/ })
/******/ ]);