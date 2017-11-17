'user strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// !!!! REAL GOTCHA - SCHEMA NAME MUST CORRESPOND WITH COLLECTION NAME
// - MODEL IS ONLY AN  INTERNAL REPRESENTATION! DON'T KNOW HOW MANY
// MODELS AND SCHEMAS CAN BE, BUT REFERENCE TO A COLLECTION
// MUST
// MUST
// MUST BE EXACT

var BookSchema = new Schema ({
  title: String,
  catetory: String,
  author: String
}, {
  collection: 'Books'
});


module.exports = mongoose.model('Books', BookSchema); // !!! PAY ATTENTION - SCHEMA NAME IN QUOTES


/*  title: String,
  published: {
    type: Date,
    required: false,
    default: Date.now // without brackets - passing a function as an object
  },
  keywords: Array,
  published: Boolean,
  author: {
    type: Schema.ObjectID,
    ref: 'User' // what is this?
  },
  // Embedded sub-document
  detail: {
    modelNumber: Number,
    hardcover: Boolean,
    reviews: Number
  },
  catetory: 'String',
  author: 'String'
  
  */