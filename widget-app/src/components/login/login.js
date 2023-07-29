import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../../firebase/firebaseUtils";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleLogin(email, password, navigate);
        } catch (error) {
            setError("Invalid email or password");
            console.error(error);
        }
    };

    return (
        <div className="auth-center-container">
            <div className="auth-container">
                <h2 className="auth-title">Login</h2>
                {error && <p className="auth-message">{error}</p>}
                <form className="auth-form" onSubmit={handleLoginSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="auth-button" type="submit">
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link className="auth-link" to="/signup">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
