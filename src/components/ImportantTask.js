// import { useState } from "react";
// import { BsStar, BsStarFill, BsSun } from "react-icons/bs";
// import { GrEdit } from "react-icons/gr";
// import Edit from "./Edit";
// import { CiStickyNote } from "react-icons/ci"
// import { SlCalender } from "react-icons/sl";


// const ImportantTask = ({ task, handleCheckTrue, handleCheckFalse, handleStarredTrue, handleStarredFalse, handleDelete }) => {
//     const [toggle, setToggle] = useState(false)
//     const handleShow = () => {
//         setToggle(!toggle)
//     }
//     return (
//         <div className="taskdetails-container">
//             <div className="task-layers">
//                 <div className="task-details">
//                     <input
//                         type="checkbox"
//                         onChange={task.checked ? () => handleCheckFalse(task._id) : () => handleCheckTrue(task._id)}
//                         checked={task.checked}
//                     />
//                     <label
//                         style={(task.checked) ? { textDecoration: 'line-through' } : null}
//                         className="text"
//                     >
//                         {task.task}
//                     </label>
//                     <BsStar className="star-icon" onClick={() => handleStarredTrue(task._id)} style={(task.starred) ? { display: 'none' } : null} />
//                     <BsStarFill className="star-icon2" onClick={() => handleStarredFalse(task._id)} style={(!task.starred) ? { display: 'none' } : null} />
//                     <GrEdit className="edit-icon" onClick={handleShow} />

//                     <span className="added-icons">
//                         {task.extra && <BsSun className="note-icon" />}
//                         {task.note && <CiStickyNote className="note-icon" />}
//                         {task.planned && <SlCalender className="note-icon" />}
//                         {task.planned && <span className="planned-date">{task.planned}</span>}
//                     </span>
//                 </div>

//             </div>
//             <div className="fortoggle" style={toggle ? { display: 'block' } : null}>
//                 <Edit task={task} handleDelete={handleDelete} />
//             </div>
//         </div>
//     );
// }

// export default ImportantTask;