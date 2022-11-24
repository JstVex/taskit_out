import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <div className="auth-container">
            <form className="signup" onSubmit={handleSubmit}>
                <h3>sign up</h3>

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

                <button disabled={isLoading} className="auth-btn">sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup