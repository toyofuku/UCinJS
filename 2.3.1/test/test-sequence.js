var Number = require('../lib/number')
  , Add = require('../lib/add')
  , Machine = require('../lib/machine')
  , Variable = require('../lib/variable')
  , Assign = require('../lib/assign')
  , Sequence = require('../lib/sequence');

new Machine(
  new Sequence(
    new Assign('x', new Add(new Number(1), new Number(1))),
    new Assign('y', new Add(new Variable('x'), new Number(3)))
  ),
  {}
).run();
