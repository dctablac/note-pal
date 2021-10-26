const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        email: String,
        title: String,
        content: String
    }, { timestamps: true}
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;