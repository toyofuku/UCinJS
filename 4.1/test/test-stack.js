var assert = require('assert')
  , Stack = require('../../4.1/lib/stack');

describe('Stack', function(){
  describe('abcde', function(){
    var stack = new Stack(['a', 'b', 'c', 'd', 'e']);

    it('should be #<Stack (a)bcde>', function(){
      assert.equal(stack.inspect(), '#<Stack (a)bcde>');
    });
    it('should be a', function(){
      assert.equal(stack.top(), 'a');
    });
    it('should be c', function(){
      assert.equal(stack.pop().pop().top(), 'c');
    });
    it('should be y', function(){
      assert.equal(stack.push('x').push('y').top(), 'y');
    });

    it('should be x', function(){
      assert.equal(stack.push('x').push('y').pop().top(), 'x');
    });
  });

  describe('zyx$', function(){
    var stack = new Stack(['$']).push('x').push('y').push('z');

    it('should be #<Stack (z)yx$>', function(){
      assert.equal(stack.inspect(), '#<Stack (z)yx$>');
    });
    it('should be z', function(){
      assert.equal(stack.top(), 'z');
    });
    it('should be y', function(){
      stack = stack.pop();
      assert.equal(stack.top(), 'y');
    });
    it('should be x', function(){
      stack = stack.pop();
      assert.equal(stack.top(), 'x');
    });
  });

});
