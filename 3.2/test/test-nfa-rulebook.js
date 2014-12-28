var assert = require('assert')
  , FARule = require('../../3.1/lib/fa-rule')
  , NFARulebook = require('../lib/nfa-rulebook');

describe('NFARulebook', function(){
  describe('#next_states()', function(){
    var rulebook = new NFARulebook([
      new FARule(1, 'a', 1), new FARule(1, 'b', 1), new FARule(1, 'b', 2),
      new FARule(2, 'a', 3), new FARule(2, 'b', 3),
      new FARule(3, 'a', 4), new FARule(3, 'b', 4)
    ]);

    it('should be [1,2]', function(){
      assert.deepEqual(rulebook.next_states([1], 'b'), [1,2]);
    });
    it('should be [1,3]', function(){
      assert.deepEqual(rulebook.next_states([1,2], 'a'), [1,3]);
    });
    it('should be [1,2,4]', function(){
      assert.deepEqual(rulebook.next_states([1,3], 'b'), [1,2,4]);
    });
  });

  describe('#follow_free_moves()', function(){
    var rulebook = new NFARulebook([
      new FARule(1, null, 2), new FARule(1, null, 4),
      new FARule(2, 'a', 3),
      new FARule(3, 'a', 2),
      new FARule(4, 'a', 5),
      new FARule(5, 'a', 6),
      new FARule(6, 'a', 4)
    ]);

    it('should be [2,4]', function(){
      assert.deepEqual(rulebook.next_states([1], null), [2,4]);
    });

    it('should be [1,2,4]', function(){
      assert.deepEqual(rulebook.follow_free_moves([1]), [1,2,4]);
    });

  });

});