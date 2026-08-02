// навчальна практика без використання бекенду — симулювати цю затримку, щоб інтерфейс поводився реалістично

function imitateNetworkDelay(ms = 800) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sendVerificationEmail(email, code) {
    await imitateNetworkDelay()
    console.info(`Лист із кодом${code} "надіслано" на ${email}`)
    return { success: true }
}