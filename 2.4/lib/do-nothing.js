var DoNothing = function(){};

DoNothing.prototype.to_s = function(){ return 'do-nothing'; };
DoNothing.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

DoNothing.prototype.equal = function(other_statement){
  return other_statement instanceof DoNothing
};

DoNothing.prototype.reducible = false;

DoNothing.prototype.evaluate = function(environment){
  return environment;
};

DoNothing.prototype.to_js = function(){
  return "(function(e){ return e; })";
};

module.exports = DoNothing;
