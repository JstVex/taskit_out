import { BsSun, BsTrash } from "react-icons/bs"
import { SlCalender } from "react-icons/sl";
import { useState } from "react";
import DatePicker from "react-datepicker";
import date from 'date-and-time'

// import "react-datepicker/dist/react-datepicker.css";

const Edit = ({ task, handleDelete }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [note, setNote] = useState(task.note);
    const [error, setError] = useState(null);
    const [updateTask, setUpdateTask] = useState(task.task)

    // const todayDate = new Date();

    // const [mydayText, setMydayText] = useState('');
    const rootUrl = process.env.REACT_APP_API_BASE_URL;
    const handleNoteSubmit = async (e, id) => {
        e.preventDefault();

        const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ note: note }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            console.log('updated task', json)
        }
    }

    const handleMydaySubmit = async (e, id) => {
        e.preventDefault();

        const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ extra: "my day" }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            console.log('updated task', json)
        }
    }

    const removeMyday = async (e, id) => {
        e.preventDefault();

        const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ extra: "" }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            console.log('removed my day', json)
        }
    }

    const updateTaskSubmit = async (e, id) => {
        e.preventDefault();

        const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ task: updateTask }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            console.log('updated the task', json)
        }
    }

    const addDate = async (e, id) => {
        e.preventDefault();
        const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ planned: startDate.toDateString() }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            console.log('added date', json)
        }
    }

    const removeDate = async (e, id) => {
        e.preventDefault();

        const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ planned: "" }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            console.log('removed date', json)
        }
    }


    return (
        <div className="edit-container">
            <div className="myday-button box1" onClick={task.extra ? (e) => removeMyday(e, task._id) : (e) => handleMydaySubmit(e, task._id)}>
                <BsSun />
                {task.extra ? <p className="edit-text">remove from my day</p> : <p className="edit-text">add to my day ^^</p>}

            </div>
            <div className="duedate-button box2">
                {/* onClick={task.planned ? (e) => removeDate(e, task._id) : (e) => addDate(e, task._id)} */}
                <SlCalender />
                {task.planned ? <p className="edit-text" onClick={(e) => removeDate(e, task._id)}>remove due date</p> : <p className="edit-text" onClick={(e) => addDate(e, task._id)}>add due date ^^</p>}
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="note-space box3">
                <form className="noteform" onSubmit={(e) => handleNoteSubmit(e, task._id)}>
                    <label htmlFor="addNote">Add note</label>
                    <input
                        autoFocus
                        id="addNote"
                        type="text"
                        placeholder="note note here ^^"
                        required
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </form>
            </div>
            <div className="task-space box4">
                <form className="taskform" onSubmit={(e) => updateTaskSubmit(e, task._id)}>
                    <label htmlFor="addWord">update task</label>
                    <input
                        autoFocus
                        id="addWord"
                        type="text"
                        required
                        value={updateTask}
                        onChange={(e) => setUpdateTask(e.target.value)}
                    />
                </form>

            </div>
            <div className="box5">
                <BsTrash className="trash" onClick={() => handleDelete(task._id)} />
            </div>

        </div>
    );
}

export default Edit;