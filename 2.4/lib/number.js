var Number = function(value){
  this.value = value;
};

Number.prototype.to_s = function(){ return this.value; };
Number.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

Number.prototype.reducible = false;

Number.prototype.evaluate = function(environment){ return this; };

Number.prototype.to_js = function(){ return "(function(e){ return " + this.value + "; })"; };

module.exports = Number;
