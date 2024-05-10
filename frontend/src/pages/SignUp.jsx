import { useState } from "react";
import axios from "axios";
import { Api } from "../apiConfig";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registered, setRegistered] = useState("");

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

                <br />
                 <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button onClick={handleSubmit}>Submit</button>

            <br />
            <p>{registered}</p>
        </div>
    )
}

export default SignUp;