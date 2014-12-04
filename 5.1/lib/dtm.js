var DTM = function(current_configuration, accept_states, rulebook){
  this.current_configuration = current_configuration;
  this.accept_states = accept_states;
  this.rulebook = rulebook;
};

DTM.prototype.accepting = function(){
  return this.accept_states.indexOf(this.current_configuration.state) !== -1;
};

DTM.prototype.step = function(){
  this.current_configuration = this.rulebook.next_configuration(this.current_configuration);
};

DTM.prototype.stuck = function(){
  return ! this.accepting() && ! this.rulebook.applies_to(this.current_configuration);
};

DTM.prototype.run = function(){
  do {
    this.step();
  } while(! this.accepting() && ! this.stuck());
};

module.exports = DTM;
