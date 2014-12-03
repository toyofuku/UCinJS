var Tape = require('../lib/tape')
  , TMRule = require('../lib/tm-rule')
  , TMConfiguration = require('../lib/tm-configuration')
  , DTMRulebook = require('../lib/dtm-rulebook')
  , DTM = require('../lib/dtm')
  , assert = require('assert');

var rulebook = new DTMRulebook([
  new TMRule(1, '0', 2, '1', 'right'),
  new TMRule(1, '1', 1, '0', 'left'),
  new TMRule(1, '_', 2, '1', 'right'),
  new TMRule(2, '0', 2, '0', 'right'),
  new TMRule(2, '1', 2, '1', 'right'),
  new TMRule(2, '_', 3, '_', 'left')
]);

// console.log( rulebook );

var tape = new Tape(['1', '0', '1'], '1', [], '_');

var configuration = new TMConfiguration(1, tape);
assert.equal( configuration.state, 1 );
assert.equal( configuration.tape.inspect(), '#<Tape 101(1)>' );

configuration = rulebook.next_configuration(configuration);
assert.equal( configuration.state, 1 );
assert.equal( configuration.tape.inspect(), '#<Tape 10(1)0>' );

configuration = rulebook.next_configuration(configuration);
assert.equal( configuration.state, 1 );
assert.equal( configuration.tape.inspect(), '#<Tape 1(0)00>' );

configuration = rulebook.next_configuration(configuration);
assert.equal( configuration.state, 2 );
assert.equal( configuration.tape.inspect(), '#<Tape 11(0)0>' );

var dtm = new DTM(new TMConfiguration(1, tape), [3], rulebook);
console.log(dtm.current_configuration);

assert.equal( dtm.accepting(), false );

dtm.step();
console.log( dtm.current_configuration );

assert.equal( dtm.accepting(), false );

dtm.run();
console.log( dtm.current_configuration );

assert.equal( dtm.accepting(), true );


tape = new Tape(['1', '2', '1'], '1', [], '_');
dtm = new DTM(new TMConfiguration(1, tape), [3], rulebook);
dtm.run();
console.log( dtm.current_configuration );
assert.equal( dtm.accepting(), false );
assert.equal( dtm.stuck(), true );

rulebook = new DTMRulebook([
  new TMRule(1, 'X', 1, 'X', 'right'),
  new TMRule(1, 'a', 2, 'X', 'right'),
  new TMRule(1, '_', 6, '_', 'left'),

  new TMRule(2, 'a', 2, 'a', 'right'),
  new TMRule(2, 'X', 2, 'X', 'right'),
  new TMRule(2, 'b', 3, 'X', 'right'),

  new TMRule(3, 'b', 3, 'b', 'right'),
  new TMRule(3, 'X', 3, 'X', 'right'),
  new TMRule(3, 'c', 4, 'X', 'right'),

  new TMRule(4, 'c', 4, 'c', 'right'),
  new TMRule(4, '_', 5, '_', 'left'),

  new TMRule(5, 'a', 5, 'a', 'left'),
  new TMRule(5, 'b', 5, 'b', 'left'),
  new TMRule(5, 'c', 5, 'c', 'left'),
  new TMRule(5, 'X', 5, 'X', 'left'),
  new TMRule(5, '_', 1, '_', 'right')
]);

tape = new Tape([], 'a', ['a', 'a', 'b', 'b', 'b', 'c', 'c', 'c'], '_');
console.log(tape);
dtm = new DTM(new TMConfiguration(1, tape), [6], rulebook);

for(var times = 10; times > 0; times--){ dtm.step(); }
console.log( dtm.current_configuration );

for(var times = 25; times > 0; times--){ dtm.step(); }
console.log( dtm.current_configuration );

dtm.run();
console.log( dtm.current_configuration );

