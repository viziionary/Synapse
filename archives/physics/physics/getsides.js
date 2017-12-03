function getSides(square){
  return [[square.x-square.width/2,square.y],[square.y-square.height/2,square.x],[square.x+square.width/2,square.y],[square.y+square.height/2,square.x]]
}
export default getSides;
