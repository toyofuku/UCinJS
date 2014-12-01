var While = require('../../2.4/lib/while');
var Assign = require('../../2.4/lib/assign');
var LessThan = require('../../2.4/lib/less-than');
var Multiply = require('../../2.4/lib/multiply');
var Number = require('../../2.4/lib/number');
var Variable = require('../../2.4/lib/variable');

var parser = require('../lib/simple');

parser.Parser.WhileNode = {
  to_ast: function(){
    return new While(this.condition.to_ast(), this.body.to_ast());
  }
};

parser.Parser.AssignNode = {
  to_ast: function(){
    return new Assign(this.name.textValue, this.expression.to_ast());
  }
};

parser.Parser.LessThanNode = {
  to_ast: function(){
    return new LessThan(this.left.to_ast(), this.right.to_ast());
  }
};

parser.Parser.MultiplyNode = {
  to_ast: function(){
    return new Multiply(this.left.to_ast(), this.right.to_ast());
  }
};

parser.Parser.NumberNode = {
  to_ast: function(){
    return new Number(parseInt(this.textValue,10));
  }
};

parser.Parser.VariableNode = {
  to_ast: function(){
    return new Variable(this.textValue);
  }
};

var parse_tree = parser.parse('while (x < 5) { x = x * 3 }')

// console.log(parse_tree);

var statement = parse_tree.to_ast();
console.log( statement );

console.log( statement.evaluate({ x: new Number(1) }) );

console.log( statement.to_js() );


