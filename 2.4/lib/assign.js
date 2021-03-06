var DoNothing = require('./do-nothing');

function merge(env1, env2){
  var env = {};
  for(var k in env1){
    if(env1.hasOwnProperty(k)){ env[k] = env1[k]; }
  }
  for(var k in env2){
    if(env2.hasOwnProperty(k)){ env[k] = env2[k]; }
  }
  return env;
}

var Assign = function(name, expression){
  this.name = name;
  this.expression = expression;
};

Assign.prototype.to_s = function(){ return this.name + " = " + this.expression.to_s();};
Assign.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

Assign.prototype.reducible = true;

Assign.prototype.reduce = function(environment){
  if(this.expression.reducible){
    return [new Assign(this.name, this.expression.reduce(environment)), environment];
  } else {
    var this_environment = {};
    this_environment[this.name] = this.expression;
    return [new DoNothing(), merge(environment, this_environment)];
  }
};

Assign.prototype.evaluate = function(environment){
  var this_environment = {};
  this_environment[this.name] = this.expression.evaluate(environment);
  return merge(environment, this_environment);
};

Assign.prototype.merge = function(env1, env2){
  return merge(env1, env2);
}

Assign.prototype.to_js = function(){
  return "(function(e){ return Assign.prototype.merge(e, {" + this.name + ": " + this.expression.to_js() + "(e)}); })";
};

module.exports = Assign;
