import { useEffect, useState } from "react";
import { BsStar } from "react-icons/bs"
// import { BiSortAlt2 } from "react-icons/bi"
import Task from "../components/Task";
// import AddStarredTask from "../components/AddTask";
import InfiniteScroll from "react-infinite-scroll-component";
import { HiOutlineSparkles } from "react-icons/hi";
import { useAuthContext } from "../hooks/useAuthContext";

const Finished = ({ tasks, setTasks, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
    const [finishedTasks, setFinishedTasks] = useState([])
    const rootUrl = process.env.REACT_APP_API_BASE_URL;
    const { user } = useAuthContext()

    const fetchFinishedTasks = async () => {
        const response = await fetch(`${rootUrl}/api/tasks/finished`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            setFinishedTasks(json);
        }
    }

    const handleDeleteAllFinished = async () => {
        if (!user) {
            return
        }

        const response = await fetch(`${rootUrl}/api/tasks`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        // if (!response.ok) {
        //     setError(json.error)
        // }

        if (response.ok) {
            console.log('deleted all the tasks', json)
        }
    }

    useEffect(() => {
        if (user) {
            fetchFinishedTasks()
        }
    }, [fetchFinishedTasks, user])

    return (
        <InfiniteScroll
            dataLength={tasks}
            next={fetchFinishedTasks}
            hasMore={true}
        >
            <div className="tasks-container">
                <div className="title">
                    <div className="iconandtext">
                        <HiOutlineSparkles className="title-icon1" />
                        <h4 className="title-heading">Finished</h4>
                    </div>
                    <button className="all-delete-button" onClick={() => handleDeleteAllFinished()}>
                        <p>delete all</p>
                    </button>
                    {/* <div className="iconandtext">
                        <BiSortAlt2 className="title-icon2" />
                        <h4 className="sort-title">Sort</h4>
                    </div> */}
                    <div className="count"></div>
                </div>
                {/* <AddStarredTask fetchTasks={fetchTasks} /> */}
                {finishedTasks && finishedTasks.map((task) => {
                    return <Task task={task} key={task._id} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />
                })}
            </div>
        </InfiniteScroll >
    );
}

export default Finished;