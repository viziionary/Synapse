const getRandomDecimal = require('./getrandomdecimal');
const getRandomNumber = require('./getrandomnumber');
function getRandomLowNumber(min=0,max=100,curveFactor){
  let range = max-min;
  var factor = getRandomDecimal(0,1);
  if (curveFactor) {
    factor = Math.pow(factor,1/curveFactor);
  }
  var result = Math.pow(range + 1, factor) - 1;
  //console.log('num:',num,'divide:',divide);
  //console.log('num',num,'rollDiff',rollDiff,'divide',divide);
  //console.log('factor:',factor,'result:',result);
  if (Math.round(result + min) > max){
    console.log('ALERTALERTALERT',{result,factor,range});
  }
  if (Math.round(result + min) < min) {
    console.log('BELOW ALERT',{result,factor,range});
  }
  return Math.round(result) + min;
}
module.exports = getRandomLowNumber;
