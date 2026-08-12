import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import './App.css'
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
      <div className='app-shell'>
        <div className='dashboard'>
          <div className='dashboard-badge'>✅ Верифікований акаунт</div>
            <h2>Вітаємо, {currentUser.email}!</h2>
            <button onClick={logout}>Exit</button>
        </div>
      </div>
    )
  }



  return (
    <>
      <div className='app-shell'>
        <div className='auth-card'>
          <h1>🔐 SecureAuth</h1>
          <p>Навчальний проєкт: авторизація + захист + підтвердження email та надійність пароля</p>

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

          
        </div>
      </div>
    </>
  )
}

export default App; 
