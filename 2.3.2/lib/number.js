var Number = function(value){
  this.value = value;
};

Number.prototype.to_s = function(){ return this.value; };
Number.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

Number.prototype.reducible = false;

Number.prototype.evaluate = function(environment){ return this; };

module.exports = Number;
