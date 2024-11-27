import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { checkLocalStorage } from './utils/index'
import { BlogList, ErrorMessage, LoginForm, User } from './components/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(checkLocalStorage())
  const [error, setError] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {!user.token ? (
        <LoginForm setUser={setUser} setError={setError} />
      ) : (
        <>
          <User user={user} setUser={setUser} />
          <BlogList blogs={blogs} />
        </>
      )}
    </>
  )
}

export default App
