var assert = require('assert')
  , SKICombinator = require('../../7.3/lib/ski-combinator')
  , SKISymbol     = require('../../7.3/lib/ski-symbol')
  , SKICall       = require('../../7.3/lib/ski-call');

var S = new SKICombinator('S')
, K = new SKICombinator('K')
, I = new SKICombinator('I')
, x = new SKISymbol('x')
, y = new SKISymbol('y')
, z = new SKISymbol('z');

var IOTA = new SKICombinator('ι');

IOTA.call = function(a){ return new SKICall(new SKICall(a, S), K); };
IOTA.callable = function(){ return arguments.length == 1; }

SKISymbol.prototype.to_iota = function(){ return this; };
SKICall.prototype.to_iota = function(){ return new SKICall(this.left.to_iota(), this.right.to_iota()); };

S.callable = function(){ return arguments.length == 3; };
K.callable = function(){ return arguments.length == 2; };
I.callable = function(){ return arguments.length == 1; };
S.call = function(a, b, c){ return new SKICall(new SKICall(a, c), new SKICall(b, c)); };
K.call = function(a, b){ return a; };
I.call = function(a){ return a; };
S.to_iota = function(){ return new SKICall(IOTA, new SKICall(IOTA, new SKICall(IOTA, new SKICall(IOTA,IOTA)))); };
K.to_iota = function(){ return new SKICall(IOTA, new SKICall(IOTA, new SKICall(IOTA, IOTA))); };
I.to_iota = function(){ return new SKICall(IOTA, IOTA); };

describe('S', function(){
  it('should be S when ι[ι[ι[ι[ι]]]]', function(){
    var expression = S.to_iota();
    assert.equal('ι[ι[ι[ι[ι]]]]', expression.to_s());
    while(expression.reducible()){
      console.log( expression.to_s() );
      expression = expression.reduce();
    }
    console.log( expression.to_s() );
    assert.equal('S', expression.to_s());
  })
})

describe('K', function(){
  it('should be K when ι[ι[ι[ι]]]', function(){
    var expression = K.to_iota();
    assert.equal('ι[ι[ι[ι]]]', expression.to_s());
    while(expression.reducible()){
      console.log( expression.to_s() );
      expression = expression.reduce();
    }
    console.log( expression.to_s() );
    assert.equal('K', expression.to_s());
  })
})

describe('I', function(){
  it('should be I when ι[ι]', function(){
    var expression = I.to_iota();
    assert.equal('ι[ι]', expression.to_s());
    while(expression.reducible()){
      console.log( expression.to_s() );
      expression = expression.reduce();
    }
    console.log( expression.to_s() );
    assert.equal('S[K][K[K]]', expression.to_s());
  })

  it('should be x when S[K][K[K]]', function(){
    var identity = new SKICall(new SKICall(S, K), new SKICall(K, K));
    assert.equal('S[K][K[K]]', identity.to_s());
    var expression = new SKICall(identity, x);
    assert.equal('S[K][K[K]][x]', expression.to_s());    
    while(expression.reducible()){
      console.log( expression.to_s() );
      expression = expression.reduce();
    }
    console.log( expression.to_s() );
    assert.equal('x', expression.to_s());

  })
})

describe('two', function(){

  SKICall.prototype.as_a_function_of = function(name){
    var left_function = this.left.as_a_function_of(name);
    var right_function = this.right.as_a_function_of(name);
    return new SKICall(new SKICall(S, left_function), right_function);
  };
  SKICombinator.prototype.as_a_function_of = function(name){
    return new SKICall(K, this);
  };
  SKISymbol.prototype.as_a_function_of = function(name){
    if(this.name == name){
      return I;
    } else {
      return new SKICall(K, this);
    }
  };

  var LCVariable = require('../../6.2/lib/lc-variable')
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

    var inc = new SKISymbol('inc')
      , zero = new SKISymbol('zero')
      , two = parser.parse('-> p { -> x { p[p[x]] } }').to_ast();

  it('should be inc[inc[zero]]',function(){
    assert.equal('S[S[K[S]][S[K[K]][I]]][S[S[K[S]][S[K[K]][I]]][K[I]]]', two.to_ski().to_s());
    assert.equal('ι[ι[ι[ι[ι]]]][ι[ι[ι[ι[ι]]]][ι[ι[ι[ι]]][ι[ι[ι[ι[ι]]]]]][ι[ι[ι[ι[ι]]]][ι[ι[ι[ι]]][ι[ι[ι[ι]]]]][ι[ι]]]][ι[ι[ι[ι[ι]]]][ι[ι[ι[ι[ι]]]][ι[ι[ι[ι]]][ι[ι[ι[ι[ι]]]]]][ι[ι[ι[ι[ι]]]][ι[ι[ι[ι]]][ι[ι[ι[ι]]]]][ι[ι]]]][ι[ι[ι[ι]]][ι[ι]]]]',
        two.to_ski().to_iota().to_s() );

    var expression = new SKICall(new SKICall(two.to_ski().to_iota(), inc), zero);
    
    while(expression.reducible()){
//      console.log( expression.to_s() );
      expression = expression.reduce();
    }
    console.log( expression.to_s() );
    assert.equal('inc[inc[zero]]', expression.to_s());

  })
})