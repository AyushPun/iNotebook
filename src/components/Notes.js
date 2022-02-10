import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, addNote } = context;

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <Noteitem note={note} key={note._id} />
        ))}
        {addNote}
      </div>
    </>
  );
};

export default Notes;
