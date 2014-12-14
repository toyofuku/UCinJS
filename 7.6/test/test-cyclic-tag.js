var assert = require('assert')
  , CyclicTagRule = require('../lib/cyclic-tag-rule')
  , CyclicTagRulebook = require('../lib/cyclic-tag-rulebook')
  , TagRule = require('../lib/tag-rule')
  , TagRulebook = require('../lib/tag-rulebook')
  , TagSystem = require('../lib/tag-system');

describe('CyclicTagSystem', function(){
  describe('#step()', function(){
    var rulebook = new CyclicTagRulebook([
      new CyclicTagRule('1'), new CyclicTagRule('0010'), new CyclicTagRule('10')
    ]);

    it('should  be 00101', function(){
      var system = new TagSystem('11', rulebook);
      for(var i=0; i<16; i++){
        console.log(system.current_string);
        system.step();
      }
      console.log(system.current_string);      
      assert.equal(system.current_string, '00101');
    })
    it('should  be 101', function(){
      var system = new TagSystem('00101', rulebook);
      for(var i=0; i<20; i++){
        console.log(system.current_string);
        system.step();
      }
      console.log(system.current_string);
      assert.equal(system.current_string, '101');
    })
  })

  describe('#alphabet()', function(){
    var rulebook = new TagRulebook(2, [new TagRule('a', 'ccdd'), new TagRule('b', 'dd')]);
    var system = new TagSystem('aabbbb', rulebook);

    it("should be ['a','b','c','d']", function(){
      assert.deepEqual(system.alphabet(), ['a','b','c','d']);
    })
  })

  describe('#encoder()', function(){
    var rulebook = new TagRulebook(2, [new TagRule('a', 'ccdd'), new TagRule('b', 'dd')]);
    var system = new TagSystem('aabbbb', rulebook);
    var encoder = system.encoder();

    it("should be 0010", function(){
      assert.equal(encoder.encode_string('c'), '0010');
    })
    it("should be 001010000100", function(){
      assert.equal(encoder.encode_string('cab'), '001010000100');
    })
    it('should be #<CyclicTagRule "0010001000010001">', function(){
      var rule  = system.rulebook.rules[0];
      assert.equal(rule.to_cyclic(encoder).inspect(), '#<CyclicTagRule "0010001000010001">')
    })

    it('should be [ #<CyclicTagRule "0010001000010001">, #<CyclicTagRule "00010001">, #<CyclicTagRule "">, #<CyclicTagRule ""> ]', function(){
      assert.deepEqual( system.rulebook.cyclic_rules(encoder).map(function(rule){return rule.inspect();}),
        ['#<CyclicTagRule "0010001000010001">',
         '#<CyclicTagRule "00010001">',
         '#<CyclicTagRule "">',
         '#<CyclicTagRule "">'] );
    })

    it('should be [ #<CyclicTagRule "">, #<CyclicTagRule "">, #<CyclicTagRule "">, #<CyclicTagRule ""> ]', function(){
      assert.deepEqual( system.rulebook.cyclic_padding_rules(encoder).map(function(rule){return rule.inspect();}),
        ['#<CyclicTagRule "">',
         '#<CyclicTagRule "">',
         '#<CyclicTagRule "">',
         '#<CyclicTagRule "">'] );
    })

    it('should be 1', function(){
      var cyclic_system = system.to_cyclic()
      cyclic_system.run();
    })
  })

});


