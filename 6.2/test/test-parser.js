var LCVariable = require('../lib/lc-variable');
var LCFunction = require('../lib/lc-function');
var LCCall = require('../lib/lc-call');

var parser = require('../lib/lambda-calculus');

parser.Parser.CallsNode = {
  to_ast: function(){
    return this.arguments()
      .map(function(e){ return e.to_ast(); })
      .reduce(function(l, r){ return new LCCall(l,r); }, this.first.to_ast());
  },
  arguments: function(){
    return this.rest.elements.map(function(e){ return e.expression; });
  }

};

parser.Parser.VariableNode = {
  to_ast: function(){
    return new LCVariable(this.textValue);
  }
};

parser.Parser.FunctionNode = {
  to_ast: function(){
    return new LCFunction(this.parameter.textValue, this.body.to_ast());
  }
};


var parse_tree = parser.parse('-> x { x[x] }[-> y { y }]');

 console.log( parse_tree );

var expression = parse_tree.to_ast();

console.log( expression );

console.log( expression.reduce() );
