var _ = require('../../6.1/lib/fizz-buzz');

var TAPE = function(l){
  return function(m){
    return function(r){
      return function(b){
        return _.PAIR(_.PAIR(l)(m))(_.PAIR(r)(b));
      };
    };
  };
};

var TAPE_LEFT   = function(t){ return _.LEFT(_.LEFT(t)); };
var TAPE_MIDDLE = function(t){ return _.RIGHT(_.LEFT(t)); };
var TAPE_RIGHT  = function(t){ return _.LEFT(_.RIGHT(t)); };
var TAPE_BLANK  = function(t){ return _.RIGHT(_.RIGHT(t)); };

var TAPE_WRITE  = function(t){ return function(c){
  return TAPE(TAPE_LEFT(t))(c)(TAPE_RIGHT(t))(TAPE_BLANK(t));
}; };

var TAPE_MOVE_HEAD_RIGHT = function(t){
  return TAPE(
    _.PUSH(TAPE_LEFT(t))(TAPE_MIDDLE(t))
  )(
    _.IF(_.IS_EMPTY(TAPE_RIGHT(t)))(
      TAPE_BLANK(t)
    )(
      _.FIRST(TAPE_RIGHT(t))
    )
  )(
    _.IF(_.IS_EMPTY(TAPE_RIGHT(t)))(
      _.EMPTY
    )(
      _.REST(TAPE_RIGHT(t))
    )
  )(
    TAPE_BLANK(t)
  );
};

exports.TAPE        = TAPE,
exports.TAPE_LEFT   = TAPE_LEFT,
exports.TAPE_MIDDLE = TAPE_MIDDLE,
exports.TAPE_RIGHT  = TAPE_RIGHT,
exports.TAPE_BLANK  = TAPE_BLANK,
exports.TAPE_WRITE  = TAPE_WRITE,
exports.TAPE_MOVE_HEAD_RIGHT = TAPE_MOVE_HEAD_RIGHT;
