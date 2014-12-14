var TagRulebook = function(deletion_number, rules){
  this.deletion_number = deletion_number;
  this.rules = rules;
};

TagRulebook.prototype.next_string = function(string){
  return this.rule_for(string).follow(string).slice(this.deletion_number);
};

TagRulebook.prototype.rule_for = function(string){
  var _detect = this.rules.filter(function(r){return r.applies_to(string);});
  return _detect.length > 0 ? _detect[0] : null;
};

TagRulebook.prototype.applies_to = function(string){
  return this.rule_for(string) !== null && string.length >= this.deletion_number;
};

module.exports = TagRulebook;
