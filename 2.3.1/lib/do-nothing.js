var DoNothing = function(){};

DoNothing.prototype.to_s = function(){ return 'do-nothing'; };
DoNothing.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

DoNothing.prototype.equal = function(other_statement){
  return other_statement instanceof DoNothing
};

DoNothing.prototype.reducible = false;

module.exports = DoNothing;
