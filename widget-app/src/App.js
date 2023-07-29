import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/signup/signUp";
import Home from "./components/home/home";
import { AuthProvider } from "./hooks/useAuth";
import "./App.css";
import RandomDog from "./components/random-dog/random-dog";
import Trivia from "./components/trivia/trivia";
import Weather from "./components/weather/weather";
import Users from "./components/users/users";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/random-dog" element={<RandomDog />} />
                    <Route path="/trivia" element={<Trivia />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
