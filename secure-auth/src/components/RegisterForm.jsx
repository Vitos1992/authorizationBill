import { useState } from "react";
import { validateEmail } from "../utils/validation";
import { validatePassword } from "../utils/validation";
import { useAuth } from "../context/AuthContext";
import PasswordStrengthMeter from "./PasswordStrengthMeter"; 

function RegisterForm({ switchToLogin }) {
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
            await register(formRegister.email, formRegister.password)
            switchToLogin()
        } catch (err) {
            console.log(err.message)
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

            <input
                type="password"
                name="password"
                value={formRegister.password}
                onChange={handLeRegister}
                placeholder="Password"
            />
            

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

            {/* <button type="button" onClick={switchToLogin}>
                Already have an account? Log In
            </button> */}
        </form>

    )
}

export default RegisterForm