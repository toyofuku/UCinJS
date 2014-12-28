var assert = require('assert')
  , FARule = require('../lib/fa-rule')
  , DFARulebook = require('../lib/dfa-rulebook')
  , DFA = require('../lib/dfa');

describe('DFA', function(){
  var rulebook = new DFARulebook([
    new FARule(1, 'a', 2), new FARule(1, 'b', 1),
    new FARule(2, 'a', 2), new FARule(2, 'b', 3),
    new FARule(3, 'a', 3), new FARule(3, 'b', 3)
  ]);

  describe('#accepting()', function(){
    it('should be true', function(){
      assert.equal(new DFA(1, [1, 3], rulebook).accepting(), true);
    });
    it('should be false', function(){
      assert.equal(new DFA(1, [3], rulebook).accepting(), false);
    });
  });

  describe('#read_character()', function(){
    var dfa = new DFA(1, [3], rulebook);

    it('should be false', function(){
      assert.equal(dfa.accepting(), false);
      dfa.read_character('b');
      assert.equal(dfa.accepting(), false);
      for(var i = 0; i < 3; i++){
        dfa.read_character('a');     
      }
      assert.equal(dfa.accepting(), false);
    });
    it('should be true', function(){
      dfa.read_character('b');
      assert.equal(dfa.accepting(), true);
    });

  });

  describe('#read_string()', function(){
    var dfa = new DFA(1, [3], rulebook);

    it('should be false', function(){
      assert.equal(dfa.accepting(), false);
    });
    it('should be true', function(){
      dfa.read_string('baaab');
      assert.equal(dfa.accepting(), true);
    });

  });

});