import { test, expect } from '@playwright/test'

test.describe('Messages', () => {
  test('MessageSucces a role="status" et aria-live="polite"', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-messages--succes')

    const message = page.getByRole('status')
    await expect(message).toBeVisible()
    await expect(message).toHaveAttribute('aria-live', 'polite')
    await expect(message).toContainText('3 pseudonymes enregistrés')
  })

  test('MessageInfo a role="status"', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-messages--info')

    const message = page.getByRole('status')
    await expect(message).toBeVisible()
    await expect(message).toContainText('Voile posé sur 3 pseudonymes')
  })

  test('MessageErreur a role="alert"', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-messages--erreur')

    const message = page.getByRole('alert')
    await expect(message).toBeVisible()
    await expect(message).toContainText("Ce format n'est pas pris en charge")
  })

  test('les trois rôles ARIA sont visibles dans RolesARIAVisibles', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-messages--roles-aria-visibles')

    // MessageSucces → role="status"
    await expect(page.getByRole('status').first()).toBeVisible()

    // MessageInfo → role="status" (deuxième élément)
    await expect(page.getByRole('status').nth(1)).toBeVisible()

    // MessageErreur → role="alert"
    await expect(page.getByRole('alert')).toBeVisible()
  })
})
