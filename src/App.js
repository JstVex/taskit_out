import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Myday from './pages/Myday';
import Planned from './pages/Planned';
import Important from './pages/Important';
import Finished from './pages/Finished';
import Tasks from './pages/Tasks';
import Navbartop from './components/Navbartop';
import Home from './pages/Home';
import Dued from './pages/Dued';
import Upcoming from './pages/Upcoming';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const rootUrl = process.env.REACT_APP_API_BASE_URL;
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [isStarred, setIsStarred] = useState(false);
  const [error, setError] = useState(null)

  // const setAndSaveTasks = (newTasks) => {
  //   setTasks(newTasks);
  //   localStorage.setItem('todolist', JSON.stringify(newTasks));
  // }

  // const addingTask = (task) => {
  //   const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  //   const newTask = { id, checked: false, task };
  //   const listTasks = [...tasks, newTask]
  //   // setAndSaveTasks(listTasks);
  //   setTasks(listTasks);
  // }

  const handleCheckTrue = async (id) => {
    const listTasks = tasks.map((task) => task._id === id ? { ...task, checked: !task.checked } : task);
    // setAndSaveTasks(listTasks)

    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ checked: true }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTasks(listTasks);
      setError(null);
      console.log('edited the task', json)
    }
  }

  const handleCheckFalse = async (id) => {
    const listTasks = tasks.map((task) => task._id === id ? { ...task, checked: !task.checked } : task);
    // setAndSaveTasks(listTasks)

    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ checked: false }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTasks(listTasks);
      setError(null);
      console.log('edited the task', json)
    }
  }

  // const handleStarred = (id) => {
  //   const listTasks = tasks.map((task) => task._id === id ? { ...task, starred: !task.starred } : task);
  //   // setAndSaveTasks(listTasks)
  //   setTasks(listTasks);
  // }

  const handleStarredTrue = async (id) => {
    const listTasks = tasks.map((task) => task._id === id ? { ...task, starred: !task.starred } : task);
    // setAndSaveTasks(listTasks)

    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ starred: true }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTasks(listTasks);
      setError(null);
      console.log('edited the task', json)
    }
  }

  const handleStarredFalse = async (id) => {
    const listTasks = tasks.map((task) => task._id === id ? { ...task, starred: !task.starred } : task);
    // setAndSaveTasks(listTasks)

    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ starred: false }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTasks(listTasks);
      setError(null);
      console.log('edited the task', json)
    }
  }

  const handleDelete = async (id) => {
    const listTasks = tasks.filter((task) => task._id !== id)
    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTasks(listTasks);
      console.log('deleted the task', json)
    }
  }

  // const fetchTasks = async () => {
  //   const response = await fetch(`${rootUrl}/api/tasks`);
  //   const json = await response.json();

  //   if (response.ok) {
  //     setTasks(json);
  //   }
  // }

  // useEffect(() => {
  //   fetchTasks()
  // }, [fetchTasks])



  return (
    <div className="container">
      <BrowserRouter>
        <Navbartop />
        <div className="seperator">
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path='/'
                element={<Home />}
              >
              </Route>
              <Route
                path='/tasks/inbox'
                element={<Tasks tasks={tasks.filter(task => ((task.task).toLowerCase()).includes(search.toLowerCase()))} setTasks={setTasks} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} search={search} setSearch={setSearch} />}
              >
              </Route>
              <Route
                path='/tasks/myday'
                element={<Myday tasks={tasks} setTasks={setTasks} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />}
              >
              </Route>
              <Route
                path='/tasks/important'
                element={<Important tasks={tasks} setTasks={setTasks} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />}
              >
              </Route>
              <Route
                path='/tasks/planned'
                element={<Planned tasks={tasks} setTasks={setTasks} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />}
              >
              </Route>
              <Route
                path='/tasks/finished'
                element={<Finished tasks={tasks} setTasks={setTasks} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />}
              >
              </Route>
              <Route
                path='/tasks/dued'
                element={<Dued tasks={tasks} setTasks={setTasks} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />}
              >
              </Route>
              <Route
                path='/tasks/upcoming'
                element={<Upcoming tasks={tasks} setTasks={setTasks} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} />}
              >
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
