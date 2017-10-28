function drawGame(gameData){
  let ctx = gameData.ctx;
  let canvas = gameData.canvas;
  let environment = gameData.environment;

  ctx.fillStyle = "#171642";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  environment.objects.forEach(object=>{
    ctx.fillStyle = object.color || "#ffffff";
    ctx.strokeStyle = object.color || '#fffffff';
    if (object.constructor.name === 'Square') {
      //console.log(object.x-object.width/2, object.y-object.height/2, object.width, object.height);
      ctx.fillRect(object.x-object.width/2, object.y-object.height/2, object.width, object.height);
    } else if (object.constructor.name === 'Circle') {
      ctx.beginPath();
      ctx.arc(object.x, object.y, object.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  });

}
export default drawGame;
