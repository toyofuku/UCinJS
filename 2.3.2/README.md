```
$ node test/test-expression.js
<<23>>
<<23>>
<<true>>

$ node test/test-sequence.js
<<x = 1 + 1; y = x + 3>>
{ x: <<2>>, y: <<5>> }

$ node test/test-while.js
<<while (x < 5) { x = x * 3 }>>
{ x: <<9>> }

```
