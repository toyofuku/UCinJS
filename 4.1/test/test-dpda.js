var assert = require('assert')
  , Stack = require('../../4.1/lib/stack')
  , PDARule = require('../../4.1/lib/pda-rule')
  , PDAConfiguration = require('../../4.1/lib/pda-configuration')
  , DPDARulebook = require('../../4.1/lib/dpda-rulebook')
  , DPDA = require('../../4.1/lib/dpda');

describe('DPDA', function(){
  var rulebook = new DPDARulebook([
    new PDARule(1, '(',  2, '$', ['b', '$']),
    new PDARule(2, '(',  2, 'b', ['b', 'b']),
    new PDARule(2, ')',  2, 'b', []),
    new PDARule(2, null, 1, '$', ['$'])
  ]);

  describe('version 1', function(){
    var dpda = new DPDA(new PDAConfiguration(1, new Stack(['$'])), [1], rulebook);

    it('should be true', function(){
      assert.equal(dpda.accepting(), true);
    });

    it('(() should be false', function(){
      dpda.read_string('(()');
      assert.equal(dpda.accepting(), false);
      console.log( dpda.current_configuration() );
    });
  });

  describe('version 2', function(){
    var dpda = new DPDA(new PDAConfiguration(1, new Stack(['$'])), [1], rulebook);

    it('(()( should be false', function(){
      dpda.read_string('(()(');
      assert.equal(dpda.accepting(), false);
      console.log( dpda.current_configuration() );

    });

    it('))() should be false', function(){
      dpda.read_string('))()');
      assert.equal(dpda.accepting(), true);
      console.log( dpda.current_configuration() );
    });

  });

});
