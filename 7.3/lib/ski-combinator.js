var util = require('util')
  , SKISymbol = require('./ski-symbol')
  , SKICall = require('./ski-call');

var SKICombinator = function(name){
  this.name = name;
};

util.inherits(SKICombinator, SKISymbol);

SKICombinator.prototype.as_a_function_of = function(name){
  var K = new SKICombinator('K');
  K.callable = function(){ return arguments.length == 2; };
  K.call = function(a, b){ return a; };

  return new SKICall(K, this);
};

module.exports = SKICombinator;
