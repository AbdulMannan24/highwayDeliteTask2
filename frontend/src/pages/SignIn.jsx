import { useState } from "react";
import axios from "axios";
import { Api } from "../apiConfig";
import { useNavigate } from 'react-router-dom';
import './styles/signUp.css';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        try{
            let response = await axios.post(Api+'/user/signin/', {
                email : email,
                password: password
            });
            if (response.data.message == 'success') {
                localStorage.setItem("token", response.data.token);
                navigate('/home');
            } else {
                if (response.data.details)
                    window.alert(response.data.details);
            }
        } catch(err) {
            window.alert("Backend Error");
            console.log(err);
        }
    }
    
    return (
        <div className="body">
        <div className="container-fluid d-flex align-items-center justify-content-between">
                <h2 style={{ color: 'white'}}>NotesDelite</h2>
                <button onClick = {()=> navigate('/')} className="btn btn-link" style={{ color: 'white'}}>Sign Up</button>
        </div>
        <div className="signup-form">
        <h2 style={{ color: 'white'}}>Log In</h2>
            <div className="form-group">
            <label htmlFor="email" className="label" style={{ color: 'white'}}>
                Email:
            </label>
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="password" className="label" style={{ color: 'white'}}>
                Password:
            </label>
            <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <br />
            <button onClick={handleSubmit} className="btn btn-primary">
            Sign In
            </button>

    </div>        
</div>
    )
}

export default SignIn;