var If = function(condition, consequence, alternative){
  this.condition = condition;
  this.consequence = consequence;
  this.alternative = alternative;
};

If.prototype.to_s = function(){ return "if (" + this.condition.to_s() + ") { " + this.consequence.to_s() + " } else { " + this.alternative.to_s() + " }";};
If.prototype.inspect = function(){ return "<<" + this.to_s() + ">>"; };

If.prototype.reducible = true;

If.prototype.reduce = function(environment){
  if(this.condition.reducible){
    return [new If(this.condition.reduce(environment), this.consequence, this.alternative), environment];
  } else {
    if(this.condition.to_s() === 'true'){
      return [this.consequence, environment];
    }
    else if(this.condition.to_s() === 'false'){
      return [this.alternative, environment];
    }
  }
};


module.exports = If;
