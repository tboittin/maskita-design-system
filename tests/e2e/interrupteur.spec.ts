import { test, expect } from '@playwright/test'

test.describe('Interrupteur', () => {
  test('affiche le libellé et bascule au clic', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-interrupteur--inactif')
    await page.waitForSelector('[role="button"]')

    const bouton = page.getByRole('button', { name: "Sélectionner le format d'export" })
    await expect(bouton).toBeVisible()
    await expect(bouton).toHaveAttribute('aria-pressed', 'false')

    // Clic → devient actif
    await bouton.click()
    await expect(bouton).toHaveAttribute('aria-pressed', 'true')

    // Clic → redevient inactif
    await bouton.click()
    await expect(bouton).toHaveAttribute('aria-pressed', 'false')
  })

  test('la story Actif démarre avec aria-pressed=true', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-interrupteur--actif')

    const bouton = page.getByRole('button', { name: "Sélectionner le format d'export" })
    await expect(bouton).toHaveAttribute('aria-pressed', 'true')
  })

  test('le bouton désactivé ne répond pas au clic', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-interrupteur--désactivé')

    const bouton = page.getByRole('button', { name: "Sélectionner le format d'export" })
    await expect(bouton).toBeDisabled()

    await bouton.click({ force: true })
    await expect(bouton).toHaveAttribute('aria-pressed', 'false')
  })

  test('la story AvecIcône affiche l\'icône', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-interrupteur--avec-icône')

    const bouton = page.getByRole('button', { name: "Sélectionner le format d'export" })
    await expect(bouton).toBeVisible()
    await expect(bouton).toContainText('Format PDF')
  })
})
