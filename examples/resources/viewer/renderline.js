function renderLine(context, p1, p2, color) {
	context.beginPath();
	context.moveTo(p1.x, p1.y);
	context.lineTo(p2.x, p2.y);
	context.lineWidth = 1;
	context.strokeStyle = color;
	context.stroke();
}
module.exports = renderLine;