import drawNode from './viewer/drawnode.js';
import drawLink from './viewer/drawlink.js';
import findNewPoint from './engine/findnewpoint.js';
import getRandomNumber from '../../source/functions/getrandomnumber.js';
import renderNerve from './viewer/rendernerve.js';
import renderObject from './viewer/renderobject.js';
import renderLine from './viewer/renderline.js';

var debugHistory = [];
var debugTimer = performance.now();

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
    simContext.clearRect(0, 0, simCanvas.width, simCanvas.height);
    linkContext.clearRect(0, 0, linkCanvas.width, linkCanvas.height);
    underLinkContext.clearRect(0, 0, linkCanvas.width, linkCanvas.height);
    brainContext.clearRect(0, 0, brainCanvas.width, brainCanvas.height);

    // LINK CANVAS RENDERING

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
      var p2 = findNewPoint(self.location.x, self.location.y, angle, self.radius);
      var p3 = findNewPoint(p2.x, p2.y, angle, entity.nerves[i].size);
      if (entity.nerves[i].size >= entity.nerveLength * 0.5) {
        linkColor = '#6e69ff';
        borderColor = '#6e69ff';
      } else {
        linkColor = '#69ff7a';
        borderColor = '#69ff7a';
      }
      if (this.brain.leader) {
        var elapsed = (performance.now() - debugTimer) / 1000;
        console.log('Rendering leader [' + this.brain.id + '] again after ' + elapsed + 'ms');
        debugTimer = performance.now();
        renderObject(linkContext, points[i], false, false, borderColor);
        renderLine(underLinkContext, p3, points[i].location, linkColor, offsetX, offsetY);
      }
    }

    // SIM CANVAS RENDERING

    for (var i1 = 0; i1 < surroundings.length; i1++) {
      renderObject(simContext, surroundings[i1]);
    }
    for (let i1 in entity.nerves) {
      var angle = (360 / entity.nerveCount) * i1;
      var p1 = self.location;
      var p2 = findNewPoint(self.location.x, self.location.y, angle, self.radius);
      var p3 = findNewPoint(p2.x, p2.y, angle, entity.nerves[i1].size);

      entity.nerves[i1].points = [p2, p3];
      //console.log('Nerves', entity.nerves[i1])
      if (this.brain.leader) {
        renderNerve(simContext, entity.nerves[i1]);
      }
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
      if (this.brain.leader) {
        renderObject(linkContext, sourcePoint, offsetX, offsetY, linkColor);
      }
    }
    //console.log(self);
    renderObject(simContext, self);
    renderObject(simContext, target);

    // BRAIN CANVAS RENDERING

    if (this.brain.leader) {
      console.log('Rendering leader brain')
      var width = brainCanvas.width;
      var height = brainCanvas.height;
      var hiddenList = Object.values(this.brain.layers.hidden);
      if (!this.map) {
        this.map = {};
        Object.values(this.brain.layers.input).forEach((inputNeuron, index, inputArray) => {
          this.map[inputNeuron.id] = {
            x: (width / inputArray.length) * (index + 0.5),
            y: padding
          };

        });
        Object.values(this.brain.layers.output).forEach((outputNeuron, index, outputArray) => {
          this.map[outputNeuron.id] = {
            x: (width / outputArray.length) * (index + 0.5),
            y: height - padding
          };
        });
        Object.values(this.brain.layers.hidden).forEach((hiddenNeuron, index, hiddenArray) => {
          this.map[hiddenNeuron.id] = {
            x: (padding * 4) + getRandomNumber(0, width - (padding * 8)),
            y: (padding * 4) + getRandomNumber(0, height - (padding * 8))
          }
        });
      }
      Object.values(this.brain.layers.input).forEach((inputNeuron, index, inputArray) => {
        if (entity.nerves[index].size >= entity.nerveLength * 0.5) {
          linkColor = '#6e69ff';
        } else {
          linkColor = '#69ff7a';
        }
        renderLine(underLinkContext, this.map[inputNeuron.id], points[index].location, linkColor, offsetXAlt, offsetYAlt);
      });
      for (let prop1 in this.brain.globalReferenceConnections) {
        var connection = this.brain.globalReferenceConnections[prop1];
        if (connection.hasOwnProperty('source') && connection.hasOwnProperty('target') && typeof connection.source == 'object' && connection.source.constructor.name == 'Neuron' && typeof connection.target == 'object' && connection.target.constructor.name == 'Neuron') {
          //console.log('Map', this.map);
          if (this.map[connection.source.id] && this.map[connection.target.id]) {
            //console.log('Connection', connection);
            drawLink(this.map[connection.source.id].x, this.map[connection.source.id].y, this.map[connection.target.id].x, this.map[connection.target.id].y, brainContext, connection, this.brain.leader);
          }
        } else {
          if (typeof connection !== 'object' || connection.constructor.name !== 'Connection') {
            console.log('Connection not correct type of object', connection);
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
          drawNode(this.brain.globalReferenceNeurons[prop], brainContext, this.map[prop].x, this.map[prop].y, this.brain.globalReferenceNeurons[prop]);
        }
      }
      this.brain.map = this.map;
    }
  }
}
export default Viewer;