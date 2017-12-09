function getTimer(time,returnValue=null){
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(returnValue);
    },time);
  })
}
export default getTimer;
