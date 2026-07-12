import { useState } from 'react'

function LoginForm() {
    const [form, setForm] = useState({ email: '', password: '' })

    function handLeChange(e) {
        const { name, value } = e.target
        // Використовуємо  spread-щператор ... ;
        setForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    function handLeSubmit(e) {
        //e.preventDefault() — просто виводимо в консоль
        e.preventDefault()
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

            <input
                type="password"
                name='password'
                value={form.password}
                onChange={handLeChange}
                placeholder='Password'
            />
            <button type="submit">Увійти</button>
        </form>
    )
}

export default LoginForm;