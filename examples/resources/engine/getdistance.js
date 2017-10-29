function getDistance(point1, point2) {
	return Math.hypot(point2.x - point1.x, point2.y - point1.y);
}
module.exports = getDistance;