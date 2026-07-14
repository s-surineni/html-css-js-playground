const lb = new LibraryBook('1984', 'George Orwell', 1949);
expect(lb.isBorrowed, false, 'starts not borrowed');
expect(lb.getInfo(), '1984 by George Orwell (1949) — available', 'getInfo() when available');
lb.borrow();
expect(lb.isBorrowed, true, 'borrow() sets the flag');
expect(lb.getInfo(), '1984 by George Orwell (1949) — borrowed', 'getInfo() reflects borrowed');
lb.returnBook();
expect(lb.isBorrowed, false, 'returnBook() clears the flag');
expect(lb instanceof LibraryBook, true, 'instance is a LibraryBook');
expect(lb instanceof Book, true, 'instance is also a Book');
expect(Object.getPrototypeOf(LibraryBook.prototype), Book.prototype, 'class extends links prototypes');
const anotherBook = new LibraryBook('Dune', 'Frank Herbert', 1965);
expect(lb.getInfo === anotherBook.getInfo, true, 'class methods are shared via the prototype');
expect(
  Object.prototype.propertyIsEnumerable.call(LibraryBook.prototype, 'getInfo'),
  false,
  'class methods are non-enumerable',
);
