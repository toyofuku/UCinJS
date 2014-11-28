var Number = require('../lib/number')
  , Multiply = require('../lib/multiply')
  , Machine = require('../lib/machine')
  , LessThan = require('../lib/less-than')
  , Variable = require('../lib/variable')
  , Assign = require('../lib/assign')
  , While = require('../lib/while');

new Machine(
  new While(
    new LessThan(new Variable('x'), new Number(5)),
    new Assign('x', new Multiply(new Variable('x'), new Number(3)))
  ),
  {'x': new Number(1)}
).run();
