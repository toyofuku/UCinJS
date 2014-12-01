var LCVariable = function(name){
  this.name = name;
};

LCVariable.prototype.to_s = function(){ return this.name; };
LCVariable.prototype.inspect = function(){ return this.to_s(); };

LCVariable.prototype.replace = function(name, replacement){
  if(this.name == name){ return replacement; }
  else { return this; }
};

LCVariable.prototype.callable = false;
LCVariable.prototype.reducible = function(){ return false; };

module.exports = LCVariable;
