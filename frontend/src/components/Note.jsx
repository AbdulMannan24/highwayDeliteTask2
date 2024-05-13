import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Api } from "../apiConfig";


function Note({ NoteId, title, content, onDelete}) {
    const navigate = useNavigate();

    function handleView() {
        console.log(title);
        navigate('/view/' + title);
    }    

    function handleEdit() {
        navigate('/edit/' + NoteId);
    }

    async function handleDelete() {
        try {
            let token = 'Bearer ' + localStorage.getItem('token');
            let id = parseInt(NoteId);
            let response = await axios.delete(Api + '/notes/delete/' + id, {
                headers: { authorization: token}
            })
            if (response.data.message === 'success') {
                onDelete(NoteId);
                //window.alert('Note deleted successfully');
            } else {
                window.alert(response.data.details);
            }
        } catch (error) {
            console.log(error);
            window.alert('Backend Error');
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <p>{content}</p>
            <button id= {title} onClick = {handleView}>view</button>
            <button id= {NoteId} onClick = {handleEdit} >Edit</button>
            <button id = {NoteId} onClick = {handleDelete} >Delete</button>
        </div>
    )
}

export default Note;