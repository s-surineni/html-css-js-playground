class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  getInfo() {
    return `${this.title} by ${this.author}`;
  }
}

class LibraryBook extends Book {
  constructor(title, author) {
    super(title, author);
    this.isBorrowed = false;
  }

  borrow() {
    this.isBorrowed = true;
  }

  getInfo() {
    return `${super.getInfo()} — ${this.isBorrowed ? 'borrowed' : 'available'}`;
  }
}

const libraryBook = new LibraryBook('1984', 'George Orwell');
console.log('--- Class Inheritance ---');
console.log(libraryBook.getInfo());
console.log('LibraryBook instance:', libraryBook instanceof LibraryBook);
console.log('Book instance:', libraryBook instanceof Book);
