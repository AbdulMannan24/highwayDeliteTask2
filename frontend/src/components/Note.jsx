import { useNavigate } from "react-router-dom";


function Note({ NoteId, title, content}) {
    const navigate = useNavigate();

    function handleView() {
        console.log(title);
        navigate('/view/' + title);
    }    
    return (
        <div>
            <h3>{title}</h3>
            <p>{content}</p>
            <button id= {title} onClick = {handleView}>view</button>
            <button id= {title}>Edit</button>
            <button id = {NoteId}>Delete</button>
        </div>
    )
}

export default Note;