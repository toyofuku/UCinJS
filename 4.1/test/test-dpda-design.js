var assert = require('assert')
//  , Stack = require('../../4.1/lib/stack')
  , PDARule = require('../../4.1/lib/pda-rule')
//  , PDAConfiguration = require('../../4.1/lib/pda-configuration')
  , DPDARulebook = require('../../4.1/lib/dpda-rulebook')
  , DPDADesign = require('../../4.1/lib/dpda-design');

describe('DPDADesign', function(){
  var rulebook = new DPDARulebook([
    new PDARule(1, '(',  2, '$', ['b', '$']),
    new PDARule(2, '(',  2, 'b', ['b', 'b']),
    new PDARule(2, ')',  2, 'b', []),
    new PDARule(2, null, 1, '$', ['$'])
  ]);

  var dpda_design = new DPDADesign(1, '$', [1], rulebook);

    it('(((((((((()))))))))) should be true', function(){
      assert.equal(dpda_design.accepts('(((((((((())))))))))'), true);
    });

    it('()(())((()))(()(())) should be true', function(){
      assert.equal(dpda_design.accepts('()(())((()))(()(()))'), true);
    });

    it('(()(()(()()(()()))() should be false', function(){
      assert.equal(dpda_design.accepts('(()(()(()()(()()))()'), false);
    });

    it('()) should be false', function(){
      assert.equal(dpda_design.accepts('())'), false);
    });


});
