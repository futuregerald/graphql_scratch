const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: String,
  },
  username: {
    type: String,
  },
});

module.exports = model('Recipe', RecipeSchema);
