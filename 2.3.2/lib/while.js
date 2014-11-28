var If = require('./if');
var Sequence = require('./Sequence');
var DoNothing = require('./do-nothing');

var While = function(condition, body){
  this.condition = condition;
  this.body = body;
};

While.prototype.to_s = function(){ return "while (" + this.condition.to_s() + ") { " + this.body.to_s() + " }";};
While.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

While.prototype.reducible = true;

While.prototype.reduce = function(environment){
  return [new If(this.condition, new Sequence(this.body, this), new DoNothing()), environment];
};

While.prototype.evaluate = function(environment){
  var condition_eval = this.condition.evaluate(environment);
  if('true' === condition_eval.to_s()){
    return this.evaluate( this.body.evaluate(environment) );
  }
  else if('false' === condition_eval.to_s()){
    return environment;
  }
};

module.exports = While;
