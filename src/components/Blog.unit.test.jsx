import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogLikes from './BlogLikes'
import BlogForm from './BlogForm'

const blogMock = {
  id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  user: { id: 'user1', username: 'testuser' },
}
const mockSetBlogs = vi.fn()
const mockSetError = vi.fn()
describe('render blog content', () => {
  beforeEach(() => {
    render(
      <Blog
        blog={blogMock}
        setBlogs={mockSetBlogs}
        setError={mockSetError}
        user={{ username: 'testuser' }}
      />
    )
  })

  test('renders blog title but not url, author, or likes initially', () => {
    // If the element is not found, an error is thrown.
    expect(screen.getByText('Type wars')).toBeInTheDocument()

    // If the element is not found, returns null.
    expect(
      screen.queryByText(
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
      )
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Robert C. Martin')).not.toBeInTheDocument()
    expect(screen.queryByText('2 likes')).not.toBeInTheDocument()
  })

  test('Clicking the button displays all the content of the blog: title, author, URL and likes.', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('View')

    await user.click(showButton)

    expect(screen.getByText('2 likes')).toBeInTheDocument()
    expect(
      screen.getByText(
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
      )
    ).toBeInTheDocument()

    const hideButton = screen.getByText('Hide')
    await user.click(hideButton)

    expect(screen.queryByText('2 likes')).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
      )
    ).not.toBeInTheDocument()
  })

  test('Clicking the Like button twice calls the event handler twice', async () => {
    const user = userEvent.setup()
    const mockHandleLikes = vi.fn()
    render(<BlogLikes handleLike={mockHandleLikes} blog={blogMock} />)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    expect(mockHandleLikes.mock.calls).toHaveLength(1)

    await user.click(likeButton)
    expect(mockHandleLikes.mock.calls).toHaveLength(2)
  })
})

describe('form tests', () => {
  let user
  let mockCreateBlog
  beforeEach(() => {
    user = userEvent.setup()
    mockCreateBlog = vi.fn()
    const mockHideForm = vi.fn()
    const mockSetSuccessMsg = vi.fn()
    const token = 'mock-token'

    render(
      <BlogForm
        setBlogs={mockSetBlogs}
        setError={mockSetError}
        hideForm={mockHideForm}
        setSuccessMsg={mockSetSuccessMsg}
        token={token}
        testingFn={mockCreateBlog}
      />
    )
  })

  test('A new form is created with correct values', async () => {
    const authorInput = screen.getByLabelText('Author:')
    await user.type(authorInput, 'Testing new author')

    const titleInput = screen.getByLabelText('Title:')
    await user.type(titleInput, 'Testing new title')

    const urlInput = screen.getByLabelText('Url:')
    await user.type(urlInput, 'www.Testing-example.com')

    const sendButton = screen.getByText('Create')
    await user.click(sendButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    //Also:
    expect(mockCreateBlog).toHaveBeenCalledTimes(1)

    expect(mockCreateBlog.mock.calls[0][0]).toStrictEqual({
      author: 'Testing new author',
      title: 'Testing new title',
      url: 'www.Testing-example.com',
    })
  })
})
