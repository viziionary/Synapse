import getRandomNumber from '../../../source/functions/getrandomnumber.js';
import drawLink from './drawlink.js';
function drawNode(node, ctx, x, y, neuron) {
  //ctx.strokeStyle = '#ffffff';
  //ctx.fillStyle = '#ffffff';
  if (neuron.bias == null) {
    ctx.fillStyle = '#ffffff';
  } else if (neuron.bias >= 0.5) {
    ctx.fillStyle = '#6e69ff';
  } else if (neuron.bias < 0.5){
    ctx.fillStyle = '#69ff7a';
  }
  if (neuron.recentCharge === false) {
    ctx.strokeStyle = '#ffffff';
  } else if (neuron.recentCharge >= 0.5) {
    ctx.strokeStyle = '#6e69ff';
  } else if (neuron.recentCharge < 0.5){
    ctx.strokeStyle = '#69ff7a';
  }
  neuron.recentCharge = null;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
export default drawNode;