const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all notes
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Some error occured");
      }
});


//ROUTE 2: Add a new note
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a description with least 5 letters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;

        //if there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        };

        const note = new Notes({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    };
});


//ROUTE 3: Update an existing note using PUT
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    try {
    //Create a new object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send({error: "Not Found"})};
    if(note.user.toString() !== req.user.id){return res.status(401).send({error: "Not Allowed"})};

    note = await Notes.findByIdAndUpdate(
        req.params.id, {$set: newNote}, {new: true}
    );
    res.json({note});
    } catch (error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});


//ROUTE 4: Deleting an existing note
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;

    //Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send({error: "Not Found"})};

    //Allow deletion only if user owns the note
    if(note.user.toString() !== req.user.id){return res.status(401).send({error: "Not Allowed"})};

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note deleted successfully", note: note});
});

module.exports = router;