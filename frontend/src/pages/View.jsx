import axios from "axios";
import { Api } from "../apiConfig";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function View() {
    const [note, setNote] = useState({});
    const { title } = useParams();

    async function getNote() {
        try {
            let token = 'Bearer ' + localStorage.getItem('token');
            let link = Api + '/notes/' + title;
            let response = await axios.get(Api + '/notes/' + title, { 
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
        <div>
            <br />
            <h2>{note.title}</h2>
            <p>{note.content}</p>
        </div>
    )
}

export default View;