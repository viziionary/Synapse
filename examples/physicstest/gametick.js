import drawGame from './drawGame';
function gameTick(gameData){
  let player = gameData.player;
  let keys = gameData.keys;
  if (keys.ArrowLeft) {
    player.move(-player.speed,0);
  } else if (keys.ArrowRight) {
    player.move(player.speed,0);
  }
  if (keys.ArrowUp) {
    player.move(0,-player.speed);
  } else if (keys.ArrowDown) {
    player.move(0,player.speed);
  }
  drawGame(gameData);
}
export default gameTick;
