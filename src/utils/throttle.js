const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(()=>{
        func.apply(this, arguments);
        inThrottle = false;
      }, limit);
    }
  }
}
export default throttle;