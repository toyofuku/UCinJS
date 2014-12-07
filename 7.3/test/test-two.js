
var SKISymbol = require('../lib/ski-symbol');
var SKICall = require('../lib/ski-call');

var LCVariable = require('../../6.2/lib/lc-variable');
var LCCall     = require('../../6.2/lib/lc-call');
var LCFunction = require('../../6.2/lib/lc-function');

LCVariable.prototype.to_ski = function(){
  return new SKISymbol(this.name);
};
LCCall.prototype.to_ski = function(){
  return new SKICall(this.left.to_ski(), this.right.to_ski());
};
LCFunction.prototype.to_ski = function(){
  return this.body.to_ski().as_a_function_of(this.parameter);
};

var parser     = require('../../6.2/lib/lambda-calculus');

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


var two = parser.parse('-> p { -> x { p[p[x]] } }').to_ast();
console.log( two );

var ski = two.to_ski();
console.log( ski );


var inc = new SKISymbol('inc')
  , zero = new SKISymbol('zero');

expression = new SKICall(new SKICall(two.to_ski(), inc), zero);
console.log( expression );
while(expression.reducible()){
  console.log( expression.to_s() );
  expression = expression.reduce();
}
console.log( expression.to_s() );
