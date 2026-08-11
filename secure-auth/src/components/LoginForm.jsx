import { useState, useEffect } from 'react'
import { validateEmail } from '../utils/validation'
import { validatePassword } from '../utils/validation'
import { useAuth } from '../context/AuthContext'
import { getLockStatus } from '../utils/security'

function LoginForm({ switchToRegister }) {
    const { login } = useAuth()  // деструктуризація ЗВИЧАЙНОГО ОБ'ЄКТА (з результату виклику функції)
    
    const [form, setForm] = useState({ email: '', password: '' })
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [lockInfo, setLockInfo] = useState({ locked: false, secondsLeft: 0 })

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (form.email) {
                setLockInfo(getLockStatus(form.email))
            }
        }, 1000)
        return () => clearInterval(intervalId)
    }, [form.email])

    function handLeChange(e) {
        const { name, value } = e.target
        // Використовуємо  spread-оператор ... ;
        setForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    async function handLeSubmit(e) {
        //e.preventDefault() — просто виводимо в консоль
        e.preventDefault()
        
        const error = validateEmail(form.email)
        const errors = validatePassword(form.password)
        setEmailError(error)
        setPasswordError(errors)
        if (error || errors) {
            return
        }
        
        try {
            await login(form.email, form.password)
        } catch (err) {
            setLoginError(err.message)
            console.log(err.message)
        }
    }

    return (
        <form onSubmit={handLeSubmit}>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handLeChange}
                placeholder='Email'
            />
            {emailError && <p style={{ color: 'red'}}>{emailError}</p>}

            <input
                type="password"
                name='password'
                value={form.password}
                onChange={handLeChange}
                placeholder='Password'
            />
            {passwordError && <p style={{ color: 'red'}}>{passwordError}</p>}
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            
            {/* лічильник відрахування спроб */}
            {lockInfo.locked && (
                <p style={{ color: 'red' }}>
                    Забагато спроб. Спробуйте через {lockInfo.secondsLeft} с.
                </p>
            )}

            <button type="submit" disabled={lockInfo.locked}>Увійти</button>

            <button type="button" onClick={switchToRegister}>Зареєструватися</button>
        </form>
    )
}

export default LoginForm;