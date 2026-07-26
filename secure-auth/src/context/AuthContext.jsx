import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState([])

    const value = {currentUser, register, login, logout}

    function register(email, password) {
        const existingUser = users.find(u => u.email === email)
        if (existingUser) {
            throw new Error('Користувач із таким email вже існує')
        }

        const newUser = { email, password }
        setUsers(prevUsers => [...prevUsers, newUser])
    }

    function login(email, password) {
        const user = users.find(u => u.email === email && u.password === password)
        if (!user) {
            throw new Error('Невірний email або пароль')
        }
        setCurrentUser(user)
    }
    // повернення до форми після виходу 
    function logout() {
        setCurrentUser(null)
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