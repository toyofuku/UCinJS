var SKISymbol = function(name){
  this.name = name;
};

SKISymbol.prototype.to_s = function(){
  return this.name;
};

SKISymbol.prototype.inspect = function(){
  return this.to_s();
};

SKISymbol.prototype.combinator = function(){
  return this;
};

SKISymbol.prototype.arguments = function(){
  return [];
};

SKISymbol.prototype.callable = function(){
  return false;
};

SKISymbol.prototype.reducible = function(){
  return false;
};

SKISymbol.prototype.as_a_function_of = function(name){
  var SKICall = require('./ski-call');
  var SKICombinator = require('./ski-combinator');
  var K = new SKICombinator('K');
  var I = new SKICombinator('I');
  K.callable = function(){ return arguments.length == 2; };
  I.callable = function(){ return arguments.length == 1; };
  K.call = function(a, b){ return a; };
  I.call = function(a){ return a; };

  if(this.name == name){
    return I;
  } else {
    return new SKICall(K, this);
  }
};

module.exports = SKISymbol;
