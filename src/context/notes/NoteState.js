import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const s1 = {
        "name" : "Ayush Pun",
        "class" : "12a",
    }

    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
            "name" : "Apex Predator",
            "class" : "10b"
            })
        }, 1000)
    }
    return (
        //"NoteContext.Provider" will provide all state of note
        <NoteContext.Provider value={{state, update}}>     
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;