import { useForm } from 'react-hook-form'
import blogsService from '../services/blogs'

const BlogForm = ({ setBlogs, token, setError, setSuccessMsg }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const newBlog = await blogsService.createBlog(data, token)
      setBlogs((prevData) => [...prevData, newBlog])
      reset()
      setSuccessMsg(`A new blog ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => setSuccessMsg(''), 5000)
    } catch (error) {
      setError(error.response.data.error || 'Network error')
      setTimeout(() => setError(''), 5000)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
      <label>
        Author:
        <input
          {...register('author', { required: true })}
          style={{ display: 'block', margin: '10px 0' }}
        />
        {errors?.author && (
          <span style={{ display: 'block', margin: '10px 0', color: 'red' }}>
            Author is required
          </span>
        )}
      </label>
      <label>
        Title:
        <input
          {...register('title', { required: true })}
          style={{ display: 'block', margin: '10px 0' }}
        />
        {errors?.title && (
          <span style={{ display: 'block', margin: '10px 0', color: 'red' }}>
            Title is required
          </span>
        )}
      </label>
      <label>
        Url:
        <input
          {...register('url', { required: true })}
          style={{ display: 'block', margin: '10px 0' }}
        />
        {errors?.url && (
          <span style={{ display: 'block', margin: '10px 0', color: 'red' }}>
            Url is required
          </span>
        )}
      </label>

      <button type='submit'>Create</button>
    </form>
  )
}

export default BlogForm
