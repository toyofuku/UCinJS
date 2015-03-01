var assert = require('assert')
  , Stack = require('../../4.1/lib/stack')
  , PDARule = require('../../4.1/lib/pda-rule')
  , PDAConfiguration = require('../../4.1/lib/pda-configuration')
  , DPDARulebook = require('../../4.1/lib/dpda-rulebook');

describe('DPDARulebook', function(){
  var rulebook = new DPDARulebook([
    new PDARule(1, '(',  2, '$', ['b', '$']),
    new PDARule(2, '(',  2, 'b', ['b', 'b']),
    new PDARule(2, ')',  2, 'b', []),
    new PDARule(2, null, 1, '$', ['$'])
  ]);

  var configuration = new PDAConfiguration(1, new Stack(['$']));

  configuration = rulebook.next_configuration(configuration, '(');
  console.log(configuration);

  configuration = rulebook.next_configuration(configuration, '(');
  console.log(configuration);

  configuration = rulebook.next_configuration(configuration, ')');
  console.log(configuration);

  it('should be', function(){
    var configuration = new PDAConfiguration(2, new Stack(['$']));
    console.log( configuration );
    console.log( rulebook.follow_free_moves(configuration) );

  });

});
