var zero = function(){ return 0; };
var increment = function(n){return n + 1;};

var two = increment(increment(zero()));

var three = increment(two);

var add_three = function(x){return increment(increment(increment(x)));};

var recurse = function(f, g){
  var other_values = [];
  for(var i = 2; i < arguments.length - 1; i++){other_values.push(arguments[i]);}
  var last_value = arguments[arguments.length - 1];

    if(last_value == zero()){
      return f.apply(this, other_values);
    }
    else {
      var easier_last_value = last_value - 1;
      var easier_values = other_values.concat([easier_last_value]);

      var easier_result = recurse.apply(this, [f, g].concat(easier_values));
      easier_values.push(easier_result);
      return g.apply(this, easier_values);
    }
};

var add_zero_to_x = function(x){return x;};

var increment_easier_result = function(x, easier_y, easier_result){
  return increment(easier_result);
};

var add = function(x, y){
  return recurse(add_zero_to_x, increment_easier_result, x, y);
};

console.log( add(two, three) );



var multiply_x_by_zero = function(x){return zero();};

var add_x_to_easier_result = function(x, easier_y, easier_result){
  return add(x, easier_result);
};

var multiply = function(x, y){
  return recurse(multiply_x_by_zero, add_x_to_easier_result, x, y);
};


var easier_x = function(easier_x, easier_result){
  return easier_x;
};

var decrement = function(x){
  return recurse(zero, easier_x, x);
};


var substract_zero_from_x = function(x){return x;};

var decrement_easier_result = function(x, easier_y, easier_result){
  return decrement(easier_result);
};

var substract = function(x, y){
  return recurse(substract_zero_from_x, decrement_easier_result, x, y);
};

console.log(multiply(two, three));


var six = function(){  return multiply(two, three); }
console.log( decrement(six()) );
console.log( substract(six(), two) );
console.log( substract(two, six()) );


var minimize = function(yield){
  var n = 0;
  do { n++; } while(yield(n) != 0);
  return n;
};

var divide = function(x, y){
  return minimize(function(n){ return substract(increment(x), multiply(y, increment(n)))});
};

console.log( divide(six(), two) );
var ten = function(){ return increment(multiply(three, three)); }

console.log( divide(ten(), three) );
