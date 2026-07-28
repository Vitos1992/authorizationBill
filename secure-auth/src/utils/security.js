
// хешування пароля
export function generateSalt(length = 16) {
    // Uint8Array - це спеціальний тип масиву, який зберігає лише цілі числа від 0 до 255 (кожен елемент — рівно 1 байт, "U" означає unsigned — без знаку, "8" — 8 біт на елемент).
    const array = new Uint8Array(length)
    crypto.getRandomValues(array)
    
    // .padStart(2, '0') - заповнює поточну рядок іншим рядком, за потребою декілько разів, якщо рядок коротший за два символи доповнює його 0
    return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

// детермінованість хеш-функції
// salt - це так називаєма сіль додається до пароля
export async function hashPassword(password, salt) {
    // інструмент який перетворює звичайний текст, рядок у байти
    // Uint8Array, бо 'crypto.subtle.digest' працює тільки з байтами
    const encoder = new TextEncoder() 
    const data = encoder.encode(salt + password)  
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)  
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')                              

}
