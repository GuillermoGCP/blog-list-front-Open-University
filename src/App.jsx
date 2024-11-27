import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import User from './components/User'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  if (error)
    return (
      <p
        style={{
          color: 'red',
          border: '2px solid red',
          backgroundColor: '#ffe6e6',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        {error}
      </p>
    )

  return (
    <>
      {!user.token ? (
        <LoginForm setUser={setUser} setError={setError} />
      ) : (
        <>
          <User user={user} />
          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default App
