var Number = require('../lib/number')
  , Add = require('../lib/add')
  , Variable = require('../lib/variable')
  , Multiply = require('../lib/multiply')
  , LessThan = require('../lib/less-than')
  , Assign = require('../lib/assign')
  , While = require('../lib/while');

var statement = new While(
  new LessThan(new Variable('x'), new Number(5)),
  new Assign('x', new Multiply(new Variable('x'), new Number(3)))
);
console.log(statement);
console.log(statement.evaluate({x: new Number(1)}));
