var assert     = require('assert')
  , SKISymbol  = require('../lib/ski-symbol')
  , SKICall    = require('../lib/ski-call')
  , LCVariable = require('../../6.2/lib/lc-variable')
  , LCCall     = require('../../6.2/lib/lc-call')
  , LCFunction = require('../../6.2/lib/lc-function');

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


describe('-> p { -> x { p[p[x]] } }', function(){

  var two = parser.parse('-> p { -> x { p[p[x]] } }').to_ast();

  it('#to_ast()',function(){
    console.log( two );
    assert.equal('function(p){ return function(x){ return p(p(x)) } }', two.to_s());
  })

  it('#to_ski()',function(){
    var ski = two.to_ski();
    console.log( ski );
    assert.equal('S[S[K[S]][S[K[K]][I]]][S[S[K[S]][S[K[K]][I]]][K[I]]]', ski.to_s());
  })

  describe('#reduce()',function(){
    var inc = new SKISymbol('inc')
      , zero = new SKISymbol('zero');

    it('should be inc[inc[zero]]',function(){
      expression = new SKICall(new SKICall(two.to_ski(), inc), zero);
//      console.log( expression );
      assert.equal('S[S[K[S]][S[K[K]][I]]][S[S[K[S]][S[K[K]][I]]][K[I]]][inc][zero]', expression.to_s());
      while(expression.reducible()){
        console.log( expression.to_s() );
        expression = expression.reduce();
      }
      console.log( expression.to_s() );
      assert.equal('inc[inc[zero]]', expression.to_s());
    })
  })

})
