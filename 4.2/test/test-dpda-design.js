var assert = require('assert')
  , PDARule = require('../../4.1/lib/pda-rule')
  , DPDARulebook = require('../../4.1/lib/dpda-rulebook')
  , DPDADesign = require('../../4.1/lib/dpda-design');

describe('DPDADesign', function(){
  describe('p.119 rulebook',function(){
    var rulebook = new DPDARulebook([
      new PDARule(1, 'a',  2, '$', ['a', '$']),
      new PDARule(1, 'b',  2, '$', ['b', '$']),
      new PDARule(2, 'a',  2, 'a', ['a', 'a']),
      new PDARule(2, 'b',  2, 'b', ['b', 'b']),
      new PDARule(2, 'a',  2, 'b', []),
      new PDARule(2, 'b',  2, 'a', []),
      new PDARule(2, null, 1, '$', ['$'])
    ]);

    var dpda_design = new DPDADesign(1, '$', [1], rulebook);

    it('ababab should be true', function(){
      assert.equal(dpda_design.accepts('ababab'), true);
    });

    it('bbbaaab should be true', function(){
      assert.equal(dpda_design.accepts('bbbaaab'), false);
    });

    it('baa should be false', function(){
      assert.equal(dpda_design.accepts('baa'), false);
    });

  });

  describe('p.121 rulebook',function(){
    var rulebook = new DPDARulebook([
      new PDARule(1, 'a',  1, '$', ['a', '$']),
      new PDARule(1, 'a',  1, 'a', ['a', 'a']),
      new PDARule(1, 'a',  1, 'b', ['a', 'b']),
      new PDARule(1, 'b',  1, '$', ['b', '$']),
      new PDARule(1, 'b',  1, 'a', ['b', 'a']),
      new PDARule(1, 'b',  1, 'b', ['b', 'b']),
      new PDARule(1, 'm',  2, '$', ['$']),
      new PDARule(1, 'm',  2, 'a', ['a']),
      new PDARule(1, 'm',  2, 'b', ['b']),
      new PDARule(2, 'a',  2, 'a', []),
      new PDARule(2, 'b',  2, 'b', []),
      new PDARule(2, null, 3, '$', ['$'])
    ]);

    var dpda_design = new DPDADesign(1, '$', [3], rulebook);

    it('abmba should be true', function(){
      assert.equal(dpda_design.accepts('abmba'), true);
    });

    it('babbamabbab should be true', function(){
      assert.equal(dpda_design.accepts('babbamabbab'), true);
    });

    it('abmb should be false', function(){
      assert.equal(dpda_design.accepts('abmb'), false);
    });

    it('baambaa should be false', function(){
      assert.equal(dpda_design.accepts('baambaa'), false);
    });

  });

});
