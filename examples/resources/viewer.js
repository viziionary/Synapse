const drawNode = require('./viewer/drawnode');
const drawLink = require('./viewer/drawlink');
const findNewPoint = require('./engine/findnewpoint');
const getRandomNumber = require('../../source/functions/getrandomnumber');
const renderNerve = require('./viewer/rendernerve');
const renderObject = require('./viewer/renderobject');
const renderLine = require('./viewer/renderline');
//const visualizeLayers = require('./viewer/vizualizelayers');
class Viewer {
  constructor(canvas1, canvas2, canvas3, brain) {
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.canvas3 = canvas3;
    this.context1 = canvas1.getContext('2d');
    this.context2 = canvas2.getContext('2d');
    this.context3 = canvas3.getContext('2d');
    this.render = this.render.bind(this);
    this.map = false;
    if (brain.map) {
      this.map = brain.map;
    }
  }
  render(brain, entity, surroundings, target) {
    //console.log('Debug 2', brain);
    var padding = 10;
    var occupiedCoords = [];
    var brainContext = this.context1;
    var simContext = this.context2;
    var linkContext = this.context3;
    var brainCanvas = this.canvas1;
    var simCanvas = this.canvas2;
    var linkCanvas = this.canvas3;
    var offsetX = simCanvas.getBoundingClientRect().left;
    var offsetY = simCanvas.getBoundingClientRect().top;

    //console.log('x', offsetX);
    //console.log('y', offsetY);

    var self = entity.self;
    
    // SIM CANVAS RENDERING
    
    simContext.clearRect(0, 0, simCanvas.width, simCanvas.height);
    for (var i1 = 0; i1 < surroundings.length; i1++) {
      renderObject(simContext, surroundings[i1]);
    }
    for (let i1 in entity.nerves) {
      var angle = (360 / entity.nerveCount) * i1;
      var p1 = self.location;
      var p2 = findNewPoint(self.location.x, self.location.y, angle, self.radius);
      var p3 = findNewPoint(p2.x, p2.y, angle, entity.nerves[i1].size);
      entity.nerves[i1] = [p2, p3];
      renderNerve(simContext, entity.nerves[i1]);
      var sourcePoint = {
        location: {
          x: p3.x,
          y: p3.y
        },
        radius: 3,
        color: '#859db2',
        stroke: '#859db2'
      }
      renderObject(linkContext, sourcePoint, offsetX, offsetY);
    }
    //console.log(self);
    renderObject(simContext, self);
    renderObject(simContext, target);

    // LINK CANVAS RENDERING

    linkContext.clearRect(0, 0, linkCanvas.width, linkCanvas.height);
    var points = [];
    for (var i1 = 0; i1 < brain.inputSize; i1++) {
      var space = (linkCanvas.width / 2) / brain.inputSize;
      var distance = ((i1 + 1) * space) - (0.5 * space) + linkCanvas.width / 4;
      //console.log(distance);
      var point = {
        location: {
          x: distance,
          y: document.body.clientHeight * 0.15
        },
        radius: 5,
        color: '#5872a3',
        stroke: '#465893'
      }
      points.push(point);
    }
    for (let i = 0; i < points.length; i++){
      var angle = (360 / entity.nerveCount) * i;
      var p1 = self.location;
      //console.log('p1', p1)
      var p2 = findNewPoint(self.location.x, self.location.y, angle, self.radius);
      //console.log('p2', p2)
      //console.log('nerves', entity.nerves)
      var p3 = findNewPoint(p2.x, p2.y, angle, entity.nerves[i].size);
      //console.log('p3', p3)
      renderObject(linkContext, points[i]);
      renderLine(linkContext, p3, points[i].location, '#1d273c', offsetX, offsetY);
    }

    // BRAIN CANVAS RENDERING

    brainContext.clearRect(0, 0, brainCanvas.width, brainCanvas.height);
    var width = brainCanvas.width;
    var height = brainCanvas.height;
    //var structure = visualizeLayers(brain);
    //console.log('Structure', structure)
    //console.log('Brain', brain)
    //var inputList = Object.values(brain.layers.input);
    var hiddenList = Object.values(brain.layers.hidden);
    //var outputList = Object.values(brain.layers.output);
    //console.log('Map', this.map)
    if (!this.map) {
      this.map = {};
      //console.log('Input', inputList);
      //console.log('Hidden', hiddenList);
      //console.log('Output', outputList);
      Object.values(brain.layers.input).forEach((inputNeuron, index, inputArray) => {
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
      Object.values(brain.layers.output).forEach((outputNeuron, index, outputArray) => {
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
      Object.values(brain.layers.hidden).forEach((hiddenNeuron, index, hiddenArray) => {
        this.map[hiddenNeuron.id] = {
          x: (padding * 4) + getRandomNumber(0, width - (padding * 8)),
          y: (padding * 4) + getRandomNumber(0, height - (padding * 8))
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
    for (let prop1 in brain.globalReferenceConnections) {
      var connection = brain.globalReferenceConnections[prop1];
      if (connection.hasOwnProperty('source') && connection.hasOwnProperty('target') && typeof connection.source == 'object' && connection.source.constructor.name == 'Neuron' && typeof connection.target == 'object' && connection.target.constructor.name == 'Neuron') {
        //console.log('Map', this.map);
        if (this.map[connection.source.id] && this.map[connection.target.id]) {
        //console.log('Connection', connection);
          drawLink(this.map[connection.source.id].x, this.map[connection.source.id].y, this.map[connection.target.id].x, this.map[connection.target.id].y, brainContext, connection);
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
      if (brain.globalReferenceNeurons[prop]) {
        //console.log('Debug 1', brain.globalReferenceNeurons[prop])
        drawNode(brain.globalReferenceNeurons[prop], brainContext, this.map[prop].x, this.map[prop].y, brain.globalReferenceNeurons[prop]);
      }
    }
    brain.map = this.map;
  }
}
module.exports = Viewer