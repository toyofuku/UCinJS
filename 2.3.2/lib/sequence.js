var DoNothing = require('./do-nothing');

var Sequence = function(first, second){
  this.first = first;
  this.second = second;
};

Sequence.prototype.to_s = function(){ return this.first.to_s() + "; " + this.second.to_s();};
Sequence.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

Sequence.prototype.reducible = true;

Sequence.prototype.reduce = function(environment){
  if(this.first instanceof DoNothing){
    return [this.second, environment];
  } else {
    var _reduced = this.first.reduce(environment);
    return [new Sequence(_reduced[0], this.second), _reduced[1]];
  }
};

Sequence.prototype.evaluate = function(environment){
  return this.second.evaluate( this.first.evaluate(environment) );
};

module.exports = Sequence;
