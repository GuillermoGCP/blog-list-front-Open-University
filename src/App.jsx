import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { checkLocalStorage } from './utils/index'
import {
  BlogForm,
  BlogList,
  ResponseMessage,
  LoginForm,
  User,
} from './components/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(checkLocalStorage())
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  return (
    <>
      {error && <ResponseMessage msg={error} color={'red'} />}
      {successMsg && <ResponseMessage msg={successMsg} />}

      {!user.token ? (
        <LoginForm setUser={setUser} setError={setError} />
      ) : (
        <>
          <User user={user} setUser={setUser} />
          <BlogForm
            setBlogs={setBlogs}
            token={user.token}
            setError={setError}
            setSuccessMsg={setSuccessMsg}
          />
          <BlogList blogs={blogs} />
        </>
      )}
    </>
  )
}

export default App
