function renderLine(context, p1, p2, color, offsetX = 0, offsetY = 0) {
	//console.log('Inputs', p1, p2, color, offsetX, offsetY)
	context.beginPath();
	context.moveTo(p1.x + offsetX, p1.y + offsetY);
	context.lineTo(p2.x, p2.y);
	context.lineWidth = 0.5;
	context.strokeStyle = color;
	context.stroke();
}
module.exports = renderLine;