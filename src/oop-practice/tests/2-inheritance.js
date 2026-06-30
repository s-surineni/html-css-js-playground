const lb = new LibraryBook('1984', 'George Orwell', 1949);
expect(lb.isBorrowed, false, 'starts not borrowed');
expect(lb.getInfo(), '1984 by George Orwell (1949) — available', 'getInfo() when available');
lb.borrow();
expect(lb.isBorrowed, true, 'borrow() sets the flag');
expect(lb.getInfo(), '1984 by George Orwell (1949) — borrowed', 'getInfo() reflects borrowed');
lb.returnBook();
expect(lb.isBorrowed, false, 'returnBook() clears the flag');
