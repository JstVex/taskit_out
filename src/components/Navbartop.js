import { GiRose } from "react-icons/gi";
import { BsMoon, BsSunFill } from "react-icons/bs";
// import SearchTask from "./SearchTask"
import { useState, useEffect } from "react";

const Navbartop = ({ search, setSearch }) => {
    const [quote, setQuote] = useState('');
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
                <p>Productivity</p>
            </div>
            {/* <div className="search">
                
            </div> */}
            {/* <SearchTask search={search} setSearch={setSearch} /> */}
            <div className="quote">
                <p>" {quote} "</p>
            </div>
            <div className="settings">
                <BsSunFill className="topicon" />
                <p>profile</p>
            </div>
        </div>
    );
}

export default Navbartop;