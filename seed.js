const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const Book = require('./models/book');

async function seed() {
  // seed the database with some books, so I can retrieve them
  await Book.create({
    title: 'The Way of Kings',
    description: 'Stormlight Archive: First Book',
    status: 'True',
    email: 'user1@yahoo.com',
  });
  console.log('first book added'); 
  await Book.create({
    title: 'Surely You\'re Joking, Mr. Feynman!',
    description: 'Richard Feynman (1918-1988), winner of the Nobel Prize in physics, thrived on outrageous adventures. Here he recounts in his inimitable voice his experience trading ideas on atomic physics with Einstein and Bohr and ideas on gambling with Nick the Greek; cracking the uncrackable safes guarding the most deeply held nuclear secrets; painting a naked female toreador—and much else of an eyebrow-raising nature.',
    status: 'False',
    email: 'user2@yahoo.com',
  });
  console.log('second book added'); 
  await Book.create({
    title: 'Harry Potter and the Sorcerers Stone',
    description: 'You\'re A Wizard, Harry',
    status: 'True',
    email: 'HPotter3@wizard.com',
  });
  console.log('all books added'); 
  // myBook.save(function (err) {
  //   if (err) console.error(err);
  //   else console.log('saved Jimmy John');
  // });

  mongoose.disconnect();
}

seed();
