import Blog from './Blog'

const BlogList = ({ blogs, setBlogs }) => (
  <div>
    <h2>blogs</h2>
    {blogs
      ?.sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      ))}
  </div>
)

export default BlogList
