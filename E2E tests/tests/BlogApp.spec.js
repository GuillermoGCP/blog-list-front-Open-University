const { test, expect, beforeEach, describe } = require('@playwright/test')
const { resetDb, loginFormFn, loginWith } = require('./helpers.js')

let loginForm
describe('Login', () => {
  beforeEach(async ({ page, request }) => {
    await resetDb(request)
    await page.goto('http://localhost:5173/')
    loginForm = loginFormFn(page)
  })

  test('Login form is shown', async ({ page }) => {
    await expect(loginForm.usernameInput).toBeVisible()
    await expect(loginForm.passwordInput).toBeVisible()
    await expect(loginForm.button).toBeVisible()
  })

  test('succeeds with correct credentials', async ({ page }) => {
    await loginWith(loginForm, 'ElB', 'bua234')
    await expect(page.getByText('ElB logged in')).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await loginWith(loginForm, 'ElB', 'wrongPassword')
    await expect(page.getByText('invalid username or password')).toBeVisible()
  })
})
