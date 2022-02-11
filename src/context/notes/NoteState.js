import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all Notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZDQ4ZGIyZTJmMzg4M2M3NjZmODQzIn0sImlhdCI6MTY0NDE0NTU5OH0.RiwLUgUgJJokD2aY4xDmuUaQxg2JFmULH0FPxu3L6GA",
      }
    });
    const res_json = await response.json();
    setNotes(res_json);
    console.log("Fetching All Notes");
    console.log(res_json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZDQ4ZGIyZTJmMzg4M2M3NjZmODQzIn0sImlhdCI6MTY0NDE0NTU5OH0.RiwLUgUgJJokD2aY4xDmuUaQxg2JFmULH0FPxu3L6GA",
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();
    console.log(json);

    console.log("Adding a new note");
    const note = {
      _id: "61ffd51ae43d44893c6y35d2",
      user: "61fd48db2e2f3883c766f843",
      title: title,
      description: description,
      tag: tag,
      date: "2022-02-06T14:03:06.906Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZDQ4ZGIyZTJmMzg4M2M3NjZmODQzIn0sImlhdCI6MTY0NDE0NTU5OH0.RiwLUgUgJJokD2aY4xDmuUaQxg2JFmULH0FPxu3L6GA",
      },
    });

    const json = await response.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZDQ4ZGIyZTJmMzg4M2M3NjZmODQzIn0sImlhdCI6MTY0NDE0NTU5OH0.RiwLUgUgJJokD2aY4xDmuUaQxg2JFmULH0FPxu3L6GA",
      },
      body: JSON.stringify({title, description, tag}),
    });

    const json = await response.json();
    console.log(json);

    //Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes)); //will make a deep copy of notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id == id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    //"NoteContext.Provider" will provide all state of note
    <NoteContext.Provider
      value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
