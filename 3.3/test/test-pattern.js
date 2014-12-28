var assert = require('assert')
  , Repeat = require('../lib/repeat')
  , Choose = require('../lib/choose')
  , Concatenate = require('../lib/concatenate')
  , Literal = require('../lib/literal')
  , Empty = require('../lib/empty');

describe('Pattern', function(){

  describe('#inspect()', function(){
    var pattern = new Repeat(
      new Choose(
        new Concatenate(new Literal('a'), new Literal('b')),
        new Literal('a')
      )
    );

    it('should be /(ab|a)*/', function(){
      assert.equal(pattern.inspect(), '/(ab|a)*/');
    });
  });

  describe('Empty', function(){
    var nfa_design = new Empty().to_nfa_design();
    it('should accept empty', function(){
      assert.equal(nfa_design.accepts(''), true);
    });
  });

  describe('Literal', function(){
    var nfa_design = new Literal('a').to_nfa_design();
    it('should not accept empty', function(){
      assert.equal(nfa_design.accepts(''), false);
    });
    it('should accept a', function(){
      assert.equal(nfa_design.accepts('a'), true);
    });
    it('should not accept b', function(){
      assert.equal(nfa_design.accepts('b'), false);
    });
  });

  describe('#matches', function(){
    it('should be false', function(){
      assert.equal(new Empty().matches('a'), false);
    });
    it('should be true', function(){
      assert.equal(new Literal('a').matches('a'), true);
    });
  });

  describe('Concatenate', function(){
    var pattern = new Concatenate(new Literal('a'), new Literal('b'));
    it('should not accept a', function(){
      assert.equal(pattern.matches('a'), false);
    });
    it('should accept ab', function(){
      assert.equal(pattern.matches('ab'), true);
    });
    it('should not accept abc', function(){
      assert.equal(pattern.matches('abc'), false);
    });
  });

  describe('Concatenate nest', function(){
    var pattern = new Concatenate(
      new Literal('a'),
      new Concatenate(new Literal('b'), new Literal('c')));
    it('should be /abc/', function(){
      assert.equal(pattern.inspect(), '/abc/');
    });
    it('should not accept a', function(){
      assert.equal(pattern.matches('a'), false);
    });
    it('should not accept ab', function(){
      assert.equal(pattern.matches('ab'), false);
    });
    it('should accept abc', function(){
      assert.equal(pattern.matches('abc'), true);
    });
  });

  describe('Choose', function(){
    var pattern = new Choose(new Literal('a'), new Literal('b'));

    it('should be /a|b/', function(){
      assert.equal(pattern.inspect(), '/a|b/');
    });
    it('should accept a', function(){
      assert.equal(pattern.matches('a'), true);
    });
    it('should accept b', function(){
      assert.equal(pattern.matches('b'), true);
    });
    it('should not accept c', function(){
      assert.equal(pattern.matches('c'), false);
    });
  });

  describe('Repeat', function(){
    var pattern = new Repeat(new Literal('a'));

    it('should be /a*/', function(){
      assert.equal(pattern.inspect(), '/a*/');
    });
    it('should accept empty', function(){
      assert.equal(pattern.matches(''), true);
    });
    it('should accept a', function(){
      assert.equal(pattern.matches('a'), true);
    });
    it('should accept aaaa', function(){
      assert.equal(pattern.matches('aaaa'), true);
    });
    it('should not accept b', function(){
      assert.equal(pattern.matches('b'), false);
    });
  });

  describe('#to_nfa_design()', function(){
    var pattern = new Repeat(
      new Concatenate(
        new Literal('a'),
        new Choose(new Empty(), new Literal('b'))
      )
    );

    it('should be /(a(|b))*/', function(){
      assert.equal(pattern.inspect(), '/(a(|b))*/');
    });
    it('should accept empty', function(){
      assert.equal(pattern.matches(''), true);
    });
    it('should accept a', function(){
      assert.equal(pattern.matches('a'), true);
    });
    it('should accept ab', function(){
      assert.equal(pattern.matches('ab'), true);
    });
    it('should accept aba', function(){
      assert.equal(pattern.matches('aba'), true);
    });
    it('should accept abab', function(){
      assert.equal(pattern.matches('abab'), true);
    });
    it('should accept abaab', function(){
      assert.equal(pattern.matches('abaab'), true);
    });
    it('should not accept abba', function(){
      assert.equal(pattern.matches('abba'), false);
    });
  });

});
