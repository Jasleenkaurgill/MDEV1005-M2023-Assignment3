import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../header/header";
import { db } from "../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Calculator from "../calculator/calculator";
import Checklist from "../../checklist/checklist";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [trivia, setTrivia] = useState(null);
    const [dogImageUrl, setDogImageUrl] = useState(null);

    useEffect(() => {
        // Function to fetch user data from Firestore
        const fetchUserData = async () => {
            try {
                if (user) {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        setUserData(userDocSnapshot.data());
                    } else {
                        console.log("User document not found");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        // Function to fetch all users data from Firestore
        const fetchAllUsers = async () => {
            try {
                const usersCollectionRef = collection(db, "users");
                const usersSnapshot = await getDocs(usersCollectionRef);
                const usersData = usersSnapshot.docs.map((doc) => doc.data());
                setAllUsers(usersData);
            } catch (error) {
                console.error("Error fetching all users data:", error);
            }
        };

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    "https://api.open-meteo.com/v1/forecast?latitude=44.4001&longitude=-79.6663&hourly=temperature_2m"
                );
                const data = await response.json();
                setWeatherData(data.hourly);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        const fetchRandomTrivia = async () => {
            try {
                const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
                const data = await response.json();
                setTrivia(data);
            } catch (error) {
                console.error("Error fetching random trivia:", error);
            }
        };

        const fetchRandomDogImage = async () => {
            try {
                const response = await fetch("https://random.dog/woof.json");
                const data = await response.json();
                setDogImageUrl(data.url);
            } catch (error) {
                console.error("Error fetching random dog image:", error);
            }
        };

        fetchUserData();
        fetchAllUsers();
        fetchWeatherData();
        fetchRandomTrivia();
        fetchRandomDogImage();
    }, [user]);

    if (!user) {
        navigate("/login");
    }

    return (
        <>
            <Header />
            <div className="cards-container">
                <div className="card">
                    <div className="card-title">User Information</div>
                    {userData && (
                        <div className="card-content">
                            <p>Name: {userData.name}</p>
                            <p>Phone Number: {userData.phoneNumber}</p>
                            <p>DOB: {userData.dob}</p>
                            <p>Email: {userData.email}</p>
                            <p>Username: {userData.username}</p>
                        </div>
                    )}
                </div>
                <div className="card card-wide">
                    <div className="card-title">List of All Users</div>
                    <div className="card-content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>DOB</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    {/* Add other table headers as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((userData) => (
                                    <tr key={userData.id}>
                                        <td>{userData.name}</td>
                                        <td>{userData.phoneNumber}</td>
                                        <td>{userData.dob}</td>
                                        <td>{userData.email}</td>
                                        <td>{userData.username}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {weatherData && (
                    <div className="card">
                        <div className="card-title">Weather</div>
                        <div className="card-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Temperature (&deg;C)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weatherData.time.map((time, index) => (
                                        <tr key={index}>
                                            <td>{time}</td>
                                            <td>{weatherData.temperature_2m[index]} &deg;C</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {trivia && (
                    <div className="card">
                        <div className="card-title">Random Trivia</div>
                        <div className="card-content">
                            <p>{trivia.text}</p>
                            <p>Source: {trivia.source}</p>
                        </div>
                    </div>
                )}
                {dogImageUrl && (
                    <div className="card">
                        <div className="card-title">Random Dog Image</div>
                        <div className="card-content">
                            <img src={dogImageUrl} alt="Random Dog" />
                        </div>
                    </div>
                )}
                <div className="card">
                    <div className="card-title">Calculator</div>
                    <Calculator />
                </div>
                <div className="card">
                    <div className="card-title">Checklist</div>
                    <Checklist />
                </div>
            </div>
        </>
    );
};

export default Home;
