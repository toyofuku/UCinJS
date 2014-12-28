var assert = require('assert')
  , FARule = require('../../3.1/lib/fa-rule')
  , NFARulebook = require('../lib/nfa-rulebook')
  , NFA = require('../lib/nfa')
  , NFADesign = require('../lib/nfa-design');

describe('NFADesign', function(){

  var rulebook = new NFARulebook([
    new FARule(1, null, 2), new FARule(1, null, 4),
    new FARule(2, 'a', 3),
    new FARule(3, 'a', 2),
    new FARule(4, 'a', 5),
    new FARule(5, 'a', 6),
    new FARule(6, 'a', 4)
  ]);

  describe('#accepts()', function(){
    var nfa_design = new NFADesign(1, [2,4], rulebook);

    it('should be true', function(){
      assert.equal(nfa_design.accepts('aa'), true);
      assert.equal(nfa_design.accepts('aaa'), true);
      assert.equal(nfa_design.accepts('aaaaaa'), true);
    });
    it('should be false', function(){
      assert.equal(nfa_design.accepts('aaaaa'), false);
    });
  });

});