import React from 'react'
import './Blog.css'

const Blog = ({ blog }) => {
  const [areDetailsVisible, setAreDetailsVisible] = React.useState(true)

  const toggleDetails = () => {
    setAreDetailsVisible(!areDetailsVisible)
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
        <button className='like-btn'>Like</button>
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
