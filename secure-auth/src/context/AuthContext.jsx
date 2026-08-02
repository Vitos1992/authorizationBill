import { createContext, useContext, useState } from "react";
import { generateSalt, generateVerificationCode, hashPassword } from "../utils/security";
import { sendVerificationEmail } from "../utils/mockEmailService";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState([])

    const value = {currentUser, register, login, logout, verifyEmail}

    async function register(email, password) {
        // перевірка чи є такий вже email
        const existingUser = users.find(u => u.email === email)
        if (existingUser) {
            throw new Error('Користувач із таким email вже існує')
        }
        
        // хушування пароля, генерація "сіль" (salt)
        // для безпеки пароля
        const salt = generateSalt()
        const passwordHash = await hashPassword(password, salt)
        
        // імітація відправки листа підтвердження на email
        const verificationCode = generateVerificationCode()
        await sendVerificationEmail(email, verificationCode)

        const newUser = { email, salt, passwordHash, verified: false, verificationCode }
        // зберигання користувачив
        setUsers(prevUsers => [...prevUsers, newUser])

        return verificationCode
    }

    function verifyEmail(email, code) {
        const user = users.find(u => u.email === email)
        if (!user) {
            throw new Error('Користувача не знайдено')
        }
        if (user.verificationCode !== code) {
            throw new Error('Невірний код підтвердження')
        }

        setUsers(prevUsers =>
            prevUsers.map(u => 
                u.email === email ? {...u, verified: true, verificationCode: null} : u
            )
        )
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

        if (!user.verified) {
            throw new Error('Пошту не підтверджено. Перевірте лист із кодом.')
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