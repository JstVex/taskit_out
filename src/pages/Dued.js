import { useEffect, useState } from "react";
import { CgCalendarDue } from 'react-icons/cg';
import InfiniteScroll from "react-infinite-scroll-component";
import DuedTask from "../components/DuedTask";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdOutlineCloseFullscreen } from "react-icons/md"

const Dued = ({ tasks, handleShow, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
    const rootUrl = process.env.REACT_APP_API_BASE_URL;
    const { user } = useAuthContext();

    const [duedTasks, setDuedTasks] = useState([])

    const fetchPlannedTasks = async () => {
        const response = await fetch(`${rootUrl}/api/tasks/planned`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            setDuedTasks(json);
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
                        <CgCalendarDue className="title-icon1" />
                        <h4 className="title-heading">dued</h4>
                    </div>
                    <Link to="/tasks/upcoming" className="link">
                        <div className="link-task-container">
                            <h4 className="link-for-planned">up coming</h4>
                        </div>
                    </Link>
                </div>
                {duedTasks && duedTasks.map((task) => {
                    return <DuedTask task={task} key={task._id} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Dued;