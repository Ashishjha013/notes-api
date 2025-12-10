const Note = require('../models/noteModel');

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        message: 'Title and content are required.',
      });
    }

    const note = await Note.create({ title, content });

    return res.status(201).json({
      message: 'Note created successfully',
      note,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to create note',
      error: err.message,
    });
  }
};

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    return res.status(200).json({
      message: 'Notes retrieved successfully',
      notes,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to retrieve notes',
      error: err.message,
    });
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    return res.status(200).json({
      message: 'Note retrieved successfully',
      note,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to retrieve note',
      error: err.message,
    });
  }
};

// Update a note by ID
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    const updatedNote = await note.save();

    return res.status(200).json({
      message: 'Note updated successfully',
      note: updatedNote,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to update note',
      error: err.message,
    });
  }
};

// Delete a note by ID
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }
    await Note.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Note deleted successfully',
      note,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to delete note',
      error: err.message,
    });
  }
};
