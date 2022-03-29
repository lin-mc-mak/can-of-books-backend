const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/book');

async function seed() {
  // seed the database with some books, so I can retrieve them
  const myBook = new Book({
    title: 'The Way of Kings',
    description: 'Stormlight Archive: First Book',
    status: 'Published',
    email: 'user1@yahoo.com',
  },);
  const myBook2 = new Book({
    title: 'Surely You\'re Joking, Mr. Feynman!',
    description: 'Richard Feynman (1918-1988), winner of the Nobel Prize in physics, thrived on outrageous adventures. Here he recounts in his inimitable voice his experience trading ideas on atomic physics with Einstein and Bohr and ideas on gambling with Nick the Greek; cracking the uncrackable safes guarding the most deeply held nuclear secrets; painting a naked female toreador—and much else of an eyebrow-raising nature.',
    status: 'Published',
    email: 'user2@yahoo.com',
  },);
  const myBook3 = new Book({
    title: 'Harry Potter and the Sorcerers Stone',
    description: 'You\'re A Wizard, Harry',
    status: 'Published',
    email: 'HPotter3@wizard.com',
  },);
  myBook.save(function (err) {
    if (err) console.error(err);
    else console.log('saved Jimmy John');
  });


  // alternately...
  // await Book.create({
  //   title: 'Jersey  Mike',
  //   description: 'calico',
  //   status: 'Paris',
  //   email: true,
  // });

  console.log('Im not a wizard, Im just harry');

  mongoose.disconnect();
}

seed();
