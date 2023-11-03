const mongoose = require('mongoose');

const stickyNoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  attachments: [
    {
      type: String, // You can customize this data type for file attachments (e.g., storing file paths or URLs)
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
});

const StickyNote = mongoose.model('StickyNote', stickyNoteSchema);

module.exports = StickyNote;
