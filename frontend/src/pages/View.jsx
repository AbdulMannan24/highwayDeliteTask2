import axios from "axios";
import { Api } from "../apiConfig";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function View() {
    const [note, setNote] = useState({});
    const { id } = useParams();

    async function getNote() {
        try {
            let token = 'Bearer ' + localStorage.getItem('token');
            let link = Api + '/notes/' + title;
            let response = await axios.get(Api + '/notes/search/' + id, { 
                headers: { authorization: token}
            })
            if (response.data.message == 'success') {
                if (response.data.notes && response.data.notes.length > 0) {
                    console.log(response.data.notes)
                    setNote(response.data.notes[0]);
                  } else {
                    console.log('No note found for this title');
                  } 
            } else {
                window.alert(response.data.details);
            }
        } catch(error) {
            console.log(error);
            window.alert('Backend Error');
        }
    }
    useEffect(() => {
        getNote();
    }, [])

    return (
        <div >
            <Navbar/>
            <br />
            <br />
            <div style = {{display: 'flex', justifyContent: 'center'}}>
                <div>
                    <h2 style = {{color: 'white'}}>{note.title}</h2>
                    <hr  style = {{color: 'white'}}/>
                    <p style = {{color: 'white'}}>{note.content}</p>
                </div>
            </div>
        </div>
    )
}

export default View;