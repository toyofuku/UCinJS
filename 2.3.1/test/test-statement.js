var Number = require('../lib/number')
  , Add = require('../lib/add')
  , Machine = require('../lib/machine')
  , Variable = require('../lib/variable')
  , Assign = require('../lib/assign');

new Machine(
  new Assign('x', new Add(new Variable('x'), new Number(1))),
  { x: new Number(2)}
).run();
