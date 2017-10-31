function circleInBounds(width, height, circle) {
	var x = circle.location.x;
	var y = circle.location.y;
	if (x > width - circle.radius || x < 0 + circle.radius || y > height - circle.radius || y < 0 + circle.radius) {
		return false;
	} else {
		return true;
	}
}
module.exports = circleInBounds;