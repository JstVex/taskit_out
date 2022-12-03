import { GiRose } from "react-icons/gi";
import { BsMoon, BsSunFill } from "react-icons/bs";
// import SearchTask from "./SearchTask"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbartop = ({ show, handleShow }) => {
    const [quote, setQuote] = useState('');

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout()
    }

    const handleLogoutAndShow = () => {
        handleClick()
        // handleShow()
    }



    const fetchQuote = async () => {
        const response = await fetch("https://api.goprogram.ai/inspiration");
        const json = await response.json();

        if (response.ok) {
            setQuote(json.quote);
            console.log(json.quote)
        }
    }
    useEffect(() => {
        fetchQuote();
    }, [])

    return (
        <div className="topnavbar-container">
            <div className="logo">
                <GiRose className="topicon" />
                <h4 className="app-name">task it out</h4>
            </div>
            {/* <div className="search">
                
            </div> */}
            {/* <SearchTask search={search} setSearch={setSearch} /> */}
            <div className="quote">
                <p>" {quote} "</p>
            </div>
            <div className="settings">
                {/* <BsSunFill className="topicon2" /> */}
                {user && (
                    <div>
                        <button onClick={handleLogoutAndShow} className="logout-btn">log out</button>
                    </div>
                )}
                {!user && (
                    <div className="div">
                        <Link to="/login" className="link login-link">login</Link>
                        <Link to="/signup" className="link signup-link">signup</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbartop;