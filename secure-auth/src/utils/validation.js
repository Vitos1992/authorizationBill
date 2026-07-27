// валідація ведення email
export function validateEmail(email) {
    if (!email) {
        return 'Введіть email'
    }
    // Регулярний вираз — перевіряє формат "щось@щось.щось"
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
        return 'Некоректний формат email'
    }
    // null - означає що помилок не має
    return null
}

// валідація ведення паролю
export function validatePassword(password) {
    if (!password) {
        return 'Введіть пароль'
    }
    // Регулярний вираз — перевіряє формат "щось@щось.щось"
    const passwordPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!passwordPattern >= 8) {
        return 'Пароль має містити щонайменше 8 символів'
    }

    return null
}

// перевірка надійності пароля
export function evaluatePasswordStrength(password) {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        digit: /\d/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password)
    }

    const passedCount = Object.values(checks).filter(Boolean).length // ця функція перетворює на масив, а потім фільтрує кожне знвчення
    const labels = ['Дуже слабкий', 'Слабкий', 'Середній', 'Хороший', 'Сильний']

    return { score: passedCount, label: labels[passedCount], checks }

}