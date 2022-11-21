import { useEffect } from "react";
import { BsHouseDoor } from "react-icons/bs"
import { BiSortAlt2 } from "react-icons/bi"
import { GiHollowCat } from "react-icons/gi"
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import SearchTask from "../components/SearchTask"
import InfiniteScroll from "react-infinite-scroll-component";


const Tasks = ({ tasks, setTasks, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete, search, setSearch }) => {
    const rootUrl = process.env.REACT_APP_API_BASE_URL;
    const fetchTasks = async () => {
        const response = await fetch(`${rootUrl}/api/tasks`);
        const json = await response.json();

        if (response.ok) {
            setTasks(json);
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    return (
        <InfiniteScroll
            dataLength={tasks}
            next={fetchTasks}
            hasMore={true}
        >
            <div className="tasks-container">
                <div className="title">
                    <div className="iconandtext">
                        <GiHollowCat className="title-icon1" />
                        <h4 className="title-heading">tasks</h4>
                    </div>
                    <SearchTask search={search} setSearch={setSearch} />
                    <div className="iconandtext">
                        <BiSortAlt2 className="title-icon2" />
                        <h4 className="sort-title">Sort</h4>
                    </div>
                </div>
                <AddTask />
                {tasks && tasks.map((task) => {
                    return <Task task={task} key={task._id} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Tasks;