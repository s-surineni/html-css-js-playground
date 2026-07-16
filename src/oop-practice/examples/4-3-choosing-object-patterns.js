// Plain object: one shared value or utility namespace.
const appSettings = {
  theme: 'dark',
};

// Factory: many objects with closure-private state and no `new`.
function createSession(user) {
  let active = true;
  return {
    user,
    close() {
      active = false;
    },
    get isActive() {
      return active;
    },
  };
}

// Constructor function: useful when working with prototype-based legacy APIs.
function LegacyUser(name) {
  this.name = name;
}
LegacyUser.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

// Class: concise syntax for instances, shared methods, inheritance, and privacy.
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}`;
  }
}

const session = createSession('Tony');
const legacyUser = new LegacyUser('Bruce');
const modernUser = new User('Natasha');

console.log('--- Choosing an Object Pattern ---');
console.log('shared settings:', appSettings.theme);
console.log('factory privacy:', session.isActive);
console.log('constructor instance:', legacyUser.greet());
console.log('class instance:', modernUser.greet());
