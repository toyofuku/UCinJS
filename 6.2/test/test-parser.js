var parser = require('../lib/lambda-calculus');

var parse_tree = parser.parse('-> x { x[x] }[-> y { y }]');

console.log(parse_tree);
