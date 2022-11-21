import { useEffect } from "react";
import { CgCalendarDue } from 'react-icons/cg'
import { BiSortAlt2 } from "react-icons/bi"
import InfiniteScroll from "react-infinite-scroll-component";
import DuedTask from "../components/DuedTask";
import { Link } from "react-router-dom";

const Dued = ({ tasks, setTasks, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {


    const fetchPlannedTasks = async () => {
        const rootUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${rootUrl}/api/tasks/planned`);
        const json = await response.json();

        if (response.ok) {
            setTasks(json);
        }
    }
    useEffect(() => {
        fetchPlannedTasks()
    }, [fetchPlannedTasks])
    return (
        <InfiniteScroll
            dataLength={tasks}
            next={fetchPlannedTasks}
            hasMore={true}
        >
            <div className="tasks-container">
                <div className="title">
                    <div className="iconandtext">
                        <CgCalendarDue className="title-icon1" />
                        <h4 className="title-heading">dued</h4>
                    </div>
                    <Link to="/tasks/upcoming" className="link">
                        <div className="link-task-container">
                            <h4 className="link-for-planned">up coming</h4>
                        </div>
                    </Link>
                    <div className="iconandtext">
                        <BiSortAlt2 className="title-icon2" />
                        <h4 className="sort-title">Sort</h4>
                    </div>
                </div>
                {tasks && tasks.map((task) => {
                    return <DuedTask task={task} key={task._id} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Dued;