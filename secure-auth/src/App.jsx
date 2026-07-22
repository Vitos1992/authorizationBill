import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Greeting from './components/Greeting'
import TestInput from './components/TestInput'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {

  const [screen, setScreen] = useState('login')

  return (
    <>
      <h1>SecureAuth</h1>
      {screen === 'login' && (
        <LoginForm switchToRegister={() => setScreen('register')}></LoginForm>
      )}

      {screen === 'register' && <RegisterForm switchToLogin={() => setScreen('login')}></RegisterForm>}
      <p>My secure project</p>

      <Greeting name="Oksana" />
      {/* <TestInput /> */}

      {/* <LoginForm/> */}
    </>
  )
}

export default App; 
