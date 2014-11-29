```
$ node test/test-expression.j
(function(e){ return 5; })
(function(e){ return false; })
[Function]
5
[Function]
false
<<x>>
(function(e){ return e.x; })
[Function]
7
(function(e){ return (function(e){ return e.x; })(e) + (function(e){ return 1; })(e); })
(function(e){ return (function(e){ return (function(e){ return e.x; })(e) + (function(e){ return 1; })(e); })(e) < (function(e){ return 3; })(e); })
{ x: 3 }
[Function]
4
[Function]
false

$ node test/test-statement.js
<<y = x + 1>>
(function(e){ return Assign.prototype.merge(e, {y: (function(e){ return (function(e){ return e.x; })(e) + (function(e){ return 1; })(e); })(e)}); })
[Function]
{ x: 3, y: 4 }
<<while (x < 5) { x = x * 3 }>>
(function(e){ while ((function(e){ return (function(e){ return e.x; })(e) < (function(e){ return 5; })(e); })(e)) { e = (function(e){ return Assign.prototype.merge(e, {x: (function(e){ return (function(e){ return e.x; })(e) * (function(e){ return 3; })(e); })(e)}); })(e); } return e; })
[Function]
{ x: 9 }


```