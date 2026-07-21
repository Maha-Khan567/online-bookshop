import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
     
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate();
    async function handleLogin(e) {

        e.preventDefault();

        try {
         
const response = await axios.post(
    "http://localhost:3000/login", {
                    username,
                    password
                }
            );
            localStorage.removeItem("token");
          localStorage.removeItem("customerId");
         localStorage.removeItem("role");

            
            localStorage.setItem("token", response.data.token);
localStorage.setItem("role", response.data.role);

if (response.data.role === "customer") {
    localStorage.setItem("customerId", response.data.customerId);
} alert(response.data.message);

            

            setUsername("");
            setPassword("");
            
           
                if (response.data.role === "admin") {
    navigate("/adminProducts");
} else {
    navigate("/");
}
        }

        catch (error) {
            alert(error.response?.data || error.message);

        }

    }

    return (

        <>
          <h1>Already have an account?</h1>
            <h1 >Login Here!</h1>
          
          <form onSubmit={handleLogin}>
               
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                   Login
                </button>

            </form>

        </>

    );

}

export default Login;