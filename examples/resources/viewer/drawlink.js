function drawLink(node1, node2, ctx) {
	ctx.strokeStyle = '#56cc41';
	ctx.lineWidth = 1;
	coord = nodePosition(node1, coord);
	ctx.beginPath();
	ctx.moveTo(coord.x, coord.y);
	coord = nodePosition(node2, coord);
	ctx.lineTo(coord.x, coord.y);
	ctx.stroke();
}
module.exports = drawLink;