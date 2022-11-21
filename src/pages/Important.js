import { useEffect } from "react";
import { BsStar } from "react-icons/bs"
import { BiSortAlt2 } from "react-icons/bi"
import Task from "../components/Task";
import AddStarredTask from "../components/AddTask";
import InfiniteScroll from "react-infinite-scroll-component";


const Important = ({ tasks, setTasks, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
    const fetchImportantTasks = async () => {
        const rootUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${rootUrl}/api/tasks/starred`);
        const json = await response.json();

        if (response.ok) {
            setTasks(json);
        }
    }

    useEffect(() => {
        fetchImportantTasks()
    }, [fetchImportantTasks])

    return (
        <InfiniteScroll
            dataLength={tasks}
            next={fetchImportantTasks}
            hasMore={true}
        >
            <div className="tasks-container">
                <div className="title">
                    <div className="iconandtext">
                        <BsStar className="title-icon1" />
                        <h4 className="title-heading">Important</h4>
                    </div>
                    <div className="iconandtext">
                        <BiSortAlt2 className="title-icon2" />
                        <h4 className="sort-title">Sort</h4>
                    </div>
                </div>
                <AddStarredTask />
                {tasks && tasks.map((task) => {
                    return <Task task={task} key={task._id} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Important;