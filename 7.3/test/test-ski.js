
var assert = require('assert')
  , SKICombinator = require('../lib/ski-combinator')
  , SKISymbol = require('../lib/ski-symbol')
  , SKICall = require('../lib/ski-call')
  , S = new SKICombinator('S')
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

  it('S.call',function(){
    assert.equal('x[z][y[z]]', S.call(x, y, z).to_s());
  })

  describe('S[x][y][z]', function(){

    var expression = new SKICall(new SKICall(new SKICall(S, x), y), z);

    it('left/right',function(){
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

    it('#arguments()',function(){
      assert.equal('S[x][y][z]', expression.to_s());

      var combinator = expression.combinator();
      assert.equal('S', combinator.to_s() );

      var arguments = expression.arguments();
      assert.deepEqual([x,y,z], arguments );

      assert.equal('x[z][y[z]]', combinator.call.apply(this, arguments).to_s() );
    })
  })

  describe('callable', function(){
    S.callable = function(){ return arguments.length == 3; };
    K.callable = function(){ return arguments.length == 2; };
    I.callable = function(){ return arguments.length == 1; };

    it('#callable()', function(){
      var expression = new SKICall(new SKICall(x, y), z);
      assert.equal('x[y][z]', expression.to_s());
      assert.equal(false, expression.combinator().callable.apply(this, expression.arguments()));

      expression = new SKICall(new SKICall(S, x), y);
      assert.equal('S[x][y]', expression.to_s() );
      assert.equal(false, expression.combinator().callable.apply(this, expression.arguments()));

      expression = new SKICall(new SKICall(new SKICall(S, x), y), z);
      assert.equal('S[x][y][z]', expression.to_s() );
      assert.equal(true, expression.combinator().callable.apply(this, expression.arguments()));
    })

    it('#reducible()', function(){
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

    it('#as_a_function_of', function(){
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

    it('#as_a_function_of()', function(){
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
