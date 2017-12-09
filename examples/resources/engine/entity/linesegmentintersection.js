import getDistance from '../getdistance.js';

function lineSegmentIntersection(line1, line2) {
	var x1 = line1[0].x;
	var x2 = line1[1].x;
	var x3 = line2[0].x;
	var x4 = line2[1].x;
	var y1 = line1[0].y;
	var y2 = line1[1].y;
	var y3 = line2[0].y;
	var y4 = line2[1].y;
	var a_dx = x2 - x1;
	var a_dy = y2 - y1;
	var b_dx = x4 - x3;
	var b_dy = y4 - y3;
	var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
	var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
	if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
		var collision = {
			x: x1 + t * a_dx,
			y: y1 + t * a_dy
		};
		var distance = getDistance(line1[0], collision);
		return distance;
	} else {
		return null;
	}
}
export default lineSegmentIntersection;