var assert = require('assert')
  , NFADesign = require('../../3.2/lib/nfa-design')
  , NFARulebook = require('../../3.2/lib/nfa-rulebook')
  , FARule = require('../../3.1/lib/fa-rule');

describe('NFADesign', function(){
  var rulebook = new NFARulebook([
    new FARule(0, '(', 1), new FARule(1, ')', 0),
    new FARule(1, '(', 2), new FARule(2, ')', 1),
    new FARule(2, '(', 3), new FARule(3, ')', 2)
  ]);
  var nfa_design = new NFADesign(0, [0], rulebook);

  it('(() should be false', function(){
    assert.equal(nfa_design.accepts('(()'), false);
  });
  it('()) should be false', function(){
    assert.equal(nfa_design.accepts('())'), false);
  });
  it('(()) should be true', function(){
    assert.equal(nfa_design.accepts('(())'), true);
  });
  it('(()(()())) should be false', function(){
    assert.equal(nfa_design.accepts('(()(()()))'), true);
  });

  it('(((()))) should be false', function(){
    assert.equal(nfa_design.accepts('(((())))'), false);
  });

});
