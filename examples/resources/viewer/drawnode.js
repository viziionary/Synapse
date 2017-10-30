const getRandomNumber = require('../../../source/functions/getrandomnumber');
const drawLink = require('./drawlink');
function drawNode(node, ctx, x, y, neuron) {
  ctx.strokeStyle = '#4747f3';
  ctx.fillStyle = '#4040b3';
  if (neuron.bias >= 0.5) {
    ctx.fillStyle = '#6e69ff';
  } else if (neuron.bias < 0.5){
    ctx.fillStyle = '#69ff7a';
  }
  if (neuron.recentCharge >= 0.5) {
    ctx.fillStyle = '#6e69ff';
  } else if (neuron.recentCharge < 0.5){
    ctx.fillStyle = '#69ff7a';
  }
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
module.exports = drawNode;