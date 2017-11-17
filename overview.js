const mongoose = require('mongoose'); // import module
const Schema = mongoose.Schema;  // extract a Schema object, also can be { Schema } from mongoose? 

// make new Schema - a set of key:type pairs of any number/depth
const BookSchema = new Schema({
  title: String,
  keywords: Array,
  published: Boolean
});

// node.js exports statement - exporting an Instance - a real object
// that we can toss to and fro, manipulate and, finally send/read 
// to from database
module.exports = mongoose.model(Book, BookSchema);

// connection to database
// assign an address to a variable
const myDB = 'mongodb://localhost/dbName';

// need to connect somewhere at the beginnign of execution of 
// of the code
mongoose.connect(myDB); // is it async? or following operations
// only are async?
