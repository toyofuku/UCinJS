var Number = require('../lib/number')
  , Machine = require('../lib/machine')
  , Variable = require('../lib/variable')
  , Assign = require('../lib/assign')
  , Boolean = require('../lib/boolean')
  , DoNothing = require('../lib/do-nothing')
  , If = require('../lib/if');

new Machine(
  new If(
    new Variable('x'),
    new Assign('y', new Number(1)),
    new DoNothing()
  ),
  { x: new Boolean(false)}
).run();
