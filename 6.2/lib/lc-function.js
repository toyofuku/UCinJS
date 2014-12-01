var LCFunction = function(parameter, body){
  this.parameter = parameter;
  this.body = body;
};

LCFunction.prototype.to_s = function(){ return "function(" + this.parameter + "){ return " + this.body.to_s() + " }"; };
LCFunction.prototype.inspect = function(){ return this.to_s(); };

LCFunction.prototype.replace = function(name, replacement){
  if(this.parameter == name){ return this; }
  else { return new LCFunction(this.parameter, this.body.replace(name, replacement)); }
};

LCFunction.prototype.call = function(argument){
//  return this.body.replace(this.parameter, '(' + argument.to_s() + ')');
  return this.body.replace(this.parameter, argument);
};

LCFunction.prototype.callable = true;
LCFunction.prototype.reducible = function(){ return false; };

module.exports = LCFunction;
