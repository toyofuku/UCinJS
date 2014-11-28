```
$ node test/test-expression.js
<<1 * 2 + 3 * 4>>
true
<<2 + 3 * 4>>
true
<<2 + 12>>
true
<<14>>
false

$ node test/test-machine-0.js
1 * 2 + 3 * 4
2 + 3 * 4
2 + 12
14

$ node test/test-less-than.js
5 < 2 + 2
5 < 4
false

$ node test/test-machine-1.js
x + y
3 + y
3 + 4
7

$ node test/test-reduce.js
<<x = x + 1>>
{ x: <<2>> }
true
[ <<x = 2 + 1>>, { x: <<2>> } ]
[ <<x = 3>>, { x: <<2>> } ]
[ <<do-nothing>>, { x: <<3>> } ]
false

$ node test/test-statement.js
x = x + 1, { x: <<2>> }
x = 2 + 1, { x: <<2>> }
x = 3, { x: <<2>> }
do-nothing, { x: <<3>> }

$ node test/test-if.js
if (x) { y = 1 } else { y = 2 }, { x: <<true>> }
if (true) { y = 1 } else { y = 2 }, { x: <<true>> }
y = 1, { x: <<true>> }
do-nothing, { x: <<true>>, y: <<1>> }

$ node test/test-else.js
if (x) { y = 1 } else { do-nothing }, { x: <<false>> }
if (false) { y = 1 } else { do-nothing }, { x: <<false>> }
do-nothing, { x: <<false>> }

$ node test/test-sequence.js
x = 1 + 1; y = x + 3, {}
x = 2; y = x + 3, {}
do-nothing; y = x + 3, { x: <<2>> }
y = x + 3, { x: <<2>> }
y = 2 + 3, { x: <<2>> }
y = 5, { x: <<2>> }
do-nothing, { x: <<2>>, y: <<5>> }

$ node test/test-while.js
while (x < 5) { x = x * 3 }, { x: <<1>> }
if (x < 5) { x = x * 3; while (x < 5) { x = x * 3 } } else { do-nothing }, { x: <<1>> }
if (1 < 5) { x = x * 3; while (x < 5) { x = x * 3 } } else { do-nothing }, { x: <<1>> }
if (true) { x = x * 3; while (x < 5) { x = x * 3 } } else { do-nothing }, { x: <<1>> }
x = x * 3; while (x < 5) { x = x * 3 }, { x: <<1>> }
x = 1 * 3; while (x < 5) { x = x * 3 }, { x: <<1>> }
x = 3; while (x < 5) { x = x * 3 }, { x: <<1>> }
do-nothing; while (x < 5) { x = x * 3 }, { x: <<3>> }
while (x < 5) { x = x * 3 }, { x: <<3>> }
if (x < 5) { x = x * 3; while (x < 5) { x = x * 3 } } else { do-nothing }, { x: <<3>> }
if (3 < 5) { x = x * 3; while (x < 5) { x = x * 3 } } else { do-nothing }, { x: <<3>> }
if (true) { x = x * 3; while (x < 5) { x = x * 3 } } else { do-nothing }, { x: <<3>> }
x = x * 3; while (x < 5) { x = x * 3 }, { x: <<3>> }
x = 3 * 3; while (x < 5) { x = x * 3 }, { x: <<3>> }
x = 9; while (x < 5) { x = x * 3 }, { x: <<3>> }
do-nothing; while (x < 5) { x = x * 3 }, { x: <<9>> }
while (x < 5) { x = x * 3 }, { x: <<9>> }
if (x < 5) { x = x * 3; while (x < 5) { x = x * 3 } } else { do-nothing }, { x: <<9>> }
if (9 < 5) { x = x * 3; while (x < 5) { x = x * 3 } } else { do-nothing }, { x: <<9>> }
if (false) { x = x * 3; while (x < 5) { x = x * 3 } } else { do-nothing }, { x: <<9>> }
do-nothing, { x: <<9>> }
```
