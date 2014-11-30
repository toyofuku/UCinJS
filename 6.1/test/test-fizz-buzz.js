var FizzBuzz = require('../lib/fizz-buzz')
  , assert = require('assert');

assert.equal(FizzBuzz.to_integer(FizzBuzz.ZERO), 0);
assert.equal(FizzBuzz.to_integer(FizzBuzz.THREE), 3);
assert.equal(FizzBuzz.to_integer(FizzBuzz.FIVE), 5);
assert.equal(FizzBuzz.to_integer(FizzBuzz.FIFTEEN), 15);
assert.equal(FizzBuzz.to_integer(FizzBuzz.HUNDRED), 100);

assert.equal(FizzBuzz.to_boolean(FizzBuzz.TRUE), true);
assert.equal(FizzBuzz.to_boolean(FizzBuzz.FALSE), false);
assert.equal(FizzBuzz.IF(FizzBuzz.TRUE)('happy')('sad'), 'happy');
assert.equal(FizzBuzz.IF(FizzBuzz.FALSE)('happy')('sad'), 'sad');

assert.equal(FizzBuzz.to_boolean(FizzBuzz.IS_ZERO(FizzBuzz.ZERO)), true);
assert.equal(FizzBuzz.to_boolean(FizzBuzz.IS_ZERO(FizzBuzz.THREE)), false);

var my_pair = FizzBuzz.PAIR(FizzBuzz.THREE)(FizzBuzz.FIVE);
assert.equal(FizzBuzz.to_integer(FizzBuzz.LEFT(my_pair)), 3);
assert.equal(FizzBuzz.to_integer(FizzBuzz.RIGHT(my_pair)), 5);

assert.equal(FizzBuzz.to_integer(FizzBuzz.DECREMENT(FizzBuzz.FIVE)), 4);
assert.equal(FizzBuzz.to_integer(FizzBuzz.DECREMENT(FizzBuzz.FIFTEEN)), 14);
assert.equal(FizzBuzz.to_integer(FizzBuzz.DECREMENT(FizzBuzz.HUNDRED)), 99);
assert.equal(FizzBuzz.to_integer(FizzBuzz.DECREMENT(FizzBuzz.ZERO)), 0);

assert.equal(FizzBuzz.to_integer(FizzBuzz.SUBSTRACT(FizzBuzz.FIVE)(FizzBuzz.THREE)), 2);
assert.equal(FizzBuzz.to_integer(FizzBuzz.SUBSTRACT(FizzBuzz.THREE)(FizzBuzz.FIVE)), 0);

assert.equal(FizzBuzz.to_boolean(FizzBuzz.IS_LESS_OR_EQUAL(FizzBuzz.ONE)(FizzBuzz.TWO)), true);
assert.equal(FizzBuzz.to_boolean(FizzBuzz.IS_LESS_OR_EQUAL(FizzBuzz.TWO)(FizzBuzz.TWO)), true);
assert.equal(FizzBuzz.to_boolean(FizzBuzz.IS_LESS_OR_EQUAL(FizzBuzz.THREE)(FizzBuzz.TWO)), false);

assert.equal(FizzBuzz.to_integer(FizzBuzz.MOD(FizzBuzz.THREE)(FizzBuzz.TWO)), 1);
assert.equal(FizzBuzz.to_integer(FizzBuzz.MOD(
  FizzBuzz.POWER(FizzBuzz.THREE)(FizzBuzz.THREE)
  )(
  FizzBuzz.ADD(FizzBuzz.THREE)(FizzBuzz.TWO)
  )) ,2);

var my_list = FizzBuzz.UNSHIFT(
  FizzBuzz.UNSHIFT(
    FizzBuzz.UNSHIFT(FizzBuzz.EMPTY)(FizzBuzz.THREE)
  )(FizzBuzz.TWO)
)(FizzBuzz.ONE);

assert.equal(FizzBuzz.to_integer(FizzBuzz.FIRST(my_list)), 1);
assert.equal(FizzBuzz.to_integer(FizzBuzz.FIRST(FizzBuzz.REST(my_list))), 2);
assert.equal(FizzBuzz.to_integer(FizzBuzz.FIRST(FizzBuzz.REST(FizzBuzz.REST(my_list)))), 3);
assert.equal(FizzBuzz.to_boolean(FizzBuzz.IS_EMPTY(my_list)), false);
assert.equal(FizzBuzz.to_boolean(FizzBuzz.IS_EMPTY(FizzBuzz.EMPTY)), true);
assert.deepEqual(FizzBuzz.to_array(my_list).map(function(p){ return FizzBuzz.to_integer(p); }), [1,2,3]);

var my_range = FizzBuzz.RANGE(FizzBuzz.ONE)(FizzBuzz.FIVE);
assert.deepEqual(FizzBuzz.to_array(my_range).map(function(p){return FizzBuzz.to_integer(p); }), [1,2,3,4,5]);

assert.equal(FizzBuzz.to_integer(FizzBuzz.FOLD(FizzBuzz.RANGE(FizzBuzz.ONE)(FizzBuzz.FIVE))(FizzBuzz.ZERO)(FizzBuzz.ADD)), 15);
assert.equal(FizzBuzz.to_integer(FizzBuzz.FOLD(FizzBuzz.RANGE(FizzBuzz.ONE)(FizzBuzz.FIVE))(FizzBuzz.ONE)(FizzBuzz.MULTIPLY)), 120);

var my_list = FizzBuzz.MAP(FizzBuzz.RANGE(FizzBuzz.ONE)(FizzBuzz.FIVE))(FizzBuzz.INCREMENT);
assert.deepEqual(FizzBuzz.to_array(my_list).map(function(p){return FizzBuzz.to_integer(p); }), [2,3,4,5,6]);

assert.equal(FizzBuzz.to_char(FizzBuzz.ZED), 'z');
assert.equal(FizzBuzz.to_string(FizzBuzz.FIZZBUZZ), 'FizzBuzz');

assert.deepEqual(FizzBuzz.to_array(FizzBuzz.TO_DIGITS(FizzBuzz.FIVE)).map(function(p){return FizzBuzz.to_integer(p);}) ,[5]);
assert.deepEqual(FizzBuzz.to_array(FizzBuzz.TO_DIGITS(FizzBuzz.POWER(FizzBuzz.FIVE)(FizzBuzz.THREE))).map(function(p){return FizzBuzz.to_integer(p);}), [1,2,5]);

assert.equal(FizzBuzz.to_string(FizzBuzz.TO_DIGITS(FizzBuzz.FIVE)), '5');
assert.equal(FizzBuzz.to_string(FizzBuzz.TO_DIGITS(FizzBuzz.POWER(FizzBuzz.FIVE)(FizzBuzz.THREE))), '125');

var solution = FizzBuzz.solution;
/*
FizzBuzz.to_array(solution).forEach(function(p){
  console.log(FizzBuzz.to_string(p));
});
*/
assert.deepEqual(FizzBuzz.to_array(solution).map(function(p){return FizzBuzz.to_string(p);}),
['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz',
'11','Fizz','13','14','FizzBuzz','16','17','Fizz','19','Buzz',
'Fizz','22','23','Fizz','Buzz','26','Fizz','28','29','FizzBuzz',
'31','32','Fizz','34','Buzz','Fizz','37','38','Fizz','Buzz',
'41','Fizz','43','44','FizzBuzz','46','47','Fizz','49','Buzz',
'Fizz','52','53','Fizz','Buzz','56','Fizz','58','59','FizzBuzz',
'61','62','Fizz','64','Buzz','Fizz','67','68','Fizz','Buzz',
'71','Fizz','73','74','FizzBuzz','76','77','Fizz','79','Buzz',
'Fizz','82','83','Fizz','Buzz','86','Fizz','88','89','FizzBuzz',
'91','92','Fizz','94','Buzz','Fizz','97','98','Fizz','Buzz']);
