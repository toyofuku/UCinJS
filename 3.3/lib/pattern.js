var Pattern = function(){};

Pattern.prototype.bracket = function(outer_precedence){
  if(this.precedence() < outer_precedence){
    return '(' + this.to_s() + ')';
  } else {
    return this.to_s();
  }
};

Pattern.prototype.inspect = function(){
  return '/' + this.to_s() + '/';
};

Pattern.prototype.matches = function(string){
  return this.to_nfa_design().accepts(string);
};

module.exports = Pattern;