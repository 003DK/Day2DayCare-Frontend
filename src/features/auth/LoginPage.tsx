import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuth((state) => state.login)
  const [username, setUsername] = useState('superadmin')
  const [password, setPassword] = useState('superadmin')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (login(username, password)) {
      navigate('/dashboard')
      return
    }

    setError('Invalid username or password. Use superadmin / superadmin.')
  }

  return (
    <div className="auth-shell">
      <div className="login-card">
        <div className="login-panel login-panel-left">
          <div className="brand-mark">
            <span className="brand-icon">✚</span>
            <div>
              <h1>PhysioCare</h1>
              <p>Clinic Management</p>
            </div>
          </div>
        </div>

        <div className="login-panel login-panel-right">
          <div className="login-header">
            <div className="mini-badge">Secure Portal</div>
            <h2>Welcome back</h2>
            <p>Sign in to manage your clinic operations.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              <span>Username</span>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="superadmin"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="superadmin"
              />
            </label>

            {error ? <div className="error-message">{error}</div> : null}

            <button type="submit" className="primary-button full-width">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
