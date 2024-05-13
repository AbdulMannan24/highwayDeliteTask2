import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../apiConfig";

function Add() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const navigate = useNavigate();

    async function handleAdd() {
        try {
            let token = 'Bearer ' + localStorage.getItem("token");
            let response = await axios.post(Api + '/notes/add', { 
                title,
                content
            }, {headers: { authorization: token}});
            if (response.data.message === "success") {
                navigate('/home');
            }
        } catch(error) {
            window.alert(response.data.details);
        }
    }

    return (
        <div>
            <label htmlFor="title">Title</label>
            <br />
            <input type="text" id="title" onChange = {(e) => setTitle(e.target.value)}/>
            <br />
            <label htmlFor="content">Content</label>
            <br />
            <input type="text" id="content" onChange = {(e) => setContent(e.target.value)}/>
            <br />
            <br />
            <button onClick = {handleAdd}>Add</button>
        </div>
    )
}

export default Add;