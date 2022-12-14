import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from "./hooks/useAuthContext"

function App() {
  const rootUrl = process.env.REACT_APP_API_BASE_URL;
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show)
  }

  const { user } = useAuthContext();

  const handleCheckTrue = async (id) => {
    if (!user) {
      return
    }

    const listTasks = tasks.map((task) => task._id === id ? { ...task, checked: !task.checked } : task);

    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ checked: true }),
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
      setTasks(listTasks);
      setError(null);
    }
  }

  const handleCheckFalse = async (id) => {
    if (!user) {
      return
    }

    const listTasks = tasks.map((task) => task._id === id ? { ...task, checked: !task.checked } : task);

    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ checked: false }),
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
      setTasks(listTasks);
      setError(null);
    }
  }

  const handleStarredTrue = async (id) => {
    if (!user) {
      return
    }

    const listTasks = tasks.map((task) => task._id === id ? { ...task, starred: !task.starred } : task);

    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ starred: true }),
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
      setTasks(listTasks);
      setError(null);
    }
  }

  const handleStarredFalse = async (id) => {
    if (!user) {
      return
    }

    const listTasks = tasks.map((task) => task._id === id ? { ...task, starred: !task.starred } : task);

    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ starred: false }),
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
      setTasks(listTasks);
      setError(null);
      console.log('edited the task', json)
    }
  }

  const handleDelete = async (id) => {
    if (!user) {
      return
    }

    const listTasks = tasks.filter((task) => task._id !== id)
    const response = await fetch(`${rootUrl}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTasks(listTasks);
    }
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Navbartop />
        <div className="seperator">
          <Navbar show={show} handleShow={handleShow} />
          <div className="pages">
            <Routes>
              <Route
                path='/'
                element={user ? <Home handleShow={handleShow} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/inbox'
                element={user ? <Tasks tasks={tasks.filter(task => ((task.task).toLowerCase()).includes(search.toLowerCase()))} setTasks={setTasks} show={show} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} search={search} setSearch={setSearch} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/myday'
                element={user ? <Myday tasks={tasks} setTasks={setTasks} show={show} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/important'
                element={user ? <Important tasks={tasks} setTasks={setTasks} show={show} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/planned'
                element={user ? <Planned tasks={tasks} setTasks={setTasks} show={show} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/finished'
                element={user ? <Finished tasks={tasks} setTasks={setTasks} show={show} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/dued'
                element={user ? <Dued tasks={tasks} setTasks={setTasks} setShow={setShow} show={show} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/upcoming'
                element={user ? <Upcoming tasks={tasks} setTasks={setTasks} setShow={setShow} show={show} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path="/login"
                element={!user ? <Login setShow={setShow} /> : <Navigate to='/' />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to='/' />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
