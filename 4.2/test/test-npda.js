var assert = require('assert')
  , PDARule = require('../../4.1/lib/pda-rule')
  , NPDARulebook = require('../../4.2/lib/npda-rulebook')
  , PDAConfiguration = require('../../4.1/lib/pda-configuration')
  , Stack = require('../../4.1/lib/stack')
  , NPDA = require('../../4.2/lib/npda');

describe('NPDA', function(){
  describe('p.123 rulebook',function(){

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

    var configuration = new PDAConfiguration(1, new Stack(['$']));

    var npda = new NPDA([configuration], [3], rulebook);

    it('should be #<PDAConfiguration state=1, stack=#<Stack ($)>>', function(){
      assert.equal(configuration.inspect(), '#<PDAConfiguration state=1, stack=#<Stack ($)>>');
    });


    it('should be true', function(){
      assert.equal(npda.accepting(), true);
    });

    it('should have 3 PDAConfiguration', function(){
      var _current_configs = npda.current_configurations();
      assert.equal( _current_configs[0].inspect(), "#<PDAConfiguration state=1, stack=#<Stack ($)>>" );
      assert.equal( _current_configs[1].inspect(), "#<PDAConfiguration state=2, stack=#<Stack ($)>>" );
      assert.equal( _current_configs[2].inspect(), "#<PDAConfiguration state=3, stack=#<Stack ($)>>" );
    });

    it('abb should be false', function(){
      npda.read_string('abb');
      assert.equal(npda.accepting(), false);
    });

    it('should have 3 PDAConfiguration', function(){
      var _current_configs = npda.current_configurations();
      assert.equal( _current_configs[0].inspect(), "#<PDAConfiguration state=1, stack=#<Stack (b)ba$>>" );
      assert.equal( _current_configs[1].inspect(), "#<PDAConfiguration state=2, stack=#<Stack (a)$>>" );
      assert.equal( _current_configs[2].inspect(), "#<PDAConfiguration state=2, stack=#<Stack (b)ba$>>" );
    });

    it('a should be true', function(){
      npda.read_character('a');
      assert.equal(npda.accepting(), true);
    });

    it('should have 4 PDAConfiguration', function(){
      var _current_configs = npda.current_configurations();
      assert.equal( _current_configs[0].inspect(), "#<PDAConfiguration state=1, stack=#<Stack (a)bba$>>" );
      assert.equal( _current_configs[1].inspect(), "#<PDAConfiguration state=2, stack=#<Stack ($)>>" );
      assert.equal( _current_configs[2].inspect(), "#<PDAConfiguration state=2, stack=#<Stack (a)bba$>>" );
      assert.equal( _current_configs[3].inspect(), "#<PDAConfiguration state=3, stack=#<Stack ($)>>" );
    });

  });
});
