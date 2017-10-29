function interceptOnCircle(p1, p2, c, r) {
	var p3 = {
		x: p1.x - c.x,
		y: p1.y - c.y
	};
	var p4 = {
		x: p2.x - c.x,
		y: p2.y - c.y
	};
	var m = (p4.y - p3.y) / (p4.x - p3.x); //slope of the line
	var b = p3.y - m * p3.x; //y-intercept of line
	var underRadical = Math.pow(r, 2) * Math.pow(m, 2) + Math.pow(r, 2) - Math.pow(b, 2); //the value under the square root sign
	if (underRadical < 0) {
		return false;
	} else {
		var t1 = (-m * b + Math.sqrt(underRadical)) / (Math.pow(m, 2) + 1); //one of the intercept x's
		var t2 = (-m * b - Math.sqrt(underRadical)) / (Math.pow(m, 2) + 1); //other intercept's x
		var i1 = {
			x: t1 + c.x,
			y: m * t1 + b + c.y
		};
		var i2 = {
			x: t2 + c.x,
			y: m * t2 + b + c.y
		};
		var length = Math.hypot(p1.x - p2.x, p1.y - p2.y);
		var distance1 = Math.hypot(p1.x - i2.x, p1.y - i2.y);
		var distance2 = Math.hypot(p1.x - i1.x, p1.y - i1.y);
		var lowerBounds = Math.min(distance1, distance2);
		if (lowerBounds < length) {
			return lowerBounds;
		} else {
			return false;
		}
	}
}

module.exports = interceptOnCircle;