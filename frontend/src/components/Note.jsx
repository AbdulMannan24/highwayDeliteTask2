import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Api } from "../apiConfig";
import './note.css';
import deleteButton from '../assets/trash.svg';

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
        <div className="note-card">
            <h3>{title}</h3>
            <p className="note-content">{content}</p>
            <div className="buttons-container">
                <button id="{NoteId}" onClick={handleView}>View</button>
                <button id="{NoteId}" onClick={handleEdit}>Edit</button>
                <button id="{NoteId}" onClick={handleDelete}>
                    <img src={deleteButton} alt="Delete" />
                </button>
            </div>
        </div>

    )
}

export default Note;