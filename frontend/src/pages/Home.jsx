import axios from "axios";
import { useState, useEffect } from "react"
import { Api } from "../apiConfig";
import Note from "../components/Note";
import Navbar from "../components/Navbar";
import './styles/common.css';
import './styles/home.css'
import { useNavigate } from "react-router-dom";

function Home() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

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
        <div >
            <Navbar/>

           <div style = {{padding: '15px'}}>
                <div className="searchDiv">
                    <input type="text" className="searchBar" placeholder="search..." onChange={(e)=> {
                        console.log(e.target.value);
                        setSearch(e.target.value);
                    }}/>
                    <button className="btn btn-primary" onClick={()=> navigate('/add')}>Add Note</button>
                </div>
                <br />
                <br />
                <div className="note-cards-container">
                    {notes.map(note => <Note key = {note.id} 
                                            NoteId = {note.id} 
                                            title = {note.title}
                                            content = {note.content}
                                            onDelete = {handleDeleteNote}/>)}
                </div>
           </div>
        </div>
    )
}

export default Home;