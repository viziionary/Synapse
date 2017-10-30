function drawLink(x1, y1, x2, y2, ctx, connection) {
	ctx.strokeStyle = '#ffffff';
	if (connection.energy < 0) {
		ctx.strokeStyle = '#c40000';
	} else if (connection.lastCharge >= 0.5){
		ctx.strokeStyle = '#6e69ff';
	} else if (connection.lastCharge < 0.5){
		ctx.strokeStyle = '#69ff7a';
	}

	ctx.lineWidth = 0.75;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
module.exports = drawLink;