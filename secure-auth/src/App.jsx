import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Greeting from './components/Greeting'
import TestInput from './components/TestInput'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <>
      <h1>SecureAuth</h1>
      <p>My authorization prodect</p>

      <Greeting name="Oksana" />
      <TestInput />

      <LoginForm/>
    </>
  )
}

export default App;
