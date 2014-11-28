var Machine = function(expression, environment){
  this.expression = expression;
  this.environment = environment;
};

Machine.prototype.step = function(){
  this.expression = this.expression.reduce(this.environment);
};

Machine.prototype.run = function(){
  while(this.expression.reducible){
    console.log(this.expression.to_s());
    this.step();
  }
  console.log(this.expression.to_s());
};

module.exports = Machine;
