
var assert = require('assert');

var Number = require('../lib/number');
var Add = require('../lib/add');
var Multiply = require('../lib/multiply');
var Machine = require('../lib/machine-0');
var LessThan = require('../lib/less-than');
var Variable = require('../lib/variable');
var Assign = require('../lib/assign');
var Boolean = require('../lib/boolean');
var DoNothing = require('../lib/do-nothing');
var If = require('../lib/if');
var Sequence = require('../lib/sequence');
var While = require('../lib/while');

var expression = new Add(
  new Multiply(
    new Number(1), new Number(2)
  ),
  new Multiply(
    new Number(3), new Number(4)
  )
);

console.log(expression);
console.log(expression.reducible);

expression = expression.reduce();
console.log(expression);
console.log(expression.reducible);

expression = expression.reduce();
console.log(expression);
console.log(expression.reducible);

expression = expression.reduce();
console.log(expression);
console.log(expression.reducible);
