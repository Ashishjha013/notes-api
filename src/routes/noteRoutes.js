const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// @route   POST /api/notes - Create a new note
router.post('/', noteController.createNote);
// @route   GET /api/notes - Get all notes
router.get('/', noteController.getNotes);
// @route   GET /api/notes/:id - Get a note by ID
router.get('/:id', noteController.getNoteById);
// @route   PUT /api/notes/:id - Update a note by ID
router.put('/:id', noteController.updateNote);
// @route   DELETE /api/notes/:id - Delete a note by ID
router.delete('/:id', noteController.deleteNote);

module.exports = router;
