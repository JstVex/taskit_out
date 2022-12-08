import { useEffect, useState } from "react";
import { MdOutlineNextWeek } from 'react-icons/md';
import InfiniteScroll from "react-infinite-scroll-component";
// import date from 'date-and-time'
import DuedTask from "../components/DuedTask";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdOutlineCloseFullscreen } from "react-icons/md"

const Upcoming = ({ tasks, handleShow, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
    // const todayDate = new Date();
    // let formattedDate = date.format(todayDate, 'ddd MMM DD YYYY');
    const rootUrl = process.env.REACT_APP_API_BASE_URL;
    const { user } = useAuthContext();

    const [upcomimngTasks, setUpcomingTasks] = useState([])

    const fetchPlannedTasks = async () => {
        const response = await fetch(`${rootUrl}/api/tasks/planned`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            setUpcomingTasks(json);
        }
    }

    useEffect(() => {
        if (user) {
            fetchPlannedTasks()
        }
    }, [fetchPlannedTasks, user])

    return (
        <InfiniteScroll
            dataLength={tasks}
            next={fetchPlannedTasks}
            hasMore={true}
        >
            <div className="tasks-container">
                <div className="title">
                    <div className="iconandtext">
                        <MdOutlineCloseFullscreen className="navbar-toggle-icon" onClick={handleShow} />
                        <MdOutlineNextWeek className="title-icon1" />
                        <h4 className="title-heading">up coming</h4>
                    </div>
                    <Link to="/tasks/dued" className="link">
                        <div className="link-task-container">
                            <h4 className="link-for-planned">dued</h4>
                        </div>
                    </Link>
                </div>
                {tasks && tasks.map((task) => {
                    return <DuedTask task={task} key={task._id} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Upcoming;