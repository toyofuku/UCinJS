var assert = require('assert')
  , NFADesign = require('../../3.2/lib/nfa-design')
  , NFARulebook = require('../../3.2/lib/nfa-rulebook')
  , FARule = require('../../3.1/lib/fa-rule')
  , NFASimulation = require('../lib/nfa-simulation');

describe('NFADesign', function(){

  var rulebook = new NFARulebook([
    new FARule(1, 'a', 1), new FARule(1, 'a', 2), new FARule(1, null, 2),
    new FARule(2, 'b', 3),
    new FARule(3, 'b', 1), new FARule(3, null, 2)
  ]);
  var nfa_design = new NFADesign(1, [3], rulebook);
  var simulation = new NFASimulation(nfa_design);

  describe('#to_nfa()', function(){

    it('should be [1,2]', function(){
      assert.deepEqual(nfa_design.to_nfa().current_states(), [1,2]);
    });
    it('should be [2]', function(){
      assert.deepEqual(nfa_design.to_nfa([2]).current_states(), [2]);
    });
    it('should be [3,2]', function(){
      assert.deepEqual(nfa_design.to_nfa([3]).current_states(), [3,2]);
    });

    it('should be [3,1,2]', function(){
      var nfa = nfa_design.to_nfa([2,3]);
      nfa.read_character('b');
      assert.deepEqual(nfa.current_states(), [3,1,2]);
    });

  });

  describe('NFASimulation', function(){

    it('should be [1,2]', function(){
      assert.deepEqual(simulation.next_state([1,2],'a'), [1,2]);
    });
    it('should be [3,2]', function(){
      assert.deepEqual(simulation.next_state([1,2],'b'), [3,2]);
    });
    it('should be [1,3,2]', function(){
      assert.deepEqual(simulation.next_state([3,2],'b'), [1,3,2]);
    });
    it('should be [1,3,2]', function(){
      assert.deepEqual(simulation.next_state([1,3,2],'b'), [1,3,2]);
    });
    it('should be [1,2]', function(){
      assert.deepEqual(simulation.next_state([1,3,2],'a'), [1,2]);
    });
    it('should be a,b', function(){
      assert.deepEqual(rulebook.alphabet(), ['a','b']);
    });
    it('should be a->[1,2] b->[3,2]', function(){
      var rules = simulation.rules_for([1,2]);
      assert.equal(rules[0].inspect(), "#<FARule [1,2] --a--> [1,2]>");
      assert.equal(rules[1].inspect(), "#<FARule [1,2] --b--> [3,2]>");
    });
    it('should be a->[] b->[1,3,2]', function(){
      var rules = simulation.rules_for([3,2])
      assert.equal(rules[0].inspect(), "#<FARule [3,2] --a--> []>");
      assert.equal(rules[1].inspect(), "#<FARule [3,2] --b--> [1,3,2]>");
    });
  });

  describe('#discover_states_and_rules()', function(){
    var start_state = nfa_design.to_nfa().current_states();
    it('should be [1,2]', function(){
      assert.deepEqual(start_state, [1,2]);
    });
    it('should be [ [ 1, 2 ], [ 3, 2 ], [], [ 1, 3, 2 ] ]', function(){
      var states_and_rules = simulation.discover_states_and_rules([start_state]);
      assert.deepEqual(states_and_rules[0], [ [ 1, 2 ], [ 3, 2 ], [], [ 1, 3, 2 ] ]);
      assert.equal(states_and_rules[1][0].inspect(), "#<FARule [1,2] --a--> [1,2]>");
      assert.equal(states_and_rules[1][1].inspect(), "#<FARule [1,2] --b--> [3,2]>");
      assert.equal(states_and_rules[1][2].inspect(), "#<FARule [3,2] --a--> []>");
      assert.equal(states_and_rules[1][3].inspect(), "#<FARule [3,2] --b--> [1,3,2]>");
      assert.equal(states_and_rules[1][4].inspect(), "#<FARule [] --a--> []>");
      assert.equal(states_and_rules[1][5].inspect(), "#<FARule [] --b--> []>");
      assert.equal(states_and_rules[1][6].inspect(), "#<FARule [1,3,2] --a--> [1,2]>");
      assert.equal(states_and_rules[1][7].inspect(), "#<FARule [1,3,2] --b--> [1,3,2]>");
    });
  });

  describe('#accepting()', function(){
    it('should be false', function(){
      assert.equal(nfa_design.to_nfa([1,2]).accepting(), false);
    });
    it('should be true', function(){
      assert.equal(nfa_design.to_nfa([2,3]).accepting(), true);
    });
  });

  describe('#to_dfa_design()', function(){
    var dfa_design = simulation.to_dfa_design();

    it('aaa should be false', function(){
      assert.equal(dfa_design.accepts('aaa'), false);
    });
    it('aab should be true', function(){
      assert.equal(dfa_design.accepts('aab'), true);
    });
    it('bbbabb should be true', function(){
      assert.equal(dfa_design.accepts('bbbabb'), true);
    });

  });

});
