import logo from './assets/build-right-logo.png'
import { useEffect, useState } from 'react'
import './App.css'

const dashboardSections = [
{ name: 'Overview', icon: '▦' },
{ name: 'Projects', icon: '▣' },
{ name: 'Requirements', icon: '☷' },
{ name: 'Test Cases', icon: '✓' },
{ name: 'Bugs', icon: '⚑' },
{ name: 'Reports', icon: '▤' },
]

function App() {
const [isLogin, setIsLogin] = useState(true)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState('')
const [isLoading, setIsLoading] = useState(false)
const [user, setUser] = useState(() => {
  const token = sessionStorage.getItem('build_right_token')
  const savedUser = sessionStorage.getItem('build_right_user')

  if (!token || !savedUser) return null

  try {
    return JSON.parse(savedUser)
  } catch {
    return null
  }
})
const [activeSection, setActiveSection] = useState('Overview')
const [projectName, setProjectName] = useState('')
const [projectDescription, setProjectDescription] = useState('')
const [projects, setProjects] = useState([])

useEffect(() => {
  if (!user) return

  const loadProjects = async () => {
    try {
      const token = sessionStorage.getItem('build_right_token')

      const response = await fetch('http://localhost:8080/api/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const savedProjects = await response.json()
      setProjects(savedProjects)
    } catch (error) {
      console.error('Failed to load projects:', error)
      setMessage('Could not load saved projects.')
    }
  }

  loadProjects()
}, [user])

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
    headers: { 'Content-Type': 'application/json' },
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

    setUser({
      name: data.name || email.split('@')[0],
      email: data.email || email,
    })

    sessionStorage.setItem(
      'build_right_user',
      JSON.stringify({
        name: data.name || email.split('@')[0],
        email: data.email || email,
      })
    )
    
    setActiveSection('Overview')
  } else {
    setMessage('Account created successfully! You can now log in.')
    setIsLogin(true)
    setName('')
    setPassword('')
  }
} catch {
  setMessage(
    'Could not connect to the backend. Check that it is running and try again.'
  )
} finally {
  setIsLoading(false)
}

}

function handleLogout() {
sessionStorage.removeItem('build_right_token')
setUser(null)
setPassword('')
setMessage('')
setIsLogin(true)
setActiveSection('Overview')
}

if (user) {
return (
<main className="dashboard">
<aside className="sidebar">
<div className="sidebar-brand">
<img src={logo} alt="build_right logo" />
</div>

      <p className="sidebar-label">WORKSPACE</p>

      <nav className="sidebar-nav">
        {dashboardSections.map((section) => (
          <button
            key={section.name}
            type="button"
            className={
              activeSection === section.name
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() => setActiveSection(section.name)}
          >
            <span className="nav-icon">{section.icon}</span>
            {section.name}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="user-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="sidebar-user">
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </div>
        <button
          className="logout-button"
          type="button"
          onClick={handleLogout}
          title="Log out"
          aria-label="Log out"
        >
          ↪
        </button>
      </div>
    </aside>

    <section className="dashboard-main">
      <header className="dashboard-header">
        <div>
          <p className="breadcrumb">Workspace / {activeSection}</p>
          <h1>
            {activeSection === 'Overview'
              ? 'Dashboard'
              : activeSection}
          </h1>
        </div>
        <div className="header-profile">
          <span className="status-dot" />
          {user.name}
        </div>
      </header>

      {activeSection === 'Overview' ? (
        <div className="dashboard-content">
          <section className="welcome-banner">
            <div>
              <p className="eyebrow">YOUR QUALITY WORKSPACE</p>
              <h2>Welcome back, {user.name}!</h2>
              <p>
                Plan your work, organize test cases, and improve
                software quality—all in one place.
              </p>
            </div>
            <div className="welcome-symbol">✦</div>
          </section>

          <div className="section-heading">
            <div>
              <h2>Workspace overview</h2>
              <p>Keep track of your software quality activities.</p>
            </div>
          </div>

          <div className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon purple">▣</div>
              <p>Total projects</p>
              <strong>0</strong>
              <span>No projects created yet</span>
            </article>

            <article className="stat-card">
              <div className="stat-icon blue">☷</div>
              <p>Requirements</p>
              <strong>0</strong>
              <span>Track what to build</span>
            </article>

            <article className="stat-card">
              <div className="stat-icon green">✓</div>
              <p>Test cases</p>
              <strong>0</strong>
              <span>Validate your features</span>
            </article>

            <article className="stat-card">
              <div className="stat-icon orange">⚑</div>
              <p>Open bugs</p>
              <strong>0</strong>
              <span>Track issues to resolve</span>
            </article>
          </div>

          <section className="recent-panel">
            <div>
              <h2>Get started</h2>
              <p>Your workspace is ready for its first project.</p>
            </div>
            <button
              className="primary-action"
              type="button"
              onClick={() => setActiveSection('Projects')}
            >
              Explore projects <span>→</span>
            </button>
          </section>

          <p className="dashboard-note">
            Project statistics will appear here as you add real data.
          </p>
        </div>
      ) : (
        <div className="dashboard-content">
          <section className="section-placeholder">
            <div className="placeholder-icon">
              {dashboardSections.find(
                (section) => section.name === activeSection
              )?.icon}
            </div>
            <h2>{activeSection}</h2>
            <p>
              This section is ready for the next development step.
              We'll add its functionality as build_right grows.
            </p>
          {activeSection === 'Projects' && (
            <>
              <form
                className="project-form"
                onSubmit={async (event) => {
                  event.preventDefault()
                  setMessage('Creating project...')

                  try {
                    const token = sessionStorage.getItem('build_right_token')

                    const response = await fetch('http://localhost:8080/api/projects', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        name: projectName.trim(),
                        description: projectDescription.trim(),
                      }),
                    })

                    if (!response.ok) {
                      throw new Error(`Request failed: ${response.status}`)
                    }

                    const savedProject = await response.json()

                    setProjects((currentProjects) => [
                      ...currentProjects,
                      savedProject,
                    ])

                    setProjectName('')
                    setProjectDescription('')
                    setMessage('Project created successfully!')
                  } catch (error) {
                    console.error('Project creation failed:', error)
                    setMessage('Could not create project. Please check your login and backend.')
                  }
                }}
              >

                <label>
                  Project name
                  <input
                    type="text"
                    placeholder="e.g. E-commerce Testing Platform"
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    required
                  />
                </label>

                <label>
                  Project description
                  <textarea
                    placeholder="Describe what your project will do..."
                    value={projectDescription}
                    onChange={(event) =>
                      setProjectDescription(event.target.value)
                    }
                    rows={4}
                    required
                  />
                </label>

                <button className="primary-action" type="submit">
                  Create project
                </button>
              </form>

              {projects.length > 0 && (
                <div className="projects-list">
                  <h3>Your projects</h3>

                  {projects.map((project) => (
                    <article className="project-card" key={project.id}>
                      <h4>{project.name}</h4>
                      <p>{project.description}</p>
                    </article>
                  ))}
                </div>
              )}

              {message && <p role="status">{message}</p>}
            </>
          )}
        </section>
      </div>
    )}
  </section>
</main>
)
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