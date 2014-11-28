var util = require('util');

var Machine = function(statement, environment){
  this.statement = statement;
  this.environment = environment;
};

Machine.prototype.step = function(){
  var _reduced = this.statement.reduce(this.environment);
  this.statement = _reduced[0];
  this.environment = _reduced[1];
};

Machine.prototype.run = function(){
  while(this.statement.reducible){
    console.log(this.statement.to_s() + ", " + util.inspect(this.environment));
    this.step();
  }
  console.log(this.statement.to_s() + ", " + util.inspect(this.environment));
};

module.exports = Machine;
