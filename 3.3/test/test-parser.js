var assert = require('assert')
  , Repeat = require('../lib/repeat')
  , Choose = require('../lib/choose')
  , Concatenate = require('../lib/concatenate')
  , Literal = require('../lib/literal')
  , Empty = require('../lib/empty')
  , parser = require('../lib/parser');


parser.Parser.ChooseNode = {
  to_ast: function(){ return new Choose(this.first.to_ast(), this.rest.to_ast()); }
};

parser.Parser.ConcatenateNode = {
  to_ast: function(){ return new Concatenate(this.first.to_ast(), this.rest.to_ast()); }
};

parser.Parser.EmptyNode = {
  to_ast: function(){ return new Empty(); }
};

parser.Parser.RepeatNode = {
  to_ast: function(){ return new Repeat(this.brackets.to_ast()); }
};

parser.Parser.BracketsNode = {
  to_ast: function(){ return this.choose.to_ast(); }
};

parser.Parser.LiteralNode = {
  to_ast: function(){ return new Literal(this.textValue); }
};


describe('Parser', function(){
  var parse_tree = parser.parse('(a(|b))*')
  var pattern = parse_tree.to_ast();

  it('should be /(a(|b))*/', function(){
    assert.equal(pattern.inspect(), '/(a(|b))*/');
  });
  it('should accept abaab', function(){
    assert.equal(pattern.matches('abaab'), true);
  });
  it('should not accept abba', function(){
    assert.equal(pattern.matches('abba'), false);
  });

});
