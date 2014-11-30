var LCVariable = require('./lc-variable');
var LCFunction = require('./lc-function');

var LCCall = function(left, right){
  this.left = left;
  this.right = right;
};

LCCall.prototype.to_s = function(){
  var _left = typeof this.left == 'string' ? this.left : this.left.to_s(),
      _right = typeof this.right == 'string' ? this.right : this.right.to_s();
  return _left + "(" + _right + ")"; 
};
LCCall.prototype.inspect = function(){ return this.to_s(); };

LCCall.prototype.replace = function(name, replacement){
  return new LCCall(this.left.replace(name, replacement), this.right.replace(name, replacement));
};

LCCall.prototype.callable = false;
LCCall.prototype.reducible = function(){
  // FIXME
  return this.left.reducible() || this.right.reducible() || this.left.callable
};

LCCall.prototype.reduce = function(){
  if(this.left.reducible()){ return new LCCall(this.left.reduce(), this.right); }
  else if(this.right.reducible()){ return new LCCall(this.left, this.right.reduce()); }
  else {return this.left.call(this.right); }
};

module.exports = LCCall;
