var TagSystem = function(current_string, rulebook){
  this.current_string = current_string;
  this.rulebook = rulebook;
};

TagSystem.prototype.step = function(){
  this.current_string = this.rulebook.next_string(this.current_string);
};

TagSystem.prototype.run = function(){
  while(this.rulebook.applies_to(this.current_string)){
    console.log( this. current_string );
    this.step();
  }
  console.log( this. current_string );
};

module.exports = TagSystem;
