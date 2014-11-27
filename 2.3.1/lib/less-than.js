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


module.exports = LessThan;
