import { useState } from "react";
import axios from "axios";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e) {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:3000/customer/register",
                {
                    username,
                    password
                }
            );

            alert(response.data);

            setUsername("");
            setPassword("");

        }

        catch (error) {

            alert(error.response.data);

        }

    }

    return (

        <>
        <h1>Don't have an account?</h1>
            <h1>Register Here!</h1>

            <form onSubmit={handleRegister}>

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
                    Register
                </button>

            </form>

        </>

    );

}

export default Register;