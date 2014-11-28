var Number = require('../lib/number');
var Add = require('../lib/add');
var Multiply = require('../lib/multiply');

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
