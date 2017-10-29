const drawNode = require('./viewer/drawnode');
class Viewer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.render = this.render.bind(this);
  }
  render(brain) {
    console.log('Debug 2', brain);
    var occupiedCcoords = [];
    var ctx = this.context;
    var canvas = this.canvas;
    console.log('Debug 4', brain);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var width = canvas.width;
    var height = canvas.height;
    for (let prop in brain.types.input) {
      drawNode(brain.types.input[prop], ctx, occupiedCcoords);
    }
    for (let prop in brain.types.output) {
      drawNode(brain.types.input[prop], ctx, occupiedCcoords);
    }
    for (let prop in brain.types.hidden) {
      drawNode(brain.types.input[prop], ctx, occupiedCcoords);
    }
  }
}
module.exports = Viewer;