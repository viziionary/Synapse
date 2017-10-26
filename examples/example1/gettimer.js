function getTimer(time){
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve();
    },time);
  })
}
module.exports = getTimer;
