import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword, storeUserData } from "../../firebase/firebaseUtils";

const SignUp = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDOB] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            // Create the user in Firebase Authentication
            const user = await signUpWithEmailAndPassword(email, password);

            // Store additional user information in Firestore
            const userData = {
                username,
                email,
                name,
                phoneNumber,
                dob,
            };

            await storeUserData(user.uid, userData);

            navigate("/");
        } catch (error) {
            setError("Error signing up. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="auth-center-container">
            <div className="auth-container">
                <h2 className="auth-title">Sign Up</h2>
                {error && <p className="auth-message">{error}</p>}
                <form className="auth-form" onSubmit={handleSignUp}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input
                            type="number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>DOB:</label>
                        <input type="date" min value={dob} onChange={(e) => setDOB(e.target.value)} required />
                    </div>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
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
                    <button type="submit" className="auth-button">
                        Sign Up
                    </button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
