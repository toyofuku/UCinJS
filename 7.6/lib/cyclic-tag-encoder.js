var CyclicTagEncoder = function(alphabet){
  this.alphabet = alphabet;
};

CyclicTagEncoder.prototype.encode_string = function(string){
  var self = this;
  return string.split('').map(function(character){
  	return self.encode_character(character);
  }).join('');
};

CyclicTagEncoder.prototype.encode_character = function(character){
  var character_position = this.alphabet.indexOf(character);
  var _range = [];
  for(var i=0; i < this.alphabet.length; i++){ _range[i] = i; }
  return _range.map(function(n){ return n === character_position ? '1' : '0'; }).join('');
};

module.exports = CyclicTagEncoder;
