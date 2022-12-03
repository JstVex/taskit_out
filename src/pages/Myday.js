import { useEffect, useState } from "react";
import { BsSun } from "react-icons/bs"
// import { BiSortAlt2 } from "react-icons/bi"
import Task from "../components/Task";
import AddMydayTask from "../components/AddMydayTask";
import InfiniteScroll from "react-infinite-scroll-component";
import date from 'date-and-time';
import { useAuthContext } from "../hooks/useAuthContext";
import { MdOutlineCloseFullscreen } from "react-icons/md"

const Myday = ({ tasks, handleShow, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
    const todayDate = new Date();
    const [mydayTasks, setMydayTasks] = useState([])

    let formattedDate = date.format(todayDate, 'ddd MMM DD YYYY');
    const rootUrl = process.env.REACT_APP_API_BASE_URL;
    const { user } = useAuthContext();

    const fetchMydayTasks = async () => {
        const response = await fetch(`${rootUrl}/api/tasks/myday`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            setMydayTasks(json);
        }
    }

    useEffect(() => {
        if (user) {
            fetchMydayTasks()
        }
    }, [fetchMydayTasks, user])
    return (
        <InfiniteScroll
            dataLength={tasks}
            next={fetchMydayTasks}
            hasMore={true}
        >
            <div className="tasks-container">
                <div className="title">
                    <div className="iconandtext">
                        <MdOutlineCloseFullscreen className="navbar-toggle-icon" onClick={handleShow} />
                        <BsSun className="title-icon1" />
                        <h4 className="title-heading">my day</h4>
                        <h4 className="date-date">{formattedDate}</h4>
                    </div>
                    {/* <div className="iconandtext">
                        <BiSortAlt2 className="title-icon2" />
                        <h4 className="sort-title">Sort</h4>
                    </div> */}
                </div>
                <AddMydayTask />
                {mydayTasks && mydayTasks.map((task) => {
                    return <Task task={task} key={task._id} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Myday;