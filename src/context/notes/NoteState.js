import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "61ffac00f587d328eedec53d",
          "user": "61fd48db2e2f3883c766f843",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2022-02-06T11:07:44.655Z",
          "__v": 0
        },
        {
          "_id": "61fface8f587d328eedec541",
          "user": "61fd48db2e2f3883c766f843",
          "title": "Updated Note",
          "description": "Access the playlist",
          "tag": "Youtube",
          "date": "2022-02-06T11:11:36.508Z",
          "__v": 0
        },
        {
          "_id": "61ffd51ae43d44893c6e35d2",
          "user": "61fd48db2e2f3883c766f843",
          "title": "Gym Class",
          "description": "At 7 0'clock evening",
          "tag": "Personal",
          "date": "2022-02-06T14:03:06.906Z",
          "__v": 0
        },
        {
          "_id": "61ffd51ae43344893c6e35d2",
          "user": "61fd48db2e2f3883c766f843",
          "title": "Gym Class",
          "description": "At 7 0'clock evening",
          "tag": "Personal",
          "date": "2022-02-06T14:03:06.906Z",
          "__v": 0
        },
        {
          "_id": "61ffd51ae43d45893c6e35d2",
          "user": "61fd48db2e2f3883c766f843",
          "title": "Gym Class",
          "description": "At 7 0'clock evening",
          "tag": "Personal",
          "date": "2022-02-06T14:03:06.906Z",
          "__v": 0
        },
        {
          "_id": "61ffd51ae43d24893c6e35d2",
          "user": "61fd48db2e2f3883c766f843",
          "title": "Gym Class",
          "description": "At 7 0'clock evening",
          "tag": "Personal",
          "date": "2022-02-06T14:03:06.906Z",
          "__v": 0
        },
        {
          "_id": "61ffd51ae43d4489336e35d2",
          "user": "61fd48db2e2f3883c766f843",
          "title": "Gym Class",
          "description": "At 7 0'clock evening",
          "tag": "Personal",
          "date": "2022-02-06T14:03:06.906Z",
          "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    //Add a Note
    const addNote = (title, description, tag) => {
      //TODO: API call
      console.log("Adding a new note");
      const note = {
        "_id": "61ffd51ae43d44893c6y35d2",
        "user": "61fd48db2e2f3883c766f843",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-02-06T14:03:06.906Z",
        "__v": 0
      };
      setNotes(notes.concat(note));
    }

    // //Delete a Note
    // const deleteNote = () => {
      
    // }

    // //Edit a Note
    // const editNote = () => {

    // }
    return (
        //"NoteContext.Provider" will provide all state of note
        <NoteContext.Provider value={{notes, setNotes, addNote}}>     
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;