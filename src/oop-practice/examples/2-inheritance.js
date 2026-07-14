class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
  getInfo() {
    return `${this.title} by ${this.author} (${this.year})`;
  }
}

class LibraryBook extends Book {
  constructor(title, author, year) {
    super(title, author, year);
    this.isBorrowed = false;
  }
  borrow() {
    this.isBorrowed = true;
    return `Borrowed "${this.title}"`;
  }
  returnBook() {
    this.isBorrowed = false;
    return `Returned "${this.title}"`;
  }
  getInfo() {
    return `${super.getInfo()} — ${this.isBorrowed ? 'borrowed' : 'available'}`;
  }
}

// `class` is syntax over JavaScript's prototype system: methods are shared.
console.log(
  'LibraryBook.prototype inherits from Book.prototype:',
  Object.getPrototypeOf(LibraryBook.prototype) === Book.prototype,
);
