const drawNode = require('./viewer/drawnode');
const drawLink = require('./viewer/drawlink');
const getRandomNumber = require('../../source/functions/getrandomnumber');
//const visualizeLayers = require('./viewer/vizualizelayers');
class Viewer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.render = this.render.bind(this);
    this.map = false;
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
      Object.values(brain.layers.input).forEach((inputNeuron,index,inputArray)=>{
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
      Object.values(brain.layers.output).forEach((outputNeuron,index,outputArray)=>{
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
      Object.values(brain.layers.hidden).forEach((hiddenNeuron,index,hiddenArray)=>{
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
      if (typeof connection !== 'object' || connection.constructor.name !=='Connection') {
        console.log('connection:',connection);
        throw new Error('Connection is not a connection :(')
      }
      if (!connection.hasOwnProperty('source') || typeof connection.source !== 'object' || connection.source.constructor.name !== 'Neuron') {
        console.log('connection:',connection);
        throw new Error('connection does not have a valid source :(');
      }
      if (!connection.hasOwnProperty('target') || typeof connection.target !== 'object' || connection.target.constructor.name !== 'Neuron'){
        console.log('connection:',connection);
        throw new Error('connection does not have a valid target :(');
      }
      if (this.map[connection.source.id] && this.map[connection.target.id]) {
        //console.log('Connection', connection);
        drawLink(this.map[connection.source.id].x, this.map[connection.source.id].y, this.map[connection.target.id].x, this.map[connection.target.id].y, ctx);
      } else {
        //console.log('Else', connection, this.map);
      }
    }
    //console.log('Map', this.map);
    for (var prop in this.map) {
      if (brain.globalReferenceNeurons[prop]) {
        //console.log('Debug 1', brain.globalReferenceNeurons[prop])
        drawNode(brain.globalReferenceNeurons[prop], ctx, brain.globalReferenceNeurons[prop].type, this.map[prop].x, this.map[prop].y);
      }
    }
  }
}
module.exports = Viewer
