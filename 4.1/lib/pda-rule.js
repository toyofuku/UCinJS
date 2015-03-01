var __ = require('underscore');

var PDAConfiguration = require('./pda-configuration');

var PDARule = function(state, character, next_state, pop_character, push_characters){
  this.state = state;
  this.character = character;
  this.next_state = next_state;
  this.pop_character = pop_character;
  this.push_characters = push_characters;
};

PDARule.prototype.applies_to = function(configuration, character){
  return this.state == configuration.state &&
         this.pop_character == 
           configuration.stack.top() &&
         this.character == character
};

PDARule.prototype.follow = function(configuration){
  return new PDAConfiguration(this.next_state, this.next_stack(configuration));
};

PDARule.prototype.next_stack = function(configuration){
  var popped_stack = configuration.stack.pop();
  return __.reduce(
  	this.push_characters.reverse(),
  	function(stack, character){ return stack.push(character); },
  	popped_stack);
};

module.exports = PDARule;
