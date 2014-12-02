var Tape = require('../lib/tape')
  , TMRule = require('../lib/tm-rule')
  , TMConfiguration = require('../lib/tm-configuration')
  , assert = require('assert');

var rule = new TMRule(1, '0', 2, '1', 'right');

assert.equal(rule.applies_to(new TMConfiguration(1, new Tape([], '0', [], '_'))), true);
assert.equal(rule.applies_to(new TMConfiguration(1, new Tape([], '1', [], '_'))), false);
assert.equal(rule.applies_to(new TMConfiguration(2, new Tape([], '0', [], '_'))), false);

console.log( rule.follow(new TMConfiguration(1, new Tape([], '0', [], '_'))) );
