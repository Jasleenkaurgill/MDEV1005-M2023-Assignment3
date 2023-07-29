import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../header/header";

const Trivia = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [trivia, setTrivia] = useState(null);

    useEffect(() => {
        // Fetch random trivia from the API
        fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
            .then((response) => response.json())
            .then((data) => setTrivia(data.text))
            .catch((error) => console.error(error));
    }, []);

    if (!user) {
        navigate("/login");
    }

    return (
        <>
            <Header />
            <div className="trivia-container">
                {trivia ? <p className="trivia-text">{trivia}</p> : <p>Loading trivia...</p>}
            </div>
        </>
    );
};

export default Trivia;
