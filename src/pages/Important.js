import { useEffect, useState } from "react";
import { BsStar } from "react-icons/bs"
// import { BiSortAlt2 } from "react-icons/bi"
import Task from "../components/Task";
import AddStarredTask from "../components/AddStarredTask";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdOutlineCloseFullscreen } from "react-icons/md"


const Important = ({ tasks, handleShow, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
    const rootUrl = process.env.REACT_APP_API_BASE_URL;
    const { user } = useAuthContext();
    const [importantTasks, setImportantTasks] = useState([])

    const fetchImportantTasks = async () => {
        const response = await fetch(`${rootUrl}/api/tasks/starred`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            setImportantTasks(json);
        }
    }

    useEffect(() => {
        if (user) {
            fetchImportantTasks()
        }
    }, [fetchImportantTasks, user])

    return (
        <InfiniteScroll
            dataLength={tasks}
            next={fetchImportantTasks}
            hasMore={true}
        >
            <div className="tasks-container">
                <div className="title">
                    <div className="iconandtext">
                        <MdOutlineCloseFullscreen className="navbar-toggle-icon" onClick={handleShow} />
                        <BsStar className="title-icon1" />
                        <h4 className="title-heading">important</h4>
                    </div>
                    {/* <div className="iconandtext">
                        <BiSortAlt2 className="title-icon2" />
                        <h4 className="sort-title">Sort</h4>
                    </div> */}
                </div>
                <AddStarredTask />
                {importantTasks && importantTasks.map((task) => {
                    return <Task task={task} key={task._id} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Important;