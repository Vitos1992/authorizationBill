import { evaluatePasswordStrength } from "../utils/validation";

// кольорова шкала заповнення надійності пароля
function PasswordStrengthMeter({ password }) {
    const { score, label } = evaluatePasswordStrength(password)
    const colors = ['#EF4444', '#F59E0B', '#EAB308', '#84CC16', '#22C55E']

    return (
        <div>
            <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: 4 }).map((_, i) => (   // створюємо порожній масив з 4 елементами
                    <span
                        key={i}
                        style={{
                            height: '4px',
                            flex: 1,
                            backgroundColor: i < score ? colors[score] : '#ccc'
                        }}
                    />
                ))}
            </div>
            {password && <p style={{ color: colors[score] }}>{ label }</p>}
        </div>
    )

}

export default PasswordStrengthMeter