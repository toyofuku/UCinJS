var Number = require('../lib/number');
var Add = require('../lib/add');
var Multiply = require('../lib/multiply');
var Machine = require('../lib/machine-0');
var LessThan = require('../lib/less-than');

new Machine(
  new LessThan(
    new Number(5),
    new Add(
      new Number(2), new Number(2)
    )
  )
).run();
