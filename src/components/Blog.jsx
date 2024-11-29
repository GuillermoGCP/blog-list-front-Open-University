import React from 'react'
import './Blog.css'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const [areDetailsVisible, setAreDetailsVisible] = React.useState(true)

  const toggleDetails = () => {
    setAreDetailsVisible(!areDetailsVisible)
  }
  const handleLike = async () => {
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
    </div>
  ) : (
    <div className='blog-hidden'>
      <span>{blog.title}</span>
      <button className='toggle-btn' onClick={toggleDetails}>
        View
      </button>
    </div>
  )
}

export default Blog
