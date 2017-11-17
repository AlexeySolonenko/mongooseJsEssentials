var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Books = require('./Book.model');
var port = 8080;

const db = 'mongodb://admin:admin@ds113136.mlab.com:13136/mongoosejsessentials'
mongoose.connect(db ); // open local instance
// local mongodb automatically creates a pluralized collection
// remote - does not?

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const dbConnection = mongoose.connection;
// dbConnection.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.get('/', function(req, res) {
  res.send('happy to be there');
  
});

app.get('/books', function(req, res){ 
  console.log('getting all books');
  Books.find({})
    .exec(function(err, books){
      if(err){
        res.send('Error has occured: ' + err);
      } else {
        console.log(books);
        res.json(books);
      };
    });
});

app.get('/books/:id', function(req, res) {
  console.log('getting one book');
  Books.findOne({
    _id: req.params.id
  })
    .exec(function(err, book){
      if(err){
        res.send('Error has occured: ' + err);
      } else {
        console.log(book);
        res.json(book);
      }
    });
});

app.post('/book', function(req, res){
  console.log(req.body);
  const newBook = new Books();
  newBook.title = req.body.author;
  newBook.author = req.body.title;
  newBook.category = req.body.category;
  
  newBook.save(function (err, book){
    if(err){
      res.send('error saving books');
    } else {
      console.log('book');
      res.send(book);
    }
  });
});

app.post('/book2', function(req, res){
   Book.create(req.body, function (err, book){
     if(err){console.log(err)} else{ console.log(book), res.json(book)};
   });
});

app.put('/book/:id', function (req, res){
  Books.findOneAndUpdate(
  {
    _id: req.params.id
  }, 
  { $set: {title: req.body.title}},
  {upsert: true},
  function(err, newBook){
    if(err){
      console.log(err);
    } else {
      console.log(newBook);
      res.send(newBook);
    }; // 
  });
});

app.delete('/book/:id', function(req, res) {
  Books.findOneAndRemove({
    _id: req.params.id
  }, function(err, book){
      if(err){
        console.log(err);
      } else {
        console.log(book);
        res.status(204);
      };
  });
});

app.listen(port, () => {
  console.log('server running');
});

