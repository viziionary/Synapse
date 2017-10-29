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
    var occupiedCcoords = [];
    var ctx = this.context;
    var canvas = this.canvas;
    console.log('Debug 4', brain);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var width = canvas.width;
    var height = canvas.height;
    var nextLayer = [];
    for (let i = 0; i < brain.layers.input.length; i++) {
      var x = (width / brain.layers.input.length) * i;
      var y = padding;
      drawNode(brain.types.input[i], ctx, 'input', x, y);
      for (let prop in )
    }
    for (let i = 0; i < brain.layers.output.length; i++) {
      var x = (width / brain.layers.output.length) * i;
      var y = height - padding;
      drawNode(brain.types.output[i], ctx, 'input', x, y);
    }
  }
}
module.exports = Viewer;