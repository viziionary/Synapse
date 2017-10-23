import Synapse from '../../source/index';
var entity = new Brain(20, 2, 3);
entity.evolve(function(entity){
  // run user-designed simulation code
  entity.input([1, 0.5, 0.2, 0, 1 /* ... */ ]);
  var output = entity.output;
  var currentScore = entity.score;
  entity.score = 100;
});
