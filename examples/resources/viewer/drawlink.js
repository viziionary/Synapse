function drawLink(x1, y1, x2, y2, ctx) {
	ctx.strokeStyle = '#56cc41';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
module.exports = drawLink;