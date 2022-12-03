import { useState, useRef } from "react";
import { BsStar, BsStarFill, BsSun } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import Edit from "./Edit";
import { CiStickyNote } from "react-icons/ci"
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const Task = ({ task, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
    const [toggle, setToggle] = useState(false);
    const handleShow = () => {
        setToggle(!toggle)
    }

    const noteRef = useRef();
    // const focusNote = () => {
    //     noteRef.current.focus();
    // }

    const combineFunc = () => {
        handleShow();
        noteRef.current.focusNote();
    }


    return (
        <div className="taskdetails-container">
            <div className="task-layers">
                <div className="task-details">
                    <input
                        type="checkbox"
                        onChange={task.checked ? () => handleCheckFalse(task._id) : () => handleCheckTrue(task._id)}
                        checked={task.checked}
                    />
                    <label
                        style={(task.checked) ? { textDecoration: 'line-through' } : null}
                        className="text"
                    >
                        {task.task}
                    </label>
                    <BsStar className="star-icon" onClick={() => handleStarredTrue(task._id)} style={(task.starred) ? { display: 'none' } : null} />
                    <BsStarFill className="star-icon2" onClick={() => handleStarredFalse(task._id)} style={(!task.starred) ? { display: 'none' } : null} />
                    <GrEdit className="edit-icon" onClick={combineFunc} />

                    <span className="added-icons">
                        {task.extra && <Link to="/tasks/myday" className="link"><BsSun className="note-icon" /></Link>}
                        {task.note && <CiStickyNote className="note-icon" onClick={handleShow} />}
                        {task.planned && <Link to="/tasks/planned" className="link"><SlCalender className="note-icon" /></Link>}
                        {task.planned && <span className="planned-date">{task.planned}</span>}
                    </span>
                </div>

            </div>
            <div className="fortoggle" style={toggle ? { display: 'block', animationName: 'appear', animationDelay: '2s' } : null}>
                <Edit task={task} handleDelete={handleDelete} noteRef={noteRef} handleShow={handleShow} />
            </div>
        </div>
    );
}

export default Task;