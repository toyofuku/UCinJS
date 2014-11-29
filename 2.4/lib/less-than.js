var Boolean = require('./boolean');

var LessThan = function(left, right){
  this.left = left;
  this.right = right;
};

LessThan.prototype.to_s = function(){ return this.left.to_s() + " < " + this.right.to_s();};
LessThan.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

LessThan.prototype.reducible = true;

LessThan.prototype.reduce = function(environment){
  if(this.left.reducible){
    return new LessThan(this.left.reduce(environment), this.right);
  }
  else if(this.right.reducible){
    return new LessThan(this.left, this.right.reduce(environment));
  }
  else {
    return new Boolean(this.left.value < this.right.value);
  }
};

LessThan.prototype.evaluate = function(environment){
  return new Boolean(
    this.left.evaluate(environment).value < this.right.evaluate(environment).value
  );
};

LessThan.prototype.to_js = function(){
  return "(function(e){ return " + this.left.to_js() + "(e) < " + this.right.to_js() + "(e); })";
};

module.exports = LessThan;
