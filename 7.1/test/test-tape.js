var T = require('../lib/tape');
var _ = require('../../6.1/lib/fizz-buzz');

var current_tape;
current_tape = T.TAPE(_.EMPTY)(_.ZERO)(_.EMPTY)(_.ZERO);
current_tape = T.TAPE_WRITE(current_tape)(_.ONE);
current_tape = T.TAPE_MOVE_HEAD_RIGHT(current_tape);
current_tape = T.TAPE_WRITE(current_tape)(_.TWO);
current_tape = T.TAPE_MOVE_HEAD_RIGHT(current_tape);
current_tape = T.TAPE_WRITE(current_tape)(_.THREE);
current_tape = T.TAPE_MOVE_HEAD_RIGHT(current_tape);

console.log( _.to_array(T.TAPE_LEFT(current_tape)).map(function(p){return _.to_integer(p);}) );

console.log( _.to_integer(T.TAPE_MIDDLE(current_tape)) );

console.log( _.to_array(T.TAPE_RIGHT(current_tape)).map(function(p){return _.to_integer(p);}) );
