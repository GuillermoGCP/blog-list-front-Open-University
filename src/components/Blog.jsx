import React from 'react'
import './Blog.css'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, setError, user }) => {
  const [areDetailsVisible, setAreDetailsVisible] = React.useState(false)

  const toggleDetails = () => {
    setAreDetailsVisible(!areDetailsVisible)
  }

  const handleLike = async () => {
    try {
      const data = { user: blog.user.id, likes: blog.likes + 1 }
      const response = await blogService.updateLikes(data, blog.id)

      setBlogs((prevData) => {
        return prevData.map((blog) => {
          if (blog.id === response.id) {
            return { ...response, user: blog.user }
          } else {
            return blog
          }
        })
      })
    } catch (error) {
      setError(error.response.data.error || 'Network error')
      setTimeout(() => setError(''), 5000)
    }
  }

  const handleDelete = async () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (!confirm) return

    try {
      await blogService.removeBlog(blog.id, user.token)

      setBlogs((prevData) => {
        return prevData.filter((prevBlog) => blog.id !== prevBlog.id)
      })
    } catch (error) {
      setError(error.response.data.error || 'Network error')
      setTimeout(() => setError(''), 5000)
    }
  }

  return areDetailsVisible ? (
    <div className='blog-container'>
      <div className='blog-header'>
        <span className='blog-title'>{blog.title}</span>
        <button className='toggle-btn' onClick={toggleDetails}>
          Hide
        </button>
      </div>
      <p className='blog-url'>{blog.url}</p>
      <div className='blog-likes'>
        <span>{blog.likes} likes</span>
        <button className='like-btn' onClick={handleLike}>
          Like
        </button>
      </div>
      <p className='blog-author'>Author: {blog.author}</p>
      {/* {Show delete button only to blog owner} */}
      {blog.user.username === user.username && (
        <button onClick={handleDelete}>remove</button>
      )}
    </div>
  ) : (
    <div className='blog_hidden'>
      <span>{blog.title}</span>
      <button className='toggle-btn' onClick={toggleDetails}>
        View
      </button>
    </div>
  )
}

export default Blog
