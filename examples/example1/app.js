var counter = 0;

import Synapse from '../../source/index';
var network = new Synapse(2,1,(run)=>{
  var output1 = run([1, 1])[0];
  var output2 = 1 - run([1, 0])[0];
  var output3 = run([0, 0])[0];
  var total = 3 - (output1 + output2 + output3);
  counter++;
  return count > 100 || total < 2.7 ? total : false;
});
network.run();
