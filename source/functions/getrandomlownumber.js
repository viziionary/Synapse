const getRandomDecimal = require('./getrandomdecimal');
const getRandomNumber = require('./getrandomnumber');

/*
function getRandomLowNumber(min = 0, max = 100, curveFactor) {
	let range = max - min;
	var factor = getRandomDecimal(0, 1);
	if (curveFactor) {
		factor = Math.pow(factor, 1 / curveFactor);
	}
	var result = Math.pow(range + 1, factor) - 1;
	//console.log('num:',num,'divide:',divide);
	//console.log('num',num,'rollDiff',rollDiff,'divide',divide);
	//console.log('factor:',factor,'result:',result);
	if (Math.round(result + min) > max) {
		console.log('ALERTALERTALERT', {
			result,
			factor,
			range
		});
	}
	if (Math.round(result + min) < min) {
		console.log('BELOW ALERT', {
			result,
			factor,
			range
		});
	}
	return Math.floor(result) + min;
}
*/

function getRandomLowNumber(min, max, curveFactor, log) {
	var rand = getRandomNumber(min, max);
	var list = [];
	var factor = Math.round(curveFactor * max);
	for (let i1 = min, i2 = min, i3 = min; i2 < max && factor > 0.000000001; i1++, i3++) {
		list.push(i2);
		if (i1 > factor) {
			i2++;
			i1 = 0;
			factor = factor * curveFactor;
			if (log){
				console.log(factor);
			}
		}
	}
	if (log){
		console.log(list);
	}
	return list[rand];
}

console.log('Test:');
var test = getRandomLowNumber(1, 100, 0.8, true);

module.exports = getRandomLowNumber;