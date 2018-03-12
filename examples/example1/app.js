import Network from '../../source/constructors/network.js';

var network1 = new Network(2, 1, (brain) => {
  var outputs = [];
  outputs[0] = brain.input([0, 0]);
  console.log('Input:', [0, 0], 'output:', outputs[0]);
  outputs[1] = brain.input([1, 1]);
  console.log('Input:', [1, 1], 'output:', outputs[1]);
  outputs[2] = brain.input([0, 1]);
  console.log('Input:', [0, 1], 'output:', outputs[2]);
  outputs[3] = brain.input([1, 0]);
  console.log('Input:', [1, 0], 'output:', outputs[3]);
  var score = 0;
  score += 0 - outputs[0][0];
  score += 0 - outputs[1][0];
  score += 0 + outputs[2][0];
  score += 0 + outputs[3][0];
  console.log('score:', score);
  return score;
});

function bin(dec) {
  return (dec >>> 0).toString(2);
}

function splitst(bin) {
  var arr = ("" + bin).split("");
  for (let i = 0; i < arr.length; i) {
    arr[i] = Number(arr[i]);
  }
  if (2 > arr.length) {
    arr.unshift(0);
  }
  return arr;
}