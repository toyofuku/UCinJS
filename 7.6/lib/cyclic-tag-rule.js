var util = require('util')
  , TagRule = require('../../7.5/lib/tag-rule');

var CyclicTagRule = function(append_characters){
  this.FIRST_CHARACTER = '1';
  TagRule.call(this, this.FIRST_CHARACTER, append_characters);
};

util.inherits(CyclicTagRule, TagRule);

CyclicTagRule.prototype.inspect = function(){
  return '#<CyclicTagRule "' + this.append_characters + '">';
};

module.exports = CyclicTagRule;
