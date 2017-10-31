function renderLine(context, p1, p2, color, offsetX = 0, offsetY = 0) {
	context.beginPath();
	//console.log('line x', p1.x, 'line x', p1.y)
	context.moveTo(p1.x + offsetX, p1.y + offsetY);
	context.lineTo(p2.x, p2.y);
	context.lineWidth = 1;
	context.strokeStyle = color;
	context.stroke();
}
module.exports = renderLine;