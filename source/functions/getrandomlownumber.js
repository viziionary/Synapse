import getRandomDecimal from './getrandomdecimal.js';
import getRandomNumber from './getrandomnumber.js';
import logb from './logb.js';

function getRandomLowNumber(min=0, max=100, factor=0.9) {
	var base = 1.0 / factor;
		var evtcnt = Math.floor(Math.pow(base, max-min+1) - 1) / (base-1);
		var rndnum = getRandomNumber(1, evtcnt);
		var expflr = Math.floor(logb((rndnum-1) * (base-1) + 1, base));
		var rndres = max - expflr + min;
        return rndres;
}
export default getRandomLowNumber;
