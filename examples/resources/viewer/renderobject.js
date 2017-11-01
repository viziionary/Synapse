function renderObject(context, object, offsetX = 0, offsetY = 0, forceColor = false) {
	var x = object.location.x + offsetX;
	var y = object.location.y + offsetY;
	//console.log('render X', x);
	//console.log('render Y', y);
	var radius = object.radius;
	var color = object.color;
	var stroke = object.stroke;
	if (forceColor) {
		stroke = forceColor;
	}
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = stroke;
	context.stroke();
}

module.exports = renderObject;