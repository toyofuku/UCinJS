var TagSystem = require('../../7.5/lib/tag-system')
  , CyclicTagEncoder = require('./cyclic-tag-encoder');

TagSystem.prototype.alphabet = function(){
  return this.rulebook.alphabet()
    .concat(this.current_string.split(''))
    .reduce(function(previousValue, currentValue, index, array){
      if(previousValue.indexOf(currentValue) === -1){
        previousValue.push(currentValue);
      }
      return previousValue;
    },[]).sort();
};

TagSystem.prototype.encoder = function(){
  return new CyclicTagEncoder(this.alphabet());
};

TagSystem.prototype.to_cyclic = function(){
  return new TagSystem(this.encoder().encode_string(this.current_string), this.rulebook.to_cyclic(this.encoder()));
};

module.exports = TagSystem;
