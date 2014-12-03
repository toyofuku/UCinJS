var Tape = require('../../5.1/lib/tape')
  , TMRule = require('../../5.1/lib/tm-rule')
  , TMConfiguration = require('../../5.1/lib/tm-configuration')
  , DTMRulebook = require('../../5.1/lib/dtm-rulebook')
  , DTM = require('../../5.1/lib/dtm')
  , assert = require('assert');


var rulebook = new DTMRulebook([
  new TMRule(1, 'a', 2, 'a', 'right'),
  new TMRule(1, 'b', 3, 'b', 'right'),
  new TMRule(1, 'c', 4, 'c', 'right'),

  new TMRule(2, 'a', 2, 'a', 'right'),
  new TMRule(2, 'b', 2, 'b', 'right'),
  new TMRule(2, 'c', 2, 'c', 'right'),
  new TMRule(2, '_', 5, 'a', 'right'),

  new TMRule(3, 'a', 3, 'a', 'right'),
  new TMRule(3, 'b', 3, 'b', 'right'),
  new TMRule(3, 'c', 3, 'c', 'right'),
  new TMRule(3, '_', 5, 'b', 'right'),

  new TMRule(4, 'a', 4, 'a', 'right'),
  new TMRule(4, 'b', 4, 'b', 'right'),
  new TMRule(4, 'c', 4, 'c', 'right'),
  new TMRule(4, '_', 5, 'c', 'right')
]);

tape = new Tape([], 'b', ['c', 'b', 'c', 'a'], '_');
console.log(tape);
dtm = new DTM(new TMConfiguration(1, tape), [5], rulebook);

dtm.run();
console.log( dtm.current_configuration.tape );

