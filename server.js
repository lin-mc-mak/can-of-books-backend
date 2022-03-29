'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./models/book');
const mongoose = require('mongoose');
const app = express();
app.use(cors());



const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DB_URL);

app.get('/books', async (request, response) => {

  const filterQuery = {};
  if(request.query.title){
    filterQuery.title = request.query.title;
  }

  const books = await Book.find(filterQuery);
  response.send(books);
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
