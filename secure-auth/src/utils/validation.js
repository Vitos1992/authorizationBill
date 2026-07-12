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