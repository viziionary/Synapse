const getRandomNumber = require('../../source/functions/getrandomnumber');
const drawLink = require('./viewer/drawlink');
const findOpenCoords = require('./viewer/findopencoords');
function drawNode(node, ctx, type, occupiedCoords, width, height) {
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
  coords = findOpenCoords(occupiedCoords, width, height, padding)
  ctx.beginPath();
  ctx.arc(coords.x, coords.y, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
module.exports = drawNode;