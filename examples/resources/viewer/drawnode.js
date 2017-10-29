const getRandomNumber = require('../../source/functions/getrandomnumber');
const drawLink = require('./viewer/drawlink');
function drawNode(node, ctx, type, x, y) {
  if (type == 'input') {
    ctx.strokeStyle = '#4747f3';
    ctx.fillStyle = '#4040b3';
  } else if (type == 'hidden') {
    ctx.strokeStyle = '#56cc41';
    ctx.fillStyle = '#adf442';
  } else if (type == 'output') {
    ctx.strokeStyle = '#428cd1';
    ctx.fillStyle = '#59afff';
  }
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
module.exports = drawNode;