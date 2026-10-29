const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true, sparse: true, unique: true },
  department: { type: String, trim: true, default: 'CSE' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true }
}, { timestamps: true });
module.exports = mongoose.model('Member', memberSchema);
