const { test, expect, beforeEach, describe } = require('@playwright/test')
const {
  resetDb,
  loginFormFn,
  loginWith,
  createBlog,
  aceptConfirm,
  createUser,
} = require('./helpers.js')

let loginForm
describe('Login', () => {
  beforeEach(async ({ page, request }) => {
    await resetDb(request)
    await createUser(request, 'Guanabi', 'ElB', 'bua234')
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
    // console.log(await page.content())
  })
})

describe('test blogs', () => {
  beforeEach(async ({ page, request }) => {
    await resetDb(request)
    await createUser(request, 'Guanabi', 'ElB', 'bua234')
    await page.goto('http://localhost:5173/')
    loginForm = loginFormFn(page)
    await loginWith(loginForm, 'ElB', 'bua234')
    await createBlog(page, 'Test author', 'Test title', 'Test url')
  })

  test('loggued user can create a new blog and it is visible', async ({
    page,
  }) => {
    const newBlog = page.getByText('Test title', { exact: true })
    await expect(newBlog).toBeVisible()

    const viewButton = page.locator('.toggle-btn').nth(0)
    await expect(viewButton).toBeVisible()
    await viewButton.click()

    const blogTitle = page.getByText('Test title', { exact: true })
    const blogUrl = page.getByText('Test url', { exact: true })
    const blogAuthor = page.getByText('Author: Test author', { exact: true })

    await expect(blogTitle).toBeVisible()
    await expect(blogUrl).toBeVisible()
    await expect(blogAuthor).toBeVisible()

    const hideButton = page.getByText('Hide')
    await expect(hideButton).toBeVisible()
    await hideButton.click()

    await expect(blogTitle).toBeVisible()
    await expect(blogUrl).not.toBeVisible()
    await expect(blogAuthor).not.toBeVisible()
  })
  test('a non-logged in user can add a like to any blog', async ({ page }) => {
    const viewButton = page.getByText('View')
    await viewButton.click()

    const likes = page.locator('.blog-likes span')
    expect(likes).toHaveText('0 likes')
    const likeButton = page.getByText('Like', { exact: true })
    await expect(likeButton).toBeVisible()
    await expect(likeButton).toBeEnabled()
    await likeButton.click()

    await page.waitForTimeout(500)
    expect(likes).toHaveText('1 likes')

    await likeButton.click()
    await page.waitForTimeout(500)
    expect(likes).toHaveText('2 likes')
    // console.log(await page.content())
  })

  test('likes on differents blogs', async ({ page }) => {
    await createBlog(page, 'Test author 2', 'Test title 2', 'Test url 2', '4')
    await createBlog(page, 'Test author 3', 'Test title 3', 'Test url 3')

    // First blog (Test title 2, because they are ordered by the number of likes):
    const firstHiddenContainer = page.locator('.blog_hidden').nth(0)
    const viewButton = firstHiddenContainer.getByText('View')
    await viewButton.click()

    const firstVisibleContainer = page.locator('.blog-container').nth(0)
    const firstSpanlikes = firstVisibleContainer.locator('.blog-likes span')
    expect(firstSpanlikes).toHaveText('4 likes')

    const firstLikeButton = firstVisibleContainer.getByText('Like', {
      exact: true,
    })
    await expect(firstLikeButton).toBeVisible()
    await firstLikeButton.click()
    await page.waitForTimeout(500)
    expect(firstSpanlikes).toHaveText('5 likes')

    // Second blog (Test title):
    const secondHiddenContainer = page.locator('.blog_hidden').nth(0) //Position 0 because the blog above is not longer hidden
    const secondViewButton = secondHiddenContainer.getByText('View')
    await secondViewButton.click()

    const secondVisibleContainer = page.locator('.blog-container').nth(1)
    const secondSpanlikes = secondVisibleContainer.locator('.blog-likes span')
    expect(secondSpanlikes).toHaveText('0 likes')

    const secondLikeButton = secondVisibleContainer.getByText('Like', {
      exact: true,
    })
    await expect(secondLikeButton).toBeVisible()
    await secondLikeButton.click()
    await page.waitForTimeout(500)
    expect(secondSpanlikes).toHaveText('1 likes')

    await secondLikeButton.click()
    await page.waitForTimeout(500)
    expect(secondSpanlikes).toHaveText('2 likes')

    // Third blog (Test title):
    const thirdHiddenContainer = page.locator('.blog_hidden').nth(0)
    const thirdViewButton = thirdHiddenContainer.getByText('View')
    await thirdViewButton.click()

    const thirdVisibleContainer = page.locator('.blog-container').nth(2)
    const thirdSpanlikes = thirdVisibleContainer.locator('.blog-likes span')
    expect(thirdSpanlikes).toHaveText('0 likes')

    const thirdLikeButton = thirdVisibleContainer.getByText('Like', {
      exact: true,
    })
    await expect(thirdLikeButton).toBeVisible()
    await thirdLikeButton.click()
    await page.waitForTimeout(500)
    expect(thirdSpanlikes).toHaveText('1 likes')
  })
  test('loggued user can delete a blog', async ({ page }) => {
    aceptConfirm(page, 'Test title', 'Test author')
    const newBlog = page.getByText('Test title', { exact: true })
    await expect(newBlog).toBeVisible()

    const viewButton = page.getByText('View')
    await expect(viewButton).toBeVisible()
    await viewButton.click()

    const removeButton = page.getByText('remove')
    expect(removeButton).toBeDefined()
    expect(removeButton).toBeVisible()
    await removeButton.click()

    await page.waitForTimeout(500)
    await expect(newBlog).toHaveCount(0)
    await expect(newBlog).not.toBeVisible()
  })

  test('only the blog creator can see the delete button', async ({
    request,
    page,
  }) => {
    //BLogOwner:
    await expect(page.getByText('Test title', { exact: true })).toBeVisible()
    const viewButton = page.getByText('View')
    await viewButton.click()

    const removeButton = page.getByText('remove')
    expect(removeButton).toBeDefined()
    expect(removeButton).toBeVisible()

    //Loggout:
    const logOutButton = page.getByText('LogOut')
    expect(logOutButton).toBeDefined()
    expect(logOutButton).toBeVisible()
    await logOutButton.click()

    //Non-logged user:
    await expect(page.getByText('Test title', { exact: true })).toBeVisible()
    expect(removeButton).toHaveCount(0)
    expect(removeButton).not.toBeVisible()

    //LogIn as a different user:
    await page.waitForTimeout(500)
    await expect(page.getByText('Test title', { exact: true })).toBeVisible()
    await createUser(request, 'MenInBlack', 'MIB', 'mib234')
    loginForm = loginFormFn(page)
    await loginWith(loginForm, 'MIB', 'mib234')
    await expect(page.getByText('MIB logged in')).toBeVisible()

    expect(removeButton).toHaveCount(0)
    expect(removeButton).not.toBeVisible()
  })

  test('blogs are sorted by number of likes', async ({ page }) => {
    // Create blogs with different like counts: first created (Test title) has zero likes:
    await createBlog(page, 'Test author 2', 'Test title 2', 'Test url 2', '4')
    await createBlog(page, 'Test author 3', 'Test title 3', 'Test url 3', '1')

    // Order:
    const topBlogTitle = page
      .locator('.blog_hidden')
      .nth(0)
      .getByText('Test title 2')
    await expect(topBlogTitle).toBeVisible()

    const secondBlogTitle = page
      .locator('.blog_hidden')
      .nth(1)
      .getByText('Test title 3')
    await expect(secondBlogTitle).toBeVisible()

    const thirdBlogTitle = page
      .locator('.blog_hidden')
      .nth(2)
      .getByText('Test title')
    await expect(thirdBlogTitle).toBeVisible()
  })
})
