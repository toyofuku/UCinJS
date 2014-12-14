var TagRulebook = require('../../7.5/lib/tag-rulebook')
  , CyclicTagRule = require('./cyclic-tag-rule')
  ,CyclicTagRulebook = require('./cyclic-tag-rulebook');

TagRulebook.prototype.alphabet = function(){
  return this.rules
    .map(function(rule){return rule.alphabet();})
    .reduce(function(previousValue, currentValue){
    	return previousValue.concat(currentValue);
    },[])
    .reduce(function(previousValue, currentValue, index, array){
      if(previousValue.indexOf(currentValue) === -1){
        previousValue.push(currentValue);
      }
      return previousValue;
    },[]).sort();
};

TagRulebook.prototype.cyclic_rules = function(encoder){
  var self = this;
  return encoder.alphabet.map(function(character){
    return self.cyclic_rule_for(character, encoder);
  });
};

TagRulebook.prototype.cyclic_rule_for = function(character, encoder){
  var rule = this.rule_for(character);
  if(rule == null){
    return new CyclicTagRule('');
  } else {
    return rule.to_cyclic(encoder);
  }
};

TagRulebook.prototype.cyclic_padding_rules = function(encoder){
  var _cyclic_tag_rules = [];
  for(var i=0; i< encoder.alphabet.length * (this.deletion_number - 1); i++){
    _cyclic_tag_rules.push(new CyclicTagRule(''));
  }
  return _cyclic_tag_rules;
};

TagRulebook.prototype.to_cyclic = function(encoder){
  return new CyclicTagRulebook(this.cyclic_rules(encoder).concat(this.cyclic_padding_rules(encoder)));
};

module.exports = TagRulebook;
