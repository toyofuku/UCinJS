var TagRule = require('../lib/tag-rule')
  , TagRulebook = require('../lib/tag-rulebook')
  , TagSystem = require('../lib/tag-system');

describe('TagSystem', function(){
  describe('#step()', function(){
    it('should  be aabbbbbbbbbbbb', function(){
      var rulebook = new TagRulebook(2, [new TagRule('a', 'aa'), new TagRule('b', 'bbbb')]);
      var system = new TagSystem('aabbbbbb', rulebook);
      for(var i=0; i<4; i++){
        console.log(system.current_string);
        system.step();
      }
      console.log(system.current_string);      
    })
  })
  describe('#run()', function(){
    it('should be ccdddddddddddd', function(){
      var rulebook = new TagRulebook(2, [new TagRule('a', 'cc'), new TagRule('b', 'dddd')]);
      var system = new TagSystem('aabbbbbb', rulebook);
      system.run();
    })
    it('should be ccdddddd', function(){
      var rulebook = new TagRulebook(2, [new TagRule('a', 'cc'), new TagRule('b', 'd')]);
      var system = new TagSystem('aabbbbbbbbbbbb', rulebook);
      system.run();
    })
    it('should be ccdddddd', function(){
      var rulebook = new TagRulebook(2, [new TagRule('a', 'ccdd'), new TagRule('b', 'dd')]);
      var system = new TagSystem('aabbbb', rulebook);
      system.run();
    })
    it('should be eeffffffffff', function(){
      var rulebook = new TagRulebook(2, [
        new TagRule('a', 'cc'), new TagRule('b', 'dddd'),
        new TagRule('c', 'eeff'), new TagRule('d', 'ff')
      ]);
      var system = new TagSystem('aabbbb', rulebook);
      system.run();
    })
    it('should be e', function(){
      var rulebook = new TagRulebook(2, [
        new TagRule('a', 'cc'), new TagRule('b', 'd'),
        new TagRule('c', 'eo'), new TagRule('d', ''),
        new TagRule('e', 'e')
      ]);
      var system = new TagSystem('aabbbbbbbb', rulebook);
      system.run();
    })
    it('should be o', function(){
      var rulebook = new TagRulebook(2, [
        new TagRule('a', 'cc'), new TagRule('b', 'd'),
        new TagRule('c', 'eo'), new TagRule('d', ''),
        new TagRule('e', 'e')
      ]);
      var system = new TagSystem('aabbbbbbbbbb', rulebook);
      system.run();
    })
  })
});


