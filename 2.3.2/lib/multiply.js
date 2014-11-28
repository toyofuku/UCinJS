var Number = require('./number');

var Multiply = function(left, right){
  this.left = left;
  this.right = right;
};

Multiply.prototype.to_s = function(){ return this.left.to_s() + " * " + this.right.to_s();};
Multiply.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

Multiply.prototype.reducible = true;
Multiply.prototype.reduce = function(environment){
  if(this.left.reducible){
    return new Multiply(this.left.reduce(environment), this.right);
  }
  else if(this.right.reducible){
    return new Multiply(this.left, this.right.reduce(environment));
  }
  else {
    return new Number(this.left.value * this.right.value);
  }
};

Multiply.prototype.evaluate = function(environment){
  return new Number(
    this.left.evaluate(environment).value * this.right.evaluate(environment).value
  );
};

module.exports = Multiply;
