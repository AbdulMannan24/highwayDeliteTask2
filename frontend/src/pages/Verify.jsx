import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Api } from '../apiConfig';

function Verify() {
    const { email } = useParams();
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    async function verifyEmail() {
        try{
            let response = await axios.post(Api+'/user/verify/'+ email, {});
            if (response.data.message == 'success') {
                setIsVerified(true);
                navigate('/signIn');
            } else {
                if (response.data.details)
                    window.alert(response.data.details);
            }
        } catch(err) {
            window.alert("Backend Error");
            console.log(err);
        }
    }

    async function resendLink() {
        try{
            let response = await axios.get(Api+'/user/resend/'+ email, {});
            if (response.data.message == 'success') {
                window.alert("Verification Link Sent to your Email");
            } else {
                if (response.data.details)
                 window.alert(response.data.details);
            }
        } catch(err) {
            window.alert("Backend Error");
            console.log(err);
        }
    }


    useEffect(()=>{
        verifyEmail();
    }, [])

    return (
        <div>
            {(isVerified == true)? <div style= {{color: 'green', textAlign: 'center'}}>
                <br />
                <p>Email Verified Successfully!!!</p>
            </div>:
            <div style = {{color: 'red', textAlign: 'center'}}>
                <br />
                <p>Email Verification Pending!!!</p>    
                <button className ="btn btn-primary" onClick={resendLink}>Resend Link</button>
            </div>}
        </div>
    )
}

export default Verify;