# SecureAuth — щоденник розробки

Цей файл документує покроковий процес створення проєкту SecureAuth: форми реєстрації/входу з підтвердженням email, хешуванням пароля та захистом від брутфорсу. Проєкт написаний власноруч під час навчання React, з поясненням кожної концепції по ходу розробки.

**Живий сайт:** https://vitos1992.github.io/authorizationBill/

---

## Етап 1. Налаштування проєкту

- Створення Vite + React проєкту: `npm create vite@latest secure-auth-demo -- --template react`
- Розбір структури файлів: `node_modules`, `public`, `src`, `index.html`, `package.json`, `vite.config.js`
- Прибрано шаблонний код Vite, написано перший власний компонент `App.jsx`

## Етап 2. Основи React

- **JSX і фігурні дужки `{}`** — вставка JavaScript-виразів у розмітку
- **Компоненти й пропси** — створено `Greeting.jsx`, розібрано передачу даних через пропси (`props.name` та деструктуризацію `{ name }`)
- **React Fragment `<>...</>`** — обгортка без зайвого `<div>` у DOM
- **`useState`** — перший контрольований інпут (`TestInput.jsx`), розібрано об'єкт події (`e.target.value`)

## Етап 3. Форма логіну

- Контрольовані інпути з одним об'єктом стану (`form`) і spread-оператором (`...prevForm`)
- Динамічний ключ об'єкта `[name]: value` — один обробник `handleChange` для всіх полів
- `e.preventDefault()` — запобігання перезавантаженню сторінки при сабміті
- Кнопки `type="submit"` проти `type="button"` — різниця в поведінці

## Етап 4. Валідація

- Винесення логіки перевірки в окремий файл `utils/validation.js` (pure functions)
- `validateEmail`, `validatePassword` — повернення `null` (все ок) або тексту помилки
- Умовний рендеринг помилок через `{error && <p>{error}</p>}`

## Етап 5. Форма реєстрації

- Написано `RegisterForm.jsx` самостійно за зразком `LoginForm`
- Поле підтвердження пароля, перевірка збігу паролів
- Callback-пропси для комунікації дитина → батько (`switchToRegister`, `switchToLogin`)

## Етап 6. React Context

- Проблема "prop drilling" і рішення через Context
- `createContext`, `AuthContext.Provider`, `useContext` — створення `AuthContext.jsx`
- Кастомний хук `useAuth()`
- Підключення `AuthProvider` в `main.jsx`, обгортання `<App />`

## Етап 7. Логіка авторизації (проста версія)

- Масив `users` у `useState`, функції `register`/`login`/`logout`
- `throw new Error(...)` і обробка через `try/catch`
- Підключення `login`/`register` з контексту до форм
- Умовний рендеринг Dashboard замість форм, коли `currentUser` не `null`

## Етап 8. Індикатор сили пароля

- `evaluatePasswordStrength()` — перевірка довжини, регістру, цифр, символів через regex
- `Object.values().filter(Boolean).length` — підрахунок пройдених критеріїв
- Компонент `PasswordStrengthMeter.jsx`, `Array.from({ length: 4 }).map()` для генерації смужок
- Кольорова шкала від червоного до зеленого залежно від `score`

## Етап 9. Хешування пароля

- Теорія: хешування, "сіль" (salt), чому не можна зберігати пароль відкритим текстом
- `security.js`: `generateSalt()` через `crypto.getRandomValues()` (Web Crypto API)
- `hashPassword()` через `crypto.subtle.digest('SHA-256', ...)`, `async/await`
- Оновлення `register`/`login` в контексті: зберігання `{ salt, passwordHash }` замість пароля

## Етап 10. Підтвердження email

- Симуляція відправки листа: `mockEmailService.js` (без реального бекенду)
- `generateVerificationCode()` — генерація 6-значного коду
- `verifyEmail()` в контексті — оновлення користувача через `.map()` без мутації стану
- Компонент `VerifyEmail.jsx`, блокування `login()` для непідтверджених акаунтів
- Повний флоу: реєстрація → показ демо-коду → підтвердження → вхід

## Етап 11. localStorage

- Теорія: `localStorage`, `JSON.stringify`/`JSON.parse`
- `useEffect(() => {...}, [users])` — автозбереження при зміні `users`
- `useState(() => {...})` з функцією-ініціалізатором — відновлення даних при старті застосунку

## Етап 12. Захист від брутфорсу

- Лічильник невдалих спроб входу в окремому ключі `localStorage`
- `getLockStatus()`, `recordFailedAttempt()`, `clearFailedAttempts()`
- Тимчасове блокування email після 5 невдалих спроб (1 хвилина)
- Захист від "user enumeration" — однакові повідомлення про помилку

## Етап 13. Стилізація

- CSS custom properties (`:root { --accent: ... }`) — темна палітра
- Flexbox для центрування (`.app-shell`)
- Картка авторизації (`.auth-card`) із заокругленими кутами й тінню
- Псевдоелемент `::before` — акцентна лінія-градієнт зверху картки
- Псевдокласи `:hover`, `:focus` для інтерактивного фідбеку
- CSS-класи замість inline-стилів (`.form-error`)
- Стилізація Dashboard, бейджа верифікації (`rgba()` для напівпрозорого фону)
- Адаптивність: `padding` на `.app-shell` + `box-sizing: border-box`, щоб картка не вилазила за межі екрана на мобільних

## Етап 14. Деплой на GitHub Pages

- Налаштування `base` у `vite.config.js` відповідно до назви репозиторію
- Встановлення `gh-pages`, додавання скриптів `predeploy`/`deploy` у `package.json`
- `npm run deploy` — автоматична збірка й публікація на гілку `gh-pages`
- Увімкнення GitHub Pages в Settings → Pages
- Діагностика помилок 404 (неправильний `base`, запуск команд не з тієї папки)

---

## Ключові концепції React, засвоєні в проєкті

- JSX, компоненти, пропси, деструктуризація
- `useState`, `useEffect` (з порожнім масивом і з залежностями, з функцією-ініціалізатором)
- React Context (`createContext`, `Provider`, `useContext`, кастомні хуки)
- Контрольовані форми, обробка подій
- Умовний рендеринг, списки через `.map()`
- Робота з масивами й об'єктами без мутації (spread-оператор, `.map()` для оновлення)
- `async/await`, `try/catch`, `Promise`

## Ключові концепції безпеки, засвоєні в проєкті

- Хешування паролів із сіллю (Web Crypto API, SHA-256)
- Чому паролі не можна зберігати відкритим текстом
- Симуляція підтвердження email (і як це робиться по-справжньому — через бекенд)
- Захист від брутфорсу (лічильник спроб, тимчасове блокування)
- Захист від user enumeration (однакові повідомлення про помилки)

## Ідеї для подальшого розвитку

- `react-router-dom` для справжніх URL-адрес
- Простий бекенд на Express + Nodemailer для реальної відправки листів
- Двофакторна автентифікація (TOTP)
- Тести для `utils/validation.js` та `utils/security.js` (Vitest)