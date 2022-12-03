import { NavLink } from "react-router-dom";
import { BsSun, BsStar, BsHouseDoor } from "react-icons/bs"
import { SlCalender } from "react-icons/sl";
import { HiOutlineSparkles } from "react-icons/hi"
import Calendar from 'react-calendar';
import { GiHollowCat } from "react-icons/gi";
import { MdOutlineCloseFullscreen } from "react-icons/md"
import { useState } from "react";
// import 'react-calendar/dist/Calendar.css';

const Navbar = ({ show, handleShow }) => {
    let activeStyle = {
        backgroundColor: "rgba(255, 182, 205, 0.5)",
        borderLeft: "3px solid #be2e6a",
        fontWeight: "bold"
    };

    return (
        <header >
            <div className="navbar-container" style={show ? { display: 'block' } : { display: 'none' }}>
                <MdOutlineCloseFullscreen className="navbar-toggle-icon2" onClick={handleShow} />
                <div className="links">
                    <NavLink to="/tasks/inbox" className="link" style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        <div className="linkcontainer">
                            <GiHollowCat className="icon" />
                            <h4 className="linkss">tasks</h4>
                        </div>

                    </NavLink>
                    <NavLink to="/tasks/myday" className="link" style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        <div className="linkcontainer">
                            <BsSun className="icon" />
                            <h4 className="linkss">my day</h4>
                        </div>
                    </NavLink>
                    <NavLink to="/tasks/important" className="link" style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        <div className="linkcontainer">
                            <BsStar className="icon" />
                            <h4 className="linkss">important</h4>
                        </div>
                    </NavLink>
                    <NavLink to="/tasks/planned" className="link" style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        <div className="linkcontainer">
                            <SlCalender className="icon" />
                            <h4 className="linkss">planned</h4>
                        </div>

                    </NavLink>
                    <NavLink to="/tasks/finished" className="link" style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        <div className="linkcontainer">
                            <HiOutlineSparkles className="icon" />
                            <h4 className="linkss">finished</h4>
                        </div>

                    </NavLink>
                </div>
                <Calendar />
            </div>
        </header>
    );
}

export default Navbar;