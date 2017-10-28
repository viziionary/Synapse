import KeyMap from './keymap';
import gameTick from './gametick';
import Physics from '../resources/physics/physics';

function setupGame(canvasIn){
  var gameData = {Physics,keys:new KeyMap(),canvas:canvasIn,ctx:canvasIn.getContext('2d'),environment:new Physics.Environment(canvasIn.width,canvasIn.height)}
  gameData.player = new Physics.Square(gameData.environment,200,200,50,50);
  gameData.player.xSpeed = 0;
  gameData.player.ySpeed = 0;
  gameData.player.acceleration = 1;
  gameData.player.maxSpeed = 20;
  new Physics.Circle(gameData.environment,300,300,50,50);
  gameTick(gameData);
  setInterval(()=>{gameTick(gameData)},50);
}
export default setupGame;
