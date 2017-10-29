function findNewPoint(x, y, angle, distance) {
	var result = {};
	result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
	result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);
	return result;
}
module.exports = findNewPoint;