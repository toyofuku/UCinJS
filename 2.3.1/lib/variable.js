
var Variable = function(name){
  this.name = name;
};

Variable.prototype.to_s = function(){ return this.name; };
Variable.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

Variable.prototype.reducible = true;

Variable.prototype.reduce = function(environment){
  return environment[this.name];
};

module.exports = Variable;
