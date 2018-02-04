function drawLink(x1, y1, x2, y2, ctx, connection, log = false) {
	console.log('Drawing connection:', connection);
	if (connection.lastCharge === null){
		ctx.strokeStyle = '#ffffff';
	} else if (connection.lastCharge >= 0.5){
		ctx.strokeStyle = '#6e69ff';
	} else if (connection.lastCharge < 0.5){
		ctx.strokeStyle = '#69ff7a';
	}
	if (log){
		console.log('Last charge', connection.lastCharge);
	}
	connection.lastCharge == null;
	ctx.lineWidth = 0.5;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
export default drawLink;