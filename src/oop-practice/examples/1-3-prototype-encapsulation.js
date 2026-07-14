// You don't need class or function Constructor() 
// (constructor functions called with new). 
// A plain factory function that returns an object literal,
//  combined with closures, gives you real encapsulation. This is exactly the Module Pattern applied per-instance.
// Just a plain function that returns a plain object — no `new`, no class
function createCounter(initial = 0) {
  let count = initial;   // PRIVATE — lives in the closure, not on the object

  return {               // plain object literal = the public API
    increment() { count++; },
    decrement() { count--; },
    get value() { return count; },
  };
}

const c = createCounter(10);
c.increment();
console.log(c.value);   // 11
console.log(c.count);   // undefined — truly inaccessible