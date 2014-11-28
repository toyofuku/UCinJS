var Number = require('../lib/number');
var Add = require('../lib/add');
var Variable = require('../lib/variable');
var Assign = require('../lib/assign');

var statement = new Assign('x', new Add(new Variable('x'), new Number(1)));
console.log(statement);

var environment = {x: new Number(2)};
console.log(environment);

console.log(statement.reducible);

var _reduced;
_reduced = statement.reduce(environment);
console.log(_reduced);

statement = _reduced[0];
environment = _reduced[1];
_reduced = statement.reduce(environment);
console.log(_reduced);

statement = _reduced[0];
environment = _reduced[1];
_reduced = statement.reduce(environment);
console.log(_reduced);

statement = _reduced[0];
environment = _reduced[1];
console.log(statement.reducible);
