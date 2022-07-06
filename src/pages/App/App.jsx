// Hooks
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import SignUp from '../SignUp/SignUp'

// Components

// Services
import * as trainersService from '../../utilities/trainers-service'
// CSS
import './App.css';

function App() {
  const [trainer, setTrainer] = useState('')

  useEffect(() => {
    if (trainersService.getToken()) setTrainer(trainersService.getTrainer)
  })

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp setTrainer={setTrainer} />} />
      </Routes>
    </div>
  );
}

export default App;
