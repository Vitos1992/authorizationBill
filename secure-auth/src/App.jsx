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
import VerifyEmail from './components/VerifyEmail'



function App() {

  const [screen, setScreen] = useState('login')
  const { currentUser, logout } = useAuth()
  const [pending, setPending] = useState({ email: null, code: null })
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
      <div className='app-shell'>
        <div className='auth-card'>
          <h1>SecureAuth</h1>
          {screen === 'login' && (
            <LoginForm switchToRegister={() => setScreen('register')}></LoginForm>
          )}

          {screen === 'register' && (
            <RegisterForm
              switchToLogin={() => setScreen('login')}
              onRegistered={({ email, code }) => {
                setPending({ email, code })
                setScreen('verify')
              }}
            />
          )}

          {screen === 'verify' && (
            <VerifyEmail
              pendingEmail={pending.email}
              previewCode={pending.code}
              onVerified={() => setScreen('login')}
              switchToLogin={() => setScreen('login')}
            />
          )}
          <p>Мій безпечний проєкт</p>

          <Greeting name="Друзі" />
          {/* <TestInput /> */}

          {/* <LoginForm/> */}
        </div>
      </div>
    </>
  )
}

export default App; 
