import { useState } from "react";
import axios from "axios";
import { Api } from "../apiConfig";
import './styles/signUp.css'
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registered, setRegistered] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        try{
            let response = await axios.post(Api+'/user/signup/', {
                email : email,
                password: password
            });
            if (response.data.message == 'success') {
                setRegistered("Success!! Kindly check your email for Verification Link")
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
        <div>
            <div className="container-fluid d-flex align-items-center justify-content-between">
                    <h2 style={{ color: 'white'}}>NotesDelite</h2>
                    <button style={{ color: 'white'}}  onClick = {()=> navigate('/signIn')} className="btn btn-link">Log In</button>
            </div>
            <div className="signup-form">
            <h2 style={{ color: 'white'}}>Sign Up</h2>
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
                Sign Up
                </button>
                <br />
            {registered && <p className="success" style={{ color: 'white'}}>{registered}</p>} {/* Display success message */}
        </div>        
    </div>
    )
}

export default SignUp;