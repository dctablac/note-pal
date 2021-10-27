const express = require('express');
const router = express.Router();

const Note = require('../models/noteModel');

// Create a new note
router.route('/create').post(async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const userID = req.body.userID;
    const newNote = new Note({
        userID,
        title,
        content
    })
    const response = await newNote.save();
    console.log(`User ${userID} created a new note. noteID = ${response._id}`);
    res.status(201).send(response);
});

// Read all notes
router.route('/read/:userID').get(async (req, res) => {
    const response = await Note.find({userID: req.params.userID}).sort({updatedAt: 'desc'});
    console.log(`User ${req.params.userID} attempted to fetch notes`);
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
        console.log(`Note ${req.params.noteID}: update failed.`);
        res.status(404).send({ msg: "Note was not found or updated."});
    } else {
        console.log(`Note ${req.params.noteID}: update success.`)
        res.status(200).send({ msg: "Note was updated successfully."});
    }
});

// Delete a note
router.route('/delete/:noteID').delete(async (req, res) => {
    const query = {'_id': req.params.noteID};
    const response = await Note.deleteOne(query);
    if (response.deletedCount < 1) {
        console.log(`Note ${req.params.noteID}: Not found and/or could not be deleted.`)
        res.status(404).send({ msg: "Note was not found or deleted." });
    } else {
        console.log(`Note ${req.params.noteID}: delete success`);
        res.status(200).send({ msg: "Note successfully deleted."});
    }
})

module.exports = router;