import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../apiConfig";
import Navbar from "../components/Navbar";

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
        <div >
            < Navbar/>
            <div style={{}}>
            <div style={{marginLeft: '5%', marginRight: '20%', marginTop: '2%', width: '80%'}}>
                <br />
                <br />
            <div className="mb-3">
                    <label htmlFor="title" className="form-label" style={{color: 'white'}}>
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{color: 'white'}}>
                        Content
                    </label>
                    <textarea
                        className="form-control"
                        id="content"
                        placeholder="write content ..."
                        rows="4"
                        onChange={(e)=> setContent(e.target.value)}
                />
                </div>
                <br />
                <div style={{textAlign: 'center'}}>
                    <button onClick = {handleAdd} className="btn btn-primary">Add</button>
                </div>
            </div>       
            </div>
        </div>
    )
}

export default Add;