var Tape = require('../../5.1/lib/tape')
  , TMRule = require('../../5.1/lib/tm-rule')
  , TMConfiguration = require('../../5.1/lib/tm-configuration')
  , DTMRulebook = require('../../5.1/lib/dtm-rulebook')
  , DTM = require('../../5.1/lib/dtm')
  , assert = require('assert');

var increment_rules = function(start_state, return_state){
  var incrementing = start_state;
  var finishing = {};
  var finished = return_state;
  return [
   new TMRule(incrementing, '0', finishing,    '1', 'right'),
   new TMRule(incrementing, '1', incrementing, '0', 'left'),
   new TMRule(incrementing, '_', finishing,    '1', 'right'),
   new TMRule(finishing,    '0', finishing,    '0', 'right'),
   new TMRule(finishing,    '1', finishing,    '1', 'right'),
   new TMRule(finishing,    '_', finished,     '_', 'left')
  ];
};

var added_zero  = 0,
    added_one   = 1,
    added_two   = 2,
    added_three = 3;

var rulebook = new DTMRulebook(
  [].concat(increment_rules(added_zero, added_one))
  .concat(increment_rules(added_one,  added_two))
  .concat(increment_rules(added_two,  added_three))
);

console.log( rulebook.rules.length );

tape = new Tape(['1', '0', '1'], '1', [], '_');
console.log(tape);
dtm = new DTM(new TMConfiguration(added_zero, tape), [added_three], rulebook);

dtm.run();
console.log( dtm.current_configuration.tape );

