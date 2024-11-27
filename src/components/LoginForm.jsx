import React from 'react'
import services from '../services/users'

const LoginForm = ({ setUser, setError }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const userData = await services.login({ username, password })
      setUser(userData)
      setUsername('')
      setPassword('')
    } catch (error) {
      setUsername('')
      setPassword('')

      setError(error.response.data.error)
      setTimeout(() => setError(''), 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        onChange={({ target }) => setUsername(target.value)}
        value={username}
        required
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        onChange={({ target }) => setPassword(target.value)}
        value={password}
        required
      />
      <button>Login</button>
    </form>
  )
}

export default LoginForm
