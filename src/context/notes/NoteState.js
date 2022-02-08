import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    return (
        //"NoteContext.Provider" will provide all state of note
        <NoteContext.Provider value={{}}>     
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;