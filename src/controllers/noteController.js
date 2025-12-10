const Note = require('../models/noteModel');

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400);
      throw new Error('Title and content are required.');
    }

    const note = await Note.create({ title, content });
    await not.save();

    res.status(201).json({
      message: 'Note created successfully',
      note,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create note',
      error: err.message,
    });
  }
};
