var assert = require('assert')
  , PDARule = require('../../4.1/lib/pda-rule')
  , NPDARulebook = require('../../4.2/lib/npda-rulebook')
  , NPDADesign = require('../../4.2/lib/npda-design');

describe('NPDADesign', function(){
    var rulebook = new NPDARulebook([
      new PDARule(1, 'a',  1, '$', ['a', '$']),
      new PDARule(1, 'a',  1, 'a', ['a', 'a']),
      new PDARule(1, 'a',  1, 'b', ['a', 'b']),
      new PDARule(1, 'b',  1, '$', ['b', '$']),
      new PDARule(1, 'b',  1, 'a', ['b', 'a']),
      new PDARule(1, 'b',  1, 'b', ['b', 'b']),
      new PDARule(1, null, 2, '$', ['$']),
      new PDARule(1, null, 2, 'a', ['a']),
      new PDARule(1, null, 2, 'b', ['b']),
      new PDARule(2, 'a',  2, 'a', []),
      new PDARule(2, 'b',  2, 'b', []),
      new PDARule(2, null, 3, '$', ['$'])
    ]);

  var npda_design = new NPDADesign(1, '$', [3], rulebook);

  it('abba should be true', function(){
    assert.equal(npda_design.accepts('abba'), true);
  });

  it('babbaabbab should be true', function(){
    assert.equal(npda_design.accepts('babbaabbab'), true);
  });

  it('abb should be false', function(){
    assert.equal(npda_design.accepts('abb'), false);
  });

  it('baabaa should be false', function(){
    assert.equal(npda_design.accepts('baabaa'), false);
  });

});
