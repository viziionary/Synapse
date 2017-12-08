function getDistance(point1, point2) {
	return Math.hypot(point2.x - point1.x, point2.y - point1.y);
	//var a = point1.x - point2.x
	//var b = point1.y - point2.y
	//return Math.sqrt(a * a + b * b);
}
export default getDistance;