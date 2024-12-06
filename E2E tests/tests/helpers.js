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
  loginForm['usernameInput'] = page.getByLabel('Username')
  loginForm['passwordInput'] = page.getByLabel('Password')
  loginForm['button'] = page.getByText('Login')
  return loginForm
}

export { loginWith, resetDb, loginFormFn }
