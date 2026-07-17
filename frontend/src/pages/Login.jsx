import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
     const [loginType, setLoginType] = useState("customer");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate();
    async function handleLogin(e) {

        e.preventDefault();

        try {
           const url =
    loginType === "admin"
        ? "http://localhost:3000/admin/login"
        : "http://localhost:3000/customer/login";

const response = await axios.post(
    url, {
                    username,
                    password
                }
            );
            localStorage.removeItem("token");
          localStorage.removeItem("customerId");
         localStorage.removeItem("role");

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", loginType);

            if (loginType === "customer") {
           localStorage.setItem("customerId", response.data.customerId);
    
             }
            alert(response.data.message);

            setUsername("");
            setPassword("");
            
            if (loginType === "admin") {
              navigate("/adminProducts");
                   }
            else {
              navigate("/");
                }
        }

        catch (error) {
            alert(error.response?.data || error.message);

        }

    }

    return (

        <>
            <h1>Login Here!</h1>
          
           <select
    value={loginType}
    onChange={(e) => setLoginType(e.target.value)}
>
    <option value="customer">Customer</option>
    <option value="admin">Admin</option>
</select>
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