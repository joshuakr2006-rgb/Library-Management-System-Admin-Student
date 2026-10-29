const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, trim: true, sparse: true, unique: true },
  category: { type: String, trim: true, default: 'General' },
  totalCopies: { type: Number, required: true, min: 1, default: 1 },
  availableCopies: { type: Number, required: true, min: 0, default: 1 }
}, { timestamps: true });
module.exports = mongoose.model('Book', bookSchema);
