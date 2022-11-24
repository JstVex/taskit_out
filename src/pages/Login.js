import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="auth-container">
            <form className="login" onSubmit={handleSubmit}>
                <h3>log in</h3>

                <label className="auth-label">email address:</label>
                <input
                    className="auth-form"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label className="auth-label">password:</label>
                <input
                    className="auth-form"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading} className="auth-btn">log in</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login