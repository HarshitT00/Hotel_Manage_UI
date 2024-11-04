import axios from "axios";
import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";


const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post("/auth/register", credentials);
            setLoading(false);
            navigate("/");
        } catch (err) {
            setLoading(false);
            setError(err.response.data);
        }
    };

 
    

  return (
    <div className="register">
        <div className="rContainer">
            <input 
            type="text"
            placeholder="userNAME" 
            id= "username"
            onChange = {handleChange}
            className="rInput"
            />
             <input 
             type="password"
            placeholder="PASSword" 
            id= "password"
            onChange = {handleChange}
            className="rInput"
            />
             <input 
             type="email"
            placeholder="eMail" 
            id= "email"
            onChange = {handleChange}
            className="rInput"
            />
            <button disabled={loading} onClick={handleClick} className="rButton">
                Register
            </button>
            {error && <span>{error.message}</span> }
        </div>
    </div>
  );
};


export default Register;        