
var SKICall = function(left, right){
  this.left = left;
  this.right = right;
};

SKICall.prototype.to_s = function(){
  return this.left.to_s() + "[" + this.right.to_s() + "]";
};

SKICall.prototype.inspect = function(){
  return this.to_s();
};

SKICall.prototype.combinator = function(){
  return this.left.combinator();
};

SKICall.prototype.arguments = function(){
  return this.left.arguments().concat(this.right);
};

SKICall.prototype.reducible = function(){
  return this.left.reducible() || 
  this.right.reducible() || 
  this.combinator().callable.apply(this, this.arguments());
};

SKICall.prototype.reduce = function(){
  if(this.left.reducible()){
    return new SKICall(this.left.reduce(), this.right);
  }
  else if(this.right.reducible()){
    return new SKICall(this.left, this.right.reduce());
  }
  else {
    return this.combinator().call.apply(this, this.arguments());
  }
};

SKICall.prototype.as_a_function_of = function(name){

  var left_function = this.left.as_a_function_of(name);
  var right_function = this.right.as_a_function_of(name);

  var SKICombinator = require('./ski-combinator');
  var S = new SKICombinator('S');
  S.callable = function(){ return arguments.length == 3; };
  S.call = function(a, b, c){ return new SKICall(new SKICall(a, c), new SKICall(b, c)); };

  return new SKICall(new SKICall(S, left_function), right_function);
};

module.exports = SKICall;
