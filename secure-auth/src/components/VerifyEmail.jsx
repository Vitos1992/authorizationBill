import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail({ pendingEmail, previewCode, onVerified, switchToLogin }) {
    const [verify, setVerify] = useState('')
    const [verifyError, setVerifyError] = useState(null)
    const { verifyEmail } = useAuth()

    function handLeVerify(e) {
        setVerify(e.target.value)
    }

    async function handLeSubmit(e) {
        e.preventDefault()
        try {
            await verifyEmail(pendingEmail, verify)
            onVerified()
        } catch (err) {
            setVerifyError(err.message)
        }
    }


    return (
        <form onSubmit={handLeSubmit}>
            <p>Демо-код: {previewCode}</p>
            <input 
                type="text"
                value={verify}
                onChange={handLeVerify}
                placeholder="Email"
            />
            {verifyError && <p className='form-error'>{verifyError}</p>}

            <button type="submit">Підтвердити</button>
            <button type="button" onClick={switchToLogin}>Назад до входу</button>
        </form>
    )
}