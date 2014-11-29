var Number = require('../lib/number')
  , Boolean = require('../lib/boolean')
  , Variable = require('../lib/variable')
  , Add = require('../lib/add')
  , Multiply = require('../lib/multiply')
  , LessThan = require('../lib/less-than');

console.log( new Number(5).to_js() );
console.log( new Boolean(false).to_js() );

var proc;

proc = eval( new Number(5).to_js() );
console.log( proc );
console.log( proc({}) );

proc = eval( new Boolean(false).to_js() );
console.log( proc );
console.log( proc({}) );

var expression = new Variable('x');
console.log( expression );
console.log( expression.to_js() );
proc = eval( expression.to_js() );
console.log( proc );
console.log( proc({x: 7}) );

console.log( new Add( new Variable('x'), new Number(1) ).to_js() );
console.log( new LessThan( new Add(new Variable('x'), new Number(1)), new Number(3) ).to_js() );

var environment = {x: 3};
console.log( environment );
proc = eval( new Add( new Variable('x'), new Number(1) ).to_js() );
console.log( proc );
console.log( proc(environment) );

proc = eval( new LessThan( new Add(new Variable('x'), new Number(1)), new Number(3) ).to_js() );
console.log( proc );
console.log( proc(environment) );



