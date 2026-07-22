import { useState } from 'react'
import { validateEmail } from '../utils/validation'
import { validatePassword } from '../utils/validation'

function LoginForm({ switchToRegister }) {
    const [form, setForm] = useState({ email: '', password: '' })
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    function handLeChange(e) {
        const { name, value } = e.target
        // Використовуємо  spread-щператор ... ;
        setForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    function handLeSubmit(e) {
        //e.preventDefault() — просто виводимо в консоль
        e.preventDefault()
        
        const error = validateEmail(form.email)
        const errors = validatePassword(form.password)
        setEmailError(error)
        setPasswordError(errors)
        if (error || errors) {
            return
        }
        console.log('Відправлено:', form)
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

            <button type="submit">Log In</button>

            <button type="button" onClick={switchToRegister}>Sign Up</button>
        </form>
    )
}

export default LoginForm;