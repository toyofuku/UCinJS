var Boolean = function(value){
  this.value = value;
};

Boolean.prototype.to_s = function(){ return this.value ? 'true' : 'false'; };
Boolean.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

Boolean.prototype.reducible = false;

Boolean.prototype.evaluate = function(environment){ return this; };

module.exports = Boolean;
