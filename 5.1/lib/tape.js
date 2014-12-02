var Tape = function(left, middle, right, blank){
  this.left = left;
  this.middle = middle;
  this.right = right;
  this.blank = blank;
};

Tape.prototype.inspect = function(){
  return "#<Tape " + this.left.join('') + "(" + this.middle + ")" + this.right.join('') + ">";
};

Tape.prototype.write = function(character){
  return new Tape(this.left, character, this.right, this.blank);
};

Tape.prototype.move_head_left = function(){
  return new Tape(this.left.slice(0,-1), this.left.slice(-1)[0] || this.blank, [this.middle].concat(this.right), this.blank);
};

Tape.prototype.move_head_right = function(){
  return new Tape(this.left.concat([this.middle]), this.right[0] || this.blank, this.right.slice(1), this.blank);
};

module.exports = Tape;
