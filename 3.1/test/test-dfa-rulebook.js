var assert = require('assert')
  , FARule = require('../lib/fa-rule')
  , DFARulebook = require('../lib/dfa-rulebook');

describe('DFARulebook', function(){
  describe('#next_state()', function(){
    var rulebook = new DFARulebook([
      new FARule(1, 'a', 2), new FARule(1, 'b', 1),
      new FARule(2, 'a', 2), new FARule(2, 'b', 3),
      new FARule(3, 'a', 3), new FARule(3, 'b', 3)
    ]);

    it('should be 2', function(){
      assert.equal(rulebook.next_state(1, 'a'), 2);
    });
    it('should be 1', function(){
      assert.equal(rulebook.next_state(1, 'b'), 1);
    });
    it('should be 3', function(){
      assert.equal(rulebook.next_state(2, 'b'), 3);
    });

  });
});