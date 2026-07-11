import { useState } from 'react'

function LoginForm() {
    const [form, setForm] = useState({ email: '', password: '' })

    function handleChange() {
        const { name, value } = e.target
        setForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    function handLeSubmit(e) {
        e.preventDefault()
        console.log('Відправлено:', form)
    }

    return (
        <form onSubmit={name}>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={name}
                placeholder='Email'
            />

            <input
                type="password"
                name='password'
                value={form.password}
                onChange={name}
                placeholder='Password'
            />
        </form>
    )
}

export default LoginForm;