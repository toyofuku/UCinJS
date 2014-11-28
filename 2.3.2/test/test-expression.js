var Number = require('../lib/number')
  , Add = require('../lib/add')
  , Multiply = require('../lib/multiply')
  , LessThan = require('../lib/less-than')
  , Variable = require('../lib/variable');

console.log( new Number(23).evaluate({}) );
console.log( new Variable('x').evaluate({x: new Number(23)}) );
console.log(
  new LessThan(
    new Add(new Variable('x'), new Number(2)),
    new Variable('y')
  ).evaluate({x: new Number(2), y: new Number(5)})
);
