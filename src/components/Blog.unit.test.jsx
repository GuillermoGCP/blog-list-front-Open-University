import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blogMock = {
  id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  user: { id: 'user1', username: 'testuser' },
}

test('renders blog title but not url, author, or likes initially', () => {
  render(
    <Blog
      blog={blogMock}
      setBlogs={() => {}}
      setError={() => {}}
      user={{ username: 'other-testuser' }}
    />
  )
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
