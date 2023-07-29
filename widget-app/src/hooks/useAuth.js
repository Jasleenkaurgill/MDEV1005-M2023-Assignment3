// useAuth.js

import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// Create a context for the authentication
const AuthContext = createContext();

// Hook to provide authentication context and functions
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    // Function to check if the user is logged in
    const isLoggedIn = () => !!user;

    // Function to handle logout
    const logout = async () => {
        try {
            await auth.signOut();
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const authContextValue = { user, isLoggedIn, logout }; // Create an object with the context values

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

// Custom hook to consume the authentication context
export function useAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
}
