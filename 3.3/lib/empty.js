var util = require('util')
  , Pattern = require('./pattern')
  , NFARulebook = require('../../3.2/lib/nfa-rulebook')
  , NFADesign = require('../../3.2/lib/nfa-design');

var Empty = function(){};

util.inherits(Empty, Pattern);

Empty.prototype.to_s = function(){
  return '';
};

Empty.prototype.precedence = function(){
  return 3;
};

Empty.prototype.to_nfa_design = function(){
  var start_state = {}
    , accept_states = [start_state]
    , rulebook = new NFARulebook([]);
  return new NFADesign(start_state, accept_states, rulebook);
};

module.exports = Empty;
