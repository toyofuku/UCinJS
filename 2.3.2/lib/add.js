var Number = require('./number');

var Add = function(left, right){
  this.left = left;
  this.right = right;
};

Add.prototype.to_s = function(){ return this.left.to_s() + " + " + this.right.to_s();};
Add.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

Add.prototype.reducible = true;
Add.prototype.reduce = function(environment){
  if(this.left.reducible){
    return new Add(this.left.reduce(environment), this.right);
  }
  else if(this.right.reducible){
    return new Add(this.left, this.right.reduce(environment));
  }
  else {
    return new Number(this.left.value + this.right.value);
  }
};

Add.prototype.evaluate = function(environment){
  return new Number(
    this.left.evaluate(environment).value + this.right.evaluate(environment).value
  );
};

module.exports = Add;
