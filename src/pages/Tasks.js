import { useEffect, useState } from "react";
import { GiHollowCat } from "react-icons/gi"
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import SearchTask from "../components/SearchTask"
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdOutlineCloseFullscreen } from "react-icons/md"


const Tasks = ({ tasks, setTasks, show, handleShow, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete, search, setSearch }) => {
    const rootUrl = process.env.REACT_APP_API_BASE_URL;

    const [count, setCount] = useState(0)

    const { user } = useAuthContext();

    const fetchTasks = async () => {
        const response = await fetch(`${rootUrl}/api/tasks`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            setTasks(json);
        }
    }

    const fetchCountTasks = async () => {
        const response = await fetch(`${rootUrl}/api/tasks/counttasks`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            setCount(json);
        }
    }

    useEffect(() => {
        if (user) {
            fetchTasks();
            fetchCountTasks()
        }
    }, [fetchTasks, fetchCountTasks, user])

    return (
        <InfiniteScroll
            dataLength={tasks}
            next={fetchTasks}
            hasMore={true}
        >
            <div className="tasks-container">
                <div className="title">
                    <div className="iconandtext">
                        <MdOutlineCloseFullscreen className="navbar-toggle-icon" onClick={handleShow} />
                        <GiHollowCat className="title-icon1" />
                        <h4 className="title-heading">tasks</h4>
                    </div>
                    <SearchTask search={search} setSearch={setSearch} />

                    <div className="count">
                        <p>tasks count: {count}</p>
                    </div>
                </div>

                <AddTask />

                {tasks && tasks.map((task) => {
                    return <Task task={task} key={task._id}
                        show={show} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Tasks;