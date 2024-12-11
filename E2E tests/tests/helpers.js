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
  blogForm['button'] = page.getByText('Create')
  return blogForm
}

const createForm = async (blogForm, author, title, url) => {
  await blogForm.authorInput.fill(author)
  await blogForm.titleInput.fill(title)
  await blogForm.urlInput.fill(url)
  await blogForm.button.click()
}

export { loginWith, resetDb, loginFormFn, createForm, blogFormFn }
