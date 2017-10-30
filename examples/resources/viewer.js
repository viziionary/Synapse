const drawNode = require('./viewer/drawnode');
const drawLink = require('./viewer/drawlink');
const getRandomNumber = require('../../source/functions/getrandomnumber');
//const visualizeLayers = require('./viewer/vizualizelayers');
class Viewer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.render = this.render.bind(this);
  }
  render(brain) {
    //console.log('Debug 2', brain);
    var padding = 10;
    var occupiedCoords = [];
    var ctx = this.context;
    var canvas = this.canvas;
    //console.log('Debug 4', brain);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var width = canvas.width;
    var height = canvas.height;

    //var structure = visualizeLayers(brain);
    //console.log('Structure', structure)
    console.log('Brain', brain)

    var inputList = Object.values(brain.layers.input);
    var hiddenList = Object.values(brain.layers.hidden);
    var outputList = Object.values(brain.layers.output);
    var map = {};
    console.log('Input', inputList);
    console.log('Hidden', hiddenList);
    console.log('Output', outputList);
    for (let i = 0; i < inputList.length; i++) {
      var x = (width / inputList.length) * (i + 0.5);
      var y = padding;
      map[inputList[i].id] = {
        x: x,
        y: y
      };
    }
    for (let i = 0; i < outputList.length; i++) {
      var x = (width / outputList.length) * (i + 0.5);
      var y = height - padding;
      map[outputList[i].id] = {
        x: x,
        y: y
      };
    }
    for (let i = 0; i < hiddenList.length; i++) {
      var x = (padding * 4) + getRandomNumber(0, width - (padding * 8));
      var y = (padding * 4) + getRandomNumber(0, height - (padding * 8));
      map[hiddenList[i].id] = {
        x: x,
        y: y
      };
    }
    for (let prop1 in brain.globalReferenceConnections) {
      var connection = brain.globalReferenceConnections[prop1];
      drawLink(map[connection.source.id].x, map[connection.source.id].y, map[connection.target.id].x, map[connection.target.id].y, ctx);
    }
    console.log('Map', map);
    for (var prop in map) {
      if (brain.globalReferenceNeurons[prop]) {
        console.log('Debug 1', brain.globalReferenceNeurons[prop])
        drawNode(brain.globalReferenceNeurons[prop], ctx, brain.globalReferenceNeurons[prop].type, map[prop].x, map[prop].y);
      }
    }
  }
}
module.exports = Viewer