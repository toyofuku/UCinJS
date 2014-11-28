var Number = require('../lib/number');
var Add = require('../lib/add');
var Machine = require('../lib/machine-1');
var Variable = require('../lib/variable');

new Machine(
  new Add(
    new Variable('x'), new Variable('y')
  ),
  { x: new Number(3), y: new Number(4)}
).run();
