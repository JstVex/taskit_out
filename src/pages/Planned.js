import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
// import { BiSortAlt2 } from "react-icons/bi"
import InfiniteScroll from "react-infinite-scroll-component";
import date from 'date-and-time'
import Task from "../components/Task";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdOutlineCloseFullscreen } from "react-icons/md"

const Planned = ({ tasks, show, handleShow, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
    const [plannedTasks, setPlannedTasks] = useState([])
    const todayDate = new Date();
    let formattedDate = date.format(todayDate, 'ddd MMM DD YYYY');
    const rootUrl = process.env.REACT_APP_API_BASE_URL;
    const { user } = useAuthContext();


    const fetchPlannedTasks = async () => {
        const response = await fetch(`${rootUrl}/api/tasks/planned`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            setPlannedTasks(json);
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
                        <SlCalender className="title-icon1" />
                        <h4 className="title-heading">planned</h4>
                    </div>
                    {/* <Link to="/tasks/dued" className="link">
                        <div className="link-task-container">
                            <h4 className="link-for-planned">dued</h4>
                        </div>

                    </Link>
                    <Link to="/tasks/upcoming" className="link">
                        <div className="link-task-container">
                            <h4 className="link-for-planned">up coming</h4>
                        </div>
                    </Link> */}
                    {/* <div className="iconandtext">
                        <BiSortAlt2 className="title-icon2" />
                        <h4 className="sort-title">Sort</h4>
                    </div> */}
                </div>
                {plannedTasks && plannedTasks.map((task) => {
                    return <Task task={task} key={task._id} show={show} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Planned;