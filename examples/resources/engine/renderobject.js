function renderObject(context, object) {
	var x = object.location.x;
	var y = object.location.y;
	var radius = object.radius;
	var color = object.color;
	var stroke = object.stroke;
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = stroke;
	context.stroke();
}

module.exports = renderObject;