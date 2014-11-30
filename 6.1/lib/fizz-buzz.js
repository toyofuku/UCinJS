
var ZERO  = function(p){ return function(x){ return       x;    }; };
var ONE   = function(p){ return function(x){ return     p(x);   }; };
var TWO   = function(p){ return function(x){ return   p(p(x));  }; };
var THREE = function(p){ return function(x){ return p(p(p(x))); }; };
var FIVE     = function(p){ return function(x){ return p(p(p(p(p(x))))); }; };
var FIFTEEN  = function(p){ return function(x){ return p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(x))))))))))))))); }; };
var HUNDRED  = function(p){ return function(x){ return p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(
p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(x
)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))); }; };

var to_integer = function(proc){ return proc( function(n){return n + 1;} )(0); };

exports.ZERO = ZERO;
exports.ONE = ONE;
exports.TWO = TWO;
exports.THREE = THREE;
exports.FIVE = FIVE;
exports.FIFTEEN = FIFTEEN;
exports.HUNDRED = HUNDRED;
exports.to_integer = to_integer;

var TRUE  = function(x){ return function(y){ return x; }; };
var FALSE = function(x){ return function(y){ return y; }; };
/*
var IF = function(b){
  return function(x){
    return function(y){
      return b(x)(y);
    };
  };
};
*/
var IF = function(b){ return b; };

// var to_boolean = function(proc){ return proc(true)(false); };
var to_boolean = function(proc){ return IF(proc)(true)(false); };

exports.TRUE = TRUE;
exports.FALSE = FALSE;
exports.IF = IF;
exports.to_boolean = to_boolean;

var IS_ZERO = function(n){ return n( function(x){return FALSE;} )(TRUE); };

exports.IS_ZERO = IS_ZERO;

var PAIR  = function(x){ return function(y){ return function(f){ return f(x)(y); }; }; };
var LEFT  = function(p){ return p( function(x){ return function(y){return x;}; } ); };
var RIGHT = function(p){ return p( function(x){ return function(y){return y;}; } ); };

exports.PAIR = PAIR;
exports.LEFT = LEFT;
exports.RIGHT = RIGHT;

var INCREMENT = function(n){ return function(p){ return function(x){ return p( n(p)(x) ); }; }; };
var SLIDE = function(p){ return PAIR(RIGHT(p))(INCREMENT(RIGHT(p))); };
var DECREMENT = function(n){ return LEFT(n(SLIDE)(PAIR(ZERO)(ZERO))); };

exports.INCREMENT = INCREMENT;
exports.DECREMENT = DECREMENT;

var ADD       = function(m){ return function(n){ return n(INCREMENT)(m); }; };
var SUBSTRACT = function(m){ return function(n){ return n(DECREMENT)(m); }; };
var MULTIPLY  = function(m){ return function(n){ return n(ADD(m))(ZERO); }; };
var POWER     = function(m){ return function(n){ return n(MULTIPLY(m))(ONE); }; };

exports.ADD = ADD;
exports.SUBSTRACT = SUBSTRACT;
exports.MULTIPLY = MULTIPLY;
exports.POWER = POWER;

var IS_LESS_OR_EQUAL = function(m){ return function(n){ return IS_ZERO(SUBSTRACT(m)(n)); }; };

exports.IS_LESS_OR_EQUAL = IS_LESS_OR_EQUAL;

/*
var MOD = function(m){ return function(n){
  return IF(IS_LESS_OR_EQUAL(n)(m))(
         function(x){
           return MOD(SUBSTRACT(m)(n))(n)(x)
         }
         )( m )
}; };
*/

// var Y = function(f){ return (function(x){ return f(x(x)); })( function(x){ return f(x(x)); } ) };

var Z = function(f){ return (function(x){ return f( function(y){ return x(x)(y); } ); })( function(x){ return f( function(y){ return x(x)(y); } ); } ) };

var MOD = Z( function(f){
return function(m){ return function(n){
  return IF( IS_LESS_OR_EQUAL(n)(m) )(
         function(x){
           return f(SUBSTRACT(m)(n))(n)(x)
         }
         )( m )
}; } } );

exports.MOD = MOD;

var EMPTY    = PAIR(TRUE)(TRUE);
var UNSHIFT  = function(l){ return function(x){ return PAIR(FALSE)(PAIR(x)(l)); }; };
var IS_EMPTY = LEFT;
var FIRST    = function(l){ return LEFT(RIGHT(l)); };
var REST     = function(l){ return RIGHT(RIGHT(l)); };

exports.EMPTY = EMPTY;
exports.UNSHIFT = UNSHIFT;
exports.IS_EMPTY = IS_EMPTY;
exports.FIRST = FIRST;
exports.REST = REST;

var to_array = function(proc){
  var array = [];
  while(! to_boolean(IS_EMPTY(proc))){
    array.push(FIRST(proc));
    proc = REST(proc);
  }
  return array;
};

exports.to_array = to_array;

var RANGE = Z(function(f){
  return function(m){ return function(n){
    return IF(IS_LESS_OR_EQUAL(m)(n))(
      function(x){ return UNSHIFT(f(INCREMENT(m))(n))(m)(x);}
    )(
      EMPTY
    );
  }; };
});

exports.RANGE = RANGE;

var FOLD = Z(
  function(f){
    return function(l){ return function(x){ return function(g){
      return IF(IS_EMPTY(l))(x)(function(y){return g(f(REST(l))(x)(g))(FIRST(l))(y);});
    }; }; };
  }
);

exports.FOLD = FOLD;

var MAP = function(k){ return function(f){
  return FOLD(k)(EMPTY)(
    function(l){ return function(x){ return UNSHIFT(l)(f(x));} ;}
  );
}; };

exports.MAP = MAP;

var TEN = MULTIPLY(TWO)(FIVE)
, B = TEN
, F = INCREMENT(B)
, I = INCREMENT(F)
, U = INCREMENT(I)
, ZED = INCREMENT(U)
, FIZZ = UNSHIFT(UNSHIFT(UNSHIFT(UNSHIFT(EMPTY)(ZED))(ZED))(I))(F)
, BUZZ = UNSHIFT(UNSHIFT(UNSHIFT(UNSHIFT(EMPTY)(ZED))(ZED))(U))(B)
, FIZZBUZZ = UNSHIFT(UNSHIFT(UNSHIFT(UNSHIFT(BUZZ)(ZED))(ZED))(I))(F);

exports.TEN = TEN;
exports.ZED = ZED;
exports.FIZZ = FIZZ;
exports.BUZZ = BUZZ;
exports.FIZZBUZZ = FIZZBUZZ;

var to_char = function(c){
  return '0123456789BFiuz'.charAt(to_integer(c));
};

var to_string = function(s){
  return to_array(s).map(function(c){ return to_char(c); }).join('');
};

exports.to_char = to_char;
exports.to_string = to_string;

var DIV = Z(function(f){return function(m){return function(n){
  return IF(IS_LESS_OR_EQUAL(n)(m))(
    function(x){
      return INCREMENT(f(SUBSTRACT(m)(n))(n))(x);
    }
  )(ZERO);
};};});

var PUSH = function(l){return function(x){ return FOLD(l)(UNSHIFT(EMPTY)(x))(UNSHIFT);}; };

var TO_DIGITS = Z(function(f){return function(n){return PUSH(
  IF(IS_LESS_OR_EQUAL(n)(DECREMENT(TEN)))(
    EMPTY
  )(
    function(x){
      return f(DIV(n)(TEN))(x);
    }
  )
)(MOD(n)(TEN));}});

exports.TO_DIGITS = TO_DIGITS;

var solution = MAP(RANGE(ONE)(HUNDRED))(function(n){
  return IF( IS_ZERO(MOD(n)(FIFTEEN)) )(
    FIZZBUZZ
  )(IF( IS_ZERO(MOD(n)(THREE)) )(
    FIZZ
  )(IF(IS_ZERO(MOD(n)(FIVE)) )(
    BUZZ
  )(
    TO_DIGITS(n)
  )));
});

exports.solution = solution;


var ZEROS = Z(function(f){ return UNSHIFT(f)(ZERO); });
exports.ZEROS = ZEROS;

var to_array = function(l, count){
  var array = [];
  while(! (to_boolean(IS_EMPTY(l)) || count == 0)){
    array.push(FIRST(l));
    l = REST(l);
    if(count){count--;}
  }
  return array;
};

exports.to_array = to_array;

var UPWARDS_OF = Z(function(f){ return function(n){ return UNSHIFT( function(x){ return f(INCREMENT(n))(x);} )(n)}; });
exports.UPWARDS_OF = UPWARDS_OF;

var MULTIPLES_OF = function(m){ return Z(function(f){
  return function(n){ return UNSHIFT(function(x){ return f(ADD(m)(n))(x);})(n);};
})(m); };
exports.MULTIPLES_OF = MULTIPLES_OF;

var MULTIPLY_STREAMS = Z(function(f){
  return function(k){ return function(l){
    return UNSHIFT(function(x){return f(REST(k))(REST(l))(x);})(MULTIPLY(FIRST(k))(FIRST(l)));
  };};
});

exports.MULTIPLY_STREAMS = MULTIPLY_STREAMS;


var MOD_ = function(m){ return function(n){
  return m(function(x){
    return IF(IS_LESS_OR_EQUAL(n)(x))(
      SUBSTRACT(x)(n)
    )(
      x
    );
  })(m);
}; };

exports.MOD_ = MOD_;

var COUNTDOWN = function(p){return PAIR(UNSHIFT(LEFT(p))(RIGHT(p)))(DECREMENT(RIGHT(p))); };
exports.COUNTDOWN = COUNTDOWN;

var RANGE_ = function(m){ return function(n){ return LEFT(INCREMENT(SUBSTRACT(n)(m))(COUNTDOWN)(PAIR(EMPTY)(n))); }; };
exports.RANGE_ = RANGE_;
