import { useState } from "react";
import { validateEmail } from "../utils/validation";
import { validatePassword } from "../utils/validation";
import { useAuth } from "../context/AuthContext";
import PasswordStrengthMeter from "./PasswordStrengthMeter"; 

function RegisterForm({ switchToLogin, onRegistered }) {
    const { register } = useAuth()

    const [formRegister, setFormRegister] = useState({ email: '', password: '', confirm: '' })
    const [registerEmailError, setRegisterEmailError] = useState(null)
    const [registerPasswordError, setRegisterPasswordError] = useState(null)
    const [registerConfirmError, setRegisterConfirmError] = useState(null)

    function handLeRegister(e) {
        const { name, value } = e.target
        // Використовуємо  spread-щператор ... ;
        setFormRegister(prevForm => ({ ...prevForm, [name]: value }))
    }


    async function registerSubmit(e) {
        e.preventDefault()

        const error = validateEmail(formRegister.email)
        const passwordErr = validatePassword(formRegister.password)
        let confirmError = null

        if (formRegister.password !== formRegister.confirm) {
            confirmError = 'The passwords do not match'
        }

        setRegisterEmailError(error)
        setRegisterPasswordError(passwordErr)
        setRegisterConfirmError(confirmError)

        if (error || passwordErr || confirmError) {
            return
        }

        try {
            const code = await register(formRegister.email, formRegister.password)
            onRegistered({ email: formRegister.email, code })
        } catch (err) {
            setRegisterEmailError(err.message)
        }
    }

    return (
        <form onSubmit={registerSubmit}>
            <input
                type="email"
                name="email"
                value={formRegister.email}
                onChange={handLeRegister}
                placeholder="Email"
            />
            {registerEmailError && <p style={{ color: 'red'}}>{registerEmailError}</p>}

            <input
                type="password"
                name="password"
                value={formRegister.password}
                onChange={handLeRegister}
                placeholder="Password"
            />
            {registerPasswordError && <p style={{ color: 'red'}}>{registerPasswordError}</p>}

            <input
                type="password"
                name="confirm"
                value={formRegister.confirm}
                onChange={handLeRegister}
                placeholder="Confirm password"
            />
            {registerConfirmError && <p style={{ color: 'red' }}>{registerConfirmError}</p>}
            
            <PasswordStrengthMeter password={formRegister.password} />

            <button type="submit">Зареєструватися</button>

            <button type="button" onClick={switchToLogin}>
                У вас вже є обліковий запис? Увійти
            </button>
        </form>

    )
}

export default RegisterForm