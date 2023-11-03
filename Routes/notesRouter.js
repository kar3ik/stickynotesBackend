const express = require('express');
const StickyNote = require('../Models/notesModel'); // Import the StickyNote model
const verifyUser =require('../middleware/verifyUser')
const router = express.Router();

// Create a new StickyNote
router.route('/create/:userId').post(verifyUser, async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from the URL
    const { title, content, color, attachments } = req.body; // Extract data from the request body

    // Create a new StickyNote object based on the request data
    const newStickyNote = new StickyNote({
      title,
      content,
      color,
      attachments,
      userId, // Set the userId based on the URL parameter
    });

    // Save the new StickyNote to the database
    const savedStickyNote = await newStickyNote.save();

    // Respond with the saved StickyNote and a 201 status (created)
    res.status(201).json(savedStickyNote);
  } catch (err) {
    console.error('Error creating StickyNote:', err);

    // Handle errors by responding with a 500 status and an error message
    res.status(500).json({ message: 'Error creating StickyNote' });
  }
});



// Read all StickyNotes
router.route('/read/:userId').get(verifyUser, async (req, res) => {
  try {
    const userId = req.params.userId; // Get the userId from the URL

    // Find all StickyNotes in the database that belong to the specified user
    const stickyNotes = await StickyNote.find({ userId: userId });

    // Respond with the array of StickyNotes
    res.json(stickyNotes);
  } catch (err) {
    // Handle errors by responding with a 500 status and an error message
    res.status(500).json({ message: 'Error fetching StickyNotes' });
  }
});






// Read a specific StickyNote by ID
router.route('/:userId/note/:noteId').get(verifyUser, async (req, res) => {

  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    // console.log(userId)
    // console.log(noteId)

    // Find the specific StickyNote by ID and for the specified user
    const stickyNote = await StickyNote.findOne({ _id: noteId, userId: userId });

    if (!stickyNote) {
      res.status(404).json({ message: 'StickyNote not found' });
      return;
    }

    res.json(stickyNote);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching StickyNote' });
  }
});



// Update a StickyNote by ID
router.route('/update/:userId/:noteId').put(verifyUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    // Check if the user is authorized to update this StickyNote
    const stickyNote = await StickyNote.findOne({ _id: noteId, userId: userId });

    if (!stickyNote) {
      res.status(404).json({ message: 'StickyNote not found or you are not authorized to update it' });
      return;
    }

    // Update the specific StickyNote by its ID
    const updatedStickyNote = await StickyNote.findByIdAndUpdate(
      noteId,
      {
        $set: req.body,
      },
      { new: true }
    );

    // Respond with the updated StickyNote
    res.json(updatedStickyNote);
  } catch (err) {
    // Handle errors by responding with a 500 status and an error message
    res.status(500).json({ message: 'Error updating StickyNote' });
  }
});




// Delete a StickyNote by ID
router.route('/delete/:userId/:noteId').delete(verifyUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    // Check if the user is authorized to delete this StickyNote
    const stickyNote = await StickyNote.findOne({ _id: noteId, userId: userId });

    if (!stickyNote) {
      res.status(404).json({ message: 'StickyNote not found or you are not authorized to delete it' });
      return;
    }

    // Delete the specific StickyNote by its ID
    const deletedStickyNote = await StickyNote.findByIdAndDelete(noteId);

    if (!deletedStickyNote) {
      res.status(404).json({ message: 'StickyNote not found' });
      return;
    }

    // Respond with a success message
    res.json({ message: 'StickyNote deleted successfully' });
  } catch (err) {
    // Handle errors by responding with a 500 status and an error message
    res.status(500).json({ message: 'Error deleting StickyNote' });
  }
});




// Read all archived StickyNotes of specific user
router.route('/archived/:userId').get(verifyUser, async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from the URL

    // Find all archived notes associated with the specific user
    const archivedNotes = await StickyNote.find({
      userId,
      archived: true,
    });

    res.json(archivedNotes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching archived notes' });
  }
});




// Archive a sticky note by noteID of a specific user
router.route('/archive/:userId/:noteId').put(verifyUser, async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;

  try {
    const note = await StickyNote.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized: This note does not belong to you' });
    }

    // Perform the archiving operation here
    note.archived = true;
    await note.save();

    res.json({ message: 'Note archived successfully' });
  } catch (err) {
    console.error('Error archiving note:', err);

    // Handle errors by responding with a 500 status and an error message
    res.status(500).json({ message: 'Error archiving note' });
  }
});


// Unarchive a sticky note by ID of specific user
router.route('/unarchive/:userId/:noteId').put(verifyUser, async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;

  try {
    const note = await StickyNote.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized: This note does not belong to you' });
    }

    // Perform the unarchiving operation here
    note.archived = false;
    await note.save();

    res.json({ message: 'Note unarchived successfully' });
  } catch (err) {
    console.error('Error unarchiving note:', err);

    // Handle errors by responding with a 500 status and an error message
    res.status(500).json({ message: 'Error unarchiving note' });
  }
});


  


// Export the router for use in your application
module.exports = router;
