import logo from './assets/build-right-logo.jpeg'
import { useState } from 'react'
import './App.css'

function App() {
const [isLogin, setIsLogin] = useState(true)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState('')
const [isLoading, setIsLoading] = useState(false)

async function handleSubmit(event) {
event.preventDefault()
setMessage('')
setIsLoading(true)

const endpoint = isLogin
  ? 'http://localhost:8080/api/auth/login'
  : 'http://localhost:8080/api/auth/register'

const requestBody = isLogin
  ? { email, password }
  : { name, email, password }

try {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    setMessage(
      data.message ||
      data.error ||
      (response.status === 409
        ? 'This email is already registered. Please log in.'
        : `Request failed (${response.status}). Please try again.`)
    )
    return
  }

  if (isLogin) {
    if (data.token) {
      sessionStorage.setItem('build_right_token', data.token)
    }

    setMessage(`Welcome back${data.name ? `, ${data.name}` : ''}! Login successful.`)
  } else {
    setMessage('Account created successfully! You can now log in.')
    setIsLogin(true)
    setName('')
    setPassword('')
  }
} catch (error) {
  setMessage(
    'Could not connect to the backend. Check that it is running and try again.'
  )
} finally {
  setIsLoading(false)
}

}

return (
<main className="auth-page">
<section className="auth-card">
<div className="brand">
<img src={logo} alt="build_right logo" className="brand-logo" />
</div>

    <p className="subtitle">
      Build smarter. Test better. Ship with confidence.
    </p>

    <div className="auth-tabs">
      <button
        type="button"
        className={isLogin ? 'tab active' : 'tab'}
        onClick={() => {
          setIsLogin(true)
          setMessage('')
        }}
      >
        Login
      </button>

      <button
        type="button"
        className={!isLogin ? 'tab active' : 'tab'}
        onClick={() => {
          setIsLogin(false)
          setMessage('')
        }}
      >
        Register
      </button>
    </div>

    <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>

    <p className="form-description">
      {isLogin
        ? 'Log in to continue to your workspace.'
        : 'Create an account to get started.'}
    </p>

    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <label>
          Full name
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
      )}

      <label>
        Email address
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />
      </label>

      <button
        className="submit-button"
        type="submit"
        disabled={isLoading}
      >
        {isLoading
          ? 'Please wait...'
          : isLogin
            ? 'Login'
            : 'Create account'}
      </button>
    </form>

    {message && (
      <p className="form-description" role="status" aria-live="polite">
        {message}
      </p>
    )}

    <p className="footer-text">
      Your workspace for better software quality.
    </p>
  </section>
</main>

)
}

export default App