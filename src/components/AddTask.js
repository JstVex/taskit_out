import { useState } from 'react';
import { FaPlus } from 'react-icons/fa'
import { useAuthContext } from "../hooks/useAuthContext";

const AddTask = () => {
    const [task, setTask] = useState('');
    const [checked, setChecked] = useState(false);
    const [starred, setStarred] = useState(false);
    const [extra, setExtra] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState(null);
    const rootUrl = process.env.REACT_APP_API_BASE_URL;

    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('you must be logged in:(')
            return
        }

        const tasky = { task, checked, starred, note, extra }

        const response = await fetch(`${rootUrl}/api/tasks`, {
            method: 'POST',
            body: JSON.stringify(tasky),
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
            setTask('')
            console.log('new task added', json)
        }
    }
    return (
        <div className="addform-container">
            <form className="addForm" onSubmit={handleSubmit}>
                <button
                    type="submit"
                    aria-label="add a task"
                    className='addbutton'>
                    <FaPlus className='plus' />
                </button>
                <label htmlFor="addTask">Add task</label>
                <input
                    spellCheck="false"
                    autoFocus
                    id="addTask"
                    type="text"
                    placeholder="Add a task"
                    required
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default AddTask;