import { createContext, useContext, useState } from "react";
import { generateSalt, hashPassword } from "../utils/security";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState([])

    const value = {currentUser, register, login, logout}

    async function register(email, password) {
        const existingUser = users.find(u => u.email === email)
        if (existingUser) {
            throw new Error('Користувач із таким email вже існує')
        }
        
        // хушування пароля 
        const salt = generateSalt()
        const passwordHash = await hashPassword(password, salt)

        const newUser = { email, salt, passwordHash }
        setUsers(prevUsers => [...prevUsers, newUser])
    }

    async function login(email, password) {
        const user = users.find(u => u.email === email)
        if (!user) {
            throw new Error('Невірний email або пароль')
        }

        const logHash = await hashPassword(password, user.salt)
        if (logHash !== user.passwordHash) {
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