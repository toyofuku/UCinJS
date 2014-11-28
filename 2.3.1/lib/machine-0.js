var Machine = function(expression){
  this.expression = expression;
};

Machine.prototype.step = function(){
  this.expression = this.expression.reduce();
};

Machine.prototype.run = function(){
  while(this.expression.reducible){
    console.log(this.expression.to_s());
    this.step();
  }
  console.log(this.expression.to_s());
};

module.exports = Machine;
