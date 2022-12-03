import { useState, useEffect } from 'react';
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
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const rootUrl = process.env.REACT_APP_API_BASE_URL;
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [isStarred, setIsStarred] = useState(false);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  // const [appear, setAppear] = useState(true);

  const handleShow = () => {
    setShow(!show)
  }

  // const handleAppear = () => {
  //   setAppear(!appear)
  // }

  const { user } = useAuthContext();

  const handleCheckTrue = async (id) => {
    if (!user) {
      return
    }

    const listTasks = tasks.map((task) => task._id === id ? { ...task, checked: !task.checked } : task);
    // setAndSaveTasks(listTasks)

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
      console.log('edited the task', json)
    }
  }

  const handleCheckFalse = async (id) => {
    if (!user) {
      return
    }

    const listTasks = tasks.map((task) => task._id === id ? { ...task, checked: !task.checked } : task);
    // setAndSaveTasks(listTasks)

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
      console.log('edited the task', json)
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
      console.log('edited the task', json)
    }
  }

  const handleStarredFalse = async (id) => {
    if (!user) {
      return
    }

    const listTasks = tasks.map((task) => task._id === id ? { ...task, starred: !task.starred } : task);
    // setAndSaveTasks(listTasks)

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
        <Navbartop show={show} handleShow={handleShow} />
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
                element={user ? <Tasks tasks={tasks.filter(task => ((task.task).toLowerCase()).includes(search.toLowerCase()))} setTasks={setTasks} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} search={search} setSearch={setSearch} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/myday'
                element={user ? <Myday tasks={tasks} setTasks={setTasks} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/important'
                element={user ? <Important tasks={tasks} setTasks={setTasks} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/planned'
                element={user ? <Planned tasks={tasks} setTasks={setTasks} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/finished'
                element={user ? <Finished tasks={tasks} setTasks={setTasks} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/dued'
                element={user ? <Dued tasks={tasks} setTasks={setTasks} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path='/tasks/upcoming'
                element={user ? <Upcoming tasks={tasks} setTasks={setTasks} setShow={setShow} handleShow={handleShow} handleCheckTrue={handleCheckTrue} handleCheckFalse={handleCheckFalse} handleStarredTrue={handleStarredTrue} handleStarredFalse={handleStarredFalse} handleDelete={handleDelete} /> : <Navigate to='/login' />}
              >
              </Route>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to='/' />}
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
