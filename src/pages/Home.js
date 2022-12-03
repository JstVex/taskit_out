import { MdOutlineCloseFullscreen } from "react-icons/md"

const Home = ({ handleShow }) => {
    return (
        <div className="home-container">
            <MdOutlineCloseFullscreen className="navbar-toggle-icon3" onClick={handleShow} />
            <h2 className="home-title">hiihiiii ^^</h2>
            <h4 className="home-subtitle">welcome to the task it out app \&#40;&#62; &#60;&#41;/</h4>
            <h5 className="home-text">hope u become more productive with this UwU</h5>
            <h5 className="home-footer">~ created with love for eapm lyy by hhll ~</h5>
        </div>
    );
}

export default Home;