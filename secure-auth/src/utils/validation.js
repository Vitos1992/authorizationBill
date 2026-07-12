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