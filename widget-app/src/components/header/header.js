import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const logoutHandler = () => {
        logout();
        navigate("/login");
    };
    return (
        <>
            <header className="header-container">
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">
                                Users Information
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/weather">
                                Weather
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/trivia">
                                Trivia
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/random-dog">
                                Random Dog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={logoutHandler}>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            {children}
        </>
    );
};

export default Header;
