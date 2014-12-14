

var CyclicTagRulebook = function(rules){
  this.DELETION_NUMBER = 1;
  rules.current_pos = 0;
  rules.next = function(){
  	var _current_item = rules[rules.current_pos];
  	rules.current_pos++;
  	if(rules.current_pos == rules.length){ rules.current_pos = 0; }
  	return _current_item;
  };
  this.rules = rules;
};

CyclicTagRulebook.prototype.applies_to = function(string){
  return string.length >= this.DELETION_NUMBER;
};

CyclicTagRulebook.prototype.next_string = function(string){
  return this.follow_next_rule(string).slice(this.DELETION_NUMBER);
};

CyclicTagRulebook.prototype.follow_next_rule = function(string){
  var rule = this.rules.next();
  if(rule.applies_to(string)){
  	return rule.follow(string);
  } else {
  	return string;
  }
};

module.exports = CyclicTagRulebook;
