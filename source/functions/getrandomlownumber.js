const getRandomNumber = require('./getRandomNumber');
function getRandomLowNumber(min=1,max=100){
  let num = getRandomNumber(min,max);
  let rollDiff = num - min;
  let percent = (rollDiff) / (max - min);
  return Math.round(rollDiff * percent + min);
}
module.exports = getRandomLowNumber;
