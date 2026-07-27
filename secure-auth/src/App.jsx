import { useState } from 'react'
import { useAuth } from './context/AuthContext'
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
  const { currentUser, logout } = useAuth()
 // підтведження реєстрації
  if (currentUser) {
    return (
      <div>
        <h2>Вітаємо, {currentUser.email}!</h2>
        <button onClick={logout}>Exit</button>
      </div>
    )
  }



  return (
    <>
      <h1>SecureAuth</h1>
      {screen === 'login' && (
        <LoginForm switchToRegister={() => setScreen('register')}></LoginForm>
      )}

      {screen === 'register' && <RegisterForm switchToLogin={() => setScreen('login')}></RegisterForm>}
      <p>Мій безпечний проєкт</p>

      <Greeting name="Друзі" />
      {/* <TestInput /> */}

      {/* <LoginForm/> */}
    </>
  )
}

export default App; 
