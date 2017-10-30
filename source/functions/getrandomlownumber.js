const getRandomDecimal = require('./getrandomdecimal');
const getRandomNumber = require('./getrandomnumber');
const logb = require('./logb');
new Audio('https://drive.google.com/uc?export=download&id=0B5RU9mmQF_DvUnFkdlVpWHZMcEk').play();
function getRandomLowNumber(min=0, max=100, factor=0.9) {
	min--;
	max--;
	var base = 1.0 / factor;
		var evtcnt = Math.floor(Math.pow(base, max-min+1) - 1) / (base-1);
		var rndnum = getRandomNumber(1, evtcnt);
		var expflr = Math.floor(logb((rndnum-1) * (base-1) + 1, base));
		var rndres = max - expflr + min;
        return rndres;
}
module.exports = getRandomLowNumber;
