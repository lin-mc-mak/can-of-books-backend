'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./models/book');
const mongoose = require('mongoose');
const res = require('express/lib/response');
// const res = require('express/lib/response');
const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DB_URL);

// ROUTES CALLING FUNCTIONS BELOW
app.get('/books', getBooks);
app.post('/books', postBook);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', updateBook);


//GET BOOKS****************************************
async function getBooks(request, response, next) {
  try {
    const filterQuery = {};
    if (request.query.title) {
      filterQuery.title = request.query.title;
    }
    if (request.query.email) {
      filterQuery.email = request.query.email;
    }
    const books = await Book.find(filterQuery);
    response.send(books);
  } catch (error) {
    next(error);
  }
}

// POST A BOOK****************************************
async function postBook(request, response, next) {
  console.log(request.body);
  try {
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}

// DELETE A BOOK****************************************
//the event on the front end should take user input of email and put it in the req body
async function deleteBook(request, response, next) {
  let id = request.params.id;
  try {
    console.log(`id to delete: `, id);
    let deletedBook = await Book.findByIdAndDelete(id);
    response.send(deletedBook);
  } catch (error) {
    next(error);
  }
}

// UPDATE A BOOK****************************************
// CURRENTLY CREATING FUNCTION TO MODIFY BOOK
async function updateBook(request, response, next) {
  console.log('updateBook is running');
  let id = request.params.id;
  // data on updated book is in req.body
  console.log('id to edit', id);

  try {
    let updatedBook = await Book.findByIdAndUpdate (id, request.body,{new: true, overwrite: true});
    // should return updated book ^^^^

    console.log('request.body should return updated book',request.body);
    console.log('should return updated book',updatedBook);

    response.send(updatedBook);

  } catch (error) {
    next(error);
  }
}

//ERROR HANDLING ****************************************
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
  next(error);
});

// LISTENING
app.listen(PORT, () => console.log(`listening on ${PORT}`));
