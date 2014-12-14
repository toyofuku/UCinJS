var TagRule = require('../../7.5/lib/tag-rule')
  , CyclicTagRule = require('./cyclic-tag-rule');

TagRule.prototype.alphabet = function(){
  return (this.first_character + this.append_characters)
    .split('')
    .reduce(function(previousValue, currentValue, index, array){
      if(previousValue.indexOf(currentValue) === -1){
        previousValue.push(currentValue);
      }
      return previousValue;
    },[]);
};

TagRule.prototype.to_cyclic = function(encoder){
  return new CyclicTagRule(encoder.encode_string(this.append_characters));
};

module.exports = TagRule;
