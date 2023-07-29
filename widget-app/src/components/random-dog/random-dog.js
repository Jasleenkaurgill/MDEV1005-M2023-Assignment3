import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../header/header";

const RandomDog = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [dogUrl, setDogUrl] = useState("");

    useEffect(() => {
        // Fetch random dog image URL from the API
        fetch("https://random.dog/woof.json")
            .then((response) => response.json())
            .then((data) => setDogUrl(data.url))
            .catch((error) => console.error(error));
    }, []);

    if (!user) {
        navigate("/login");
    }

    return (
        <>
            <Header />
            <div className="random-dog-container">{dogUrl && <img src={dogUrl} alt="Random Dog" />}</div>
        </>
    );
};

export default RandomDog;
