const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 3,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      minlength: 5,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
