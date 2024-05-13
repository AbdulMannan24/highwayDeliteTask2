import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="container-fluid d-flex align-items-center justify-content-between" style= {{color: 'white'}}>
            <h2>NotesDelite</h2>
            <div >
                <button style= {{color: 'white'}} onClick = {()=> navigate('/home')} className="btn">Home</button>
                <button style= {{color: 'white'}} onClick = {()=> {
                    localStorage.setItem('token', "");
                    navigate('/signin')}}
                    className="btn">Log Out</button>
            </div>
        </div>
    )
}

export default Navbar;