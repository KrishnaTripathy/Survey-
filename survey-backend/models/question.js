const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['rating', 'text'],
    required: true
  },
  scale: {
    type: Number,
    min: 1,
    max: 10,
    required: function() { return this.type === 'rating'; }
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
