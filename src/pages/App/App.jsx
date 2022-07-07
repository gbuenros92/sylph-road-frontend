// Hooks
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import SignUp from '../SignUp/SignUp'
import LogIn from '../LogIn/LogIn'
import Home from '../Home/Home'
import Profile from '../Profile/Profile'

// Components
import Sidebar from '../../components/Sidebar/Sidebar'

// Services
import * as trainersService from '../../utilities/trainers-service'

// CSS
import './App.css';

const App = () => {
  const [trainer, setTrainer] = useState('')

  useEffect(() => {
    if (trainersService.getToken()) setTrainer(trainersService.getTrainer())
  }, [])

  return (
    <div className="App">
      <Sidebar trainer={trainer} setTrainer={setTrainer} logOut={trainersService.logOut}/>

      <Routes>
        {
          (!trainer)
            ?
            <>
              <Route path="/" element={<SignUp setTrainer={setTrainer} />} />
              <Route path="/login" element={<LogIn setTrainer={setTrainer} />} />
            </>
            :
            <>
              <Route path="/home" element={<Home />} />
              <Route path={`trainer/${trainer._id}`} element={<Profile trainer={trainer} />} />
            </>
        }
      </Routes>
    </div>
  );
}

export default App;
