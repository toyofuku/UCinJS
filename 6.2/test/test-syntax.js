var LCVariable = require('../lib/lc-variable')
  , LCFunction = require('../lib/lc-function')
  , LCCall     = require('../lib/lc-call');

var one = new LCFunction('p',
  new LCFunction('x',
    new LCCall(new LCVariable('p'), new LCVariable('x'))
  )
);
console.log(one);

var increment = new LCFunction('n',
  new LCFunction('p',
    new LCFunction('x',
      new LCCall(
        new LCVariable('p'),
        new LCCall(
          new LCCall(new LCVariable('n'), new LCVariable('p')),
          new LCVariable('x')
        )
      )
    )
  )
);

console.log(increment);

var add = new LCFunction('m',
  new LCFunction('n',
    new LCCall(new LCCall(new LCVariable('n'), increment), new LCVariable('m'))
  )
);

console.log(add);
