import axios from "axios";
import { Api } from "../apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Edit() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    async function fetchNote() {
        try {
            let token = 'Bearer ' + localStorage.getItem("token");
            let response = await axios.get(Api + '/notes/search/' + id, { 
                headers: { authorization: token}
            })
            if (response.data.message == "success") {
                setTitle(response.data.notes[0].title);
                setContent(response.data.notes[0].content);
            } else {
                window.alert(response.data.details);
            }
        } catch (error) {
            console.log(error);
            window.alert('Backend Error');
        }
    }

    async function handleUpdate() {
        try {
            let token = 'Bearer ' + localStorage.getItem('token');
            let response = await axios.put(Api + '/notes/edit/', {
                id,
                title,
                content
            }, { headers: { authorization: token}})
            if (response.data.message == 'success') {
                navigate('/home');
            } else {
                window.alert(response.data.details);
            }
        } catch (error) {
            console.log(error);
            window.alert('Backend Error');
        }
    }

    async function handleDelete() {
        try {
            let token = 'Bearer ' + localStorage.getItem('token');
            let response = await axios.delete(Api + '/notes/delete/' + id, { headers: { authorization: token}})
            if (response.data.message == 'success') {
                navigate('/home');
            } else {
                window.alert(response.data.details);
            }
        } catch (error) {
            console.log(error);
            window.alert('Backend Error');
        }
    }
    useEffect(() => {
        fetchNote();
    }, [])

    return (
        <div>
            <input type="text" value = {title} onChange={(e) => setTitle(e.target.value)}/>
            <br />
            <input type="text" value = {content} onChange={(e) => setContent(e.target.value)}/>
            <button onClick = {handleUpdate}>Update</button>
            <button onClick = {handleDelete}>Delete</button>
        </div>
    )
}

export default Edit;