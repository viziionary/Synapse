function circleInBounds(canvas, circle) {
	var x = circle.location.x;
	var y = circle.location.y;
	var width = canvas.width;
	var height = canvas.height;
	if (x > width - circle.radius || x < 0 + circle.radius || y > height - circle.radius || y < 0 + circle.radius) {
		return false;
	} else {
		return true;
	}
}
module.exports = circleInBounds;