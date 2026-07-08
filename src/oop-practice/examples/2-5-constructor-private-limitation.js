// ============================================
// Limitation: Private variables in constructor
// are NOT accessible from prototype methods
// ============================================

function Counter(initial = 0) {
  // Private variable - only accessible via closure
  let count = initial;

  // ✅ Instance method CAN access private variable
  // (but creates new function for each instance - memory inefficient)
  this.increment = function() {
    count++;
    return count;
  };
}

// ❌ Prototype method CANNOT access private variable
// (because it's outside the constructor's closure)
Counter.prototype.getValue = function() {
  // return count; // ReferenceError: count is not defined
  return "Cannot access 'count' - it's private to the constructor!";
};

// ✅ Prototype method CAN access public properties
Counter.prototype.reset = function() {
  // this.count would work if count was public (this.count = initial)
  return "To use prototype methods, make the property public: this.count = initial";
};

const c1 = new Counter(5);
console.log(c1.increment()); // 6 - works (instance method)
console.log(c1.getValue());   // Cannot access 'count'
console.log(c1.reset());

// The tradeoff:
// - Instance methods (this.method = function) → can access private vars, but memory inefficient
// - Prototype methods (Constructor.prototype.method) → memory efficient, but can't access private vars

console.log('\n--- Better approach for encapsulation with prototypes: ---');

function BetterCounter(initial = 0) {
  // Make it public but use naming convention to signal "private"
  this._count = initial; // _ prefix = "treat as private" (convention only)
}

BetterCounter.prototype.increment = function() {
  this._count++;
  return this._count;
};

BetterCounter.prototype.getValue = function() {
  return this._count;
};

const c2 = new BetterCounter(5);
console.log(c2.increment()); // 6
console.log(c2.getValue());  // 6
console.log(c2._count);      // 6 - still accessible (no true privacy)
