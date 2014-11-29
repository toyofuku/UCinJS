var Number = require('../lib/number')
  , Add = require('../lib/add')
  , Multiply = require('../lib/multiply')
  , Variable = require('../lib/variable')
  , Assign = require('../lib/assign')
  , LessThan = require('../lib/less-than')
  , While = require('../lib/while');

var statement;

statement = new Assign('y', new Add(new Variable('x'), new Number(1)));
console.log( statement );
console.log( statement.to_js() );

var proc;
proc = eval( statement.to_js() );
console.log( proc );
console.log( proc({x: 3}) );

statement = new While(
  new LessThan(new Variable('x'), new Number(5)),
  new Assign('x', new Multiply(new Variable('x'), new Number(3)))
);
console.log( statement );
console.log( statement.to_js() );

proc = eval( statement.to_js() );
console.log( proc );
console.log( proc({x: 1}) );

