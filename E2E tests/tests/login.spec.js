const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameInput = page.getByLabel('Username')
    const passwordInput = page.getByLabel('Password')
    const button = page.getByText('Login')

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    expect(button).toBeDefined()
  })
})
