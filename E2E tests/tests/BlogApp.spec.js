const { test, expect, beforeEach, describe } = require('@playwright/test')
const {
  resetDb,
  loginFormFn,
  loginWith,
  createForm,
  blogFormFn,
} = require('./helpers.js')

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

  test('add new blog and cancel buttons works correctly', async ({ page }) => {
    await loginWith(loginForm, 'ElB', 'bua234')

    const showBlogFormButton = page.getByText('Add a new blog')
    await expect(showBlogFormButton).toBeVisible()

    await showBlogFormButton.click()
    await expect(page.getByText('Author')).toBeVisible()
    await expect(page.getByText('Title')).toBeVisible()
    await expect(page.getByText('Url')).toBeVisible()

    const cancelButton = page.getByText('cancel')
    await cancelButton.click()
    await expect(page.getByText('Author')).not.toBeVisible()
    await expect(page.getByText('Title')).not.toBeVisible()
    await expect(page.getByText('Url')).not.toBeVisible()
  })

  test('loggued user can create a new blog and it is visible', async ({
    page,
  }) => {
    await loginWith(loginForm, 'ElB', 'bua234')
    // console.log(await page.content())

    const showBlogFormButton = page.getByText('Add a new blog')
    await showBlogFormButton.click()

    const blogForm = blogFormFn(page)
    await createForm(blogForm, 'Test author', 'Test title', 'Test url')

    const newBlog = page.getByText('Test title', { exact: true })
    await expect(newBlog).toBeVisible()

    const viewButton = page.locator('.toggle-btn')
    await expect(viewButton).toBeVisible()
    await viewButton.click()

    const blogTitle = page.getByText('Test title', { exact: true })
    const blogUrl = page.getByText('Test url', { exact: true })
    const blogAuthor = page.getByText('Author: Test author', { exact: true })

    await expect(blogTitle).toBeVisible()
    await expect(blogUrl).toBeVisible()
    await expect(blogAuthor).toBeVisible()

    const hideButton = page.getByText('Hide')
    await expect(viewButton).toBeVisible()
    await hideButton.click()

    await expect(blogTitle).toBeVisible()
    await expect(blogUrl).not.toBeVisible()
    await expect(blogAuthor).not.toBeVisible()
  })
})
