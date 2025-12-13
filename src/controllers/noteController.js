const mongoose = require('mongoose');
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
exports.getNotes = async (req, res, next) => {
  try {
    // 1) Read query params
    const { page: pageQ, limit: limitQ, keyword, sort: sortQ } = req.query;
    // 2) Defaults & parsing
    const page = Math.max(parseInt(pageQ, 10) || 1, 1); // default 1
    const limit = Math.max(parseInt(limitQ, 10) || 10, 1); // default 10
    const skip = (page - 1) * limit;

    // 3) Build search filter
    let filter = {};
    if (keyword && String(keyword).trim() !== '') {
      const k = String(keyword).trim();
      filter = {
        $or: [{ title: { $regex: k, $options: 'i' } }, { content: { $regex: k, $options: 'i' } }],
      };
    }

    // 4) Sorting
    // Accepts ?sort=createdAt or ?sort=-createdAt or any valid field
    const sort = sortQ || '-createdAt'; // default newest first

    // 5) Count total docs
    const total = await Note.countDocuments(filter);

    // 6) Query DB with filter + sort + pagination
    // .lean() -> returns plain JS objects (faster, lower memory)
    // .select() optional: choose fields to return,
    const notes = await Note.find(filter).sort(sort).skip(skip).limit(limit).lean();

    // 7) Build response
    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      count: notes.length,
      notes,
    });
  } catch (err) {
    next(err);
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
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to delete note',
      error: err.message,
    });
  }
};
