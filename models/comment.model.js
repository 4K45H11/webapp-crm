const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',  // Reference to the Lead model
    required: [true, 'Lead reference is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesAgent',  // Reference to the SalesAgent 
    // who posted the comment
    required: [true, 'Author is required'],
  },
  commentText: {
    type: String,
    required: [true, 'Comment text is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the creation 
    // time
  }
  //Date.now without parenthesis sets the default of the 
  // current timestamp
});

module.exports = mongoose.model('Comment', commentSchema);

//we can add multiple authors by this
// author: {
//   type: mongoose.Schema.Types.ObjectId,
//   required: true,
//   refPath: 'authorType'
// },
// authorType: {
//   type: String,
//   required: true,
//   enum: ['SalesAgent', 'Client'] // Your model names
// }