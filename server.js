'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./models/book');
const mongoose = require('mongoose');
const { request } = require('express');
const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DB_URL);

app.get('/books', async (request, response) => {
  const filterQuery = {};
  if (request.query.title) {
    filterQuery.title = request.query.title;
  }
  const books = await Book.find(filterQuery);
  // console.log(books);
  response.send(books);
});

app.post('/books', postBook);

async function postBook(request, response, next){
  console.log(request.body);
  try {
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch (error) {
    console.log(error);
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
