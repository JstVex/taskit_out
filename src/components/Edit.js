import { BsSun, BsTrash } from "react-icons/bs"
import { SlCalender } from "react-icons/sl";
import { forwardRef, useState, useRef, useImperativeHandle } from "react";
import DatePicker from "react-datepicker";
// import date from 'date-and-time';
import { useAuthContext } from "../hooks/useAuthContext";

// import "react-datepicker/dist/react-datepicker.css";

const Edit = forwardRef(({ task, show, handleDelete, handleShow }, noteRef) => {
    const [startDate, setStartDate] = useState(new Date());
    const [note, setNote] = useState(task.note);
    const [error, setError] = useState(null);
    const [updateTask, setUpdateTask] = useState(task.task);

    const { user } = useAuthContext();
    const noteChildRef = useRef();

    useImperativeHandle(noteRef, () => ({
        focusNote() {
            noteChildRef.current.focus();
        }
    }))


    // const todayDate = new Date();

    // const [mydayText, setMydayText] = useState('');
    const rootUrl = process.env.REACT_APP_API_BASE_URL;
    const handleNoteChange = async (e, id) => {
        // e.preventDefault();

        const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ note: note }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
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
        <div className="edit-container" style={show ? null : { width: '80vw' }}>
            <div className="myday-button box1" onClick={task.extra ? (e) => removeMyday(e, task._id) : (e) => handleMydaySubmit(e, task._id)}>
                <BsSun className="sun-icon" />
                {task.extra ? <p className="edit-text">remove from my day</p> : <p className="edit-text">add to my day ^^</p>}

            </div>
            <div className="duedate-button box2">
                <SlCalender className="calender-icon" />
                {task.planned ? <p className="edit-text" onClick={(e) => removeDate(e, task._id)}>remove due date</p> : <p className="edit-text" onClick={(e) => addDate(e, task._id)}>add due date ^^</p>}
                <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>

            <div className="note-space box3" >
                <div className="noteform" onChange={(e) => handleNoteChange(e, task._id)}>
                    <label htmlFor="addNote">Add note</label>
                    <textarea
                        ref={noteChildRef}
                        className="textarea"
                        id="addNote"
                        type="text"
                        placeholder="note note here ^^"
                        autoCorrect="off"
                        spellCheck="false"
                        required
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
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
                <button className="done-btn" onClick={handleShow}>done</button>
                <BsTrash className="trash" onClick={() => handleDelete(task._id)} />
            </div>

        </div>
    );
})

export default Edit;