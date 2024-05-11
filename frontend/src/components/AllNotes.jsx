import axios from "axios";
import { useState } from "react"
import { Api } from "../apiConfig";

function AllNotes() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");

    async function getNotes() {
        let response = await axios.get(Api + '/notes/?search=' + search, );
        if (response.data.message == "success") {
            setNotes(response.data.notes);
        }
    }

    useEffect(()=>{
        getNotes();
    }, [])
    
    return (
        <div>
            <input type="text" placeholder="search..." onChange={()=> {
                setSearch(e.target.value);
                getNotes();
            }}/>
            <br />
            {notes.map(note => <Note key = {note.id} 
                                     NoteId = {note.id} 
                                     title = {note.title}
                                     content = {note.content}/>)}
        </div>
    )
}