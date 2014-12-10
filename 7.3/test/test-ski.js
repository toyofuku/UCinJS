
var assert = require('assert')
  , SKICombinator = require('../lib/ski-combinator')
  , SKISymbol     = require('../lib/ski-symbol')
  , SKICall       = require('../lib/ski-call');

describe('SKI', function(){
  var S = new SKICombinator('S')
    , K = new SKICombinator('K')
    , I = new SKICombinator('I')
    , x = new SKISymbol('x')
    , y = new SKISymbol('y')
    , z = new SKISymbol('z');

  S.call = function(a, b, c){ return new SKICall(new SKICall(a, c), new SKICall(b, c)); };

  K.call = function(a, b){ return a; };

  I.call = function(a){ return a; };

  describe('SKICall', function(){
    it('should be S[K][I[x]]',function(){
      var expression = new SKICall(new SKICall(S, K), new SKICall(I, x));
      assert.equal('S[K][I[x]]', expression.to_s());
    })
  })

  describe('S#call()', function(){
    it('should be x[z][y[z]]',function(){
      assert.equal('x[z][y[z]]', S.call(x, y, z).to_s());
    })
  })

  describe('arguments', function(){

    var expression = new SKICall(new SKICall(new SKICall(S, x), y), z);

    describe('#left,#right', function(){
      it('should be S, x, y, z',function(){
        assert.equal('S[x][y][z]', expression.to_s());

        var combinator = expression.left.left.left;
        assert.equal('S', combinator.to_s());

        var first_argument = expression.left.left.right;
        assert.equal('x', first_argument.to_s());

        var second_argument = expression.left.right;
        assert.equal('y', second_argument.to_s());

        var third_argument = expression.right;
        assert.equal('z', third_argument.to_s());

        assert.equal('x[z][y[z]]', combinator.call(first_argument, second_argument, third_argument).to_s());
      })
    })

    describe('#arguments()', function(){
      it('should be [x,y,z]',function(){
        assert.equal('S[x][y][z]', expression.to_s());

        var combinator = expression.combinator();
        assert.equal('S', combinator.to_s() );

        var arguments = expression.arguments();
        assert.deepEqual([x,y,z], arguments );

        assert.equal('x[z][y[z]]', combinator.call.apply(this, arguments).to_s() );
      })
    })
  })

  describe('#callable()', function(){
    S.callable = function(){ return arguments.length == 3; };
    K.callable = function(){ return arguments.length == 2; };
    I.callable = function(){ return arguments.length == 1; };

    describe('#callable()', function(){
      it('should be false when x[y][z]', function(){
        var expression = new SKICall(new SKICall(x, y), z);
        assert.equal('x[y][z]', expression.to_s());
        assert.equal(false, expression.combinator().callable.apply(this, expression.arguments()));
      })

      it('should be false when S[x][y]', function(){
        var expression = new SKICall(new SKICall(S, x), y);
        assert.equal('S[x][y]', expression.to_s() );
        assert.equal(false, expression.combinator().callable.apply(this, expression.arguments()));
      })

      it('should be true when S[x][y][z]', function(){
        var expression = new SKICall(new SKICall(new SKICall(S, x), y), z);
        assert.equal('S[x][y][z]', expression.to_s() );
        assert.equal(true, expression.combinator().callable.apply(this, expression.arguments()));
      })
    })

    describe('#reduce()', function(){
      it('should be y[x] when S[K[S[I]]][K][x][y]', function(){
        var swap = new SKICall(new SKICall(S, new SKICall(K, new SKICall(S, I))), K);
        assert.equal('S[K[S[I]]][K]', swap.to_s());

        expression = new SKICall(new SKICall(swap, x), y);
        assert.equal('S[K[S[I]]][K][x][y]',expression.to_s());

        while(expression.reducible()){
          console.log( expression.to_s() );
          expression = expression.reduce();
        }
        console.log( expression.to_s() );
        assert.equal('y[x]',expression.to_s());
      })
    })

    describe('#as_a_function_of()', function(){
      it('should be S[K][I] when S[S[K[S]][K[K]]][K[I]][y]', function(){
        var original = new SKICall(new SKICall(S, K), I);
        assert.equal('S[K][I]', original.to_s());

        var function_ = original.as_a_function_of('x');
        assert.equal('S[S[K[S]][K[K]]][K[I]]', function_.to_s());
        assert.equal(false, function_.reducible());

        var expression = new SKICall(function_, y);
        assert.equal('S[S[K[S]][K[K]]][K[I]][y]',expression.to_s());

        while(expression.reducible()){
          console.log( expression.to_s() );
          expression = expression.reduce();
        }
        console.log( expression.to_s() );
        assert.equal('S[K][I]',expression.to_s());

        assert.equal( expression.to_s(), original.to_s() );
      })

      it('should be S[y][I] when S[S[K[S]][I]][K[I]][y]', function(){
        var original = new SKICall(new SKICall(S, x), I);
        assert.equal('S[x][I]', original.to_s());

        var function_ = original.as_a_function_of('x');
        assert.equal('S[S[K[S]][I]][K[I]]', function_.to_s());

        expression = new SKICall(function_, y);
        assert.equal('S[S[K[S]][I]][K[I]][y]',expression.to_s());

        while(expression.reducible()){
          console.log( expression.to_s() );
          expression = expression.reduce();
        }
        console.log( expression.to_s() );
        assert.equal('S[y][I]',expression.to_s());

        assert.notEqual( expression.to_s(), original.to_s() );
      })
    })
  })
})

describe('Parser', function(){

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

  var two = parser.parse('-> p { -> x { p[p[x]] } }').to_ast();

  describe('#to_ast()',function(){
    it('should be function(p){ return function(x){ return p(p(x)) } }',function(){
      assert.equal('function(p){ return function(x){ return p(p(x)) } }', two.to_s());
    })
  })


  describe('#to_ski()',function(){
    it('should be S[S[K[S]][S[K[K]][I]]][S[S[K[S]][S[K[K]][I]]][K[I]]]',function(){
      var ski = two.to_ski();
      assert.equal('S[S[K[S]][S[K[K]][I]]][S[S[K[S]][S[K[K]][I]]][K[I]]]', ski.to_s());
    })
  })

  describe('SKICall#reduce()',function(){
    var inc = new SKISymbol('inc')
      , zero = new SKISymbol('zero');

    it('should be inc[inc[zero]]',function(){
      expression = new SKICall(new SKICall(two.to_ski(), inc), zero);
      assert.equal('S[S[K[S]][S[K[K]][I]]][S[S[K[S]][S[K[K]][I]]][K[I]]][inc][zero]', expression.to_s());
      while(expression.reducible()){
        console.log( expression );
        expression = expression.reduce();
      }
      console.log( expression );
      assert.equal('inc[inc[zero]]', expression.to_s());
    })
  })

})
