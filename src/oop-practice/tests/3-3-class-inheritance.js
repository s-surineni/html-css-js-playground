expect(libraryBook.getInfo(), '1984 by George Orwell — available', 'override extends parent result');
libraryBook.borrow();
expect(libraryBook.getInfo(), '1984 by George Orwell — borrowed', 'child behavior updates state');
expect(libraryBook instanceof LibraryBook, true, 'instance belongs to child class');
expect(libraryBook instanceof Book, true, 'instance also belongs to parent class');
expect(Object.getPrototypeOf(LibraryBook.prototype), Book.prototype, 'extends links prototypes');
