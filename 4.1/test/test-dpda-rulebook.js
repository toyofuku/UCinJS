var assert = require('assert')
  , Stack = require('../../4.1/lib/stack')
  , PDARule = require('../../4.1/lib/pda-rule')
  , PDAConfiguration = require('../../4.1/lib/pda-configuration')
  , DPDARulebook = require('../../4.1/lib/dpda-rulebook');

describe('DPDARulebook', function(){
  var rulebook = new DPDARulebook([
    new PDARule(1, '(',  2, '$', ['b', '$']),
    new PDARule(2, '(',  2, 'b', ['b', 'b']),
    new PDARule(2, ')',  2, 'b', []),
    new PDARule(2, null, 1, '$', ['$'])
  ]);

  describe('next_configuration', function(){
    var configuration = new PDAConfiguration(1, new Stack(['$']));

    it('( should be #<PDAConfiguration state=2, stack=#<Stack (b)$>>', function(){
      configuration = rulebook.next_configuration(configuration, '(');
      assert.equal(configuration.inspect(), "#<PDAConfiguration state=2, stack=#<Stack (b)$>>");
    });

    it('( should be #<PDAConfiguration state=2, stack=#<Stack (b)b$>>', function(){
      configuration = rulebook.next_configuration(configuration, '(');
      assert.equal(configuration.inspect(), "#<PDAConfiguration state=2, stack=#<Stack (b)b$>>");
    });

    it('should be', function(){
      configuration = rulebook.next_configuration(configuration, ')');
      assert.equal(configuration.inspect(), "#<PDAConfiguration state=2, stack=#<Stack (b)$>>");
    });
  });

  describe('follow_free_moves', function(){
    var configuration = new PDAConfiguration(2, new Stack(['$']));

    it('should be', function(){
      assert.equal(configuration.inspect(), "#<PDAConfiguration state=2, stack=#<Stack ($)>>");
    });

    it('should be', function(){
      assert.equal(rulebook.follow_free_moves(configuration).inspect(), "#<PDAConfiguration state=1, stack=#<Stack ($)>>");
    });
  });

});
