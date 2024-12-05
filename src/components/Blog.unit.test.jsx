import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

const blogMock = {
  id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  user: { id: 'user1', username: 'testuser' },
}

describe('render blog content', () => {
  beforeEach(() => {
    const mockSetBlogs = vi.fn()
    const mockSetError = vi.fn()
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
})
