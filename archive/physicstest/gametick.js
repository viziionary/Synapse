import drawGame from './drawGame';
var doNextTick = [];
function gameTick(gameData){
  doNextTick.splice(0,doNextTick.length).forEach(item=>{item()});
  let player = gameData.player;
  let keys = gameData.keys;
  //console.log('y',player.ySpeed);
  if (keys.ArrowLeft === true) {
    player.xSpeed = Math.max(-player.maxSpeed,player.xSpeed - player.acceleration);
  } else if (keys.ArrowRight === true) {
    player.xSpeed = Math.min(player.maxSpeed,player.xSpeed + player.acceleration);
  }
  if (keys.ArrowUp === true) {
    player.ySpeed = Math.max(-player.maxSpeed,player.ySpeed - player.acceleration);
  } else if (keys.ArrowDown === true) {
    player.ySpeed = Math.min(player.maxSpeed,player.ySpeed + player.acceleration);
  }
  if (player.move(player.xSpeed,player.ySpeed) === false){
    console.log('Collision');
    player.color = 'red';
    doNextTick.push(()=>{
    player.color = 'orange';
      doNextTick.push(()=>{
        player.color = 'white';
      });
    });
    player.xSpeed = 0;
    player.ySpeed = 0;
  }
  drawGame(gameData);
}
export default gameTick;
