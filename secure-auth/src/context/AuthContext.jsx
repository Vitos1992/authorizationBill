import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState([])

    const value = {currentUser, register, login}

    function register(email, password) {
        const existingUser = users.find(u => u.email === email)
        if (existingUser) {
            throw new Error('Користувач із таким email вже існує')
        }

        const newUser = { email, password }
        setUsers(prevUsers => [...prevUsers, newUser])
    }

    function login(email, password) {
        console.log('Шукаємо:', email, password)
        console.log('Всі користувачі:', users)
        
        const user = users.find(u => u.email === email && u.password === password)
        if (!user) {
            throw new Error('Невірний email або пароль')
        }
        setCurrentUser(user)
    }

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}