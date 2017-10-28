function getCorners(square){
  return [[square.x - square.width/2,square.y - square.height/2]/*DONE*/,[square.x + square.width/2,square.y - square.height/2]/*DONE*/,[square.x - square.width/2,square.y + square.height/2],[square.x + square.width/2,square.y + square.height/2]];
}
module.exports = getCorners;
