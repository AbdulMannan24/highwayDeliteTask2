import axios from "axios";
import { useState, useEffect } from "react"
import { Api } from "../apiConfig";
import Note from "../components/Note";

function Home() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");

    async function getNotes() {
        let token = 'Bearer ' + localStorage.getItem("token");
        let response = await axios.get(Api + '/notes/' + search, { 
            headers: { authorization: token}
        } );
        if (response.data.message == "success") {
            setNotes(response.data.notes);
        }
    }

    function handleDeleteNote (id)  {
        setNotes(notes.filter((note) => note.id !== id));
    };

    useEffect(()=>{
        getNotes();
    }, [search])
    
    return (
        <div>
            <div>this is navbar</div>

            <input type="text" placeholder="search..." onChange={(e)=> {
                console.log(e.target.value);
                setSearch(e.target.value);
            }}/>
            <br />
            {notes.map(note => <Note key = {note.id} 
                                     NoteId = {note.id} 
                                     title = {note.title}
                                     content = {note.content}
                                     onDelete = {handleDeleteNote}/>)}
        </div>
    )
}

export default Home;