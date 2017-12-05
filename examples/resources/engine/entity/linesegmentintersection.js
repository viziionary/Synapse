const getDistance = require('../getdistance');
//var totalTime = 0;
//var counter = 0;

var debugHistory = [];
var debugHistoryDetails = [];
counter = 0;


// this algo and the one commented below both work and cost about 0.001ms per operation, similar performance. Unclear whether one is more reliable than the other for edge cases. 
function lineSegmentIntersection(line1, line2, id = false) {
	//counter++;
	//if (counter > 1000 && counter < 10000) {
	//	console.log(id);
	//}

	//counter++;
	//var startTime = performance.now();
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

		//debugging

		
		if (id === '10') {
			debugHistory.unshift(distance);
			debugHistory = debugHistory.slice(0, 6);
			debugHistoryDetails.unshift({
				line1,
				line2,
				distance
			});
			debugHistoryDetails = debugHistoryDetails.slice(0, 6);
			
			if ((debugHistory[0] < 50) && (debugHistory[1] == 50) && (debugHistory[2] < 50) && (debugHistory[3] == 50) && (debugHistory[4] < 50) && (debugHistory[5] == 50)) {
				console.log('[DETECTION] We found a blip pattern: ', debugHistory);
				console.log('[DETECTION] Details: ', debugHistoryDetails);
			}

		}
		
		return distance;
	} else {
		
		if (id === '10') {

			debugHistory.unshift(50);
			debugHistory = debugHistory.slice(0, 6);
			debugHistoryDetails.unshift({
				line1,
				line2,
				distance: 50
			});
			debugHistoryDetails = debugHistoryDetails.slice(0, 6);
			//console.log(debugHistory);
			if ((debugHistory[0] < 50) && (debugHistory[1] == 50) && (debugHistory[2] < 50) && (debugHistory[3] == 50) && (debugHistory[4] < 50) && (debugHistory[5] == 50)) {
				console.log('[DETECTION] We found a blip pattern: ', debugHistory);
				console.log('[DETECTION] Details: ', debugHistoryDetails);
			}
		}
		
		return 50;
	}
}


/*
function lineSegmentIntersection(line1, line2) {
	counter++;
	var startTime = performance.now();
	var p0_x = line1[0].x;
	var p1_x = line1[1].x;
	var p2_x = line2[0].x;
	var p3_x = line2[1].x;
	var p0_y = line1[0].y;
	var p1_y = line1[1].y;
	var p2_y = line2[0].y;
	var p3_y = line2[1].y;
	var s1_x, s1_y, s2_x, s2_y, s, t;
	s1_x = p1_x - p0_x;
	s1_y = p1_y - p0_y;
	s2_x = p3_x - p2_x;
	s2_y = p3_y - p2_y;
	s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
	t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

	if (s >= 0 && s <= 1 && t >= 0 && t <= 1) { // Collision detected 
		var intX = p0_x + (t * s1_x);
		var intY = p0_y + (t * s1_y);
		var distance = getDistance(line1[0], {
			x: intX,
			y: intY
		});
		//console.log('Lines collided at distance of ' + distance + ' pixels.');
		var duration = performance.now() - startTime;
		totalTime += duration;
		console.log('Performance: ' + (totalTime / counter) + 'ms per calculation.');
		return distance;
	}
	//console.log('No collision detected.');
	var duration = performance.now() - startTime;
	totalTime += duration;
	console.log('Performance: ' + (totalTime / counter) + 'ms per calculation.');
	return null;
}
*/
module.exports = lineSegmentIntersection;