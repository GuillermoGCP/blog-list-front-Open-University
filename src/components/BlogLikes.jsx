import './Blog.css'

const BlogLikes = ({ handleLike, blog }) => {
  return (
    <>
      <span>{blog.likes} likes</span>
      <button className='like-btn' onClick={handleLike}>
        Like
      </button>
    </>
  )
}

export default BlogLikes
