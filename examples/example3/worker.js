onmessage = function(e) {
  console.log('Message received from main script:', e.data);
  var workerResult = 'heyy';
  console.log('Posting message back to main script');
  postMessage(workerResult);
}

