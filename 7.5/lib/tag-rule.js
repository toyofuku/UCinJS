var TagRule = function(first_character, append_characters){
  this.first_character = first_character;
  this.append_characters = append_characters;
};

TagRule.prototype.applies_to = function(string){
  return string.slice(0,1) == this.first_character;
};

TagRule.prototype.follow = function(string){
  return string + this.append_characters;
};

module.exports = TagRule;
