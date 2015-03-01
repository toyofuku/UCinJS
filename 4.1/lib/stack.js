var __ = require('underscore');

var Stack = function(contents){
  this.contents = contents;
};

Stack.prototype.push = function(character){
  return new Stack([character].concat(this.contents));
};

Stack.prototype.pop = function(){
  return new Stack(__.rest(this.contents));
};

Stack.prototype.top = function(){
  return __.first(this.contents);
};

Stack.prototype.inspect = function(){
  return "#<Stack (" + this.top() + ")" + __.rest(this.contents).join('') + ">";
};

module.exports = Stack;
