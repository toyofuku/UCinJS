var Number = require('../lib/number');
var Add = require('../lib/add');
var Multiply = require('../lib/multiply');
var Machine = require('../lib/machine-0');

new Machine(
  new Add(
    new Multiply(
      new Number(1), new Number(2)
    ),
    new Multiply(
      new Number(3), new Number(4)
    )
  )
).run();
