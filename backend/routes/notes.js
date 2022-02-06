const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

var fetchUser = require("../middleware/fetchUser");

const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes: GET "api/notes/fetchallnotes" .Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add a new Note: POST "api/notes/addnote" .Login required
router.get(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({min: 5,})
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are erros, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
