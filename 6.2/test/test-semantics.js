var LCVariable = require('../lib/lc-variable')
  , LCFunction = require('../lib/lc-function')
  , LCCall     = require('../lib/lc-call');

var expression = new LCVariable('x');
console.log(expression);

console.log( expression.replace('x', new LCFunction('y', new LCVariable('y'))) );

console.log( expression.replace('z', new LCFunction('y', new LCVariable('y'))) );

expression = 
  new LCCall(
    new LCCall(
      new LCCall(
        new LCVariable('a'),
        new LCVariable('b')
      ),
      new LCVariable('c')
    ),
    new LCVariable('b')
  );

console.log( expression );
console.log( expression.replace('a', new LCVariable('x')) );
console.log( expression.replace('b', new LCFunction('x', new LCVariable('x'))) );

expression = 
  new LCFunction('y',
    new LCCall(new LCVariable('x'), new LCVariable('y'))
  );

console.log( expression );
console.log( expression.replace('x', new LCVariable('z')) );
console.log( expression.replace('y', new LCVariable('z')) );

expression = 
  new LCCall(
    new LCCall(new LCVariable('x'), new LCVariable('y')),
    new LCFunction('y', new LCCall(new LCVariable('y'), new LCVariable('x')))
  );

console.log( expression );
console.log( expression.replace('x', new LCVariable('z')) );
console.log( expression.replace('y', new LCVariable('z')) );

expression = 
  new LCFunction('x',
    new LCCall(new LCVariable('x'), new LCVariable('y'))
  );

console.log( expression );
var replacement = new LCCall(new LCVariable('z'), new LCVariable('x'));
console.log( replacement );
console.log( expression.replace('y', replacement) );

var func = new LCFunction('x',
  new LCFunction('y',
    new LCCall(new LCVariable('x'), new LCVariable('y'))
  ));
console.log( func );
var argument = new LCFunction('z', new LCVariable('z'));
console.log( argument );
console.log( func.call(argument) );


var increment = new LCFunction('n', new LCFunction('p', new LCFunction('x', 
  new LCCall(new LCVariable('p'), 
    new LCCall(new LCCall(new LCVariable('n'), new LCVariable('p')), new LCVariable('x'))))));
// function(n){ return function(p){ return function(x){ return p( n(p)(x) ); }; }; }
// console.log( increment );
var add = new LCFunction('m', new LCFunction('n',
  new LCCall(new LCCall(new LCVariable('n'), increment), new LCVariable('m'))));
// function(m){ return function(n){ return n(INCREMENT)(m); }; }
// console.log( add );
var one = new LCFunction('p', new LCFunction('x', new LCCall(new LCVariable('p'), new LCVariable('x'))));
// function(p){ return function(x){ return p(x); }; }
// console.log( one );

var expression = new LCCall(new LCCall(add, one), one);
// function(m){ return function(n){ return n(function(n){ return function(p){ return function(x){ return p(n(p)(x)) } } })(m) } }(function(p){ return function(x){ return p(x) } })(function(p){ return function(x){ return p(x) } })

while(expression.reducible()){
  console.log( expression );
  expression = expression.reduce();
}
console.log( expression );


var inc = new LCVariable('inc');
var zero = new LCVariable('zero');
var expression = new LCCall(new LCCall(expression, inc), zero);
console.log( expression );
while(expression.reducible()){
  console.log( expression );
  expression = expression.reduce();
}
console.log( expression );

