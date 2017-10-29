const drawNode = require('./viewer/drawnode');
const drawLink = require('./viewer/drawlink');
class Viewer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.render = this.render.bind(this);
  }
  render(brain) {
    console.log('Debug 2', brain);
    var padding = 10;
    var occupiedCoords = [];
    var ctx = this.context;
    var canvas = this.canvas;
    console.log('Debug 4', brain);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var width = canvas.width;
    var height = canvas.height;
    var hiddenLayerCount = 0;
    var hiddenLayers = [];

    /*
    for (let prop in brain.layers.input) {
      var x = (width / brain.layers.input.length) * i;
      var y = padding;
      drawNode(brain.layers.input[i], ctx, 'input', x, y);
      hiddenLayers[0] = [];
      for (let prop in brain.layers.input[i].connections) {
        hiddenLayers[hiddenLayerCount].push(brain.layers.input[i].connections[prop].target);
      }
    }
    hiddenLayerCount++;
    console.log(hiddenLayers);
    for (let i = 0; i < brain.layers.output.length; i++) {
      var x = (width / brain.layers.output.length) * i;
      var y = height - padding;
      drawNode(brain.layers.output[i], ctx, 'input', x, y);
    }
    */
  }
}
module.exports = Viewer