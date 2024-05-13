import axios from "axios";
import { Api } from "../apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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
                    value={title}
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
                    rows="4"
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
            />
            </div>
            <br />
            <div style={{textAlign: 'center'}}>
                <button onClick = {handleUpdate} className="btn btn-primary">Update</button>
                &nbsp; &nbsp; &nbsp;
                <button onClick = {handleDelete} className="btn btn-primary">Delete</button> 
            </div>
        </div>       
        </div>
    </div>
    )
}

export default Edit;