function renderNerve(context, nerve) {
	var p1 = nerve[0];
	var p2 = nerve[1];
	context.beginPath();
	context.moveTo(p1.x, p1.y);
	context.lineTo(p2.x, p2.y);
	context.lineWidth = 1;
	context.strokeStyle = '#a0f6ff';
	context.stroke();
}
module.exports = renderNerve;