
var util = require('util')
  , SKICombinator = require('../lib/ski-combinator')
  , SKISymbol = require('../lib/ski-symbol')
  , SKICall = require('../lib/ski-call');

var S = new SKICombinator('S')
  , K = new SKICombinator('K')
  , I = new SKICombinator('I');

var x = new SKISymbol('x');

var expression = new SKICall(new SKICall(S, K), new SKICall(I, x));

console.log( expression.to_s() );


S.call = function(a, b, c){ return new SKICall(new SKICall(a, c), new SKICall(b, c)); };

K.call = function(a, b){ return a; };

I.call = function(a){ return a; };

var y = new SKISymbol('y')
  , z = new SKISymbol('z');

console.log( S.call(x, y, z) );


expression = new SKICall(new SKICall(new SKICall(S, x), y), z);
console.log( expression.to_s() );

var combinator = expression.left.left.left;
console.log( combinator );

var first_argument = expression.left.left.right;
console.log( first_argument );

var second_argument = expression.left.right;
console.log( second_argument );

var third_argument = expression.right;
console.log( third_argument );

console.log( combinator.call(first_argument, second_argument, third_argument) );

combinator = expression.combinator();
console.log( combinator );

var arguments = expression.arguments();
console.log( arguments );

console.log( combinator.call.apply(this, arguments).to_s() );

S.callable = function(){ return arguments.length == 3; };
K.callable = function(){ return arguments.length == 2; };
I.callable = function(){ return arguments.length == 1; };

expression = new SKICall(new SKICall(x, y), z);
console.log( expression.to_s() );
console.log( expression.combinator().callable.apply(this, expression.arguments()));

expression = new SKICall(new SKICall(S, x), y);
console.log( expression.to_s() );
console.log( expression.combinator().callable.apply(this, expression.arguments()));

expression = new SKICall(new SKICall(new SKICall(S, x), y), z);
console.log( expression.to_s() );
console.log( expression.combinator().callable.apply(this, expression.arguments()));

var swap = new SKICall(new SKICall(S, new SKICall(K, new SKICall(S, I))), K);
console.log( swap.to_s() );
expression = new SKICall(new SKICall(swap, x), y);
console.log( expression.to_s() );
while(expression.reducible()){
	console.log( expression.to_s() );
	expression = expression.reduce();
}
console.log( expression.to_s() );


var original = new SKICall(new SKICall(S, K), I);
console.log( original.to_s() );
var function_ = original.as_a_function_of('x');
console.log( function_ );
console.log( function_.reducible() );

expression = new SKICall(function_, y);
console.log( expression );
while(expression.reducible()){
	console.log( expression.to_s() );
	expression = expression.reduce();
}
console.log( expression.to_s() );

console.log( expression.to_s() == original.to_s() );


var original = new SKICall(new SKICall(S, x), I);
console.log( original.to_s() );
function_ = original.as_a_function_of('x');
console.log( function_ );

expression = new SKICall(function_, y);
console.log( expression );
while(expression.reducible()){
	console.log( expression.to_s() );
	expression = expression.reduce();
}
console.log( expression.to_s() );

console.log( expression.to_s() == original.to_s() );


