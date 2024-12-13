const loginWith = async (loginForm, username, password) => {
  await loginForm.usernameInput.fill(username)
  await loginForm.passwordInput.fill(password)
  await loginForm.button.click()
}

const resetDb = async (request) => {
  await request.post('http://localhost:3001/api/testing/reset')
  await request.post('http://localhost:3001/api/users', {
    data: {
      name: 'Guanabi',
      username: 'ElB',
      password: 'bua234',
    },
  })
}

const loginFormFn = (page) => {
  const loginForm = {}
  loginForm['usernameInput'] = page.getByText('Username')
  loginForm['passwordInput'] = page.getByText('Password')
  loginForm['button'] = page.getByText('Login')
  return loginForm
}
const blogFormFn = (page) => {
  const blogForm = {}
  blogForm['authorInput'] = page.getByRole('textbox', { name: 'Author' })
  blogForm['titleInput'] = page.getByRole('textbox', { name: 'Title' })
  blogForm['urlInput'] = page.getByRole('textbox', { name: 'Url' })
  blogForm['likes'] = page.getByRole('textbox', { name: 'Likes' })
  blogForm['button'] = page.getByText('Create')
  return blogForm
}

const fillForm = async (blogForm, author, title, url, likes = '0') => {
  await blogForm.authorInput.fill(author)
  await blogForm.titleInput.fill(title)
  await blogForm.urlInput.fill(url)
  await blogForm.likes.fill(likes)
  await blogForm.button.click()
}

const createBlog = async (page, author, title, url, likes = '0') => {
  const showBlogFormButton = page.getByText('Add a new blog')
  await showBlogFormButton.click()
  const blogForm = blogFormFn(page)
  await fillForm(blogForm, author, title, url, likes)
}

export { loginWith, resetDb, loginFormFn, fillForm, blogFormFn, createBlog }
