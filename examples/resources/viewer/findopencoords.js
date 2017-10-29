function findOpenCoords(occupiedCoords, width, height, padding, spacer) {
  var halfSpacer = Math.ceil(spacer / 2)
  for (let x1 = padding; x1 < width - padding; x1++) {
    for (let y1 = padding; y1 < height - padding; y1++) {
      var clear = true;
      for (let x2 = x1 - halfSpacer; x2 < x1 + halfSpacer; x2++){
        for (let y2 = y1 - halfSpacer; y2 < y1 + halfSpacer; y2++){
          if (occupiedCoords[x2, y2]){
            clear = false;
            break;
          }
        }
        if (clear === false) {
          break;
        }
      }
      if (clear) {
        return {
          x : x1,
          y : y1
        }
      }
    }
  }
}
module.exports = findOpenCoords;