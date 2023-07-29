import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "./index";

// Function to create a new user with email and password
export const signUpWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

// Function to store additional user information in Firestore
export const storeUserData = async (userId, userData) => {
    try {
        const usersRef = doc(db, "users", userId);
        await setDoc(usersRef, userData);
    } catch (error) {
        throw error;
    }
};

// Function to handle login
export const handleLogin = async (email, password, navigate) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
    } catch (error) {
        throw error;
    }
};
