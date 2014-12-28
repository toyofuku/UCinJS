var assert = require('assert')
  , FARule = require('../lib/fa-rule')
  , DFARulebook = require('../lib/dfa-rulebook')
  , DFA = require('../lib/dfa')
  , DFADesign = require('../lib/dfa-design');

describe('DFADesign', function(){
  var rulebook = new DFARulebook([
    new FARule(1, 'a', 2), new FARule(1, 'b', 1),
    new FARule(2, 'a', 2), new FARule(2, 'b', 3),
    new FARule(3, 'a', 3), new FARule(3, 'b', 3)
  ]);
  var dfa_design = new DFADesign(1, [3], rulebook);

  describe('#accepting()', function(){
    it('should be false', function(){
      assert.equal(dfa_design.accepts('a'), false);
      assert.equal(dfa_design.accepts('baa'), false);
    });
    it('should be true', function(){
      assert.equal(dfa_design.accepts('baba'), true);
    });
  });

});