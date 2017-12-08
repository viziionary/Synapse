function interceptCircles(circle1, circle2) {
	var dx = circle1.location.x - circle2.location.x;
	var dy = circle1.location.y - circle2.location.y;
	var distance = Math.sqrt(dx * dx + dy * dy);
	if (distance < circle1.radius + circle2.radius) {
		return true;
	} else {
		return false;
	}
}

export default interceptCircles;