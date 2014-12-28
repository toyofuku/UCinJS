var assert = require('assert')
  , FARule = require('../../3.1/lib/fa-rule')
  , NFARulebook = require('../lib/nfa-rulebook')
  , NFA = require('../lib/nfa');

describe('NFA', function(){

  var rulebook = new NFARulebook([
    new FARule(1, 'a', 1), new FARule(1, 'b', 1), new FARule(1, 'b', 2),
    new FARule(2, 'a', 3), new FARule(2, 'b', 3),
    new FARule(3, 'a', 4), new FARule(3, 'b', 4)
  ]);

  describe('#accepting()', function(){
    it('should be false', function(){
      assert.equal(new NFA([1],[4],rulebook).accepting(), false);
    });
    it('should be true', function(){
      assert.equal(new NFA([1,2,4],[4],rulebook).accepting(), true);
    });
  });

  describe('#read_character()', function(){
    var nfa = new NFA([1],[4],rulebook);

    it('should be false', function(){
      assert.equal(nfa.accepting(), false);
      nfa.read_character('b');
      assert.equal(nfa.accepting(), false);
      nfa.read_character('a');
      assert.equal(nfa.accepting(), false);
    });
    it('should be true', function(){
      nfa.read_character('b');
      assert.equal(nfa.accepting(), true);
    });
  });

  describe('#read_string()', function(){
    var nfa = new NFA([1],[4],rulebook);

    it('should be false', function(){
      assert.equal(nfa.accepting(), false);
    });
    it('should be true', function(){
      nfa.read_string('bbbbb');
      assert.equal(nfa.accepting(), true);
    });
  });

});