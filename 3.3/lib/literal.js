var util = require('util')
  , Pattern = require('./pattern')
  , FARule = require('../../3.1/lib/fa-rule')
  , NFARulebook = require('../../3.2/lib/nfa-rulebook')
  , NFADesign = require('../../3.2/lib/nfa-design');

var Literal = function(character){
  this.character = character;
};

util.inherits(Literal, Pattern);

Literal.prototype.to_s = function(){
  return this.character;
};

Literal.prototype.precedence = function(){
  return 3;
};

Literal.prototype.to_nfa_design = function(){
  var start_state = {}
    , accept_state = {}
    , rule = new FARule(start_state, this.character, accept_state)
    , rulebook = new NFARulebook([rule]);
  return new NFADesign(start_state, [accept_state], rulebook);
};

module.exports = Literal;