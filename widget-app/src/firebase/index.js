import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAg_ZZUFGlMGGLeX8i4fuiywR1SFVmtTt0",
    authDomain: "testproject-89cfb.firebaseapp.com",
    projectId: "testproject-89cfb",
    storageBucket: "testproject-89cfb.appspot.com",
    messagingSenderId: "856191554304",
    appId: "1:856191554304:web:f65c44846ee0e1c21b19e5",
    measurementId: "G-BGK0MEM19Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
