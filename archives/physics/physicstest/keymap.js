class KeyMap {
  constructor(){
    document.addEventListener("keydown",event=>{
      this[event.code] = true;
    });
    document.addEventListener("keyup",event=>{
      this[event.code] = false;
    });
  }
}
export default KeyMap;
