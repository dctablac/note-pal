const express = require('express');
const router = express.Router();

const Note = require('../models/noteModel');

// Create a new note
router.route('/create').post(async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const email = req.body.email;
    const newNote = new Note({
        email,
        title,
        content
    })
    const response = await newNote.save();
    res.status(201).send(response);
});

// Read all notes
router.route('/read/:email').get(async (req, res) => {
    const response = await Note.find({email: req.params.email});
    if (response.length === 0) {
        res.status(200).send({ msg: "No notes found", notes: response });
    } else {
        res.status(200).send({ msg: "Notes successfully retrieved.", notes: response });
    }
});

// Update a note
router.route('/update/:noteID').patch(async (req, res) => {
    const query = {'_id': req.params.noteID};
    const newData = {};
    for (let key in req.body) {
        newData[key] = req.body[key];
    }
    const response = await Note.findOneAndUpdate(query, newData);

    if (!response) {
        res.status(404).send({ msg: "Note was not found or updated."});
    } else {
        res.status(200).send({ msg: "Note was updated successfully"});
    }
});

// Delete a note
router.route('/delete/:noteID').delete(async (req, res) => {
    const query = {'_id': req.params.noteID};
    const response = await Note.deleteOne(query);
    if (response.deletedCount < 1) {
        res.status(404).send({ msg: "Note was not found or deleted." });
    } else {
        res.status(204).send(responseBody);
    }
})

module.exports = router;