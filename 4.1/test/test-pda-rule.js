var assert = require('assert')
  , Stack = require('../../4.1/lib/stack')
  , PDARule = require('../../4.1/lib/pda-rule')
  , PDAConfiguration = require('../../4.1/lib/pda-configuration');

describe('PDARule', function(){
  var rule = new PDARule(1, '(', 2, '$', ['b', '$']);
  var configuration = new PDAConfiguration(1, new Stack(['$']))

  it('( should be true', function(){
    assert.equal(rule.applies_to(configuration, '('), true);
  });

  it('should', function(){
    console.log(rule.follow(configuration) );
  });
});
