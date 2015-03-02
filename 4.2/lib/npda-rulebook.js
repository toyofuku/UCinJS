var __ = require('underscore');

var NPDARulebook = function(rules){
  this.rules = rules;
};

NPDARulebook.prototype.next_configuration = function(configuration, character){
  var _next_config = configuration.map(function(config){
    return this.follow_rules_for(config, character);
  }.bind(this));
  return __.uniq(__.flatten(_next_config));
};

NPDARulebook.prototype.follow_rules_for = function(configuration, character){
  return this.rules_for(configuration, character).map(function(rule){ return rule.follow(configuration); });
};

NPDARulebook.prototype.rules_for = function(configuration, character){
  return this.rules.filter(function(rule){ return rule.applies_to(configuration, character); });
};

NPDARulebook.prototype.follow_free_moves = function(configurations){

  var _configurations = configurations.map(function(config){ return JSON.stringify(config); });
  var more_configurations = this.next_configuration(configurations, null);

  if(more_configurations.every(function(config){return __.contains( _configurations, JSON.stringify(config) );})){
    return configurations;
  } else {
    var _merged_configs = __.reduce(more_configurations, function(memo_configs, config){
      if(! __.any(memo_configs, function(memo_config){ return __.isEqual(memo_config, config) }) ){
        memo_configs = memo_configs.concat(config);
      }
      return memo_configs;
    }, configurations);
    return this.follow_free_moves( _merged_configs );
  }
};

module.exports = NPDARulebook;
