import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../header/header";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Users = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        // Fetch user list from the API
        const usersCollectionRef = collection(db, "users");
        getDocs(usersCollectionRef)
            .then((usersSnapshot) => {
                const usersData = usersSnapshot.docs.map((doc) => doc.data());
                setAllUsers(usersData);
            })
            .catch((error) => {
                console.error("Error fetching all users data:", error);
            });
    }, []);

    if (!user) {
        navigate("/login");
    }

    return (
        <>
            <Header />
            <div className="user-list-container">
                {allUsers.length > 0 ? (
                    <>
                        <h2 className="user-list-title">User List</h2>
                        <table className="user-table">
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
                                        <td>{userData.phone}</td>
                                        <td>{userData.dob}</td>
                                        <td>{userData.email}</td>
                                        <td>{userData.username}</td>
                                        {/* Add other table data cells as needed */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p>Loading user list...</p>
                )}
            </div>
        </>
    );
};

export default Users;
