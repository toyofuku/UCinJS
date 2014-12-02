var Tape = require('../lib/tape')
  , assert = require('assert');

var tape = new Tape(['1', '0', '1'], '1', [], '_');

assert.equal(tape.inspect(), '#<Tape 101(1)>');
assert.equal(tape.middle, '1');

assert.equal(tape.move_head_left().inspect(), '#<Tape 10(1)1>');
assert.equal(tape.write('0').inspect(), '#<Tape 101(0)>');
assert.equal(tape.move_head_right().inspect(), '#<Tape 1011(_)>');
assert.equal(tape.move_head_right().write('0').inspect(), '#<Tape 1011(0)>');

