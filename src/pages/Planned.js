import { useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { BiSortAlt2 } from "react-icons/bi"
import InfiniteScroll from "react-infinite-scroll-component";
import date from 'date-and-time'
import Task from "../components/Task";
import { Link } from "react-router-dom";

const Planned = ({ tasks, setTasks, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
    const todayDate = new Date();
    let formattedDate = date.format(todayDate, 'ddd MMM DD YYYY');


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
                        <SlCalender className="title-icon1" />
                        <h4 className="title-heading">planned</h4>
                    </div>
                    <Link to="/tasks/dued" className="link">
                        <div className="link-task-container">
                            <h4 className="link-for-planned">dued</h4>
                        </div>

                    </Link>
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
                    return <Task task={task} key={task._id} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Planned;